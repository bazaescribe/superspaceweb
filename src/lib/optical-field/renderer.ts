import { fragmentSource, opticalSettings as settings, vertexSource } from "./shaders";

/** Owns GPU resources and scheduling; React never participates in the render loop. */
export function mountOpticalField(canvas: HTMLCanvasElement): () => void {
  const gl = canvas.getContext("webgl", {
    alpha: false,
    antialias: false,
    depth: false,
    stencil: false,
    powerPreference: "low-power",
  });
  if (!gl) return () => {};
  const motion = matchMedia("(prefers-reduced-motion: reduce)");
  let program: WebGLProgram | null = null;
  let buffer: WebGLBuffer | null = null;
  let uniforms: Record<string, WebGLUniformLocation | null> = {};
  let frame = 0,
    elapsed = 0,
    last = 0;
  let visible = false,
    disposed = false,
    lost = false;

  function release() {
    if (buffer) gl!.deleteBuffer(buffer);
    if (program) gl!.deleteProgram(program);
    buffer = program = null;
  }
  function initialize() {
    const shaders: WebGLShader[] = [];
    try {
      for (const [type, source] of [
        [gl!.VERTEX_SHADER, vertexSource],
        [gl!.FRAGMENT_SHADER, fragmentSource],
      ] as const) {
        const shader = gl!.createShader(type);
        if (!shader) throw new Error("Shader allocation failed");
        shaders.push(shader);
        gl!.shaderSource(shader, source);
        gl!.compileShader(shader);
        if (!gl!.getShaderParameter(shader, gl!.COMPILE_STATUS))
          throw new Error(gl!.getShaderInfoLog(shader) || "Shader compilation failed");
      }
      program = gl!.createProgram();
      if (!program) throw new Error("Program allocation failed");
      shaders.forEach((shader) => gl!.attachShader(program!, shader));
      gl!.linkProgram(program);
      if (!gl!.getProgramParameter(program, gl!.LINK_STATUS)) throw new Error("Shader link failed");
      buffer = gl!.createBuffer();
      if (!buffer) throw new Error("Buffer allocation failed");
      gl!.useProgram(program);
      gl!.bindBuffer(gl!.ARRAY_BUFFER, buffer);
      gl!.bufferData(gl!.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl!.STATIC_DRAW);
      const position = gl!.getAttribLocation(program, "a_position");
      gl!.enableVertexAttribArray(position);
      gl!.vertexAttribPointer(position, 2, gl!.FLOAT, false, 0, 0);
      uniforms = Object.fromEntries(
        ["resolution", "time", "density", "dispersion", "exposure", "warp", "refraction"].map((name) => [
          name,
          gl!.getUniformLocation(program!, `u_${name}`),
        ]),
      );
      for (const name of ["density", "dispersion", "exposure", "warp", "refraction"] as const)
        gl!.uniform1f(uniforms[name], settings[name]);
      return true;
    } catch (error) {
      console.warn("Optical hero using CSS fallback:", error);
      release();
      return false;
    } finally {
      shaders.forEach((shader) => gl!.deleteShader(shader));
    }
  }
  function draw() {
    if (!program || lost || disposed) return;
    gl!.viewport(0, 0, canvas.width, canvas.height);
    gl!.uniform2f(uniforms.resolution, canvas.width, canvas.height);
    gl!.uniform1f(uniforms.time, elapsed * settings.speed);
    gl!.drawArrays(gl!.TRIANGLES, 0, 3);
    canvas.dataset.ready = "true";
  }
  function tick(now: number) {
    frame = 0;
    if (!visible || document.hidden || motion.matches || lost || disposed || !program) return;
    if (!last) last = now;
    if (now - last >= 1000 / settings.fps) {
      // Use active wall time even on slow GPUs. Visibility changes reset `last`,
      // so time spent paused never becomes a jump when the hero returns.
      elapsed += (now - last) / 1000;
      last = now;
      draw();
    }
    frame = requestAnimationFrame(tick);
  }
  function schedule() {
    cancelAnimationFrame(frame);
    frame = 0;
    last = 0;
    if (visible && !document.hidden && !lost && program) {
      draw();
      if (!motion.matches) frame = requestAnimationFrame(tick);
    }
  }
  function resize() {
    const { width, height } = canvas.getBoundingClientRect();
    const dpr = Math.min(
      devicePixelRatio || 1,
      settings.maxDpr,
      Math.sqrt(settings.maxPixels / Math.max(1, width * height)),
    );
    canvas.width = Math.max(1, Math.round(width * dpr));
    canvas.height = Math.max(1, Math.round(height * dpr));
    if (visible && !document.hidden) draw();
  }
  function contextLost(event: Event) {
    event.preventDefault();
    lost = true;
    delete canvas.dataset.ready;
    cancelAnimationFrame(frame);
  }
  function contextRestored() {
    lost = false;
    release();
    if (initialize()) {
      resize();
      schedule();
    }
  }
  if (!initialize()) return () => {};
  const resizeObserver = new ResizeObserver(resize);
  resizeObserver.observe(canvas);
  const intersection = new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    schedule();
  });
  intersection.observe(canvas);
  motion.addEventListener("change", schedule);
  document.addEventListener("visibilitychange", schedule);
  window.addEventListener("resize", resize);
  canvas.addEventListener("webglcontextlost", contextLost);
  canvas.addEventListener("webglcontextrestored", contextRestored);
  resize();
  return () => {
    disposed = true;
    cancelAnimationFrame(frame);
    resizeObserver.disconnect();
    intersection.disconnect();
    motion.removeEventListener("change", schedule);
    document.removeEventListener("visibilitychange", schedule);
    window.removeEventListener("resize", resize);
    canvas.removeEventListener("webglcontextlost", contextLost);
    canvas.removeEventListener("webglcontextrestored", contextRestored);
    delete canvas.dataset.ready;
    release();
  };
}

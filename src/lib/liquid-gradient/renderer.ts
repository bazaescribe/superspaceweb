import { fragmentSource, vertexSource } from "./shaders";

export type LiquidGradientColors = readonly [string, string, string, string, string];

export type LiquidGradientSettings = {
  colors: LiquidGradientColors;
  seed: number;
  speed: number;
  scale: number;
  amplitude: number;
  frequency: number;
  definition: number;
  bands: number;
  flowAngle: number;
  grain: boolean;
  grainAmount: number;
  maxDpr: number;
  maxPixels: number;
  fps: number;
};

function rgb(hex: string): [number, number, number] {
  const value = hex.replace("#", "");
  const normalized = value.length === 3 ? value.replace(/(.)/g, "$1$1") : value;
  const parsed = Number.parseInt(normalized, 16);
  if (normalized.length !== 6 || Number.isNaN(parsed)) return [0, 0, 0];
  return [((parsed >> 16) & 255) / 255, ((parsed >> 8) & 255) / 255, (parsed & 255) / 255];
}

export function mountLiquidGradient(canvas: HTMLCanvasElement, settings: LiquidGradientSettings): () => void {
  const gl = canvas.getContext("webgl", {
    alpha: false,
    antialias: false,
    depth: false,
    stencil: false,
    powerPreference: "low-power",
  });
  if (!gl) return () => {};

  const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)");
  const compile = (type: number, source: string) => {
    const shader = gl.createShader(type);
    if (!shader) throw new Error("Shader allocation failed");
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(shader) ?? "Compile failed");
    return shader;
  };

  let program: WebGLProgram | null = null;
  let buffer: WebGLBuffer | null = null;
  let frame = 0;
  let elapsed = 0;
  let last = 0;
  let visible = false;
  let disposed = false;

  try {
    const vertex = compile(gl.VERTEX_SHADER, vertexSource);
    const fragment = compile(gl.FRAGMENT_SHADER, fragmentSource);
    program = gl.createProgram();
    if (!program) throw new Error("Program allocation failed");
    gl.attachShader(program, vertex);
    gl.attachShader(program, fragment);
    gl.linkProgram(program);
    gl.deleteShader(vertex);
    gl.deleteShader(fragment);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) throw new Error(gl.getProgramInfoLog(program) ?? "Link failed");
    buffer = gl.createBuffer();
    if (!buffer) throw new Error("Buffer allocation failed");
  } catch (error) {
    console.warn("Liquid gradient using CSS fallback:", error);
    if (program) gl.deleteProgram(program);
    return () => {};
  }

  gl.useProgram(program);
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
  const position = gl.getAttribLocation(program, "a_position");
  gl.enableVertexAttribArray(position);
  gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);

  const uniform = (name: string) => gl.getUniformLocation(program!, `u_${name}`);
  const uniforms = {
    resolution: uniform("resolution"), time: uniform("time"), seed: uniform("seed"), scale: uniform("scale"),
    amplitude: uniform("amplitude"), frequency: uniform("frequency"), definition: uniform("definition"),
    bands: uniform("bands"), flowAngle: uniform("flowAngle"), grain: uniform("grain"),
    colors: settings.colors.map((_, index) => uniform(`color${index}`)),
  };
  gl.uniform1f(uniforms.seed, settings.seed);
  gl.uniform1f(uniforms.scale, settings.scale);
  gl.uniform1f(uniforms.amplitude, settings.amplitude);
  gl.uniform1f(uniforms.frequency, settings.frequency);
  gl.uniform1f(uniforms.definition, Math.max(1, Math.min(10, settings.definition)));
  gl.uniform1f(uniforms.bands, settings.bands);
  gl.uniform1f(uniforms.flowAngle, settings.flowAngle);
  gl.uniform1f(uniforms.grain, settings.grain ? settings.grainAmount : 0);
  settings.colors.forEach((color, index) => gl.uniform3fv(uniforms.colors[index], rgb(color)));

  function draw() {
    if (!program || disposed) return;
    gl!.viewport(0, 0, canvas.width, canvas.height);
    gl!.uniform2f(uniforms.resolution, canvas.width, canvas.height);
    gl!.uniform1f(uniforms.time, elapsed * settings.speed);
    gl!.drawArrays(gl!.TRIANGLES, 0, 3);
    canvas.dataset.ready = "true";
  }
  function tick(now: number) {
    frame = 0;
    if (!visible || document.hidden || reducedMotion.matches || disposed) return;
    if (!last) last = now;
    if (now - last >= 1000 / settings.fps) {
      elapsed += (now - last) / 1000;
      last = now;
      draw();
    }
    frame = requestAnimationFrame(tick);
  }
  function schedule() {
    cancelAnimationFrame(frame);
    last = 0;
    if (visible && !document.hidden) {
      draw();
      if (!reducedMotion.matches) frame = requestAnimationFrame(tick);
    }
  }
  function resize() {
    const { width, height } = canvas.getBoundingClientRect();
    const dpr = Math.min(devicePixelRatio || 1, settings.maxDpr, Math.sqrt(settings.maxPixels / Math.max(1, width * height)));
    canvas.width = Math.max(1, Math.round(width * dpr));
    canvas.height = Math.max(1, Math.round(height * dpr));
    draw();
  }

  const resizeObserver = new ResizeObserver(resize);
  const intersectionObserver = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; schedule(); });
  resizeObserver.observe(canvas);
  intersectionObserver.observe(canvas);
  reducedMotion.addEventListener("change", schedule);
  document.addEventListener("visibilitychange", schedule);
  resize();

  return () => {
    disposed = true;
    cancelAnimationFrame(frame);
    resizeObserver.disconnect();
    intersectionObserver.disconnect();
    reducedMotion.removeEventListener("change", schedule);
    document.removeEventListener("visibilitychange", schedule);
    delete canvas.dataset.ready;
    if (buffer) gl.deleteBuffer(buffer);
    if (program) gl.deleteProgram(program);
  };
}

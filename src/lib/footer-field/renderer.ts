import { fragmentSource, vertexSource } from "./shaders";

export type FooterFieldState = { pull: number; velocity: number; pointerX: number };

export function mountFooterField(canvas: HTMLCanvasElement, read: () => FooterFieldState) {
  const gl = canvas.getContext("webgl", { alpha: false, antialias: false, powerPreference: "low-power" });
  if (!gl) return () => {};

  const compile = (type: number, source: string) => {
    const shader = gl.createShader(type);
    if (!shader) throw new Error("Shader allocation failed");
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS))
      throw new Error(gl.getShaderInfoLog(shader) ?? "Compile failed");
    return shader;
  };

  let program: WebGLProgram | null = null;
  let buffer: WebGLBuffer | null = null;
  let frame = 0;
  let disposed = false;
  const started = performance.now();

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
    if (!gl.getProgramParameter(program, gl.LINK_STATUS))
      throw new Error(gl.getProgramInfoLog(program) ?? "Link failed");
    buffer = gl.createBuffer();
    if (!buffer) throw new Error("Buffer allocation failed");
  } catch (error) {
    console.warn("Footer field using CSS fallback:", error);
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
    resolution: uniform("resolution"),
    pointer: uniform("pointer"),
    time: uniform("time"),
    pull: uniform("pull"),
    velocity: uniform("velocity"),
  };

  const resize = () => {
    const { width, height } = canvas.getBoundingClientRect();
    const dpr = Math.min(devicePixelRatio || 1, 1.5);
    const nextWidth = Math.max(1, Math.round(width * dpr));
    const nextHeight = Math.max(1, Math.round(height * dpr));
    if (canvas.width !== nextWidth) canvas.width = nextWidth;
    if (canvas.height !== nextHeight) canvas.height = nextHeight;
  };
  const draw = (now: number) => {
    if (disposed || !program) return;
    const state = read();
    resize();
    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.uniform2f(uniforms.resolution, canvas.width, canvas.height);
    gl.uniform2f(uniforms.pointer, state.pointerX, 0.5);
    gl.uniform1f(uniforms.time, (now - started) / 1000);
    gl.uniform1f(uniforms.pull, state.pull);
    gl.uniform1f(uniforms.velocity, state.velocity);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
    frame = requestAnimationFrame(draw);
  };
  frame = requestAnimationFrame(draw);

  return () => {
    disposed = true;
    cancelAnimationFrame(frame);
    if (buffer) gl.deleteBuffer(buffer);
    if (program) gl.deleteProgram(program);
  };
}

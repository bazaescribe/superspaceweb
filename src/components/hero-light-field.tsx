"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "motion/react";

const vertexShader = `
  attribute vec2 a_position;
  void main() {
    gl_Position = vec4(a_position, 0.0, 1.0);
  }
`;

const fragmentShader = `
  precision highp float;

  uniform vec2 u_resolution;
  uniform float u_time;

  float bayer4(vec2 p) {
    vec2 cell = mod(floor(p), 4.0);
    float index = cell.x + cell.y * 4.0;
    float thresholds[16];
    thresholds[0] = 0.0; thresholds[1] = 8.0; thresholds[2] = 2.0; thresholds[3] = 10.0;
    thresholds[4] = 12.0; thresholds[5] = 4.0; thresholds[6] = 14.0; thresholds[7] = 6.0;
    thresholds[8] = 3.0; thresholds[9] = 11.0; thresholds[10] = 1.0; thresholds[11] = 9.0;
    thresholds[12] = 15.0; thresholds[13] = 7.0; thresholds[14] = 13.0; thresholds[15] = 5.0;
    return thresholds[int(index)] / 16.0;
  }

  void main() {
    vec2 uv = gl_FragCoord.xy / u_resolution.xy;
    vec2 p = uv - 0.5;
    p.x *= u_resolution.x / u_resolution.y;

    float t = u_time * 0.055;
    float sweep = p.y + 0.11 * sin(p.x * 1.15 - t) + 0.026 * sin(p.x * 4.2 + t * 1.7);
    float ribbon = exp(-pow((sweep + 0.06) * 4.8, 2.0));
    float innerRibbon = exp(-pow((sweep + 0.055) * 14.0, 2.0));
    float horizon = exp(-pow((p.y + 0.24 + 0.035 * sin(p.x * 2.1 + t)) * 7.0, 2.0));
    float bloom = exp(-length((p - vec2(-0.18, -0.02)) * vec2(0.62, 1.3)) * 2.6);

    vec3 ink = vec3(0.018, 0.023, 0.042);
    vec3 midnight = vec3(0.050, 0.071, 0.135);
    vec3 cobalt = vec3(0.245, 0.344, 0.70);
    vec3 pearl = vec3(0.89, 0.85, 0.76);
    vec3 color = mix(ink, midnight, bloom * 0.72);
    color += cobalt * ribbon * 0.42;
    color += pearl * innerRibbon * 0.30;
    color += cobalt * horizon * 0.075;

    float dither = bayer4(gl_FragCoord.xy);
    float luminance = dot(color, vec3(0.299, 0.587, 0.114));
    float ditherAmount = mix(0.010, 0.035, smoothstep(0.04, 0.5, luminance));
    color += (dither - 0.5) * ditherAmount;

    float vignette = 1.0 - smoothstep(0.25, 0.92, length(p * vec2(0.72, 1.05)));
    color *= 0.68 + vignette * 0.32;
    gl_FragColor = vec4(color, 1.0);
  }
`;

function compileShader(gl: WebGLRenderingContext, type: number, source: string) {
  const shader = gl.createShader(type);
  if (!shader) return null;

  gl.shaderSource(shader, source);
  gl.compileShader(shader);

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    gl.deleteShader(shader);
    return null;
  }

  return shader;
}

export function HeroLightField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl", { alpha: true, antialias: false, powerPreference: "low-power" });
    if (!gl) return;

    const vertex = compileShader(gl, gl.VERTEX_SHADER, vertexShader);
    const fragment = compileShader(gl, gl.FRAGMENT_SHADER, fragmentShader);
    if (!vertex || !fragment) return;

    const program = gl.createProgram();
    if (!program) return;

    gl.attachShader(program, vertex);
    gl.attachShader(program, fragment);
    gl.linkProgram(program);
    gl.deleteShader(vertex);
    gl.deleteShader(fragment);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      gl.deleteProgram(program);
      return;
    }

    const position = gl.getAttribLocation(program, "a_position");
    const resolution = gl.getUniformLocation(program, "u_resolution");
    const time = gl.getUniformLocation(program, "u_time");
    const buffer = gl.createBuffer();
    if (!buffer || position < 0 || !resolution || !time) return;

    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    gl.useProgram(program);
    gl.enableVertexAttribArray(position);
    gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);

    let frame = 0;
    const startedAt = performance.now();

    const draw = (now: number) => {
      const devicePixelRatio = Math.min(window.devicePixelRatio || 1, 1.5);
      const width = Math.max(1, Math.floor(canvas.clientWidth * devicePixelRatio));
      const height = Math.max(1, Math.floor(canvas.clientHeight * devicePixelRatio));

      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
      }

      gl.viewport(0, 0, width, height);
      gl.uniform2f(resolution, width, height);
      gl.uniform1f(time, reduceMotion ? 12 : (now - startedAt) / 1000);
      gl.drawArrays(gl.TRIANGLES, 0, 3);

      if (!reduceMotion) frame = window.requestAnimationFrame(draw);
    };

    const resizeObserver = new ResizeObserver(() => draw(performance.now()));
    resizeObserver.observe(canvas);
    draw(startedAt);

    return () => {
      window.cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      gl.deleteBuffer(buffer);
      gl.deleteProgram(program);
    };
  }, [reduceMotion]);

  return <canvas ref={canvasRef} className="hero-light-field" aria-hidden="true" />;
}

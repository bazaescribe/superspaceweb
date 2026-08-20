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

  void main() {
    vec2 uv = gl_FragCoord.xy / u_resolution.xy;
    vec2 p = uv - 0.5;
    p.x *= u_resolution.x / u_resolution.y;

    float t = u_time * 0.085;
    float arc = 0.03 + 0.2 * sin(p.x * 1.16 + t) + 0.046 * sin(p.x * 3.7 - t * 0.45);
    float distanceToArc = p.y - arc;
    float outerGlow = exp(-pow(distanceToArc * 5.5, 2.0));
    float neutralGlare = exp(-pow(distanceToArc * 6.8, 2.0));
    float glareCore = exp(-pow(distanceToArc * 13.0, 2.0));
    float chromaticRim = max(outerGlow - neutralGlare, 0.0);
    float blueRim = chromaticRim * smoothstep(0.012, 0.13, -distanceToArc);
    float redRim = chromaticRim * smoothstep(0.012, 0.13, distanceToArc);

    vec3 shadow = vec3(0.008, 0.01, 0.012);
    vec3 red = vec3(1.0, 0.0588, 0.0588);
    vec3 electricBlue = vec3(0.0902, 0.0588, 1.0);
    vec3 whiteGlare = vec3(0.96, 0.91, 0.82);
    vec3 color = shadow;
    color += whiteGlare * (outerGlow * 0.26 + neutralGlare * 0.42 + glareCore * 0.12);
    color += electricBlue * blueRim * 0.52;
    color += red * redRim * 0.52;

    float vignette = 1.0 - smoothstep(0.52, 1.25, length(p * vec2(0.62, 0.92)));
    color *= 0.74 + vignette * 0.26;

    vec2 grainCell = floor(gl_FragCoord.xy / 3.0);
    float grain = fract(sin(dot(grainCell, vec2(12.9898, 78.233))) * 43758.5453);
    float brightness = max(color.r, max(color.g, color.b));
    float grainStrength = mix(0.008, 0.04, smoothstep(0.05, 0.45, brightness));
    color += (grain - 0.5) * grainStrength;

    gl_FragColor = vec4(color, 0.96);
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

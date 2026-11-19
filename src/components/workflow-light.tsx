"use client";

import { useEffect, useRef } from "react";
import { mountLiquidGradient } from "@/lib/liquid-gradient/renderer";
import { liquidGradientDefaults } from "./liquid-gradient";
import styles from "./workflow-examples.module.css";

const projector = `
precision highp float;
uniform vec2 u_resolution;
uniform float u_time;
float grainAt(vec2 cell) {
  vec3 p = fract(vec3(cell.xyx) * 0.1031);
  p += dot(p, p.yzx + 33.33);
  return fract((p.x + p.y) * p.z);
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution;
  float t = u_time * 0.42;
  vec2 p = uv - vec2(0.65 + 0.15 * sin(t), -0.08 + 0.08 * cos(t * 0.73));
  p.x *= clamp(u_resolution.x / u_resolution.y, 0.8, 1.8);
  float d = length(p * vec2(0.93, 1.12)) + 0.055 * sin(p.x * 3.2 + t);
  vec3 color = mix(vec3(0.03), vec3(0.35,0.18,0.045), 1.0 - smoothstep(0.56,0.85,d));
  color = mix(color, vec3(0.96,0.72,0.21), 1.0 - smoothstep(0.51,0.62,d));
  color = mix(color, vec3(1.0,0.91,0.69), 1.0 - smoothstep(0.30,0.53,d));
  float grain = mix(grainAt(floor(gl_FragCoord.xy)), grainAt(floor(gl_FragCoord.xy / 2.0)), 0.62);
  float luminance = dot(color, vec3(0.2126, 0.7152, 0.0722));
  float strength = mix(0.10, 0.22, smoothstep(0.03, 0.55, luminance));
  gl_FragColor = vec4(color + (grain - 0.5) * strength, 1.0);
}`;

export function WorkflowLight() {
  const canvas = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    if (canvas.current) return mountLiquidGradient(canvas.current, {
      ...liquidGradientDefaults, maxDpr: 1.25, maxPixels: 1200000, fps: 24,
    }, projector);
  }, []);
  return <canvas ref={canvas} className={styles.light} aria-hidden="true" />;
}

"use client";

import { useEffect, useRef } from "react";
import styles from "./implementation-field.module.css";

const TAU = Math.PI * 2;
const STAGES = ["Understand", "Define", "Configure", "Launch", "Evolve"];
const CAPTIONS = [
  "Discover the field",
  "Find the alignment",
  "Shape the system",
  "Set it in motion",
  "Expand the possible",
];
const COLORS = ["#FFFFFF", "#FFFFFF", "#FF6C09", "#FFFFFF", "#F7007C", "#FFFFFF", "#4A36FE"];
const random = (seed: number) => {
  let n = Math.imul(seed ^ 0x9e3779b9, 0x21f0aaad);
  n = Math.imul(n ^ (n >>> 15), 0x735a2d97);
  return ((n ^ (n >>> 15)) >>> 0) / 4294967296;
};
type Point = { x: number; y: number };

// A shared two-dimensional field keeps every path and planet continuous.
// The asymmetry and changing radii make each stage a distinct composition.
function field(stage: number, t: number, strand: number): Point {
  const a = t * TAU;
  const phase = strand * 2.399963;
  const band = strand % 5;
  let x: number;
  let y: number;
  if (stage === 0) {
    const r = 0.7 + band * 0.045 + Math.sin(a * 3 + phase) * 0.09;
    x = Math.cos(a + phase) * r;
    y = Math.sin(a + phase) * r + Math.sin(a * 2 + phase) * 0.13;
  } else if (stage === 1) {
    const r = 0.65 + band * 0.065;
    const angle = -0.65 + strand * 0.28;
    const ex = Math.cos(a) * r;
    const ey = Math.sin(a) * r * 0.48;
    x = ex * Math.cos(angle) - ey * Math.sin(angle);
    y = ex * Math.sin(angle) + ey * Math.cos(angle);
  } else if (stage === 2) {
    const r = 0.65 + Math.cos(a * 3 + phase) * 0.18;
    x = Math.cos(a) * r;
    y = Math.sin(a) * r * 0.8 + Math.sin(a * 3 + phase) * 0.15;
  } else if (stage === 3) {
    const r = 0.22 + t * 0.7;
    x = Math.cos(a * 1.35 + phase) * r;
    y = (t - 0.5) * 1.55 + Math.sin(a * 1.35 + phase) * 0.13;
    x += y * 0.18;
  } else {
    const r = 0.23 + t * 0.7;
    x = Math.cos(a * 0.8 + phase) * r;
    y = Math.sin(a * 0.8 + phase) * r * 0.64 - x * 0.21;
  }
  return { x, y };
}

const PLANETS = Array.from({ length: 34 }, (_, i) => ({
  t: i < 7 ? [0.12, 0.34, 0.58, 0.77, 0.92, 0.46, 0.22][i] : random(i + 6),
  strand: i % 7,
  color: COLORS[i % COLORS.length],
  sizes: Array.from({ length: 5 }, (_, stage) => {
    if (i < 7) return 12 + random(i * 19 + stage * 31 + 12) * 26 + (i === stage ? 16 : 0);
    return 2.5 + Math.pow(random(i * 13 + stage * 17), 2) * 10;
  }),
}));
const DUST = Array.from({ length: 300 }, (_, i) => ({
  t: random(i + 100),
  strand: i % 7,
  size: 0.5 + random(i + 50) * 1.1,
}));
const CORE_SIZES = [47, 67, 35, 55, 29];
type Props = { active: number; playing: boolean; reducedMotion: boolean };

export function ImplementationField({ active, playing, reducedMotion }: Props) {
  const svgRef = useRef<SVGSVGElement>(null);
  const controls = useRef({ active, playing, reducedMotion });
  const wake = useRef<(() => void) | null>(null);
  useEffect(() => {
    controls.current = { active, playing, reducedMotion };
    wake.current?.();
  }, [active, playing, reducedMotion]);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;
    const paths = [...svg.querySelectorAll<SVGPathElement>("[data-orbit]")];
    const planets = [...svg.querySelectorAll<SVGCircleElement>("[data-planet]")];
    const dust = [...svg.querySelectorAll<SVGCircleElement>("[data-dust]")];
    const core = svg.querySelector<SVGCircleElement>("[data-core]")!;
    const pulses = [...svg.querySelectorAll<SVGCircleElement>("[data-pulse]")];
    const weights = [0, 0, 0, 0, 0];
    weights[controls.current.active] = 1;
    let width = 800;
    let height = 640;
    let frame = 0;
    let previous = 0;
    let time = 0;
    let visible = false;
    let disposed = false;
    const project = (t: number, strand: number, drift = 0): Point => {
      let x = 0;
      let y = 0;
      for (let stage = 0; stage < 5; stage++) {
        if (weights[stage] < 0.00001) continue;
        const point = field(stage, t, strand);
        x += point.x * weights[stage];
        y += point.y * weights[stage];
      }
      const angle = Math.sin(time * 0.13) * 0.055;
      const rotatedX = x * Math.cos(angle) - y * Math.sin(angle);
      const rotatedY = x * Math.sin(angle) + y * Math.cos(angle);
      return {
        x: width * 0.5 + (rotatedX + Math.sin(time * 0.31 + strand) * drift) * width * 0.6,
        y: height * 0.46 + (rotatedY + Math.cos(time * 0.26 + strand * 2) * drift) * height * 0.58,
      };
    };
    const place = (circle: SVGCircleElement, point: Point, radius?: number) => {
      circle.setAttribute("cx", point.x.toFixed(2));
      circle.setAttribute("cy", point.y.toFixed(2));
      if (radius !== undefined) circle.setAttribute("r", radius.toFixed(2));
    };
    const render = (now: number) => {
      frame = 0;
      if (disposed || !visible || document.hidden) return;
      const dt = previous ? Math.min((now - previous) / 1000, 0.05) : 1 / 60;
      previous = now;
      const { active: selected, playing: animate, reducedMotion: reduce } = controls.current;
      const blend = reduce ? 1 : 1 - Math.exp(-dt * 4.5);
      let unsettled = false;
      for (let s = 0; s < 5; s++) {
        const target = s === selected ? 1 : 0;
        weights[s] += (target - weights[s]) * blend;
        if (Math.abs(weights[s] - target) > 0.0001) unsettled = true;
      }
      if (animate && !reduce) time += dt;
      if (reduce) time = 0;
      const sizeScale = Math.min(width / 800, height / 600);
      paths.forEach((path, strand) => {
        let d = "";
        for (let j = 0; j <= 120; j++) {
          const p = project(j / 120, strand);
          d += `${j ? "L" : "M"}${p.x.toFixed(1)},${p.y.toFixed(1)}`;
        }
        path.setAttribute("d", d);
        path.setAttribute(
          "opacity",
          String(weights[0] * 0.13 + weights[1] * 0.32 + weights[2] * 0.25 + weights[3] * 0.2 + weights[4] * 0.18),
        );
      });
      planets.forEach((circle, i) => {
        const planet = PLANETS[i];
        const drift = Math.sin(time * (0.16 + i * 0.002) + i) * 0.014;
        const p = project(Math.max(0.01, Math.min(0.99, planet.t + drift)), planet.strand, 0.012);
        const radius = planet.sizes.reduce((sum, size, stage) => sum + size * weights[stage], 0);
        place(circle, p, radius * (i < 7 ? 0.8 : 1) * sizeScale * (1 + Math.sin(time * 0.5 + i) * 0.025));
      });
      dust.forEach((circle, i) => {
        const point = DUST[i];
        const p = project(point.t, point.strand, 0.005);
        const spread = 8 + weights[0] * 24;
        p.x += (random(i + 800) - 0.5) * spread * sizeScale;
        p.y += (random(i + 1800) - 0.5) * spread * sizeScale;
        place(circle, p);
      });
      pulses.forEach((circle, i) => place(circle, project((time * 0.045 + i / 7) % 1, i), 1.6 * sizeScale));
      const coreRadius = CORE_SIZES.reduce((sum, size, s) => sum + size * weights[s], 0);
      place(
        core,
        {
          x: width * 0.5 + Math.sin(time * 0.24) * 5 * sizeScale,
          y: height * 0.46 + Math.cos(time * 0.21) * 5 * sizeScale,
        },
        coreRadius * 0.8 * sizeScale,
      );
      if ((!reduce && animate) || unsettled) frame = requestAnimationFrame(render);
    };
    const start = () => {
      if (!frame && visible && !document.hidden && !disposed) {
        previous = 0;
        frame = requestAnimationFrame(render);
      }
    };
    wake.current = start;
    const resize = () => {
      const rect = svg.getBoundingClientRect();
      width = rect.width || 800;
      height = rect.height || 640;
      svg.setAttribute("viewBox", `0 0 ${width} ${height}`);
      start();
    };
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) start();
      else {
        cancelAnimationFrame(frame);
        frame = 0;
      }
    });
    observer.observe(svg);
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(svg);
    const visibility = () => {
      cancelAnimationFrame(frame);
      frame = 0;
      start();
    };
    document.addEventListener("visibilitychange", visibility);
    resize();
    return () => {
      disposed = true;
      wake.current = null;
      cancelAnimationFrame(frame);
      observer.disconnect();
      resizeObserver.disconnect();
      document.removeEventListener("visibilitychange", visibility);
    };
  }, []);

  return (
    <div
      className={styles.field}
      data-stage={active}
      role="img"
      aria-label={`${STAGES[active]}. A living orbital field of solid planets changes shape and scale with each implementation stage.`}
    >
      <svg ref={svgRef} className={styles.canvas} viewBox="0 0 800 640" aria-hidden="true">
        {Array.from({ length: 7 }, (_, i) => (
          <path key={`orbit-${i}`} data-orbit fill="none" stroke={i === 4 ? "#F7007C" : "#FFFFFF"} strokeWidth="0.7" />
        ))}
        {DUST.map((point, i) => (
          <circle key={`dust-${i}`} data-dust r={point.size} fill="#FFFFFF" opacity={0.15 + random(i) * 0.4} />
        ))}
        {Array.from({ length: 7 }, (_, i) => (
          <circle key={`pulse-${i}`} data-pulse fill="#FFFFFF" r="1.6" />
        ))}
        <circle data-core cx="400" cy="294" r="47" fill="#FFFFFF" />
        {PLANETS.map((planet, i) => (
          <circle key={`planet-${i}`} data-planet fill={planet.color} />
        ))}
      </svg>
      <div className={styles.caption} aria-hidden="true">
        <span>0{active + 1} / 05</span>
        <span>{CAPTIONS[active]}</span>
      </div>
    </div>
  );
}

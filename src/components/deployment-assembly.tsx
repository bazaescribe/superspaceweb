"use client";
import { useCopy } from "@/i18n/copy";

import { useEffect, useRef, useState } from "react";
import { useInView } from "motion/react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import styles from "./deployment-assembly.module.css";

type Position = [number, number, number];
const duration = 14;
const smooth = (n: number) => {
  const t = Math.max(0, Math.min(1, n));
  return t * t * t * (t * (t * 6 - 15) + 10);
};
const mix = (a: Position, b: Position, t: number): Position => a.map((v, i) => v + (b[i] - v) * t) as Position;
// The same 4:7 isometric slope used by the deployment platform and homepage pillars.
const project = ([x, y, z]: Position) => [640 + (x - y) * 72, 320 + (x + y) * (288 / 7) - z * (576 / 7)];
const cubes = Array.from({ length: 64 }, (_, id) => {
  const wall = Math.floor(id / 16);
  const row = Math.floor((id % 16) / 4);
  const col = id % 4;
  // Opposing offsets along the two ground axes keep all four walls on one
  // horizontal baseline. They close to adjacent grid diagonals, not a tower.
  const offset = wall - 1.5;
  const volume: Position = [offset, col - 1.5 - offset, row - 1.5];
  const layers: Position = [offset * 2, col - 1.5 - offset * 2, row - 1.5];
  // Stable, irregular offsets keep server rendering and every loop identical.
  const noise = (seed: number) => {
    const n = Math.sin((id + 1) * seed) * 43758.5453;
    return n - Math.floor(n) - 0.5;
  };
  const scattered: Position = [
    layers[0] + noise(12.9898) * 0.65,
    layers[1] + noise(78.233) * 0.65,
    layers[2] + noise(39.425) * 0.9,
  ];
  return { id, volume, layers, scattered, delay: (col + row + wall) * 0.055 };
});

function scene(time: number, reduced: boolean, activityTime: number) {
  return cubes
    .map((cube) => {
      const toLayers = smooth((time - 1.6 - cube.delay) / 3);
      const toVolume = smooth((time - 6.1 - cube.delay) / 3);
      const position = reduced ? cube.volume : mix(mix(cube.scattered, cube.layers, toLayers), cube.volume, toVolume);
      const [x, y] = project(position);
      // A permuted sequence lights individual cubes, with a slow attack and release.
      const pulse = (offset: number) => {
        const phase = activityTime * 0.72 + offset;
        const event = Math.floor(phase);
        return cube.id === (event * 19 + 7) % cubes.length ? Math.sin((phase - event) * Math.PI) ** 2 : 0;
      };
      return {
        ...cube,
        x,
        y,
        depth: position[0] + position[1] + position[2],
        light: reduced ? (cube.id === 31 ? 0.7 : 0) : Math.max(pulse(0), pulse(3.46)),
      };
    })
    .sort((a, b) => a.depth - b.depth || a.id - b.id);
}

export function DeploymentAssembly() {
  const localizeCopy = useCopy();
  const ref = useRef<HTMLDivElement>(null);
  const visible = useInView(ref, { amount: 0.2 });
  const reduced = useReducedMotion();
  const elapsed = useRef(0);
  const [activityTime, setTime] = useState(0);
  const time = activityTime % duration;
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (!visible || reduced || paused) return;
    let request = 0;
    let previous = 0;
    const tick = (now: number) => {
      if (!document.hidden) {
        elapsed.current += previous ? Math.min(now - previous, 50) / 1000 : 0;
        setTime(elapsed.current);
      }
      previous = now;
      request = requestAnimationFrame(tick);
    };
    request = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(request);
  }, [visible, reduced, paused]);

  const opacity = reduced ? 1 : time > 13 ? 1 - smooth((time - 13) / 0.8) : smooth(time / 0.7);
  return (
    <div
      ref={ref}
      className={styles.illustration}
      data-deployment-assembly
      data-stage={reduced || time >= 9.5 ? "volume" : time >= 5 ? "layers" : "scattered"}
    >
      <svg
        viewBox="0 0 1280 640"
        fill="none"
        role="img"
        aria-label={localizeCopy(
          "Scattered business elements organize into layers, then assemble into one active operating system.",
        )}
      >
        <g opacity={opacity}>
          {scene(time, !!reduced, activityTime).map((cube) => (
            <g
              key={cube.id}
              transform={`translate(${cube.x.toFixed(2)} ${cube.y.toFixed(2)}) scale(${12 / 7})`}
              data-assembly-cube={cube.id}
            >
              <path d="M0 -38.4 33.6 -19.2V19.2L0 38.4 -33.6 19.2V-19.2Z" className={styles.body} />
              <path
                d="M0 -38.4 33.6 -19.2V19.2L0 38.4 -33.6 19.2V-19.2Z"
                className={styles.activity}
                opacity={cube.light * 0.9}
              />
              <path d="M0 -38.4 33.6 -19.2 0 0 -33.6 -19.2Z" fill="white" opacity=".035" />
              <path d="M0 0 33.6 -19.2V19.2L0 38.4Z" fill="black" opacity=".18" />
              <path d="M0 -38.4 33.6 -19.2V19.2L0 38.4 -33.6 19.2V-19.2Z" className={styles.outline} />
              <path d="m-33.6 -19.2 33.6 19.2 33.6 -19.2M0 0v38.4" className={styles.detail} />
            </g>
          ))}
        </g>
      </svg>
      {!reduced && (
        <button
          className={styles.pause}
          type="button"
          onClick={() => setPaused(!paused)}
          aria-label={localizeCopy(paused ? "Play illustration" : "Pause illustration")}
          aria-pressed={paused}
        >
          <svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true">
            {localizeCopy(
              paused ? (
                <path d="m5 3 7 5-7 5Z" fill="currentColor" />
              ) : (
                <path d="M5 3v10M11 3v10" stroke="currentColor" strokeWidth="2" />
              ),
            )}
          </svg>
        </button>
      )}
    </div>
  );
}

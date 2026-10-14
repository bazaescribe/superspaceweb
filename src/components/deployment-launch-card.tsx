"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { cubeFaces, cubePositions, turnSlice, type Axis } from "./deployment-cube-geometry";
import styles from "@/app/deployment/deployment.module.css";

const outline =
  "M37.8687 0.895271L2.01158 21.3851C1.07686 21.9192 0.5 22.9132 0.5 23.9898V64.916C0.5 65.9926 1.07686 66.9866 2.01158 67.5207L37.8687 88.0105C38.791 88.5376 39.9233 88.5376 40.8456 88.0105L76.7027 67.5207C77.6374 66.9866 78.2143 65.9926 78.2143 64.916V23.9898C78.2143 22.9132 77.6374 21.9192 76.7027 21.3851L40.8456 0.89527C39.9233 0.368243 38.791 0.368244 37.8687 0.895271Z";
// Equal spacing along both isometric axes, centered on the platform top.
const buildGrid = { centerX: 184.5, centerY: 129.5, stepX: 54, stepY: 54 * (4 / 7) };
const slots = [
  [0, 0],
  [0, 1],
  [1, 0],
  [0, 2],
  [1, 1],
  [2, 0],
  [1, 2],
  [2, 1],
  [2, 2],
];

function PlatformBuild({ active, reduced }: { active: boolean; reduced: boolean }) {
  const [count, setCount] = useState(2);
  useEffect(() => {
    if (!active || reduced) return;
    const timer = window.setInterval(() => setCount((n) => n + 1), 850);
    return () => window.clearInterval(timer);
  }, [active, reduced]);
  const topLayer = Math.floor((count - 1) / 9);
  const first = Math.max(0, (topLayer - 4) * 9);
  return (
    <svg
      className={styles.platformArt}
      viewBox="-12 -24 394 340"
      fill="none"
      focusable="false"
      data-block-count={count}
    >
      <motion.g animate={{ y: topLayer * 58 }} transition={{ duration: reduced ? 0 : 0.65, ease: "easeInOut" }}>
        <image href="/assets/figma/deployment/platform-base.svg" x="-0.5" y="22.8" width="370" height="258.009" />
        <image href="/assets/figma/deployment/platform-detail.svg" x="0" y="120.67" width="369.496" height="159.289" />
        <g transform="matrix(.866 .5 0 1 7.12 165.85)">
          <image href="/assets/figma/deployment/platform-mark.svg" width="10.0625" height="14" />
        </g>
        <g transform="matrix(.866 .5 0 1 19.07 175.96)">
          <image href="/assets/figma/deployment/platform-wordmark.svg" width="66.4479" height="9.05333" />
        </g>
        {Array.from({ length: count - first }, (_, i) => first + i).map((index) => {
          const [row, col] = slots[index % 9];
          const x = buildGrid.centerX - 40.39 + (col - row) * buildGrid.stepX;
          const y = buildGrid.centerY - 68.43 + (col + row - 2) * buildGrid.stepY - Math.floor(index / 9) * 58;
          return (
            <g key={index} transform={`translate(${x} ${y}) scale(1.0263)`}>
              <motion.path
                d={outline}
                fill="#070709"
                stroke="white"
                strokeOpacity=".7"
                initial={index < 2 || reduced ? false : { pathLength: 0, fillOpacity: 0 }}
                animate={{ pathLength: 1, fillOpacity: 1 }}
                transition={{ duration: reduced ? 0 : 0.65, ease: "easeInOut" }}
              />
              <motion.path
                d="M.94 22.373L39.1032 44.4066L77.2665 22.373M39.1032 44.4066V88.12"
                stroke="white"
                strokeOpacity=".7"
                strokeDasharray="6 6"
                initial={index < 2 || reduced ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: reduced ? 0 : 0.35, delay: reduced ? 0 : 0.3 }}
              />
            </g>
          );
        })}
      </motion.g>
    </svg>
  );
}

function EvolvingCube({ active, reduced }: { active: boolean; reduced: boolean }) {
  const model = useRef({ positions: cubePositions, step: 0, elapsed: 0, turning: false, rest: 0 });
  const [frame, setFrame] = useState({ positions: cubePositions, axis: 2 as Axis, slice: 1, angle: 0 });
  useEffect(() => {
    if (reduced || (!active && !model.current.turning)) return;
    let request = 0,
      previous = 0;
    const tick = (time: number) => {
      const state = model.current;
      const delta = previous ? Math.min(time - previous, 48) : 0;
      previous = time;
      const axis = [2, 0, 1, 2, 1, 0][state.step % 6] as Axis;
      const slice = [1, -1, 0, -1, 1, 0][state.step % 6];
      const direction = state.step % 2 ? -1 : 1;
      if (!state.turning && active) {
        state.rest += delta;
        if (state.rest >= 180) {
          state.turning = true;
          state.rest = 0;
        }
      }
      if (state.turning) {
        state.elapsed += delta;
        const progress = Math.min(state.elapsed / 1100, 1);
        const angle = ((direction * Math.PI) / 2) * (0.5 - Math.cos(Math.PI * progress) / 2);
        setFrame({ positions: state.positions, axis, slice, angle });
        if (progress === 1) {
          state.positions = turnSlice(state.positions, axis, slice, (direction * Math.PI) / 2);
          state.step += 1;
          state.elapsed = 0;
          state.turning = false;
          setFrame({ positions: state.positions, axis, slice, angle: 0 });
        }
      }
      if (active || state.turning) request = requestAnimationFrame(tick);
    };
    request = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(request);
  }, [active, reduced]);
  return (
    <svg viewBox="0 0 340 380" fill="none" focusable="false" data-turn-angle={frame.angle}>
      {cubeFaces(frame.positions, frame.axis, frame.slice, frame.angle).map((face) => (
        <g key={face.key}>
          <path d={face.outline} fill="#070709" />
          {face.edges.map((edge, i) => (
            <path
              key={i}
              d={edge.path}
              stroke="white"
              strokeOpacity=".7"
              strokeWidth="1"
              strokeLinejoin="round"
              strokeDasharray={edge.shared ? "6 6" : undefined}
            />
          ))}
        </g>
      ))}
    </svg>
  );
}

export function DeploymentLaunchCard({
  title,
  children,
  variant,
}: {
  title: string;
  children: React.ReactNode;
  variant: "platform" | "evolving";
}) {
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const reduced = !!useReducedMotion();
  return (
    <article
      className={styles.launchCard}
      tabIndex={0}
      onFocus={(event) => setFocused(event.currentTarget.matches(":focus-visible"))}
      onBlur={() => setFocused(false)}
      onPointerEnter={(e) => e.pointerType !== "touch" && setHovered(true)}
      onPointerLeave={() => setHovered(false)}
      onPointerCancel={() => setHovered(false)}
    >
      <div className={styles.cubeArt} aria-hidden="true">
        {variant === "platform" ? (
          <PlatformBuild active={hovered || focused} reduced={reduced} />
        ) : (
          <EvolvingCube active={hovered || focused} reduced={reduced} />
        )}
      </div>
      <div className={styles.launchCopy}>
        <h3>{title}</h3>
        <p>{children}</p>
      </div>
    </article>
  );
}

"use client";
import { useCopy } from "@/i18n/copy";

import { useId, useRef, useState, type PointerEvent } from "react";
import { motion } from "motion/react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { pillarGeometry } from "./pillar-geometry";
import styles from "./dark-home.module.css";
import art from "./pillar-card.module.css";

type Geometry = keyof typeof pillarGeometry;
const ease = [0.22, 0.86, 0.24, 1] as const;
const cubes = Array.from({ length: 9 }, (_, index) => {
  const row = Math.floor(index / 3);
  const col = index % 3;
  return { x: 115.29 + (col - row) * 57.14, y: 143 + (col + row) * 32.65 };
});

function Vector({ name, x = 0, y = 0, rise = 0 }: { name: Geometry; x?: number; y?: number; rise?: number }) {
  const shape = pillarGeometry[name];
  // Interpolate the exported top coordinates; the lower coordinates never move.
  const d = "raised" in shape && rise > 0 ? interpolatePath(shape.d, shape.raised, rise / 24) : shape.d;
  return (
    <g transform={`translate(${x} ${y})`}>
      <motion.path
        initial={false}
        animate={{ d }}
        transition={{ duration: 0.22, ease }}
        fill={shape.fill ? (name === "621b1" ? "var(--color-content)" : "var(--color-background)") : "none"}
        stroke={name === "621b1" ? "none" : "var(--color-content)"}
        strokeOpacity={shape.opacity}
        strokeDasharray={shape.dash ?? undefined}
        fillRule={name === "621b1" ? "evenodd" : undefined}
      />
    </g>
  );
}

function interpolatePath(from: string, to: string, progress: number) {
  const values = to.match(/-?\d*\.?\d+/g)!.map(Number);
  let index = 0;
  return from.replace(/-?\d*\.?\d+/g, (value) => String(Number(value) + (values[index++] - Number(value)) * progress));
}

function Logo({ file, x, y, width, height }: { file: string; x: number; y: number; width: number; height: number }) {
  const id = useId();
  return (
    <g transform={`translate(${x} ${y}) rotate(-30) scale(1 .87) skewX(30)`}>
      <mask
        id={id}
        maskUnits="userSpaceOnUse"
        x={-width / 2}
        y={-height / 2}
        width={width}
        height={height}
        style={{ maskType: "alpha" }}
      >
        <image
          href={`/assets/figma/pillars/${file}.png`}
          x={-width / 2}
          y={-height / 2}
          width={width}
          height={height}
        />
      </mask>
      <rect
        x={-width / 2}
        y={-height / 2}
        width={width}
        height={height}
        fill="var(--color-content)"
        mask={`url(#${id})`}
      />
    </g>
  );
}

function Business({ active }: { active: boolean }) {
  return (
    <>
      <Vector name="dc40b" x={89.39} y={57} />
      <Vector name="89a67" x={89.65} y={97.2} />
      <Logo file="59864" x={161.59} y={121} width={18} height={18} />
      <Vector name="21201" x={178.28} y={138.27} />
      <Vector name="50ca5" x={178.54} y={178.47} />
      <Logo file="02cb7" x={264.98} y={197.15} width={48.617} height={16} />
      <Vector name="f15f3" x={0.5} y={158.59} />
      <Vector name="b1449" x={0.76} y={198.79} />
      <Logo file="dc375" x={82.06} y={218.89} width={39.569} height={16} />
      <Vector name="50c16" x={89.39} y={239.86} />
      <Vector name="4d299" x={89.65} y={280.06} />
      <motion.g
        data-pillar-cap
        initial={false}
        animate={{ y: active ? [0, -9, 0] : 0 }}
        transition={active ? { duration: 2.2, repeat: Infinity, ease: "easeInOut" } : { duration: 0.3, ease }}
      >
        <Vector name="851f4" x={89.39} y={200.38} />
        <Vector name="54185" x={89.65} y={240.59} />
        <Vector name="621b1" x={152} y={256} />
      </motion.g>
    </>
  );
}

function Spaces({ active }: { active: boolean }) {
  // Figma's paint order keeps the front row in front of the center blocks.
  return (
    <>
      {[
        { x: 1, y: 132.63 },
        { x: 81, y: 178.35 },
        { x: 1, y: 51 },
        { x: 81, y: 96.71 },
        { x: 161, y: 224.06 },
        { x: 161, y: 142.43 },
      ].map(({ x, y }) => {
        const center = x === 81;
        return (
          <g key={`${x}-${y}`} transform={`translate(${x} ${y})`}>
            <motion.g
              data-pillar-space={center ? "center" : "outer"}
              initial={false}
              animate={{
                x: active && center ? -16 : 0,
                y: active && center ? 9 : 0,
                opacity: active && !center ? 0.3 : 1,
              }}
              transition={{ duration: 0.45, ease }}
            >
              <Vector name={center ? "110f1" : "5583a"} x={-0.5} />
              <Vector name={center ? "19179" : "d98ad"} x={0.57} y={25.67} />
            </motion.g>
          </g>
        );
      })}
    </>
  );
}

export function PillarCard({ title, text, index }: { title: string; text: string; index: number }) {
  const localizeCopy = useCopy();
  const svg = useRef<SVGSVGElement>(null);
  const reducedMotion = useReducedMotion();
  const [hovered, setHovered] = useState(false);
  const [cursor, setCursor] = useState<{ x: number; y: number } | null>(null);
  const active = hovered && !reducedMotion;
  function move(event: PointerEvent<HTMLElement>) {
    if (event.pointerType === "touch" || reducedMotion) return;
    setHovered(true);
    if (index !== 1 || !svg.current) return;
    const matrix = svg.current.getScreenCTM();
    if (!matrix) return;
    const point = new DOMPoint(event.clientX, event.clientY).matrixTransform(matrix.inverse());
    setCursor({ x: point.x, y: point.y });
  }
  function reset() {
    setHovered(false);
    setCursor(null);
  }
  return (
    <article
      className={styles.pillar}
      onPointerEnter={move}
      onPointerMove={move}
      onPointerLeave={reset}
      onPointerCancel={reset}
    >
      <div className={styles.pillarVisual} aria-hidden="true">
        <svg ref={svg} className={art.illustration} viewBox="-12 20 348 378" fill="none" focusable="false">
          {localizeCopy(
            index === 0 ? (
              <Business active={active} />
            ) : index === 1 ? (
              cubes.map(({ x, y }, i) => {
                const distance = cursor ? Math.hypot(cursor.x - (x + 45.71), cursor.y - (y + 39)) : Infinity;
                const rise = active ? 24 * Math.pow(Math.max(0, 1 - distance / 125), 2) : 0;
                return (
                  <g key={i} data-pillar-cube={i}>
                    <Vector name="c6d2b" x={x - 0.5} y={y} rise={rise} />
                    <Vector name="c892b" x={x + 0.56} y={y + 25.89} rise={rise} />
                  </g>
                );
              })
            ) : (
              <Spaces active={active} />
            ),
          )}
        </svg>
      </div>
      <div className={styles.pillarCopy}>
        <h3>{localizeCopy(title)}</h3>
        <p>{localizeCopy(text)}</p>
      </div>
    </article>
  );
}

"use client";

import Image from "next/image";
import { useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import type { WorkOrbitController } from "@/lib/work-orbits";

export function WorkOrbitCard({ title, description }: { title: string; description: string }) {
  const canvas = useRef<HTMLCanvasElement>(null);
  const controller = useRef<WorkOrbitController | null>(null);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const reducedMotion = useReducedMotion();
  const active = hovered || focused;
  const activeRef = useRef(active);
  useEffect(() => {
    activeRef.current = active;
    controller.current?.setActive(active && !reducedMotion);
  }, [active, reducedMotion]);
  useEffect(() => {
    if (reducedMotion || !canvas.current) return;
    const abort = new AbortController();
    let mounted: WorkOrbitController | null = null;
    void Promise.all([
      import("@/lib/work-orbits"),
      fetch("/assets/figma/illustration/Work.svg", { signal: abort.signal }).then((r) => {
        if (!r.ok) throw new Error("Orbit artwork unavailable");
        return r.text();
      }),
    ])
      .then(([{ mountWorkOrbits }, svg]) => {
        if (abort.signal.aborted || !canvas.current) return;
        mounted = mountWorkOrbits(canvas.current, svg);
        controller.current = mounted;
        mounted.setActive(activeRef.current);
      })
      .catch(() => {
        /* Canonical SVG remains visible without WebGL. */
      });
    return () => {
      abort.abort();
      controller.current = null;
      mounted?.dispose();
    };
  }, [reducedMotion]);
  return (
    <article
      className="implementation-card implementation-card--3"
      tabIndex={0}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      onPointerEnter={(e) => {
        if (e.pointerType === "mouse") setHovered(true);
      }}
      onPointerLeave={() => {
        setHovered(false);
        controller.current?.setPointer(0, 0);
      }}
      onPointerMove={(e) => {
        if (e.pointerType !== "mouse") return;
        const r = e.currentTarget.getBoundingClientRect();
        controller.current?.setPointer(
          ((e.clientX - r.left) / r.width) * 2 - 1,
          ((e.clientY - r.top) / r.height) * 2 - 1,
        );
      }}
    >
      <div className="implementation-card__image">
        <div className="shape-system-visual work-orbit-visual" aria-hidden="true">
          {!reducedMotion ? <canvas ref={canvas} /> : null}
          <Image
            src="/assets/figma/illustration/Work.svg"
            alt=""
            fill
            sizes="(max-width: 720px) 100vw, 33vw"
            style={{ objectFit: "cover", transform: "scale(1.069642857)" }}
          />
        </div>
      </div>
      <p>
        <strong>{title} </strong>
        {description}
      </p>
    </article>
  );
}

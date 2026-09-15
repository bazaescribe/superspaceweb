"use client";

import Image from "next/image";
import { useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import type { ShapeSystemController } from "@/lib/shape-system/renderer";

type ShapeSystemCardProps = {
  description: string;
  title: string;
};

function ShapeSystemVisual({ hovered }: { hovered: boolean }) {
  const canvas = useRef<HTMLCanvasElement>(null);
  const controller = useRef<ShapeSystemController | null>(null);
  const hoveredState = useRef(hovered);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    hoveredState.current = hovered;
  }, [hovered]);

  useEffect(() => {
    if (!canvas.current || reduceMotion) return;
    let cancelled = false;
    let mounted: ShapeSystemController | null = null;

    void import("@/lib/shape-system/renderer")
      .then(({ mountShapeSystem }) => {
        if (cancelled || !canvas.current) return;
        mounted = mountShapeSystem(canvas.current);
        controller.current = mounted;
        mounted.setHovered(hoveredState.current);
      })
      .catch(() => {
        // The exact static artwork remains visible if WebGL is unavailable.
      });

    return () => {
      cancelled = true;
      controller.current = null;
      mounted?.dispose();
    };
  }, [reduceMotion]);

  useEffect(() => {
    controller.current?.setHovered(hovered && !reduceMotion);
  }, [hovered, reduceMotion]);

  return (
    <div className="shape-system-visual" aria-hidden="true">
      {!reduceMotion ? <canvas ref={canvas} /> : null}
      <Image
        src="/assets/figma/implementation/shape-system.png"
        alt=""
        fill
        sizes="(max-width: 720px) 100vw, 33vw"
        priority={false}
      />
    </div>
  );
}

export function ShapeSystemCard({ description, title }: ShapeSystemCardProps) {
  const [hovered, setHovered] = useState(false);

  function updateHover(nextHovered: boolean, pointerType: string) {
    if (pointerType === "mouse") setHovered(nextHovered);
  }

  return (
    <article
      className="implementation-card implementation-card--2"
      onPointerEnter={(event) => updateHover(true, event.pointerType)}
      onPointerLeave={(event) => updateHover(false, event.pointerType)}
    >
      <div className="implementation-card__image">
        <ShapeSystemVisual hovered={hovered} />
      </div>
      <p>
        <strong>{title} </strong>
        {description}
      </p>
    </article>
  );
}

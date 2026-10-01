"use client";

import Image from "next/image";
import { useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { maskedConnectFallback } from "@/lib/connect-blocks/fallback";
import type { ConnectController } from "@/lib/connect-blocks/renderer";

export function ConnectBlockVisual({ active = true }: { active?: boolean }) {
  const canvas = useRef<HTMLCanvasElement>(null);
  const controller = useRef<ConnectController | null>(null);
  const [fallback, setFallback] = useState("/assets/figma/illustration/Connect.svg");
  const reducedMotion = useReducedMotion();
  const activeRef = useRef(active);
  useEffect(() => {
    activeRef.current = active;
    controller.current?.setActive(active && !reducedMotion);
  }, [active, reducedMotion]);
  useEffect(() => {
    const abort = new AbortController();
    let mounted: ConnectController | null = null;
    void fetch("/assets/figma/illustration/Connect.svg", { signal: abort.signal })
      .then((r) => {
        if (!r.ok) throw new Error("Connect artwork unavailable");
        return r.text();
      })
      .then(async (svg) => {
        if (abort.signal.aborted) return;
        setFallback(maskedConnectFallback(svg));
        if (reducedMotion) return;
        const { mountConnectBlocks } = await import("@/lib/connect-blocks/renderer");
        if (abort.signal.aborted || !canvas.current) return;
        mounted = mountConnectBlocks(canvas.current, svg);
        controller.current = mounted;
        mounted.setActive(activeRef.current);
      })
      .catch(() => {
        /* Transparent masked SVG survives WebGL failures. */
      });
    return () => {
      abort.abort();
      controller.current = null;
      mounted?.dispose();
    };
  }, [reducedMotion]);
  return (
    <div className="shape-system-visual connect-block-visual" aria-hidden="true">
      {!reducedMotion ? <canvas ref={canvas} /> : null}
      <Image
        src={fallback}
        alt=""
        fill
        unoptimized
        sizes="(max-width: 720px) 100vw, 33vw"
        style={{ objectFit: "contain", padding: "18.035714% 14.017857%" }}
      />
    </div>
  );
}

export function ConnectBlockCard({ title, description }: { title: string; description: string }) {
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  return (
    <article
      className="implementation-card implementation-card--2"
      tabIndex={0}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      onPointerEnter={(e) => {
        if (e.pointerType === "mouse") setHovered(true);
      }}
      onPointerLeave={() => setHovered(false)}
    >
      <div className="implementation-card__image">
        <ConnectBlockVisual active={hovered || focused} />
      </div>
      <p>
        <strong>{title} </strong>
        {description}
      </p>
    </article>
  );
}

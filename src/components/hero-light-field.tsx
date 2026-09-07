"use client";

import { useEffect, useRef } from "react";
import { mountOpticalField } from "@/lib/optical-field/renderer";

export function HeroLightField() {
  const canvas = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    if (canvas.current) return mountOpticalField(canvas.current);
  }, []);
  return (
    <div className="hero-optical-field" aria-hidden="true">
      <canvas ref={canvas} />
    </div>
  );
}

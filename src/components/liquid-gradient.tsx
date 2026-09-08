"use client";

import { useEffect, useRef } from "react";
import {
  mountLiquidGradient,
  type LiquidGradientColors,
  type LiquidGradientSettings,
} from "@/lib/liquid-gradient/renderer";

export const liquidGradientDefaults = {
  colors: ["#000000", "#9DD9D2", "#170FFF", "#EFD6AC", "#1F1F1F"],
  seed: 512,
  speed: 1,
  scale: 1,
  amplitude: 0.12,
  frequency: 0.8,
  definition: 10,
  bands: 100,
  flowAngle: 180,
  grain: true,
  grainAmount: 0.09,
  maxDpr: 1.5,
  maxPixels: 1_800_000,
  fps: 30,
} satisfies LiquidGradientSettings;

export type LiquidGradientProps = Partial<Omit<LiquidGradientSettings, "colors">> & {
  colors?: LiquidGradientColors;
  className?: string;
};

export function LiquidGradient({ className = "", ...props }: LiquidGradientProps) {
  const canvas = useRef<HTMLCanvasElement>(null);
  const settings = { ...liquidGradientDefaults, ...props };
  const colorsKey = settings.colors.join(",");

  useEffect(() => {
    if (!canvas.current) return;
    return mountLiquidGradient(canvas.current, settings);
    // The serialized color tuple keeps prop-driven updates deterministic.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    colorsKey, settings.seed, settings.speed, settings.scale, settings.amplitude, settings.frequency,
    settings.definition, settings.bands, settings.flowAngle, settings.grain, settings.grainAmount, settings.maxDpr,
    settings.maxPixels, settings.fps,
  ]);

  return (
    <div
      className={`liquid-gradient ${className}`.trim()}
      aria-hidden="true"
      style={{ backgroundColor: "#000000" }}
    >
      <div style={{
        background: '#f00'
      }}>

      </div>
      <canvas ref={canvas} />
    </div>
  );
}

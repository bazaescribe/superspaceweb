"use client";

import { useEffect, useRef } from "react";
import {
  mountLiquidGradient,
  type LiquidGradientColors,
  type LiquidGradientSettings,
} from "@/lib/liquid-gradient/renderer";

export const liquidGradientDefaults = {
  colors: ["#000000", "#150054", "#BE47C4", "#FF8B17", "#1F1F1F"],
  seed: 516,
  speed: 2,
  scale: 2,
  amplitude: 0,
  frequency: 0.46,
  definition: 10,
  bands: 0.7,
  flowAngle: -58,
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
      <canvas ref={canvas} />
    </div>
  );
}

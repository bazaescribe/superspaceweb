"use client";

import { useReducedMotion } from "motion/react";
import { ChromaticAberration, LinearGradient, Shader, Stretch, WaveDistortion } from "shaders/react";

const chromaticMetalStops = [
  { position: 0.16, color: "#000000" },
  { position: 0.39, color: "#0c0c0c" },
  { position: 0.46, color: "#1b1b1b" },
  { position: 0.5, color: "#9f7948" },
  { position: 0.53, color: "#e5be7f" },
  { position: 0.56, color: "#f8f7f2" },
  { position: 0.59, color: "#756247" },
  { position: 0.64, color: "#272727" },
  { position: 0.76, color: "#0e0e0e" },
];

export function HeroShader() {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) return null;

  return (
    <div className="hero-shader" aria-hidden="true">
      <Shader className="hero-shader__canvas" colorSpace="srgb">
        <ChromaticAberration strength={0.13} angle={30}>
          <WaveDistortion strength={0.16} frequency={2} speed={0.22} angle={30} waveType="sine" edges="transparent">
            <Stretch center={{ x: 0.5, y: 0.5 }} strength={1.85} angle={30} falloff={0.48} edges="transparent">
              <LinearGradient
                stops={chromaticMetalStops}
                start={{ x: 0, y: 0.5 }}
                end={{ x: 1, y: 0.5 }}
                angle={30}
                edges="transparent"
                colorSpace="linear"
              />
            </Stretch>
          </WaveDistortion>
        </ChromaticAberration>
      </Shader>
    </div>
  );
}

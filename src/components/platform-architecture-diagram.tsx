"use client";

import { motion } from "motion/react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { architectureMotion } from "@/lib/architecture-motion";
import styles from "./platform-architecture.module.css";

const asset = "/assets/figma/platform/layers/";
const layers = [
  { label: "Infrastructure", y: 295.04, color: "none" },
  { label: "Model", y: 198.2, color: "brightness(.65) sepia(1) saturate(5) hue-rotate(185deg)" },
  { label: "Workspace", y: 101.37, color: "brightness(.75) sepia(1) saturate(3) hue-rotate(95deg)" },
  { label: "Your Business", y: 0, color: "brightness(.7) sepia(1) saturate(5) hue-rotate(280deg)" },
];

/** Exact Figma faces remain separate so each layer can acquire richer contents later. */
export function PlatformArchitectureDiagram({ active }: { active: number }) {
  const reduced = useReducedMotion();
  const transition = { duration: reduced ? 0 : architectureMotion.duration, ease: [0.22, 1, 0.36, 1] as const };
  return (
    <svg
      className={styles.diagram}
      viewBox="-6 -12 547 669"
      role="img"
      aria-label={`Superspace architecture. Highlighted layer: ${layers[active].label}.`}
      data-active-layer={active}
    >
      {layers.map((layer, index) => (
        <g key={layer.label} transform={`translate(0 ${layer.y})`}>
          <image href={`${asset}ee4e0.svg`} width="509.368" height="338.85" />
          <motion.g animate={{ opacity: active === index ? 1 : 0 }} initial={false} transition={transition}>
            <image href={`${asset}09b6b.svg`} width="509.368" height="338.85" style={{ filter: layer.color }} />
          </motion.g>
          <image href={`${asset}0eb72.svg`} y="144.806" width="508.865" height="194.098" />
          <motion.g animate={{ opacity: active === index ? 1 : 0 }} initial={false} transition={transition}>
            <image href={`${asset}ff8af.svg`} y="144.806" width="508.865" height="194.098" />
          </motion.g>
          <motion.text
            x="0"
            y="0"
            transform="translate(10 183) matrix(.866 .5 0 1 0 0)"
            fontSize="12"
            fontFamily="Inter, sans-serif"
            letterSpacing=".12"
            animate={{ fill: active === index ? "#070709" : "#88888e" }}
            initial={false}
            transition={transition}
          >
            {layer.label}
          </motion.text>
        </g>
      ))}
      <motion.g animate={{ opacity: active === 0 ? 1 : 0.38 }} initial={false} transition={transition}>
        <image href={`${asset}00c56.svg`} x="441.3" y="453.89" width="86.4846" height="96.893" />
        <image href={`${asset}26310.svg`} x="362.62" y="497.88" width="86.4846" height="96.7873" />
        <image href={`${asset}0c143.svg`} x="363.63" y="521.556" width="85.2242" height="73.0582" />
        <image
          href={`${asset}8e8c6.png`}
          transform="translate(414.4 550.433) matrix(.866 -.5 0 1 0 0)"
          width="31.447"
          height="31.447"
        />
        <image href={`${asset}5d02f.svg`} x="285.46" y="543.28" width="85.7281" height="96.7635" />
        <image href={`${asset}0c143.svg`} x="285.71" y="566.946" width="85.2242" height="73.0582" />
        <image
          href={`${asset}7c87d.png`}
          transform="translate(334.37 594.606) matrix(.866 -.5 0 1 0 0)"
          width="36.312"
          height="36.312"
        />
      </motion.g>
    </svg>
  );
}

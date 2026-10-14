"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import styles from "@/app/deployment/deployment.module.css";

export function DeploymentLaunchCard({ title, children }: { title: string; children: React.ReactNode }) {
  const [hovered, setHovered] = useState(false);
  const reduced = useReducedMotion();
  return (
    <article
      className={styles.launchCard}
      onPointerEnter={(e) => e.pointerType !== "touch" && setHovered(true)}
      onPointerLeave={() => setHovered(false)}
      onPointerCancel={() => setHovered(false)}
    >
      <div className={styles.cubeArt} aria-hidden="true">
        <svg viewBox="0 0 274 315.51" fill="none" focusable="false">
          {[2, 1, 0].map((layer) => (
            <motion.g
              key={layer}
              initial={false}
              animate={{ y: hovered && !reduced ? -layer * 10 : 0 }}
              transition={{ duration: reduced ? 0 : 0.45, ease: [0.22, 0.86, 0.24, 1] }}
            >
              {Array.from({ length: 9 }, (_, i) => {
                const row = Math.floor(i / 3),
                  col = i % 3;
                const x = 97.14 + (col - row) * 48.57;
                const y = layer * 57.8367 + (col + row) * 27.7551;
                return (
                  <g key={i}>
                    <image
                      href="/assets/figma/deployment/cube.svg"
                      x={x - 0.5}
                      y={y}
                      width={78.7143}
                      height={88.9058}
                    />
                    <image
                      href="/assets/figma/deployment/cube-detail.svg"
                      x={x + 0.44}
                      y={y + 21.94}
                      width={76.8265}
                      height={66.1808}
                    />
                  </g>
                );
              })}
            </motion.g>
          ))}
        </svg>
      </div>
      <div className={styles.launchCopy}>
        <h3>{title}</h3>
        <p>{children}</p>
      </div>
    </article>
  );
}

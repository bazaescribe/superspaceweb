"use client";
import { useCopy } from "@/i18n/copy";

import { useState } from "react";
import { cubeFaces } from "./deployment-cube-geometry";
import styles from "./offerings-catalog.module.css";

const faces = cubeFaces([[0, 0, 0]], 0, 9, 0);

export function OfferingWorkflow({ steps }: { steps: readonly string[] }) {
  const localizeCopy = useCopy();
  const [paused, setPaused] = useState(false);
  return (
    <div className={styles.workflow} data-paused={paused}>
      <div className={styles.workflowHeading}>
        <h3>{localizeCopy("One connected flow of work.")}</h3>
        <button type="button" aria-pressed={paused} onClick={() => setPaused(!paused)}>
          {localizeCopy(paused ? "Play animation" : "Pause animation")}
        </button>
      </div>
      <ol>
        {steps.map((step, index) => (
          <li key={step} style={{ "--step-delay": `${index * 1.5}s` } as React.CSSProperties}>
            <svg viewBox="120 120 100 110" aria-hidden="true" className={styles.cube}>
              {faces.map((face, i) => (
                <g key={face.key}>
                  <path d={face.outline} className={styles.cubeFace} data-face={i} />
                  {face.edges.map((edge, j) => (
                    <path
                      key={j}
                      d={edge.path}
                      className={styles.cubeEdge}
                      strokeDasharray={edge.shared ? "2 3" : undefined}
                    />
                  ))}
                </g>
              ))}
            </svg>
            <span className={styles.stepNumber}>
              {"0"}
              {localizeCopy(index + 1)}
            </span>
            <strong>{localizeCopy(step)}</strong>
          </li>
        ))}
      </ol>
      <p>
        {localizeCopy(
          "Illustrative sequence. Your team’s stages, responsibilities, and exceptions are defined during discovery.",
        )}
      </p>
    </div>
  );
}

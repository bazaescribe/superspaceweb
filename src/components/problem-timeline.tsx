"use client";

import { useRef } from "react";
import { PresentationChoices } from "./presentation-choices";
import { OperationsSystem } from "./operations-system";
import { PresentationPlayback, usePresentationPlayback } from "./presentation-playback";
import styles from "./problem-timeline.module.css";
import layout from "./presentation-layout.module.css";

const steps = [
  {
    title: "Capture the change",
    description: "A customer changes the order by email. Someone has to carry that update into every other tool.",
  },
  {
    title: "Keep the records in sync",
    description:
      "The spreadsheet still says 200. Updating it means finding the right version and entering the change again.",
  },
  {
    title: "Coordinate the handoff",
    description: "Dispatch needs the final quantity. Your team fills the gaps with messages, checks and context.",
  },
  {
    title: "Chase the approval",
    description: "The extra units need sign-off. Someone has to find the owner, follow up and keep everyone moving.",
  },
] as const;

export function ProblemTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const playback = usePresentationPlayback(steps.length, containerRef);

  return (
    <div ref={containerRef} className={`${layout.frame} ${styles.section}`} {...playback.focusProps}>
      <div className={`${layout.copy} ${styles.copy}`}>
        <PresentationChoices
          items={steps}
          active={playback.active}
          onSelect={playback.select}
          label="Stitching tools together"
          tone="light"
        />
        <PresentationPlayback labels={steps.map((step) => step.title)} playback={playback} name="Problem timeline" />
      </div>
      <div className="system-pain__visual">
        <OperationsSystem embedded animateBefore />
      </div>
    </div>
  );
}

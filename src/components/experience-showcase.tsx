"use client";

import { useState, type KeyboardEvent } from "react";
import { AdaptPreview, AttentionPreview, PlatformActionPreview, PlatformWorkspacePreview } from "./platform-previews";
import styles from "./home-narrative.module.css";

const benefits = [
  {
    id: "attention",
    title: "Know what matters.",
    text: "See pending tasks, exceptions, and approvals without searching across systems.",
    Preview: AttentionPreview,
  },
  {
    id: "interfaces",
    title: "Work your way.",
    text: "Use the right interface for the task, from tables and boards to focused workspaces.",
    Preview: PlatformWorkspacePreview,
  },
  {
    id: "actions",
    title: "Act with confidence.",
    text: "Make decisions and take action within your business rules, permissions, and approvals.",
    Preview: PlatformActionPreview,
  },
  {
    id: "adapt",
    title: "Adapt as operations change.",
    text: "When a process changes, its stages, rules, and workflows change with it.",
    Preview: AdaptPreview,
  },
] as const;

/** The four benefits of the product experience, each shown on a working mockup. */
export function ExperienceShowcase() {
  const [active, setActive] = useState(0);
  const { Preview } = benefits[active];
  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    let next = index;
    if (event.key === "ArrowRight") next = (index + 1) % benefits.length;
    else if (event.key === "ArrowLeft") next = (index + benefits.length - 1) % benefits.length;
    else return;
    event.preventDefault();
    setActive(next);
    document.getElementById(`experience-tab-${benefits[next].id}`)?.focus();
  };
  return (
    <div className={styles.experience}>
      <div className={styles.benefits} role="tablist" aria-label="What your team can do">
        {benefits.map((benefit, i) => (
          <button
            key={benefit.id}
            id={`experience-tab-${benefit.id}`}
            type="button"
            role="tab"
            aria-selected={active === i}
            aria-controls="experience-panel"
            tabIndex={active === i ? 0 : -1}
            onClick={() => setActive(i)}
            onKeyDown={(event) => onKeyDown(event, i)}
          >
            <strong>{benefit.title}</strong>
            <span>{benefit.text}</span>
          </button>
        ))}
      </div>
      <div
        id="experience-panel"
        role="tabpanel"
        aria-labelledby={`experience-tab-${benefits[active].id}`}
        className={styles.experienceStage}
      >
        <Preview key={benefits[active].id} />
      </div>
    </div>
  );
}

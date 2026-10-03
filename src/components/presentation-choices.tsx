"use client";

import styles from "./presentation-choices.module.css";

export function PresentationChoices({
  items,
  active,
  onSelect,
  label,
  controls,
  tone = "dark",
}: {
  items: readonly { title: string; description: string }[];
  active: number;
  onSelect: (index: number) => void;
  label: string;
  controls?: string;
  tone?: "light" | "dark";
}) {
  return (
    <div className={`${styles.navigation} ${tone === "light" ? styles.light : ""}`} role="group" aria-label={label}>
      {items.map((item, index) => (
        <button
          type="button"
          key={item.title}
          className={styles.option}
          aria-pressed={active === index}
          aria-expanded={active === index}
          aria-controls={controls}
          onClick={() => onSelect(index)}
        >
          <strong>{item.title}</strong>
          <span className={styles.details} aria-hidden={active !== index}>
            <span className={styles.detailsText}>{item.description}</span>
          </span>
        </button>
      ))}
    </div>
  );
}

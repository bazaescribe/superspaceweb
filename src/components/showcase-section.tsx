import type { ReactNode } from "react";
import { EntranceHeading } from "./entrance-heading";
import styles from "./showcase-section.module.css";

/** Shared marketing article: copy, a visual stage, and optional supporting content. */
export function ShowcaseSection({
  id,
  eyebrow,
  title,
  description,
  children,
  footer,
}: {
  id: string;
  eyebrow?: string;
  title: string;
  description: ReactNode;
  children: ReactNode;
  footer?: ReactNode;
}) {
  return (
    <section id={id} className={styles.section} aria-labelledby={`${id}-title`}>
      <header className={styles.copy}>
        {eyebrow && <p className={styles.eyebrow}>{eyebrow}</p>}
        <EntranceHeading id={`${id}-title`}>{title}</EntranceHeading>
        <p>{description}</p>
      </header>
      <div className={styles.stage}>{children}</div>
      {footer && <div className={styles.footer}>{footer}</div>}
    </section>
  );
}

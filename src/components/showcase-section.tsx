import type { ReactNode } from "react";
import { useCopy } from "@/i18n/copy";
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
  const localizeCopy = useCopy();
  return (
    <section id={id} className={styles.section} aria-labelledby={`${id}-title`}>
      <header className={styles.copy}>
        {eyebrow && <p className={styles.eyebrow}>{localizeCopy(eyebrow)}</p>}
        <EntranceHeading id={`${id}-title`}>{localizeCopy(title)}</EntranceHeading>
        <p>{localizeCopy(description)}</p>
      </header>
      <div className={styles.stage}>{children}</div>
      {footer && <div className={styles.footer}>{footer}</div>}
    </section>
  );
}

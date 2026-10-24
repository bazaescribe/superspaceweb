import { useCopy } from "@/i18n/copy";
import type { ReactNode } from "react";
import { EntranceHeading } from "./entrance-heading";
import styles from "./showcase-section.module.css";

/** Shared marketing article: copy, a visual stage, and optional supporting content. */
export function ShowcaseSection({
  id,
  title,
  description,
  children,
  footer,
}: {
  id: string;
  title: string;
  description: string;
  children: ReactNode;
  footer?: ReactNode;
}) {
  const localizeCopy = useCopy();
  return (
    <section id={id} className={styles.section} aria-labelledby={`${id}-title`}>
      <header className={styles.copy}>
        <EntranceHeading id={`${id}-title`}>{localizeCopy(title)}</EntranceHeading>
        <p>{localizeCopy(description)}</p>
      </header>
      <div className={styles.stage}>{localizeCopy(children)}</div>
      {footer && <div className={styles.footer}>{localizeCopy(footer)}</div>}
    </section>
  );
}

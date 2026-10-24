import { useCopy } from "@/i18n/copy";
import { HeroHeading } from "@/components/entrance-heading";
import type { ReactNode } from "react";
import styles from "./site-hero.module.css";

/** Full-width blueprint field; product previews retain the site's 7xl container. */
export function HeroBlueprint({
  children,
  hasActions = false,
  colorful = false,
}: {
  children?: ReactNode;
  hasActions?: boolean;
  colorful?: boolean;
}) {
  const localizeCopy = useCopy();
  return (
    <div
      className={`hero-product ${colorful ? styles.colorfulField : ""} ${children ? "" : `${styles.compactField} ${hasActions ? styles.withActions : ""}`}`}
    >
      <div className="hero-point-field" aria-hidden="true" />
      {localizeCopy(children)}
    </div>
  );
}

export function SiteHero({
  title,
  intro,
  actions,
  variant = "page",
  visual,
}: {
  title: ReactNode;
  intro?: ReactNode;
  actions?: ReactNode;
  variant?: "home" | "page" | "platform";
  visual?: ReactNode;
}) {
  const localizeCopy = useCopy();
  return (
    <>
      <section
        className={`${styles.content} shell ${variant === "home" ? styles.home : variant === "platform" ? styles.platform : ""}`}
        id="top"
      >
        <div className={styles.copy}>
          <HeroHeading className={styles.title}>{localizeCopy(title)}</HeroHeading>
          {intro && <p className={styles.intro}>{localizeCopy(intro)}</p>}
          {actions && <div className="hero-actions">{localizeCopy(actions)}</div>}
        </div>
      </section>
      {localizeCopy(
        variant === "home" ? visual : <HeroBlueprint hasActions={Boolean(actions)} colorful={variant === "platform"} />,
      )}
    </>
  );
}

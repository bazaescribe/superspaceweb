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
  return (
    <div
      className={`hero-product ${colorful ? styles.colorfulField : ""} ${children ? "" : `${styles.compactField} ${hasActions ? styles.withActions : ""}`}`}
    >
      <div className="hero-point-field" aria-hidden="true" />
      {children}
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
  return (
    <>
      <section
        className={`${styles.content} shell ${variant === "home" ? styles.home : variant === "platform" ? styles.platform : ""}`}
        id="top"
      >
        <div className={styles.copy}>
          <h1 className={styles.title}>{title}</h1>
          {intro && <p className={styles.intro}>{intro}</p>}
          {actions && <div className="hero-actions">{actions}</div>}
        </div>
      </section>
      {variant === "home" ? visual : <HeroBlueprint hasActions={Boolean(actions)} colorful={variant === "platform"} />}
    </>
  );
}

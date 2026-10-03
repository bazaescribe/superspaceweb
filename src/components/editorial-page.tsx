import styles from "./editorial-page.module.css";
import { SiteHero } from "@/components/site-hero";
import type { ReactNode } from "react";
import Image from "next/image";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { BookingLink } from "@/components/booking-link";

export const container = "mx-auto w-[calc(100%-var(--site-gutter)*2)] max-w-content";

export function EditorialPage({
  title,
  intro,
  children,
  visual,
}: {
  eyebrow: string;
  title: ReactNode;
  intro: string;
  children: ReactNode;
  visual?: ReactNode;
}) {
  return (
    <div className={`site-v2 bg-canvas text-foreground ${styles.page}`}>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <Header />
      <main id="main-content">
        <SiteHero title={title} intro={intro} />
        {visual && <div className={`${container} mb-section`}>{visual}</div>}
        {children}
      </main>
      <Footer />
    </div>
  );
}

export function EditorialSection({
  number,
  title,
  children,
  id,
  tone = "light",
  visual,
}: {
  number?: string;
  title: ReactNode;
  children: ReactNode;
  id?: string;
  tone?: "light" | "dark" | "warm";
  visual?: ReactNode;
}) {
  return (
    <section
      className={`${container} ${styles.section} ${styles[tone]} ${tone === "dark" ? "text-inverse" : ""}`}
      id={id}
    >
      <div className={styles.layout}>
        <div className={styles.heading}>
          {number && (
            <span className={`mb-5 block text-label ${tone === "dark" ? "text-inverse-muted" : "text-muted"}`}>
              {number} /
            </span>
          )}
          <h2
            className={`max-w-reading text-section ${tone === "dark" ? "[&_span]:text-inverse-muted" : "[&_span]:text-muted"}`}
          >
            {title}
          </h2>
        </div>
        <div
          className={`min-w-0 space-y-5 text-body ${tone === "dark" ? "text-inverse-muted [&_.text-foreground]:text-inverse" : "text-muted"}`}
        >
          {children}
        </div>
      </div>
      {visual && <div className="mt-10 md:mt-12">{visual}</div>}
    </section>
  );
}

export function EditorialCta({
  title,
  text = "Bring us one operation that no longer fits its tools. We’ll determine whether Superspace is the right foundation for it.",
}: {
  title: string;
  text?: string;
}) {
  return (
    <section className={`${container} ${styles.cta} relative isolate overflow-hidden bg-dark text-inverse`}>
      <Image
        src="/assets/figma/conversation-background.png"
        alt=""
        fill
        sizes="(max-width: 1280px) 100vw, 1280px"
        className="-z-20 object-cover"
      />
      <div className="absolute inset-0 -z-10 bg-black/40" />
      <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
        <div className="max-w-reading">
          <h2 className="text-display">{title}</h2>
          <p className="mt-4 max-w-xl text-body text-inverse-muted">{text}</p>
        </div>
        <BookingLink inverse placement="editorial_cta" />
      </div>
    </section>
  );
}

export function ProductFrame({ children, label, note }: { children: ReactNode; label: string; note?: string }) {
  return (
    <figure className={`${styles.frame} m-0 min-w-0 overflow-hidden bg-surface text-foreground`}>
      <figcaption className="flex items-center justify-between gap-4 border-x-0 border-t-0 border-b border-solid border-subtle px-5 py-4 text-label">
        <span>{label}</span>
        <span className="text-muted">Illustrative view</span>
      </figcaption>
      {children}
      {note && <p className="px-5 pb-5 text-label text-muted">{note}</p>}
    </figure>
  );
}

export function ProcessSteps({ steps }: { steps: readonly (readonly [string, string])[] }) {
  return (
    <ol className={styles.steps} tabIndex={0} aria-label="Process steps">
      {steps.map(([title, copy], index) => (
        <li key={title} className={styles.step}>
          <span className="text-label text-muted">0{index + 1}</span>
          <h3 className="text-feature text-foreground">{title}</h3>
          <p className="text-body text-muted">{copy}</p>
        </li>
      ))}
    </ol>
  );
}

import { useCopy } from "@/i18n/copy";
import { EntranceHeading } from "@/components/entrance-heading";
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
  const localizeCopy = useCopy();
  return (
    <div className={`site-v2 bg-canvas text-foreground ${styles.page}`}>
      <a className="skip-link" href="#main-content">
        {localizeCopy("Skip to content")}
      </a>
      <Header />
      <main id="main-content">
        <SiteHero title={localizeCopy(title)} intro={intro} />
        {visual && <div className={`${container} mb-section`}>{localizeCopy(visual)}</div>}
        {localizeCopy(children)}
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
  const localizeCopy = useCopy();
  return (
    <section
      className={`${container} ${styles.section} ${styles[tone]} ${tone === "dark" ? "text-inverse" : ""}`}
      id={id}
    >
      <div className={styles.layout}>
        <div className={styles.heading}>
          {number && (
            <span className={`mb-5 block text-label ${tone === "dark" ? "text-inverse-muted" : "text-muted"}`}>
              {localizeCopy(number)} {"/"}
            </span>
          )}
          <EntranceHeading
            className={`max-w-reading text-section ${tone === "dark" ? "[&_span]:text-inverse-muted" : "[&_span]:text-muted"}`}
          >
            {localizeCopy(title)}
          </EntranceHeading>
        </div>
        <div
          className={`min-w-0 space-y-5 text-body ${tone === "dark" ? "text-inverse-muted [&_.text-foreground]:text-inverse" : "text-muted"}`}
        >
          {localizeCopy(children)}
        </div>
      </div>
      {visual && <div className="mt-10 md:mt-12">{localizeCopy(visual)}</div>}
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
  const localizeCopy = useCopy();
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
          <EntranceHeading className="text-display">{localizeCopy(title)}</EntranceHeading>
          <p className="mt-4 max-w-xl text-body text-inverse-muted">{localizeCopy(text)}</p>
        </div>
        <BookingLink inverse placement="editorial_cta" />
      </div>
    </section>
  );
}

export function ProductFrame({ children, label, note }: { children: ReactNode; label: string; note?: string }) {
  const localizeCopy = useCopy();
  return (
    <figure className={`${styles.frame} m-0 min-w-0 overflow-hidden bg-surface text-foreground`}>
      <figcaption className="flex items-center justify-between gap-4 border-x-0 border-t-0 border-b border-solid border-subtle px-5 py-4 text-label">
        <span>{localizeCopy(label)}</span>
        <span className="text-muted">{localizeCopy("Illustrative view")}</span>
      </figcaption>
      {localizeCopy(children)}
      {note && <p className="px-5 pb-5 text-label text-muted">{localizeCopy(note)}</p>}
    </figure>
  );
}

export function ProcessSteps({ steps }: { steps: readonly (readonly [string, string])[] }) {
  const localizeCopy = useCopy();
  return (
    <ol className={styles.steps} tabIndex={0} aria-label={localizeCopy("Process steps")}>
      {steps.map(([title, copy], index) => (
        <li key={title} className={styles.step}>
          <span className="text-label text-muted">
            {"0"}
            {localizeCopy(index + 1)}
          </span>
          <h3 className="text-feature text-foreground">{localizeCopy(title)}</h3>
          <p className="text-body text-muted">{localizeCopy(copy)}</p>
        </li>
      ))}
    </ol>
  );
}

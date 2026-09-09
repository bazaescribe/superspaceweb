import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { Brand, Header } from "@/components/header";
import { BookingLink } from "@/components/booking-link";
import { footerGroups } from "@/lib/site";

export const container = "mx-auto w-[calc(100%-var(--site-gutter)*2)] max-w-content";

export function EditorialPage({
  eyebrow: label,
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
    <div className="site-v2 bg-canvas text-foreground">
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <Header />
      <main id="main-content">
        <header className={`${container} pt-hero pb-12 md:pb-16`}>
          <p className="mb-6 flex items-center gap-3 text-label text-muted">
            <span className="h-1.5 w-1.5 bg-foreground" aria-hidden="true" />
            {label}
          </p>
          <div className="grid gap-6 md:grid-cols-12 md:gap-12">
            <h1 className="max-w-reading text-display md:col-span-7 [&_span]:text-muted">{title}</h1>
            <p className="max-w-reading text-body text-muted md:col-span-5">{intro}</p>
          </div>
          {visual && <div className="mt-10 md:mt-16">{visual}</div>}
        </header>
        {children}
      </main>
      <SiteFooter />
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
  const surface =
    tone === "dark"
      ? "rounded-panel bg-dark p-6 text-inverse md:p-12"
      : tone === "warm"
        ? "rounded-panel bg-surface p-6 md:p-12"
        : "border-t border-solid border-x-0 border-b-0 border-subtle pt-8 md:pt-10";
  return (
    <section className={`${container} mb-section ${surface}`} id={id}>
      <div className="grid gap-8 md:grid-cols-12 md:gap-12">
        <div className="md:col-span-4">
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
          className={`min-w-0 space-y-5 text-body md:col-span-8 ${tone === "dark" ? "text-inverse-muted [&_.text-foreground]:text-inverse" : "text-muted"}`}
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
    <section
      className={`${container} relative isolate mb-8 overflow-hidden rounded-panel bg-dark px-6 py-16 text-inverse md:px-12 md:py-24`}
    >
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
    <figure className="m-0 min-w-0 overflow-hidden rounded-panel border border-solid border-subtle bg-surface text-foreground shadow-panel">
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
    <ol className="m-0 list-none p-0">
      {steps.map(([title, copy], index) => (
        <li
          key={title}
          className="grid grid-cols-[2rem_1fr] gap-4 border-x-0 border-b-0 border-t border-solid border-subtle py-6 first:border-t-0 first:pt-0 md:grid-cols-[2rem_1fr_1.4fr] md:gap-6"
        >
          <span className="text-label text-muted">0{index + 1}</span>
          <h3 className="text-feature text-foreground">{title}</h3>
          <p className="col-start-2 text-body text-muted md:col-start-auto">{copy}</p>
        </li>
      ))}
    </ol>
  );
}

export function SiteFooter() {
  return (
    <footer className="v2-footer shell">
      <div className="v2-footer__top">
        <div className="v2-footer__identity">
          Superspace Industries
          <br />
          Operational software
          <br />
          Mexico City / MX
          <br />
          Est. 2024
        </div>
        {footerGroups.map((group) => (
          <div className="v2-footer__group" key={group.title}>
            <span>{group.title}</span>
            {group.links.map((link) => (
              <Link href={link.href} key={link.href}>
                {link.label}
              </Link>
            ))}
          </div>
        ))}
        <div className="v2-footer__actions">
          <span className="language">English · Español soon</span>
        </div>
      </div>
      <Brand large />
    </footer>
  );
}

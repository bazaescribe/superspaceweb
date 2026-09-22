"use client";

import type { ReactNode } from "react";
import { useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

type Item = { title: string; description: string; visual: ReactNode };

export function SectionHeader({
  primary,
  accent,
  action,
}: {
  primary: string;
  accent: string;
  action?: { label: string; href: string };
}) {
  return (
    <header className="system-section__header">
      <h2>
        {primary} <span>{accent}</span>
      </h2>
      {action && (
        <Link href={action.href} className="system-section__action">
          {action.label}
        </Link>
      )}
    </header>
  );
}

export function SectionBuffer() {
  return <div className="system-section__buffer" aria-hidden="true" />;
}

export function SystemSection({
  primary,
  accent,
  action,
  children,
}: {
  primary: string;
  accent: string;
  action?: { label: string; href: string };
  children: ReactNode;
}) {
  return (
    <section className="system-section">
      <SectionHeader primary={primary} accent={accent} action={action} />
      {children}
      <SectionBuffer />
    </section>
  );
}

function useSelection(length: number, interval?: number, canAdvance = true) {
  const [active, setActive] = useState(0);
  const [cycle, setCycle] = useState(0);
  useEffect(() => {
    if (!interval || length < 2 || !canAdvance) return;
    const timer = window.setTimeout(() => {
      setActive((value) => (value + 1) % length);
      setCycle((value) => value + 1);
    }, interval);
    return () => window.clearTimeout(timer);
  }, [active, canAdvance, cycle, interval, length]);
  const select = (index: number) => {
    setActive(index);
    setCycle((value) => value + 1);
  };
  return { active, select, cycle };
}

export function SplitContent({ items, interval }: { items: readonly Item[]; interval?: number }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    if (!interval || !sectionRef.current) return;
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0 });
    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [interval]);
  const { active, select, cycle } = useSelection(items.length, interval, !interval || inView);
  const id = useId();
  const reduceMotion = useReducedMotion();
  return (
    <div className="system-split" ref={sectionRef}>
      <div className="system-split__choices" role="group" aria-label="Select content">
        {items.map((item, index) => (
          <button
            type="button"
            key={item.title}
            className="system-choice"
            aria-pressed={active === index}
            aria-controls={`${id}-visual`}
            onClick={() => select(index)}
          >
            <strong>{item.title}</strong>
            <span className="system-choice__details" aria-hidden={active !== index}>
              <span className="system-choice__details-inner">{item.description}</span>
              {interval && active === index && inView && (
                <i
                  key={`${cycle}-${inView}`}
                  className="system-choice__progress"
                  style={{ animationDuration: `${interval}ms` }}
                />
              )}
            </span>
          </button>
        ))}
      </div>
      <div className="system-split__visual" id={`${id}-visual`} aria-live="polite">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={active}
            className="system-split__visual-state"
            initial={reduceMotion ? false : { opacity: 0, y: 12, filter: "blur(5px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={reduceMotion ? undefined : { opacity: 0, y: -8, filter: "blur(4px)" }}
            transition={{ duration: reduceMotion ? 0 : 0.38, ease: [0.22, 0.86, 0.24, 1] }}
          >
            {items[active]?.visual}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

export function HorizontalSelection({ items }: { items: readonly Item[] }) {
  const { active, select } = useSelection(items.length);
  const id = useId();
  return (
    <div className="system-large">
      <div className="system-large__tabs" role="tablist" aria-label="Implementation stages">
        {items.map((item, index) => (
          <button
            type="button"
            role="tab"
            aria-selected={active === index}
            aria-controls={`${id}-panel`}
            key={item.title}
            onClick={() => select(index)}
          >
            <strong>{item.title}</strong>
            <span>{item.description}</span>
          </button>
        ))}
      </div>
      <div className="system-large__visual" role="tabpanel" id={`${id}-panel`}>
        {items[active]?.visual}
      </div>
    </div>
  );
}

export function CardCarousel({
  cards,
}: {
  cards: readonly { title: string; description: string; visual: ReactNode; wide?: boolean }[];
}) {
  return (
    <div className="system-carousel" aria-label="Offerings" tabIndex={0}>
      {cards.map((card) => (
        <article className={`system-card ${card.wide ? "system-card--wide" : ""}`} key={card.title}>
          <div className="system-card__copy">
            <h3>{card.title}</h3>
            <p>{card.description}</p>
          </div>
          <div className="system-card__visual">{card.visual}</div>
        </article>
      ))}
    </div>
  );
}

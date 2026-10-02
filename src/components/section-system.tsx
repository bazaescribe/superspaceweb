"use client";

import type { ReactNode } from "react";
import { useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { RevealTitle } from "./reveal-title";
import { ShimmerAccent } from "./shimmer-accent";

type Item = { title: string; description: string; visual: ReactNode };

export function SectionHeader({
  primary,
  accent,
  action,
  expressive,
}: {
  primary: string;
  accent: string;
  action?: { label: string; href: string };
  expressive?: boolean;
}) {
  return (
    <header className="system-section__header">
      <RevealTitle>
        {primary} {expressive ? <ShimmerAccent>{accent}</ShimmerAccent> : <span>{accent}</span>}
      </RevealTitle>
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

type SystemSectionProps = {
  children: ReactNode;
  className?: string;
  buffer?: boolean;
} & (
  | {
      variant?: "standard";
      primary: string;
      accent: string;
      action?: { label: string; href: string };
      expressive?: boolean;
    }
  | { variant: "custom"; header: ReactNode }
);

export function SystemSection(props: SystemSectionProps) {
  return (
    <section className={`system-section ${props.className ?? ""}`}>
      {props.variant === "custom" ? (
        props.header
      ) : (
        <SectionHeader
          primary={props.primary}
          accent={props.accent}
          action={props.action}
          expressive={props.expressive}
        />
      )}
      {props.children}
      {props.buffer !== false && <SectionBuffer />}
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

export function SplitContent({
  items,
  interval,
  variant = "standard",
}: {
  items: readonly Item[];
  interval?: number;
  variant?: "steps" | "standard";
}) {
  const reduceMotion = useReducedMotion();
  const [playing, setPlaying] = useState(true);
  const [pageVisible, setPageVisible] = useState(true);
  const [stepActive, setStepActive] = useState(0);
  const [stepCycle, setStepCycle] = useState(0);
  const progressRef = useRef<SVGCircleElement>(null);
  const elapsed = useRef(0);
  useEffect(() => {
    const update = () => setPageVisible(!document.hidden);
    update();
    document.addEventListener("visibilitychange", update);
    return () => document.removeEventListener("visibilitychange", update);
  }, []);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    if (!interval || !sectionRef.current) return;
    const threshold = variant === "steps" ? 0.2 : 0;
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting && entry.intersectionRatio >= threshold),
      { threshold, rootMargin: variant === "steps" ? "-64px 0px 0px" : "0px" },
    );
    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [interval, variant]);
  const canPlay = playing && inView && pageVisible && !reduceMotion;
  useEffect(() => {
    if (variant !== "steps" || !interval || !canPlay || items.length < 2) return;
    let frame: number;
    let previous = performance.now();
    const tick = (now: number) => {
      elapsed.current += now - previous;
      previous = now;
      if (elapsed.current >= interval) {
        elapsed.current = 0;
        setStepActive((value) => (value + 1) % items.length);
        setStepCycle((value) => value + 1);
      }
      progressRef.current?.style.setProperty("stroke-dashoffset", String(100 * (1 - elapsed.current / interval)));
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [canPlay, interval, items.length, variant]);
  const selection = useSelection(items.length, variant === "steps" ? undefined : interval, !interval || inView);
  const active = variant === "steps" ? stepActive : selection.active;
  const cycle = variant === "steps" ? stepCycle : selection.cycle;
  const select = (index: number) => {
    if (variant !== "steps") return selection.select(index);
    elapsed.current = 0;
    progressRef.current?.style.setProperty("stroke-dashoffset", "100");
    setStepActive(index);
    setStepCycle((value) => value + 1);
  };
  const id = useId();
  return (
    <div className={`system-split ${variant === "steps" ? "system-split--steps" : ""}`} ref={sectionRef}>
      <div className="system-split__sidebar">
        <div className="system-split__choices" role="group" aria-label="Select content">
          {items.map((item, index) => (
            <button
              type="button"
              key={item.title}
              className="system-choice"
              aria-pressed={active === index}
              aria-expanded={active === index}
              aria-controls={`${id}-visual`}
              onClick={() => select(index)}
            >
              <strong>{item.title}</strong>
              <span className="system-choice__details" aria-hidden={active !== index}>
                <span className="system-choice__details-inner">{item.description}</span>
                {variant !== "steps" && interval && active === index && inView && (
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
        {variant === "steps" && interval && (
          <button
            type="button"
            className="system-split__playback"
            aria-label={playing && !reduceMotion ? "Stop automatic steps" : "Play automatic steps"}
            onClick={() => setPlaying((value) => !value)}
            disabled={!!reduceMotion}
          >
            <svg viewBox="0 0 42 42" aria-hidden="true">
              <circle cx="21" cy="21" r="19" className="system-split__track" />
              <circle ref={progressRef} cx="21" cy="21" r="19" pathLength="100" className="system-split__ring" />
            </svg>
            <span aria-hidden="true">
              {playing && !reduceMotion ? <i className="system-split__stop" /> : <i className="system-split__start" />}
            </span>
          </button>
        )}
      </div>
      <div
        className="system-split__visual"
        id={`${id}-visual`}
        aria-live={variant === "steps" && canPlay ? "off" : "polite"}
      >
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

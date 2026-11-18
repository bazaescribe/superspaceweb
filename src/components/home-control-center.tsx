"use client";

import { useEffect, useRef, useState, type CSSProperties, type PointerEvent, type ReactNode } from "react";
import {
  ArrowClockwise,
  ArrowRight,
  ArrowUpRight,
  CaretDown,
  Check,
  CheckCircle,
  CircleNotch,
  DotsThree,
  Funnel,
  Microphone,
  Plus,
  Sparkle,
} from "@phosphor-icons/react";
import { motion } from "motion/react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { useCopy } from "@/i18n/copy";
import Image from "next/image";
import { PreviewTag } from "./preview-ui";
import { WorkspaceSidebar } from "./workspace-shell";
import styles from "./home-control-center.module.css";

/* Frame geometry: the control center is authored at 1280px and scaled to its container. */
const CANVAS_WIDTH = 1128;
const CANVAS_HEIGHT = 733;

/* Entrance order (ms). Title first, the summary starts loading, then each section follows in ~300ms steps. */
const enterAt = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;

/* The summary is loading until `typing`; the inspector follows the summary. */
const STAGES = ["typing", "asking", "sent", "step1", "step2", "step3", "answer", "review"] as const;
type Stage = (typeof STAGES)[number];
const stageIndex = (stage: Stage) => STAGES.indexOf(stage);
const SUMMARY =
  "5 orders are overdue. Two still need a driver: ORD-1045 and ORD-1037. Review their assignments before dispatch.";
const QUESTION = "Help me resolve the assignment gaps in these overdue orders.";
const ANSWER = "Two drivers have capacity for these orders. Review the proposed assignments below.";
const WORKED_SECONDS = 6;
const STEPS = ["Reviewed 5 overdue orders", "Checked driver availability", "2 assignments ready for review"];

/* Daily counts for the last five days. "All Orders" is the total, so the statuses never add up to more. */
const chartDays = ["Sun 1", "Mon 2", "Tue 3", "Yesterday", "Today"];
const series = [
  { name: "All Orders", color: "#fafaf9", values: [58, 62, 70, 76, 82] },
  { name: "Completed", color: "#00bc7d", values: [12, 18, 22, 28, 38] },
  { name: "In progress", color: "#f0ac00", values: [24, 30, 27, 33, 29] },
  { name: "Confirmed", color: "#ff5c5c", values: [14, 11, 16, 13, 9] },
];

/* Plot geometry in SVG units (the chart is rendered 1:1 at the card's inner width). */
const PLOT = { left: 36, right: 524, top: 14, bottom: 160, max: 90 };
const plotX = (i: number) => PLOT.left + (i * (PLOT.right - PLOT.left)) / (chartDays.length - 1);
const plotY = (value: number) => PLOT.bottom - (value / PLOT.max) * (PLOT.bottom - PLOT.top);

type Tone = "red" | "amber" | "green" | "blue" | "neutral";
type Row = {
  id: string;
  title: string;
  meta: string;
  tag: string;
  tone: Tone;
  assignment?: { label: string; tone: Tone };
};
type Tab = "Orders" | "Drivers" | "Locations";
const tabs: Tab[] = ["Orders", "Drivers", "Locations"];
const tabCards: Record<Tab, { heading: string; rows: Row[] }> = {
  Orders: {
    heading: "Overdue Orders",
    rows: [
      {
        id: "ORD-1045",
        title: "Casa Lumen",
        meta: "Unassigned · due 2:00 PM",
        assignment: { label: "Unassigned", tone: "amber" },
        tag: "Overdue",
        tone: "red",
      },
      {
        id: "ORD-1037",
        title: "Norte Home",
        meta: "Unassigned · Zone North",
        assignment: { label: "Unassigned", tone: "amber" },
        tag: "Overdue",
        tone: "red",
      },
      {
        id: "ORD-1032",
        title: "Riverside Foods",
        meta: "Driver conflict · Route R-04",
        assignment: { label: "Driver Conflict", tone: "red" },
        tag: "Overdue",
        tone: "red",
      },
      {
        id: "ORD-1029",
        title: "Harbor Market",
        meta: "Assigned · awaiting dispatch",
        assignment: { label: "Driver: Marco López", tone: "green" },
        tag: "Overdue",
        tone: "red",
      },
      {
        id: "ORD-1026",
        title: "Pacífico Supply",
        meta: "Assigned · due 1:30 PM",
        assignment: { label: "Driver: Javier Velazquez", tone: "green" },
        tag: "Overdue",
        tone: "red",
      },
    ],
  },
  Drivers: {
    heading: "Driver capacity",
    rows: [
      { id: "Jorge Ramírez", title: "4 routes · 2 open stops", meta: "Available now", tag: "Available", tone: "green" },
      { id: "María López", title: "5 routes · at capacity", meta: "Route R-08", tag: "Full", tone: "amber" },
      {
        id: "Lucía Méndez",
        title: "2 routes · 1 open stop",
        meta: "Available now · Zone North",
        tag: "Available",
        tone: "green",
      },
    ],
  },
  Locations: {
    heading: "Zone coverage",
    rows: [
      { id: "Zone North", title: "3 overdue orders", meta: "1 driver available nearby", tag: "Gap", tone: "red" },
      { id: "Central", title: "1 order at risk", meta: "Covered by 2 routes", tag: "Watch", tone: "amber" },
      { id: "Zone South", title: "All deliveries on time", meta: "No gaps detected", tag: "Covered", tone: "green" },
    ],
  },
};

/** Types text character by character with natural pauses after punctuation. */
function useTyped(text: string, active: boolean, reduced: boolean, speed: number) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!active || reduced || count >= text.length) return;
    const pause = /[.,;:]/.test(text[count]) ? 7 : 1;
    const jitter = 0.8 + ((count * 37) % 11) / 25;
    const timer = window.setTimeout(() => setCount((value) => value + 1), speed * pause * jitter);
    return () => window.clearTimeout(timer);
  }, [active, count, text, reduced, speed]);
  return {
    shown: reduced ? text : text.slice(0, count),
    done: reduced || count >= text.length,
  };
}

function useElapsedSeconds(active: boolean) {
  const [seconds, setSeconds] = useState(0);
  useEffect(() => {
    if (!active) return;
    const timer = window.setInterval(() => setSeconds((value) => value + 1), 1000);
    return () => window.clearInterval(timer);
  }, [active]);
  return seconds;
}

export function HomeControlCenter() {
  const localizeCopy = useCopy();
  const [run, setRun] = useState(0);
  const reduced = useReducedMotion();
  const frame = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  useEffect(() => {
    const element = frame.current;
    if (!element) return;
    const observer = new ResizeObserver(([entry]) => {
      setScale(Math.min(1, Math.max(0.6, entry.contentRect.width / CANVAS_WIDTH)));
    });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);
  return (
    <div className={styles.frame} ref={frame} style={{ height: CANVAS_HEIGHT * scale }}>
      <div
        className={styles.canvas}
        style={{ transform: `scale(${scale})` }}
        role="img"
        aria-label={localizeCopy(
          "Superspace home: an AI summary of today's operation, progress charts, overdue orders and the Superspace AI inspector",
        )}
      >
        <ControlCenter key={run} reduced={reduced} onReplay={() => setRun((value) => value + 1)} />
      </div>
    </div>
  );
}

/** The inspector's own sequence. Each step waits for the one before it, so typing and steps never overlap. */
function nextAfter(
  stage: Stage,
  done: { summary: boolean; question: boolean; answer: boolean },
): { stage: Stage; delay: number } | null {
  switch (stage) {
    case "typing":
      return done.summary ? { stage: "asking", delay: 500 } : null;
    case "asking":
      return done.question ? { stage: "sent", delay: 600 } : null;
    case "sent":
      return { stage: "step1", delay: 500 };
    case "step1":
      return { stage: "step2", delay: 1000 };
    case "step2":
      return { stage: "step3", delay: 1000 };
    case "step3":
      return { stage: "answer", delay: 900 };
    case "answer":
      return done.answer ? { stage: "review", delay: 700 } : null;
    default:
      return null;
  }
}

function ControlCenter({ reduced, onReplay }: { reduced: boolean; onReplay: () => void }) {
  const localizeCopy = useCopy();
  const [stage, setStage] = useState<Stage | null>(null);
  const current = reduced ? "review" : stage;
  const reached = (name: Stage) => (current ? stageIndex(current) >= stageIndex(name) : false);
  const [tab, setTab] = useState<Tab>("Orders");
  const [inspectorTab, setInspectorTab] = useState<"Shortcuts" | "Superspace AI">("Superspace AI");
  const [applied, setApplied] = useState(false);
  const [view, setView] = useState<"dashboard" | "assistant">("dashboard");
  const summary = { shown: localizeCopy(SUMMARY), done: true };
  const question = useTyped(localizeCopy(QUESTION), reached("asking") && !reached("sent"), reduced, 28);
  const answer = useTyped(localizeCopy(ANSWER), reached("answer"), reduced, 18);
  const elapsed = useElapsedSeconds(reached("step1") && !reached("review"));
  // Reduced motion skips the run, so it reports the length a full run takes.
  const seconds = reduced ? WORKED_SECONDS : elapsed;
  const thread = useRef<HTMLDivElement>(null);

  // The main space animates first; the inspector starts once the summary has finished typing.
  useEffect(() => {
    if (reduced) return;
    const timer = window.setTimeout(() => setStage("asking"), 1800);
    return () => window.clearTimeout(timer);
  }, [reduced]);

  // New messages keep the latest reply in view, as a chat does.
  useEffect(() => {
    thread.current?.scrollTo({ top: thread.current.scrollHeight, behavior: "smooth" });
  }, [current, answer.shown]);

  useEffect(() => {
    if (reduced || !stage) return;
    const next = nextAfter(stage, { summary: summary.done, question: question.done, answer: answer.done });
    if (!next) return;
    const timer = window.setTimeout(() => setStage(next.stage), next.delay);
    return () => window.clearTimeout(timer);
  }, [reduced, stage, summary.done, question.done, answer.done]);

  return (
    <div className={styles.control} data-view={view}>
      <WorkspaceSidebar
        active="Home"
        onNavigate={() => {}}
        organization="Aliada"
        organizationSubtitle={localizeCopy("Work")}
        businessLogo="/assets/figma/logos/Logo-Aliada.png"
        userName="Ana Torres"
        userEmail="ana@aliada.example"
      />
      <div className={styles.mobileSwitch} role="tablist" aria-label={localizeCopy("Home sections")}>
        <button
          role="tab"
          aria-selected={view === "dashboard"}
          className={view === "dashboard" ? styles.tabActive : undefined}
          onClick={() => setView("dashboard")}
        >
          {localizeCopy("Dashboard")}
        </button>
        <button
          role="tab"
          aria-selected={view === "assistant"}
          className={view === "assistant" ? styles.tabActive : undefined}
          onClick={() => setView("assistant")}
        >
          <Sparkle size={12} weight="fill" />
          Superspace AI
        </button>
      </div>
      <div className={styles.body}>
        <main className={styles.main}>
          <div className={styles.column}>
            <header className={`${styles.intro} ${styles.stagger}`} style={enterAt(0)}>
              <p className={styles.date}>{localizeCopy("Thu 5 Nov, 2:05 PM")}</p>
              <h2 className={styles.hello}>{localizeCopy("Hello Ana!")}</h2>
              <h3 className={styles.today}>{localizeCopy("Today")}</h3>
            </header>

            <div className={styles.stagger} style={enterAt(300)}>
              <AiSummary
                generating={false}
                text={
                  applied
                    ? localizeCopy(
                        "5 orders remain overdue. ORD-1045 and ORD-1037 now have drivers assigned. Their workflow states are unchanged.",
                      )
                    : summary.shown
                }
                done={summary.done}
                typing={false}
                onReplay={onReplay}
              />
            </div>

            <div className={`${styles.tabBar} ${styles.stagger}`} style={enterAt(600)}>
              <div className={styles.tabs} role="tablist" aria-label={localizeCopy("Home views")}>
                {tabs.map((name) => (
                  <button
                    key={name}
                    role="tab"
                    aria-selected={tab === name}
                    className={tab === name ? styles.tabActive : undefined}
                    onClick={() => setTab(name)}
                  >
                    {localizeCopy(name)}
                  </button>
                ))}
              </div>
              <button className={styles.filterButton} aria-label={localizeCopy("Filter")}>
                <Funnel size={13} />
              </button>
            </div>

            <div>
              <OverdueCard
                key={tab}
                heading={localizeCopy(tabCards[tab].heading)}
                rows={tabCards[tab].rows.map((row) => {
                  const assignment = applied && reviewRows.find((item) => item.from === row.id);
                  return assignment
                    ? { ...row, assignment: { label: `Driver: ${assignment.to}`, tone: "green" as const } }
                    : row;
                })}
              />
            </div>

            {tab === "Orders" && <ProgressCard />}
          </div>
        </main>

        <section className={styles.inspector} aria-label={localizeCopy("Superspace AI inspector")}>
          <div className={styles.inspectorTabs} role="tablist" aria-label={localizeCopy("Inspector")}>
            <button
              role="tab"
              aria-selected={inspectorTab === "Shortcuts"}
              className={inspectorTab === "Shortcuts" ? styles.tabActive : undefined}
              onClick={() => setInspectorTab("Shortcuts")}
            >
              <ArrowUpRight size={12} />
              {localizeCopy("Shortcuts")}
            </button>
            <button
              role="tab"
              aria-selected={inspectorTab === "Superspace AI"}
              className={inspectorTab === "Superspace AI" ? styles.tabActive : undefined}
              onClick={() => setInspectorTab("Superspace AI")}
            >
              <Sparkle size={12} weight="fill" />
              Superspace AI
            </button>
          </div>

          {inspectorTab === "Shortcuts" ? (
            <div className={styles.shortcuts}>
              {["Open Inbox", "Find an order", "Assign a driver", "Show overdue work"].map((label) => (
                <button key={label}>{localizeCopy(label)}</button>
              ))}
            </div>
          ) : (
            <div className={styles.aiPane}>
              <div className={styles.thread} ref={thread} aria-live="polite">
                {!reached("sent") && (
                  <div className={styles.empty}>
                    <h3 className={styles.emptyTitle}>{localizeCopy("What are we working on today?")}</h3>
                    <PromptBox text={question.shown} caret={reached("asking") && !question.done} />
                  </div>
                )}

                {reached("sent") && <p className={styles.timestamp}>{localizeCopy("Thu 5 Nov, 2:03 PM")}</p>}
                {reached("sent") && (
                  <motion.div
                    className={styles.bubble}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  >
                    {localizeCopy(QUESTION)}
                  </motion.div>
                )}
                {reached("step1") && (
                  <AgentRun stage={current ? stageIndex(current) : -1} seconds={seconds} finished={reached("review")} />
                )}
                {reached("answer") && (
                  <p className={`${styles.answer} ${styles.enter}`}>
                    {answer.shown}
                    {!answer.done && <span className={styles.caret} aria-hidden="true" />}
                  </p>
                )}
                {reached("review") && <ReviewCard applied={applied} onApply={() => setApplied(true)} />}
              </div>
              {reached("sent") && (
                <div className={styles.composerSlot}>
                  <PromptBox text="" caret={false} />
                </div>
              )}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

/** One prompt box, shared by the empty state and the composer: it glides between them with a layout animation. */
function PromptBox({ text, caret }: { text: string; caret: boolean }) {
  const localizeCopy = useCopy();
  return (
    <motion.div
      layoutId="prompt-box"
      className={styles.prompt}
      transition={{ type: "spring", stiffness: 280, damping: 34 }}
    >
      <p className={text ? styles.promptText : styles.promptPlaceholder}>
        {text || localizeCopy("Ask a follow-up or change the plan…")}
        {caret && <span className={styles.caret} aria-hidden="true" />}
      </p>
      <div className={styles.promptControls}>
        <button className={styles.plus} aria-label={localizeCopy("Add")}>
          <Plus size={14} />
        </button>
        <div className={styles.promptRight}>
          <button className={styles.mic} aria-label={localizeCopy("Voice input")}>
            <Microphone size={14} />
          </button>
          <button className={styles.send} aria-label={localizeCopy("Send")} disabled={!text}>
            <ArrowRight size={14} weight="bold" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

function AiSummary({
  generating,
  typing,
  text,
  done,
  onReplay,
}: {
  generating: boolean;
  typing: boolean;
  text: string;
  done: boolean;
  onReplay: () => void;
}) {
  const localizeCopy = useCopy();
  return (
    <section className={styles.summary} aria-label={localizeCopy("AI summary")}>
      <div className={styles.summaryHead}>
        <span className={styles.chip}>
          <CaretDown size={10} />
          {localizeCopy("Operational brief · 2:00 PM")}
        </span>
        <button
          className={styles.iconButton}
          aria-label={localizeCopy("Replay assistant preview")}
          disabled={!done}
          onClick={onReplay}
        >
          <ArrowClockwise size={14} />
        </button>
      </div>
      {generating ? (
        <div className={styles.generating}>
          <span className={styles.orb} aria-hidden="true" />
          <span className={styles.generatingLabel}>{localizeCopy("Generating summary")}</span>
          <div className={styles.skeleton} aria-hidden="true">
            <span />
            <span />
            <span />
          </div>
        </div>
      ) : (
        <p className={styles.summaryText} aria-live="polite">
          {text}
          {typing && <span className={styles.caret} aria-hidden="true" />}
        </p>
      )}
    </section>
  );
}

/** Straight segments between daily values, as the product draws them: no spline smoothing. */
function ProgressCard() {
  const localizeCopy = useCopy();
  const [hover, setHover] = useState<number | null>(null);
  const svg = useRef<SVGSVGElement>(null);
  const active = hover ?? chartDays.length - 1;
  const x = plotX(active);

  function onPointerMove(event: PointerEvent<SVGSVGElement>) {
    const box = svg.current?.getBoundingClientRect();
    if (!box) return;
    const viewX = ((event.clientX - box.left) / box.width) * CANVAS_CARD_WIDTH;
    const index = Math.round(((viewX - PLOT.left) / (PLOT.right - PLOT.left)) * (chartDays.length - 1));
    setHover(Math.min(chartDays.length - 1, Math.max(0, index)));
  }

  return (
    <article className={styles.card}>
      <header className={styles.cardHead}>
        <span className={styles.chip}>
          <CaretDown size={10} />
          {localizeCopy("Progress")}
        </span>
        <button className={styles.iconButton} aria-label={localizeCopy("Chart options")}>
          <DotsThree size={16} weight="bold" />
        </button>
      </header>
      <ul className={styles.legend}>
        {series.map((line) => (
          <li key={line.name}>
            <span style={{ background: line.color }} />
            {localizeCopy(line.name)}
          </li>
        ))}
      </ul>
      <div className={styles.chart}>
        <svg
          ref={svg}
          viewBox={`0 0 ${CANVAS_CARD_WIDTH} 196`}
          width="100%"
          onPointerMove={onPointerMove}
          onPointerLeave={() => setHover(null)}
          role="img"
          aria-label={localizeCopy("Daily orders by status over the last five days")}
        >
          <defs>
            {series.map((line) => (
              <linearGradient key={line.name} id={`fill-${line.name.replace(/\s/g, "-")}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={line.color} stopOpacity={line.name === "All Orders" ? 0.12 : 0.16} />
                <stop offset="100%" stopColor={line.color} stopOpacity="0" />
              </linearGradient>
            ))}
          </defs>
          {[0, 30, 60, 90].map((value) => (
            <g key={value}>
              <line x1={PLOT.left} x2={PLOT.right} y1={plotY(value)} y2={plotY(value)} className={styles.grid} />
              <text x={PLOT.left - 10} y={plotY(value) + 3} textAnchor="end" className={styles.tick}>
                {value}
              </text>
            </g>
          ))}
          {series.map((line, index) => {
            const points = line.values.map((value, i) => `${plotX(i)},${plotY(value)}`).join(" ");
            const fill = `${points} ${plotX(chartDays.length - 1)},${PLOT.bottom} ${PLOT.left},${PLOT.bottom}`;
            return (
              <polygon
                key={`area-${line.name}`}
                points={fill}
                fill={`url(#fill-${line.name.replace(/\s/g, "-")})`}
                className={styles.area}
                style={{ animationDelay: `${1400 + index * 120}ms` } as CSSProperties}
              />
            );
          })}
          <line x1={x} x2={x} y1={PLOT.top} y2={PLOT.bottom} className={styles.marker} />
          {series.map((line, index) => (
            <polyline
              key={line.name}
              pathLength={1}
              points={line.values.map((value, i) => `${plotX(i)},${plotY(value)}`).join(" ")}
              stroke={line.color}
              className={styles.line}
              style={{ animationDelay: `${1300 + index * 140}ms` } as CSSProperties}
            />
          ))}
          {series.map((line) => (
            <circle
              key={`dot-${line.name}`}
              cx={x}
              cy={plotY(line.values[active])}
              r={3.5}
              fill={line.color}
              stroke="#202027"
              strokeWidth={2}
            />
          ))}
          {chartDays.map((label, i) => (
            <text
              key={label}
              x={plotX(i)}
              y={184}
              textAnchor={i === 0 ? "start" : i === chartDays.length - 1 ? "end" : "middle"}
              className={i === active ? styles.tickActive : styles.tick}
            >
              {localizeCopy(label)}
            </text>
          ))}
        </svg>
        {hover !== null && (
          <div
            className={styles.tooltip}
            style={{
              left: `${(x / CANVAS_CARD_WIDTH) * 100}%`,
              transform: active >= 3 ? "translateX(calc(-100% - 12px))" : "translateX(12px)",
            }}
            aria-hidden="true"
          >
            <strong>{localizeCopy(chartDays[active])}</strong>
            {series.map((line) => (
              <span key={line.name}>
                <i style={{ background: line.color }} />
                {localizeCopy(line.name)}
                <b>{line.values[active]}</b>
              </span>
            ))}
          </div>
        )}
      </div>
    </article>
  );
}

/** The card's inner width (560px column minus 12px padding on each side). */
const CANVAS_CARD_WIDTH = 536;

function Tag({ tone, children }: { tone: Tone; children: ReactNode }) {
  return (
    <PreviewTag tone={tone === "neutral" ? "neutral" : tone} className={`${styles.tag} ${styles[`tone_${tone}`]}`}>
      {children}
    </PreviewTag>
  );
}

function OverdueCard({ heading, rows }: { heading: string; rows: Row[] }) {
  const localizeCopy = useCopy();
  /* Assignment labels carry a driver name after the "Driver:" prefix; only the prefix is copy. */
  const assignmentLabel = (label: string) =>
    label.startsWith("Driver: ") ? `${localizeCopy("Driver:")} ${label.slice("Driver: ".length)}` : localizeCopy(label);
  return (
    <article className={styles.itemCard}>
      <header className={styles.itemHeader}>
        <span className={styles.itemHeading}>
          <span className={styles.itemChevron}>
            <Image src="/assets/figma/home-control/list/chevron.svg" alt="" width={14} height={14} />
          </span>
          {heading}
        </span>
        <button className={styles.itemMore} aria-label={localizeCopy("More options")}>
          <Image src="/assets/figma/home-control/list/more.svg" alt="" width={14} height={14} />
        </button>
      </header>
      <ul className={styles.itemRows}>
        {rows.map((row) => (
          <li key={row.id} className={styles.itemRow}>
            <div className={styles.itemDetails}>
              <span className={styles.rowId}>{localizeCopy(row.id)}</span>
              <span className={styles.itemName}>{localizeCopy(row.title)}</span>
              {row.assignment && <Tag tone={row.assignment.tone}>{assignmentLabel(row.assignment.label)}</Tag>}
              {!row.assignment && <span className={styles.itemMeta}>{localizeCopy(row.meta)}</span>}
            </div>
            <Tag tone={row.tone}>{localizeCopy(row.tag)}</Tag>
          </li>
        ))}
      </ul>
    </article>
  );
}

function AgentRun({ stage, seconds, finished }: { stage: number; seconds: number; finished: boolean }) {
  const localizeCopy = useCopy();
  return (
    <div className={`${styles.run} ${styles.enter}`}>
      <div className={styles.runHead}>
        <span className={finished ? styles.runDone : styles.orb} aria-hidden="true">
          {finished && <Check size={8} weight="bold" />}
        </span>
        <span>
          {finished ? `${localizeCopy("Superspace worked for")} ${seconds}s` : localizeCopy("Superspace is working")}
          {!finished && <span className={styles.dots} aria-hidden="true" />}
        </span>
      </div>
      <p className={styles.runLead}>
        {finished
          ? localizeCopy("Assignment review complete.")
          : localizeCopy("Checking assignments and available capacity.")}
      </p>
      <ol className={styles.steps}>
        {STEPS.map((label, index) => {
          const stepStage = stageIndex(`step${index + 1}` as Stage);
          const status = stage > stepStage ? "done" : stage === stepStage ? "running" : "pending";
          return (
            <li key={label} data-status={status} className={styles.enter}>
              {status === "done" && <CheckCircle size={14} weight="fill" className={styles.stepDone} />}
              {status === "running" && <CircleNotch size={14} className={styles.stepSpin} />}
              {status === "pending" && <span className={styles.stepPending} />}
              {localizeCopy(label)}
            </li>
          );
        })}
      </ol>
    </div>
  );
}

const reviewRows = [
  { from: "ORD-1045", to: "Jorge Ramírez" },
  { from: "ORD-1037", to: "Lucía Méndez" },
];

function ReviewCard({ applied, onApply }: { applied: boolean; onApply: () => void }) {
  const localizeCopy = useCopy();
  return (
    <div className={`${styles.review} ${styles.enter}`}>
      <div className={styles.reviewHead}>
        <strong>{localizeCopy("Review assignments")}</strong>
        <small>
          {localizeCopy("Experimental preview")} ·{" "}
          {applied ? localizeCopy("Applied in preview") : localizeCopy("2 proposals for review")}
        </small>
      </div>
      {reviewRows.map((row, index) => (
        <div
          key={row.from}
          className={styles.reviewRow}
          style={{ animationDelay: `${index * 140}ms` } as CSSProperties}
        >
          <Check size={12} weight="bold" className={styles.stepDone} />
          <span className={styles.pill}>{row.from}</span>
          <span className={styles.arrow}>→</span>
          <span className={styles.pill}>{row.to}</span>
        </div>
      ))}
      <p className={styles.reviewNote}>
        {localizeCopy("Suggested by availability and location. Review each order before applying.")}
      </p>
      <div className={styles.reviewActions}>
        <button className={styles.primary} onClick={onApply} disabled={applied}>
          {applied ? localizeCopy("Assignments applied") : localizeCopy("Apply assignments")}
        </button>
        <button className={styles.secondary} disabled={applied}>
          {localizeCopy("Adjust")}
        </button>
      </div>
    </div>
  );
}

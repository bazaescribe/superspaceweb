"use client";

import { useId, useState } from "react";
import { PlayIcon, PauseIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useInView } from "motion/react";
import { useCopy } from "@/i18n/copy";
import { useScrollEntrance } from "@/hooks/use-scroll-entrance";
import { briefing, drivers, orderRecord, orders, storyOrderId } from "@/lib/operational-story";
import { ObjectDetail, OpIcon, type Highlight } from "./operational-ui";
import { PreviewPanel } from "./preview-ui";
import { PreviewStage } from "./preview-stage";
import { ProductPreview, applyIntent, initialAppState, type AppIntent, type AppState } from "./product-preview";
import styles from "./home-story.module.css";

const story = orders.find((order) => order.id === storyOrderId)!;

const steps: { label: string; text: string; state: AppState }[] = [
  {
    label: "An order needs a driver",
    text: "PO-48202 is due for delivery today at 5:00 PM, and nobody has been assigned to drive it.",
    state: { ...initialAppState, screen: "Inbox", highlight: "summary" },
  },
  {
    label: "The exception surfaces",
    text: "Instead of being discovered at dispatch, the gap appears in the operator’s Inbox as an urgent exception, linked to the order.",
    state: { ...initialAppState, screen: "Inbox", highlight: "exception" },
  },
  {
    label: "Context and a proposal",
    text: "The order opens with its customer, state, and history, next to a suggested resolution and the reasons behind it.",
    state: { ...initialAppState, proposal: true, highlight: "proposal" },
  },
  {
    label: "Capacity and constraints",
    text: "Driver availability and eligibility inform the choice. Drivers who are off shift can’t be selected.",
    state: { ...initialAppState, proposal: true, dialog: true, highlight: "dialog" },
  },
  {
    label: "A person approves",
    text: "The operator reviews the assignment and confirms it. Superspace checks their role allows the action before it runs.",
    state: { ...initialAppState, proposal: true, dialog: true, driver: drivers[0].name, highlight: "dialog" },
  },
  {
    label: "Work moves forward",
    text: "The order has a driver, the change is recorded with who made it and when, and dispatch can go ahead.",
    state: {
      ...initialAppState,
      proposal: true,
      assigned: { [storyOrderId]: drivers[0].name },
      toast: true,
      highlight: "result",
    },
  },
];

/** Exception → context and proposal → constraints → human approval → recorded result, in one mockup application. */
export function MondayWalkthrough() {
  const localizeCopy = useCopy();
  const [active, setActive] = useState(0);
  const [state, setState] = useState<AppState>(steps[0].state);
  const go = (index: number) => {
    setActive(index);
    setState(steps[index].state);
  };
  const onIntent = (intent: AppIntent) => {
    const next = applyIntent(state, intent);
    const onStory = next.selected === storyOrderId;
    let step = -1;
    if (intent.type === "screen" && intent.screen === "Inbox") step = 0;
    else if (intent.type === "confirm" && onStory) step = 5;
    else if (next.dialog && onStory) step = next.driver ? 4 : 3;
    else if ((intent.type === "select" || intent.type === "briefing") && onStory && next.screen === "Data") step = 2;
    if (step < 0) {
      setState(next);
      return;
    }
    setActive(step);
    setState({ ...next, proposal: true, highlight: steps[step].state.highlight });
  };
  return (
    <div className={styles.walkthrough}>
      <div className={styles.steps} role="tablist" aria-label={localizeCopy("An order needs a driver")}>
        {steps.map((step, i) => (
          <button
            key={step.label}
            type="button"
            role="tab"
            aria-selected={active === i}
            aria-controls="monday-stage"
            onClick={() => go(i)}
          >
            <small>0{i + 1}</small>
            <span>{localizeCopy(step.label)}</span>
          </button>
        ))}
      </div>
      <div className={styles.stepCopy} aria-live="polite">
        <p>{localizeCopy(steps[active].text)}</p>
        {active < steps.length - 1 ? (
          <button type="button" className={styles.next} onClick={() => go(active + 1)}>
            {localizeCopy("Next step")} <OpIcon name="arrow" />
          </button>
        ) : (
          <button type="button" className={styles.next} onClick={() => go(0)}>
            {localizeCopy("Start again")}
          </button>
        )}
      </div>
      <div id="monday-stage" role="tabpanel" aria-label={localizeCopy(steps[active].label)}>
        <ProductPreview
          screens={["Inbox", "Data"]}
          state={state}
          onIntent={onIntent}
          height={740}
          label={localizeCopy("Superspace Inbox and Orders workspace")}
        />
      </div>
      <div className={styles.footnotes}>
        <p className={styles.thesis}>
          {localizeCopy("Superspace finds the gap and prepares the decision. A person stays accountable for it.")}
        </p>
        <p className={styles.disclosure}>
          {localizeCopy(
            "Controlled product demonstration with fictional data. Record views, governed actions, and activity history have been demonstrated in controlled environments.",
          )}{" "}
          {briefing.status === "design-preview" && `${localizeCopy("Operational briefings are in development.")} `}
          {localizeCopy("Suggested resolutions are experimental and not yet generally available.")}
        </p>
      </div>
    </div>
  );
}

const customers = [
  ["0130239138", "Amara", "Okafor", "Mar 23, 2025"],
  ["0221457890", "Liam", "Nguyen", "Apr 12, 2025"],
  ["0319876541", "Sofia", "Martínez", "May 14, 2025"],
  ["0456123789", "Ethan", "Patel", "Jun 4, 2025"],
  ["0543217890", "Isabella", "Chen", "Jun 18, 2025"],
  ["0632198745", "Noah", "García", "Jul 2, 2025"],
  ["0745263190", "Emma", "Martínez", "Aug 9, 2025"],
  ["0893746152", "Liam", "Rodríguez", "Sep 3, 2025"],
  ["0965124783", "Sophia", "Lopez", "Oct 7, 2025"],
  ["0102457893", "James", "González", "Nov 5, 2025"],
  ["0113579246", "Isabella", "Pérez", "Dec 12, 2025"],
  ["0124681357", "Mason", "Sánchez", "Jan 3, 2026"],
  ["0135792468", "Mia", "Ramírez", "Feb 9, 2026"],
  ["0146803579", "Ethan", "Torres", "Mar 10, 2026"],
] as const;

const anatomy: { key: Highlight; title: string; text: string; example: string }[] = [
  {
    key: "related",
    title: "Your objects",
    text: "Orders, customers, drivers, machines: the things your business runs on, connected the way they really are.",
    example: "Customer → Order → Driver",
  },
  {
    key: "state",
    title: "Your stages",
    text: "The steps work moves through, from draft to delivered, in your own terms.",
    example: "Draft · Confirmed · In Transit · Delivered",
  },
  {
    key: "actions",
    title: "Your rules",
    text: "Who can do what, and when. Checked every time an action runs.",
    example: "Assign driver · Logistics operator",
  },
  {
    key: "activity",
    title: "Your record",
    text: "What changed, who changed it, and when, kept for every object.",
    example: "Mon 08:14 · Ana Torres ran Assign driver",
  },
];

/** One order and the four things it knows, highlighted in the shared object detail. */
export function OperationAnatomy() {
  const localizeCopy = useCopy();
  const { ref, entered, reducedMotion } = useScrollEntrance();
  const inView = useInView(ref, { amount: 0.2 });
  const id = useId();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const current = anatomy[index];
  const active = current.key;
  const record = orderRecord(story, drivers[0].name);

  return (
    <div className={styles.anatomy}>
      <div className={styles.anatomySidebar}>
        <div className={styles.anatomyItems}>
          {anatomy.map((item, i) => {
            const expanded = i === index;
            const descriptionId = `${id}-${item.key}`;
            return (
              <div key={item.key}>
                <h3>
                  <button
                    type="button"
                    aria-expanded={expanded}
                    aria-controls={descriptionId}
                    onClick={() => setIndex(i)}
                  >
                    {localizeCopy(item.title)}
                  </button>
                </h3>
                <div
                  id={descriptionId}
                  className={styles.anatomyDescription}
                  data-expanded={expanded}
                  inert={!expanded}
                >
                  <div>
                    <p>{localizeCopy(item.text)}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        {!reducedMotion && (
          <button
            className={styles.anatomyProgress}
            type="button"
            aria-label={localizeCopy(paused ? "Resume automatic selection" : "Pause automatic selection")}
            onClick={() => setPaused((value) => !value)}
          >
            <svg viewBox="0 0 28 28" aria-hidden="true">
              <circle cx="14" cy="14" r="11" className={styles.progressTrack} />
              <circle
                key={active}
                cx="14"
                cy="14"
                r="11"
                pathLength="100"
                className={styles.progressFill}
                data-running={inView && !paused}
                onAnimationEnd={() => setIndex((value) => (value + 1) % anatomy.length)}
              />
            </svg>
            <HugeiconsIcon icon={paused ? PlayIcon : PauseIcon} size={12} aria-hidden="true" />
          </button>
        )}
      </div>
      <PreviewStage
        background="Commercial model"
        stageRef={ref}
        entered={entered}
        label={localizeCopy(
          active === "related"
            ? "Customers"
            : "An order in Superspace with its relationships, state, actions and history",
        )}
        className={styles.anatomyStage}
      >
        <div className={styles.anatomyPanel} data-entered={entered} data-collection={active === "related" || undefined}>
          <PreviewPanel theme="dark" className={styles.panel}>
            {active === "related" ? (
              <>
                <div className={styles.collectionBar}>
                  {localizeCopy("Customers")} <span>{localizeCopy("1,248 records")}</span>
                </div>
                <div className={styles.collectionTools}>
                  <span>{localizeCopy("Search items")}</span>
                  <span>＋ {localizeCopy("New Customer")}</span>
                </div>
                <table className={styles.objectTable} aria-label={localizeCopy("Customers")}>
                  <thead>
                    <tr>
                      {["", "ID", "Name", "Last name", "Email", "Phone", "Created"].map((column) => (
                        <th key={column} scope="col">
                          {localizeCopy(column)}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {customers.map(([id, first, last, date], index) => (
                      <tr key={id}>
                        <td>{index + 1}</td>
                        <th scope="row">{id}</th>
                        <td>{first}</td>
                        <td>{last}</td>
                        <td>
                          {first.toLowerCase()}.{last.toLowerCase()}@example.com
                        </td>
                        <td>+52 55 0100 {String(index + 1).padStart(4, "0")}</td>
                        <td>{localizeCopy(date)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </>
            ) : (
              <div className={styles.panelBody}>
                <p className={styles.anatomyExample}>{localizeCopy(current.example)}</p>
                <ObjectDetail
                  record={record}
                  highlight={active}
                  sections={["properties", "related", "activity"]}
                  activityHighlight={active === "activity" ? "assigned" : undefined}
                />
              </div>
            )}
          </PreviewPanel>
        </div>
      </PreviewStage>
    </div>
  );
}

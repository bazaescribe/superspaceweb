"use client";

import { useState } from "react";
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
      <div className={styles.steps} role="tablist" aria-label="An order needs a driver">
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
            <span>{step.label}</span>
          </button>
        ))}
      </div>
      <div className={styles.stepCopy} aria-live="polite">
        <p>{steps[active].text}</p>
        {active < steps.length - 1 ? (
          <button type="button" className={styles.next} onClick={() => go(active + 1)}>
            Next step <OpIcon name="arrow" />
          </button>
        ) : (
          <button type="button" className={styles.next} onClick={() => go(0)}>
            Start again
          </button>
        )}
      </div>
      <div id="monday-stage" role="tabpanel" aria-label={steps[active].label}>
        <ProductPreview
          screens={["Inbox", "Data"]}
          state={state}
          onIntent={onIntent}
          height={740}
          label="Superspace Inbox and Orders workspace"
        />
      </div>
      <div className={styles.footnotes}>
        <p className={styles.thesis}>
          Superspace finds the gap and prepares the decision. A person stays accountable for it.
        </p>
        <p className={styles.disclosure}>
          Controlled product demonstration with fictional data. Record views, governed actions, and activity history
          have been demonstrated in controlled environments.{" "}
          {briefing.status === "design-preview" && "Operational briefings are in development. "}
          Suggested resolutions are experimental and not yet generally available.
        </p>
      </div>
    </div>
  );
}

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
  const { ref, entered } = useScrollEntrance();
  const [active, setActive] = useState<Highlight>("related");
  const record = orderRecord(story, drivers[0].name);
  const current = anatomy.find((item) => item.key === active)!;
  return (
    <div className={styles.anatomy}>
      <PreviewStage
        background="Cover Purple.png"
        stageRef={ref}
        entered={entered}
        label="An order in Superspace with its relationships, state, actions and history"
        className={styles.anatomyStage}
      >
        <div className={styles.anatomyPanel} data-entered={entered}>
          <PreviewPanel theme="dark" className={styles.panel}>
            <div className={styles.panelBody}>
              <ObjectDetail
                record={record}
                highlight={active}
                sections={["properties", "related", "activity"]}
                activityHighlight={active === "activity" ? "assigned" : undefined}
              />
            </div>
          </PreviewPanel>
        </div>
        <p className={styles.anatomyExample} aria-hidden="true" key={active}>
          {current.example}
        </p>
      </PreviewStage>
      <div className={styles.anatomyItems}>
        {anatomy.map((item) => (
          <button
            key={item.key}
            type="button"
            aria-pressed={active === item.key}
            onClick={() => setActive(item.key)}
            onPointerEnter={(event) => event.pointerType !== "touch" && setActive(item.key)}
            onFocus={() => setActive(item.key)}
          >
            <strong>{item.title}</strong>
            <span>{item.text}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

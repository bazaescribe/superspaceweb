"use client";

import { useState } from "react";
import { useScrollEntrance } from "@/hooks/use-scroll-entrance";
import { agentProposal, briefing, drivers, orderRecord, orders, storyOrderId } from "@/lib/operational-story";
import { ObjectDetail, OpIcon, type Highlight } from "./operational-ui";
import { PreviewPanel } from "./preview-ui";
import { PreviewStage } from "./preview-stage";
import { ProductPreview, applyIntent, initialAppState, type AppIntent, type AppState } from "./product-preview";
import styles from "./home-story.module.css";

const story = orders.find((order) => order.id === storyOrderId)!;

const steps: { label: string; text: string; state: AppState }[] = [
  {
    label: "What changed",
    text: "The figures come from your operational data. AI writes the summary around them; it doesn’t invent the numbers.",
    state: { ...initialAppState, screen: "Inbox", highlight: "summary" },
  },
  {
    label: "What needs you",
    text: "An urgent order has no driver. It’s flagged because the record says so, not because someone remembered to check.",
    state: { ...initialAppState, screen: "Inbox", highlight: "exception" },
  },
  {
    label: "The full context",
    text: "Open the order: its state, customer, related work, and history, in the workspace your team already uses.",
    state: { ...initialAppState, highlight: "context" },
  },
  {
    label: "What you’re allowed to do",
    text: "Assign driver appears because your role permits it. Choose María López and confirm.",
    state: { ...initialAppState, dialog: true, driver: drivers[0].name, highlight: "dialog" },
  },
  {
    label: "What happened",
    text: "The driver is assigned, and the activity history records who acted, what changed, and when. The order stays Draft until someone confirms it.",
    state: {
      ...initialAppState,
      assigned: { [storyOrderId]: drivers[0].name },
      toast: true,
      highlight: "result",
    },
  },
];

/** Briefing → exception → object → authorized action → recorded result, in the same mockup application. */
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
    else if (intent.type === "confirm" && onStory) step = 4;
    else if (next.dialog && onStory) step = 3;
    else if ((intent.type === "select" || intent.type === "briefing") && onStory && next.screen === "Data") step = 2;
    if (step < 0) {
      setState(next);
      return;
    }
    setActive(step);
    setState({ ...next, highlight: steps[step].state.highlight });
  };
  const disclosure =
    briefing.status === "design-preview"
      ? "Operational briefings are in development and agent proposals are experimental. Steps 03–05 show the product as it works today."
      : "Agent proposals are experimental and not yet generally available.";
  return (
    <div className={styles.walkthrough}>
      <div className={styles.steps} role="tablist" aria-label="Monday walkthrough">
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
        <p className={styles.thesis}>Inbox tells you where to look. The workspace is where the work gets done.</p>
        <aside className={styles.agent}>
          <OpIcon name="spark" />
          <div>
            <strong>Or let an agent propose it.</strong>
            <p>
              An agent can analyze the order and propose {agentProposal.action}, with its reasoning and the records it
              relied on. You approve it, and it runs with your permissions, recorded as{" "}
              {agentProposal.badge.toLowerCase()}.
            </p>
          </div>
        </aside>
        <p className={styles.disclosure}>{disclosure}</p>
      </div>
    </div>
  );
}

const anatomy: { key: Highlight; title: string; text: string; example: string }[] = [
  {
    key: "related",
    title: "Relationships",
    text: "What it’s connected to.",
    example: "Customer → Order → Driver",
  },
  {
    key: "state",
    title: "State",
    text: "Where it stands.",
    example: "Draft · Confirmed · In Transit · Delivered",
  },
  {
    key: "actions",
    title: "Actions",
    text: "What can happen next, and who can do it.",
    example: "Assign driver · Logistics operator",
  },
  {
    key: "activity",
    title: "History",
    text: "What already happened, and who did it.",
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

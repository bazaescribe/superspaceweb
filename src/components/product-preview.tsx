"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { motionEase } from "@/lib/motion";
import {
  assignDriver,
  briefing,
  drivers,
  orderRecord,
  orders,
  organization,
  stateTones,
  storyOrderId,
  storyResolution,
  viewer,
} from "@/lib/operational-story";
import {
  ActionDialog,
  BriefingCard,
  CollectionList,
  ObjectChip,
  ObjectDetail,
  OpTag,
  OpIcon,
  Toast,
  type Highlight,
} from "./operational-ui";
import styles from "./product-preview.module.css";

const asset = (name: string) => `/assets/figma/dark-site/${name}`;
const screenIcons = { Inbox: "fe362.svg", Data: "8b96a.svg" } as const;

export type Screen = keyof typeof screenIcons;
export type AppState = {
  screen: Screen;
  selected: string;
  dialog: boolean;
  driver?: string;
  assigned: Record<string, string>;
  highlight?: Highlight;
  toast?: boolean;
  /** Shows the suggested resolution on the story order until it is assigned. */
  proposal?: boolean;
};
export type AppIntent =
  | { type: "screen"; screen: Screen }
  | { type: "select"; id: string }
  | { type: "action" }
  | { type: "driver"; name: string }
  | { type: "confirm" }
  | { type: "cancel" }
  | { type: "briefing"; intent: "assign" | "open" | "collection"; id: string };

export const initialAppState: AppState = { screen: "Data", selected: storyOrderId, dialog: false, assigned: {} };

/** The default behavior of the mockup application. Controlled hosts may map intents to their own states. */
export function applyIntent(state: AppState, intent: AppIntent): AppState {
  const base: AppState = { ...state, highlight: undefined, toast: false };
  switch (intent.type) {
    case "screen":
      return { ...base, screen: intent.screen, dialog: false };
    case "select":
      return { ...base, selected: intent.id, dialog: false };
    case "action":
      return { ...base, dialog: true, driver: undefined };
    case "driver":
      return { ...base, dialog: true, driver: intent.name };
    case "cancel":
      return { ...base, dialog: false };
    case "confirm":
      return {
        ...base,
        dialog: false,
        toast: true,
        assigned: { ...state.assigned, [state.selected]: state.driver ?? drivers[0].name },
      };
    case "briefing": {
      const id = orders.some((order) => order.id === intent.id) ? intent.id : state.selected;
      return { ...base, screen: "Data", selected: id, dialog: intent.intent === "assign" };
    }
  }
}

function Icon({ name, size = 14 }: { name: string; size?: number }) {
  return <Image src={asset(name)} alt="" width={size} height={size} unoptimized />;
}

function ProductRail({
  screens,
  screen,
  dispatch,
}: {
  screens: readonly Screen[];
  screen: Screen;
  dispatch: (intent: AppIntent) => void;
}) {
  return (
    <nav className={styles.rail} aria-label="Product preview navigation">
      <div>
        <span className={styles.organization} title={organization}>
          AL
        </span>
        <span className={styles.railDecoration} title="Home">
          <Icon name="89179.svg" />
        </span>
        {screens.map((name) => (
          <button
            type="button"
            key={name}
            aria-label={`Show ${name}`}
            aria-pressed={screen === name}
            title={name}
            onClick={() => dispatch({ type: "screen", screen: name })}
          >
            <Icon name={screenIcons[name]} />
          </button>
        ))}
      </div>
      <div>
        <span className={styles.user} title={viewer.name}>
          {viewer.initials}
        </span>
      </div>
    </nav>
  );
}

function InboxScreen({ state, dispatch }: { state: AppState; dispatch: (intent: AppIntent) => void }) {
  const toDo = briefing.standing.length + briefing.items.length;
  return (
    <div className={styles.inbox}>
      <aside className={styles.inboxList} aria-label="Inbox items">
        <h2 className={styles.inboxTitle}>Inbox</h2>
        <div className={styles.inboxControls}>
          <div className={styles.segmented} role="group" aria-label="Inbox status">
            <span className={styles.segmentActive}>
              To Do <OpTag tone="red">{toDo}</OpTag>
            </span>
            <span className={styles.segment}>Done</span>
          </div>
          <span className={styles.control} aria-hidden="true">
            <OpIcon name="filter" />
          </span>
        </div>
        <section className={styles.group} aria-label="Pinned">
          <div className={styles.groupHeader}>
            <span className={styles.groupTitle}>
              <span className={styles.collapsed} aria-hidden="true">
                <OpIcon name="chevron" />
              </span>
              Pinned
            </span>
            <span className={styles.control} aria-hidden="true">
              <OpIcon name="ellipsis" />
            </span>
          </div>
        </section>
        <section className={styles.group}>
          <div className={styles.groupHeader}>
            <span className={styles.groupTitle}>
              <OpIcon name="chevron" />
              Operational Briefings
            </span>
          </div>
          {briefing.standing.map((entry, i) => (
            <div key={entry.id} className={styles.listItem} data-selected={i === 0 || undefined}>
              <span className={styles.unread} aria-hidden="true" />
              <div className={styles.listBody}>
                <span className={styles.listTitle}>{entry.title}</span>
                <p>{entry.detail}</p>
              </div>
              <time>{entry.time}</time>
            </div>
          ))}
        </section>
        <section className={styles.group}>
          <div className={styles.groupHeader}>
            <span className={styles.groupTitle}>
              <OpIcon name="chevron" />
              My Tasks
            </span>
            <span className={styles.control} aria-hidden="true">
              <OpIcon name="ellipsis" />
            </span>
          </div>
          {briefing.items.map((item) => (
            <button
              type="button"
              key={item.id}
              className={styles.listItem}
              onClick={() => dispatch({ type: "briefing", intent: "open", id: item.id })}
            >
              <span className={styles.unread} aria-hidden="true" />
              <div className={styles.listBody}>
                <span className={styles.listTitle}>{item.title}</span>
                <span className={styles.listTags}>
                  <ObjectChip id={item.subject} />
                  {item.tags.slice(0, 1).map((tag) => (
                    <OpTag key={tag.label} tone={tag.tone}>
                      {tag.label}
                    </OpTag>
                  ))}
                </span>
              </div>
              <time>{item.time}</time>
            </button>
          ))}
        </section>
      </aside>
      <section className={styles.workspace} aria-label={briefing.standing[0].title}>
        <header className={styles.workspaceBar}>
          <div className={styles.workspaceTitle}>
            <span>Daily Operational briefing</span>
            <time>8:00 AM</time>
            {briefing.status === "design-preview" && <OpTag tone="blue">Design preview</OpTag>}
          </div>
          <span className={styles.control} aria-hidden="true">
            <OpIcon name="ellipsis" />
          </span>
        </header>
        <div className={styles.workspaceBody}>
          <div className={`${styles.enter} ${styles.briefingBody}`}>
            <BriefingCard
              {...briefing}
              highlight={state.highlight}
              onAction={(intent, id) => dispatch({ type: "briefing", intent, id })}
              onReference={(id) => dispatch({ type: "briefing", intent: "open", id })}
            />
          </div>
        </div>
      </section>
    </div>
  );
}

function DataScreen({ state, dispatch }: { state: AppState; dispatch: (intent: AppIntent) => void }) {
  const [query, setQuery] = useState("");
  const order = orders.find((item) => item.id === state.selected) ?? orders[0];
  const assigned = state.assigned[order.id];
  const record = orderRecord(order, assigned);
  const visible = orders.filter((item) =>
    `${item.id} ${item.customer}`.toLowerCase().includes(query.trim().toLowerCase()),
  );
  return (
    <div className={styles.data}>
      <div className={styles.dataTabs}>
        <span className={styles.selectedTab}>
          Orders <span className={styles.count}>46</span>
        </span>
        <span>Customers</span>
        <span>Drivers</span>
      </div>
      <div className={styles.toolbar}>
        <label>
          <Icon name="18d12.svg" />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search orders"
            aria-label="Search preview orders"
          />
        </label>
        <span>
          State <Icon name="820f7.svg" />
        </span>
        <span>
          Newest <Icon name="1426b.svg" />
        </span>
        <span className={styles.newRecord}>New order +</span>
      </div>
      <aside className={styles.list}>
        <CollectionList
          label="Orders"
          selected={order.id}
          onSelect={(id) => dispatch({ type: "select", id })}
          rows={visible.map((item) => {
            const driver = state.assigned[item.id] ?? item.driver;
            return {
              id: item.id,
              title: item.id,
              subtitle: `${item.customer}${driver ? ` · ${driver}` : ""}`,
              tags: [
                ...(item.priority === "Normal"
                  ? []
                  : [
                      {
                        label: item.priority,
                        tone: item.priority === "Urgent" ? ("red" as const) : ("amber" as const),
                      },
                    ]),
                { label: item.state, tone: stateTones[item.state] },
              ],
            };
          })}
        />
        {visible.length === 0 && <p className={styles.muted}>No matching orders.</p>}
      </aside>
      <div className={styles.detailPane} key={order.id}>
        <div className={`${styles.enter} ${styles.detailBody}`}>
          {state.proposal && order.id === storyOrderId && !assigned && (
            <aside
              className={styles.proposal}
              data-highlighted={state.highlight === "proposal" || undefined}
              aria-label={storyResolution.title}
            >
              <div className={styles.proposalHead}>
                <OpIcon name="spark" />
                <span>{storyResolution.title}</span>
                <OpTag>Experimental</OpTag>
              </div>
              <strong>{storyResolution.summary}</strong>
              <ul>
                {storyResolution.reasons.map((reason) => (
                  <li key={reason}>
                    <OpIcon name="check" />
                    {reason}
                  </li>
                ))}
              </ul>
              <button
                type="button"
                className={styles.proposalButton}
                onClick={() => dispatch({ type: "driver", name: storyResolution.driver })}
              >
                Review assignment <OpIcon name="arrow" />
              </button>
            </aside>
          )}
          <ObjectDetail
            record={record}
            highlight={state.highlight === "proposal" ? undefined : state.highlight}
            activityHighlight={assigned ? "assigned" : undefined}
            onAction={() => dispatch({ type: "action" })}
          />
        </div>
      </div>
      {state.dialog && (
        <div className={styles.overlay}>
          <div className={styles.dialogFrame}>
            <ActionDialog
              title={assignDriver.name}
              subject={order.id}
              input={assignDriver.input}
              query={assignDriver.query}
              options={drivers}
              selected={state.driver}
              highlighted={state.highlight === "dialog"}
              requirement={
                <>
                  Requires <code>{assignDriver.permission}</code>, granted to your {assignDriver.role} role.
                </>
              }
              effect={assignDriver.effect}
              onSelect={(name) => dispatch({ type: "driver", name })}
              onConfirm={() => dispatch({ type: "confirm" })}
              onCancel={() => dispatch({ type: "cancel" })}
            />
          </div>
        </div>
      )}
      {state.toast && (
        <div className={styles.toastFrame}>
          <Toast>Action completed.</Toast>
        </div>
      )}
    </div>
  );
}

/**
 * The marketing mockup of the Superspace application: app rail, Inbox and Data screens, rendered on a
 * fixed 1512px canvas that scales with its container. It runs uncontrolled by default; walkthroughs
 * pass `state` and receive intents through `onIntent` to drive it step by step.
 */
export function ProductPreview({
  screens = ["Data"],
  state: controlled,
  onIntent,
  label,
  height = 982,
}: {
  screens?: readonly Screen[];
  state?: AppState;
  onIntent?: (intent: AppIntent) => void;
  label?: string;
  height?: number;
}) {
  const [internal, setInternal] = useState<AppState>({ ...initialAppState, screen: screens[0] });
  const state = controlled ?? internal;
  const wrapper = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1280 / 1512);
  const reduce = useReducedMotion();
  useEffect(() => {
    const el = wrapper.current;
    if (!el) return;
    const observer = new ResizeObserver(([entry]) => setScale(Math.max(entry.contentRect.width, 900) / 1512));
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  const dispatch = (intent: AppIntent) => {
    if (onIntent) onIntent(intent);
    else setInternal((current) => applyIntent(current, intent));
    if (intent.type === "screen" && wrapper.current) wrapper.current.scrollLeft = 0;
  };
  return (
    <div className={styles.preview} style={{ "--canvas-height": `${height}px` } as CSSProperties}>
      {screens.length > 1 && (
        <div className={styles.mobileTabs} role="group" aria-label="Product screens">
          {screens.map((name) => (
            <button
              type="button"
              aria-pressed={state.screen === name}
              onClick={() => dispatch({ type: "screen", screen: name })}
              key={name}
            >
              {name}
            </button>
          ))}
        </div>
      )}
      <div
        className={styles.viewport}
        ref={wrapper}
        tabIndex={0}
        role="region"
        aria-label={label ?? `${state.screen} product preview`}
      >
        <div className={styles.scaledSpace} style={{ width: 1512 * scale, height: height * scale }}>
          <div className={styles.canvas} style={{ transform: `scale(${scale})` }}>
            <ProductRail screens={screens} screen={state.screen} dispatch={dispatch} />
            <motion.div
              key={state.screen}
              className={styles.screen}
              data-screen={state.screen}
              initial={reduce ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.35, ease: motionEase }}
            >
              {state.screen === "Inbox" ? (
                <InboxScreen state={state} dispatch={dispatch} />
              ) : (
                <DataScreen state={state} dispatch={dispatch} />
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

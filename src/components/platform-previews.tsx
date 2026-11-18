"use client";

import { useEffect, useState, type ReactNode } from "react";
import { motion } from "motion/react";
import { useScrollEntrance } from "@/hooks/use-scroll-entrance";
import {
  agentProposal,
  assignDriver,
  briefing,
  drivers,
  orderRecord,
  orders,
  stateTones,
  storyOrderId,
  viewer,
  type ActivityEntry,
} from "@/lib/operational-story";
import {
  ActionButton,
  ActionDialog,
  ActivityTimeline,
  BriefingCard,
  CollectionList,
  ObjectChip,
  ObjectDetail,
  OpIcon,
  OpTag,
  StateBar,
  Toast,
} from "./operational-ui";
import { PreviewPanel, PreviewSwitch } from "./preview-ui";
import { PreviewStage } from "./preview-stage";
import styles from "./platform-previews.module.css";

const story = orders.find((order) => order.id === storyOrderId)!;

function Bar({ children, trailing }: { children: ReactNode; trailing?: ReactNode }) {
  return (
    <div className={styles.bar}>
      <span>{children}</span>
      {trailing ?? <span aria-hidden="true">···</span>}
    </div>
  );
}
function Stage({
  background,
  children,
  entered,
  stageRef,
  label,
  className = "",
}: {
  background: string;
  children: ReactNode;
  entered: boolean;
  stageRef: React.RefObject<HTMLDivElement | null>;
  label: string;
  className?: string;
}) {
  return (
    <PreviewStage
      background={background}
      stageRef={stageRef}
      entered={entered}
      label={label}
      className={`${styles.stage} ${className}`}
    >
      <div className={styles.composition}>{children}</div>
    </PreviewStage>
  );
}
function Swipe({
  entered,
  reduced,
  className,
  children,
  delay = 0,
}: {
  entered: boolean;
  reduced: boolean;
  className?: string;
  children: ReactNode;
  delay?: number;
}) {
  return (
    <motion.div
      className={className}
      initial={false}
      animate={{
        opacity: entered ? 1 : 0,
        y: entered || reduced ? 0 : 26,
        clipPath: entered || reduced ? "inset(0 0 0% 0)" : "inset(0 0 100% 0)",
      }}
      transition={{ duration: reduced ? 0 : 0.38, delay: reduced ? 0 : delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}
function Code({ text, started, reduced }: { text: string; started: boolean; reduced: boolean }) {
  const [length, setLength] = useState(0);
  useEffect(() => {
    if (!started || reduced) return;
    const start = performance.now();
    const timer = window.setInterval(() => {
      const progress = Math.min(1, (performance.now() - start) / 850);
      setLength(Math.ceil(text.length * progress));
      if (progress === 1) window.clearInterval(timer);
    }, 24);
    return () => window.clearInterval(timer);
  }, [started, reduced, text]);
  const visible = reduced ? text : text.slice(0, length);
  return (
    <pre className={styles.code} aria-label="Illustrative model definition">
      <code>
        {visible.split(/("(?:[^"\\]|\\.)*"\s*:|"(?:[^"\\]|\\.)*"|\btrue\b|\bfalse\b|\bnull\b)/g).map((token, i) => (
          <span
            key={i}
            className={token.endsWith(":") ? styles.key : token.startsWith('"') ? styles.string : undefined}
          >
            {token}
          </span>
        ))}
      </code>
    </pre>
  );
}

/* One foundation */

const coreLinks = {
  people: {
    href: "/product#workspaces",
    title: "Workspaces",
    text: "Collections, details and Inbox, generated from the model.",
  },
  ai: {
    href: "/product#intelligence",
    title: "Intelligence & Agents",
    text: "Briefings and agent proposals that read the same model.",
  },
  model: { href: "#model", title: "Business Model", text: "Objects, relationships and lifecycle states." },
  actions: {
    href: "/product#actions",
    title: "Actions & Workflows",
    text: "Typed operations with permissions and declared effects.",
  },
};
function CoreNode({ node, tone }: { node: (typeof coreLinks)[keyof typeof coreLinks]; tone?: "core" }) {
  return (
    <a className={styles.coreNode} href={node.href} data-tone={tone}>
      <strong>{node.title}</strong>
      <span>{node.text}</span>
    </a>
  );
}
/** A conceptual view: people and AI reach the same model and actions through controlled paths. */
export function PlatformCoreDiagram() {
  const { ref, entered } = useScrollEntrance();
  return (
    <PreviewStage
      background="Cover Ghost.png"
      stageRef={ref}
      entered={entered}
      label="Conceptual view of the Superspace platform"
      className={styles.coreStage}
    >
      <div className={styles.core} data-entered={entered}>
        <div className={styles.coreActors}>
          <div className={styles.coreColumn}>
            <span className={styles.actor}>People</span>
            <CoreNode node={coreLinks.people} />
            <span className={styles.path}>Run permitted actions</span>
          </div>
          <div className={styles.coreColumn}>
            <span className={styles.actor}>AI</span>
            <CoreNode node={coreLinks.ai} />
            <span className={styles.path}>Read in scope · propose for approval</span>
          </div>
        </div>
        <div className={styles.ring}>
          <a className={styles.ringLabel} href="/product#governance">
            Governance & Security
          </a>
          <span className={styles.ringNodes}>
            <CoreNode node={coreLinks.model} tone="core" />
            <CoreNode node={coreLinks.actions} tone="core" />
          </span>
          <span className={styles.ringFooter}>
            Organization isolation · Role permissions on every action · Append-only activity
          </span>
        </div>
      </div>
    </PreviewStage>
  );
}

/* Business Model */

const model = JSON.stringify(
  {
    objectType: "Order",
    fields: { number: "text", total: "currency", priority: { enum: ["Normal", "High", "Urgent"] } },
    lifecycle: {
      initial: "Draft",
      states: ["Draft", "Confirmed", "In Transit", "Delivered", "Cancelled"],
      transitions: {
        confirm: ["Draft", "Confirmed"],
        dispatch: ["Confirmed", "In Transit"],
        deliver: ["In Transit", "Delivered"],
        cancelDraft: ["Draft", "Cancelled"],
        cancelConfirmed: ["Confirmed", "Cancelled"],
      },
    },
    relationships: {
      placedBy: { target: "Customer", required: true },
      assignedDriver: { target: "Driver", required: false },
    },
    actions: {
      assignDriver: {
        input: { driver: { reference: "Driver", required: true } },
        capability: "order.assign_driver",
        effects: [{ createRelationship: "assignedDriver", to: "$input.driver" }],
        audit: { driver: "value" },
      },
    },
  },
  null,
  2,
);
export function PlatformModelPreview() {
  const { ref, entered, reducedMotion } = useScrollEntrance();
  return (
    <Stage
      stageRef={ref}
      entered={entered}
      background="Cover Purple.png"
      label="The Order object type: fields, lifecycle, relationships and the Assign driver action"
    >
      <Swipe entered={entered} reduced={reducedMotion} className={styles.modelCode} delay={0.08}>
        <PreviewPanel theme="dark" className={styles.panel}>
          <Bar trailing={<OpTag>Illustrative</OpTag>}>order.model.json</Bar>
          <Code text={model} started={entered} reduced={reducedMotion} />
        </PreviewPanel>
      </Swipe>
      <Swipe entered={entered} reduced={reducedMotion} className={styles.modelDoc}>
        <PreviewPanel theme="dark" className={styles.panel}>
          <Bar>
            <span className={styles.muted}>Acme Logistics / Model / </span>Order
          </Bar>
          <div className={styles.document}>
            <strong className={styles.docTitle}>Order</strong>
            <p>
              An order is placed by a customer and moves through a defined lifecycle. A driver can be assigned to it.
            </p>
            <small>Lifecycle</small>
            <div className={styles.docStates}>
              {["Draft", "Confirmed", "In Transit", "Delivered"].map((state, i) => (
                <span key={state}>
                  <OpTag tone={stateTones[state]} dot>
                    {state}
                  </OpTag>
                  {i < 3 && <OpIcon name="arrow" />}
                </span>
              ))}
              <OpTag tone="red" dot>
                Cancelled
              </OpTag>
            </div>
            <small>Relationships</small>
            <ul>
              <li>
                <ObjectChip id="Customer" /> places the order. Required.
              </li>
              <li>
                <ObjectChip id="Driver" /> is the assigned driver. Optional.
              </li>
            </ul>
            <small>Actions</small>
            <ul>
              <li>
                <strong>Assign driver</strong> requires <code>order.assign_driver</code>, takes a Driver reference and
                creates the assignment. It does not change the order’s state.
              </li>
            </ul>
          </div>
        </PreviewPanel>
      </Swipe>
    </Stage>
  );
}

/* Workspaces */

export function PlatformWorkspacePreview() {
  const { ref, entered, reducedMotion } = useScrollEntrance();
  return (
    <Stage
      stageRef={ref}
      entered={entered}
      background="Cover Perma Frost.png"
      label="The Orders collection and an order detail, generated from the model"
    >
      <Swipe entered={entered} reduced={reducedMotion} className={styles.collection}>
        <PreviewPanel theme="dark" className={styles.panel}>
          <Bar>
            <span className={styles.muted}>Data / </span>Orders
          </Bar>
          <div className={styles.filters} aria-hidden="true">
            <span>
              <OpIcon name="search" /> Search orders
            </span>
            <span>State: Any</span>
            <span>Priority: Any</span>
            <span>Newest first</span>
          </div>
          <div className={styles.collectionRows}>
            <CollectionList
              label="Orders"
              selected={storyOrderId}
              rows={orders.map((order) => ({
                id: order.id,
                title: order.id,
                subtitle: `${order.customer}${order.driver ? ` · ${order.driver}` : ""}`,
                tags: [{ label: order.state, tone: stateTones[order.state] }],
              }))}
            />
          </div>
        </PreviewPanel>
      </Swipe>
      <Swipe entered={entered} reduced={reducedMotion} className={styles.detail} delay={0.1}>
        <PreviewPanel theme="dark" className={styles.panel}>
          <Bar>
            <span className={styles.muted}>Orders / </span>
            {storyOrderId}
          </Bar>
          <div className={styles.panelBody}>
            <ObjectDetail record={orderRecord(story)} sections={["properties", "details", "related"]} />
          </div>
        </PreviewPanel>
      </Swipe>
    </Stage>
  );
}

/* Actions & Workflows */

export function PlatformActionPreview() {
  const { ref, entered, reducedMotion } = useScrollEntrance();
  const [driver, setDriver] = useState<string | undefined>(drivers[0].name);
  const [done, setDone] = useState(false);
  return (
    <Stage
      stageRef={ref}
      entered={entered}
      background="Cover Banana Terracota.png"
      label="Running the Assign driver action on an order and recording its activity"
    >
      <Swipe entered={entered} reduced={reducedMotion} className={styles.actionDetail}>
        <PreviewPanel theme="dark" className={styles.panel}>
          <Bar>
            <span className={styles.muted}>Orders / </span>
            {storyOrderId}
          </Bar>
          <div className={styles.panelBody}>
            <ObjectDetail
              record={orderRecord(story, done ? driver : undefined)}
              sections={["properties", "related", "activity"]}
              highlight={done ? "result" : undefined}
              activityHighlight={done ? "assigned" : undefined}
            />
          </div>
        </PreviewPanel>
      </Swipe>
      <Swipe entered={entered} reduced={reducedMotion} className={styles.actionDialog} delay={0.1}>
        {done ? (
          <div className={styles.actionDone}>
            <Toast>Action completed.</Toast>
            <button
              type="button"
              className={styles.replay}
              onClick={() => {
                setDone(false);
                setDriver(drivers[0].name);
              }}
            >
              Run it again ↻
            </button>
          </div>
        ) : (
          <ActionDialog
            title={assignDriver.name}
            subject={storyOrderId}
            input={assignDriver.input}
            query={assignDriver.query}
            options={drivers}
            selected={driver}
            requirement={
              <>
                Requires <code>{assignDriver.permission}</code>, granted to the {assignDriver.role} role.
              </>
            }
            effect={assignDriver.effect}
            onSelect={setDriver}
            onConfirm={() => setDone(true)}
            onCancel={() => setDriver(undefined)}
          />
        )}
      </Swipe>
    </Stage>
  );
}

/* Intelligence & Agents */

type ProposalStep = "proposed" | "approved" | "executed";
const executedEntry: ActivityEntry = {
  id: "agent",
  actor: viewer.name,
  text: `ran ${agentProposal.action}`,
  detail: `Driver: ${agentProposal.input} · proposed by ${agentProposal.agent}`,
  time: "Mon 08:21",
  tone: "green",
  badge: agentProposal.badge,
};
export function PlatformIntelligencePreview() {
  const { ref, entered, reducedMotion } = useScrollEntrance();
  const [step, setStep] = useState<ProposalStep>("proposed");
  return (
    <Stage
      stageRef={ref}
      entered={entered}
      background="Cover Cotton Candy.png"
      label="An operational briefing and an agent proposal that a person approves and executes"
    >
      <Swipe entered={entered} reduced={reducedMotion} className={styles.briefing}>
        <PreviewPanel theme="dark" className={styles.panel}>
          <Bar trailing={briefing.status === "design-preview" ? <OpTag tone="blue">Design preview</OpTag> : undefined}>
            Inbox
          </Bar>
          <div className={styles.panelBody}>
            <BriefingCard {...briefing} items={briefing.items.slice(0, 2)} />
          </div>
        </PreviewPanel>
      </Swipe>
      <Swipe entered={entered} reduced={reducedMotion} className={styles.proposal} delay={0.1}>
        <PreviewPanel theme="dark" className={styles.panel}>
          <Bar trailing={<OpTag>Experimental</OpTag>}>
            <span className={styles.muted}>Agent analysis / </span>
            {agentProposal.subject}
          </Bar>
          <div className={styles.panelBody}>
            <div className={styles.proposalBody}>
              <small className={styles.label}>
                <OpIcon name="spark" /> {agentProposal.agent} · {agentProposal.expires}
              </small>
              <div className={styles.proposalAction}>
                <span>Proposed action</span>
                <strong>
                  {agentProposal.action} <OpIcon name="arrow" /> {agentProposal.input}
                </strong>
              </div>
              <p>{agentProposal.rationale}</p>
              <div className={styles.evidence}>
                <span>Evidence</span>
                {agentProposal.evidence.map((item) => (
                  <ObjectChip key={item} id={item} />
                ))}
              </div>
              {step === "proposed" && (
                <div className={styles.proposalActions}>
                  <ActionButton primary onClick={() => setStep("approved")} label="Approve proposal">
                    Approve
                  </ActionButton>
                  <ActionButton>Reject</ActionButton>
                </div>
              )}
              {step === "approved" && (
                <div className={styles.proposalActions}>
                  <ActionButton primary onClick={() => setStep("executed")} icon="check">
                    Execute approved action
                  </ActionButton>
                  <span className={styles.muted}>Runs with your permissions, after checking nothing changed.</span>
                </div>
              )}
              {step === "executed" && (
                <div className={styles.executed}>
                  <ActivityTimeline entries={[executedEntry]} highlight="agent" />
                  <button type="button" className={styles.replay} onClick={() => setStep("proposed")}>
                    Replay ↻
                  </button>
                </div>
              )}
            </div>
          </div>
        </PreviewPanel>
      </Swipe>
    </Stage>
  );
}

/* Governance & Security */

const capabilities = [
  ["order.read", "Read orders", true],
  ["order.create", "Create orders", true],
  ["order.assign_driver", "Run Assign driver", true],
  ["customer.read", "Read customers", true],
  ["order.archive", "Archive orders", false],
  ["ontology.manage", "Change the model", false],
] as const;
const auditTrail: ActivityEntry[] = [
  executedEntry,
  {
    id: "priority",
    actor: "Diego Marín",
    text: "set Priority to Urgent",
    detail: "Priority: Normal → Urgent",
    time: "Fri 17:41",
    tone: "amber",
  },
  { id: "created", actor: "Diego Marín", text: `created ${storyOrderId}`, detail: "State: Draft", time: "Fri 17:40" },
];
export function PlatformGovernancePreview() {
  const { ref, entered, reducedMotion } = useScrollEntrance();
  return (
    <Stage
      stageRef={ref}
      entered={entered}
      background="Cover Jungle.png"
      label="Role permissions for a logistics operator and the append-only activity of an order"
    >
      <Swipe entered={entered} reduced={reducedMotion} className={styles.role}>
        <PreviewPanel theme="dark" className={styles.panel}>
          <Bar trailing={<OpTag tone="green">Isolated organization</OpTag>}>
            <span className={styles.muted}>Acme Logistics / Roles / </span>Logistics operator
          </Bar>
          <div className={styles.panelBody}>
            <small className={styles.label}>Capabilities</small>
            <div className={styles.capabilities}>
              {capabilities.map(([key, text, enabled]) => (
                <div key={key}>
                  <span>
                    <code>{key}</code>
                    <small>{text}</small>
                  </span>
                  <PreviewSwitch enabled={enabled} />
                </div>
              ))}
            </div>
          </div>
        </PreviewPanel>
      </Swipe>
      <Swipe entered={entered} reduced={reducedMotion} className={styles.audit} delay={0.1}>
        <PreviewPanel theme="dark" className={styles.panel}>
          <Bar>
            <span className={styles.muted}>{storyOrderId} / </span>Activity
          </Bar>
          <div className={styles.panelBody}>
            <ActivityTimeline entries={auditTrail} />
            <p className={styles.appendOnly}>
              <OpIcon name="lock" /> Append-only. Events can’t be edited or deleted.
            </p>
          </div>
        </PreviewPanel>
      </Swipe>
    </Stage>
  );
}

/* Know what matters: the Inbox briefing and the tasks waiting on the operator. */

export function AttentionPreview() {
  const { ref, entered, reducedMotion } = useScrollEntrance();
  return (
    <Stage
      stageRef={ref}
      entered={entered}
      background="Cover Cotton Candy.png"
      label="The Inbox: a daily briefing with exceptions, and the tasks waiting for the operator"
    >
      <Swipe entered={entered} reduced={reducedMotion} className={styles.briefing}>
        <PreviewPanel theme="dark" className={styles.panel}>
          <Bar trailing={briefing.status === "design-preview" ? <OpTag tone="blue">Design preview</OpTag> : undefined}>
            Inbox
          </Bar>
          <div className={styles.panelBody}>
            <BriefingCard {...briefing} />
          </div>
        </PreviewPanel>
      </Swipe>
      <Swipe entered={entered} reduced={reducedMotion} className={styles.tasks} delay={0.1}>
        <PreviewPanel theme="dark" className={styles.panel}>
          <Bar>My tasks</Bar>
          <div className={styles.collectionRows}>
            <CollectionList
              label="My tasks"
              selected={storyOrderId}
              rows={[
                {
                  id: storyOrderId,
                  title: "Assign a driver",
                  subtitle: `${storyOrderId} · Altamira Retail · due 5:00 PM`,
                  tags: [{ label: "Urgent", tone: "red" }],
                },
                {
                  id: "unassigned",
                  title: "3 confirmed orders without a driver",
                  subtitle: "Orders · Confirmed",
                  tags: [{ label: "Exception", tone: "amber" }],
                },
                {
                  id: "approval",
                  title: "Approve rescheduled delivery",
                  subtitle: "PO-48205 · requested by Diego Marín",
                  tags: [{ label: "Approval", tone: "blue" }],
                },
                {
                  id: "PO-48208",
                  title: "Review cancelled order",
                  subtitle: "PO-48208 · Norte Home",
                  tags: [{ label: "Cancelled", tone: "red" }],
                },
              ]}
            />
          </div>
        </PreviewPanel>
      </Swipe>
    </Stage>
  );
}

/* Adapt as operations change: one change to the order process, applied to the same model. */

const lifecycleBefore = ["Draft", "Confirmed", "In Transit", "Delivered"] as const;
const lifecycleAfter = ["Draft", "Confirmed", "Quality check", "In Transit", "Delivered"] as const;
const changes = [
  ["New stage", "Quality check, between Confirmed and In Transit."],
  ["New action", "Pass quality check, available to the Warehouse lead role."],
  ["New rule", "An order can’t be dispatched until its quality check has passed."],
  ["Unchanged", "Existing orders, their history, and every other workflow."],
] as const;

export function AdaptPreview() {
  const { ref, entered, reducedMotion } = useScrollEntrance();
  const [applied, setApplied] = useState(true);
  return (
    <Stage
      stageRef={ref}
      entered={entered}
      background="Cover Banana Terracota.png"
      label="A process change: adding a quality check stage to the order lifecycle"
    >
      <Swipe entered={entered} reduced={reducedMotion} className={styles.adapt}>
        <PreviewPanel theme="dark" className={styles.panel}>
          <Bar trailing={<OpTag>Illustrative</OpTag>}>
            <span className={styles.muted}>Acme Logistics / Change / </span>Add a quality check before dispatch
          </Bar>
          <div className={styles.panelBody}>
            <div className={styles.adaptToggle} role="group" aria-label="Order process version">
              <button type="button" aria-pressed={!applied} onClick={() => setApplied(false)}>
                Current process
              </button>
              <button type="button" aria-pressed={applied} onClick={() => setApplied(true)}>
                With the change
              </button>
            </div>
            <small className={styles.label}>Order lifecycle</small>
            <StateBar
              key={applied ? "after" : "before"}
              states={applied ? lifecycleAfter : lifecycleBefore}
              current={applied ? "Quality check" : "Confirmed"}
              terminal="Cancelled"
            />
            <dl className={styles.changes} data-applied={applied}>
              {changes.map(([term, text]) => (
                <div key={term} data-kind={term === "Unchanged" ? "kept" : "new"}>
                  <dt>{term}</dt>
                  <dd>{text}</dd>
                </div>
              ))}
            </dl>
          </div>
        </PreviewPanel>
      </Swipe>
    </Stage>
  );
}

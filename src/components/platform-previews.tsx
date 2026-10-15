"use client";

import Image from "next/image";
import { useEffect, useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useScrollEntrance } from "@/hooks/use-scroll-entrance";
import { PreviewPanel, PreviewPerson, PreviewTag, PreviewSpinner, PreviewIcon, PreviewAvatar } from "./preview-ui";
import styles from "./platform-previews.module.css";

const assets = "/assets/figma/platform-v2/";
function Asset({ file, width = 20, height = width }: { file: string; width?: number; height?: number }) {
  return <Image src={`${assets}${file}`} width={width} height={height} alt="" />;
}
function Bar({ children, code = false }: { children: ReactNode; code?: boolean }) {
  return (
    <div className={styles.bar}>
      <span>{children}</span>
      {code ? <Asset file="3d03b.svg" width={16} /> : <span aria-hidden="true">···</span>}
    </div>
  );
}
function Stage({
  background,
  children,
  entered,
  stageRef,
  label,
}: {
  background: string;
  children: ReactNode;
  entered: boolean;
  stageRef: React.RefObject<HTMLDivElement | null>;
  label: string;
}) {
  return (
    <div ref={stageRef} className={styles.stage} data-entered={entered} role="group" aria-label={label}>
      <Image
        className={styles.background}
        src={`/assets/figma/backgrounds/${background}`}
        fill
        sizes="(max-width: 760px) 100vw, 1280px"
        alt=""
      />
      {children}
    </div>
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
function FastText({
  text,
  started,
  reduced,
  className,
}: {
  text: string;
  started: boolean;
  reduced: boolean;
  className?: string;
}) {
  const [length, setLength] = useState(0);
  useEffect(() => {
    if (!started || reduced) return;
    const start = performance.now();
    const timer = window.setInterval(() => {
      const progress = Math.min(1, (performance.now() - start) / 720);
      setLength(Math.ceil(text.length * progress));
      if (progress === 1) window.clearInterval(timer);
    }, 24);
    return () => window.clearInterval(timer);
  }, [started, reduced, text]);
  return (
    <span className={className}>
      <span className={styles.srOnly}>{text}</span>
      <span aria-hidden="true">{reduced ? text : text.slice(0, length)}</span>
    </span>
  );
}
const model = JSON.stringify(
  {
    model: "DeliveryAssignment",
    version: "1.0",
    objects: {
      Delivery: {
        fields: {
          status: { type: "enum", values: ["pending", "assigned", "in_progress", "completed", "cancelled"] },
          assignedAt: { type: "datetime", nullable: true },
        },
        relationships: {
          order: { target: "Order", required: true },
          driver: { target: "Driver", required: false },
          serviceZone: { target: "ServiceZone", required: true },
        },
      },
    },
    actions: {
      assignDriver: {
        target: "Delivery",
        input: { driver: { type: "reference", target: "Driver" } },
        permissions: { roles: ["Dispatcher"] },
        conditions: {
          all: [
            { field: "delivery.status", operator: "equals", value: "pending" },
            { field: "delivery.driver", operator: "isNull" },
            { field: "driver.status", operator: "equals", value: "active" },
            { field: "driver.available", operator: "equals", value: true },
            { field: "driver.serviceZone", operator: "equalsField", value: "delivery.serviceZone" },
            { metric: "driver.activeDeliveries", operator: "lessThan", value: 3 },
          ],
        },
        effects: [
          { operation: "setRelationship", field: "delivery.driver", value: "$input.driver" },
          { operation: "setField", field: "delivery.status", value: "assigned" },
          { operation: "setField", field: "delivery.assignedAt", value: "$now" },
        ],
      },
    },
  },
  null,
  2,
);
const relationships = JSON.stringify(
  {
    exportVersion: "1.0",
    exportedAt: "2026-10-14T18:30:00Z",
    workspace: "acme-logistics",
    relationships: [
      {
        id: "rel_001",
        type: "placed_by",
        source: { object: "Order", id: "ORD-1042" },
        target: { object: "Customer", id: "CUS-018" },
      },
      {
        id: "rel_002",
        type: "fulfilled_by",
        source: { object: "Order", id: "ORD-1042" },
        target: { object: "Delivery", id: "DLV-1042" },
      },
      {
        id: "rel_003",
        type: "assigned_to",
        source: { object: "Delivery", id: "DLV-1042" },
        target: { object: "Driver", id: "DRV-007" },
        metadata: { assignedAt: "2026-10-14T16:12:00Z", assignedBy: "USR-003" },
      },
      {
        id: "rel_004",
        type: "operates_in",
        source: { object: "Driver", id: "DRV-007" },
        target: { object: "ServiceZone", id: "ZONE-03" },
      },
    ],
  },
  null,
  2,
);
function Code({
  text,
  started,
  reduced,
  exportCode = false,
}: {
  text: string;
  started: boolean;
  reduced: boolean;
  exportCode?: boolean;
}) {
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
    <pre className={`${styles.code} ${exportCode ? styles.exportCode : ""}`} aria-label="JSON preview">
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
export function PlatformLogicPreview() {
  const { ref, entered, reducedMotion } = useScrollEntrance();
  return (
    <Stage
      stageRef={ref}
      entered={entered}
      background="CoverPurple.png"
      label="Business requirements translated into a declarative model"
    >
      <Swipe entered={entered} reduced={reducedMotion} className={styles.logicCode} delay={0.08}>
        <PreviewPanel theme="dark" className={styles.panel}>
          <Bar code>delivery-assignment.json</Bar>
          <Code text={model} started={entered} reduced={reducedMotion} />
        </PreviewPanel>
      </Swipe>
      <Swipe entered={entered} reduced={reducedMotion} className={styles.logicDoc}>
        <PreviewPanel theme="dark" className={styles.panel}>
          <Bar>
            <span className={styles.muted}>Acme / Docs / </span>Delivery Assignment
          </Bar>
          <div className={styles.document}>
            <h3>Delivery Assignment</h3>
            <div className={styles.metadata}>
              <div>
                <small>Owner</small>
                <PreviewPerson initials="CE" name="Carolina Enríquez" color="#ffa700" />
              </div>
              <div>
                <small>Last edit</small>
                <PreviewTag>3d ago</PreviewTag>
              </div>
              <div>
                <small>Version</small>
                <PreviewTag>4.3</PreviewTag>
              </div>
            </div>
            <h4>Overview</h4>
            <p>
              <FastText
                text="Every delivery belongs to an order and must be assigned to an available driver before it can begin."
                started={entered}
                reduced={reducedMotion}
              />
            </p>
            <h4>Assignment rules</h4>
            <ul>
              {[
                "Only users with the Dispatcher role can assign drivers.",
                "A delivery must be in Pending status.",
                "The selected driver must be active and available.",
                "The driver must operate in the same service zone as the delivery.",
                "A driver cannot have more than 3 active deliveries.",
              ].map((rule) => (
                <li key={rule}>
                  <FastText text={rule} started={entered} reduced={reducedMotion} />
                </li>
              ))}
            </ul>
            <h4>When a driver is assigned</h4>
            <ul>
              <li>The driver is linked to the delivery.</li>
              <li>The delivery status changes from Pending to Assigned.</li>
              <li>The assignment timestamp is recorded.</li>
              <li>The delivery remains linked to its original order.</li>
            </ul>
          </div>
        </PreviewPanel>
      </Swipe>
    </Stage>
  );
}
const steps = [
  "Inspecting the delivery model",
  "Checking existing permissions",
  "Validating assignment conditions",
  "Preparing the assignment action",
];
export function PlatformAgentPreview() {
  const { ref, entered, reducedMotion } = useScrollEntrance();
  const [time, setTime] = useState(0);
  const [manualAssigned, setManualAssigned] = useState(false);
  const [cycle, setCycle] = useState(0);
  useEffect(() => {
    if (!entered || reducedMotion) return;
    let previous = performance.now();
    let accumulated = 0;
    const timer = window.setInterval(() => {
      const now = performance.now();
      const delta = now - previous;
      previous = now;
      if (!document.hidden) {
        accumulated = Math.min(accumulated + delta, 9200);
        setTime(accumulated);
        if (accumulated === 9200) window.clearInterval(timer);
      }
    }, 50);
    return () => window.clearInterval(timer);
  }, [entered, reducedMotion, cycle]);
  const elapsed = reducedMotion ? 9200 : time;
  const ready = elapsed >= 5700;
  const assigned = elapsed >= 7900 || manualAssigned;
  const replay = () => {
    setTime(0);
    setManualAssigned(false);
    setCycle((value) => value + 1);
  };
  return (
    <Stage
      stageRef={ref}
      entered={entered}
      background="Cover Banana Terracota.png"
      label="Agent configures a delivery assignment action, then a dispatcher assigns a driver"
    >
      <Swipe entered={entered} reduced={reducedMotion} className={styles.agent}>
        <PreviewPanel theme="dark" className={styles.panel}>
          <Bar>System Configuration Agent</Bar>
          <div className={styles.agentBody}>
            <motion.div
              className={styles.prompt}
              initial={false}
              animate={{ opacity: elapsed >= 450 ? 1 : 0, y: elapsed >= 450 ? 0 : 90 }}
              transition={{ duration: reducedMotion ? 0 : 0.5 }}
            >
              Help me assign deliveries to drivers. Only dispatchers should be able to do this, and drivers must be
              available in the same service zone.
            </motion.div>
            <div className={styles.response} style={{ opacity: elapsed >= 1200 ? 1 : 0 }}>
              <small>{ready ? "Operational change ready" : "Preparing an operational change…"}</small>
              {steps.map((step, i) => {
                const active = elapsed >= 1400 + i * 1000;
                const complete = elapsed >= 2400 + i * 1000;
                return (
                  <div className={`${styles.step} ${!active ? styles.pending : ""}`} key={step}>
                    {complete ? (
                      <PreviewIcon file="cfc20" />
                    ) : active ? (
                      <PreviewSpinner file="94283" />
                    ) : (
                      <Asset file="67a10.svg" />
                    )}
                    <span>{step}</span>
                  </div>
                );
              })}
              <motion.p
                initial={false}
                animate={{ opacity: ready ? 1 : 0, y: ready ? 0 : 6 }}
                transition={{ duration: reducedMotion ? 0 : 0.25 }}
              >
                The assignment action is ready. Dispatchers can now assign an available driver in the same service zone
                to an unassigned delivery. Existing permissions and business rules remain in effect.
              </motion.p>
            </div>
            <div className={styles.composer}>
              <span>Ask or describe changes to your business model.</span>
              <div>
                <Asset file="f76a5.svg" width={16} />
                <span className={styles.composerActions}>
                  <Asset file="37d7d.svg" width={16} />
                  <Asset file="b36eb.svg" width={16} />
                </span>
              </div>
            </div>
          </div>
        </PreviewPanel>
      </Swipe>
      <Swipe entered={entered} reduced={reducedMotion} className={styles.order} delay={0.1}>
        <PreviewPanel theme="dark" className={styles.panel}>
          <Bar>
            <span className={styles.muted}>Orders / </span>Order Detail
          </Bar>
          <div className={styles.orderBody}>
            <h3>Order #1042</h3>
            <small>Customer</small>
            <PreviewPerson initials="SR" name="Sofía Ramírez" color="#2980ff" />
            <div className={styles.route}>
              <small>Route</small>
              <p>
                <Asset file="b836a.svg" width={16} />
                Milwaukee 5011, Int. 2. Nápoles. Benito Juárez. Ciudad de México
              </p>
              <Asset file="d9782.svg" width={16} height={8} />
              <p>
                <Asset file="b5d91.svg" width={16} />
                Porfirio Díaz 23, Int. 102. Del Valle Sur. Benito Juárez. Ciudad de México
              </p>
            </div>
            <div className={styles.metadata}>
              <div>
                <small>Payout</small>
                <PreviewTag>$12.04</PreviewTag>
              </div>
              <div>
                <small>Distance</small>
                <PreviewTag>2.5 km</PreviewTag>
              </div>
              <div>
                <small>Expected time</small>
                <PreviewTag>8 min</PreviewTag>
              </div>
            </div>
            <AnimatePresence>
              {ready && (
                <motion.div
                  className={styles.assignment}
                  key="assignment"
                  initial={reducedMotion ? false : { opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  transition={{ duration: reducedMotion ? 0 : 0.35 }}
                >
                  <small>Assigned driver</small>
                  <AnimatePresence mode="wait" initial={false}>
                    {assigned ? (
                      <motion.div
                        key="driver"
                        className={styles.driver}
                        initial={reducedMotion ? false : { opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: reducedMotion ? 0 : 0.3 }}
                      >
                        <div>
                          <PreviewAvatar initials="ML" color="#7263dd" />
                          <div>
                            <strong>María López</strong>
                            <small>m.lopez.03@acme.com.mx</small>
                          </div>
                        </div>
                        <div className={styles.tags}>
                          <PreviewTag tone="green" dot>
                            Active
                          </PreviewTag>
                          <PreviewTag tone="green" dot>
                            Available
                          </PreviewTag>
                          <PreviewTag>Zone 03</PreviewTag>
                        </div>
                      </motion.div>
                    ) : (
                      <motion.button
                        key="empty"
                        type="button"
                        className={styles.assignButton}
                        aria-label="Assign María López to this delivery"
                        onClick={() => setManualAssigned(true)}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1, scale: elapsed >= 7500 ? 0.97 : 1 }}
                        exit={{ opacity: 0, scale: 0.97 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Asset file="f76a5.svg" width={16} />
                        {elapsed >= 6800 && (
                          <motion.span
                            aria-hidden="true"
                            className={styles.cursor}
                            initial={{ x: 90, y: 65, opacity: 0 }}
                            animate={{ x: 0, y: 0, opacity: 1 }}
                            transition={{ duration: 0.5 }}
                          >
                            ↖
                          </motion.span>
                        )}
                      </motion.button>
                    )}
                  </AnimatePresence>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </PreviewPanel>
      </Swipe>
      <button
        type="button"
        className={styles.replay}
        onClick={replay}
        aria-label="Replay delivery assignment animation"
      >
        Replay ↻
      </button>
    </Stage>
  );
}
const integrations = [
  [
    "65182.png",
    "Accounting Revenue Book",
    "https://graph.microsoft.com/v1.0/me/…",
    "Outgoing",
    "Order",
    "Order.Completed",
    "Now",
  ],
  [
    "2e2fa.png",
    "Shopify Sales Data",
    "https://api.shopify.com/v1/orders.json",
    "Incoming",
    "Order",
    "Order.Created",
    "Now",
  ],
  [
    "f802c.png",
    "Stripe Payment Transactions",
    "https://api.stripe.com/v1/charges",
    "Incoming",
    "Payment",
    "Order.Paid",
    "Now",
  ],
  [
    "f7830.png",
    "PayPal Sales Records",
    "https://api.paypal.com/v1/payments/…",
    "Incoming",
    "Sale",
    "Order.Completed",
    "5 minutes ago",
  ],
  [
    "eed14.png",
    "Apple Pay Receipts",
    "https://api.apple.com/payments/…",
    "Incoming",
    "Receipt",
    "Order.Paid",
    "30 seconds ago",
  ],
  [
    "268dc.png",
    "Square Transaction Logs",
    "https://connect.squareup.com/v2/…",
    "Incoming",
    "Payment",
    "Order.Paid",
    "10 minutes ago",
  ],
  ["c5886.png", "Google Pay Transactions", "https://pay.google.com/…", "Incoming", "Payment", "Order.Paid", "Just now"],
  [
    "ce692.png",
    "Amazon Seller Transactions",
    "https://sellingpartnerapi.amazon.com/…",
    "Incoming",
    "Transaction",
    "Order.Paid",
    "1 hour ago",
  ],
  [
    "2e2fa.png",
    "Shopify Order Payments",
    "https://api.shopify.com/v1/…",
    "Incoming",
    "Order",
    "Order.Paid",
    "2 minutes ago",
  ],
];
export function PlatformIntegrationsPreview() {
  const { ref, entered, reducedMotion } = useScrollEntrance();
  return (
    <Stage
      stageRef={ref}
      entered={entered}
      background="Cover Perma Frost.png"
      label="Connected business systems and their operational mappings"
    >
      <motion.div
        className={styles.integrations}
        initial={false}
        animate={{
          opacity: entered ? 1 : 0,
          y: entered || reducedMotion ? 0 : 32,
          filter: entered || reducedMotion ? "blur(0px)" : "blur(4px)",
        }}
        transition={{ duration: reducedMotion ? 0 : 0.55, ease: [0.16, 1, 0.3, 1] }}
      >
        <PreviewPanel theme="dark" className={styles.panel}>
          <Bar>
            <span className={styles.muted}>Orders / </span>Integrations
          </Bar>
          <div className={styles.integrationBody}>
            <h3>Integrations</h3>
            <p>Connect your tools and manage the rules that govern your data.</p>
            <div className={styles.integrationGrid}>
              {integrations.map(([logo, name, url, type, object, mapped, sync]) => (
                <div className={styles.integrationCard} key={name}>
                  <div className={styles.integrationTitle}>
                    <Asset file={logo} width={36} />
                    <div>
                      <strong>{name}</strong>
                      <small>{url}</small>
                    </div>
                    <Asset file="2bf92.svg" width={32} height={21} />
                  </div>
                  <dl>
                    {[
                      ["Type", type],
                      ["Object", object],
                      ["Mapped to", mapped],
                      ["Last sync", sync],
                    ].map(([label, value]) => (
                      <div key={label}>
                        <dt>{label}</dt>
                        <dd>
                          <PreviewTag>{value}</PreviewTag>
                        </dd>
                      </div>
                    ))}
                  </dl>
                </div>
              ))}
            </div>
          </div>
        </PreviewPanel>
      </motion.div>
    </Stage>
  );
}
const exportFiles = [
  ["orders.json", "Order records and attributes"],
  ["deliveries.json", "Delivery records and status"],
  ["team-members.json", "Team information and permissions"],
  ["drivers.json", "Drivers and assignment data"],
  ["relationships.json", "Connections between records"],
  ["schema.json", "Object definitions and field types"],
];
export function PlatformExportPreview() {
  const { ref, entered, reducedMotion } = useScrollEntrance();
  return (
    <Stage
      stageRef={ref}
      entered={entered}
      background="Cover Jungle.png"
      label="Portable business data, relationships, and schema export preview"
    >
      <Swipe entered={entered} reduced={reducedMotion} className={styles.exportPanel}>
        <PreviewPanel theme="dark" className={styles.panel}>
          <Bar>
            <span className={styles.muted}>My Business / Advanced Options / </span>Export my data
          </Bar>
          <div className={styles.exportBody}>
            <h3>Export your data</h3>
            <p>Prepare a portable copy of your operational data and its relationships.</p>
            <div className={styles.exportList}>
              <strong>Operations export</strong>
              <p>JSON package · All selected records</p>
              {exportFiles.map(([name, description]) => (
                <div className={styles.exportFile} key={name}>
                  <Asset file="43749.png" width={36} />
                  <div>
                    <strong>{name}</strong>
                    <small>{description}</small>
                  </div>
                  <span className={styles.checkbox}>
                    <Asset file="1c59a.svg" width={16} />
                  </span>
                </div>
              ))}
            </div>
          </div>
        </PreviewPanel>
      </Swipe>
      <Swipe entered={entered} reduced={reducedMotion} className={styles.exportCodePanel} delay={0.08}>
        <PreviewPanel theme="dark" className={styles.panel}>
          <Bar code>relationships.json</Bar>
          <Code text={relationships} started={entered} reduced={reducedMotion} exportCode />
        </PreviewPanel>
      </Swipe>
    </Stage>
  );
}

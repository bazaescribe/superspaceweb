"use client";

import Image from "next/image";
import { FeatureBento } from "./feature-bento";
import { ArrowsClockwise, DotsThree, Funnel, Kanban, MapPin, Plus, Table } from "@phosphor-icons/react";
import { SystemSection } from "./section-system";
import styles from "./key-features.module.css";

const assets = "/assets/figma/key-features/";
function Icon({ file }: { file: string }) {
  // Preserve the exported SVG's intrinsic dimensions.
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={`${assets}${file}.svg`} alt="" />;
}
function NewIcon({ file }: { file: string }) {
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={`/assets/figma/features-iteration/${file}.svg`} alt="" />;
}
function PlatformIcon({ file }: { file: string }) {
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={`/assets/figma/platform/${file}.svg`} alt="" />;
}
function PreviewHeader({ prefix, children }: { prefix: string; children: React.ReactNode }) {
  return (
    <div className={styles.previewHeader}>
      <span>{prefix} /</span>
      {children}
    </div>
  );
}
function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className={styles.field}>
      <small>{label}</small>
      <div>{children}</div>
    </div>
  );
}
function WorkflowMockup() {
  return (
    <div className={styles.workflow} aria-hidden="true">
      <div className={`${styles.panel} ${styles.request}`}>
        <div className={styles.map}>
          <Image src={`${assets}ab7ce.png`} alt="" width={407} height={593} />
          <span className={styles.pin}>
            <Icon file="52760" />
            MTP-3012
          </span>
        </div>
        <div className={styles.panelBody}>
          <Field label="Equipment request">
            <strong>MTP-3012</strong>
          </Field>
          <Field label="Location">Finca El Sauce, Jucutácato, Uruapan, Michoacán, Mexico.</Field>
          <Field label="Needed for">Sep. 30th. 8:00 AM.</Field>
          <Field label="Requested Machinery">
            <div className={styles.machine}>
              <Image src={`${assets}8d3e5.png`} alt="" width={153} height={80} />
            </div>
            <span className={styles.machineLabel}>Excavator</span>
          </Field>
        </div>
      </div>
      <div className={`${styles.panel} ${styles.assignment}`}>
        <div className={styles.panelBody}>
          <strong>MTP-3012</strong>
          <Field label="Location">
            <div className={styles.ellipsis}>Finca El Sauce, Jucutácato, Uruapan, Michoacán, Mexico.</div>
          </Field>
          <Field label="Select machinery warehouse">
            <div className={styles.select}>
              Uruapan II
              <Icon file="00e83" />
            </div>
          </Field>
          <Field label="Assign Operator">
            <div className={styles.select}>
              <span className={styles.operator}>
                <b>MR</b>Mario Rubio
              </span>
              <Icon file="d70f8" />
            </div>
          </Field>
          <div className={styles.actions}>
            <span>Deny</span>
            <span>Assign</span>
          </div>
        </div>
      </div>
      <div className={styles.notification}>
        <Icon file="0008f" />
        <div>
          <b>Assignations Bot @ Superspace</b>
          <p>New Excavation service assigned to you at Finca El Sauce, click here to see more details</p>
        </div>
        <small>3m ago</small>
      </div>
    </div>
  );
}
export function PermissionsMockup({ platform = false }: { platform?: boolean } = {}) {
  return (
    <div className={`${styles.panel} ${styles.permissions}`} aria-hidden="true">
      <div className={styles.portrait}>
        <Image src={`${assets}fa3d3.png`} alt="" width={348} height={195} />
        <div className={styles.identity}>
          <div>
            <b>Sam Olguín</b>
            <p>Finance Lead</p>
          </div>
          <span>Manager</span>
          <span className={styles.active}>Active</span>
        </div>
      </div>
      <div className={styles.permissionsBody}>
        <Field label="Groups">
          <div className={styles.tags}>
            <span>Finances</span>
            <span>Support</span>
            <span>{platform ? <PlatformIcon file="83581" /> : <NewIcon file="006d8" />}</span>
          </div>
        </Field>
        <Field label="Effective permissions">
          {[
            ["Manage people", "Invite, edit and remove members."],
            ["View Audit Log", "Read org-wide activity."],
            ["Manage Billing", "Payment methods and invoices."],
          ].map(([title, detail]) => (
            <div className={styles.permission} key={title}>
              <div>
                {title}
                <p>{detail}</p>
              </div>
              {platform ? <PlatformIcon file="de0af" /> : <NewIcon file="0ee22" />}
            </div>
          ))}
        </Field>
      </div>
    </div>
  );
}
const events = [
  ["5008b", "Order placed at 8:23 AM."],
  ["5008b", "Courier assigned. 8:24 AM."],
  ["5008b", "Courier arrived at pickup. 8:32 AM."],
  ["b3063", "Package in transit."],
  ["b3063", "Estimated delivery by 8:44 AM."],
  ["0a1da", "Traffic rerouted through Market St."],
  ["29ed6", "Courier stopped for fuel. 8:36 AM."],
  ["0a1da", "Package held at security checkpoint."],
  ["29ed6", "Clearance approved. 8:41 AM."],
  ["0a1da", "Route changed due to road closure."],
  ["29ed6", "Courier arrived at delivery hub. 8:42 AM."],
  ["b61c5", "Package moved to final-mile handoff."],
  ["29ed6", "Delivery attempted. 8:43 AM."],
  ["b61c5", "Recipient unavailable."],
  ["29ed6", "Package left with concierge. 8:44 AM."],
];
export function ActivityMockup({ delivered = false }: { delivered?: boolean } = {}) {
  return (
    <div className={`${styles.panel} ${styles.activity}`} aria-hidden="true">
      <PreviewHeader prefix="F91W">Order Details</PreviewHeader>
      <div className={styles.auditBody}>
        <div>
          <strong>Delivery Request</strong>
          <div className={styles.deliveryMeta}>
            <Status>Delivered</Status>
            <small>20 Sep 2026, 8:43 AM</small>
          </div>
        </div>
        <Field label="Assigned Courier">
          <div className={styles.courier}>
            <span>MG</span>
            <div>
              Miguel Luis Galván<small>m.l.galvan@acme.com</small>
            </div>
          </div>
        </Field>
        <Field label="Recorded Events">
          <div className={styles.auditEvents}>
            {(delivered
              ? [
                  ...events.slice(0, 8),
                  ["29ed6", "Clearance approved 8:41 AM."],
                  ["29ed6", "Courier arrived at delivery destination 8:42 AM."],
                  ["29ed6", "Delivered 8:43 AM."],
                ]
              : events
            ).map(([, text], index) => (
              <div key={text}>
                <NewIcon file={index < 3 ? "70c25" : index < 5 ? "256f6" : "3cd3c"} />
                <span>{text.replace("Order placed", "Request placed")}</span>
                {index < events.length - 1 && (
                  <div className={styles.auditConnector}>
                    <NewIcon file="0bb6c" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </Field>
      </div>
    </div>
  );
}
function Status({ children, tone = "green" }: { children: React.ReactNode; tone?: "green" | "blue" | "amber" }) {
  return <span className={`${styles.status} ${styles[tone + "Status"]}`}>{children}</span>;
}
function MockupHeader({ eyebrow, title, children }: { eyebrow: string; title: string; children?: React.ReactNode }) {
  return (
    <div className={styles.mockupHeader}>
      <Field label={eyebrow}>
        <strong>{title}</strong>
      </Field>
      {children ?? <DotsThree size={20} />}
    </div>
  );
}
const deliveries = [
  {
    id: "RL2048",
    customer: "Café Nin",
    destination: "Roma Norte",
    owner: "MR",
    status: "In transit",
    tone: "blue" as const,
    time: "09:45 AM",
  },
  {
    id: "RL2047",
    customer: "Panadería Rosetta",
    destination: "Condesa",
    owner: "AL",
    status: "Assigned",
    tone: "amber" as const,
    time: "10:00 AM",
  },
  {
    id: "RL2046",
    customer: "Casa Bosques",
    destination: "Juárez",
    owner: "MR",
    status: "Delivered",
    tone: "green" as const,
    time: "09:32 AM",
  },
  {
    id: "RL2045",
    customer: "Hotel Carlota",
    destination: "Cuauhtémoc",
    owner: "SG",
    status: "In transit",
    tone: "blue" as const,
    time: "10:15 AM",
  },
];
function ViewsMockup() {
  return (
    <div className={styles.viewsScene} aria-hidden="true">
      <div className={`${styles.panel} ${styles.tablePanel}`}>
        <MockupHeader eyebrow="Relay / Operations" title="Deliveries">
          <span className={styles.miniAction}>
            <Plus size={12} /> New delivery
          </span>
        </MockupHeader>
        <div className={styles.viewTabs}>
          <span className={styles.selectedView}>
            <Table size={13} />
            Table
          </span>
          <span>
            <Kanban size={13} />
            Board
          </span>
          <span>
            <MapPin size={13} />
            Map
          </span>
          <span className={styles.viewFilter}>
            <Funnel size={12} />
            Today
          </span>
        </div>
        <table className={styles.deliveries}>
          <thead>
            <tr>
              <th>Shipment</th>
              <th>Customer</th>
              <th>Status</th>
              <th>Owner</th>
            </tr>
          </thead>
          <tbody>
            {deliveries.map((d) => (
              <tr key={d.id}>
                <td>{d.id}</td>
                <td>
                  {d.customer}
                  <small>{d.destination}</small>
                </td>
                <td>
                  <Status tone={d.tone}>{d.status}</Status>
                </td>
                <td>
                  <span className={styles.avatar}>{d.owner}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className={styles.tableFooter}>
          <span>4 of 24 deliveries</span>
          <span>
            <ArrowsClockwise size={11} /> All changes saved
          </span>
        </div>
      </div>
      <div className={`${styles.panel} ${styles.boardPanel}`}>
        <MockupHeader eyebrow="Same records, another perspective" title="Dispatch board">
          <Kanban size={18} />
        </MockupHeader>
        <div className={styles.boardColumns}>
          {[deliveries[0], deliveries[1]].map((d) => (
            <div key={d.id}>
              <div className={styles.boardColumnTitle}>
                <Status tone={d.tone}>{d.status}</Status>
                <small>1</small>
              </div>
              <div className={styles.deliveryCard}>
                <b>{d.id}</b>
                <p>{d.customer}</p>
                <small>
                  <MapPin size={11} />
                  {d.destination}
                </small>
                <div>
                  <span className={styles.avatar}>{d.owner}</span>
                  <span>{d.time}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
function IntegrationsMockup() {
  return (
    <div className={`${styles.panel} ${styles.detailPanel}`} aria-hidden="true">
      <PreviewHeader prefix="Settings">Integrations</PreviewHeader>
      <div className={styles.integrationsList}>
        {[
          ["ce4c3", "Slack", "Notify #dispatch of delivery updates"],
          ["65182", "Excel", "Sync the warehouse stock register"],
          ["03e27", "Gmail", "Attach incoming customer requests"],
          ["2e2fa", "Shopify", "Sync catalog availability"],
          ["a3e98", "Outbound Webhook", "Send delivery.completed events"],
          ["bfe05", "WhatsApp", "Keep customers up to date"],
        ].map(([image, name, description]) => (
          <div className={styles.integrationRow} key={name}>
            <Image src={`/assets/figma/features-iteration/${image}.png`} alt="" width={36} height={36} />
            <div>
              <b>{name}</b>
              <p>{description}</p>
            </div>
            <NewIcon file="0ee22" />
          </div>
        ))}
      </div>
    </div>
  );
}
function AutomationsMockup() {
  return (
    <div className={`${styles.panel} ${styles.detailPanel}`} aria-hidden="true">
      <PreviewHeader prefix="Automations">
        <span className={styles.automationTitle}>
          Restock Essentials <Status>Enabled</Status>
        </span>
      </PreviewHeader>
      <div className={styles.automationTree}>
        <div className={styles.logicRow}>
          <i>1</i>
          <p>
            When <em>Order</em> is <em>confirmed</em>
          </p>
        </div>
        <NewIcon file="20d4b" />
        <div className={styles.logicRow}>
          <i>2</i>
          <p>
            Check <em>Available Stock</em> for all <em>Order Items</em>
          </p>
        </div>
        <NewIcon file="20d4b" />
        <div className={styles.logicRow}>
          <i>3</i>
          <p>
            If <em>all items</em> are <em>available</em>
          </p>
        </div>
        <div className={styles.treeBranch}>
          <NewIcon file="082e4" />
          <div>
            <div className={styles.logicRow}>
              <Status>Yes</Status>
              <p>
                Reserve <em>Stock</em> for this <em>Order</em>
              </p>
            </div>
            <NewIcon file="87609" />
            <div className={styles.logicRow}>
              <Status>Then</Status>
              <p>
                Create <em>Dispatch</em> linked to <em>Order</em>
              </p>
            </div>
            <NewIcon file="87609" />
            <div className={styles.logicRow}>
              <Status>Then</Status>
              <p>
                Assign <em>Dispatch</em> to <em>Fulfilment team</em>
              </p>
            </div>
          </div>
        </div>
        <div className={styles.treeBranch}>
          <NewIcon file="59c4c" />
          <div>
            <div className={styles.logicRow}>
              <Status tone="amber">No</Status>
              <p>
                Create new <em>Purchase Request</em> for <em>Missing Quantities</em>
              </p>
            </div>
            <NewIcon file="2ff5c" />
            <div className={styles.logicRow}>
              <Status>Then</Status>
              <p>
                Set <em>Order Status</em> to <em>Awaiting Stock</em>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
function ContextMockup() {
  return (
    <div className={`${styles.panel} ${styles.detailPanel}`} aria-hidden="true">
      <PreviewHeader prefix="GMWB5000">Delivery Details</PreviewHeader>
      <div className={styles.contextBody}>
        <div className={styles.contextLocation}>
          <NewIcon file="5008b" />
          <span>Montecito 301, Int. 2, Nápoles, Benito Juárez, Ciudad de México.</span>
        </div>
        <div className={styles.contextTags}>
          <Status>Delivered</Status>
          <span className={styles.personTag}>
            <b>RV</b> Ramiro Velazquez
          </span>
        </div>
        <Field label="Attachments">
          <div className={styles.fileRows}>
            {[
              ["65182", "Packing List - GMWB5000.xlsx", "1.4MB"],
              ["61f54", "Delivery Receipt - GMWB5000.pdf", "128KB"],
              ["0d528", "Delivery Photo Evidence - GMWB5000.jpg", "1.4MB"],
            ].map(([image, name, size]) => (
              <div key={name}>
                <Image src={`/assets/figma/features-iteration/${image}.png`} width={36} height={36} alt="" />
                <div>
                  <p>{name}</p>
                  <small>{size}</small>
                </div>
              </div>
            ))}
          </div>
        </Field>
        <Field label="Comments">
          <div className={styles.contextTags}>
            <span className={styles.personTag}>
              <b>RV</b> Ramiro Velazquez
            </span>
            <span className={styles.timeTag}>9:32 AM</span>
          </div>
          <p className={styles.deliveryComment}>Delivered all 6 boxes to reception. Signed receipt attached.</p>
        </Field>
      </div>
    </div>
  );
}
const features = [
  {
    title: "Workflows",
    description: "Model stages, approvals and exceptions around how work gets done.",
    wide: true,
    visual: <WorkflowMockup />,
  },
  {
    title: "Roles & Permissions",
    dark: true,
    description: "Control access across teams, locations and responsibilities.",
    visual: <PermissionsMockup />,
  },
  {
    title: "Activity & Audit Trail",
    description: "A secure activity history helps keep your team informed and protected.",
    dark: true,
    visual: <ActivityMockup />,
  },
  {
    title: "Flexible views",
    description: "Tables, maps, boards and dashboards built around the same operation.",
    wide: true,
    visual: <ViewsMockup />,
  },
  {
    title: "Integrations & API",
    description: "Connect the systems your business already depends on.",
    visual: <IntegrationsMockup />,
  },
  {
    title: "Rules & Automations",
    dark: true,
    description: "Turn operational rules into actions that happen automatically.",
    visual: <AutomationsMockup />,
  },
  {
    title: "Files, comments & context",
    description: "Keep the information behind the work attached to the work itself.",
    visual: <ContextMockup />,
  },
];
export function KeyFeatures() {
  return (
    <SystemSection
      className={styles.section}
      primary="Built for real world operations."
      accent="The pieces that make your work flow."
    >
      <FeatureBento items={features} mobileOrder={[4, 3, 2, 1, 0, 5, 6]} name="Features" />
    </SystemSection>
  );
}

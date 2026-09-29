import Image from "next/image";
import {
  ArrowsClockwise,
  ArrowUpRight,
  Check,
  CheckCircle,
  Code,
  DotsThree,
  FilePdf,
  Funnel,
  GitBranch,
  Kanban,
  Lightning,
  MapPin,
  Paperclip,
  Plus,
  Table,
  Truck,
} from "@phosphor-icons/react";
import { SystemSection } from "./section-system";
import styles from "./key-features.module.css";

const assets = "/assets/figma/key-features/";
function Icon({ file }: { file: string }) {
  // Preserve the exported SVG's intrinsic dimensions.
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={`${assets}${file}.svg`} alt="" />;
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
function PermissionsMockup() {
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
            <span>
              <Icon file="995c3" />
            </span>
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
              <Icon file="0ee22" />
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
function ActivityMockup() {
  return (
    <div className={`${styles.panel} ${styles.activity}`} aria-hidden="true">
      <div className={styles.panelBody}>
        <Field label="Shipment">
          <strong>F-91W</strong>
        </Field>
        <div className={styles.timeline}>
          <small>Effective permissions</small>
          <div>
            {events.map(([icon, text], index) => (
              <div key={text}>
                {index > 0 && <Icon file={index < 5 ? "06939" : "30604"} />}
                <div className={styles.event}>
                  <Icon file={icon} />
                  <span>{text}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
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
      <MockupHeader eyebrow="Workspace settings" title="Connections">
        <span className={styles.iconTile}>
          <Plus size={15} />
        </span>
      </MockupHeader>
      <div className={styles.connectionList}>
        {[
          ["Slack", "Notify #dispatch of delivery updates", "Connected"],
          ["Excel", "Sync the warehouse stock register", "Synced 2m ago"],
          ["Gmail", "Attach incoming customer requests", "Connected"],
        ].map(([name, description, state]) => (
          <div className={styles.connection} key={name}>
            <span className={styles.appLogo}>
              <Image src={`/assets/figma/logos/Logo-${name}.png`} width={24} height={24} alt="" />
            </span>
            <div>
              <b>{name}</b>
              <p>{description}</p>
              <small>
                <CheckCircle size={10} weight="fill" />
                {state}
              </small>
            </div>
            <ArrowUpRight size={12} />
          </div>
        ))}
      </div>
      <div className={styles.apiBlock}>
        <div>
          <span className={styles.iconTile}>
            <Code size={16} />
          </span>
          <div>
            <b>Outbound webhook</b>
            <p>delivery.completed</p>
          </div>
          <Status>Live</Status>
        </div>
        <div className={styles.endpoint}>
          <span>POST</span> api.northline.mx/deliveries
        </div>
        <div className={styles.apiFooter}>
          <span>
            <Check size={11} />
            200 OK
          </span>
          <span>Last delivery · 148 ms</span>
        </div>
      </div>
    </div>
  );
}
function AutomationsMockup() {
  return (
    <div className={`${styles.panel} ${styles.detailPanel}`} aria-hidden="true">
      <MockupHeader eyebrow="Operations / Automations" title="Restock essentials">
        <Icon file="0ee22" />
      </MockupHeader>
      <div className={styles.ruleBody}>
        <div className={styles.ruleStep}>
          <span className={`${styles.stepIcon} ${styles.amberStep}`}>
            <Lightning size={16} />
          </span>
          <div>
            <small>WHEN</small>
            <b>Stock level changes</b>
            <p>Warehouse inventory</p>
          </div>
        </div>
        <div className={styles.ruleConnector}>
          <span />
        </div>
        <div className={styles.ruleStep}>
          <span className={`${styles.stepIcon} ${styles.purpleStep}`}>
            <GitBranch size={16} />
          </span>
          <div>
            <small>ONLY IF</small>
            <b>Available stock &lt; minimum</b>
            <p>And no open purchase request</p>
          </div>
        </div>
        <div className={styles.ruleConnector}>
          <span />
        </div>
        <div className={styles.ruleStep}>
          <span className={`${styles.stepIcon} ${styles.greenStep}`}>
            <Plus size={16} />
          </span>
          <div>
            <small>THEN</small>
            <b>Create purchase request</b>
            <p>
              Assign to <span className={styles.mention}>@Sam Olguín</span>
            </p>
          </div>
        </div>
        <div className={styles.ruleConnector}>
          <span />
        </div>
        <div className={styles.ruleStep}>
          <span className={styles.stepIcon}>
            <Image src="/assets/figma/logos/Logo-Slack.png" width={18} height={18} alt="" />
          </span>
          <div>
            <small>AND</small>
            <b>Notify #procurement</b>
            <p>Include item, quantity and supplier</p>
          </div>
        </div>
      </div>
      <div className={styles.runReceipt}>
        <CheckCircle size={14} weight="fill" />
        <div>
          <b>Last run successful</b>
          <p>PR-0082 created · Today, 9:41 AM</p>
        </div>
        <span>0.8s</span>
      </div>
    </div>
  );
}
function ContextMockup() {
  return (
    <div className={`${styles.panel} ${styles.detailPanel}`} aria-hidden="true">
      <MockupHeader eyebrow="Delivery / RL2046" title="Casa Bosques">
        <Status>Delivered</Status>
      </MockupHeader>
      <div className={styles.contextBody}>
        <div className={styles.recordSummary}>
          <span>
            <Truck size={13} /> Juárez, Mexico City
          </span>
          <span>Today, 9:32 AM</span>
        </div>
        <Field label="Files · 2">
          <div className={styles.attachments}>
            <div>
              <span className={styles.fileIcon}>
                <FilePdf size={25} />
              </span>
              <b>Delivery receipt.pdf</b>
              <small>128 KB · Sam Olguín</small>
            </div>
            <div>
              <span className={`${styles.fileIcon} ${styles.documentIcon}`}>
                <Table size={25} />
              </span>
              <b>Packing list.xlsx</b>
              <small>42 KB · Mario Rubio</small>
            </div>
          </div>
        </Field>
        <div className={styles.commentHeading}>
          <b>Comments</b>
          <span>2</span>
          <span className={styles.subscribed}>
            <Check size={11} /> Following
          </span>
        </div>
        <div className={styles.comment}>
          <span className={styles.avatar}>MR</span>
          <div>
            <div>
              <b>Mario Rubio</b>
              <small>9:32 AM</small>
            </div>
            <p>Delivered all 6 boxes to reception. Signed receipt attached.</p>
            <span className={styles.reaction}>
              <Check size={11} /> 1
            </span>
          </div>
        </div>
        <div className={styles.comment}>
          <span className={`${styles.avatar} ${styles.samAvatar}`}>SO</span>
          <div>
            <div>
              <b>Sam Olguín</b>
              <small>9:35 AM</small>
            </div>
            <p>
              Thanks <span className={styles.mention}>@Mario</span>, quantities match. Ready for invoicing.
            </p>
          </div>
        </div>
        <div className={styles.commentComposer}>
          <span>Leave a comment…</span>
          <Paperclip size={14} />
          <span className={styles.sendIcon}>
            <ArrowUpRight size={13} />
          </span>
        </div>
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
    description: "Control access across teams, locations and responsibilities.",
    visual: <PermissionsMockup />,
  },
  {
    title: "Activity & Audit Trail",
    description: "A secure activity history helps keep your team informed and protected.",
    green: true,
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
      primary="Built for the details that make operations work."
      accent="The everyday capabilities your team needs to run the business."
      action={{ label: "View offerings", href: "/offering" }}
    >
      <div className={styles.grid}>
        {features.map((feature) => (
          <article
            key={feature.title}
            className={`${styles.card} ${feature.wide ? styles.wide : ""} ${feature.green ? styles.green : ""}`}
          >
            <div className={styles.copy}>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
            <div className={styles.visual}>{feature.visual}</div>
          </article>
        ))}
      </div>
    </SystemSection>
  );
}

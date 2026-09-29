import Image from "next/image";
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
  },
  { title: "Integrations & API", description: "Connect the systems your business already depends on." },
  { title: "Rules & Automations", description: "Turn operational rules into actions that happen automatically." },
  {
    title: "Files, comments & context",
    description: "Keep the information behind the work attached to the work itself.",
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

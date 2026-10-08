import Image from "next/image";
import { HeaderThemeRegion } from "@/components/header-theme";
import styles from "./platform-architecture.module.css";

const sections = [
  {
    title: "Managed Infrastructure. Built to last.",
    items: [
      ["Persistence", "Operational data stays consistent and durable."],
      ["Identity", "Authenticated access across your workspace."],
      ["Execution", "Managed services power actions and data access."],
      ["Integrations", "Connect existing tools through APIs and services."],
    ],
  },
  {
    title: "Operational Model. The Matrix.",
    items: [
      ["Objects", "Define the people, assets and records you manage."],
      ["Relationships", "Connect them into a coherent business model."],
      ["Permissions", "Control who can see and change each resource."],
      ["Extensibility", "Add new concepts without rebuilding the system."],
    ],
  },
  {
    title: "Capabilities & Orchestration. Work in motion.",
    items: [
      ["Actions", "Controlled operations that change business state."],
      ["Workflows", "Coordinate tasks across teams and systems."],
      ["Business Rules", "Enforce conditions before work is executed."],
      ["Automations", "Trigger repeatable work from operational events."],
    ],
  },
  {
    title: "Operational Experience. Built for your team.",
    items: [
      ["Apps & Views", "Interfaces shaped around how your team works."],
      ["Daily Work", "Lists, records and tasks in one operational workspace."],
      ["Human & AI", "People and agents work with shared business context."],
      ["Evolving UI", "New views as your operations change."],
    ],
  },
] as const;

/** Static visual slot shared by the desktop stage and mobile sections. */
function ArchitectureDiagram() {
  return (
    <Image
      className={styles.diagram}
      src="/assets/figma/platform/architecture.png"
      width={529}
      height={641}
      sizes="(max-width: 900px) 80vw, 529px"
      alt="Superspace architecture: four stacked operational layers connected to business tools."
    />
  );
}

export function PlatformArchitecture() {
  return (
    <HeaderThemeRegion tone="dark" id="model" className={styles.section} aria-label="Platform architecture">
      <div className={`v24-spine ${styles.layout}`}>
        <div className={styles.copy}>
          {sections.map(({ title, items }, index) => (
            <article className={`${styles.chunk} ${index === 0 ? styles.foundation : ""}`} key={title}>
              <h2>{title}</h2>
              <dl>
                {items.map(([label, description]) => (
                  <div key={label}>
                    <dt>{label}</dt>
                    <dd>{description}</dd>
                  </div>
                ))}
              </dl>
              <div className={styles.mobileDiagram}>
                <ArchitectureDiagram />
              </div>
            </article>
          ))}
        </div>
        <div className={styles.stage}>
          <ArchitectureDiagram />
        </div>
      </div>
    </HeaderThemeRegion>
  );
}

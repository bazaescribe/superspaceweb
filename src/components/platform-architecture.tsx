"use client";

import { useScrollStep } from "@/hooks/use-scroll-step";
import { PlatformArchitectureDiagram } from "./platform-architecture-diagram";
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

export function PlatformArchitecture() {
  const { ref, active } = useScrollStep();
  return (
    <HeaderThemeRegion tone="dark" id="model" className={styles.section} aria-label="Platform architecture">
      <div ref={ref} className={`v24-spine ${styles.layout}`}>
        <div className={styles.copy}>
          {sections.map(({ title, items }, index) => (
            <article
              data-scroll-step
              data-active={active === index}
              className={`${styles.chunk} ${index === 0 ? styles.foundation : ""}`}
              key={title}
            >
              <div className={styles.chunkContent}>
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
                  <PlatformArchitectureDiagram active={index} />
                </div>
              </div>
            </article>
          ))}
        </div>
        <div className={styles.stage}>
          <PlatformArchitectureDiagram active={active} />
        </div>
      </div>
    </HeaderThemeRegion>
  );
}

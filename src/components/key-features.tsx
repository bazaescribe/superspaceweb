"use client";

import { WorkflowMockup } from "./workflow-mockup";
import { FeatureBento } from "./feature-bento";
import { ViewsMockup } from "./views-mockup";
import { SystemSection } from "./section-system";
import styles from "./key-features.module.css";

import {
  PermissionsMockup,
  ActivityMockup,
  ContextMockup,
  IntegrationsMockup,
  AutomationsMockup,
} from "./feature-previews";
export { PermissionsMockup, ActivityMockup } from "./feature-previews";
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
    duration: 14000,
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
    duration: 15000,
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
      <FeatureBento
        items={features}
        mobileOrder={[4, 3, 2, 1, 0, 5, 6]}
        name="Features"
        tabletOrder={[0, 1, 3, 6, 2, 5, 4]}
      />
    </SystemSection>
  );
}

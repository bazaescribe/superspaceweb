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
    column: "1 / span 4",
    row: 1,
    description: "Model stages, approvals and exceptions around how work gets done.",
    wide: true,
    visual: <WorkflowMockup />,
  },
  {
    title: "Roles & Permissions",
    column: "5 / span 2",
    row: 1,
    dark: true,
    description: "Control access across teams, locations and responsibilities.",
    visual: <PermissionsMockup />,
  },
  {
    title: "Activity & Audit Trail",
    column: "3 / span 2",
    row: 2,
    description: "A secure activity history helps keep your team informed and protected.",
    dark: true,
    visual: <ActivityMockup />,
  },
  {
    title: "Custom Views",
    column: "1 / span 2",
    row: 2,
    duration: 16200,
    description: "Use your business data to create any visualization your team may need.",
    wide: true,
    visual: <ViewsMockup />,
  },
  {
    title: "Integrations & API",
    column: "4 / span 3",
    row: 3,
    description: "Connect the systems your business already depends on.",
    visual: <IntegrationsMockup />,
  },
  {
    title: "Rules & Automations",
    column: "1 / span 3",
    row: 3,
    duration: 15000,
    dark: true,
    description: "Turn operational rules into actions that happen automatically.",
    visual: <AutomationsMockup />,
  },
  {
    title: "Files, comments & context",
    column: "5 / span 2",
    row: 2,
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
        layout="sixColumn"
        mobileOrder={[4, 3, 2, 1, 0, 5, 6]}
        name="Features"
        tabletOrder={[0, 1, 3, 6, 2, 5, 4]}
      />
    </SystemSection>
  );
}

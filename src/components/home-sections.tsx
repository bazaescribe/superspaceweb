"use client";

import { ImplementationField } from "./implementation-field";
import { HeaderThemeRegion } from "./header-theme";
import { SplitContent, SystemSection } from "./section-system";
import { OperationsSystem } from "./operations-system";
import { ArchitectureSection } from "./architecture-section";
import { UseCasesSection } from "./use-cases-section";
import { KeyFeatures } from "./key-features";
import { QuickActions } from "./quick-actions";

const stages = [
  {
    title: "Understand",
    description: "We get close to your operation to understand the people, processes, and challenges involved.",
  },
  {
    title: "Define",
    description: "Together, we define how work should flow, who does what, and what your system needs to support.",
  },
  {
    title: "Configure",
    description: "We configure Superspace around your workflows, bringing your data, rules, and interfaces together.",
  },
  {
    title: "Launch",
    description: "We help your team get comfortable with the system and bring it into everyday operations.",
  },
  {
    title: "Evolve",
    description: "We keep your system running and adapt it as your business and operational needs change.",
  },
];

function PainContent() {
  return (
    <div className="system-pain">
      <div className="system-pain__copy">
        <h3>Growing shouldn&apos;t mean holding everything together manually.</h3>
        <p>
          As businesses grow, their operations evolve across spreadsheets, messages, applications, and manual processes.
          The work is connected. The tools aren&apos;t.
        </p>
      </div>
      <div className="system-pain__visual">
        <OperationsSystem embedded animateBefore />
      </div>
    </div>
  );
}

export function HomeSections() {
  return (
    <div id="system">
      <div className="v24-spine system-spine">
        <SystemSection
          className="system-section--pain"
          primary="Your business already has a system."
          accent="Your tools just haven’t caught up yet."
        >
          <PainContent />
        </SystemSection>
        <UseCasesSection />
        <KeyFeatures />
      </div>
      <HeaderThemeRegion tone="dark" className="v24-dark" data-theme="dark">
        <div className="v24-spine system-spine">
          <SystemSection
            primary="A modern application."
            accent="You shouldn’t worry about."
            action={{ label: "Explore the platform", href: "/platform" }}
          >
            <ArchitectureSection />
          </SystemSection>
          <SystemSection
            className="system-section--deployment"
            primary="Your business professionally modeled."
            accent="Managed by us."
            action={{ label: "Explore the Deployment", href: "/deployment" }}
          >
            <SplitContent
              items={stages}
              variant="steps"
              interval={6500}
              renderVisual={(active, playing, reducedMotion) => (
                <ImplementationField active={active} playing={playing} reducedMotion={reducedMotion} />
              )}
            />
          </SystemSection>
          <QuickActions />
        </div>
      </HeaderThemeRegion>
    </div>
  );
}

"use client";

import { HeaderThemeRegion } from "./header-theme";
import { SystemSection } from "./section-system";
import { ProblemTimeline } from "./problem-timeline";
import { ArchitectureSection } from "./architecture-section";
import { UseCasesSection } from "./use-cases-section";
import { KeyFeatures } from "./key-features";
import { QuickActions } from "./quick-actions";

export function HomeSections() {
  return (
    <div id="system">
      <div className="v24-spine system-spine">
        <SystemSection
          className="system-section--pain"
          primary="Your business already has a system."
          accent="Your tools just haven’t caught up yet."
        >
          <ProblemTimeline />
        </SystemSection>
        <UseCasesSection />
        <KeyFeatures />
      </div>
      <HeaderThemeRegion tone="dark" className="v24-dark" data-theme="dark">
        <div className="v24-spine system-spine">
          <SystemSection primary="Built around your business." accent="Before you even start.">
            <ArchitectureSection />
          </SystemSection>
          <QuickActions />
        </div>
      </HeaderThemeRegion>
    </div>
  );
}

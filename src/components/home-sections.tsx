"use client";

import Image from "next/image";
import { HeaderThemeRegion } from "./header-theme";
import { HorizontalSelection, SystemSection } from "./section-system";
import { OperationsSystem } from "./operations-system";
import { ArchitectureSection } from "./architecture-section";
import { UseCasesSection } from "./use-cases-section";
import { KeyFeatures } from "./key-features";

const image = (src: string, alt: string) => <Image src={src} alt={alt} fill sizes="(max-width: 720px) 100vw, 850px" />;
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
].map((stage, index) => ({
  ...stage,
  visual: image(
    index === 0
      ? "/assets/figma/implementation/map-operation.png"
      : index === 1
        ? "/assets/figma/implementation/shape-system.png"
        : "/assets/figma/implementation/put-to-work.png",
    `${stage.title} operational stage`,
  ),
}));

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
            primary="We learn how your business works."
            accent="And fit Superspace around it."
            action={{ label: "Explore deployment", href: "/deployment" }}
          >
            <HorizontalSelection items={stages} />
          </SystemSection>
        </div>
      </HeaderThemeRegion>
    </div>
  );
}

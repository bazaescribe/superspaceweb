"use client";

import Image from "next/image";
import { HeaderThemeRegion } from "./header-theme";
import { CardCarousel, HorizontalSelection, SplitContent, SystemSection } from "./section-system";
import { OperationsSystem } from "./operations-system";

const image = (src: string, alt: string) => <Image src={src} alt={alt} fill sizes="(max-width: 720px) 100vw, 850px" />;
const oldNew = [
  { title: "Growing should not be painful.", description: "As organizations grow, the complex orchestration of tools, people and manual processes becomes a hassle.", visual: <OperationsSystem embedded /> },
  { title: "A solution that simply works.", description: "Superspace consolidates all your knowledge and processes in a simple, secure and scalable platform that your whole team can use.", visual: <OperationsSystem embedded initialConnected /> },
];
const cards = [
  { title: "Complex orders", description: "Coordinate orders, requirements, owners and delivery in one operational view.", visual: image("/assets/figma/hero-workspace.png", "Complex order workspace") },
  { title: "People ops", description: "Give teams one shared place to manage the work and the people involved.", visual: image("/assets/figma/feature-team.png", "People operations workspace") },
  { title: "Inventory & assets", description: "Track locations, availability, movement and the rules behind them.", visual: image("/assets/figma/feature-expandable.png", "Inventory and assets") },
  { title: "Service operations", description: "Connect requests, assignments and service records in one flow.", visual: image("/assets/figma/use-service-ops.png", "Service operations") },
];
const infrastructure = [
  { title: "It. Just. Works.", description: "Superspace runs and maintains the foundation your organization depends on. Reliable, expandable and continuously improving.", visual: image("/assets/figma/implementation/shape-system.png", "Layered platform infrastructure") },
  { title: "Modeled for you.", description: "Superspace adopts the concepts and language of your business and models how your business actually works.", visual: image("/assets/figma/implementation/shape-system.png", "Platform modeled around your business") },
  { title: "People work here. Agents do too.", description: "Humans and AI agents operate from the same shared context with actions and boundaries defined by your operating model.", visual: image("/assets/figma/implementation/shape-system.png", "Shared operating model") },
];
const stages = [
  { title: "Understand", description: "We get close to your operation to understand the people, processes, and challenges involved." },
  { title: "Define", description: "Together, we define how work should flow, who does what, and what your system needs to support." },
  { title: "Configure", description: "We configure Superspace around your workflows, bringing your data, rules, and interfaces together." },
  { title: "Launch", description: "We help your team get comfortable with the system and bring it into everyday operations." },
  { title: "Evolve", description: "We keep your system running and adapt it as your business and operational needs change." },
].map((stage, index) => ({...stage, visual: image(index === 0 ? "/assets/figma/implementation/map-operation.png" : index === 1 ? "/assets/figma/implementation/shape-system.png" : "/assets/figma/implementation/put-to-work.png", `${stage.title} operational stage`)}));

export function HomeSections() {
  return <div id="system"><div className="v24-spine system-spine"><SystemSection primary="Your business already has a system." accent="Your tools just haven’t caught up yet."><SplitContent items={oldNew} interval={6500}/></SystemSection><SystemSection primary="One platform, everything operational." accent="From one flow to your whole company." action={{ label: "View offerings", href: "/offering" }}><CardCarousel cards={cards}/></SystemSection></div><HeaderThemeRegion tone="dark" className="v24-dark" data-theme="dark"><div className="v24-spine system-spine"><SystemSection primary="Robust infrastructure." accent="You shouldn’t worry about." action={{ label: "Explore the platform", href: "/platform" }}><SplitContent items={infrastructure} interval={6500}/></SystemSection><SystemSection primary="We learn how your business works." accent="And fit Superspace around it." action={{ label: "Explore deployment", href: "/deployment" }}><HorizontalSelection items={stages}/></SystemSection></div></HeaderThemeRegion></div>;
}

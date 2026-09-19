"use client";

import Image from "next/image";
import { useEffect, useId, useRef, useState } from "react";

const solutions = [
  {
    id: "orders",
    label: "Complex orders",
    title: "Complex orders",
    copy: "Coordinate custom orders, requirements, owners and delivery in one operational view.",
    image: "/assets/figma/feature-ai-native.png",
  },
  {
    id: "service",
    label: "Service ops",
    title: "Service operations",
    copy: "Give dispatch, field teams and managers one live source of truth for every service.",
    image: "/assets/figma/use-service-ops.png",
  },
  {
    id: "inventory",
    label: "Inventory & assets",
    title: "Inventory and assets",
    copy: "Track the assets, locations, availability and rules that keep physical operations moving.",
    image: "/assets/figma/use-logistics.png",
  },
  {
    id: "approvals",
    label: "Approvals",
    title: "Approvals",
    copy: "Route decisions with the right context, permissions and accountability already attached.",
    image: "/assets/figma/use-manufacturing.png",
  },
] as const;

const implementation = [
  {
    label: "Understand",
    title: "Understand",
    copy: "We work with the people closest to the process to understand the objects, relationships, decisions and constraints involved.",
  },
  {
    label: "Define",
    title: "Define the operating model",
    copy: "Together, we turn what is implicit into a clear model of the people, information, rules and outcomes behind the work.",
  },
  {
    label: "Configure",
    title: "Configure the system",
    copy: "We shape Superspace around that model: data, workflows, permissions, interfaces and automation.",
  },
  {
    label: "Deploy",
    title: "Deploy into the operation",
    copy: "Your team starts with working software, supported through rollout, learning and real operational use.",
  },
  {
    label: "Expand",
    title: "Expand as the business evolves",
    copy: "The system grows with new workflows, teams and intelligence without forcing the operation back into rigid tools.",
  },
] as const;

const customStates = [
  {
    title: "Infrastructure you can stop thinking about.",
    copy: "Superspace runs and maintains the foundation your operation depends on: reliable, extensible and continuously improved.",
  },
  {
    title: "Your operation gets its own shape.",
    copy: "Entities, relationships, workflows, permissions and rules are modeled around the way your business actually works.",
  },
  {
    title: "People work here. Agents do too.",
    copy: "Teams and AI agents operate from the same context, with the actions and boundaries defined by your operating model.",
  },
] as const;

export { OperationsSystem } from "./operations-system";

export function FlexibleSolutions() {
  const [active, setActive] = useState(0);
  const item = solutions[active];
  const id = useId();
  return (
    <section className="v24-section flexible" aria-labelledby={`${id}-title`}>
      <div className="v24-heading-row">
        <h2 id={`${id}-title`}>
          Flexible solutions for every business model. <span>Custom solutions for your needs that just work.</span>
        </h2>
        <div className="v24-pills" role="tablist" aria-label="Solution use cases">
          {solutions.map((solution, index) => (
            <button key={solution.id} role="tab" aria-selected={active === index} onClick={() => setActive(index)}>
              {solution.label}
            </button>
          ))}
        </div>
      </div>
      <div className="split-showcase" role="tabpanel" aria-live="polite">
        <div className="split-showcase__copy">
          <h3>{item.title}</h3>
          <p>{item.copy}</p>
        </div>
        <div className="split-showcase__media" key={item.id}>
          <div className="split-showcase__screen">
            <Image src={item.image} alt="" fill sizes="(max-width: 760px) 100vw, 852px" />
          </div>
        </div>
      </div>
    </section>
  );
}

export function ImplementationExperience() {
  const [active, setActive] = useState(0);
  const section = useRef<HTMLElement>(null);
  const item = implementation[active];
  useEffect(() => {
    const update = () => {
      if (!section.current) return;
      const rect = section.current.getBoundingClientRect();
      const headingHeight = 264;
      const progress = Math.max(
        0,
        Math.min(0.999, -(rect.top + headingHeight) / Math.max(1, rect.height - innerHeight - headingHeight)),
      );
      if (rect.top <= -headingHeight && rect.bottom >= innerHeight) {
        setActive(Math.floor(progress * implementation.length));
      }
    };
    addEventListener("scroll", update, { passive: true });
    update();
    return () => removeEventListener("scroll", update);
  }, []);
  return (
    <section ref={section} className="experience-scroll" aria-labelledby="experience-title">
      <div className="v24-heading-row experience-heading">
        <h2 id="experience-title">
          Platform experience. <span>Implemented around the way your business works.</span>
        </h2>
      </div>
      <div className="experience-sticky">
        <div
          className="timeline"
          role="tablist"
          aria-label="Implementation stages"
          style={{ "--stage": active } as React.CSSProperties}
        >
          {implementation.map((stage, index) => (
            <button key={stage.label} role="tab" aria-selected={active === index} onClick={() => setActive(index)}>
              {stage.label}
            </button>
          ))}
          <div className="timeline__track">
            <i />
          </div>
        </div>
        <div className="split-showcase split-showcase--dark">
          <div className="split-showcase__copy">
            <strong className="stage-number">0{active + 1}</strong>
            <div>
              <h3>{item.title}</h3>
              <p>{item.copy}</p>
            </div>
          </div>
          <div className="split-showcase__media">
            <Image
              src="/assets/figma/implementation/map-operation.png"
              alt="Operational system map"
              fill
              sizes="(max-width: 760px) 100vw, 852px"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export function CustomBuiltMatters() {
  const [active, setActive] = useState(0);
  const [manual, setManual] = useState(false);
  useEffect(() => {
    if (manual || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = setInterval(() => setActive((value) => (value + 1) % customStates.length), 6500);
    return () => clearInterval(timer);
  }, [manual]);
  return (
    <section className="custom-built" aria-labelledby="custom-built-title">
      <div className="v24-heading-row">
        <h2 id="custom-built-title">
          Custom where it matters. <span>Standard where it should be.</span>
        </h2>
      </div>
      <div className="split-showcase split-showcase--custom">
        <div className="custom-list">
          {customStates.map((item, index) => (
            <button
              key={item.title}
              className={active === index ? "is-active" : ""}
              onClick={() => {
                setActive(index);
                setManual(true);
              }}
            >
              <strong>{item.title}</strong>
              <span className="custom-list__description" aria-hidden={active !== index}>
                <p>{item.copy}</p>
              </span>
              <i />
            </button>
          ))}
        </div>
        <div className="split-showcase__media" key={active}>
          <Image
            src="/assets/figma/implementation/shape-system.png"
            alt="Layered Superspace system"
            fill
            sizes="(max-width: 760px) 100vw, 852px"
          />
        </div>
      </div>
    </section>
  );
}

"use client";

import Image from "next/image";
import { useId, useState } from "react";
import { industries } from "@/lib/site";

const comparisonStates = [
  {
    id: "tools",
    label: "Traditional tools",
    eyebrow: "Scattered operational work",
    title: "The work lives between tools.",
    copy: "Every handoff creates a new source of truth for your team to manage.",
  },
  {
    id: "superspace",
    label: "Superspace",
    eyebrow: "One connected system",
    title: "The work is built around your company.",
    copy: "Objects, workflows and context evolve together as your operation grows.",
  },
] as const;

export function ComparisonDemo() {
  const [selected, setSelected] = useState<"tools" | "superspace">("tools");
  const id = useId();
  const state = comparisonStates.find((item) => item.id === selected)!;

  return (
    <div className={`comparison comparison--${selected}`}>
      <div className="comparison__workspace" role="tabpanel" id={`${id}-${selected}`} aria-label={state.label}>
        {selected === "tools" ? <ToolSprawl /> : <ConnectedSystem />}
        <div className="comparison__caption">
          <span>{state.eyebrow}</span>
          <strong>{state.title}</strong>
          <p>{state.copy}</p>
        </div>
      </div>
      <div className="segmented" role="tablist" aria-label="Compare operational approaches">
        {comparisonStates.map((item) => (
          <button
            key={item.id}
            role="tab"
            type="button"
            id={`${id}-${item.id}-tab`}
            aria-selected={selected === item.id}
            aria-controls={`${id}-${item.id}`}
            tabIndex={selected === item.id ? 0 : -1}
            onClick={() => setSelected(item.id)}
          >
            {item.label}
          </button>
        ))}
      </div>
    </div>
  );
}

function ToolSprawl() {
  return (
    <>
      <div className="tool-window tool-window--one">
        <span>Spreadsheets</span>
        <b>Quarterly plan</b>
        <i />
        <i />
        <i />
      </div>
      <div className="tool-window tool-window--two">
        <span>Project space</span>
        <b>Delivery board</b>
        <i />
        <i />
        <i />
        <i />
      </div>
      <div className="tool-window tool-window--three">
        <span>Operations</span>
        <b>Live queue</b>
        <div className="window-bars">
          <i />
          <i />
          <i />
          <i />
          <i />
        </div>
      </div>
      <div className="tool-files">
        <span>Shipping labels</span>
        <span>Orders</span>
        <span>Invoices</span>
      </div>
      <div className="notification-icons">
        <b>132</b>
        <b>928</b>
        <b>32,402</b>
      </div>
    </>
  );
}

function ConnectedSystem() {
  const nodes = ["Customer", "Order", "Provider", "Payment", "Project", "Workflow"];
  return (
    <div className="system-map" aria-hidden="true">
      <div className="system-map__lines" />
      {nodes.map((node, index) => (
        <span className={`system-node system-node--${index + 1}`} key={node}>
          {node}
        </span>
      ))}
      <div className="system-core">
        <small>Superspace</small>
        <strong>
          Operations
          <br />
          model
        </strong>
      </div>
    </div>
  );
}

export function IndustryTabs() {
  const [active, setActive] = useState(0);
  const industry = industries[active];
  return (
    <div className="industry-demo">
      <div className="industry-tabs" role="tablist" aria-label="Industries">
        {industries.map((item, index) => (
          <button role="tab" aria-selected={index === active} key={item.id} onClick={() => setActive(index)}>
            {item.label}
          </button>
        ))}
      </div>
      <div className="industry-image" role="tabpanel" aria-label={industry.title}>
        <Image
          src={industry.image}
          alt=""
          fill
          sizes="(max-width: 768px) 100vw, 1440px"
          priority={industry.id === "marketplaces"}
        />
        <div className="industry-image__shade" />
        <div className="industry-image__copy">
          <strong>{industry.title}</strong>
          <p>{industry.copy}</p>
          <span>{industry.detail}</span>
        </div>
      </div>
    </div>
  );
}

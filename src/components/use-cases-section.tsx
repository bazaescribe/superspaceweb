"use client";

import Image from "next/image";
import { AnimatePresence, motion, useIsPresent, useReducedMotion } from "motion/react";
import { useId, useRef, useState } from "react";
import styles from "./use-cases-section.module.css";

const useCases = [
  {
    id: "marketplace",
    image: "/assets/figma/mockup-relay.png",
    label: "Marketplace",
    alt: "Relay dispatch overview with delivery requests, courier locations and a delivery map",
  },
  {
    id: "inventory",
    image: "/assets/figma/mockup-forma.png",
    label: "Inventory",
    alt: "Forma product catalog with stock quantities and replenishment status",
  },
  {
    id: "field-ops",
    image: "/assets/figma/mockup-northline.png",
    label: "Field Ops",
    alt: "Northline field operations workspace with team assignments and scheduled jobs",
  },
  {
    id: "customer-ops",
    image: "/assets/figma/mockup-mclean.png",
    label: "Customer Ops",
    alt: "McLean customer operations workspace with account records and relationship context",
  },
] as const;

const summaries = {
  marketplace: [
    ["Supply", "Keep couriers, service areas and availability ready to meet demand."],
    ["Demand", "Bring incoming delivery requests, pickup details and destinations into one queue."],
    ["Ops", "Assign couriers and coordinate each delivery from pickup to handoff."],
    ["Exceptions", "Resolve delays, failed deliveries and route changes with the full context."],
  ],
  inventory: [
    ["Stock", "Track products, quantities and availability across your warehouses."],
    ["Purchasing", "Connect supplier orders and incoming stock to what your operation needs."],
    ["Movements", "Coordinate receipts, transfers and allocations with a traceable stock history."],
    ["Exceptions", "Spot shortages, damaged items and discrepancies before they interrupt work."],
  ],
  "field-ops": [
    ["Teams", "Keep technicians, skills and service coverage connected to each job."],
    ["Jobs", "Bring service requests, locations and requirements into a shared work queue."],
    ["Scheduling", "Plan assignments and coordinate field work around team capacity."],
    ["Exceptions", "Handle urgent jobs, schedule conflicts and follow-up visits in context."],
  ],
  "customer-ops": [
    ["Accounts", "Keep every client’s contacts, agreements and account history in one place."],
    ["Requests", "Connect incoming requests to the right account, owner and next action."],
    ["Follow-through", "Coordinate handoffs and track progress across your customer-facing team."],
    ["Context", "Keep documents, conversations and activity attached to each relationship."],
  ],
} as const;

function UseCaseSummary({ useCase }: { useCase: keyof typeof summaries }) {
  const present = useIsPresent();
  const reduceMotion = useReducedMotion();
  return (
    <motion.div className={styles.summaryGrid} aria-hidden={!present} initial="enter" animate="visible" exit="leave">
      {summaries[useCase].map(([title, description], index) => (
        <motion.div
          key={title}
          variants={{
            enter: { opacity: reduceMotion ? 1 : 0, y: reduceMotion ? 0 : 6 },
            visible: { opacity: 1, y: 0 },
            leave: { opacity: 0, y: reduceMotion ? 0 : -4 },
          }}
          transition={{
            duration: reduceMotion ? 0 : present ? 0.28 : 0.16,
            delay: reduceMotion ? 0 : index * 0.045,
            ease: [0.22, 0.86, 0.24, 1],
          }}
        >
          <h3>{title}</h3>
          <p>{description}</p>
        </motion.div>
      ))}
    </motion.div>
  );
}

export function UseCasesSection() {
  const [active, setActive] = useState(0);
  const select = (index: number) => setActive((index + useCases.length) % useCases.length);
  const press = useRef<{ x: number; y: number } | null>(null);
  const id = useId();
  const selected = useCases[active];

  return (
    <section className={styles.section} aria-labelledby={`${id}-title`}>
      <div>
        <header className={styles.header}>
          <h2 id={`${id}-title`}>The Operating System built around how your business works.</h2>
          <p>
            From coordinating deliveries to managing inventory and field teams, SuperSpace adapts to the people,
            processes and tools behind your operation.
          </p>
        </header>
        <div
          className={styles.tabs}
          role="tablist"
          aria-label="Operational use cases"
          onKeyDown={(event) => {
            const next =
              event.key === "ArrowRight"
                ? (active + 1) % useCases.length
                : event.key === "ArrowLeft"
                  ? (active + useCases.length - 1) % useCases.length
                  : event.key === "Home"
                    ? 0
                    : event.key === "End"
                      ? useCases.length - 1
                      : null;
            if (next === null) return;
            event.preventDefault();
            select(next);
            event.currentTarget.querySelectorAll("button")[next]?.focus();
          }}
        >
          {useCases.map((useCase, index) => (
            <button
              type="button"
              role="tab"
              id={`${id}-tab-${useCase.id}`}
              aria-selected={active === index}
              tabIndex={active === index ? 0 : -1}
              aria-controls={`${id}-panel-${useCase.id}`}
              key={useCase.id}
              onClick={() => select(index)}
            >
              {useCase.label}
            </button>
          ))}
        </div>
        <div className={styles.summaries} aria-live="polite" aria-atomic="true">
          <AnimatePresence initial={false}>
            <UseCaseSummary key={selected.id} useCase={selected.id} />
          </AnimatePresence>
        </div>
        <div className={styles.showcase} role="region" aria-roledescription="carousel" aria-label="Product workspaces">
          <div className={styles.carouselContainer}>
            <div
              className={styles.track}
              style={{ transform: `translateX(calc(${active} * (var(--slide-width) + var(--slide-gap)) * -1))` }}
              onPointerDown={(event) => {
                press.current = { x: event.clientX, y: event.clientY };
                event.currentTarget.setPointerCapture(event.pointerId);
              }}
              onPointerUp={(event) => {
                if (!press.current) return;
                const dx = event.clientX - press.current.x;
                const dy = event.clientY - press.current.y;
                if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) select(active + (dx < 0 ? 1 : -1));
                press.current = null;
              }}
              onPointerCancel={() => {
                press.current = null;
              }}
            >
              {useCases.map((useCase, index) => (
                <div
                  className={styles.panel}
                  key={useCase.id}
                  role="tabpanel"
                  id={`${id}-panel-${useCase.id}`}
                  aria-labelledby={`${id}-tab-${useCase.id}`}
                  aria-hidden={index !== active}
                >
                  <Image
                    src={useCase.image}
                    alt={useCase.alt}
                    fill
                    sizes="(max-width: 720px) 92vw, (max-width: 1352px) 85vw, 1109px"
                    draggable={false}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

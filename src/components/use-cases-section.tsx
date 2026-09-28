"use client";

import { useId, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Buildings, Headset, Package, Wrench } from "@phosphor-icons/react";
import { BookingLink } from "./booking-link";
import { RelayWorkspace } from "./relay-workspace";
import { InventoryWorkspace } from "./inventory-workspace";
import { ScheduleWorkspace } from "./schedule-workspace";
import { AccountWorkspace } from "./account-workspace";
import styles from "./use-cases-section.module.css";

const useCases = [
  {
    id: "marketplace",
    label: "Marketplace",
    company: "Relay",
    title: "Dispatch Overview",
    icon: <Buildings size={15} />,
  },
  { id: "inventory", label: "Inventory", company: "Forma Supply Co.", title: "Products", icon: <Package size={15} /> },
  {
    id: "field-ops",
    label: "Field Ops",
    company: "Northline Solutions",
    title: "Schedule Board",
    icon: <Wrench size={15} />,
  },
  {
    id: "customer-ops",
    label: "Customer Ops",
    company: "McLean",
    title: "Account Management",
    icon: <Headset size={15} />,
  },
] as const;

export function UseCasesSection() {
  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState(1);
  const id = useId();
  const reduceMotion = useReducedMotion();
  const selected = useCases[active];

  return (
    <section className={styles.section} aria-labelledby={`${id}-title`}>
      <header className={styles.header}>
        <div>
          <h2 id={`${id}-title`}>
            The <span>Operating System</span> built around how your business work.
          </h2>
          <p>
            From coordinating deliveries to managing inventory and field teams, SuperSpace adapts to the people,
            processes and tools behind your operation.
          </p>
        </div>
        <BookingLink placement="home_solution" label="See it in action" designIcon />
      </header>
      <div className={styles.showcase}>
        <div className={styles.tabs} role="tablist" aria-label="Operational use cases">
          {useCases.map((useCase, index) => (
            <button
              type="button"
              role="tab"
              id={`${id}-tab-${useCase.id}`}
              aria-selected={active === index}
              aria-controls={`${id}-panel`}
              key={useCase.id}
              onClick={() => {
                setDirection(index > active ? 1 : -1);
                setActive(index);
              }}
            >
              {useCase.label}
            </button>
          ))}
        </div>
        <div
          className={styles.mockupFrame}
          role="tabpanel"
          id={`${id}-panel`}
          aria-labelledby={`${id}-tab-${selected.id}`}
        >
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              className={styles.panel}
              key={selected.id}
              custom={direction}
              variants={{
                enter: (travel: number) => ({ x: `${travel * 105}%`, rotateY: travel * -12, scale: 0.94 }),
                center: { x: "0%", rotateY: 0, scale: 1 },
                leave: (travel: number) => ({ x: `${travel * -105}%`, rotateY: travel * 12, scale: 0.94 }),
              }}
              initial={reduceMotion ? false : "enter"}
              animate="center"
              exit={reduceMotion ? undefined : "leave"}
              transition={{ duration: reduceMotion ? 0 : 0.65, ease: [0.22, 0.86, 0.24, 1] }}
            >
              {selected.id === "marketplace" ? (
                <RelayWorkspace />
              ) : selected.id === "inventory" ? (
                <InventoryWorkspace />
              ) : selected.id === "field-ops" ? (
                <ScheduleWorkspace />
              ) : (
                <AccountWorkspace />
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

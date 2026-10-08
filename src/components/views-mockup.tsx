"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView, useReducedMotion } from "motion/react";
import { CalendarBlank, Kanban, Table } from "@phosphor-icons/react";
import { PreviewAvatar, PreviewPanel, PreviewTag, PreviewTitle } from "./preview-ui";
import styles from "./views-mockup.module.css";

const deliveries = [
  {
    id: "RL2048",
    customer: "Café Nin",
    destination: "Roma Norte",
    owner: "MR",
    status: "In transit",
    tone: "blue" as const,
    time: "09:45",
    day: "Mon",
  },
  {
    id: "RL2047",
    customer: "Panadería Rosetta",
    destination: "Condesa",
    owner: "AL",
    status: "Assigned",
    tone: "amber" as const,
    time: "10:00",
    day: "Tue",
  },
  {
    id: "RL2046",
    customer: "Casa Bosques",
    destination: "Juárez",
    owner: "MR",
    status: "Delivered",
    tone: "green" as const,
    time: "09:32",
    day: "Wed",
  },
];
const views = [
  { name: "Table", icon: Table },
  { name: "Board", icon: Kanban },
  { name: "Calendar", icon: CalendarBlank },
];

export function ViewsMockup() {
  const ref = useRef<HTMLDivElement>(null);
  const visible = useInView(ref, { amount: 0.3 });
  const reduced = useReducedMotion();
  const [active, setActive] = useState(0);
  useEffect(() => {
    if (!visible || reduced) return;
    const timer = window.setInterval(() => {
      const card = ref.current?.closest("article");
      if (
        document.hidden ||
        card?.getAttribute("aria-hidden") === "true" ||
        card?.getAttribute("data-preview-playing") === "false"
      )
        return;
      setActive((value) => (value + 1) % views.length);
    }, 4200);
    return () => window.clearInterval(timer);
  }, [visible, reduced]);
  const view = reduced ? 0 : active;
  return (
    <div ref={ref} className={styles.viewport} aria-hidden="true">
      <PreviewPanel className={styles.workspace}>
        <div className={styles.header}>
          <PreviewTitle label="Relay / Operations">Deliveries</PreviewTitle>
          <PreviewTag>3 records</PreviewTag>
        </div>
        <div className={styles.tabs}>
          {views.map(({ name, icon: Icon }, index) => (
            <span key={name} className={view === index ? styles.selected : ""}>
              <Icon size={12} />
              {name}
            </span>
          ))}
        </div>
        <div className={styles.content}>
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={view}
              data-view={views[view].name}
              initial={{ opacity: reduced ? 1 : 0, y: reduced ? 0 : 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: reduced ? 0 : -6 }}
              transition={{ duration: reduced ? 0 : 0.25 }}
            >
              {view === 0 ? (
                <div className={styles.table}>
                  <div className={styles.tableHeading}>
                    <span>Delivery</span>
                    <span>Status</span>
                    <span>Owner</span>
                  </div>
                  {deliveries.map((delivery) => (
                    <div className={styles.tableRow} key={delivery.id}>
                      <div>
                        <strong>{delivery.customer}</strong>
                        <small>
                          {delivery.id} · {delivery.destination}
                        </small>
                      </div>
                      <PreviewTag tone={delivery.tone}>{delivery.status}</PreviewTag>
                      <PreviewAvatar initials={delivery.owner} />
                    </div>
                  ))}
                </div>
              ) : view === 1 ? (
                <div className={styles.board}>
                  {["In progress", "Delivered"].map((column, index) => (
                    <div className={styles.column} key={column}>
                      <div className={styles.columnTitle}>
                        {column}
                        <small>{index === 0 ? 2 : 1}</small>
                      </div>
                      {deliveries
                        .filter((delivery) => (delivery.status === "Delivered") === (index === 1))
                        .map((delivery) => (
                          <div className={styles.deliveryCard} key={delivery.id}>
                            <small>{delivery.id}</small>
                            <strong>{delivery.customer}</strong>
                            <div>
                              <PreviewTag tone={delivery.tone} dot>
                                {delivery.status}
                              </PreviewTag>
                              <PreviewAvatar initials={delivery.owner} />
                            </div>
                          </div>
                        ))}
                    </div>
                  ))}
                </div>
              ) : (
                <div className={styles.calendar}>
                  {deliveries.map((delivery, index) => (
                    <div className={styles.day} key={delivery.id}>
                      <div className={styles.dayHeading}>
                        <small>{delivery.day}</small>
                        <b>{23 + index}</b>
                      </div>
                      <div className={`${styles.appointment} ${styles[delivery.tone]}`}>
                        <small>{delivery.time}</small>
                        <strong>{delivery.customer}</strong>
                        <span>{delivery.id}</span>
                        <PreviewAvatar initials={delivery.owner} />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
        <div className={styles.footer}>
          <span className={styles.savedDot} />
          Same records, every perspective.
        </div>
      </PreviewPanel>
    </div>
  );
}

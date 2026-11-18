"use client";

import { useState } from "react";
import styles from "./home-narrative.module.css";

const logic = [
  ["Demand", "Work that needs to be covered."],
  ["Eligible resources", "Who or what could do it."],
  ["Constraints", "The rules that narrow the choice."],
  ["Decision", "A proposed match, approved and recorded."],
] as const;

/** Illustrative applications of the same capability. Not production deployments. */
const operations = [
  {
    id: "logistics",
    label: "Logistics",
    pair: ["Order", "Driver"],
    color: "#f5c84c",
    values: [
      "Order PO-48202, due today at 5:00 PM",
      "Drivers",
      "Shift, delivery zone, vehicle capacity, delivery window",
      "Assign María López to PO-48202",
    ],
  },
  {
    id: "manufacturing",
    label: "Manufacturing",
    pair: ["Production order", "Machine"],
    color: "#f0444f",
    values: [
      "Production order ORD-1043, 8 packing tables",
      "Machines and production lines",
      "Machine capability, maintenance windows, setup time, due date",
      "Schedule ORD-1043 on Line 2, Thursday morning",
    ],
  },
  {
    id: "services",
    label: "Services",
    pair: ["Care request", "Caregiver"],
    color: "#3a86ff",
    values: [
      "Care request for a home visit, Tuesday 9:00 AM",
      "Caregivers",
      "Certifications, availability, travel distance, client preferences",
      "Assign a certified caregiver to the visit",
    ],
  },
] as const;

/** Resource Allocation: one shared logic, shown against three business models. */
export function ResourceAllocation() {
  const [active, setActive] = useState(0);
  const operation = operations[active];
  return (
    <div className={styles.allocation} style={{ "--operation": operation.color } as React.CSSProperties}>
      <div className={styles.allocationTabs} role="group" aria-label="Example operation">
        {operations.map((item, i) => (
          <button
            key={item.id}
            type="button"
            aria-pressed={active === i}
            onClick={() => setActive(i)}
            style={{ "--tab": item.color } as React.CSSProperties}
          >
            <span>{item.label}</span>
            <small>
              {item.pair[0]} → {item.pair[1]}
            </small>
          </button>
        ))}
      </div>
      <div className={styles.allocationTable}>
        <div className={styles.allocationHead}>
          <span>
            Capability <strong>Resource Allocation</strong>
          </span>
          <span aria-live="polite">
            {operation.label} <strong>{operation.pair.join(" → ")}</strong>
          </span>
        </div>
        {logic.map(([term, text], i) => (
          <div className={styles.allocationRow} key={term}>
            <div>
              <strong>{term}</strong>
              <span>{text}</span>
            </div>
            <p key={operation.id}>{operation.values[i]}</p>
          </div>
        ))}
      </div>
      <p className={styles.note}>
        Illustrative applications of one capability, not existing deployments. Resource Allocation is in development.
      </p>
    </div>
  );
}

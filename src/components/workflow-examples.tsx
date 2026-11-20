"use client";

import { Fragment, useState, useId, type ReactNode } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { WorkflowLight } from "./workflow-light";
import Image from "next/image";
import {
  ArrowRight,
  CalendarBlank,
  CaretDown,
  CaretRight,
  Copy,
  DotsThree,
  LinkSimple,
  MagnifyingGlass,
  PencilSimple,
} from "@phosphor-icons/react";
import { useCopy } from "@/i18n/copy";
import { PreviewAvatar, PreviewPanel, PreviewTag, type PreviewTone } from "./preview-ui";
import styles from "./workflow-examples.module.css";

type Field = readonly [label: string, value: string, tone?: PreviewTone, icon?: "copy" | "calendar" | "open"];
type Option = readonly [
  name: string,
  initials: string,
  color: string,
  detail: string,
  status: string,
  tone: PreviewTone,
];

type Example = {
  id: string;
  label: string;
  title: string;
  demand: string;
  resources: string;
  constraints: string;
  record: {
    collection: string;
    id: string;
    subtitle: string;
    properties: readonly Field[];
    related: readonly Field[];
    events: readonly (readonly [actor: string, description: string, time: string])[];
  };
  action: string;
  input: string;
  query: string;
  options: readonly Option[];
  permission: string;
  requirement: string;
  effect: string;
};

const examples: readonly Example[] = [
  {
    id: "logistics",
    label: "Logistics",
    title: "Assign drivers to confirmed orders",
    demand: "Order PO-48202, due today at 5:00 PM",
    resources: "Drivers",
    constraints: "Shift, delivery zone, vehicle capacity, delivery window",
    record: {
      collection: "Orders",
      id: "PO-48202",
      subtitle: "Altamira Retail",
      properties: [
        ["ID", "0130239138", "neutral", "copy"],
        ["Created", "March 23, 2025"],
        ["Due", "March 27, 2025 at 5:00 PM", "neutral", "calendar"],
        ["Status", "Confirmed", "blue"],
        ["Priority", "Urgent", "red"],
      ],
      related: [
        ["Client", "Altamira Retail", "neutral", "open"],
        ["Driver", "Not assigned", "amber"],
        ["Invoice", "INV-3091", "neutral", "open"],
      ],
      events: [
        ["Diego Marín", "confirmed the delivery window", "8:24 AM"],
        ["Diego Marín", "set priority to Urgent", "8:23 AM"],
      ],
    },
    action: "Assign driver",
    input: "Driver",
    query: "Mar",
    options: [
      ["María López", "ML", "#e91e63", "North zone · 2 stops available before 5:00 PM", "Available", "green"],
      ["Jorge Ramírez", "JR", "#9a6ce3", "On route until 4:30 PM", "Limited", "amber"],
      ["Lucía Méndez", "LM", "#008678", "Off shift today", "Unavailable", "red"],
    ],
    permission: "order.assign_driver",
    requirement: "Logistics operator",
    effect: "Links the selected driver to the order. Its status stays Confirmed.",
  },
  {
    id: "manufacturing",
    label: "Manufacturing",
    title: "Schedule jobs on eligible machines",
    demand: "Production order WO-1043, 240 mounting brackets",
    resources: "Press brakes",
    constraints: "Bend length, tooling, setup time, maintenance windows",
    record: {
      collection: "Production orders",
      id: "WO-1043",
      subtitle: "MB-24 mounting bracket · Rev. C",
      properties: [
        ["Lot", "LOT-260318-B", "neutral", "copy"],
        ["Quantity", "240 units"],
        ["Due", "Mar 19 · 2:00 PM", "neutral", "calendar"],
        ["Status", "Ready to schedule", "blue"],
        ["Material", "2 mm 5052 aluminum"],
      ],
      related: [
        ["Routing", "OP-20 · Press brake", "neutral", "open"],
        ["Machine", "Not assigned", "amber"],
        ["Tooling", "V16 die · 88° punch", "neutral", "open"],
      ],
      events: [
        ["Ana Vega", "released the material lot", "8:42 AM"],
        ["Luis Ibarra", "approved routing revision C", "8:16 AM"],
      ],
    },
    action: "Assign machine",
    input: "Machine",
    query: "PB",
    options: [
      ["PB-02 · 80 t", "02", "#e91e63", "V16 die fitted · open 10:00 AM–1:00 PM", "Available", "green"],
      ["PB-04 · 100 t", "04", "#9a6ce3", "45 min changeover to V16 die", "Limited", "amber"],
      ["PB-01 · 60 t", "01", "#008678", "Preventive maintenance until 3:00 PM", "Unavailable", "red"],
    ],
    permission: "production_order.assign_machine",
    requirement: "Production planner",
    effect: "Reserves the machine slot for OP-20 and records the tooling setup.",
  },
  {
    id: "services",
    label: "Services",
    title: "Assign qualified teams to service requests",
    demand: "Preventive HVAC service, Tuesday 9:00–11:00 AM",
    resources: "Field technicians",
    constraints: "HVAC certification, coverage zone, travel time, access window",
    record: {
      collection: "Service requests",
      id: "SR-0217",
      subtitle: "Preventive HVAC service · Centro Norte",
      properties: [
        ["Asset", "RTU-04", "neutral", "copy"],
        ["Visit window", "Tuesday 9:00–11:00 AM", "neutral", "calendar"],
        ["Duration", "90 minutes"],
        ["Status", "Confirmed", "blue"],
        ["Certification", "Commercial HVAC"],
      ],
      related: [
        ["Site", "Centro Norte · Roof access", "neutral", "open"],
        ["Technician", "Not assigned", "amber"],
        ["Contract", "SLA-082 · Preventive maintenance", "neutral", "open"],
      ],
      events: [
        ["Marta Salas", "confirmed roof access with security", "8:35 AM"],
        ["Iván Cruz", "logged the preventive maintenance request", "8:10 AM"],
      ],
    },
    action: "Assign technician",
    input: "Technician",
    query: "HVAC",
    options: [
      ["Elena Ruiz", "ER", "#e91e63", "Commercial HVAC · 15 min from site", "Available", "green"],
      ["Adrián Soto", "AS", "#9a6ce3", "Prior visit ends at 9:30 AM", "Limited", "amber"],
      ["Nora Silva", "NS", "#008678", "Outside the assigned coverage zone", "Unavailable", "red"],
    ],
    permission: "service_request.assign_technician",
    requirement: "Service coordinator",
    effect: "Reserves the technician’s visit window and links them to the request.",
  },
];

export function WorkflowExamples() {
  const copy = useCopy();
  const group = useId();
  const [active, setActive] = useState(0);
  const reduced = useReducedMotion();
  const example = examples[active];
  return (
    <div className={styles.examples}>
      <div className={styles.choices} role="group" aria-label={copy("Example operation")}>
        {examples.map(({ id, label }, index) => (
          <Fragment key={id}>
            <input type="radio" name={group} id={`${group}-${id}`} value={id} checked={active === index} onChange={() => setActive(index)} />
            <label htmlFor={`${group}-${id}`}>{copy(label)}</label>
          </Fragment>
        ))}
      </div>
      <div className={styles.viewport} data-example={example.id}>
        <WorkflowLight />
        <AnimatePresence initial={false} mode="wait">
          <motion.div key={example.id} className={styles.slide}
            initial={{ opacity: 0, x: reduced ? 0 : 48 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: reduced ? 0 : -32 }}
            transition={{ duration: reduced ? 0 : 0.18, ease: "easeOut" }}>
            <WorkflowExample example={example} />
          </motion.div>
        </AnimatePresence>
      </div>
      <p className={styles.note}>{copy("Illustrative workflows with fictional data.")}</p>
    </div>
  );
}

function WorkflowExample({ example }: { example: (typeof examples)[number] }) {
  const copy = useCopy();
  const context = [
    ["Demand", example.demand],
    ["Resources", example.resources],
    ["Constraints", example.constraints],
  ] as const;
  return (
    <div className={styles.stage} data-example={example.id} data-theme="dark">
      <div className={styles.intro}>
        <h3>{copy(example.title)}</h3>
        <dl>
          {context.map(([label, value]) => (
            <div key={label}>
              <dt>{copy(label)}</dt>
              <dd>{copy(value)}</dd>
            </div>
          ))}
        </dl>
      </div>
      <div className={styles.mockups}>
        <RecordMockup record={example.record} />
        <AssignmentMockup example={example} />
      </div>
    </div>
  );
}

function Mockup({ toolbar, children }: { toolbar: ReactNode; children: ReactNode }) {
  return (
    <div className={styles.frame}>
      <PreviewPanel theme="dark" className={styles.panel}>
        <div className={styles.toolbar}>
          <div>{toolbar}</div>
          <span className={styles.glyph} aria-hidden="true">
            <DotsThree size={14} weight="bold" />
          </span>
        </div>
        {children}
      </PreviewPanel>
    </div>
  );
}

const fieldIcons = { copy: Copy, calendar: CalendarBlank, open: CaretRight };

function RecordFields({ title, fields }: { title: string; fields: readonly Field[] }) {
  const copy = useCopy();
  return (
    <div className={styles.recordGroup}>
      <p>{copy(title)}</p>
      <dl>
        {fields.map(([label, value, tone, icon]) => {
          const Icon = icon && fieldIcons[icon];
          return (
            <div key={label}>
              <dt>{copy(label)}</dt>
              <dd>
                <PreviewTag className={styles.value} tone={tone}>
                  {value}
                </PreviewTag>
                {Icon && (
                  <span className={styles.glyph} aria-hidden="true">
                    <Icon size={14} />
                  </span>
                )}
              </dd>
            </div>
          );
        })}
      </dl>
    </div>
  );
}

function RecordMockup({ record }: { record: Example["record"] }) {
  const copy = useCopy();
  return (
    <Mockup
      toolbar={
        <>
          <span className={styles.muted}>{copy(record.collection)} /</span> {record.id}
        </>
      }
    >
      <div className={styles.recordBody}>
        <div className={styles.recordHeader}>
          <div>
            <strong>{record.id}</strong>
            <p>{copy(record.subtitle)}</p>
          </div>
          <div className={styles.recordTools} aria-hidden="true">
            <span className={styles.glyph}>
              <PencilSimple size={14} />
            </span>
            <span className={styles.glyph}>
              <LinkSimple size={14} />
            </span>
          </div>
        </div>
        <RecordFields title="Properties" fields={record.properties} />
        <RecordFields title="Related to" fields={record.related} />
        <div className={styles.recordGroup}>
          <p>{copy("Recorded Events")}</p>
          <ul className={styles.events}>
            {record.events.map(([actor, description, time], index) => (
              <li key={description}>
                {index > 0 && (
                  <Image
                    className={styles.eventConnector}
                    src="/assets/figma/features-iteration/0bb6c.svg"
                    alt=""
                    width={20}
                    height={10}
                  />
                )}
                <span className={styles.eventDot} aria-hidden="true" />
                <span className={styles.eventText}>
                  <b>{actor}</b> {copy(description)}
                </span>
                <time>{time}</time>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Mockup>
  );
}

function AssignmentMockup({ example }: { example: Example }) {
  const copy = useCopy();
  return (
    <Mockup
      toolbar={
        <>
          {copy(example.action)} <ArrowRight aria-hidden="true" size={14} /> {example.record.id}
        </>
      }
    >
      <div className={styles.assignmentBody}>
        <div>
          <div className={styles.fieldLabel}>
            {copy(example.input)} <span className={styles.muted}>{copy("Required")}</span>
          </div>
          <div className={styles.search}>
            <MagnifyingGlass aria-hidden="true" size={14} /> {example.query}
            <CaretDown aria-hidden="true" size={14} />
          </div>
          <ul className={styles.options}>
            {example.options.map(([name, initials, color, detail, status, tone]) => (
              <li key={name}>
                <PreviewAvatar initials={initials} color={color} />
                <div>
                  <span>{copy(name)}</span>
                  <small>{copy(detail)}</small>
                </div>
                <PreviewTag className={styles.value} tone={tone}>
                  {status}
                </PreviewTag>
              </li>
            ))}
          </ul>
        </div>
        <div className={styles.policy}>
          <p>
            {copy("Permission")}: <code>{example.permission}</code> · {copy(example.requirement)}
          </p>
          <p>{copy(example.effect)}</p>
        </div>
      </div>
      <div className={styles.assignmentFooter}>
        <span>{copy("Cancel")}</span>
        <span>{copy(example.action)}</span>
      </div>
    </Mockup>
  );
}

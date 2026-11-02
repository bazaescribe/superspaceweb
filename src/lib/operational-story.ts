/**
 * Presentation data for the website's product mockups.
 *
 * It mirrors the behavior demonstrated by the Superspace demo operations (object types, lifecycle
 * states, the Assign driver action and its activity record) without depending on the product's
 * implementation. Customer names are fictional; never copy fixture data into this file verbatim.
 */

export type StoryTone = "neutral" | "green" | "blue" | "amber" | "red";

export type ActivityEntry = {
  id: string;
  actor: string;
  text: string;
  detail?: string;
  time: string;
  tone?: StoryTone;
  badge?: string;
};

export type RelatedEntry = { label: string; value?: string; type?: string; empty: string };

export type ObjectRecord = {
  type: string;
  id: string;
  subtitle: string;
  fields: { label: string; value: string; tone?: StoryTone }[];
  states: readonly string[];
  terminal?: string;
  state: string;
  related: RelatedEntry[];
  actions: string[];
  activity: ActivityEntry[];
};

export const stateTones: Record<string, StoryTone> = {
  Draft: "neutral",
  Confirmed: "blue",
  "In Transit": "amber",
  Delivered: "green",
  Cancelled: "red",
  Queued: "neutral",
  "In Progress": "blue",
  Completed: "green",
  Urgent: "red",
  High: "amber",
  Normal: "neutral",
};

/* Logistics: the primary narrative thread. */

export const organization = "Acme Logistics";
export const viewer = { name: "Ana Torres", initials: "AT" };

export const orderStates = ["Draft", "Confirmed", "In Transit", "Delivered"] as const;

export type OrderRow = {
  id: string;
  customer: string;
  total: string;
  priority: "Normal" | "High" | "Urgent";
  state: (typeof orderStates)[number] | "Cancelled";
  driver?: string;
};

export const storyOrderId = "PO-48202";

export const orders: OrderRow[] = [
  { id: "PO-48202", customer: "Altamira Retail", total: "$731.50", priority: "Urgent", state: "Draft" },
  { id: "PO-48203", customer: "Casa Lumen", total: "$1,240.00", priority: "High", state: "Confirmed" },
  {
    id: "PO-48204",
    customer: "Pacífico Supply",
    total: "$386.00",
    priority: "Normal",
    state: "In Transit",
    driver: "Jorge Ramírez",
  },
  { id: "PO-48205", customer: "Norte Home", total: "$2,115.00", priority: "Normal", state: "Confirmed" },
  { id: "PO-48207", customer: "Pacífico Supply", total: "$612.00", priority: "High", state: "Confirmed" },
  {
    id: "PO-48201",
    customer: "Altamira Retail",
    total: "$4,820.00",
    priority: "Normal",
    state: "Delivered",
    driver: "María López",
  },
  {
    id: "PO-48206",
    customer: "Casa Lumen",
    total: "$958.40",
    priority: "Normal",
    state: "Delivered",
    driver: "Lucía Méndez",
  },
  { id: "PO-48208", customer: "Norte Home", total: "$1,780.00", priority: "Normal", state: "Cancelled" },
];

export const drivers = [
  { name: "María López", initials: "ML", color: "#7263dd" },
  { name: "Jorge Ramírez", initials: "JR", color: "#00a6f4" },
  { name: "Lucía Méndez", initials: "LM", color: "#00bc7d" },
];

/** The authorized action in the story. It creates a relationship; it does not change lifecycle state. */
export const assignDriver = {
  name: "Assign driver",
  input: "Driver",
  query: "Mar",
  permission: "order.assign_driver",
  role: "Logistics operator",
  effect: "Creates the Assigned driver relationship. The order’s state does not change.",
};

export function orderRecord(order: OrderRow, assignedDriver?: string): ObjectRecord {
  const driver = assignedDriver ?? order.driver;
  const story = order.id === storyOrderId;
  const activity: ActivityEntry[] = [
    {
      id: "priority",
      actor: "Diego Marín",
      text: "set Priority to Urgent",
      detail: "Priority: Normal → Urgent",
      time: "Fri 17:41",
      tone: "amber",
    },
    { id: "created", actor: "Diego Marín", text: `created ${order.id}`, detail: "State: Draft", time: "Fri 17:40" },
  ];
  if (!story)
    activity.splice(0, 1, { id: "state", actor: "Lucía Méndez", text: `moved to ${order.state}`, time: "Sat 09:12" });
  if (assignedDriver)
    activity.unshift({
      id: "assigned",
      actor: viewer.name,
      text: `ran ${assignDriver.name}`,
      detail: `Driver: ${assignedDriver} · Assigned driver relationship created`,
      time: "Mon 08:14",
      tone: "green",
    });
  return {
    type: "Order",
    id: order.id,
    subtitle: order.customer,
    fields: [
      { label: "Number", value: order.id },
      { label: "Total", value: order.total },
      { label: "Priority", value: order.priority, tone: stateTones[order.priority] },
    ],
    states: orderStates,
    terminal: "Cancelled",
    state: order.state,
    related: [
      { label: "Customer", value: order.customer, type: "Customer", empty: "" },
      { label: "Assigned driver", value: driver, type: "Driver", empty: "No driver assigned" },
    ],
    actions: [assignDriver.name],
    activity,
  };
}

/* Operational briefing: Operational Intelligence v0 is in development. */

export type BriefingSegment = string | { figure: string } | { ref: string };

export type BriefingItem = {
  id: string;
  subject: string;
  tags: { label: string; tone?: StoryTone }[];
  title: string;
  actions: { label: string; intent: "assign" | "open" | "collection" }[];
};

export const briefing = {
  /**
   * "design-preview" keeps the in-development disclosure visible. Switch to "verified" only after
   * Operational Intelligence v0 has been validated in the product and these figures come from it.
   */
  status: "design-preview" as "design-preview" | "verified",
  label: "Operational briefing",
  generatedAt: "Mon 8:02 AM",
  greeting: `Good morning, ${viewer.name.split(" ")[0]}.`,
  summary: [
    "Since Friday, ",
    { figure: "18 orders" },
    " were delivered and ",
    { figure: "1" },
    " was cancelled. ",
    { figure: "4 orders" },
    " are still waiting for a driver. One of them, ",
    { ref: "PO-48202" },
    ", is urgent.",
  ] as BriefingSegment[],
  items: [
    {
      id: "PO-48202",
      subject: "PO-48202",
      tags: [{ label: "Urgent", tone: "red" }, { label: "Draft" }, { label: "No driver", tone: "amber" }],
      title: "Urgent order without a driver",
      actions: [
        { label: "Assign driver", intent: "assign" },
        { label: "Open order", intent: "open" },
      ],
    },
    {
      id: "unassigned",
      subject: "3 orders",
      tags: [
        { label: "Confirmed", tone: "blue" },
        { label: "No driver", tone: "amber" },
      ],
      title: "Confirmed orders without a driver",
      actions: [{ label: "View in Orders", intent: "collection" }],
    },
    {
      id: "PO-48208",
      subject: "PO-48208",
      tags: [{ label: "Cancelled", tone: "red" }],
      title: "Order cancelled on Saturday",
      actions: [{ label: "Open order", intent: "open" }],
    },
  ] as BriefingItem[],
  provenance: [
    "Figures calculated from Orders and Activity",
    "Summary written by AI",
    "Every item links to its record",
  ],
};

/* Agent proposal: experimental, not generally available. */

export const agentProposal = {
  agent: "Dispatch analysis agent",
  subject: storyOrderId,
  action: assignDriver.name,
  input: "María López",
  rationale:
    "PO-48202 is marked Urgent and has no assigned driver. Assign driver is permitted for this order, and María López is a Driver record within this agent’s read scope.",
  evidence: ["PO-48202", "María López", "Assign driver"],
  expires: "Expires in 15 min",
  badge: "Agent-assisted, human-approved",
};

/* Manufacturing: the same platform, a different operation. */

export const jobStates = ["Queued", "In Progress", "Completed"] as const;

export const productionJobs = [
  { id: "JOB-209", order: "ORD-1043", product: "PT-300 Packing Table", quantity: "8", state: "Queued", owner: "" },
  {
    id: "JOB-208",
    order: "ORD-1042",
    product: "WS-100 Modular Workstation",
    quantity: "12",
    state: "In Progress",
    owner: "Ana Martínez",
  },
  {
    id: "JOB-207",
    order: "ORD-1044",
    product: "DC-400 Display Counter",
    quantity: "6",
    state: "Completed",
    owner: "María López",
  },
] as const;

export const productionJob: ObjectRecord = {
  type: "Production job",
  id: "JOB-209",
  subtitle: "PT-300 Packing Table × 8",
  fields: [
    { label: "Job", value: "JOB-209" },
    { label: "Product", value: "PT-300 Packing Table" },
    { label: "Quantity", value: "8" },
    { label: "Owner", value: "Not assigned", tone: "amber" },
  ],
  states: jobStates,
  state: "Queued",
  related: [
    { label: "Manufacturing order", value: "ORD-1043", type: "Manufacturing order", empty: "" },
    { label: "Customer", value: "Arbor Offices", type: "Customer", empty: "" },
  ],
  actions: ["Assign production owner", "Start production"],
  activity: [
    { id: "queued", actor: "Carlos Ruiz", text: "created JOB-209", detail: "State: Queued", time: "Thu 11:05" },
  ],
};

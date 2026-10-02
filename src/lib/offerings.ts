export const offerings = [
  {
    id: "logistics-delivery",
    title: "Logistics & Delivery",
    description: "Keep requests, dispatch, drivers, and delivery exceptions connected.",
    problem:
      "Requests arrive through different channels. Dispatchers coordinate drivers in messages, while delivery status and exceptions live somewhere else. Each change means another round of calls and updates.",
    fit: "Superspace can connect delivery requests, assignments, routes, and status in one operational workspace. Your team works from shared records, follows clear handoffs, and keeps exceptions attached to the delivery they affect.",
    workflow: ["Delivery requested", "Driver assigned", "Delivery tracked", "Exception resolved"],
  },
  {
    id: "retail-distribution",
    title: "Retail & Distribution",
    description: "Coordinate orders, stock, replenishment, and fulfillment across locations.",
    problem:
      "Sales, warehouse teams, and individual locations work from different versions of the same information. Stock changes are hard to trace, replenishment depends on manual checks, and order exceptions fall between teams.",
    fit: "Superspace can model products, locations, stock movements, and orders as connected records. Teams can coordinate replenishment and fulfillment around shared information, with responsibilities and exceptions visible throughout the process.",
    workflow: ["Order received", "Stock checked", "Fulfillment assigned", "Movement recorded"],
  },
  {
    id: "field-services",
    title: "Field Services",
    description: "Bring scheduling, assignments, service records, and follow-up into one workspace.",
    problem:
      "Scheduling depends on spreadsheets and messages. When availability changes or a job needs another visit, coordinators have to reconstruct the context from conversations, photos, and separate service records.",
    fit: "Superspace can bring customers, service requests, schedules, and field teams into one system. Each job carries its assignments, history, and supporting information, so office and field teams can coordinate the next step together.",
    workflow: ["Service requested", "Visit scheduled", "Work recorded", "Follow-up coordinated"],
  },
  {
    id: "manufacturing-operations",
    title: "Manufacturing Operations",
    description: "Track production orders, materials, quality checks, and operational handoffs.",
    problem:
      "Production plans, material availability, and quality records are spread across tools. Teams spend time reconciling progress, and a delay or failed check can be difficult to connect to the work it affects.",
    fit: "Superspace can connect production orders, materials, stages, and quality checks in a shared operating model. Teams can track responsibilities and progress, record issues, and coordinate the handoffs needed to keep work moving.",
    workflow: ["Order planned", "Materials coordinated", "Progress recorded", "Quality reviewed"],
  },
  {
    id: "property-facilities",
    title: "Property & Facilities",
    description: "Coordinate maintenance requests, contractors, assets, and recurring work.",
    problem:
      "Maintenance requests arrive in inboxes and chats. Asset history, contractor assignments, and recurring tasks sit in separate lists, making it difficult to see what is outstanding and who is responsible.",
    fit: "Superspace can connect properties, assets, maintenance requests, and contractors. Your team can assign work, track its status, and keep service history with the relevant asset, giving each request a clear owner and next step.",
    workflow: ["Issue reported", "Work assigned", "Service completed", "Asset history updated"],
  },
  {
    id: "customer-account-operations",
    title: "Customer & Account Operations",
    description: "Keep onboarding, service requests, commitments, and account history together.",
    problem:
      "Customer commitments are scattered across sales notes, messages, and task lists. Onboarding and service teams inherit incomplete context, and account owners have to chase updates to understand what has been promised or delivered.",
    fit: "Superspace can connect customer accounts, contacts, onboarding steps, and service requests. Each team can work from a shared account history, with commitments, responsibilities, and the next action kept visible.",
    workflow: ["Account created", "Onboarding coordinated", "Requests managed", "Commitments followed up"],
  },
] as const;

export type Offering = (typeof offerings)[number];

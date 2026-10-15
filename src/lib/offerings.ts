export const offerings = [
  {
    id: "logistics-delivery",
    image: "/assets/figma/industries/maritime.png",
    title: "Logistics & Delivery",
    description: "Keep requests, dispatch, drivers, and delivery exceptions connected.",
    problem:
      "Requests arrive through different channels. Dispatchers coordinate drivers in messages, while delivery status and exceptions live somewhere else. Each change means another round of calls and updates.",
    fit: "Superspace can connect delivery requests, assignments, routes, and status in one operational workspace. Your team works from shared records, follows clear handoffs, and keeps exceptions attached to the delivery they affect.",
    capabilities: [
      "Delivery intake and dispatch",
      "Driver and vehicle assignment",
      "Route planning and stop coordination",
      "Delivery status and exception handling",
    ],
    features: [
      {
        title: "Roles & Permissions",
        description: "Configure access for dispatchers, drivers, and operational teams.",
      },
      {
        title: "Activity & Audit Trail",
        description: "Keep a traceable history of delivery status changes and assignments.",
      },
      { title: "Custom Views", description: "Create shared views of dispatch queues and delivery status." },
      { title: "Rules & Automations", description: "Model assignment conditions and exception handoffs." },
      {
        title: "Files, comments & context",
        description: "Keep supporting documents and conversations attached to the relevant record.",
      },
      {
        title: "Integrations & API",
        description: "Connect existing systems so their data can participate in the operation.",
      },
    ],
    workflow: ["Delivery requested", "Driver assigned", "Delivery tracked", "Exception resolved"],
  },
  {
    id: "retail-distribution",
    image: "/assets/figma/industries/hero-desktop-retail.png",
    title: "Retail & Distribution",
    description: "Coordinate orders, stock, replenishment, and fulfillment across locations.",
    problem:
      "Sales, warehouse teams, and individual locations work from different versions of the same information. Stock changes are hard to trace, replenishment depends on manual checks, and order exceptions fall between teams.",
    fit: "Superspace can model products, locations, stock movements, and orders as connected records. Teams can coordinate replenishment and fulfillment around shared information, with responsibilities and exceptions visible throughout the process.",
    capabilities: [
      "Order intake and fulfillment",
      "Stock movements across locations",
      "Replenishment requests and purchasing",
      "Returns and order exceptions",
    ],
    features: [
      {
        title: "Roles & Permissions",
        description: "Configure access for sales, warehouses, and individual locations.",
      },
      {
        title: "Activity & Audit Trail",
        description: "Keep a traceable history of stock movements and order changes.",
      },
      { title: "Custom Views", description: "Create shared views of orders, inventory, and replenishment." },
      { title: "Rules & Automations", description: "Model replenishment thresholds and order approvals." },
      {
        title: "Files, comments & context",
        description: "Keep supporting documents and conversations attached to the relevant record.",
      },
      {
        title: "Integrations & API",
        description: "Connect existing systems so their data can participate in the operation.",
      },
    ],
    workflow: ["Order received", "Stock checked", "Fulfillment assigned", "Movement recorded"],
  },
  {
    id: "field-services",
    image: "/assets/figma/industries/hero-desktop-building.png",
    title: "Field Services",
    description: "Bring scheduling, assignments, service records, and follow-up into one workspace.",
    problem:
      "Scheduling depends on spreadsheets and messages. When availability changes or a job needs another visit, coordinators have to reconstruct the context from conversations, photos, and separate service records.",
    fit: "Superspace can bring customers, service requests, schedules, and field teams into one system. Each job carries its assignments, history, and supporting information, so office and field teams can coordinate the next step together.",
    capabilities: [
      "Service request intake",
      "Visit scheduling and team assignment",
      "Job records and completion evidence",
      "Follow-up visits and outstanding work",
    ],
    features: [
      { title: "Roles & Permissions", description: "Configure access for coordinators, technicians, and contractors." },
      {
        title: "Activity & Audit Trail",
        description: "Keep a traceable history of job assignments and service updates.",
      },
      { title: "Custom Views", description: "Create shared views of team schedules and outstanding jobs." },
      { title: "Rules & Automations", description: "Model service approvals and follow-up tasks." },
      {
        title: "Files, comments & context",
        description: "Keep supporting documents and conversations attached to the relevant record.",
      },
    ],
    workflow: ["Service requested", "Visit scheduled", "Work recorded", "Follow-up coordinated"],
  },
  {
    id: "manufacturing-operations",
    image: "/assets/figma/industries/hero-desktop-manufacture.png",
    title: "Manufacturing Operations",
    description: "Track production orders, materials, quality checks, and operational handoffs.",
    problem:
      "Production plans, material availability, and quality records are spread across tools. Teams spend time reconciling progress, and a delay or failed check can be difficult to connect to the work it affects.",
    fit: "Superspace can connect production orders, materials, stages, and quality checks in a shared operating model. Teams can track responsibilities and progress, record issues, and coordinate the handoffs needed to keep work moving.",
    capabilities: [
      "Production order coordination",
      "Material requirements and availability",
      "Production stages and handoffs",
      "Quality checks and issue tracking",
    ],
    features: [
      { title: "Roles & Permissions", description: "Configure access for production, warehouse, and quality teams." },
      {
        title: "Activity & Audit Trail",
        description: "Keep a traceable history of production updates and quality decisions.",
      },
      { title: "Custom Views", description: "Create shared views of production stages and material requirements." },
      { title: "Rules & Automations", description: "Model stage transitions and quality approvals." },
      {
        title: "Files, comments & context",
        description: "Keep supporting documents and conversations attached to the relevant record.",
      },
      {
        title: "Integrations & API",
        description: "Connect existing systems so their data can participate in the operation.",
      },
    ],
    workflow: ["Order planned", "Materials coordinated", "Progress recorded", "Quality reviewed"],
  },
  {
    id: "property-facilities",
    image: "/assets/figma/industries/hero-desktop-people.png",
    title: "Property & Facilities",
    description: "Coordinate maintenance requests, contractors, assets, and recurring work.",
    problem:
      "Maintenance requests arrive in inboxes and chats. Asset history, contractor assignments, and recurring tasks sit in separate lists, making it difficult to see what is outstanding and who is responsible.",
    fit: "Superspace can connect properties, assets, maintenance requests, and contractors. Your team can assign work, track its status, and keep service history with the relevant asset, giving each request a clear owner and next step.",
    capabilities: [
      "Maintenance request intake",
      "Asset and service history",
      "Contractor assignment and scheduling",
      "Recurring inspections and preventive work",
    ],
    features: [
      {
        title: "Roles & Permissions",
        description: "Configure access for property teams, contractors, and site managers.",
      },
      {
        title: "Activity & Audit Trail",
        description: "Keep a traceable history of maintenance work and asset updates.",
      },
      { title: "Custom Views", description: "Create shared views of requests by property, asset, and status." },
      { title: "Rules & Automations", description: "Model recurring tasks and maintenance approvals." },
      {
        title: "Files, comments & context",
        description: "Keep supporting documents and conversations attached to the relevant record.",
      },
    ],
    workflow: ["Issue reported", "Work assigned", "Service completed", "Asset history updated"],
  },
  {
    id: "customer-account-operations",
    image: "/assets/figma/industries/hero-desktop-support.png",
    title: "Customer & Account Operations",
    description: "Keep onboarding, service requests, commitments, and account history together.",
    problem:
      "Customer commitments are scattered across sales notes, messages, and task lists. Onboarding and service teams inherit incomplete context, and account owners have to chase updates to understand what has been promised or delivered.",
    fit: "Superspace can connect customer accounts, contacts, onboarding steps, and service requests. Each team can work from a shared account history, with commitments, responsibilities, and the next action kept visible.",
    capabilities: [
      "Account and contact records",
      "Onboarding tasks and handoffs",
      "Service request coordination",
      "Customer commitments and follow-up",
    ],
    features: [
      {
        title: "Roles & Permissions",
        description: "Configure access for account owners, onboarding, and service teams.",
      },
      {
        title: "Activity & Audit Trail",
        description: "Keep a traceable history of account updates and customer commitments.",
      },
      { title: "Custom Views", description: "Create shared views of onboarding progress and service requests." },
      { title: "Rules & Automations", description: "Model handoffs and commitment follow-up." },
      {
        title: "Files, comments & context",
        description: "Keep supporting documents and conversations attached to the relevant record.",
      },
    ],
    workflow: ["Account created", "Onboarding coordinated", "Requests managed", "Commitments followed up"],
  },
  {
    id: "unconventional-industries",
    image: "/assets/figma/industries/hero-desktop-hard.png",
    title: "Unconventional Industries",
    description: "Explore a shared operating system for work that doesn’t fit a standard category.",
    problem:
      "Specialized operations rarely fit neatly into standard tools. Teams coordinate unique assets, dependencies, and decisions across spreadsheets and conversations, making it difficult to keep responsibilities and context connected as the work changes.",
    fit: "Discovery helps establish whether Superspace can model your operation’s records, relationships, permissions, and workflows. Together we identify the requirements, validate the fit, and define a practical deployment scope.",
    capabilities: [
      "Specialized asset and resource records",
      "Team assignments and operational handoffs",
      "Approval stages and exception handling",
      "Dependencies and operational status tracking",
    ],
    features: [
      {
        title: "Roles & Permissions",
        description: "Define access around specialist teams and operational responsibilities.",
      },
      { title: "Activity & Audit Trail", description: "Keep a traceable record of changes, decisions, and handoffs." },
      {
        title: "Custom Views",
        description: "Organize operational information around the perspectives your team needs.",
      },
      {
        title: "Rules & Automations",
        description: "Express agreed conditions for actions, approvals, and state changes.",
      },
      {
        title: "Files, comments & context",
        description: "Keep technical documents and discussions attached to the relevant work.",
      },
      {
        title: "Integrations & API",
        description: "Explore how existing systems could participate in a shared operational model.",
      },
    ],
    workflow: ["Requirements mapped", "Fit validated", "Workflow configured", "Operation reviewed"],
  },
] as const;

export type Offering = (typeof offerings)[number];

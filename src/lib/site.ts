export const bookingUrl = process.env.NEXT_PUBLIC_BOOKING_URL || "#conversation";

export const platformPillars = [
  {
    id: "matrix",
    title: "Matrix, your company modeled.",
    description: "The people, customers, projects, contracts, orders and relationships that make your business work.",
    number: "01",
  },
  {
    id: "flow",
    title: "Flow, your company in motion.",
    description: "The rules and workflows that move work through your operation.",
    number: "02",
  },
  {
    id: "atlas",
    title: "Atlas, your company understood.",
    description: "The knowledge your people and systems need to operate with context.",
    number: "03",
  },
] as const;

export const industries = [
  {
    id: "marketplaces",
    label: "Marketplaces",
    title: "Marketplaces",
    copy: "Run customers, providers, orders, matching, payments and disputes from one system.",
    detail: "Gig and service marketplaces",
    image: "/assets/raw-13.png",
  },
  {
    id: "retail",
    label: "Retail",
    title: "Retail",
    copy: "Connect inventory, teams, orders and service operations around the work that matters.",
    detail: "Modern retail operations",
    image: "/assets/raw-03.png",
  },
  {
    id: "fintech",
    label: "Fintech",
    title: "Fintech",
    copy: "Bring customer operations, controls and service workflows into one operating system.",
    detail: "Financial operations",
    image: "/assets/raw-15.png",
  },
  {
    id: "community",
    label: "Community and Events",
    title: "Community and Events",
    copy: "Coordinate members, programmes, partners and the work behind every experience.",
    detail: "Member-led businesses",
    image: "/assets/raw-20.png",
  },
  {
    id: "manufacturing",
    label: "Manufacturing",
    title: "Manufacturing",
    copy: "Make the handoffs between planning, production and service visible and dependable.",
    detail: "Production operations",
    image: "/assets/raw-03.png",
  },
  {
    id: "logistics",
    label: "Logistics and Trade",
    title: "Logistics and Trade",
    copy: "Coordinate movement, exceptions, partners and the decisions that keep work moving.",
    detail: "Trade and logistics",
    image: "/assets/raw-20.png",
  },
  {
    id: "assets",
    label: "IT Assets",
    title: "IT Assets",
    copy: "Model equipment, ownership, requests and lifecycle workflows as one accountable system.",
    detail: "Asset-intensive teams",
    image: "/assets/raw-15.png",
  },
] as const;

export const footerGroups = [
  { title: "Platform", links: ["Matrix", "Flow", "Atlas"] },
  { title: "Company", links: ["About us", "Terms", "Support"] },
  { title: "Learn", links: ["Docs", "Blog", "Changelog"] },
  { title: "Social", links: ["LinkedIn", "Product Hunt", "Github", "X"] },
] as const;

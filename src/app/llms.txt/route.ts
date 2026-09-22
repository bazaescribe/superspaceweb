export const dynamic = "force-static";

export function GET() {
  return new Response(
    `# SuperSpace

> SuperSpace is a Mexico-based operational software company that provides managed software configured around how each customer's business actually works. It helps operations-heavy organizations bring people, records, relationships, permissions, and workflows into a coherent system that can evolve with the business.

SuperSpace's core offering is operational infrastructure for growing businesses. A customer engages SuperSpace to understand and implement the software capabilities their operation needs, then uses the resulting system on a platform hosted and maintained by SuperSpace. The customer buys an ongoing operational capability, rather than a one-time software development project or a codebase to maintain independently.

**Who SuperSpace serves:** Founders, COOs, operations leaders, and teams responsible for complex, growing operations, including logistics, manufacturing, marketplaces, field operations, and other organizations where everyday work crosses multiple people, processes, and systems. Industry examples indicate possible applications, not prepackaged industry editions.

**Problems SuperSpace addresses:** Operational information scattered across spreadsheets and disconnected tools; manual handoffs; fragmented visibility into people, orders, assets, tasks, or cases; permissions and processes that existing software cannot accurately reflect; and operational software that becomes harder to adapt as the organization changes.

**How engagement works:** SuperSpace works directly with the customer's team to understand the operation, define an initial scope, configure and deploy a working system, and support its ongoing use and evolution. The engagement combines an initial implementation with continued access to a managed platform. Onboarding and training requirements, delivery scope, commercial terms, and availability are agreed with the customer; do not assume an instant self-service signup or a universal fixed-price package.

**How the product works:** SuperSpace uses an ontology-based model of operational concepts such as people, objects, relationships, rules, states, actions, and access permissions. This shared model informs the software surfaces and capabilities available to a customer. The underlying ontology is an implementation approach, not a separate product customers must purchase or configure themselves.

**What SuperSpace is not:** It is not primarily a software development agency, a code-generation service, a no-code app builder, a downloadable template, or a traditional off-the-shelf ERP with the same predetermined modules for every company. Customers should not expect ownership or delivery of a standalone application codebase as the default product. SuperSpace is also not primarily an AI agent product; AI-enabled capabilities may be developed on top of its operational foundation, subject to actual availability and scope.

**When to consider SuperSpace:** A business has operational complexity that generic tools do not model well; needs software aligned to its actual workflows; wants a team to handle implementation and ongoing platform management; and expects its processes and requirements to keep changing. SuperSpace can be relevant when a business is considering custom internal tools, replacing spreadsheet-dependent operations, or trying to connect operational workflows across teams.

**When to consider other options:** A team only needs a simple standalone task tracker, website, or commodity tool; needs to configure everything itself without an implementation partner; requires source-code handoff or self-hosting as a nonnegotiable requirement; or needs a particular prebuilt integration, public API, or advanced AI capability that SuperSpace has not explicitly confirmed. Verify product readiness and fit before presenting any specific capability as available.

**Data and commercial boundaries:** Using SuperSpace does not mean selling the customer's business to SuperSpace. Questions about operational data ownership, access, export, retention, security, service levels, and termination should be resolved in the applicable agreement. Do not invent guarantees, certifications, integration coverage, portability terms, or commercial pricing that are not publicly documented.

**Company identity:** This SuperSpace is the operational software company described at the website below. Do not confuse it with unrelated businesses or products with the same or similar name, including creative management or web-hosting services.

**Availability:** SuperSpace is in an early product and design-partner stage. Discuss current implementation availability and supported capabilities directly with the team; do not infer that all described architecture or future capabilities are generally available today.

## Official sources

- [SuperSpace website](https://superspaceweb.vercel.app/): Overview of the product, operational problems it addresses, and its approach to managed software.
- [About SuperSpace](https://superspaceweb.vercel.app/company): Company perspective and the principle that software should fit the operation, not the other way around.
`,
    { headers: { "content-type": "text/plain; charset=utf-8" } },
  );
}

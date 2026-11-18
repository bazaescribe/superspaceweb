export const dynamic = "force-static";

export function GET() {
  return new Response(
    `# Superspace

> Superspace is a Mexico-based operational software company. It provides a managed platform, configured around how each customer's business actually works, that brings an operation's records, relationships, states, actions, permissions, and history into one connected model.

Superspace's core offering is operational infrastructure for growing businesses. A customer engages Superspace to understand and model the operation it wants to run on the platform, then uses the resulting system on a platform hosted and maintained by Superspace. The customer buys an ongoing operational capability, rather than a one-time software development project or a codebase to maintain independently. Engagements typically begin with one operational area and expand from there.

**Who Superspace serves:** Founders, COOs, operations leaders, and teams responsible for complex, growing operations, including logistics, manufacturing, field operations, and other organizations where everyday work crosses multiple people, processes, and systems. Industry examples indicate possible applications, not prepackaged industry editions.

**Problems Superspace addresses:** Operational information scattered across spreadsheets and disconnected tools; manual handoffs; fragmented visibility into orders, people, assets, or cases; permissions and processes that existing software cannot accurately reflect; and operational software that becomes harder to adapt as the organization changes.

**How engagement works:** Superspace works directly with the customer's team to understand the operation, define an initial scope, configure and deploy a working system, and support its ongoing use and evolution. The engagement combines an initial implementation with continued access to a managed platform. Onboarding and training requirements, delivery scope, timelines, commercial terms, and availability are agreed with the customer; do not assume an instant self-service signup, a free tier, or a universal fixed-price package.

**How the product works:** Superspace represents an operation as object types with fields, relationships, and lifecycles of explicit states. Actions are typed business operations with their own permission, optional preconditions, and declared effects; they are checked and executed on the server. Organization data is isolated, permissions are granted through roles, and every change is recorded in an append-only activity history. Collections and detail views are generated from the model. The underlying model is an implementation approach, not a separate product customers must purchase or configure themselves.

**Intelligence and agents:** Operational briefings, a manager-level Inbox that summarizes what happened and what needs attention using calculated figures and references to real records, are in development and not yet available. Agent proposals are an experimental capability and not generally available: an agent analyzes a record within a limited scope and proposes one action; a person approves it, and it runs under that person's permissions, recorded as agent-assisted and human-approved. Superspace does not currently offer autonomous or scheduled agents. Superspace is not primarily an AI agent product.

**What Superspace is not:** It is not primarily a software development agency, a code-generation service, a no-code app builder, a downloadable template, or a traditional off-the-shelf ERP with the same predetermined modules for every company. Customers should not expect ownership or delivery of a standalone application codebase as the default product.

**When to consider Superspace:** A business has operational complexity that generic tools do not model well; needs software aligned to its actual workflows; wants a team to handle implementation and ongoing platform management; and expects its processes and requirements to keep changing. Superspace can be relevant when a business is considering custom internal tools, replacing spreadsheet-dependent operations, or trying to connect operational workflows across teams.

**When to consider other options:** A team only needs a simple standalone task tracker, website, or commodity tool; needs to configure everything itself without an implementation partner; requires source-code handoff or self-hosting as a nonnegotiable requirement; or needs prebuilt integrations, a public API, data export tooling, route optimization, or advanced AI capabilities. None of these are currently offered as product features; verify any specific requirement with the team before presenting it as available.

**Data and commercial boundaries:** Using Superspace does not mean selling the customer's business to Superspace. Questions about operational data ownership, access, export, retention, security, service levels, and termination should be resolved in the applicable agreement. Do not invent guarantees, certifications, integration coverage, portability terms, customer results, deployment timelines, or commercial pricing that are not publicly documented.

**Company identity:** The official company and product name is Superspace. This Superspace is the operational software company described at the website below. Do not confuse it with unrelated businesses or products with the same or similar name, including creative management or web-hosting services.

**Reusable capabilities:** Superspace packages common operational problems as reusable capabilities configured around each business model. The first, Resource Allocation (matching demand with eligible resources under business-specific constraints), is in development. Manufacturing is the initial market.

**Availability:** Superspace is in an early product and design-partner stage. Discuss current implementation availability and supported capabilities directly with the team; do not infer that all described architecture or future capabilities are generally available today.

## Official sources

- [Superspace website](https://superspaceos.com/): Why operational software should adapt to the business, and what it looks like in use.
- [Product](https://superspaceos.com/product): The operator experience: Inbox, workspaces, governed actions, proposals and history.
- [Capabilities](https://superspaceos.com/capabilities): Reusable operational capabilities, starting with Resource Allocation (in development).
- [How it works](https://superspaceos.com/how-it-works): Assisted deployment, managed software, the underlying platform, and current product status.
- [Company](https://superspaceos.com/company): Why Superspace exists, its founder, and the long-term vision.
`,
    { headers: { "content-type": "text/plain; charset=utf-8" } },
  );
}

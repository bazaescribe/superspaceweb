import type { ReactNode } from "react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { HeaderThemeScope } from "@/components/header-theme";
import { BookingLink } from "@/components/booking-link";
import { HeroHeading, EntranceHeading } from "@/components/entrance-heading";
import { ShowcaseSection } from "@/components/showcase-section";
import {
  PlatformCoreDiagram,
  PlatformModelPreview,
  PlatformWorkspacePreview,
  PlatformActionPreview,
  PlatformIntelligencePreview,
  PlatformGovernancePreview,
} from "@/components/platform-previews";
import { briefing } from "@/lib/operational-story";
import { createPageMetadata } from "@/lib/seo";
import styles from "./platform.module.css";

export const metadata = createPageMetadata({
  title: "Platform — One model of your operation",
  description:
    "Superspace represents your business as objects, relationships, states, and actions, governed by one set of permissions and recorded in one history. Workspaces, intelligence, and agents all work from that foundation.",
  path: "/platform",
});

function Notes({ example, hood, status }: { example: ReactNode; hood: ReactNode; status?: ReactNode }) {
  return (
    <div className={styles.notes}>
      <div>
        <h3>In the example</h3>
        <p>{example}</p>
      </div>
      <div className={styles.hood}>
        <h3>Under the hood</h3>
        <p>{hood}</p>
      </div>
      {status && <p className={styles.status}>{status}</p>}
    </div>
  );
}

const comparison = [
  ["Object types", "Customer · Order · Driver", "Manufacturing order · Production job · Fulfillment"],
  ["Lifecycle", "Draft → Confirmed → In Transit → Delivered", "Queued → In Progress → Completed"],
  ["Relationship", "Order → Assigned driver", "Production job → Manufacturing order"],
  ["Action", "Assign driver", "Assign production owner · Start production"],
  ["Exception", "PO-48202: urgent, no driver", "JOB-209: queued, no owner"],
];

const principles = [
  ["Declarative object model", "Types, fields, relationships and lifecycles are definitions, not custom code."],
  ["Server-checked actions", "Permissions and preconditions are evaluated when an action runs."],
  ["Database-enforced isolation", "Each organization’s data is separated below the application layer."],
  ["Append-only activity", "Events can’t be edited or deleted; one action’s effects are grouped together."],
  ["Presentation separate from access", "What a screen shows never decides what a user may do."],
  ["Bounded agent proposals", "Limited scope and inference, one proposed action, human approval required."],
];

export default function PlatformPage() {
  return (
    <HeaderThemeScope defaultTone="dark" data-theme="dark" className="site-v2 dark-redesign">
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <Header />
      <main id="main-content" className={styles.page}>
        <section className={styles.hero} aria-labelledby="platform-title">
          <div className={styles.container}>
            <div className={styles.heroCopy}>
              <HeroHeading id="platform-title">One model of your operation. Every capability built on it.</HeroHeading>
              <p>
                Superspace represents your business as objects, relationships, states, and actions, governed by one set
                of permissions and recorded in one history. Workspaces, intelligence, and agents all work from that
                foundation.
              </p>
              <div className="hero-actions">
                <BookingLink placement="platform_hero" designIcon inverse />
                <a className="button button--secondary" href="#one-model">
                  Explore the architecture
                </a>
              </div>
            </div>
          </div>
        </section>
        <div className={styles.container}>
          <ShowcaseSection
            id="one-model"
            title="Five capabilities. One foundation."
            description="The order from Monday morning exists once. Your team works with it in a workspace. Intelligence reads it to brief you. An agent can analyze it and propose an action. Every path goes through the same rules and leaves the same record."
            footer={
              <p className={styles.footnote}>
                A conceptual view, not a dependency diagram. Workspaces and agents are both clients of the same model
                and actions; neither depends on the other, and governance is enforced where data and actions live.
              </p>
            }
          >
            <PlatformCoreDiagram />
          </ShowcaseSection>

          <ShowcaseSection
            id="model"
            eyebrow="Business Model"
            title="Your operation, represented as it really works."
            description="Orders belong to customers. Drivers are assigned to orders. Production jobs wait for owners. Superspace models the things your business runs on, how they connect, and the states they move through."
            footer={
              <Notes
                example="An Order has a number, a total and a priority. It is placed by a Customer, can have an assigned Driver, and moves from Draft to Delivered, or to Cancelled."
                hood="Object types define typed fields, relationships, and lifecycles with explicit states and transitions. Models are definitions, not custom code: a new operation runs on the same core with a different model. The definition shown is simplified."
              />
            }
          >
            <PlatformModelPreview />
          </ShowcaseSection>

          <ShowcaseSection
            id="workspaces"
            eyebrow="Workspaces"
            title="Interfaces generated from your model, not built screen by screen."
            description="Every object type gets collections to search, filter, and sort, and detail views that show state, related work, available actions, and history. Inbox adds a personal layer: the situations each person needs to know about, linked to where they’re resolved."
            footer={
              <Notes
                example="The Orders collection and the PO-48202 detail are the same generic views that render a Production job in a manufacturing operation."
                hood="Collections and details are composed from the model’s definitions. Display settings decide what appears and where; they never grant access. A command bar finds any object you’re allowed to read and opens its actions."
                status="Inbox is in development."
              />
            }
          >
            <PlatformWorkspacePreview />
          </ShowcaseSection>

          <ShowcaseSection
            id="actions"
            eyebrow="Actions & Workflows"
            title="Work moves only in ways your business allows."
            description="An action is a business operation with rules: who can take it, when it applies, and what changes when it runs. A workflow is the states your work moves through and the actions that move it."
            footer={
              <Notes
                example="Assign driver requires the order.assign_driver permission and a Driver. It creates the assignment and records the event; the order stays Draft. In manufacturing, Start production applies only to a Queued job and moves it to In Progress."
                hood="Actions declare typed inputs, preconditions, and effects such as setting a field, changing a state, or creating a relationship. Each action has its own permission. Permissions and preconditions are checked on the server when the action runs, not only when the button is shown, and every run records grouped events."
              />
            }
          >
            <PlatformActionPreview />
          </ShowcaseSection>

          <ShowcaseSection
            id="intelligence"
            eyebrow="Intelligence & Agents"
            title="AI that reasons over facts and acts through your rules."
            description="Because your operation is modeled, intelligence doesn’t have to guess. Briefings report what happened and what needs attention, with every item linked to its record. Agents can analyze a record and propose a specific action. People decide."
            footer={
              <div className={styles.intelligence}>
                <div>
                  <h3>
                    Operational briefings
                    {briefing.status === "design-preview" && <span>In development</span>}
                  </h3>
                  <p>
                    Figures are calculated from your operational data, not generated by AI. AI writes the narrative
                    around them, links each statement to a real object, and offers only the actions you’re already
                    allowed to take.
                  </p>
                </div>
                <div>
                  <h3>
                    Agent proposals <span>Experimental</span>
                  </h3>
                  <p>
                    An agent analyzes a record within a limited scope and proposes one action with its reasoning and
                    evidence. A person approves it. The action then runs through the same path as any other, under that
                    person’s permissions, after checking that nothing changed in between.
                  </p>
                </div>
                <div className={styles.hood}>
                  <h3>Under the hood</h3>
                  <p>
                    Agents read through scoped tools and can only propose actions within a permission limit that never
                    exceeds that of the person who set them up. They can’t change the model, approve their own
                    proposals, or run in the background. Proposals expire, and inference is limited in input, output,
                    and time.
                  </p>
                </div>
                <p className={styles.status}>
                  Over time, agents will take on more bounded work under the same controls. Agent proposals are not yet
                  generally available.
                </p>
              </div>
            }
          >
            <PlatformIntelligencePreview />
          </ShowcaseSection>

          <ShowcaseSection
            id="governance"
            eyebrow="Governance & Security"
            title="Clear boundaries. A complete record."
            description="Each organization’s data is isolated. Every action has its own permission. Every change is recorded, whether a person made it or approved an agent’s proposal."
            footer={
              <Notes
                example="PO-48202’s history shows who ran Assign driver, with which input and when. An agent-assisted change is attributed to the person who approved it, with the agent’s proposal attached."
                hood="Isolation between organizations is enforced by the database, not by the interface. Permissions are generated for each object type, relationship, and action, and grouped into roles, including custom ones. Activity is append-only: events can’t be edited or deleted, and the effects of one action are grouped together. Your operational data is yours; access, export, and retention are covered in your agreement."
              />
            }
          >
            <PlatformGovernancePreview />
          </ShowcaseSection>

          <section id="operations" className={styles.section} aria-labelledby="operations-title">
            <div className={styles.sectionCopy}>
              <EntranceHeading id="operations-title">The same foundation, different businesses.</EntranceHeading>
              <p>
                Logistics and manufacturing look nothing alike on the floor. In Superspace, both are objects, states,
                actions, and permissions, so every improvement to the platform reaches every operation.
              </p>
            </div>
            <div
              className={styles.tableScroll}
              role="region"
              aria-label="Logistics and manufacturing models"
              tabIndex={0}
            >
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th scope="col">
                      <span className="sr-only">Concept</span>
                    </th>
                    <th scope="col">Logistics</th>
                    <th scope="col">Manufacturing</th>
                  </tr>
                </thead>
                <tbody>
                  {comparison.map(([concept, logistics, manufacturing]) => (
                    <tr key={concept}>
                      <th scope="row">{concept}</th>
                      <td>{logistics}</td>
                      <td>{manufacturing}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className={styles.footnote}>
              Our demonstration environment runs separate organizations on the same product, isolated from each other.
            </p>
          </section>

          <section className={`${styles.section} ${styles.lastSection}`} aria-labelledby="principles-title">
            <div className={styles.sectionCopy}>
              <EntranceHeading id="principles-title">For technical evaluators.</EntranceHeading>
              <p>The principles behind the platform, in brief.</p>
            </div>
            <dl className={styles.principles}>
              {principles.map(([term, text]) => (
                <div key={term}>
                  <dt>{term}</dt>
                  <dd>{text}</dd>
                </div>
              ))}
            </dl>
          </section>
        </div>
      </main>
      <Footer
        cta={{
          title: "See it on one of your operations.",
          text: "We’ll walk through the model, actions, and controls using a process from your business.",
          placement: "platform_closing",
          secondary: { label: "How deployment works", href: "/deployment" },
        }}
      />
    </HeaderThemeScope>
  );
}

import Image from "next/image";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { HeaderThemeScope } from "@/components/header-theme";
import { BookingLink } from "@/components/booking-link";
import { HeroHeading, EntranceHeading } from "@/components/entrance-heading";
import { DeploymentLaunchCard } from "@/components/deployment-launch-card";
import { DeploymentAssembly } from "@/components/deployment-assembly";
import { ShowcaseSection } from "@/components/showcase-section";
import { PlatformStack } from "@/components/platform-stack";
import { PlatformCoreDiagram, PlatformModelPreview } from "@/components/platform-previews";
import { createPageMetadata } from "@/lib/seo";
import styles from "./deployment.module.css";
import product from "../product/product.module.css";

export const metadata = createPageMetadata({
  title: "How it works — From your operation to working software",
  description:
    "We model your operation with your team, configure reusable capabilities around it, and deliver managed software that evolves as your business changes. Then see the foundation that makes it possible.",
  path: "/how-it-works",
});

const journey = [
  [
    "Understand",
    "We learn how the operation runs today: the people, decisions, and handoffs, and where work gets stuck.",
  ],
  ["Model", "We describe your business objects, their stages, relationships, roles, and rules with your team."],
  ["Configure", "We configure reusable capabilities, like Resource Allocation, around that model."],
  ["Deliver", "We validate real scenarios with your team and bring the first workflow into daily use."],
  ["Evolve", "As the operation changes, the model changes with it. New workflows build on the same foundation."],
] as const;

const comparison = [
  {
    label: "Fits your operation",
    values: ["High", "Limited", "High", "High"],
    tones: ["positive", "warning", "positive", "positive"],
  },
  {
    label: "Platform maintenance",
    values: ["Included", "Included", "By agreement", "Your team"],
    tones: ["positive", "positive", "warning", "negative"],
  },
  {
    label: "Ongoing changes",
    values: ["Available", "Product dependent", "New scope", "Your team"],
    tones: ["positive", "warning", "negative", "negative"],
  },
  {
    label: "Technical responsibility",
    values: ["Low", "Low", "Varies", "High"],
    tones: ["positive", "positive", "warning", "negative"],
  },
  {
    label: "You receive",
    values: ["Managed operational software.", "A standard tool.", "A software project.", "A software function."],
  },
];

const operations = [
  ["Objects", "Customer · Order · Driver", "Manufacturing order · Production job · Fulfillment"],
  ["Stages", "Draft → Confirmed → In Transit → Delivered", "Queued → In Progress → Completed"],
  ["Connections", "Order → Assigned driver", "Production job → Manufacturing order"],
  ["Actions", "Assign driver", "Assign production owner · Start production"],
  ["Needs attention", "PO-48202: urgent, no driver", "JOB-209: queued, no owner"],
];

/** Product status as stated in the Vision Deck (November 2026). Update together with the deck. */
const status = [
  {
    title: "Built and demonstrated",
    items: ["Ontology engine", "State machine", "Shared operational runtime", "Controlled operational demos"],
  },
  {
    title: "In development",
    items: [
      "Resource Allocation",
      "Capability packaging and composition",
      "Operational interfaces supplied by capabilities",
    ],
  },
  {
    title: "Pending validation",
    items: [
      "First live customer deployment",
      "Operator adoption",
      "Repeatable deployment economics",
      "AI execution under human oversight",
    ],
  },
] as const;

const principles = [
  ["Declarative object model", "Types, fields, relationships and lifecycles are definitions, not custom code."],
  ["Server-checked actions", "Permissions and preconditions are evaluated when an action runs."],
  ["Database-enforced isolation", "Each organization’s data is separated below the application layer."],
  ["Append-only activity", "Events can’t be edited or deleted; one action’s effects are grouped together."],
  ["Presentation separate from access", "What a screen shows never decides what a user may do."],
  ["Bounded agent proposals", "Limited scope and inference, one proposed action, human approval required."],
];

export default function HowItWorksPage() {
  return (
    <HeaderThemeScope defaultTone="dark" data-theme="dark" className="site-v2 dark-redesign">
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <Header />
      <main id="main-content" className={styles.page}>
        <section className={styles.hero} aria-labelledby="how-title">
          <div className={styles.container}>
            <div className={styles.heroCopy}>
              <HeroHeading id="how-title">From your operation to working software.</HeroHeading>
              <p>
                We model your operation with your team, configure reusable capabilities around it, and deliver managed
                software that evolves as your business changes.
              </p>
              <div className="hero-actions">
                <BookingLink placement="how_hero" designIcon inverse />
                <a className="button button--secondary" href="#journey">
                  See the process
                </a>
              </div>
            </div>
          </div>
        </section>
        <div className={styles.container}>
          <section id="journey" className={styles.section} aria-labelledby="journey-title">
            <div className={styles.sectionCopy}>
              <EntranceHeading id="journey-title">Start with one workflow. Evolve from there.</EntranceHeading>
              <p>
                Every deployment begins with a bounded workflow your team runs today. We deploy it with you, then extend
                it as your needs grow.
              </p>
            </div>
            <DeploymentAssembly />
            <ol className={`${styles.stages} ${styles.journey}`}>
              {journey.map(([title, text], i) => (
                <li key={title}>
                  <small>0{i + 1}</small>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </li>
              ))}
            </ol>
          </section>

          <section className={styles.section} aria-labelledby="managed-title">
            <div className={styles.sectionCopy}>
              <EntranceHeading id="managed-title">Deploy with us. Evolve on a shared platform.</EntranceHeading>
              <p>
                You operate through a hosted platform that Superspace maintains. Improvements to the engine and
                capabilities can benefit every deployment.
              </p>
            </div>
            <div className={styles.launchCards}>
              <DeploymentLaunchCard variant="evolving" title="We manage the platform.">
                Hosting, maintenance, updates, and the technical infrastructure behind your system.
              </DeploymentLaunchCard>
              <DeploymentLaunchCard variant="platform" title="Your system keeps evolving.">
                New workflows and capabilities can be introduced as your operation changes, with additional work scoped
                and agreed separately.
              </DeploymentLaunchCard>
            </div>
          </section>

          <section className={styles.section} aria-labelledby="comparison-title">
            <div className={styles.sectionCopy}>
              <EntranceHeading id="comparison-title">Not off-the-shelf. Not a one-off project.</EntranceHeading>
              <p>
                Superspace isn’t an SDK, a do-it-yourself builder, or a ready-made vertical product. Here’s how it
                compares to the usual ways of getting operational software.
              </p>
            </div>
            <div className={styles.tableScroll} role="region" aria-label="Delivery model comparison" tabIndex={0}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th scope="col">
                      <span className="sr-only">Responsibility</span>
                    </th>
                    {["superspace", "SaaS", "Consulting", "Internal Team"].map((label, index) => (
                      <th key={label} scope="col" className={index === 0 ? styles.wordmark : undefined}>
                        {index === 0 ? (
                          <Image src="/assets/figma/deployment/wordmark.svg" alt="Superspace" width={118} height={16} />
                        ) : (
                          label
                        )}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {comparison.map((row) => (
                    <tr key={row.label}>
                      <th scope="row">{row.label}</th>
                      {row.values.map((value, index) => (
                        <td key={index}>
                          {row.tones ? (
                            <span className={styles.tag} data-tone={row.tones[index]}>
                              {value}
                            </span>
                          ) : (
                            value
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className={product.footnote}>Qualitative comparison of typical delivery models, not measured results.</p>
          </section>

          <section id="foundation" className={styles.section} aria-labelledby="foundation-title">
            <div className={styles.sectionCopy}>
              <EntranceHeading id="foundation-title">The foundation underneath.</EntranceHeading>
              <p>
                Each business defines its own model. A shared engine interprets it, reusable capabilities supply
                operational logic and interface patterns, and people, apps, and AI agents act through the same governed
                actions.
              </p>
            </div>
            <PlatformStack />
          </section>

          <ShowcaseSection
            id="model"
            eyebrow="Business model"
            title="Your business, described as a model."
            description="Objects, fields, stages, relationships, and actions are definitions, not custom code. The ontology engine reads them, and the state machine makes sure work only moves the way your rules allow."
            footer={
              <div className={product.caption}>
                <p>
                  An order keeps its customer, driver, stage, and available actions together throughout its lifecycle.
                </p>
              </div>
            }
          >
            <PlatformModelPreview />
          </ShowcaseSection>

          <ShowcaseSection
            id="governed"
            eyebrow="Interfaces for people and AI"
            title="People and AI, through the same controls."
            description="Workspaces and agents work from the same model and the same actions. People run the actions their roles allow. Agents read within a defined scope and can only propose actions for a person to approve."
            footer={
              <div className={product.caption}>
                <p className={product.status}>
                  Governed collaboration between people and AI is the design direction. Orchestration of external
                  systems is on the roadmap.
                </p>
              </div>
            }
          >
            <PlatformCoreDiagram />
          </ShowcaseSection>

          <section id="operations" className={styles.section} aria-labelledby="operations-title">
            <div className={styles.sectionCopy}>
              <EntranceHeading id="operations-title">Different operations. One runtime.</EntranceHeading>
              <p>
                In our demonstration environment, logistics and manufacturing run as separate organizations on the same
                product, each in its own terms, with no customer-specific production code.
              </p>
            </div>
            <div
              className={product.tableScroll}
              role="region"
              aria-label="Logistics and manufacturing models"
              tabIndex={0}
            >
              <table className={product.table}>
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
                  {operations.map(([concept, logistics, manufacturing]) => (
                    <tr key={concept}>
                      <th scope="row">{concept}</th>
                      <td>{logistics}</td>
                      <td>{manufacturing}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section id="status" className={styles.section} aria-labelledby="status-title">
            <div className={styles.sectionCopy}>
              <EntranceHeading id="status-title">Where the product stands.</EntranceHeading>
              <p>
                We’re clear about what’s built, what’s in development, and what still needs to be proven in live
                operations.
              </p>
            </div>
            <div className={styles.status}>
              {status.map((group) => (
                <div key={group.title}>
                  <h3>{group.title}</h3>
                  <ul>
                    {group.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <p className={product.footnote}>
              Controlled experiments used no customer-specific production code. Deployment effort, repeatability, and
              return on investment still require validation in live operations.
            </p>
          </section>

          <section className={styles.section} aria-labelledby="principles-title">
            <div className={styles.sectionCopy}>
              <EntranceHeading id="principles-title">For technical evaluators.</EntranceHeading>
              <p>The principles behind the platform, in brief.</p>
            </div>
            <dl className={product.principles}>
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
          title: "Which workflow would you start with?",
          text: "Tell us where work gets held up between people, spreadsheets, and systems. In a 20-minute demo, we’ll show how it could run in Superspace.",
          placement: "how_closing",
          secondary: { label: "Explore the product", href: "/product" },
        }}
      />
    </HeaderThemeScope>
  );
}

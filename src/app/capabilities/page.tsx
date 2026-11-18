import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { HeaderThemeScope } from "@/components/header-theme";
import { BookingLink } from "@/components/booking-link";
import { HeroHeading, EntranceHeading } from "@/components/entrance-heading";
import { ShowcaseSection } from "@/components/showcase-section";
import { ResourceAllocation } from "@/components/resource-allocation";
import { PlatformActionPreview } from "@/components/platform-previews";
import { createPageMetadata } from "@/lib/seo";
import styles from "../product/product.module.css";
import page from "./capabilities.module.css";

export const metadata = createPageMetadata({
  title: "Capabilities — Build a capability once. Use it across operations.",
  description:
    "Superspace packages common operational problems as reusable capabilities that adapt to each business's objects and rules. Resource Allocation, the first, matches demand with eligible resources under business-specific constraints.",
  path: "/capabilities",
});

const parts = [
  [
    "Operational logic",
    "The reasoning behind a recurring problem, such as finding who or what can cover a piece of work.",
  ],
  ["Interface patterns", "The screens operators use to review, decide, and act on it."],
  ["Governed actions", "The steps people can take, checked against your roles and rules, and recorded."],
] as const;

const anatomy = [
  {
    term: "Demand",
    text: "The work that needs covering: an order to deliver, a production order to run, a visit to staff.",
    example: "PO-48202 must be delivered today by 5:00 PM.",
  },
  {
    term: "Eligible resources",
    text: "The people, vehicles, machines, or teams that could do the work, as defined in your model.",
    example: "Drivers in the organization.",
  },
  {
    term: "Constraints",
    text: "Your business rules: availability, location, qualifications, capacity, time windows.",
    example: "On shift, covers Zone North, has capacity before 5:00 PM.",
  },
  {
    term: "Decision",
    text: "A proposed match that a person reviews and approves. The result is applied and recorded.",
    example: "Assign María López. Approved by Ana Torres at 08:14.",
  },
] as const;

export default function CapabilitiesPage() {
  return (
    <HeaderThemeScope defaultTone="dark" data-theme="dark" className="site-v2 dark-redesign">
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <Header />
      <main id="main-content" className={styles.page}>
        <section className={styles.hero} aria-labelledby="capabilities-title">
          <div className={styles.container}>
            <div className={styles.heroCopy}>
              <HeroHeading id="capabilities-title">Build a capability once. Use it across operations.</HeroHeading>
              <p>
                Different businesses share the same underlying problems. Superspace solves each one once, as a reusable
                capability, and adapts it to your objects and rules.
              </p>
              <div className="hero-actions">
                <BookingLink placement="capabilities_hero" designIcon inverse />
                <a className="button button--secondary" href="#resource-allocation">
                  See Resource Allocation
                </a>
              </div>
            </div>
          </div>
        </section>
        <div className={styles.container}>
          <section className={styles.section} aria-labelledby="what-title">
            <div className={styles.sectionCopy}>
              <EntranceHeading id="what-title">What a capability is.</EntranceHeading>
              <p>
                A capability is a packaged answer to a common operational problem. Instead of rebuilding it for every
                company, Superspace configures it around each business model.
              </p>
            </div>
            <ul className={page.parts}>
              {parts.map(([title, text]) => (
                <li key={title}>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </li>
              ))}
            </ul>
          </section>

          <section id="resource-allocation" className={styles.section} aria-labelledby="ra-title">
            <div className={styles.sectionCopy}>
              <div className={page.eyebrow}>
                First capability <span>In development</span>
              </div>
              <EntranceHeading id="ra-title">Resource Allocation.</EntranceHeading>
              <p>
                Match demand with eligible resources under business-specific constraints. Every operation that assigns
                people, vehicles, machines, or teams to work faces this problem.
              </p>
            </div>
            <ol className={page.anatomy}>
              {anatomy.map((item, i) => (
                <li key={item.term}>
                  <small>0{i + 1}</small>
                  <h3>{item.term}</h3>
                  <p>{item.text}</p>
                  <p className={page.example}>{item.example}</p>
                </li>
              ))}
            </ol>
          </section>

          <section className={styles.section} aria-labelledby="across-title">
            <div className={styles.sectionCopy}>
              <EntranceHeading id="across-title">Same logic. Different operations.</EntranceHeading>
              <p>
                The structure of the problem stays the same. What changes is your business: the objects involved, the
                resources available, and the rules that apply.
              </p>
            </div>
            <ResourceAllocation />
          </section>

          <ShowcaseSection
            id="decision"
            eyebrow="Decisions stay with people"
            title="The capability proposes. Your team decides."
            description="Allocation decisions arrive as actions your team can review and confirm, with the constraints that apply. Permissions are checked when the action runs, and the result is recorded."
            footer={
              <div className={styles.caption}>
                <p>In our logistics demonstration, an operator assigns an eligible driver to an urgent order.</p>
              </div>
            }
          >
            <PlatformActionPreview />
          </ShowcaseSection>

          <section className={`${styles.section} ${styles.lastSection}`} aria-labelledby="next-title">
            <div className={styles.sectionCopy}>
              <EntranceHeading id="next-title">Starting with one, built to compose.</EntranceHeading>
              <p>
                Resource Allocation is our first capability, and we’re developing it with manufacturing, our initial
                market. Packaging capabilities so they can be combined, and supplying their interfaces automatically,
                are also in development. We’ll add capabilities as real operations call for them.
              </p>
            </div>
          </section>
        </div>
      </main>
      <Footer
        cta={{
          title: "Have an allocation problem worth solving?",
          text: "Tell us how your team assigns work today. In a 20-minute demo, we’ll show how Resource Allocation could fit.",
          subject: "Resource Allocation demo request",
          placement: "capabilities_closing",
          secondary: { label: "How it works", href: "/how-it-works" },
        }}
      />
    </HeaderThemeScope>
  );
}

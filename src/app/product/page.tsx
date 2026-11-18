import type { ReactNode } from "react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { HeaderThemeScope } from "@/components/header-theme";
import { BookingLink } from "@/components/booking-link";
import { HeroHeading, EntranceHeading } from "@/components/entrance-heading";
import { ShowcaseSection } from "@/components/showcase-section";
import { ProductPreview } from "@/components/product-preview";
import { OperativeModels } from "@/components/operative-models";
import {
  AttentionPreview,
  PlatformWorkspacePreview,
  PlatformActionPreview,
  PlatformIntelligencePreview,
  PlatformGovernancePreview,
} from "@/components/platform-previews";
import { briefing } from "@/lib/operational-story";
import { createPageMetadata } from "@/lib/seo";
import styles from "./product.module.css";

export const metadata = createPageMetadata({
  title: "Product — Know what needs attention. Move work forward.",
  description:
    "See what Superspace looks like for the people running operations: an Inbox of exceptions and approvals, workspaces for every record, actions governed by your rules, and a complete record of what happened.",
  path: "/product",
});

function Caption({ children, status }: { children: ReactNode; status?: ReactNode }) {
  return (
    <div className={styles.caption}>
      <p>{children}</p>
      {status && <p className={styles.status}>{status}</p>}
    </div>
  );
}

const jobs = [
  ["See what needs you", "Exceptions, approvals, and tasks come to you."],
  ["Understand the situation", "Every record arrives with its context and history."],
  ["Decide and act", "Take the next step without leaving the work."],
  ["Stay accountable", "Every change is recorded with who made it and when."],
] as const;

export default function ProductPage() {
  return (
    <HeaderThemeScope defaultTone="dark" data-theme="dark" className="site-v2 dark-redesign">
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <Header />
      <main id="main-content" className={styles.page}>
        <section className={styles.hero} aria-labelledby="product-title">
          <div className={styles.container}>
            <div className={styles.heroCopy}>
              <HeroHeading id="product-title">Know what needs attention. Move work forward.</HeroHeading>
              <p>
                Superspace gives the people running your operation one place to see what needs attention, understand it
                in context, and act within your rules.
              </p>
              <div className="hero-actions">
                <BookingLink placement="product_hero" designIcon inverse />
                <a className="button button--secondary" href="#try">
                  Try the product
                </a>
              </div>
            </div>
            <ul className={styles.jobs}>
              {jobs.map(([title, text]) => (
                <li key={title}>
                  <strong>{title}</strong>
                  <span>{text}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
        <div className={styles.container}>
          <ShowcaseSection
            id="try"
            title="Click around. It works."
            description="This is the Superspace Inbox and Orders workspace with fictional data. Open the urgent order from the Inbox, assign a driver, and watch the record update."
            footer={
              <Caption
                status={
                  briefing.status === "design-preview"
                    ? "Controlled product demonstration. Operational briefings are in development."
                    : "Controlled product demonstration with fictional data."
                }
              >
                The same workspace patterns work for any record your operation runs on.
              </Caption>
            }
          >
            <ProductPreview
              screens={["Inbox", "Data"]}
              height={820}
              label="Interactive Superspace product preview with Inbox and Orders"
            />
          </ShowcaseSection>

          <ShowcaseSection
            id="attention"
            eyebrow="Know what matters"
            title="Start the day knowing what needs you."
            description="The Inbox brings exceptions, approvals, and tasks to the people responsible for them. A daily briefing summarizes what changed, and every item links to the record behind it."
            footer={
              <Caption
                status={briefing.status === "design-preview" ? "Operational briefings are in development." : undefined}
              >
                Figures in a briefing are calculated from your operational data. AI writes the summary around them.
              </Caption>
            }
          >
            <AttentionPreview />
          </ShowcaseSection>

          <ShowcaseSection
            id="workspaces"
            eyebrow="Work your way"
            title="The right view for the task."
            description="Scan a table, follow work across stages, or focus on a single record. Every view shows the same information, so nobody has to rebuild the picture in a spreadsheet."
            footer={
              <Caption>
                An order shows its customer, driver, stage, available actions, and history in one place.
              </Caption>
            }
          >
            <PlatformWorkspacePreview />
          </ShowcaseSection>

          <ShowcaseSection
            id="actions"
            eyebrow="Act with confidence"
            title="Take action within your rules."
            description="Actions are available to the right roles, at the right stage. Superspace checks permissions when an action runs and shows what it will change before you confirm."
            footer={
              <Caption>
                An authorized logistics operator assigns a driver directly from the order. The result is recorded
                immediately.
              </Caption>
            }
          >
            <PlatformActionPreview />
          </ShowcaseSection>

          <ShowcaseSection
            id="intelligence"
            eyebrow="Decide with the right context"
            title="Proposals you can check before they happen."
            description="An agent can prepare a specific action with its reasoning and the records behind it. A person reviews it, approves it, and the action runs with their permissions."
            footer={
              <Caption status="Agent proposals are experimental and not yet generally available.">
                People keep final decision authority. Nothing runs without approval.
              </Caption>
            }
          >
            <PlatformIntelligencePreview />
          </ShowcaseSection>

          <ShowcaseSection
            id="governance"
            eyebrow="Stay accountable"
            title="Know who did what, and when."
            description="Roles define who can take each action. Every change is recorded in a history that can’t be edited, including whether an approved proposal was behind it."
          >
            <PlatformGovernancePreview />
          </ShowcaseSection>

          <section className={`${styles.section} ${styles.lastSection}`} aria-labelledby="operations-title">
            <div className={styles.sectionCopy}>
              <EntranceHeading id="operations-title">The same experience, in your terms.</EntranceHeading>
              <p>
                A logistics team works with orders and drivers. A production team works with jobs and owners. Both get
                the same Inbox, workspaces, and controls, configured around their own operation.
              </p>
            </div>
            <OperativeModels />
          </section>
        </div>
      </main>
      <Footer
        cta={{
          title: "See it with your own operation in mind.",
          text: "Bring a workflow your team runs today. In a 20-minute demo, we’ll show how it could work in Superspace.",
          placement: "product_closing",
          secondary: { label: "How it works", href: "/how-it-works" },
        }}
      />
    </HeaderThemeScope>
  );
}

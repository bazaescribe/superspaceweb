import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { HeaderThemeScope } from "@/components/header-theme";
import { BookingLink } from "@/components/booking-link";
import { HeroHeading } from "@/components/entrance-heading";
import { ShowcaseSection } from "@/components/showcase-section";
import {
  PlatformLogicPreview,
  PlatformAgentPreview,
  PlatformIntegrationsPreview,
  PlatformExportPreview,
} from "@/components/platform-previews";
import { createPageMetadata } from "@/lib/seo";
import styles from "./platform.module.css";

export const metadata = createPageMetadata({
  title: "Operational software platform",
  description:
    "The underlying structure for your business data, relationships, permissions, and workflows. Built for the complexity of real-world operations.",
  path: "/platform",
});

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
              <HeroHeading id="platform-title">Built for the complexity of real-world operations.</HeroHeading>
              <p>
                Superspace provides the underlying structure for business data, relationships, permissions, and
                workflows, so companies can run their operations without building the software infrastructure from
                scratch.
              </p>
              <div className="hero-actions">
                <BookingLink placement="platform_hero" label="Let’s talk" designIcon inverse />
                <a className="button button--secondary" href="#business-logic">
                  How it works
                </a>
              </div>
            </div>
          </div>
        </section>
        <div className={styles.container}>
          <ShowcaseSection
            id="business-logic"
            title="From business logic to executable rules."
            description="Every operation has its own structure. Superspace translates business requirements into declarative models that define how information connects, what actions are possible, and the conditions under which they can happen."
            footer={
              <div className={styles.captions}>
                <div>
                  <h3>Graph-based models</h3>
                  <p>
                    Business objects and their relationships form a connected operational model, preserving the context
                    behind every record.
                  </p>
                </div>
                <div>
                  <h3>State machines</h3>
                  <p>
                    Operational processes move through defined states and transitions, governed by business rules and
                    permissions.
                  </p>
                </div>
                <div>
                  <h3>Declarative actions</h3>
                  <p>
                    Actions describe what can happen, under which conditions, and how the system should change when
                    those conditions are met.
                  </p>
                </div>
              </div>
            }
          >
            <PlatformLogicPreview />
          </ShowcaseSection>
          <ShowcaseSection
            id="capabilities"
            title="New capabilities, built on the same model."
            description="As requirements evolve, new actions, workflows, and interfaces can be introduced using the operational model already in place. Superspace can extend its capabilities through structured changes, validated against existing relationships, permissions, and business rules."
            footer={<p className={styles.note}>* Feature preview.</p>}
          >
            <PlatformAgentPreview />
          </ShowcaseSection>
          <ShowcaseSection
            id="integrations"
            title="One operation. Multiple systems."
            description="Data from different systems can participate in the same workflows, while Superspace governs the actions, permissions, and rules that coordinate the operation."
          >
            <PlatformIntegrationsPreview />
          </ShowcaseSection>
          <ShowcaseSection
            id="data-ownership"
            title="Your data stays yours."
            description="Your company retains ownership of its business data. Superspace operates the underlying platform, but your information remains yours. We’re designing data portability around more than individual records, including the relationships and structure that give operational data its meaning."
          >
            <PlatformExportPreview />
          </ShowcaseSection>
        </div>
      </main>
      <Footer />
    </HeaderThemeScope>
  );
}

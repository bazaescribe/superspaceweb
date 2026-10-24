import { setRequestLocale } from "next-intl/server";

import { useCopy } from "@/i18n/copy";
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
import { createPageMetadata } from "@/i18n/metadata";
import styles from "./platform.module.css";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return createPageMetadata({
    title: "Operational software platform",
    description:
      "The underlying structure for your business data, relationships, permissions, and workflows. Built for the complexity of real-world operations.",
    path: "/platform",
  });
}

function PlatformPage() {
  const localizeCopy = useCopy();
  return (
    <HeaderThemeScope defaultTone="dark" data-theme="dark" className="site-v2 dark-redesign">
      <a className="skip-link" href="#main-content">
        {localizeCopy("Skip to content")}
      </a>
      <Header />
      <main id="main-content" className={styles.page}>
        <section className={styles.hero} aria-labelledby="platform-title">
          <div className={styles.container}>
            <div className={styles.heroCopy}>
              <HeroHeading id="platform-title">{localizeCopy("The next generation of business software.")}</HeroHeading>
              <p>
                {localizeCopy(
                  "A living model of your business. Connected to the tools you already use. Built for people and AI agents to work, act, and evolve together.",
                )}
              </p>
              <div className="hero-actions">
                <BookingLink placement="platform_hero" label={localizeCopy("Let’s talk")} designIcon inverse />
                <a className="button button--secondary" href="#business-logic">
                  {localizeCopy("How it works")}
                </a>
              </div>
            </div>
          </div>
        </section>
        <div className={styles.container}>
          <ShowcaseSection
            id="business-logic"
            title={localizeCopy("From business logic to executable rules.")}
            description={localizeCopy(
              "Every operation has its own structure. Superspace translates business requirements into declarative models that define how information connects, what actions are possible, and the conditions under which they can happen.",
            )}
            footer={
              <div className={styles.captions}>
                <div>
                  <h3>{localizeCopy("Graph-based models")}</h3>
                  <p>
                    {localizeCopy(
                      "Business objects and their relationships form a connected operational model, preserving the context behind every record.",
                    )}
                  </p>
                </div>
                <div>
                  <h3>{localizeCopy("State machines")}</h3>
                  <p>
                    {localizeCopy(
                      "Operational processes move through defined states and transitions, governed by business rules and permissions.",
                    )}
                  </p>
                </div>
                <div>
                  <h3>{localizeCopy("Declarative actions")}</h3>
                  <p>
                    {localizeCopy(
                      "Actions describe what can happen, under which conditions, and how the system should change when those conditions are met.",
                    )}
                  </p>
                </div>
              </div>
            }
          >
            <PlatformLogicPreview />
          </ShowcaseSection>
          <ShowcaseSection
            id="capabilities"
            title={localizeCopy("New capabilities, built on the same model.")}
            description={localizeCopy(
              "As requirements evolve, new actions, workflows, and interfaces can be introduced using the operational model already in place. Superspace can extend its capabilities through structured changes, validated against existing relationships, permissions, and business rules.",
            )}
            footer={<p className={styles.note}>{localizeCopy("* Feature preview.")}</p>}
          >
            <PlatformAgentPreview />
          </ShowcaseSection>
          <ShowcaseSection
            id="integrations"
            title={localizeCopy("One operation. Multiple systems.")}
            description={localizeCopy(
              "Data from different systems can participate in the same workflows, while Superspace governs the actions, permissions, and rules that coordinate the operation.",
            )}
          >
            <PlatformIntegrationsPreview />
          </ShowcaseSection>
          <ShowcaseSection
            id="data-ownership"
            title={localizeCopy("Your data stays yours.")}
            description={localizeCopy(
              "Your company retains ownership of its business data. Superspace operates the underlying platform, but your information remains yours. We’re designing data portability around more than individual records, including the relationships and structure that give operational data its meaning.",
            )}
          >
            <PlatformExportPreview />
          </ShowcaseSection>
        </div>
      </main>
      <Footer />
    </HeaderThemeScope>
  );
}

export default async function LocalizedPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <PlatformPage />;
}

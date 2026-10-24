import { setRequestLocale } from "next-intl/server";

import { useCopy } from "@/i18n/copy";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { HeaderThemeScope } from "@/components/header-theme";
import { HeroHeading } from "@/components/entrance-heading";
import { BookingLink } from "@/components/booking-link";
import { ShowcaseSection } from "@/components/showcase-section";
import { OfferingsCatalog } from "@/components/offerings-catalog";
import { createPageMetadata } from "@/i18n/metadata";
import styles from "../platform/platform.module.css";
import offeringStyles from "./offering.module.css";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return createPageMetadata({
    title: "Offerings — Built around your operation",
    description:
      "Explore how Superspace could support logistics, retail, field services, manufacturing, facilities, and customer operations. Every deployment starts with understanding your business.",
    path: "/offering",
  });
}

function OfferingPage() {
  const localizeCopy = useCopy();
  return (
    <HeaderThemeScope defaultTone="dark" data-theme="dark" className="site-v2 dark-redesign">
      <a className="skip-link" href="#main-content">
        {localizeCopy("Skip to content")}
      </a>
      <Header />
      <main id="main-content" className={styles.page}>
        <section className={styles.hero} aria-labelledby="offering-title">
          <div className={styles.container}>
            <div className={styles.heroCopy}>
              <HeroHeading id="offering-title">
                {localizeCopy("One platform.")}
                <br />
                {localizeCopy("Built around your operation.")}
              </HeroHeading>
              <p>
                {localizeCopy(
                  "Superspace connects the people, information, and workflows that keep your business running. Explore how the same operational foundation could support the way your team works.",
                )}
              </p>
              <div className="hero-actions">
                <BookingLink placement="offering_hero" label={localizeCopy("Let’s talk")} designIcon inverse />
                <a className="button button--secondary" href="#operations">
                  {localizeCopy("Explore offerings")}
                </a>
              </div>
            </div>
          </div>
        </section>
        <div className={styles.container}>
          <ShowcaseSection
            id="operations"
            title={localizeCopy("Different operations. One adaptable foundation.")}
            description={localizeCopy(
              "Explore how Superspace can be configured around your business. Each deployment starts by understanding your team, processes, and rules. These examples illustrate potential applications; discovery confirms the fit and scope.",
            )}
            footer={
              <div className={offeringStyles.invitation}>
                <div>
                  <h3>{localizeCopy("Don’t see your operation here?")}</h3>
                  <p>{localizeCopy("Let’s explore whether Superspace is a fit.")}</p>
                </div>
                <BookingLink placement="offering_catalog" label={localizeCopy("Let’s talk")} designIcon inverse />
              </div>
            }
          >
            <OfferingsCatalog />
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
  return <OfferingPage />;
}

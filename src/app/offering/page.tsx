import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { HeaderThemeScope } from "@/components/header-theme";
import { HeroHeading } from "@/components/entrance-heading";
import { BookingLink } from "@/components/booking-link";
import { ShowcaseSection } from "@/components/showcase-section";
import { OfferingsCatalog } from "@/components/offerings-catalog";
import { createPageMetadata } from "@/lib/seo";
import styles from "../platform/platform.module.css";
import offeringStyles from "./offering.module.css";

export const metadata = createPageMetadata({
  title: "Offerings — Built around your operation",
  description:
    "Explore how Superspace could support logistics, retail, field services, manufacturing, facilities, and customer operations. Every deployment starts with understanding your business.",
  path: "/offering",
});

export default function OfferingPage() {
  return (
    <HeaderThemeScope defaultTone="dark" data-theme="dark" className="site-v2 dark-redesign">
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <Header />
      <main id="main-content" className={styles.page}>
        <section className={styles.hero} aria-labelledby="offering-title">
          <div className={styles.container}>
            <div className={styles.heroCopy}>
              <HeroHeading id="offering-title">
                One platform.
                <br />
                Built around your operation.
              </HeroHeading>
              <p>
                Superspace connects the people, information, and workflows that keep your business running. Explore how
                the same operational foundation could support the way your team works.
              </p>
              <div className="hero-actions">
                <BookingLink placement="offering_hero" label="Let’s talk" designIcon inverse />
                <a className="button button--secondary" href="#operations">
                  Explore offerings
                </a>
              </div>
            </div>
          </div>
        </section>
        <div className={styles.container}>
          <ShowcaseSection
            id="operations"
            title="Different operations. One adaptable foundation."
            description="Explore how Superspace can be configured around your business. Each deployment starts by understanding your team, processes, and rules. These examples illustrate potential applications; discovery confirms the fit and scope."
            footer={
              <div className={offeringStyles.invitation}>
                <div>
                  <h3>Don’t see your operation here?</h3>
                  <p>Let’s explore whether Superspace is a fit.</p>
                </div>
                <BookingLink placement="offering_catalog" label="Let’s talk" designIcon inverse />
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

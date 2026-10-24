import { setRequestLocale } from "next-intl/server";

import { useCopy } from "@/i18n/copy";
import Image from "next/image";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { HeaderThemeScope } from "@/components/header-theme";
import { BookingLink } from "@/components/booking-link";
import { HeroHeading, EntranceHeading } from "@/components/entrance-heading";
import { DeploymentLaunchCard } from "@/components/deployment-launch-card";
import { DeploymentAssembly } from "@/components/deployment-assembly";
import { DeploymentTradeoffChart } from "@/components/deployment-tradeoff-chart";
import { createPageMetadata } from "@/i18n/metadata";
import styles from "./deployment.module.css";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return createPageMetadata({
    title: "Deployment — Forward Deployed Intelligence",
    description:
      "Our team works with yours to understand your business, configure Superspace and bring your system into everyday use. From zero to ops in weeks.",
    path: "/deployment",
  });
}

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
    values: ["Operational capabilities.", "A standard tool.", "A software project.", "A software function."],
  },
];

function DeploymentPage() {
  const localizeCopy = useCopy();
  return (
    <HeaderThemeScope defaultTone="dark" data-theme="dark" className="site-v2 dark-redesign">
      <a className="skip-link" href="#main-content">
        {localizeCopy("Skip to content")}
      </a>
      <Header />
      <main id="main-content" className={styles.page}>
        <section className={styles.hero} aria-labelledby="deployment-title">
          <div className={styles.container}>
            <div className={styles.heroCopy}>
              <HeroHeading id="deployment-title">
                {localizeCopy("Forward Deployed")}
                <br />
                {localizeCopy("Intelligence.")}
              </HeroHeading>
              <p>
                {localizeCopy(
                  "Our team works with yours to understand your business, configure Superspace and bring your system into everyday use. From zero to ops in weeks.",
                )}
              </p>
              <div className="hero-actions">
                <BookingLink placement="deployment_hero" label={localizeCopy("Let’s talk")} designIcon inverse />
                <a className="button button--secondary" href="#how-it-works">
                  {localizeCopy("How it works?")}
                </a>
              </div>
            </div>
          </div>
        </section>
        <div className={styles.container}>
          <section id="how-it-works" className={styles.section} aria-labelledby="deployment-process">
            <div className={styles.sectionCopy}>
              <EntranceHeading id="deployment-process">
                {localizeCopy("A platform with actual knowledge")}
                <br className={styles.desktopBreak} /> {localizeCopy(" behind it.")}
              </EntranceHeading>
              <p>
                {localizeCopy(
                  "Every business works differently. Our team learns how yours operates, then configures SuperSpace around your people, processes, and rules.",
                )}
              </p>
            </div>
            <DeploymentAssembly />
            <div className={styles.stages}>
              <div>
                <h3>{localizeCopy("Understand")}</h3>
                <p>
                  {localizeCopy(
                    "We work with your team to understand the people, information, processes, and decisions behind your business.",
                  )}
                </p>
              </div>
              <div>
                <h3>{localizeCopy("Model")}</h3>
                <p>
                  <strong>{localizeCopy("We teach Superspace")}</strong>{" "}
                  {localizeCopy(
                    " how your business works, translating your business’ reality into a working operational system.",
                  )}
                </p>
              </div>
              <div>
                <h3>{localizeCopy("Deploy")}</h3>
                <p>
                  {localizeCopy(
                    "We validate real scenarios with your team and help bring your new system into everyday operation.",
                  )}
                </p>
              </div>
            </div>
          </section>
          <section className={styles.section} aria-labelledby="beyond-launch">
            <div className={styles.sectionCopy}>
              <EntranceHeading id="beyond-launch">{localizeCopy("Launch is just the beginning.")}</EntranceHeading>
              <p>
                {localizeCopy(
                  "Superspace remains your managed operational platform, with ongoing maintenance, updates, and the flexibility to introduce new capabilities as your needs evolve.",
                )}
              </p>
            </div>
            <div className={styles.launchCards}>
              <DeploymentLaunchCard variant="evolving" title={localizeCopy("We manage the platform.")}>
                {localizeCopy("Hosting, maintenance, updates, and the technical infrastructure behind your system.")}
              </DeploymentLaunchCard>
              <DeploymentLaunchCard variant="platform" title={localizeCopy("Your system keeps evolving.")}>
                {localizeCopy(
                  "New workflows and capabilities can be introduced as your operation changes, with additional work scoped and agreed separately.",
                )}
              </DeploymentLaunchCard>
            </div>
          </section>
          <section className={styles.section} aria-labelledby="comparison-title">
            <div className={styles.sectionCopy}>
              <EntranceHeading id="comparison-title">
                {localizeCopy("Different ways to get things done.")}
              </EntranceHeading>
              <p>
                {localizeCopy(
                  "Every approach comes with different responsibilities. Here’s how Superspace compares to buying standard software, commissioning a custom project, or building internally.",
                )}
              </p>
            </div>
            <div
              className={styles.tableScroll}
              role="region"
              aria-label={localizeCopy("Delivery model comparison")}
              tabIndex={0}
            >
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th scope="col">
                      <span className="sr-only">{localizeCopy("Responsibility")}</span>
                    </th>
                    {["superspace", "SaaS", "Consulting", "Internal Team"].map((label, index) => (
                      <th key={label} scope="col" className={index === 0 ? styles.wordmark : undefined}>
                        {localizeCopy(
                          index === 0 ? (
                            <Image
                              src="/assets/figma/deployment/wordmark.svg"
                              alt={localizeCopy("Superspace")}
                              width={118}
                              height={16}
                            />
                          ) : (
                            label
                          ),
                        )}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {comparison.map((row) => (
                    <tr key={row.label}>
                      <th scope="row">{localizeCopy(row.label)}</th>
                      {row.values.map((value, index) => (
                        <td key={index}>
                          {localizeCopy(
                            row.tones ? (
                              <span className={styles.tag} data-tone={row.tones[index]}>
                                {localizeCopy(value)}
                              </span>
                            ) : (
                              value
                            ),
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
          <section className={styles.section} aria-labelledby="tradeoffs-title">
            <div className={styles.sectionCopy}>
              <EntranceHeading id="tradeoffs-title">
                {localizeCopy("Custom experience, platform")}
                <br className={styles.desktopBreak} /> {localizeCopy(" economics.")}
              </EntranceHeading>
              <p>
                {localizeCopy(
                  "Explore how the different delivery models differ in flexibility, time, effort, and ongoing responsibility.",
                )}
              </p>
            </div>
            <DeploymentTradeoffChart />
          </section>
        </div>
      </main>
      <Footer />
    </HeaderThemeScope>
  );
}

export default async function LocalizedPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <DeploymentPage />;
}

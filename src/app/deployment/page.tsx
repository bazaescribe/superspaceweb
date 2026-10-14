import Image from "next/image";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { HeaderThemeScope } from "@/components/header-theme";
import { BookingLink } from "@/components/booking-link";
import { HeroHeading, EntranceHeading } from "@/components/entrance-heading";
import { DeploymentLaunchCard } from "@/components/deployment-launch-card";
import { DeploymentTradeoffChart } from "@/components/deployment-tradeoff-chart";
import { createPageMetadata } from "@/lib/seo";
import styles from "./deployment.module.css";

export const metadata = createPageMetadata({
  title: "Deployment — Forward Deployed Intelligence",
  description:
    "Our team works with yours to understand your business, configure Superspace and bring your system into everyday use. From zero to ops in weeks.",
  path: "/deployment",
});

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

export default function DeploymentPage() {
  return (
    <HeaderThemeScope defaultTone="dark" data-theme="dark" className="site-v2 dark-redesign">
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <Header />
      <main id="main-content" className={styles.page}>
        <section className={styles.hero} aria-labelledby="deployment-title">
          <div className={styles.container}>
            <div className={styles.heroCopy}>
              <HeroHeading id="deployment-title">
                Forward Deployed
                <br />
                Intelligence.
              </HeroHeading>
              <p>
                Our team works with yours to understand your business, configure Superspace and bring your system into
                everyday use. From zero to ops in weeks.
              </p>
              <div className="hero-actions">
                <BookingLink placement="deployment_hero" label="Let’s talk" designIcon inverse />
                <a className="button button--secondary" href="#how-it-works">
                  How it works?
                </a>
              </div>
            </div>
          </div>
        </section>
        <div className={styles.container}>
          <section id="how-it-works" className={styles.section} aria-labelledby="deployment-process">
            <div className={styles.sectionCopy}>
              <EntranceHeading id="deployment-process">
                A platform with actual knowledge
                <br className={styles.desktopBreak} /> behind it.
              </EntranceHeading>
              <p>
                Every business works differently. Our team learns how yours operates, then configures SuperSpace around
                your people, processes, and rules.
              </p>
            </div>
            <div className={styles.mockup}>
              <Image
                src="/assets/figma/dark-site/382ff.png"
                alt="Superspace workspace showing company information, related requests, and operational activity."
                width={4096}
                height={2660}
                sizes="(max-width: 1352px) 95vw, 1280px"
              />
            </div>
            <div className={styles.stages}>
              <div>
                <h3>Understand</h3>
                <p>
                  We work with your team to understand the people, information, processes, and decisions behind your
                  business.
                </p>
              </div>
              <div>
                <h3>Model</h3>
                <p>
                  <strong>We teach Superspace</strong> how your business works, translating your business’ reality into
                  a working operational system.
                </p>
              </div>
              <div>
                <h3>Deploy</h3>
                <p>We validate real scenarios with your team and help bring your new system into everyday operation.</p>
              </div>
            </div>
          </section>
          <section className={styles.section} aria-labelledby="beyond-launch">
            <div className={styles.sectionCopy}>
              <EntranceHeading id="beyond-launch">Launch is just the beginning.</EntranceHeading>
              <p>
                Superspace remains your managed operational platform, with ongoing maintenance, updates, and the
                flexibility to introduce new capabilities as your needs evolve.
              </p>
            </div>
            <div className={styles.launchCards}>
              <DeploymentLaunchCard title="We manage the platform.">
                Hosting, maintenance, updates, and the technical infrastructure behind your system.
              </DeploymentLaunchCard>
              <DeploymentLaunchCard title="Your system keeps evolving.">
                New workflows and capabilities can be introduced as your operation changes, with additional work scoped
                and agreed separately.
              </DeploymentLaunchCard>
            </div>
          </section>
          <section className={styles.section} aria-labelledby="comparison-title">
            <div className={styles.sectionCopy}>
              <EntranceHeading id="comparison-title">Different ways to get things done.</EntranceHeading>
              <p>
                Every approach comes with different responsibilities. Here’s how Superspace compares to buying standard
                software, commissioning a custom project, or building internally.
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
          </section>
          <section className={styles.section} aria-labelledby="tradeoffs-title">
            <div className={styles.sectionCopy}>
              <EntranceHeading id="tradeoffs-title">
                Custom experience, platform
                <br className={styles.desktopBreak} /> economics.
              </EntranceHeading>
              <p>
                Explore how the different delivery models differ in flexibility, time, effort, and ongoing
                responsibility.
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

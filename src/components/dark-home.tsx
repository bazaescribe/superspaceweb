import { useCopy } from "@/i18n/copy";
import { HeroHeading, EntranceHeading } from "@/components/entrance-heading";
import { HomeCapabilities, HomeWorkforcePreview } from "./home-capabilities";
import { OperativeModels } from "./operative-models";
import { BookingLink } from "./booking-link";
import { PillarCard } from "./pillar-card";
import { ProductPreview } from "./product-preview";
import styles from "./dark-home.module.css";

const pillars = [
  {
    title: "Built around your business.",
    text: "Your people, processes, and business rules, modeled into one operational system that works the way your company does.",
  },
  {
    title: "Designed to evolve.",
    text: "Add new workflows, connect new systems, and expand what your business can do without starting from scratch.",
  },
  {
    title: "Built to run. Managed for you.",
    text: "A fully managed operational system, designed for reliable daily work. We take care of the software so you can focus on running your business.",
  },
];
export function DarkHome() {
  const localizeCopy = useCopy();
  return (
    <div className={styles.home}>
      <section className={styles.hero} aria-labelledby="home-title">
        <div className={styles.heroCopy}>
          <HeroHeading id="home-title">
            {localizeCopy("The operative system that understands your business.")}
          </HeroHeading>
          <p>
            {localizeCopy(
              "Superspace turns the way your company works into operational software built around your people, processes, and rules, evolving as your business grows.",
            )}
          </p>
          <div className="hero-actions">
            <BookingLink placement="home_hero" label={localizeCopy("Let’s talk")} designIcon inverse />
            <a className="button button--secondary" href="#system">
              {localizeCopy("How it works?")}
            </a>
          </div>
        </div>
        <div className={styles.heroVisual}>
          <div className={styles.heroInteractive}>
            <ProductPreview />
          </div>
          <div className={styles.heroStatic}>
            <picture>
              <source media="(min-width: 721px)" srcSet="data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=" />
              {/* The mobile hero is a fixed-proportion product image, cropped by its stage. */}
              <img
                src="/assets/figma/home-previews/hero-mobile.webp"
                width={739}
                height={480}
                alt={localizeCopy("Superspace operations dashboard showing service metrics and hourly status charts.")}
                fetchPriority="high"
              />
            </picture>
          </div>
        </div>
      </section>
      <section id="system" className={styles.pillarsSection} aria-labelledby="pillars-title">
        <EntranceHeading id="pillars-title">
          {localizeCopy("A different kind of business software. ")}
          <span>{localizeCopy("Tailored for your company, designed to evolve as you grow.")}</span>
        </EntranceHeading>
        <div className={styles.pillars}>
          {pillars.map((pillar, index) => (
            <PillarCard key={pillar.title} {...pillar} index={index} />
          ))}
        </div>
      </section>
      <div className={styles.features}>
        <section className={styles.feature}>
          <div className={styles.featureCopy}>
            <EntranceHeading>{localizeCopy("Different businesses. Different rules.")}</EntranceHeading>
            <p>
              {localizeCopy(
                "Superspace can be configured around very different kinds of operations, from marketplaces and service teams to manufacturing and distribution. Explore a few examples of what that can look like.",
              )}
            </p>
          </div>
          <OperativeModels />
        </section>
        <section className={styles.feature} aria-labelledby="workforce-title">
          <div className={styles.featureCopy}>
            <EntranceHeading id="workforce-title">{localizeCopy("Meet your AI workforce.")}</EntranceHeading>
            <p>
              {localizeCopy(
                "Give AI agents the context, tools, and permissions to take action across your operations. From everyday tasks to complex decisions, Superspace brings people and AI together in one operating system.",
              )}
            </p>
          </div>
          <HomeWorkforcePreview />
        </section>
        <section className={styles.feature} aria-labelledby="capabilities-title">
          <div className={styles.featureCopy}>
            <EntranceHeading id="capabilities-title">
              {localizeCopy("Everything your business needs to run.")}
            </EntranceHeading>
            <p>{localizeCopy("Powerful capabilities, built into every operational model.")}</p>
          </div>
          <HomeCapabilities />
        </section>
      </div>
    </div>
  );
}

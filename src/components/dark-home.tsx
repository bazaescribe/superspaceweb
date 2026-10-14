import Image from "next/image";
import { BookingLink } from "./booking-link";
import { ProductPreview } from "./product-preview";
import styles from "./dark-home.module.css";

const pillars = [
  {
    title: "Built around your business.",
    text: "Your people, processes, and business rules, modeled into one operational system that works the way your company does.",
    image: "pillar-1.png",
    height: 305,
  },
  {
    title: "Designed to evolve.",
    text: "Add new workflows, connect new systems, and expand what your business can do without starting from scratch.",
    image: "pillar-2.png",
    height: 293,
  },
  {
    title: "Built to run. Managed for you.",
    text: "A fully managed operational system, designed for reliable daily work. We take care of the software so you can focus on running your business.",
    image: "pillar-3.png",
    height: 293,
  },
];
const features = [
  {
    title: "Your business, your rules.",
    text: "Model the people, objects, relationships, and processes behind your operation. Make the system reflect how your company actually works.",
  },
  {
    title: "Everyone knows what they can do.",
    text: "Define who can access information, approve decisions, and perform actions. Keep a clear record of what happens across your operation.",
  },
  {
    title: "Your tools, working together.",
    text: "Connect the systems your business already relies on, bringing information and actions into one coordinated operation.",
  },
  {
    title: "Put your operation in motion.",
    text: "Turn business rules into repeatable workflows, with intelligent assistance where decisions need more context.",
  },
];

export function DarkHome() {
  return (
    <div className={styles.home}>
      <section className={styles.hero} aria-labelledby="home-title">
        <div className={styles.heroCopy}>
          <h1 id="home-title">Operational software, built around your business.</h1>
          <p>
            One managed system for your people, processes, and business rules. Configured to fit how you work, and ready
            to grow with you.
          </p>
          <div className="hero-actions">
            <BookingLink placement="home_hero" label="Let’s talk" designIcon inverse />
            <a className="button button--secondary" href="#system">
              How it works?
            </a>
          </div>
        </div>
        <ProductPreview />
      </section>
      <section id="system" className={styles.pillarsSection} aria-labelledby="pillars-title">
        <h2 id="pillars-title">
          A different kind of business software. <span>Tailored for your company, designed to evolve as you grow.</span>
        </h2>
        <div className={styles.pillars}>
          {pillars.map((pillar) => (
            <article key={pillar.title} className={styles.pillar}>
              <div className={styles.pillarVisual}>
                <Image src={`/assets/figma/dark-site/${pillar.image}`} alt="" width={321} height={pillar.height} />
              </div>
              <div className={styles.pillarCopy}>
                <h3>{pillar.title}</h3>
                <p>{pillar.text}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
      <div className={styles.features}>
        {features.map((feature) => (
          <section className={styles.feature} key={feature.title}>
            <div className={styles.featureCopy}>
              <h2>{feature.title}</h2>
              <p>{feature.text}</p>
            </div>
            <div className={styles.featureVisual}>
              <Image
                src="/assets/figma/dark-site/382ff.png"
                alt="Superspace customer workspace showing connected requests, company details, and activity."
                width={4096}
                height={2660}
                sizes="(max-width: 720px) 900px, (max-width: 1352px) 95vw, 1280px"
              />
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}

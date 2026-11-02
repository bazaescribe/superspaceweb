import Link from "next/link";
import { HeroHeading, EntranceHeading } from "@/components/entrance-heading";
import { BookingLink } from "./booking-link";
import { MondayWalkthrough, OperationAnatomy } from "./home-story";
import { OperativeModels } from "./operative-models";
import { ProductPreview, type Screen } from "./product-preview";
import { briefing } from "@/lib/operational-story";
import styles from "./dark-home.module.css";

// The hero shows only verified surfaces; Inbox joins it once Operational Intelligence v0 is validated.
const heroScreens: Screen[] = briefing.status === "verified" ? ["Inbox", "Data"] : ["Data"];

const stages = [
  ["Understand", "Your people, records, decisions, and rules."],
  ["Model", "Objects, states, actions, and permissions, configured in Superspace."],
  ["Deploy", "Tested against real scenarios, then used every day."],
  ["Expand", "New teams and processes on the same foundation."],
] as const;

export function DarkHome() {
  return (
    <div className={styles.home}>
      <section className={styles.hero} aria-labelledby="home-title">
        <div className={styles.heroCopy}>
          <HeroHeading id="home-title">The operating system that understands your business.</HeroHeading>
          <p>
            Bring your operations together. Know what needs attention, keep work moving, and give your people the tools
            to act. Superspace is configured around the way your business works, and managed for you.
          </p>
          <div className="hero-actions">
            <BookingLink placement="home_hero" designIcon inverse />
            <a className="button button--secondary" href="#monday">
              See how it works
            </a>
          </div>
        </div>
        <div className={styles.heroVisual}>
          <ProductPreview screens={heroScreens} label="Superspace Orders workspace preview" />
        </div>
      </section>

      <section id="monday" className={styles.section} aria-labelledby="monday-title">
        <div className={styles.sectionCopy}>
          <p className={styles.eyebrow}>Monday, 8:00 AM</p>
          <EntranceHeading id="monday-title">Know what needs you. Act where the work lives.</EntranceHeading>
          <p>
            Superspace briefs you on what happened, what’s still open, and which exceptions matter. Every item points to
            a real record, so you go straight from noticing a problem to resolving it, within the rules your business
            already follows.
          </p>
        </div>
        <MondayWalkthrough />
      </section>

      <section className={styles.section} aria-labelledby="operation-title">
        <div className={styles.sectionCopy}>
          <EntranceHeading id="operation-title">
            Superspace models the work itself. <span>Not just records about it.</span>
          </EntranceHeading>
          <p>
            Spreadsheets, project tools, and ERPs can all be shaped to fit an operation. What differs is what the
            software understands. In Superspace, an order isn’t a row or a task. It’s an object that knows its customer
            and driver, the state it’s in, what can happen next, and who is allowed to do it.
          </p>
        </div>
        <OperationAnatomy />
        <div className={styles.payoff}>
          <p>
            That understanding is what makes intelligence useful. Briefings point to real records. Agents can only
            propose actions your rules allow. AI works from the same facts and the same permissions as your team.
          </p>
          <Link className={styles.link} href="/platform">
            How the platform works →
          </Link>
        </div>
      </section>

      <section className={styles.section} aria-labelledby="operations-title">
        <div className={styles.sectionCopy}>
          <EntranceHeading id="operations-title">One platform. Different operations.</EntranceHeading>
          <p>
            An order waiting for a driver and a production job waiting for an owner are different problems with the same
            shape. Superspace runs both on the same foundation, each modeled in its own terms.
          </p>
        </div>
        <OperativeModels />
      </section>

      <section className={`${styles.section} ${styles.last}`} aria-labelledby="start-title">
        <div className={styles.sectionCopy}>
          <EntranceHeading id="start-title">Start with one operation. Grow from there.</EntranceHeading>
          <p>
            We begin where coordination costs you most. Our team learns how that operation works, models it in
            Superspace, and brings it into daily use with your people. When you’re ready for the next area, it builds on
            the model you already have.
          </p>
        </div>
        <ol className={styles.stages}>
          {stages.map(([title, text], i) => (
            <li key={title}>
              <small>0{i + 1}</small>
              <h3>{title}</h3>
              <p>{text}</p>
            </li>
          ))}
        </ol>
        <div className={styles.managed}>
          <p>You get a running system, not a codebase or a project. We host, maintain, and update the platform.</p>
          <Link className={styles.link} href="/deployment">
            How deployment works →
          </Link>
        </div>
      </section>
    </div>
  );
}

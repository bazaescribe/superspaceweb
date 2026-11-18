import { Link } from "@/i18n/navigation";
import { useCopy } from "@/i18n/copy";
import { EntranceHeading } from "@/components/entrance-heading";
import { HomeHero } from "./home-hero";
import { MondayWalkthrough, OperationAnatomy } from "./home-story";
import { ExperienceShowcase } from "./experience-showcase";
import { ResourceAllocation } from "./resource-allocation";
import { PlatformStack } from "./platform-stack";
import styles from "./dark-home.module.css";

const gaps = [
  ["Spreadsheets", "Track what the system can’t, until nobody is sure which version is right."],
  ["Disconnected tools", "Each team sees part of the picture. Nobody sees all of it."],
  ["Manual coordination", "Messages and meetings carry the work between people and systems."],
  ["Custom development", "Every change becomes a project, and the backlog grows faster than the business."],
] as const;

const delivery = [
  [
    "Model your operations.",
    "We work with your team to understand the process, the business objects involved, and the rules and requirements behind them.",
  ],
  [
    "Configure and deploy.",
    "We configure reusable capabilities and deliver your first workflows on a platform we host and maintain.",
  ],
  [
    "Evolve on a shared foundation.",
    "Extend to more workflows as your needs grow. Improvements to the engine and capabilities can benefit every deployment.",
  ],
] as const;

export function DarkHome() {
  const localizeCopy = useCopy();
  return (
    <div className={styles.home}>
      <HomeHero />

      <section className={styles.section} aria-labelledby="problem-title">
        <div className={styles.sectionCopy}>
          <p className={styles.eyebrow}>{localizeCopy("The problem")}</p>
          <EntranceHeading id="problem-title">
            {localizeCopy("Operations change. Software struggles to keep up.")}
          </EntranceHeading>
          <p>
            {localizeCopy(
              "New processes, new rules, new teams. When your software can’t follow, people fill the gaps, and the work that matters most ends up living outside the system.",
            )}
          </p>
        </div>
        <ul className={styles.gaps}>
          {gaps.map(([title, text]) => (
            <li key={title}>
              <h3>{localizeCopy(title)}</h3>
              <p>{localizeCopy(text)}</p>
            </li>
          ))}
        </ul>
      </section>

      <section id="experience" className={styles.section} aria-labelledby="experience-title">
        <div className={styles.sectionCopy}>
          <p className={styles.eyebrow}>{localizeCopy("The experience")}</p>
          <EntranceHeading id="experience-title">
            {localizeCopy("Know what needs attention. Move work forward.")}
          </EntranceHeading>
          <p>
            {localizeCopy(
              "Superspace gives every operator a clear view of their work, the context to make decisions, and the controls to act on them.",
            )}
          </p>
        </div>
        <ExperienceShowcase />
        <div className={styles.payoff}>
          <p>{localizeCopy("Every screen, action, and approval works from the same operational information.")}</p>
          <Link className={styles.link} href="/product">
            {localizeCopy("Explore the product →")}
          </Link>
        </div>
      </section>

      <section id="story" className={styles.section} aria-labelledby="story-title">
        <div className={styles.sectionCopy}>
          <p className={styles.eyebrow}>{localizeCopy("See it in action")}</p>
          <EntranceHeading id="story-title">{localizeCopy("An order needs a driver.")}</EntranceHeading>
          <p>
            {localizeCopy(
              "Follow one exception from the moment it appears to the moment work moves forward. Step through it, or click around the product yourself.",
            )}
          </p>
        </div>
        <MondayWalkthrough />
      </section>

      <section id="fit" className={styles.section} aria-labelledby="fit-title">
        <div className={styles.sectionCopy}>
          <p className={styles.eyebrow}>{localizeCopy("Built around your business")}</p>
          <EntranceHeading id="fit-title">
            {localizeCopy("Software that fits your operations.")}{" "}
            <span>{localizeCopy("Not the other way around.")}</span>
          </EntranceHeading>
          <p>
            {localizeCopy(
              "Superspace starts from how your business actually works: the things you manage, the stages they move through, the rules that apply, and the record of what happened. Screens and actions follow from those definitions.",
            )}
          </p>
        </div>
        <OperationAnatomy />
        <div className={styles.payoff}>
          <p>
            {localizeCopy(
              "When your operation changes, those definitions change with it. You don’t replace the system or rebuild it from scratch.",
            )}
          </p>
        </div>
      </section>

      <section id="capabilities" className={styles.section} aria-labelledby="capabilities-title">
        <div className={styles.sectionCopy}>
          <p className={styles.eyebrow}>{localizeCopy("Reusable capabilities")}</p>
          <EntranceHeading id="capabilities-title">
            {localizeCopy("Build once. Adapt across operations.")}
          </EntranceHeading>
          <p>
            {localizeCopy(
              "Superspace packages common operational problems as reusable capabilities. Resource Allocation, our first, matches demand with eligible resources under business-specific constraints. The logic stays the same. The business it serves changes.",
            )}
          </p>
        </div>
        <ResourceAllocation />
        <div className={styles.payoff}>
          <p>
            {localizeCopy(
              "Each capability adapts to your objects and rules instead of asking you to adopt someone else’s.",
            )}
          </p>
          <Link className={styles.link} href="/capabilities">
            {localizeCopy("About capabilities →")}
          </Link>
        </div>
      </section>

      <section id="delivery" className={styles.section} aria-labelledby="delivery-title">
        <div className={styles.sectionCopy}>
          <p className={styles.eyebrow}>{localizeCopy("How delivery works")}</p>
          <EntranceHeading id="delivery-title">
            {localizeCopy("Start with one workflow. Evolve from there.")}
          </EntranceHeading>
          <p>
            {localizeCopy(
              "Superspace isn’t a do-it-yourself builder or a one-off software project. We deploy it with you and run it as managed software.",
            )}
          </p>
        </div>
        <ol className={styles.stages}>
          {delivery.map(([title, text], i) => (
            <li key={title}>
              <small>0{i + 1}</small>
              <h3>{localizeCopy(title)}</h3>
              <p>{localizeCopy(text)}</p>
            </li>
          ))}
        </ol>
        <div className={styles.managed}>
          <p>{localizeCopy("Superspace hosts, maintains, and updates the platform for you.")}</p>
          <Link className={styles.link} href="/how-it-works">
            {localizeCopy("How it works →")}
          </Link>
        </div>
      </section>

      <section className={`${styles.section} ${styles.last}`} aria-labelledby="platform-title">
        <div className={styles.split}>
          <div className={styles.sectionCopy}>
            <p className={styles.eyebrow}>{localizeCopy("Under the hood")}</p>
            <EntranceHeading id="platform-title">
              {localizeCopy("One foundation. Many business models.")}
            </EntranceHeading>
            <p>
              {localizeCopy(
                "Each business defines its own model. A shared engine interprets it, reusable capabilities supply the operational logic, and people, apps, and AI agents work through the same governed actions.",
              )}
            </p>
            <Link className={styles.link} href="/how-it-works#foundation">
              {localizeCopy("Explore the platform →")}
            </Link>
          </div>
          <PlatformStack />
        </div>
      </section>
    </div>
  );
}

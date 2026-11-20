import { useCopy } from "@/i18n/copy";
import { Link } from "@/i18n/navigation";
import { BookingLink } from "./booking-link";
import { ExperienceShowcase } from "./experience-showcase";
import { HomeHero } from "./home-hero";
import { OperationAnatomy } from "./home-story";
import { WorkflowExamples } from "./workflow-examples";
import styles from "./commercial-home.module.css";

export function CommercialHome() {
  const copy = useCopy();

  return (
    <div className={styles.home}>
      <HomeHero />
      <section id="experience" className={styles.experience} aria-labelledby="experience-title">
        <div className={styles.sectionCopy}>
          <h2 id="experience-title">{copy("Know what needs attention. Move work forward.")}</h2>
          <p>
            {copy(
              "Superspace gives every operator a clear view of their work, the context to make decisions, and the controls to act on them.",
            )}
          </p>
        </div>
        <ExperienceShowcase />
      </section>

      <section id="fit" aria-labelledby="fit-title">
        <div className={styles.sectionCopy}>
          <h2 id="fit-title">{copy("The business platform that understands how you work.")}</h2>
          <p>
            {copy(
              "Superspace starts from how your business actually works: the things you manage, the stages they move through, the rules that apply, and the record of what happened. Screens and actions follow from those definitions.",
            )}
          </p>
        </div>
        <OperationAnatomy />
      </section>

      <section id="capabilities" aria-labelledby="capabilities-title">
        <div className={styles.sectionCopy}>
          <h2 id="capabilities-title">{copy("Software that adapts to how you operate.")}</h2>
          <p>
            {copy(
              "Superspace brings proven workflows to your operation and adapts them to your data, teams, and rules. See how the same workflow can assign drivers to deliveries, machines to production jobs, or teams to service requests.",
            )}
          </p>
        </div>
        <WorkflowExamples />
      </section>

      <section id="delivery" data-theme="dark" className={styles.cta} aria-labelledby="delivery-title">
        <div>
          <h2 id="delivery-title">
            <span>{copy("Bring one workflow.")}</span>
            <span>{copy("We’ll help you get it live.")}</span>
          </h2>
          <p>
            {copy(
              "In our first call, we’ll walk through how you work today and identify where to start. Our team helps you configure, launch, and run that workflow in Superspace.",
            )}
          </p>
        </div>
        <div className="hero-actions">
          <BookingLink
            placement="home_closing"
            label="Book a workflow call"
            subject="Superspace workflow call"
            designIcon
          />
          <Link className="button button--secondary" href="/how-it-works">
            {copy("How it works")}
          </Link>
        </div>
      </section>
    </div>
  );
}

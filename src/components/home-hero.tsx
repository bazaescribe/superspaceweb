import { useCopy } from "@/i18n/copy";
import { Link } from "@/i18n/navigation";
import { BookingLink } from "./booking-link";
import { HomeControlCenter } from "./home-control-center";
import styles from "./home-hero.module.css";

export function HomeHero() {
  const copy = useCopy();
  return (
    <section className={styles.hero} aria-labelledby="home-title">
      <div className={styles.copy}>
        <h1 id="home-title">{copy("Your business changes. Your software should adapt.")}</h1>
        <p>
          {copy(
            "Operational software built around how your business actually works. Give your team the visibility, workflows, and control they need, without starting from scratch every time operations change.",
          )}
        </p>
        <div className="hero-actions">
          <BookingLink placement="home_hero" label="Let’s talk" designIcon />
          <Link className="button button--secondary" href="/how-it-works">
            {copy("How it works")}
          </Link>
        </div>
      </div>
      <div className={styles.stage} data-theme="dark">
        <HomeControlCenter commercial />
      </div>
    </section>
  );
}

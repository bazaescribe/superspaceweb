"use client";

import { HeroHeading } from "@/components/entrance-heading";
import { BookingLink } from "./booking-link";
import { HomeControlCenter } from "./home-control-center";
import styles from "./home-hero.module.css";

/** Home hero: the headline above, and the live control center staged over the brand background. */
export function HomeHero() {
  return (
    <section className={styles.hero} aria-labelledby="home-title">
      <div className={styles.copy}>
        <HeroHeading id="home-title">Your business changes. Your software should adapt.</HeroHeading>
        <p>
          Operational software built around how your business actually works. Give your team the visibility, workflows,
          and control they need, without starting from scratch every time operations change.
        </p>
        <div className="hero-actions">
          <BookingLink placement="home_hero" designIcon inverse />
          <a className="button button--secondary" href="#story">
            See it in action
          </a>
        </div>
      </div>
      <div className={styles.stage}>
        <div className={styles.tilt}>
          <div className={styles.rise}>
            <HomeControlCenter />
          </div>
        </div>
      </div>
    </section>
  );
}

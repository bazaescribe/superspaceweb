import Image from "next/image";
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
        <h1 id="home-title">
          <span className={styles.desktopText}>{copy("Your business changes. Your software should adapt.")}</span>
          <span className={styles.mobileText}>{copy("The operative system that understands your business.")}</span>
        </h1>
        <p>
          <span className={styles.desktopText}>
            {copy(
              "Operational software built around how your business actually works. Give your team the visibility, workflows, and control they need, without starting from scratch every time operations change.",
            )}
          </span>
          <span className={styles.mobileText}>
            {copy(
              "Superspace turns the way your company works into operational software built around your people, processes, and rules, evolving as your business grows.",
            )}
          </span>
        </p>
        <div className={`hero-actions ${styles.actions}`}>
          <BookingLink placement="home_hero" label="Let’s talk" designIcon />
          <Link className="button button--secondary" href="/how-it-works">
            <span className={styles.desktopText}>{copy("How it works")}</span>
            <span className={styles.mobileText}>{copy("How it works?")}</span>
          </Link>
        </div>
      </div>
      <div className={styles.stage} data-theme="dark">
        <HomeControlCenter commercial />
      </div>
      <div className={styles.mobilePreview}>
        <Image
          src="/assets/figma/home-previews/commercial-hero-mobile.png"
          alt={copy("Superspace home: operational summary, overdue orders and order distribution")}
          width={2048}
          height={1330}
          sizes="739px"
        />
      </div>
    </section>
  );
}

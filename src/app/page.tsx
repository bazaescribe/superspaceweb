import { SiteHero } from "@/components/site-hero";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { HeroMockup } from "@/components/hero-mockup";
import { BookingLink } from "@/components/booking-link";
import { StartCtaSection } from "@/components/home-story-sections";
import { HomeSections } from "@/components/home-sections";
import { SectionBuffer } from "@/components/section-system";
import { HeaderThemeScope } from "@/components/header-theme";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Superspace — Operational software for growing companies",
  description:
    "Superspace models your people, work, and business rules as one flexible operational system—without the burden of custom software.",
  path: "/",
  absoluteTitle: true,
});

export default function Home() {
  return (
    <HeaderThemeScope className="site-v2">
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <Header />
      <main id="main-content">
        <SiteHero
          variant="home"
          visual={<HeroMockup />}
          title="Your operations. Finally, working as one."
          intro={
            <>
              {" "}
              One operating system for your workflows, people, data, and agents. Modeled around how your business
              actually works. Without having to develop software yourself.{" "}
            </>
          }
          actions={
            <>
              {" "}
              <BookingLink placement="home_hero" label="See it in action" designIcon />
              <a className="button button--secondary" href="#system">
                How it works?
              </a>{" "}
            </>
          }
        />
        <HomeSections />
        <div className="v24-spine v24-cta-spine">
          <StartCtaSection />
          <SectionBuffer />
        </div>
      </main>
      <Footer />
    </HeaderThemeScope>
  );
}

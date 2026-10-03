import { SiteHero } from "@/components/site-hero";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { IndustryCarousel } from "@/components/industry-carousel";
import { BookingLink } from "@/components/booking-link";
import { HomeSections } from "@/components/home-sections";
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
    <HeaderThemeScope className="site-v2 home-iteration">
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <Header />
      <main id="main-content">
        <SiteHero
          variant="home"
          visual={<IndustryCarousel />}
          title="Your operations. Finally, working as one."
          intro="Superspace brings your data, workflows and teams together in one place to run your business."
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
      </main>
      <Footer />
    </HeaderThemeScope>
  );
}

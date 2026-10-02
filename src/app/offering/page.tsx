import { SiteHero } from "@/components/site-hero";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { HeaderThemeScope } from "@/components/header-theme";
import { SystemSection, SectionBuffer } from "@/components/section-system";
import { OfferingsCatalog } from "@/components/offerings-catalog";
import { BookingLink } from "@/components/booking-link";
import { Reveal } from "@/components/reveal";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Offerings — See your operation in Superspace",
  description:
    "Explore how Superspace can connect logistics, retail, field services, manufacturing, facilities, and customer operations in one managed workspace.",
  path: "/offering",
});

export default function OfferingPage() {
  return (
    <HeaderThemeScope className="site-v2">
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <Header />
      <main id="main-content">
        <SiteHero
          title="See your operation in Superspace."
          intro={
            <>
              {" "}
              Different businesses. Familiar operational challenges. Explore how Superspace can connect the people,
              information, and workflows behind your work.{" "}
            </>
          }
        />
        <div className="v24-spine system-spine">
          <SystemSection primary="Find the work you recognize. " accent="See how it could work together.">
            <p className="m-0 px-6 py-6 text-body text-muted md:px-8">
              These are operations we can configure Superspace around. Select one to explore the problem and the fit.
            </p>
            <OfferingsCatalog />
          </SystemSection>
          <section className="start-cta" aria-labelledby="offerings-cta-title">
            <Reveal className="max-w-[720px]">
              <h2 id="offerings-cta-title">
                Don’t see your operation? <span>Let’s map it together.</span>
              </h2>
              <p>
                If your work depends on disconnected tools and manual coordination, we can explore what a shared
                operational system could look like for your team.
              </p>
              <BookingLink className="mt-5" placement="offerings_cta" label="Talk about your operation" designIcon />
            </Reveal>
          </section>
          <SectionBuffer />
        </div>
      </main>
      <Footer />
    </HeaderThemeScope>
  );
}

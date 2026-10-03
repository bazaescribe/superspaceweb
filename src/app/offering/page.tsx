import { SiteHero } from "@/components/site-hero";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { HeaderThemeScope } from "@/components/header-theme";
import { SystemSection } from "@/components/section-system";
import { OfferingsCatalog } from "@/components/offerings-catalog";
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
        </div>
      </main>
      <Footer />
    </HeaderThemeScope>
  );
}

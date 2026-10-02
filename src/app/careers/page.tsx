import { SiteHero } from "@/components/site-hero";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { HeaderThemeScope } from "@/components/header-theme";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Careers",
  description: "Careers at Superspace.",
  path: "/careers",
});
export default function CareersPage() {
  return (
    <HeaderThemeScope className="site-v2">
      <Header />
      <main id="main-content" style={{ minHeight: "60vh" }}>
        <SiteHero title="Careers" />
      </main>
      <Footer />
    </HeaderThemeScope>
  );
}

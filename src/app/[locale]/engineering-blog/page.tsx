import { setRequestLocale } from "next-intl/server";

import { useCopy } from "@/i18n/copy";
import { SiteHero } from "@/components/site-hero";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { HeaderThemeScope } from "@/components/header-theme";
import { createPageMetadata } from "@/i18n/metadata";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return {
    ...(await createPageMetadata({
      title: "Engineering Blog",
      description: "Engineering at Superspace.",
      path: "/engineering-blog",
    })),
    robots: { index: false, follow: true },
  };
}
function EngineeringBlogPage() {
  const localizeCopy = useCopy();
  return (
    <HeaderThemeScope className="site-v2">
      <Header />
      <main id="main-content" style={{ minHeight: "60vh" }}>
        <SiteHero title={localizeCopy("Engineering Blog")} />
      </main>
      <Footer />
    </HeaderThemeScope>
  );
}

export default async function LocalizedPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <EngineeringBlogPage />;
}

import { setRequestLocale } from "next-intl/server";

import { useCopy } from "@/i18n/copy";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { DarkHome } from "@/components/dark-home";
import { HeaderThemeScope } from "@/components/header-theme";
import { createPageMetadata } from "@/i18n/metadata";
export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return createPageMetadata({
    title: "Superspace — Operational software for growing companies",
    description:
      "One managed system for your people, processes, and business rules. Configured to fit how you work, and ready to grow with you.",
    path: "/",
    absoluteTitle: true,
  });
}
function Home() {
  const localizeCopy = useCopy();
  return (
    <HeaderThemeScope defaultTone="dark" data-theme="dark" className="site-v2 dark-redesign home-dark">
      <a className="skip-link" href="#main-content">
        {localizeCopy("Skip to content")}
      </a>
      <Header />
      <main id="main-content">
        <DarkHome />
      </main>
      <Footer />
    </HeaderThemeScope>
  );
}

export default async function LocalizedPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <Home />;
}

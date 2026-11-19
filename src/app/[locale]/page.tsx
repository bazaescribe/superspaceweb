import "../commercial-home.css";

import { setRequestLocale } from "next-intl/server";

import { useCopy } from "@/i18n/copy";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { CommercialHome } from "@/components/commercial-home";
import { HeaderThemeScope } from "@/components/header-theme";
import { createPageMetadata } from "@/i18n/metadata";
export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return createPageMetadata({
    title: "Superspace — Your business changes. Your software should adapt.",
    description:
      "Operational software built around how your business actually works. Know what needs attention, move work forward, and adapt as operations change, on a managed platform deployed with your team.",
    path: "/",
    absoluteTitle: true,
  });
}
function Home() {
  const localizeCopy = useCopy();
  return (
    <HeaderThemeScope defaultTone="light" data-theme="light" className="site-v2 commercial-home">
      <a className="skip-link" href="#main-content">
        {localizeCopy("Skip to content")}
      </a>
      <Header desktopBookingLabel="Let’s talk" />
      <main id="main-content">
        <CommercialHome />
      </main>
      <Footer cta={null} />
    </HeaderThemeScope>
  );
}

export default async function LocalizedPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <Home />;
}

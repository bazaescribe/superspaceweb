import { setRequestLocale } from "next-intl/server";
import { CompanyStory } from "@/components/company-story";
import { aboutSections } from "@/lib/editorial-content";
import { createPageMetadata } from "@/i18n/metadata";
export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return createPageMetadata({
    title: "About us",
    description: "Building software around the way businesses work.",
    path: "/company",
  });
}
function CompanyPage() {
  return <CompanyStory chapters={aboutSections} about />;
}

export default async function LocalizedPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <CompanyPage />;
}

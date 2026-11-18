import { setRequestLocale } from "next-intl/server";
import { CompanyStory } from "@/components/company-story";
import { aboutSections } from "@/lib/editorial-content";
import { createPageMetadata } from "@/i18n/metadata";
export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return createPageMetadata({
    title: "Company — Building software around the way businesses work",
    description:
      "Why Superspace exists, where the product stands today, the founder behind it, and the long-term vision of an autonomous enterprise where people and AI run operations together.",
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

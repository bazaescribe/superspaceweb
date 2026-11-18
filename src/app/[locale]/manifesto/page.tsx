import { setRequestLocale } from "next-intl/server";
import { CompanyStory } from "@/components/company-story";
import { manifestoSections } from "@/lib/editorial-content";
import { createPageMetadata } from "@/i18n/metadata";
export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return createPageMetadata({
    title: "Manifesto",
    description: "Software should make more things possible. The ideas behind Superspace.",
    path: "/manifesto",
  });
}
function ManifestoPage() {
  return <CompanyStory chapters={manifestoSections} />;
}

export default async function LocalizedPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <ManifestoPage />;
}

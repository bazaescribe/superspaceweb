import { setRequestLocale } from "next-intl/server";

import { useCopy } from "@/i18n/copy";
import { EditorialPage, EditorialSection } from "@/components/editorial-page";
import { createPageMetadata } from "@/i18n/metadata";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return {
    ...(await createPageMetadata({
      title: "Changelog",
      description: "Product updates from Superspace.",
      path: "/changelog",
    })),
    robots: { index: false, follow: true },
  };
}

function ChangelogPage() {
  const localizeCopy = useCopy();
  return (
    <EditorialPage
      eyebrow={localizeCopy("Changelog")}
      title={localizeCopy("Built to keep evolving.")}
      intro={localizeCopy("Product improvements, new capabilities and updates to Superspace.")}
    >
      <EditorialSection title={localizeCopy("Updates will appear here.")}>
        <p>{localizeCopy("There are no public release notes yet. Check back for the latest product updates.")}</p>
      </EditorialSection>
    </EditorialPage>
  );
}

export default async function LocalizedPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <ChangelogPage />;
}

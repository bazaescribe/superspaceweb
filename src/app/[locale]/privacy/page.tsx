import { setRequestLocale } from "next-intl/server";

import { useCopy } from "@/i18n/copy";
import { EditorialPage, EditorialSection } from "@/components/editorial-page";
import { createPageMetadata } from "@/i18n/metadata";
import { contactEmail, contactUrl } from "@/lib/site";
import { legalUpdated, websitePrivacy } from "@/lib/website-legal";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return createPageMetadata({
    title: "Privacy",
    description: "How we handle information when you visit this website or contact Superspace.",
    path: "/privacy",
  });
}

function PrivacyPage() {
  const localizeCopy = useCopy();
  return (
    <EditorialPage
      eyebrow={localizeCopy("Legal")}
      title={localizeCopy("Website privacy")}
      intro={localizeCopy("How we handle information when you visit this website or contact Superspace.")}
    >
      <EditorialSection title={localizeCopy("Last updated")}>
        <p>{localizeCopy(legalUpdated)}</p>
        <p>
          {localizeCopy("Contact: ")}
          <a href={contactUrl}>{localizeCopy(contactEmail)}</a>
        </p>
      </EditorialSection>
      {websitePrivacy.map((section) => (
        <EditorialSection key={section.title} title={localizeCopy(section.title)}>
          {section.paragraphs.map((paragraph) => (
            <p key={paragraph}>{localizeCopy(paragraph)}</p>
          ))}
        </EditorialSection>
      ))}
    </EditorialPage>
  );
}

export default async function LocalizedPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <PrivacyPage />;
}

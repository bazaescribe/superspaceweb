import { EditorialPage, EditorialSection } from "@/components/editorial-page";
import { createPageMetadata } from "@/lib/seo";
import { contactEmail, contactUrl } from "@/lib/site";
import { legalUpdated, websitePrivacy } from "@/lib/website-legal";

export const metadata = createPageMetadata({
  title: "Privacy",
  description: "How we handle information when you visit this website or contact Superspace.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <EditorialPage
      eyebrow="Legal"
      title="Website privacy"
      intro="How we handle information when you visit this website or contact Superspace."
    >
      <EditorialSection title="Last updated">
        <p>{legalUpdated}</p>
        <p>
          Contact: <a href={contactUrl}>{contactEmail}</a>
        </p>
      </EditorialSection>
      {websitePrivacy.map((section) => (
        <EditorialSection key={section.title} title={section.title}>
          {section.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </EditorialSection>
      ))}
    </EditorialPage>
  );
}

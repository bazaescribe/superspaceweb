import { EditorialPage, EditorialSection } from "@/components/editorial-page";
import { createPageMetadata } from "@/lib/seo";
import { contactEmail, contactUrl } from "@/lib/site";
import { legalUpdated, websiteTerms } from "@/lib/website-legal";

export const metadata = createPageMetadata({
  title: "Website terms",
  description:
    "Basic terms for using the Superspace website. Paid platform services are covered by a separate agreement.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <EditorialPage
      eyebrow="Legal"
      title="Website terms"
      intro="Basic terms for using the Superspace website. Paid platform services are covered by a separate agreement."
    >
      <EditorialSection title="Last updated">
        <p>{legalUpdated}</p>
        <p>
          Contact: <a href={contactUrl}>{contactEmail}</a>
        </p>
      </EditorialSection>
      {websiteTerms.map((section) => (
        <EditorialSection key={section.title} title={section.title}>
          {section.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </EditorialSection>
      ))}
    </EditorialPage>
  );
}

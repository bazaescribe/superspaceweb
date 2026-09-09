import { EditorialPage, EditorialSection } from "@/components/editorial-page";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Privacy",
  description: "Website privacy information for Superspace.",
  path: "/privacy",
});
export default function PrivacyPage() {
  return (
    <EditorialPage
      eyebrow="Legal"
      title="Website privacy"
      intro="The final privacy notice will reflect the actual analytics, hosting, booking and inquiry tools used on this site."
    >
      <EditorialSection title="Pending data-flow and legal review">
        <p className="font-display text-feature text-foreground">
          This page does not yet collect inquiry data or claim a privacy process that has not been confirmed.
        </p>
        <p>
          Before a form or booking integration launches, the notice should document what is collected, why it is used,
          processors, retention, international transfers, visitor rights, cookies and a privacy contact.
        </p>
      </EditorialSection>
    </EditorialPage>
  );
}

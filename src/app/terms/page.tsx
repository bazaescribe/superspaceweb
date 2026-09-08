import type { Metadata } from "next";
import { EditorialPage, EditorialSection } from "@/components/editorial-page";
export const metadata: Metadata = { title: "Terms — Superspace", description: "Website terms for Superspace." };
export default function TermsPage() {
  return (
    <EditorialPage
      eyebrow="Legal"
      title="Website terms"
      intro="Final website terms require confirmation of the operating legal entity, governing jurisdiction and legal contact."
    >
      <EditorialSection title="Pending legal review">
        <p className="font-display text-feature text-foreground">
          This page is intentionally not presenting placeholder legal language as approved terms.
        </p>
        <p>
          Before public launch, counsel should cover permitted site use, intellectual property, third-party links,
          disclaimers, limitations, governing law, changes and contact details.
        </p>
      </EditorialSection>
    </EditorialPage>
  );
}

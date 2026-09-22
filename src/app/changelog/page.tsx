import { EditorialPage, EditorialSection } from "@/components/editorial-page";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Changelog",
  description: "Product updates from Superspace.",
  path: "/changelog",
});

export default function ChangelogPage() {
  return (
    <EditorialPage
      eyebrow="Changelog"
      title="Built to keep evolving."
      intro="Product improvements, new capabilities and updates to Superspace."
    >
      <EditorialSection title="Updates will appear here.">
        <p>There are no public release notes yet. Check back for the latest product updates.</p>
      </EditorialSection>
    </EditorialPage>
  );
}

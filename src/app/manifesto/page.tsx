import { CompanyStory } from "@/components/company-story";
import { manifestoSections } from "@/lib/editorial-content";
import { createPageMetadata } from "@/lib/seo";
export const metadata = createPageMetadata({
  title: "Manifesto",
  description: "Software should make more things possible. The ideas behind Superspace.",
  path: "/manifesto",
});
export default function ManifestoPage() {
  return <CompanyStory chapters={manifestoSections} />;
}

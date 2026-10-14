import { CompanyStory } from "@/components/company-story";
import { aboutSections } from "@/lib/editorial-content";
import { createPageMetadata } from "@/lib/seo";
export const metadata = createPageMetadata({
  title: "About us",
  description: "Building software around the way businesses work.",
  path: "/company",
});
export default function CompanyPage() {
  return <CompanyStory chapters={aboutSections} about />;
}

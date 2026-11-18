import { CompanyStory } from "@/components/company-story";
import { aboutSections } from "@/lib/editorial-content";
import { createPageMetadata } from "@/lib/seo";
export const metadata = createPageMetadata({
  title: "Company — Building software around the way businesses work",
  description:
    "Why Superspace exists, where the product stands today, the founder behind it, and the long-term vision of an autonomous enterprise where people and AI run operations together.",
  path: "/company",
});
export default function CompanyPage() {
  return <CompanyStory chapters={aboutSections} about />;
}

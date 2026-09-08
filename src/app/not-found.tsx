import Link from "next/link";
import { EditorialPage } from "@/components/editorial-page";
export default function NotFound() {
  return (
    <EditorialPage
      eyebrow="404"
      title="That page is not part of the current site."
      intro="The site is being kept intentionally focused while the product and its first customer work develop."
    >
      <div className="shell mb-20 flex flex-wrap gap-3">
        <Link className="button" href="/">
          Return home
        </Link>
        <Link className="button button--secondary" href="/platform">
          Explore the platform
        </Link>
      </div>
    </EditorialPage>
  );
}

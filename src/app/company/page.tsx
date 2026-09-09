import Image from "next/image";
import { EditorialCta, EditorialPage, EditorialSection } from "@/components/editorial-page";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Company",
  description: "Why Superspace is building managed operational software for growing companies from Mexico City.",
  path: "/company",
});

function CompanySignature() {
  return (
    <div className="grid overflow-hidden rounded-panel bg-surface md:grid-cols-[1.3fr_1fr]">
      <div className="flex flex-col justify-between gap-12 p-6 md:p-10">
        <span className="text-label text-muted">Superspace Industries / Est. 2024</span>
        <div>
          <p className="font-display text-section">
            Operational software.
            <br />
            <span className="text-muted">From Mexico City.</span>
          </p>
          <div className="mt-8 flex flex-wrap gap-6 border-x-0 border-b-0 border-t border-solid border-subtle pt-4 text-label text-muted">
            <span>Mexico City / MX</span>
            <span>Latin America / United States</span>
          </div>
        </div>
      </div>
      <div className="relative flex min-h-64 items-center justify-center overflow-hidden bg-dark p-12">
        <Image
          src="/brand/superspace-symbol-inverse.svg"
          alt="Superspace symbol"
          width={100}
          height={160}
          className="relative h-40 w-auto"
        />
        <span className="absolute bottom-5 right-6 text-label text-inverse-muted">01 / The foundation</span>
      </div>
    </div>
  );
}
function RuntimeDiagram() {
  return (
    <figure className="m-0 mt-10 rounded-control border border-solid border-white/20 p-5 md:p-8">
      <figcaption className="mb-8 text-label text-inverse-muted">The operating model / Conceptual diagram</figcaption>
      <div className="grid gap-6 md:grid-cols-[1fr_auto_1fr]">
        <div>
          <span className="text-label text-inverse-muted">Declare</span>
          <h3 className="mt-3 text-feature text-inverse">Objects + relationships</h3>
          <p className="mt-3 text-label text-inverse-muted">What exists. How it connects.</p>
        </div>
        <span aria-hidden="true" className="self-center text-inverse-muted">
          →
        </span>
        <div>
          <span className="text-label text-inverse-muted">Execute</span>
          <h3 className="mt-3 text-feature text-inverse">Actions + transitions</h3>
          <p className="mt-3 text-label text-inverse-muted">What changes. What happens next.</p>
        </div>
      </div>
      <div className="mt-8 border-x-0 border-b-0 border-t border-solid border-white/20 pt-4 text-label text-inverse-muted">
        Events preserve the history of the work.
      </div>
    </figure>
  );
}
export default function CompanyPage() {
  return (
    <EditorialPage
      eyebrow="Company"
      title={
        <>
          Software should fit the operation. <span>Not the other way around.</span>
        </>
      }
      intro="Superspace is a Mexico City company building operational software for growing teams across Latin America and the United States."
      visual={<CompanySignature />}
    >
      <EditorialSection number="01" title="The gap between SaaS and custom software.">
        <p className="font-display text-feature text-foreground">
          Growing companies often reach a point where focused tools no longer represent how their operation works, while
          custom software remains expensive to build and own.
        </p>
        <p>
          Superspace is our answer: a reusable platform configured around each company’s operating model, delivered
          through a focused implementation engagement, then used as an everyday software product.
        </p>
        <div className="flex flex-col gap-4 border-x-0 border-b-0 border-t border-solid border-subtle pt-6 text-label sm:flex-row sm:items-center">
          <span>Focused implementation</span>
          <span aria-hidden="true" className="text-muted">
            →
          </span>
          <span>Everyday software</span>
          <span aria-hidden="true" className="text-muted">
            →
          </span>
          <span>Ongoing platform</span>
        </div>
      </EditorialSection>
      <EditorialSection
        number="02"
        title="Deep technology, applied to ordinary operational work."
        tone="dark"
        visual={<RuntimeDiagram />}
      >
        <p className="font-display text-feature text-foreground">
          Our technical foundation is a declarative ontology runtime: an organization declares a model of its operation,
          and the platform executes that model.
        </p>
        <p>
          That foundation matters because real operations are relational. Objects hold state, relationships provide
          context, transitions constrain change, actions create change and events preserve history. Customers do not
          need to learn that language to use the product—but it is what makes the system coherent underneath.
        </p>
      </EditorialSection>
      <EditorialSection number="03" title="Curiosity before certainty.">
        <p className="font-display text-feature text-foreground">
          We are working with early design partners to prove the thesis one operational system at a time.
        </p>
        <div className="border-y-0 border-r-0 border-l-2 border-solid border-subtle pl-6">
          <p>
            We are not presenting past employers or unrelated client work as Superspace customer proof. As
            design-partner implementations become publishable, this page will grow to include the people behind the
            company and evidence from the product’s own work.
          </p>
        </div>
      </EditorialSection>
      <EditorialCta title="Build the first system with us." />
    </EditorialPage>
  );
}

import type { Metadata } from "next";
import Image from "next/image";
import { EditorialCta, EditorialPage, EditorialSection, ProductFrame, container } from "@/components/editorial-page";
import { Reveal } from "@/components/reveal";

export const metadata: Metadata = {
  title: "Solutions — Superspace",
  description: "Operational systems for growing teams whose work has outgrown disconnected tools.",
};
const solutions = [
  [
    "Complex orders",
    "Connect intake, customer and product records, approvals, documents, stock decisions and fulfillment status in one traceable flow.",
    ["Intake", "Approval", "Stock", "Fulfillment"],
  ],
  [
    "Service operations",
    "Coordinate requests, availability, assignments, status changes, service records and customer communication around the same source of truth.",
    ["Request", "Availability", "Assignment", "Service record"],
  ],
  [
    "Inventory and purchasing",
    "Relate products, locations, movements, suppliers and purchase requests so shortages and exceptions trigger the right work.",
    ["Products", "Locations", "Movements", "Purchase requests"],
  ],
  [
    "Internal workflows",
    "Turn recurring approvals, handoffs and business rules into visible responsibilities instead of messages and institutional memory.",
    ["Business rules", "Approval", "Handoff", "Responsibility"],
  ],
] as const;

function WorkflowSketch({ steps, index }: { steps: readonly string[]; index: number }) {
  const label = <p className="mb-6 text-label text-muted">Operational pattern / 0{index + 1}</p>;
  if (index === 0)
    return (
      <div className="rounded-panel bg-surface p-6 md:p-8">
        {label}
        <ol className="m-0 list-none p-0">
          {steps.map((step, n) => (
            <li key={step} className="relative flex items-center gap-4 py-3 text-label">
              <span className="relative z-10 flex h-8 w-8 items-center justify-center rounded-control border border-solid border-subtle bg-canvas text-muted">
                0{n + 1}
              </span>
              {step}
              {n < steps.length - 1 && (
                <span aria-hidden="true" className="absolute left-4 top-11 h-6 w-px bg-subtle" />
              )}
            </li>
          ))}
        </ol>
      </div>
    );
  if (index === 1)
    return (
      <div className="rounded-panel bg-surface p-6 md:p-8">
        {label}
        <div className="rounded-control border border-solid border-subtle bg-canvas p-5">
          <p className="text-label text-muted">{steps[0]}</p>
          <h3 className="mt-2 text-feature">{steps[2]}</h3>
          <div className="mt-6 grid grid-cols-2 gap-4 border-x-0 border-b-0 border-t border-solid border-subtle pt-4">
            <div>
              <span className="text-label text-muted">Before the work</span>
              <p className="mt-2 text-label">{steps[1]}</p>
            </div>
            <div>
              <span className="text-label text-muted">After the work</span>
              <p className="mt-2 text-label">{steps[3]}</p>
            </div>
          </div>
        </div>
      </div>
    );
  if (index === 2)
    return (
      <div className="rounded-panel bg-surface p-6 md:p-8">
        {label}
        <div className="grid grid-cols-2 gap-px overflow-hidden rounded-control border border-solid border-subtle bg-subtle">
          {steps.slice(0, 2).map((step) => (
            <div key={step} className="bg-canvas p-5 text-label">
              {step}
            </div>
          ))}
        </div>
        <div className="mx-auto h-8 w-px bg-subtle" aria-hidden="true" />
        <div className="rounded-control border border-solid border-subtle bg-canvas p-5 text-center text-label">
          {steps[2]}
        </div>
        <div className="py-4 text-center text-label text-muted">
          Shortages & exceptions <span aria-hidden="true">↓</span>
        </div>
        <p className="rounded-control bg-dark px-5 py-4 text-center text-label text-inverse">{steps[3]}</p>
      </div>
    );
  return (
    <div className="rounded-panel bg-surface p-6 md:p-8">
      {label}
      <div className="border-y-0 border-r-0 border-l-2 border-solid border-subtle pl-5">
        <p className="text-label text-muted">{steps[0]}</p>
        <h3 className="mt-2 text-feature">
          {steps[1]}{" "}
          <span aria-hidden="true" className="text-muted">
            →
          </span>{" "}
          {steps[2]}
        </h3>
      </div>
      <div className="mt-8 flex items-center gap-4 rounded-control border border-solid border-subtle bg-canvas p-5">
        <span aria-hidden="true" className="h-2 w-2 bg-foreground" />
        <p className="text-label">{steps[3]}</p>
      </div>
    </div>
  );
}

export default function SolutionsPage() {
  return (
    <EditorialPage
      eyebrow="Solutions"
      title={
        <>
          Start with the operation <span>your current tools cannot hold together.</span>
        </>
      }
      intro="Superspace is for proven businesses with roughly 15–50 people whose teams run important processes across spreadsheets, inboxes, chat, point solutions and people’s memory."
      visual={
        <ProductFrame
          label="One workspace / Connected operational work"
          note="Illustrative product environment. Names and operational data are fictional."
        >
          <div className="relative grid items-center gap-6 overflow-hidden p-6 md:grid-cols-[.45fr_1fr] md:p-10">
            <div className="flex flex-col gap-4 text-label text-muted">
              <span className="text-foreground">People. Records. Handoffs.</span>
              <span>One operation to start.</span>
              <span className="mt-4 h-px w-12 bg-subtle" />
            </div>
            <Image
              src="/assets/figma/hero-workspace.png"
              alt="Illustrative Superspace workspace connecting service work, people, and operational records"
              width={1280}
              height={831}
              priority
              className="block h-auto w-full rounded-control shadow-product"
              sizes="(max-width: 768px) 100vw, 850px"
            />
          </div>
        </ProductFrame>
      }
    >
      <section className={`${container} mb-section`} aria-label="Operational solutions">
        {solutions.map(([title, copy, steps], index) => (
          <article
            key={title}
            className="grid items-center gap-8 border-x-0 border-b-0 border-t border-solid border-subtle py-10 md:grid-cols-2 md:gap-16 md:py-12"
          >
            <div className={index % 2 ? "md:order-2" : ""}>
              <span className="text-label text-muted">0{index + 1} /</span>
              <h2 className="mt-5 text-section">{title}</h2>
              <p className="mt-4 max-w-lg text-body text-muted">{copy}</p>
            </div>
            <Reveal>
              <WorkflowSketch index={index} steps={steps} />
            </Reveal>
          </article>
        ))}
      </section>
      <EditorialSection title="A focused operational system—not a full digital transformation." tone="dark">
        <p className="font-display text-feature text-foreground">
          We begin with a bounded, high-value operation, not a promise to rebuild the entire company at once.
        </p>
        <p>
          The strongest fit is a startup or scale-up with a proven business model, operational complexity that standard
          software no longer represents well, and a team ready to make its real rules and exceptions explicit.
        </p>
        <div className="grid gap-8 border-x-0 border-b-0 border-t border-solid border-white/20 pt-8 sm:grid-cols-2">
          <div>
            <h3 className="mb-3 flex items-center gap-3 text-feature text-inverse">
              <span aria-hidden="true" className="h-1.5 w-1.5 bg-inverse" />
              Usually a fit
            </h3>
            <p>
              Cross-functional workflows, repeated manual reconciliation, important exceptions, fast-changing processes
              and a need for shared operational context.
            </p>
          </div>
          <div>
            <h3 className="mb-3 text-feature text-inverse">Probably not yet</h3>
            <p>
              An unproven process, a simple need already served by focused SaaS, or a company-wide transformation
              requiring a large systems integrator.
            </p>
          </div>
        </div>
      </EditorialSection>
      <EditorialSection
        title="Where these patterns show up."
        visual={
          <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
            {[
              ["Manufacturing", "/assets/use-case-manufacturing.jpg"],
              ["Logistics", "/assets/use-case-logistics.jpg"],
              ["Field services", "/assets/use-case-service.jpg"],
              ["Distribution", "/assets/figma/industry-distribution.png"],
            ].map(([label, src]) => (
              <figure key={label} className="m-0">
                <div className="relative aspect-[4/3] overflow-hidden rounded-panel bg-surface">
                  <Image src={src} alt="" fill sizes="(max-width: 768px) 50vw, 320px" className="object-cover" />
                </div>
                <figcaption className="pt-3 text-label">{label}</figcaption>
              </figure>
            ))}
          </div>
        }
      >
        <p className="font-display text-feature text-foreground">
          We are initially exploring operations across Latin America and the United States, including manufacturing,
          logistics, field services and distribution.
        </p>
        <p>
          These are not separate template products. They are examples of businesses where orders, inventory, locations,
          people and service commitments have to move together.
        </p>
      </EditorialSection>
      <EditorialCta
        title="Bring us one workflow."
        text="Show us the people, records, handoffs and exceptions involved. We’ll help determine whether it is a strong first system for Superspace."
      />
    </EditorialPage>
  );
}

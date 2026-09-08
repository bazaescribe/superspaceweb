import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  EditorialCta,
  EditorialPage,
  EditorialSection,
  ProductFrame,
  ProcessSteps,
  container,
} from "@/components/editorial-page";

export const metadata: Metadata = {
  title: "Platform — Superspace",
  description: "How Superspace models, runs, and contextualizes your operation.",
};
const layers = [
  ["matrix", "Matrix", "Your company modeled"],
  ["flow", "Flow", "Your company in motion"],
  ["atlas", "Atlas", "Your company in context"],
] as const;

function SystemOverview() {
  return (
    <div className="overflow-hidden rounded-panel border border-solid border-subtle bg-surface">
      <div className="grid gap-px bg-subtle md:grid-cols-3">
        {layers.map(([id, title, copy], i) => (
          <Link
            href={`#${id}`}
            key={id}
            className="group flex items-start gap-5 bg-surface p-6 no-underline transition-colors hover:bg-navigation focus-visible:-outline-offset-4 md:block md:p-8"
          >
            <span className="text-label text-muted">0{i + 1}</span>
            <div className="flex-1 md:mt-8">
              <div className="flex items-center justify-between">
                <h2 className="text-section">{title}</h2>
                <span aria-hidden="true" className="text-muted transition-transform group-hover:translate-y-1">
                  ↓
                </span>
              </div>
              <p className="mt-2 text-label text-muted">{copy}</p>
            </div>
          </Link>
        ))}
      </div>
      <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-4 px-6 py-5 text-label text-muted md:px-8">
        <span className="h-px bg-subtle" />
        <span>One shared workspace</span>
        <span className="h-px bg-subtle" />
      </div>
    </div>
  );
}

function ObjectModel() {
  return (
    <ProductFrame
      label="Matrix / Operational relationships"
      note="Example model: Customer places Order; Order reserves Stock and creates Dispatch."
    >
      <div className="grid items-center gap-4 p-6 sm:grid-cols-[1fr_auto_1fr] md:p-12">
        <div className="rounded-control border border-solid border-subtle bg-canvas p-5">
          <span className="text-label text-muted">Object</span>
          <h3 className="mt-3 text-feature">Customer</h3>
          <p className="mt-5 border-x-0 border-b-0 border-t border-solid border-subtle pt-3 text-label text-muted">
            People · Relationships
          </p>
        </div>
        <span className="text-center text-label text-muted">
          places <span aria-hidden="true">→</span>
        </span>
        <div className="rounded-control border border-solid border-subtle bg-canvas p-5 shadow-product">
          <span className="text-label text-muted">Connected object</span>
          <h3 className="mt-3 text-feature">Order</h3>
          <div className="mt-5 grid grid-cols-2 gap-2 border-x-0 border-b-0 border-t border-solid border-subtle pt-3 text-label">
            <div>
              <span className="block text-muted">reserves</span>Stock
            </div>
            <div>
              <span className="block text-muted">creates</span>Dispatch
            </div>
          </div>
        </div>
      </div>
    </ProductFrame>
  );
}
function ContextView() {
  return (
    <ProductFrame
      label="Atlas / Context attached to a record"
      note="Conceptual view of operational context, not an autonomous agent."
    >
      <div className="grid gap-6 p-6 md:grid-cols-[.7fr_1fr] md:p-10">
        <div className="flex flex-col justify-between rounded-control bg-dark p-6 text-inverse">
          <div>
            <span className="text-label text-inverse-muted">Operational object</span>
            <h3 className="mt-3 text-section">Order</h3>
          </div>
          <p className="mt-10 text-label text-inverse-muted">
            The work and its context,
            <br />
            kept together.
          </p>
        </div>
        <dl className="m-0">
          {[
            ["Relationships", "Customers, products and connected work"],
            ["History", "Events and decisions attached to the record"],
            ["Operating knowledge", "The rules and information needed to act"],
          ].map(([label, copy]) => (
            <div
              key={label}
              className="border-x-0 border-t-0 border-b border-solid border-subtle py-4 first:pt-0 last:border-0"
            >
              <dt className="text-label text-foreground">{label}</dt>
              <dd className="m-0 mt-2 text-body text-muted">{copy}</dd>
            </div>
          ))}
        </dl>
      </div>
    </ProductFrame>
  );
}
export default function PlatformPage() {
  return (
    <EditorialPage
      eyebrow="The platform"
      title={
        <>
          Your operation, <span>expressed as one working system.</span>
        </>
      }
      intro="Superspace combines a short implementation engagement with an ongoing software platform. We model how your business works, configure the system around it, and keep it operating as your team’s shared workspace."
      visual={<SystemOverview />}
    >
      <div className={`${container} mb-12 flex gap-3 text-label text-muted`}>
        <span aria-hidden="true">↓</span>Explore the layers
      </div>
      <EditorialSection
        id="matrix"
        number="01"
        title={
          <>
            Matrix. <span>Model what the business is made of.</span>
          </>
        }
        visual={<ObjectModel />}
      >
        <p className="font-display text-feature text-foreground">
          Customers, orders, locations, products, people, contracts and assets become connected operational objects—not
          rows scattered across unrelated tools.
        </p>
        <p>
          Matrix is the structural layer. It defines what may exist in an operation, how those things relate, who can
          see them, and which details matter to each team. Underneath, this is an ontology: a precise model of the
          business that the software can operate.
        </p>
      </EditorialSection>
      <EditorialSection
        id="flow"
        number="02"
        title={
          <>
            Flow. <span>Make rules and handoffs executable.</span>
          </>
        }
        tone="warm"
        visual={
          <ProductFrame label="Flow / Order fulfillment">
            <div
              className="overflow-x-auto"
              tabIndex={0}
              role="region"
              aria-label="Order fulfillment example; scroll horizontally on small screens"
            >
              <Image
                className="block h-auto w-full min-w-[640px] md:min-w-0"
                src="/assets/figma/feature-tailored.png"
                alt="Illustrative Superspace order fulfillment workflow"
                width={1512}
                height={964}
                sizes="(max-width: 1280px) 100vw, 1184px"
              />
            </div>
            <p className="px-5 pt-4 text-label text-muted md:hidden">Scroll across to explore the workflow →</p>
            <p className="px-5 py-4 text-label text-muted">
              Illustrative product environment. Names and operational data are fictional.
            </p>
          </ProductFrame>
        }
      >
        <p className="font-display text-feature text-foreground">
          Flow turns status changes, assignments, approvals and exceptions into workflows that teams can see and follow.
        </p>
        <p>
          Actions create change. Transitions constrain what can happen next. Events record what happened. People stay in
          the loop where judgment is required; repeatable work is handled consistently.
        </p>
      </EditorialSection>
      <EditorialSection
        id="atlas"
        number="03"
        title={
          <>
            Atlas. <span>Keep context attached to the work.</span>
          </>
        }
        visual={<ContextView />}
      >
        <p className="font-display text-feature text-foreground">
          Atlas is the contextual layer: the operating knowledge, history and relationships people need to understand a
          record and act correctly.
        </p>
        <p>
          Today, Atlas is about contextualization—not autonomous agents. The longer-term direction is software that can
          support increasingly autonomous operations, grounded in a reliable operational model.
        </p>
      </EditorialSection>
      <EditorialSection id="implementation" number="04" title="From operating map to everyday software.">
        <ProcessSteps
          steps={[
            [
              "Choose the operation",
              "Start with one important workflow that is already proven but strained by fragmented tools.",
            ],
            [
              "Model the graph",
              "Map the objects, relationships, roles, rules, handoffs and exceptions that define the work.",
            ],
            [
              "Configure and validate",
              "Shape the workspace with the team, test real scenarios and refine responsibilities before rollout.",
            ],
            [
              "Operate and evolve",
              "Use it like another SaaS product. Initially, changes and extensions are handled through paid support hours.",
            ],
          ]}
        />
      </EditorialSection>
      <EditorialCta title="Map the operation behind your next system." />
    </EditorialPage>
  );
}

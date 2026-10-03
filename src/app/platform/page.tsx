import { SiteHero } from "@/components/site-hero";
import Image from "next/image";
import Link from "next/link";
import { ProductFrame, ProcessSteps } from "@/components/editorial-page";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { HeaderThemeScope } from "@/components/header-theme";
import { BookingLink } from "@/components/booking-link";
import { SystemSection, SectionBuffer } from "@/components/section-system";
import styles from "./platform.module.css";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Operational software platform",
  description:
    "See how Superspace Matrix, Flow, and Atlas model your business, run its workflows, and keep operational context connected.",
  path: "/platform",
});
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
    <HeaderThemeScope className="site-v2">
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <Header />
      <main id="main-content">
        <SiteHero
          title="Your operation, expressed as one working system."
          intro={
            <>
              {" "}
              Superspace combines a focused implementation engagement with an ongoing software platform. We model how
              your business works, configure the system around it, and keep it operating as your team’s shared
              workspace.{" "}
            </>
          }
          actions={
            <>
              {" "}
              <BookingLink placement="platform_hero" label="See it in action" designIcon />
              <a className="button button--secondary" href="#matrix">
                Explore the platform
              </a>{" "}
            </>
          }
        />
        <div className="v24-spine system-spine">
          <div className={styles.overview}>
            <SystemOverview />
          </div>
          <SectionBuffer />
          <div id="matrix" className={styles.anchor}>
            <SystemSection primary="Matrix. " accent="Model what the business is made of.">
              <div className={styles.split}>
                <div className={styles.copy}>
                  <h3>Your business, connected.</h3>
                  <p>
                    Customers, orders, locations, products, people, contracts and assets become connected operational
                    objects.
                  </p>
                  <p>
                    Matrix defines what exists in your operation, how those things relate, who can see them, and which
                    details matter to each team. It gives the software a precise model of how your business works.
                  </p>
                </div>
                <div className={styles.visual}>
                  <ObjectModel />
                </div>
              </div>
            </SystemSection>
          </div>
          <div id="flow" className={styles.anchor}>
            <SystemSection primary="Flow. " accent="Make rules and handoffs executable.">
              <div className={styles.split}>
                <div className={styles.copy}>
                  <h3>Move work forward, consistently.</h3>
                  <p>
                    Flow turns status changes, assignments, approvals and exceptions into workflows that teams can see
                    and follow.
                  </p>
                  <p>
                    Actions create change. Transitions define what can happen next. Events record what happened. People
                    stay involved where judgment is required, and repeatable work follows clear rules.
                  </p>
                </div>
                <div className={styles.visual}>
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
                </div>
              </div>
            </SystemSection>
          </div>
          <div id="atlas" className={styles.anchor}>
            <SystemSection primary="Atlas. " accent="Keep context attached to the work.">
              <div className={styles.split}>
                <div className={styles.copy}>
                  <h3>The information to act with confidence.</h3>
                  <p>
                    Atlas brings the operating knowledge, history and relationships people need into the context of each
                    record.
                  </p>
                  <p>
                    Today, Atlas keeps context connected to your work. As the platform evolves, this reliable
                    operational model becomes the foundation for increasingly autonomous operations.
                  </p>
                </div>
                <div className={styles.visual}>
                  <ContextView />
                </div>
              </div>
            </SystemSection>
          </div>
          <div id="data-ownership" className={styles.anchor}>
            <SystemSection primary="Your data belongs to your company. " accent="You can export it at any time.">
              <div className={styles.ownership}>
                <div className={styles.copy}>
                  <h3>Your operation. Your information.</h3>
                  <p>
                    Your company owns the data it brings into Superspace and the operational data it creates while using
                    the platform. You can export your data at any time, including if you decide to move on.
                  </p>
                  <p>
                    Our job is to make that information useful: well structured, connected to your workflows, and
                    supported by a service your team can rely on. We want you to stay because Superspace keeps
                    delivering value.
                  </p>
                </div>
                <dl className={styles.principles}>
                  <div>
                    <dt>Owned by you</dt>
                    <dd>Your company retains ownership of its data.</dd>
                  </div>
                  <div>
                    <dt>Available to export</dt>
                    <dd>Take your data with you whenever you need it.</dd>
                  </div>
                  <div>
                    <dt>More useful together</dt>
                    <dd>Structure and service that help your operation work better every day.</dd>
                  </div>
                </dl>
              </div>
            </SystemSection>
          </div>
          <SystemSection
            primary="From operating map "
            accent="to everyday software."
            action={{ label: "Explore deployment", href: "/deployment" }}
          >
            <div className={styles.process}>
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
            </div>
          </SystemSection>
        </div>
      </main>
      <Footer />
    </HeaderThemeScope>
  );
}

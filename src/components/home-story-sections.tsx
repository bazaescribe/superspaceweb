import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { BookingLink } from "@/components/booking-link";
import { Reveal } from "@/components/reveal";
import { HeaderThemeRegion } from "@/components/header-theme";
import { ShapeSystemCard } from "@/components/shape-system-card";
import { WorkOrbitCard } from "@/components/work-orbit-card";
import { ConnectBlockCard } from "@/components/connect-block-card";

export type StoryCardProps = {
  title: string;
  description: string;
  eyebrow?: string;
  visual?: ReactNode;
  visualVariant?: "quiet" | "dark";
};

export function StoryCard({ title, description, eyebrow, visual, visualVariant = "quiet" }: StoryCardProps) {
  const dark = visualVariant === "dark";

  return (
    <article
      className={`flex h-full min-w-0 flex-col overflow-hidden rounded-[12px] ${dark ? "bg-[#080808]" : "bg-surface"}`}
    >
      <div className="relative aspect-square w-full overflow-hidden" aria-hidden={visual ? undefined : true}>
        {visual ?? (
          <div
            className={`absolute left-1/2 top-1/2 size-[98px] -translate-1/2 ${dark ? "bg-[#222]" : "bg-[#d9d9d9]"}`}
          />
        )}
      </div>
      <div className="flex min-h-[115px] flex-col justify-start p-8 max-[45rem]:min-h-0 max-[45rem]:p-6">
        {eyebrow ? (
          <span className={`mb-2 text-[11px] uppercase tracking-[0.1em] ${dark ? "text-inverse-muted" : "text-muted"}`}>
            {eyebrow}
          </span>
        ) : null}
        <p className={`text-[14px] leading-normal tracking-[0.01em] ${dark ? "text-inverse-muted" : "text-muted"}`}>
          <strong className={`font-normal ${dark ? "text-inverse" : "text-foreground"}`}>{title} </strong>
          {description}
        </p>
      </div>
    </article>
  );
}

const pillars: StoryCardProps[] = [
  {
    title: "Everything has a place.",
    description:
      "Customers, orders, projects, assets, and every other part of your operation live in one connected model.",
  },
  {
    title: "Everything stays connected.",
    description:
      "Superspace understands how your business fits together, keeping context consistent across teams and workflows.",
  },
  {
    title: "Everything can move.",
    description:
      "Turn operational knowledge into workflows, automations, and intelligent actions your team can actually use.",
  },
];

const implementationSteps: StoryCardProps[] = [
  {
    title: "Map the operation.",
    description: "We learn the people, information, rules, and handoffs behind the work you need to improve.",
    visual: (
      <Image
        src="/assets/figma/illustration/Map.svg"
        alt="A visual map of an operation"
        fill
        sizes="(max-width: 720px) 100vw, 33vw"
      />
    ),
  },
  {
    title: "Shape the system.",
    description: "We configure your connected model, workflows, access, and automation around the way your team works.",
    visual: (
      <Image
        src="/assets/figma/implementation/shape-system.png"
        alt="A connected operational system"
        fill
        sizes="(max-width: 720px) 100vw, 33vw"
      />
    ),
  },
  {
    title: "Put it to work.",
    description:
      "Your team starts with working software while we continue to operate and evolve the platform behind it.",
    visual: (
      <Image
        src="/assets/figma/implementation/put-to-work.png"
        alt="An active automated workflow"
        fill
        sizes="(max-width: 720px) 100vw, 33vw"
      />
    ),
  },
];

const implementationLinks = [
  { label: "About the platform", href: "/platform" },
  { label: "Explore offerings", href: "/solutions" },
  { label: "FAQ", href: null },
  { label: "Download Brochure", href: null },
  { label: "About us", href: "/company" },
];

export function PillarsSection() {
  return (
    <section className="shell mt-section" aria-labelledby="pillars-title">
      <Reveal>
        <h2 id="pillars-title" className="section-heading">
          Your business is already a system.{" "}
          <span>
            Superspace makes it explicit by connecting the things you manage, the relationships between them, and the
            actions that move your operation forward.
          </span>
        </h2>
      </Reveal>
      <div className="mt-10 grid grid-cols-3 gap-1 max-[45rem]:mt-6 max-[45rem]:grid-cols-1 max-[45rem]:gap-4">
        {pillars.map((card, index) => (
          <Reveal className="h-full" key={card.title} delay={index * 0.06}>
            <StoryCard {...card} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}

export function ImplementationSection() {
  return (
    <HeaderThemeRegion tone="dark" className="implementation-section mt-section" aria-labelledby="implementation-title">
      <div className="shell">
        <Reveal>
          <h2 id="implementation-title" className="section-heading">
            From operational challenge to working software.{" "}
            <span>
              We work with your team to understand the operation, configure the platform, and launch a system your
              people can use from day one.
            </span>
          </h2>
        </Reveal>
        <div className="mt-10 grid grid-cols-3 gap-1 max-[45rem]:mt-6 max-[45rem]:grid-cols-1 max-[45rem]:gap-4">
          {implementationSteps.map((card, index) => (
            <Reveal className="h-full" key={card.title} delay={index * 0.06}>
              {index === 0 ? (
                <ShapeSystemCard title={card.title} description={card.description} />
              ) : index === 2 ? (
                <WorkOrbitCard title={card.title} description={card.description} />
              ) : (
                <ConnectBlockCard title={card.title} description={card.description} />
              )}
            </Reveal>
          ))}
        </div>
        <Reveal className="implementation-links" delay={0.08}>
          <h3>Want to learn more?</h3>
          <nav aria-label="Learn more about Superspace">
            {implementationLinks.map((item) =>
              item.href ? (
                <Link href={item.href} key={item.label}>
                  {item.label}
                </Link>
              ) : (
                <span aria-disabled="true" key={item.label}>
                  {item.label}
                </span>
              ),
            )}
          </nav>
        </Reveal>
      </div>
    </HeaderThemeRegion>
  );
}

export function StartCtaSection() {
  return (
    <section className="start-cta" aria-labelledby="start-cta-title">
      <Reveal className="max-w-[720px]">
        <h2 id="start-cta-title">
          Your operation already knows what it needs. <span>Let’s build the software around it.</span>
        </h2>
        <p>
          Bring us a workflow that depends on spreadsheets, disconnected tools, or too much manual coordination.
          We&apos;ll explore what it could become on Superspace.
        </p>
        <BookingLink className="mt-5" placement="home_start_cta" label="Let’s talk" designIcon />
      </Reveal>
    </section>
  );
}

import Image from "next/image";
import { ArrowUpRight, ChevronDown } from "lucide-react";
import { Brand, Header } from "@/components/header";
import { OperationShowcase, UseCaseAccordion } from "@/components/use-case-accordion";
import { bookingUrl, footerGroups } from "@/lib/site";

const clientLogos = [
  { name: "DEV.F", src: "/assets/figma/logos/devf.svg", height: 17.69 },
  { name: "Aliada", src: "/assets/figma/logos/aliada.svg", height: 18 },
  { name: "Liverpool", src: "/assets/figma/logos/liverpool.png", height: 19 },
  { name: "Tecel", src: "/assets/figma/logos/tecel.png", height: 18 },
  { name: "Microsoft", src: "/assets/figma/logos/microsoft.png", height: 17 },
  { name: "Homely", src: "/assets/figma/logos/homely.png", height: 20 },
  { name: "Essity", src: "/assets/figma/logos/essity.png", height: 20 },
  { name: "Conduself", src: "/assets/figma/logos/conduself.png", height: 47 },
] as const;

function Arrow() {
  return <ArrowUpRight aria-hidden="true" className="arrow" size={14} strokeWidth={1.5} />;
}

function BookingLink({ inverse = false }: { inverse?: boolean }) {
  const external = bookingUrl.startsWith("http");
  return (
    <a
      className={`cta ${inverse ? "cta--inverse" : ""}`}
      href={bookingUrl}
      {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
    >
      Build your company OS <Arrow />
    </a>
  );
}

function SectionIntro({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="section-intro">
      <h2>{title}</h2>
      <p>{children}</p>
    </div>
  );
}

export default function Home() {
  return (
    <div className="site-v2">
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <Header />
      <main id="main-content">
        <section className="hero shell v2-hero" id="top">
          <div className="v2-hero__copy">
            <h1>The ops platform built around how your business works.</h1>
            <p>
              Tell us what’s getting difficult to operate and Superspace turns it into software your team can use every
              day.
            </p>
            <BookingLink />
          </div>
          <div className="v2-product-card">
            <Image
              className="v2-product-card__metal"
              src="/assets/chromatic-metal-1.png"
              alt=""
              fill
              priority
              sizes="(max-width: 768px) 100vw, 1440px"
            />
            <Image
              className="v2-product-card__screen"
              src="/assets/figma/hero-challenges.png"
              alt="Superspace challenge workspace"
              width={1287}
              height={820}
              priority
            />
          </div>
        </section>

        <section className="v2-use-cases shell" aria-labelledby="use-cases-title">
          <SectionIntro title="Start with the operation that needs fixing.">
            You don’t need to move your entire business to SuperSpace. Start with one part that has become difficult to
            run with spreadsheets, messages, manual work, or software that no longer fits.
          </SectionIntro>
          <UseCaseAccordion />
          <p className="v2-use-cases__prompt">
            Your operation look any different? <a href="#conversation">Let’s talk.</a>
          </p>
        </section>

        <section className="v2-operation shell" id="platform" aria-labelledby="operation-title">
          <OperationShowcase />
        </section>

        <section className="v2-proof shell" id="company">
          <SectionIntro title="Built by people who’ve shipped this before.">
            Our team has built and scaled infrastructure across early-stage startups, high-growth scale-ups, and global
            enterprises.
          </SectionIntro>
          <div className="v2-logo-strip" role="list" aria-label="Companies our team has worked with">
            {clientLogos.map((logo) => (
              <div className="v2-logo-card" key={logo.name} role="listitem">
                <Image
                  className="v2-logo-card__image"
                  src={logo.src}
                  alt={logo.name}
                  width={80}
                  height={logo.height}
                  sizes="80px"
                />
              </div>
            ))}
          </div>
        </section>

        <section className="v2-conversation shell" id="conversation">
          <Image src="/assets/chromatic-metal-2.png" alt="" fill sizes="(max-width: 768px) 100vw, 1440px" />
          <div className="v2-conversation__copy">
            <h2>
              Show us how your
              <br />
              company operates.
            </h2>
            <p>We’ll map your operation and show you what it could look like as one system.</p>
            <BookingLink inverse />
          </div>
        </section>
      </main>
      <footer className="v2-footer shell">
        <div className="v2-footer__top">
          <div className="v2-footer__identity">
            Superspace Industries
            <br />
            Ontology Systems for Autonomous Operations
            <br />
            Mexico City / MX
            <br />
            Est. 2024
          </div>
          {footerGroups.map((group) => (
            <div className="v2-footer__group" key={group.title}>
              <span>{group.title}</span>
              {group.links.map((link) => (
                <a href="#top" key={link}>
                  {link}
                </a>
              ))}
            </div>
          ))}
          <div className="v2-footer__actions">
            <span className="social-dots" aria-label="Social links coming soon">
              <i />
              <i />
              <i />
            </span>
            <span className="language">
              English <ChevronDown aria-hidden="true" size={12} strokeWidth={1.5} />
            </span>
          </div>
        </div>
        <Brand large />
      </footer>
    </div>
  );
}

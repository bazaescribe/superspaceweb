import Image from "next/image";
import { ArrowUpRight, ChevronDown } from "lucide-react";
import { Brand, Header } from "@/components/header";
import { FooterElasticField } from "@/components/footer-elastic-field";
import { HeroMockup } from "@/components/hero-mockup";
import { Reveal } from "@/components/reveal";
import { IndustriesAccordion, OperationsGrid, PlatformShowcase } from "@/components/use-case-accordion";
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
            <h1>
              One platform to rule your operation.{" "}
              <span>
                Operational Software tailored to how your business actually works – without building and maintaining
                custom infrastructure yourself.
              </span>
            </h1>
            <div className="hero-actions">
              <a className="hero-action hero-action--secondary" href="#platform">
                See how it works
              </a>
              <a
                className="hero-action"
                href={bookingUrl}
                {...(bookingUrl.startsWith("http") ? { target: "_blank", rel: "noreferrer" } : {})}
              >
                Talk to us <Arrow />
              </a>
            </div>
          </div>
          <HeroMockup />
        </section>

        <PlatformShowcase />
        <OperationsGrid />
        <IndustriesAccordion />

        <section className="v2-proof shell" id="company">
          <Reveal>
            <h2 className="section-heading">
              Built by people who’ve shipped this before.{" "}
              <span>
                We’ve built and scaled infrastructure across early-stage startups, high-growth scale-ups, and global
                enterprises.
              </span>
            </h2>
          </Reveal>
          <Reveal className="v2-logo-strip" delay={0.08} role="list" aria-label="Companies our team has worked with">
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
          </Reveal>
        </section>

        <section className="v2-conversation shell" id="conversation">
          <Image src="/assets/figma/conversation-background.png" alt="" fill sizes="(max-width: 768px) 100vw, 1280px" />
          <Reveal className="v2-conversation__copy">
            <h2>
              Show us how your company operates.{" "}
              <span>We&apos;ll map your operation and show you what it could look like as one system.</span>
            </h2>
            <BookingLink inverse />
          </Reveal>
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
      <FooterElasticField />
    </div>
  );
}

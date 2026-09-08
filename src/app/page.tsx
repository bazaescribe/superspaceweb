import Image from "next/image";
import Link from "next/link";
import { Brand, Header } from "@/components/header";
import { FooterElasticField } from "@/components/footer-elastic-field";
import { HeroMockup } from "@/components/hero-mockup";
import { Reveal } from "@/components/reveal";
import { IndustriesAccordion, OperationsGrid, PlatformShowcase } from "@/components/use-case-accordion";
import { BookingLink } from "@/components/booking-link";
import { ImplementationSection, PillarsSection } from "@/components/home-story-sections";
import { footerGroups } from "@/lib/site";
import { HeaderThemeScope } from "@/components/header-theme";

export default function Home() {
  return (
    <HeaderThemeScope className="site-v2">
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <Header />
      <main id="main-content">
        <section className="hero shell v2-hero" id="top">
          <div className="v2-hero__copy">
            <h1>The operating system for growing your business.</h1>
            <p>
              Manage your people, work and rules in a flexible and scalable platform.
              <br />
              Without building and maintaining custom software yourself.
            </p>
            <div className="hero-actions">
              <a className="button button--secondary" href="#platform">
                See how it works
              </a>
              <BookingLink />
            </div>
          </div>
          <HeroMockup />
        </section>

        <PillarsSection />
        <PlatformShowcase />
        <ImplementationSection />
        {/* <OperationsGrid />
        <IndustriesAccordion /> */}

        {/* <section className="v2-proof shell" id="company">
          <Reveal>
            <h2 className="section-heading">
              Built by people who’ve shipped this before.{" "}
              <span>
                We’ve built and scaled operational infrastructure across early-stage startups, high-growth scale-ups,
                and global enterprises.
              </span>
            </h2>
          </Reveal>
          <Reveal className="v2-proof-signal" delay={0.08}>
            <div className="v2-proof-signal__intro">
              <span>Early stage, by design</span>
              <h3>Proving the model in real operations.</h3>
              <p>
                We are working with our first design partners one operational system at a time. We’ll publish customer
                evidence when the work is ready—not before.
              </p>
              <Link href="/company">
                Meet the thinking behind Superspace <span aria-hidden="true">↗</span>
              </Link>
            </div>
            <div className="v2-proof-signal__metrics" aria-label="Superspace company signals">
              <div>
                <strong>01</strong>
                <span>Focused operation to start</span>
              </div>
              <div>
                <strong>15–50</strong>
                <span>Person teams in our initial focus</span>
              </div>
              <div>
                <strong>LATAM / US</strong>
                <span>Markets we are learning with</span>
              </div>
            </div>
          </Reveal>
        </section> */}

        {/* <section className="v2-conversation shell" id="conversation">
          <Image src="/assets/figma/conversation-background.png" alt="" fill sizes="(max-width: 768px) 100vw, 1280px" />
          <Reveal className="v2-conversation__copy">
            <h2>
              Show us how your company operates.{" "}
              <span>We&apos;ll map your operation and show how it can run as one system.</span>
            </h2>
            <BookingLink inverse className="conversation-cta" />
          </Reveal>
        </section> */}
      </main>
      <footer className="v2-footer shell">
        <div className="v2-footer__top">
          <div className="v2-footer__identity">
            Superspace Industries
            <br />
            Operational Software for Growing Companies
            <br />
            Mexico City / MX
            <br />
            Est. 2024
          </div>
          {footerGroups.map((group) => (
            <div className="v2-footer__group" key={group.title}>
              <span>{group.title}</span>
              {group.links.map((link) => (
                <Link href={link.href} key={link.href}>
                  {link.label}
                </Link>
              ))}
            </div>
          ))}
          <div className="v2-footer__actions">
            <span className="language">English · Español soon</span>
          </div>
        </div>
        <Brand large />
      </footer>
      <FooterElasticField />
    </HeaderThemeScope>
  );
}

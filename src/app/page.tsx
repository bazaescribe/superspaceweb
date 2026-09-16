import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { HeroMockup } from "@/components/hero-mockup";
import { PlatformShowcase } from "@/components/use-case-accordion";
import { BookingLink } from "@/components/booking-link";
import { ImplementationSection, PillarsSection, StartCtaSection } from "@/components/home-story-sections";
import { HeaderThemeScope } from "@/components/header-theme";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Superspace — Operational software for growing companies",
  description:
    "Superspace models your people, work, and business rules as one flexible operational system—without the burden of custom software.",
  path: "/",
  absoluteTitle: true,
});

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
            <h1>Software for operations heavy organizations.</h1>
            <p>
              Superspace turns the people, assets, workflows, permissions, and rules behind real world operations into
              one executable system.
            </p>
            <div className="hero-actions">
              <a className="button button--secondary" href="#platform">
                How it works?
              </a>
              <BookingLink placement="home_hero" label="Let’s talk" designIcon />
            </div>
          </div>
          <HeroMockup />
        </section>

        <PillarsSection />
        <PlatformShowcase />
        <ImplementationSection />
        <StartCtaSection />
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
      <Footer />
    </HeaderThemeScope>
  );
}

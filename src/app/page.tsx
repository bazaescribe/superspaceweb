import Image from "next/image";
import { Brand, Header } from "@/components/header";
import { ComparisonDemo, IndustryTabs } from "@/components/interactive-sections";
import { bookingUrl, footerGroups, platformPillars } from "@/lib/site";

function Arrow() { return <span aria-hidden="true" className="arrow">↗</span>; }

function BookingLink({ inverse = false }: { inverse?: boolean }) {
  const external = bookingUrl.startsWith("http");
  return <a className={`cta ${inverse ? "cta--inverse" : ""}`} href={bookingUrl} {...(external ? { target: "_blank", rel: "noreferrer" } : {})}>Build your company OS <Arrow /></a>;
}

function SectionIntro({ title, children }: { title: string; children: React.ReactNode }) {
  return <div className="section-intro"><h2>{title}</h2><p>{children}</p></div>;
}

export default function Home() {
  return (
    <>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <Header />
      <main id="main-content">
        <section className="hero shell" id="top">
          <div className="hero__copy"><h1>Operational Infrastructure for scaling your business.<br />The intelligent platform that evolves with you.</h1><BookingLink /></div>
          <div className="hero__visual reveal">
            <Image className="hero__spectrum" src="/assets/raw-06.jpg" alt="" fill priority sizes="(max-width: 768px) 100vw, 1440px" />
            <div className="hero-window hero-window--left"><span>Workspaces</span><b>Operations hub</b><i /><i /><i /></div>
            <div className="hero-window hero-window--main"><span>General channel</span><b>What needs attention today?</b><p>Updates are connected to the work, people and decisions around them.</p><i /><i /></div>
            <div className="hero-window hero-window--right"><span>Delivery channel</span><b>Exceptions and next steps</b><i /><i /><i /></div>
          </div>
        </section>

        <section className="section shell"><SectionIntro title="Your operation outgrows your tools.">As you scale, spreadsheets, SaaS, internal tools and manual processes start turning into infrastructure your team has to manage.</SectionIntro><ComparisonDemo /></section>

        <section className="section shell"><SectionIntro title="Different businesses. Same problem.">Customers, workforce, projects, orders, payments and processes, connected around the way your company works.</SectionIntro><IndustryTabs /></section>

        <section className="proof shell" id="company"><SectionIntro title="Built by people who’ve shipped this before.">Our team has built and scaled infrastructure across early-stage startups, high-growth scale-ups, and global enterprises.</SectionIntro><div className="logo-strip" aria-label="Companies our team has worked with"><strong>DEV.F</strong><strong>aliada</strong><strong>liverpool</strong><strong>tecel</strong><strong>Microsoft</strong><strong>Oaxaca</strong><strong>HOMELY</strong><strong>essity</strong></div></section>

        <section className="section shell" id="platform"><SectionIntro title="Your company becomes the model.">A modern, modular infrastructure purpose-built to replace fragmented subscriptions and costly custom builds. Here’s what makes it work.</SectionIntro><div className="pillar-grid">{platformPillars.map((pillar) => <article className="pillar-card" id={pillar.id} key={pillar.id}><div className="pillar-card__scene"><span>{pillar.number}</span><div className={`orb orb--${pillar.id}`} /><div className="pillar-card__grid" /></div><div className="pillar-card__copy"><h3>{pillar.title}</h3><p>{pillar.description}</p></div></article>)}</div></section>

        <section className="section shell"><SectionIntro title="Why superspace?">Not another subscription. Not another custom build. A living operations system.</SectionIntro><div className="promise-grid"><article className="promise-card"><Image src="/assets/raw-03.png" alt="A craftsperson cutting material with precision" fill sizes="(max-width: 700px) 100vw, 50vw" /><div className="image-shade" /><div className="promise-card__copy"><h3>Fits like custom software. Runs like a platform.</h3><p>You get a system tailored to your operation without owning another internal software project.</p></div></article><article className="promise-card"><Image src="/assets/raw-15.png" alt="A high-contrast lunar surface" fill sizes="(max-width: 700px) 100vw, 50vw" /><div className="image-shade" /><div className="promise-card__copy"><h3>You run your company. We deal with the boring parts.</h3><p>No infrastructure to manage. No custom deployments. No internal platform your team has to maintain. Fully managed and continuously evolving.</p></div></article></div></section>

        <section className="conversation shell" id="conversation"><Image src="/assets/raw-06.jpg" alt="" fill sizes="(max-width: 768px) 100vw, 1440px" /><div className="conversation__shade" /><div className="conversation__copy"><h2>Show us how your<br />company operates.</h2><p>We’ll map your operation and show you what it could look like as one system.</p><BookingLink inverse /></div></section>
      </main>
      <footer className="footer shell"><div className="footer__line" /><div className="footer__top"><div className="footer__identity"><p>Superspace Industries<br />Ontology Systems for Autonomous Operations<br />Mexico City / MX<br />Est. 2024</p></div>{footerGroups.map((group) => <div className="footer__group" key={group.title}><b>{group.title}</b>{group.links.map((link) => <span key={link}>{link}</span>)}</div>)}<div className="footer__actions"><span className="social-dots" aria-label="Social links coming soon"><i /><i /><i /></span><span className="language">English⌄</span></div></div><Brand large /></footer>
    </>
  );
}

import { EntranceHeading } from "./entrance-heading";
import Link from "next/link";
import { FooterReveal, FooterWordmark } from "@/components/footer-wordmark";
import { footerGroups } from "@/lib/site";
import { BookingLink } from "./booking-link";
import { SectionBuffer } from "@/components/section-system";

export function Footer() {
  return (
    <FooterReveal>
      <footer className="v2-footer shell">
        <div className="footer-cta">
          <EntranceHeading>Your business deserves its own Superspace.</EntranceHeading>
          <p>Tell us how your business runs. Let’s explore how Superspace can become its operating system.</p>
          <div className="hero-actions">
            <BookingLink placement="footer" label="Let’s talk" designIcon inverse />
            <Link className="button button--secondary" href="/deployment">
              Explore deployment
            </Link>
          </div>
        </div>
        <div className="v2-footer__top">
          {footerGroups.map((group) => (
            <nav className="v2-footer__group" aria-label={group.title} key={group.title}>
              <h2 className="v2-footer__label">{group.title}</h2>
              {group.links.map((link) => (
                <Link href={link.href} key={link.label}>
                  {link.label}
                </Link>
              ))}
            </nav>
          ))}
          <div className="v2-footer__actions">
            <p>
              Superspace Intelligent Industries.
              <br />
              Operational infrastructure for growing businesses.
              <br />
              Mexico City, MX.
              <br />
              Est. 2024. 2026 All Rights Reserved.
            </p>
            <div className="v2-footer__legal">
              <Link href="/terms">Services Agreement</Link>
              <Link href="/privacy">Privacy Policy</Link>
              <Link href="/llms.txt">LLMs</Link>
            </div>
            <span className="language" aria-label="Current language: English">
              English <span>Español</span> <span>Português</span> <span>日本語</span>
            </span>
          </div>
        </div>
        <FooterWordmark />
      </footer>
      <SectionBuffer />
    </FooterReveal>
  );
}

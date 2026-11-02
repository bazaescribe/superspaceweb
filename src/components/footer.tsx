import { EntranceHeading } from "./entrance-heading";
import Link from "next/link";
import { FooterReveal, FooterWordmark } from "@/components/footer-wordmark";
import { footerGroups } from "@/lib/site";
import { BookingLink } from "./booking-link";
import { SectionBuffer } from "@/components/section-system";

export type FooterCta = {
  title: string;
  text: string;
  label?: string;
  subject?: string;
  placement?: string;
  secondary?: { label: string; href: string };
};

const defaultCta: FooterCta = {
  title: "Your business deserves its own Superspace.",
  text: "Tell us how your business runs. We’ll show you how Superspace could become its operating system.",
  secondary: { label: "Explore deployment", href: "/deployment" },
};

/** Pages with their own closing argument can replace the shared footer call to action. */
export function Footer({ cta = defaultCta }: { cta?: FooterCta }) {
  return (
    <FooterReveal>
      <footer className="v2-footer shell">
        <div className="footer-cta">
          <EntranceHeading>{cta.title}</EntranceHeading>
          <p>{cta.text}</p>
          <div className="hero-actions">
            <BookingLink
              placement={cta.placement ?? "footer"}
              label={cta.label}
              subject={cta.subject}
              designIcon
              inverse
            />
            {cta.secondary && (
              <Link className="button button--secondary" href={cta.secondary.href}>
                {cta.secondary.label}
              </Link>
            )}
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
              <Link href="/terms">Website Terms</Link>
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

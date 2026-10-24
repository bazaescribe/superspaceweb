import { LanguageSelector } from "./language-selector";

import { useCopy } from "@/i18n/copy";
import { EntranceHeading } from "./entrance-heading";
import { Link } from "@/i18n/navigation";
import { FooterReveal, FooterWordmark } from "@/components/footer-wordmark";
import { footerGroups } from "@/lib/site";
import { BookingLink } from "./booking-link";
import { SectionBuffer } from "@/components/section-system";

export function Footer() {
  const localizeCopy = useCopy();
  return (
    <FooterReveal>
      <footer className="v2-footer shell">
        <div className="footer-cta">
          <EntranceHeading>{localizeCopy("Your business deserves its own Superspace.")}</EntranceHeading>
          <p>
            {localizeCopy(
              "Tell us how your business runs. Let’s explore how Superspace can become its operating system.",
            )}
          </p>
          <div className="hero-actions">
            <BookingLink placement="footer" label={localizeCopy("Let’s talk")} designIcon inverse />
            <Link className="button button--secondary" href="/deployment">
              {localizeCopy("Explore deployment")}
            </Link>
          </div>
        </div>
        <div className="v2-footer__top">
          {footerGroups.map((group) => (
            <nav className="v2-footer__group" aria-label={localizeCopy(group.title)} key={group.title}>
              <h2 className="v2-footer__label">{localizeCopy(group.title)}</h2>
              {group.links.map((link) => (
                <Link href={link.href} key={link.label}>
                  {localizeCopy(link.label)}
                </Link>
              ))}
            </nav>
          ))}
          <div className="v2-footer__actions">
            <p>
              {localizeCopy("Superspace Intelligent Industries.")}
              <br />
              {localizeCopy("Operational infrastructure for growing businesses.")}
              <br />
              {localizeCopy("Mexico City, MX.")}
              <br />
              {localizeCopy("Est. 2024. 2026 All Rights Reserved.")}
            </p>
            <div className="v2-footer__legal">
              <Link href="/terms">{localizeCopy("Website Terms")}</Link>
              <Link href="/privacy">{localizeCopy("Privacy Policy")}</Link>
              <a href="/llms.txt">{localizeCopy("LLMs")}</a>
            </div>
            <LanguageSelector />
          </div>
        </div>
        <FooterWordmark />
      </footer>
      <SectionBuffer />
    </FooterReveal>
  );
}

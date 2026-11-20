import { useCopy } from "@/i18n/copy";
import { EntranceHeading } from "./entrance-heading";
import { Link } from "@/i18n/navigation";
import { LanguageSelector } from "./language-selector";
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
  title: "Let’s make software work around your business.",
  text: "See how Superspace can support your operations in a 20-minute demo.",
  secondary: { label: "See how it works", href: "/how-it-works" },
};

/** Pages with their own closing argument can replace the shared footer call to action. */
export function Footer({ cta = defaultCta }: { cta?: FooterCta | null }) {
  const localizeCopy = useCopy();
  return (
    <FooterReveal>
      <footer className="v2-footer shell">
        {cta && (
          <div className="footer-cta">
            <EntranceHeading>{localizeCopy(cta.title)}</EntranceHeading>
            <p>{localizeCopy(cta.text)}</p>
            <div className="hero-actions">
              <BookingLink
                placement={cta.placement ?? "footer"}
                label={cta.label && localizeCopy(cta.label)}
                subject={cta.subject}
                designIcon
                inverse
              />
              {cta.secondary && (
                <Link className="button button--secondary" href={cta.secondary.href}>
                  {localizeCopy(cta.secondary.label)}
                </Link>
              )}
            </div>
          </div>
        )}
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

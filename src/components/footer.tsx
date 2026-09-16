import Link from "next/link";
import Image from "next/image";
import { Brand } from "@/components/header";
import { FooterElasticField } from "@/components/footer-elastic-field";
import { footerGroups } from "@/lib/site";

export function Footer() {
  return (
    <div className="site-footer">
      <footer className="v2-footer shell">
        <div className="v2-footer__top">
          <div className="v2-footer__identity">
            Superspace Ontology Systems
            <br />
            Operational Software for Growing Companies
            <br />
            Mexico City / MX
            <br />
            Est. 2024
          </div>
          {footerGroups.map((group) => (
            <nav className="v2-footer__group" aria-label={group.title} key={group.title}>
              {group.links.map((link) =>
                link.href ? (
                  <Link href={link.href} key={link.label}>
                    {link.label}
                  </Link>
                ) : (
                  <span aria-disabled="true" key={link.label}>
                    {link.label}
                  </span>
                ),
              )}
            </nav>
          ))}
          <div className="v2-footer__actions">
            <span className="language" aria-label="Current language: English">
              English
              <Image src="/brand/language-chevron.svg" alt="" width={14} height={14} />
            </span>
          </div>
        </div>
        <Brand large />
      </footer>
      <FooterElasticField />
    </div>
  );
}

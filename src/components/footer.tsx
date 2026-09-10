import Link from "next/link";
import { Brand } from "@/components/header";
import { FooterElasticField } from "@/components/footer-elastic-field";
import { footerGroups } from "@/lib/site";

export function Footer() {
  return (
    <div className="site-footer">
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
    </div>
  );
}

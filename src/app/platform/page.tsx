import { SiteHero } from "@/components/site-hero";
import { PlatformArchitecture } from "@/components/platform-architecture";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { HeaderThemeScope } from "@/components/header-theme";
import { BookingLink } from "@/components/booking-link";
import { SystemSection } from "@/components/section-system";
import styles from "./platform.module.css";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Operational software platform",
  description:
    "Model your operation, give every team a shared workspace, and let Superspace handle the infrastructure behind your business.",
  path: "/platform",
});

const infrastructure = [
  { icon: "9bb4a", title: "Tenant isolation", copy: "Each organization runs in its own secure workspace." },
  { icon: "05dd5", title: "Role based access", copy: "Control visibility and actions by role and responsibility." },
  {
    icon: "3b069",
    title: "Managed infrastructure",
    copy: "Hosting, runtime and infrastructure are handled by Superspace.",
    tone: "blue",
  },
  { icon: "13f59", title: "Managed database", copy: "Your data lives in a structured, maintained system of record." },
  {
    icon: "aaad9",
    title: "Your data is yours",
    copy: "Export your business data whenever you need it.",
    tone: "indigo",
  },
  { icon: "02c65", title: "Audit trail", copy: "Keep a clear record of meaningful changes and operational actions." },
  {
    icon: "cdd77",
    title: "API & Integrations",
    copy: "Connect existing tools and extend Superspace into your stack.",
    comingSoon: true,
  },
  { icon: "7d1da", title: "Backups & recovery", copy: "Built in protection for critical operational data." },
  { icon: "0b045", title: "Automations", copy: "Run workflows automatically as operational state changes." },
  {
    icon: "2e4ee",
    title: "Scalable by design",
    copy: "Grow your data, users and processes without changing platforms.",
  },
  {
    icon: "a2c43",
    title: "Fine grained permissions",
    copy: "Define access down to the right people, objects and actions.",
  },
  {
    icon: "7a5f0",
    title: "Continuously improving",
    copy: "Superspace maintains the underlying system as the platform evolves.",
    tone: "yellow",
  },
];

export default function PlatformPage() {
  return (
    <HeaderThemeScope className={`site-v2 ${styles.page}`}>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <Header />
      <main id="main-content">
        <SiteHero
          variant="platform"
          title="A working space for your business to operate on."
          intro="Superspace is a cloud based solution that manages objects, rules, permissions and automations so you can focus on the things that really matter to your organization."
          actions={
            <>
              <BookingLink placement="platform_hero" label="See it in action" designIcon />
              <a className="button button--secondary" href="#model">
                How it works?
              </a>
            </>
          }
        />
        <PlatformArchitecture />
        <div className={`v24-spine ${styles.sections}`}>
          <SystemSection primary="Everything modern businesses need." accent="Ready by design.">
            <div className={styles.infrastructure}>
              {infrastructure.map(({ icon, title, copy, tone, comingSoon }) => (
                <article className={`${styles.capability} ${tone ? styles[tone] : ""}`} key={title}>
                  <div className={styles.cardHeader}>
                    {/* Keep the exported SVG's intrinsic dimensions. */}
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={`/assets/figma/platform/${icon}.svg`} alt="" />
                    {comingSoon && <span className={styles.comingSoon}>Coming Soon</span>}
                  </div>
                  <div>
                    <h3>{title}</h3>
                    <p>{copy}</p>
                  </div>
                </article>
              ))}
            </div>
          </SystemSection>
        </div>
      </main>
      <Footer />
    </HeaderThemeScope>
  );
}

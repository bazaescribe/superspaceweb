import { setRequestLocale } from "next-intl/server";

import { useCopy } from "@/i18n/copy";
import { HeroHeading } from "@/components/entrance-heading";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { HeaderThemeScope } from "@/components/header-theme";
import { createPageMetadata } from "@/i18n/metadata";
export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return createPageMetadata({
    title: "Careers",
    description: "The next chapter needs more builders.",
    path: "/careers",
  });
}
function CareersPage() {
  const localizeCopy = useCopy();
  return (
    <HeaderThemeScope defaultTone="dark" data-theme="dark" className="site-v2 dark-redesign">
      <a className="skip-link" href="#main-content">
        {localizeCopy("Skip to content")}
      </a>
      <Header />
      <main id="main-content" className="careers-content shell">
        <HeroHeading>{localizeCopy("The next chapter needs more builders.")}</HeroHeading>
        <div>
          <p>
            {localizeCopy("We&apos;re a small team building ambitious technology to change how businesses operate.")}
          </p>
          <p>
            {localizeCopy(
              "Right now, we&apos;re focused on bringing our platform into the real world, working closely with our first partners, and learning everything we can.",
            )}
          </p>
          <p>
            <strong>{localizeCopy("We don&apos;t have any open positions today.")}</strong>
          </p>
          <p>
            {localizeCopy(
              "But if our mission resonates with you, we&apos;d love to hear from you. As Superspace grows, we hope to bring together engineers, designers, implementation specialists, and people who love turning complicated problems into remarkably simple experiences.",
            )}
          </p>
          <p>
            {localizeCopy("Write us an email to")}{" "}
            <a href="mailto:careers@superspace.cc">
              <strong>{localizeCopy("careers@superspace.cc")}</strong>
            </a>{" "}
            {localizeCopy(
              "if you&apos;d like to hear about future opportunities. No application, no expectation, and no promises. Just an open door.",
            )}
          </p>
        </div>
      </main>
      <Footer />
    </HeaderThemeScope>
  );
}

export default async function LocalizedPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <CareersPage />;
}

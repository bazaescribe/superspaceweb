import { HeroHeading } from "@/components/entrance-heading";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { HeaderThemeScope } from "@/components/header-theme";
import { createPageMetadata } from "@/lib/seo";
export const metadata = createPageMetadata({
  title: "Careers",
  description: "The next chapter needs more builders.",
  path: "/careers",
});
export default function CareersPage() {
  return (
    <HeaderThemeScope defaultTone="dark" data-theme="dark" className="site-v2 dark-redesign">
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <Header />
      <main id="main-content" className="careers-content shell">
        <HeroHeading>The next chapter needs more builders.</HeroHeading>
        <div>
          <p>We&apos;re a small team building ambitious technology to change how businesses operate.</p>
          <p>
            Right now, we&apos;re focused on bringing our platform into the real world, working closely with our first
            partners, and learning everything we can.
          </p>
          <p>
            <strong>We don&apos;t have any open positions today.</strong>
          </p>
          <p>
            But if our mission resonates with you, we&apos;d love to hear from you. As Superspace grows, we hope to
            bring together engineers, designers, implementation specialists, and people who love turning complicated
            problems into remarkably simple experiences.
          </p>
          <p>
            Write us an email to{" "}
            <a href="mailto:careers@superspace.cc">
              <strong>careers@superspace.cc</strong>
            </a>{" "}
            if you&apos;d like to hear about future opportunities. No application, no expectation, and no promises. Just
            an open door.
          </p>
        </div>
      </main>
      <Footer />
    </HeaderThemeScope>
  );
}

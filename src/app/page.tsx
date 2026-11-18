import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { DarkHome } from "@/components/dark-home";
import { HeaderThemeScope } from "@/components/header-theme";
import { createPageMetadata } from "@/lib/seo";
export const metadata = createPageMetadata({
  title: "Superspace — Your business changes. Your software should adapt.",
  description:
    "Operational software built around how your business actually works. Know what needs attention, move work forward, and adapt as operations change, on a managed platform deployed with your team.",
  path: "/",
  absoluteTitle: true,
});
export default function Home() {
  return (
    <HeaderThemeScope defaultTone="dark" data-theme="dark" className="site-v2 dark-redesign home-dark">
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <Header />
      <main id="main-content">
        <DarkHome />
      </main>
      <Footer
        cta={{
          title: "Let’s make software work around your business.",
          text: "See how Superspace can support your operations in a 20-minute demo.",
          placement: "home_closing",
          secondary: { label: "See how it works", href: "/how-it-works" },
        }}
      />
    </HeaderThemeScope>
  );
}

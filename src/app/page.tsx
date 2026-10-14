import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { DarkHome } from "@/components/dark-home";
import { HeaderThemeScope } from "@/components/header-theme";
import { createPageMetadata } from "@/lib/seo";
export const metadata = createPageMetadata({
  title: "Superspace — Operational software for growing companies",
  description:
    "One managed system for your people, processes, and business rules. Configured to fit how you work, and ready to grow with you.",
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
      <Footer />
    </HeaderThemeScope>
  );
}

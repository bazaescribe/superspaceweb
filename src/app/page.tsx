import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { DarkHome } from "@/components/dark-home";
import { HeaderThemeScope } from "@/components/header-theme";
import { createPageMetadata } from "@/lib/seo";
export const metadata = createPageMetadata({
  title: "Superspace — The operating system that understands your business",
  description:
    "Bring your operations together. Know what needs attention, keep work moving, and give your people the tools to act. Configured around the way your business works, and managed for you.",
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
          title: "Which operation would you start with?",
          text: "Tell us where work slips between people, spreadsheets, and systems. We’ll show you how Superspace would model it.",
          label: "Plan your first operation",
          subject: "Planning a first operation with Superspace",
          placement: "home_closing",
          secondary: { label: "Explore the platform", href: "/platform" },
        }}
      />
    </HeaderThemeScope>
  );
}

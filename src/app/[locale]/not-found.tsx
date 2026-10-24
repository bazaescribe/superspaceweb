import { useCopy } from "@/i18n/copy";
import { HeroHeading } from "@/components/entrance-heading";
import { Link } from "@/i18n/navigation";
import Image from "next/image";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { HeaderThemeScope } from "@/components/header-theme";
export default function NotFound() {
  const localizeCopy = useCopy();
  return (
    <HeaderThemeScope defaultTone="dark" data-theme="dark" className="site-v2 dark-redesign">
      <a className="skip-link" href="#main-content">
        {localizeCopy("Skip to content")}
      </a>
      <Header />
      <main id="main-content" className="not-found-content">
        <Image src="/assets/figma/dark-site/not-found.svg" alt="" width={233} height={322} unoptimized />
        <div>
          <HeroHeading>{localizeCopy("Nothing to see here!")}</HeroHeading>
          <p>
            {localizeCopy(
              "We couldn’t find the page you were looking for. Try a different URL or go back to the homepage.",
            )}
          </p>
          <Link className="button" href="/">
            {localizeCopy("Take me home")}
          </Link>
        </div>
      </main>
      <Footer />
    </HeaderThemeScope>
  );
}

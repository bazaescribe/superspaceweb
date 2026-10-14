import Link from "next/link";
import Image from "next/image";
import { Header } from "./header";
import { Footer } from "./footer";
import { HeaderThemeScope } from "./header-theme";
import { SectionMap } from "./section-map";
import type { EditorialChapter } from "@/lib/editorial-content";
import styles from "./company-story.module.css";

export function CompanyStory({ chapters, about = false }: { chapters: EditorialChapter[]; about?: boolean }) {
  return (
    <HeaderThemeScope defaultTone="dark" data-theme="dark" className="site-v2 dark-redesign">
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <Header />
      <main id="main-content" className={styles.layout}>
        <aside className={styles.aside}>
          <SectionMap sections={chapters.map(({ id, label }) => ({ id, label }))} />
          <nav className={styles.related} aria-label="More about Superspace">
            <Link href={about ? "/manifesto" : "/company"}>
              {about ? "Manifesto" : "About us"}{" "}
              <Image src="/assets/figma/dark-site/46fe6.svg" alt="" width={14} height={14} unoptimized />
            </Link>
            <Link href="/careers">
              Careers <Image src="/assets/figma/dark-site/46fe6.svg" alt="" width={14} height={14} unoptimized />
            </Link>
          </nav>
        </aside>
        <article className={styles.article}>
          {chapters.map((chapter, index) => (
            <section
              id={chapter.id}
              key={chapter.id}
              className={styles.chapter}
              aria-labelledby={chapter.id + "-title"}
            >
              {index === 0 ? (
                <h1 id={chapter.id + "-title"}>{chapter.title}</h1>
              ) : (
                <h2 id={chapter.id + "-title"}>{chapter.title}</h2>
              )}
              {chapter.blocks.map((block, i) => (
                <p key={i}>{block.strong ? <strong>{block.text}</strong> : block.text}</p>
              ))}
            </section>
          ))}
          {about && (
            <figure className={styles.quote}>
              <blockquote>“The pleasure is to play.”</blockquote>
              <figcaption>Motörhead, Ace of Spades (1980).</figcaption>
            </figure>
          )}
        </article>
      </main>
      <Footer />
    </HeaderThemeScope>
  );
}

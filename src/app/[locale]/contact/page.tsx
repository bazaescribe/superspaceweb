import { setRequestLocale } from "next-intl/server";

import { useCopy } from "@/i18n/copy";
import { EntranceHeading } from "@/components/entrance-heading";
import { Link } from "@/i18n/navigation";
import { EditorialPage, EditorialSection, ProcessSteps, container } from "@/components/editorial-page";
import { createPageMetadata } from "@/i18n/metadata";
import { contactEmail, contactUrl } from "@/lib/site";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return createPageMetadata({
    title: "Contact",
    description:
      "Talk with Superspace about the workflow, handoffs, records, and exceptions your current tools cannot handle.",
    path: "/contact",
  });
}

function ContactPage() {
  const localizeCopy = useCopy();
  return (
    <EditorialPage
      eyebrow={localizeCopy("Start a conversation")}
      title={
        <>
          {localizeCopy("Show us the operation ")}
          <span>{localizeCopy("your current tools cannot handle.")}</span>
        </>
      }
      intro={localizeCopy(
        "Bring one concrete workflow: the people involved, the records they use, the handoffs that slow them down and the exceptions that depend on someone’s memory.",
      )}
    >
      <section className={`${container} mb-section grid gap-10 md:grid-cols-2 md:gap-16`}>
        <div>
          <EntranceHeading className="mb-6 text-feature">
            {localizeCopy("A useful first note includes")}
          </EntranceHeading>
          <ul className="m-0 list-none p-0">
            {[
              "The operation you want to improve",
              "The teams and external partners involved",
              "The tools holding the work today",
              "Where handoffs, visibility or exceptions break down",
              "What a better operating day would look like",
            ].map((item, index) => (
              <li
                key={item}
                className="flex gap-5 border-x-0 border-b-0 border-t border-solid border-subtle py-5 text-body"
              >
                <span aria-hidden="true" className="text-label text-muted">
                  {"0"}
                  {localizeCopy(index + 1)}
                </span>
                {localizeCopy(item)}
              </li>
            ))}
          </ul>
        </div>
        <div className="flex flex-col items-start rounded-panel bg-surface p-6 md:p-10">
          <span className="text-label text-muted">{localizeCopy("Contact")}</span>
          <EntranceHeading className="mt-10 max-w-sm text-section">
            {localizeCopy("Start a conversation with our team.")}
          </EntranceHeading>
          <p className="mb-8 mt-4 text-body text-muted">
            {localizeCopy(
              "Email us about your operation, the tools you use, and what you want to improve. Please leave out passwords, sensitive personal information, and confidential customer data.",
            )}
          </p>
          <a className="button button--secondary mt-auto" href={contactUrl}>
            {localizeCopy("Email ")}
            {localizeCopy(contactEmail)}
          </a>
          <Link className="mt-4 text-label text-muted" href="/privacy">
            {localizeCopy("How we handle your information")}
          </Link>
        </div>
      </section>
      <EditorialSection title={localizeCopy("What happens after you reach out.")}>
        <ProcessSteps
          steps={[
            [
              "Fit conversation",
              "We understand the operation and determine whether it is a good bounded first system.",
            ],
            ["Operating map", "We identify the important objects, relationships, roles, rules and exceptions."],
            [
              "Implementation proposal",
              "If there is a fit, we define the initial system and the support needed after launch.",
            ],
          ]}
        />
      </EditorialSection>
    </EditorialPage>
  );
}

export default async function LocalizedPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <ContactPage />;
}

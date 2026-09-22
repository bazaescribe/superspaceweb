import Link from "next/link";
import { EditorialPage, EditorialSection, ProcessSteps, container } from "@/components/editorial-page";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Contact",
  description:
    "Talk with Superspace about the workflow, handoffs, records, and exceptions your current tools cannot handle.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <EditorialPage
      eyebrow="Start a conversation"
      title={
        <>
          Show us the operation <span>your current tools cannot handle.</span>
        </>
      }
      intro="Bring one concrete workflow: the people involved, the records they use, the handoffs that slow them down and the exceptions that depend on someone’s memory."
    >
      <section className={`${container} mb-section grid gap-10 md:grid-cols-2 md:gap-16`}>
        <div>
          <h2 className="mb-6 text-feature">A useful first note includes</h2>
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
                  0{index + 1}
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="flex flex-col items-start rounded-panel bg-surface p-6 md:p-10">
          <span className="text-label text-muted">Contact</span>
          <h2 className="mt-10 max-w-sm text-section">Start a conversation with our team.</h2>
          <p className="mb-8 mt-4 text-body text-muted">
            Tell us what your team is working through and where your current tools fall short. Connect with Superspace
            on LinkedIn to begin.
          </p>
          <Link className="button button--secondary mt-auto" href="https://www.linkedin.com/company/superspaceai/">
            Connect on LinkedIn
          </Link>
        </div>
      </section>
      <EditorialSection title="What happens after you reach out.">
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

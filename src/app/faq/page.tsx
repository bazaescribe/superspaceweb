import { EditorialPage, EditorialSection, EditorialCta } from "@/components/editorial-page";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Frequently asked questions",
  description: "How Superspace models, implements and manages operational software around your business.",
  path: "/faq",
});

const questions = [
  [
    "What is Superspace?",
    "Superspace is an operational platform configured around your people, records, business rules and workflows. It brings the context behind the work into one connected system.",
  ],
  [
    "Where should we start?",
    "Start with one bounded operation: complex orders, service coordination, inventory or approvals. Together, we map the people, handoffs and exceptions before defining the initial system.",
  ],
  [
    "Who implements the system?",
    "We work with your team to understand the operation, define the model, configure the software and support rollout. Superspace manages the platform as your operation evolves.",
  ],
  [
    "Can the system grow with us?",
    "The operating model can expand to include new workflows, teams and rules. The first implementation establishes a foundation for the next part of your operation.",
  ],
  [
    "How are scope and timing agreed?",
    "We begin with a fit conversation and an operating map. The implementation proposal defines the initial scope and support, based on the needs of your operation.",
  ],
] as const;

export default function FaqPage() {
  return (
    <EditorialPage
      eyebrow="FAQ"
      title="A clearer picture before we begin."
      intro="Answers to common questions about working with Superspace."
    >
      {questions.map(([question, answer]) => (
        <EditorialSection key={question} title={question}>
          <p>{answer}</p>
        </EditorialSection>
      ))}
      <EditorialCta title="Let’s talk about your operation." />
    </EditorialPage>
  );
}

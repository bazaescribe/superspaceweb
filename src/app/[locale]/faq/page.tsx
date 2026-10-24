import { setRequestLocale } from "next-intl/server";

import { useCopy } from "@/i18n/copy";
import { EditorialPage, EditorialSection } from "@/components/editorial-page";
import { createPageMetadata } from "@/i18n/metadata";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return createPageMetadata({
    title: "Frequently asked questions",
    description: "How Superspace models, implements and manages operational software around your business.",
    path: "/faq",
  });
}

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

function FaqPage() {
  const localizeCopy = useCopy();
  return (
    <EditorialPage
      eyebrow={localizeCopy("FAQ")}
      title={localizeCopy("A clearer picture before we begin.")}
      intro={localizeCopy("Answers to common questions about working with Superspace.")}
    >
      {questions.map(([question, answer]) => (
        <EditorialSection key={question} title={localizeCopy(question)}>
          <p>{localizeCopy(answer)}</p>
        </EditorialSection>
      ))}
    </EditorialPage>
  );
}

export default async function LocalizedPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <FaqPage />;
}

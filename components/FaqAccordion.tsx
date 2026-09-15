// This is a Server Component (native <details>/<summary>, no JS needed for
// the FAQ to work), so the icon must come from the SSR-safe entry point
// instead of the default client bundle.
import { Plus } from "@phosphor-icons/react/dist/ssr";

type FaqItem = {
  question: string;
  answer: string;
};

export function FaqAccordion({ items }: { items: readonly FaqItem[] }) {
  return (
    <div className="faq-list">
      {items.map((item, index) => {
        return (
          <details className="faq-item" key={item.question} open={index === 0}>
            <summary className="faq-trigger">
              <span>{item.question}</span>
              <span className="faq-icon" aria-hidden="true">
                <Plus size={16} weight="bold" />
              </span>
            </summary>
            <p className="faq-answer">{item.answer}</p>
          </details>
        );
      })}
    </div>
  );
}

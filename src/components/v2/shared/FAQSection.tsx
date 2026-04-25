// src/components/v2/shared/FAQSection.tsx
import type { FAQItem } from "@/data/v2/types";
import { SectionContainer } from "./SectionContainer";
import { FAQAccordion } from "./FAQAccordion";

type FAQSectionProps = {
  items: FAQItem[];
  title?: string;
  className?: string;
};

/**
 * Visual twin of HomeFAQV2 — centered title, background-surface bg, accordion.
 */
export function FAQSection({
  items,
  title = "Vos questions, nos réponses",
  className,
}: FAQSectionProps) {
  return (
    <SectionContainer
      id="faq"
      title={title}
      surface
      className={className}
      innerClassName="max-w-3xl"
    >
      <FAQAccordion items={items} />
    </SectionContainer>
  );
}

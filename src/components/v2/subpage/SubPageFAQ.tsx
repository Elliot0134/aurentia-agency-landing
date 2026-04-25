// src/components/v2/subpage/SubPageFAQ.tsx
import type { FAQItem } from "@/data/v2/types";
import { SectionContainer } from "@/components/v2/shared/SectionContainer";
import { FAQAccordion } from "@/components/v2/shared/FAQAccordion";

type SubPageFAQProps = {
  items: FAQItem[];
};

export function SubPageFAQ({ items }: SubPageFAQProps) {
  return (
    <SectionContainer id="faq" eyebrow="FAQ" title="Vos questions, nos réponses" innerClassName="max-w-3xl">
      <FAQAccordion items={items} />
    </SectionContainer>
  );
}

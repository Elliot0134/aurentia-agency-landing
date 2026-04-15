// src/components/v2/pillar/PillarFAQ.tsx
import type { FAQItem } from "@/data/v2/types";
import { SectionContainer } from "@/components/v2/shared/SectionContainer";
import { FAQAccordion } from "@/components/v2/shared/FAQAccordion";

type PillarFAQProps = {
  items: FAQItem[];
};

export function PillarFAQ({ items }: PillarFAQProps) {
  return (
    <SectionContainer
      eyebrow="FAQ"
      title="Vos questions, nos réponses"
      className="bg-background-surface"
      innerClassName="max-w-3xl"
    >
      <FAQAccordion items={items} />
    </SectionContainer>
  );
}

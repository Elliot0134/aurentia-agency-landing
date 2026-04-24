// src/components/v2/saas/SaaSFAQV2.tsx
import { saasData } from "@/data/v2/saas";
import { SectionContainer } from "@/components/v2/shared/SectionContainer";
import { FAQAccordion } from "@/components/v2/shared/FAQAccordion";

export function SaaSFAQV2() {
  return (
    <SectionContainer
      id="faq"
      title="Vos questions, nos réponses"
      className="bg-background-surface"
      innerClassName="max-w-3xl"
    >
      <FAQAccordion items={saasData.faq} />
    </SectionContainer>
  );
}

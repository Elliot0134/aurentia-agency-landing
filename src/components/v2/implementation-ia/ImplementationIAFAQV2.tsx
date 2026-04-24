// src/components/v2/implementation-ia/ImplementationIAFAQV2.tsx
import { solutionsIaImplementationData } from "@/data/v2/solutions-ia-implementation";
import { SectionContainer } from "@/components/v2/shared/SectionContainer";
import { FAQAccordion } from "@/components/v2/shared/FAQAccordion";

/**
 * Mirror of HomeFAQV2 — centered title on a soft background-surface band,
 * accordion of the implémentation-IA FAQ items.
 */
export function ImplementationIAFAQV2() {
  return (
    <SectionContainer
      id="faq"
      title="Vos questions, nos réponses"
      className="bg-background-surface"
      innerClassName="max-w-3xl"
    >
      <FAQAccordion items={solutionsIaImplementationData.faq} />
    </SectionContainer>
  );
}

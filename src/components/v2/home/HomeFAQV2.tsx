// src/components/v2/home/HomeFAQV2.tsx
import { homeData } from "@/data/v2/home";
import { SectionContainer } from "@/components/v2/shared/SectionContainer";
import { FAQAccordion } from "@/components/v2/shared/FAQAccordion";

export function HomeFAQV2() {
  return (
    <SectionContainer
      eyebrow="FAQ"
      title="Vos questions, nos réponses"
      className="bg-background-surface"
      innerClassName="max-w-3xl"
    >
      <FAQAccordion items={homeData.faq} />
    </SectionContainer>
  );
}

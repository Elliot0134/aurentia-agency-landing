// src/components/v2/home/HomeFAQV2.tsx
import { homeData } from "@/data/v2/home";
import { SectionContainer } from "@/components/v2/shared/SectionContainer";
import { FAQAccordion } from "@/components/v2/shared/FAQAccordion";

export function HomeFAQV2() {
  return (
    <SectionContainer
      id="faq"
      title="Vos questions, nos réponses"
      surface
      innerClassName="max-w-3xl"
    >
      <FAQAccordion items={homeData.faq} />
    </SectionContainer>
  );
}

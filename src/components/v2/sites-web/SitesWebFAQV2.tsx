// src/components/v2/sites-web/SitesWebFAQV2.tsx
import { sitesWebExtra } from "@/data/v2/sites-web";
import { SectionContainer } from "@/components/v2/shared/SectionContainer";
import { FAQAccordion } from "@/components/v2/shared/FAQAccordion";

export function SitesWebFAQV2() {
  return (
    <SectionContainer
      id="faq"
      title="Vos questions. Nos réponses."
      subtitle="Tout ce que vous devez savoir avant de nous contacter."
      surface
      innerClassName="max-w-3xl"
    >
      <FAQAccordion items={sitesWebExtra.faqExtended} />
    </SectionContainer>
  );
}

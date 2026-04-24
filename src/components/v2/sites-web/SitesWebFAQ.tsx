// src/components/v2/sites-web/SitesWebFAQ.tsx
import type { FAQItem } from "@/data/v2/types";
import { SectionContainer } from "@/components/v2/shared/SectionContainer";
import { FAQAccordion } from "@/components/v2/shared/FAQAccordion";

type SitesWebFAQProps = {
  items: FAQItem[];
  title?: string;
};

export function SitesWebFAQ({
  items,
  title = "Vos questions, nos réponses",
}: SitesWebFAQProps) {
  return (
    <SectionContainer
      id="faq"
      title={title}
      surface
      innerClassName="max-w-3xl"
    >
      <FAQAccordion items={items} />
    </SectionContainer>
  );
}

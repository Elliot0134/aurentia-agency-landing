import { SectionContainer } from "@/components/v2/shared/SectionContainer";
import { FAQAccordion } from "@/components/v2/shared/FAQAccordion";
import { auditData } from "@/data/v2/audit";

export function AuditFAQ() {
  return (
    <SectionContainer
      id="faq"
      eyebrow="Questions fréquentes"
      title="Ce que vous voulez savoir"
      innerClassName="max-w-3xl"
    >
      <FAQAccordion items={auditData.faq} />
    </SectionContainer>
  );
}

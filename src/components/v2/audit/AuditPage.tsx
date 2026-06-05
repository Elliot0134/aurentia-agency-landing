import { SubNavSetter } from "@/components/shared/SubNavContext";
import { ScrollToTop } from "@/components/shared/ScrollToTop";
import { AuditHero } from "./AuditHero";
import { AuditProblems } from "./AuditProblems";
import { AuditDomains } from "./AuditDomains";
import { AuditDeliverables } from "./AuditDeliverables";
import { AuditReportExample } from "./AuditReportExample";
import { AuditAISection } from "./AuditAISection";
import { AuditSteps } from "./AuditSteps";
import { AuditPricing } from "./AuditPricing";
import { AuditFAQ } from "./AuditFAQ";
import { AuditFinalCTA } from "./AuditFinalCTA";

const SUB_NAV = [
  { label: "Le problème", sectionId: "probleme" },
  { label: "Ce qu'on analyse", sectionId: "domaines" },
  { label: "Livrables", sectionId: "livrables" },
  { label: "Exemple", sectionId: "exemple" },
  { label: "Visibilité IA", sectionId: "ia" },
  { label: "Étapes", sectionId: "etapes" },
  { label: "Tarifs", sectionId: "pricing" },
  { label: "FAQ", sectionId: "faq" },
];

export function AuditPage() {
  return (
    <>
      <SubNavSetter items={SUB_NAV} />
      <ScrollToTop />
      <AuditHero />
      <AuditProblems />
      <AuditDomains />
      <AuditDeliverables />
      <AuditReportExample />
      <AuditAISection />
      <AuditSteps />
      <AuditPricing />
      <AuditFAQ />
      <AuditFinalCTA />
    </>
  );
}

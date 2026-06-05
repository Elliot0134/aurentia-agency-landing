// src/app/audit/page.tsx
import { AuditPage } from "@/components/v2/audit/AuditPage";
import { JsonLd } from "@/components/v2/seo/JsonLd";
import { pageMeta } from "@/lib/seo/metadata";
import { breadcrumb, serviceSchema, faqPage } from "@/lib/seo/schema";
import { auditData } from "@/data/v2/audit";

export const metadata = pageMeta({
  title: "Audit de site web — SEO, performance & visibilité IA · dès 99 €",
  description:
    "Recevez un audit complet de votre site : SEO, performance, UX, accessibilité et visibilité sur Google ET sur les IA (ChatGPT, Perplexity). On chiffre ce que ça vous coûte chaque mois. Pré-audit gratuit, audit complet à 99 €.",
  path: "/audit",
});

const SITE = "https://aurentia.agency";

// Service + Offer (99 €) — aide les IA et Google à comprendre le produit.
const serviceData = {
  ...serviceSchema({
    name: "Audit de site web (SEO, performance & visibilité IA)",
    description:
      "Audit complet sur 7 domaines : SEO technique, performance (Core Web Vitals), UX, copywriting, accessibilité, visibilité IA (GEO/AEO) et Local SEO. Rapport PDF avec score /100, comparatif concurrents, manque à gagner chiffré et plan d'action priorisé. Livré sous 24h.",
    url: "/audit",
  }),
  serviceType: "Audit SEO et de site web",
  offers: {
    "@type": "Offer",
    price: "99",
    priceCurrency: "EUR",
    availability: "https://schema.org/InStock",
    url: `${SITE}/audit`,
    description: "Audit complet de site web, relu par un humain, livré sous 24h.",
  },
};

const breadcrumbData = breadcrumb([
  { name: "Accueil", url: `${SITE}/` },
  { name: "Audit de site web", url: `${SITE}/audit` },
]);

const faqData = faqPage(auditData.faq);

export default function Page() {
  return (
    <>
      <JsonLd data={serviceData} />
      <JsonLd data={breadcrumbData} />
      <JsonLd data={faqData} />
      <AuditPage />
    </>
  );
}

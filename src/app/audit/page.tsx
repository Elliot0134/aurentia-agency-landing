// src/app/audit/page.tsx
import { AuditPage } from "@/components/v2/audit/AuditPage";
import { JsonLd } from "@/components/v2/seo/JsonLd";
import { pageMeta } from "@/lib/seo/metadata";

export const metadata = pageMeta({
  title: "Audit de site web — SEO, performance & visibilité IA · dès 99 €",
  description:
    "Recevez un audit complet de votre site : SEO, performance, UX, accessibilité et visibilité sur Google ET sur les IA (ChatGPT, Perplexity). On chiffre ce que ça vous coûte chaque mois. Pré-audit gratuit, audit complet à 99 €.",
  path: "/audit",
});

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Quelle différence entre le pré-audit gratuit et l'audit complet ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Le pré-audit gratuit vous donne un premier aperçu des points qui bloquent votre site, livré par email. L'audit complet à 99 € déroule tout : rapport PDF personnalisé avec score global, synthèse des priorités, comparatif concurrents, manque à gagner chiffré, plan d'action priorisé et annexe technique.",
      },
    },
    {
      "@type": "Question",
      name: "En combien de temps je reçois mon audit complet ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Sous 24h. Une fois votre commande passée, on réalise l'audit puis un humain relit chaque constat avant de vous l'envoyer par email.",
      },
    },
  ],
};

export default function Page() {
  return (
    <>
      <JsonLd data={faqSchema} />
      <AuditPage />
    </>
  );
}

import { Metadata } from "next";
import { Footer } from "@/components/layout/Footer";
import { ScrollToTop } from "@/components/shared/ScrollToTop";
import { ApportAffairesHero } from "@/components/apport-affaires/ApportAffairesHero";
import { ApportAffairesSteps } from "@/components/apport-affaires/ApportAffairesSteps";
import { ApportAffairesGains } from "@/components/apport-affaires/ApportAffairesGains";
import { ApportAffairesAudience } from "@/components/apport-affaires/ApportAffairesAudience";
import { ApportAffairesFAQ } from "@/components/apport-affaires/ApportAffairesFAQ";
import { ApportAffairesCTA } from "@/components/apport-affaires/ApportAffairesCTA";

export const metadata: Metadata = {
  title: "Programme Apport d\u2019Affaires \u2014 10% de commission | Aurentia",
  description:
    "Recommandez Aurentia \u00e0 votre r\u00e9seau et touchez 10% de commission sur chaque projet sign\u00e9. Ouvert \u00e0 tous. Inscription en 2 minutes.",
  openGraph: {
    title: "Programme Apport d\u2019Affaires Aurentia \u2014 10% de commission",
    description:
      "Recommandez Aurentia et touchez 10% sur chaque projet sign\u00e9. Freelances, agences, particuliers \u2014 ouvert \u00e0 tous.",
    images: [{ url: "/images/opengraph/opengraph.png" }],
    type: "website",
    url: "https://aurentia.agency/apport-affaires",
  },
};

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Programme Apport d\u2019Affaires \u2014 Aurentia Agency",
    description:
      "Recommandez Aurentia Agency et touchez 10% de commission sur chaque projet sign\u00e9. Programme ouvert \u00e0 tous : freelances, agences, particuliers.",
    url: "https://aurentia.agency/apport-affaires",
    publisher: {
      "@type": "Organization",
      name: "Aurentia Agency",
      url: "https://aurentia.agency",
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Combien je touche en tant qu\u2019apporteur d\u2019affaires Aurentia ?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "10% du montant HT de chaque projet sign\u00e9 gr\u00e2ce \u00e0 votre recommandation. Pas de plafond.",
        },
      },
      {
        "@type": "Question",
        name: "Qui peut devenir apporteur d\u2019affaires Aurentia ?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Tout le monde. Freelances, agences, clients existants, particuliers. Aucun statut juridique requis pour commencer.",
        },
      },
      {
        "@type": "Question",
        name: "Comment fonctionne le programme d\u2019apport d\u2019affaires ?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Inscrivez-vous, recommandez Aurentia \u00e0 votre r\u00e9seau, et touchez 10% de commission quand le projet est sign\u00e9. Paiement sous 30 jours apr\u00e8s la signature du client.",
        },
      },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Accueil",
        item: "https://aurentia.agency",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Apport d\u2019affaires",
        item: "https://aurentia.agency/apport-affaires",
      },
    ],
  },
];

export default function ApportAffairesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="flex min-h-screen flex-col items-center w-full overflow-hidden pt-24">
        <div className="w-full">
          <ApportAffairesHero />
          <ApportAffairesSteps />
          <ApportAffairesGains />
          <ApportAffairesAudience />
          <ApportAffairesFAQ />
          <ApportAffairesCTA />
        </div>
      </main>
      <Footer />
      <ScrollToTop />
    </>
  );
}

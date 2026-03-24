import { Metadata } from "next";
import { Footer } from "@/components/layout/Footer";
import { ScrollToTop } from "@/components/shared/ScrollToTop";
import { ConciergerieHero } from "@/components/conciergerie/ConciergerieHero";
import { ConciergerieProblem } from "@/components/conciergerie/ConciergerieProblem";
import { ConciergerieSolution } from "@/components/conciergerie/ConciergerieSolution";
import { ConciergerieInnovation } from "@/components/conciergerie/ConciergerieInnovation";
import { ConciergerieProcess } from "@/components/conciergerie/ConciergerieProcess";
import { ConciergerieSocialProof } from "@/components/conciergerie/ConciergerieSocialProof";
import { ConciergeriePricing } from "@/components/conciergerie/ConciergeriePricing";
import { ConciergerieComparison } from "@/components/conciergerie/ConciergerieComparison";
import { ConciergerieFAQ } from "@/components/conciergerie/ConciergerieFAQ";
import { ConciergerieLeadMagnet } from "@/components/conciergerie/ConciergerieLeadMagnet";
import { ConciergerieCTA } from "@/components/conciergerie/ConciergerieCTA";

export const metadata: Metadata = {
  title: "Site Vitrine Conciergerie Airbnb — Livré en 48h | Aurentia",
  description:
    "Site professionnel sur-mesure pour votre conciergerie. Réservations directes, SEO local, livré en 48h. À partir de 1 200€. On vous montre votre site AVANT le paiement.",
  openGraph: {
    title: "Site vitrine pour conciergerie — Livré en 48h | Aurentia",
    description:
      "On vous montre votre site AVANT que vous payiez. Design sur-mesure, SEO local, réservations directes. À partir de 1 200€.",
    images: [{ url: "/images/og/conciergeries.jpg" }],
    type: "website",
  },
};

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Création de site vitrine pour conciergeries",
    provider: {
      "@type": "Organization",
      name: "Aurentia Agency",
      url: "https://aurentia.agency",
    },
    description:
      "Site web professionnel sur-mesure pour conciergeries Airbnb et locations saisonnières. Design unique, SEO local intégré, livré en 48h.",
    serviceType: "Création de site web",
    areaServed: {
      "@type": "Country",
      name: "France",
    },
    offers: [
      {
        "@type": "Offer",
        name: "Pack Essentiel",
        price: "900",
        priceCurrency: "EUR",
        description:
          "Site 5 pages, design unique, SEO de base, livré en 48h",
      },
      {
        "@type": "Offer",
        name: "Pack Croissance",
        price: "1490",
        priceCurrency: "EUR",
        description:
          "Site complet + blog SEO + chatbot IA + bilingue FR/EN",
      },
      {
        "@type": "Offer",
        name: "Pack Premium",
        description:
          "Écosystème digital complet avec réservation en ligne et back-office",
      },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Combien coûte un site pour ma conciergerie ?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "À partir de 1 200€ HT pour le pack Essentiel (site 5 pages, design unique, SEO de base, livré en 48h). Le pack Croissance à 1 990€ inclut un blog SEO, un chatbot IA et le bilingue FR/EN.",
        },
      },
      {
        "@type": "Question",
        name: "En combien de temps mon site sera en ligne ?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "La V1 est livrée en 24-48h. La version finale avec vos retours est en ligne sous 7 jours maximum.",
        },
      },
      {
        "@type": "Question",
        name: "Pourquoi un site propre plutôt que ma page Airbnb ?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Airbnb prend 15-20% de commission par réservation. Sur 50 000€ de CA annuel, c'est 7 500-10 000€ perdus. Un site à vous permet les réservations directes, zéro commission. Le site se rembourse dès la première réservation directe.",
        },
      },
      {
        "@type": "Question",
        name: "C'est quoi l'IA exactement ? Mon site va ressembler à un truc généré ?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "L'IA nous permet de créer un design unique pour VOUS, pas un template. Derrière chaque site, il y a 20 ans d'expertise humaine qui valide chaque détail. Le résultat est un site sur-mesure, indiscernable d'un site fait par une agence classique à 5 000€.",
        },
      },
      {
        "@type": "Question",
        name: "Et si je suis pas satisfait du résultat ?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Vous voyez la V1 avant de payer le solde. 3 tours de révision sont inclus. On ne lance rien tant que vous n'êtes pas satisfait. Et vous gardez l'audit et les recommandations quoi qu'il arrive.",
        },
      },
      {
        "@type": "Question",
        name: "1 200€ c'est pas trop peu pour un bon site ?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Un site équivalent en agence classique coûte 3 000 à 8 000€. Notre prix est bas parce que notre process est efficace, pas parce que la qualité est basse. L'IA accélère la production, l'expertise humaine garantit le résultat.",
        },
      },
      {
        "@type": "Question",
        name: "Le site sera bien référencé sur Google ?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Le SEO technique est intégré dès la création : balises meta, sitemap, vitesse de chargement, responsive mobile, données structurées. Avec le pack Croissance, on ajoute 4 articles SEO par mois pour attaquer les mots-clés de votre zone géographique.",
        },
      },
      {
        "@type": "Question",
        name: "J'ai déjà un site, vous pouvez le refaire ?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Oui. On fait des refontes complètes. On peut même vous montrer un avant/après de votre site actuel pendant le call gratuit.",
        },
      },
      {
        "@type": "Question",
        name: "C'est quoi l'abonnement mensuel ?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "L'hébergement, la maintenance, les mises à jour de sécurité, les sauvegardes et le support technique. À partir de 19€/mois. Premier mois offert. Sans engagement longue durée.",
        },
      },
      {
        "@type": "Question",
        name: "Je peux payer en plusieurs fois ?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Oui. Paiement en 3 fois sans frais disponible sur tous les packs. Vous payez un acompte au démarrage, le solde quand vous êtes satisfait.",
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
        name: "Conciergeries",
        item: "https://aurentia.agency/conciergeries",
      },
    ],
  },
];

export default function ConciergeriesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ScrollToTop />
      <main className="flex min-h-screen flex-col items-center justify-between w-full overflow-hidden">
        <ConciergerieHero />
        <ConciergerieProblem />
        <ConciergerieSolution />
        <ConciergerieInnovation />
        <ConciergerieProcess />
        <ConciergerieSocialProof />
        <ConciergeriePricing />
        <ConciergerieComparison />
        <ConciergerieFAQ />
        <ConciergerieLeadMagnet />
        <ConciergerieCTA />
      </main>
      <Footer />
    </>
  );
}

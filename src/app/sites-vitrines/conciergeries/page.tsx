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
  title: "Site Vitrine Conciergerie Airbnb — Livré en 72h | Aurentia",
  description:
    "Site professionnel sur-mesure pour votre conciergerie. Réservations directes, SEO local, livré en 72h. À partir de 1 200€. On vous montre votre site AVANT le paiement.",
  openGraph: {
    title: "Site vitrine pour conciergerie — Livré en 72h | Aurentia",
    description:
      "On vous montre votre site AVANT que vous payiez. Design sur-mesure, SEO local, réservations directes. À partir de 1 200€.",
    images: [{ url: "/images/opengraph/opengraph.png" }],
    type: "website",
  },
};

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Site Vitrine pour Conciergerie — Aurentia",
    description:
      "Site professionnel sur-mesure pour votre conciergerie. Réservations directes, SEO local, livré en 72h.",
    provider: {
      "@type": "Organization",
      name: "Aurentia Agency",
      url: "https://aurentia.agency",
    },
  },
];

export default function SitesVitrinesConciergeriesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="flex min-h-screen flex-col items-center w-full overflow-hidden">
        <ScrollToTop />
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

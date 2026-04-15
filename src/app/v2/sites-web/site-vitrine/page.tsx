// src/app/v2/sites-web/site-vitrine/page.tsx
import type { Metadata } from "next";
import { SubPage } from "@/components/v2/subpage/SubPage";
import { sitesWebVitrineData } from "@/data/v2/sites-web-vitrine";

export const metadata: Metadata = {
  title: "Site vitrine sur-mesure dès 1 200 €",
  description:
    "Site vitrine professionnel livré en 48h à 5 jours. Sur-mesure, optimisé SEO, prêt à convertir.",
};

export default function SiteVitrinePage() {
  return <SubPage data={sitesWebVitrineData} />;
}

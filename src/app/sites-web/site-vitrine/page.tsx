// src/app/v2/sites-web/site-vitrine/page.tsx
import type { Metadata } from "next";
import { SitesWebSubPage } from "@/components/v2/sites-web/SitesWebSubPage";

export const metadata: Metadata = {
  title: "Site vitrine sur-mesure dès 1 200 €",
  description:
    "Site vitrine professionnel livré en 72h à 5 jours. Sur-mesure, optimisé SEO, prêt à convertir.",
};

export default function SiteVitrinePage() {
  return <SitesWebSubPage slug="site-vitrine" />;
}

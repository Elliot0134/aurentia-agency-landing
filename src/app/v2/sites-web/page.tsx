// src/app/v2/sites-web/page.tsx
import type { Metadata } from "next";
import { CommercialPillarPage } from "@/components/v2/pillar/CommercialPillarPage";
import { sitesWebData } from "@/data/v2/sites-web";

export const metadata: Metadata = {
  title: "Sites Web sur-mesure",
  description:
    "Sites vitrines et landing pages livrés en jours grâce à l'IA. Pour TPE, artisans, commerces et startups.",
};

export default function SitesWebPillarPage() {
  return <CommercialPillarPage data={sitesWebData} />;
}

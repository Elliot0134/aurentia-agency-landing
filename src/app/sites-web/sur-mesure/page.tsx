// src/app/sites-web/sur-mesure/page.tsx
import type { Metadata } from "next";
import { SitesWebSubPage } from "@/components/v2/sites-web/SitesWebSubPage";

export const metadata: Metadata = {
  title: "Sites web sur-mesure — Apps, marketplaces, plateformes",
  description:
    "Projets web sur-mesure dès 6 000 € : SaaS, marketplaces, plateformes, expériences brand. Architecture Next.js + Supabase, code remis 100%, équipe à Avignon.",
};

export default function SurMesureSubpage() {
  return <SitesWebSubPage slug="sur-mesure" />;
}

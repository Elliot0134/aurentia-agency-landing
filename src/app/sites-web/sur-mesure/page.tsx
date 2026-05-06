// src/app/sites-web/sur-mesure/page.tsx
import { SitesWebSubPage } from "@/components/v2/sites-web/SitesWebSubPage";
import { pageMeta } from "@/lib/seo/metadata";

export const metadata = pageMeta({
  title: "Sites web sur-mesure — Apps, marketplaces, plateformes",
  description:
    "Projets web sur-mesure dès 6 000 € : SaaS, marketplaces, plateformes, expériences brand. Architecture Next.js + Supabase, code remis 100%, équipe à Avignon.",
  path: "/sites-web/sur-mesure",
});

export default function SurMesureSubpage() {
  return <SitesWebSubPage slug="sur-mesure" />;
}

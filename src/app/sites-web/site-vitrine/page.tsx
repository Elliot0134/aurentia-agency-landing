// src/app/sites-web/site-vitrine/page.tsx
import { SitesWebSubPage } from "@/components/v2/sites-web/SitesWebSubPage";
import { pageMeta } from "@/lib/seo/metadata";

export const metadata = pageMeta({
  title: "Site vitrine sur-mesure dès 1 500 €",
  description:
    "Site vitrine professionnel livré en 72h à 5 jours. Sur-mesure, optimisé SEO, prêt à convertir.",
  path: "/sites-web/site-vitrine",
});

export default function SiteVitrinePage() {
  return <SitesWebSubPage slug="site-vitrine" />;
}

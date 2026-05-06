// src/app/sites-web/ecommerce/page.tsx
import { SitesWebSubPage } from "@/components/v2/sites-web/SitesWebSubPage";
import { pageMeta } from "@/lib/seo/metadata";

export const metadata = pageMeta({
  title: "Création de boutique Shopify sur-mesure dès 2 500 €",
  description:
    "Agence Shopify : boutique e-commerce livrée en 7 jours. Design sur-mesure, paiement, livraison et email marketing inclus. Sur-mesure Next.js + Stripe possible.",
  path: "/sites-web/ecommerce",
});

export default function EcommercePage() {
  return <SitesWebSubPage slug="ecommerce" />;
}

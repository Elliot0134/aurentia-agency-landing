// src/app/sites-web/ecommerce/page.tsx
import type { Metadata } from "next";
import { SitesWebSubPage } from "@/components/v2/sites-web/SitesWebSubPage";

export const metadata: Metadata = {
  title: "Création de boutique Shopify sur-mesure dès 2 500 €",
  description:
    "Agence Shopify : boutique e-commerce livrée en 7 jours. Design sur-mesure, paiement, livraison et email marketing inclus. Sur-mesure Next.js + Stripe possible.",
};

export default function EcommercePage() {
  return <SitesWebSubPage slug="ecommerce" />;
}

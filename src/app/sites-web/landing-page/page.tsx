// src/app/v2/sites-web/landing-page/page.tsx
import type { Metadata } from "next";
import { SitesWebSubPage } from "@/components/v2/sites-web/SitesWebSubPage";

export const metadata: Metadata = {
  title: "Landing page sur-mesure dès 1 500 € — livrée en 5 jours",
  description:
    "Une landing page écrite pour vendre, livrée en 5 jours. Design sur-mesure, copy faite avec vous, performance 100/100 sur Google. À partir de 1 500 €.",
};

export default function LandingPageSubpage() {
  return <SitesWebSubPage slug="landing-page" />;
}

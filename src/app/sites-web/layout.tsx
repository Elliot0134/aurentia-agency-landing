// src/app/v2/sites-web/layout.tsx
// Metadata for /v2/sites-web lives in this layout because the page itself is
// a client component (uses GSAP ScrollTrigger for grayscale fade + auto-scroll
// past the easter-egg on mount — same pattern as the homepage).
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sites Web sur-mesure",
  description:
    "Sites vitrines et landing pages livrés en jours grâce à l'IA. Pour TPE, artisans, commerces et startups.",
};

export default function SitesWebLayout({ children }: { children: React.ReactNode }) {
  return children;
}

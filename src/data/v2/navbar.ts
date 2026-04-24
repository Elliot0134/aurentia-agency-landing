// src/data/navbar.ts
import type { NavbarConfig } from "./types";

export const navbarConfig: NavbarConfig = {
  logo: { label: "Aurentia.", href: "/" },
  sections: [
    {
      label: "Sites Web",
      href: "/sites-web",
      children: [
        {
          label: "Site vitrine",
          href: "/sites-web/site-vitrine",
          description: "Présence pro pour TPE, artisans, commerces",
        },
        {
          label: "Landing page",
          href: "/sites-web/landing-page",
          description: "Pages haute conversion pour startups et SaaS",
        },
      ],
    },
    {
      label: "SaaS",
      href: "/saas",
    },
    {
      label: "Solutions IA",
      href: "/solutions-ia",
      children: [
        { label: "Formation IA", href: "/solutions-ia/formation-ia", description: "Vidéos, cours, skills pour vos équipes" },
        { label: "Configuration Claude", href: "/solutions-ia/configuration-claude", description: "On configure Claude pour votre workflow" },
        { label: "Audit", href: "/solutions-ia/audit", description: "Audit IA de votre business" },
        { label: "Implémentation IA", href: "/solutions-ia/implementation-ia", description: "Skills custom déployés chez vous" },
      ],
    },
    {
      label: "Réalisations",
      href: "/realisations",
    },
    {
      label: "L'agence",
      href: "/agence",
      children: [
        { label: "À propos", href: "/agence/a-propos", description: "Équipe, méthode, manifeste" },
        { label: "Réalisations", href: "/realisations", description: "Nos cas clients détaillés" },
        { label: "Le blog", href: "/agence", description: "Bientôt — articles et tendances" },
        { label: "Ressources", href: "/agence", description: "Bientôt — guides, templates, outils" },
        { label: "Affiliation", href: "/agence", description: "Bientôt — 10% sur chaque projet recommandé" },
      ],
    },
  ],
  rightLinks: [
    { label: "Contact", href: "/contact" },
  ],
  cta: { label: "Prendre RDV", href: "/contact" },
};

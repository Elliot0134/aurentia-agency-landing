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
        { label: "Audit IA", href: "/solutions-ia/audit", description: "Cartographie de vos process, roadmap 90 jours" },
        { label: "Implémentation IA", href: "/solutions-ia/implementation-ia", description: "Agents, automatisations et configuration Claude" },
        { label: "Formation IA", href: "/solutions-ia/formation-ia", description: "Bientôt — formations équipes sur-mesure", comingSoon: true },
      ],
    },
    {
      label: "L'agence",
      href: "/agence",
      children: [
        { label: "À propos", href: "/a-propos", description: "Équipe, méthode, manifeste" },
        { label: "Réalisations", href: "/realisations", description: "Bientôt — nos cas clients détaillés", comingSoon: true },
        { label: "Contact", href: "/contact", description: "Parlons de votre projet" },
        { label: "Le blog", href: "/agence", description: "Bientôt — articles et tendances", comingSoon: true },
        { label: "Ressources", href: "/agence", description: "Bientôt — guides, templates, outils", comingSoon: true },
        { label: "Affiliation", href: "/agence", description: "Bientôt — 10% sur chaque projet recommandé", comingSoon: true },
      ],
    },
  ],
  rightLinks: [],
  cta: { label: "Prendre RDV", href: "/contact" },
};

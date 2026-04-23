// src/data/v2/navbar.ts
import type { NavbarConfig } from "./types";

export const navbarConfig: NavbarConfig = {
  logo: { label: "Aurentia.", href: "/v2" },
  sections: [
    {
      label: "Sites Web",
      href: "/v2/sites-web",
      children: [
        {
          label: "Site vitrine",
          href: "/v2/sites-web/site-vitrine",
          description: "Présence pro pour TPE, artisans, commerces",
        },
        {
          label: "Landing page",
          href: "/v2/sites-web/landing-page",
          description: "Pages haute conversion pour startups et SaaS",
        },
      ],
    },
    {
      label: "SaaS",
      href: "/v2/saas",
    },
    {
      label: "Solutions IA",
      href: "/v2/solutions-ia",
      children: [
        { label: "Formation IA", href: "/v2/solutions-ia/formation-ia", description: "Vidéos, cours, skills pour vos équipes" },
        { label: "Configuration Claude", href: "/v2/solutions-ia/configuration-claude", description: "On configure Claude pour votre workflow" },
        { label: "Audit", href: "/v2/solutions-ia/audit", description: "Audit IA de votre business" },
        { label: "Implémentation IA", href: "/v2/solutions-ia/implementation-ia", description: "Skills custom déployés chez vous" },
      ],
    },
    {
      label: "Réalisations",
      href: "/v2/realisations",
    },
    {
      label: "L'agence",
      href: "/v2/agence",
      children: [
        { label: "À propos", href: "/v2/agence/a-propos", description: "Équipe, méthode, manifeste" },
        { label: "Réalisations", href: "/v2/realisations", description: "Nos cas clients détaillés" },
        { label: "Le blog", href: "/v2/agence", description: "Bientôt — articles et tendances" },
        { label: "Ressources", href: "/v2/agence", description: "Bientôt — guides, templates, outils" },
        { label: "Affiliation", href: "/v2/agence", description: "Bientôt — 10% sur chaque projet recommandé" },
      ],
    },
  ],
  rightLinks: [
    { label: "Contact", href: "/v2/contact" },
  ],
  cta: { label: "Prendre RDV", href: "/v2/contact" },
};

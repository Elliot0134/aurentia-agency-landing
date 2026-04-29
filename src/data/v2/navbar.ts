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
        {
          label: "E-commerce",
          href: "/sites-web/ecommerce",
          description: "Boutique Shopify sur-mesure dès 2 500 €",
          iconUrl: "/images/shopify_logo.webp",
        },
        {
          label: "Site sur-mesure",
          href: "/sites-web/sur-mesure",
          description: "App, marketplace, plateforme — dès 6 000 €",
        },
      ],
    },
    {
      label: "SaaS",
      href: "/saas",
      children: [
        {
          label: "SaaS sur-mesure",
          href: "/saas",
          description: "MVP, refonte, outils internes, intégration IA",
        },
        {
          label: "Marque blanche pour agences",
          href: "/saas/agences",
          description: "Partenariat tech en marque blanche pour agences",
        },
      ],
    },
    {
      label: "Solutions IA",
      href: "/solutions-ia",
      children: [
        { label: "Audit IA", href: "/solutions-ia/audit", description: "Cartographie de vos process, roadmap 90 jours" },
        { label: "Implémentation IA", href: "/solutions-ia/implementation-ia", description: "Agents, automatisations sur-mesure" },
        { label: "Configuration Claude", href: "/solutions-ia/configuration-claude", description: "Hooks, skills, MCP servers et CLAUDE.md sur-mesure", iconUrl: "/images/icons/claude-icon.webp" },
        { label: "Formation IA", href: "/solutions-ia/formation-ia", description: "En cours — formations équipes sur-mesure", comingSoon: true },
      ],
    },
    {
      label: "L'agence",
      href: "/agence",
      children: [
        { label: "À propos", href: "/a-propos", description: "Équipe, méthode, manifeste" },
        { label: "Contact", href: "/contact", description: "Parlons de votre projet" },
        { label: "Ressources", href: "/ressources", description: "Guides, templates, outils" },
        { label: "Réalisations", href: "/realisations", description: "Bientôt — nos cas clients détaillés", comingSoon: true },
        { label: "Le blog", href: "/blog", description: "Bientôt — articles et tendances", comingSoon: true },
        { label: "Apport d'affaires", href: "/apport-affaires", description: "10% de commission sur chaque projet recommandé" },
      ],
    },
  ],
  rightLinks: [],
  cta: { label: "Prendre RDV", href: "/contact" },
};

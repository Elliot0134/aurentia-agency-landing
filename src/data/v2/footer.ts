// src/data/footer.ts
import type { FooterConfig } from "./types";
import { Linkedin, Instagram, Twitter, Github } from "lucide-react";

export const footerConfig: FooterConfig = {
  logo: {
    label: "Aurentia.",
    tagline: "L'IA dans vos produits. L'IA dans votre quotidien.",
  },
  columns: [
    {
      title: "Offres",
      links: [
        { label: "Sites Web", href: "/sites-web" },
        { label: "Site vitrine", href: "/sites-web/site-vitrine" },
        { label: "Landing page", href: "/sites-web/landing-page" },
        { label: "SaaS sur-mesure", href: "/saas" },
        { label: "Formation IA", href: "/solutions-ia/formation-ia" },
        { label: "Configuration Claude", href: "/solutions-ia/configuration-claude" },
        { label: "Audit", href: "/solutions-ia/audit" },
        { label: "Implémentation IA", href: "/solutions-ia/implementation-ia" },
      ],
    },
    {
      title: "L'agence",
      links: [
        { label: "À propos", href: "/agence/a-propos" },
        { label: "Réalisations", href: "/realisations" },
        { label: "Blog", href: "/agence" },
        { label: "Ressources", href: "/agence" },
        { label: "Affiliation", href: "/agence" },
        { label: "Contact", href: "/contact" },
      ],
    },
    {
      title: "Légal",
      links: [
        { label: "CGV", href: "/cgv" },
        { label: "Mentions légales", href: "/mentions-legales" },
        { label: "Politique de confidentialité", href: "/politique-confidentialite" },
      ],
    },
  ],
  socials: [
    { label: "LinkedIn", href: "https://linkedin.com/company/aurentia", icon: Linkedin },
    { label: "Instagram", href: "https://instagram.com/aurentia", icon: Instagram },
    { label: "Twitter", href: "https://twitter.com/aurentia", icon: Twitter },
    { label: "GitHub", href: "https://github.com/aurentia", icon: Github },
  ],
  legalLine: "© Aurentia Agency — Tous droits réservés",
};

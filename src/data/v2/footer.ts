// src/data/v2/footer.ts
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
        { label: "Sites Web", href: "/v2/sites-web" },
        { label: "Site vitrine", href: "/v2/sites-web/site-vitrine" },
        { label: "Landing page", href: "/v2/sites-web/landing-page" },
        { label: "SaaS sur-mesure", href: "/v2/saas" },
        { label: "Formation IA", href: "/v2/solutions-ia/formation-ia" },
        { label: "Configuration Claude", href: "/v2/solutions-ia/configuration-claude" },
        { label: "Audit", href: "/v2/solutions-ia/audit" },
        { label: "Implémentation IA", href: "/v2/solutions-ia/implementation-ia" },
      ],
    },
    {
      title: "L'agence",
      links: [
        { label: "À propos", href: "/v2/agence/a-propos" },
        { label: "Réalisations", href: "/v2/realisations" },
        { label: "Blog", href: "/v2/agence" },
        { label: "Ressources", href: "/v2/agence" },
        { label: "Affiliation", href: "/v2/agence" },
        { label: "Contact", href: "/v2/contact" },
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

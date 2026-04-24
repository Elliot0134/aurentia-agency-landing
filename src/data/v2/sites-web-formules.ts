// src/data/sites-web-formules.ts
import { FileText, Globe, ShoppingBag, Layers } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type SitesWebFormule = {
  slug: string;
  icon: LucideIcon;
  name: string;
  priceRange: string;
  pitch: string;
  subtitle: string;
  bullets: string[];
  image: { src: string; alt: string };
  proof?: string;
  href: string;
  rdvHref: string;
};

export const sitesWebFormules: SitesWebFormule[] = [
  {
    slug: "site-vitrine",
    icon: Globe,
    name: "Site Vitrine",
    priceRange: "1 500 € – 4 000 €",
    pitch: "Crédibilité, image, SEO — votre activité en ligne.",
    subtitle:
      "Un site pro, unique, qui inspire confiance et attire des leads locaux via le SEO. Idéal pour artisans, TPE, commerces et professions libérales.",
    bullets: [
      "Design sur-mesure — zéro template",
      "SEO intégré : structure technique, balises, schema, maillage interne, contenu optimisé",
      "Livré en 72h, 100% responsive",
    ],
    image: {
      src: "/images/portfolio/maison-enileh-1.webp",
      alt: "Site vitrine Maison Enileh",
    },
    proof: "200+ sites livrés depuis 2019",
    href: "/sites-web/site-vitrine",
    rdvHref: "/contact",
  },
  {
    slug: "landing-page",
    icon: FileText,
    name: "Landing Page",
    priceRange: "1 500 € – 3 000 €",
    pitch: "Conversion maximale : 1 offre, 1 cible, 1 action.",
    subtitle:
      "Une page unique calibrée pour transformer vos visiteurs en leads qualifiés. Parfait pour un lancement, une levée, ou une campagne.",
    bullets: [
      "1 CTA, 1 objectif — zéro distraction",
      "Copywriting orienté conversion + preuves sociales",
      "Livrée en 72h",
    ],
    image: {
      src: "/images/portfolio/comparateur-ia-1.webp",
      alt: "Landing page Comparateur IA Facile",
    },
    proof: "12+ landings livrées cette année",
    href: "/sites-web/landing-page",
    rdvHref: "/contact",
  },
  {
    slug: "e-commerce",
    icon: ShoppingBag,
    name: "Site E-commerce",
    priceRange: "3 500 € – 15 000 €",
    pitch: "Vendez vos produits en ligne, sans friction.",
    subtitle:
      "Boutique complète avec paiement, gestion de stock, livraison et analytics. Shopify pour démarrer vite, Next.js + Stripe pour du sur-mesure total.",
    bullets: [
      "Paiement Stripe, PayPal, Apple/Google Pay",
      "Gestion produits, stock, livraison, TVA",
      "Développé sur Shopify — robuste, scalable, éprouvé",
    ],
    image: {
      src: "/images/portfolio/allo-restau-1.webp",
      alt: "Boutique en ligne AlloRestau",
    },
    proof: "Intégration Stripe, Shopify, Supabase",
    href: "/sites-web/e-commerce",
    rdvHref: "/contact",
  },
  {
    slug: "sur-mesure",
    icon: Layers,
    name: "Site Sur-mesure",
    priceRange: "Sur devis",
    pitch: "Projet spécifique, app web, marketplace.",
    subtitle:
      "Pour les projets qui sortent du cadre : marketplace, SaaS, app interne, plateforme B2B. On conçoit, on architecture, on livre — avec la même exigence.",
    bullets: [
      "Architecture Next.js + Supabase + Stripe",
      "Back-office admin + intégrations API",
      "Scalable, sécurisé, code remis 100%",
    ],
    image: {
      src: "/images/portfolio/friendiz-1.webp",
      alt: "Projet sur-mesure Friendiz",
    },
    proof: "SaaS, marketplaces, apps internes",
    href: "/contact",
    rdvHref: "/contact",
  },
];

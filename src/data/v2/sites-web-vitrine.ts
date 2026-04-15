// src/data/v2/sites-web-vitrine.ts
// DRAFT_COPY — to refine before swap
import {
  Briefcase,
  Store,
  Sparkles,
  Clock,
} from "lucide-react";
import type { SubPageData } from "./types";

export const sitesWebVitrineData: SubPageData = {
  parentSlug: "sites-web",
  slug: "site-vitrine",
  hero: {
    eyebrow: "Sites Web · Site vitrine",
    headline: "Un site vitrine qui donne envie d'appeler.",
    subHeadline:
      "Sur-mesure, responsive, rapide et référencé. Livré en 48h à 5 jours, à partir de 1 200 €.",
    priceFrom: "1 200 €",
    badges: [
      { label: "Livré en 48h à 5 jours", icon: Clock },
      { label: "Sur-mesure", icon: Sparkles },
    ],
    cta: {
      primary: { label: "Discutons de mon site", href: "/v2/contact" },
      secondary: { label: "Voir les tarifs", href: "#pricing" },
    },
    visual: {
      kind: "image",
      src: "/images/v2/sites-web/vitrine-hero.jpg",
      alt: "Maquettes de sites vitrines livrés par Aurentia",
    },
  },
  forWho: [
    {
      icon: Briefcase,
      title: "Artisans & professions libérales",
      description:
        "Plombier, architecte, coach, avocat… vous avez besoin d'une vitrine pro qui rassure et qui capte des leads locaux.",
    },
    {
      icon: Store,
      title: "Commerçants & boutiques",
      description:
        "Concept store, boutique de quartier, showroom : un site qui reflète votre univers et donne envie de pousser la porte.",
    },
    {
      icon: Sparkles,
      title: "Restaurateurs & hôteliers",
      description:
        "Menu à jour, galerie appétissante, formulaire de réservation, intégration Google Maps : tout ce qu'il faut pour faire venir les clients.",
    },
  ],
  whatYouGet: {
    title: "Ce qui est inclus",
    items: [
      "Design 100% sur-mesure pensé pour votre marque",
      "Jusqu'à 8 pages (Accueil, Services, À propos, Contact, etc.)",
      "Responsive mobile, tablette et desktop",
      "SEO technique complet (metas, sitemap, performance)",
      "Intégration Google Analytics et Google Search Console",
      "Formulaire de contact sécurisé anti-spam",
      "Hébergement sur Vercel (le plus rapide du marché)",
      "Formation et support inclus pendant 30 jours",
    ],
  },
  process: [
    {
      number: "01",
      title: "Brief & contenu",
      description:
        "Un appel de 30 minutes pour cadrer le projet. On récupère vos photos, logos et textes (ou on vous aide à les produire).",
    },
    {
      number: "02",
      title: "Design",
      description:
        "On conçoit des maquettes uniques pour votre marque en 24 à 48h. Deux aller-retours inclus.",
    },
    {
      number: "03",
      title: "Intégration & tests",
      description:
        "Développement responsive, tests sur tous les appareils, optimisation des performances.",
    },
    {
      number: "04",
      title: "Mise en ligne",
      description:
        "Déploiement, formation rapide au back-office, remise des accès, 30 jours de support.",
    },
  ],
  pricing: {
    title: "Des prix clairs, sans surprise",
    subtitle:
      "Pas de facturation cachée, pas de frais mensuels obligatoires. Vous restez propriétaire de tout.",
    packs: [
      {
        name: "Essentiel",
        price: "1 200 €",
        features: [
          "Jusqu'à 4 pages",
          "Design sur-mesure",
          "Responsive complet",
          "SEO technique de base",
          "Formulaire de contact",
          "Mise en ligne + formation",
          "30 jours de support",
        ],
        cta: { label: "Choisir Essentiel", href: "/v2/contact" },
      },
      {
        name: "Pro",
        price: "2 400 €",
        recommended: true,
        features: [
          "Jusqu'à 8 pages",
          "Design sur-mesure premium",
          "Animations subtiles",
          "SEO technique avancé + contenu",
          "Blog intégré",
          "Intégration Analytics & Search Console",
          "60 jours de support",
        ],
        cta: { label: "Choisir Pro", href: "/v2/contact" },
      },
      {
        name: "Premium",
        price: "Sur devis",
        features: [
          "Pages illimitées",
          "Design signature sur-mesure",
          "Animations avancées",
          "Stratégie SEO complète",
          "Multilingue",
          "Intégrations sur-mesure (CRM, réservation…)",
          "90 jours de support prioritaire",
        ],
        cta: { label: "Demander un devis", href: "/v2/contact" },
      },
    ],
    note: "Hébergement Vercel ~20 €/mois facturé directement par Vercel. Nom de domaine à votre charge.",
  },
  examples: {
    title: "Quelques exemples récents",
    items: [
      {
        title: "Atelier Marie — menuiserie d'art",
        imageUrl: "/images/v2/sites-web/example-atelier-marie.jpg",
        href: "/v2/agence",
      },
      {
        title: "Café Lumen — brasserie de quartier",
        imageUrl: "/images/v2/sites-web/example-cafe-lumen.jpg",
        href: "/v2/agence",
      },
      {
        title: "Maître Dufour — cabinet d'avocats",
        imageUrl: "/images/v2/sites-web/example-dufour.jpg",
        href: "/v2/agence",
      },
      {
        title: "Clinique du Parc — ostéopathie",
        imageUrl: "/images/v2/sites-web/example-clinique-parc.jpg",
        href: "/v2/agence",
      },
    ],
  },
  testimonials: [
    {
      quote:
        "J'avais besoin d'un site sérieux pour ma clientèle haut de gamme. Aurentia l'a livré en 4 jours et il est magnifique. On m'en parle à chaque rendez-vous.",
      author: "Claire D.",
      role: "Fondatrice",
      company: "Clinique du Parc",
      pillar: "sites-web",
    },
    {
      quote:
        "Ce qui m'a bluffé c'est la qualité pour le prix. J'avais des devis à 5 000 € ailleurs. Ici j'ai eu mieux pour 1 800 €.",
      author: "Pierre L.",
      role: "Gérant",
      company: "Café Lumen",
      pillar: "sites-web",
    },
  ],
  faq: [
    {
      question: "Combien de temps prend la création du site ?",
      answer:
        "Entre 48h et 5 jours ouvrés selon la complexité et la réactivité sur les contenus. Le format Essentiel est le plus rapide, le format Pro prend généralement 3 à 5 jours.",
    },
    {
      question: "Je n'ai pas de contenu prêt, vous pouvez m'aider ?",
      answer:
        "Oui. On peut rédiger les textes avec vous, organiser un shooting photo simple et même générer des visuels d'illustration si besoin. L'IA nous permet d'être très efficaces sur cette partie.",
    },
    {
      question: "Est-ce que je suis propriétaire du site ?",
      answer:
        "Oui, entièrement. Nom de domaine, code, hébergement : tout est à votre nom. Vous pouvez partir quand vous voulez avec votre site.",
    },
    {
      question: "Quelle est la différence entre Essentiel et Pro ?",
      answer:
        "Essentiel, c'est la vitrine qui rassure : 4 pages, design propre, essentiel. Pro, c'est la vitrine qui convertit : jusqu'à 8 pages, animations, blog et un vrai travail SEO de base. Pour 95% des TPE, Pro est le bon choix.",
    },
    {
      question: "Vous facturez l'hébergement ?",
      answer:
        "Non. L'hébergement Vercel (~20 €/mois) est facturé directement par Vercel sur votre compte. On configure tout mais vous gardez le contrôle.",
    },
    {
      question: "Combien coûte la maintenance après les 30 jours ?",
      answer:
        "Vous n'êtes obligé à rien. Si vous voulez un forfait de maintenance (mises à jour, petites évolutions, support), on propose des packs à partir de 90 €/mois. Sinon, on peut intervenir à la demande.",
    },
    {
      question: "Et si je veux ajouter une boutique en ligne plus tard ?",
      answer:
        "On peut facilement ajouter une couche e-commerce légère (Shopify, Stripe, ou solution custom) en option. On en parle pendant le brief pour tout prévoir.",
    },
  ],
  finalCta: {
    title: "On construit votre site cette semaine ?",
    subtitle:
      "15 minutes au téléphone et vous savez quoi, quand et combien. Devis clair sous 24h.",
    cta: { label: "Réserver un créneau", href: "/v2/contact" },
  },
};

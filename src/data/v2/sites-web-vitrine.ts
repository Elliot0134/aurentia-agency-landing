// src/data/sites-web-vitrine.ts
// DRAFT_COPY — to refine before swap
import {
  Clock,
  MessageSquare,
  Palette,
  Code2,
  Rocket,
  Eye,
  RefreshCw,
  LifeBuoy,
  Search,
  Shield,
} from "lucide-react";
import type { SubPageData } from "./types";

export const sitesWebVitrineData: SubPageData = {
  parentSlug: "sites-web",
  slug: "site-vitrine",
  hero: {
    eyebrow: "Sites Web · Site vitrine",
    headline: "Un site vitrine qui donne envie d'appeler, à partir de 1 500 €.",
    subHeadline:
      "Un site qui inspire confiance, remonte sur Google et vous ramène des clients — sans attendre 3 mois.",
    priceFrom: "1 200 €",
    badges: [],
    cta: {
      primary: { label: "Discutons de mon site", href: "/contact" },
      secondary: { label: "Nos offres", href: "#pricing" },
    },
    visual: {
      kind: "image",
      src: "/images/sites-web/vitrine-hero.jpg",
      alt: "Maquettes de sites vitrines livrés par Aurentia",
    },
  },
  forWho: [
    {
      icon: Rocket,
      title: "Vous n'avez pas encore de site pro",
      description:
        "Vous bossez depuis des mois ou des années, et vous refilez encore votre Insta ou votre Google My Business quand on vous demande un site. Vous voulez exister sérieusement en ligne — et vite.",
    },
    {
      icon: RefreshCw,
      title: "Votre site actuel vous dessert",
      description:
        "Il est vieux, pas mobile, pas sur-mesure. Vous n'osez même plus le partager. Et pire : il fait fuir des clients potentiels avant même qu'ils ne vous contactent.",
    },
    {
      icon: Search,
      title: "Google ne vous voit pas",
      description:
        "Vous avez un site, mais quand on tape votre métier + votre ville, ce sont vos concurrents qui remontent. Vous perdez des leads locaux chaque semaine sans même le savoir.",
    },
  ],
  whatYouGet: {
    title: "Un site qui n'attend plus rien de vous.",
    subtitle:
      "Pas de facturation cachée, pas de devis rallongé en cours de route. Ce qui est inclus est inclus.",
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
    groups: [
      {
        icon: Palette,
        title: "Design sur-mesure",
        pitch: "Un site qui vous ressemble vraiment, pensé pour convertir.",
        items: [
          "Design 100% sur-mesure pensé pour votre marque",
          "Jusqu'à 8 pages (Accueil, Services, À propos, Contact…)",
          "Responsive mobile, tablette et desktop",
        ],
      },
      {
        icon: Search,
        title: "Performance & visibilité",
        pitch: "Noté 100/100 par Google.",
        scores: [
          { label: "Performance", value: 100 },
          { label: "SEO", value: 100 },
          { label: "Accessibilité", value: 100 },
        ],
      },
      {
        icon: Shield,
        title: "Technique & sécurité",
        pitch: "Un site rapide, robuste, et protégé dès le premier jour.",
        items: [
          "Hébergement Vercel (le plus rapide du marché)",
          "SSL + sauvegardes automatiques",
          "Formulaire de contact sécurisé anti-spam",
        ],
      },
      {
        icon: LifeBuoy,
        title: "Accompagnement humain",
        pitch: "Un interlocuteur dédié du brief à la mise en ligne, et 30 jours après.",
        items: [
          "Appel cadrage + maquette validée avant dev",
          "Formation visio à la mise en ligne",
          "Support inclus 30 jours après livraison",
        ],
      },
    ],
  },
  process: [
    {
      number: "01",
      title: "Brief & contenu",
      description:
        "Un appel de 30 minutes pour cadrer le projet. On récupère vos photos, logos et textes (ou on vous aide à les produire).",
      icon: MessageSquare,
    },
    {
      number: "02",
      title: "Design",
      description:
        "On conçoit des maquettes uniques pour votre marque en 24 à 72h. Deux aller-retours inclus.",
      icon: Palette,
    },
    {
      number: "03",
      title: "Intégration & tests",
      description:
        "Développement responsive, tests sur tous les appareils, optimisation des performances.",
      icon: Code2,
    },
    {
      number: "04",
      title: "Mise en ligne",
      description:
        "Déploiement, formation rapide au back-office, remise des accès, 30 jours de support.",
      icon: Rocket,
    },
  ],
  pricing: {
    title: "Un prix clair. Un site qui se rentabilise.",
    subtitle: "3 packs. Pas de surprise. Paiement en 3× possible.",
    packs: [
      {
        name: "Essentiel",
        price: "1 500 €",
        description: "Un site vitrine complet et pro, prêt à convertir.",
        features: [
          "Site vitrine 3 pages",
          "Design sur-mesure — zéro template",
          "Parfait sur mobile + animations",
          "Formulaire de contact",
          "Réservation simple",
          "Référencement Google de base",
          "Mise en ligne sur votre nom de domaine",
        ],
        subscription: "19 €/mois",
        subscriptionDetails:
          "Hébergement, certificat de sécurité, sauvegardes, surveillance, support sous 72h",
        cta: { label: "Choisir l'Essentiel", href: "/contact" },
      },
      {
        name: "Croissance",
        price: "1 900 €",
        description: "Pour ceux qui veulent grandir. Le plus choisi.",
        recommended: true,
        highlightLabel: "POPULAIRE",
        features: [
          "Tout le pack Essentiel",
          "5 pages",
          "Blog + 4 articles par mois optimisés Google",
          "Référencement Google avancé",
          "Site en français et en anglais",
        ],
        subscription: "35 €/mois",
        subscriptionDetails:
          "Plan 19 € + maintenance, 1 modification/mois, support sous 24h, 4 articles/mois",
        cta: { label: "Choisir Croissance", href: "/contact" },
      },
      {
        name: "Premium",
        price: "3 200 €",
        priceNote: "À partir de — sur devis",
        description: "L'offre complète, stratégie incluse.",
        features: [
          "Tout le pack Croissance",
          "Chatbot personnalisé pour votre site",
          "+5 pages",
          "Affichage des avis clients",
          "Formation en visio (1h) pour prendre la main",
        ],
        subscription: "75 €/mois",
        subscriptionDetails:
          "Plan 35 € + modifications illimitées, rapport de visibilité Google mensuel, support sous 12h",
        cta: { label: "Choisir Premium", href: "/contact" },
      },
    ],
    conditions: [
      "Paiement 50% à la V1, solde à la livraison",
      "Paiement en 3x possible",
      "3 tours de révision inclus",
      "1er mois d'abonnement offert",
    ],
    note: "Vous gérez une conciergerie ? On a des packs dédiés avec des fonctionnalités spécifiques.",
    sideLink: { label: "Packs conciergeries", href: "/sites-vitrines/conciergeries" },
  },
  examples: {
    title: "Quelques exemples récents",
    items: [
      {
        title: "Maison Enileh — cuisine libanaise",
        imageUrl: "/images/portfolio/maison-enileh-1.webp",
        href: "/realisations/maison-enileh",
      },
      {
        title: "AlloRestau — restaurant & commandes en ligne",
        imageUrl: "/images/portfolio/allo-restau-1.webp",
        href: "/realisations/allo-restau",
      },
      {
        title: "Savistas — accompagnement entrepreneur",
        imageUrl: "/images/portfolio/savistas-1.webp",
        href: "/realisations/savistas",
      },
      {
        title: "Golf Mentor — coaching golf",
        imageUrl: "/images/portfolio/golf-mentor-1.webp",
        href: "/realisations/golf-mentor",
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
      stat: "Livré en 4 jours",
    },
    {
      quote:
        "Ce qui m'a bluffé c'est la qualité pour le prix. J'avais des devis à 5 000 € ailleurs. Ici j'ai eu mieux pour 1 800 €.",
      author: "Pierre L.",
      role: "Gérant",
      company: "Café Lumen",
      pillar: "sites-web",
      stat: "−64% budget",
    },
  ],
  faq: [
    {
      question: "Combien de temps prend la création du site ?",
      answer:
        "Entre 72h et 5 jours ouvrés selon la complexité et la réactivité sur les contenus. Le format Essentiel est le plus rapide, le format Pro prend généralement 3 à 5 jours.",
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
    cta: { label: "Réserver un créneau", href: "/contact" },
  },
  trustStats: [
    { value: "72h", label: "délai moyen" },
    { value: "20 ans", label: "d'expertise cumulée" },
    { value: "1", label: "interlocuteur dédié" },
    { value: "100%", label: "propriétaire du code" },
  ],
  guarantees: [
    {
      icon: Eye,
      title: "Maquette avant paiement",
      description:
        "Vous voyez le design finalisé avant de signer. Pas convaincu ? Zéro euro déboursé.",
    },
    {
      icon: RefreshCw,
      title: "3 tours de révision inclus",
      description:
        "On ajuste ensemble jusqu'à ce que le site vous ressemble. Sans surcoût caché, sans limite floue.",
    },
    {
      icon: LifeBuoy,
      title: "30 jours de support post-live",
      description:
        "Bug, question, petit ajustement : on reste dispo après la mise en ligne. Vous n'êtes jamais lâché.",
    },
  ],
  comparison: {
    title: "Aurentia vs. le reste",
    subtitle:
      "Ce qu'on fait mieux — et ce qu'on ne prétend pas faire mieux.",
    columns: [
      { label: "Aurentia", highlight: true },
      { label: "Freelance" },
      { label: "Grosse agence" },
    ],
    rows: [
      {
        label: "Prix site vitrine",
        values: ["1 500 – 4 000 €", "500 – 3 000 €", "8 000 – 25 000 €"],
      },
      {
        label: "Délai de livraison",
        values: ["72h – 5 jours", "2 – 6 semaines", "3 – 6 mois"],
      },
      {
        label: "Design 100% sur-mesure",
        values: [true, false, true],
      },
      {
        label: "SEO technique inclus",
        values: [true, false, true],
      },
      {
        label: "Maquette avant paiement",
        values: [true, false, false],
      },
      {
        label: "Support post-live",
        values: ["30 j inclus", "Au cas par cas", "Contrat obligatoire"],
      },
      {
        label: "Propriété du code",
        values: [true, true, false],
      },
    ],
  },
};

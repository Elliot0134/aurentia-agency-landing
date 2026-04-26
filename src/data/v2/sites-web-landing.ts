// src/data/sites-web-landing.ts
import {
  Rocket,
  TrendingUp,
  Briefcase,
  Clock,
  Target,
  MessageSquare,
  Pencil,
  Code2,
  Eye,
  RefreshCw,
  LifeBuoy,
} from "lucide-react";
import type { SubPageData } from "./types";

export const sitesWebLandingData: SubPageData = {
  parentSlug: "sites-web",
  slug: "landing-page",
  hero: {
    eyebrow: "Sites Web · Landing page",
    headline: "Une landing page qui transforme vos visiteurs en clients.",
    subHeadline:
      "Une page unique, écrite pour vendre, livrée en 5 jours. À partir de 1 500 €. Pas de template, pas de blabla — juste ce qui convertit.",
    priceFrom: "1 500 €",
    badges: [
      { label: "Livrée en 5 jours", icon: Clock },
      { label: "Pensée pour vendre", icon: Target },
    ],
    cta: {
      primary: { label: "Réserver mon appel — 15 min", href: "/contact" },
      secondary: { label: "Voir les tarifs", href: "#pricing" },
    },
    visual: {
      kind: "image",
      src: "/images/sites-web/landing-hero.jpg",
      alt: "Exemples de landing pages construites par Aurentia",
    },
  },
  forWho: [
    {
      icon: Rocket,
      title: "Vous lancez un produit ou un service",
      description:
        "Vous mettez de l'argent en pub ou vous activez votre réseau, mais le trafic atterrit sur une page bricolée qui ne ressemble à rien. Résultat : 95% des visiteurs partent sans rien faire.",
    },
    {
      icon: TrendingUp,
      title: "Vous vendez vos services",
      description:
        "Vous voulez que les bons clients vous contactent, pas qu'ils tournent autour pendant 3 semaines. Il vous faut une page qui présente votre offre clairement et pousse à l'action.",
    },
    {
      icon: Briefcase,
      title: "Vous avez une campagne à lancer",
      description:
        "Événement, lancement produit, campagne pub, opération spéciale — il vous faut une page dédiée, vite, sans toucher au site principal et sans payer 6 000 € pour un travail qu'on peut livrer en 5 jours.",
    },
  ],
  whatYouGet: {
    title: "Tout pour vendre. Rien pour faire joli.",
    subtitle:
      "Chaque section est là pour une raison : convaincre, rassurer, faire passer à l'action. Pas de remplissage.",
    items: [
      "Une page sur-mesure pensée pour votre offre, pas un template recyclé",
      "Des textes écrits avec vous pour vraiment parler à vos clients",
      "Un design qui guide le visiteur vers le bouton, sans distraction",
      "Un formulaire de prise de contact ou d'inscription qui marche",
      "Une page rapide, propre sur mobile, bien notée par Google",
      "L'affichage clair en mode clair et sombre",
      "30 jours de support après la mise en ligne, ajustements inclus",
    ],
  },
  process: [
    {
      number: "01",
      title: "On cadre l'objectif",
      description:
        "30 minutes au téléphone : votre offre, votre cible, votre objectif (leads, RDV, ventes). On part de l'action qu'on veut déclencher, pas du design.",
      icon: MessageSquare,
    },
    {
      number: "02",
      title: "On écrit, on dessine",
      description:
        "On rédige les textes avec vous (atelier copy de 60 min) puis on dessine la page autour. Vous validez avant qu'une ligne de code soit écrite.",
      icon: Pencil,
    },
    {
      number: "03",
      title: "On code, on teste",
      description:
        "Mise en page propre, animations fluides, performance verte sur mobile et desktop. Testée sur les vrais appareils, pas dans un simulateur.",
      icon: Code2,
    },
    {
      number: "04",
      title: "On met en ligne",
      description:
        "Mise en ligne sur votre nom de domaine, formulaires connectés à votre CRM, suivi des premiers retours, ajustements inclus pendant 30 jours.",
      icon: Rocket,
    },
  ],
  pricing: {
    title: "Un prix clair. Une page qui se rentabilise vite.",
    subtitle: "Sur-mesure, pas de template. Devis précis après l'appel de cadrage.",
    packs: [
      {
        name: "Landing page sur-mesure",
        price: "1 500 €",
        priceNote: "À partir de — sur devis selon le volume de contenu et les animations",
        description: "Livrée en 5 à 10 jours, prête à recevoir vos premières conversions.",
        features: [
          "Design sur-mesure pensé pour votre offre",
          "Textes écrits avec vous lors d'un atelier copy",
          "Animations fluides — discrètes mais premium",
          "Parfait sur mobile, tablette, ordinateur",
          "SEO de base + intégration analytics",
          "Affichage propre en mode clair et sombre",
          "Mise en ligne clé en main + 30 j de support",
        ],
        cta: { label: "Réserver mon créneau", href: "/contact" },
      },
    ],
    note: "Le prix final dépend du nombre de sections, des animations et du volume de contenu. Devis chiffré sous 24h après l'appel de cadrage. Paiement en 3× possible.",
  },
  examples: {
    title: "Quelques lancements récents",
    items: [
      {
        title: "Allo Restau — landing livraison",
        imageUrl: "/images/portfolio/allo-restau-1.webp",
        href: "/realisations/allo-restau",
      },
      {
        title: "Comparateur IA Facile — landing produit",
        imageUrl: "/realisations/comparateur-ia/hero.webp",
        href: "/realisations/comparateur-ia-facile",
      },
      {
        title: "Maison Enileh — site vitrine",
        imageUrl: "/images/portfolio/maison-enileh-1.webp",
        href: "/realisations/maison-enileh",
      },
      {
        title: "Friend'iz — landing application",
        imageUrl: "/images/portfolio/friendiz-1.webp",
        href: "/realisations/friendiz",
      },
    ],
  },
  testimonials: [],
  faq: [
    {
      question: "Combien de temps pour être en ligne ?",
      answer:
        "5 jours ouvrés en moyenne, 7 à 10 si la copy demande plus d'allers-retours. En urgence, on a déjà livré en 72h — pas garanti, mais on en parle pendant l'appel de cadrage.",
    },
    {
      question: "Qu'est-ce qui rend une landing Aurentia plus performante ?",
      answer:
        "Trois trucs concrets : la copy est écrite avec vous (pas recrachée par une IA), le design est dessiné pour votre cible (pas un template), et la performance technique est au vert (Core Web Vitals 100/100). Peu d'agences font les trois.",
    },
    {
      question: "Je n'ai pas les textes, c'est un problème ?",
      answer:
        "Non, c'est même mieux. On organise un atelier copy de 60 min où on travaille ensemble votre promesse, vos objections et votre narratif. Inclus dans l'offre, pas en supplément.",
    },
    {
      question: "Vous connectez à mon CRM ou mes outils ?",
      answer:
        "Oui. HubSpot, Pipedrive, Airtable, Notion, Supabase, n8n, votre stack custom — on connecte. On en parle pendant le brief, ça reste compris dans le prix sauf intégration vraiment exotique.",
    },
    {
      question: "Je reste propriétaire de la page et du code ?",
      answer:
        "Entièrement. Nom de domaine, code, hébergement, accès analytics : tout est à votre nom. Vous pouvez partir quand vous voulez sans rien perdre.",
    },
    {
      question: "Et si je veux des modifs après les 30 jours ?",
      answer:
        "Pas de forfait obligatoire. On intervient à la demande à 80 €/h, ou on propose un pack maintenance à partir de 90 €/mois si vous voulez du suivi régulier.",
    },
    {
      question: "Pourquoi 1 500 € quand je trouve des landings à 300 € en ligne ?",
      answer:
        "Parce qu'à 300 € vous achetez un template configuré en 2h. Ça peut suffire si vous testez une idée. Si vous mettez du budget pub derrière, chaque pourcent de conversion gagné rentabilise largement la différence.",
    },
  ],
  finalCta: {
    title: "Votre landing en ligne la semaine prochaine ?",
    subtitle:
      "15 minutes au téléphone et vous savez ce qu'on peut faire, quand, et combien. Devis chiffré sous 24h, sans relance.",
    cta: { label: "Réserver mon créneau — 15 min", href: "/contact" },
  },
  trustStats: [
    { value: "5 j", label: "délai moyen" },
    { value: "100/100", label: "performance Google" },
    { value: "1", label: "interlocuteur dédié" },
    { value: "30 j", label: "support après livraison" },
  ],
  guarantees: [
    {
      icon: Eye,
      title: "Vous validez avant qu'on code",
      description:
        "Textes finalisés et maquette validée avant qu'une seule ligne de code soit écrite. Si ça ne vous va pas, on s'arrête là — zéro euro engagé.",
    },
    {
      icon: RefreshCw,
      title: "3 tours de révision compris",
      description:
        "On ajuste ensemble jusqu'à ce que la page vous corresponde. Sans surcoût caché, sans devis qui s'allonge en cours de route.",
    },
    {
      icon: LifeBuoy,
      title: "30 jours de support inclus",
      description:
        "Bugs, ajustements de textes, micro-changements de design : on reste joignable 30 jours après la mise en ligne. Vous n'êtes pas lâché à la livraison.",
    },
  ],
  comparison: {
    title: "Aurentia vs. les autres options",
    subtitle:
      "Vous avez le choix. Voilà ce qu'on fait mieux — et ce qu'on ne prétend pas faire mieux.",
    columns: [
      { label: "Aurentia", highlight: true },
      { label: "Template no-code" },
      { label: "Freelance solo" },
    ],
    rows: [
      {
        label: "Prix landing sur-mesure",
        values: ["1 500 – 4 000 €", "100 – 400 €", "2 000 – 6 000 €"],
      },
      {
        label: "Délai de livraison",
        values: ["5 – 10 jours", "Immédiat", "2 – 5 semaines"],
      },
      {
        label: "Design unique pour votre offre",
        values: [true, false, true],
      },
      {
        label: "Textes écrits avec vous",
        values: [true, false, "Selon le profil"],
      },
      {
        label: "Maquette validée avant le code",
        values: [true, false, "Pas toujours"],
      },
      {
        label: "Support après la mise en ligne",
        values: ["30 j inclus", "Aucun", "Au cas par cas"],
      },
      {
        label: "Performance Google (vitesse)",
        values: ["100/100", "Variable", "Variable"],
      },
      {
        label: "Vous êtes propriétaire du code",
        values: [true, false, true],
      },
    ],
  },
};

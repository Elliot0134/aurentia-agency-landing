// ============================================
// AURENTIA AGENCY — Contenu page /sites-vitrines
// Structured content for the sites vitrines landing page
// ============================================

// ---------------------
// Interfaces
// ---------------------

export interface FeatureCard {
  icon: string; // Lucide icon name
  title: string;
  text: string;
  accent: "orange" | "amber";
}

export interface ProcessStep {
  number: string;
  title: string;
  duration: string;
  text: string;
}

export interface NicheCard {
  icon: string;
  title: string;
  text: string;
  badge?: string;
  link?: string;
  linkText?: string;
  highlighted?: boolean;
}

export interface PricingIncluded {
  text: string;
}

export interface DifferentiateurCard {
  icon: string;
  title: string;
  text: string;
  accent: "orange" | "amber";
  link?: { text: string; href: string };
}

export interface FAQItem {
  question: string;
  answer: string;
  link?: { text: string; href: string };
}

// ---------------------
// Hero
// ---------------------

export const heroContent = {
  badge: "SITES VITRINES SUR-MESURE",
  h1: "Votre site vitrine sur-mesure. Livré en 48h. À partir de 1\u202F200\u202F\u20AC.",
  subtitle:
    "Design unique, SEO intégré, performance native. Propulsé par l\u2019IA, forgé par 20 ans d\u2019expertise web. On vous montre le résultat avant de facturer.",
  cta: "Réserver mon call découverte",
  ctaLink: "https://cal.com/aurentia/site-vitrine",
  proof: "Gratuit \u00B7 20 min \u00B7 On vous montre VOTRE site",
};

// ---------------------
// Features
// ---------------------

export const featuresContent = {
  title: "Tout ce qu\u2019un site pro doit avoir. Rien de superflu.",
  subtitle:
    "Chaque site qu\u2019on livre est complet, fonctionnel et prêt à convertir dès le jour 1.",
};

export const featureCards: FeatureCard[] = [
  {
    icon: "Paintbrush",
    title: "Design sur-mesure",
    text: "Zéro template. Chaque pixel est pensé pour votre activité, votre audience, votre marque. Un site qui ne ressemble à aucun autre.",
    accent: "orange",
  },
  {
    icon: "Search",
    title: "SEO intégré dès le départ",
    text: "Structure technique, balises, vitesse, contenu optimisé. Vous êtes indexé et visible sur Google dès la mise en ligne.",
    accent: "amber",
  },
  {
    icon: "Smartphone",
    title: "Responsive natif",
    text: "Votre site est parfait sur mobile, tablette et desktop. 60% de vos visiteurs arrivent sur téléphone — on le sait.",
    accent: "orange",
  },
  {
    icon: "Zap",
    title: "Performance maximale",
    text: "Temps de chargement inférieur à 2 secondes. Next.js, hébergement Vercel, images optimisées. Vos visiteurs ne patientent pas.",
    accent: "amber",
  },
  {
    icon: "ShieldCheck",
    title: "Sécurisé et maintenable",
    text: "HTTPS, headers sécurisés, code propre et documenté. Votre site est solide, protégé, facile à faire évoluer.",
    accent: "orange",
  },
  {
    icon: "Headphones",
    title: "Accompagnement après livraison",
    text: "On ne disparaît pas après le lancement. Modifications mineures, questions, évolutions — on reste disponible.",
    accent: "amber",
  },
];

// ---------------------
// Process
// ---------------------

export const processContent = {
  badge: "PROCESS EN 48H",
  title: "De l\u2019échange au lancement. En 48 heures.",
  subtitle:
    "Pas de devis qui traîne 3 semaines. Pas de réunions inutiles. Un process direct et efficace.",
};

export const processSteps: ProcessStep[] = [
  {
    number: "01",
    title: "L\u2019échange",
    duration: "20 min",
    text: "Un call de 20 minutes. On comprend votre activité, vos objectifs, votre audience. Vous nous envoyez votre contenu (textes, photos, logo). C\u2019est tout ce dont on a besoin.",
  },
  {
    number: "02",
    title: "La création",
    duration: "24-48h",
    text: "L\u2019IA accélère le design et le code. L\u2019expertise humaine valide chaque choix. On forge votre site sur-mesure — design, contenu, SEO, responsive. Tout.",
  },
  {
    number: "03",
    title: "Votre validation",
    duration: "À votre rythme",
    text: "On vous montre le site terminé. Vous testez, vous regardez chaque page, chaque détail. Retours illimités jusqu\u2019à ce que ce soit parfait. Vous ne payez qu\u2019après validation.",
  },
  {
    number: "04",
    title: "Lancement + suivi",
    duration: "Jour J",
    text: "Mise en ligne sur votre domaine. Configuration email, analytics, Google Business. Et on reste là après — pour les ajustements, les questions, les évolutions.",
  },
];

// ---------------------
// Niches
// ---------------------

export const nichesContent = {
  title: "Un site sur-mesure. Quelle que soit votre activité.",
  subtitle:
    "On travaille niche par niche. Chaque site est pensé pour votre métier, vos clients, vos enjeux.",
  closing:
    "Votre niche n\u2019est pas listée ? On s\u2019adapte. Chaque site est conçu pour votre métier spécifique.",
};

export const nicheCards: NicheCard[] = [
  {
    icon: "Key",
    title: "Conciergeries",
    text: "Locations saisonnières, gestion de biens, accueil voyageurs. Un site qui inspire confiance aux propriétaires et aux locataires.",
    badge: "OFFRE DÉDIÉE",
    link: "/conciergeries",
    linkText: "Découvrir l\u2019offre conciergeries \u2192",
    highlighted: true,
  },
  {
    icon: "Building",
    title: "Hôtels & Hébergements",
    text: "Chambres d\u2019hôtes, hôtels, gîtes. Un site qui donne envie de réserver avant même d\u2019avoir vu les photos.",
  },
  {
    icon: "UtensilsCrossed",
    title: "Restaurants & Bars",
    text: "Votre carte, votre ambiance, vos horaires. Un site qui fait saliver et qui convertit le passant curieux en client.",
  },
  {
    icon: "Store",
    title: "Commerces & Boutiques",
    text: "Artisans, commerçants, boutiques de quartier. Un site vitrine qui attire les clients locaux et renforce votre présence.",
  },
  {
    icon: "Briefcase",
    title: "Professions libérales",
    text: "Avocats, consultants, coachs, thérapeutes. Un site qui pose votre expertise et rassure vos futurs clients.",
  },
  {
    icon: "Dumbbell",
    title: "Salles de sport & Bien-être",
    text: "Studios, salles de sport, spas. Un site qui donne l\u2019énergie de s\u2019inscrire dès la première visite.",
  },
];

// ---------------------
// Pricing
// ---------------------

export const pricingContent = {
  badge: "TARIFS TRANSPARENTS",
  title: "Un site pro. Pas un devis à 5\u202F000\u202F\u20AC.",
  priceLabel: "À partir de",
  priceValue: 900,
  priceSuffix: "\u202F\u20AC",
  subtitle:
    "Le prix varie selon le nombre de pages, les fonctionnalités et le niveau de personnalisation. On en parle pendant le call.",
  note: "Vous gérez une conciergerie ? On a des packs dédiés avec des fonctionnalités spécifiques.",
  noteLink: "/conciergeries",
};

export const pricingIncluded: PricingIncluded[] = [
  { text: "Design sur-mesure — zéro template" },
  { text: "SEO technique optimisé" },
  { text: "Responsive mobile, tablette, desktop" },
  { text: "Hébergement premium (Vercel)" },
  { text: "Certificat SSL / HTTPS" },
  { text: "Analytics intégrés" },
  { text: "Livraison en 48h" },
  { text: "Retours illimités jusqu\u2019à validation" },
  { text: "Accompagnement post-livraison" },
];

// ---------------------
// Differenciateurs
// ---------------------

export const diffContent = {
  title: "Pourquoi Aurentia. Pas une autre agence.",
  subtitle: "Trois raisons. Pas des slogans — des faits.",
};

export const differentiateurs: DifferentiateurCard[] = [
  {
    icon: "Cpu",
    title: "L\u2019IA qui accélère tout",
    text: "Design, code, contenu, SEO — l\u2019IA propulse chaque étape. Pas pour remplacer l\u2019humain. Pour amplifier 20 ans d\u2019expertise. Résultat : 48h au lieu de 6 semaines.",
    accent: "orange",
  },
  {
    icon: "Hammer",
    title: "20 ans de craft web",
    text: "Fabien a forgé des centaines de sites. Il sait ce qui convertit, ce qui dure, ce qui illumine un business. L\u2019IA est un outil. L\u2019\u0153il, c\u2019est 20 ans d\u2019expérience.",
    accent: "amber",
    link: { text: "En savoir plus sur l\u2019équipe \u2192", href: "/a-propos" },
  },
  {
    icon: "Eye",
    title: "On montre avant de facturer",
    text: "Votre site est construit AVANT le call. Vous voyez le résultat, vous jugez. Pas de mockup flou, pas de promesse en l\u2019air. Vous décidez en toute connaissance.",
    accent: "orange",
  },
];

// ---------------------
// Portfolio
// ---------------------

export interface PortfolioItem {
  screenshot: string;
  clientName: string;
  niche: string;
  tag: string;
  duration: string;
  images: string[];
}

export const portfolioContent = {
  badge: "NOS R\u00C9ALISATIONS",
  title: "Ce qu\u2019on a d\u00E9j\u00E0 forg\u00E9.",
  subtitle:
    "Chaque site est unique. Chaque client a une histoire. Voici quelques-unes de nos cr\u00E9ations.",
  counter: 15,
  counterLabel: "sites livr\u00E9s et compt\u00E9s",
  link: "/realisations",
  linkText: "Voir toutes nos r\u00E9alisations \u2192",
};

export const portfolioItems: PortfolioItem[] = [
  {
    screenshot: "/images/portfolio/maison-enileh-1.webp",
    clientName: "Maison Enileh",
    niche: "Conciergerie",
    tag: "Site Vitrine",
    duration: "48h",
    images: ["/images/portfolio/maison-enileh-1.webp"],
  },
  {
    screenshot: "/images/portfolio/comparateur-ia-1.webp",
    clientName: "Comparateur-IA-Facile",
    niche: "SaaS",
    tag: "SaaS",
    duration: "2 semaines",
    images: [
      "/images/portfolio/comparateur-ia-1.webp",
      "/images/portfolio/comparateur-ia-2.webp",
      "/images/portfolio/comparateur-ia-3.webp",
    ],
  },
  {
    screenshot: "/images/portfolio/savistas-1.webp",
    clientName: "Savistas",
    niche: "SaaS + Landing",
    tag: "SaaS + Landing",
    duration: "72h",
    images: ["/images/portfolio/savistas-1.webp"],
  },
  {
    screenshot: "/images/portfolio/friendiz-1.webp",
    clientName: "Friend\u2019iz",
    niche: "E-commerce",
    tag: "E-commerce",
    duration: "2 semaines",
    images: ["/images/portfolio/friendiz-1.webp"],
  },
  {
    screenshot: "/images/portfolio/allo-restau-1.webp",
    clientName: "Allo Restau",
    niche: "Restauration",
    tag: "Landing + SaaS",
    duration: "72h",
    images: [
      "/images/portfolio/allo-restau-1.webp",
      "/images/portfolio/allo-restau-2.webp",
      "/images/portfolio/allo-restau-3.webp",
    ],
  },
  {
    screenshot: "/images/portfolio/golf-mentor-1.webp",
    clientName: "Golf Mentor",
    niche: "Sport",
    tag: "Site Vitrine + SaaS",
    duration: "48h",
    images: ["/images/portfolio/golf-mentor-1.webp"],
  },
];

// ---------------------
// FAQ
// ---------------------

export const faqContent = {
  title: "Vos questions. Nos r\u00E9ponses.",
};

export const faqItems: FAQItem[] = [
  {
    question: "Combien co\u00FBte un site vitrine chez Aurentia\u202F?",
    answer:
      "Nos sites vitrines d\u00E9marrent \u00E0 1\u202F200\u202F\u20AC. Le prix d\u00E9pend du nombre de pages, des fonctionnalit\u00E9s souhait\u00E9es et du niveau de personnalisation. On en parle ensemble pendant le call \u2014 c\u2019est gratuit et sans engagement.",
  },
  {
    question: "Comment c\u2019est possible de livrer en 48h\u202F?",
    answer:
      "L\u2019IA acc\u00E9l\u00E8re le design, le code et le contenu. L\u2019expertise humaine de 20 ans valide chaque choix. On ne b\u00E2cle rien \u2014 notre process est simplement redoutablement efficace. L\u00E0 o\u00F9 une agence classique met 6 semaines, on met 48h.",
  },
  {
    question: "Est-ce que vous utilisez des templates\u202F?",
    answer:
      "Jamais. Chaque site est con\u00E7u sur-mesure pour votre activit\u00E9, votre identit\u00E9 et vos objectifs. On part de z\u00E9ro \u00E0 chaque fois. C\u2019est la seule fa\u00E7on de cr\u00E9er un site qui vous ressemble vraiment.",
  },
  {
    question: "Le SEO est-il inclus\u202F?",
    answer:
      "Oui, dans chaque site. Structure technique optimis\u00E9e, balises meta, vitesse de chargement, responsive, donn\u00E9es structur\u00E9es. Votre site est pr\u00EAt \u00E0 \u00EAtre index\u00E9 et visible d\u00E8s la mise en ligne.",
  },
  {
    question:
      "Je n\u2019ai pas de contenu (textes, photos). Vous pouvez vous en charger\u202F?",
    answer:
      "Oui. On r\u00E9dige le contenu adapt\u00E9 \u00E0 votre activit\u00E9 et optimis\u00E9 SEO. Pour les photos, on peut utiliser des visuels professionnels ou vous accompagner pour un shooting. On s\u2019occupe de tout.",
  },
  {
    question: "Que se passe-t-il apr\u00E8s la livraison\u202F?",
    answer:
      "On ne dispara\u00EEt pas. Modifications mineures, questions techniques, \u00E9volutions \u2014 on reste votre interlocuteur. Et si votre activit\u00E9 grandit, on fait \u00E9voluer le site avec vous.",
  },
  {
    question: "Quelles technologies utilisez-vous\u202F?",
    answer:
      "Next.js, React, Tailwind CSS, h\u00E9bergement Vercel. Ce sont les technologies des plus grandes startups mondiales. Votre site est rapide, s\u00E9curis\u00E9, et techniquement \u00E0 la pointe.",
  },
  {
    question:
      "Je veux aussi un logo / une identit\u00E9 visuelle. C\u2019est possible\u202F?",
    answer:
      "Oui. On propose aussi la cr\u00E9ation d\u2019identit\u00E9 visuelle compl\u00E8te\u202F: logo, charte graphique, univers de marque. 20 ans de direction cr\u00E9ative derri\u00E8re chaque projet. D\u00E9couvrez notre offre identit\u00E9 visuelle.",
    link: {
      text: "D\u00E9couvrir l\u2019offre identit\u00E9 visuelle \u2192",
      href: "/identite-visuelle",
    },
  },
];

// ---------------------
// CTA Final
// ---------------------

export const ctaContent = {
  title: "Pr\u00EAt \u00E0 r\u00E9v\u00E9ler votre business en ligne\u202F?",
  subtitle:
    "On pr\u00E9pare un aper\u00E7u de votre futur site AVANT le call. Vous voyez le r\u00E9sultat, vous jugez. Gratuit. 20 minutes. Sans engagement.",
  cta: "R\u00E9server mon call d\u00E9couverte",
  ctaLink: "https://cal.com/aurentia/site-vitrine",
  proofs: [
    "Gratuit et sans engagement",
    "On vous montre VOTRE site",
    "Livraison en 48h apr\u00E8s validation",
  ],
};

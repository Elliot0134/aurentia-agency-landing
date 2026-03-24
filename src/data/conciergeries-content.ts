// ============================================
// AURENTIA AGENCY — Contenu page /conciergeries
// Structured content for the conciergeries landing page
// ============================================

// ---------------------
// Interfaces
// ---------------------

export interface ConciergeriePain {
  icon: string; // Lucide icon name
  title: string;
  text: string;
  metric: {
    value: number;
    suffix: string;
    label: string;
  };
  detail: string;
}

export interface InnovationItem {
  icon: string;
  title: string;
  description: string;
}

export interface ProcessStep {
  number: string;
  title: string;
  description: string;
  icon: string;
  label: string; // "Jour 0", "Jour 1-2", "Jour 7"
}

export interface SolutionFeature {
  label: string;
  description: string;
}

export interface PricingPlan {
  name: string;
  price: string;
  description: string;
  badge?: string;
  features: string[];
  subscription: string;
  subscriptionLabel: string;
  cta: string;
  highlighted: boolean;
}

export interface ComparisonRow {
  label: string;
  values: (string | boolean)[];
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface LeadMagnetContent {
  title: string;
  subtitle: string;
  bullets: string[];
  ctaText: string;
  disclaimer: string;
}

export interface SocialProofClient {
  name: string;
  city: string;
  screenshot: string;
  url: string;
  testimonial?: {
    quote: string;
    author: string;
    role: string;
    city: string;
  };
}

// ---------------------
// Site config (conciergeries-specific)
// ---------------------

export const conciergeriesSiteConfig = {
  bookingUrl: "https://cal.com/aurentia/site-vitrine",
  leadMagnetConfirmation:
    "Merci ! Vous recevrez le guide dès sa publication.",
};

// ---------------------
// SEO / Metadata
// ---------------------

export const conciergeriesSeo = {
  title: "Site Vitrine Conciergerie Airbnb — Livré en 48h | Aurentia",
  description:
    "Site professionnel sur-mesure pour votre conciergerie. Réservations directes, SEO local, livré en 48h. À partir de 1 200€. On vous montre votre site AVANT le paiement.",
  openGraph: {
    title: "Site vitrine pour conciergerie — Livré en 48h | Aurentia",
    description:
      "On vous montre votre site AVANT que vous payiez. Design sur-mesure, SEO local, réservations directes. À partir de 1 200€.",
    image: "/images/og/conciergeries.jpg",
  },
};

// ---------------------
// Section 1 — Hero
// ---------------------

export const conciergeriesHeroContent = {
  badge: "SITES VITRINES POUR CONCIERGERIES",
  headline:
    "Vos commissions Airbnb financent vos concurrents. Votre site les supprime.",
  subtitle:
    "Un site sur-mesure pour votre conciergerie. Design unique, SEO local, réservations directes. Livré en 48h, à partir de 1 200€. Et on vous le montre AVANT que vous payiez.",
  ctaPrimary: "Voir mon futur site gratuitement",
  ctaSecondary: "Découvrir les tarifs ↓",
  stats: [
    { value: 10000, suffix: "€", label: "économisés en commissions/an" },
    { value: 48, suffix: "h", label: "pour votre V1" },
    { value: 1200, suffix: "€", label: "le pack Essentiel" },
  ],
};

// ---------------------
// Section 2 — Le Problème (3 douleurs)
// ---------------------

export const conciergeriesProblemContent = {
  title:
    "Vous gérez des biens d'exception. Mais en ligne, personne ne le sait.",
  pains: [
    {
      icon: "TrendingDown",
      title: "15-20% de chaque réservation. Envolés.",
      text: "Airbnb et Booking prélèvent leur part sur chaque nuit vendue. Pas 5%. Pas 10%. Jusqu'à 20%.",
      metric: { value: 10000, suffix: "€", label: "perdus par an en moyenne" },
      detail:
        "Sur 50 000€ de CA annuel, c'est 7 500 à 10 000€ qui partent. Chaque année. Sans rien recevoir en retour.",
    },
    {
      icon: "SearchX",
      title:
        '"Conciergerie + votre ville" sur Google. Vous n\'y êtes pas.',
      text: "Un voyageur cherche une conciergerie locale. Un propriétaire cherche un gestionnaire. Ils trouvent vos concurrents.",
      metric: {
        value: 93,
        suffix: "%",
        label: "des expériences en ligne commencent par Google",
      },
      detail:
        "Pas parce qu'ils sont meilleurs. Parce qu'ils ont un site. Vous, non.",
    },
    {
      icon: "UserX",
      title: "Un propriétaire tape votre nom. Il ne trouve rien.",
      text: "Pas de site. Pas de présence. Il confie son bien à un concurrent qui, lui, inspire confiance en ligne.",
      metric: {
        value: 81,
        suffix: "%",
        label: "des gens recherchent en ligne avant de faire confiance",
      },
      detail:
        "Vous perdez des biens. Pas par incompétence. Par invisibilité.",
    },
  ] satisfies ConciergeriePain[],
  conclusion:
    "Le problème, ce n'est pas votre service. C'est que personne ne sait que vous existez.",
};

// ---------------------
// Section 3 — La Solution
// ---------------------

export const conciergeriesSolutionContent = {
  badge: "LA SOLUTION",
  title: "Un site qui travaille pour vous. 24h/24. Sans commission.",
  subtitle:
    "On forge des sites vitrines sur-mesure pour les conciergeries. Pas des templates. Des machines à clients.",
  paragraphs: [
    "Chaque site est unique. Conçu pour VOTRE conciergerie, VOTRE zone géographique, VOS services. L'IA accélère la création — 20 ans d'expertise humaine garantissent la qualité.",
    "Le résultat : un site professionnel qui positionne votre conciergerie sur Google, inspire confiance aux propriétaires, et génère des réservations directes. Sans verser un centime à Airbnb ou Booking.",
  ],
  features: [
    {
      label: "Design sur-mesure",
      description: "zéro template, chaque pixel a une intention",
    },
    {
      label: "SEO local intégré",
      description:
        "vous apparaissez quand on cherche une conciergerie dans votre zone",
    },
    {
      label: "Responsive natif",
      description: "parfait sur mobile, tablette, desktop",
    },
    {
      label: "Réservations directes",
      description: "vos voyageurs réservent chez vous, pas chez Airbnb",
    },
    {
      label: "Contenu optimisé",
      description: "textes pensés pour convertir, pas pour remplir",
    },
  ] satisfies SolutionFeature[],
  mockupImage: "/images/conciergeries/mockup-solution.webp",
};

// ---------------------
// Section 4 — L'Innovation ("On vous montre AVANT")
// ---------------------

export const conciergeriesInnovationContent = {
  badge: "CE QUI CHANGE TOUT",
  title: "On vous montre votre site AVANT que vous payiez.",
  subtitle: "Aucune agence ne fait ça. Nous, c'est la base.",
  items: [
    {
      icon: "Monitor",
      title: "Votre futur site",
      description:
        "Un site fonctionnel, avec votre contenu, vos couleurs, votre identité. Pas un mockup Figma — un vrai site navigable.",
    },
    {
      icon: "BarChart3",
      title: "Votre audit concurrentiel",
      description:
        "Analyse complète de votre présence en ligne et de celle de vos concurrents. Ce qui fonctionne. Ce qui manque. Les opportunités.",
    },
    {
      icon: "Target",
      title: "Votre plan d'action SEO",
      description:
        "Les mots-clés à cibler dans votre zone. Les actions prioritaires. La stratégie pour apparaître sur Google avant vos concurrents.",
    },
  ] satisfies InnovationItem[],
  conclusion:
    'Un seul call de 20 minutes. Vous repartez avec un site, un audit et un plan. Gratuit. Vous ne réfléchissez plus à "est-ce que ça vaut le coup". Vous réfléchissez à "qu\'est-ce que je veux changer".',
};

// ---------------------
// Section 5 — Le Process (3 étapes)
// ---------------------

export const conciergeriesProcessContent = {
  title: "Du brief au site en ligne. 48h.",
  subtitle: "Trois étapes. Zéro prise de tête.",
  steps: [
    {
      number: "01",
      title: "On échange 20 minutes",
      description:
        "Un call rapide pour comprendre votre activité, vos biens, votre zone. On vous montre l'aperçu personnalisé de votre futur site — créé avant même le call. Gratuit et sans engagement.",
      icon: "PhoneCall",
      label: "Jour 0",
    },
    {
      number: "02",
      title: "On forge votre site",
      description:
        "En 24-48h, votre site est prêt. Design unique, responsive, SEO intégré, contenu optimisé. Vous validez, on ajuste. 3 tours de révision inclus. Tant que c'est pas parfait, on ne lance pas.",
      icon: "Hammer",
      label: "Jour 1-2",
    },
    {
      number: "03",
      title: "Vous êtes visible",
      description:
        "En 7 jours max, votre site est en ligne avec votre nom de domaine. Google commence à vous référencer. Les réservations directes peuvent commencer. Vos commissions baissent.",
      icon: "Rocket",
      label: "Jour 7",
    },
  ] satisfies ProcessStep[],
};

// ---------------------
// Section 6 — Social Proof
// ---------------------

export const conciergeriesSocialProofContent = {
  badge: "ILS NOUS FONT CONFIANCE",
  title: "Un site forgé par Aurentia. Jugez par vous-même.",
  client: {
    name: "[Nom de la conciergerie cliente]",
    city: "[Ville]",
    screenshot: "/images/conciergeries/client-site-screenshot.webp",
    url: "#",
    testimonial: {
      quote:
        "[Témoignage réel de la cliente — à rédiger après obtention]",
      author: "[Prénom + initiale]",
      role: "Gérante de conciergerie",
      city: "[Ville]",
    },
  } satisfies SocialProofClient,
  ctaLabel: "Voir le site en direct →",
  fallback: {
    metric: { value: 100, suffix: "%", label: "de clients satisfaits" },
    quote:
      "Tant que c'est pas parfait, on ne lance pas.",
    quoteAuthor: "Promesse Aurentia",
  },
};

// ---------------------
// Section 7 — Pricing (3 packs)
// ---------------------

export const conciergeriesPricingContent = {
  title: "Investissez dans votre visibilité. Pas dans vos commissions.",
  subtitle:
    "Trois formules. Un seul objectif : que votre conciergerie soit vue.",
  plans: [
    {
      name: "Essentiel",
      price: "1 200€",
      description: "Votre vitrine professionnelle, prête en 48h.",
      features: [
        "Site 5 pages, design unique",
        "Responsive mobile + tablette",
        "Animations premium",
        "SEO technique de base",
        "Lead magnet intégré (capture de contacts)",
        "Charte graphique offerte",
        "Analyse de marché offerte",
        "V1 livrée en 24-48h",
      ],
      subscription: "19€/mois",
      subscriptionLabel: "Hébergement + support technique",
      cta: "Réserver mon call",
      highlighted: false,
    },
    {
      name: "Croissance",
      price: "1 490€",
      description: "Votre site + la machine à réservations directes.",
      badge: "Recommandé",
      features: [
        "Tout le pack Essentiel +",
        "Blog + 4 articles SEO par mois",
        "Chatbot IA service client",
        "Pages bilingues FR + Anglais",
        "Intégrations Airbnb/Booking",
        "CRM + outils Aurentia offerts",
        "Stratégie SEO locale personnalisée",
      ],
      subscription: "35€/mois",
      subscriptionLabel: "Maintenance complète + blog SEO",
      cta: "Choisir Croissance",
      highlighted: true,
    },
    {
      name: "Premium",
      price: "Sur devis",
      description: "Votre écosystème digital complet.",
      features: [
        "Tout le pack Croissance +",
        "Système de réservation en ligne + back-office",
        "Création de logo sur-mesure",
        "Module d'avis clients",
        "Formation visio 1h",
        "Accompagnement personnalisé 3 mois",
      ],
      subscription: "75€/mois",
      subscriptionLabel: "Support prioritaire + évolutions",
      cta: "Discuter de mon projet",
      highlighted: false,
    },
  ] satisfies PricingPlan[],
  footer:
    "Paiement en 3 fois sans frais · Premier mois d'abonnement offert · Payez le solde quand vous êtes satisfait",
};

// ---------------------
// Section 8 — Comparaison (Aurentia vs alternatives)
// ---------------------

export const conciergeriesComparisonContent = {
  title:
    "Pourquoi pas une agence classique, un freelance, ou un template ?",
  subtitle: "Comparez. Décidez.",
  columns: ["Agence classique", "Freelance", "Template DIY", "Aurentia"],
  rows: [
    {
      label: "Prix",
      values: ["3 000 - 8 000€", "1 500 - 3 000€", "0 - 200€", "1 200 - 1 990€"],
    },
    {
      label: "Délai",
      values: ["4 - 8 semaines", "2 - 4 semaines", "1 - 2 semaines", "48h"],
    },
    {
      label: "Design sur-mesure",
      values: ["Oui", "Variable", false, true],
    },
    {
      label: "SEO intégré",
      values: ["Parfois (en supplément)", "Rarement", false, "Oui, inclus"],
    },
    {
      label: "Responsive mobile",
      values: ["Oui", "Variable", "Souvent cassé", "Natif"],
    },
    {
      label: "Support long terme",
      values: ["Coûteux (100€+/h)", "Incertain", "Aucun", "Dès 19€/mois"],
    },
    {
      label: "Voir le résultat avant de payer",
      values: [false, false, "N/A", true],
    },
    {
      label: "Connaissance conciergeries",
      values: [false, false, false, "Spécialistes"],
    },
  ] satisfies ComparisonRow[],
  note: "On ne fait pas tout. On fait les sites vitrines pour conciergeries mieux que quiconque.",
};

// ---------------------
// Section 9 — FAQ (10 questions)
// ---------------------

export const conciergeriesFaqContent = {
  title: "Vos questions. Nos réponses.",
  items: [
    {
      question: "Combien coûte un site pour ma conciergerie ?",
      answer:
        "À partir de 1 200€ HT pour le pack Essentiel. Le pack Croissance à 1 990€ ajoute le blog SEO, le chatbot IA et le bilingue. Le pack Premium est sur devis pour un écosystème complet avec réservation en ligne.",
    },
    {
      question: "48h, vraiment ? Pas bâclé ?",
      answer:
        "La V1 est livrée en 24-48h. C'est rapide parce que notre process est efficace, pas parce qu'on coupe des coins. 20 ans d'expertise valident chaque détail. La version finale avec vos retours : 7 jours max.",
    },
    {
      question: "C'est quoi l'IA ? Mon site va ressembler à du généré ?",
      answer:
        "L'IA accélère le design, le code et le SEO. L'expertise humaine valide tout. Le résultat est un site sur-mesure indiscernable d'un site fait par une agence à 5 000€. Zéro template, zéro contenu générique.",
    },
    {
      question: "Ma page Airbnb me suffit, pourquoi un site propre ?",
      answer:
        "Airbnb prend 15-20% par réservation. Sur 50 000€ de CA, c'est 7 500-10 000€ par an. Un site à vous = réservations directes, zéro commission. Le site se rembourse dès la première réservation directe.",
    },
    {
      question: "Et si je ne suis pas satisfait ?",
      answer:
        "Vous voyez le site avant de payer le solde. 3 tours de révision inclus. On ne lance rien tant que ce n'est pas parfait. Et vous gardez l'audit et les recommandations quoi qu'il arrive.",
    },
    {
      question: "J'ai déjà un site, vous pouvez le refaire ?",
      answer:
        "Oui. On fait des refontes complètes. On peut vous montrer un avant/après pendant le call gratuit.",
    },
    {
      question: "Le site sera bien référencé sur Google ?",
      answer:
        "Le SEO technique est intégré dès la création. Avec le pack Croissance, on ajoute 4 articles SEO par mois ciblant les mots-clés de votre zone. Résultat : vous montez progressivement dans les résultats locaux.",
    },
    {
      question: "C'est quoi l'abonnement mensuel ?",
      answer:
        "Hébergement, maintenance, sauvegardes, mises à jour de sécurité, support. À partir de 19€/mois. Premier mois offert. Sans engagement longue durée — vous pouvez arrêter quand vous voulez.",
    },
    {
      question: "Je peux payer en plusieurs fois ?",
      answer:
        "Oui. Paiement en 3 fois sans frais sur tous les packs. Acompte au démarrage, solde quand vous validez le résultat.",
    },
    {
      question: "Mes données sont en sécurité ?",
      answer:
        "Conformité RGPD. Hébergement sécurisé en France/Europe. Votre site et vos données vous appartiennent. Certificat SSL inclus.",
    },
  ] satisfies FAQItem[],
};

// ---------------------
// Section 10 — Lead Magnet
// ---------------------

export const conciergeriesLeadMagnetContent: LeadMagnetContent = {
  title: "Le Guide de la Visibilité en Ligne pour les Conciergeries",
  subtitle:
    "Les stratégies que vos concurrents appliquent déjà. Recevez-le gratuitement.",
  bullets: [
    "Les 5 erreurs que 80% des conciergeries font en ligne",
    "Comment apparaître en première page Google dans votre zone",
    "Le calcul exact de ce que vous coûtent les commissions plateformes",
    "3 actions à faire cette semaine pour vos premières réservations directes",
  ],
  ctaText: "Recevoir le guide gratuitement",
  disclaimer: "Pas de spam. Désinscription en un clic.",
};

// ---------------------
// Section 11 — CTA Final
// ---------------------

export const conciergeriesCtaContent = {
  title: "Prêt à voir votre futur site ?",
  subtitle:
    "On vous prépare un aperçu personnalisé de votre site, un audit de vos concurrents et des recommandations stratégiques. 20 minutes. Gratuit. Sans engagement.",
  cta: "Réserver mon call gratuit",
  proofs: [
    "Gratuit et sans engagement",
    "On vous montre VOTRE site avant le call",
    "Vous gardez l'audit quoi qu'il arrive",
    "Paiement en 3 fois disponible",
  ],
  ps: "Chaque jour sans site, c'est un propriétaire qui choisit un concurrent. Et des commissions qui s'envolent. Le call prend 20 minutes.",
};

// ---------------------
// Navigation (conciergeries page)
// ---------------------

export const conciergeriesNavLinks = [
  { label: "Le problème", href: "#probleme" },
  { label: "La solution", href: "#solution" },
  { label: "Process", href: "#process" },
  { label: "Tarifs", href: "#tarifs" },
  { label: "FAQ", href: "#faq" },
];

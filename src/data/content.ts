// ============================================
// AURENTIA AGENCY — Contenu de la landing page
// Édite ce fichier pour changer le contenu sans toucher aux composants
// ============================================

export const siteConfig = {
  name: "Aurentia Agency",
  url: "https://aurentia.agency",
  currentNiche: "conciergeries",
  bookingUrl: "https://cal.com/elliot-estrade-ixfuya/appel-decouverte",
  email: "elliot.estrade@gmail.com",
  phone: "+33 7 81 95 80 90",
  instagram: "https://instagram.com/aurentia.agency",
  linkedin: "https://linkedin.com/company/aurentia-agency",
};

export const heroContent = {
  headline: "Votre site professionnel en 48h.",
  headlineAccent: "Par l'IA. À partir de 1 200€.",
  subtitle:
    "Un site unique pour votre conciergerie — pas un template. Design sur-mesure, SEO intégré, livré en 48h par notre alliance IA + 20 ans d'expertise web. Et on vous le montre AVANT que vous payiez.",
  ctaPrimary: "Voir ce qu'on peut faire pour vous",
  ctaSecondary: "Découvrir nos réalisations",
  badges: ["Livré en 48h", "Satisfait ou on recommence", "Zéro template"],
  stats: [
    { value: 15, suffix: "+", label: "Sites livrés" },
    { value: 48, suffix: "h", label: "Livraison moyenne" },
    { value: 100, suffix: "%", label: "Satisfaction" },
  ],
};

export const problemContent = {
  title: "Vous êtes un excellent gestionnaire.",
  titleAccent: "Mais sur Google, vous êtes invisible.",
  pains: [
    {
      icon: "💸",
      title: "Les commissions qui saignent",
      text: "Airbnb et Booking prennent 15 à 20% sur chaque réservation.",
      metric: { value: 10000, prefix: "", suffix: "€", label: "perdus par an" },
      detail:
        "Sur 50 000€ de CA annuel = 7 500 à 10 000€ qui s'envolent. Chaque année.",
    },
    {
      icon: "👻",
      title: "L'invisibilité sur Google",
      text: 'Quand un touriste tape "conciergerie [votre ville]" sur Google, il ne vous trouve pas.',
      detail: "Il trouve vos concurrents. Pas parce qu'ils sont meilleurs — juste parce qu'ils ont un site.",
    },
    {
      icon: "🏠",
      title: "La crédibilité propriétaires",
      text: "Un propriétaire cherche une conciergerie. Il tape votre nom. Il ne trouve rien.",
      detail:
        "Vous venez de perdre un bien. Pas parce que vous êtes mauvais. Parce que vous êtes invisible.",
    },
  ],
  conclusion: "Ce n'est pas un problème de compétences. C'est un problème de visibilité.",
};

export const solutionContent = {
  title: "On a créé exactement ce qu'il vous manque.",
  team: [
    {
      name: "Fabien",
      role: "20 ans de création web",
      description: "Il a vu passer WordPress, les templates, les agences à 5 000€. Il sait ce qui fait un bon site.",
      image: "/images/team/fabien.jpg", // TODO: Add actual photo
    },
    {
      name: "Elliot",
      role: "Spécialiste IA & Design",
      description:
        "Il a fusionné l'intelligence artificielle avec l'expertise de son père pour créer un système qui produit des sites pro en 48h.",
      image: "/images/team/elliot.jpg", // TODO: Add actual photo
    },
    {
      name: "Matthieu",
      role: "Développeur Senior",
      description: "Il s'assure que chaque site est sécurisé, rapide, et techniquement irréprochable.",
      image: "/images/team/mathieu.jpg", // TODO: Add actual photo
    },
  ],
  promise:
    "Un site professionnel, 100% unique, livré en 48h, à partir de 1 200€. Et tant que c'est pas parfait, on ne lance pas.",
};

export const innovationContent = {
  title: "On vous montre votre site",
  titleAccent: "AVANT que vous payiez.",
  subtitle: "Aucune agence ne fait ça.",
  items: [
    {
      icon: "🖥️",
      title: "Votre futur site",
      description: "Design personnalisé, fonctionnel, déjà en ligne",
    },
    {
      icon: "📊",
      title: "Votre audit",
      description: "Analyse de votre présence en ligne + benchmark concurrents",
    },
    {
      icon: "🎯",
      title: "Vos recommandations",
      description: "Stratégie SEO + actions prioritaires pour votre zone",
    },
  ],
  conclusion:
    "Un seul lien qui contient tout. Vous ne réfléchissez plus à \"est-ce que ça vaut le coup\". Vous réfléchissez à \"qu'est-ce que je veux changer\".",
};

export const processContent = {
  title: "48h du brief au site en ligne.",
  titleAccent: "Voici comment.",
  steps: [
    {
      number: "01",
      title: "On échange 20 minutes",
      description:
        "Un call rapide pour comprendre votre activité. On vous montre un aperçu personnalisé de votre futur site — créé par notre IA avant même le call. Gratuit et sans engagement.",
      icon: "☎️",
    },
    {
      number: "02",
      title: "On crée votre site",
      description:
        "En 48h, votre site est prêt : design unique, responsive mobile, SEO intégré, lead magnet intégré. Vous validez, on ajuste. 3 tours de révision inclus.",
      icon: "⚡",
    },
    {
      number: "03",
      title: "Vous êtes en ligne",
      description:
        "En 7 jours max, votre site est en ligne avec votre nom de domaine. Les réservations directes peuvent commencer. Google commence à vous référencer.",
      icon: "🚀",
    },
  ],
};

export const portfolioContent = {
  title: "Ils nous ont fait confiance.",
  projects: [
    // TODO: Add real projects
    {
      name: "Conciergerie Azur",
      city: "Nice",
      image: "/images/portfolio/project-1.jpg",
      url: "#",
    },
    {
      name: "LuxStay Gestion",
      city: "Paris",
      image: "/images/portfolio/project-2.jpg",
      url: "#",
    },
    {
      name: "Côte & Clés",
      city: "Cannes",
      image: "/images/portfolio/project-3.jpg",
      url: "#",
    },
  ],
  testimonials: [
    // TODO: Add real testimonials
    {
      quote: "J'aurais aimé faire ça plus tôt. Première réservation directe en 2 semaines.",
      author: "Jean D.",
      role: "Gérant de conciergerie",
      city: "Nice",
    },
  ],
};

export const pricingContent = {
  title: "Choisissez votre formule.",
  plans: [
    {
      name: "Essentiel",
      price: "1 200€",
      description: "Votre vitrine professionnelle, prête en 48h",
      features: [
        "Site 5 pages, design unique",
        "Responsive + animations",
        "SEO de base",
        "Lead magnet intégré",
        "Charte graphique offerte",
        "Analyse de marché offerte",
        "Livraison 48h",
      ],
      subscription: "19€/mois",
      subscriptionLabel: "Hébergement + support",
      cta: "En savoir plus",
      highlighted: false,
    },
    {
      name: "Croissance",
      price: "1 490€",
      description: "Votre site + la machine à clients",
      badge: "Recommandé",
      features: [
        "Tout l'Essentiel +",
        "Blog + 4 articles SEO/mois",
        "Chatbot IA service client",
        "Pages FR + Anglais",
        "Intégrations Airbnb/Booking",
        "CRM + outils Aurentia offerts",
      ],
      subscription: "35€/mois",
      subscriptionLabel: "Maintenance complète",
      cta: "Choisir Croissance",
      highlighted: true,
    },
    {
      name: "Premium",
      price: "Sur devis",
      description: "Votre écosystème digital complet",
      features: [
        "Tout le Croissance +",
        "Réservation en ligne + back-office",
        "Création de logo",
        "Module d'avis clients",
        "Formation visio 1h",
      ],
      subscription: "75€/mois",
      subscriptionLabel: "Support prioritaire",
      cta: "Nous contacter",
      highlighted: false,
    },
  ],
  footer: "Paiement en 3 fois possible · 1er mois d'abonnement offert · Payez le solde quand vous êtes satisfait",
};

export const comparisonContent = {
  title: "Pourquoi pas une agence classique ?",
  columns: ["Agence classique", "Freelance", "Template DIY", "Aurentia"],
  rows: [
    { label: "Prix", values: ["3 000-8 000€", "1 500-3 000€", "0-200€", "1 200-1 990€"] },
    { label: "Délai", values: ["4-8 semaines", "2-4 semaines", "1-2 semaines", "48h"] },
    { label: "Design unique", values: [true, "Souvent", false, true] },
    { label: "SEO intégré", values: ["Parfois", "Rarement", false, true] },
    { label: "Support long terme", values: ["Coûteux", "Incertain", false, "Dès 19€/mois"] },
    { label: "Voir le résultat avant de payer", values: [false, false, false, true] },
  ],
};

export const faqContent = {
  title: "Questions fréquentes.",
  items: [
    {
      question: "C'est quoi l'IA exactement ? Mon site va ressembler à un truc généré ?",
      answer:
        "C'est tout le contraire. L'IA nous permet de créer un design unique pour VOUS, pas un template. Derrière chaque site, il y a 20 ans d'expertise humaine qui valide chaque détail.",
    },
    {
      question: "48h c'est vraiment possible ?",
      answer: "Oui. Notre V1 est livrée en 24-48h. La livraison finale (avec vos retours et ajustements) prend 7 jours max.",
    },
    {
      question: "1 200€ c'est pas trop peu pour un bon site ?",
      answer:
        "Un site équivalent en agence classique coûte 3 000 à 8 000€. Notre prix est bas parce que notre process est efficace — pas parce que la qualité est basse.",
    },
    {
      question: "Mon site Airbnb me suffit, pourquoi un site propre ?",
      answer:
        "Airbnb prend 15-20% de commission par réservation. Un site à vous = réservations directes, zéro commission. Sur 50 000€ de CA, c'est 7 500-10 000€ économisés par an. Le site se rembourse dès la première réservation directe.",
    },
    {
      question: "J'ai déjà un site, vous pouvez le refaire ?",
      answer:
        "Absolument. On fait des refontes complètes. On peut même vous montrer un avant/après de votre site actuel pendant le call gratuit.",
    },
    {
      question: "Et si je suis pas satisfait ?",
      answer:
        "Vous voyez la V1 avant de payer le solde. 3 tours de révision sont inclus. On ne lance rien tant que vous n'êtes pas satisfait.",
    },
    {
      question: "C'est quoi l'abonnement ?",
      answer:
        "L'hébergement, la maintenance, les sauvegardes, le support. À partir de 19€/mois. Premier mois offert. Sans engagement longue durée.",
    },
    {
      question: "Mes données sont en sécurité ?",
      answer: "100%. Conformité RGPD. Serveurs sécurisés en France/Europe. Votre site, c'est votre site.",
    },
  ],
};

export const leadMagnetContent = {
  title: 'Recevez gratuitement : "Le Guide de la Visibilité en Ligne pour les Conciergeries"',
  bullets: [
    "Les 5 erreurs que 80% des conciergeries font en ligne",
    "Comment apparaître en première page Google dans votre zone",
    "Le calcul exact de ce que vous coûtent les commissions plateformes",
    "3 actions à faire cette semaine pour commencer les réservations directes",
  ],
  ctaText: "Recevoir le guide",
  disclaimer: "Pas de spam. Vous pouvez vous désinscrire à tout moment.",
};

export const ctaFinalContent = {
  title: "Prêt à voir votre futur site ?",
  subtitle:
    "On vous prépare un aperçu personnalisé de votre site, un audit de vos concurrents, et des recommandations stratégiques. 100% gratuit. 20 minutes.",
  cta: "Réserver mon call gratuit",
  proofs: [
    "Gratuit et sans engagement",
    "On vous montre VOTRE site",
    "Vous gardez l'audit quoi qu'il arrive",
  ],
};

export const navLinks = [
  { label: "Problème", href: "#probleme" },
  { label: "Solution", href: "#solution" },
  { label: "Process", href: "#process" },
  { label: "Tarifs", href: "#tarifs" },
  { label: "FAQ", href: "#faq" },
];

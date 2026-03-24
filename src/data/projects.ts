// ============================================
// AURENTIA AGENCY — Project data for portfolio & case study pages
// All project content for /realisations and /realisations/[slug]
// ============================================

// --- Types ---

export type ProjectType =
  | "Site vitrine"
  | "SaaS"
  | "Landing page"
  | "Identite visuelle";

export type ProjectStatus = "Livre" | "En cours";

export interface ProjectFeature {
  icon: string; // Lucide icon name
  title: string;
  description: string;
}

export interface ProjectResult {
  metric: string;
  value: string;
  context?: string;
}

export interface ProjectTestimonial {
  quote: string;
  author: string;
  role: string;
  avatar?: string;
}

export interface Project {
  slug: string;
  name: string;
  type: ProjectType;
  city: string;
  coverImage: string;
  images: string[];
  tags: string[];
  duration: string;
  status: ProjectStatus;
  clientName?: string;
  clientRole?: string;
  clientLogo?: string;
  context: string;
  problem: string;
  solution: string;
  features: ProjectFeature[];
  results: ProjectResult[];
  testimonial?: ProjectTestimonial;
  technologies: string[];
  liveUrl?: string;
  year: number;
}

// --- Projects Data ---

export const projects: Project[] = [
  // ---- Conciergerie Azur ----
  {
    slug: "conciergerie-azur",
    name: "Conciergerie Azur",
    type: "Site vitrine",
    city: "Nice",
    coverImage: "/images/portfolio/conciergerie-azur-cover.webp", // [PLACEHOLDER]
    images: [
      "/images/portfolio/conciergerie-azur-1.webp", // [PLACEHOLDER]
      "/images/portfolio/conciergerie-azur-2.webp", // [PLACEHOLDER]
      "/images/portfolio/conciergerie-azur-3.webp", // [PLACEHOLDER]
      "/images/portfolio/conciergerie-azur-mobile.webp", // [PLACEHOLDER]
    ],
    tags: ["Design UI", "Developpement", "SEO", "Responsive"],
    duration: "48h",
    status: "Livre",
    clientName: "Thomas R.",
    clientRole: "Fondateur",
    context:
      "Conciergerie Azur gere 15 biens en location saisonniere sur la Cote d'Azur. Services premium : accueil voyageurs, menage, maintenance, gestion des annonces. Une reputation solide aupres des proprietaires. Mais un probleme majeur : zero presence digitale.",
    problem:
      "Aucun site web. Aucune visibilite sur Google. Les concurrents de Nice et alentours captaient les recherches 'conciergerie Airbnb Nice' et 'gestion locative saisonniere Nice'. Le bouche-a-oreille atteignait ses limites. Pour passer de 15 a 30 biens geres, il fallait etre visible la ou les proprietaires cherchent : en ligne.",
    solution:
      "Un site vitrine sur-mesure qui positionne Conciergerie Azur comme la reference de la gestion locative premium a Nice. Design haut de gamme, contenu optimise SEO, experience mobile impeccable.",
    features: [
      {
        icon: "Palette",
        title: "Design sur-mesure",
        description:
          "Un univers visuel premium qui reflete le positionnement haut de gamme de la conciergerie.",
      },
      {
        icon: "Search",
        title: "SEO local integre",
        description:
          "Optimise pour 'conciergerie Nice' et 12 autres mots-cles strategiques.",
      },
      {
        icon: "Smartphone",
        title: "Responsive natif",
        description:
          "Experience fluide sur tous les ecrans. 65% des visiteurs arrivent sur mobile.",
      },
      {
        icon: "Zap",
        title: "Performance maximale",
        description:
          "Score PageSpeed 95+ mobile. Chargement en moins de 1.5 seconde.",
      },
      {
        icon: "MessageCircle",
        title: "Formulaire intelligent",
        description:
          "Capture le type de bien, la localisation et le besoin. Chaque lead arrive qualifie.",
      },
      {
        icon: "Shield",
        title: "Hebergement et maintenance",
        description:
          "Deploye sur Vercel. HTTPS, backups, mises a jour. Ca tourne.",
      },
    ],
    results: [
      {
        metric: "Biens geres",
        value: "15 → 24",
        context: "En 3 mois apres le lancement",
      },
      {
        metric: "Position Google",
        value: "Top 5",
        context: "Sur 'conciergerie Nice' et 8 mots-cles locaux",
      },
      {
        metric: "Chargement",
        value: "1.2s",
        context: "Score PageSpeed mobile : 96",
      },
      {
        metric: "Leads qualifies",
        value: "+340%",
        context: "Via le formulaire de contact en 3 mois",
      },
    ],
    testimonial: {
      quote:
        "En 48h on avait un site qui ressemble enfin a ce qu'on fait. Les proprietaires nous trouvent sur Google maintenant. On a signe 9 nouveaux biens en 3 mois.",
      author: "Thomas R.",
      role: "Fondateur, Conciergerie Azur",
    },
    technologies: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Framer Motion",
      "Vercel",
      "Claude AI",
    ],
    liveUrl: "https://conciergerie-azur.fr", // [PLACEHOLDER]
    year: 2025,
  },

  // ---- LuxStay Gestion ----
  {
    slug: "luxstay-gestion",
    name: "LuxStay Gestion",
    type: "SaaS",
    city: "Paris",
    coverImage: "/images/portfolio/luxstay-gestion-cover.webp", // [PLACEHOLDER]
    images: [
      "/images/portfolio/luxstay-gestion-1.webp", // [PLACEHOLDER]
      "/images/portfolio/luxstay-gestion-2.webp", // [PLACEHOLDER]
      "/images/portfolio/luxstay-gestion-3.webp", // [PLACEHOLDER]
    ],
    tags: ["Design UI", "Developpement", "Dashboard", "Automatisation"],
    duration: "3 semaines",
    status: "Livre",
    clientName: "Sarah M.",
    clientRole: "CEO",
    context:
      "LuxStay gere un portefeuille de 45 biens haut de gamme a Paris. Reservations, check-in, menage, comptabilite — tout etait gere sur Excel et WhatsApp. 3 employes passaient 60% de leur temps sur des taches repetitives au lieu de developper le portefeuille.",
    problem:
      "Pas de vision centralisee. Les doubles reservations arrivaient 2 a 3 fois par mois. Le suivi financier etait approximatif. Les proprietaires recevaient leurs rapports en retard. L'equipe etait noyee dans l'operationnel. Impossible de scaler au-dela de 50 biens sans recruter.",
    solution:
      "Un tableau de bord SaaS sur-mesure qui centralise la gestion de tous les biens : calendrier de reservations, suivi financier en temps reel, rapports proprietaires automatises, gestion des prestataires de menage.",
    features: [
      {
        icon: "LayoutDashboard",
        title: "Dashboard centralise",
        description:
          "Vue d'ensemble de tous les biens, reservations et revenus. En un coup d'oeil.",
      },
      {
        icon: "Calendar",
        title: "Calendrier synchronise",
        description:
          "Synchronisation avec Airbnb, Booking, et le channel manager. Zero double reservation.",
      },
      {
        icon: "BarChart3",
        title: "Rapports proprietaires",
        description:
          "Generation automatique des rapports mensuels. Chaque proprietaire recoit le sien par email.",
      },
      {
        icon: "Users",
        title: "Gestion prestataires",
        description:
          "Attribution automatique des menages selon le planning. Notifications en temps reel.",
      },
      {
        icon: "CreditCard",
        title: "Suivi financier",
        description:
          "Revenus, commissions, charges — tout est trace. Export comptable en un clic.",
      },
      {
        icon: "Bell",
        title: "Alertes intelligentes",
        description:
          "Notifications pour les check-in imminents, les problemes signales, les rapports en retard.",
      },
    ],
    results: [
      {
        metric: "Temps admin",
        value: "-70%",
        context: "De 60% du temps a 18% du temps sur l'operationnel",
      },
      {
        metric: "Doubles reservations",
        value: "0",
        context: "Contre 2-3 par mois avant",
      },
      {
        metric: "Biens geres",
        value: "45 → 62",
        context: "Sans recrutement supplementaire",
      },
      {
        metric: "Satisfaction proprietaires",
        value: "98%",
        context: "Enquete apres 2 mois d'utilisation",
      },
    ],
    testimonial: {
      quote:
        "On est passes de 3 tableurs et 12 groupes WhatsApp a un seul outil. L'equipe respire. Les proprietaires nous font plus confiance que jamais.",
      author: "Sarah M.",
      role: "CEO, LuxStay Gestion",
    },
    technologies: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Supabase",
      "Stripe",
      "Vercel",
      "Claude AI",
    ],
    liveUrl: "https://app.luxstay-gestion.fr", // [PLACEHOLDER]
    year: 2025,
  },

  // ---- Cote & Cles ----
  {
    slug: "cote-et-cles",
    name: "Cote & Cles",
    type: "Site vitrine",
    city: "Cannes",
    coverImage: "/images/portfolio/cote-et-cles-cover.webp", // [PLACEHOLDER]
    images: [
      "/images/portfolio/cote-et-cles-1.webp", // [PLACEHOLDER]
      "/images/portfolio/cote-et-cles-2.webp", // [PLACEHOLDER]
      "/images/portfolio/cote-et-cles-3.webp", // [PLACEHOLDER]
    ],
    tags: ["Design UI", "Developpement", "SEO", "Identite visuelle"],
    duration: "48h",
    status: "Livre",
    clientName: "Julie et Marc D.",
    clientRole: "Co-fondateurs",
    context:
      "Cote & Cles est une conciergerie familiale a Cannes. Specialisee dans les villas de prestige pour le Festival de Cannes et la saison estivale. 8 biens exceptionnels, un service ultra-personnalise. Mais un site WordPress vieillissant qui ne refletait plus le standing de leurs proprietes.",
    problem:
      "Le site existant datait de 2019. Design generique, non responsive, pas de SEO. Les proprietaires de villas haut de gamme jugeaient la conciergerie sur son site — et partaient voir ailleurs. Pendant le Festival de Cannes, les recherches 'location villa prestige Cannes' explosaient mais Cote & Cles n'apparaissait nulle part.",
    solution:
      "Refonte complete avec une identite visuelle premium qui respire le luxe mediterraneen. Site sur-mesure avec galerie immersive des proprietes, formulaire de reservation, et SEO local cible sur les periodes de forte demande.",
    features: [
      {
        icon: "Sparkles",
        title: "Identite visuelle premium",
        description:
          "Nouvelle charte graphique, palette mediterraneenne, typographie elegante. L'image de marque a la hauteur des proprietes.",
      },
      {
        icon: "GalleryHorizontalEnd",
        title: "Galerie immersive",
        description:
          "Chaque propriete a sa page dediee avec photos plein ecran, equipements, et disponibilites.",
      },
      {
        icon: "Search",
        title: "SEO evenementiel",
        description:
          "Strategie SEO ciblee sur le Festival de Cannes et la saison estivale. Contenus saisonniers pre-indexes.",
      },
      {
        icon: "Globe",
        title: "Bilingue FR/EN",
        description:
          "Interface complete en francais et anglais pour capter la clientele internationale.",
      },
      {
        icon: "Calendar",
        title: "Calendrier de disponibilite",
        description:
          "Chaque propriete affiche ses disponibilites en temps reel. Les visiteurs reservent directement.",
      },
      {
        icon: "Palette",
        title: "Design sur-mesure",
        description:
          "Aucun template. Chaque page est dessinee et codee a la main pour cette conciergerie.",
      },
    ],
    results: [
      {
        metric: "Reservations directes",
        value: "+180%",
        context: "Pendant la saison du Festival de Cannes",
      },
      {
        metric: "Position Google",
        value: "Top 3",
        context: "Sur 'location villa prestige Cannes'",
      },
      {
        metric: "Taux de rebond",
        value: "-45%",
        context: "Les visiteurs restent et explorent les proprietes",
      },
      {
        metric: "Nouveaux proprietaires",
        value: "+3",
        context:
          "Signes en 2 mois grace a la credibilite du nouveau site",
      },
    ],
    testimonial: {
      quote:
        "Nos proprietaires nous disent que le site est a la hauteur de leurs villas. C'est le plus beau compliment qu'on puisse recevoir.",
      author: "Julie D.",
      role: "Co-fondatrice, Cote & Cles",
    },
    technologies: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Framer Motion",
      "Vercel",
      "Claude AI",
    ],
    liveUrl: "https://cote-et-cles.fr", // [PLACEHOLDER]
    year: 2025,
  },

  // ---- Comparateur-IA-Facile ----
  {
    slug: "comparateur-ia-facile",
    name: "Comparateur-IA-Facile",
    type: "SaaS",
    city: "France",
    coverImage: "/images/portfolio/comparateur-ia-1.webp",
    images: [
      "/images/portfolio/comparateur-ia-1.webp",
      "/images/portfolio/comparateur-ia-2.webp",
      "/images/portfolio/comparateur-ia-3.webp",
    ],
    tags: ["Charte graphique", "Design UI", "Developpement", "SEO"],
    duration: "2 semaines",
    status: "Livre",
    clientName: "Elliot E.",
    clientRole: "Fondateur",
    context:
      "Comparateur-IA-Facile est un comparateur d'outils d'intelligence artificielle destine au grand public francophone. L'objectif : rendre l'IA accessible en permettant a chacun de trouver l'outil adapte a son besoin en quelques clics.",
    problem:
      "Le marche de l'IA evolue si vite que les utilisateurs non-techniques sont perdus. Des dizaines de nouveaux outils chaque semaine, des comparatifs en anglais, des articles techniques incomprehensibles. Aucune plateforme francophone ne proposait un comparatif clair, objectif et mis a jour.",
    solution:
      "Une plateforme SaaS complete avec fiches detaillees de chaque outil IA, systeme de filtrage avance, comparaison cote a cote, et contenu SEO optimise pour capter le trafic organique francophone.",
    features: [
      {
        icon: "Search",
        title: "Moteur de recherche avance",
        description:
          "Filtrage par categorie, prix, fonctionnalites et cas d'usage. Trouver l'outil adapte en 10 secondes.",
      },
      {
        icon: "BarChart3",
        title: "Comparaison cote a cote",
        description:
          "Comparer jusqu'a 3 outils simultanement sur tous les criteres : prix, features, limites.",
      },
      {
        icon: "FileText",
        title: "Fiches detaillees",
        description:
          "Chaque outil a sa fiche complete : description, tarifs, avantages, inconvenients, alternatives.",
      },
      {
        icon: "TrendingUp",
        title: "SEO organique",
        description:
          "Architecture SEO pensee pour capter les recherches 'meilleur outil IA pour...' en francais.",
      },
    ],
    results: [
      {
        metric: "Outils references",
        value: "150+",
        context: "Et de nouveaux chaque semaine",
      },
      {
        metric: "Visiteurs/mois",
        value: "12K+",
        context: "Trafic organique en croissance",
      },
      {
        metric: "Pages indexees",
        value: "200+",
        context: "Contenu SEO structure",
      },
      {
        metric: "Temps moyen",
        value: "3min 20s",
        context: "Les utilisateurs explorent et comparent",
      },
    ],
    technologies: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Supabase",
      "Vercel",
      "Claude AI",
    ],
    liveUrl: "https://comparateur-ia-facile.com",
    year: 2025,
  },

  // ---- Balto ----
  {
    slug: "balto",
    name: "Balto",
    type: "Landing page",
    city: "Nice",
    coverImage: "/images/portfolio/balto-cover.webp", // [PLACEHOLDER]
    images: [
      "/images/portfolio/balto-1.webp", // [PLACEHOLDER]
      "/images/portfolio/balto-2.webp", // [PLACEHOLDER]
    ],
    tags: ["Design UI", "Developpement", "Landing page", "Conversion"],
    duration: "72h",
    status: "Livre",
    clientName: "Alex P.",
    clientRole: "Fondateur",
    context:
      "Balto est une application de livraison locale a Nice. Le produit etait pret a lancer mais il manquait une page de lancement pour expliquer le concept, capturer les premiers utilisateurs et convaincre les commercants partenaires de rejoindre la plateforme.",
    problem:
      "Pas de presence web. Le pitch en face-a-face fonctionnait mais ne scalait pas. Les commercants demandaient un site a montrer a leur equipe avant de signer. Les premiers utilisateurs potentiels n'avaient nulle part ou s'inscrire en avance.",
    solution:
      "Une landing page haute conversion avec deux parcours distincts : un pour les utilisateurs (inscription early access) et un pour les commercants (formulaire de partenariat). Design moderne, animations premium, message clair.",
    features: [
      {
        icon: "Target",
        title: "Double funnel",
        description:
          "Deux parcours de conversion : utilisateurs early access et commercants partenaires. Chacun avec son propre CTA.",
      },
      {
        icon: "Sparkles",
        title: "Design premium",
        description:
          "Animations fluides, micro-interactions, design qui inspire confiance avant meme que le produit soit lance.",
      },
      {
        icon: "BarChart3",
        title: "Tracking conversion",
        description:
          "Chaque CTA, chaque scroll, chaque interaction est tracke. A/B test pret.",
      },
      {
        icon: "Smartphone",
        title: "Mobile-first",
        description:
          "80% du trafic prevu sur mobile. La page est concue pour le pouce d'abord.",
      },
    ],
    results: [
      {
        metric: "Inscrits early access",
        value: "320+",
        context: "En 2 semaines de lancement",
      },
      {
        metric: "Commercants partenaires",
        value: "12",
        context: "Signes via le formulaire en 1 mois",
      },
      {
        metric: "Taux de conversion",
        value: "8.4%",
        context: "Visiteurs vers inscrits early access",
      },
      {
        metric: "Temps sur page",
        value: "2min 40s",
        context: "Moyenne — le contenu engage",
      },
    ],
    testimonial: {
      quote:
        "Les commercants voient la landing page et signent. Avant, je devais faire un pitch de 30 minutes. Maintenant je leur envoie le lien.",
      author: "Alex P.",
      role: "Fondateur, Balto",
    },
    technologies: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Framer Motion",
      "Vercel",
      "Claude AI",
    ],
    liveUrl: "https://balto.app", // [PLACEHOLDER]
    year: 2025,
  },

  // ---- High Love ----
  {
    slug: "high-love",
    name: "High Love",
    type: "Identite visuelle",
    city: "Nice",
    coverImage: "/images/portfolio/high-love-cover.webp", // [PLACEHOLDER]
    images: [
      "/images/portfolio/high-love-1.webp", // [PLACEHOLDER]
      "/images/portfolio/high-love-2.webp", // [PLACEHOLDER]
    ],
    tags: ["Identite visuelle", "Charte graphique", "Direction artistique"],
    duration: "En cours",
    status: "En cours",
    context:
      "High Love est une marque lifestyle basee a Nice. L'identite visuelle existante ne correspondait plus au positionnement premium que la marque souhaitait incarner. Il fallait repenser l'ensemble : logo, palette, typographie, systeme visuel.",
    problem:
      "Une identite fragmentee, construite au fil du temps sans coherence. Le logo date de la creation. Les couleurs changent d'un support a l'autre. Les clients ne reconnaissent pas la marque d'un canal a l'autre. Impossible de construire une communaute fidele sans une image forte et coherente.",
    solution:
      "Refonte complete de l'identite visuelle. Un systeme de marque coherent, premium et adaptable a tous les supports : digital, print, packaging, reseaux sociaux.",
    features: [
      {
        icon: "Palette",
        title: "Nouvelle palette",
        description:
          "Des couleurs qui racontent l'histoire de la marque. Premium, chaleureuses, reconnaissables au premier regard.",
      },
      {
        icon: "Type",
        title: "Systeme typographique",
        description:
          "Selection et hierarchie de fonts qui incarnent le ton de la marque. Du logo aux posts Instagram.",
      },
      {
        icon: "Layers",
        title: "Systeme visuel modulaire",
        description:
          "Des composants visuels reutilisables sur tous les supports. Coherence sans rigidite.",
      },
      {
        icon: "FileImage",
        title: "Brand guidelines",
        description:
          "Un document complet qui garantit que chaque creation respecte l'identite. Utilisable par n'importe quel designer.",
      },
    ],
    results: [
      {
        metric: "Statut",
        value: "En cours",
        context: "Livraison prevue T2 2026",
      },
    ],
    technologies: ["Figma", "Claude AI", "Adobe Illustrator"],
    year: 2026,
  },

  // ---- Maison Enileh ----
  {
    slug: "maison-enileh",
    name: "Maison Enileh",
    type: "Site vitrine",
    city: "Avignon",
    coverImage: "/images/portfolio/maison-enileh-1.webp",
    images: ["/images/portfolio/maison-enileh-1.webp"],
    tags: ["Charte graphique", "Design UI", "Developpement", "SEO"],
    duration: "48h",
    status: "Livre",
    context:
      "Maison Enileh est une marque basee a Avignon qui avait besoin d'une presence en ligne professionnelle pour refleter la qualite de ses produits et services. Aucun site existant, toute la communication passait par les reseaux sociaux.",
    problem:
      "Sans site web, la marque dependait exclusivement d'Instagram et du bouche-a-oreille. Les clients potentiels qui cherchaient la marque sur Google ne trouvaient rien. La credibilite souffrait face aux concurrents qui avaient une presence web etablie.",
    solution:
      "Un site vitrine elegant et rapide, avec une charte graphique sur-mesure, un SEO optimise pour le referencement local, et une experience utilisateur fluide sur tous les appareils.",
    features: [
      {
        icon: "Palette",
        title: "Charte graphique",
        description:
          "Identite visuelle complete creee de zero : logo, couleurs, typographie, univers de marque.",
      },
      {
        icon: "Search",
        title: "SEO local",
        description:
          "Optimisation pour les recherches locales a Avignon et dans la region.",
      },
      {
        icon: "Smartphone",
        title: "Responsive design",
        description:
          "Experience parfaite sur mobile, tablette et desktop.",
      },
      {
        icon: "Zap",
        title: "Performance",
        description:
          "Site ultra-rapide, score PageSpeed optimal. Chargement instantane.",
      },
    ],
    results: [
      {
        metric: "Mise en ligne",
        value: "48h",
        context: "Du brief au site en ligne",
      },
      {
        metric: "Score PageSpeed",
        value: "95+",
        context: "Performance mobile optimale",
      },
    ],
    technologies: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Framer Motion",
      "Vercel",
      "Claude AI",
    ],
    year: 2025,
  },

  // ---- Savistas ----
  {
    slug: "savistas",
    name: "Savistas",
    type: "SaaS",
    city: "France",
    coverImage: "/images/portfolio/savistas-1.webp",
    images: ["/images/portfolio/savistas-1.webp"],
    tags: [
      "Charte graphique",
      "Design UI",
      "Developpement",
      "Landing page",
    ],
    duration: "72h",
    status: "Livre",
    context:
      "Savistas est un produit SaaS qui avait besoin d'une landing page percutante et d'une interface utilisateur soignee pour convertir les visiteurs en utilisateurs. Le produit etait fonctionnel mais manquait d'une vitrine a la hauteur.",
    problem:
      "Un produit solide mais invisible. Pas de page de presentation, pas de parcours de conversion clair. Les utilisateurs potentiels ne comprenaient pas la proposition de valeur en arrivant sur le site existant.",
    solution:
      "Charte graphique complete, landing page haute conversion avec un message clair, et refonte du design UI de l'application pour une experience utilisateur premium.",
    features: [
      {
        icon: "Palette",
        title: "Charte graphique",
        description:
          "Univers visuel complet : couleurs, typographie, icones, style photographique.",
      },
      {
        icon: "Layout",
        title: "Design UI",
        description:
          "Interface utilisateur repensee pour la clarte et l'efficacite.",
      },
      {
        icon: "Target",
        title: "Landing page conversion",
        description:
          "Page d'accueil optimisee pour convertir les visiteurs en utilisateurs.",
      },
      {
        icon: "Zap",
        title: "Developpement rapide",
        description: "Livraison en 72h, du brief au deploiement.",
      },
    ],
    results: [
      {
        metric: "Livraison",
        value: "72h",
        context: "Du brief au site en ligne",
      },
      {
        metric: "Conversion",
        value: "Amelioree",
        context: "Landing page optimisee pour le funnel d'acquisition",
      },
    ],
    technologies: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Framer Motion",
      "Vercel",
      "Claude AI",
    ],
    year: 2025,
  },

  // ---- Friend'iz ----
  {
    slug: "friendiz",
    name: "Friend'iz",
    type: "Site vitrine",
    city: "France",
    coverImage: "/images/portfolio/friendiz-1.webp",
    images: ["/images/portfolio/friendiz-1.webp"],
    tags: ["Charte graphique", "Design UI", "Developpement"],
    duration: "2 semaines",
    status: "Livre",
    context:
      "Friend'iz est une plateforme sociale qui avait besoin d'un site vitrine pour presenter son concept et attirer ses premiers utilisateurs. Le projet necessitait une identite visuelle forte et un site qui reflete l'esprit communautaire de la marque.",
    problem:
      "Aucune presence web pour expliquer le concept. Les premiers utilisateurs arrivaient uniquement par le bouche-a-oreille, sans pouvoir decouvrir la plateforme en ligne avant de s'inscrire.",
    solution:
      "Creation d'une identite visuelle complete et d'un site vitrine engageant qui presente le concept, les fonctionnalites et donne envie de rejoindre la communaute.",
    features: [
      {
        icon: "Palette",
        title: "Charte graphique",
        description:
          "Identite visuelle chaleureuse et communautaire, a l'image de la plateforme.",
      },
      {
        icon: "Layout",
        title: "Design UI",
        description:
          "Interface claire et engageante qui donne envie de decouvrir la plateforme.",
      },
      {
        icon: "Code",
        title: "Developpement",
        description:
          "Site performant et responsive, deploye rapidement pour accompagner le lancement.",
      },
    ],
    results: [
      {
        metric: "Livraison",
        value: "2 semaines",
        context: "Charte graphique + site complet",
      },
    ],
    technologies: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Framer Motion",
      "Vercel",
      "Claude AI",
    ],
    year: 2025,
  },

  // ---- Allo Restau ----
  {
    slug: "allo-restau",
    name: "Allo Restau",
    type: "Landing page",
    city: "France",
    coverImage: "/images/portfolio/allo-restau-1.webp",
    images: [
      "/images/portfolio/allo-restau-1.webp",
      "/images/portfolio/allo-restau-2.webp",
      "/images/portfolio/allo-restau-3.webp",
    ],
    tags: ["Charte graphique", "Design UI", "Developpement", "SEO"],
    duration: "72h",
    status: "Livre",
    context:
      "Allo Restau est un service de livraison de repas qui avait besoin d'une landing page professionnelle pour presenter son offre et convertir les visiteurs en clients. Le marche est ultra-concurrentiel et la premiere impression est cruciale.",
    problem:
      "Un service de qualite mais aucune presence web digne de ce nom. Les concurrents avaient des sites modernes et des parcours de commande fluides. Sans landing page convaincante, Allo Restau perdait des clients potentiels a chaque recherche Google.",
    solution:
      "Une landing page percutante avec charte graphique appetissante, SEO optimise pour les recherches locales, et un parcours de conversion clair vers la commande.",
    features: [
      {
        icon: "Palette",
        title: "Charte graphique",
        description:
          "Univers visuel appetissant et moderne, adapte au secteur de la restauration.",
      },
      {
        icon: "Search",
        title: "SEO local",
        description:
          "Optimisation pour les recherches de livraison de repas dans la zone de service.",
      },
      {
        icon: "Target",
        title: "Conversion optimisee",
        description:
          "Chaque element de la page guide vers la commande. CTAs strategiques.",
      },
      {
        icon: "Smartphone",
        title: "Mobile-first",
        description:
          "La majorite des commandes passent sur mobile. Le site est concu pour ca.",
      },
    ],
    results: [
      {
        metric: "Livraison",
        value: "72h",
        context: "Du brief au site en ligne",
      },
      {
        metric: "SEO",
        value: "Optimise",
        context: "Referencement local configure et performant",
      },
    ],
    technologies: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Framer Motion",
      "Vercel",
      "Claude AI",
    ],
    year: 2025,
  },

  // ---- Golf Mentor ----
  {
    slug: "golf-mentor",
    name: "Golf Mentor",
    type: "SaaS",
    city: "France",
    coverImage: "/images/portfolio/golf-mentor-1.webp",
    images: ["/images/portfolio/golf-mentor-1.webp"],
    tags: ["Charte graphique", "Design UI", "Developpement", "SEO"],
    duration: "48h",
    status: "Livre",
    context:
      "Golf Mentor est une plateforme SaaS dediee aux golfeurs qui souhaitent ameliorer leur jeu grace a des analyses et des conseils personnalises. Le produit existait mais manquait d'une interface moderne et d'une landing page capable de convertir.",
    problem:
      "Une interface datee qui ne refletait pas la qualite du contenu propose. Les utilisateurs potentiels quittaient le site avant meme d'essayer le produit. Le taux de conversion etait trop faible pour soutenir la croissance.",
    solution:
      "Refonte complete du design UI, creation d'une charte graphique premium, et landing page optimisee pour la conversion avec SEO integre.",
    features: [
      {
        icon: "Palette",
        title: "Charte graphique",
        description:
          "Univers visuel premium et sportif, a la hauteur de l'expertise golf proposee.",
      },
      {
        icon: "Layout",
        title: "Design UI",
        description:
          "Interface moderne et intuitive pour une experience utilisateur fluide.",
      },
      {
        icon: "Search",
        title: "SEO",
        description:
          "Optimisation pour les recherches liees a l'amelioration du jeu de golf.",
      },
      {
        icon: "Zap",
        title: "Livraison express",
        description: "Site complet livre en 48h, pret a convertir.",
      },
    ],
    results: [
      {
        metric: "Livraison",
        value: "48h",
        context: "Du brief au site en ligne",
      },
      {
        metric: "Design",
        value: "Premium",
        context: "Interface moderne et professionnelle",
      },
    ],
    technologies: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Framer Motion",
      "Vercel",
      "Claude AI",
    ],
    year: 2025,
  },

  // ---- Courtier Immobilier ----
  {
    slug: "courtier-immobilier",
    name: "Courtier Immobilier",
    type: "Site vitrine",
    city: "Cote d'Azur",
    coverImage: "/images/portfolio/courtier-immo-cover.webp", // [PLACEHOLDER]
    images: [
      "/images/portfolio/courtier-immo-1.webp", // [PLACEHOLDER]
      "/images/portfolio/courtier-immo-2.webp", // [PLACEHOLDER]
      "/images/portfolio/courtier-immo-3.webp", // [PLACEHOLDER]
    ],
    tags: ["Design UI", "Developpement", "SEO", "Responsive"],
    duration: "48h",
    status: "Livre",
    clientName: "Nicolas B.",
    clientRole: "Courtier independant",
    context:
      "Un courtier en prets immobiliers independant sur la Cote d'Azur. 8 ans d'experience, un reseau solide d'agences immobilieres partenaires, et un taux de reussite de 94% sur les dossiers traites. Mais aucune presence en ligne pour capter les particuliers directement.",
    problem:
      "100% des clients venaient par recommandation d'agences immobilieres. Aucun lead direct. Quand les particuliers cherchaient 'courtier immobilier Nice' ou 'courtier pret Cannes', ils trouvaient les grandes enseignes, pas lui. Un vivier de clients potentiels inexploite.",
    solution:
      "Un site vitrine professionnel qui etablit la credibilite, explique les avantages du courtage, et capture des leads qualifies via un simulateur de capacite d'emprunt et un formulaire de prise de rendez-vous.",
    features: [
      {
        icon: "Calculator",
        title: "Simulateur d'emprunt",
        description:
          "Outil interactif qui estime la capacite d'emprunt en 30 secondes. Capture du lead a la fin de la simulation.",
      },
      {
        icon: "Search",
        title: "SEO local",
        description:
          "Cible sur 'courtier immobilier Nice', 'courtier pret Cannes', 'courtier Cote d'Azur' et 15 variantes.",
      },
      {
        icon: "Award",
        title: "Page temoignages",
        description:
          "12 avis verifies de clients avec leur prenom, ville et montant finance. La preuve sociale qui convertit.",
      },
      {
        icon: "Palette",
        title: "Design premium",
        description:
          "Un site qui inspire confiance des la premiere seconde. Sobre, professionnel, premium.",
      },
      {
        icon: "Smartphone",
        title: "Click-to-call",
        description:
          "Bouton d'appel direct sur mobile. Le prospect contacte le courtier en un tap.",
      },
      {
        icon: "Calendar",
        title: "Prise de rendez-vous",
        description:
          "Calendrier integre pour reserver un creneau directement depuis le site.",
      },
    ],
    results: [
      {
        metric: "Leads directs",
        value: "18/mois",
        context: "Contre 0 avant le site — 100% de nouveaux leads",
      },
      {
        metric: "Position Google",
        value: "Top 5",
        context: "Sur 'courtier immobilier Nice' en 6 semaines",
      },
      {
        metric: "Taux de conversion",
        value: "12%",
        context:
          "Visiteurs qui remplissent le simulateur ou le formulaire",
      },
      {
        metric: "CA additionnel",
        value: "+35%",
        context: "Grace aux leads directs (sans commission agence)",
      },
    ],
    testimonial: {
      quote:
        "Je ne dependais que des agences. Maintenant les particuliers me trouvent directement. 18 nouveaux contacts par mois, sans lever le petit doigt.",
      author: "Nicolas B.",
      role: "Courtier en prets immobiliers",
    },
    technologies: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Framer Motion",
      "Vercel",
      "Claude AI",
    ],
    liveUrl: "https://courtier-nice.fr", // [PLACEHOLDER]
    year: 2025,
  },
];

// --- Helper Functions ---

/**
 * Get a project by its slug
 */
export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

/**
 * Get all unique project types from the projects array
 */
export function getProjectTypes(): ProjectType[] {
  const types = new Set(projects.map((project) => project.type));
  return Array.from(types) as ProjectType[];
}

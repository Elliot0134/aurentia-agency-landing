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

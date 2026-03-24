// ============================================
// AURENTIA FORMATION — Content data
// ============================================

export interface FormationModule {
  icon: string;
  badge: string;
  title: string;
  text: string;
  span?: number;
}

export interface FormationPersona {
  icon: string;
  title: string;
  text: string;
  badge: string;
}

export interface FormationTrainer {
  name: string;
  photo: string;
  role: string;
  badges: string[];
  bio: string;
  linkedin: string;
}

export interface FormationFAQItem {
  question: string;
  answer: string;
}

export interface FormationFormatItem {
  icon: string;
  title: string;
  text: string;
}

// --- Hero ---

export const formationHero = {
  badge: "AURENTIA FORMATION \u00B7 BIENT\u00D4T DISPONIBLE",
  headline: "Ma\u00EEtrisez Claude AI. Avant tout le monde.",
  subtitle:
    "Vid\u00E9os, cours et skills en bundle. Par des formateurs qui utilisent Claude au quotidien \u2014 pas des th\u00E9oriciens qui ont lu la doc.",
  ctaLabel: "Rejoindre la waitlist",
  proofs: [
    "Inscription gratuite",
    "Acc\u00E8s prioritaire au lancement",
    "Tarif early bird",
  ],
};

// --- Vision ---

export const formationVision = {
  badge: "POURQUOI CLAUDE",
  title: "L\u2019IA qui change tout. Et personne ne vous l\u2019enseigne vraiment.",
  paragraphs: [
    "Claude AI est le mod\u00E8le le plus avanc\u00E9 du march\u00E9. Claude Code r\u00E9\u00E9crit les r\u00E8gles du d\u00E9veloppement. Les skills transforment un LLM en outil sur-mesure. Mais 95\u00A0% des utilisateurs effleurent \u00E0 peine la surface.",
    "Les tutos YouTube font 10 minutes et survolent tout. Les formations g\u00E9n\u00E9riques parlent de \u00AB\u00A0l\u2019IA\u00A0\u00BB sans jamais entrer dans le concret. R\u00E9sultat\u00A0: des devs et des entrepreneurs qui utilisent Claude comme un ChatGPT glorifi\u00E9. Du potentiel g\u00E2ch\u00E9.",
    "Aurentia Formation, c\u2019est diff\u00E9rent. On utilise Claude pour livrer des sites en 48\u00A0h, automatiser des workflows entiers, construire des SaaS complets. On enseigne ce qu\u2019on pratique. Chaque jour. Chaque projet. Pas de th\u00E9orie creuse \u2014 du craft r\u00E9el.",
  ],
};

// --- Modules ---

export const formationModules: FormationModule[] = [
  {
    icon: "Terminal",
    badge: "MODULE PHARE",
    title: "Claude Code",
    text: "L\u2019outil qui a chang\u00E9 notre fa\u00E7on de d\u00E9velopper. Setup, configuration, workflows, skills personnalis\u00E9s, debug avanc\u00E9. De z\u00E9ro \u00E0 expert.",
    span: 2,
  },
  {
    icon: "MessageSquare",
    badge: "FONDAMENTAL",
    title: "Prompting avanc\u00E9",
    text: "Les techniques de prompting qui font la diff\u00E9rence entre un r\u00E9sultat moyen et un r\u00E9sultat exceptionnel. System prompts, chain-of-thought, few-shot.",
  },
  {
    icon: "Blocks",
    badge: "AVANC\u00C9",
    title: "Skills & CLAUDE.md",
    text: "Cr\u00E9er vos propres skills. Structurer votre CLAUDE.md. Transformer Claude en assistant sur-mesure pour votre m\u00E9tier.",
  },
  {
    icon: "Workflow",
    badge: "PRATIQUE",
    title: "Automatisation",
    text: "Connecter Claude \u00E0 vos outils. Automatiser les t\u00E2ches r\u00E9p\u00E9titives. Construire des workflows IA qui tournent sans vous.",
  },
  {
    icon: "Rocket",
    badge: "PROJET",
    title: "Projet de A \u00E0 Z",
    text: "Construire un projet complet avec Claude. Du brief au d\u00E9ploiement. Vous repartez avec une r\u00E9alisation concr\u00E8te, pas un certificat vide.",
  },
];

export const formationModulesNote =
  "Le catalogue d\u00E9taill\u00E9 arrive bient\u00F4t. Les modules pr\u00E9sent\u00E9s ici sont un aper\u00E7u \u2014 le programme complet sera encore plus dense.";

// --- Audience ---

export const formationAudience: FormationPersona[] = [
  {
    icon: "Code",
    title: "D\u00E9veloppeurs",
    text: "Vous codez d\u00E9j\u00E0. Vous voulez coder 10x plus vite. Claude Code, skills, automatisation \u2014 vous allez changer de dimension.",
    badge: "Tous niveaux",
  },
  {
    icon: "Briefcase",
    title: "Entrepreneurs",
    text: "Vous n\u2019\u00EAtes pas dev, mais vous voulez utiliser l\u2019IA pour propulser votre business. Prompting, automatisation, gains de productivit\u00E9.",
    badge: "D\u00E9butant OK",
  },
  {
    icon: "Users",
    title: "\u00C9quipes tech",
    text: "Vous voulez former votre \u00E9quipe \u00E0 Claude. On a form\u00E9 des \u00E9quipes en entreprise. On sait ce qui fonctionne \u00E0 l\u2019\u00E9chelle.",
    badge: "Sur-mesure",
  },
];

// --- Team ---

export const formationTrainers: FormationTrainer[] = [
  {
    name: "Elliot Estrade",
    photo: "/images/team/elliot.webp",
    role: "CEO Aurentia \u00B7 Formateur IA en entreprise",
    badges: [
      "Formateur IA",
      "Claude Code daily user",
      "5+ projets IA livr\u00E9s",
      "23 ans",
    ],
    bio: "Form\u00E9 des \u00E9quipes en entreprise \u00E0 int\u00E9grer l\u2019IA dans leurs process. A con\u00E7u le workflow IA d\u2019Aurentia qui permet de livrer un site pro en 48\u00A0h. Utilise Claude Code sur chaque projet, chaque jour, depuis le premier jour.",
    linkedin: "https://www.linkedin.com/in/elliot-estrade/",
  },
  {
    name: "Mathieu Bousquet",
    photo: "/images/team/mathieu.webp",
    role: "CTO Aurentia \u00B7 Formateur Epitech Marseille",
    badges: [
      "Formateur Epitech",
      "Pionnier Claude Code",
      "Architecte technique",
      "2 hackathons gagn\u00E9s",
    ],
    bio: "Formateur \u00E0 Epitech Marseille, il enseigne le d\u00E9veloppement \u00E0 la prochaine g\u00E9n\u00E9ration de devs. Premier de l\u2019\u00E9quipe \u00E0 int\u00E9grer Claude Code dans son workflow quotidien. Architecte technique de chaque projet Aurentia.",
    linkedin: "https://www.linkedin.com/in/mathieu-bousquet-178454315/",
  },
];

// --- Format ---

export const formationFormats: FormationFormatItem[] = [
  {
    icon: "Play",
    title: "Vid\u00E9os structur\u00E9es",
    text: "Des modules vid\u00E9o courts et denses. Pas de remplissage, pas de \u00AB\u00A0bon alors aujourd\u2019hui on va voir\u2026\u00A0\u00BB. Chaque minute compte.",
  },
  {
    icon: "FileText",
    title: "Cours \u00E9crits + skills",
    text: "Chaque module est accompagn\u00E9 de cours \u00E9crits et de skills pr\u00EAts \u00E0 l\u2019emploi. Copier, coller, adapter \u00E0 votre contexte. Directement actionnable.",
  },
  {
    icon: "Package",
    title: "Bundles th\u00E9matiques",
    text: "Achetez ce dont vous avez besoin. Un module, un parcours complet, ou le bundle int\u00E9gral. Pas d\u2019abonnement \u2014 acc\u00E8s \u00E0 vie.",
  },
];

// --- FAQ ---

export const formationFAQs: FormationFAQItem[] = [
  {
    question: "C\u2019est quoi Aurentia Formation exactement\u00A0?",
    answer:
      "Un produit de formation d\u00E9di\u00E9 \u00E0 Claude AI. Vid\u00E9os, cours \u00E9crits et skills en bundle. Con\u00E7u par des formateurs qui utilisent Claude au quotidien sur des projets r\u00E9els.",
  },
  {
    question: "Quand est-ce que \u00E7a sort\u00A0?",
    answer:
      "Le lancement est en pr\u00E9paration. Rejoignez la waitlist pour \u00EAtre notifi\u00E9 en premier et b\u00E9n\u00E9ficier du tarif early bird.",
  },
  {
    question: "Faut-il savoir coder pour suivre la formation\u00A0?",
    answer:
      "Certains modules sont accessibles sans comp\u00E9tence technique (prompting, automatisation basique). Les modules Claude Code s\u2019adressent aux d\u00E9veloppeurs de tous niveaux.",
  },
  {
    question: "C\u2019est diff\u00E9rent d\u2019un tuto YouTube\u00A0?",
    answer:
      "Oui. Les tutos survolent. Ici, chaque module est forg\u00E9 dans des projets r\u00E9els, avec des skills pr\u00EAts \u00E0 l\u2019emploi et un accompagnement structur\u00E9. On va en profondeur.",
  },
  {
    question: "Il y aura un abonnement\u00A0?",
    answer:
      "Non. Achat unique avec acc\u00E8s \u00E0 vie. Pas de mensualit\u00E9, pas de surprise.",
  },
  {
    question: "Et si je veux former mon \u00E9quipe\u00A0?",
    answer:
      "On propose des formules sur-mesure pour les \u00E9quipes. Rejoignez la waitlist en pr\u00E9cisant \u00AB\u00A0\u00E9quipe\u00A0\u00BB et on vous recontactera.",
  },
  {
    question: "Pourquoi Claude et pas GPT ou un autre mod\u00E8le\u00A0?",
    answer:
      "Claude est le mod\u00E8le qu\u2019on utilise au quotidien pour livrer des projets r\u00E9els. Claude Code est l\u2019outil qui a transform\u00E9 notre fa\u00E7on de travailler. On enseigne ce qu\u2019on ma\u00EEtrise \u2014 pas ce qui fait du buzz.",
  },
];

// --- CTA ---

export const formationCTA = {
  title: "Soyez les premiers \u00E0 ma\u00EEtriser Claude AI.",
  subtitle:
    "Rejoignez la waitlist. Acc\u00E8s prioritaire. Tarif early bird. On vous pr\u00E9vient d\u00E8s que c\u2019est pr\u00EAt.",
  inputPlaceholder: "Votre email",
  ctaLabel: "Rejoindre la waitlist",
  proofs: [
    "Gratuit et sans engagement",
    "Pas de spam \u2014 juste le lancement",
    "Tarif early bird pour les premiers inscrits",
  ],
};

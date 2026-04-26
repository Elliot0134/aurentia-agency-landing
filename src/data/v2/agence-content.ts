// src/data/v2/agence-content.ts
// Narrative content for /v2/agence — ported from about-content.ts then
// adapted for the v2 layout. Kept independent so /v2/agence and /a-propos
// can evolve separately.

export interface AgenceTeamMember {
  name: string;
  role: string;
  badge: string;
  bio: string;
  tags: string[];
  image: string;
  linkedin: string;
}

export interface AgenceValueCard {
  icon: "Sun" | "Zap" | "Shield" | "Eye" | "Users";
  title: string;
  text: string;
  span?: number;
}

export interface AgenceStat {
  value: number;
  suffix: string;
  label: string;
}

export interface AgenceApproachPillar {
  icon: "Cpu" | "Hammer" | "Handshake";
  title: string;
  text: string;
  accentColor: "orange" | "amber" | "cyan";
}

export interface AgenceHackathonTeammate {
  name: string;
  linkedinUrl?: string;
}

export interface AgenceHackathonCard {
  title: string;
  date: string;
  description: string;
  result: string;
  linkedinEmbedUrl: string;
  phase: "solo" | "duo";
  teammates?: AgenceHackathonTeammate[];
}

export interface AgenceStackTech {
  name: string;
  icon: string;
  description: string;
}

export const agenceStory = {
  title: "Comment Aurentia est née",
  subtitle: "20 ans de constat, 6 mois de R&D, une seule conviction.",
  paragraphs: [
    {
      label: "Le constat",
      text: "En 20 ans de création web, on a vu le même problème se répéter. Des centaines de PME, d'artisans, de commerçants — sans présence digitale digne de ce nom. Pas par manque de volonté. Par manque d'offre adaptée. Les agences classiques facturent 5 000€ et livrent en 2 mois. Les templates font cheap. Le marché laissait un vide béant.",
    },
    {
      label: "Le déclic",
      text: "L'intelligence artificielle a tout changé. Pas les chatbots gadgets — les vrais outils de production. Ceux qui permettent de générer un site vitrine sur-mesure en quelques heures. Pas un template. Un vrai site, avec du contenu pensé, du SEO intégré, un design qui tient la route. On a testé. Vérifié. Comparé. Le résultat tenait la route face à ce qui prenait 3 semaines en process classique.",
    },
    {
      label: "La mission",
      text: "Aurentia est née de cette conviction : l'IA comme accélérateur, 20 ans d'expertise comme garde-fou, et une exigence technique sans compromis. Le résultat : des sites professionnels livrés en 72h, à partir de 1 200€. Pas parce qu'on bâcle. Parce que le process est redoutablement efficace.",
    },
  ],
};

export const agenceStats: AgenceStat[] = [
  { value: 20, suffix: "ans", label: "d'expertise web cumulée" },
  { value: 72, suffix: "h", label: "pour livrer votre V1" },
  { value: 15, suffix: "+", label: "sites livrés" },
  { value: 100, suffix: "%", label: "de clients satisfaits" },
];

export const agenceStatsSection = {
  title: "Les chiffres parlent.",
  subtitle: "Ce qu'on a construit en quelques mois.",
};

export const agenceTeam: AgenceTeamMember[] = [
  {
    name: "Elliot Estrade",
    role: "CEO, Vision & IA",
    badge: "Entrepreneur & Architecte IA",
    bio: "À l'origine d'Aurentia. Entrepreneur multi-projets et architecte IA. Fondateur d'ESST Solutions (consulting IA & dev) et de Friend'iz (CBD pour animaux). Co-créateur de Comparateur-IA-Facile.com avec Matthieu et Olivier. Formateur IA en entreprise. Chez Aurentia, il porte la vision, la stratégie business et la direction produit — design, IA et positionnement, c'est lui qui orchestre, avec l'équipe.",
    tags: [
      "Vision & Stratégie",
      "Direction produit",
      "Intelligence Artificielle",
      "Design UI/UX",
      "Business development",
      "Formation IA",
    ],
    image: "/images/team/elliot.webp",
    linkedin: "https://www.linkedin.com/in/elliot-estrade-8b7754201/",
  },
  {
    name: "Matthieu Bousquet",
    role: "CTO, Lead Technique",
    badge: "Dev Senior & Formateur Epitech",
    bio: "Développeur full-stack et formateur à Epitech Marseille. Pionnier Claude Code au sein de l'équipe — il a été le premier à intégrer l'IA dans son workflow de développement quotidien. Architecte technique, il conçoit les fondations de chaque projet. Chaque site est sécurisé, rapide, et techniquement irréprochable. Code review, performance, scalabilité — rien ne lui échappe. Avec Elliot, il a remporté 2 hackathons. Le craft technique, c'est son terrain.",
    tags: [
      "Architecture technique",
      "Sécurité",
      "Performance",
      "Code review",
      "Formation Epitech",
      "Claude Code",
    ],
    image: "/images/team/mathieu.webp",
    linkedin: "https://www.linkedin.com/in/mathieu-bousquet-178454315/",
  },
  {
    name: "Fabien Estrade",
    role: "Production Lead",
    badge: "20 ans de création web",
    bio: "Co-fondateur de l'agence Le Prisme à Avignon. 20 ans à forger des sites, des identités visuelles, des marques pour des PME, artisans et commerçants. Direction créative, stratégie de marque, accompagnement client — il a traversé chaque vague du web. WordPress, Flash, le responsive, les frameworks modernes. Il sait ce qui convertit. Ce qui dure. Ce qui illumine un business. Chez Aurentia, il est le pilier qualité. Rien ne sort sans son feu vert.",
    tags: [
      "Direction créative",
      "Identité visuelle",
      "Stratégie de marque",
      "Accompagnement client",
      "20 ans de craft web",
    ],
    image: "/images/team/fabien.webp",
    linkedin: "https://www.linkedin.com/in/fabienestrade/",
  },
  {
    name: "Olivier Le Floch",
    role: "Stratégie & Business",
    badge: "Serial entrepreneur",
    bio: "Cofondateur d'achat-vip.com (millions de membres, dizaines de M€ de CA). Créateur de LePass / vente-privee LEPASS, rachetée par le groupe. Cofondateur d'Holirenting, puis Directeur Général de Smily France (centaines de M€ de volume). Du e-commerce à la location saisonnière, il a scalé des boîtes à chaque étape. Chez Aurentia, il apporte la vision stratégique et le sens business.",
    tags: [
      "Stratégie d'entreprise",
      "E-commerce",
      "Scaling startups",
      "SaaS",
      "Business development",
    ],
    image: "/images/team/olivier-droite.webp",
    linkedin: "https://www.linkedin.com/in/olivier-le-floch-0899a9/",
  },
  {
    name: "Stéphane Guillemot",
    role: "E-commerce & Scale",
    badge: "Serial entrepreneur e-commerce",
    bio: "Serial entrepreneur, 4 sociétés créées et cédées en 25 ans. CEO d'Achatvip (45 M€ de CA, 2,7M membres, 3 500 expéditions/jour) et co-fondateur d'Inshop chez Veepee — Trophée de l'Innovation E-commerce 2013. Ex-Country Manager de 3COM France (120 M€) et d'Efficient Networks (groupe Siemens). Aujourd'hui CEO de Cryptoliquidity, où il combine DeFi et IA au quotidien. Chez Aurentia, il apporte la vision e-commerce et la culture du scale-up.",
    tags: [
      "E-commerce scaling",
      "Stratégie & vision",
      "IA appliquée",
      "DeFi & Fintech",
      "Direction générale",
    ],
    image: "/images/team/stephane.webp",
    linkedin: "https://www.linkedin.com/in/st%C3%A9phane-guillemot-26763a5/",
  },
];

export const agenceTeamSection = {
  title: "Cinq profils. Une seule exigence.",
  subtitle: "20 ans de craft web, l'IA comme superpouvoir, et une ingénierie sans compromis.",
};

export const agenceValues: AgenceValueCard[] = [
  {
    icon: "Sun",
    title: "Révéler, pas créer",
    text: "Votre business a déjà un potentiel. On ne part pas de zéro — on met en lumière ce qui est déjà là. Vous êtes le héros. On est la lumière.",
    span: 2,
  },
  {
    icon: "Zap",
    title: "72h. Pas 6 semaines.",
    text: "L'IA nous donne un superpouvoir : la vitesse. Pas parce qu'on bâcle — parce que notre process est redoutablement efficace.",
  },
  {
    icon: "Shield",
    title: "Tant que c'est pas parfait, on ne lance pas.",
    text: "Chaque pixel compte. Chaque ligne de code est propre. On ne fait pas de compromis sur la qualité.",
  },
  {
    icon: "Eye",
    title: "On montre avant de facturer.",
    text: "Vous voyez votre site AVANT de payer. Pas de mockup flou — un vrai site, fonctionnel, avec votre contenu. Vous jugez, vous décidez.",
  },
  {
    icon: "Users",
    title: "Un interlocuteur. Pas un ticket.",
    text: "Pas de chef de projet qui transmet à un dev qui transmet à un designer. Vous parlez directement à l'équipe qui construit.",
  },
];

export const agenceValuesSection = {
  title: "Ce en quoi on croit.",
  subtitle: "Cinq convictions. Pas des slogans — des règles qu'on applique sur chaque projet.",
};

export const agenceHackathons: AgenceHackathonCard[] = [
  {
    title: "Hacktogone #1 — Matthieu",
    date: "Mai 2025",
    description:
      "Matthieu et son équipe (Nicolas Dunand, Tikinas Oughlis) remportent la première place du premier Hacktogone, le plus grand hackathon Agents IA de France. Architecture technique, workflows intelligents, exécution chirurgicale — le craft à l'état pur.",
    result: "1ère place",
    linkedinEmbedUrl:
      "https://www.linkedin.com/embed/feed/update/urn:li:share:7327776555282157568?collapsed=1",
    phase: "solo",
  },
  {
    title: "Hacktogone #1 — Elliot",
    date: "Mai 2025",
    description:
      "Elliot et son équipe ({teammates}) décrochent la 3ème place du même hackathon. Un SaaS d'agent RAG ultra performant pour Raedificare : analyse documentaire, extraction de sources, rapports en quelques minutes. IA, design, pitch — une approche radicalement différente, mais le même podium.",
    teammates: [
      { name: "Anne-Lorie Baert", linkedinUrl: "https://www.linkedin.com/in/anne-lorie-baert-443667197/" },
      { name: "Lucas Peyrin", linkedinUrl: "https://www.linkedin.com/in/lucas-peyrin-5548171a6/" },
    ],
    result: "3ème place",
    linkedinEmbedUrl:
      "https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7331637013185466368?collapsed=1",
    phase: "solo",
  },
  {
    title: "Hacktogone #2 Toulouse — Elliot & Matthieu",
    date: "Août 2025",
    description:
      "99 développeurs. 4 jours. 2 nuits blanches. 1 objectif. Architecture technique de Matthieu + vision IA/design d'Elliot — cette fois ensemble. Un SaaS de navigation propulsé par l'IA, type Waze/Google Maps intelligent, pour l'entreprise Symone. Résultat : Grand Prix du Hacktogone. La preuve que la collaboration bat toujours le talent solo.",
    result: "1ère place",
    linkedinEmbedUrl:
      "https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7394753300794884096?collapsed=1",
    phase: "duo",
  },
];

export const agenceHackathonsSection = {
  eyebrow: "ORIGIN STORY",
  title: "Séparés, on gagne. Ensemble, on domine.",
  subtitle:
    "Elliot et Matthieu se sont rencontrés en compétition. Chacun sur le podium, chacun de son côté. Puis ils ont uni leurs forces — et n'ont plus jamais perdu.",
  phaseLabels: {
    solo: "Chacun de son côté",
    bridge: "La rencontre. Le déclic.",
    duo: "Forces unies",
  },
  closing:
    "Ce qu'on fait en hackathon, on le fait pour vous. La même intensité, la même complémentarité, le même résultat — mais avec votre business au centre.",
};

export const agenceStackTechnologies: AgenceStackTech[] = [
  { name: "Claude AI", icon: "/images/icons/claude-icon.webp", description: "Notre copilote IA. Design, code, contenu — il accélère chaque étape sans remplacer l'expertise." },
  { name: "N8N", icon: "/images/icons/n8n-icon.webp", description: "Automatisation sur-mesure. On connecte vos outils entre eux pour éliminer les tâches répétitives." },
  { name: "Supabase", icon: "/images/icons/supaabse-icon.webp", description: "Base de données, auth, stockage. Le backend complet, open-source et ultra performant." },
  { name: "Vercel", icon: "/images/icons/vercel-icon.webp", description: "Déploiement instantané. Votre site en ligne en quelques secondes, partout dans le monde." },
  { name: "Stripe", icon: "/images/icons/stripe-icon.webp", description: "Paiements en ligne fiables. Abonnements, factures, checkout — tout est géré." },
  { name: "GitHub", icon: "/images/icons/github-icon.webp", description: "Versioning et collaboration. Chaque ligne de code est tracée, revue et sécurisée." },
  { name: "Google Drive", icon: "/images/icons/google-drive-icon.webp", description: "Espace partagé client. Briefs, assets, livrables — tout au même endroit." },
  { name: "Canva", icon: "/images/icons/canva-icon.webp", description: "Création visuelle rapide. Mockups, visuels réseaux, assets marketing." },
  { name: "Illustrator", icon: "/images/icons/illustrator-icon.webp", description: "Design vectoriel précis. Logos, icônes, illustrations sur-mesure." },
  { name: "WhatsApp", icon: "/images/icons/whatsapp-icon.webp", description: "Communication directe. On répond vite, sans formalités inutiles." },
  { name: "Figma", icon: "/images/icons/figma-icon.webp", description: "Prototypage et design collaboratif. Chaque maquette est validée avant de coder." },
];

export const agenceStackPhases: { label: string; names: string[] }[] = [
  { label: "Design", names: ["Figma", "Canva", "Illustrator"] },
  { label: "Développement", names: ["GitHub", "Supabase", "Vercel"] },
  { label: "Intelligence", names: ["Claude AI", "N8N"] },
  { label: "Business", names: ["Stripe", "Google Drive", "WhatsApp"] },
];

export const agenceStackSection = {
  eyebrow: "Nos outils",
  title: "Notre stack.",
  subtitle: "Des outils de pointe. Pas pour la hype — pour le résultat.",
};

export const agenceApproach: AgenceApproachPillar[] = [
  {
    icon: "Cpu",
    title: "L'IA qui amplifie",
    text: "L'IA accélère le design, le code, le SEO, le contenu. Mais elle ne décide de rien. C'est l'expertise humaine qui valide. Chaque pixel, chaque mot, chaque choix technique.",
    accentColor: "orange",
  },
  {
    icon: "Hammer",
    title: "Le craft qui dure",
    text: "20 ans de création web, ça forge un œil. On sait ce qui fonctionne, ce qui convertit, ce qui tient dans le temps. Le site qu'on livre aujourd'hui sera encore pertinent dans 3 ans.",
    accentColor: "amber",
  },
  {
    icon: "Handshake",
    title: "L'humain au centre",
    text: "Un seul interlocuteur du brief au lancement. Pas de process kafkaïen. Vous parlez à ceux qui construisent. On avance ensemble, à votre rythme.",
    accentColor: "cyan",
  },
];

export const agenceApproachSection = {
  title: "L'IA comme instrument de précision. Pas comme raccourci.",
  subtitle: "Ce qui nous sépare du reste.",
};

export const agenceAudience = {
  title: "Pour qui on travaille.",
  paragraph:
    "Si vous vous reconnaissez dans une de ces situations, on est faits pour bosser ensemble.",
  items: [
    { text: "Vous êtes entrepreneur, artisan, commerçant ou dirigeant de PME — et votre présence digitale ne reflète pas la qualité de ce que vous faites." },
    { text: "Vous avez une idée de SaaS ou d'application mais pas d'équipe technique pour la concrétiser." },
    { text: "Vous perdez des clients parce que vos concurrents apparaissent sur Google et pas vous." },
    { text: "Vous avez contacté des agences. Devis : 5 000€+. Délai : 2 mois. Vous avez laissé tomber." },
    { text: "Vous avez besoin d'une landing page qui convertit, d'une identité visuelle forte, ou d'un site vitrine qui ramène des clients." },
    { text: "Vous voulez un partenaire digital complet — site, app, branding, stratégie — sans multiplier les prestataires." },
  ],
  conclusion:
    "On a construit Aurentia pour vous. Site vitrine, SaaS, landing page, identité visuelle — peu importe le besoin, on a la solution. Pour les entreprises qui méritent d'être vues.",
};

export const agenceFinalCTA = {
  title: "Envie de voir ce qu'on peut faire pour vous ?",
  subtitle:
    "On vous prépare un aperçu de votre futur site, un audit de vos concurrents, et des recommandations stratégiques. Gratuit. 20 minutes. Sans engagement.",
  cta: "Réserver mon call gratuit",
  proofs: [
    "Gratuit et sans engagement",
    "On vous montre VOTRE site",
    "Vous gardez l'audit quoi qu'il arrive",
  ],
};

// ============================================
// AURENTIA AGENCY — Contenu de la page À Propos
// Édite ce fichier pour changer le contenu sans toucher aux composants
// ============================================

// --- Interfaces ---

export interface TeamMember {
  name: string;
  role: string;
  badge: string;
  bio: string;
  tags: string[];
  image: string;
  linkedin: string;
}

export interface ValueCard {
  icon: string; // Lucide icon name
  title: string;
  text: string;
  span?: number; // column span (1 or 2)
}

export interface ProofStat {
  value: number;
  suffix: string;
  label: string;
}

export interface ApproachPillar {
  icon: string;
  title: string;
  text: string;
  accentColor: string; // 'orange' | 'amber' | 'cyan'
}

export interface HackathonCard {
  photo: string;
  title: string;
  date: string;
  description: string;
  result: string;
  linkedinEmbed: string; // URL du post LinkedIn
}

export interface FatherSonBlock {
  label: string; // "L'héritage" | "La nouvelle vague" | "La collision"
  text: string;
}

export interface AudienceItem {
  text: string;
}

// --- Content ---

export const aboutHeroContent = {
  badge: "L'ÉQUIPE AURENTIA",
  headline: "20 ans d'expertise. L'IA en plus.",
  subtitle:
    "On ne crée pas à partir de rien. On révèle le potentiel qui est déjà là. Trois profils complémentaires, un seul objectif : que votre business soit vu.",
};

export const aboutStoryContent = {
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
      text: "Aurentia est née de cette conviction : l'IA comme accélérateur, 20 ans d'expertise comme garde-fou, et une exigence technique sans compromis. Le résultat : des sites professionnels livrés en 48h, à partir de 1 200€. Pas parce qu'on bâcle. Parce que le process est redoutablement efficace.",
    },
  ],
};

export const valueCards: ValueCard[] = [
  {
    icon: "Sun",
    title: "Révéler, pas créer",
    text: "Votre business a déjà un potentiel. On ne part pas de zéro — on met en lumière ce qui est déjà là. Vous êtes le héros. On est la lumière.",
    span: 2,
  },
  {
    icon: "Zap",
    title: "48h. Pas 6 semaines.",
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

export const teamMembers: TeamMember[] = [
  {
    name: "Fabien Estrade",
    role: "Production Lead",
    badge: "20 ans de création web",
    bio: "Fondateur de l'agence Le Prisme à Avignon. 20 ans à forger des sites, des identités visuelles, des marques pour des PME, artisans et commerçants. Direction créative, stratégie de marque, accompagnement client — il a traversé chaque vague du web. WordPress, Flash, le responsive, les frameworks modernes. Il sait ce qui convertit. Ce qui dure. Ce qui illumine un business. Chez Aurentia, il est le pilier qualité. Rien ne sort sans son feu vert.",

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
    name: "Elliot Estrade",
    role: "CEO, IA & Design",
    badge: "Architecte IA & Design",
    bio: "Entrepreneur et architecte IA. Fondateur d'ESST Solutions (consulting IA & dev). Co-fondateur de Kaelen Studio (jeux Roblox). Créateur de Comparateur-IA-Facile.com. Formateur IA en entreprise — il forme des équipes à intégrer l'intelligence artificielle dans leurs process. C'est lui qui a forgé le workflow IA d'Aurentia — le système sur-mesure qui permet de livrer un site pro en 48h. La vision, l'innovation, la vitesse.",
    tags: [
      "Intelligence Artificielle",
      "Design UI/UX",
      "Automatisation",
      "Stratégie produit",
      "Formation IA",
      "E-commerce",
    ],
    image: "/images/team/elliot.webp",
    linkedin: "https://www.linkedin.com/in/elliot-estrade/",
  },
  {
    name: "Mathieu Bousquet",
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
];

export const fatherSonContent = {
  badge: "NOTRE ADN",
  title: "20 ans de craft. L'IA comme multiplicateur.",
  subtitle:
    "Trois expertises complémentaires, un seul objectif : rendre le web pro accessible à chaque business.",
  quote:
    "\"Ce qu'on livrait en 3 semaines, on le livre maintenant en 48h. Sans aucun compromis sur la qualité.\"",
  quoteAuthor:
    "L'équipe fondatrice, après 6 mois de R&D sur le workflow IA.",
};

export const fatherSonBlocks: FatherSonBlock[] = [
  {
    label: "L'expertise",
    text: "20 ans de création web. Des centaines de projets livrés. Des PME, des artisans, des commerçants qui comptaient sur nous pour exister en ligne. On a forgé un œil. On sait en 3 secondes si un site va convertir ou pas. Ce niveau de craft, ça ne s'invente pas — ça se construit projet après projet.",
  },
  {
    label: "L'innovation",
    text: "L'IA a changé les règles du jeu. Pas les chatbots gadgets — les vrais outils de production. On a investi 6 mois en R&D pour forger un workflow propriétaire qui allie intelligence artificielle et expertise humaine. Le résultat : un process qui produit en heures ce qui prenait des semaines, avec le même niveau de qualité.",
  },
  {
    label: "La méthode",
    text: "Aurentia, c'est la collision entre l'exigence artisanale et la puissance de l'IA. Un directeur créatif qui valide chaque pixel. Un architecte IA qui propulse chaque process. Un lead technique qui sécurise chaque ligne de code. Trois regards complémentaires, un standard unique.",
  },
];

export const hackathonCards: HackathonCard[] = [
  {
    photo: "/images/about/hackathon-1.webp",
    title: "[PLACEHOLDER] Nom du Hackathon 1",
    date: "[PLACEHOLDER]",
    description:
      "[PLACEHOLDER] Description du projet, du défi relevé et de la solution construite en 48h. Mettre en avant la complémentarité Elliot (IA/design) + Mathieu (architecture technique).",
    result: "1ère place",
    linkedinEmbed: "[PLACEHOLDER] URL_POST_LINKEDIN_HACKATHON_1",
  },
  {
    photo: "/images/about/hackathon-2.webp",
    title: "[PLACEHOLDER] Nom du Hackathon 2",
    date: "[PLACEHOLDER]",
    description:
      "[PLACEHOLDER] Description du projet, du défi relevé et de la solution construite. Même angle : vitesse + craft + IA.",
    result: "1ère place",
    linkedinEmbed: "[PLACEHOLDER] URL_POST_LINKEDIN_HACKATHON_2",
  },
];

export const hackathonSectionContent = {
  badge: "ON CODE AUSSI POUR LE SPORT",
  title: "2 hackathons. 2 victoires.",
  subtitle:
    "Elliot et Mathieu ne se contentent pas de livrer des projets clients. Ils forgent leurs armes en compétition. 48h pour coder, pitcher, convaincre — et gagner.",
  closing:
    "Ce qu'on fait en hackathon, on le fait pour vous. La même intensité, la même rigueur, le même craft — mais avec votre business au centre.",
};

export const proofStats: ProofStat[] = [
  { value: 20, suffix: "ans", label: "d'expertise web cumulée" },
  { value: 48, suffix: "h", label: "pour livrer votre V1" },
  { value: 15, suffix: "+", label: "sites livrés" },
  { value: 100, suffix: "%", label: "de clients satisfaits" },
];

export const proofSectionContent = {
  title: "Les chiffres parlent.",
  stackTechnologies: [
    "Next.js",
    "React",
    "TypeScript",
    "Tailwind CSS",
    "Framer Motion",
    "GSAP",
    "Supabase",
    "Vercel",
    "Claude AI",
    "Figma",
  ],
  stackClosing: "Des outils de pointe. Pas pour la hype — pour le résultat.",
};

export const approachPillars: ApproachPillar[] = [
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

export const approachSectionContent = {
  title: "L'IA comme instrument de précision. Pas comme raccourci.",
  subtitle: "Ce qui nous sépare du reste.",
};

export const audienceItems: AudienceItem[] = [
  {
    text: "Vous gérez une conciergerie, un hôtel, un commerce — et vous n'avez pas de site. Ou il date de 2018.",
  },
  {
    text: "Vous perdez des clients parce que vos concurrents apparaissent sur Google et pas vous.",
  },
  {
    text: "Vous avez contacté des agences. Devis : 5 000€. Délai : 2 mois. Vous avez laissé tomber.",
  },
  {
    text: "Vous avez essayé Wix, WordPress, Squarespace. Le résultat ne ressemble pas à ce que vous aviez en tête.",
  },
  {
    text: "Vous voulez un site pro, unique, qui ramène des clients — sans y passer vos soirées.",
  },
];

export const audienceSectionContent = {
  title: "Pour qui on travaille.",
  paragraph:
    "Si vous vous reconnaissez dans une de ces situations, on est faits pour bosser ensemble.",
  conclusion:
    "On a construit Aurentia pour vous. Pas pour les startups de la Silicon Valley. Pour les entreprises qui méritent d'être vues.",
};

export const aboutCtaContent = {
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

export const aboutValuesSection = {
  title: "Ce en quoi on croit.",
  subtitle:
    "Cinq convictions. Pas des slogans — des règles qu'on applique sur chaque projet.",
};

export const aboutTeamSection = {
  title: "Trois regards. Une seule exigence.",
  subtitle:
    "20 ans de craft web, l'IA comme superpouvoir, et une ingénierie sans compromis.",
};

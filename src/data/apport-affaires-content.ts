// ============================================
// AURENTIA APPORT D'AFFAIRES — Content data
// ============================================

export interface ApportStep {
  number: string;
  title: string;
  text: string;
}

export interface ApportGainExample {
  type: string;
  projectPrice: number;
  commission: number;
  detail: string;
  span?: number;
}

export interface ApportAudienceItem {
  label: string;
  text: string;
}

export interface ApportFAQItem {
  question: string;
  answer: string;
}

// --- Hero ---

export const apportHero = {
  badge: "PROGRAMME APPORT D\u2019AFFAIRES",
  commissionPercent: 10,
  headline: "Recommandez. Encaissez. C\u2019est aussi simple que \u00e7a.",
  subtitle:
    "Vous connaissez quelqu\u2019un qui a besoin d\u2019un site\u00a0? Recommandez Aurentia. On signe le projet, vous touchez 10\u00a0% de commission. Ouvert \u00e0 tout le monde.",
  ctaLabel: "Devenir apporteur d\u2019affaires",
  proofs: [
    "Inscription gratuite",
    "Pas de statut requis",
    "Commission vers\u00e9e sous 30 jours",
  ],
};

// --- Steps ---

export const apportStepsSection = {
  title: "3 \u00e9tapes. Z\u00e9ro prise de t\u00eate.",
  subtitle:
    "Pas de formation. Pas de process compliqu\u00e9. Pas de CRM \u00e0 remplir.",
};

export const apportSteps: ApportStep[] = [
  {
    number: "01",
    title: "Inscrivez-vous",
    text: "2 minutes. Un formulaire. C\u2019est fait. On vous envoie votre lien d\u2019apporteur et les infos essentielles.",
  },
  {
    number: "02",
    title: "Recommandez",
    text: "Quelqu\u2019un de votre r\u00e9seau a besoin d\u2019un site, d\u2019une landing page ou d\u2019un SaaS\u00a0? Parlez-lui d\u2019Aurentia. Envoyez-nous son contact ou donnez-lui le v\u00f4tre.",
  },
  {
    number: "03",
    title: "Encaissez",
    text: "Le client signe. On livre. Vous touchez 10\u00a0% du montant du projet. Virement sous 30 jours. Pas de plafond.",
  },
];

// --- Gains ---

export const apportGainsSection = {
  title: "Vos gains. En vrai.",
  subtitle:
    "Des exemples concrets sur nos offres r\u00e9elles. Pas de sc\u00e9nario fictif.",
  note: "Pas de plafond. 3 recommandations par mois = 450\u00a0\u20ac \u00e0 3\u00a0000\u00a0\u20ac de revenus passifs. Sans rien produire.",
};

export const apportGains: ApportGainExample[] = [
  {
    type: "Site vitrine Essentiel",
    projectPrice: 900,
    commission: 90,
    detail:
      "Votre contact lance sa conciergerie et a besoin d\u2019un site pro.",
  },
  {
    type: "Site vitrine Croissance",
    projectPrice: 1490,
    commission: 149,
    detail:
      "Un restaurant de votre quartier veut enfin exister sur Google.",
  },
  {
    type: "Site vitrine Premium",
    projectPrice: 2200,
    commission: 220,
    detail:
      "Un h\u00f4tel veut un site sur-mesure avec booking int\u00e9gr\u00e9.",
  },
  {
    type: "Application SaaS",
    projectPrice: 10000,
    commission: 1000,
    detail:
      "Un entrepreneur de votre r\u00e9seau a un projet de plateforme. Vous faites l\u2019intro. Vous touchez 1\u00a0000\u00a0\u20ac.",
    span: 2,
  },
];

// --- Audience ---

export const apportAudienceSection = {
  title: "Ouvert \u00e0 tout le monde. Vraiment.",
  subtitle:
    "Pas besoin d\u2019\u00eatre dans le web. Pas besoin de statut. Juste un r\u00e9seau et l\u2019envie de le mon\u00e9tiser.",
};

export const apportAudience: ApportAudienceItem[] = [
  {
    label: "Freelances",
    text: "Vous faites du graphisme, du marketing, du consulting\u00a0? Vos clients ont souvent besoin d\u2019un site. Touchez votre part.",
  },
  {
    label: "Agences compl\u00e9mentaires",
    text: "Vous faites du SEA, du social media, de la photo\u00a0? On fait le site, vous prenez la commission.",
  },
  {
    label: "Clients existants",
    text: "Votre site Aurentia vous pla\u00eet\u00a0? Recommandez-nous. C\u2019est la meilleure pub \u2014 et elle vous rapporte.",
  },
  {
    label: "Commer\u00e7ants & entrepreneurs",
    text: "Vous connaissez des coll\u00e8gues, des partenaires, des amis qui ont besoin d\u2019un site\u00a0? Parlez-en.",
  },
  {
    label: "Tout le monde",
    text: "Litt\u00e9ralement. Votre voisin, votre coiffeur, le restaurant du coin. Si quelqu\u2019un a besoin d\u2019un site, vous pouvez gagner de l\u2019argent.",
  },
];

// --- FAQ ---

export const apportFAQ: ApportFAQItem[] = [
  {
    question: "Combien je touche exactement\u00a0?",
    answer:
      "10\u00a0% du montant HT de chaque projet sign\u00e9 gr\u00e2ce \u00e0 votre recommandation. Pas de plafond. Un projet \u00e0 1\u00a0200\u00a0\u20ac = 120\u00a0\u20ac pour vous. Un projet \u00e0 10\u00a0000\u00a0\u20ac = 1\u00a0000\u00a0\u20ac.",
  },
  {
    question: "Quand est-ce que je suis pay\u00e9\u00a0?",
    answer:
      "Sous 30 jours apr\u00e8s la signature du client. Virement bancaire classique. Pas de d\u00e9lai cach\u00e9.",
  },
  {
    question: "Faut-il un statut d\u2019auto-entrepreneur\u00a0?",
    answer:
      "Non, pas pour commencer. On travaille avec vous quel que soit votre statut. Pour les commissions r\u00e9guli\u00e8res, on vous accompagnera sur les d\u00e9marches si besoin.",
  },
  {
    question: "Est-ce que la commission est r\u00e9currente\u00a0?",
    answer:
      "La commission porte sur le premier projet du client que vous apportez. Si le client revient pour un second projet, on en discute au cas par cas.",
  },
  {
    question: "Comment je recommande quelqu\u2019un\u00a0?",
    answer:
      "Trois options\u00a0: envoyez-nous le contact par WhatsApp, par email, ou partagez notre lien directement. On prend le relais.",
  },
  {
    question: "Qu\u2019est-ce qui se passe si le client ne signe pas\u00a0?",
    answer:
      "Rien. Pas de commission, mais pas de p\u00e9nalit\u00e9 non plus. Vous ne risquez rien. Z\u00e9ro engagement.",
  },
  {
    question: "Combien de personnes je peux recommander\u00a0?",
    answer:
      "Aucune limite. Plus vous recommandez, plus vous gagnez. C\u2019est aussi simple que \u00e7a.",
  },
  {
    question: "Comment je sais si mon contact a sign\u00e9\u00a0?",
    answer:
      "On vous tient inform\u00e9 \u00e0 chaque \u00e9tape. Quand le client signe, vous recevez une notification et le d\u00e9tail de votre commission.",
  },
];

// --- CTA ---

export const apportCTA = {
  title: "Pr\u00eat \u00e0 mon\u00e9tiser votre r\u00e9seau\u00a0?",
  subtitle:
    "Inscription en 2 minutes. On vous explique tout. Et d\u00e8s votre premi\u00e8re recommandation, vous gagnez de l\u2019argent.",
  ctaPrimary: "S\u2019inscrire au programme",
  ctaSecondary: "Poser une question sur WhatsApp",
  whatsappUrl:
    "https://wa.me/33781958090?text=Bonjour%2C%20je%20souhaite%20rejoindre%20le%20programme%20apporteur%20d%27affaires%20Aurentia.",
  proofs: [
    "Gratuit et sans engagement",
    "10\u00a0% de commission \u2014 pas de plafond",
    "Paiement sous 30 jours",
  ],
};

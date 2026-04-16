// src/data/v2/home.ts
// DRAFT_COPY — to refine before swap
// NOTE: client counts, satisfaction scores and realisation KPIs are plausible
// placeholders — to be replaced with real data before launch.
import {
  Globe,
  Code2,
  BrainCircuit,
  Sparkles,
  Tag,
  Layers,
  Headphones,
} from "lucide-react";
import type { HomeData } from "./types";

export const homeData: HomeData = {
  hero: {
    headline: "On construit vos sites,\nSaaS et outils IA.",
    subHeadline:
      "Agence tech full-stack à Paris. On conçoit, on code, on livre — du site vitrine au SaaS complet, en passant par les solutions IA. En jours, pas en mois.",
    cta: {
      primary: { label: "Discutons de votre projet", href: "/v2/contact" },
      secondary: { label: "Voir nos offres", href: "#pillars" },
    },
  },
  logoStrip: {
    label: "Ils nous font confiance",
    logos: [
      { name: "Client A", src: "/images/v2/logos/client-a.svg" },
      { name: "Client B", src: "/images/v2/logos/client-b.svg" },
      { name: "Client C", src: "/images/v2/logos/client-c.svg" },
      { name: "Client D", src: "/images/v2/logos/client-d.svg" },
      { name: "Client E", src: "/images/v2/logos/client-e.svg" },
      { name: "Client F", src: "/images/v2/logos/client-f.svg" },
    ],
  },
  pillars: {
    eyebrow: "Nos expertises",
    title: "Trois piliers, une seule agence",
    items: [
      {
        icon: Globe,
        title: "Sites Web",
        pitch:
          "Sites vitrines et landing pages livrés en jours grâce à l'IA",
        priceFrom: "1 200 €",
        href: "/v2/sites-web",
      },
      {
        icon: Code2,
        title: "SaaS sur-mesure",
        pitch:
          "MVP fonctionnel en 1 à 2 semaines, architecture pro, IA intégrée",
        priceFrom: "5 000 €",
        href: "/v2/saas",
      },
      {
        icon: BrainCircuit,
        title: "Solutions IA",
        pitch:
          "Formations, configuration Claude, audits et skills custom déployés chez vous",
        priceFrom: "Sur devis",
        href: "/v2/solutions-ia",
      },
    ],
  },
  whyAurentia: {
    eyebrow: "Pourquoi Aurentia",
    title: "Pourquoi faire le choix Aurentia",
    items: [
      {
        icon: Code2,
        title: "Propriétaire de votre code",
        description:
          "Votre projet, votre code source. Aucune dépendance, aucun lock-in — vous pouvez le faire évoluer avec n'importe quel développeur.",
      },
      {
        image: "/images/icons/whatsapp-icon.webp",
        title: "Support sur WhatsApp",
        description:
          "Une question ? Un bug ? Écrivez-nous directement sur WhatsApp. Réponse en moins de 2h, pas de ticket sans réponse.",
      },
      {
        icon: Sparkles,
        title: "Propulsé par l'IA",
        description:
          "On utilise l'intelligence artificielle à chaque étape. Résultat : des livraisons 3× plus rapides sans compromis sur la qualité.",
      },
      {
        icon: Tag,
        title: "Prix transparent",
        description:
          "Un devis clair dès le départ. Pas d'abonnement mensuel caché, pas de frais surprise. Un prix, un projet livré.",
      },
      {
        icon: Layers,
        title: "Technologies modernes",
        description:
          "Des technologies performantes, rapides et fiables. Pas de WordPress, pas de no-code — du vrai code sur-mesure, fait pour durer.",
      },
      {
        icon: Headphones,
        title: "30 jours de support inclus",
        description:
          "On ne disparaît pas après le lancement. Ajustements, corrections, questions — on reste à vos côtés pendant 30 jours.",
      },
    ],
  },
  realisationsPreview: [
    {
      slug: "refonte-marie",
      title: "Refonte complète et SEO multiplié par 4",
      client: "Atelier Marie",
      pillar: "sites-web",
      resultKpi: "+340% trafic organique",
      imageUrl: "/images/v2/realisations/realisation-1.jpg",
      href: "/v2/agence",
    },
    {
      slug: "mvp-12-jours",
      title: "MVP livré en 12 jours",
      client: "Startup B2B",
      pillar: "saas",
      resultKpi: "12 jours · 0 → 100 utilisateurs",
      imageUrl: "/images/v2/realisations/realisation-2.jpg",
      href: "/v2/agence",
    },
    {
      slug: "skill-claude-conseil",
      title: "Skill Claude custom pour le service client",
      client: "Cabinet Conseil",
      pillar: "solutions-ia",
      resultKpi: "−65% temps de réponse",
      imageUrl: "/images/v2/realisations/realisation-3.jpg",
      href: "/v2/agence",
    },
  ],
  testimonials: [
    {
      quote:
        "Aurentia a livré notre site en 5 jours. Cinq jours. Et le résultat est meilleur que ce que d'autres agences nous proposaient en deux mois.",
      author: "Marie L.",
      role: "Fondatrice",
      company: "Atelier Marie",
      pillar: "sites-web",
    },
    {
      quote:
        "Ils ont configuré Claude pour notre équipe et nous ont formés. On a gagné l'équivalent d'un mi-temps en automatisations en moins de trois semaines.",
      author: "Thomas R.",
      role: "Directeur",
      company: "Cabinet Conseil",
      pillar: "solutions-ia",
    },
    {
      quote:
        "Notre MVP SaaS était en ligne 12 jours après notre premier appel. C'est ce qui nous a permis de signer notre seed round.",
      author: "Lisa K.",
      role: "CEO",
      company: "Startup B2B",
      pillar: "saas",
    },
  ],
  method: {
    title: "Notre méthode en 4 étapes",
    steps: [
      {
        number: "01",
        title: "Briefing",
        description:
          "On comprend votre besoin, vos contraintes et vos objectifs en un seul appel.",
      },
      {
        number: "02",
        title: "Devis & cadrage",
        description:
          "Devis clair sous 24h, périmètre détaillé, deadline ferme.",
      },
      {
        number: "03",
        title: "Production",
        description:
          "Sprints courts, livrables réguliers, vous suivez l'avancement en temps réel.",
      },
      {
        number: "04",
        title: "Livraison & support",
        description:
          "Mise en ligne, formation et support inclus pendant 30 jours.",
      },
    ],
  },
  faq: [
    {
      question: "Combien de temps pour livrer un projet ?",
      answer:
        "Cela dépend du type de projet : un site vitrine est livré en 48h à 5 jours, une landing page en 3 à 7 jours, un MVP SaaS en 1 à 2 semaines, une formation IA en 1 semaine. Pour les projets plus ambitieux, on cadre une roadmap claire avec des livrables intermédiaires.",
    },
    {
      question: "Quel est votre tarif moyen ?",
      answer:
        "Sites vitrines à partir de 1 200 €, landing pages à partir de 1 500 €, MVP SaaS à partir de 5 000 €. Les solutions IA et l'implémentation sont sur devis selon le périmètre. Tous nos prix sont affichés clairement sur les pages dédiées.",
    },
    {
      question:
        "Qu'est-ce qui vous rend différents des autres agences ?",
      answer:
        "L'IA n'est pas un argument marketing chez nous, c'est notre mode de production quotidien. C'est ce qui nous permet d'être 5× plus rapides à qualité égale. Et nous savons aussi déployer l'IA dans votre entreprise — pas seulement en parler.",
    },
    {
      question: "Travaillez-vous avec des entreprises de toutes tailles ?",
      answer:
        "Oui. Du freelance au groupe de 200 personnes. Notre approche s'adapte : pour les petites structures on livre des outils prêts à l'emploi, pour les grandes on accompagne aussi le changement.",
    },
    {
      question:
        "Comment ça se passe si on a déjà un site ou un SaaS ?",
      answer:
        "On peut faire une refonte, ajouter une couche IA, ou déployer des skills custom dans votre stack existante. On commence toujours par un audit gratuit pour voir ce qui mérite d'être gardé et ce qu'il faut réécrire.",
    },
    {
      question: "Et après la livraison ?",
      answer:
        "Support inclus pendant 30 jours pour tout projet. Au-delà, on propose des forfaits de maintenance et d'évolution adaptés à votre rythme. On ne disparaît jamais après la livraison.",
    },
  ],
  contactCta: {
    title: "Discutons de votre projet",
    subtitle:
      "Réponse en moins de 24h. Pas de SDR, pas de pitch — directement avec l'équipe technique.",
    cta: { label: "Prendre rendez-vous", href: "/v2/contact" },
  },
};

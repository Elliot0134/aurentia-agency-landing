// src/data/home.ts
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
  MessageSquare,
  FileText,
  Hammer,
  Rocket,
  CalendarCheck,
  Clock,
  ShieldCheck,
} from "lucide-react";
import type { HomeData } from "./types";

export const homeData: HomeData = {
  hero: {
    headline: "On construit vos sites,\nSaaS et outils IA.",
    subHeadline:
      "Agence tech full-stack à Avignon. On conçoit, on code, on livre — du site vitrine au SaaS complet, en passant par les solutions IA. En jours, pas en mois.",
    cta: {
      primary: { label: "Discutons de votre projet", href: "#rdv-embed" },
      secondary: { label: "Voir nos offres", href: "#pillars" },
    },
  },
  logoStrip: {
    label: "Ils nous font confiance",
    logos: [
      { name: "Client A", src: "/images/logos/client-a.svg" },
      { name: "Client B", src: "/images/logos/client-b.svg" },
      { name: "Client C", src: "/images/logos/client-c.svg" },
      { name: "Client D", src: "/images/logos/client-d.svg" },
      { name: "Client E", src: "/images/logos/client-e.svg" },
      { name: "Client F", src: "/images/logos/client-f.svg" },
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
        href: "/sites-web",
      },
      {
        icon: Code2,
        title: "SaaS sur-mesure",
        pitch:
          "MVP fonctionnel en 1 à 2 semaines, architecture pro, IA intégrée",
        priceFrom: "5 000 €",
        href: "/saas",
      },
      {
        icon: BrainCircuit,
        title: "Solutions IA",
        pitch:
          "Formations, configuration Claude, audits et skills custom déployés chez vous",
        priceFrom: "Sur devis",
        href: "/solutions-ia",
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
      imageUrl: "/images/realisations/realisation-1.jpg",
      href: "/agence",
    },
    {
      slug: "mvp-12-jours",
      title: "MVP livré en 12 jours",
      client: "Startup B2B",
      pillar: "saas",
      resultKpi: "12 jours · 0 → 100 utilisateurs",
      imageUrl: "/images/realisations/realisation-2.jpg",
      href: "/agence",
    },
    {
      slug: "skill-claude-conseil",
      title: "Skill Claude custom pour le service client",
      client: "Cabinet Conseil",
      pillar: "solutions-ia",
      resultKpi: "−65% temps de réponse",
      imageUrl: "/images/realisations/realisation-3.jpg",
      href: "/agence",
    },
  ],
  testimonials: [
    {
      quote:
        "On voulait un site sobre, qui inspire confiance avant même qu'on nous appelle. Elliot a livré en 6 jours, et il a refusé qu'on utilise des photos stock — il a insisté pour qu'on fasse un shooting dans la cuisine. C'est exactement ce détail-là qui fait que les clients nous disent que ça donne envie.",
      author: "Inès E.",
      role: "Fondatrice",
      company: "Maison Enileh",
      pillar: "sites-web",
      stat: "Livré en 6 jours",
    },
    {
      quote:
        "Franchement j'étais sceptique sur le côté IA — trop de promesses dans ce milieu. Ils ont passé une journée complète à regarder comment on bossait avant de proposer quoi que ce soit. Aujourd'hui je passe plus mes dimanches soirs à traiter les mails élèves. Ça a l'air con, mais c'est ça qui change la vie.",
      author: "Thomas B.",
      role: "Fondateur",
      company: "Golf Mentor",
      pillar: "solutions-ia",
      stat: "~8 h / semaine récupérées",
    },
    {
      quote:
        "Le MVP était en ligne 3 semaines après le kick-off, avec un vrai paiement Stripe qui tourne. Ce qui m'a marqué c'est qu'Elliot répond à 23h quand un bug bloque une démo le lendemain — on en a pas croisé beaucoup qui font ça.",
      author: "Camille F.",
      role: "Co-fondatrice",
      company: "AlloRestau",
      pillar: "saas",
      stat: "MVP en 3 semaines",
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
        icon: MessageSquare,
      },
      {
        number: "02",
        title: "Devis & cadrage",
        description:
          "Devis clair sous 24h, périmètre détaillé, deadline ferme.",
        icon: FileText,
      },
      {
        number: "03",
        title: "Production",
        description:
          "Sprints courts, livrables réguliers, vous suivez l'avancement en temps réel.",
        icon: Hammer,
      },
      {
        number: "04",
        title: "Livraison & support",
        description:
          "Mise en ligne, formation et support inclus pendant 30 jours.",
        icon: Rocket,
      },
    ],
  },
  blogPreview: {
    title: "Dernières publications",
    articles: [
      {
        slug: "automatiser-40-pourcent-admin-avec-claude",
        category: "IA",
        title: "Comment on a automatisé 40% de nos tâches admin avec Claude",
        excerpt:
          "Retour d'expérience : les workflows, skills et automations qu'on a déployés en interne pour gagner 2 jours par semaine.",
        date: "2026-04-10",
        readingTime: "6 min",
        imageUrl: "/images/blog/blog-1.svg",
        href: "/blog/automatiser-40-pourcent-admin-avec-claude",
      },
      {
        slug: "pourquoi-votre-site-ne-convertit-pas",
        category: "Sites Web",
        title: "Pourquoi votre site ne convertit pas (et comment corriger en 7 jours)",
        excerpt:
          "Les 5 erreurs qu'on voit sur 8 sites sur 10 — et le plan concret pour les corriger sans tout refondre.",
        date: "2026-04-03",
        readingTime: "5 min",
        imageUrl: "/images/blog/blog-2.svg",
        href: "/blog/pourquoi-votre-site-ne-convertit-pas",
      },
      {
        slug: "mvp-en-12-jours-notre-methode",
        category: "SaaS",
        title: "MVP en 12 jours : la méthode qu'on utilise pour nos clients",
        excerpt:
          "Stack, découpage, choix techniques, outils IA : comment on livre un MVP fonctionnel en 2 semaines sans rogner sur la qualité.",
        date: "2026-03-27",
        readingTime: "8 min",
        imageUrl: "/images/blog/blog-3.svg",
        href: "/blog/mvp-en-12-jours-notre-methode",
      },
    ],
    seeAllCta: { label: "Voir tous les articles", href: "/blog" },
  },
  faq: [
    {
      question: "Combien de temps pour livrer un projet ?",
      answer:
        "Cela dépend du type de projet : un site vitrine est livré en 72h à 5 jours, une landing page en 3 à 7 jours, un MVP SaaS en 1 à 2 semaines, une formation IA en 1 semaine. Pour les projets plus ambitieux, on cadre une roadmap claire avec des livrables intermédiaires.",
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
  bookingCta: {
    title: "Prenons 15 minutes ensemble",
    subtitle:
      "Un appel rapide pour comprendre votre besoin et vous dire si on peut vous aider. Sans engagement.",
    signals: [
      { icon: CalendarCheck, label: "Créneau sous 72h" },
      { icon: Clock, label: "15 min chrono" },
      { icon: ShieldCheck, label: "Sans engagement" },
    ],
    cta: {
      label: "Réserver un créneau",
      href: "#rdv-embed",
    },
  },
  contactCta: {
    title: "Discutons de votre projet",
    subtitle:
      "Réponse en moins de 24h. Pas de SDR, pas de pitch — directement avec l'équipe technique.",
    cta: { label: "Prendre rendez-vous", href: "/contact" },
  },
};

// src/data/agence-a-propos.ts
// DRAFT_COPY — to refine before swap
// NOTE: team members bios are fictional placeholders except for Elliot Estrade.
import {
  ShieldCheck,
  Zap,
  Sparkles,
  Users,
} from "lucide-react";
import type { AProposData } from "./types";

export const aProposData: AProposData = {
  hero: {
    eyebrow: "À propos",
    headline: "Qui est Aurentia ?",
    subHeadline:
      "Une petite équipe technique, exigeante, basée en France. On construit ce qu'on aurait aimé trouver quand on cherchait une vraie agence IA.",
  },
  manifesto: {
    title: "Notre manifeste",
    paragraphs: [
      "On a monté Aurentia après avoir vu trop d'agences promettre l'IA sans vraiment s'en servir, et trop de clients payer cher pour des sites et des SaaS médiocres. L'IA a changé le métier en profondeur : on peut livrer plus vite, mieux, et pour moins cher qu'avant. Mais seulement si on sait s'en servir vraiment — pas seulement si on met « IA » sur sa page d'accueil.",
      "On croit que l'IA est l'outil qui permet à une petite équipe d'exécuter comme une grande. Chez Aurentia, Claude, les skills et les agents font partie de notre boîte à outils quotidienne. Ils ne remplacent pas les gens — ils les rendent dix fois plus efficaces, à condition d'être correctement configurés, maîtrisés et intégrés dans des process rigoureux.",
      "Ce qui nous rend différents, c'est qu'on ne fait pas que construire des produits avec l'IA : on aide aussi nos clients à intégrer l'IA dans leur quotidien. Sites web, SaaS, formation, configuration, audit, skills custom — tout l'écosystème IA d'une entreprise peut être pris en charge par une seule équipe. Ça simplifie la vie de nos clients, et ça nous permet d'avoir une vision complète de chaque projet.",
      "Enfin, on ne transige pas sur la qualité. La rapidité n'est pas une excuse pour livrer du code sale, des designs bâclés ou des features à moitié testées. On préfère décaler d'un jour que livrer quelque chose qu'on ne serait pas fier de montrer. C'est notre engagement et c'est pour ça que nos clients reviennent.",
    ],
  },
  team: {
    title: "L'équipe",
    members: [
      {
        name: "Elliot Estrade",
        role: "Fondateur",
        bio: "Entrepreneur et développeur full-stack, Elliot a fondé Aurentia après avoir co-créé Aurentia (SaaS), ESST Solutions et d'autres produits IA. Il pilote la vision, la relation client et les projets les plus techniques de l'agence.",
        avatarUrl: "/images/team/elliot.jpg",
      },
      {
        name: "Claire Dubois",
        role: "Direction créative",
        bio: "Designer produit et directrice artistique, Claire a travaillé pour plusieurs studios parisiens avant de rejoindre Aurentia. Elle est garante de la qualité visuelle et de l'expérience utilisateur sur tous les projets de l'agence.",
        avatarUrl: "/images/team/claire.jpg",
      },
      {
        name: "Marc Tessier",
        role: "Lead développeur",
        bio: "Développeur senior spécialisé Next.js, React et Supabase, Marc dirige la production technique. Il veille à la qualité du code, à la robustesse des architectures et à la montée en compétence de toute l'équipe dev.",
        avatarUrl: "/images/team/marc.jpg",
      },
      {
        name: "Sophia Reyes",
        role: "IA engineer",
        bio: "Spécialiste IA et agents, Sophia conçoit les skills Claude custom et les intégrations IA pour les clients. Elle est aussi en charge de la veille et de la R&D sur les nouveautés Anthropic.",
        avatarUrl: "/images/team/sophia.jpg",
      },
    ],
  },
  values: {
    title: "Nos valeurs",
    items: [
      {
        icon: ShieldCheck,
        title: "Rigueur technique",
        description:
          "Code propre, architecture claire, tests quand il le faut. La vitesse n'est jamais une excuse pour bricoler.",
      },
      {
        icon: Zap,
        title: "Rapidité d'exécution",
        description:
          "On livre vite parce qu'on sait le faire, pas parce qu'on prend des raccourcis. L'IA est notre accélérateur, pas notre excuse.",
      },
      {
        icon: Sparkles,
        title: "Transparence",
        description:
          "Devis clairs, suivi en temps réel, échanges directs avec l'équipe technique. Pas de chef de projet intermédiaire qui filtre l'info.",
      },
      {
        icon: Users,
        title: "Pédagogie",
        description:
          "On explique ce qu'on fait, on forme nos clients à l'utilisation, et on livre toujours avec la doc pour que vous soyez autonome après.",
      },
    ],
  },
  finalCta: {
    title: "Envie de travailler ensemble ?",
    subtitle:
      "On prend un appel de 30 minutes, on parle de votre projet, et on voit ensemble si on est le bon partenaire.",
    cta: { label: "Prendre rendez-vous", href: "/contact" },
  },
};

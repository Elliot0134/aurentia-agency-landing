// src/data/v2/agence.ts
// DRAFT_COPY — to refine before swap
// NOTE: team members are fictional placeholders except for Elliot Estrade.
import {
  Users,
  Briefcase,
  FileText,
  Lightbulb,
  TrendingUp,
} from "lucide-react";
import type { AgencyPillarData } from "./types";

export const agenceData: AgencyPillarData = {
  hero: {
    eyebrow: "L'agence",
    headline: "Aurentia, une agence d'une nouvelle génération.",
    subHeadline:
      "Une équipe technique, française, partenaire Anthropic, qui conçoit et livre des produits IA-natifs pour ses clients — et qui déploie l'IA dans leur quotidien.",
    cta: {
      primary: { label: "Travailler avec nous", href: "/v2/contact" },
      secondary: { label: "Notre histoire", href: "/v2/agence/a-propos" },
    },
  },
  subPages: [
    {
      icon: Users,
      title: "À propos",
      description:
        "Notre histoire, notre équipe, nos valeurs et pourquoi on a monté Aurentia.",
      href: "/v2/agence/a-propos",
      available: true,
    },
    {
      icon: Briefcase,
      title: "Réalisations",
      description:
        "Tous nos projets clients détaillés : contexte, solution, résultats.",
      href: "/v2/agence",
      available: false,
    },
    {
      icon: FileText,
      title: "Le blog",
      description:
        "Nos retours d'expérience sur l'IA, le code et la livraison rapide.",
      href: "/v2/agence",
      available: false,
    },
    {
      icon: Lightbulb,
      title: "Ressources",
      description:
        "Playbooks, skills Claude et templates à télécharger gratuitement.",
      href: "/v2/agence",
      available: false,
    },
    {
      icon: TrendingUp,
      title: "Affiliation",
      description:
        "Devenez partenaire Aurentia et gagnez une commission sur chaque projet apporté.",
      href: "/v2/agence",
      available: false,
    },
  ],
  story: {
    title: "Pourquoi Aurentia ?",
    paragraph:
      "Aurentia est née d'un constat simple : l'IA est en train de changer la façon dont on construit les produits, mais les agences classiques n'ont pas suivi. On a créé une agence pensée dès le départ pour l'ère de l'IA — plus rapide, plus précise, plus proche des clients — et on la met au service des entrepreneurs et des PME qui veulent prendre ce virage sérieusement.",
  },
  teamPreview: {
    title: "L'équipe",
    members: [
      {
        name: "Elliot Estrade",
        role: "Fondateur",
        avatarUrl: "/images/v2/team/elliot.jpg",
      },
      {
        name: "Claire Dubois",
        role: "Direction créative",
        avatarUrl: "/images/v2/team/claire.jpg",
      },
      {
        name: "Marc Tessier",
        role: "Lead développeur",
        avatarUrl: "/images/v2/team/marc.jpg",
      },
      {
        name: "Sophia Reyes",
        role: "IA engineer",
        avatarUrl: "/images/v2/team/sophia.jpg",
      },
    ],
    seeAllHref: "/v2/agence/a-propos",
  },
  finalCta: {
    title: "Un projet en tête ?",
    subtitle:
      "On commence par un appel de 30 minutes. Pas de pitch, pas de SDR — directement avec l'équipe technique.",
    cta: { label: "Prendre rendez-vous", href: "/v2/contact" },
  },
};

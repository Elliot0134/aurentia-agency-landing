import type { Secteur } from "./schemas";

export interface SecteurMeta {
  slug: Secteur;
  label: string;
  plural: string;
  shortDescription: string;
  heroTitle: string;
  heroSubtitle: string;
  editorial?: string;
  faq?: { question: string; answer: string }[];
  process?: { title: string; description: string }[];
}

export const secteurs: Record<Secteur, SecteurMeta> = {
  "restauration": {
    slug: "restauration",
    label: "Restauration",
    plural: "restaurants & food",
    shortDescription: "Sites vitrines et identités pour restaurants, cafés et concepts food.",
    heroTitle: "Création de sites pour restaurants",
    heroSubtitle: "Un site qui remplit la salle.",
  },
  "conciergerie": {
    slug: "conciergerie",
    label: "Conciergerie",
    plural: "conciergeries & location courte durée",
    shortDescription: "Sites et SaaS pour conciergeries Airbnb et gestion locative.",
    heroTitle: "Sites & outils pour conciergeries",
    heroSubtitle: "Captez plus de propriétaires, gérez mieux vos biens.",
  },
  "immobilier": {
    slug: "immobilier",
    label: "Immobilier",
    plural: "agences & pros de l'immobilier",
    shortDescription: "Sites vitrines, landing et outils pour agents et agences immobilières.",
    heroTitle: "Sites pour professionnels de l'immobilier",
    heroSubtitle: "Générez plus de mandats qualifiés.",
  },
  "coaching": {
    slug: "coaching",
    label: "Coaching & formation",
    plural: "coachs, formateurs et experts",
    shortDescription: "Sites et tunnels de vente pour coachs, formateurs et créateurs.",
    heroTitle: "Sites pour coachs et formateurs",
    heroSubtitle: "Votre expertise méritait mieux.",
  },
  "tech-ia": {
    slug: "tech-ia",
    label: "Tech & IA",
    plural: "startups tech & IA",
    shortDescription: "Sites et SaaS pour startups, éditeurs et produits IA.",
    heroTitle: "Sites & SaaS pour startups tech",
    heroSubtitle: "On parle votre langue.",
  },
  "sante-bien-etre": {
    slug: "sante-bien-etre",
    label: "Santé & bien-être",
    plural: "pros de la santé et du bien-être",
    shortDescription: "Sites pour praticiens, thérapeutes, studios et centres.",
    heroTitle: "Sites pour pros de la santé et du bien-être",
    heroSubtitle: "Remplissez votre agenda en continu.",
  },
  "services-pro": {
    slug: "services-pro",
    label: "Services aux pros",
    plural: "services B2B",
    shortDescription: "Sites et landing pour cabinets, consultants et agences.",
    heroTitle: "Sites B2B qui convertissent",
    heroSubtitle: "Plus de demandes entrantes, moins de prospection.",
  },
};

export const secteurList: SecteurMeta[] = Object.values(secteurs);

export function getSecteur(slug: string): SecteurMeta | undefined {
  return (secteurs as Record<string, SecteurMeta>)[slug];
}

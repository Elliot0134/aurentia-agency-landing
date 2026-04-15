// src/data/v2/sites-web.ts
// DRAFT_COPY — to refine before swap
// NOTE: stats are plausible placeholders pending real CRM/analytics data.
import {
  Globe,
  FileText,
  Rocket,
  Store,
  Briefcase,
  Sparkles,
  Clock,
} from "lucide-react";
import type { CommercialPillarData } from "./types";

export const sitesWebData: CommercialPillarData = {
  slug: "sites-web",
  hero: {
    eyebrow: "Pilier Sites Web",
    headline:
      "Des sites qui convertissent, livrés en jours — pas en mois.",
    subHeadline:
      "Sites vitrines et landing pages sur-mesure, construits avec l'IA pour une qualité pro à la vitesse d'un prototype. Aucun template recyclé.",
    badges: [
      { label: "Livré en 48h à 7 jours", icon: Clock },
      { label: "100% sur-mesure", icon: Sparkles },
    ],
    cta: {
      primary: { label: "Discutons de votre site", href: "/v2/contact" },
      secondary: { label: "Voir les offres", href: "#sub-offers" },
    },
    visual: {
      kind: "image",
      src: "/images/v2/sites-web/hero.jpg",
      alt: "Aperçus de sites livrés par Aurentia",
    },
  },
  stats: [
    { value: "200+", label: "sites livrés" },
    { value: "48h", label: "délai moyen" },
    { value: "100%", label: "sur-mesure" },
    { value: "4.9/5", label: "satisfaction clients" },
  ],
  subOffers: {
    variant: "grid",
    title: "Deux formats, un même niveau d'exigence",
    items: [
      {
        icon: Globe,
        title: "Site vitrine",
        pitch:
          "Pour présenter votre activité, générer de la confiance et capter des leads locaux.",
        priceFrom: "1 200 €",
        href: "/v2/sites-web/site-vitrine",
      },
      {
        icon: FileText,
        title: "Landing page",
        pitch:
          "Pour pousser une offre, un produit ou une levée — taux de conversion maximisé.",
        priceFrom: "1 500 €",
        href: "/v2/sites-web/landing-page",
      },
    ],
  },
  forWho: {
    title: "Pour qui on travaille",
    profiles: [
      {
        icon: Briefcase,
        title: "Artisans & TPE",
        description:
          "Plombier, menuisier, architecte, coach… vous voulez un site qui inspire confiance et fait sonner le téléphone.",
      },
      {
        icon: Store,
        title: "Commerces & boutiques",
        description:
          "Boutiques physiques, e-shops légers, concept stores qui ont besoin d'une présence web soignée et locale.",
      },
      {
        icon: Sparkles,
        title: "Restaurateurs",
        description:
          "Restaurants, bars, traiteurs qui veulent une vitrine appétissante avec menu, réservation et photos qui donnent faim.",
      },
      {
        icon: Rocket,
        title: "Startups en go-to-market",
        description:
          "Fondateurs qui lancent un produit et ont besoin d'une landing page qui convertit dès les premiers visiteurs.",
      },
    ],
  },
  method: {
    title: "Comment on travaille",
    steps: [
      {
        number: "01",
        title: "Brief express",
        description:
          "Un appel de 30 minutes pour comprendre votre activité, votre cible et vos objectifs.",
      },
      {
        number: "02",
        title: "Design & contenu",
        description:
          "On conçoit le design, on rédige les textes et on produit les visuels — l'IA nous fait gagner un temps fou sans rogner sur la qualité.",
      },
      {
        number: "03",
        title: "Intégration & tests",
        description:
          "Intégration responsive, SEO de base, performance au top. On teste tout avant de vous livrer.",
      },
      {
        number: "04",
        title: "Mise en ligne & support",
        description:
          "Déploiement, formation rapide pour éditer vos contenus, et 30 jours de support inclus.",
      },
    ],
  },
  realisationsFiltered: [
    {
      slug: "refonte-marie",
      title: "Refonte complète et SEO multiplié par 4",
      client: "Atelier Marie",
      pillar: "sites-web",
      resultKpi: "+340% trafic organique",
      imageUrl: "/images/v2/realisations/sites-web-1.jpg",
      href: "/v2/agence",
    },
    {
      slug: "landing-seed-round",
      title: "Landing page de lancement pour levée seed",
      client: "Northlight",
      pillar: "sites-web",
      resultKpi: "22% de taux de conversion",
      imageUrl: "/images/v2/realisations/sites-web-2.jpg",
      href: "/v2/agence",
    },
  ],
  testimonialsFiltered: [
    {
      quote:
        "On avait déjà consulté trois agences, toutes parlaient en mois et en milliers d'euros. Aurentia a livré un site qu'on aime en moins d'une semaine pour un budget honnête.",
      author: "Camille B.",
      role: "Co-fondatrice",
      company: "Studio Nord",
      pillar: "sites-web",
    },
    {
      quote:
        "Notre landing de lancement a fait 22% de conversion dès le premier jour. Le niveau de finition est du même ordre que ce qu'on voit chez les grosses agences SF.",
      author: "Julien M.",
      role: "Founder",
      company: "Northlight",
      pillar: "sites-web",
    },
  ],
  faq: [
    {
      question: "Mon site sera-t-il vraiment unique ?",
      answer:
        "Oui. On ne part jamais d'un template tout fait. Le design est pensé pour votre marque et votre audience, même si on s'appuie sur des composants modernes pour aller vite.",
    },
    {
      question: "Est-ce que je peux éditer mon site moi-même après la livraison ?",
      answer:
        "Oui. On livre avec un back-office simple pour que vous puissiez modifier textes, photos et pages clés sans dépendre de nous. On vous forme en 30 minutes à la livraison.",
    },
    {
      question: "Le SEO est-il inclus ?",
      answer:
        "Oui, le SEO technique est inclus dans toutes nos offres (sitemap, metas, performance, structured data). Pour une stratégie de contenu et du netlinking, on propose des accompagnements dédiés en option.",
    },
    {
      question: "Combien ça coûte exactement ?",
      answer:
        "Sites vitrines à partir de 1 200 € (format Essentiel) et landing pages à partir de 1 500 €. Les prix montent selon le nombre de pages, la complexité du design et les fonctionnalités. Devis clair sous 24h.",
    },
    {
      question: "Avez-vous un délai minimum ou maximum ?",
      answer:
        "Délai minimum : 48h pour un site vitrine simple quand tout est prêt côté contenu. Délai maximum sur les formats standards : 7 jours. Au-delà, c'est qu'on parle d'un projet custom qui mérite un cadrage dédié.",
    },
    {
      question: "Et l'hébergement ?",
      answer:
        "On déploie sur Vercel (le meilleur rapport perfs/prix du marché). Vous gardez la main complète sur le domaine et l'hébergement — aucun enfermement. On peut aussi déployer sur votre infra si vous en avez une.",
    },
  ],
  finalCta: {
    title: "Prêt à lancer votre site ?",
    subtitle:
      "Un appel de 15 minutes suffit pour savoir si on peut vous aider. Devis clair sous 24h.",
    cta: { label: "Prendre rendez-vous", href: "/v2/contact" },
  },
};

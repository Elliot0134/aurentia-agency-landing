// src/data/v2/types.ts
//
// Shared TypeScript types for all v2 data files.
// Every data file in src/data/v2/ exports an object that conforms to one of these.

import type { LucideIcon } from "lucide-react";

/* ──────────────────────────────────────────────
   Generic building blocks
   ────────────────────────────────────────────── */

export type CTA = {
  label: string;
  href: string;
};

export type DualCTA = {
  primary: CTA;
  secondary: CTA;
};

export type Badge = {
  label: string;
  icon?: LucideIcon;
};

export type Stat = {
  value: string; // e.g. "200+", "48h", "4.9/5"
  label: string; // e.g. "projets livrés"
};

export type ProfileCard = {
  icon: LucideIcon;
  title: string;
  description: string;
};

export type ProcessStep = {
  number: string; // "01", "02"…
  title: string;
  description: string;
};

export type FAQItem = {
  question: string;
  answer: string;
};

export type Realisation = {
  slug: string;
  title: string;
  client: string;
  pillar: "sites-web" | "saas" | "solutions-ia";
  resultKpi: string; // e.g. "+180% conversions"
  imageUrl: string;
  href: string;
};

export type Testimonial = {
  quote: string;
  author: string;
  role: string;
  company: string;
  avatarUrl?: string;
  pillar?: "sites-web" | "saas" | "solutions-ia";
};

/* ──────────────────────────────────────────────
   Home page data shape
   ────────────────────────────────────────────── */

export type HomeData = {
  hero: {
    eyebrow: string;
    headline: string;
    headlineAccent?: string;
    subHeadline: string;
    badges: Badge[];
    cta: DualCTA;
    visual: { kind: "image"; src: string; alt: string };
  };
  logoStrip: {
    label: string;
    logos: { name: string; src: string }[];
  };
  pillars: {
    eyebrow: string;
    title: string;
    items: {
      icon: LucideIcon;
      title: string;
      pitch: string;
      priceFrom?: string;
      href: string;
    }[];
  };
  whyAurentia: {
    eyebrow: string;
    title: string;
    items: { icon: LucideIcon; title: string; description: string }[];
  };
  realisationsPreview: Realisation[];
  testimonials: Testimonial[];
  method: {
    title: string;
    steps: ProcessStep[];
  };
  faq: FAQItem[];
  contactCta: {
    title: string;
    subtitle: string;
    cta: CTA;
  };
};

/* ──────────────────────────────────────────────
   Commercial pillar page data shape
   ────────────────────────────────────────────── */

export type CommercialPillarSubOffersGrid = {
  variant: "grid";
  title: string;
  items: {
    icon: LucideIcon;
    title: string;
    pitch: string;
    priceFrom?: string;
    href: string;
  }[];
};

export type CommercialPillarSubOffersSingle = {
  variant: "single";
  title: string;
  items: {
    icon: LucideIcon;
    title: string;
    description: string;
  }[];
  stack?: { name: string; logo?: string }[];
};

export type CommercialPillarData = {
  slug: string;
  hero: {
    eyebrow: string;
    headline: string;
    subHeadline: string;
    badges: Badge[];
    cta: DualCTA;
    visual: { kind: "image"; src: string; alt: string };
  };
  stats: Stat[];
  subOffers: CommercialPillarSubOffersGrid | CommercialPillarSubOffersSingle;
  forWho: {
    title: string;
    profiles: ProfileCard[];
  };
  method: {
    title: string;
    steps: ProcessStep[];
  };
  realisationsFiltered: Realisation[];
  testimonialsFiltered: Testimonial[];
  faq: FAQItem[];
  finalCta: {
    title: string;
    subtitle: string;
    cta: CTA;
  };
};

/* ──────────────────────────────────────────────
   Sub-page data shape
   ────────────────────────────────────────────── */

export type PricingPack = {
  name: string;
  price: string;
  priceSuffix?: string;
  recommended?: boolean;
  features: string[];
  cta: CTA;
};

export type SubPageData = {
  parentSlug: string;
  slug: string;
  hero: {
    eyebrow: string;
    headline: string;
    subHeadline: string;
    priceFrom?: string;
    badges: Badge[];
    cta: DualCTA;
    visual: { kind: "image"; src: string; alt: string };
  };
  forWho: ProfileCard[];
  whatYouGet: {
    title: string;
    items: string[];
  };
  process: ProcessStep[];
  pricing: {
    title: string;
    subtitle?: string;
    packs: PricingPack[];
    note?: string;
  };
  examples: {
    title: string;
    items: { title: string; imageUrl: string; href?: string }[];
  };
  testimonials: Testimonial[];
  faq: FAQItem[];
  finalCta: {
    title: string;
    subtitle: string;
    cta: CTA;
  };
};

/* ──────────────────────────────────────────────
   Agency pillar page (light version, Phase 1)
   ────────────────────────────────────────────── */

export type AgencyPillarData = {
  hero: {
    eyebrow: string;
    headline: string;
    subHeadline: string;
    cta: DualCTA;
  };
  subPages: {
    icon: LucideIcon;
    title: string;
    description: string;
    href: string;
    available: boolean;
  }[];
  story: {
    title: string;
    paragraph: string;
  };
  teamPreview: {
    title: string;
    members: { name: string; role: string; avatarUrl?: string }[];
    seeAllHref: string;
  };
  finalCta: {
    title: string;
    subtitle: string;
    cta: CTA;
  };
};

/* ──────────────────────────────────────────────
   À propos page
   ────────────────────────────────────────────── */

export type AProposData = {
  hero: {
    eyebrow: string;
    headline: string;
    subHeadline: string;
  };
  manifesto: {
    title: string;
    paragraphs: string[];
  };
  team: {
    title: string;
    members: {
      name: string;
      role: string;
      bio: string;
      avatarUrl?: string;
      links?: { label: string; href: string }[];
    }[];
  };
  values: {
    title: string;
    items: { icon: LucideIcon; title: string; description: string }[];
  };
  finalCta: {
    title: string;
    subtitle: string;
    cta: CTA;
  };
};

/* ──────────────────────────────────────────────
   Navbar / Footer config
   ────────────────────────────────────────────── */

export type NavLink = {
  label: string;
  href: string;
  description?: string;
};

export type NavSection = {
  label: string;
  href?: string;
  children?: NavLink[];
};

export type NavbarConfig = {
  logo: { label: string; href: string };
  sections: NavSection[];
  rightLinks: NavLink[];
  cta: CTA;
};

export type FooterConfig = {
  logo: { label: string; tagline: string };
  columns: {
    title: string;
    links: NavLink[];
  }[];
  socials: { label: string; href: string; icon: LucideIcon }[];
  legalLine: string;
};

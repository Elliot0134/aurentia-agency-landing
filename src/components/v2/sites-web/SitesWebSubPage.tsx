// src/components/sites-web/SitesWebSubPage.tsx
"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { SubPageData } from "@/data/v2/types";
import { sitesWebLandingData } from "@/data/v2/sites-web-landing";
import { sitesWebVitrineData } from "@/data/v2/sites-web-vitrine";
import { sitesWebEcommerceData } from "@/data/v2/sites-web-ecommerce";
import { sitesWebSurMesureData } from "@/data/v2/sites-web-sur-mesure";
import { SitesWebHero } from "./SitesWebHero";
import { EcommerceAnatomy } from "./ecommerce/EcommerceAnatomy";
import { EcommerceStack } from "./ecommerce/EcommerceStack";
import { SitesWebWhatYouGet } from "./SitesWebWhatYouGet";
import { SitesWebPricing } from "./SitesWebPricing";
import { SitesWebMethod } from "./SitesWebMethod";
import { SurMesureTimeline } from "./SurMesureTimeline";
import { SitesWebExamples } from "./SitesWebExamples";
import { SitesWebTestimonials } from "./SitesWebTestimonials";
import { SitesWebFAQ } from "./SitesWebFAQ";
import { SubPageForWho } from "@/components/v2/subpage/SubPageForWho";
import { SubPageTrustBand } from "@/components/v2/subpage/SubPageTrustBand";
import { SubPageGuarantees } from "@/components/v2/subpage/SubPageGuarantees";
import { SubPageComparison } from "@/components/v2/subpage/SubPageComparison";
import { HomeContactV2 } from "@/components/v2/home/HomeContactV2";
import { HomeBookingCTA } from "@/components/v2/home/HomeBookingCTA";
import { HomeBookingEmbed } from "@/components/v2/home/HomeBookingEmbed";
import { HomeTeamV2 } from "@/components/v2/home/HomeTeamV2";
import { HomeRealisationsPreview, type ItemTag } from "@/components/v2/home/HomeRealisationsPreview";
import { SubNavSetter } from "@/components/shared/SubNavContext";
import { ScrollToTop } from "@/components/shared/ScrollToTop";

const DATA_MAP: Record<string, SubPageData> = {
  "landing-page": sitesWebLandingData,
  "site-vitrine": sitesWebVitrineData,
  ecommerce: sitesWebEcommerceData,
  "sur-mesure": sitesWebSurMesureData,
};

const DEFAULT_SUB_NAV = [
  { label: "Pour qui", sectionId: "for-who" },
  { label: "Exemples", sectionId: "examples" },
  { label: "Témoignages", sectionId: "testimonials" },
  { label: "Réalisations", sectionId: "realisations" },
  { label: "Inclus", sectionId: "what-you-get" },
  { label: "Tarifs", sectionId: "pricing" },
  { label: "Garanties", sectionId: "guarantees" },
  { label: "Méthode", sectionId: "method" },
  { label: "Comparatif", sectionId: "comparison" },
  { label: "FAQ", sectionId: "faq" },
  { label: "Contact", sectionId: "contact" },
];

const ECOMMERCE_SUB_NAV = [
  { label: "Pour qui", sectionId: "for-who" },
  { label: "Anatomie", sectionId: "anatomy" },
  { label: "Réalisations", sectionId: "realisations" },
  { label: "Inclus", sectionId: "what-you-get" },
  { label: "Outils", sectionId: "stack" },
  { label: "Tarifs", sectionId: "pricing" },
  { label: "Méthode", sectionId: "method" },
  { label: "FAQ", sectionId: "faq" },
  { label: "Contact", sectionId: "contact" },
];

function ContextualHelpCTA() {
  return (
    <section className="w-full px-4 py-6 md:px-6 md:py-8">
      <div className="mx-auto w-full max-w-3xl text-center">
        <p className="text-sm text-foreground/60 md:text-base">
          Vous hésitez entre deux packs&nbsp;?{" "}
          <Link
            href="/contact"
            className="inline-flex items-center gap-1 font-semibold text-accent-primary underline-offset-4 transition-colors duration-500 ease-in-out hover:underline"
          >
            20 min au téléphone, on vous oriente gratuitement.
            <ArrowRight className="size-4" />
          </Link>
        </p>
      </div>
    </section>
  );
}

export function SitesWebSubPage({ slug }: { slug: string }) {
  const data = DATA_MAP[slug];
  if (!data) return null;

  const isEcommerce = slug === "ecommerce";
  const isSurMesure = slug === "sur-mesure";
  const showTeam = slug !== "site-vitrine";
  const subNav = isEcommerce ? ECOMMERCE_SUB_NAV : DEFAULT_SUB_NAV;

  const REALISATIONS_BY_SLUG: Record<string, { tags: ItemTag[]; title: string; subtitle: string }> = {
    "landing-page": {
      tags: ["Landing Page"],
      title: "Nos dernières landing pages",
      subtitle: "Des pages écrites pour convertir — cliquez pour voir le détail.",
    },
    "site-vitrine": {
      tags: ["Site Vitrine"],
      title: "Nos derniers sites vitrines",
      subtitle: "Des sites pensés pour vendre votre marque — cliquez pour voir le détail.",
    },
    ecommerce: {
      tags: ["E-commerce", "Site Vitrine"],
      title: "Nos dernières boutiques & sites premium",
      subtitle: "Quelques projets livrés récemment — cliquez pour voir le détail.",
    },
    "sur-mesure": {
      tags: ["SaaS", "Site Vitrine"],
      title: "Nos derniers projets sur-mesure",
      subtitle: "Plateformes, marketplaces, expériences brand — cliquez pour voir le détail.",
    },
  };
  const realisationsConfig = REALISATIONS_BY_SLUG[slug];

  return (
    <>
      <SubNavSetter items={subNav} />
      <ScrollToTop />
      <SitesWebHero hero={data.hero} />
      {data.trustStats && <SubPageTrustBand stats={data.trustStats} />}
      {data.forWho.length > 0 && <SubPageForWho profiles={data.forWho} />}
      {isEcommerce && <EcommerceAnatomy />}
      {!isEcommerce && <SitesWebExamples data={data.examples} />}
      <SitesWebTestimonials items={data.testimonials} />
      {realisationsConfig && (
        <HomeRealisationsPreview
          filterTags={realisationsConfig.tags}
          title={realisationsConfig.title}
          subtitle={realisationsConfig.subtitle}
        />
      )}
      <HomeBookingCTA />
      <SitesWebWhatYouGet data={data.whatYouGet} />
      {isEcommerce && <EcommerceStack />}
      <SitesWebPricing data={data.pricing} />
      <ContextualHelpCTA />
      {data.guarantees && <SubPageGuarantees items={data.guarantees} />}
      {isSurMesure ? (
        <SurMesureTimeline steps={data.process} />
      ) : (
        <SitesWebMethod steps={data.process} />
      )}
      {data.comparison && (
        <SubPageComparison
          title={data.comparison.title}
          subtitle={data.comparison.subtitle}
          columns={data.comparison.columns}
          rows={data.comparison.rows}
        />
      )}
      {showTeam && <HomeTeamV2 />}
      <SitesWebFAQ items={data.faq} />
      <HomeBookingEmbed />
    </>
  );
}

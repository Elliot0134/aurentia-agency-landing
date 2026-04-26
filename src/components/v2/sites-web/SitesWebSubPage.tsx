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
import { EcommerceShowcase } from "./ecommerce/EcommerceShowcase";
import { SitesWebWhatYouGet } from "./SitesWebWhatYouGet";
import { SitesWebPricing } from "./SitesWebPricing";
import { SitesWebMethod } from "./SitesWebMethod";
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
  { label: "Exemples", sectionId: "examples" },
  { label: "Inclus", sectionId: "what-you-get" },
  { label: "Anatomie", sectionId: "anatomy" },
  { label: "Outils", sectionId: "stack" },
  { label: "Tarifs", sectionId: "pricing" },
  { label: "Méthode", sectionId: "method" },
  { label: "Showcase", sectionId: "showcase" },
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
  const subNav = isEcommerce ? ECOMMERCE_SUB_NAV : DEFAULT_SUB_NAV;

  return (
    <>
      <SubNavSetter items={subNav} />
      <ScrollToTop />
      <SitesWebHero hero={data.hero} />
      {data.trustStats && <SubPageTrustBand stats={data.trustStats} />}
      {data.forWho.length > 0 && <SubPageForWho profiles={data.forWho} />}
      <SitesWebExamples data={data.examples} />
      <SitesWebTestimonials items={data.testimonials} />
      <HomeBookingCTA />
      <SitesWebWhatYouGet data={data.whatYouGet} />
      {isEcommerce && <EcommerceAnatomy />}
      {isEcommerce && <EcommerceStack />}
      <SitesWebPricing data={data.pricing} />
      <ContextualHelpCTA />
      {data.guarantees && <SubPageGuarantees items={data.guarantees} />}
      <SitesWebMethod steps={data.process} />
      {isEcommerce && <EcommerceShowcase />}
      {data.comparison && (
        <SubPageComparison
          title={data.comparison.title}
          subtitle={data.comparison.subtitle}
          columns={data.comparison.columns}
          rows={data.comparison.rows}
        />
      )}
      <SitesWebFAQ items={data.faq} />
      <HomeBookingEmbed />
    </>
  );
}

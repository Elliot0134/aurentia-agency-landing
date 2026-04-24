// src/components/v2/sites-web/SitesWebSubPage.tsx
"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { SubPageData } from "@/data/v2/types";
import { sitesWebLandingData } from "@/data/v2/sites-web-landing";
import { sitesWebVitrineData } from "@/data/v2/sites-web-vitrine";
import { SitesWebHero } from "./SitesWebHero";
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
import { SubNavSetter } from "@/components/shared/SubNavContext";
import { ScrollToTop } from "@/components/shared/ScrollToTop";

const DATA_MAP: Record<string, SubPageData> = {
  "landing-page": sitesWebLandingData,
  "site-vitrine": sitesWebVitrineData,
};

const SUB_NAV = [
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

function ContextualHelpCTA() {
  return (
    <section className="w-full px-4 py-6 md:px-6 md:py-8">
      <div className="mx-auto w-full max-w-3xl text-center">
        <p className="text-sm text-foreground/60 md:text-base">
          Vous hésitez entre deux packs&nbsp;?{" "}
          <Link
            href="/v2/contact"
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

  return (
    <>
      <SubNavSetter items={SUB_NAV} />
      <ScrollToTop />
      <SitesWebHero hero={data.hero} />
      {data.trustStats && <SubPageTrustBand stats={data.trustStats} />}
      {data.forWho.length > 0 && <SubPageForWho profiles={data.forWho} />}
      <SitesWebExamples data={data.examples} />
      <SitesWebTestimonials items={data.testimonials} />
      <SitesWebWhatYouGet data={data.whatYouGet} />
      <SitesWebPricing data={data.pricing} />
      <ContextualHelpCTA />
      {data.guarantees && <SubPageGuarantees items={data.guarantees} />}
      <SitesWebMethod steps={data.process} />
      {data.comparison && (
        <SubPageComparison
          title={data.comparison.title}
          subtitle={data.comparison.subtitle}
          columns={data.comparison.columns}
          rows={data.comparison.rows}
        />
      )}
      <SitesWebFAQ items={data.faq} />
      <HomeContactV2 />
    </>
  );
}

// src/components/v2/pillar/CommercialPillarPage.tsx
import type { CommercialPillarData } from "@/data/v2/types";
import { PillarHero } from "./PillarHero";
import { PillarStatsBanner } from "./PillarStatsBanner";
import { PillarSubOffersGrid } from "./PillarSubOffersGrid";
import { PillarForWho } from "./PillarForWho";
import { PillarMethod } from "./PillarMethod";
import { PillarFAQ } from "./PillarFAQ";
import { SectionContainer } from "@/components/v2/shared/SectionContainer";
import { RealisationCard } from "@/components/v2/shared/RealisationCard";
import { TestimonialCard } from "@/components/v2/shared/TestimonialCard";
import { DualCTA } from "@/components/v2/shared/DualCTA";
import { SubNavSetter } from "@/components/shared/SubNavContext";

type CommercialPillarPageProps = {
  data: CommercialPillarData;
};

const commercialPillarSubNavItems = [
  { label: "Nos offres", sectionId: "offers" },
  { label: "Pour qui", sectionId: "for-who" },
  { label: "Méthode", sectionId: "method" },
  { label: "Réalisations", sectionId: "realisations" },
  { label: "Témoignages", sectionId: "testimonials" },
  { label: "FAQ", sectionId: "faq" },
  { label: "Contact", sectionId: "cta" },
];

export function CommercialPillarPage({ data }: CommercialPillarPageProps) {
  return (
    <>
      <SubNavSetter items={commercialPillarSubNavItems} />
      <PillarHero hero={data.hero} />
      <PillarStatsBanner stats={data.stats} />
      <PillarSubOffersGrid subOffers={data.subOffers} />
      <PillarForWho title={data.forWho.title} profiles={data.forWho.profiles} />
      <PillarMethod title={data.method.title} steps={data.method.steps} />

      {data.realisationsFiltered.length > 0 && (
        <SectionContainer id="realisations" eyebrow="Réalisations" title="Quelques projets récents">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {data.realisationsFiltered.map((r) => (
              <RealisationCard key={r.slug} realisation={r} />
            ))}
          </div>
        </SectionContainer>
      )}

      {data.testimonialsFiltered.length > 0 && (
        <SectionContainer
          id="testimonials"
          eyebrow="Témoignages"
          title="Ils nous font confiance"
          className="bg-background-surface"
        >
          <div className="grid gap-6 md:grid-cols-2">
            {data.testimonialsFiltered.map((t, i) => (
              <TestimonialCard key={i} testimonial={t} />
            ))}
          </div>
        </SectionContainer>
      )}

      <PillarFAQ items={data.faq} />

      <SectionContainer
        id="cta"
        title={data.finalCta.title}
        subtitle={data.finalCta.subtitle}
      >
        <div className="flex justify-center">
          <DualCTA primary={data.finalCta.cta} size="lg" />
        </div>
      </SectionContainer>
    </>
  );
}

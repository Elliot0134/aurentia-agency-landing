// src/components/v2/subpage/SubPage.tsx
import type { SubPageData } from "@/data/v2/types";
import { SubPageStickyNav } from "./SubPageStickyNav";
import { SubPageHero } from "./SubPageHero";
import { SubPageForWho } from "./SubPageForWho";
import { SubPageWhatYouGet } from "./SubPageWhatYouGet";
import { SubPageProcess } from "./SubPageProcess";
import { SubPagePricing } from "./SubPagePricing";
import { SubPageExamples } from "./SubPageExamples";
import { SubPageFAQ } from "./SubPageFAQ";
import { SubPageCTA } from "./SubPageCTA";
import { SectionContainer } from "@/components/v2/shared/SectionContainer";
import { TestimonialCard } from "@/components/v2/shared/TestimonialCard";

type SubPageProps = {
  data: SubPageData;
};

export function SubPage({ data }: SubPageProps) {
  return (
    <>
      <SubPageHero hero={data.hero} />
      <SubPageStickyNav />
      <SubPageForWho profiles={data.forWho} />
      <SubPageWhatYouGet data={data.whatYouGet} />
      <SubPageProcess steps={data.process} />
      <SubPagePricing data={data.pricing} />
      <SubPageExamples data={data.examples} />

      {data.testimonials.length > 0 && (
        <SectionContainer eyebrow="Témoignages" title="Ils en parlent mieux que nous">
          <div className="grid gap-6 md:grid-cols-2">
            {data.testimonials.map((t, i) => (
              <TestimonialCard key={i} testimonial={t} />
            ))}
          </div>
        </SectionContainer>
      )}

      <SubPageFAQ items={data.faq} />
      <SubPageCTA data={data.finalCta} />
    </>
  );
}

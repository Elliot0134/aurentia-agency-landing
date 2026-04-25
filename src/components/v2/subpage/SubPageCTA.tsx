// src/components/v2/subpage/SubPageCTA.tsx
import type { SubPageData } from "@/data/v2/types";
import { SectionContainer } from "@/components/v2/shared/SectionContainer";
import { DualCTA } from "@/components/v2/shared/DualCTA";

type SubPageCTAProps = {
  data: SubPageData["finalCta"];
};

export function SubPageCTA({ data }: SubPageCTAProps) {
  return (
    <SectionContainer
      id="cta"
      title={data.title}
      subtitle={data.subtitle}
      alignHeader="center"
    >
      <div className="mx-auto flex max-w-2xl flex-col items-center gap-6 text-center">
        <DualCTA primary={data.cta} size="lg" />
      </div>
    </SectionContainer>
  );
}

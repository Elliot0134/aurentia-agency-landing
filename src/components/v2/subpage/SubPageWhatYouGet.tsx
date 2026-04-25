// src/components/v2/subpage/SubPageWhatYouGet.tsx
import { Check } from "lucide-react";
import type { SubPageData } from "@/data/v2/types";
import { SectionContainer } from "@/components/v2/shared/SectionContainer";

type SubPageWhatYouGetProps = {
  data: SubPageData["whatYouGet"];
};

export function SubPageWhatYouGet({ data }: SubPageWhatYouGetProps) {
  return (
    <SectionContainer id="what-you-get" eyebrow="Ce que vous obtenez" title={data.title}>
      <ul className="grid gap-4 md:grid-cols-2">
        {data.items.map((item) => (
          <li key={item} className="flex items-start gap-3">
            <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-accent-primary/15 text-accent-primary">
              <Check className="size-4" />
            </span>
            <span className="text-base text-foreground/80">{item}</span>
          </li>
        ))}
      </ul>
    </SectionContainer>
  );
}

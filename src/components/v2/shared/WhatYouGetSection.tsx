// src/components/v2/shared/WhatYouGetSection.tsx
import { Check } from "lucide-react";
import type { SubPageData } from "@/data/v2/types";
import { SectionContainer } from "./SectionContainer";

type WhatYouGetSectionProps = {
  data: SubPageData["whatYouGet"];
  subtitle?: string;
  id?: string;
  className?: string;
};

/**
 * Centered "what's included" section — grid of check items inside a
 * surface card, on a regular page background (matches the hero).
 */
export function WhatYouGetSection({
  data,
  subtitle,
  id = "what-you-get",
  className,
}: WhatYouGetSectionProps) {
  return (
    <SectionContainer
      id={id}
      title={data.title}
      subtitle={subtitle}
      className={className}
    >
      <div className="rounded-3xl border border-transparent dark:border-foreground/10 bg-background-surface dark:bg-foreground/[0.04] p-8 md:p-10">
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
      </div>
    </SectionContainer>
  );
}

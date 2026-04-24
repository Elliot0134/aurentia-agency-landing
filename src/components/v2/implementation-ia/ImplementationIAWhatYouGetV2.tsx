// src/components/v2/implementation-ia/ImplementationIAWhatYouGetV2.tsx
import { Check } from "lucide-react";
import { solutionsIaImplementationData } from "@/data/v2/solutions-ia-implementation";
import { SectionContainer } from "@/components/v2/shared/SectionContainer";
import { Card } from "@/components/v2/shared/Card";

/**
 * Mirror of HomeWhyAurentia layout — grid of bordered cards, each with a
 * check icon on the left and the included item as its text. Each included
 * deliverable gets its own card for visual weight parity with the homepage.
 */
export function ImplementationIAWhatYouGetV2() {
  const { whatYouGet } = solutionsIaImplementationData;

  return (
    <SectionContainer
      id="what-you-get"
      title={whatYouGet.title}
      subtitle="Pas de surprise — voici exactement ce qu'on livre, étape par étape, inclus dès le premier euro."
      className="py-32 md:py-40"
    >
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {whatYouGet.items.map((item) => (
          <Card
            key={item}
            className="group flex items-start gap-4 rounded-2xl p-7 transition-all duration-500 ease-in-out dark:hover:border-foreground/20 hover:shadow-sm"
          >
            <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-accent-primary/10 text-accent-primary transition-colors duration-500 ease-in-out group-hover:bg-accent-primary group-hover:text-white">
              <Check className="size-5" strokeWidth={2.2} />
            </span>
            <p className="text-base leading-relaxed text-foreground/80">{item}</p>
          </Card>
        ))}
      </div>
    </SectionContainer>
  );
}

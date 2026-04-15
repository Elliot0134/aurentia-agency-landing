// src/components/v2/home/HomeWhyAurentia.tsx
import { homeData } from "@/data/v2/home";
import { SectionContainer } from "@/components/v2/shared/SectionContainer";

export function HomeWhyAurentia() {
  const { whyAurentia } = homeData;
  return (
    <SectionContainer
      eyebrow={whyAurentia.eyebrow}
      title={whyAurentia.title}
      className="bg-background-surface"
    >
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {whyAurentia.items.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.title}
              className="flex flex-col gap-4 rounded-2xl bg-background p-7"
            >
              <div className="flex size-11 items-center justify-center rounded-xl bg-accent-primary/10 text-accent-primary">
                <Icon className="size-5" />
              </div>
              <h3 className="font-heading text-lg font-bold text-foreground">{item.title}</h3>
              <p className="text-base text-foreground/65">{item.description}</p>
            </div>
          );
        })}
      </div>
    </SectionContainer>
  );
}

// src/components/v2/home/HomeWhyAurentia.tsx
import { homeData } from "@/data/v2/home";
import { SectionContainer } from "@/components/v2/shared/SectionContainer";

export function HomeWhyAurentia() {
  const { whyAurentia } = homeData;
  return (
    <SectionContainer
      id="why"
      eyebrow={whyAurentia.eyebrow}
      title={whyAurentia.title}
      subtitle="Ce qui nous différencie des autres agences. Pas des promesses — des engagements concrets."
      className="bg-background-surface py-32 md:py-40"
    >
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {whyAurentia.items.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.title}
              className="group flex flex-col gap-4 rounded-2xl border border-foreground/10 bg-background p-7 transition-all duration-500 ease-in-out hover:border-foreground/20 hover:shadow-sm"
            >
              <div className="flex size-11 items-center justify-center rounded-xl bg-accent-primary/10 text-accent-primary transition-colors duration-500 ease-in-out group-hover:bg-accent-primary group-hover:text-white">
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

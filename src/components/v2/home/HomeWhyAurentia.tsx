// src/components/v2/home/HomeWhyAurentia.tsx
import Image from "next/image";
import { homeData } from "@/data/v2/home";
import { SectionContainer } from "@/components/v2/shared/SectionContainer";
import { Card } from "@/components/v2/shared/Card";

export function HomeWhyAurentia() {
  const { whyAurentia } = homeData;
  return (
    <SectionContainer
      id="why"
      title={whyAurentia.title}
      subtitle="Ce qui nous différencie des autres agences. Pas des promesses — des engagements concrets."
      className="py-32 md:py-40"
    >
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {whyAurentia.items.map((item) => {
          const Icon = item.icon;
          return (
            <Card
              key={item.title}
              className="group flex flex-col gap-4 rounded-2xl p-7 transition-all duration-500 ease-in-out dark:hover:border-foreground/20 hover:shadow-sm"
            >
              {item.image ? (
                <Image
                  src={item.image}
                  alt={item.title}
                  width={48}
                  height={48}
                  className="size-12 object-contain"
                  style={{ filter: "drop-shadow(0 4px 8px #25D36640)" }}
                />
              ) : Icon ? (
                <div className="flex size-11 items-center justify-center rounded-xl bg-accent-primary/10 text-accent-primary transition-colors duration-500 ease-in-out group-hover:bg-accent-primary group-hover:text-white">
                  <Icon className="size-5" />
                </div>
              ) : null}
              <h3 className="font-heading text-lg font-bold text-foreground">{item.title}</h3>
              <p className="text-base text-foreground/65">{item.description}</p>
            </Card>
          );
        })}
      </div>
    </SectionContainer>
  );
}

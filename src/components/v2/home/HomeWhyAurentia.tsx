// src/components/v2/home/HomeWhyAurentia.tsx
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { homeData } from "@/data/v2/home";
import { SectionContainer } from "@/components/v2/shared/SectionContainer";
import { Card } from "@/components/v2/shared/Card";
import { LowPolyCoralBg } from "@/components/v2/shared/LowPolyCoralBg";

const ACCENT_CLASSES: Record<"orange" | "green", string> = {
  orange:
    "bg-accent-primary/10 text-accent-primary group-hover:bg-accent-primary group-hover:text-white",
  green:
    "bg-[#25D366]/10 text-[#25D366] group-hover:bg-[#25D366] group-hover:text-white",
};

export function HomeWhyAurentia() {
  const { whyAurentia } = homeData;
  return (
    <SectionContainer
      id="why"
      title={whyAurentia.title}
      subtitle="Ce qui nous différencie des autres agences. Pas des promesses, des engagements concrets."
      className="py-32 md:py-40"
    >
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {whyAurentia.items.map((item) => {
          const Icon = item.icon;
          const accent = item.accent ?? "orange";
          return (
            <Card
              key={item.title}
              className="group flex flex-col gap-4 rounded-2xl p-7 transition-all duration-500 ease-in-out dark:hover:border-foreground/20 hover:shadow-sm"
            >
              {Icon ? (
                <div
                  className={`flex size-11 items-center justify-center rounded-xl transition-colors duration-500 ease-in-out ${ACCENT_CLASSES[accent]}`}
                >
                  <Icon className="size-5" />
                </div>
              ) : null}
              <h3 className="font-heading text-lg font-bold text-foreground">{item.title}</h3>
              <p className="text-base text-foreground/65">{item.description}</p>
            </Card>
          );
        })}
      </div>
      <div className="mt-12 flex justify-center">
        <Link
          href="#rdv-embed"
          className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full px-7 py-3.5 text-base font-semibold text-white shadow-sm transition-all duration-500 ease-in-out hover:gap-3 hover:opacity-90"
        >
          <LowPolyCoralBg />
          <span className="relative">Réserver un appel</span>
          <ArrowRight className="relative h-4 w-4 transition-transform duration-500 ease-in-out" />
        </Link>
      </div>
    </SectionContainer>
  );
}

// src/components/v2/home/HomeHeroV2.tsx
import { homeData } from "@/data/v2/home";
import { ServiceBadge } from "@/components/v2/shared/ServiceBadge";
import { DualCTA } from "@/components/v2/shared/DualCTA";

export function HomeHeroV2() {
  const { hero } = homeData;
  return (
    <section className="border-b border-foreground/10">
      <div className="mx-auto grid w-full max-w-7xl gap-12 px-6 py-24 md:grid-cols-[1.05fr_1fr] md:gap-16 md:px-12 md:py-32">
        <div className="flex flex-col justify-center gap-7">
          {hero.badges.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {hero.badges.map((b) => (
                <ServiceBadge key={b.label} badge={b} />
              ))}
            </div>
          )}
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-accent-primary">
            {hero.eyebrow}
          </p>
          <h1 className="font-heading text-5xl font-bold leading-[1.02] tracking-tight text-foreground md:text-6xl lg:text-7xl">
            {hero.headline}
            {hero.headlineAccent && (
              <>
                <br />
                <span className="italic text-accent-primary">{hero.headlineAccent}</span>
              </>
            )}
          </h1>
          <p className="max-w-xl text-base text-foreground/70 md:text-lg">{hero.subHeadline}</p>
          <DualCTA primary={hero.cta.primary} secondary={hero.cta.secondary} size="lg" />
        </div>
        <div className="relative aspect-[4/3.6] overflow-hidden rounded-3xl bg-foreground/5">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={hero.visual.src} alt={hero.visual.alt} className="h-full w-full object-cover" />
        </div>
      </div>
    </section>
  );
}

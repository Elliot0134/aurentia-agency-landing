"use client";

import { Section } from "@/components/ui/Section";

const CARDS = [
  {
    emoji: "🎯",
    title: "Chaque pixel a une raison d'être",
    description:
      "Design intentionnel, jamais décoratif. Chaque élément sert votre marque, votre conversion, votre expérience utilisateur.",
    accent: "rgba(255,255,255,0.15)",
  },
  {
    emoji: "⚡",
    title: "La performance comme standard",
    description:
      "Temps de chargement, SEO technique, responsive natif — on ne livre rien en dessous de nos critères d'exigence.",
    accent: "rgba(176,87,48,0.25)",
  },
  {
    emoji: "🤝",
    title: "Un interlocuteur, du brief au lancement",
    description:
      "Pas de ping-pong entre commerciaux et exécutants. Celui qui vous parle est celui qui conçoit et développe votre projet.",
    accent: "rgba(201,100,66,0.3)",
  },
];

export function HomeInnovation() {
  return (
    <Section theme="dark-alt" className="py-24 md:py-32">
      {/* Header */}
      <div className="mb-16 max-w-4xl">
        <h2 className="text-3xl sm:text-4xl lg:text-6xl xl:text-7xl font-black tracking-tighter leading-[1.05] text-foreground mb-5">
          Ce qui nous{" "}
          <span className="text-accent-primary">différencie.</span>
        </h2>
        <p className="text-xl lg:text-2xl text-foreground-muted font-medium max-w-2xl">
          L&apos;IA comme instrument de précision. 20 ans d&apos;expertise comme garantie.
        </p>
      </div>

      {/* Cards grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {CARDS.map((card) => (
          <article
            key={card.title}
            className="rounded-3xl p-8 lg:p-10 glass flex flex-col gap-6 relative overflow-hidden group hover:-translate-y-2 transition-transform duration-500"
          >
            <div
              className="absolute top-0 left-8 right-8 h-px"
              style={{
                background: `linear-gradient(90deg, transparent, ${card.accent}, transparent)`,
              }}
            />
            <span className="text-5xl" aria-hidden="true">
              {card.emoji}
            </span>
            <div>
              <h3 className="text-2xl lg:text-3xl font-bold mb-3 text-foreground">
                {card.title}
              </h3>
              <p className="text-foreground-muted text-base lg:text-lg leading-relaxed">
                {card.description}
              </p>
            </div>
          </article>
        ))}
      </div>

      {/* Closing text */}
      <div className="mt-16 max-w-3xl">
        <p className="text-xl md:text-2xl lg:text-3xl font-medium text-foreground-dim leading-relaxed">
          Premium dans l&apos;exécution.
          <br />
          <span className="text-foreground mt-3 block font-semibold">
            Accessible à tous.
          </span>
        </p>
      </div>
    </Section>
  );
}

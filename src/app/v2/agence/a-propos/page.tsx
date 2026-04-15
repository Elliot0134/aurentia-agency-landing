// src/app/v2/agence/a-propos/page.tsx
import type { Metadata } from "next";
import { aProposData } from "@/data/v2/agence-a-propos";
import { SectionContainer } from "@/components/v2/shared/SectionContainer";
import { DualCTA } from "@/components/v2/shared/DualCTA";

export const metadata: Metadata = {
  title: "À propos d'Aurentia",
  description: "Notre équipe, notre méthode, notre manifeste.",
};

export default function AProposPage() {
  return (
    <>
      <section className="border-b border-foreground/10">
        <div className="mx-auto flex w-full max-w-4xl flex-col items-center gap-6 px-6 py-24 text-center md:px-12 md:py-32">
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-accent-primary">
            {aProposData.hero.eyebrow}
          </p>
          <h1 className="font-heading text-4xl font-bold leading-[1.05] tracking-tight text-foreground md:text-5xl lg:text-6xl">
            {aProposData.hero.headline}
          </h1>
          <p className="max-w-2xl text-base text-foreground/70 md:text-lg">
            {aProposData.hero.subHeadline}
          </p>
        </div>
      </section>

      <SectionContainer
        eyebrow="Manifeste"
        title={aProposData.manifesto.title}
        innerClassName="max-w-3xl"
      >
        <div className="flex flex-col gap-5 text-base leading-relaxed text-foreground/75 md:text-lg">
          {aProposData.manifesto.paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </SectionContainer>

      <SectionContainer
        eyebrow="L'équipe"
        title={aProposData.team.title}
        className="bg-background-surface"
      >
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {aProposData.team.members.map((m) => (
            <div key={m.name} className="flex flex-col gap-4 rounded-2xl bg-background p-7">
              <div className="flex items-center gap-4">
                {m.avatarUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={m.avatarUrl} alt={m.name} className="size-16 rounded-full object-cover" />
                ) : (
                  <div className="size-16 rounded-full bg-foreground/10" aria-hidden />
                )}
                <div>
                  <h3 className="font-heading text-lg font-bold text-foreground">{m.name}</h3>
                  <p className="text-sm text-foreground/55">{m.role}</p>
                </div>
              </div>
              <p className="text-base text-foreground/70">{m.bio}</p>
            </div>
          ))}
        </div>
      </SectionContainer>

      <SectionContainer eyebrow="Nos valeurs" title={aProposData.values.title}>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {aProposData.values.items.map((v) => {
            const Icon = v.icon;
            return (
              <div
                key={v.title}
                className="flex flex-col gap-4 rounded-2xl border border-foreground/10 bg-background-surface p-7"
              >
                <div className="flex size-11 items-center justify-center rounded-xl bg-accent-primary/10 text-accent-primary">
                  <Icon className="size-5" />
                </div>
                <h3 className="font-heading text-lg font-bold text-foreground">{v.title}</h3>
                <p className="text-base text-foreground/65">{v.description}</p>
              </div>
            );
          })}
        </div>
      </SectionContainer>

      <SectionContainer alignHeader="center">
        <div className="mx-auto flex max-w-2xl flex-col items-center gap-6 text-center">
          <h2 className="font-heading text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            {aProposData.finalCta.title}
          </h2>
          <p className="text-base text-foreground/70 md:text-lg">{aProposData.finalCta.subtitle}</p>
          <DualCTA primary={aProposData.finalCta.cta} size="lg" />
        </div>
      </SectionContainer>
    </>
  );
}

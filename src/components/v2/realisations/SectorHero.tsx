import type { SecteurMeta } from "@/data/realisations/secteurs";

type Props = {
  secteur: SecteurMeta;
  projectCount: number;
};

export function SectorHero({ secteur, projectCount }: Props) {
  const plural = projectCount > 1;
  return (
    <section className="w-full px-6 pt-32 pb-16 md:px-12">
      <div className="mx-auto w-full max-w-[1400px]">
        <div className="mx-auto flex max-w-4xl flex-col gap-6">
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-accent-primary">
            Secteur · {secteur.label}
          </p>
          <h1 className="font-heading text-5xl leading-[1.05] tracking-tight text-foreground md:text-6xl lg:text-7xl">
            {secteur.heroTitle}
          </h1>
          <p className="max-w-2xl text-base text-foreground/70 md:text-lg">
            {secteur.heroSubtitle}
          </p>
          <p className="text-sm text-foreground/55">
            {projectCount} projet{plural ? "s" : ""} livré{plural ? "s" : ""}
          </p>
        </div>
      </div>
    </section>
  );
}

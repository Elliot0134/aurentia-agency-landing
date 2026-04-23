export function ReaHero({ count }: { count: number }) {
  return (
    <section className="w-full px-6 pt-16 pb-20 md:px-12 md:pt-20 md:pb-24">
      <div className="mx-auto w-full max-w-[1400px]">
        <div className="mx-auto flex max-w-4xl flex-col gap-6">
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-accent-primary">
            Réalisations
          </p>
          <h1 className="font-heading text-5xl leading-[1.05] tracking-tight text-foreground md:text-6xl lg:text-7xl">
            Des projets qu&apos;on peut défendre, ligne par ligne.
          </h1>
          <p className="max-w-2xl text-base text-foreground/70 md:text-lg">
            {count} projet{count > 1 ? "s" : ""} livré{count > 1 ? "s" : ""},
            chaque ligne de code écrite par nous. Pas de sous-traitance, pas de
            template déguisé — juste du craft, à Avignon.
          </p>
        </div>
      </div>
    </section>
  );
}

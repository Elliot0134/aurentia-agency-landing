import type { SecteurMeta } from "@/data/realisations/secteurs";

type Props = {
  secteur: SecteurMeta;
  process?: { title: string; description: string }[];
};

export function SectorProcess({ secteur, process }: Props) {
  if (!process || process.length === 0) return null;

  return (
    <section className="w-full px-6 py-16 md:px-12 md:py-20">
      <div className="mx-auto w-full max-w-[1400px]">
        <h2 className="mb-10 font-heading text-3xl leading-tight tracking-tight text-foreground md:text-4xl">
          Notre process pour {secteur.label}
        </h2>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {process.map((step, i) => (
            <div
              key={i}
              className="flex flex-col gap-4 rounded-2xl bg-foreground/[0.03] p-6 transition-colors duration-700 ease-in-out hover:bg-foreground/[0.06] md:p-8"
            >
              <div className="flex size-10 items-center justify-center rounded-full bg-foreground text-background">
                <span className="text-sm font-semibold">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <h3 className="font-heading text-xl tracking-tight text-foreground md:text-2xl">
                {step.title}
              </h3>
              <p className="text-base leading-relaxed text-foreground/70">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

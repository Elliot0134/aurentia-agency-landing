import type { SecteurMeta } from "@/data/realisations/secteurs";

type Props = {
  secteur: SecteurMeta;
  editorial?: string;
};

export function SectorEditorial({ secteur, editorial }: Props) {
  if (!editorial || editorial.trim().length === 0) return null;

  const paragraphs = editorial
    .split(/\n\n+/)
    .map((p) => p.trim())
    .filter(Boolean);

  return (
    <section className="w-full px-6 py-16 md:px-12 md:py-20">
      <div className="mx-auto w-full max-w-[1400px]">
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-8 font-heading text-3xl leading-tight tracking-tight text-foreground md:text-4xl">
            L&apos;approche Aurentia pour {secteur.label}
          </h2>
          <div>
            {paragraphs.map((p, i) => (
              <p
                key={i}
                className="mb-5 text-base leading-relaxed text-foreground/80"
              >
                {p}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

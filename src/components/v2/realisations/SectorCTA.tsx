import Link from "next/link";
import type { SecteurMeta } from "@/data/realisations/secteurs";

type Props = {
  secteur: SecteurMeta;
};

export function SectorCTA({ secteur }: Props) {
  return (
    <section className="w-full px-6 py-20 md:px-12 md:py-28">
      <div className="mx-auto w-full max-w-[1400px]">
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-6 text-center">
          <h2 className="font-heading text-3xl leading-tight tracking-tight text-foreground md:text-5xl">
            Un projet dans {secteur.plural} ?
          </h2>
          <p className="max-w-2xl text-base text-foreground/70 md:text-lg">
            On échange 30 minutes, on regarde votre contexte, et on vous dit
            honnêtement ce qui fait sens pour vous.
          </p>
          <Link
            href={`/v2/contact?secteur=${secteur.slug}`}
            className="mt-2 inline-flex items-center justify-center rounded-full bg-foreground px-8 py-4 text-base font-semibold text-background transition-all duration-500 ease-in-out hover:scale-[1.02] hover:bg-foreground/90"
          >
            Parler de votre projet
          </Link>
        </div>
      </div>
    </section>
  );
}

import Link from "next/link";
import type { SecteurMeta } from "@/data/realisations/secteurs";
import type { ProjectFrontmatter } from "@/data/realisations/schemas";
import { ReaProjectCard } from "./ReaProjectCard";

type Props = {
  secteur: SecteurMeta;
  projects: ProjectFrontmatter[];
};

export function ReaSectorBlock({ secteur, projects }: Props) {
  if (projects.length === 0) return null;
  const preview = projects.slice(0, 3);

  return (
    <section className="w-full px-6 py-16 md:px-12 md:py-20">
      <div className="mx-auto w-full max-w-[1400px]">
        <header className="mb-10 flex flex-col gap-3 md:mb-12">
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-accent-primary">
            Secteur
          </p>
          <h2 className="font-heading text-3xl tracking-tight text-foreground md:text-4xl lg:text-5xl">
            {secteur.heroTitle}
          </h2>
          <p className="max-w-2xl text-base text-foreground/70 md:text-lg">
            {secteur.shortDescription}
          </p>
        </header>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {preview.map((p) => (
            <ReaProjectCard key={p.slug} project={p} />
          ))}
        </div>

        <div className="mt-10 flex justify-start md:mt-12">
          <Link
            href={`/realisations/secteur/${secteur.slug}`}
            className="inline-flex items-center gap-2 rounded-full border border-foreground/20 px-6 py-3 text-base text-foreground/80 transition-colors duration-500 ease-in-out hover:border-foreground hover:text-foreground"
          >
            Voir tous nos projets {secteur.plural}
            <svg
              className="size-4 transition-transform duration-500 ease-in-out group-hover:translate-x-0.5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden
            >
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}

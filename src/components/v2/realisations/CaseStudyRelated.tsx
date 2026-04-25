import Image from "next/image";
import Link from "next/link";
import type { ProjectFrontmatter } from "@/data/realisations/schemas";
import { secteurs } from "@/data/realisations/secteurs";

type Props = {
  projects: ProjectFrontmatter[];
};

export function CaseStudyRelated({ projects }: Props) {
  if (!projects || projects.length === 0) return null;

  return (
    <section className="flex flex-col gap-10">
      <header className="flex flex-col gap-3">
        <p className="text-sm font-semibold uppercase tracking-[0.14em] text-accent-primary">
          À découvrir aussi
        </p>
        <h2 className="font-heading text-3xl tracking-tight text-foreground md:text-4xl">
          Projets similaires
        </h2>
      </header>
      <ul className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {projects.map((p) => {
          const secteurLabel = secteurs[p.secteur]?.label ?? p.secteur;
          return (
            <li key={p.slug}>
              <Link
                href={`/realisations/${p.slug}`}
                className="group flex h-full flex-col gap-4 rounded-[1.5rem] bg-background-surface p-4 transition-all duration-700 ease-in-out hover:-translate-y-1"
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[1rem] bg-foreground/5">
                  <Image
                    src={p.coverImage}
                    alt={p.name}
                    fill
                    sizes="(min-width: 768px) 33vw, 100vw"
                    className="object-cover transition-transform duration-700 ease-in-out group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-col gap-1 px-1 pb-1">
                  <p className="text-sm uppercase tracking-wide text-foreground/50">
                    {p.type} — {secteurLabel}
                  </p>
                  <h3 className="font-heading text-xl text-foreground">
                    {p.name}
                  </h3>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

import Link from "next/link";
import type { ProjectFrontmatter } from "@/data/realisations/schemas";
import type { SecteurMeta } from "@/data/realisations/secteurs";
import { ReaProjectCard } from "./ReaProjectCard";

type Props = {
  secteur: SecteurMeta;
  projects: ProjectFrontmatter[];
};

export function SectorProjects({ secteur, projects }: Props) {
  return (
    <section className="w-full px-6 py-16 md:px-12 md:py-20">
      <div className="mx-auto w-full max-w-[1400px]">
        <h2 className="mb-10 font-heading text-3xl leading-tight tracking-tight text-foreground md:text-4xl">
          Nos réalisations dans {secteur.plural}
        </h2>

        {projects.length === 0 ? (
          <div className="rounded-2xl bg-foreground/[0.03] p-8 md:p-10">
            <p className="mb-4 text-base text-foreground/70 md:text-lg">
              Le portfolio s&apos;enrichit. En attendant, découvrez nos autres
              réalisations.
            </p>
            <Link
              href="/realisations"
              className="inline-flex items-center gap-2 text-base font-semibold text-foreground transition-colors duration-500 ease-in-out hover:text-accent-primary"
            >
              Voir toutes les réalisations →
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <ReaProjectCard key={project.slug} project={project} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

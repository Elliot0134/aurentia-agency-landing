import Image from "next/image";
import type { ProjectFrontmatter } from "@/data/realisations/schemas";
import { secteurs } from "@/data/realisations/secteurs";

type Props = {
  project: ProjectFrontmatter;
};

export function CaseStudyHero({ project }: Props) {
  const secteurLabel = secteurs[project.secteur]?.label ?? project.secteur;
  const tagline =
    project.seo?.description ??
    `${project.type} — ${secteurLabel} — ${project.year}`;

  return (
    <section
      id="hero"
      className="w-full px-6 pt-28 pb-10 md:px-12 md:pt-36 md:pb-16"
    >
      <div className="mx-auto flex w-full max-w-[1400px] flex-col gap-10">
        <div className="flex flex-col gap-5">
          <div className="flex flex-wrap items-center gap-3">
            <span className="rounded-full border border-foreground/15 bg-foreground/5 px-3 py-1 text-sm text-foreground/80">
              {project.type}
            </span>
            <span className="rounded-full border border-foreground/15 bg-foreground/5 px-3 py-1 text-sm text-foreground/80">
              {secteurLabel}
            </span>
            <span className="rounded-full border border-foreground/15 bg-foreground/5 px-3 py-1 text-sm text-foreground/80">
              {project.city}
            </span>
            <span className="rounded-full border border-foreground/15 bg-foreground/5 px-3 py-1 text-sm text-foreground/80">
              {project.year}
            </span>
          </div>
          <h1 className="font-heading text-4xl tracking-tight text-foreground md:text-5xl lg:text-6xl">
            {project.name}
          </h1>
          <p className="max-w-3xl text-base text-foreground/70 md:text-lg">
            {tagline}
          </p>
        </div>
        <div className="relative aspect-[16/10] w-full overflow-hidden rounded-[2rem] bg-background-surface">
          <Image
            src={project.coverImage}
            alt={`Visuel de couverture — ${project.name}`}
            fill
            priority
            sizes="(min-width: 1024px) 1300px, 100vw"
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}

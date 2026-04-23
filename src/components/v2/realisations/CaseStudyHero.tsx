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
    <section id="hero" className="flex flex-col gap-10 scroll-mt-28">
      <div className="flex flex-col gap-5">
        <p className="text-sm font-semibold uppercase tracking-[0.14em] text-accent-primary">
          {project.type} — {secteurLabel}
        </p>
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
          sizes="(min-width: 1024px) 1100px, 100vw"
          className="object-cover"
        />
      </div>
    </section>
  );
}

import Image from "next/image";
import Link from "next/link";
import type { ProjectFrontmatter } from "@/data/realisations/schemas";
import { secteurs } from "@/data/realisations/secteurs";
import { cn } from "@/lib/utils";

type Props = {
  project: ProjectFrontmatter;
  size?: "default" | "large";
  className?: string;
};

export function ReaProjectCard({ project, size = "default", className }: Props) {
  const secteurLabel = secteurs[project.secteur].label;
  const large = size === "large";

  return (
    <Link
      href={`/v2/realisations/${project.slug}`}
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-2xl bg-foreground/[0.03] transition-colors duration-700 ease-in-out hover:bg-foreground/[0.06]",
        className,
      )}
    >
      <div className="relative w-full overflow-hidden rounded-2xl aspect-[4/3]">
        <Image
          src={project.coverImage}
          alt={project.name}
          fill
          sizes={
            large
              ? "(max-width: 768px) 100vw, 50vw"
              : "(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          }
          className="object-cover object-top transition-transform duration-700 ease-in-out group-hover:scale-[1.02]"
        />
        <div className="pointer-events-none absolute inset-0 bg-foreground/0 transition-colors duration-700 ease-in-out group-hover:bg-foreground/5" />
      </div>

      <div className="flex flex-col gap-3 p-5 md:p-6">
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full border border-foreground/10 bg-background/60 px-3 py-1 text-sm text-foreground/70 backdrop-blur-sm">
            {project.type}
          </span>
          <span className="rounded-full border border-foreground/10 bg-background/60 px-3 py-1 text-sm text-foreground/70 backdrop-blur-sm">
            {secteurLabel}
          </span>
        </div>

        <div className="flex items-end justify-between gap-4">
          <h3
            className={cn(
              "font-heading tracking-tight text-foreground transition-colors duration-500 ease-in-out",
              large ? "text-2xl md:text-3xl" : "text-xl md:text-2xl",
            )}
          >
            {project.name}
          </h3>
          <span className="shrink-0 text-sm text-foreground/60">
            {project.year}
          </span>
        </div>
      </div>
    </Link>
  );
}

import type { ProjectFrontmatter } from "@/data/realisations/schemas";
import { ReaProjectCard } from "./ReaProjectCard";
import { ReaFilters } from "./ReaFilters";
import { cn } from "@/lib/utils";

type Props = {
  projects: ProjectFrontmatter[];
  variant: "featured" | "all";
  filterable?: boolean;
  id?: string;
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  className?: string;
};

export function ReaProjectGrid({
  projects,
  variant,
  filterable = false,
  id,
  eyebrow,
  title,
  subtitle,
  className,
}: Props) {
  if (projects.length === 0) return null;

  return (
    <section
      id={id}
      className={cn("w-full px-6 py-16 md:px-12 md:py-20", className)}
    >
      <div className="mx-auto w-full max-w-[1400px]">
        {(eyebrow || title || subtitle) && (
          <header className="mb-10 flex flex-col gap-3 md:mb-12">
            {eyebrow && (
              <p className="text-sm font-semibold uppercase tracking-[0.14em] text-accent-primary">
                {eyebrow}
              </p>
            )}
            {title && (
              <h2 className="font-heading text-3xl tracking-tight text-foreground md:text-4xl lg:text-5xl">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="max-w-2xl text-base text-foreground/70 md:text-lg">
                {subtitle}
              </p>
            )}
          </header>
        )}

        {filterable ? (
          <ReaFilters projects={projects} />
        ) : variant === "featured" ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
            {projects.map((p) => (
              <ReaProjectCard key={p.slug} project={p} size="large" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((p) => (
              <ReaProjectCard key={p.slug} project={p} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

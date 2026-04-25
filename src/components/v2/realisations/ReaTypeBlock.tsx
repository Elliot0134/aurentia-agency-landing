import Link from "next/link";
import type { TypeMeta } from "@/data/realisations/types";
import type { ProjectFrontmatter } from "@/data/realisations/schemas";
import { ReaProjectCard } from "./ReaProjectCard";

type Props = {
  type: TypeMeta;
  projects: ProjectFrontmatter[];
};

export function ReaTypeBlock({ type, projects }: Props) {
  if (projects.length === 0) return null;

  const title =
    type.plural.charAt(0).toUpperCase() + type.plural.slice(1);

  return (
    <section className="w-full px-6 py-16 md:px-12 md:py-20">
      <div className="mx-auto w-full max-w-[1400px]">
        <header className="mb-10 flex flex-col gap-3 md:mb-12">
          <h3 className="font-heading text-3xl tracking-tight text-foreground md:text-4xl">
            {title}
          </h3>
          <p className="max-w-2xl text-base text-foreground/70 md:text-lg">
            {type.shortDescription}
          </p>
        </header>

        {/* Horizontal scroll on mobile, grid on desktop */}
        <div className="hidden gap-6 md:grid md:grid-cols-2 lg:grid-cols-3">
          {projects.map((p) => (
            <ReaProjectCard key={p.slug} project={p} />
          ))}
        </div>
        <div className="-mx-6 flex gap-4 overflow-x-auto px-6 pb-4 md:hidden">
          {projects.map((p) => (
            <div key={p.slug} className="w-[80%] shrink-0">
              <ReaProjectCard project={p} />
            </div>
          ))}
        </div>

        <div className="mt-10 flex justify-start md:mt-12">
          <Link
            href={`/realisations#grid-all`}
            className="inline-flex items-center gap-2 rounded-full border border-foreground/20 px-6 py-3 text-base text-foreground/80 transition-colors duration-500 ease-in-out hover:border-foreground hover:text-foreground"
          >
            Voir tous nos {type.plural}
            <svg
              className="size-4"
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

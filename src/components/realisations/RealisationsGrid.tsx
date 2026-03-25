"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { BlurReveal } from "@/components/animations/BlurReveal";
import { SafeImage } from "@/components/ui/SafeImage";
import { projects, type Project, type ProjectType } from "@/data/projects";

// --- Filter configuration ---

const FILTER_ALL = "Tous" as const;

const FILTERS: readonly (typeof FILTER_ALL | ProjectType)[] = [
  FILTER_ALL,
  "Site vitrine",
  "SaaS",
  "Landing page",
];

// --- Sub-components ---

function FilterPill({
  label,
  count,
  isActive,
  onClick,
}: {
  label: string;
  count?: number;
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "relative flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium whitespace-nowrap",
        "transition-all duration-500 ease-in-out cursor-pointer",
        isActive
          ? "bg-foreground text-background shadow-lg shadow-foreground/10"
          : "border border-foreground/10 text-foreground/60 hover:bg-foreground/5 hover:text-foreground/80"
      )}
    >
      {label}
      {count !== undefined && (
        <span
          className={cn(
            "text-sm tabular-nums transition-colors duration-500",
            isActive ? "text-background/60" : "text-foreground/30"
          )}
        >
          {count}
        </span>
      )}
    </button>
  );
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <Link href={`/realisations/${project.slug}`} className="group block">
      <div className="h-full rounded-2xl border border-foreground/[0.06] bg-foreground/[0.02] overflow-hidden transition-all duration-700 ease-in-out hover:-translate-y-1 hover:shadow-xl hover:shadow-foreground/[0.04] hover:border-foreground/10">
        {/* Image container */}
        <div className="relative aspect-[16/10] overflow-hidden">
          <SafeImage
            src={project.coverImage}
            alt={project.name}
            fill
            className="object-cover transition-transform duration-700 ease-in-out group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />

          {/* Subtle gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent opacity-0 transition-opacity duration-700 ease-in-out group-hover:opacity-100" />

          {/* Type badge */}
          <span className="absolute top-3 left-3 rounded-full bg-background/70 px-3 py-1 text-sm font-medium text-foreground backdrop-blur-md border border-foreground/10">
            {project.type}
          </span>

          {/* Arrow on hover */}
          <div className="absolute bottom-3 right-3 w-9 h-9 rounded-full bg-foreground/80 backdrop-blur-md flex items-center justify-center opacity-0 translate-y-2 transition-all duration-500 ease-in-out group-hover:opacity-100 group-hover:translate-y-0">
            <ArrowUpRight className="h-4 w-4 text-background" />
          </div>
        </div>

        {/* Card body */}
        <div className="flex flex-col gap-3 p-5">
          {/* Name + duration */}
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-foreground">{project.name}</h3>
            <span className="text-sm text-foreground/40 font-mono">{project.duration}</span>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-foreground/[0.04] px-2.5 py-0.5 text-sm text-foreground/50"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
}

// --- Main component ---

export function RealisationsGrid() {
  const [activeFilter, setActiveFilter] = useState<
    typeof FILTER_ALL | ProjectType
  >(FILTER_ALL);

  const filteredProjects = useMemo(() => {
    if (activeFilter === FILTER_ALL) return projects;
    return projects.filter((p) => p.type === activeFilter);
  }, [activeFilter]);

  const totalCount = projects.length;

  return (
    <section className="relative w-full py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Filter bar */}
        <BlurReveal delay={0.1}>
          <div className="flex flex-wrap items-center gap-3 pb-12">
            {FILTERS.map((filter) => {
              const count =
                filter === FILTER_ALL
                  ? totalCount
                  : projects.filter((p) => p.type === filter).length;

              return (
                <FilterPill
                  key={filter}
                  label={filter}
                  count={filter === FILTER_ALL ? filteredProjects.length : undefined}
                  isActive={activeFilter === filter}
                  onClick={() => setActiveFilter(filter)}
                />
              );
            })}
          </div>
        </BlurReveal>

        {/* Project grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {filteredProjects.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { SpotlightCard } from "@/components/animations/SpotlightCard";
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
  "Identite visuelle",
];

// --- Animation variants ---

const cardEase = [0.25, 0.46, 0.45, 0.94] as const;

const cardVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: cardEase as unknown as [number, number, number, number] },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    transition: { duration: 0.5, ease: cardEase as unknown as [number, number, number, number] },
  },
};

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
        "relative flex items-center gap-1.5 rounded-full px-5 py-2.5 text-base font-medium whitespace-nowrap",
        "transition-all duration-500 ease-in-out",
        isActive
          ? "bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-lg shadow-orange-500/20"
          : "border border-foreground/10 text-foreground/70 hover:bg-foreground/5"
      )}
    >
      {label}
      {count !== undefined && (
        <span
          className={cn(
            "text-sm tabular-nums transition-colors duration-500",
            isActive ? "text-white/80" : "text-foreground/40"
          )}
        >
          ({count})
        </span>
      )}
    </button>
  );
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <Link href={`/realisations/${project.slug}`} className="group block">
      <SpotlightCard className="h-full transition-transform duration-700 ease-in-out hover:-translate-y-2">
        {/* Image container */}
        <div className="relative aspect-[16/9] overflow-hidden rounded-t-3xl">
          <SafeImage
              src={project.coverImage}
              alt={project.name}
              fill
              className="object-cover transition-transform duration-700 ease-in-out group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />

          {/* Gradient overlay for badge readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-foreground/30 via-transparent to-transparent" />

          {/* Gradient overlay at bottom on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/40 via-transparent to-transparent opacity-0 transition-opacity duration-700 ease-in-out group-hover:opacity-100" />

          {/* Type badge — glassmorphism */}
          <span className="absolute top-4 left-4 rounded-full bg-background/20 px-3 py-1.5 text-sm font-medium text-foreground backdrop-blur-md border border-foreground/15">
            {project.type}
          </span>

          {/* Status badge — optional */}
          {project.status === "En cours" && (
            <span className="absolute top-4 right-4 rounded-full bg-orange-500/90 px-3 py-1.5 text-sm font-medium text-foreground backdrop-blur-md">
              En cours
            </span>
          )}
        </div>

        {/* Card body */}
        <div className="relative z-10 flex flex-col gap-3 p-5">
          {/* Name + discover link */}
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-foreground">{project.name}</h3>
            <span className="flex items-center gap-1 text-sm font-medium text-orange-500 opacity-0 transition-opacity duration-500 ease-in-out group-hover:opacity-100">
              Decouvrir
              <ArrowRight className="h-4 w-4 transition-transform duration-500 ease-in-out group-hover:translate-x-1" />
            </span>
          </div>

          {/* City */}
          <p className="text-sm font-mono text-foreground/50">{project.city}</p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-foreground/10 px-3 py-1 text-sm text-foreground/60"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </SpotlightCard>
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
        <motion.div
          layout
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                key={project.slug}
                layout
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}

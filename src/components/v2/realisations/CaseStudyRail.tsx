"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { ProjectFrontmatter } from "@/data/realisations/schemas";
import { secteurs } from "@/data/realisations/secteurs";
import { cn } from "@/lib/utils";

export type CaseStudyRailSection = {
  id: string;
  label: string;
};

export const CASE_STUDY_SECTIONS: CaseStudyRailSection[] = [
  { id: "hero", label: "Introduction" },
  { id: "contexte", label: "Contexte" },
  { id: "defi", label: "Défi" },
  { id: "solution", label: "Solution" },
  { id: "features", label: "Features" },
  { id: "galerie", label: "Galerie" },
  { id: "stack", label: "Stack" },
  { id: "resultats", label: "Résultats" },
  { id: "temoignage", label: "Témoignage" },
];

type Props = {
  project: ProjectFrontmatter;
  className?: string;
  onNavigate?: () => void;
};

export function CaseStudyRail({ project, className, onNavigate }: Props) {
  const [active, setActive] = useState<string>("hero");

  useEffect(() => {
    const ids = CASE_STUDY_SECTIONS.map((s) => s.id);
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => !!el);

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActive(visible[0].target.id);
      },
      {
        rootMargin: "-20% 0px -60% 0px",
        threshold: [0, 0.25, 0.5, 0.75, 1],
      },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const secteurLabel = secteurs[project.secteur]?.label ?? project.secteur;

  const handleAnchorClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    id: string,
  ) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      setActive(id);
    }
    onNavigate?.();
  };

  return (
    <aside className={cn("flex flex-col gap-8 text-sm", className)}>
      <div className="flex flex-col gap-3">
        <p className="text-sm font-semibold uppercase tracking-[0.14em] text-accent-primary">
          Étude de cas
        </p>
        <h2 className="font-heading text-2xl leading-tight text-foreground">
          {project.name}
        </h2>
      </div>

      <dl className="grid grid-cols-1 gap-4 text-sm">
        <div className="flex flex-col gap-1">
          <dt className="text-sm uppercase tracking-wide text-foreground/50">
            Type
          </dt>
          <dd className="text-sm text-foreground">{project.type}</dd>
        </div>
        <div className="flex flex-col gap-1">
          <dt className="text-sm uppercase tracking-wide text-foreground/50">
            Secteur
          </dt>
          <dd className="text-sm text-foreground">{secteurLabel}</dd>
        </div>
        <div className="flex flex-col gap-1">
          <dt className="text-sm uppercase tracking-wide text-foreground/50">
            Année
          </dt>
          <dd className="text-sm text-foreground">{project.year}</dd>
        </div>
        <div className="flex flex-col gap-1">
          <dt className="text-sm uppercase tracking-wide text-foreground/50">
            Durée
          </dt>
          <dd className="text-sm text-foreground">{project.duration}</dd>
        </div>
        {project.liveUrl && (
          <div className="flex flex-col gap-1">
            <dt className="text-sm uppercase tracking-wide text-foreground/50">
              Live
            </dt>
            <dd className="text-sm">
              <Link
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground underline underline-offset-4 transition-colors duration-500 ease-in-out hover:text-accent-primary"
              >
                Voir le site
              </Link>
            </dd>
          </div>
        )}
      </dl>

      <nav className="flex flex-col gap-1 border-l border-foreground/10 pl-4">
        <p className="mb-2 text-sm uppercase tracking-wide text-foreground/50">
          Sommaire
        </p>
        {CASE_STUDY_SECTIONS.map((section) => {
          const isActive = active === section.id;
          return (
            <a
              key={section.id}
              href={`#${section.id}`}
              onClick={(e) => handleAnchorClick(e, section.id)}
              className={cn(
                "relative -ml-4 border-l-2 pl-4 py-1.5 text-sm transition-all duration-500 ease-in-out",
                isActive
                  ? "border-foreground text-foreground"
                  : "border-transparent text-foreground/60 hover:text-foreground hover:border-foreground/30",
              )}
            >
              {section.label}
            </a>
          );
        })}
      </nav>
    </aside>
  );
}

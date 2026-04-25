"use client";

import { useMemo, useState } from "react";
import type { ProjectFrontmatter } from "@/data/realisations/schemas";
import { secteurs } from "@/data/realisations/secteurs";
import { projectTypes } from "@/data/realisations/types";
import { ReaProjectCard } from "./ReaProjectCard";
import { cn } from "@/lib/utils";

type Props = { projects: ProjectFrontmatter[] };

type TypeFilter = (typeof projectTypes)[number]["label"] | "all";
type SecteurFilter = ProjectFrontmatter["secteur"] | "all";
type YearFilter = number | "all";

function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "rounded-full border px-4 py-2 text-sm transition-colors duration-500 ease-in-out",
        active
          ? "border-foreground bg-foreground text-background"
          : "border-foreground/20 bg-transparent text-foreground/70 hover:border-foreground/40 hover:text-foreground",
      )}
    >
      {children}
    </button>
  );
}

export function ReaFilters({ projects }: Props) {
  const [typeF, setTypeF] = useState<TypeFilter>("all");
  const [secteurF, setSecteurF] = useState<SecteurFilter>("all");
  const [yearF, setYearF] = useState<YearFilter>("all");

  const availableSecteurs = useMemo(() => {
    const set = new Set(projects.map((p) => p.secteur));
    return Array.from(set);
  }, [projects]);

  const availableYears = useMemo(() => {
    const set = new Set(projects.map((p) => p.year));
    return Array.from(set).sort((a, b) => b - a);
  }, [projects]);

  const filtered = useMemo(() => {
    return projects.filter((p) => {
      if (typeF !== "all" && p.type !== typeF) return false;
      if (secteurF !== "all" && p.secteur !== secteurF) return false;
      if (yearF !== "all" && p.year !== yearF) return false;
      return true;
    });
  }, [projects, typeF, secteurF, yearF]);

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-4">
        <div className="flex flex-wrap items-center gap-2">
          <span className="mr-2 text-sm uppercase tracking-wider text-foreground/50">
            Type
          </span>
          <Chip active={typeF === "all"} onClick={() => setTypeF("all")}>
            Tous
          </Chip>
          {projectTypes.map((t) => (
            <Chip
              key={t.slug}
              active={typeF === t.label}
              onClick={() => setTypeF(t.label)}
            >
              {t.label}
            </Chip>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <span className="mr-2 text-sm uppercase tracking-wider text-foreground/50">
            Secteur
          </span>
          <Chip active={secteurF === "all"} onClick={() => setSecteurF("all")}>
            Tous
          </Chip>
          {availableSecteurs.map((slug) => (
            <Chip
              key={slug}
              active={secteurF === slug}
              onClick={() => setSecteurF(slug)}
            >
              {secteurs[slug].label}
            </Chip>
          ))}
        </div>

        {availableYears.length > 1 && (
          <div className="flex flex-wrap items-center gap-2">
            <span className="mr-2 text-sm uppercase tracking-wider text-foreground/50">
              Année
            </span>
            <Chip active={yearF === "all"} onClick={() => setYearF("all")}>
              Toutes
            </Chip>
            {availableYears.map((y) => (
              <Chip
                key={y}
                active={yearF === y}
                onClick={() => setYearF(y)}
              >
                {y}
              </Chip>
            ))}
          </div>
        )}
      </div>

      {filtered.length === 0 ? (
        <p className="py-12 text-center text-base text-foreground/60">
          Aucun projet ne correspond à ces filtres.
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p) => (
            <ReaProjectCard key={p.slug} project={p} />
          ))}
        </div>
      )}
    </div>
  );
}

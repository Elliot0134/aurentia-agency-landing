import type { ReactNode } from "react";
import type { ProjectFrontmatter } from "@/data/realisations/schemas";
import { CaseStudyFixedRail } from "./CaseStudyFixedRail";
import { CaseStudyRailMobile } from "./CaseStudyRailMobile";
import { cn } from "@/lib/utils";

type Props = {
  project: ProjectFrontmatter;
  children: ReactNode;
  className?: string;
};

const SENTINEL_ID = "case-study-detail-start";

export function CaseStudyLayout({ project, children, className }: Props) {
  return (
    <div className={cn("w-full px-6 py-12 md:px-12 md:py-16", className)}>
      <div id={SENTINEL_ID} aria-hidden className="h-px w-full" />
      <div className="mx-auto w-full max-w-[1400px]">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[280px_1fr] lg:gap-16">
          <aside aria-hidden className="hidden lg:block" />
          <div className="flex min-w-0 flex-1 flex-col gap-16 md:gap-24">
            {children}
          </div>
        </div>
      </div>
      <CaseStudyFixedRail project={project} sentinelId={SENTINEL_ID} />
      <CaseStudyRailMobile project={project} />
    </div>
  );
}

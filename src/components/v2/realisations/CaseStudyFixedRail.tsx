"use client";

import { useEffect, useRef, useState } from "react";
import type { ProjectFrontmatter } from "@/data/realisations/schemas";
import { CaseStudyRail } from "./CaseStudyRail";
import { cn } from "@/lib/utils";

type Props = {
  project: ProjectFrontmatter;
  sentinelId: string;
};

export function CaseStudyFixedRail({ project, sentinelId }: Props) {
  const [visible, setVisible] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sentinel = document.getElementById(sentinelId);
    if (!sentinel) return;

    const update = () => {
      const rect = sentinel.getBoundingClientRect();
      setVisible(rect.top <= 112);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [sentinelId]);

  return (
    <div
      ref={wrapperRef}
      aria-hidden={!visible}
      className={cn(
        "pointer-events-none fixed top-28 z-30 hidden w-[280px] transition-opacity duration-500 ease-in-out lg:block",
        visible ? "opacity-100" : "opacity-0",
      )}
      style={{
        left: "max(1.5rem, calc((100vw - 1400px) / 2 + 3rem))",
      }}
    >
      <div
        className={cn(
          "max-h-[calc(100vh-9rem)] overflow-y-auto pr-2",
          visible && "pointer-events-auto",
        )}
      >
        <CaseStudyRail project={project} />
      </div>
    </div>
  );
}

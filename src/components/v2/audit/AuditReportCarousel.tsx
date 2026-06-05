"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

type AuditReportCarouselProps = {
  pagesPath: string;
  pagesCount: number;
  fileMeta: string;
};

/** Zero-padded page filename: page-01.png … page-21.png */
function pageSrc(path: string, n: number) {
  return `${path}/page-${String(n).padStart(2, "0")}.png`;
}

export function AuditReportCarousel({ pagesPath, pagesCount, fileMeta }: AuditReportCarouselProps) {
  const [index, setIndex] = useState(0);

  const go = useCallback(
    (dir: 1 | -1) => {
      setIndex((i) => (i + dir + pagesCount) % pagesCount);
    },
    [pagesCount],
  );

  // Keyboard navigation
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "ArrowLeft") go(-1);
      if (e.key === "ArrowRight") go(1);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go]);

  return (
    <div className="mx-auto w-full max-w-sm">
      <div className="group relative">
        {/* Page frame */}
        <div className="relative aspect-[993/1404] overflow-hidden rounded-2xl border border-foreground/10 bg-background shadow-[0_24px_60px_-24px_rgba(0,0,0,0.35)]">
          {Array.from({ length: pagesCount }, (_, i) => (
            <Image
              key={i}
              src={pageSrc(pagesPath, i + 1)}
              alt={`Rapport d'audit Aurentia — page ${i + 1}`}
              fill
              sizes="(max-width: 768px) 90vw, 384px"
              priority={i === 0}
              loading={i === 0 ? undefined : "lazy"}
              className={cn(
                "object-contain transition-opacity duration-500 ease-in-out",
                i === index ? "opacity-100" : "opacity-0",
              )}
              aria-hidden={i !== index}
            />
          ))}
        </div>

        {/* Arrows */}
        <button
          type="button"
          onClick={() => go(-1)}
          aria-label="Page précédente"
          className="absolute left-2 top-1/2 flex size-10 -translate-y-1/2 items-center justify-center rounded-full border border-foreground/10 bg-background/90 text-foreground shadow-lg backdrop-blur transition-colors duration-500 ease-in-out hover:bg-background hover:text-accent-primary md:-left-5"
        >
          <ChevronLeft className="size-5" />
        </button>
        <button
          type="button"
          onClick={() => go(1)}
          aria-label="Page suivante"
          className="absolute right-2 top-1/2 flex size-10 -translate-y-1/2 items-center justify-center rounded-full border border-foreground/10 bg-background/90 text-foreground shadow-lg backdrop-blur transition-colors duration-500 ease-in-out hover:bg-background hover:text-accent-primary md:-right-5"
        >
          <ChevronRight className="size-5" />
        </button>
      </div>

      {/* Counter + meta */}
      <div className="mt-5 flex items-center justify-center gap-3 text-sm text-foreground/55">
        <span className="font-medium text-foreground tabular-nums">
          {index + 1} / {pagesCount}
        </span>
        <span aria-hidden>·</span>
        <span>{fileMeta}</span>
      </div>

      {/* Progress dots (compact) */}
      <div className="mt-3 flex flex-wrap items-center justify-center gap-1.5">
        {Array.from({ length: pagesCount }, (_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setIndex(i)}
            aria-label={`Aller à la page ${i + 1}`}
            aria-current={i === index}
            className={cn(
              "h-1.5 rounded-full transition-all duration-500 ease-in-out",
              i === index ? "w-5 bg-accent-primary" : "w-1.5 bg-foreground/20 hover:bg-foreground/40",
            )}
          />
        ))}
      </div>
    </div>
  );
}

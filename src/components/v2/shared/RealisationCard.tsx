// src/components/v2/shared/RealisationCard.tsx
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Realisation } from "@/data/v2/types";
import { cardClasses, cardInteractiveClasses } from "@/components/v2/shared/Card";
import { cn } from "@/lib/utils";

type RealisationCardProps = {
  realisation: Realisation;
  className?: string;
};

export function RealisationCard({ realisation, className }: RealisationCardProps) {
  return (
    <Link
      href={realisation.href}
      className={cn(
        cardClasses,
        cardInteractiveClasses,
        "group flex h-full flex-col overflow-hidden",
        className
      )}
    >
      <div className="aspect-[16/10] overflow-hidden bg-foreground/5">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={realisation.imageUrl}
          alt={realisation.title}
          className="h-full w-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-[1.03]"
        />
      </div>
      <div className="flex flex-1 flex-col gap-3 p-6">
        <span className="text-sm font-semibold uppercase tracking-[0.1em] text-accent-primary">
          {realisation.client}
        </span>
        <h3 className="font-heading text-xl font-bold text-foreground">{realisation.title}</h3>
        <p className="text-base font-medium text-foreground/65">{realisation.resultKpi}</p>
        <span className="mt-auto inline-flex items-center gap-1.5 text-sm font-semibold text-foreground transition-transform duration-500 ease-in-out group-hover:translate-x-1">
          Voir le projet
          <ArrowUpRight className="size-4 transition-transform duration-500 ease-in-out group-hover:-translate-y-0.5" />
        </span>
      </div>
    </Link>
  );
}

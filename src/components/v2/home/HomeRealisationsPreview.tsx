// src/components/v2/home/HomeRealisationsPreview.tsx
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { homeData } from "@/data/v2/home";
import { SectionContainer } from "@/components/v2/shared/SectionContainer";
import { RealisationCard } from "@/components/v2/shared/RealisationCard";

export function HomeRealisationsPreview() {
  const items = homeData.realisationsPreview;
  return (
    <SectionContainer eyebrow="Réalisations" title="Quelques projets récents">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {items.map((r) => (
          <RealisationCard key={r.slug} realisation={r} />
        ))}
      </div>
      <div className="mt-12 flex justify-center">
        <Link
          href="/v2/agence"
          className="inline-flex items-center gap-2 rounded-full border border-foreground/20 px-6 py-3 text-base font-semibold text-foreground transition-all duration-500 ease-in-out hover:border-foreground/40"
        >
          Voir toutes nos réalisations
          <ArrowRight className="size-4" />
        </Link>
      </div>
    </SectionContainer>
  );
}

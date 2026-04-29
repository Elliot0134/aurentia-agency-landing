"use client";

import { InfiniteMarquee } from "@/components/animations/InfiniteMarquee";

export function HomeMarquee() {
  const buzzwords = [
    "Sur-mesure",
    "Propulsé par l'IA",
    "Perfection",
    "Zéro template",
    "Artisanat digital",
    "Design unique"
  ];

  return (
    <div className="py-4 bg-transparent overflow-hidden flex items-center w-full section-divider-orange">
      <InfiniteMarquee 
        items={buzzwords} 
        className="text-xl md:text-2xl font-bold font-sans tracking-widest text-foreground/60 uppercase" 
      />
    </div>
  );
}

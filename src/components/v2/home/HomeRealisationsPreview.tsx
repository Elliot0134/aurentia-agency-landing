"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { SectionContainer } from "@/components/v2/shared/SectionContainer";
import { BlurReveal } from "@/components/animations/BlurReveal";
import { WipAwareLink } from "@/components/shared/WipModal";

export type ItemTag = "SaaS" | "Site Vitrine" | "E-commerce" | "Landing Page";

type Item = {
  title: string;
  subtitle: string;
  tag: ItemTag;
  imageUrl: string;
  href: string;
};

const ITEMS: Item[] = [
  {
    title: "Comparateur IA Facile",
    subtitle: "Trouver l'outil IA parfait",
    tag: "SaaS",
    imageUrl: "/images/portfolio/comparateur-ia-facile.png",
    href: "/realisations/comparateur-ia-facile",
  },
  {
    title: "Aurentia",
    subtitle: "Création d'entreprise IA",
    tag: "SaaS",
    imageUrl: "/images/portfolio/aurentia-saas.png",
    href: "/realisations",
  },
  {
    title: "HighLove",
    subtitle: "Marque expérientielle",
    tag: "Site Vitrine",
    imageUrl: "/images/portfolio/highlove.png",
    href: "/realisations",
  },
  {
    title: "Aurentia for Entrepreneurs",
    subtitle: "Espace client",
    tag: "SaaS",
    imageUrl: "/images/portfolio/aurentia-for-entrepreneurs.png",
    href: "/realisations",
  },
  {
    title: "Maison Enileh",
    subtitle: "Site vitrine premium",
    tag: "Site Vitrine",
    imageUrl: "/images/portfolio/maison-enileh.png",
    href: "/realisations/maison-enileh",
  },
  {
    title: "Savistas",
    subtitle: "Plateforme de gestion",
    tag: "SaaS",
    imageUrl: "/images/portfolio/savistas.png",
    href: "/realisations/savistas",
  },
  {
    title: "Friend'iz",
    subtitle: "Boutique en ligne",
    tag: "E-commerce",
    imageUrl: "/images/portfolio/friendiz.png",
    href: "/realisations/friendiz",
  },
  {
    title: "Allo Restau — SaaS",
    subtitle: "Agent vocal IA",
    tag: "SaaS",
    imageUrl: "/images/portfolio/allorestau-saas.png",
    href: "/realisations/allo-restau",
  },
  {
    title: "Allo Restau — Site",
    subtitle: "Landing pizzéria",
    tag: "Landing Page",
    imageUrl: "/images/portfolio/allo-restau-site.png",
    href: "/realisations/allo-restau",
  },
  {
    title: "Golf Mentor — SaaS",
    subtitle: "Coaching golf assisté par IA",
    tag: "SaaS",
    imageUrl: "/images/portfolio/golf-mentor-saas.png",
    href: "/realisations/golf-mentor",
  },
  {
    title: "Golf Mentor — Landing",
    subtitle: "Page de conversion premium",
    tag: "Landing Page",
    imageUrl: "/images/portfolio/golf-mentor-landing.png",
    href: "/realisations/golf-mentor",
  },
  {
    title: "Mon Service Courtier",
    subtitle: "Plateforme courtage",
    tag: "SaaS",
    imageUrl: "/images/portfolio/monservicecourtier.png",
    href: "/realisations",
  },
];

function Slide({ item }: { item: Item }) {
  return (
    <WipAwareLink href={item.href} className="group block w-full" data-no-scale>
      <div className="mb-4 flex justify-center">
        <span className="inline-flex items-center rounded-full border border-foreground/15 bg-foreground/[0.04] px-3 py-1 font-mono text-sm uppercase tracking-widest text-foreground/70">
          {item.tag}
        </span>
      </div>
      <div className="relative aspect-[16/10] w-full overflow-hidden">
        <Image
          src={item.imageUrl}
          alt={item.title}
          fill
          className="object-contain transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform group-hover:scale-[1.10] group-hover:-translate-y-1"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </div>
      <div className="mt-4 flex flex-col items-center text-center">
        <p className="text-base font-medium text-foreground">{item.title}</p>
        <p className="mt-1 text-sm text-foreground/55">{item.subtitle}</p>
      </div>
    </WipAwareLink>
  );
}

function useVisibleCount() {
  const [count, setCount] = useState(4);
  useEffect(() => {
    const compute = () => {
      const w = window.innerWidth;
      if (w >= 1024) setCount(3);
      else if (w >= 640) setCount(2);
      else setCount(1);
    };
    compute();
    window.addEventListener("resize", compute);
    return () => window.removeEventListener("resize", compute);
  }, []);
  return count;
}

type Props = {
  filterTags?: ItemTag[];
  title?: string;
  subtitle?: string;
};

export function HomeRealisationsPreview({
  filterTags,
  title = "Nos dernières réalisations",
  subtitle = "Quelques projets livrés récemment — cliquez pour voir le détail.",
}: Props = {}) {
  const items = filterTags && filterTags.length > 0
    ? ITEMS.filter((it) => filterTags.includes(it.tag))
    : ITEMS;
  const visible = useVisibleCount();
  const [index, setIndex] = useState(0);
  const maxIndex = Math.max(0, items.length - visible);

  // Clamp index when visible count changes (resize).
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIndex((i) => Math.min(i, maxIndex));
  }, [maxIndex]);

  const prev = () => {
    setIndex((i) => Math.max(0, i - 1));
  };
  const next = () => {
    setIndex((i) => Math.min(maxIndex, i + 1));
  };

  const canPrev = index > 0;
  const canNext = index < maxIndex;
  const slideWidth = 100 / visible;

  return (
    <SectionContainer
      id="realisations"
      title={title}
      subtitle={subtitle}
    >
      <div className="relative">
        {/* Track viewport */}
        <div className="overflow-hidden">
          <div
            className="flex transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
            style={{ transform: `translateX(-${index * slideWidth}%)` }}
          >
            {items.map((item) => (
              <div
                key={item.title}
                className="flex-shrink-0 px-4 md:px-6"
                style={{ width: `${slideWidth}%` }}
              >
                <Slide item={item} />
              </div>
            ))}
          </div>
        </div>

        {/* Arrows — desktop: outside track. Mobile: floating inside. */}
        <div className="mt-8 flex items-center justify-center gap-3 md:absolute md:inset-y-0 md:left-0 md:right-0 md:mt-0 md:gap-0 md:pointer-events-none">
          <button
            type="button"
            onClick={prev}
            disabled={!canPrev}
            aria-label="Projet précédent"
            className="pointer-events-auto flex size-12 items-center justify-center rounded-full border border-foreground/15 bg-background/80 text-foreground backdrop-blur-md transition-all duration-500 ease-in-out hover:border-foreground/35 hover:bg-background disabled:cursor-not-allowed disabled:opacity-30 md:absolute md:left-0 md:top-1/2 md:-translate-y-12 md:-translate-x-2 lg:-translate-x-4"
          >
            <ChevronLeft className="size-5" />
          </button>
          <button
            type="button"
            onClick={next}
            disabled={!canNext}
            aria-label="Projet suivant"
            className="pointer-events-auto flex size-12 items-center justify-center rounded-full border border-foreground/15 bg-background/80 text-foreground backdrop-blur-md transition-all duration-500 ease-in-out hover:border-foreground/35 hover:bg-background disabled:cursor-not-allowed disabled:opacity-30 md:absolute md:right-0 md:top-1/2 md:-translate-y-12 md:translate-x-2 lg:translate-x-4"
          >
            <ChevronRight className="size-5" />
          </button>
        </div>

        {/* Dots */}
        <div className="mt-6 flex items-center justify-center gap-2">
          {Array.from({ length: maxIndex + 1 }).map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Aller au projet ${i + 1}`}
              className={`h-1.5 rounded-full transition-all duration-500 ease-in-out ${
                i === index
                  ? "w-6 bg-foreground"
                  : "w-1.5 bg-foreground/25 hover:bg-foreground/45"
              }`}
            />
          ))}
        </div>
      </div>

      <BlurReveal delay={0.3}>
        <div className="mt-12 flex justify-center">
          <Link
            href="/realisations"
            className="inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-base font-semibold text-background transition-all duration-500 ease-in-out hover:bg-foreground/90 group/cta"
          >
            Voir nos réalisations
            <svg className="size-4 transition-transform duration-500 group-hover/cta:translate-x-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
          </Link>
        </div>
      </BlurReveal>
    </SectionContainer>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { TextReveal } from "@/components/animations/TextReveal";
import { BlurReveal } from "@/components/animations/BlurReveal";

type Slide = {
  brand: string;
  tagline: string;
  stat: string;
  imageUrl: string;
  href?: string;
};

const slides: Slide[] = [
  {
    brand: "Friend'iz",
    tagline: "Boutique communautaire — design éditorial",
    stat: "Livré en 6 jours",
    imageUrl: "/images/portfolio/friendiz-1.webp",
    href: "/realisations/friendiz",
  },
  {
    brand: "Maison Enileh",
    tagline: "Épicerie libanaise — direction artistique chaleureuse",
    stat: "100/100 SEO",
    imageUrl: "/images/portfolio/maison-enileh-1.webp",
    href: "/realisations/maison-enileh",
  },
  {
    brand: "Comparateur IA",
    tagline: "Boutique d'outils IA — UX hyper claire",
    stat: "Multi-devises",
    imageUrl: "/images/portfolio/comparateur-ia-1.webp",
    href: "/realisations/comparateur-ia-facile",
  },
];

const AUTOPLAY_MS = 6500;

export function EcommerceShowcase() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (paused) return;
    const t = setTimeout(
      () => setActive((i) => (i + 1) % slides.length),
      AUTOPLAY_MS,
    );
    return () => clearTimeout(t);
  }, [active, paused]);

  const slide = slides[active];

  return (
    <section
      id="showcase"
      className="relative w-full overflow-hidden py-20 md:py-28"
    >
      <div className="container mx-auto px-6 md:px-12">
        <div className="mx-auto max-w-3xl text-center mb-12 md:mb-16">
          <BlurReveal>
            <p className="text-sm font-medium uppercase tracking-widest text-accent-primary mb-4">
              Showcase
            </p>
          </BlurReveal>
          <TextReveal
            text="Des boutiques qui font la différence."
            elementType="h2"
            className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-foreground mb-4 justify-center"
          />
          <BlurReveal delay={0.2}>
            <p className="text-base md:text-lg text-foreground/60 leading-relaxed">
              Chaque boutique a son identité, son rythme, son énergie.
            </p>
          </BlurReveal>
        </div>

        <div
          ref={containerRef}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          className="relative mx-auto max-w-[1400px]"
        >
          <div className="relative aspect-[16/9] overflow-hidden rounded-3xl border border-foreground/10 bg-background-surface shadow-2xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, scale: 1.04 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.02 }}
                transition={{ duration: 1, ease: [0.4, 0, 0.2, 1] }}
                className="absolute inset-0"
              >
                <Image
                  src={slide.imageUrl}
                  alt={`${slide.brand} — ${slide.tagline}`}
                  fill
                  className="object-cover"
                  sizes="(min-width: 1280px) 1400px, 100vw"
                  priority={active === 0}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent" />
              </motion.div>
            </AnimatePresence>

            {/* Slide caption */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`caption-${active}`}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
                className="absolute bottom-0 left-0 right-0 p-6 md:p-10"
              >
                <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
                  <div>
                    <h3 className="text-2xl md:text-4xl font-bold tracking-tight text-foreground mb-1.5">
                      {slide.brand}
                    </h3>
                    <p className="text-sm md:text-base text-foreground/70">
                      {slide.tagline}
                    </p>
                  </div>
                  <span className="inline-flex w-fit items-center rounded-full border border-foreground/15 bg-background-surface/80 px-4 py-2 text-sm font-semibold text-foreground backdrop-blur-sm">
                    {slide.stat}
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Indicators */}
          <div className="mt-8 flex items-center justify-center gap-3">
            {slides.map((s, i) => (
              <button
                key={s.brand}
                type="button"
                onClick={() => setActive(i)}
                aria-label={`Voir ${s.brand}`}
                className="group relative h-1.5 w-12 overflow-hidden rounded-full bg-foreground/10 transition-all duration-700 ease-in-out hover:bg-foreground/20"
              >
                <span
                  className={`absolute inset-y-0 left-0 rounded-full bg-foreground transition-all duration-700 ease-in-out ${
                    i === active ? "w-full" : "w-0"
                  }`}
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

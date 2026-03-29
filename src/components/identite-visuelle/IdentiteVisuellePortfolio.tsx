"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Section } from "@/components/ui/Section";
import { TextReveal } from "@/components/animations/TextReveal";
import { BlurReveal } from "@/components/animations/BlurReveal";
import { SpotlightCard } from "@/components/animations/SpotlightCard";
import { GradientPlaceholder } from "@/components/ui/GradientPlaceholder";
import { useAnimationsEnabled } from "@/components/animations/AnimationContext";
import {
  portfolioContent,
  portfolioItems,
} from "@/data/identite-visuelle-content";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

function PortfolioImage({ src, alt }: { src: string; alt: string }) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return <GradientPlaceholder className="absolute inset-0" />;
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      className="object-cover object-center transition-transform duration-700 ease-in-out group-hover:scale-[1.03]"
      sizes="(max-width: 768px) 100vw, 50vw"
      onError={() => setHasError(true)}
    />
  );
}

export function IdentiteVisuellePortfolio() {
  const gridRef = useRef<HTMLDivElement>(null);
  const animationsEnabled = useAnimationsEnabled();

  useGSAP(
    () => {
      if (!animationsEnabled) return;
      if (!gridRef.current) return;

      // Parallax on images
      const images = gridRef.current.querySelectorAll("[data-parallax]");
      images.forEach((img) => {
        gsap.fromTo(
          img,
          { y: 20 },
          {
            y: -20,
            ease: "none",
            scrollTrigger: {
              trigger: img,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          }
        );
      });
    },
    { scope: gridRef, dependencies: [animationsEnabled] }
  );

  return (
    <Section>
      {/* Header */}
      <div className="text-center max-w-4xl mx-auto mb-12 md:mb-16">
        <BlurReveal>
          <span className="inline-block px-4 py-1.5 rounded-full text-sm font-semibold tracking-widest bg-foreground/5 text-foreground/70 border border-foreground/10 mb-6">
            {portfolioContent.badge}
          </span>
        </BlurReveal>

        <TextReveal
          text={portfolioContent.title}
          elementType="h2"
          className="text-2xl md:text-3xl lg:text-4xl font-black tracking-tight text-foreground justify-center"
        />

        <BlurReveal className="mt-4" delay={0.15}>
          <p className="text-base md:text-lg text-foreground/60 leading-relaxed">
            {portfolioContent.subtitle}
          </p>
        </BlurReveal>
      </div>

      {/* Grid — varied layout for visual interest: first item larger */}
      <div
        ref={gridRef}
        className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-6xl mx-auto"
      >
        {portfolioItems.map((item, idx) => {
          const isLarge = idx === 0;
          return (
            <BlurReveal key={idx} delay={idx * 0.2} className={isLarge ? "md:col-span-2" : ""}>
              <SpotlightCard
                className={`group w-full ${
                  isLarge ? "h-[340px] md:h-[420px]" : "h-[280px] md:h-[340px]"
                } p-6 flex flex-col justify-between overflow-hidden relative cursor-pointer`}
              >
                {/* Background image with parallax — falls back to GradientPlaceholder */}
                <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden rounded-[inherit]">
                  <div data-parallax className="absolute inset-[-20px]">
                    <PortfolioImage
                      src={item.image}
                      alt={`${item.brandName} — ${item.sector}`}
                    />
                  </div>
                  {/* Hover glow */}
                  <div className="absolute -top-20 -right-20 w-40 h-40 bg-foreground/[0.03] rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                </div>

                {/* Top info — sector badge */}
                <div className="flex justify-between items-start z-10 w-full transition-transform duration-500 ease-in-out group-hover:-translate-y-1">
                  <span className="text-sm font-mono uppercase tracking-widest py-1.5 px-3.5 rounded-full border border-foreground/10 bg-background/50 text-foreground/90 backdrop-blur-md">
                    {item.sector}
                  </span>
                </div>

                {/* Bottom gradient */}
                <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-background/80 via-background/40 to-transparent z-[1] pointer-events-none rounded-b-[inherit]" />

                {/* Bottom info */}
                <div className="z-10 transition-transform duration-500 ease-in-out group-hover:translate-x-1">
                  <h3 className={`${isLarge ? "text-xl md:text-2xl" : "text-lg md:text-xl"} font-bold leading-snug text-foreground mb-1`}>
                    {item.brandName}
                  </h3>
                  <p className="text-sm text-foreground/50 leading-relaxed">
                    {item.description}
                  </p>
                  {item.credit && (
                    <p className="text-sm text-foreground/30 mt-1">
                      {item.credit}
                    </p>
                  )}
                </div>
              </SpotlightCard>
            </BlurReveal>
          );
        })}
      </div>
    </Section>
  );
}

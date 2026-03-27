"use client";

import { useRef } from "react";
import { Sun, Zap, Shield, Eye, Users } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

import { SectionBackground } from "@/components/ui/SectionBackground";
import { SpotlightCard } from "@/components/animations/SpotlightCard";
import { BlurReveal } from "@/components/animations/BlurReveal";
import { TextReveal } from "@/components/animations/TextReveal";
import { valueCards, aboutValuesSection } from "@/data/about-content";
import type { ValueCard } from "@/data/about-content";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const iconMap: Record<string, React.ComponentType<React.SVGProps<SVGSVGElement>>> = {
  Sun,
  Zap,
  Shield,
  Eye,
  Users,
};

function ValueCardItem({ card, index }: { card: ValueCard; index: number }) {
  const iconRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!iconRef.current) return;

    gsap.fromTo(
      iconRef.current,
      { scale: 0.5, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 0.8,
        delay: index * 0.1,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: iconRef.current,
          start: "top 88%",
          toggleActions: "play none none none",
        },
      }
    );
  }, { scope: iconRef });

  const IconComponent = iconMap[card.icon];
  const isSpan2 = card.span === 2;

  return (
    <SpotlightCard
      className={`${
        isSpan2 ? "md:col-span-2" : "col-span-1"
      } group relative`}
    >
      <div className="relative z-10 flex flex-col gap-4 p-6 md:p-8">
        <div ref={iconRef} className="flex items-center justify-center w-12 h-12 rounded-xl bg-accent-primary/10">
          {IconComponent && (
            <IconComponent className="w-6 h-6 text-accent-primary" />
          )}
        </div>

        <h3 className="text-lg md:text-xl font-semibold text-foreground/90 tracking-tight">
          {card.title}
        </h3>

        <p className="text-sm md:text-base text-foreground/60 leading-relaxed">
          {card.text}
        </p>
      </div>
    </SpotlightCard>
  );
}

export function AboutValues() {
  return (
    <section className="relative py-28 md:py-36 px-4 sm:px-6 md:px-12">
      <SectionBackground
        variant="alt"
        orbs={[
          { color: "orange", position: "top-[30%] left-[5%]", size: "w-[400px] h-[400px]", opacity: "[0.06]" },
          { color: "ambre", position: "bottom-[20%] right-[10%]", size: "w-[350px] h-[350px]", opacity: "[0.05]" },
        ]}
      />

      <div className="relative z-10 mx-auto max-w-5xl">
        {/* Section header */}
        <div className="mb-12 md:mb-16">
          <TextReveal
            text={aboutValuesSection.title}
            elementType="h2"
            className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-foreground"
          />
          <BlurReveal className="mt-4" delay={0.3}>
            <p className="text-base md:text-lg text-foreground/60 max-w-2xl">
              {aboutValuesSection.subtitle}
            </p>
          </BlurReveal>
        </div>

        {/* Bento grid */}
        <BlurReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {valueCards.map((card, index) => (
              <ValueCardItem key={index} card={card} index={index} />
            ))}
          </div>
        </BlurReveal>
      </div>
    </section>
  );
}

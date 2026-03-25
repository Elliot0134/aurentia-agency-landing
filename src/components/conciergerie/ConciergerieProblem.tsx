"use client";

import { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Section } from "@/components/ui/Section";
import { TextReveal } from "@/components/animations/TextReveal";
import { BlurReveal } from "@/components/animations/BlurReveal";
import { SpotlightCard } from "@/components/animations/SpotlightCard";
import { SectionBackground } from "@/components/ui/SectionBackground";
import { TrendingDown, SearchX, UserX } from "lucide-react";
import { conciergeriesProblemContent } from "@/data/conciergeries-content";
import type { ConciergeriePain } from "@/data/conciergeries-content";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Map icon names from data to actual Lucide components
const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  TrendingDown,
  SearchX,
  UserX,
};

// Animated count-up hook for metrics
function useCountUp(target: number, trigger: boolean, duration = 2000): number {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!trigger) return;

    const startTime = performance.now();
    let animationFrame: number;

    const animate = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCurrent(Math.round(eased * target));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [trigger, target, duration]);

  return current;
}

// Individual pain card with count-up metric and red danger glow
function PainCard({ pain, index }: { pain: ConciergeriePain; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const animatedValue = useCountUp(pain.metric.value, isVisible, 2000);

  const IconComponent = iconMap[pain.icon];

  useEffect(() => {
    if (!cardRef.current) return;

    const trigger = ScrollTrigger.create({
      trigger: cardRef.current,
      start: "top 80%",
      onEnter: () => setIsVisible(true),
    });

    return () => trigger.kill();
  }, []);

  return (
    <BlurReveal delay={index * 0.2} className="h-full">
      <div ref={cardRef} className="h-full">
        <SpotlightCard
          className="p-8 h-full flex flex-col justify-between relative z-10 transition-all duration-700"
          style={{
            boxShadow: "0 0 40px -15px rgba(239,68,68,0.12), inset 0 1px 0 rgba(255,255,255,0.04)",
          }}
        >
          <div>
            {/* Icon in colored circle bg */}
            {IconComponent && (
              <div className="w-12 h-12 rounded-2xl bg-red-500/10 flex items-center justify-center mb-6 transition-colors duration-700">
                <IconComponent className="w-6 h-6 text-red-400/80" />
              </div>
            )}

            {/* Title */}
            <h3 className="text-xl lg:text-2xl font-bold mb-4 text-foreground">
              {pain.title}
            </h3>

            {/* Description */}
            <p className="text-foreground-muted text-base lg:text-lg mb-6 leading-relaxed">
              {pain.text}
            </p>
          </div>

          {/* Metric + detail */}
          <div className="pt-6 border-t border-foreground/10 mt-auto">
            <div className="mb-3 flex items-baseline gap-2">
              {/* Animated count-up metric */}
              <span className="text-3xl lg:text-4xl font-bold font-mono text-accent-primary tabular-nums">
                {animatedValue.toLocaleString("fr-FR")}
                {pain.metric.suffix}
              </span>
              <span className="text-sm text-foreground-muted font-medium uppercase tracking-wider">
                {pain.metric.label}
              </span>
            </div>
            <p className="text-sm font-medium text-foreground/70 italic leading-relaxed">
              {pain.detail}
            </p>
          </div>
        </SpotlightCard>
      </div>
    </BlurReveal>
  );
}

export function ConciergerieProblem() {
  const { title, pains } = conciergeriesProblemContent;

  return (
    <Section id="probleme" theme="dark-alt" className="py-32 relative">
      {/* SectionBackground alt variant — minimal orbs (dark narrative) */}
      <SectionBackground
        variant="alt"
        orbs={[
          { color: "rose", position: "top-[30%] right-[10%]", size: "w-[300px] h-[300px]", opacity: "[0.04]" },
          { color: "orange", position: "bottom-[20%] left-[20%]", size: "w-[250px] h-[250px]", opacity: "[0.03]" },
        ]}
      />

      <div className="relative z-10">
        {/* Section title — TextReveal (word by word, stagger 0.05s) */}
        <div className="max-w-3xl mx-auto text-center mb-20">
          <TextReveal
            text={title}
            elementType="h2"
            className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-6 justify-center"
          />
        </div>

        {/* 3 Pain cards — grid with SpotlightCard + count-up metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-6 lg:gap-8 max-w-6xl mx-auto">
          {pains.map((pain, idx) => (
            <PainCard key={idx} pain={pain} index={idx} />
          ))}
        </div>
      </div>
    </Section>
  );
}

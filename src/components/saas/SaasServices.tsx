"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Section } from "@/components/ui/Section";
import { SectionBackground } from "@/components/ui/SectionBackground";
import { TextReveal } from "@/components/animations/TextReveal";
import { BlurReveal } from "@/components/animations/BlurReveal";
import { SpotlightCard } from "@/components/animations/SpotlightCard";
import {
  saasServicesContent,
  saasProducts,
} from "@/data/saas-content";
import type { SaasProductCard } from "@/data/saas-content";
import {
  Rocket,
  Building2,
  LayoutDashboard,
  Users,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const iconMap: Record<string, LucideIcon> = {
  Rocket,
  Building2,
  LayoutDashboard,
  Users,
};

function ProductCard({ product }: { product: SaasProductCard }) {
  const iconRef = useRef<HTMLDivElement>(null);
  const Icon = iconMap[product.icon];

  useGSAP(() => {
    if (!iconRef.current) return;
    gsap.fromTo(
      iconRef.current,
      { scale: 0.5, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 0.7,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: iconRef.current,
          start: "top 88%",
          toggleActions: "play none none none",
        },
      }
    );
  });

  return (
    <SpotlightCard
      className={`p-8 md:p-10 flex flex-col gap-5 ${
        product.span === 2 ? "md:col-span-2" : ""
      }`}
    >
      <div className="relative z-10 flex flex-col gap-5">
        {/* Icon */}
        <div ref={iconRef} className="opacity-0">
          {Icon && (
            <div className="w-14 h-14 rounded-2xl bg-foreground/5 border border-foreground/10 flex items-center justify-center transition-colors duration-700">
              <Icon className="w-6 h-6 text-foreground/70" />
            </div>
          )}
        </div>

        {/* Title — monospace header for code/dashboard aesthetic */}
        <h3 className="text-lg md:text-xl font-bold text-foreground font-mono tracking-tight flex items-center gap-2">
          {product.title}
          {/* Blinking cursor CSS animation */}
          <span className="inline-block w-[2px] h-5 bg-foreground/40 animate-[blink-cursor_1s_step-end_infinite]" />
        </h3>

        {/* Text */}
        <p className="text-sm md:text-base text-foreground/60 leading-relaxed">
          {product.text}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mt-1">
          {product.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1.5 text-sm font-mono rounded-full border border-foreground/10 bg-foreground/5 text-foreground/50 transition-colors duration-700 hover:text-foreground/70 hover:border-foreground/20"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Blinking cursor keyframes */}
      <style jsx>{`
        @keyframes blink-cursor {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>
    </SpotlightCard>
  );
}

export function SaasServices() {
  return (
    <Section className="py-28 md:py-36 relative">
      <SectionBackground variant="alt" />

      <div className="relative z-10">
        {/* Section header */}
        <div className="text-center mb-16 md:mb-20">
          <TextReveal
            text={saasServicesContent.title}
            elementType="h2"
            className="text-3xl md:text-4xl lg:text-5xl font-black text-foreground justify-center"
          />
          <BlurReveal className="mt-6" delay={0.2}>
            <p className="text-lg md:text-xl text-foreground/60 max-w-2xl mx-auto">
              {saasServicesContent.subtitle}
            </p>
          </BlurReveal>
        </div>

        {/* Bento grid */}
        <BlurReveal stagger={0.15}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-5xl mx-auto">
            {saasProducts.map((product) => (
              <ProductCard key={product.title} product={product} />
            ))}
          </div>
        </BlurReveal>
      </div>
    </Section>
  );
}

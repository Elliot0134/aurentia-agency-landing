"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Link from "next/link";
import { Section } from "@/components/ui/Section";
import { SectionBackground } from "@/components/ui/SectionBackground";
import { TextGradientReveal } from "@/components/animations/TextGradientReveal";
import { BlurReveal } from "@/components/animations/BlurReveal";
import { pourquoiContent } from "@/data/identite-visuelle-content";
import { Eye, Cpu } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function IdentiteVisuellePourquoi() {
  const quoteRef = useRef<HTMLQuoteElement>(null);

  useGSAP(
    () => {
      if (!quoteRef.current) return;

      gsap.fromTo(
        quoteRef.current,
        { opacity: 0, scale: 0.95 },
        {
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: quoteRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );
    },
    { scope: quoteRef }
  );

  return (
    <Section theme="dark-alt" className="section-divider-orange">
      <SectionBackground
        orbs={[
          { color: "ambre", position: "top-[20%] right-[20%]", size: "w-[350px] h-[300px]", opacity: "[0.05]" },
          { color: "rose", position: "bottom-[30%] left-[10%]", size: "w-[200px] h-[200px]", opacity: "[0.03]" },
        ]}
      />

      <div className="relative z-10">
        {/* Header */}
        <div className="text-center max-w-4xl mx-auto mb-12 md:mb-16">
          <TextGradientReveal
            text={pourquoiContent.title}
            elementType="h2"
            className="text-2xl md:text-3xl lg:text-4xl font-black tracking-tight text-foreground justify-center"
          />
          <BlurReveal className="mt-4" delay={0.15}>
            <p className="text-base md:text-lg text-foreground/60 leading-relaxed">
              {pourquoiContent.subtitle}
            </p>
          </BlurReveal>
        </div>

        {/* 2 columns layout */}
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-16">
          {/* Left — text blocks (60%) */}
          <div className="lg:col-span-3 flex flex-col gap-8">
            {/* Expertise block */}
            <BlurReveal>
              <div className="flex gap-4">
                <div className="flex-shrink-0 mt-1">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-500">
                    <Eye className="w-6 h-6" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-foreground mb-3">
                    {pourquoiContent.expertise.title}
                  </h3>
                  <p className="text-sm text-foreground/50 leading-relaxed">
                    {pourquoiContent.expertise.text}
                  </p>
                </div>
              </div>
            </BlurReveal>

            {/* IA block */}
            <BlurReveal delay={0.2}>
              <div className="flex gap-4">
                <div className="flex-shrink-0 mt-1">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-orange-500/10 text-orange-500">
                    <Cpu className="w-6 h-6" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-foreground mb-3">
                    {pourquoiContent.ia.title}
                  </h3>
                  <p className="text-sm text-foreground/50 leading-relaxed">
                    {pourquoiContent.ia.text}
                  </p>
                </div>
              </div>
            </BlurReveal>

            {/* Team link */}
            <BlurReveal delay={0.3}>
              <Link
                href={pourquoiContent.teamLink.href}
                className="inline-block text-sm font-semibold text-foreground/40 transition-colors duration-500 hover:text-foreground/70"
              >
                {pourquoiContent.teamLink.text}
              </Link>
            </BlurReveal>
          </div>

          {/* Right — Quote in glassmorphism card with ambre border (40%) */}
          <div className="lg:col-span-2 flex items-center">
            <blockquote
              ref={quoteRef}
              className="opacity-0 relative p-6 md:p-8 rounded-2xl backdrop-blur-sm border border-amber-500/20 bg-foreground/[0.02]"
              style={{
                boxShadow: "0 0 40px rgba(217,150,80,0.06), inset 0 1px 0 rgba(217,150,80,0.08)",
              }}
            >
              {/* Ambre accent line at left */}
              <div
                className="absolute left-0 top-6 bottom-6 w-[2px] rounded-full"
                style={{
                  background: "linear-gradient(to bottom, rgba(217,150,80,0.5), rgba(201,100,66,0.3))",
                }}
                aria-hidden="true"
              />
              <p className="text-lg md:text-xl font-bold text-foreground/80 leading-relaxed italic pl-4">
                {pourquoiContent.quote}
              </p>
              <footer className="mt-4 pl-4 text-sm text-foreground/40">
                &mdash; {pourquoiContent.quoteAuthor}
              </footer>
            </blockquote>
          </div>
        </div>
      </div>
    </Section>
  );
}

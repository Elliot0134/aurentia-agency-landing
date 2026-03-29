"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Section } from "@/components/ui/Section";
import { SectionDivider } from "@/components/ui/SectionDivider";
import { TextReveal } from "@/components/animations/TextReveal";
import { BlurReveal } from "@/components/animations/BlurReveal";
import { useAnimationsEnabled } from "@/components/animations/AnimationContext";
import { fatherSonContent, fatherSonBlocks } from "@/data/about-content";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function AboutDNA() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);
  const animationsEnabled = useAnimationsEnabled();

  // Animate the vertical timeline line on scroll (scaleY from 0 to 1)
  useGSAP(
    () => {
      if (!animationsEnabled) return;
      if (!timelineRef.current || !sectionRef.current) return;

      gsap.fromTo(
        timelineRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 60%",
            end: "bottom 40%",
            scrub: 0.8,
          },
        }
      );
    },
    { scope: sectionRef, dependencies: [animationsEnabled] }
  );

  // Parallax on the photo
  useGSAP(
    () => {
      if (!animationsEnabled) return;
      if (!photoRef.current || !sectionRef.current) return;

      gsap.fromTo(
        photoRef.current,
        { y: 40 },
        {
          y: -40,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.6,
          },
        }
      );
    },
    { scope: sectionRef, dependencies: [animationsEnabled] }
  );

  return (
    <>
      <SectionDivider />
      <Section className="py-28 md:py-36" containerClassName="flex flex-col items-center">
        <div ref={sectionRef} className="max-w-4xl mx-auto w-full">
          {/* Badge */}
          <BlurReveal>
            <span className="inline-block text-sm font-mono tracking-wider text-accent-primary uppercase mb-4">
              {fatherSonContent.badge}
            </span>
          </BlurReveal>

          {/* Title */}
          <TextReveal
            text={fatherSonContent.title}
            elementType="h2"
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4"
          />

          {/* Subtitle */}
          <BlurReveal delay={0.2}>
            <p className="text-base md:text-lg text-foreground-dim leading-relaxed max-w-2xl mb-16 md:mb-20">
              {fatherSonContent.subtitle}
            </p>
          </BlurReveal>

          {/* Main grid: photo left (40%) / text right (60%) on desktop, stacked on mobile */}
          <div className="flex flex-col lg:flex-row gap-10 lg:gap-16">
            {/* Photo column */}
            <div className="w-full lg:w-[40%] flex-shrink-0">
              <BlurReveal>
                <div className="relative overflow-hidden rounded-2xl aspect-[16/9] lg:aspect-[3/4]">
                  <div ref={photoRef} className="absolute inset-0">
                    <Image
                      src="/images/about/team-aurentia.webp"
                      alt="L'équipe Aurentia — expertise web et intelligence artificielle"
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 40vw"
                      priority={false}
                    />
                    {/* Subtle dark overlay at bottom for depth */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent pointer-events-none" />
                  </div>
                </div>
              </BlurReveal>
            </div>

            {/* Text column with timeline */}
            <div className="w-full lg:w-[60%] relative">
              {/* Vertical timeline line (animates on scroll) */}
              <div
                ref={timelineRef}
                className="absolute left-0 top-0 bottom-0 w-px bg-accent-primary/40 origin-top hidden lg:block"
                style={{ transformOrigin: "top center" }}
              />

              {/* Text blocks */}
              <div className="space-y-12 lg:pl-8">
                {fatherSonBlocks.map((block, index) => (
                  <BlurReveal key={block.label} delay={index * 0.15}>
                    <div className="space-y-3">
                      <span className="text-sm font-mono tracking-wider text-accent-primary uppercase">
                        {block.label}
                      </span>
                      <p className="text-base md:text-lg text-foreground-dim leading-relaxed md:leading-[1.8]">
                        {block.text}
                      </p>
                    </div>
                  </BlurReveal>
                ))}
              </div>

              {/* Highlight quote — glassmorphism card */}
              <BlurReveal delay={0.5}>
                <div className="mt-16 lg:pl-8">
                  <blockquote className="relative bg-foreground/[0.03] backdrop-blur-xl border border-foreground/[0.08] rounded-2xl p-8">
                    <p className="text-2xl md:text-3xl lg:text-4xl font-semibold text-foreground leading-snug">
                      {fatherSonContent.quote}
                    </p>
                    <cite className="block mt-4 text-sm text-foreground/50 not-italic">
                      {fatherSonContent.quoteAuthor}
                    </cite>
                  </blockquote>
                </div>
              </BlurReveal>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}

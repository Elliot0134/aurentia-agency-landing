"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Section } from "@/components/ui/Section";
import { TextReveal } from "@/components/animations/TextReveal";
import { BlurReveal } from "@/components/animations/BlurReveal";
import { NumberMorph } from "@/components/animations/NumberMorph";
import { SectionBackground } from "@/components/ui/SectionBackground";
import { conciergeriesProcessContent } from "@/data/conciergeries-content";
import type { LucideProps } from "lucide-react";
import { PhoneCall, Hammer, Rocket } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const iconMap: Record<string, React.ComponentType<LucideProps>> = {
  PhoneCall,
  Hammer,
  Rocket,
};

export function ConciergerieProcess() {
  const timelineRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<SVGLineElement>(null);

  useGSAP(() => {
    // Animate timeline line drawing
    if (lineRef.current) {
      const length = lineRef.current.getTotalLength();
      gsap.set(lineRef.current, {
        strokeDasharray: length,
        strokeDashoffset: length,
      });
      gsap.to(lineRef.current, {
        strokeDashoffset: 0,
        duration: 2,
        ease: "power2.inOut",
        scrollTrigger: {
          trigger: timelineRef.current,
          start: "top 75%",
          end: "bottom 60%",
          scrub: true,
        },
      });
    }

    // Timeline nodes scale bounce on scroll
    if (timelineRef.current) {
      const nodes = timelineRef.current.querySelectorAll(".step-node");
      nodes.forEach((node, idx) => {
        gsap.fromTo(
          node,
          { scale: 0, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.7,
            ease: "back.out(2.5)",
            delay: idx * 0.2,
            scrollTrigger: {
              trigger: node,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );
      });

      // Last step icon glow pulse
      const lastIcon = timelineRef.current.querySelector(".step-icon-last");
      if (lastIcon) {
        gsap.fromTo(
          lastIcon,
          { scale: 1, boxShadow: "0 0 0 0 rgba(201,100,66,0)" },
          {
            scale: 1.05,
            boxShadow: "0 0 30px 8px rgba(201,100,66,0.3)",
            duration: 1.5,
            ease: "sine.inOut",
            repeat: -1,
            yoyo: true,
            scrollTrigger: {
              trigger: lastIcon,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          }
        );
      }
    }
  });

  const { title, subtitle, steps } = conciergeriesProcessContent;

  return (
    <Section id="process" theme="dark" className="py-32 relative">
      {/* Orbs growing — narrative: more color */}
      <SectionBackground
        orbs={[
          { color: "orange", position: "top-[30%] left-[5%]", size: "w-[400px] h-[400px]", opacity: "[0.08]" },
          { color: "ambre", position: "bottom-[20%] right-[15%]", size: "w-[350px] h-[350px]", opacity: "[0.06]" },
          { color: "violet", position: "top-[60%] left-[50%]", size: "w-[300px] h-[300px]", opacity: "[0.04]" },
        ]}
      />

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Title */}
        <div className="text-center mb-4">
          <TextReveal
            text={title}
            elementType="h2"
            className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tight justify-center"
          />
        </div>

        {/* Subtitle */}
        <BlurReveal className="text-center mb-20">
          <p className="text-lg md:text-xl text-foreground/60">{subtitle}</p>
        </BlurReveal>

        {/* Timeline */}
        <div ref={timelineRef} className="relative">
          {/* Horizontal timeline line (desktop) */}
          <svg
            className="hidden md:block absolute top-16 left-0 w-full h-1 overflow-visible"
            preserveAspectRatio="none"
          >
            <line
              ref={lineRef}
              x1="16.67%"
              y1="0"
              x2="83.33%"
              y2="0"
              stroke="currentColor"
              strokeWidth="2"
              strokeDasharray="8 8"
              className="text-accent-primary/40"
            />
          </svg>

          {/* Vertical timeline line (mobile) */}
          <div className="md:hidden absolute left-8 top-16 bottom-16 w-px border-l-2 border-dashed border-accent-primary/30" />

          {/* Steps grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
            {steps.map((step, idx) => {
              const IconComponent = iconMap[step.icon];
              const isLast = idx === steps.length - 1;

              return (
                <BlurReveal key={idx} delay={idx * 0.3}>
                  <div className="flex flex-row md:flex-col items-start md:items-center text-left md:text-center gap-6 md:gap-0">
                    {/* Step icon circle — scale bounce via GSAP */}
                    <div
                      className={`
                        step-node shrink-0 flex h-16 w-16 items-center justify-center rounded-full
                        border-2 border-accent-primary/30 bg-background/60
                        transition-all duration-700
                        ${isLast ? "step-icon-last" : ""}
                      `}
                    >
                      {IconComponent && (
                        <IconComponent className="h-7 w-7 text-accent-primary" />
                      )}
                    </div>

                    {/* Content */}
                    <div className="md:mt-8 space-y-3">
                      {/* Label (Jour X) */}
                      <span className="inline-block text-sm font-mono tracking-widest uppercase text-accent-primary/70">
                        {step.label}
                      </span>

                      {/* Step number */}
                      <div className="text-4xl md:text-5xl font-black text-foreground/20">
                        <NumberMorph
                          value={parseInt(step.number)}
                          className="text-4xl md:text-5xl font-black"
                        />
                      </div>

                      {/* Title */}
                      <h3 className="text-xl md:text-2xl font-bold text-foreground">
                        {step.title}
                      </h3>

                      {/* Description */}
                      <p className="text-base text-foreground/60 leading-relaxed max-w-sm mx-auto">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </BlurReveal>
              );
            })}
          </div>
        </div>
      </div>
    </Section>
  );
}

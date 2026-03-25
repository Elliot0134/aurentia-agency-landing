"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Section } from "@/components/ui/Section";
import { TextGradientReveal } from "@/components/animations/TextGradientReveal";
import { BlurReveal } from "@/components/animations/BlurReveal";
import { SectionBackground } from "@/components/ui/SectionBackground";
import { conciergeriesSolutionContent } from "@/data/conciergeries-content";
import { PhoneMockup } from "@/components/shared/PhoneMockup";
import { Check } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function ConciergerieSolution() {
  const featuresRef = useRef<HTMLUListElement>(null);
  const mockupRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!featuresRef.current) return;

    const items = featuresRef.current.querySelectorAll(".feature-item");
    const icons = featuresRef.current.querySelectorAll(".feature-check");

    gsap.fromTo(
      items,
      { x: -40, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 0.7,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: featuresRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      }
    );

    // Check icons scale bounce
    gsap.fromTo(
      icons,
      { scale: 0 },
      {
        scale: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: "back.out(3)",
        delay: 0.3,
        scrollTrigger: {
          trigger: featuresRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      }
    );

    // Mockup 3D tilt on hover via mousemove
    if (mockupRef.current) {
      const mockup = mockupRef.current;

      const handleMouseMove = (e: MouseEvent) => {
        const rect = mockup.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;

        gsap.to(mockup, {
          rotateY: x * 5,
          rotateX: -y * 5,
          duration: 0.6,
          ease: "power2.out",
        });
      };

      const handleMouseLeave = () => {
        gsap.to(mockup, {
          rotateY: 0,
          rotateX: 0,
          duration: 0.8,
          ease: "power3.out",
        });
      };

      mockup.addEventListener("mousemove", handleMouseMove);
      mockup.addEventListener("mouseleave", handleMouseLeave);

      // Parallax
      gsap.fromTo(
        mockup,
        { y: 40 },
        {
          y: -40,
          ease: "none",
          scrollTrigger: {
            trigger: mockup,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );

      return () => {
        mockup.removeEventListener("mousemove", handleMouseMove);
        mockup.removeEventListener("mouseleave", handleMouseLeave);
      };
    }
  });

  const { badge, title, subtitle, features } =
    conciergeriesSolutionContent;

  return (
    <Section id="solution" theme="dark" className="py-32 relative">
      {/* Orbs starting to appear — narrative: solution brings light */}
      <SectionBackground
        orbs={[
          { color: "orange", position: "top-[20%] right-[5%]", size: "w-[400px] h-[400px]", opacity: "[0.07]" },
          { color: "ambre", position: "bottom-[30%] left-[10%]", size: "w-[350px] h-[350px]", opacity: "[0.05]" },
        ]}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Badge */}
        <BlurReveal className="mb-6">
          <span className="inline-block text-sm font-mono tracking-widest uppercase text-accent-primary">
            {badge}
          </span>
        </BlurReveal>

        {/* Grid: text left, mockup right */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16 items-start">
          {/* Left column — text (60%) */}
          <div className="lg:col-span-3 space-y-8">
            <TextGradientReveal
              text={title}
              elementType="h2"
              className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tight leading-tight"
            />

            <BlurReveal delay={0.15}>
              <p className="text-lg md:text-xl text-accent-primary font-medium">
                {subtitle}
              </p>
            </BlurReveal>

            {/* Features list */}
            <ul ref={featuresRef} className="space-y-4 pt-4">
              {features.map((feature, idx) => (
                <li key={idx} className="feature-item flex items-start gap-4">
                  <span className="feature-check mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent-primary/20 transition-all duration-500">
                    <Check className="h-4 w-4 text-accent-primary" />
                  </span>
                  <div>
                    <span className="font-semibold text-foreground">
                      {feature.label}
                    </span>
                    <span className="text-foreground/60">
                      {" "}
                      &mdash; {feature.description}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Right column — iPhone mockup with live site */}
          <div className="lg:col-span-2 flex items-center justify-center" style={{ perspective: "1000px" }}>
            <BlurReveal delay={0.4}>
              <div
                ref={mockupRef}
                className="relative"
                style={{ transformStyle: "preserve-3d" }}
              >
                {/* Glow behind mockup */}
                <div className="absolute inset-0 -m-8 rounded-3xl bg-accent-primary/10 blur-3xl transition-opacity duration-700" />

                <PhoneMockup embedUrl="https://maison-enileh.vercel.app/" />
              </div>
            </BlurReveal>
          </div>
        </div>
      </div>
    </Section>
  );
}

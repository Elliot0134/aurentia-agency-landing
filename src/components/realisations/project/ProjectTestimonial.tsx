"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { TextReveal } from "@/components/animations/TextReveal";
import { useAnimationsEnabled } from "@/components/animations/AnimationContext";
import type { ProjectTestimonial as ProjectTestimonialType } from "@/data/projects";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface ProjectTestimonialProps {
  testimonial?: ProjectTestimonialType;
}

export function ProjectTestimonial({ testimonial }: ProjectTestimonialProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const quoteMarkRef = useRef<HTMLSpanElement>(null);
  const authorRef = useRef<HTMLDivElement>(null);
  const animationsEnabled = useAnimationsEnabled();

  useGSAP(() => {
    if (!animationsEnabled) return;
    if (!sectionRef.current || !testimonial) return;

    // Quote mark scale animation
    if (quoteMarkRef.current) {
      gsap.fromTo(
        quoteMarkRef.current,
        { scale: 0, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.6,
          ease: "back.out(2)",
          delay: 0.2,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );
    }

    // Author fade-in
    if (authorRef.current) {
      gsap.fromTo(
        authorRef.current,
        { opacity: 0, y: 10 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
          delay: 0.5,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );
    }
  }, { scope: sectionRef, dependencies: [animationsEnabled] });

  // Render nothing if no testimonial
  if (!testimonial) return null;

  return (
    <section ref={sectionRef} className="py-16 md:py-24">
      <div className="max-w-3xl mx-auto px-6 md:px-12">
        {/* Glassmorphism card */}
        <div className="bg-foreground/[0.03] backdrop-blur-sm border border-foreground/[0.06] rounded-2xl p-8 md:p-12 text-center">
          {/* Decorative opening quote */}
          <span
            ref={quoteMarkRef}
            className="block text-7xl md:text-8xl font-bold text-accent-primary/40 leading-none mb-4 opacity-0"
            aria-hidden="true"
          >
            &ldquo;
          </span>

          {/* Quote text */}
          <TextReveal
            text={testimonial.quote}
            elementType="p"
            className="text-xl md:text-2xl lg:text-3xl font-medium text-foreground/80 leading-relaxed justify-center"
            delay={0.3}
          />

          {/* Author */}
          <div ref={authorRef} className="mt-8 opacity-0">
            <p className="text-base font-semibold text-foreground/70">
              {testimonial.author}
            </p>
            <p className="text-sm text-foreground/40 mt-1">
              {testimonial.role}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

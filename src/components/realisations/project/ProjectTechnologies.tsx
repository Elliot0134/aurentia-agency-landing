"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface ProjectTechnologiesProps {
  technologies: string[];
}

export function ProjectTechnologies({ technologies }: ProjectTechnologiesProps) {
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!sectionRef.current) return;

    const title = sectionRef.current.querySelector("[data-tech-title]");
    const pills = sectionRef.current.querySelectorAll("[data-tech-pill]");

    if (title) {
      gsap.fromTo(
        title,
        { opacity: 0, y: 10 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 88%",
            toggleActions: "play none none none",
          },
        }
      );
    }

    gsap.fromTo(
      pills,
      { opacity: 0, y: 8 },
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        stagger: 0.05,
        ease: "power2.out",
        delay: 0.15,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 88%",
          toggleActions: "play none none none",
        },
      }
    );
  }, { scope: sectionRef });

  if (!technologies.length) return null;

  return (
    <section ref={sectionRef} className="py-12 md:py-16">
      <div className="max-w-4xl mx-auto px-6 md:px-12">
        <h2
          data-tech-title
          className="text-sm tracking-widest uppercase font-medium text-foreground/30 mb-6 opacity-0"
        >
          Technologies
        </h2>
        <div className="flex flex-wrap gap-2 md:gap-3">
          {technologies.map((tech, index) => (
            <span
              key={index}
              data-tech-pill
              className="text-sm font-mono text-foreground/50 border border-foreground/10 rounded-full px-4 py-2 transition-colors duration-500 hover:border-foreground/20 hover:text-foreground/70 opacity-0"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

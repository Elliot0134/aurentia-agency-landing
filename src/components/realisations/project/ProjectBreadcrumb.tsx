"use client";

import { useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useAnimationsEnabled } from "@/components/animations/AnimationContext";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface ProjectBreadcrumbProps {
  projectName: string;
}

export function ProjectBreadcrumb({ projectName }: ProjectBreadcrumbProps) {
  const ref = useRef<HTMLElement>(null);
  const animationsEnabled = useAnimationsEnabled();

  useGSAP(() => {
    if (!animationsEnabled) return;
    if (!ref.current) return;
    gsap.fromTo(
      ref.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.5, ease: "power2.out", delay: 0.2 }
    );
  }, { scope: ref, dependencies: [animationsEnabled] });

  return (
    <nav
      ref={ref}
      aria-label="Breadcrumb"
      className="py-6 max-w-6xl mx-auto px-6 md:px-12 opacity-0"
    >
      <ol className="flex items-center gap-2 text-sm md:text-base">
        <li>
          <Link
            href="/"
            className="text-foreground/40 hover:text-foreground transition-colors duration-500"
          >
            Accueil
          </Link>
        </li>
        <li className="text-foreground/20">/</li>
        <li>
          <Link
            href="/realisations"
            className="text-foreground/40 hover:text-foreground transition-colors duration-500"
          >
            Realisations
          </Link>
        </li>
        <li className="text-foreground/20">/</li>
        <li className="text-foreground truncate max-w-[200px] md:max-w-none">
          {projectName}
        </li>
      </ol>
    </nav>
  );
}

"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Section } from "@/components/ui/Section";
import { SectionBackground } from "@/components/ui/SectionBackground";
import { TextGradientReveal } from "@/components/animations/TextGradientReveal";
import { BlurReveal } from "@/components/animations/BlurReveal";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { CalModal } from "@/components/shared/CalModal";
import { useAnimationsEnabled } from "@/components/animations/AnimationContext";
import type { ProjectType } from "@/data/projects";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface ProjectCTAProps {
  projectType: ProjectType;
}

const subtitleByType: Record<ProjectType, string> = {
  "Site vitrine":
    "Vous gerez une entreprise locale et vous voulez le meme niveau de resultat ? On en parle. 20 minutes. Gratuit. On vous montre ce qu'on peut faire pour vous.",
  SaaS: "Vous avez un produit a lancer et vous voulez une experience utilisateur de ce niveau ? On en parle. 20 minutes. Gratuit. On vous montre ce qu'on peut construire pour vous.",
  "Landing page":
    "Vous avez besoin d'une page qui convertit a ce niveau ? On en parle. 20 minutes. Gratuit. On vous montre ce qu'on peut creer pour vous.",
  "Identite visuelle":
    "Vous voulez une identite visuelle qui marque les esprits ? On en parle. 20 minutes. Gratuit. On vous montre ce qu'on peut creer pour vous.",
};

const calLinkByType: Record<ProjectType, string> = {
  "Site vitrine": "elliot-estrade-ixfuya/site-vitrine",
  SaaS: "elliot-estrade-ixfuya/appel-decouverte",
  "Landing page": "elliot-estrade-ixfuya/appel-decouverte",
  "Identite visuelle": "elliot-estrade-ixfuya/appel-decouverte",
};

const proofs = [
  "Gratuit et sans engagement",
  "On vous montre VOTRE site",
  "Vous gardez l'audit quoi qu'il arrive",
];

export function ProjectCTA({ projectType }: ProjectCTAProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [calOpen, setCalOpen] = useState(false);
  const animationsEnabled = useAnimationsEnabled();

  useGSAP(() => {
    if (!animationsEnabled) return;
    if (!contentRef.current) return;

    const elements = contentRef.current.querySelectorAll("[data-reveal]");
    gsap.fromTo(
      elements,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.9,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: contentRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      }
    );
  }, { scope: contentRef, dependencies: [animationsEnabled] });

  return (
    <>
      <Section
        theme="dark"
      className="relative py-28 md:py-40 text-center overflow-hidden border-t-0"
    >
      {/* Gradient mesh background */}
      <SectionBackground
        orbs={[
          { color: "orange", position: "top-[25%] left-[30%]", size: "w-[550px] h-[400px]", opacity: "[0.10]" },
          { color: "ambre", position: "bottom-[20%] right-[20%]", size: "w-[450px] h-[350px]", opacity: "[0.07]" },
          { color: "rose", position: "top-[45%] left-[55%]", size: "w-[350px] h-[280px]", opacity: "[0.05]" },
        ]}
      />

      <div
        ref={contentRef}
        className="relative z-10 max-w-2xl mx-auto flex flex-col items-center gap-5"
      >
        {/* Eyebrow */}
        <p
          data-reveal
          className="text-sm tracking-widest uppercase text-foreground/30 font-medium"
        >
          Votre tour
        </p>

        {/* Headline */}
        <TextGradientReveal
          text="Un projet similaire ?"
          elementType="h2"
          className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-tight justify-center"
        />

        {/* Subtitle */}
        <BlurReveal delay={0.3}>
          <p className="text-base md:text-lg text-foreground/40 max-w-lg leading-relaxed">
            {subtitleByType[projectType]}
          </p>
        </BlurReveal>

        {/* CTA Button */}
        <div data-reveal className="mt-6">
          <MagneticButton
            glow
            className="px-8 py-3.5 w-full sm:w-auto"
            onClick={() => setCalOpen(true)}
          >
            Reserver mon call gratuit&nbsp;&nbsp;&rarr;
          </MagneticButton>
        </div>

        {/* Proofs */}
        <div
          data-reveal
          className="flex flex-col sm:flex-row items-center gap-3 sm:gap-6 mt-4"
        >
          {proofs.map((proof, index) => (
            <span
              key={index}
              className="text-sm text-foreground/30 flex items-center gap-2"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500/40" />
              {proof}
            </span>
          ))}
        </div>
      </div>
      </Section>

      <CalModal open={calOpen} onClose={() => setCalOpen(false)} calLink={calLinkByType[projectType]} />
    </>
  );
}

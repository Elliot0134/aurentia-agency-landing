"use client";

import { Section } from "@/components/ui/Section";
import { SectionBackground } from "@/components/ui/SectionBackground";
import { TextReveal } from "@/components/animations/TextReveal";
import { BlurReveal } from "@/components/animations/BlurReveal";
import { SpotlightCard } from "@/components/animations/SpotlightCard";
import { GradientPlaceholder } from "@/components/ui/GradientPlaceholder";
import {
  saasPortfolioContent,
  saasProjects,
} from "@/data/saas-content";
import type { SaasProject } from "@/data/saas-content";

/* ── Simple browser mockup frame ──────────────────── */
function BrowserMockup({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-xl overflow-hidden border border-foreground/10 bg-foreground/[0.02] shadow-lg shadow-foreground/[0.03]">
      {/* Title bar */}
      <div className="flex items-center gap-2 px-3 py-2 border-b border-foreground/5 bg-foreground/[0.03]">
        <div className="flex gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-foreground/10" />
          <span className="w-2.5 h-2.5 rounded-full bg-foreground/10" />
          <span className="w-2.5 h-2.5 rounded-full bg-foreground/10" />
        </div>
        <div className="flex-1 flex justify-center">
          <span className="text-sm text-foreground/25 font-mono">
            app.example.com
          </span>
        </div>
        <div className="w-[42px]" />
      </div>
      {/* Content */}
      <div className="relative">{children}</div>
    </div>
  );
}

function ProjectCard({ project }: { project: SaasProject }) {
  return (
    <SpotlightCard className="overflow-hidden group/project">
      <div className="relative z-10">
        {/* Screenshot — BrowserMockup with GradientPlaceholder */}
        <div className="p-4 pb-0">
          <BrowserMockup>
            <GradientPlaceholder
              aspectRatio="16/9"
              label={project.title}
            />
          </BrowserMockup>
        </div>

        {/* Content */}
        <div className="p-8 md:p-10 flex flex-col gap-4">
          <h3 className="text-xl md:text-2xl font-bold text-foreground">
            {project.title}
          </h3>
          <p className="text-sm md:text-base text-foreground/50 leading-relaxed">
            {project.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mt-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1.5 text-sm font-mono rounded-full border border-foreground/10 bg-foreground/5 text-foreground/50 transition-colors duration-700 hover:text-foreground/70 hover:border-foreground/20"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </SpotlightCard>
  );
}

export function SaasPortfolio() {
  return (
    <Section id="portfolio" className="py-28 md:py-36 min-h-[60vh] relative">
      <SectionBackground variant="base" />

      <div className="relative z-10">
        {/* Header */}
        <div className="text-center mb-16 md:mb-20">
          <BlurReveal className="mb-5">
            <span className="inline-block px-5 py-2.5 rounded-full border border-foreground/10 bg-foreground/5 text-sm font-medium tracking-widest text-foreground/70">
              {saasPortfolioContent.badge}
            </span>
          </BlurReveal>

          <TextReveal
            text={saasPortfolioContent.title}
            elementType="h2"
            className="text-3xl md:text-4xl lg:text-5xl font-black text-foreground justify-center"
          />

          <BlurReveal className="mt-6" delay={0.2}>
            <p className="text-lg md:text-xl text-foreground/60 max-w-2xl mx-auto">
              {saasPortfolioContent.subtitle}
            </p>
          </BlurReveal>
        </div>

        {/* Project grid */}
        <BlurReveal stagger={0.2}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 lg:gap-10 max-w-5xl mx-auto">
            {saasProjects.map((project) => (
              <ProjectCard key={project.title} project={project} />
            ))}
          </div>
        </BlurReveal>
      </div>
    </Section>
  );
}

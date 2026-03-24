"use client";

import Image from "next/image";
import { ExternalLink } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { SectionBackground } from "@/components/ui/SectionBackground";
import { TextReveal } from "@/components/animations/TextReveal";
import { BlurReveal } from "@/components/animations/BlurReveal";
import { SpotlightCard } from "@/components/animations/SpotlightCard";
import { exemplesContent } from "@/data/landing-pages-content";

export function LandingPagesExemples() {
  return (
    <Section id="exemples" className="py-28 md:py-36 min-h-[50vh] relative">
      <SectionBackground variant="alt" />

      <div className="relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
          <BlurReveal>
            <span className="inline-block text-sm font-mono uppercase tracking-widest px-5 py-2.5 rounded-full border border-foreground/10 bg-foreground/5 text-foreground/70 mb-8">
              {exemplesContent.badge}
            </span>
          </BlurReveal>

          <TextReveal
            text={exemplesContent.title}
            elementType="h2"
            className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-6 justify-center"
          />

          <BlurReveal delay={0.15}>
            <p className="text-lg md:text-xl text-foreground/60">
              {exemplesContent.subtitle}
            </p>
          </BlurReveal>
        </div>

        {/* Portfolio grid — hover with dramatic scale + glow */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-5xl mx-auto">
          {exemplesContent.examples.map((example, idx) => (
            <BlurReveal key={example.title + idx} delay={idx * 0.2}>
              <SpotlightCard className="h-full overflow-hidden group/example transition-all duration-700 hover:scale-[1.03] hover:shadow-[0_0_40px_rgba(201,100,66,0.12)]">
                <div className="relative z-10">
                  {/* Screenshot */}
                  <div className="relative aspect-[16/10] overflow-hidden rounded-t-[inherit]">
                    {example.isPlaceholder ? (
                      <div className="absolute inset-0 bg-foreground/[0.03] flex items-center justify-center">
                        <span className="text-sm text-foreground/20 font-mono">
                          Coming soon
                        </span>
                      </div>
                    ) : (
                      <Image
                        src={example.screenshot}
                        alt={example.title}
                        fill
                        className="object-cover object-top transition-transform duration-700 ease-in-out group-hover/example:scale-[1.05]"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    )}
                    {/* Fallback for missing images */}
                    <div className="absolute inset-0 flex items-center justify-center bg-foreground/[0.02]">
                      <span className="text-sm text-foreground/15 font-mono">
                        {example.title}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-8">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg md:text-xl font-bold text-foreground">
                        {example.title}
                      </h3>
                      {example.link && !example.isPlaceholder && (
                        <a
                          href={example.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-foreground/40 hover:text-accent-primary transition-colors duration-700"
                          aria-label={`Visiter ${example.title}`}
                        >
                          <ExternalLink className="w-5 h-5" />
                        </a>
                      )}
                    </div>

                    <p className="text-sm md:text-base leading-relaxed text-foreground/60 mb-5">
                      {example.description}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2">
                      {example.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-sm font-mono px-3 py-1.5 rounded-full border border-foreground/10 bg-foreground/[0.03] text-foreground/50 transition-colors duration-700 hover:border-foreground/20"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </SpotlightCard>
            </BlurReveal>
          ))}
        </div>
      </div>
    </Section>
  );
}

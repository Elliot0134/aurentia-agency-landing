"use client";

import { useRef } from "react";
import { Section } from "@/components/ui/Section";
import { SectionBackground } from "@/components/ui/SectionBackground";
import { TextGradientReveal } from "@/components/animations/TextGradientReveal";
import { BlurReveal } from "@/components/animations/BlurReveal";
import { InfiniteMarquee } from "@/components/animations/InfiniteMarquee";
import { vitrineContent } from "@/data/landing-pages-content";

/* ── Larger browser mockup frame ──────────────────── */
function BrowserMockup({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-foreground/10 bg-foreground/[0.02] overflow-hidden shadow-2xl shadow-foreground/[0.05]">
      {/* Title bar */}
      <div className="flex items-center gap-2 px-5 py-3.5 border-b border-foreground/5 bg-foreground/[0.03]">
        <div className="flex gap-2">
          <span className="w-3 h-3 rounded-full bg-foreground/10" />
          <span className="w-3 h-3 rounded-full bg-foreground/10" />
          <span className="w-3 h-3 rounded-full bg-foreground/10" />
        </div>
        <div className="flex-1 flex justify-center">
          <span className="text-sm text-foreground/30 font-mono px-5 py-1.5 rounded-lg bg-foreground/[0.03] border border-foreground/5">
            savistas.fr
          </span>
        </div>
        <div className="w-[62px]" /> {/* Spacer to balance dots */}
      </div>
      {/* Content area */}
      <div className="relative">{children}</div>
    </div>
  );
}

export function LandingPagesVitrine() {
  const sectionRef = useRef<HTMLDivElement>(null);

  return (
    <Section className="py-28 md:py-36 min-h-[60vh] relative">
      <SectionBackground variant="base" />

      <div ref={sectionRef} className="relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 md:mb-16">
          <BlurReveal>
            <span className="inline-block text-sm font-mono uppercase tracking-widest px-5 py-2.5 rounded-full border border-foreground/10 bg-foreground/5 text-foreground/70 mb-8">
              {vitrineContent.badge}
            </span>
          </BlurReveal>

          <TextGradientReveal
            text={vitrineContent.title}
            elementType="h2"
            className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-6 justify-center"
          />

          <BlurReveal delay={0.2}>
            <p className="text-lg md:text-xl text-foreground/60">
              {vitrineContent.subtitle}
            </p>
          </BlurReveal>
        </div>

        {/* Browser frame — larger and more prominent */}
        <BlurReveal delay={0.3} className="max-w-5xl mx-auto mb-3">
          <BrowserMockup>
            <div
              className="relative bg-foreground/[0.02] overflow-hidden"
              style={{ paddingBottom: `${(900 / 1440) * 100}%` }}
            >
              <iframe
                src="https://www.savistas.fr/"
                title="Savistas — Notre vitrine"
                className="absolute top-0 left-0 border-0 origin-top-left [&]:cursor-none"
                width={1440}
                height={900}
                loading="lazy"
                sandbox="allow-scripts allow-same-origin"
                ref={(el) => {
                  if (!el) return;
                  const parent = el.parentElement;
                  if (!parent) return;
                  const update = () => {
                    const scale = parent.offsetWidth / 1440;
                    el.style.transform = `scale(${scale})`;
                  };
                  update();
                  const observer = new ResizeObserver(update);
                  observer.observe(parent);
                }}
              />
            </div>
          </BrowserMockup>
        </BlurReveal>

        {/* Marquee callouts */}
        <BlurReveal delay={0.4} className="max-w-5xl mx-auto mb-14">
          <InfiniteMarquee
            items={vitrineContent.callouts.map((c) => c.label)}
            className="text-sm font-medium text-foreground/60"
          />
        </BlurReveal>

        {/* Closing */}
        <BlurReveal delay={0.4}>
          <p className="text-center text-xl md:text-2xl font-semibold text-foreground/80 italic">
            {vitrineContent.closing}
          </p>
        </BlurReveal>
      </div>
    </Section>
  );
}

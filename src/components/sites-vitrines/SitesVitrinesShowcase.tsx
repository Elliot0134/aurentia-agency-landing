"use client";

import { Section } from "@/components/ui/Section";
import { SectionBackground } from "@/components/ui/SectionBackground";
import { BlurReveal } from "@/components/animations/BlurReveal";
import { BrowserMockup } from "@/components/shared/BrowserMockup";
import { PhoneMockup } from "@/components/shared/PhoneMockup";

export function SitesVitrinesShowcase() {
  return (
    <Section id="showcase">
      <SectionBackground variant="alt" />

      <div className="relative z-10">
        <div className="text-center max-w-4xl mx-auto mb-10 md:mb-14">
          <BlurReveal>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-heading font-bold tracking-tight text-foreground">
              Un exemple vaut mieux qu&apos;un long discours
            </h2>
          </BlurReveal>
          <BlurReveal delay={0.15}>
            <p className="mt-4 text-base md:text-lg text-foreground/60 leading-relaxed">
              Naviguez librement sur ce site que nous avons conçu. Design unique, performance native, SEO intégré.
            </p>
          </BlurReveal>
        </div>

        <BlurReveal delay={0.25}>
          <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-8 lg:gap-10">
            {/* Desktop mockup */}
            <div className="flex-1 w-full min-w-0">
              <BrowserMockup
                embedUrl="https://maison-enileh.vercel.app/"
                url="maison-enileh.com"
              />
            </div>

            {/* Phone mockup */}
            <div className="flex-shrink-0">
              <PhoneMockup embedUrl="https://maison-enileh.vercel.app/" />
            </div>
          </div>
        </BlurReveal>
      </div>
    </Section>
  );
}

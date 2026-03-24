"use client";

import { Section } from "@/components/ui/Section";
import { TextGradientReveal } from "@/components/animations/TextGradientReveal";
import { AuroraBackground } from "@/components/animations/AuroraBackground";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { BlurReveal } from "@/components/animations/BlurReveal";
import { SectionBackground } from "@/components/ui/SectionBackground";
import {
  conciergeriesCtaContent,
  conciergeriesSiteConfig,
} from "@/data/conciergeries-content";

export function ConciergerieCTA() {
  const { title, subtitle, cta, proofs, ps } = conciergeriesCtaContent;
  const bookingUrl = conciergeriesSiteConfig.bookingUrl;

  return (
    <Section
      theme="dark"
      className="relative py-40 flex flex-col items-center justify-center text-center overflow-hidden border-t-0"
    >
      {/* MAXIMUM intensity gradient mesh — double orb opacities */}
      <SectionBackground
        orbs={[
          { color: "orange", position: "top-[10%] left-[15%]", size: "w-[600px] h-[600px]", opacity: "[0.20]" },
          { color: "ambre", position: "bottom-[15%] right-[10%]", size: "w-[550px] h-[550px]", opacity: "[0.16]" },
          { color: "rose", position: "top-[40%] right-[30%]", size: "w-[500px] h-[500px]", opacity: "[0.12]" },
          { color: "violet", position: "bottom-[30%] left-[25%]", size: "w-[400px] h-[400px]", opacity: "[0.10]" },
          { color: "orange", position: "top-[60%] left-[60%]", size: "w-[450px] h-[450px]", opacity: "[0.14]" },
          { color: "cyan", position: "bottom-[50%] right-[40%]", size: "w-[350px] h-[350px]", opacity: "[0.08]" },
        ]}
      />

      <AuroraBackground intensity="strong" />

      <div className="relative z-10 max-w-3xl px-4 flex flex-col items-center">
        {/* Title — enlarged to text-6xl */}
        <TextGradientReveal
          text={title}
          elementType="h2"
          className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black tracking-tighter mb-8 leading-tight justify-center"
        />

        {/* Subtitle */}
        <BlurReveal delay={0.3}>
          <p className="text-lg md:text-xl text-foreground/70 font-medium mb-12 max-w-2xl">
            {subtitle}
          </p>
        </BlurReveal>

        {/* CTA button + proofs */}
        <BlurReveal
          delay={0.5}
          className="flex flex-col items-center gap-6 w-full"
        >
          <MagneticButton
            glow
            className="text-lg py-5 px-10"
            onClick={() => window.open(bookingUrl, "_blank")}
          >
            {cta} &rarr;
          </MagneticButton>

          {/* Proof points */}
          <div className="flex flex-wrap items-center justify-center gap-4 text-sm font-mono tracking-wider text-foreground/40 uppercase mt-4">
            {proofs.map((proof, idx) => (
              <div key={idx} className="flex items-center gap-4">
                <span>{proof}</span>
                {idx !== proofs.length - 1 && <span>&bull;</span>}
              </div>
            ))}
          </div>

          {/* P.S. */}
          {ps && (
            <p className="text-foreground/30 text-sm mt-8 max-w-lg italic">
              P.S. {ps}
            </p>
          )}
        </BlurReveal>
      </div>
    </Section>
  );
}

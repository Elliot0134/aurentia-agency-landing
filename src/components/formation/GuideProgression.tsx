import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { BlurReveal } from "@/components/animations/BlurReveal";
import { TextReveal } from "@/components/animations/TextReveal";
import { progressionLevels } from "@/data/guide-demarrage-content";

export function GuideProgression() {
  return (
    <Section theme="dark" className="relative overflow-hidden">
      {/* Background accent */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 60% 50% at 50% 100%, rgba(201,100,66,0.05), transparent)",
        }}
      />

      <div className="relative z-10 flex flex-col items-center gap-12">
        {/* Header */}
        <div className="text-center">
          <BlurReveal className="mb-4">
            <span className="inline-block px-4 py-1.5 rounded-full text-sm font-semibold tracking-widest bg-foreground/5 text-foreground/60 border border-foreground/10">
              VOTRE PARCOURS
            </span>
          </BlurReveal>
          <TextReveal
            text="De débutant à expert Claude AI"
            elementType="h2"
            className="text-3xl md:text-4xl font-black tracking-tight justify-center"
          />
          <BlurReveal>
            <p className="text-foreground/45 mt-4 max-w-xl mx-auto">
              Trois niveaux. Un chemin clair. Progressez à votre rythme.
            </p>
          </BlurReveal>
        </div>

        {/* Levels — connected visually */}
        <BlurReveal className="w-full max-w-4xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-0 relative">
            {/* Connector line — desktop only */}
            <div className="hidden md:block absolute top-[52px] left-[33%] right-[33%] h-px bg-foreground/10 z-0" />

            {progressionLevels.map((level, i) => (
              <div key={i} className="flex flex-col items-center text-center relative z-10 px-4">
                {/* Level circle */}
                <div
                  className={`w-[104px] h-[104px] rounded-full flex flex-col items-center justify-center border-2 mb-5 transition-all duration-700 ${
                    level.isCurrentPage
                      ? `${level.borderColor} ${level.bgColor}`
                      : "border-foreground/10 bg-foreground/[0.02]"
                  }`}
                >
                  <span className={`text-3xl font-black ${level.isCurrentPage ? level.color : "text-foreground/25"}`}>
                    {level.number}
                  </span>
                  <span className={`text-xs font-bold tracking-wider uppercase mt-0.5 ${level.isCurrentPage ? level.color : "text-foreground/25"}`}>
                    {level.label}
                  </span>
                </div>

                {/* Content */}
                <div className="flex flex-col gap-2 mb-4">
                  <h3 className={`text-xl font-black ${level.isCurrentPage ? "text-foreground/90" : "text-foreground/50"}`}>
                    {level.level}
                  </h3>
                  <p className="text-sm text-foreground/40 leading-relaxed max-w-[200px] mx-auto">
                    {level.description}
                  </p>
                </div>

                {/* Resource link */}
                {level.isCurrentPage ? (
                  <span
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-semibold border ${level.borderColor} ${level.bgColor} ${level.color}`}
                  >
                    Vous êtes ici
                  </span>
                ) : (
                  <Link
                    href={level.resourceLink}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium border border-foreground/10 text-foreground/50 hover:border-foreground/25 hover:text-foreground/80 transition-all duration-500"
                  >
                    {level.resource}
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                )}

                {/* Mobile connector arrow */}
                {i < progressionLevels.length - 1 && (
                  <div className="md:hidden text-foreground/15 text-2xl mt-4">↓</div>
                )}
              </div>
            ))}
          </div>
        </BlurReveal>
      </div>
    </Section>
  );
}

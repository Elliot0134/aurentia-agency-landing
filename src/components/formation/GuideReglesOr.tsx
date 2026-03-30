import { X, Check } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { BlurReveal } from "@/components/animations/BlurReveal";
import { TextReveal } from "@/components/animations/TextReveal";
import { reglesOr } from "@/data/guide-demarrage-content";

export function GuideReglesOr() {
  return (
    <Section theme="dark" className="relative">
      {/* Subtle glow */}
      <div
        className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: "var(--accent)", filter: "blur(200px)", opacity: 0.04 }}
      />

      <div className="relative z-10 flex flex-col gap-12">
        {/* Header */}
        <div className="text-center">
          <BlurReveal className="mb-4">
            <span className="inline-block px-4 py-1.5 rounded-full text-sm font-semibold tracking-widest bg-foreground/5 text-foreground/60 border border-foreground/10">
              CHAPITRE 2
            </span>
          </BlurReveal>
          <TextReveal
            text="Les 5 règles d'or du prompting"
            elementType="h2"
            className="text-3xl md:text-4xl font-black tracking-tight justify-center"
          />
          <BlurReveal>
            <p className="text-foreground/45 mt-4 max-w-xl mx-auto">
              Appliquez ces 5 principes et vos résultats avec Claude s&apos;améliorent immédiatement.
            </p>
          </BlurReveal>
        </div>

        {/* Rules */}
        <div className="flex flex-col gap-5">
          {reglesOr.map((regle, i) => (
            <BlurReveal key={i} delay={i * 0.05}>
              <div className="rounded-2xl border border-foreground/10 bg-foreground/[0.02] overflow-hidden">
                {/* Rule header */}
                <div className="flex items-start gap-4 p-5 pb-4">
                  <span className="shrink-0 w-10 h-10 rounded-xl bg-accent-primary/10 border border-accent-primary/20 flex items-center justify-center text-sm font-black font-mono text-accent-primary">
                    {regle.number}
                  </span>
                  <div>
                    <h3 className="font-black text-foreground/90 text-lg">{regle.rule}</h3>
                    <p className="text-sm text-foreground/45 mt-0.5 leading-snug">{regle.explanation}</p>
                  </div>
                </div>

                {/* Bad → Good examples */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 p-5 pt-0">
                  {/* Bad */}
                  <div className="rounded-xl border border-red-400/20 bg-red-400/[0.04] p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <X className="w-3.5 h-3.5 text-red-400 shrink-0" />
                      <span className="text-xs font-bold tracking-widest uppercase text-red-400">À éviter</span>
                    </div>
                    <p className="text-sm text-foreground/55 font-mono leading-relaxed">{regle.bad}</p>
                  </div>
                  {/* Good */}
                  <div className="rounded-xl border border-emerald-400/20 bg-emerald-400/[0.04] p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span className="text-xs font-bold tracking-widest uppercase text-emerald-400">Ce qui marche</span>
                    </div>
                    <p className="text-sm text-foreground/70 font-mono leading-relaxed">{regle.good}</p>
                  </div>
                </div>
              </div>
            </BlurReveal>
          ))}
        </div>
      </div>
    </Section>
  );
}

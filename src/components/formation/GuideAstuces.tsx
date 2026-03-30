import { Section } from "@/components/ui/Section";
import { SpotlightCard } from "@/components/animations/SpotlightCard";
import { BlurReveal } from "@/components/animations/BlurReveal";
import { TextReveal } from "@/components/animations/TextReveal";
import { astucesPro } from "@/data/guide-demarrage-content";

export function GuideAstuces() {
  return (
    <Section theme="dark-alt" className="relative">
      <div className="flex flex-col gap-12">
        {/* Header */}
        <div className="text-center">
          <BlurReveal className="mb-4">
            <span className="inline-block px-4 py-1.5 rounded-full text-sm font-semibold tracking-widest bg-foreground/5 text-foreground/60 border border-foreground/10">
              CHAPITRE 5
            </span>
          </BlurReveal>
          <TextReveal
            text="3 astuces pro"
            elementType="h2"
            className="text-3xl md:text-4xl font-black tracking-tight justify-center"
          />
          <BlurReveal>
            <p className="text-foreground/45 mt-4 max-w-xl mx-auto">
              Ce que font les utilisateurs avancés et que les débutants ignorent.
            </p>
          </BlurReveal>
        </div>

        {/* Tips */}
        <BlurReveal className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {astucesPro.map((astuce, i) => (
            <SpotlightCard key={i} className="p-6 flex flex-col gap-4">
              {/* Number */}
              <div className="relative z-10 flex items-center gap-3">
                <span className="text-4xl font-black font-mono text-foreground/10">{astuce.number}</span>
                <div className="h-px flex-1 bg-foreground/10" />
              </div>
              {/* Content */}
              <h3 className="relative z-10 font-black text-foreground/90 leading-snug">{astuce.title}</h3>
              <p className="relative z-10 text-sm text-foreground/50 leading-relaxed">{astuce.description}</p>
              {/* Example */}
              <div className="relative z-10 rounded-xl bg-foreground/[0.04] border border-foreground/10 p-3 mt-auto">
                <p className="text-xs font-bold tracking-widest uppercase text-foreground/30 mb-1">Exemple concret</p>
                <p className="text-sm text-foreground/55 italic leading-relaxed">{astuce.example}</p>
              </div>
            </SpotlightCard>
          ))}
        </BlurReveal>
      </div>
    </Section>
  );
}

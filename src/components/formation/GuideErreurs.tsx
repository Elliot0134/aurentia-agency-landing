import { XCircle } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { BlurReveal } from "@/components/animations/BlurReveal";
import { TextReveal } from "@/components/animations/TextReveal";
import { erreursDébutant } from "@/data/guide-demarrage-content";

export function GuideErreurs() {
  return (
    <Section theme="dark" className="relative">
      <div className="flex flex-col gap-12">
        {/* Header */}
        <div className="text-center">
          <BlurReveal className="mb-4">
            <span className="inline-block px-4 py-1.5 rounded-full text-sm font-semibold tracking-widest bg-foreground/5 text-foreground/60 border border-foreground/10">
              CHAPITRE 4
            </span>
          </BlurReveal>
          <TextReveal
            text="5 erreurs de débutant à éviter"
            elementType="h2"
            className="text-3xl md:text-4xl font-black tracking-tight justify-center"
          />
          <BlurReveal>
            <p className="text-foreground/45 mt-4 max-w-xl mx-auto">
              Ces erreurs vous feront perdre du temps et vous décourageront. Lisez ça, économisez des semaines de tâtonnements.
            </p>
          </BlurReveal>
        </div>

        {/* Errors grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {erreursDébutant.map((erreur, i) => (
            <BlurReveal key={i} delay={i * 0.07}>
              <div className="h-full rounded-2xl border border-red-400/15 bg-red-400/[0.03] p-5 flex flex-col gap-3">
                {/* Icon + number */}
                <div className="flex items-center gap-2">
                  <XCircle className="w-5 h-5 text-red-400 shrink-0" />
                  <span className="text-xs font-mono font-bold text-red-400/70 tracking-widest">
                    ERREUR {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                {/* Title */}
                <h3 className="font-black text-foreground/85">{erreur.title}</h3>
                {/* Piège */}
                <div className="rounded-xl bg-foreground/[0.03] border border-foreground/10 p-3">
                  <p className="text-xs font-bold tracking-widest uppercase text-red-400/70 mb-1">Le piège</p>
                  <p className="text-sm text-foreground/55 leading-relaxed">{erreur.piège}</p>
                </div>
                {/* Solution */}
                <div className="rounded-xl bg-emerald-400/[0.04] border border-emerald-400/15 p-3">
                  <p className="text-xs font-bold tracking-widest uppercase text-emerald-400/80 mb-1">La solution</p>
                  <p className="text-sm text-foreground/65 leading-relaxed">{erreur.solution}</p>
                </div>
              </div>
            </BlurReveal>
          ))}
        </div>
      </div>
    </Section>
  );
}

import { Section } from "@/components/ui/Section";
import { BlurReveal } from "@/components/animations/BlurReveal";
import { TextReveal } from "@/components/animations/TextReveal";
import { CopyBlock } from "./CopyBlock";
import { readyPrompts } from "@/data/guide-demarrage-content";

export function GuidePrompts() {
  return (
    <Section theme="dark-alt" className="relative">
      <div className="flex flex-col gap-12">
        {/* Header */}
        <div className="text-center">
          <BlurReveal className="mb-4">
            <span className="inline-block px-4 py-1.5 rounded-full text-sm font-semibold tracking-widest bg-foreground/5 text-foreground/60 border border-foreground/10">
              CHAPITRE 3
            </span>
          </BlurReveal>
          <TextReveal
            text="10 prompts prêts à l'emploi"
            elementType="h2"
            className="text-3xl md:text-4xl font-black tracking-tight justify-center"
          />
          <BlurReveal>
            <p className="text-foreground/45 mt-4 max-w-xl mx-auto">
              Copiez, adaptez les variables en majuscules, et envoyez. C&apos;est tout.
            </p>
          </BlurReveal>
        </div>

        {/* Grid : 1 col mobile, 2 col desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {readyPrompts.map((prompt, i) => (
            <BlurReveal key={prompt.id} delay={i * 0.04}>
              <div className="flex flex-col gap-3">
                {/* Prompt header */}
                <div className="flex items-center gap-3">
                  <span className="shrink-0 w-8 h-8 rounded-lg bg-foreground/5 border border-foreground/10 flex items-center justify-center text-xs font-black font-mono text-foreground/40">
                    {prompt.number}
                  </span>
                  <div>
                    <p className="font-bold text-foreground/90">{prompt.title}</p>
                    <p className="text-xs text-foreground/40">{prompt.useCase}</p>
                  </div>
                </div>
                {/* Code block */}
                <CopyBlock content={prompt.content} />
              </div>
            </BlurReveal>
          ))}
        </div>

        {/* Tip */}
        <BlurReveal>
          <div className="rounded-2xl border border-foreground/10 bg-foreground/[0.02] p-5 flex gap-4 items-start max-w-2xl mx-auto">
            <span className="text-2xl shrink-0">💡</span>
            <div>
              <p className="font-semibold text-foreground/80 text-sm">Astuce pour aller plus loin</p>
              <p className="text-sm text-foreground/45 mt-1 leading-relaxed">
                Chacun de ces prompts est un point de départ. Après la première réponse, affinez :
                &quot;C&apos;est bien mais rends-le plus court&quot; ou &quot;Donne-moi 3 variantes&quot;. L&apos;itération, c&apos;est là que ça devient puissant.
              </p>
            </div>
          </div>
        </BlurReveal>
      </div>
    </Section>
  );
}

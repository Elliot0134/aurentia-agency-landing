import { Globe, Monitor, Terminal } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { SpotlightCard } from "@/components/animations/SpotlightCard";
import { BlurReveal } from "@/components/animations/BlurReveal";
import { TextReveal } from "@/components/animations/TextReveal";

const steps = [
  {
    icon: Globe,
    number: "01",
    title: "Sur claude.ai",
    description:
      "Créez un nouveau Project. Dans les instructions du projet, collez le skill. Claude l'utilisera automatiquement dans chaque conversation du projet.",
  },
  {
    icon: Monitor,
    number: "02",
    title: "Sur Claude Desktop",
    description:
      "Ouvrez les réglages → Skills → Ajoutez un skill personnalisé. Collez le contenu. Claude l'applique dans toutes vos sessions.",
  },
  {
    icon: Terminal,
    number: "03",
    title: "Dans Claude Code",
    description:
      "Créez un fichier CLAUDE.md à la racine de votre projet. Collez les instructions du skill dedans. Claude Code les lira automatiquement.",
  },
];

export function Skills20InstallGuide() {
  return (
    <Section theme="dark-alt" className="relative">
      <div className="flex flex-col items-center gap-12">
        {/* Header */}
        <div className="text-center max-w-2xl">
          <BlurReveal className="mb-4">
            <span className="inline-block px-4 py-1.5 rounded-full text-sm font-semibold tracking-widest bg-foreground/5 text-foreground/60 border border-foreground/10">
              INSTALLATION
            </span>
          </BlurReveal>
          <TextReveal
            text="Comment utiliser ces skills"
            elementType="h2"
            className="text-3xl md:text-4xl font-black tracking-tight justify-center"
          />
        </div>

        {/* Cards */}
        <BlurReveal className="w-full grid grid-cols-1 md:grid-cols-3 gap-5">
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <SpotlightCard key={i} className="p-6 flex flex-col gap-4">
                <div className="relative z-10 flex items-start gap-4">
                  <div className="shrink-0 w-11 h-11 rounded-xl bg-foreground/5 border border-foreground/10 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-accent-primary" />
                  </div>
                  <span className="text-foreground/15 font-black text-3xl font-mono leading-none mt-1">
                    {step.number}
                  </span>
                </div>
                <div className="relative z-10">
                  <h3 className="font-bold text-foreground/90 mb-2">{step.title}</h3>
                  <p className="text-sm text-foreground/50 leading-relaxed">{step.description}</p>
                </div>
              </SpotlightCard>
            );
          })}
        </BlurReveal>

        {/* Note */}
        <BlurReveal>
          <p className="text-sm text-foreground/35 text-center max-w-lg">
            Chaque méthode fonctionne immédiatement. Pas besoin de configurer quoi que ce soit d&apos;autre.
          </p>
        </BlurReveal>
      </div>
    </Section>
  );
}

import {
  FileText, Code, Search, Lightbulb, BarChart, MessageSquare, Settings, BookOpen,
  Globe, Monitor, Smartphone, Check, Minus,
} from "lucide-react";
import { Section } from "@/components/ui/Section";
import { SpotlightCard } from "@/components/animations/SpotlightCard";
import { BlurReveal } from "@/components/animations/BlurReveal";
import { TextReveal } from "@/components/animations/TextReveal";
import {
  claudeVsChatgpt,
  claudeCapabilities,
  claudeAccess,
} from "@/data/guide-demarrage-content";

const capabilityIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  FileText, Code, Search, Lightbulb, BarChart, MessageSquare, Settings, BookOpen,
};

const accessIcons = [Globe, Monitor, Smartphone];

export function GuideClaude() {
  return (
    <Section theme="dark-alt" className="relative">
      <div className="flex flex-col gap-16">

        {/* Header */}
        <div className="text-center">
          <BlurReveal className="mb-4">
            <span className="inline-block px-4 py-1.5 rounded-full text-sm font-semibold tracking-widest bg-foreground/5 text-foreground/60 border border-foreground/10">
              CHAPITRE 1
            </span>
          </BlurReveal>
          <TextReveal
            text="C'est quoi Claude AI ?"
            elementType="h2"
            className="text-3xl md:text-4xl font-black tracking-tight justify-center"
          />
          <BlurReveal>
            <p className="text-foreground/45 mt-4 max-w-2xl mx-auto leading-relaxed">
              Claude est un assistant IA créé par Anthropic. Conçu pour être utile, inoffensif et honnête —
              avec une capacité exceptionnelle à comprendre des instructions complexes et à produire du contenu de qualité.
            </p>
          </BlurReveal>
        </div>

        {/* Ce que Claude sait faire */}
        <div>
          <BlurReveal className="mb-6">
            <h3 className="text-xl font-bold text-foreground/80 text-center">Ce que Claude sait faire</h3>
          </BlurReveal>
          <BlurReveal className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {claudeCapabilities.map((cap, i) => {
              const Icon = capabilityIcons[cap.icon];
              return (
                <SpotlightCard key={i} className="p-4 flex flex-col items-center gap-3 text-center">
                  <div className="relative z-10 w-10 h-10 rounded-xl bg-foreground/5 border border-foreground/10 flex items-center justify-center">
                    {Icon && <Icon className="w-5 h-5 text-accent-primary" />}
                  </div>
                  <p className="relative z-10 text-sm text-foreground/60 leading-snug">{cap.text}</p>
                </SpotlightCard>
              );
            })}
          </BlurReveal>
        </div>

        {/* Claude vs ChatGPT */}
        <div>
          <BlurReveal className="mb-6">
            <h3 className="text-xl font-bold text-foreground/80 text-center">Claude vs ChatGPT</h3>
          </BlurReveal>
          <BlurReveal>
            <div className="rounded-2xl border border-foreground/10 overflow-hidden">
              {/* Table header */}
              <div className="grid grid-cols-3 bg-foreground/[0.04] border-b border-foreground/10">
                <div className="p-4 text-sm font-semibold text-foreground/40 tracking-wide uppercase">Critère</div>
                <div className="p-4 text-sm font-semibold text-accent-primary text-center tracking-wide uppercase border-l border-foreground/10">Claude</div>
                <div className="p-4 text-sm font-semibold text-foreground/50 text-center tracking-wide uppercase border-l border-foreground/10">ChatGPT</div>
              </div>
              {/* Rows */}
              {claudeVsChatgpt.map((row, i) => (
                <div
                  key={i}
                  className="grid grid-cols-3 border-b border-foreground/[0.06] last:border-0 hover:bg-foreground/[0.02] transition-colors duration-500"
                >
                  <div className="p-4 text-sm text-foreground/60 flex items-center">{row.feature}</div>
                  <div className={`p-4 text-sm text-center flex items-center justify-center gap-2 border-l border-foreground/10 ${row.winner === "claude" ? "text-emerald-400" : "text-foreground/50"}`}>
                    {row.winner === "claude" && <Check className="w-3.5 h-3.5 shrink-0" />}
                    {row.winner === "draw" && <Minus className="w-3.5 h-3.5 shrink-0 text-foreground/30" />}
                    <span className="leading-snug">{row.claude}</span>
                  </div>
                  <div className={`p-4 text-sm text-center flex items-center justify-center gap-2 border-l border-foreground/10 ${row.winner === "chatgpt" ? "text-emerald-400" : "text-foreground/50"}`}>
                    {row.winner === "chatgpt" && <Check className="w-3.5 h-3.5 shrink-0" />}
                    {row.winner === "draw" && <Minus className="w-3.5 h-3.5 shrink-0 text-foreground/30" />}
                    <span className="leading-snug">{row.chatgpt}</span>
                  </div>
                </div>
              ))}
            </div>
          </BlurReveal>
        </div>

        {/* Comment accéder */}
        <div>
          <BlurReveal className="mb-6">
            <h3 className="text-xl font-bold text-foreground/80 text-center">Comment accéder à Claude</h3>
          </BlurReveal>
          <BlurReveal className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {claudeAccess.map((access, i) => {
              const Icon = accessIcons[i];
              return (
                <SpotlightCard key={i} className="p-5 flex flex-col gap-3">
                  <div className="relative z-10 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-foreground/5 border border-foreground/10 flex items-center justify-center shrink-0">
                      <Icon className="w-5 h-5 text-foreground/50" />
                    </div>
                    <p className="font-bold text-foreground/90">{access.platform}</p>
                  </div>
                  <p className="relative z-10 text-sm text-foreground/50 leading-relaxed">{access.desc}</p>
                  <span className="relative z-10 self-start px-2.5 py-0.5 rounded-full text-xs font-medium bg-foreground/5 border border-foreground/10 text-foreground/40">
                    {access.badge}
                  </span>
                </SpotlightCard>
              );
            })}
          </BlurReveal>
        </div>

      </div>
    </Section>
  );
}

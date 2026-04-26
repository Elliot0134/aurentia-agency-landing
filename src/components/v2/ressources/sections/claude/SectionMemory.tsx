// src/components/v2/ressources/sections/claude/SectionMemory.tsx
import { memoryProfilePrompt, memorySetupSteps } from "@/data/v2/implementer-claude";
import { CopyableBlock } from "../../CopyableBlock";

export function SectionMemory() {
  return (
    <div className="flex flex-col gap-8">
      <p className="text-base text-foreground/70 md:text-lg">
        Memory, c&apos;est ce qui transforme Claude d&apos;un assistant amnésique en{" "}
        <strong className="text-foreground">collègue qui te connaît</strong>. Différenciateur clé vs ChatGPT :
        le dashboard est <strong className="text-foreground">100% transparent</strong>, tu vois tout ce qui est
        retenu, tu peux éditer / supprimer en un clic.
      </p>

      {/* Steps */}
      <div className="grid gap-3 md:grid-cols-2">
        {memorySetupSteps.map((s) => (
          <div
            key={s.step}
            className="flex gap-4 rounded-2xl border border-foreground/10 bg-foreground/[0.02] p-5"
          >
            <span className="font-heading text-2xl font-bold text-accent-primary">{s.step}</span>
            <div className="flex flex-col gap-1">
              <p className="text-base font-semibold text-foreground">{s.title}</p>
              <p className="text-sm leading-relaxed text-foreground/65">{s.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Profile prompt */}
      <CopyableBlock
        title="Le prompt fiche profil Memory"
        description="Premier prompt à donner après activation. Claude pose les bonnes questions et sauvegarde ton profil business proprement."
        language="markdown"
        content={memoryProfilePrompt}
      />

      {/* Note import */}
      <div className="rounded-2xl border border-accent-primary/25 bg-accent-primary/[0.05] p-5">
        <p className="text-sm font-semibold uppercase tracking-[0.14em] text-accent-primary">Anti lock-in</p>
        <p className="mt-2 text-base text-foreground/80">
          Si tu viens de ChatGPT, Gemini ou Grok :{" "}
          <strong className="font-semibold text-foreground">
            Settings → Import history → upload du ZIP export
          </strong>
          . Claude ingère tout, construit ta Memory, et tu repars d&apos;où tu en étais. 10 minutes. Anthropic
          assume l&apos;anti-lock-in — c&apos;est documenté.
        </p>
      </div>
    </div>
  );
}

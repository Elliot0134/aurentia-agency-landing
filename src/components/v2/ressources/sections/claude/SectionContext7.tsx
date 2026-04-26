// src/components/v2/ressources/sections/claude/SectionContext7.tsx
import { AlertTriangle, Check } from "lucide-react";
import { context7InstallCommand, context7UsagePrompt } from "@/data/v2/implementer-claude";
import { CopyableBlock } from "../../CopyableBlock";

export function SectionContext7() {
  return (
    <div className="flex flex-col gap-8">
      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-3xl border border-[var(--destructive)]/30 bg-[var(--destructive)]/[0.05] p-6">
          <div className="flex items-center gap-2">
            <AlertTriangle className="size-5 text-[var(--destructive)]" aria-hidden />
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[var(--destructive)]">
              Sans context7
            </p>
          </div>
          <p className="mt-3 text-base text-foreground/80">
            Claude utilise sa <strong>training data</strong> — qui peut dater de 6-18 mois. Sur Next.js, React,
            Tailwind, Supabase, ça change tous les 3 mois. Résultat : du code qui marche en théorie, qui pète
            en prod sur les nouvelles APIs.
          </p>
        </div>
        <div className="rounded-3xl border border-accent-primary/30 bg-accent-primary/[0.05] p-6">
          <div className="flex items-center gap-2">
            <Check className="size-5 text-accent-primary" aria-hidden />
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-accent-primary">
              Avec context7
            </p>
          </div>
          <p className="mt-3 text-base text-foreground/80">
            Claude lit la <strong>doc officielle live</strong> de la lib avant de coder. Plus de pattern
            obsolète, plus d&apos;API dépréciée. Non négociable en 2026 sur tout projet sérieux.
          </p>
        </div>
      </div>

      <CopyableBlock
        title="Installer context7"
        description="Une commande, et Claude Code a toujours la doc à jour des libs."
        language="bash"
        content={context7InstallCommand}
      />

      <CopyableBlock
        title="Le prompt type qui force l'usage"
        description="À mettre dans tout brief technique. Le 'use context7' active le MCP, le reste guide la doc à fetcher."
        language="markdown"
        content={context7UsagePrompt}
      />
    </div>
  );
}

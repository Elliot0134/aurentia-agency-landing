// src/components/v2/ressources/sections/claude/SectionMcp.tsx
import { mcpServers } from "@/data/v2/implementer-claude";
import { CopyableBlock } from "../../CopyableBlock";

export function SectionMcp() {
  return (
    <div className="flex flex-col gap-8">
      <p className="text-base text-foreground/70 md:text-lg">
        Les <strong className="text-foreground">MCP servers</strong> branchent Claude à tes outils existants
        (DB, GitHub, Notion, Slack…). Concrètement : Claude peut <strong className="text-foreground">lire et
        écrire</strong> dans ces outils en langage naturel. Tu installes une fois, tu profites pour toujours.
      </p>

      <div className="flex flex-col gap-4">
        {mcpServers.map((m) => {
          const Icon = m.icon;
          return (
            <div
              key={m.name}
              className="flex flex-col gap-3 rounded-2xl border border-foreground/10 bg-foreground/[0.02] p-5"
            >
              <div className="flex items-start gap-3">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-accent-primary/10 text-accent-primary">
                  <Icon className="size-5" strokeWidth={1.7} aria-hidden />
                </div>
                <div className="flex flex-col gap-1">
                  <h4 className="font-heading text-base font-bold text-foreground md:text-lg">{m.name}</h4>
                  <p className="text-sm leading-relaxed text-foreground/65">{m.unlocks}</p>
                </div>
              </div>
              <CopyableBlock language="bash" content={m.command} />
            </div>
          );
        })}
      </div>

      <div className="rounded-2xl border border-foreground/10 bg-foreground/[0.02] p-5">
        <p className="text-sm font-semibold uppercase tracking-[0.14em] text-accent-primary">Notre reco</p>
        <p className="mt-2 text-base text-foreground/80">
          N&apos;installe pas les 10 d&apos;un coup. Démarre avec{" "}
          <strong className="font-semibold text-foreground">3 MCP critiques</strong> selon ta stack
          (typiquement : context7 + Notion/Linear + GitHub/Supabase). Ajoute le reste quand le besoin se fait
          sentir.
        </p>
      </div>
    </div>
  );
}

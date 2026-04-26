// src/components/v2/ressources/sections/claude/SectionProduits.tsx
import { ExternalLink } from "lucide-react";
import { claudeProducts } from "@/data/v2/implementer-claude";
import { CopyableBlock } from "../../CopyableBlock";

export function SectionProduits() {
  return (
    <div className="flex flex-col gap-8">
      <p className="text-base text-foreground/70 md:text-lg">
        Claude n&apos;est pas un chat — c&apos;est un écosystème de 6 produits cohérents. Voici lequel ouvrir maintenant
        selon ton profil. Chaque card a le lien d&apos;install direct.
      </p>

      <div className="grid gap-4 md:grid-cols-2">
        {claudeProducts.map((p) => {
          const Icon = p.icon;
          return (
            <div
              key={p.name}
              className="group flex flex-col gap-4 rounded-3xl border border-foreground/10 bg-foreground/[0.02] p-6 transition-all duration-500 ease-in-out hover:-translate-y-1 hover:border-accent-primary/30"
            >
              <div className="flex items-center gap-3">
                <div className="flex size-11 items-center justify-center rounded-2xl bg-accent-primary/10 text-accent-primary">
                  <Icon className="size-5" strokeWidth={1.7} aria-hidden />
                </div>
                <h3 className="font-heading text-lg text-foreground md:text-xl">{p.name}</h3>
              </div>
              <p className="text-sm leading-relaxed text-foreground/75">{p.tagline}</p>
              <p className="text-sm text-foreground/55">
                <strong className="font-semibold text-foreground/75">Pour qui :</strong> {p.forWho}
              </p>

              {p.installCommand && (
                <CopyableBlock language="bash" content={p.installCommand} />
              )}

              <a
                href={p.installHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 self-start rounded-full border border-foreground/15 px-4 py-2 text-sm font-semibold text-foreground transition-all duration-500 ease-in-out hover:gap-3 hover:border-accent-primary/40 hover:text-accent-primary"
              >
                {p.installLabel}
                <ExternalLink className="size-4" aria-hidden />
              </a>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// src/components/v2/ressources/sections/SectionRisques.tsx
import { securityStats, redListZones, willisonRule } from "@/data/v2/vibe-coding";

export function SectionRisques() {
  return (
    <div className="flex flex-col gap-8">
      {/* Trust gradient — où vibe-coder vs où reviewer */}
      <div className="rounded-3xl border border-foreground/10 bg-foreground/[0.02] p-6 md:p-8">
        <p className="mb-2 text-sm font-semibold uppercase tracking-[0.14em] text-accent-primary">
          Trust gradient
        </p>
        <h3 className="mb-6 font-heading text-xl text-foreground md:text-2xl">
          Où full-vibe est OK, où la review devient obligatoire
        </h3>

        <div className="relative">
          <div className="grid grid-cols-3 gap-2">
            {/* Safe */}
            <div className="rounded-l-xl rounded-r-sm bg-accent-primary/15 p-3 transition-colors duration-500 ease-in-out hover:bg-accent-primary/20">
              <p className="text-sm font-semibold text-accent-primary">Full vibe OK</p>
              <p className="mt-1 text-sm text-foreground/65">
                UI pure, internal tools, scripts, démos, landing pages
              </p>
            </div>
            {/* Mid */}
            <div className="rounded-sm bg-foreground/[0.06] p-3 transition-colors duration-500 ease-in-out hover:bg-foreground/[0.08]">
              <p className="text-sm font-semibold text-foreground">Review légère</p>
              <p className="mt-1 text-sm text-foreground/65">
                MVPs, dashboards, intégrations API non critiques
              </p>
            </div>
            {/* Danger */}
            <div className="rounded-l-sm rounded-r-xl bg-[var(--destructive)]/15 p-3 transition-colors duration-500 ease-in-out hover:bg-[var(--destructive)]/20">
              <p className="text-sm font-semibold text-[var(--destructive)]">Review obligatoire</p>
              <p className="mt-1 text-sm text-foreground/65">
                Auth, paiement, PII, migrations, infra, code legal
              </p>
            </div>
          </div>
          {/* Gradient bar under */}
          <div
            className="mt-3 h-1 rounded-full"
            style={{
              background:
                "linear-gradient(90deg, var(--accent) 0%, color-mix(in srgb, var(--accent) 40%, transparent) 33%, color-mix(in srgb, var(--foreground) 25%, transparent) 50%, color-mix(in srgb, var(--destructive) 50%, transparent) 67%, var(--destructive) 100%)",
            }}
            aria-hidden
          />
          <div className="mt-2 flex justify-between text-sm text-foreground/45">
            <span>Risque faible</span>
            <span>Risque élevé</span>
          </div>
        </div>
      </div>

      {/* Stats sécurité */}
      <div>
        <h3 className="mb-3 text-sm font-semibold uppercase tracking-[0.14em] text-[var(--destructive)]">
          Les chiffres à garder en tête
        </h3>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-5">
          {securityStats.map((s) => (
            <div
              key={s.label}
              className="rounded-xl border border-[var(--destructive)]/25 bg-[var(--destructive)]/[0.05] p-3"
            >
              <p className="font-heading text-xl font-bold text-[var(--destructive)] md:text-2xl">
                {s.value}
              </p>
              <p className="mt-1 text-sm leading-snug text-foreground/70">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Liste rouge */}
      <div>
        <h3 className="mb-3 text-sm font-semibold uppercase tracking-[0.14em] text-[var(--destructive)]">
          Liste rouge — review humaine obligatoire
        </h3>
        <ul className="grid gap-2 md:grid-cols-2">
          {redListZones.map((z) => {
            const Icon = z.icon;
            return (
              <li
                key={z.title}
                className="flex items-start gap-3 rounded-xl border border-foreground/10 p-3"
              >
                <Icon className="mt-0.5 size-4 shrink-0 text-[var(--destructive)]" aria-hidden />
                <div>
                  <p className="text-sm font-semibold text-foreground">{z.title}</p>
                  <p className="text-sm leading-snug text-foreground/60">{z.description}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Règle Willison */}
      <blockquote className="border-l-2 border-accent-primary pl-5">
        <p className="font-heading text-lg leading-snug text-foreground md:text-xl">
          « {willisonRule.fr} »
        </p>
        <footer className="mt-2 text-sm text-foreground/55">— {willisonRule.source}</footer>
      </blockquote>
    </div>
  );
}

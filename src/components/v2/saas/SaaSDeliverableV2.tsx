"use client";

import { GitBranch, FileCode2, FolderOpen, FileText, ShieldCheck, Activity, Zap, Lock } from "lucide-react";
import { SectionContainer } from "@/components/v2/shared/SectionContainer";
import { BlurReveal } from "@/components/animations/BlurReveal";

const deliverables = [
  {
    icon: GitBranch,
    title: "Repo Git propre",
    description: "Code lisible, branches structurées, commits atomiques. Vous reprenez la main quand vous voulez.",
  },
  {
    icon: FileCode2,
    title: "TypeScript strict partout",
    description: "Aucun `any`, types générés depuis Supabase, validation Zod aux frontières. Bugs détectés avant la prod.",
  },
  {
    icon: FileText,
    title: "Documentation à jour",
    description: "README, doc d'architecture, schéma DB, guide de setup. Onboarding d'un nouveau dev en 1h.",
  },
  {
    icon: Zap,
    title: "Preview deploys Vercel",
    description: "Une URL temporaire à chaque push. Vous suivez le développement en temps réel, pas en mode boîte noire.",
  },
  {
    icon: ShieldCheck,
    title: "RLS Supabase activé",
    description: "Sécurité au niveau de la base, pas seulement de l'app. Pas de fuite de données possible.",
  },
  {
    icon: Activity,
    title: "Monitoring inclus",
    description: "Logs, erreurs, performances. Vous voyez ce qui se passe en prod dès le jour 1.",
  },
];

const fileTree = [
  { name: "src/", level: 0, type: "folder" as const, open: true },
  { name: "app/", level: 1, type: "folder" as const, open: true },
  { name: "(dashboard)/", level: 2, type: "folder" as const },
  { name: "api/", level: 2, type: "folder" as const },
  { name: "page.tsx", level: 2, type: "file" as const },
  { name: "components/", level: 1, type: "folder" as const, open: true },
  { name: "ui/", level: 2, type: "folder" as const },
  { name: "shared/", level: 2, type: "folder" as const },
  { name: "lib/", level: 1, type: "folder" as const, open: true },
  { name: "supabase/", level: 2, type: "folder" as const },
  { name: "stripe/", level: 2, type: "folder" as const },
  { name: "utils.ts", level: 2, type: "file" as const },
  { name: "types/", level: 1, type: "folder" as const },
  { name: "supabase/", level: 0, type: "folder" as const, open: true },
  { name: "migrations/", level: 1, type: "folder" as const },
  { name: "config.toml", level: 1, type: "file" as const },
  { name: ".env.local", level: 0, type: "file" as const },
  { name: "README.md", level: 0, type: "file" as const },
  { name: "package.json", level: 0, type: "file" as const },
];

export function SaaSDeliverableV2() {
  return (
    <SectionContainer
      id="deliverable"
      eyebrow="Le jour de la livraison"
      title="Voilà ce que vous récupérez."
      subtitle="Pas un site mystère qu'on vous fait payer chaque modif. Un vrai produit, prêt à être repris par n'importe quel dev sérieux."
      className="py-20 md:py-24"
      titleClassName="text-3xl md:text-4xl lg:text-5xl mb-4 font-normal"
    >
      <div className="grid gap-8 lg:grid-cols-5">
        {/* Mockup VS Code-like — 2/5 sur desktop */}
        <BlurReveal className="lg:col-span-2">
          <div className="overflow-hidden rounded-[1.5rem] border border-foreground/10 bg-[#1e1e1e] shadow-2xl">
            {/* Window chrome */}
            <div className="flex items-center gap-2 border-b border-white/[0.06] bg-[#252526] px-4 py-3">
              <span className="size-3 rounded-full bg-[#ff5f57]" />
              <span className="size-3 rounded-full bg-[#febc2e]" />
              <span className="size-3 rounded-full bg-[#28c840]" />
              <span className="ml-3 flex items-center gap-1.5 text-sm text-white/55">
                <Lock className="size-3" strokeWidth={2} />
                votre-saas/repo
              </span>
            </div>
            {/* File tree */}
            <div className="flex">
              <div className="border-r border-white/[0.06] bg-[#252526] px-2 py-3">
                <div className="flex flex-col gap-0.5">
                  <span className="px-2 py-0.5 text-sm font-semibold uppercase tracking-wider text-white/40">
                    Explorer
                  </span>
                </div>
              </div>
              <ul className="flex-1 overflow-hidden p-3 font-mono text-sm leading-7">
                {fileTree.map((entry, i) => {
                  const Icon = entry.type === "folder" ? FolderOpen : FileCode2;
                  return (
                    <li
                      key={`${entry.name}-${i}`}
                      className="flex items-center gap-2 truncate text-white/70 transition-colors duration-300 hover:text-white"
                      style={{ paddingLeft: `${entry.level * 14}px` }}
                    >
                      <Icon
                        className="size-3.5 shrink-0 text-[#dcb67a]"
                        strokeWidth={1.75}
                      />
                      <span className="truncate">{entry.name}</span>
                    </li>
                  );
                })}
              </ul>
            </div>
            {/* Status bar */}
            <div className="flex items-center justify-between border-t border-white/[0.06] bg-accent-primary px-4 py-1.5 text-sm font-medium text-white">
              <span className="flex items-center gap-2">
                <GitBranch className="size-3" strokeWidth={2.5} />
                main
              </span>
              <span>TypeScript · 0 errors</span>
            </div>
          </div>
        </BlurReveal>

        {/* Deliverables grid — 3/5 sur desktop */}
        <div className="grid gap-4 sm:grid-cols-2 lg:col-span-3">
          {deliverables.map((item) => {
            const Icon = item.icon;
            return (
              <BlurReveal key={item.title}>
                <div className="group flex h-full flex-col gap-3 rounded-2xl border border-transparent bg-background-surface dark:border-foreground/10 dark:bg-foreground/[0.04] p-6 transition-colors duration-500 ease-in-out hover:shadow-sm dark:hover:border-foreground/25">
                  <div className="flex size-10 items-center justify-center rounded-xl bg-accent-primary/10 text-accent-primary transition-colors duration-500 group-hover:bg-accent-primary group-hover:text-white">
                    <Icon className="size-5" strokeWidth={1.75} />
                  </div>
                  <h3 className="font-heading text-base font-bold text-foreground">
                    {item.title}
                  </h3>
                  <p className="text-base text-foreground/65">{item.description}</p>
                </div>
              </BlurReveal>
            );
          })}
        </div>
      </div>
    </SectionContainer>
  );
}

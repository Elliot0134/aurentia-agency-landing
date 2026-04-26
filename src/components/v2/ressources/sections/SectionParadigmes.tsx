// src/components/v2/ressources/sections/SectionParadigmes.tsx
import type { ReactNode } from "react";
import { ArrowUp, Check, FileCode2, Mic, Sparkles, Terminal } from "lucide-react";
import { paradigms } from "@/data/v2/vibe-coding";

const MOCKUPS: Record<string, ReactNode> = {
  "Chat-web no-code": <ChatMockup />,
  "IDE augmenté": <IdeMockup />,
  "CLI agentique": <CliMockup />,
};

export function SectionParadigmes() {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {paradigms.map((p) => {
        const Icon = p.icon;
        return (
          <div
            key={p.title}
            className="group flex flex-col overflow-hidden rounded-2xl border border-foreground/10 bg-foreground/[0.02] transition-all duration-500 ease-in-out hover:-translate-y-0.5 hover:border-accent-primary/30 hover:bg-foreground/[0.04]"
          >
            {/* Mockup */}
            <div className="relative aspect-video overflow-hidden border-b border-foreground/10 bg-background-surface">
              {MOCKUPS[p.title]}
            </div>

            {/* Content */}
            <div className="flex flex-1 flex-col gap-4 p-6">
              <div className="flex items-center gap-2.5">
                <Icon className="size-4 text-accent-primary" strokeWidth={1.7} aria-hidden />
                <h3 className="font-heading text-lg text-foreground md:text-xl">{p.title}</h3>
              </div>
              <p className="text-sm leading-relaxed text-foreground/65">{p.forWho}</p>
              <div className="mt-auto flex flex-wrap gap-1.5 border-t border-foreground/10 pt-4">
                {p.examples.map((ex) => (
                  <span
                    key={ex}
                    className="rounded-md bg-foreground/[0.06] px-2 py-0.5 text-sm text-foreground/75"
                  >
                    {ex}
                  </span>
                ))}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* ────────────── 1. Chat-web no-code (Lovable-style) ────────────── */

function ChatMockup() {
  return (
    <div className="absolute inset-0 flex flex-col bg-gradient-to-br from-background to-foreground/[0.04]">
      {/* Top bar */}
      <div className="flex items-center gap-2 border-b border-foreground/10 px-3 py-2">
        <div className="flex size-5 items-center justify-center rounded-md bg-accent-primary text-accent-foreground">
          <Sparkles className="size-3" strokeWidth={2.5} aria-hidden />
        </div>
        <div className="h-1.5 w-14 rounded-full bg-foreground/30" />
        <div className="ml-auto flex gap-1">
          <div className="size-1.5 rounded-full bg-accent-primary" />
          <div className="size-1.5 rounded-full bg-foreground/20" />
          <div className="size-1.5 rounded-full bg-foreground/20" />
        </div>
      </div>

      {/* Chat content */}
      <div className="flex flex-1 flex-col gap-2 px-3 py-2.5">
        {/* User bubble */}
        <div className="flex justify-end">
          <div className="max-w-[80%] rounded-2xl rounded-tr-sm bg-accent-primary px-3 py-2 shadow-sm">
            <div className="h-1.5 w-24 rounded-full bg-white/85" />
            <div className="mt-1.5 h-1.5 w-16 rounded-full bg-white/60" />
          </div>
        </div>

        {/* AI generated preview card */}
        <div className="flex justify-start">
          <div className="w-[78%] overflow-hidden rounded-xl border border-foreground/15 bg-background shadow-sm">
            <div className="flex items-center gap-1 border-b border-foreground/10 bg-foreground/[0.04] px-2 py-1">
              <div className="size-1.5 rounded-full bg-[var(--destructive)]/60" />
              <div className="size-1.5 rounded-full bg-accent-primary/60" />
              <div className="size-1.5 rounded-full bg-accent-primary/30" />
            </div>
            <div className="flex flex-col gap-1 p-2">
              <div className="h-1.5 w-3/4 rounded-full bg-foreground/30" />
              <div className="flex gap-1">
                <div className="h-4 w-8 rounded bg-accent-primary/30" />
                <div className="h-4 w-8 rounded bg-foreground/15" />
              </div>
              <div className="h-1.5 w-1/2 rounded-full bg-foreground/20" />
            </div>
          </div>
        </div>
      </div>

      {/* Input bar */}
      <div className="mx-3 mb-3 flex items-center gap-2 rounded-full border border-foreground/15 bg-background px-3 py-1.5 shadow-sm">
        <Mic className="size-3 shrink-0 text-foreground/40" strokeWidth={1.8} aria-hidden />
        <div className="h-1.5 flex-1 rounded-full bg-foreground/15" />
        <div className="flex size-5 shrink-0 items-center justify-center rounded-full bg-accent-primary text-accent-foreground">
          <ArrowUp className="size-3" strokeWidth={2.5} aria-hidden />
        </div>
      </div>
    </div>
  );
}

/* ────────────── 2. IDE augmenté (Cursor-style) ────────────── */

function IdeMockup() {
  return (
    <div className="absolute inset-0 flex flex-col bg-foreground/[0.96] dark:bg-background">
      {/* Title bar */}
      <div className="flex items-center gap-1 border-b border-foreground/10 bg-foreground/[0.04] px-2.5 py-1.5 dark:border-foreground/10">
        <div className="size-1.5 rounded-full bg-[var(--destructive)]/70" />
        <div className="size-1.5 rounded-full bg-accent-primary/70" />
        <div className="size-1.5 rounded-full bg-accent-primary/40" />
        <div className="ml-2 flex items-center gap-1.5 rounded-md bg-background/10 px-2 py-0.5 dark:bg-foreground/[0.04]">
          <FileCode2 className="size-3 text-background/60 dark:text-foreground/50" aria-hidden />
          <div className="h-1.5 w-10 rounded-full bg-background/40 dark:bg-foreground/30" />
        </div>
      </div>

      <div className="flex flex-1">
        {/* File tree */}
        <div className="flex w-14 shrink-0 flex-col gap-1 border-r border-background/10 bg-background/[0.04] p-2 dark:border-foreground/10 dark:bg-foreground/[0.02]">
          <div className="flex items-center gap-1">
            <div className="size-1.5 rounded-sm bg-accent-primary/60" />
            <div className="h-1 w-6 rounded-full bg-background/50 dark:bg-foreground/35" />
          </div>
          <div className="ml-2 flex items-center gap-1">
            <div className="h-1 w-5 rounded-full bg-background/35 dark:bg-foreground/25" />
          </div>
          <div className="ml-2 flex items-center gap-1 rounded bg-accent-primary/15 px-1 py-0.5">
            <div className="h-1 w-7 rounded-full bg-accent-primary/70" />
          </div>
          <div className="ml-2 flex items-center gap-1">
            <div className="h-1 w-4 rounded-full bg-background/35 dark:bg-foreground/25" />
          </div>
          <div className="flex items-center gap-1">
            <div className="size-1.5 rounded-sm bg-background/30 dark:bg-foreground/25" />
            <div className="h-1 w-5 rounded-full bg-background/35 dark:bg-foreground/25" />
          </div>
        </div>

        {/* Editor */}
        <div className="relative flex flex-1 flex-col gap-1.5 p-2.5 font-mono">
          {/* Line numbers + code */}
          {[
            { num: 1, parts: [{ w: "w-6", c: "bg-accent-primary/70" }, { w: "w-10", c: "bg-background/55 dark:bg-foreground/40" }] },
            { num: 2, parts: [{ w: "w-3", c: "bg-background/30 dark:bg-foreground/20", indent: false }, { w: "w-12", c: "bg-accent-primary/55", indent: true }, { w: "w-4", c: "bg-background/40 dark:bg-foreground/30" }] },
            { num: 3, parts: [{ w: "w-14", c: "bg-background/45 dark:bg-foreground/30", indent: true }] },
            { num: 4, parts: [{ w: "w-3", c: "bg-background/30 dark:bg-foreground/20" }] },
          ].map((line) => (
            <div key={line.num} className="flex items-center gap-2">
              <span className="w-3 shrink-0 text-right font-mono text-sm text-background/30 dark:text-foreground/30">
                {line.num}
              </span>
              <div className="flex flex-1 items-center gap-1.5">
                {line.parts.map((p, i) => (
                  <div
                    key={i}
                    className={`h-1.5 ${p.w} rounded-full ${p.c} ${p.indent ? "ml-3" : ""}`}
                  />
                ))}
              </div>
            </div>
          ))}

          {/* AI inline suggestion (ghost text) */}
          <div className="ml-5 flex items-center gap-1.5">
            <div className="h-1.5 w-16 rounded-full bg-accent-primary/25" />
            <div className="h-1.5 w-6 rounded-full bg-accent-primary/20" />
          </div>

          {/* Cmd+K floating prompt */}
          <div className="absolute bottom-2 right-2 flex items-center gap-1.5 rounded-lg border border-accent-primary/40 bg-background px-2 py-1 shadow-md">
            <Sparkles className="size-3 text-accent-primary" strokeWidth={2} aria-hidden />
            <div className="h-1.5 w-12 rounded-full bg-foreground/30" />
            <span className="rounded bg-foreground/[0.08] px-1 py-0.5 font-mono text-sm text-foreground/55">
              ⌘K
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ────────────── 3. CLI agentique (Claude Code) ────────────── */

function CliMockup() {
  return (
    <div className="absolute inset-0 flex flex-col bg-[#1a1a18] font-mono">
      {/* macOS title bar */}
      <div className="flex items-center gap-1.5 border-b border-white/5 px-3 py-1.5">
        <div className="size-2 rounded-full bg-[#ff5f56]" />
        <div className="size-2 rounded-full bg-[#ffbd2e]" />
        <div className="size-2 rounded-full bg-[#27c93f]" />
        <div className="ml-3 flex items-center gap-1.5">
          <Terminal className="size-3 text-white/40" aria-hidden />
          <div className="h-1.5 w-12 rounded-full bg-white/20" />
        </div>
      </div>

      {/* Terminal content */}
      <div className="flex flex-1 flex-col gap-1.5 p-3">
        {/* User prompt */}
        <div className="flex items-center gap-1.5">
          <span className="font-mono text-sm text-[var(--orange-400)]">❯</span>
          <span className="font-mono text-sm text-white/85">claude</span>
        </div>

        {/* Agent thinking */}
        <div className="flex items-center gap-1.5 rounded-md border border-[var(--orange-400)]/30 bg-[var(--orange-400)]/[0.08] px-2 py-1">
          <Sparkles className="size-3 text-[var(--orange-400)]" strokeWidth={2} aria-hidden />
          <div className="h-1.5 w-20 rounded-full bg-[var(--orange-400)]/40" />
          <div className="ml-auto flex gap-0.5">
            <div className="size-1 animate-pulse rounded-full bg-[var(--orange-400)]/60" />
            <div className="size-1 animate-pulse rounded-full bg-[var(--orange-400)]/60 [animation-delay:200ms]" />
            <div className="size-1 animate-pulse rounded-full bg-[var(--orange-400)]/60 [animation-delay:400ms]" />
          </div>
        </div>

        {/* Tool calls */}
        <div className="ml-3 flex items-center gap-1.5">
          <Check className="size-3 text-[#27c93f]" strokeWidth={3} aria-hidden />
          <span className="rounded bg-white/[0.06] px-1.5 py-0.5 font-mono text-sm text-white/55">
            Read
          </span>
          <div className="h-1.5 w-14 rounded-full bg-white/20" />
        </div>
        <div className="ml-3 flex items-center gap-1.5">
          <Check className="size-3 text-[#27c93f]" strokeWidth={3} aria-hidden />
          <span className="rounded bg-white/[0.06] px-1.5 py-0.5 font-mono text-sm text-white/55">
            Edit
          </span>
          <div className="h-1.5 w-10 rounded-full bg-white/20" />
        </div>

        {/* Cursor */}
        <div className="mt-auto flex items-center gap-1.5">
          <span className="font-mono text-sm text-[var(--orange-400)]">❯</span>
          <span className="inline-block h-3 w-1.5 animate-pulse bg-[var(--orange-400)]/80" />
        </div>
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import { Download, Loader2, Check } from "lucide-react";
import { allSkills } from "@/data/skills-lead-magnet";
import { cn } from "@/lib/utils";

type State = "idle" | "loading" | "done" | "error";

export function SkillsDownload({ className }: { className?: string }) {
  const [state, setState] = useState<State>("idle");

  const handleDownload = async () => {
    if (state === "loading") return;
    setState("loading");

    try {
      const JSZip = (await import("jszip")).default;
      const zip = new JSZip();
      const folder = zip.folder("aurentia-20-skills-claude")!;

      // Fetch all skill files + README in parallel
      const paths = ["/skills/README.md", ...allSkills.map((s) => s.filePath)];

      await Promise.all(
        paths.map(async (path) => {
          const res = await fetch(path);
          if (!res.ok) throw new Error(`HTTP ${res.status} for ${path}`);
          const text = await res.text();
          const filename = path.split("/").pop()!;
          folder.file(filename, text);
        })
      );

      const blob = await zip.generateAsync({ type: "blob" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "aurentia-20-skills-claude.zip";
      a.click();
      URL.revokeObjectURL(url);

      setState("done");
      setTimeout(() => setState("idle"), 3000);
    } catch {
      setState("error");
      setTimeout(() => setState("idle"), 3000);
    }
  };

  return (
    <button
      onClick={handleDownload}
      disabled={state === "loading"}
      className={cn(
        "inline-flex items-center gap-3 px-6 py-3 rounded-2xl border transition-all duration-500",
        "font-semibold text-sm",
        state === "idle" && "border-foreground/20 text-foreground/70 hover:border-foreground/40 hover:text-foreground bg-foreground/5 hover:bg-foreground/10",
        state === "loading" && "border-foreground/10 text-foreground/40 bg-foreground/5 cursor-wait",
        state === "done" && "border-emerald-500/40 text-emerald-400 bg-emerald-500/10",
        state === "error" && "border-red-500/40 text-red-400 bg-red-500/10",
        className
      )}
      aria-label="Télécharger les 20 skills en ZIP"
    >
      {state === "loading" && <Loader2 className="w-4 h-4 animate-spin" />}
      {state === "done" && <Check className="w-4 h-4" />}
      {(state === "idle" || state === "error") && <Download className="w-4 h-4" />}

      <span>
        {state === "idle" && "Télécharger les 20 skills (.zip)"}
        {state === "loading" && "Préparation du ZIP…"}
        {state === "done" && "Téléchargement lancé !"}
        {state === "error" && "Erreur — Réessayer"}
      </span>

      {state === "idle" && (
        <span className="text-foreground/30 font-mono text-xs">21 fichiers · ~40 Ko</span>
      )}
    </button>
  );
}

"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { CopyBlock } from "./CopyBlock";
import type { Skill } from "@/data/skills-lead-magnet";

interface AccordionSkillProps {
  skill: Skill;
  numberColor: string;
}

export function AccordionSkill({ skill, numberColor }: AccordionSkillProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [content, setContent] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleToggle = async () => {
    const next = !isOpen;
    setIsOpen(next);

    if (next && content === null && !loading) {
      setLoading(true);
      setError(false);
      try {
        const res = await fetch(skill.filePath);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const text = await res.text();
        setContent(text);
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div
      className={cn(
        "border border-foreground/10 rounded-2xl overflow-hidden transition-colors duration-500",
        isOpen ? "border-foreground/20 bg-foreground/[0.03]" : "bg-transparent hover:border-foreground/15"
      )}
    >
      {/* Header */}
      <button
        onClick={handleToggle}
        className="w-full flex items-center gap-4 p-5 text-left group"
        aria-expanded={isOpen}
      >
        {/* Number badge */}
        <span
          className={cn(
            "shrink-0 w-9 h-9 rounded-xl flex items-center justify-center text-sm font-black font-mono transition-all duration-500",
            isOpen ? "bg-current/10" : "bg-foreground/5 group-hover:bg-current/10"
          )}
        >
          <span className={cn("transition-colors duration-500", numberColor)}>
            {skill.number}
          </span>
        </span>

        {/* Text */}
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-foreground/90 leading-tight">{skill.name}</p>
          <p className="text-sm text-foreground/50 mt-0.5 leading-snug">{skill.description}</p>
        </div>

        {/* Chevron */}
        <ChevronDown
          className={cn(
            "shrink-0 w-5 h-5 text-foreground/40 transition-transform duration-500 ease-in-out",
            isOpen && "rotate-180"
          )}
        />
      </button>

      {/* Preview (visible when closed) */}
      {!isOpen && (
        <div className="px-5 pb-4">
          <pre className="text-xs text-foreground/30 font-mono leading-relaxed whitespace-pre-wrap line-clamp-3 overflow-hidden">
            {skill.preview}
          </pre>
        </div>
      )}

      {/* Body */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="body"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-5 flex flex-col gap-4">
              {loading && (
                <div className="flex items-center gap-3 py-6 text-foreground/40">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span className="text-sm">Chargement du skill…</span>
                </div>
              )}

              {error && (
                <p className="text-sm text-red-400/70 py-4">
                  Erreur lors du chargement. Rafraîchissez la page.
                </p>
              )}

              {content && !loading && (
                <CopyBlock content={content} />
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

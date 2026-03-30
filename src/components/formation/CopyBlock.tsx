"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface CopyBlockProps {
  content: string;
  className?: string;
}

export function CopyBlock({ content, className }: CopyBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
    }
  };

  return (
    <div className={cn("relative rounded-2xl overflow-hidden bg-foreground/[0.04] border border-foreground/10", className)}>
      {/* Header bar */}
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-foreground/10 bg-foreground/[0.03]">
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-full bg-foreground/10" />
          <div className="w-3 h-3 rounded-full bg-foreground/10" />
          <div className="w-3 h-3 rounded-full bg-foreground/10" />
        </div>
        <button
          onClick={handleCopy}
          aria-label={copied ? "Copié !" : "Copier le skill"}
          className={cn(
            "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium transition-all duration-500 ease-in-out",
            copied
              ? "bg-emerald-400/15 text-emerald-400 border border-emerald-400/30"
              : "bg-foreground/5 text-foreground/50 border border-foreground/10 hover:bg-foreground/10 hover:text-foreground/80"
          )}
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5" />
              <span>Copié !</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span>Copier</span>
            </>
          )}
        </button>
      </div>

      {/* Code content */}
      <pre className="p-4 text-sm font-mono text-foreground/70 overflow-x-auto whitespace-pre-wrap leading-relaxed">
        <code>{content}</code>
      </pre>
    </div>
  );
}

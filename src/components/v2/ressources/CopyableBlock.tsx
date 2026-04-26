// src/components/v2/ressources/CopyableBlock.tsx
"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { cn } from "@/lib/utils";

type CopyableBlockProps = {
  title?: string;
  description?: string;
  language?: "markdown" | "bash" | "text";
  content: string;
  className?: string;
};

export function CopyableBlock({
  title,
  description,
  language = "text",
  content,
  className,
}: CopyableBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(content);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard not available — silent
    }
  };

  return (
    <div
      className={cn(
        "overflow-hidden rounded-2xl border border-foreground/10 bg-foreground/[0.04] transition-colors duration-500 ease-in-out hover:border-foreground/20",
        className
      )}
    >
      {(title || description) && (
        <div className="flex items-start justify-between gap-4 border-b border-foreground/10 px-5 py-4 md:px-6">
          <div className="flex flex-col gap-1">
            {title && (
              <h4 className="text-base font-semibold text-foreground">{title}</h4>
            )}
            {description && (
              <p className="text-sm text-foreground/60">{description}</p>
            )}
          </div>
          <button
            type="button"
            onClick={handleCopy}
            aria-label="Copier le contenu"
            className={cn(
              "inline-flex shrink-0 items-center gap-2 rounded-full border border-foreground/15 bg-background px-3.5 py-1.5 text-sm font-medium text-foreground/80 transition-all duration-500 ease-in-out hover:border-foreground/30 hover:text-foreground",
              copied && "border-accent-primary/40 text-accent-primary"
            )}
          >
            {copied ? (
              <>
                <Check className="size-4" aria-hidden /> Copié
              </>
            ) : (
              <>
                <Copy className="size-4" aria-hidden /> Copier
              </>
            )}
          </button>
        </div>
      )}
      {!title && !description && (
        <div className="flex justify-end px-5 pt-4 md:px-6">
          <button
            type="button"
            onClick={handleCopy}
            aria-label="Copier le contenu"
            className={cn(
              "inline-flex items-center gap-2 rounded-full border border-foreground/15 bg-background px-3.5 py-1.5 text-sm font-medium text-foreground/80 transition-all duration-500 ease-in-out hover:border-foreground/30 hover:text-foreground",
              copied && "border-accent-primary/40 text-accent-primary"
            )}
          >
            {copied ? (
              <>
                <Check className="size-4" aria-hidden /> Copié
              </>
            ) : (
              <>
                <Copy className="size-4" aria-hidden /> Copier
              </>
            )}
          </button>
        </div>
      )}
      <pre
        className={cn(
          "overflow-x-auto px-5 py-5 font-mono text-sm leading-relaxed text-foreground/85 md:px-6 md:py-6",
          language === "bash" && "before:mr-2 before:text-accent-primary/70 before:content-['$']"
        )}
      >
        <code>{content}</code>
      </pre>
    </div>
  );
}

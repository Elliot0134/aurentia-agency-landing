"use client";

import { cn } from "@/lib/utils";

interface LinkedInEmbedProps {
  url: string;
  className?: string;
}

/**
 * Responsive LinkedIn post embed.
 * Renders an iframe with ~16:9 aspect ratio when a valid URL is provided,
 * otherwise shows a fallback message.
 */
export function LinkedInEmbed({ url, className }: LinkedInEmbedProps) {
  const isValid = url && !url.includes("PLACEHOLDER") && url.startsWith("http");

  if (!isValid) {
    return (
      <div
        className={cn(
          "flex items-center justify-center rounded-2xl border border-foreground/10 bg-foreground/[0.03] px-6 py-12 text-sm text-foreground/40 transition-colors duration-700 ease-in-out",
          className
        )}
      >
        Post LinkedIn bientot disponible.
      </div>
    );
  }

  return (
    <iframe
      src={url}
      title="Post LinkedIn"
      className={cn("block w-full", className)}
      style={{ height: "540px", border: "none" }}
      allowFullScreen
      loading="lazy"
    />
  );
}

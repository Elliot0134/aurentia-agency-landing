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
    <div
      className={cn(
        "relative w-full overflow-hidden rounded-2xl border border-foreground/10 bg-foreground/[0.03] transition-colors duration-700 ease-in-out",
        className
      )}
    >
      {/* 16:9-ish aspect ratio container */}
      <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
        <iframe
          src={url}
          title="Post LinkedIn"
          className="absolute inset-0 h-full w-full"
          allowFullScreen
          loading="lazy"
          style={{ border: "none" }}
        />
      </div>
    </div>
  );
}

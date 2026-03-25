"use client";

import { useRef, useCallback } from "react";
import { cn } from "@/lib/utils";
import { SafeImage } from "@/components/ui/SafeImage";

interface BrowserMockupBaseProps {
  url?: string;
  className?: string;
}

interface BrowserMockupImageProps extends BrowserMockupBaseProps {
  image: string;
  embedUrl?: never;
  alt?: string;
}

interface BrowserMockupEmbedProps extends BrowserMockupBaseProps {
  image?: never;
  embedUrl: string;
  alt?: never;
}

type BrowserMockupProps = BrowserMockupImageProps | BrowserMockupEmbedProps;

export function BrowserMockup({
  image,
  embedUrl,
  url,
  className,
  alt = "Screenshot",
}: BrowserMockupProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Hide custom cursor when entering iframe, show it when leaving
  const handleMouseEnter = useCallback(() => {
    const cursor = document.querySelector(".custom-cursor") as HTMLElement;
    if (cursor) {
      cursor.style.transition = "opacity 0.5s ease-in-out";
      cursor.style.opacity = "0";
    }
  }, []);

  const handleMouseLeave = useCallback(() => {
    const cursor = document.querySelector(".custom-cursor") as HTMLElement;
    if (cursor) {
      cursor.style.transition = "opacity 0.5s ease-in-out";
      cursor.style.opacity = "1";
    }
  }, []);

  return (
    <div
      ref={containerRef}
      className={cn(
        "rounded-2xl border border-foreground/10 bg-foreground/[0.03] overflow-hidden shadow-2xl shadow-foreground/5 ring-1 ring-accent-primary/10",
        className
      )}
    >
      {/* Browser chrome bar */}
      <div className="flex items-center gap-3 px-4 py-3 border-b border-foreground/10 bg-foreground/[0.03]">
        {/* Traffic lights */}
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-full bg-foreground/10" />
          <div className="w-3 h-3 rounded-full bg-foreground/10" />
          <div className="w-3 h-3 rounded-full bg-foreground/10" />
        </div>

        {/* URL bar */}
        {url && (
          <div className="flex-1 max-w-md mx-auto">
            <div className="rounded-lg bg-foreground/5 px-3 py-1.5 text-sm text-foreground/30 truncate text-center font-mono">
              {url}
            </div>
          </div>
        )}
      </div>

      {/* Content: image or iframe */}
      {embedUrl ? (
        <div
          className="relative aspect-[16/10] w-full overflow-hidden"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {/* Render iframe at 1440px wide and scale down to fit container */}
          <iframe
            src={embedUrl}
            title={url || "Site preview"}
            className="absolute top-0 left-0 border-0 origin-top-left"
            style={{
              width: "1440px",
              height: "900px",
              transform: "scale(var(--iframe-scale))",
            }}
            ref={(el) => {
              if (el) {
                const container = el.parentElement;
                if (container) {
                  const updateScale = () => {
                    const scale = container.offsetWidth / 1440;
                    el.style.setProperty("--iframe-scale", String(scale));
                  };
                  updateScale();
                  const observer = new ResizeObserver(updateScale);
                  observer.observe(container);
                }
              }
            }}
            loading="lazy"
            sandbox="allow-scripts allow-same-origin allow-popups"
          />
        </div>
      ) : (
        <div className="relative aspect-[16/10] w-full">
          <SafeImage
            src={image!}
            alt={alt}
            fill
            className="object-cover object-top"
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 55vw, 700px"
            fallbackAspectRatio="16/10"
          />
        </div>
      )}
    </div>
  );
}

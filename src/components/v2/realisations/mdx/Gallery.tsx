"use client";

import Image from "next/image";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

interface GalleryProps {
  /** Preferred prop name — matches the MDX authoring convention. */
  images?: string[];
  /** Legacy alias. */
  items?: string[];
  alt?: string;
  className?: string;
}

export function Gallery({ images, items, alt = "", className }: GalleryProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const pictures = images ?? items ?? [];

  return (
    <>
      <div
        className={cn(
          "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 my-10",
          className,
        )}
      >
        {pictures.map((src, i) => (
          <button
            key={src + i}
            type="button"
            onClick={() => setOpenIndex(i)}
            className="group relative block aspect-[4/3] w-full overflow-hidden rounded-2xl border border-foreground/10 bg-background-surface transition-all duration-500 ease-in-out hover:border-foreground/30"
            aria-label={`Ouvrir l'image ${i + 1} en plein écran`}
          >
            <Image
              src={src}
              alt={`${alt} ${i + 1}`.trim()}
              fill
              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              className="object-cover transition-transform duration-700 ease-in-out group-hover:scale-[1.02]"
            />
          </button>
        ))}
      </div>

      <Dialog
        open={openIndex !== null}
        onOpenChange={(open) => {
          if (!open) setOpenIndex(null);
        }}
      >
        <DialogContent className="max-w-[95vw] sm:max-w-5xl p-0 overflow-hidden bg-background-surface border-foreground/10">
          <DialogTitle className="sr-only">Image en plein écran</DialogTitle>
          {openIndex !== null && (
            <div className="relative w-full aspect-[16/10]">
              <Image
                src={pictures[openIndex]}
                alt={`${alt} ${openIndex + 1}`.trim()}
                fill
                sizes="95vw"
                className="object-contain"
                priority
              />
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}

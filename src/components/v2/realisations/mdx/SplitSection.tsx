import Image from "next/image";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SplitSectionProps {
  image: string;
  imageAlt?: string;
  children: ReactNode;
  className?: string;
}

export function SplitSection({
  image,
  imageAlt = "",
  children,
  className,
}: SplitSectionProps) {
  return (
    <section
      className={cn(
        "grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 my-12",
        className,
      )}
    >
      <div className="lg:sticky lg:top-28 lg:self-start">
        <div className="relative w-full aspect-[4/5] overflow-hidden rounded-2xl border border-foreground/10 bg-background-surface">
          <Image
            src={image}
            alt={imageAlt}
            fill
            sizes="(min-width: 1024px) 45vw, 100vw"
            className="object-cover transition-transform duration-700 ease-in-out"
          />
        </div>
      </div>
      <div className="min-w-0">{children}</div>
    </section>
  );
}

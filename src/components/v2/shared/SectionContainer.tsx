// src/components/v2/shared/SectionContainer.tsx
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type SectionContainerProps = {
  children: ReactNode;
  id?: string;
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  className?: string;
  innerClassName?: string;
  alignHeader?: "left" | "center";
  as?: "section" | "div";
};

export function SectionContainer({
  children,
  id,
  eyebrow,
  title,
  subtitle,
  className,
  innerClassName,
  alignHeader = "left",
  as: Tag = "section",
}: SectionContainerProps) {
  const headerAlign =
    alignHeader === "center" ? "text-center items-center" : "text-left items-start";

  return (
    <Tag
      id={id}
      className={cn("w-full px-6 py-20 md:px-12 md:py-24", className)}
    >
      <div className={cn("mx-auto w-full max-w-6xl", innerClassName)}>
        {(eyebrow || title || subtitle) && (
          <header className={cn("mb-12 flex flex-col gap-3", headerAlign)}>
            {eyebrow && (
              <p className="text-sm font-semibold uppercase tracking-[0.14em] text-accent-primary">
                {eyebrow}
              </p>
            )}
            {title && (
              <h2 className="font-heading text-3xl font-bold tracking-tight text-foreground md:text-4xl">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="max-w-2xl text-base text-foreground/70 md:text-lg">
                {subtitle}
              </p>
            )}
          </header>
        )}
        {children}
      </div>
    </Tag>
  );
}

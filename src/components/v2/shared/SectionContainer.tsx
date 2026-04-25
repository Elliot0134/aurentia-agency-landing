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
  titleClassName?: string;
  headerClassName?: string;
  alignHeader?: "left" | "center";
  as?: "section" | "div";
  /**
   * When true, the section's content sits inside a rounded surface card
   * detached from the page edges (secondary/accent section style).
   */
  surface?: boolean;
};

export function SectionContainer({
  children,
  id,
  eyebrow,
  title,
  subtitle,
  className,
  innerClassName,
  titleClassName,
  headerClassName,
  alignHeader = "center",
  as: Tag = "section",
  surface = false,
}: SectionContainerProps) {
  const headerAlign =
    alignHeader === "center" ? "text-center items-center" : "text-left items-start";

  const header =
    eyebrow || title || subtitle ? (
      <header
        className={cn(
          "mb-12 flex flex-col gap-3",
          headerAlign,
          headerClassName,
        )}
      >
        {eyebrow && (
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-accent-primary">
            {eyebrow}
          </p>
        )}
        {title && (
          <h2
            className={cn(
              "font-heading text-4xl tracking-tight text-foreground md:text-5xl lg:text-6xl",
              titleClassName,
            )}
          >
            {title}
          </h2>
        )}
        {subtitle && (
          <p className="max-w-2xl text-base text-foreground/70 md:text-lg">
            {subtitle}
          </p>
        )}
      </header>
    ) : null;

  if (surface) {
    return (
      <Tag
        id={id}
        className={cn("w-full px-4 py-6 md:px-6 md:py-8", className)}
      >
        <div className="mx-auto w-full max-w-[1400px] rounded-[2.5rem] bg-background-surface px-6 py-20 md:px-12 md:py-24">
          <div className={cn("mx-auto w-full max-w-6xl", innerClassName)}>
            {header}
            {children}
          </div>
        </div>
      </Tag>
    );
  }

  // Non-surface sections match the OUTER width of surface cards (1400px)
  // so both section types share the same visual "frame line" on the page.
  return (
    <Tag
      id={id}
      className={cn("w-full px-6 py-20 md:px-12 md:py-24", className)}
    >
      <div className={cn("mx-auto w-full max-w-[1400px]", innerClassName)}>
        {header}
        {children}
      </div>
    </Tag>
  );
}

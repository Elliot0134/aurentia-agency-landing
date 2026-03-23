import { cn } from "@/lib/utils";
import React, { forwardRef } from "react";

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  className?: string;
  theme?: "dark" | "dark-alt" | "dark-alt-2" | "transparent";
  containerClassName?: string;
}

export const Section = forwardRef<HTMLElement, SectionProps>(({
  children,
  className,
  theme = "transparent",
  containerClassName,
  ...props
}, ref) => {
  const themeClasses = {
    "dark": "section-dark",
    "dark-alt": "section-dark-alt",
    "dark-alt-2": "section-dark-alt-2",
    transparent: "bg-transparent",
  };

  return (
    <section
      ref={ref}
      className={cn(
        "relative w-full py-[var(--section-padding-mobile)] md:py-[var(--section-padding)] overflow-hidden",
        themeClasses[theme],
        className
      )}
      {...props}
    >
      <div className={cn("container mx-auto px-6 md:px-12", containerClassName)}>
        {children}
      </div>
    </section>
  );
});

Section.displayName = "Section";

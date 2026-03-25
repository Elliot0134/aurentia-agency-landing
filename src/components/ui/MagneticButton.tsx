import React from "react";
import { cn } from "@/lib/utils";

interface MagneticButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
  asChild?: boolean;
  glow?: boolean;
}

export const MagneticButton = React.forwardRef<HTMLButtonElement, MagneticButtonProps>(({
  children,
  className,
  asChild,
  glow = false,
  ...props
}, ref) => {
  const sharedClass = cn(
    "relative rounded-full text-foreground inline-flex items-center justify-center isolate overflow-hidden group/magnetic",
    glow ? "bg-foreground text-background hover:opacity-90 transition-all" : "bg-foreground/5 backdrop-blur-md hover:bg-foreground/10 transition-all border border-foreground/20",
    "px-6 py-3 font-medium cursor-pointer transition-[shadow,opacity,background-color] duration-500",
    glow && "hover:shadow-[0_0_40px_rgba(43,43,43,0.3)]",
    className
  );

  const inner = (
    <>
      {glow && (
        <span className="absolute inset-0 bg-gradient-to-tr from-transparent via-foreground/20 to-transparent opacity-0 group-hover/magnetic:opacity-100 transition-opacity duration-500 pointer-events-none" />
      )}
      <span className="relative z-10 pointer-events-none text-shadow-sm font-semibold tracking-wide flex items-center justify-center">
        {children}
      </span>
    </>
  );

  if (asChild) {
    return (
      <div ref={ref as React.Ref<HTMLDivElement>} className={sharedClass}>
        {inner}
      </div>
    );
  }

  return (
    <button ref={ref} className={sharedClass} {...props}>
      {inner}
    </button>
  );
});

MagneticButton.displayName = "MagneticButton";

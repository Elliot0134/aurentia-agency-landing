import { Lightbulb, AlertTriangle, Info } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "tip" | "warning" | "info";

const variantConfig: Record<
  Variant,
  { icon: typeof Info; border: string; iconColor: string; label: string }
> = {
  tip: {
    icon: Lightbulb,
    border: "border-foreground/40",
    iconColor: "text-foreground",
    label: "Astuce",
  },
  warning: {
    icon: AlertTriangle,
    border: "border-foreground/60",
    iconColor: "text-foreground",
    label: "Attention",
  },
  info: {
    icon: Info,
    border: "border-foreground/30",
    iconColor: "text-foreground/80",
    label: "Info",
  },
};

interface CalloutProps {
  variant?: Variant;
  title?: string;
  children: ReactNode;
  className?: string;
}

export function Callout({
  variant = "info",
  title,
  children,
  className,
}: CalloutProps) {
  const cfg = variantConfig[variant];
  const Icon = cfg.icon;

  return (
    <div
      className={cn(
        "my-6 flex gap-4 rounded-r-xl border-l-2 bg-foreground/5 px-5 py-4 transition-all duration-500 ease-in-out",
        cfg.border,
        className,
      )}
      role="note"
    >
      <Icon className={cn("size-5 shrink-0 mt-0.5", cfg.iconColor)} aria-hidden />
      <div className="min-w-0 flex-1">
        <div className="text-sm font-semibold text-foreground mb-1">
          {title ?? cfg.label}
        </div>
        <div className="text-sm text-foreground/80 leading-relaxed [&>p:last-child]:mb-0">
          {children}
        </div>
      </div>
    </div>
  );
}

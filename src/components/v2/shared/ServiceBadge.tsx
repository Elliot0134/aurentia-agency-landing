// src/components/v2/shared/ServiceBadge.tsx
import type { Badge as BadgeType } from "@/data/v2/types";
import { cn } from "@/lib/utils";

type ServiceBadgeProps = {
  badge: BadgeType;
  className?: string;
};

export function ServiceBadge({ badge, className }: ServiceBadgeProps) {
  const Icon = badge.icon;
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border border-accent-primary/20 bg-accent-primary/10 px-3.5 py-1.5 text-sm font-medium text-accent-primary transition-colors duration-500 ease-in-out",
        className
      )}
    >
      {Icon && <Icon className="size-4" />}
      {badge.label}
    </span>
  );
}

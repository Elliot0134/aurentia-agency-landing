import { cn } from "@/lib/utils";

interface SectionDividerProps {
  className?: string;
}

export function SectionDivider({ className }: SectionDividerProps) {
  return (
    <div
      className={cn("max-w-4xl mx-auto h-px", className)}
      style={{
        background:
          "linear-gradient(90deg, transparent 0%, var(--color-foreground) 50%, transparent 100%)",
        opacity: 0.1,
      }}
      aria-hidden="true"
    />
  );
}

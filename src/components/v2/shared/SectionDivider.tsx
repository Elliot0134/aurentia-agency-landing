import { cn } from "@/lib/utils";

export function SectionDivider({ className }: { className?: string }) {
  return (
    <div className={cn("w-full", className)}>
      <div
        className="h-px"
        style={{
          background:
            "linear-gradient(to right, transparent, var(--accent) 30%, var(--accent) 70%, transparent)",
          opacity: 0.25,
        }}
      />
    </div>
  );
}

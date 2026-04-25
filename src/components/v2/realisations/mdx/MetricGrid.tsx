import { cn } from "@/lib/utils";

interface Metric {
  value: string;
  label: string;
  context?: string;
}

export function MetricGrid({
  items,
  className,
}: {
  items: Metric[];
  className?: string;
}) {
  return (
    <div
      className={cn(
        "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 my-10",
        className,
      )}
    >
      {items.map((m, i) => (
        <div
          key={i}
          className="rounded-2xl bg-background-surface p-6 border border-foreground/10 transition-all duration-500 ease-in-out hover:border-foreground/30"
        >
          <div className="text-4xl font-semibold text-foreground">{m.value}</div>
          <div className="text-sm text-foreground/70 mt-2">{m.label}</div>
          {m.context && (
            <div className="text-sm text-foreground/50 mt-1">{m.context}</div>
          )}
        </div>
      ))}
    </div>
  );
}

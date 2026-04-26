import type { ReactNode } from "react";

interface PriceHTProps {
  value: string;
  className?: string;
}

export function PriceHT({ value, className }: PriceHTProps): ReactNode {
  if (!value.includes("€")) {
    return <>{value}</>;
  }

  const parts = value.split("€");
  const nodes: ReactNode[] = [];
  parts.forEach((part, i) => {
    nodes.push(<span key={`p-${i}`}>{part}</span>);
    if (i < parts.length - 1) {
      nodes.push(
        <span key={`e-${i}`} className="whitespace-nowrap">
          €<sup className={`ml-0.5 text-[0.5em] font-medium align-super ${className ?? ""}`}>HT</sup>
        </span>,
      );
    }
  });
  return <>{nodes}</>;
}

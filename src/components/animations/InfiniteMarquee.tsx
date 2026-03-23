"use client";

import { cn } from "@/lib/utils";

interface InfiniteMarqueeProps {
  className?: string;
  items: string[];
}

export const InfiniteMarquee = ({ items, className }: InfiniteMarqueeProps) => {
  // Duplicate array for seamless infinite scroll
  const duplicatedItems = [...items, ...items, ...items];

  return (
    <div 
      className={cn("w-full overflow-hidden relative", className)}
      style={{ 
        maskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)',
        WebkitMaskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)' 
      }}
    >
      <div className="marquee-track w-max">
        {duplicatedItems.map((item, index) => (
          <div key={index} className="flex items-center px-4 w-max shrink-0">
            {item}
            {index < duplicatedItems.length - 1 && (
              <span className="mx-8 text-accent-primary/40 font-sans" style={{ textShadow: '0 0 8px rgba(201,100,66,0.3)' }}>•</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

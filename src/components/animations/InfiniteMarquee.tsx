"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";

export type MarqueeItem = string | { name: string; icon?: string };

interface InfiniteMarqueeProps {
  className?: string;
  items: MarqueeItem[];
  iconOnly?: boolean;
}

export const InfiniteMarquee = ({ items, className, iconOnly = false }: InfiniteMarqueeProps) => {
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
        {duplicatedItems.map((item, index) => {
          const name = typeof item === "string" ? item : item.name;
          const icon = typeof item === "string" ? undefined : item.icon;

          if (iconOnly && icon) {
            return (
              <div key={index} className="flex items-center px-6 w-max shrink-0">
                <Image
                  src={icon}
                  alt={name}
                  width={48}
                  height={48}
                  className="w-12 h-12 object-contain opacity-70 transition-opacity duration-500 hover:opacity-100"
                />
              </div>
            );
          }

          if (iconOnly) {
            return (
              <div key={index} className="flex items-center px-6 w-max shrink-0">
                <span>{name}</span>
              </div>
            );
          }

          return (
            <div key={index} className="flex items-center px-4 w-max shrink-0">
              <span className="flex items-center gap-2.5">
                {icon && (
                  <Image
                    src={icon}
                    alt={name}
                    width={24}
                    height={24}
                    className="w-6 h-6 object-contain"
                  />
                )}
                {name}
              </span>
              {index < duplicatedItems.length - 1 && (
                <span className="mx-8 text-accent-primary/40 font-sans" style={{ textShadow: '0 0 8px rgba(201,100,66,0.3)' }}>•</span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

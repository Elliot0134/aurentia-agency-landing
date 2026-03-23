"use client";

import { cn } from "@/lib/utils";

interface Floating3DObjectsProps {
  className?: string;
}

export const Floating3DObjects = ({ className }: Floating3DObjectsProps) => {
  return (
    <div className={cn("absolute inset-0 pointer-events-none overflow-hidden z-10", className)}>
      
      {/* Object 1: Large faded cube top right */}
      <div 
        className="floating-3d absolute top-[10%] right-[10%] w-48 h-48 rounded-[40px] bg-foreground/5 border border-foreground/10 backdrop-blur-xl shadow-2xl" 
        style={{ animationDelay: '0s' }}
      />
      
      {/* Object 2: Orange/Amber Sphere middle left */}
      <div 
        className="floating-3d absolute top-[40%] left-[5%] w-32 h-32 rounded-full bg-gradient-to-br from-accent-primary/20 to-transparent border border-accent-primary/30 backdrop-blur-md shadow-[0_0_40px_rgba(201,100,66,0.3)]" 
        style={{ animationDelay: '-2s' }}
      />
      
      {/* Object 3: Small solid sphere bottom right */}
      <div 
        className="floating-3d absolute bottom-[20%] right-[20%] w-12 h-12 rounded-full bg-accent-secondary/50 filter blur-[2px]" 
        style={{ animationDelay: '-4s' }}
      />
      
      {/* Object 4: Tall glass pillar left bottom */}
      <div 
        className="floating-3d absolute bottom-[10%] left-[20%] w-16 h-40 rounded-full bg-gradient-to-b from-foreground/10 to-transparent border border-foreground/5 backdrop-blur-md" 
        style={{ animationDelay: '-1s' }}
      />
      
      {/* Object 5: Cube center behind mockups */}
      <div 
        className="floating-3d absolute top-[30%] left-[40%] w-24 h-24 rounded-3xl bg-gradient-to-tr from-accent-secondary/20 to-transparent border border-accent-secondary/30 backdrop-blur-md shadow-[0_0_30px_rgba(176,87,48,0.2)]" 
        style={{ animationDelay: '-3s' }}
      />

    </div>
  );
};

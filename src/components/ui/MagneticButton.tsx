import React, { useRef, useEffect } from "react";
import gsap from "gsap";
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
  const buttonRef = useRef<HTMLButtonElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const button = buttonRef.current;
    if (!button) return;

    const xTo = gsap.quickTo(button, "x", { duration: 1, ease: "elastic.out(1, 0.3)" });
    const yTo = gsap.quickTo(button, "y", { duration: 1, ease: "elastic.out(1, 0.3)" });
    
    const textXTo = textRef.current ? gsap.quickTo(textRef.current, "x", { duration: 1, ease: "elastic.out(1, 0.3)" }) : null;
    const textYTo = textRef.current ? gsap.quickTo(textRef.current, "y", { duration: 1, ease: "elastic.out(1, 0.3)" }) : null;

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { height, width, left, top } = button.getBoundingClientRect();
      const x = clientX - (left + width / 2);
      const y = clientY - (top + height / 2);
      
      // Magnetic pull radius.
      if (Math.abs(x) < 100 && Math.abs(y) < 100) {
        xTo(x * 0.4);
        yTo(y * 0.4);
        if (textXTo && textYTo) {
          textXTo(x * 0.1);
          textYTo(y * 0.1);
        }
      } else {
        xTo(0);
        yTo(0);
        if (textXTo && textYTo) {
          textXTo(0);
          textYTo(0);
        }
      }
    };

    const handleMouseLeave = () => {
      xTo(0);
      yTo(0);
      if (textXTo && textYTo) {
        textXTo(0);
        textYTo(0);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    button.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      button.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  const Component = asChild ? "div" : "button";

  return (
    <Component
      ref={(node: HTMLButtonElement) => {
        // Handle both local and forwarded refs
        // @ts-ignore
        buttonRef.current = node;
        if (typeof ref === 'function') ref(node);
        else if (ref) ref.current = node;
      }}
      className={cn(
        "relative rounded-full text-white inline-flex items-center justify-center isolate overflow-hidden group/magnetic",
        glow ? "bg-foreground text-background hover:opacity-90 transition-colors" : "bg-foreground/5 backdrop-blur-md hover:bg-foreground/10 transition-colors border border-foreground/20",
        "px-6 py-3 font-medium cursor-pointer will-change-transform transition-[shadow,opacity,background-color] duration-500",
        glow && "hover:shadow-[0_0_40px_rgba(43,43,43,0.3)]",
        className
      )}
      {...props as any}
    >
      {/* Animated glow inside the button */}
      {glow && (
        <span className="absolute inset-0 bg-gradient-to-tr from-transparent via-foreground/20 to-transparent opacity-0 group-hover/magnetic:opacity-100 transition-opacity duration-500 pointer-events-none" />
      )}
      
      <span ref={textRef} className="relative z-10 pointer-events-none text-shadow-sm font-semibold tracking-wide will-change-transform flex items-center justify-center">
        {children}
      </span>
    </Component>
  );
});

MagneticButton.displayName = "MagneticButton";

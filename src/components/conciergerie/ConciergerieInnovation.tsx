"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Section } from "@/components/ui/Section";
import { TextReveal } from "@/components/animations/TextReveal";
import { innovationContent } from "@/data/content";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function ConciergerieInnovation() {
  const containerRef = useRef<HTMLElement>(null);
  const scrollTrackRef = useRef<HTMLDivElement>(null);
  
  useGSAP(() => {
    if (!containerRef.current || !scrollTrackRef.current) return;
    
    // Check if mobile. If mobile, we don't pin/horizontal scroll, we just stack them to avoid breaking UX.
    const isMobile = window.innerWidth < 768;
    
    if (!isMobile) {
      const getScrollAmount = () => -(scrollTrackRef.current!.scrollWidth - window.innerWidth);

      const tween = gsap.to(scrollTrackRef.current, {
        x: getScrollAmount,
        ease: "none",
      });

      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: () => `+=${getScrollAmount() * -1}`,
        pin: true,
        animation: tween,
        scrub: 1,
        invalidateOnRefresh: true,
      });

      const cards = scrollTrackRef.current.querySelectorAll('.innovation-card');
      cards.forEach((card) => {
        gsap.fromTo(card, 
          { filter: "blur(15px)", opacity: 0.3, scale: 0.9 },
          { 
            filter: "blur(0px)", 
            opacity: 1, 
            scale: 1,
            scrollTrigger: {
              trigger: card,
              containerAnimation: tween,
              start: "left center",
              toggleActions: "play none none reverse",
            }
          }
        );
      });
    } else {
      // Mobile staggered reveal
      const cards = scrollTrackRef.current.querySelectorAll('.innovation-card');
      gsap.fromTo(cards, 
        { filter: "blur(10px)", opacity: 0, y: 30 },
        { 
          filter: "blur(0px)", opacity: 1, y: 0,
          stagger: 0.2,
          scrollTrigger: {
            trigger: scrollTrackRef.current,
            start: "top 80%",
          }
        }
      );
    }

  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="min-h-screen md:h-screen bg-background-alt flex flex-col justify-center overflow-hidden relative py-24 md:py-0">
      <div className="md:absolute md:top-24 md:left-12 z-10 pointer-events-none px-6 md:px-0 mb-12 md:mb-0">
        <TextReveal 
          text={`${innovationContent.title} ${innovationContent.titleAccent}`} 
          elementType="h2"
          className="text-4xl md:text-6xl font-black tracking-tighter max-w-3xl leading-tight text-foreground mb-4"
        />
        <p className="text-xl md:text-2xl text-accent-primary font-medium">{innovationContent.subtitle}</p>
      </div>

      <div ref={scrollTrackRef} className="flex flex-col md:flex-row gap-8 md:gap-16 px-6 md:px-[20vw] md:mt-40 md:whitespace-nowrap md:h-96 items-center">
        
        {innovationContent.items.map((item, idx) => (
          <div key={idx} className="innovation-card w-full md:w-[450px] shrink-0 h-[280px] md:h-[350px] rounded-3xl p-8 glass flex flex-col justify-between border-foreground/10 relative overflow-hidden group">
            <div className={`absolute inset-0 bg-gradient-to-br from-${idx === 0 ? 'foreground/5' : idx === 1 ? 'accent-secondary/10' : 'accent-primary/20'} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
            <div className="text-5xl mb-4">{item.icon}</div>
            <div>
              <h3 className="text-3xl font-bold mb-3 text-foreground">{item.title}</h3>
              <p className="text-foreground-muted text-lg whitespace-normal">
                {item.description}
              </p>
            </div>
          </div>
        ))}
        
        <div className="shrink-0 w-full md:w-[50vw] px-0 md:px-12 whitespace-normal flex items-center mt-12 md:mt-0 pb-12 md:pb-0">
          <p className="text-2xl md:text-4xl font-medium text-foreground-dim leading-relaxed">
            {innovationContent.conclusion.split(".").map((sentence, i, arr) => (
              <span key={i} className={i === arr.length - 2 ? "text-foreground mt-4 block" : ""}>
                {sentence}.
              </span>
            ))}
          </p>
        </div>

      </div>
    </section>
  );
}

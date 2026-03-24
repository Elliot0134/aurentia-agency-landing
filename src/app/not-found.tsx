"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";

export default function NotFound() {
  const orbRef1 = useRef<HTMLDivElement>(null);
  const orbRef2 = useRef<HTMLDivElement>(null);
  const orbRef3 = useRef<HTMLDivElement>(null);

  // Subtle mouse parallax on orbs
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      const dx = (e.clientX - cx) / cx;
      const dy = (e.clientY - cy) / cy;

      if (orbRef1.current) {
        orbRef1.current.style.transform = `translate(${dx * 18}px, ${dy * 12}px)`;
      }
      if (orbRef2.current) {
        orbRef2.current.style.transform = `translate(${dx * -14}px, ${dy * 18}px)`;
      }
      if (orbRef3.current) {
        orbRef3.current.style.transform = `translate(${dx * 10}px, ${dy * -10}px)`;
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <main className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-background text-foreground">

      {/* Grid pattern background */}
      <div className="absolute inset-0 hero-grid pointer-events-none" aria-hidden="true" />

      {/* Radial vignette to fade grid at edges */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 50% 50%, transparent 40%, var(--bg-base) 100%)",
        }}
        aria-hidden="true"
      />

      {/* Aurora orb 1 — top-left */}
      <div
        ref={orbRef1}
        className="aurora-orb aurora-orb-rose absolute -top-32 -left-32 w-[520px] h-[520px] opacity-30"
        style={{ transition: "transform 0.8s cubic-bezier(0.2, 1, 0.2, 1)" }}
        aria-hidden="true"
      />

      {/* Aurora orb 2 — bottom-right */}
      <div
        ref={orbRef2}
        className="aurora-orb aurora-orb-cyan absolute -bottom-40 -right-40 w-[480px] h-[480px] opacity-20"
        style={{ transition: "transform 0.8s cubic-bezier(0.2, 1, 0.2, 1)" }}
        aria-hidden="true"
      />

      {/* Aurora orb 3 — center accent */}
      <div
        ref={orbRef3}
        className="aurora-orb aurora-orb-rose absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] h-[320px] opacity-10"
        style={{
          filter: "blur(100px)",
          transition: "transform 0.8s cubic-bezier(0.2, 1, 0.2, 1)",
        }}
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 gap-6 max-w-2xl mx-auto">

        {/* 404 number — shimmer + gradient */}
        <div className="relative select-none" aria-label="404">
          {/* Base gradient text */}
          <span
            className="text-orange-gradient font-heading block leading-none"
            style={{ fontSize: "clamp(7rem, 22vw, 18rem)", fontWeight: 700 }}
          >
            404
          </span>

          {/* Shimmer overlay — same text, clipped, animated */}
          <span
            className="absolute inset-0 font-heading block leading-none overflow-hidden pointer-events-none"
            style={{ fontSize: "clamp(7rem, 22vw, 18rem)", fontWeight: 700 }}
            aria-hidden="true"
          >
            <span
              className="block text-orange-gradient relative"
              style={{ fontSize: "inherit", fontWeight: "inherit" }}
            >
              404
              {/* Shimmer sweep */}
              <span
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(105deg, transparent 35%, rgba(255,255,255,0.22) 50%, transparent 65%)",
                  animation: "shimmer 2.8s ease-in-out infinite",
                  backgroundSize: "200% 100%",
                }}
              />
            </span>
          </span>
        </div>

        {/* Headline */}
        <h1
          className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-foreground leading-tight"
          style={{ letterSpacing: "0.01em" }}
        >
          Cette page n&rsquo;existe pas.
        </h1>

        {/* Subtitle */}
        <p className="text-base sm:text-lg text-foreground-muted max-w-md leading-relaxed">
          Mais votre prochain projet, lui, est bien réel.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center gap-4 mt-4">
          {/* Primary — accent orange with shimmer */}
          <Link
            href="/"
            className="orange-shimmer bg-orange-gradient text-white rounded-full px-8 py-3.5 text-sm font-semibold tracking-wide transition-opacity duration-700 ease-in-out hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            Retour à l&rsquo;accueil
          </Link>

          {/* Secondary — ghost */}
          <Link
            href="/#contact"
            className="relative text-sm font-semibold text-foreground-muted hover:text-foreground transition-colors duration-700 ease-in-out group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-sm px-2 py-1"
          >
            Nous contacter
            {/* Animated underline */}
            <span
              className="absolute bottom-0 left-0 h-px w-0 bg-accent-primary transition-all duration-700 ease-in-out group-hover:w-full"
              aria-hidden="true"
            />
          </Link>
        </div>
      </div>

      {/* Floating decorative particles */}
      <div
        className="absolute top-[15%] left-[8%] w-2 h-2 rounded-full opacity-30"
        style={{
          background: "var(--accent)",
          animation: "float 8s ease-in-out infinite",
        }}
        aria-hidden="true"
      />
      <div
        className="absolute top-[25%] right-[12%] w-1.5 h-1.5 rounded-full opacity-20"
        style={{
          background: "var(--accent2)",
          animation: "float 11s ease-in-out infinite 2s",
        }}
        aria-hidden="true"
      />
      <div
        className="absolute bottom-[20%] left-[18%] w-1 h-1 rounded-full opacity-25"
        style={{
          background: "var(--accent)",
          animation: "float-slow 14s ease-in-out infinite 1s",
        }}
        aria-hidden="true"
      />
      <div
        className="absolute bottom-[30%] right-[8%] w-2.5 h-2.5 rounded-full opacity-15"
        style={{
          background: "var(--accent2)",
          animation: "float-drift 18s ease-in-out infinite 4s",
        }}
        aria-hidden="true"
      />
    </main>
  );
}

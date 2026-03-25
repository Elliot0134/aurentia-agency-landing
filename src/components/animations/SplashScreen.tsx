"use client";

import { useEffect, useRef, useCallback } from "react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";

if (typeof window !== "undefined") {
  gsap.registerPlugin(SplitText, MotionPathPlugin);
}

interface SplashScreenProps {
  onComplete: () => void;
}

export function SplashScreen({ onComplete }: SplashScreenProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const pillRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const hasRun = useRef(false);
  const stableOnComplete = useCallback(() => onComplete(), [onComplete]);

  useEffect(() => {
    if (hasRun.current) return;
    hasRun.current = true;

    const overlayEl = overlayRef.current;
    const pillEl = pillRef.current;
    if (!overlayEl || !pillEl) return;

    const run = () => {
      const navbarLogo = document.querySelector("[data-splash-logo-target]") as HTMLElement;
      const logoParent = document.querySelector("[data-splash-logo-parent]") as HTMLElement;
      const navbar = document.querySelector("[data-splash-navbar]") as HTMLElement;
      const navPill = document.querySelector("[data-splash-nav-pill]") as HTMLElement;
      const pageContent = document.querySelector("[data-splash-content]") as HTMLElement;

      if (!navbarLogo || !logoParent) {
        if (navbar) { navbar.setAttribute("data-splash-ready", ""); navbar.style.opacity = "1"; }
        if (pageContent) { pageContent.setAttribute("data-splash-ready", ""); pageContent.style.opacity = "1"; }
        stableOnComplete();
        return;
      }

      // ── 1. Measure navbar ──
      navbar.style.setProperty("opacity", "0.001", "important");
      const finalPillRect = navPill ? navPill.getBoundingClientRect() : null;
      navbar.style.removeProperty("opacity");

      // ── 2. Clone logo into pill ──
      const clonedLogo = navbarLogo.cloneNode(true) as HTMLElement;
      pillEl.appendChild(clonedLogo);
      const clonedAurentia = clonedLogo.querySelector("[data-logo-aurentia]") as HTMLElement;
      const clonedAgency = clonedLogo.querySelector("[data-logo-agency]") as HTMLElement;

      const bigFontSize = Math.min(window.innerWidth * 0.05, 56);

      gsap.set(clonedLogo, { position: "relative", display: "flex", alignItems: "baseline", whiteSpace: "nowrap" });
      gsap.set(clonedAurentia, { fontSize: bigFontSize, color: "var(--text-primary)" });
      gsap.set(clonedAgency, { fontSize: bigFontSize, color: "var(--text-primary)" });
      gsap.set(clonedAgency, { width: 0, overflow: "hidden" });
      gsap.set(clonedAurentia, { opacity: 0 });

      // Center pill
      const centerPill = () => {
        const r = pillEl.getBoundingClientRect();
        gsap.set(pillEl, { left: (window.innerWidth - r.width) / 2, top: (window.innerHeight - r.height) / 2 });
      };
      centerPill();

      // Split text
      const aurentiaSplit = new SplitText(clonedAurentia, { type: "chars" });
      const agencySplit = new SplitText(clonedAgency, { type: "chars" });
      gsap.set(agencySplit.chars, { opacity: 0, y: 25, scale: 0.7, filter: "blur(8px)" });

      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const openDuration = 0.8;

      // ── Timeline ──
      const tl = gsap.timeline();

      // Step 1: Pill + Aurentia appear
      tl.fromTo(pillEl,
        { opacity: 0, scale: 0.5, filter: "blur(24px)" },
        { opacity: 1, scale: 1, filter: "blur(0px)", duration: 0.7, ease: "power3.out" }
      );
      tl.fromTo(clonedAurentia, { opacity: 0 }, { opacity: 1, duration: 0.7, ease: "power3.out" }, "<");

      // ── Cursor ──
      const cursorEl = cursorRef.current!;
      const aChar = aurentiaSplit.chars[0] as HTMLElement;
      const aRect = aChar.getBoundingClientRect();
      const targetX = aRect.left - 40;
      const targetY = aRect.top;

      const pathCurviness = 1.2;
      gsap.set(cursorEl, { left: 0, top: 0, x: vw + 50, y: -50, opacity: 0, scale: 1 });

      const cursorPath = [
        { x: vw + 50, y: -50 },
        { x: vw * 0.5, y: vh * 0.7 },
        { x: targetX, y: targetY },
      ];

      tl.to(cursorEl, {
        motionPath: { path: cursorPath, curviness: pathCurviness, autoRotate: 146 as unknown as boolean },
        opacity: 1, duration: 1.3, ease: "power2.inOut",
      }, 0.3);

      // Grab
      tl.to({}, { duration: 0.08 });
      tl.to(cursorEl, { scale: 0.65, duration: 0.08, ease: "power3.in" }, "grab");
      tl.to(cursorEl, { scale: 0.85, duration: 0.12, ease: "power2.out" }, "grab+=0.08");

      // Drag
      tl.to(aurentiaSplit.chars, { skewX: 14, duration: 0.35, ease: "power2.out", stagger: 0.03 }, "grab+=0.1");
      tl.to(clonedAgency, {
        width: "auto", overflow: "visible", duration: openDuration, ease: "power3.out",
        onUpdate() {
          const r = pillEl.getBoundingClientRect();
          gsap.set(pillEl, { left: (vw - r.width) / 2 });
        },
      }, "grab+=0.18");
      tl.to(cursorEl, { x: `-=${90}`, rotation: -20, duration: openDuration, ease: "power3.out" }, "grab+=0.18");
      tl.to(agencySplit.chars, {
        opacity: 1, y: 0, scale: 1, filter: "blur(0px)",
        duration: 0.35, stagger: 0.07, ease: "power2.out",
      }, `grab+=${0.18 + openDuration * 0.7}`);

      // Release
      const releaseTime = `grab+=${0.18 + openDuration * 0.85}`;
      tl.to(cursorEl, { scale: 1.1, duration: 0.08, ease: "power3.out" }, releaseTime);
      tl.to(cursorEl, { scale: 1, duration: 0.15, ease: "power2.out" }, `${releaseTime}+=0.08`);
      tl.to(aurentiaSplit.chars, { skewX: 0, duration: 0.3, ease: "back.out(1.7)", stagger: 0.015 }, releaseTime);

      // Cursor exit
      tl.to(cursorEl, {
        x: `+=${60}`, y: `-=${40}`, opacity: 0, scale: 0.6, rotation: -15,
        duration: 0.35, ease: "power2.inOut",
      }, `${releaseTime}+=0.18`);

      // Hold
      tl.to({}, { duration: 0.25 });

      // ── Step 5: Prepare for flight ──
      tl.call(() => {
        aurentiaSplit.revert();
        agencySplit.revert();
        gsap.set(clonedAurentia, { fontSize: bigFontSize, color: "var(--text-primary)" });
        gsap.set(clonedAgency, { fontSize: bigFontSize, color: "var(--text-primary)" });
        document.body.appendChild(pillEl);
      });

      // ── Step 6: Fly pill to navbar center ──
      if (finalPillRect) {
        tl.call(() => {
          const pillRect = pillEl.getBoundingClientRect();
          const pillCenterX = pillRect.left + pillRect.width / 2;
          const pillCenterY = pillRect.top + pillRect.height / 2;
          const navCenterX = finalPillRect.left + finalPillRect.width / 2;
          const navCenterY = finalPillRect.top + finalPillRect.height / 2;

          const proxy = { cx: pillCenterX, cy: pillCenterY, w: pillRect.width, h: pillRect.height };

          gsap.to(proxy, {
            cx: navCenterX,
            cy: navCenterY - 8,
            w: pillRect.width * 0.5,
            h: finalPillRect.height,
            duration: 0.7,
            ease: "power3.inOut",
            onUpdate: () => {
              gsap.set(pillEl, {
                left: proxy.cx - proxy.w / 2,
                top: proxy.cy - proxy.h / 2,
                width: proxy.w,
                height: proxy.h,
              });
            },
          });

          // Shrink the text inside
          gsap.to([clonedAurentia, clonedAgency], {
            fontSize: "1.4rem",
            duration: 0.7,
            ease: "power3.inOut",
          });

          // Fade overlay
          gsap.to(overlayEl, { opacity: 0, duration: 0.6, delay: 0.15, ease: "power2.inOut" });

          if (pageContent) {
            pageContent.setAttribute("data-splash-ready", "");
            gsap.set(pageContent, { opacity: 1 });
            const heroEls = pageContent.querySelectorAll("[data-splash-hero]");
            gsap.set(heroEls, { opacity: 0 });
          }
        });
      }

      // Wait for the fly to complete
      tl.to({}, { duration: 0.8 });

      // Settle down gently to final position
      tl.to(pillEl, {
        top: "+=8",
        duration: 0.25,
        ease: "power2.out",
      });

      // ── Step 7: Pill expands into navbar ──
      tl.call(() => {
        gsap.set(clonedAurentia, { fontSize: "1.4rem" });
        gsap.set(clonedAgency, { fontSize: "1.4rem" });

        if (finalPillRect) {
          const fw = finalPillRect.width;
          const fl = finalPillRect.left;
          gsap.to(pillEl, {
            keyframes: [
              { left: fl - 8, top: finalPillRect.top, width: fw + 16, height: finalPillRect.height, duration: 0.35, ease: "power3.out" },
              { left: fl + 3, width: fw - 6, duration: 0.18, ease: "power2.inOut" },
              { left: fl, width: fw, duration: 0.22, ease: "power2.out" },
            ],
            onComplete: () => {
              pillEl.remove();
              pillEl.innerHTML = "";

              navbar.setAttribute("data-splash-ready", "");
              navbar.style.opacity = "1";

              const whatsappEl = navbar.querySelector("[data-splash-whatsapp]");

              gsap.to({}, { duration: 0.08,
                onComplete: () => {
                  if (!pageContent) { stableOnComplete(); return; }

                  const heroEls = Array.from(pageContent.querySelectorAll("[data-splash-hero]"));

                  const order = [heroEls[1], heroEls[2], heroEls[0], heroEls[3], heroEls[4], heroEls[5]].filter(Boolean);

                  order.forEach((el, i) => {
                    gsap.to(el, {
                      opacity: 1, filter: "blur(0px)", y: 0,
                      duration: 0.6,
                      delay: i * 0.18,
                      ease: "power2.out",
                    });
                  });

                  const heroTotalTime = order.length * 0.18 + 0.6;
                  if (whatsappEl) {
                    setTimeout(() => {
                      const waTl = gsap.timeline();
                      waTl.to(whatsappEl, { scale: 1.6, duration: 0.15, ease: "back.out(3)" });
                      waTl.to(whatsappEl, { rotation: -30, duration: 0.05 });
                      waTl.to(whatsappEl, { rotation: 30, duration: 0.05 });
                      waTl.to(whatsappEl, { rotation: -25, duration: 0.05 });
                      waTl.to(whatsappEl, { rotation: 25, duration: 0.05 });
                      waTl.to(whatsappEl, { rotation: -20, duration: 0.05 });
                      waTl.to(whatsappEl, { rotation: 20, duration: 0.05 });
                      waTl.to(whatsappEl, { rotation: -12, duration: 0.05 });
                      waTl.to(whatsappEl, { rotation: 12, duration: 0.05 });
                      waTl.to(whatsappEl, { rotation: -6, duration: 0.05 });
                      waTl.to(whatsappEl, { rotation: 6, duration: 0.05 });
                      waTl.to(whatsappEl, { rotation: 0, scale: 1, duration: 0.25, ease: "power2.out" });
                    }, heroTotalTime * 1000);
                  }

                  setTimeout(stableOnComplete, (heroTotalTime + 0.3) * 1000);
                },
              });
            },
          });
        }

        if (pageContent) {
          const heroEls = pageContent.querySelectorAll("[data-splash-hero]");
          gsap.set(heroEls, { opacity: 0, filter: "blur(10px)", y: 15 });
        }
      });

      return () => { tl.kill(); };
    };

    const start = () => setTimeout(run, 300);
    if (document.fonts?.ready) {
      document.fonts.ready.then(start);
    } else {
      setTimeout(run, 400);
    }
  }, [stableOnComplete]);

  return (
    <div ref={overlayRef} className="fixed inset-0 z-[9999] pointer-events-none" style={{ backgroundColor: "var(--bg-base)" }}>
      <div className="absolute inset-0 hero-grid" style={{ opacity: 0.08 }} />
      <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, transparent 25%, var(--bg-base) 75%, var(--bg-base) 100%)" }} />

      <div ref={cursorRef} className="fixed z-[10002] pointer-events-none" style={{ opacity: 0, transformOrigin: "0px 0px" }}>
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginLeft: "-7px", marginTop: "-4px" }}>
          <path d="M7 4C7 3.2 7.9 2.8 8.4 3.4L25.5 16.2C26.1 16.7 25.8 17.6 25 17.7L16 18.8C15.6 18.9 15.3 19.1 15.1 19.5L11.2 27.4C10.9 28.1 9.9 28 9.7 27.3L7 4Z" fill="var(--accent)" stroke="white" strokeWidth="1.5" strokeLinejoin="round" />
        </svg>
      </div>

      <div ref={pillRef} className="fixed z-[10001] rounded-full flex items-center justify-center border"
        style={{ padding: "12px 24px", background: "var(--glass-nav-bg)", backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)", borderColor: "var(--glass-border)", opacity: 0 }}
      />
    </div>
  );
}

"use client";

import { useRef, useState, useCallback, useMemo, useEffect, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, PresentationControls, Text, Float } from "@react-three/drei";
import * as THREE from "three";
import gsap from "gsap";
import confetti from "canvas-confetti";
import { PRIZES, SHOWCASE, pickPrize } from "./easterEggData";

/* ─────────────────────────────────────────────
   3D Wheel Component
   ───────────────────────────────────────────── */
const SEGMENT_ANGLE = (Math.PI * 2) / PRIZES.length;

function Wheel({ prizeIndex, isSpinning, onSpinEnd }: { prizeIndex: number | null, isSpinning: boolean, onSpinEnd: () => void }) {
  const groupRef = useRef<THREE.Group>(null);
  
  // Create materials
  const materials = useMemo(() => {
    return PRIZES.map(p => new THREE.MeshPhysicalMaterial({
      color: p.color,
      metalness: 0.2,
      roughness: 0.1,
      transmission: 0.8, // glass-like
      thickness: 0.5,
      opacity: p.isLoss ? 0.6 : 0.9,
      transparent: true,
      side: THREE.DoubleSide
    }));
  }, []);

  const textMaterial = useMemo(() => new THREE.MeshBasicMaterial({ color: "#ffffff" }), []);
  const rimMaterial = useMemo(() => new THREE.MeshStandardMaterial({ 
    color: "#222", 
    metalness: 0.9, 
    roughness: 0.2,
  }), []);
  
  const hubMaterial = useMemo(() => new THREE.MeshStandardMaterial({ 
    color: "#111", 
    metalness: 0.8, 
    roughness: 0.3,
  }), []);

  // Handle spin animation
  useEffect(() => {
    if (isSpinning && prizeIndex !== null && groupRef.current) {
      // Calculate final rotation
      // The wheel rotates counter-clockwise around Z, so target angle is negative or positive depending on setup.
      // Let's assume segment 0 is at top (angle 0). Segment i is at -i * SEGMENT_ANGLE.
      // To bring segment i to top, the wheel needs to rotate by +i * SEGMENT_ANGLE.
      
      const targetRotation = (prizeIndex * SEGMENT_ANGLE);
      const spins = 8 * Math.PI * 2; // 8 full spins
      const finalRz = spins + targetRotation;

      gsap.fromTo(
        groupRef.current.rotation,
        { z: groupRef.current.rotation.z % (Math.PI * 2) },
        {
          z: finalRz,
          duration: 6,
          ease: "power4.out",
          onComplete: () => {
            if (onSpinEnd) onSpinEnd();
          }
        }
      );
    }
  }, [isSpinning, prizeIndex, onSpinEnd]);

  return (
    <group ref={groupRef} rotation={[0, 0, 0]}>
      {/* Outer Rim */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[2, 0.1, 16, 64]} />
        <primitive object={rimMaterial} />
      </mesh>
      
      {/* Inner Rim */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.8, 0.05, 16, 64]} />
        <meshStandardMaterial color="#333" metalness={0.5} roughness={0.5} />
      </mesh>

      {/* Segments */}
      {PRIZES.map((prize, i) => {
        const startAngle = i * SEGMENT_ANGLE;
        // The cylinderGeometry takes (radiusTop, radiusBottom, height, radialSegments, heightSegments, openEnded, thetaStart, thetaLength)
        return (
          <group key={i}>
            <mesh rotation={[Math.PI / 2, 0, 0]}>
              <cylinderGeometry args={[1.8, 1.8, 0.1, 32, 1, false, startAngle, SEGMENT_ANGLE]} />
              <primitive object={materials[i]} />
            </mesh>
            {/* Separators */}
            <mesh rotation={[0, 0, startAngle]} position={[Math.cos(startAngle + Math.PI/2) * 0.9, Math.sin(startAngle + Math.PI/2) * 0.9, 0.06]}>
              <boxGeometry args={[0.02, 1.8, 0.05]} />
              <primitive object={rimMaterial} />
            </mesh>
            
            {/* Prize Label & Icon */}
            <group rotation={[0, 0, startAngle + SEGMENT_ANGLE / 2]}>
              <Text
                position={[0, 1.2, 0.08]}
                rotation={[0, 0, -Math.PI / 2]}
                fontSize={0.25}
                material={textMaterial}
                anchorX="center"
                anchorY="middle"
              >
                {prize.icon}
              </Text>
              <Text
                position={[0, 0.7, 0.08]}
                rotation={[0, 0, -Math.PI / 2]}
                fontSize={0.06}
                letterSpacing={0.1}
                material={textMaterial}
                anchorX="center"
                anchorY="middle"
              >
                {prize.label.toUpperCase()}
              </Text>
            </group>
          </group>
        );
      })}

      {/* Center Hub */}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0, 0.05]}>
        <cylinderGeometry args={[0.4, 0.45, 0.15, 32]} />
        <primitive object={hubMaterial} />
      </mesh>
      <mesh position={[0, 0, 0.13]}>
        <circleGeometry args={[0.3, 32]} />
        <meshStandardMaterial color="#000" />
      </mesh>
      <Text position={[0, 0, 0.14]} fontSize={0.3} color="#e8b931">
        A
      </Text>
    </group>
  );
}

/* ─────────────────────────────────────────────
   Pointer Component
   ───────────────────────────────────────────── */
function Pointer() {
  return (
    <group position={[0, 2.1, 0.1]}>
      <mesh rotation={[0, 0, Math.PI]}>
        <coneGeometry args={[0.2, 0.5, 4]} />
        <meshStandardMaterial color="#e8b931" metalness={0.8} roughness={0.2} emissive="#e8b931" emissiveIntensity={0.2}/>
      </mesh>
    </group>
  );
}

/* ─────────────────────────────────────────────
   Main 3D Roulette Form Component
   ───────────────────────────────────────────── */
type Step = "idle" | "spinning" | "result";

interface SecretRoulette3DProps {
  onClose: () => void;
}

export function SecretRoulette3D({ onClose }: SecretRoulette3DProps) {
  const [step, setStep] = useState<Step>("idle");
  const [email, setEmail] = useState("");
  const [prizeIndex, setPrizeIndex] = useState<number | null>(null);

  const isValidEmail = email.includes("@") && email.includes(".");
  const wonPrize = prizeIndex !== null ? PRIZES[prizeIndex] : null;

  const fireConfetti = useCallback(() => {
    const defaults = { startVelocity: 35, spread: 55, ticks: 100, zIndex: 9999, colors: ["#c96442", "#d97757", "#e8b931", "#9c87f5", "#fff"] };
    confetti({ ...defaults, particleCount: 60, origin: { x: 0.1, y: 0.6 }, angle: 60 });
    confetti({ ...defaults, particleCount: 60, origin: { x: 0.9, y: 0.6 }, angle: 120 });
    setTimeout(() => {
      confetti({ ...defaults, particleCount: 40, origin: { x: 0.2, y: 0.4 }, angle: 70 });
      confetti({ ...defaults, particleCount: 40, origin: { x: 0.8, y: 0.4 }, angle: 110 });
    }, 250);
  }, []);

  const handleSpin = useCallback(() => {
    if (!isValidEmail || step !== "idle") return;

    const winIndex = pickPrize();
    setPrizeIndex(winIndex);
    setStep("spinning");
  }, [isValidEmail, step]);

  const handleSpinEnd = useCallback(() => {
    if (prizeIndex !== null && !PRIZES[prizeIndex].isLoss) {
      fireConfetti();
    }
    setStep("result");
  }, [prizeIndex, fireConfetti]);

  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
        
        {/* ── LEFT — 3D Wheel ── */}
        <div className="relative lg:flex-1 flex items-center justify-center w-full h-[350px] sm:h-[450px] lg:h-[550px]">
          {/* Ambient glow */}
          <div className="absolute inset-[-30%] pointer-events-none z-0">
            <div className="w-full h-full rounded-full blur-[100px] opacity-20"
              style={{ background: "radial-gradient(circle, var(--accent) 0%, transparent 60%)" }}
            />
          </div>

          <div className="w-full h-full relative z-10">
            <Canvas camera={{ position: [0, -1, 4.5], fov: 50 }}>
              <ambientLight intensity={1.5} />
              <pointLight position={[10, 10, 10]} intensity={1.5} />
              <pointLight position={[-10, -10, -10]} intensity={0.5} color="#c96442" />

                <Suspense fallback={null}>
                  <Environment preset="night" />
                  <PresentationControls 
                    rotation={[0, 0, 0]} 
                    polar={[-Math.PI / 6, Math.PI / 6]} 
                    azimuth={[-Math.PI / 6, Math.PI / 6]}
                  >
                    <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
                      <group rotation={[0.2, 0, 0]}>
                        <Wheel prizeIndex={prizeIndex} isSpinning={step === "spinning"} onSpinEnd={handleSpinEnd} />
                        <Pointer />
                      </group>
                    </Float>
                  </PresentationControls>
                </Suspense>
              </Canvas>
          </div>

        </div>

        {/* ── RIGHT — Form & Results ── */}
        <div className="relative flex-1 flex flex-col items-center lg:items-start gap-6 text-center lg:text-left min-w-0 z-10">
          {/* Form — idle state */}
          {step === "idle" && (
            <div className="space-y-3 w-full max-w-sm animate-fade-in relative">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-primary/10 border border-accent-primary/20 mb-2">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-primary animate-pulse" />
                <span className="text-[10px] uppercase tracking-wider text-accent-primary font-bold">Concept 1 : Hologramme 3D</span>
              </div>
              <h3 className="text-xl sm:text-3xl font-heading font-bold text-foreground leading-tight mb-1">
                Tourne la roue,{" "}
                <span className="text-accent-primary">gagne ton cadeau</span>.
              </h3>
              <div className="relative mt-4">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="ton@email.com"
                  className="w-full px-5 py-4 rounded-2xl bg-foreground/[0.08] backdrop-blur-xl border border-foreground/[0.12] text-foreground placeholder:text-foreground-dim/50 focus:outline-none focus:border-accent-primary/40 focus:bg-foreground/[0.1] transition-all text-sm shadow-inner"
                  onKeyDown={(e) => e.key === "Enter" && handleSpin()}
                />
                {isValidEmail && (
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 animate-fade-in">
                     <div className="w-6 h-6 rounded-full bg-accent-primary/20 flex items-center justify-center">
                      <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                        <path d="M3 8.5L6.5 12L13 4" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                  </div>
                )}
              </div>
              <button
                onClick={handleSpin}
                disabled={!isValidEmail}
                className="w-full px-6 py-4 rounded-2xl bg-accent-gradient text-white font-bold text-sm border border-white/10 backdrop-blur-xl shadow-lg shadow-accent-primary/20 disabled:opacity-20 disabled:shadow-none disabled:cursor-not-allowed hover:enabled:shadow-[0_8px_30px_-4px_rgba(201,100,66,0.6)] hover:enabled:scale-[1.02] active:enabled:scale-[0.98] transition-all duration-300 mt-2"
              >
                Tourner la roue 3D
              </button>
            </div>
          )}

          {/* Spinning state */}
          {step === "spinning" && (
            <div className="animate-fade-in space-y-3">
              <p className="text-xl font-heading text-foreground">Génération de la chance...</p>
              <div className="flex items-center gap-2 lg:justify-start justify-center">
                <div className="w-2 h-2 rounded-full bg-accent-primary animate-bounce" style={{ animationDelay: "0ms" }} />
                <div className="w-2 h-2 rounded-full bg-accent-primary animate-bounce" style={{ animationDelay: "150ms" }} />
                <div className="w-2 h-2 rounded-full bg-accent-primary animate-bounce" style={{ animationDelay: "300ms" }} />
              </div>
            </div>
          )}

          {/* Result state */}
          {step === "result" && wonPrize && (
            <div className="space-y-5 animate-fade-in">
              {wonPrize.isLoss ? (
                <div className="space-y-3">
                  <p className="text-lg text-foreground-muted max-w-sm">
                    Pas de chance cette fois... Mais on t'a quand même envoyé un petit cadeau surprise par email.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="bg-foreground/[0.06] backdrop-blur-xl border border-foreground/[0.1] rounded-2xl p-6 max-w-sm border-l-4 relative overflow-hidden" style={{ borderLeftColor: wonPrize.color }}>
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" style={{ backgroundColor: wonPrize.color, opacity: 0.2 }} />
                    <div className="flex items-center gap-4 relative z-10">
                      <span className="text-4xl drop-shadow-md">{wonPrize.icon}</span>
                      <div>
                        <p className="text-sm font-mono tracking-wider uppercase mb-1" style={{ color: wonPrize.color }}>
                          Gagné !
                        </p>
                        <p className="font-heading font-bold text-xl text-foreground">{wonPrize.label}</p>
                        <p className="text-sm text-foreground-muted mt-1">{wonPrize.desc}</p>
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-foreground-muted">
                    Vérifie ta boîte de réception : <strong className="text-foreground">{email}</strong>
                  </p>
                </div>
              )}
              <button
                onClick={onClose}
                className="px-6 py-3 rounded-xl bg-foreground/[0.06] backdrop-blur-xl border border-foreground/[0.1] text-sm font-medium text-foreground-muted hover:text-foreground hover:bg-foreground/[0.1] transition-all"
              >
                Retour au site &darr;
              </button>
            </div>
          )}
        </div>
      </div>

      {/* ── Prize showcase ── */}
      {step === "idle" && (
        <div className="mt-14 lg:mt-20 animate-fade-in w-full">
           <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {SHOWCASE.map((item) => (
              <div
                key={item.label}
                className="group rounded-2xl bg-foreground/[0.05] backdrop-blur-xl border border-foreground/[0.08] p-5 transition-all duration-300 hover:bg-foreground/[0.08] hover:border-foreground/[0.15] hover:-translate-y-1"
              >
                <div className="flex items-start gap-4">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center text-xl flex-shrink-0 transition-transform duration-300 group-hover:scale-110 shadow-inner"
                    style={{ background: `linear-gradient(135deg, ${item.color}22, ${item.color}11)` }}
                  >
                    {item.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-base font-bold text-foreground">{item.label}</h4>
                    <p className="text-sm text-foreground-dim mt-1 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

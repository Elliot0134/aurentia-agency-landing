"use client";

import { useState } from "react";
import { Section } from "@/components/ui/Section";
import { TextReveal } from "@/components/animations/TextReveal";
import { BlurReveal } from "@/components/animations/BlurReveal";
import { cn } from "@/lib/utils";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface FormData {
  nom: string;
  email: string;
  typeProjet: string;
  budget: string;
  message: string;
}

// ---------------------------------------------------------------------------
// SVG icons — inline, no dependency
// ---------------------------------------------------------------------------

function MailIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

function PhoneIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2.22l3-.02a2 2 0 0 1 2 1.72c.127.96.36 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.77a16 16 0 0 0 6.29 6.29l1.62-1.62a2 2 0 0 1 2.11-.45c.907.34 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

function MapPinIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function CheckCircleIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <circle cx="12" cy="12" r="10" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

function ContactInfoItem({
  icon,
  label,
  value,
  href,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  href?: string;
}) {
  const inner = (
    <div className="flex items-start gap-4 group/item">
      <div
        className={cn(
          "flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center",
          "bg-accent-primary/10 text-accent-primary",
          "transition-all duration-700 ease-in-out",
          href && "group-hover/item:bg-accent-primary/20"
        )}
      >
        {icon}
      </div>
      <div className="flex flex-col gap-0.5">
        <span className="text-sm font-medium text-foreground/40 tracking-wide">
          {label}
        </span>
        <span
          className={cn(
            "text-base font-medium text-foreground",
            "transition-colors duration-700 ease-in-out",
            href && "group-hover/item:text-accent-primary"
          )}
        >
          {value}
        </span>
      </div>
    </div>
  );

  if (href) {
    return (
      <a href={href} className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary/50 rounded-lg">
        {inner}
      </a>
    );
  }

  return <div>{inner}</div>;
}

// ---------------------------------------------------------------------------
// Success state
// ---------------------------------------------------------------------------

function SuccessState() {
  return (
    <div className="flex flex-col items-center justify-center gap-6 py-16 text-center">
      {/* Animated checkmark ring */}
      <div
        className={cn(
          "relative w-20 h-20 rounded-full",
          "bg-accent-primary/10 flex items-center justify-center",
          "animate-[scaleIn_0.5s_ease-out_forwards]"
        )}
        style={{ animation: "scaleIn 0.5s ease-out forwards" }}
      >
        {/* Outer pulse ring */}
        <span
          aria-hidden="true"
          className="absolute inset-0 rounded-full bg-accent-primary/10 animate-ping"
          style={{ animationDuration: "2s" }}
        />
        <CheckCircleIcon className="w-10 h-10 text-accent-primary relative z-10" />
      </div>

      <div className="flex flex-col gap-2">
        <h3 className="text-2xl font-bold text-foreground tracking-tight">
          Message envoyé !
        </h3>
        <p className="text-base text-foreground/50 leading-relaxed max-w-xs mx-auto">
          On vous recontacte sous 24h pour échanger sur votre projet.
        </p>
      </div>

      {/* Response badge */}
      <div
        className={cn(
          "inline-flex items-center gap-2 px-4 py-2 rounded-full",
          "bg-foreground/[0.04] border border-foreground/[0.08]",
          "text-sm text-foreground/50"
        )}
      >
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400" />
        </span>
        Réponse sous 24h garantie
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Input / Label helpers
// ---------------------------------------------------------------------------

const inputBase = cn(
  "w-full bg-foreground/[0.03] border border-foreground/[0.12] rounded-xl px-4 py-3",
  "text-base text-foreground placeholder:text-foreground/30",
  "outline-none",
  "focus:border-accent-primary/40 focus:ring-1 focus:ring-accent-primary/20",
  "transition-all duration-500 ease-in-out",
  "appearance-none"
);

function Label({ htmlFor, children }: { htmlFor: string; children: React.ReactNode }) {
  return (
    <label
      htmlFor={htmlFor}
      className="block text-sm font-medium text-foreground/60 mb-2"
    >
      {children}
    </label>
  );
}

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------

export function HomeContact() {
  const [formData, setFormData] = useState<FormData>({
    nom: "",
    email: "",
    typeProjet: "",
    budget: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    // Simulate async — no actual API call
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 900);
  }

  return (
    <Section
      id="contact"
      theme="dark"
      className="section-divider-orange py-32"
    >
      {/* Ambient glow */}
      <div
        aria-hidden="true"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-accent-primary/[0.04] rounded-full blur-[120px] pointer-events-none"
      />

      <div className="relative z-10 flex flex-col items-center">

        {/* ── Section header ── */}
        <div className="text-center mb-16 w-full max-w-2xl mx-auto">
          <TextReveal
            text="Parlons de votre projet."
            elementType="h2"
            className="text-2xl md:text-3xl lg:text-4xl font-black tracking-tight mb-5 justify-center"
          />
          <BlurReveal>
            <p className="text-foreground/40 text-lg leading-relaxed">
              Un échange. Votre vision. Nos idées. Sans engagement.
            </p>
          </BlurReveal>
        </div>

        {/* ── Two-column layout ── */}
        <div className="w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">

          {/* ── LEFT: contact info ── */}
          <BlurReveal className="flex flex-col gap-10">

            {/* Contact details */}
            <div className="flex flex-col gap-6">
              <ContactInfoItem
                icon={<MailIcon className="w-5 h-5" />}
                label="Email"
                value="contact@aurentia.fr"
                href="mailto:contact@aurentia.fr"
              />
              <ContactInfoItem
                icon={<PhoneIcon className="w-5 h-5" />}
                label="Téléphone"
                value="+33 7 XX XX XX XX"
                href="tel:+337XXXXXXXX"
              />
              <ContactInfoItem
                icon={<MapPinIcon className="w-5 h-5" />}
                label="Localisation"
                value="Lyon, France"
              />
            </div>

            {/* Response time badge */}
            <div
              className={cn(
                "inline-flex items-center gap-3 self-start",
                "px-5 py-3 rounded-xl",
                "bg-foreground/[0.04] border border-foreground/[0.08]"
              )}
            >
              <span className="relative flex h-2.5 w-2.5 flex-shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-400" />
              </span>
              <span className="text-sm font-medium text-foreground/60">
                Réponse sous 24h
              </span>
            </div>

            {/* Trust badges */}
            <div
              className={cn(
                "px-5 py-4 rounded-xl",
                "bg-foreground/[0.03] border border-foreground/[0.06]"
              )}
            >
              <p className="text-sm text-foreground/40 font-medium tracking-wide text-center leading-relaxed">
                Sans engagement&nbsp;&nbsp;·&nbsp;&nbsp;100% gratuit&nbsp;&nbsp;·&nbsp;&nbsp;Premier échange de 30min
              </p>
            </div>

            {/* Decorative subtle separator line */}
            <div
              aria-hidden="true"
              className="hidden lg:block h-px w-full bg-gradient-to-r from-transparent via-foreground/[0.08] to-transparent"
            />

          </BlurReveal>

          {/* ── RIGHT: form ── */}
          <BlurReveal>
            <div
              className={cn(
                "relative rounded-2xl p-8 md:p-10",
                "bg-background border border-foreground/[0.1]",
                "shadow-xl shadow-foreground/[0.04]"
              )}
            >
              {submitted ? (
                <SuccessState />
              ) : (
                <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-6">

                  {/* Row: Nom + Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <Label htmlFor="nom">Nom</Label>
                      <input
                        id="nom"
                        name="nom"
                        type="text"
                        required
                        autoComplete="name"
                        placeholder="Jean Dupont"
                        value={formData.nom}
                        onChange={handleChange}
                        className={inputBase}
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        autoComplete="email"
                        placeholder="jean@dupont.fr"
                        value={formData.email}
                        onChange={handleChange}
                        className={inputBase}
                      />
                    </div>
                  </div>

                  {/* Type de projet */}
                  <div>
                    <Label htmlFor="typeProjet">Type de projet</Label>
                    <div className="relative">
                      <select
                        id="typeProjet"
                        name="typeProjet"
                        required
                        value={formData.typeProjet}
                        onChange={handleChange}
                        className={cn(
                          inputBase,
                          "cursor-pointer pr-10",
                          formData.typeProjet === "" && "text-foreground/20"
                        )}
                      >
                        <option value="" disabled hidden>
                          Choisir un type
                        </option>
                        <option value="site-vitrine" className="bg-background text-foreground">
                          Site Vitrine
                        </option>
                        <option value="landing-page" className="bg-background text-foreground">
                          Landing Page
                        </option>
                        <option value="application-saas" className="bg-background text-foreground">
                          Application SaaS
                        </option>
                        <option value="autre" className="bg-background text-foreground">
                          Autre
                        </option>
                      </select>
                      {/* Custom chevron */}
                      <span
                        aria-hidden="true"
                        className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-foreground/30"
                      >
                        <svg width="12" height="7" viewBox="0 0 12 7" fill="none">
                          <path d="M1 1l5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                    </div>
                  </div>

                  {/* Budget */}
                  <div>
                    <Label htmlFor="budget">Budget estimé</Label>
                    <div className="relative">
                      <select
                        id="budget"
                        name="budget"
                        required
                        value={formData.budget}
                        onChange={handleChange}
                        className={cn(
                          inputBase,
                          "cursor-pointer pr-10",
                          formData.budget === "" && "text-foreground/20"
                        )}
                      >
                        <option value="" disabled hidden>
                          Sélectionner une fourchette
                        </option>
                        <option value="1200-3000" className="bg-background text-foreground">
                          1 200€ – 3 000€
                        </option>
                        <option value="3000-10000" className="bg-background text-foreground">
                          3 000€ – 10 000€
                        </option>
                        <option value="plus-10000" className="bg-background text-foreground">
                          &gt; 10 000€
                        </option>
                      </select>
                      {/* Custom chevron */}
                      <span
                        aria-hidden="true"
                        className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-foreground/30"
                      >
                        <svg width="12" height="7" viewBox="0 0 12 7" fill="none">
                          <path d="M1 1l5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <Label htmlFor="message">Message</Label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={5}
                      placeholder="Décrivez votre projet, vos objectifs, vos contraintes…"
                      value={formData.message}
                      onChange={handleChange}
                      className={cn(inputBase, "min-h-[120px] resize-none")}
                    />
                  </div>

                  {/* Submit button with shimmer */}
                  <button
                    type="submit"
                    disabled={loading}
                    className={cn(
                      "relative overflow-hidden w-full py-4 rounded-xl",
                      "bg-accent-primary text-background text-base font-semibold tracking-wide",
                      "transition-all duration-700 ease-in-out",
                      "hover:brightness-110 active:scale-[0.98]",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary/50",
                      "disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100",
                      "cursor-pointer"
                    )}
                  >
                    {/* Shimmer layer */}
                    {!loading && (
                      <span
                        aria-hidden="true"
                        className={cn(
                          "absolute inset-0 -translate-x-full",
                          "bg-gradient-to-r from-transparent via-white/20 to-transparent",
                          "animate-[shimmer_2.4s_ease-in-out_infinite]"
                        )}
                        style={{
                          animation: "shimmer 2.4s ease-in-out infinite",
                        }}
                      />
                    )}

                    <span className="relative z-10 flex items-center justify-center gap-2">
                      {loading ? (
                        <>
                          {/* Spinner */}
                          <svg
                            className="animate-spin h-5 w-5 text-background"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            />
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                            />
                          </svg>
                          Envoi en cours…
                        </>
                      ) : (
                        "Envoyer ma demande"
                      )}
                    </span>
                  </button>

                  {/* Micro-copy below button */}
                  <p className="text-sm text-foreground/30 text-center leading-relaxed">
                    Premier échange gratuit · Aucun engagement
                  </p>
                </form>
              )}
            </div>
          </BlurReveal>

        </div>
      </div>

      {/* Shimmer keyframe — injected via style tag */}
      <style>{`
        @keyframes shimmer {
          0%   { transform: translateX(-100%); }
          60%  { transform: translateX(200%); }
          100% { transform: translateX(200%); }
        }
        @keyframes scaleIn {
          from { transform: scale(0.7); opacity: 0; }
          to   { transform: scale(1);   opacity: 1; }
        }
      `}</style>
    </Section>
  );
}

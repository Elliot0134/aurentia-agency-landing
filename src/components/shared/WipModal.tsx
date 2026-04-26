"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";

/**
 * Paths that are currently being redesigned. Any link pointing to one of these
 * should open the WIP modal instead of navigating.
 *
 * Keep this list as the single source of truth for the WIP gate.
 */
const WIP_PATHS = new Set<string>([
  "/sites-web/e-commerce",
  "/sites-web/sur-mesure",
  "/blog",
  "/cgv",
  "/mentions-legales",
  "/politique-confidentialite",
]);

/** WIP prefixes — any path starting with one of these (or matching exactly) opens the modal. */
const WIP_PREFIXES: string[] = ["/realisations"];

export function isWipHref(href: string): boolean {
  if (!href) return false;
  // Ignore hashes, query strings, and external URLs
  if (/^(https?:)?\/\//i.test(href) || href.startsWith("mailto:") || href.startsWith("tel:")) {
    return false;
  }
  const path = href.split("?")[0].split("#")[0];
  if (WIP_PATHS.has(path)) return true;
  return WIP_PREFIXES.some((p) => path === p || path.startsWith(`${p}/`));
}

interface WipModalContextValue {
  open: () => void;
}

const WipModalContext = createContext<WipModalContextValue | null>(null);

export function useWipModal(): WipModalContextValue {
  const ctx = useContext(WipModalContext);
  if (!ctx) {
    // Safe fallback: no-op (in case the provider is missing in some tree)
    return { open: () => {} };
  }
  return ctx;
}

export function WipModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const open = useCallback(() => {
    setSubmitted(false);
    setEmail("");
    setIsOpen(true);
  }, []);

  const close = useCallback(() => setIsOpen(false), []);

  // Lock body scroll while modal is open
  useEffect(() => {
    if (!isOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [isOpen]);

  // Close on Escape
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, close]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    // TODO: hook up to backend (Supabase / n8n / Resend)
    setSubmitted(true);
  };

  return (
    <WipModalContext.Provider value={{ open }}>
      {children}

      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="wip-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="fixed inset-0 z-[100] flex items-center justify-center px-4 sm:px-6"
            style={{
              backgroundColor: "color-mix(in srgb, var(--background) 60%, transparent)",
              backdropFilter: "blur(16px)",
              WebkitBackdropFilter: "blur(16px)",
            }}
            onClick={close}
          >
            <motion.div
              key="wip-card"
              initial={{ opacity: 0, y: 16, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.98 }}
              transition={{ duration: 0.55, ease: "easeInOut" }}
              className="relative w-full max-w-lg rounded-3xl p-8 sm:p-10"
              style={{
                backgroundColor:
                  "color-mix(in srgb, var(--background-surface) 92%, transparent)",
                backdropFilter: "blur(24px) saturate(1.4)",
                WebkitBackdropFilter: "blur(24px) saturate(1.4)",
                boxShadow:
                  "0 20px 60px -20px color-mix(in srgb, var(--foreground) 25%, transparent), 0 8px 24px -12px color-mix(in srgb, var(--foreground) 15%, transparent)",
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={close}
                aria-label="Fermer"
                className="absolute top-4 right-4 p-2 rounded-full text-foreground/60 hover:text-foreground hover:bg-foreground/5 transition-all duration-500 ease-in-out"
              >
                <X className="size-5" />
              </button>

              <div className="flex flex-col gap-6">
                <span className="inline-block self-start px-3 py-1 text-sm font-medium rounded-full bg-foreground/5 text-foreground/70">
                  Bientôt disponible
                </span>

                <h2 className="font-heading text-2xl sm:text-3xl font-bold text-foreground leading-tight">
                  Refonte du site en cours
                </h2>

                <p className="text-base text-foreground/70 leading-relaxed">
                  Cette page est en cours de refonte et sera bientôt
                  disponible. Laisse ton email si tu veux qu&rsquo;on te tienne
                  au courant.
                </p>

                {!submitted ? (
                  <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="ton@email.com"
                      className="flex-1 px-4 py-3 text-sm rounded-2xl bg-foreground/5 text-foreground placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-foreground/20 transition-all duration-500 ease-in-out"
                    />
                    <button
                      type="submit"
                      className="px-5 py-3 text-sm font-semibold rounded-2xl bg-foreground text-background hover:opacity-90 transition-opacity duration-500 ease-in-out whitespace-nowrap"
                    >
                      Me tenir au courant
                    </button>
                  </form>
                ) : (
                  <div className="px-4 py-3 text-sm rounded-2xl bg-foreground/5 text-foreground/80">
                    Merci, on te tient au courant dès que c&rsquo;est prêt.
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </WipModalContext.Provider>
  );
}

/**
 * Drop-in replacement for next/link that opens the WIP modal (instead of
 * navigating) when the target href is in WIP_PATHS.
 */
interface WipAwareLinkProps
  extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href"> {
  href: string;
  children: ReactNode;
}

export function WipAwareLink({
  href,
  children,
  onClick,
  ...rest
}: WipAwareLinkProps) {
  const { open } = useWipModal();
  const wip = isWipHref(href);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (wip) {
      e.preventDefault();
      open();
    }
    onClick?.(e);
  };

  if (wip) {
    return (
      <a href={href} onClick={handleClick} {...rest}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} onClick={handleClick} {...rest}>
      {children}
    </Link>
  );
}

"use client";
/* eslint-disable react-hooks/refs */

import * as React from "react";
import { useState, useRef, useEffect, useCallback } from "react";
import { useChat, type UIMessage } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import {
  X,
  Send,
  User,
  Calendar,
  Maximize2,
  Minimize2,
  RotateCcw,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { CalModal } from "@/components/shared/CalModal";

type Audience = "web" | "saas" | "ia" | "business";

type QuickReply = {
  label: string;
  value: Audience;
};

const QUICK_REPLIES: QuickReply[] = [
  { label: "Audit site web gratuit", value: "web" },
  { label: "Audit SaaS gratuit", value: "saas" },
  { label: "Audit IA gratuit", value: "ia" },
  { label: "Audit business gratuit", value: "business" },
];

const WELCOME_MESSAGE =
  "Bonjour ! C'est Elliot, fondateur d'Aurentia. On vous offre un audit gratuit (business, SaaS ou site web). Dites-moi lequel correspond à votre besoin :";

const AVATAR_SRC = "/a-propos/elliot.png";

function getMessageText(msg: UIMessage): string {
  return msg.parts
    .filter((p): p is { type: "text"; text: string } => p.type === "text")
    .map((p) => p.text)
    .join("");
}

function parseCTA(text: string): {
  cleanText: string;
  cta: null | { type: "appel" | "contact" };
} {
  if (text.includes("[CTA:APPEL]")) {
    return {
      cleanText: text.replace("[CTA:APPEL]", "").trim(),
      cta: { type: "appel" },
    };
  }
  if (text.includes("[CTA:CONTACT]")) {
    return {
      cleanText: text.replace("[CTA:CONTACT]", "").trim(),
      cta: { type: "contact" },
    };
  }
  return { cleanText: text, cta: null };
}

export function ChatbotWidget() {
  const router = useRouter();
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [audience, setAudience] = useState<Audience | null>(null);
  const [showTooltip, setShowTooltip] = useState(false);
  const [isHoveringToggle, setIsHoveringToggle] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [isWidgetVisible, setIsWidgetVisible] = useState(!isHomePage);
  const [calOpen, setCalOpen] = useState(false);

  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const audienceRef = useRef<Audience | null>(null);

  useEffect(() => {
    if (!isHomePage) {
      setIsWidgetVisible(true);
      return;
    }
    setIsWidgetVisible(window.scrollY > 30);
    const handleScroll = () => {
      setIsWidgetVisible(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHomePage]);

  useEffect(() => {
    audienceRef.current = audience;
  }, [audience]);

  const transport = React.useMemo(
    () =>
      new DefaultChatTransport({
        api: "/api/chat",
        body: () => ({ audience: audienceRef.current }),
      }),
    [],
  );

  const { messages, sendMessage, status, setMessages } = useChat({ transport });

  const isLoading = status === "submitted" || status === "streaming";

  useEffect(() => {
    const showTimer = window.setTimeout(() => {
      if (!isOpen) setShowTooltip(true);
    }, 10_000);

    let hideTimer: ReturnType<typeof setTimeout> | undefined;
    if (showTooltip) {
      hideTimer = setTimeout(() => setShowTooltip(false), 5_000);
    }

    return () => {
      clearTimeout(showTimer);
      if (hideTimer) clearTimeout(hideTimer);
    };
  }, [isOpen, showTooltip]);

  useEffect(() => {
    if (isOpen) setShowTooltip(false);
  }, [isOpen]);

  useEffect(() => {
    const scrollToBottom = () => {
      const el = scrollAreaRef.current;
      if (el) el.scrollTop = el.scrollHeight;
    };
    scrollToBottom();
    const raf = requestAnimationFrame(scrollToBottom);
    return () => cancelAnimationFrame(raf);
  }, [messages, isLoading, isOpen]);

  const handleQuickReply = useCallback(
    (reply: QuickReply) => {
      setAudience(reply.value);
      audienceRef.current = reply.value;
      sendMessage({ text: reply.label });
    },
    [sendMessage],
  );

  const handleSend = useCallback(() => {
    const text = inputValue.trim();
    if (!text || isLoading) return;
    setInputValue("");
    sendMessage({ text });
  }, [inputValue, isLoading, sendMessage]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleAppelClick = useCallback(() => {
    setIsOpen(false);
    setCalOpen(true);
  }, []);

  const handleReset = useCallback(() => {
    setMessages([]);
    setAudience(null);
    audienceRef.current = null;
    setInputValue("");
  }, [setMessages]);

  const canReset = audience !== null || messages.length > 0;

  const handleContactClick = useCallback(() => {
    setIsOpen(false);
    const scrollToBooking = () => {
      const el = document.getElementById("rdv-embed");
      if (!el) return;
      const lenis = (
        window as unknown as {
          __lenis?: { scrollTo: (target: Element, opts?: unknown) => void };
        }
      ).__lenis;
      if (lenis) lenis.scrollTo(el, { duration: 1.2, offset: -80 });
      else el.scrollIntoView({ behavior: "smooth", block: "start" });
    };
    if (pathname === "/contact") {
      scrollToBooking();
      return;
    }
    router.push("/contact#rdv-embed");
  }, [pathname, router]);

  const qualificationDone = audience !== null;

  return (
    <>
      <div
        className={cn(
          "fixed bottom-6 right-6 z-50 flex flex-col items-end transition-all duration-700 ease-in-out",
          isWidgetVisible
            ? "opacity-100 translate-y-0"
            : "pointer-events-none translate-y-4 opacity-0",
        )}
      >
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
              style={{ transformOrigin: "bottom right" }}
              className={cn(
                "mb-4 flex max-h-[calc(100dvh-9rem)] flex-col overflow-hidden rounded-2xl border border-foreground/10 bg-background shadow-2xl",
                isExpanded
                  ? "h-[calc(100dvh-9rem)] w-[calc(100vw-48px)] sm:h-[80vh] sm:max-h-[80vh] sm:w-[700px]"
                  : "h-[80vh] w-[calc(100vw-48px)] sm:h-[520px] sm:max-h-[520px] sm:w-[380px]",
              )}
            >
              {/* Header */}
              <div className="flex shrink-0 items-center justify-between bg-accent-primary px-4 py-3 text-white">
                <div className="flex items-center gap-3">
                  <Image
                    src={AVATAR_SRC}
                    alt="Elliot"
                    width={32}
                    height={32}
                    className="h-8 w-8 rounded-full bg-accent-primary object-cover"
                  />
                  <div>
                    <h3 className="text-sm font-medium">
                      Elliot · Fondateur Aurentia
                    </h3>
                    <p className="text-sm text-white/75">En ligne</p>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={handleReset}
                    disabled={!canReset}
                    className="cursor-pointer rounded-full p-2 transition-colors duration-500 ease-in-out hover:bg-white/15 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent"
                    aria-label="Recommencer la conversation"
                    title="Recommencer la conversation"
                  >
                    <RotateCcw className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="cursor-pointer rounded-full p-2 transition-colors duration-500 ease-in-out hover:bg-white/15"
                    aria-label={
                      isExpanded ? "Réduire le chat" : "Agrandir le chat"
                    }
                  >
                    {isExpanded ? (
                      <Minimize2 className="h-4 w-4" />
                    ) : (
                      <Maximize2 className="h-4 w-4" />
                    )}
                  </button>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="cursor-pointer rounded-full p-2 transition-colors duration-500 ease-in-out hover:bg-white/15"
                    aria-label="Fermer le chat"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              </div>

              {/* Messages */}
              <div
                ref={scrollAreaRef}
                data-lenis-prevent
                className="min-h-0 flex-1 overflow-y-auto overscroll-contain bg-foreground/[0.02] p-4"
              >
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col gap-2">
                    <div className="flex max-w-[85%] gap-3 self-start">
                      <Image
                        src={AVATAR_SRC}
                        alt="Elliot"
                        width={32}
                        height={32}
                        className="mt-auto h-8 w-8 shrink-0 rounded-full bg-accent-primary object-cover"
                      />
                      <div className="rounded-2xl rounded-bl-sm border border-foreground/10 bg-background p-3 text-sm leading-relaxed text-foreground">
                        {WELCOME_MESSAGE}
                      </div>
                    </div>

                    {!qualificationDone && (
                      <div className="flex flex-col gap-2 self-start pl-11">
                        {QUICK_REPLIES.map((reply) => (
                          <button
                            key={reply.value}
                            onClick={() => handleQuickReply(reply)}
                            className="cursor-pointer rounded-xl border border-accent-primary bg-background px-4 py-2 text-left text-sm font-medium text-accent-primary transition-colors duration-500 ease-in-out hover:bg-accent-primary hover:text-white"
                          >
                            {reply.label}
                          </button>
                        ))}
                        <button
                          onClick={handleAppelClick}
                          className="mt-1 inline-flex cursor-pointer items-center gap-2 rounded-xl bg-accent-primary px-4 py-2 text-left text-sm font-medium text-white transition-opacity duration-500 ease-in-out hover:opacity-90"
                        >
                          <Calendar className="h-3.5 w-3.5" />
                          Réserver mon appel
                        </button>
                      </div>
                    )}
                  </div>

                  {messages.map((msg) => {
                    const rawText = getMessageText(msg);
                    const { cleanText, cta } =
                      msg.role === "assistant"
                        ? parseCTA(rawText)
                        : { cleanText: rawText, cta: null };

                    return (
                      <div key={msg.id} className="flex flex-col gap-2">
                        <div
                          className={cn(
                            "flex max-w-[85%] gap-3",
                            msg.role === "user"
                              ? "flex-row-reverse self-end"
                              : "self-start",
                          )}
                        >
                          {msg.role === "user" ? (
                            <div className="mt-auto flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-foreground/10 text-foreground">
                              <User className="h-4 w-4" />
                            </div>
                          ) : (
                            <Image
                              src={AVATAR_SRC}
                              alt="Elliot"
                              width={32}
                              height={32}
                              className="mt-auto h-8 w-8 shrink-0 rounded-full bg-accent-primary object-cover"
                            />
                          )}

                          <div
                            className={cn(
                              "whitespace-pre-line rounded-2xl p-3 text-sm leading-relaxed",
                              msg.role === "user"
                                ? "rounded-br-sm bg-accent-primary text-white"
                                : "rounded-bl-sm border border-foreground/10 bg-background text-foreground",
                            )}
                          >
                            {cleanText}
                          </div>
                        </div>

                        {cta && status !== "streaming" && (
                          <div className="self-start pl-11">
                            {cta.type === "appel" ? (
                              <button
                                onClick={handleAppelClick}
                                className="inline-flex cursor-pointer items-center gap-2 rounded-xl bg-accent-primary px-4 py-2 text-sm font-medium text-white transition-opacity duration-500 ease-in-out hover:opacity-90"
                              >
                                <Calendar className="h-3.5 w-3.5" />
                                Réserver un appel
                              </button>
                            ) : (
                              <button
                                onClick={handleContactClick}
                                className="inline-flex cursor-pointer items-center gap-2 rounded-xl border border-accent-primary bg-background px-4 py-2 text-sm font-medium text-accent-primary transition-colors duration-500 ease-in-out hover:bg-accent-primary hover:text-white"
                              >
                                <Calendar className="h-3.5 w-3.5" />
                                Réserver mon audit
                              </button>
                            )}
                          </div>
                        )}
                      </div>
                    );
                  })}

                  {isLoading && (
                    <div className="flex max-w-[85%] gap-3 self-start">
                      <Image
                        src={AVATAR_SRC}
                        alt="Elliot"
                        width={32}
                        height={32}
                        className="mt-auto h-8 w-8 shrink-0 rounded-full bg-accent-primary object-cover"
                      />
                      <div className="flex items-center gap-1 rounded-2xl rounded-bl-sm border border-foreground/10 bg-background p-4">
                        <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-foreground/40" />
                        <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-foreground/40 [animation-delay:0.2s]" />
                        <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-foreground/40 [animation-delay:0.4s]" />
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Input */}
              <div className="shrink-0 border-t border-foreground/10 bg-background p-3">
                <div className="flex items-center gap-2">
                  <input
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Posez votre question à Elliot..."
                    className="h-10 flex-1 rounded-xl border border-foreground/10 bg-foreground/5 px-3 text-sm text-foreground outline-none transition-colors duration-500 ease-in-out placeholder:text-foreground/40 focus:border-foreground/30 focus:bg-background disabled:cursor-not-allowed disabled:opacity-50"
                    disabled={isLoading}
                  />
                  <button
                    onClick={handleSend}
                    disabled={!inputValue.trim() || isLoading}
                    className="flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-xl bg-accent-primary text-white transition-opacity duration-500 ease-in-out hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
                    aria-label="Envoyer"
                  >
                    <Send className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <button
          onClick={() => {
            setShowTooltip(false);
            setIsOpen(true);
          }}
          className={cn(
            "mb-3 mr-1 cursor-pointer whitespace-nowrap rounded-2xl border border-foreground/10 bg-background px-4 py-2 text-sm font-medium text-foreground shadow-lg transition-all duration-500 ease-in-out hover:shadow-xl",
            (showTooltip || isHoveringToggle) && !isOpen
              ? "pointer-events-auto translate-y-0 opacity-100"
              : "pointer-events-none translate-y-2 opacity-0",
          )}
          aria-label="Ouvrir le chat pour réserver votre audit"
          tabIndex={(showTooltip || isHoveringToggle) && !isOpen ? 0 : -1}
        >
          Réservez votre audit gratuit
        </button>

        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          onMouseEnter={() => setIsHoveringToggle(true)}
          onMouseLeave={() => setIsHoveringToggle(false)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="relative flex h-14 w-14 cursor-pointer items-center justify-center overflow-hidden rounded-full bg-accent-primary text-white shadow-xl shadow-accent-primary/30"
          aria-label={isOpen ? "Fermer le chat" : "Ouvrir le chat"}
        >
          <AnimatePresence mode="wait" initial={false}>
            {isOpen ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                <X className="h-6 w-6" />
              </motion.div>
            ) : (
              <motion.div
                key="avatar"
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.5, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="h-full w-full"
              >
                <Image
                  src={AVATAR_SRC}
                  alt="Elliot"
                  width={56}
                  height={56}
                  className="h-full w-full object-cover"
                />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      </div>

      <CalModal open={calOpen} onClose={() => setCalOpen(false)} />
    </>
  );
}

"use client";

import { useEffect, useCallback, useRef } from "react";
import Cal, { getCalApi } from "@calcom/embed-react";
import { X } from "lucide-react";

interface CalModalProps {
  open: boolean;
  onClose: () => void;
  calLink?: string;
}

export function CalModal({ open, onClose, calLink = "elliot-estrade-ixfuya/appel-decouverte" }: CalModalProps) {
  const backdropRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const closingRef = useRef(false);

  // Cal.com init
  useEffect(() => {
    if (!open) return;
    const init = async () => {
      const cal = await getCalApi({ namespace: "appel-decouverte" });
      cal("ui", {
        hideEventTypeDetails: false,
        layout: "month_view",
      });
    };
    init();
  }, [open]);

  // Smooth close with exit animation
  const handleClose = useCallback(() => {
    if (closingRef.current) return;
    closingRef.current = true;
    if (backdropRef.current) backdropRef.current.style.animation = "modal-backdrop-out 0.3s cubic-bezier(0.4, 0, 0.2, 1) forwards";
    if (modalRef.current) modalRef.current.style.animation = "modal-glass-out 0.3s cubic-bezier(0.4, 0, 0.2, 1) forwards";
    setTimeout(() => {
      closingRef.current = false;
      onClose();
    }, 280);
  }, [onClose]);

  // Escape key
  useEffect(() => {
    if (!open) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [open, handleClose]);

  // Lock body scroll
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label="Réserver un call"
    >
      {/* Backdrop — click to close */}
      <div
        ref={backdropRef}
        className="absolute inset-0 modal-backdrop-in cursor-pointer"
        onClick={handleClose}
        style={{ background: "rgba(0, 0, 0, 0.4)", backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)" }}
      />

      {/* Modal — glass, no border */}
      <div
        ref={modalRef}
        className="relative w-full max-w-2xl max-h-[90vh] rounded-2xl overflow-hidden modal-glass-in"
        style={{
          background: "var(--glass-nav-bg)",
          backdropFilter: "blur(32px) saturate(1.4)",
          WebkitBackdropFilter: "blur(32px) saturate(1.4)",
          boxShadow: "0 24px 80px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.06) inset",
        }}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-6 py-4"
          style={{ borderBottom: "1px solid rgba(255, 255, 255, 0.06)" }}
        >
          <h2 className="text-lg font-semibold text-foreground">Réserver un call gratuit</h2>
          <button
            onClick={handleClose}
            className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-white/10 transition-all duration-200 text-foreground/60 hover:text-foreground"
            aria-label="Fermer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Cal.com Embed */}
        <div className="overflow-y-auto" style={{ maxHeight: "calc(90vh - 65px)" }}>
          <Cal
            namespace="appel-decouverte"
            calLink={calLink}
            style={{ width: "100%", height: "100%", overflow: "auto" }}
            config={{
              layout: "month_view",
              useSlotsViewOnSmallScreen: "true",
            }}
          />
        </div>
      </div>
    </div>
  );
}

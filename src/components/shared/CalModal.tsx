"use client";

import { useEffect, useCallback, useRef } from "react";
import Cal, { getCalApi } from "@calcom/embed-react";

const NAMESPACE = "appel-decouverte";

interface CalModalProps {
  open: boolean;
  onClose: () => void;
  calLink?: string;
}

export function CalModal({
  open,
  onClose,
  calLink = "elliot-estrade-ixfuya/appel-decouverte",
}: CalModalProps) {
  const closingRef = useRef(false);

  useEffect(() => {
    if (!open) return;
    (async () => {
      const cal = await getCalApi({ namespace: NAMESPACE });
      cal("ui", {
        hideEventTypeDetails: false,
        layout: "month_view",
      });
    })();
  }, [open]);

  const handleClose = useCallback(() => {
    if (closingRef.current) return;
    closingRef.current = true;
    setTimeout(() => {
      closingRef.current = false;
      onClose();
    }, 0);
  }, [onClose]);

  useEffect(() => {
    if (!open) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [open, handleClose]);

  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
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
      <button
        type="button"
        onClick={handleClose}
        aria-label="Fermer"
        className="absolute inset-0 cursor-pointer"
        style={{
          background: "rgba(0, 0, 0, 0.4)",
          backdropFilter: "blur(8px)",
          WebkitBackdropFilter: "blur(8px)",
        }}
      />

      <div
        className="relative w-full max-w-3xl overflow-y-auto overscroll-contain lg:h-[680px] lg:max-w-5xl lg:overflow-hidden [&::-webkit-scrollbar]:hidden"
        style={{
          maxHeight: "90vh",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <Cal
          namespace={NAMESPACE}
          calLink={calLink}
          style={{ width: "100%", display: "block" }}
          config={{ layout: "month_view" }}
        />
      </div>
    </div>
  );
}

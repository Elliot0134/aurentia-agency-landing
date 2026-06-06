"use client";

import dynamic from "next/dynamic";

// Charge le ChatbotWidget côté client uniquement, après hydratation.
// Sort l'AI SDK (useChat) + Framer Motion du bundle initial de chaque page
// (aucune utilité au SSR) → réduit le JS critique, le LCP et l'INP.
const ChatbotWidget = dynamic(
  () => import("@/components/v2/chatbot/ChatbotWidget").then((m) => m.ChatbotWidget),
  { ssr: false },
);

export function ChatbotWidgetLazy() {
  return <ChatbotWidget />;
}

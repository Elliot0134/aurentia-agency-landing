import type { ReactNode } from "react";
import { Plus_Jakarta_Sans, JetBrains_Mono, Geist } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { ScrollProgress } from "@/components/animations/ScrollProgress";
import { ScrollToTop } from "@/components/animations/ScrollToTop";
import { ThemeProvider } from "@/components/ui/ThemeProvider";
import { SubNavProvider } from "@/components/shared/SubNavContext";
import { NavbarV2 } from "@/components/v2/layout/NavbarV2";
import { FooterV2 } from "@/components/v2/layout/FooterV2";
import { ChatbotWidget } from "@/components/v2/chatbot/ChatbotWidget";
import { WipModalProvider } from "@/components/shared/WipModal";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const recoleta = localFont({
  src: [
    { path: "../../public/fonts/Recoleta-Regular.woff", weight: "400", style: "normal" },
    { path: "../../public/fonts/Recoleta-Bold.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-recoleta",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="fr"
      className={`${plusJakarta.variable} ${jetbrainsMono.variable} ${recoleta.variable} ${geist.variable}`}
      suppressHydrationWarning
    >
      <body data-v2-root className="bg-background text-foreground">
        <ThemeProvider>
          <SubNavProvider>
            <WipModalProvider>
              <ScrollToTop />
              <ScrollProgress />
              <NavbarV2 />
              <main className="flex flex-col">{children}</main>
              <FooterV2 />
              <ChatbotWidget />
            </WipModalProvider>
          </SubNavProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

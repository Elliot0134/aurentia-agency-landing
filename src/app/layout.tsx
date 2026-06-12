import type { ReactNode } from "react";
import type { Metadata } from "next";
import Script from "next/script";
import { Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { ScrollProgress } from "@/components/animations/ScrollProgress";
import { ScrollToTop } from "@/components/animations/ScrollToTop";
import { ThemeProvider } from "@/components/ui/ThemeProvider";
import { SubNavProvider } from "@/components/shared/SubNavContext";
import { NavbarV2 } from "@/components/v2/layout/NavbarV2";
import { FooterV2 } from "@/components/v2/layout/FooterV2";
import { WipModalProvider } from "@/components/shared/WipModal";
import { CookieConsent } from "@/components/shared/CookieConsent";
import { ChatbotWidgetLazy } from "@/components/v2/chatbot/ChatbotWidgetLazy";

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

export const metadata: Metadata = {
  metadataBase: new URL("https://www.aurentia.agency"),
  title: {
    default: "Aurentia Agency — Sites web, SaaS & IA · Avignon",
    template: "%s | Aurentia Agency",
  },
  description: "Agence web & IA basée à Avignon. Sites sur-mesure, SaaS, automatisations et formations IA. 25 ans de craft, livraison rapide.",
  applicationName: "Aurentia Agency",
  authors: [{ name: "Aurentia Agency" }],
  openGraph: {
    type: "website",
    locale: "fr_FR",
    siteName: "Aurentia Agency",
    url: "https://www.aurentia.agency",
    title: "Aurentia Agency — Sites web, SaaS & IA · Avignon",
    description: "Agence web & IA basée à Avignon. Sites sur-mesure, SaaS, automatisations et formations IA.",
    images: [{ url: "/images/opengraph/opengraph.png", width: 1200, height: 630, alt: "Aurentia Agency" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Aurentia Agency",
    description: "Agence web & IA · Avignon",
    images: ["/images/opengraph/opengraph.png"],
  },
  alternates: { canonical: "/", languages: { "fr-FR": "/", "x-default": "/" } },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  },
  icons: { icon: "/icon.png", apple: "/apple-icon.png", shortcut: "/favicon.ico" },
  category: "technology",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="fr"
      className={`${plusJakarta.variable} ${jetbrainsMono.variable} ${recoleta.variable}`}
      suppressHydrationWarning
    >
      <body data-v2-root className="bg-background text-foreground">
        {/* Google tag (gtag.js) — Google Ads AW-18228632740 */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=AW-18228632740"
          strategy="afterInteractive"
        />
        <Script id="google-ads-gtag" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('consent', 'default', {
              ad_storage: 'denied',
              ad_user_data: 'denied',
              ad_personalization: 'denied',
              analytics_storage: 'denied'
            });
            if (document.cookie.indexOf('aurentia_consent=granted') !== -1) {
              gtag('consent', 'update', {
                ad_storage: 'granted',
                ad_user_data: 'granted',
                ad_personalization: 'granted',
                analytics_storage: 'granted'
              });
            }
            gtag('js', new Date());
            gtag('config', 'AW-18228632740');
          `}
        </Script>
        <ThemeProvider>
          <SubNavProvider>
            <WipModalProvider>
              <ScrollToTop />
              <ScrollProgress />
              <NavbarV2 />
              <main className="flex flex-col">{children}</main>
              <FooterV2 />
              <ChatbotWidgetLazy />
              <CookieConsent />
            </WipModalProvider>
          </SubNavProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

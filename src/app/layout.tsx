import type { Metadata } from "next";
import { Plus_Jakarta_Sans, JetBrains_Mono, Geist } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { LenisProvider } from "@/components/animations/LenisProvider";
import { CustomCursor } from "@/components/animations/CustomCursor";
import { ScrollProgress } from "@/components/animations/ScrollProgress";
import { ThemeProvider } from "@/components/ui/ThemeProvider";
import { SplashWrapper } from "@/components/animations/SplashWrapper";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const recoleta = localFont({
  src: [
    {
      path: "../../public/fonts/Recoleta-Regular.woff",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/Recoleta-Bold.woff2",
      weight: "700",
      style: "normal",
    },
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
  title: "Aurentia Agency — Sites web pour conciergeries | Livré en 48h",
  description:
    "Votre site professionnel unique, livré en 48h par l'IA + 20 ans d'expertise web. SEO intégré, moins de 1 000€. Aperçu gratuit avant paiement.",
  keywords: [
    "conciergerie",
    "site web conciergerie",
    "création site web",
    "agence web IA",
    "site vitrine",
    "Aurentia",
    "48h",
    "SEO conciergerie",
  ],
  authors: [{ name: "Aurentia Agency" }],
  openGraph: {
    title: "Aurentia Agency — Votre site pro en 48h",
    description:
      "Sites web uniques pour conciergeries. Design sur-mesure par l'IA, SEO intégré, livré en 48h. Moins de 1 000€.",
    url: "https://aurentia.agency/conciergeries",
    siteName: "Aurentia Agency",
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Aurentia Agency — Sites web pour conciergeries",
    description:
      "Votre site professionnel unique, livré en 48h. Moins de 1 000€.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={cn(plusJakarta.variable, jetbrainsMono.variable, recoleta.variable, "font-sans", geist.variable)}
      suppressHydrationWarning
    >
      <head>
        <style
          dangerouslySetInnerHTML={{
            __html: `[data-splash-content]:not([data-splash-ready]){opacity:0!important}[data-splash-navbar]:not([data-splash-ready]){opacity:0!important}`,
          }}
        />
      </head>
      <body className="min-h-screen bg-background text-foreground antialiased overflow-x-hidden">
        <ThemeProvider>
          <LenisProvider>
            <CustomCursor />
            <ScrollProgress />
            <SplashWrapper />
            {children}
          </LenisProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

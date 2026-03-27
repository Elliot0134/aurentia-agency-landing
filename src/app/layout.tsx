import type { Metadata } from "next";
import { Plus_Jakarta_Sans, JetBrains_Mono, Geist } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { LenisProvider } from "@/components/animations/LenisProvider";
import { CustomCursor } from "@/components/animations/CustomCursor";
import { ScrollProgress } from "@/components/animations/ScrollProgress";
import { ThemeProvider } from "@/components/ui/ThemeProvider";
import { SplashWrapper } from "@/components/animations/SplashWrapper";
import { ScrollToTop } from "@/components/animations/ScrollToTop";
import { Navbar } from "@/components/layout/Navbar";
import { FloatingCTA } from "@/components/shared/FloatingCTA";
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
  title: "Aurentia — Agence web premium à Avignon | Sites vitrines & SaaS en 48h",
  description:
    "Agence web premium. Sites vitrines, landing pages et applications SaaS sur-mesure. Design premium, développement Next.js, SEO intégré. Livré en 48h à 2 semaines.",
  keywords: [
    "agence web avignon",
    "site vitrine sur-mesure",
    "landing page conversion",
    "développement SaaS",
    "Next.js",
    "agence digitale premium",
    "création site web",
    "design web",
  ],
  authors: [{ name: "Aurentia" }],
  creator: "Aurentia",
  metadataBase: new URL("https://aurentia.fr"),
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "https://aurentia.fr",
    siteName: "Aurentia",
    title: "Aurentia — Agence web premium à Avignon",
    description: "Sites vitrines, landing pages et applications SaaS sur-mesure. Design premium, livré en 48h.",
    images: [
      {
        url: "https://aurentia.fr/images/opengraph/opengraph.png",
        width: 1200,
        height: 630,
        alt: "Aurentia — Agence web premium",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Aurentia — Agence web premium à Avignon",
    description: "Sites vitrines, landing pages et applications SaaS sur-mesure.",
    images: ["https://aurentia.fr/images/opengraph/opengraph.png"],
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ProfessionalService",
              name: "Aurentia",
              description: "Agence web premium — Sites vitrines, landing pages et applications SaaS sur-mesure",
              url: "https://aurentia.fr",
              logo: "https://aurentia.fr/logo.png",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Avignon",
                addressCountry: "FR",
              },
              priceRange: "€€",
              serviceType: ["Web Development", "Landing Page Design", "SaaS Development"],
              areaServed: {
                "@type": "Country",
                name: "France",
              },
            }),
          }}
        />
      </head>
      <body className="min-h-screen bg-background text-foreground antialiased overflow-x-hidden">
        <ThemeProvider>
          <LenisProvider>
            <ScrollToTop />
            <CustomCursor />
            <ScrollProgress />
            <Navbar />
            <SplashWrapper />
            <FloatingCTA />
            {children}
          </LenisProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

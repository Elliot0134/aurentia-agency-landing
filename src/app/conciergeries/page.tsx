import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ConciergerieHero } from "@/components/conciergerie/ConciergerieHero";
import { ConciergerieProblem } from "@/components/conciergerie/ConciergerieProblem";
import { ConciergerieSolution } from "@/components/conciergerie/ConciergerieSolution";
import { ConciergerieInnovation } from "@/components/conciergerie/ConciergerieInnovation";
import { HomeProcess as ConciergerieProcess } from "@/components/home/HomeProcess";
import { HomePortfolio as ConciergeriePortfolio } from "@/components/home/HomePortfolio";
import { ConciergeriePricing } from "@/components/conciergerie/ConciergeriePricing";
import { ConciergerieComparison } from "@/components/conciergerie/ConciergerieComparison";
import { ConciergerieFAQ } from "@/components/conciergerie/ConciergerieFAQ";
import { ConciergerieLeadMagnet } from "@/components/conciergerie/ConciergerieLeadMagnet";
import { ConciergerieCTA } from "@/components/conciergerie/ConciergerieCTA";

export default function ConciergeriesPage() {
  return (
    <>
      <Navbar />
      <main className="flex min-h-screen flex-col items-center justify-between w-full overflow-hidden">
        <ConciergerieHero />
        <ConciergerieProblem />
        <ConciergerieSolution />
        <ConciergerieInnovation />
        <ConciergerieProcess />
        <ConciergeriePortfolio />
        <ConciergeriePricing />
        <ConciergerieComparison />
        <ConciergerieFAQ />
        <ConciergerieLeadMagnet />
        <ConciergerieCTA />
      </main>
      <Footer />
    </>
  );
}

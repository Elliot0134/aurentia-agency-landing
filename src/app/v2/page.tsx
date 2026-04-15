// src/app/v2/page.tsx
import { HomeHeroV2 } from "@/components/v2/home/HomeHeroV2";
import { HomeLogoStrip } from "@/components/v2/home/HomeLogoStrip";
import { HomePillarsGrid } from "@/components/v2/home/HomePillarsGrid";
import { HomeWhyAurentia } from "@/components/v2/home/HomeWhyAurentia";
import { HomeRealisationsPreview } from "@/components/v2/home/HomeRealisationsPreview";
import { HomeTestimonialsV2 } from "@/components/v2/home/HomeTestimonialsV2";
import { HomeMethodV2 } from "@/components/v2/home/HomeMethodV2";
import { HomeFAQV2 } from "@/components/v2/home/HomeFAQV2";
import { HomeContactV2 } from "@/components/v2/home/HomeContactV2";

export default function HomeV2() {
  return (
    <>
      <HomeHeroV2 />
      <HomeLogoStrip />
      <HomePillarsGrid />
      <HomeWhyAurentia />
      <HomeRealisationsPreview />
      <HomeTestimonialsV2 />
      <HomeMethodV2 />
      <HomeFAQV2 />
      <HomeContactV2 />
    </>
  );
}

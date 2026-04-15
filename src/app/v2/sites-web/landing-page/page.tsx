// src/app/v2/sites-web/landing-page/page.tsx
import type { Metadata } from "next";
import { SubPage } from "@/components/v2/subpage/SubPage";
import { sitesWebLandingData } from "@/data/v2/sites-web-landing";

export const metadata: Metadata = {
  title: "Landing pages haute conversion dès 1 500 €",
  description:
    "Landing pages design spectaculaire, optimisées conversion. Pour startups et SaaS.",
};

export default function LandingPageSubpage() {
  return <SubPage data={sitesWebLandingData} />;
}

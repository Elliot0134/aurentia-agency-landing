// src/app/v2/sites-web/landing-page/page.tsx
import type { Metadata } from "next";
import { SitesWebSubPage } from "@/components/v2/sites-web/SitesWebSubPage";

export const metadata: Metadata = {
  title: "Landing pages haute conversion dès 1 500 €",
  description:
    "Landing pages design spectaculaire, optimisées conversion. Pour startups et SaaS.",
};

export default function LandingPageSubpage() {
  return <SitesWebSubPage slug="landing-page" />;
}

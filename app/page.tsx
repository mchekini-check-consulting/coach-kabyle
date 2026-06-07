import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { StickyMobileCTA } from "@/components/layout/StickyMobileCTA";
import { Hero } from "@/components/sections/Hero";
import { StatsStrip } from "@/components/sections/StatsStrip";
import { Problems } from "@/components/sections/Problems";
import { Transformation } from "@/components/sections/Transformation";
import { Strategies } from "@/components/sections/Strategies";
import { ForWho } from "@/components/sections/ForWho";
import { EbookMockup } from "@/components/sections/EbookMockup";
import { WhatYouGet } from "@/components/sections/WhatYouGet";
import { Author } from "@/components/sections/Author";
import { Testimonials } from "@/components/sections/Testimonials";
import { FAQ } from "@/components/sections/FAQ";
import { PricingCTA } from "@/components/sections/PricingCTA";
import { MiniCTA } from "@/components/sections/MiniCTA";
import { StatsBanner } from "@/components/sections/StatsBanner";
import { PsyBridge } from "@/components/sections/PsyBridge";
import { SITE_CONFIG } from "@/constants";

export const metadata: Metadata = {
  title: `${SITE_CONFIG.name} — Découvre ton idée business naturellement`,
  description: SITE_CONFIG.description,
  alternates: {
    canonical: SITE_CONFIG.url,
  },
};

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <StatsBanner />
        <ForWho />
        <Problems />
        <PsyBridge />
        <Transformation />
        <MiniCTA />
        <Strategies />
        <EbookMockup />
        <WhatYouGet />
        <Author />
        <Testimonials />
        <FAQ />
        <PricingCTA />
      </main>
      <Footer />
      <StickyMobileCTA />
    </>
  );
}

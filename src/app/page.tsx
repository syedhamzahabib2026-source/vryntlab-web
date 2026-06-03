import type { Metadata } from "next";
import { About } from "@/components/home/About";
import { ChatbotShowcase } from "@/components/home/ChatbotShowcase";
import { ContactCta } from "@/components/home/ContactCta";
import { FeaturedWork } from "@/components/home/FeaturedWork";
import { Hero } from "@/components/home/Hero";
import { MarqueeBar } from "@/components/home/MarqueeBar";
import { Process } from "@/components/home/Process";
import { ServicesHomeTeaser } from "@/components/home/ServicesHomeTeaser";
import { Stats } from "@/components/home/Stats";
import { brandSiteTitle, brandMetaDescription } from "@/lib/brand-knowledge";

export const metadata: Metadata = {
  title: "Shopify Stores, Websites & Automation | VryntLab",
  description: brandMetaDescription,
  alternates: {
    canonical: "https://vryntlab.com",
  },
  openGraph: {
    title: brandSiteTitle,
    description: brandMetaDescription,
    url: "https://vryntlab.com",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: brandSiteTitle,
    description: brandMetaDescription,
  },
};

export default function Home() {
  return (
    <div className="flex flex-1 flex-col">
      <Hero />
      <MarqueeBar />
      <FeaturedWork />
      <ServicesHomeTeaser />
      <Stats />
      <ChatbotShowcase />
      <Process />
      <About />
      <ContactCta />
    </div>
  );
}

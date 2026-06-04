import type { Metadata } from "next";
import { ChatbotShowcase } from "@/components/home/ChatbotShowcase";
import { ContactCta } from "@/components/home/ContactCta";
import { FeaturedWork } from "@/components/home/FeaturedWork";
import { Hero } from "@/components/home/Hero";
import { HomeIntro } from "@/components/home/HomeIntro";
import { ServicesAccordion } from "@/components/home/ServicesAccordion";
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
      <HomeIntro />
      <FeaturedWork />
      <ServicesAccordion />
      <ChatbotShowcase />
      <ContactCta />
    </div>
  );
}

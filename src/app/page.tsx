import type { Metadata } from "next";
import { About } from "@/components/home/About";
import { ContactCta } from "@/components/home/ContactCta";
import { DeliveryPreview } from "@/components/home/DeliveryPreview";
import { FeaturedWork } from "@/components/home/FeaturedWork";
import { Hero } from "@/components/home/Hero";
import { MidPageCta } from "@/components/home/MidPageCta";
import { Process } from "@/components/home/Process";
import { ChatbotShowcase } from "@/components/home/ChatbotShowcase";
import { ServicesHomeTeaser } from "@/components/home/ServicesHomeTeaser";
import { brandSiteTitle, brandMetaDescription } from "@/lib/brand-knowledge";

export const metadata: Metadata = {
  title: "Web Design Agency for Small Business | VryntLab",
  description:
    "VryntLab builds fast websites, AI chatbots, and automations for small and mid-sized businesses. Clear scope, fair pricing, work that ships. Free estimate.",
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
      <FeaturedWork />
      <MidPageCta variant="after-work" />
      <DeliveryPreview />
      <ServicesHomeTeaser />
      <ChatbotShowcase />
      <Process />
      <About />
      <ContactCta />
    </div>
  );
}

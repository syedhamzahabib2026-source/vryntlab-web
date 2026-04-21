import { About } from "@/components/home/About";
import { ContactCta } from "@/components/home/ContactCta";
import { DeliveryPreview } from "@/components/home/DeliveryPreview";
import { FeaturedWork } from "@/components/home/FeaturedWork";
import { Hero } from "@/components/home/Hero";
import { MidPageCta } from "@/components/home/MidPageCta";
import { Process } from "@/components/home/Process";
import { ChatbotShowcase } from "@/components/home/ChatbotShowcase";
import { ServicesHomeTeaser } from "@/components/home/ServicesHomeTeaser";

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

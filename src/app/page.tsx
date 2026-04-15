import { About } from "@/components/home/About";
import { ContactCta } from "@/components/home/ContactCta";
import { CredibilityStrip } from "@/components/home/CredibilityStrip";
import { DeliveryPreview } from "@/components/home/DeliveryPreview";
import { FeaturedWork } from "@/components/home/FeaturedWork";
import { Hero } from "@/components/home/Hero";
import { MidPageCta } from "@/components/home/MidPageCta";
import { NeedPathSelector } from "@/components/home/NeedPathSelector";
import { Process } from "@/components/home/Process";
import { Services } from "@/components/home/Services";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col">
      <Hero />
      <FeaturedWork />
      <MidPageCta variant="after-work" />
      <CredibilityStrip />
      <NeedPathSelector />
      <DeliveryPreview />
      <Services />
      <Process />
      <About />
      <ContactCta />
    </div>
  );
}

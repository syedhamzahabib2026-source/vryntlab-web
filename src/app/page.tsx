import { About } from "@/components/home/About";
import { ContactCta } from "@/components/home/ContactCta";
import { CredibilityStrip } from "@/components/home/CredibilityStrip";
import { FeaturedWork } from "@/components/home/FeaturedWork";
import { Hero } from "@/components/home/Hero";
import { Process } from "@/components/home/Process";
import { Services } from "@/components/home/Services";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col gap-28 pb-24 md:gap-40 md:pb-32">
      <Hero />
      <CredibilityStrip />
      <Services />
      <Process />
      <FeaturedWork />
      <About />
      <ContactCta />
    </div>
  );
}

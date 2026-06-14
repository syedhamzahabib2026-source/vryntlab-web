import type { Metadata, Viewport } from "next";
import { DemoChatPage } from "@/components/demo/DemoChatPage";
import { DEFAULT_DEMO } from "@/lib/demoConfigs";

export const viewport: Viewport = {
  interactiveWidget: "resizes-content",
};

export const metadata: Metadata = {
  title: "AI Booking Assistant Demo | VryntLab",
  description:
    "See how a VryntLab AI concierge turns visitors into booked consultations — live demo for med spas.",
  robots: { index: false },
};

export default function DemoPage() {
  return <DemoChatPage config={DEFAULT_DEMO} slug={undefined} />;
}

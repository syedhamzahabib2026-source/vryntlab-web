import type { Metadata, Viewport } from "next";
import { DemoChatPage } from "@/components/demo/DemoChatPage";
import { getDemoConfig } from "@/lib/demoConfigs";

export const viewport: Viewport = {
  interactiveWidget: "resizes-content",
};

export const metadata: Metadata = {
  title: "AI Booking Assistant Demo | VryntLab",
  description:
    "See how a VryntLab AI concierge turns visitors into booked consultations — live demo.",
  robots: { index: false },
};

export default async function DemoSlugPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const config = getDemoConfig(slug);
  return <DemoChatPage config={config} slug={slug} />;
}

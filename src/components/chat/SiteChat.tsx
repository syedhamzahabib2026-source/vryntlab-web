"use client";

import { useConversion } from "@/components/conversion/ConversionContext";
import type { ChatSiteContextPayload } from "@/lib/site/chat-site-context";
import { usePathname } from "next/navigation";
import { useMemo } from "react";
import { VryntLabChatbot } from "./VryntLabChatbot";

/**
 * Site-mounted assistant: passes live path, selected intent, and estimate sheet state to `/api/chat`.
 */
export function SiteChat() {
  const pathname = usePathname();
  const { selectedIntent, estimateOpen } = useConversion();

  const siteContext = useMemo((): ChatSiteContextPayload => {
    return {
      ...(selectedIntent != null ? { intentId: selectedIntent } : {}),
      pathname: pathname || "/",
      ...(estimateOpen ? { estimateOpen: true } : {}),
    };
  }, [estimateOpen, pathname, selectedIntent]);

  return <VryntLabChatbot siteContext={siteContext} />;
}

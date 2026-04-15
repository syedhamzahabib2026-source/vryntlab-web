"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { IntentId } from "@/lib/intent";
import { writeStoredIntentId } from "@/lib/intent";

type ConversionContextValue = {
  estimateOpen: boolean;
  openEstimate: (intent?: IntentId | null) => void;
  closeEstimate: () => void;
  selectedIntent: IntentId | null;
  setSelectedIntent: (id: IntentId | null) => void;
};

const ConversionContext = createContext<ConversionContextValue | null>(null);

export function ConversionProvider({ children }: { children: ReactNode }) {
  const [estimateOpen, setEstimateOpen] = useState(false);
  const [selectedIntent, setSelectedIntentState] = useState<IntentId | null>(
    null,
  );

  const setSelectedIntent = useCallback((id: IntentId | null) => {
    setSelectedIntentState(id);
    writeStoredIntentId(id);
  }, []);

  const openEstimate = useCallback(
    (intent?: IntentId | null) => {
      if (intent) setSelectedIntent(intent);
      setEstimateOpen(true);
    },
    [setSelectedIntent],
  );

  const closeEstimate = useCallback(() => {
    setEstimateOpen(false);
  }, []);

  const value = useMemo(
    () => ({
      estimateOpen,
      openEstimate,
      closeEstimate,
      selectedIntent,
      setSelectedIntent,
    }),
    [
      estimateOpen,
      openEstimate,
      closeEstimate,
      selectedIntent,
      setSelectedIntent,
    ],
  );

  return (
    <ConversionContext.Provider value={value}>
      {children}
    </ConversionContext.Provider>
  );
}

export function useConversion() {
  const ctx = useContext(ConversionContext);
  if (!ctx) {
    throw new Error("useConversion must be used within ConversionProvider");
  }
  return ctx;
}

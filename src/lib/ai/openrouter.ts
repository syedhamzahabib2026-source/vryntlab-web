import OpenAI from "openai";
import { serverEnv } from "@/lib/config/env";

/**
 * OpenAI SDK pointed at OpenRouter. Set OPENROUTER_API_KEY in `.env.local`.
 */
export function createOpenRouterClient(): OpenAI {
  const apiKey = serverEnv.openrouter.apiKey;
  if (!apiKey) {
    throw new Error("OPENROUTER_API_KEY is not set");
  }

  return new OpenAI({
    apiKey,
    baseURL: "https://openrouter.ai/api/v1",
    defaultHeaders: {
      ...(serverEnv.openrouter.siteUrl && {
        "HTTP-Referer": serverEnv.openrouter.siteUrl,
      }),
      ...(serverEnv.openrouter.appName && {
        "X-Title": serverEnv.openrouter.appName,
      }),
    },
  });
}

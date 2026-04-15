/**
 * OpenRouter model ids — cost-aware defaults.
 *
 * Chat uses the “cheap default” below so routine testing burns fewer tokens.
 * Extraction uses a small, JSON-friendly model and only runs when the lead-save gate passes.
 *
 * Override: OPENROUTER_MODEL (chat), OPENROUTER_EXTRACT_MODEL (extraction only).
 */

/** ~lowest-cost reasonable default for multi-turn chat on OpenRouter (override with OPENROUTER_MODEL). */
export const DEFAULT_OPENROUTER_CHAT_MODEL = "google/gemini-2.0-flash-001";

/**
 * Small structured JSON extract; short max_tokens. Keeps extraction cost sub-cent per save.
 * Override with OPENROUTER_EXTRACT_MODEL if needed.
 */
export const DEFAULT_OPENROUTER_EXTRACT_MODEL = "openai/gpt-4o-mini";

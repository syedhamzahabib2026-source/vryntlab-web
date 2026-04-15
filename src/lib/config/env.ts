/**
 * Server-side environment access only. Do not import from client components.
 * Uses lazy reads so scripts can populate `process.env` before first use.
 */

function envTrim(name: string): string | undefined {
  const v = process.env[name]?.trim();
  return v || undefined;
}

function envInt(name: string, fallback: number): number {
  const raw = envTrim(name);
  if (!raw) return fallback;
  const n = Number(raw);
  return Number.isFinite(n) && n > 0 ? Math.floor(n) : fallback;
}

export const serverEnv = {
  get nodeEnv() {
    return process.env.NODE_ENV ?? "development";
  },
  get isProduction() {
    return process.env.NODE_ENV === "production";
  },
  get vercelEnv() {
    return process.env.VERCEL_ENV;
  },

  get openrouter() {
    return {
      apiKey: envTrim("OPENROUTER_API_KEY"),
      chatModel: envTrim("OPENROUTER_MODEL"),
      extractModel: envTrim("OPENROUTER_EXTRACT_MODEL"),
      siteUrl: envTrim("OPENROUTER_SITE_URL"),
      appName: envTrim("OPENROUTER_APP_NAME"),
    };
  },

  get supabase() {
    return {
      url: envTrim("SUPABASE_URL"),
      anonKey: envTrim("SUPABASE_ANON_KEY"),
      serviceRoleKey: envTrim("SUPABASE_SERVICE_ROLE_KEY"),
    };
  },

  get lead() {
    return {
      source: envTrim("LEAD_SOURCE"),
      dedupeHoursRaw: envTrim("LEAD_EMAIL_DEDUPE_HOURS"),
      notifyEmail: envTrim("LEAD_NOTIFY_EMAIL"),
      resendApiKey: envTrim("RESEND_API_KEY"),
      resendFrom: envTrim("RESEND_FROM_EMAIL") || envTrim("LEAD_EMAIL_FROM"),
    };
  },

  get slack() {
    return {
      webhookUrl:
        envTrim("SLACK_LEAD_WEBHOOK_URL") ||
        envTrim("SLACK_INCOMING_WEBHOOK_URL") ||
        envTrim("SLACK_WEBHOOK_URL"),
      botToken: envTrim("SLACK_BOT_TOKEN"),
      channel: envTrim("SLACK_LEAD_CHANNEL"),
      dmUser: envTrim("SLACK_LEAD_DM_USER"),
    };
  },

  get chat() {
    return {
      verboseLogs: envTrim("CHAT_VERBOSE_LOGS") === "1",
      rateLimitMax: envInt("CHAT_RATE_LIMIT_MAX", 45),
      rateLimitWindowMs: envInt("CHAT_RATE_LIMIT_WINDOW_MS", 60_000),
      maxCharsPerMessage: envInt("CHAT_MAX_CHARS_PER_MESSAGE", 6000),
      maxMessagesPerRequest: envInt("CHAT_MAX_MESSAGES_PER_REQUEST", 40),
      maxTotalMessageChars: envInt("CHAT_MAX_TOTAL_MESSAGE_CHARS", 120_000),
      maxBodyBytes: envInt("CHAT_MAX_BODY_BYTES", 262_144),
      identicalBurstMax: envInt("CHAT_IDENTICAL_BURST_MAX", 8),
      identicalBurstWindowMs: envInt("CHAT_IDENTICAL_BURST_WINDOW_MS", 120_000),
    };
  },
} as const;

export function parseLeadDedupeHours(): number {
  const raw = serverEnv.lead.dedupeHoursRaw;
  if (!raw) return 0;
  const n = Number(raw);
  if (!Number.isFinite(n) || n <= 0) return 0;
  return Math.min(n, 168);
}

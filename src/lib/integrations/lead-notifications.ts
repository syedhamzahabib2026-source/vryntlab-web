/**
 * Email (Resend HTTP API) + Slack (incoming webhook and/or bot) after a lead row is inserted.
 * Code-formatted only — no LLM. Logs use prefix `[notify]`.
 */

import { brand } from "@/lib/config/brand";
import { serverEnv } from "@/lib/config/env";

export type LeadNotifyPayload = {
  name: string;
  email: string;
  business: string | null;
  website: string | null;
  need: string;
  intent_strength: string | null;
  source: string;
  created_at: string;
  conversation_id: string;
  human_requested: boolean;
  /** When true, email/Slack copy is a labeled channel self-test (scripts only; not used from /api/chat). */
  selfTest?: boolean;
};

const B = brand.shortName;

function notifyLog(message: string): void {
  console.log(`[notify] ${message}`);
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function formatLabelBlock(p: LeadNotifyPayload): string {
  const lines: string[] = [
    `Name: ${p.name}`,
    `Email: ${p.email}`,
    `Business: ${p.business ?? "—"}`,
    `Website: ${p.website ?? "—"}`,
    `Need: ${p.need}`,
    `Intent: ${p.intent_strength ?? "—"}`,
    `Source: ${p.source}`,
    `Created: ${p.created_at}`,
    `Conversation ID: ${p.conversation_id}`,
    `Human requested: ${p.human_requested ? "yes" : "no"}`,
  ];
  return lines.join("\n");
}

function buildEmailSubject(p: LeadNotifyPayload): string {
  if (p.selfTest) {
    return `[TEST] ${B} notification system check`;
  }
  const label = (p.business?.trim() || p.name || "Lead").slice(0, 80);
  if (p.human_requested) {
    return `[Human Request] New ${B} Lead – ${label}`;
  }
  const strength = (p.intent_strength || "unknown").slice(0, 24);
  return `[New ${B} Lead] ${strength} – ${label}`;
}

function buildEmailHtml(p: LeadNotifyPayload): string {
  const rows = [
    ["Name", p.name],
    ["Email", p.email],
    ["Business", p.business ?? "—"],
    ["Website", p.website ?? "—"],
    ["Need", p.need],
    ["Intent strength", p.intent_strength ?? "—"],
    ["Source", p.source],
    ["Created (UTC)", p.created_at],
    ["Conversation ID", p.conversation_id],
    ["Human requested", p.human_requested ? "Yes" : "No"],
  ] as const;

  const body = rows
    .map(
      ([k, v]) =>
        `<tr><td style="padding:6px 12px;border:1px solid #e5e7eb;font-weight:600;white-space:nowrap">${escapeHtml(k)}</td><td style="padding:6px 12px;border:1px solid #e5e7eb">${escapeHtml(v)}</td></tr>`,
    )
    .join("");

  const intro = p.selfTest
    ? `<p style="font-family:system-ui,sans-serif;font-size:14px;color:#111">This is a test notification from the ${escapeHtml(B)} chatbot system to verify that Resend email delivery is working correctly.</p><p style="font-family:system-ui,sans-serif;font-size:14px;color:#444"><strong>Timestamp (UTC):</strong> ${escapeHtml(p.created_at)}</p><p style="font-family:system-ui,sans-serif;font-size:13px;color:#666">Payload preview (not a real lead):</p>`
    : `<p style="font-family:system-ui,sans-serif;font-size:14px;color:#111">New lead from ${escapeHtml(B)} chat.</p>`;

  return `${intro}
<table style="border-collapse:collapse;font-family:system-ui,sans-serif;font-size:14px;max-width:640px">${body}</table>`;
}

async function sendResendEmail(p: LeadNotifyPayload): Promise<void> {
  const to = serverEnv.lead.notifyEmail;
  const apiKey = serverEnv.lead.resendApiKey;
  const from = serverEnv.lead.resendFrom;

  if (!to) {
    return;
  }
  if (!apiKey || !from) {
    notifyLog(
      "notification_email_failed: LEAD_NOTIFY_EMAIL set but missing RESEND_API_KEY or RESEND_FROM_EMAIL (or LEAD_EMAIL_FROM)",
    );
    return;
  }

  notifyLog("notification_email_started");
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        subject: buildEmailSubject(p),
        html: buildEmailHtml(p),
        text: p.selfTest
          ? `This is a test notification from the ${B} chatbot system to verify that Resend email delivery is working correctly.\n\nTimestamp (UTC): ${p.created_at}\n\n---\n${formatLabelBlock(p)}\n`
          : `${formatLabelBlock(p)}\n`,
      }),
    });

    if (!res.ok) {
      const errText = await res.text().catch(() => "");
      notifyLog(`notification_email_failed: HTTP ${res.status} ${errText.slice(0, 200)}`);
      return;
    }
    notifyLog("notification_email_sent");
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    notifyLog(`notification_email_failed: ${msg.slice(0, 300)}`);
  }
}

function buildSlackText(p: LeadNotifyPayload): string {
  if (p.selfTest) {
    return [
      `[TEST] ${B} chatbot notification check — this is a live system test.`,
      `*Timestamp (UTC):* ${p.created_at}`,
      "_No lead action required — channel verification only._",
    ].join("\n");
  }
  const head = p.human_requested ? `*Human request — new ${B} lead*` : `*New ${B} lead*`;
  const lines = [
    head,
    `*Name:* ${p.name}`,
    `*Email:* ${p.email}`,
    `*Business:* ${p.business ?? "—"}`,
    `*Website:* ${p.website ?? "—"}`,
    `*Need:* ${p.need}`,
    `*Intent:* ${p.intent_strength ?? "—"}`,
    `*Human requested:* ${p.human_requested ? "yes" : "no"}`,
    `*Time:* ${p.created_at}`,
  ];
  return lines.join("\n");
}

async function slackWebhookPost(url: string, text: string): Promise<void> {
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text }),
  });
  if (!res.ok) {
    const errText = await res.text().catch(() => "");
    throw new Error(`webhook HTTP ${res.status} ${errText.slice(0, 120)}`);
  }
}

async function sendSlackBotMessage(token: string, channel: string, text: string): Promise<void> {
  const res = await fetch("https://slack.com/api/chat.postMessage", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ channel, text }),
  });
  const data = (await res.json()) as { ok?: boolean; error?: string };
  if (!data.ok) {
    throw new Error(data.error || "slack_post_failed");
  }
}

async function openSlackDmAndPost(token: string, userId: string, text: string): Promise<void> {
  const res = await fetch("https://slack.com/api/conversations.open", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ users: userId }),
  });
  const data = (await res.json()) as { ok?: boolean; error?: string; channel?: { id?: string } };
  if (!data.ok || !data.channel?.id) {
    throw new Error(data.error || "slack_dm_open_failed");
  }
  await sendSlackBotMessage(token, data.channel.id, text);
}

async function sendSlackNotifications(p: LeadNotifyPayload): Promise<void> {
  const text = buildSlackText(p);
  const webhook = serverEnv.slack.webhookUrl;
  const token = serverEnv.slack.botToken;
  const channel = serverEnv.slack.channel;
  const dmUser = serverEnv.slack.dmUser;

  const tasks: Promise<void>[] = [];
  if (webhook) {
    tasks.push(slackWebhookPost(webhook, text));
  }
  if (token && channel) {
    tasks.push(sendSlackBotMessage(token, channel, text));
  }
  if (token && dmUser) {
    tasks.push(openSlackDmAndPost(token, dmUser, text));
  }

  if (tasks.length === 0) {
    return;
  }

  notifyLog("notification_slack_started");
  const results = await Promise.allSettled(tasks);
  const failed = results.filter((r) => r.status === "rejected") as PromiseRejectedResult[];
  if (failed.length === 0) {
    notifyLog("notification_slack_sent");
  } else {
    for (const r of failed) {
      const msg = r.reason instanceof Error ? r.reason.message : String(r.reason);
      notifyLog(`notification_slack_failed: ${msg.slice(0, 300)}`);
    }
  }
}

/**
 * Fire email + Slack after a successful insert. Failures are logged; never throws.
 */
export async function sendLeadNotifications(p: LeadNotifyPayload): Promise<void> {
  const emailTask = sendResendEmail(p).catch((e) => {
    const msg = e instanceof Error ? e.message : String(e);
    notifyLog(`notification_email_failed: ${msg.slice(0, 300)}`);
  });

  const slackTask = sendSlackNotifications(p);

  await Promise.all([emailTask, slackTask]);
}

import "server-only";

import { Resend } from "resend";

export type ContactEmailInput = {
  name: string;
  email: string;
  message: string;
};

function buildPlainTextBody(input: ContactEmailInput): string {
  return `New website inquiry received

Name:
${input.name}

Email:
${input.email}

What they need:
${input.message}

Submitted from:
VryntLab contact form`;
}

/**
 * Sends the contact notification to the configured inbox via Resend.
 * Uses public branding in From; actual delivery address comes from env.
 */
function resolveFromAddress(): string | undefined {
  const primary = process.env.CONTACT_FROM_EMAIL?.trim();
  const devOverride = process.env.CONTACT_FROM_EMAIL_DEV?.trim();
  if (process.env.NODE_ENV === "development" && devOverride) {
    return devOverride;
  }
  return primary;
}

export async function sendContactEmail(
  input: ContactEmailInput,
): Promise<{ id: string | undefined }> {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const fromAddress = resolveFromAddress();

  if (!apiKey?.trim() || !to?.trim() || !fromAddress?.trim()) {
    throw new Error("Email is not configured");
  }

  const resend = new Resend(apiKey);
  const subject = `New inquiry from VryntLab — ${input.name}`;
  const text = buildPlainTextBody(input);

  const { data, error } = await resend.emails.send({
    from: `VryntLab <${fromAddress}>`,
    to: [to.trim()],
    replyTo: input.email,
    subject,
    text,
  });

  if (error) {
    if (process.env.NODE_ENV === "development") {
      console.error("[send-contact-email] Resend error:", error);
    }
    throw new Error("Resend request failed");
  }

  return { id: data?.id };
}

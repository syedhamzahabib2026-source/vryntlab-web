import { NextResponse } from "next/server";
import { sendContactEmail } from "@/lib/email/send-contact-email";

export const runtime = "nodejs";

const MAX_NAME = 200;
const MAX_EMAIL = 320;
const MAX_MESSAGE = 10_000;

// Pragmatic format check; Resend will still validate deliverability.
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type ContactBody = {
  name?: unknown;
  email?: unknown;
  message?: unknown;
  website?: unknown;
};

function jsonError(message: string, status: number) {
  return NextResponse.json({ ok: false as const, error: message }, { status });
}

function jsonOk() {
  return NextResponse.json({ ok: true as const });
}

export async function POST(request: Request) {
  let body: ContactBody;
  try {
    body = (await request.json()) as ContactBody;
  } catch {
    return jsonError("Invalid JSON body", 400);
  }

  const honeypot =
    typeof body.website === "string" ? body.website.trim() : "";
  if (honeypot.length > 0) {
    return jsonOk();
  }

  const name =
    typeof body.name === "string" ? body.name.trim().slice(0, MAX_NAME) : "";
  const email =
    typeof body.email === "string"
      ? body.email.trim().slice(0, MAX_EMAIL)
      : "";
  const message =
    typeof body.message === "string"
      ? body.message.trim().slice(0, MAX_MESSAGE)
      : "";

  if (!name) {
    return jsonError("Name is required", 400);
  }
  if (!email) {
    return jsonError("Email is required", 400);
  }
  if (!EMAIL_RE.test(email)) {
    return jsonError("Please enter a valid email address", 400);
  }
  if (!message) {
    return jsonError("Please tell us what you need", 400);
  }

  try {
    await sendContactEmail({ name, email, message });
  } catch {
    console.error("[api/contact] Contact email send failed");
    return jsonError(
      "We couldn’t send your message right now. Please try again in a moment or email us directly.",
      500,
    );
  }

  return jsonOk();
}

export function GET() {
  return NextResponse.json({ ok: false, error: "Method not allowed" }, {
    status: 405,
    headers: { Allow: "POST" },
  });
}

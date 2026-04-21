# AI chat — integrated assistant (VryntLab site)

This document is the **source of truth** for the merged chatbot inside the main Next.js app (`trellisify-project`). Update it whenever you change chat UI, API behavior, env vars, or site-context wiring.

## What this is

- A **floating assistant** (launcher + panel) backed by **`POST /api/chat`** (OpenRouter).
- **Lead capture** (optional): Supabase insert + email/Slack notifications when the pipeline saves a lead.
- **Site context** (optional): Each request can include hints from the marketing UI (`selectedIntent`, pathname, quick estimate open) so replies stay relevant without sounding robotic.

The old standalone app lived in `vryntlab-ai/` at the repo root; behavior was **re-homed** here. Do not treat that folder as the deployable product—see `vryntlab-ai/README.md`.

## File map

| Area | Location |
|------|----------|
| API route | `src/app/api/chat/route.ts` (`runtime = "nodejs"`) |
| System prompt + knowledge | `src/lib/ai/system-prompt.ts`, `src/lib/config/knowledge.ts` |
| OpenRouter client / models | `src/lib/ai/openrouter.ts`, `src/lib/ai/models.ts` |
| Lead extraction | `src/lib/ai/extract-lead.ts` |
| Env (server-only) | `src/lib/config/env.ts` |
| Brand defaults (UI copy, lead `source` default) | `src/lib/config/brand.ts` |
| Supabase + notifications | `src/lib/integrations/supabase.ts`, `lead-notifications.ts` |
| Lead save / gates / intent heuristics | `src/lib/lead/*` |
| Rate limits + abuse heuristics | `src/lib/utils/chat-protection.ts` |
| Site context parsing + prompt appendix | `src/lib/site/chat-site-context.ts` |
| UI: widget + glyph + mount | `src/components/chat/VryntLabChatbot.tsx`, `ChatLauncherGlyph.tsx`, `chat-widget.css`, `SiteChat.tsx` |
| Layout mount | `src/app/layout.tsx` — `<SiteChat />` inside `ConversionProvider` |

## Stacking / modals

Approximate layers (see components for exact classes):

- **Site header:** `z-50` (sticky).
- **Sticky mobile CTA:** `z-[90]`.
- **Chat:** backdrop `9998`, panel `9999`, launcher `10000` (`chat-widget.css`). On **`md–lg`** viewports, the panel’s `bottom` is offset so it clears the sticky mobile bar when present (`chat-widget.css` media query ~641–1023px).
- **Quick estimate:** `<dialog>` with `showModal()` — browser **top layer** sits above normal `z-index` stacks, so the estimate stays **above** the chat when both could be involved. Prefer closing chat first if UX ever feels busy.

## Server logging (production)

- **Errors:** `console.error` on chat route failures, contact email failures, and lead persistence failures — keep for observability.
- **Verbose debug:** `[notify] gate_eval` JSON only when `CHAT_VERBOSE_LOGS=1` or not production (`src/app/api/chat/route.ts`).
- **Operational:** `[lead]`, `[notify]`, `[chat-protect]` lines support debugging lead pipeline and abuse protection; tune volume via env rather than stripping logs before you have another signal.

## Site context (`siteContext`)

`SiteChat` (`src/components/chat/SiteChat.tsx`) passes a JSON object on every chat POST:

- `intentId` — from `ConversionContext.selectedIntent` when set. Valid values match `lib/intent.ts`: **website**, **automation**, **custom** (path selector) plus **app**, **backend**, **other** (quick estimate–only lanes). Parsed server-side in `parseSiteContext` / `VALID_INTENTS`.
- `pathname` — from `usePathname()` (current route).
- `estimateOpen` — `true` when the quick estimate sheet is open.

The API merges a short **internal appendix** into the system prompt via `buildSiteContextSystemAppend` — the model is instructed not to read it aloud robotically.

## Environment variables

Copy `.env.example` to `.env.local`. Chat-related vars are documented there. Minimum for **working replies**:

- `OPENROUTER_API_KEY`

Optional but common in production:

- `OPENROUTER_MODEL`, `OPENROUTER_EXTRACT_MODEL`
- `OPENROUTER_SITE_URL`, `OPENROUTER_APP_NAME` (OpenRouter headers)
- Supabase: `SUPABASE_URL`, `SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY` (service role for lead writes in production)
- Lead pipeline: `LEAD_SOURCE`, `LEAD_EMAIL_DEDUPE_HOURS`, `LEAD_NOTIFY_EMAIL`, `RESEND_FROM_EMAIL`, Slack vars

Contact form (`/api/contact`) uses **separate** Resend vars (`CONTACT_*`, `RESEND_API_KEY`) — see `.env.example`.

Optional dev-only override for the **contact** “from” address: `CONTACT_FROM_EMAIL_DEV` (see `send-contact-email.ts`).

### Lead save + human-handoff notifications (Slack / email)

Notifications **only run after a successful `leads` row insert** in Supabase (`src/app/api/chat/route.ts`). If persistence is skipped, **no** Slack or lead email is sent.

1. **Production Supabase writes:** `createSupabaseLeadWriteClient()` returns a client only when `SUPABASE_URL` + **`SUPABASE_SERVICE_ROLE_KEY`** are set (`src/lib/integrations/supabase.ts`). In production, **anon-only** config yields **`null`** → log `[lead] lead_gate_blocked: supabase_unconfigured` → entire lead path skipped.

2. **Gate + extraction:** `shouldExtractAndSaveLead` requires a **valid email in user messages**, minimum conversation shape, and context (e.g. human phrase like “representative”, or business/website/need heuristics). `toSaveableLead` requires **name + email + need** (≥12 chars) from extraction.

3. **Notify decision:** After insert, `shouldNotifyLead` sends email/Slack if the user asked for a human (`threadRequestedHuman` / extract) **or** buying-intent score ≥ 0.8 (`src/lib/lead/human-request.ts`).

4. **Email:** Uses `LEAD_NOTIFY_EMAIL` and `RESEND_FROM_EMAIL` with `RESEND_API_KEY`. If `LEAD_*` are unset, the server falls back to **`CONTACT_TO_EMAIL`** / **`CONTACT_FROM_EMAIL`** (`serverEnv.lead`).

5. **Slack:** Requires at least one of **`SLACK_LEAD_WEBHOOK_URL`**, or **`SLACK_BOT_TOKEN`** + **`SLACK_LEAD_CHANNEL`**, or **`SLACK_BOT_TOKEN`** + **`SLACK_LEAD_DM_USER`**. If none are set, the API logs `[notify] notification_slack_skipped: …` and sends nothing to Slack.

**Ops:** Enable **`CHAT_VERBOSE_LOGS=1`** (or non-production) for `[notify] gate_eval` JSON on notify decisions.

## Hydration note

`VryntLabChatbot` keeps `conversationId` as **`""` on the first paint**, then **syncs from `sessionStorage` in `useEffect`**. That avoids a server/client mismatch (the old pattern called `sessionStorage` inside `useState`’s initializer, which diverges between SSR and the browser).

## Local run

```bash
npm install
cp .env.example .env.local   # then fill values
npm run dev
```

Open `http://localhost:3000`. Chat needs `OPENROUTER_API_KEY` for non-503 replies.

### If chat returns “not configured (missing API key)” locally

Inspect the **actual** setup—do not assume another folder’s env applies:

1. **Working directory:** Run `npm run dev` from **`trellisify-project/`** (this app). Next.js loads **only** that folder’s **`.env.local`** (see [Next.js env loading](https://nextjs.org/docs/app/building-your-application/configuring/environment-variables)).
2. **Key present and non-empty:** `OPENROUTER_API_KEY` must be set in **`trellisify-project/.env.local`**. A sibling app (e.g. `vryntlab-ai/`) has its **own** `.env.local`; keys are **not** shared automatically.
3. **Restart after edits:** Changing `.env.local` requires a **restart** of `next dev` (stop the process, start again). Hot reload does not reload server env.
4. **Server-side only:** The key is read in **`src/lib/config/env.ts`** → **`src/lib/ai/openrouter.ts`**. It is never exposed to the client; a 503 from `POST /api/chat` means the **running Node server** did not see a non-empty key.

Production (e.g. Vercel) uses the host’s **Environment Variables** UI—same variable names as `.env.example`, not files from git.

## Deploy (e.g. Vercel)

1. Connect the repo; set **Production** / **Preview** env vars to match `.env.example` (no secrets in git).
2. Ensure `OPENROUTER_SITE_URL` is your real site URL in production (OpenRouter optional headers).
3. Run **`npm run build`** locally before merging; fix failures before relying on CI.

## Manual QA (before deploy)

- Launcher: reads as **chat / ask**, label **Ask** visible from `md` breakpoint up; icon-only on small screens.
- Open / close / Escape; backdrop click; focus moves to composer when opened.
- Mobile: panel clears safe areas; composer respects bottom safe-area; no overlap with sticky CTA (launcher sits above bar).
- Send message, receive reply; multi-bubble split still works.
- With Supabase configured: lead save path and notifications (staging).
- Rate limit / long message errors (sanity).

## Future changes (team workflow)

1. Implement behavior in `src/lib/` + `src/app/api/chat/route.ts` as needed.
2. Adjust UI in `src/components/chat/` + `chat-widget.css` — keep tokens from `globals.css`.
3. Log the change in **`docs/BUILD_LOG.md`** (dated entry) and update **this file** if structure or env contracts change.
4. Run `npm run build` and `npm run lint` before merging.

## Related docs (legacy folder)

`../vryntlab-ai/docs/` may still contain useful deep-dives (lead flow, stress tests, prompts). Verify against this app if you copy patterns—paths and some features differ post-merge.

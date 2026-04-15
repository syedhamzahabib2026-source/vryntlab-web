# VryntLab — marketing site (Next.js)

Production site for VryntLab: App Router, `src/` layout, Tailwind 4, Motion, conversion flows (quick estimate, contact), and an **integrated AI chat** assistant.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Copy `.env.example` → `.env.local` and fill values for contact email and (if you use chat) OpenRouter / optional Supabase.

## Project documentation (team)

| Doc | Purpose |
|-----|---------|
| [`docs/BUILD_LOG.md`](docs/BUILD_LOG.md) | Chronological implementation notes — **append a dated entry for meaningful changes** |
| [`docs/CHAT_INTEGRATION.md`](docs/CHAT_INTEGRATION.md) | Merged AI chat: **API location, UI map, site context, env, QA** |
| [`docs/DEPLOYMENT.md`](docs/DEPLOYMENT.md) | **GitHub + Vercel**: root directory, env vars, go-live checks |

## Scripts

```bash
npm run dev    # development
npm run build  # production build
npm run lint   # ESLint
```

## Deploy

Deploy on [Vercel](https://vercel.com) or any Next.js host; set server env per [`.env.example`](.env.example) (never commit `.env.local`).

**Before production**

1. `npm run lint` and `npm run build` pass locally.
2. Copy env: contact (`RESEND_*`, `CONTACT_*`) + chat (`OPENROUTER_API_KEY`, optional Supabase/notifications). Align `OPENROUTER_SITE_URL` with the public URL.
3. Follow **Manual QA** in [`docs/CHAT_INTEGRATION.md`](docs/CHAT_INTEGRATION.md) (site + quick estimate + chat on mobile and desktop).
4. Append a short note to [`docs/BUILD_LOG.md`](docs/BUILD_LOG.md) if you change behavior or env contracts.

**Local smoke:** `npm run dev` → `http://localhost:3000` — verify rendering, one contact or estimate submission, and one chat turn if OpenRouter is configured.

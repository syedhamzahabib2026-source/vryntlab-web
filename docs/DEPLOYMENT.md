# Deployment (GitHub + Vercel)

**Production app:** this folder — `trellisify-project/` (integrated marketing site + chat).  
**Do not deploy:** `vryntlab-ai/` (legacy standalone; not the product).

## 1. Repository layout

This machine may have **no git repo** at the workspace root. Choose one:

| Approach | When to use |
|----------|-------------|
| **A. Repo = only this app** | Copy or make `trellisify-project/` the git root (simplest Vercel setup). |
| **B. Monorepo** (`vryntlab-web/` contains `trellisify-project/` + `vryntlab-ai/`) | In Vercel: set **Root Directory** to `trellisify-project`. |

## 2. GitHub

1. Create an empty repository on GitHub (private or public).
2. From the chosen root, run `git init`, add `.gitignore` (Node + Next + `.env*`), commit, add `origin`, `git push -u origin main`.

## 3. Vercel

1. **Import** the GitHub repo → **New Project** (or connect an existing project — see below).
2. **Root directory:** `trellisify-project` if using monorepo (approach B); leave blank if repo root is the app (approach A).
3. Framework: **Next.js** (auto-detected).
4. **Production branch:** usually `main`.

### Production project (current)

| | |
|--|--|
| **Vercel project** | `vryntlab-1` (team: `syedhamzahabib2026-sources-projects`) |
| **GitHub repo** | `syedhamzahabib2026-source/vryntlab-web` |
| **Production domain** | `vryntlab.com` (also `vryntlab-1.vercel.app`) |

Reconnect or change repo: **`vercel git connect https://github.com/syedhamzahabib2026-source/vryntlab-web`** from this app directory (CLI), or **Project → Settings → Git** in the dashboard.

### Which Vercel project to use

If multiple projects exist (e.g. `vryntlab-1` vs `trellisify-test-1`), **link the one that should serve the public VryntLab domain**. Do not point production DNS at a test project. Confirm in Vercel: **Project → Settings → Domains**.

## 4. Environment variables (Production)

Set these in **Vercel → Project → Settings → Environment Variables** (Production + Preview as needed). Names match `.env.example`.

**Required for chat**

- `OPENROUTER_API_KEY`
- `OPENROUTER_SITE_URL` — **public site URL** (e.g. `https://www.vryntlab.com`), not `localhost`
- `OPENROUTER_APP_NAME` — optional; default `VryntLab` in examples

**Required for contact form**

- `RESEND_API_KEY`
- `CONTACT_TO_EMAIL`
- `CONTACT_FROM_EMAIL`

**Optional (Supabase / leads)**

- `SUPABASE_URL`, `SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY` (service role for server-side lead writes)
- `LEAD_SOURCE`, `LEAD_EMAIL_DEDUPE_HOURS`
- `LEAD_NOTIFY_EMAIL`, `RESEND_FROM_EMAIL`

**Optional (Slack)**

- `SLACK_LEAD_WEBHOOK_URL` and/or `SLACK_BOT_TOKEN`, `SLACK_LEAD_CHANNEL`, `SLACK_LEAD_DM_USER`

**Optional (models)**

- `OPENROUTER_MODEL`, `OPENROUTER_EXTRACT_MODEL`

Do **not** commit secrets; Vercel stores them per environment.

**Preview deployments:** If `OPENROUTER_*` is set only for **Production**, chat may return **503** on **Preview** URLs. Add the same OpenRouter variables for **Preview** if you need the assistant on PR previews.

## 5. Verify after deploy

1. Open the **production URL** (and custom domain if configured).
2. Send one **chat** message — should not return 503 (missing key).
3. Submit **contact** or exercise **quick estimate** if those flows matter for go-live.

## 6. Build locally

```bash
cd trellisify-project
npm run build
```

Fix any errors before relying on Vercel’s build.

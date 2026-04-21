# VryntLab — Client Site Blueprint

> Internal reference. Updated after every project.  
> Use this to scope, build, and deliver client sites faster.

## 1. Stack defaults

| Layer | Choice |
|--------|--------|
| Framework | **Next.js** (App Router) |
| Styling | **Tailwind CSS** |
| Deployment | **Vercel** (GitHub-connected) |
| Backend / DB | **Supabase** (when persistence, auth, or lead storage is required) |
| IDE | **Cursor** (GitHub + Vercel workflows) |
| AI chatbot | Custom widget + `/api/chat` route; persona and guardrails live in `src/lib/ai/system-prompt.ts` and related knowledge modules — copy that structure per client, do not fork blindly. |
| Images | **WebP** (export from PNG via Squoosh, quality **75–82**) |
| Fonts | **Geist** + **Instrument Serif** (see `src/app/layout.tsx` and `globals.css` — `next/font` self-hosted, no runtime Google Fonts CSS on critical paths) |

## 2. File & folder conventions

| Path | Purpose |
|------|---------|
| `src/lib/brand-knowledge.ts` | **All** marketing copy: hero, sections, footers, form microcopy. Components import constants — avoid hardcoded strings in TSX. |
| `src/lib/case-studies.ts` | Portfolio / work detail data (`id`, copy, `media.images`, etc.). |
| `src/lib/site.ts` | Site name, logo path, nav links, shared CTAs — imports meta strings from brand where appropriate. |
| `public/projects/[slug]/` | Case study images: `[slug]_1.webp` (hero crop), `[slug]_2.webp` (tall scroll still). |
| `docs/BUILD_LOG.md` | Append-only changelog; **newest entry at top** after each meaningful ship. |
| `docs/CLIENT_SITE_BLUEPRINT.md` | This document — patterns and checklists. |

## 3. Component patterns

| Pattern | Where / how |
|---------|----------------|
| **Scrolling screenshot hero** | `CaseStudyHeroScroll.tsx` — CSS `translateY` loop (`work-scroll-preview` keyframes in `globals.css`), **15s** on detail pages; `prefers-reduced-motion` → static cover. |
| **Scrolling card previews** | `ScrollingWorkPreview.tsx` — shorter loop, `animation-play-state` tied to hover or in-view. |
| **Chatbot showcase** | `ChatbotShowcase.tsx` — **inline** transcript (not the floating widget); optional one-shot **launcher pulse** via `.chat-launcher-attn-pulse` in `globals.css`, triggered after the section leaves view. |
| **Frosted “more work” hints** | `FeaturedWork.tsx` (`WorkPortfolioHintCards`) — `backdrop-blur`, lowered opacity, **`aria-hidden`** on decorative placeholders; visible disclaimer for humans + SR. |
| **Mobile nav** | `SiteHeader.tsx` — below `lg`, **Menu only** in the bar; primary estimate CTA lives **inside** the drawer. Bottom-of-screen actions stay in `StickyMobileCta`. |
| **Services grid** | `ServicesGrid.tsx` — outcome-first cards (no tab taxonomy). Hidden `#service-*` anchors preserved for path-selector scroll/pulse. |
| **Social** | `SocialLinks.tsx` — only render links with real `href`s; return **`null`** when empty so the footer hides the block entirely. |

## 4. Performance rules

- Raster images: **WebP**, max ~**1440px** wide for full-bleed heroes where possible, quality **75–82**.
- Tall page screenshots (`_2.webp`): prefer **q75**, avoid upscaling beyond source dimensions.
- **`priority={true}`** only on **LCP** hero assets; everything else default lazy loading.
- Avoid **`.mov` / raw `.mp4`** in `/public` for decorative motion — prefer **CSS** animation or a single compressed video only when necessary.
- Prefer **self-hosted fonts** (`next/font`) over third-party font CSS on marketing pages.

## 5. Copy framework (client sites)

**Hero**

- Headline: *[What you do] — [for whom] — [outcome]*  
- Subheadline: *[Specific pain] → [specific result]*  
- CTA sub: *What happens next after they reach out* (scope, price, timeline — no vague “let’s chat”).

**Services**

- Name the **outcome** in the title or first line.  
- One sentence: **what changes for the client**, not stack features.  
- Never lead with internal taxonomy (“automation lane”) unless the audience is technical.

**About / trust**

- Who does the work (names or “small studio”).  
- Why you won’t waste their time (directness, no layers).  
- **Pricing signal** (“from $X”) even if ranges vary — removes fear of infinite retainers.

**Work / portfolio**

- Label: **“Selected Work”** / **“Recent projects”** — avoid “case studies” for non-technical buyers.  
- **2–3 strong** pieces beat six thin ones.  
- Each piece: **problem → approach → result** with at least one concrete outcome.  
- If the live list is short, use **frosted placeholder cards** + honest disclaimer (not fake logos).

## 6. Pre-launch checklist

- [ ] All raster images converted to **WebP** and sized appropriately  
- [ ] No placeholder **`#`** links (nav, social, CTAs, logos)  
- [ ] Mobile nav tested at **375px** and **390px**  
- [ ] Contact form tested **end-to-end** (success path + validation errors)  
- [ ] Chatbot smoke-tested with **~5 realistic** visitor questions  
- [ ] Meta **title** and **description** set (usually via `brand-knowledge` / `site.ts`)  
- [ ] Google Business Profile linked in footer or contact where applicable  
- [ ] Vercel deployment verified on **production domain**  
- [ ] `docs/BUILD_LOG.md` updated  
- [ ] `docs/CLIENT_SITE_BLUEPRINT.md` updated with anything new learned  

## 7. Chatbot blueprint

The **system prompt** and **site knowledge** structure for the assistant live in this repo (e.g. `src/lib/ai/system-prompt.ts` and related modules). Treat that as the **template** for client deployments:

1. Copy the **knowledge** shape (sections, facts, guardrails).  
2. Replace **VryntLab-specific** facts with the client’s services, pricing rules, and handoff policy.  
3. Rewrite the **persona** to match the client’s brand voice (still honest, no invented metrics).  
4. Run **10+ realistic customer questions** in staging before pointing DNS or ads at the widget.

Do **not** ship a client bot without verifying lead capture, escalation, and “I don’t know” behavior.

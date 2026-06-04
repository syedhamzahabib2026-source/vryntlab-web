# Build log

## 2026-06-04 — Hero polish: bg image, h1 spacing, scroll fade, logo sizing

**What changed:**

- **`src/components/home/Hero.tsx`** — CTA image moved from right column to full-bleed background (`absolute inset-0 object-cover opacity-20%`) with gradient overlay (`rgba(8,8,16,0.5→0.3→0.65→0.97)` top-to-bottom). Removed two-column layout; text is single-column again. h1 `<br />` replaced with `<span className="block">` wrapper on line 1 so line spacing is purely driven by `leading-[1.05]`, no JSX whitespace artifacts. Added `whitespace-nowrap` to the invisible cycling-word placeholder to lock it to one line. Scroll fade updated to `[0.3, 0.7]` range. Removed `ctaRef`/`ctaScrollY`/`ctaImgScale` (no longer needed).
- **`src/components/layout/SiteHeader.tsx`** — Logo width: `w-[130px] sm:w-[140px]` → `w-[155px] sm:w-[170px]`.
- **`src/components/layout/SiteFooter.tsx`** — Logo width: `w-[120px]` → `w-[145px]`.
- Build: `npm run build` passes clean, 30 static/dynamic routes.

**Files:** `src/components/home/Hero.tsx`, `src/components/layout/{SiteHeader,SiteFooter}.tsx`

---

## 2026-06-04 — Services AnimatePresence rewrite + CTA hero image + Merco-style work cards

**What changed:**

- **`src/components/home/ServicesAccordion.tsx`** — Scrapped all 6-layer opacity/transform approach entirely. `StickyServices` now uses `AnimatePresence mode="wait"` for both the text panel and the image panel. Only ONE element exists in the DOM at a time — impossible for two services to overlap. Removed 12 `useTransform` calls; kept `progressWidth` and `useMotionValueEvent` for active index.
- **`src/components/home/Hero.tsx`** — Added CTA image as right-column visual (desktop only). Two-column `flex-row` layout on `lg+`. Image has scroll-linked breathing scale (`ctaImgScale` 0.94→1.02) and `motion` float animation (y: 0→−10→0 over 5s infinite). Imported `next/image`. Added `ctaRef` + second `useScroll` target.
- **`src/components/home/FeaturedWork.tsx`** — Complete redesign. `WorkCard` now uses Merco-style: violet 3px accent bar, 480px-tall card body with always-running auto-scroll `_2.webp` via `.work-scroll-auto` CSS class, project info overlay at bottom (typeLabel, client name, cardOutcome), hover dark overlay + "View case study →" pill. `NdaCard` simplified to match. Section layout: `sm:grid-cols-2` side-by-side cards, NDA card below. Removed `caseStudyPosterUrl` import.
- **`src/app/globals.css`** — Added `.work-scroll-auto` class (`work-scroll-preview 16s ease-in-out infinite alternate`) for always-running portfolio card scroll. Reduced-motion override included.
- **`public/images/cta.png`** — Added workspace photo for hero visual.

**Files:** `src/components/home/{ServicesAccordion,Hero,FeaturedWork}.tsx`, `src/app/globals.css`, `public/images/cta.png`

---

## 2026-06-04 — Bug fixes: Services opacity overlap + FeaturedWork scroll preview restored

**What changed:**

- **`src/components/home/ServicesAccordion.tsx`** — Fixed text-layer overlap in `StickyServices`. Old code: simultaneous crossfade (OL=0.05 bidirectional) meant two layers at ~0.5 opacity at every transition. New code: sequential fade — each layer's fade-out completes at the boundary (S·i) before the next layer's fade-in begins. `TW=0.04` is a one-sided window. Added `useMotionValueEvent` to track `activeIdx`; only the active layer gets `pointerEvents: "auto"`, all others `"none"`.
- **`src/components/home/FeaturedWork.tsx`** — Restored hover-triggered tall-screenshot scroll preview in `WorkCard`. On hover (desktop), the static `_1.webp` fades out and the tall `_2.webp` fades in with the `work-scroll-preview-track` CSS animation (already in globals.css). `layerKey` resets the animation on hover-out. Respects `prefers-reduced-motion`.

**Files:** `src/components/home/{ServicesAccordion,FeaturedWork}.tsx`

---

## 2026-06-04 — Revert FeaturedWork+ChatbotShowcase; new sticky Services gallery

**What changed:**

- **`src/components/home/FeaturedWork.tsx`** — Reverted to stacked cards (from commit `de2fbce`). Normal scroll section with `py-16 lg:py-[140px]` padding, two WorkCards with scroll-linked breathing scale (0.94→1.02), and NDA placeholder. No sticky gallery.
- **`src/components/home/ChatbotShowcase.tsx`** — Reverted to auto-play animated chat demo (from commit `de2fbce`). IntersectionObserver drives `demoActive`; `AnimatedExampleChat` loops automatically on a timer. No scroll-driven messages or sticky section.
- **`src/components/home/ServicesAccordion.tsx`** — Complete rewrite. On desktop (≥ lg): `600vh` sticky scroll gallery — `StickyServices` renders 6 absolutely-stacked service text layers (left, 44%) and 6 image layers (right, 56%) that crossfade via `useScroll + useTransform`. Each service has opacity/y text slide-in and image scale settle. Gradient progress bar at bottom of left panel fills as you scroll through. On mobile (< lg): `MobileServicesList` shows a stacked numbered list with small thumbnails.
- **`public/images/services/`** — Created directory; downloaded 6 stock images from Unsplash: `ecommerce.jpg`, `web-design.jpg`, `chatbot.jpg`, `seo.jpg`, `automation.jpg`, `booking.jpg`.

**Service scroll math (S = 1/6, OL = 0.05 overlap):**
- Scene 0 (Ecommerce): starts visible, holds [0, S-OL], fades out [S-OL, S+OL]
- Scene i (1-4): fades in [i·S-OL, i·S+OL], holds, fades out [(i+1)·S-OL, (i+1)·S+OL]
- Scene 5 (Booking): fades in [5S-OL, 5S+OL], holds through 1.0
- Image scale: starts 1.05, settles to 1.0 as each scene holds

**Files:** `src/components/home/{FeaturedWork,ChatbotShowcase,ServicesAccordion}.tsx`, `public/images/services/*.jpg`

---

## 2026-06-04 — Pinned scroll sections + animated gradient mesh

**What changed:**

- **`src/components/home/Hero.tsx`** — Added sticky scroll pinning on `lg+`. The outer section becomes a scroll runway (`lg:h-[180vh]`); inner container is `lg:sticky lg:top-0 lg:h-screen`. Hero content (`motion.div`) fades/lifts/scales out as the user scrolls away (`opacity 1→0`, `y 0→-60px`, `scale 1→0.97` over scroll progress `[0.4, 0.8]`). Mobile: normal padded flow with no pinning.
- **`src/components/home/FeaturedWork.tsx`** — Full rewrite to CSS-breakpoint-split dual layout. `lg:hidden` section keeps the existing stacked card design for mobile. `hidden lg:block` renders `StickyGallery`: a 350vh outer section with a sticky `h-screen overflow-hidden` container holding 3 absolutely-positioned layers that crossfade via `useScroll` + `useTransform`. Images start at `scale: 1.03` and settle to 1.0 as each scene holds. Heading "Featured Work" fades out over first 20% of scroll progress. Projects appear in sequence: Living Silica (0→0.35), DK Express (0.25→0.70), "More on request" card (0.60→1.0).
- **`src/components/home/ChatbotShowcase.tsx`** — Full rewrite to CSS-breakpoint-split dual layout. `lg:hidden` section keeps the auto-play `AnimatedExampleChat` for mobile. `hidden lg:block` renders a 250vh sticky section with scroll-driven chat messages: left copy column fades in at start (`[0, 0.08]`), then 4 chat messages appear in sequence (`[0.05→0.16]`, `[0.23→0.34]`, `[0.42→0.53]`, `[0.60→0.71]`), CTA button fades in last (`[0.72→0.84]`). `useMotionValueEvent` fires the launcher attention pulse when section is fully scrolled through.
- **`src/app/globals.css`** — Added `hero-gradient-mesh` CSS class + `@keyframes hero-mesh-drift` animation: 3 overlapping radial gradient blobs that slowly drift (20s loop, respects `prefers-reduced-motion`). Used as a background texture layer in the Hero section alongside the existing dot grid.

**Architecture:**
- CSS breakpoint splitting (`block lg:hidden` / `hidden lg:block`) avoids SSR hydration mismatch — no JS needed for layout switching. Both layouts rendered in DOM; only one visible per breakpoint.
- Mobile: all 3 sections fall back to normal stacked flow with existing entrance animations.
- Desktop: `useScroll({ target, offset: ["start start", "end end"] })` tracks scroll progress through each tall section. Framer Motion WAAPI handles the actual animated values (opacity, y, scale); inline style attributes show base values.

**Files:** `src/components/home/{Hero,FeaturedWork,ChatbotShowcase}.tsx`, `src/app/globals.css`, `docs/BUILD_LOG.md`

---

## 2026-06-04 — Merco-matched scroll feel: motion overhaul

**What changed:**

- **`src/components/motion/Reveal.tsx`** — Updated ease `[0.16,1,0.3,1]` → `[0.22,1,0.36,1]`, duration 0.8 → 0.75, y 40 → 24, added `scale: 0.985 → 1` to initial/whileInView. All sitewide Reveal wrappers now match the new motion spec.
- **`src/components/home/Hero.tsx`** — Converted staggered `animate` delays to parent/child `whileInView` stagger pattern (`staggerChildren: 0.09, delayChildren: 0.04`). Child initial: `{ opacity: 0, y: 24, scale: 0.985 }`, show: `{ duration: 0.75, ease: [0.22,1,0.36,1] }`. Updated padding to `py-16 lg:pt-[182px] lg:pb-[120px]`.
- **`src/components/home/HomeIntro.tsx`** — Replaced `IntersectionObserver` color toggle with `useScroll` + `useTransform` continuous color shift (`[0.15,0.45]` → `#8a8a8a → #F0F0FF`). Replaced `StaggerGroup`/`Reveal` with direct motion stagger. Added two-tone "and" span. Updated padding to `py-16 lg:py-[140px]`.
- **`src/components/home/FeaturedWork.tsx`** — Added scroll-linked image scale to `WorkCard` and `NdaCard`: `useScroll` with `offset: ["start end","end start"]`, `scale: [0.94→1.02]`, `y: [24→0]`. Inner `motion.div` wraps each image inside `overflow-hidden` container so scale is clipped (breathing zoom effect). Updated stagger to new values. Padding to `py-16 lg:py-[140px]`.
- **`src/components/home/ServicesAccordion.tsx`** — Updated stagger to `parentVariant`/`childVariant`. Service rows list also staggered. Arrow travel changed to `translate-x-[6px]` (was 8px). Padding to `py-16 lg:py-[140px]`.
- **`src/components/home/ChatbotShowcase.tsx`** — Updated stagger to new values. Two-tone heading: "A" and "that" dimmed with `text-white/40`. Padding to `py-16 lg:py-[140px]`.
- **`src/components/home/ContactCta.tsx`** — Updated stagger to new values. Two-tone heading: "about" and "your" wrapped in `text-white/40`. Padding to `py-16 lg:py-[140px]`.
- **`src/components/layout/SiteHeader.tsx`** — Replaced boolean scroll-state class toggle for bg/blur with `motion.header` + `useScroll`/`useTransform`: `backgroundColor` interpolates `rgba(8,8,16,0) → rgba(8,8,16,0.72)` and `backdropFilter` `blur(0px) saturate(100%) → blur(14px) saturate(150%)` over first 80px of scroll. Border/shadow still snap via `scrolled` state.
- **`src/components/layout/SiteFooter.tsx`** — Added `"use client"`, motion stagger to logo/tagline, link columns, and CTA strip. Two-tone footer CTA: "something" dimmed with `text-white/40`.

**Animation spec (uniform across all sections):**
- Parent: `whileInView`, `viewport: { once: true, amount: 0.25 }`, `staggerChildren: 0.09`, `delayChildren: 0.04`
- Child initial: `{ opacity: 0, y: 24, scale: 0.985 }` → show: `{ opacity: 1, y: 0, scale: 1, duration: 0.75, ease: [0.22,1,0.36,1] }`
- Image scroll scale: `useScroll` target ref, `offset: ["start end","end start"]`, `scale: [0,0.5] → [0.94,1.02]`
- Section spacing: `py-16 lg:py-[140px]` (mobile 64px, desktop 140px)

**Files:** `src/components/motion/Reveal.tsx`, `src/components/home/{Hero,HomeIntro,FeaturedWork,ServicesAccordion,ChatbotShowcase,ContactCta}.tsx`, `src/components/layout/{SiteHeader,SiteFooter}.tsx`

---

## 2026-06-03 — Scroll animations, hover effects, parallax (Merco-matched)

**What changed:**

- **`src/components/motion/Reveal.tsx`** — Updated `revealDefaults`: `y` 10 → 40, `duration` 0.58 → 0.8. All sitewide scroll reveals now use the more dramatic 40px slide-up matching Merco's entrance depth.
- **`src/components/motion/StaggerGroup.tsx`** — Updated `staggerItem.y` 18 → 40, `staggerItem.duration` 0.62 → 0.8, `staggerTiming.staggerChildren` 0.055 → 0.1. Stagger sequences are now visibly sequenced rather than near-simultaneous.
- **`src/components/layout/SiteHeader.tsx`** — Raised scroll threshold for nav background transition from 8 → 50px (glass blur now activates after actually scrolling past the hero). Added `hover:scale-[1.02]` to the "Say Hello" nav CTA.
- **`src/components/home/Hero.tsx`** — Added scroll-driven parallax via `useScroll` + `useTransform`: hero content translates up at 15% of scroll speed (`[0,600] → [0,90]px`), creating depth as you scroll into the next section. Disabled under `prefers-reduced-motion`. Added `hover:scale-[1.02]` to primary CTA.
- **`src/components/home/HomeIntro.tsx`** — Added `StaggerGroup`/`StaggerItem` entrance to the stats column (label + stats stagger in on scroll). Added `motion.h2` entrance to the paragraph (opacity: 0→1, y: 40→0) while keeping the separate IO-triggered muted→white color transition, so the text fades in gray then reveals white.  Added `Reveal` wrapper to the marquee section.
- **`src/components/home/FeaturedWork.tsx`** — Added `motion.div` stagger to section label + heading. Each `WorkCard` now uses `motion.article` with `whileInView` entrance (opacity: 0→1, y: 40→0). Enhanced hover: image scale 1.025 → 1.03, overlay opacity 0 → 30%, added a centered "View →" pill label that fades in over the image on hover.
- **`src/components/home/ServicesAccordion.tsx`** — Converted to `"use client"`. Added `motion.div` stagger for section heading. Each service row uses `motion.li` with `whileInView` entrance. Service row numbers now cross-fade from muted gray to gradient (violet→cyan) on hover using a layered opacity approach (avoids CSS gradient transition limitation).
- **`src/components/home/ChatbotShowcase.tsx`** — Added `motion.div` section label entrance and stagger entrance for the entire left copy column (heading → description → bullets → button). Chat demo panel slides in with slight delay. Added `background: var(--surface)` to break the double-background-color run between ServicesAccordion and ContactCta. Added `hover:scale-[1.02]` to the CTA button.
- **`src/components/home/ContactCta.tsx`** — Converted to `"use client"`. Added section label entrance, stagger on left column (heading + contact info), and delayed `whileInView` entrance for the form on the right.

**Animation system:**
- All scroll entrances: `transform: translateY(40px) → 0`, `opacity: 0 → 1`, `duration: 0.8s`, `ease: cubic-bezier(0.16, 1, 0.3, 1)` (our `--ease-out-premium`)
- `viewport: { once: true }` on all — animations fire once only, never re-trigger on scroll up
- Reduced-motion safe: `StaggerGroup`, `Reveal`, and `useReducedMotion` all skip animation

**Files:** `src/components/motion/Reveal.tsx`, `src/components/motion/StaggerGroup.tsx`, `src/components/layout/SiteHeader.tsx`, `src/components/home/Hero.tsx`, `src/components/home/HomeIntro.tsx`, `src/components/home/FeaturedWork.tsx`, `src/components/home/ServicesAccordion.tsx`, `src/components/home/ChatbotShowcase.tsx`, `src/components/home/ContactCta.tsx`, `docs/BUILD_LOG.md`

---

## 2026-06-03 — Full homepage redesign (Merco-style)

**What changed:**

- **`src/lib/site.ts`** — Removed "Start" (`/services#path`) and "Process" (`/#process`) nav links; now five links: Work, Services, About, Blog, Contact.
- **`src/components/layout/SiteHeader.tsx`** — Full rewrite to Merco nav pattern: logo left, dark-pill rounded nav links centered, gradient "Say Hello" → `/#contact` CTA right. Removed `useConversion` / Quick Estimate button from nav. Mobile drawer updated to match.
- **`src/components/home/Hero.tsx`** — Full rewrite: single-column, 6rem desktop headline, two-tone text (`Your` muted gray / cycling word white / `built to sell.` gradient), section `pt-182px pb-100px` matching Merco's exact padding. Removed EcommercePreview mock.
- **`src/components/home/HomeIntro.tsx`** *(new)* — Merco `intor-v1` section: stats column left (label + three stat items), 2.25rem paragraph right (starts muted, transitions to white on scroll via IntersectionObserver), text marquee below (`marquee-track` reuse). Replaces old About + Stats + MarqueeBar.
- **`src/components/home/FeaturedWork.tsx`** — Rewrite to Merco work-card style: dark surface bg, "Featured Work" at 6rem two-tone heading, stacked full-bleed image cards each with top bar (View → left, project name center), 16:9 aspect ratio, subtle scale on hover. Two real portfolio cards + NDA placeholder.
- **`src/components/home/ServicesAccordion.tsx`** *(new)* — Merco numbered service list: "What We Do Best" label + "Our Services" 6rem two-tone heading, six rows at 4.25rem titles with 16px gray number, short tagline, right-side description, `0.8px` border-bottom separator, `pt-80px pb-100px` per row, CSS group-hover: title turns gradient, arrow shifts right.
- **`src/components/home/ChatbotShowcase.tsx`** — Restyled to match Merco section aesthetics (`pt/pb 100px`, same content-well, section label). All animation logic preserved.
- **`src/components/home/ContactCta.tsx`** — Rewrite to Merco two-col contact layout: big headline left + description + email, ContactForm right.
- **`src/components/layout/SiteFooter.tsx`** — Rewrite to Merco footer: logo + tagline top, divider, Pages/Legal/Social columns left, big CTA "Let's create something great together." + pill+circle button pair right, copyright + legal links bottom row.
- **`src/app/page.tsx`** — Updated composition: Hero → HomeIntro → FeaturedWork → ServicesAccordion → ChatbotShowcase → ContactCta. Removed old section imports (About, Stats, MarqueeBar, Process, ServicesHomeTeaser).

**Design reference:** https://merco-template.webflow.io/ — exact typography scale (96px / 68px / 36px), spacing (pt-182/100/140/100px sections), and layout patterns replicated with VryntLab content, violet-cyan palette, and logo.

**Files:** `src/lib/site.ts`, `src/components/layout/SiteHeader.tsx`, `src/components/layout/SiteFooter.tsx`, `src/components/home/Hero.tsx`, `src/components/home/HomeIntro.tsx` *(new)*, `src/components/home/FeaturedWork.tsx`, `src/components/home/ServicesAccordion.tsx` *(new)*, `src/components/home/ChatbotShowcase.tsx`, `src/components/home/ContactCta.tsx`, `src/app/page.tsx`, `docs/BUILD_LOG.md`

---

## 2026-06-02 — Legal / policy pages + footer legal links

**What changed:**

1. **`src/app/privacy/page.tsx`** — Privacy Policy (`/privacy`): covers contact form (Resend, no DB), chat lead extraction (Supabase structured data only, no transcripts), sessionStorage usage, no cookies/analytics, third-party providers table (Resend, Supabase, OpenRouter, Slack, Google Fonts), CCPA + GDPR rights, children's privacy, retention policy.
2. **`src/app/terms/page.tsx`** — Terms of Service (`/terms`): agreement, services, IP ownership + client deliverable transfer on full payment, AI chatbot disclaimers, no-guarantee clause, third-party platform liability, limitation of liability, indemnification, Illinois governing law, severability.
3. **`src/app/disclaimer/page.tsx`** — Disclaimer (`/disclaimer`): informational-only content, AI response limitations, no outcome guarantees (SEO/revenue/timeline), third-party platform non-liability, client responsibility, no professional advice (legal/financial/tax/medical).
4. **`src/app/acceptable-use/page.tsx`** — Acceptable Use Policy (`/acceptable-use`): permitted use, prohibited use (abuse/scraping/prompt injection/spam), no-sensitive-data warning, chat-not-contractual clause, enforcement rights.
5. **`src/components/layout/SiteFooter.tsx`** — Added `legalLinks` array and a fourth row below the copyright/social row with links to all four policy pages. Styled with `legalLinkClass` (dimmer than nav links, separate from `navLinks` so policy pages don't appear in the header).

All four pages: server components, `noindex`/`nofollow` robots metadata, no `"use client"`, `contentWell` + design-system typography consistent with other site pages.

**Files:** `src/app/privacy/page.tsx`, `src/app/terms/page.tsx`, `src/app/disclaimer/page.tsx`, `src/app/acceptable-use/page.tsx`, `src/components/layout/SiteFooter.tsx`, `docs/BUILD_LOG.md`

---

## 2026-06-02 — Blog frontmatter source + BlogPosting schema

**What changed:**

1. **`src/lib/blog-posts.ts`:** Single source for post slug, headline, description, dates, category, and index card copy. Helpers: `buildBlogPostMetadata` (title, description, canonical, OG `article` + `publishedTime`/`modifiedTime`, Twitter), `buildBlogPostingSchema` (`BlogPosting`, Organization author/publisher), `buildBlogPostBreadcrumbSchema`, `blogSitemapEntries`.
2. **Post pages:** Metadata and `BlogPosting` JSON-LD driven from `blog-posts.ts`; FAQ + breadcrumb unchanged per page.
3. **`/blog` index:** Card list maps from `blogPosts`.
4. **`sitemap.ts`:** Blog index + all posts via `blogSitemapEntries()` (was already listed; now derived from same registry).

**Files:** `src/lib/blog-posts.ts`, `src/app/blog/**/page.tsx`, `src/app/sitemap.ts`, `docs/BUILD_LOG.md`

---

## 2026-06-02 — Content SEO keywords + Chicago locality signals

**What changed:**

1. **Homepage:** Hero subtext mentions small businesses; services teaser line includes “web design”; homepage meta description and `brandMetaDescription` add Chicago; About copy (“Based in Chicago… small businesses across the US”).
2. **Services (`brandServiceGrid` + section intro):** Natural keyword placement — web design agency, website redesign, Shopify store, AI chatbot for your website, business automation, Google Business Profile optimization.
3. **Case studies:** Optional `metaDescription` on `CaseStudy`; Living Silica and DK Express use keyword-rich meta (Shopify / ecommerce redesign; website design / logistics / small business). `/work/[slug]` prefers `metaDescription` over `problem` slice.
4. **Schema:** `ProfessionalService.areaServed` → Chicago `City` with `sameAs` (address locality was already Chicago, IL, US).
5. **Blog index:** Meta title/description already matched spec — no edit.

**Files:** `src/components/home/Hero.tsx`, `src/app/page.tsx`, `src/lib/brand-knowledge.ts`, `src/lib/case-studies.ts`, `src/app/work/[slug]/page.tsx`, `src/components/seo/SchemaOrg.tsx`, `docs/BUILD_LOG.md`

---

## 2026-04-21 — Serif VL monogram favicons (cropped brand asset) + header logo column centering

**What changed:**

1. **Favicons:** `scripts/generate-favicons.mjs` reads `public/brand/vl-logo.webp` with **sharp**, **extracts the top ~42%** of height (full width) to isolate the black serif **VL** monogram above the wordmark, then **resize**s to square PNGs (white letterboxing via `fit: 'contain'`) and writes `src/app/icon.png` (512×512), `apple-icon.png` (180×180), `favicon.ico` (32 + 16 via **png-to-ico**). No teal or generated sans text. Run `npm run generate-favicons` after changing the source WebP.
2. **Header logo:** Logo column uses **`self-stretch`** with **`flex items-center justify-start`** so the mark is vertically centered in the header bar; **`Link`** keeps flex centering without `self-start` / `mt-*`; grid row adds **`min-h-0 min-w-0`**; **`Image`** uses **`max-h-[calc(100%-0.25rem)]`** on small screens to reduce clipping inside the bar, with **`sm:max-h-none`** from `sm` up. Heights unchanged: `h-[5.5rem] sm:h-[6.25rem] md:h-[7rem] lg:h-[8rem] xl:h-[9rem]`.

**Before → after (className snippets):**

- Logo column `div`: `flex min-w-0 shrink-0 items-center justify-start` → `flex min-h-0 min-w-0 shrink-0 self-stretch items-center justify-start`
- Logo `Link`: `group/logo relative flex shrink-0 items-center …` → `group/logo relative flex min-h-0 min-w-0 shrink-0 items-center …`
- Grid wrapper: `grid w-full min-w-0 grid-cols-…` → `grid w-full min-h-0 min-w-0 grid-cols-…`

**Files:** `scripts/generate-favicons.mjs`, `src/app/icon.png`, `src/app/apple-icon.png`, `src/app/favicon.ico`, `src/components/layout/SiteHeader.tsx`, `docs/BUILD_LOG.md`

---

## 2026-04-21 — Homepage slim-down, `/services` hub, VL favicon text, chat launcher, contact form

**What changed:**

1. **Favicons:** `scripts/generate-favicons.mjs` now renders **“VL”** (bold sans SVG → sharp) on white at 512 / 180 / 32 / 16 — readable at favicon size. Run `npm run generate-favicons` after edits.
2. **Header logo:** Taller steps — `h-[5.5rem]` → `xl:h-[9rem]`; `max-w-[min(88vw,20rem)]` on mobile, `sm:max-w-[min(70vw,22rem)]`, `md+`: `max-w-none`.
3. **`/services`:** New `src/app/services/page.tsx` — title “What we do — VryntLab”, `NeedPathSelector`, `ServicesGrid`, new `ServiceLanePanels` (three `brandServiceLanes`), bottom CTA to `/#contact`.
4. **Homepage:** Removed `NeedPathSelector`, full services grid, lane panels, `CredibilityStrip`, and hero product mock (`HeroProductMock.tsx` deleted). Added `ServicesHomeTeaser` (three lines + “See all services →”). Hero is **text + CTAs only**; new headline/subhead in `brand-knowledge.ts`; path link → `/services#path`.
5. **Nav (`site.ts`):** `Start` → `/services#path`, `Services` → `/services`.
6. **Chat launcher:** Tooltip after 3s, dismiss at 8s or click/open; `sessionStorage` key `vryntlab-chat-launcher-tip-dismissed`; `.chat-widget-launcher-wrap` + `chat-widget-launcher--alive` + `chat-launcher-alive-ring` in `globals.css`.
7. **Contact form:** Removed intent-based message prefill; honeypot field only (no “Website” label); textarea label **Message** (name, email, message only).
8. **Removed:** `CredibilityStrip.tsx`, `HeroProductMock.tsx`; `ServicesGrid` duplicate `#service-*` anchor divs (ids live on `ServiceLanePanels` articles).

**Files (high level):** `scripts/generate-favicons.mjs`, `src/app/page.tsx`, `src/app/services/page.tsx`, `src/components/home/{Hero,ServicesHomeTeaser,ServiceLanePanels,ServicesGrid}.tsx`, `src/components/chat/{VryntLabChatbot,chat-widget.css}`, `src/app/globals.css`, `src/lib/{site,brand-knowledge}.ts`, `src/components/ui/ContactForm.tsx`, `src/components/layout/SiteHeader.tsx`, `docs/BUILD_LOG.md`, `docs/CLIENT_SITE_BLUEPRINT.md`

---

## 2026-04-21 — Favicon (VL mark), larger header logo, production redeploy

**What changed:**

- **Favicon / PWA icons:** Added `public/brand/vl-logo.webp` (white-background mark from project asset). `scripts/generate-favicons.mjs` uses **sharp** + **png-to-ico** to regenerate `src/app/icon.png` (512×512), `src/app/apple-icon.png` (180×180), and `src/app/favicon.ico` (16 + 32 px ICO) — replaces the default triangle. Run `npm run generate-favicons` after updating the source WebP. `layout.tsx` sets explicit `metadata.icons` for `/favicon.ico`, `/icon.png`, `/apple-icon.png`. Header continues to use `whitefont.png` only.
- **Header logo:** Increased display heights and max-width caps at each breakpoint; removed negative horizontal translate on the logo link; logo column uses `items-center` for vertical alignment with the nav row. **Before → after:** `h-[3.875rem] sm:h-[4.5rem] md:h-[5rem] lg:h-[5.75rem] xl:h-[6.75rem]` → `h-[4.5rem] sm:h-[5.25rem] md:h-[5.75rem] lg:h-[6.5rem] xl:h-[7.5rem]`; `sizes` widened slightly; `max-w` uses responsive `min(…vw,…rem)` steps up to `xl:max-w-[min(36vw,24rem)]`.
- **Cache / deploy:** Pushed to `main` with an additional **empty commit** to encourage Vercel edge refresh for clients still seeing stale HTML.

**Files:** `public/brand/vl-logo.webp`, `scripts/generate-favicons.mjs`, `package.json` (devDeps + script), `src/app/layout.tsx`, `src/app/icon.png`, `src/app/apple-icon.png`, `src/app/favicon.ico`, `src/components/layout/SiteHeader.tsx`, `docs/BUILD_LOG.md`

---

## 2026-04-21 — Sub-page nav + live site parity (case studies)

**What changed:**

- **`src/lib/site.ts`:** `navLinks` now use root-relative hashes (`/#path`, `/#work`, …) so header and footer navigation works from `/github`, `/x`, `/work/*`, and any non-home route. Bare `#section` only targets the current URL’s hash and was a no-op off the homepage.
- **`src/components/layout/SiteHeader.tsx`:** Logo link updated from `#top` to `/` so the brand mark returns to the home page from sub-routes.
- **`src/components/home/Hero.tsx`:** Primary/secondary/path CTAs updated to `/#contact`, `/#work`, `/#path` for the same routing behavior if links are reused or followed from non-home contexts.
- **`StickyMobileCta.tsx`**, **`ServicesGrid.tsx`**, **`MidPageCta.tsx`:** Section CTAs updated from bare hashes to `/#work` / `/#contact` so they work from sub-pages.
- **`SiteFooter.tsx`:** Footer nav uses the same `navLinks` — switched to `next/link` for internal routes (matches header + satisfies `@next/next/no-html-link-for-pages`).

**Case studies (source of truth):** `src/lib/case-studies.ts` already contains **only** Living Silica and DK Express Logistics; `FeaturedWork` and the hero proof line (`caseStudyProofLine()` in `Hero.tsx`) derive from that array. Zebra Crypto and Global Ship Services are not present in the repo. If the production site still shows three old clients or the old proof sentence, trigger a fresh **production deploy** on Vercel so the edge network serves the current bundle.

**Docs:** Pre-launch checklist in `docs/CLIENT_SITE_BLUEPRINT.md` — nav hash rule added.

**Files changed:** `src/lib/site.ts`, `src/components/layout/SiteHeader.tsx`, `src/components/layout/SiteFooter.tsx`, `src/components/home/Hero.tsx`, `src/components/conversion/StickyMobileCta.tsx`, `src/components/home/ServicesGrid.tsx`, `src/components/home/MidPageCta.tsx`, `docs/BUILD_LOG.md`, `docs/CLIENT_SITE_BLUEPRINT.md`

---

## 2026-04-21 — Homepage UX pass: nav, hero, chatbot, services, about, social

**What changed:**

- Mobile header: duplicate CTAs removed; single **Menu** on small screens; **Quick estimate** in drawer (`SiteHeader.tsx`).
- Hero + meta: lead with websites, AI chatbots, and automation (`brand-knowledge.ts`, `Hero.tsx`).
- **ChatbotShowcase**: inline **example** transcript (bubbles, bot avatar, timestamps, looping typing on last bot line), hint toward floating widget, **one-shot pulse** on launcher after scrolling past the section (`globals.css` — new pulse keyframes only).
- **Services**: tab UI removed; **2×4 outcome grid** (`ServicesGrid.tsx`); hidden `#service-*` anchors kept for path selector; `ServicesExplorer.tsx` removed.
- **About**: founder voice + **$500** starting signal (`brandAbout.paragraphs`).
- **Social**: real Facebook/Instagram URLs; **X** → `/x`, **GitHub** → `/github`; LinkedIn removed; no `#` placeholders; footer hides social block when empty.
- **New routes**: `/x` (coming soon), `/github` (email gate → existing `/api/contact`).

**Why:** Surface the chatbot as a product, speak in client problems not dev lanes, add trust (pricing + real links), and remove broken social placeholders.

**Files changed:**

- `src/components/layout/SiteHeader.tsx`
- `src/components/home/ChatbotShowcase.tsx`
- `src/components/home/ServicesGrid.tsx` (new)
- `src/components/home/Services.tsx`
- `src/components/home/Hero.tsx` (via brand keys)
- `src/components/layout/SocialLinks.tsx`
- `src/components/layout/SiteFooter.tsx`
- `src/lib/brand-knowledge.ts`
- `src/app/page.tsx`
- `src/app/globals.css` (chat launcher pulse only)
- `src/app/x/page.tsx` (new)
- `src/app/github/page.tsx`, `src/app/github/GithubAccessForm.tsx` (new)
- `docs/BUILD_LOG.md`
- `docs/CLIENT_SITE_BLUEPRINT.md`

---

## 2026-04-21 — Work section redesign: new projects, scrolling previews, "more work" hint

**What changed:**

- Replaced 3 case studies with 2 curated project examples
- Removed Zebra Crypto and Global Ship Services entries
- Added DK Express Logistics as new project
- Replaced .mov video autoplay with CSS scrolling screenshot animation
- Replaced all .png project images with .webp versions
- Added "more work on request" frosted card hint below portfolio
- Changed all "Case study" labels to "Project"
- Updated section copy to feel selective, not sparse

**Files changed:**

- `src/lib/case-studies.ts`
- `src/components/home/FeaturedWork.tsx`
- `src/components/home/ScrollingWorkPreview.tsx` (replaces removed `CaseStudyPreviewMedia.tsx`)
- `src/lib/brand-knowledge.ts`
- `src/app/work/[slug]/page.tsx`
- `src/app/work/page.tsx`
- `src/components/work/CaseStudyHeroScroll.tsx`
- `src/app/globals.css`
- `docs/BUILD_LOG.md`

---

## 2026-04-15 — Vercel: lead pipeline env (Supabase + Slack + lead email)

**Project:** `vryntlab-1`. **Production** env now includes `SUPABASE_URL`, `SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`, `SLACK_LEAD_WEBHOOK_URL`, `LEAD_NOTIFY_EMAIL`, `RESEND_FROM_EMAIL` (values sourced from local `vryntlab-ai/.env.local` / team keys). **`vercel deploy --prod`** run so `https://vryntlab.com` picks up the new variables.

**Preview:** CLI may require a Git branch qualifier for Preview-scoped vars; production path is complete. Add Preview copies in the dashboard if PR previews need lead + Slack testing.

---

## 2026-04-15 — Diagnosis: human-handoff Slack/email (lead pipeline)

**Root cause (typical production):** Slack and lead **email** only fire **after** a **Supabase `leads` insert**. In **production**, `createSupabaseLeadWriteClient()` is **`null`** unless **`SUPABASE_URL`** + **`SUPABASE_SERVICE_ROLE_KEY`** are set — otherwise `[lead] lead_gate_blocked: supabase_unconfigured` and **no** notifications.

**Slack:** Requires **`SLACK_LEAD_WEBHOOK_URL`** and/or bot + channel/DM envs (see `lead-notifications.ts`). If unset, behavior was silent; added log: `[notify] notification_slack_skipped: …`.

**Lead email:** Previously expected **`LEAD_NOTIFY_EMAIL`** / **`RESEND_FROM_EMAIL`** only. **`serverEnv.lead`** now falls back to **`CONTACT_TO_EMAIL`** / **`CONTACT_FROM_EMAIL`** when lead-specific vars are unset (same Resend inbox as contact).

**Docs:** `CHAT_INTEGRATION.md` — subsection **Lead save + human-handoff notifications**.

---

## 2026-04-15 — Production: `vryntlab-1` → `vryntlab-web` + live domain

**Vercel:** Existing project **`vryntlab-1`** (not a new project). **Git:** Reconnected with `vercel git connect` to **`syedhamzahabib2026-source/vryntlab-web`** (replacing prior `vryntlab_1` linkage). Latest production deployment metadata shows **`githubRepo`: `vryntlab-web`**, commit **`b6d01e0`** (README repo link).

**Domains:** Production deployment **aliased to `https://vryntlab.com`**. Deployment URL pattern: `vryntlab-1-*.vercel.app` (per-build hostname).

**Env (Production):** `OPENROUTER_API_KEY`, `OPENROUTER_SITE_URL` (= `https://vryntlab.com`), `OPENROUTER_APP_NAME`, plus Resend/contact vars (`RESEND_API_KEY`, `CONTACT_*`) for **Production** (contact also on Preview/Development from earlier setup). Optional Supabase/Slack not required for basic chat + contact.

**CLI:** `vercel deploy --prod` triggered successful build (Next 16.2.1). **Preview:** OpenRouter vars are **Production-only** — add to **Preview** if chat must work on PR preview URLs.

**Docs:** `docs/DEPLOYMENT.md` updated with project/repo/domain table and preview note.

---

## 2026-04-15 — Deployment handoff (GitHub + Vercel)

**Context:** Integrated app is **`trellisify-project/`** only; **`vryntlab-ai/`** is not deployed.

**Added:** [`docs/DEPLOYMENT.md`](DEPLOYMENT.md) — repo layout options (app-only vs monorepo + **Root Directory**), Vercel env checklist (OpenRouter, Resend, contact, optional Supabase/Slack), post-deploy verification. README links this doc.

**Blocked on this machine:** No `.git` at workspace root — **push to GitHub requires** initializing a repo and remote (or cloning from GitHub first). Vercel CLI had **no local login** (`vercel whoami` → device flow). **Env vars** must be set in the **Vercel dashboard** (or `vercel env` after CLI login).

**Vercel account snapshot (for naming):** Team projects include **`vryntlab-1`** and **`trellisify-test-1`** — confirm which project owns the **production custom domain** before changing DNS or import settings.

---

## 2026-04-15 — Pre-push / pre-deploy final pass (launch-ready)

**Scope:** No redesign—polish, chat QA notes, env clarity, push readiness.

**UI**

- **Header logo:** Nudged **~2px further left** (`-translate-x-[5px]`, `sm:-translate-x-[6px]`) so the mark aligns with the content grid; nav and CTAs unchanged.

**Chat**

- **Message list:** Last bubble row drops extra bottom margin so the thread sits tighter above the composer (`chat-widget.css`).

**Docs**

- **`CHAT_INTEGRATION.md`:** New subsection **“If chat returns not configured (missing API key) locally”** — working directory, `.env.local` path, restart requirement, sibling-folder caveat, server-side read path (`env.ts` → `openrouter.ts`), Vercel env.

**Verification (this pass)**

- `npm run lint` — clean (ESLint).
- `npm run build` — success (Next.js 16.2.1); routes include `/`, `/api/contact`, `/api/chat`, `/work/[slug]`.

**Manual before merge**

- Desktop + mobile pass on home/work; chat open/send/escape; sticky CTA vs launcher at ~375px width; quick estimate + chat if both used.

---

## 2026-04-15 — Final QA + production deployment prep (site + integrated chat)

**Automated verification (this pass)**

- `npm run lint` — clean (ESLint).
- `npm run build` — clean; routes include `/`, `/api/contact`, `/api/chat`, `/work/[slug]`.
- **Static review:** `dialog:not([open])` keeps quick estimate hidden until opened; chat launcher `z-index` stack documented in `CHAT_INTEGRATION.md`; `SiteChat` passes `intentId`, `pathname`, `estimateOpen` (six intent lanes supported in `chat-site-context.ts`).

**Code / ops notes**

- **Server logs:** `POST /api/chat` gates verbose `gate_eval` debug lines behind `CHAT_VERBOSE_LOGS` or non-production (`chatVerboseLogsEnabled()`). `console.error` on real failures retained. `[lead]` / `[notify]` / `[chat-protect]` logs are intentional for ops—reduce noise only by tuning env, not by deleting error paths.
- **Secrets:** No hardcoded API keys in source; use `.env.local` from `.env.example`.

**Manual checks before go-live (required)**

- Browser: home → sections → quick estimate (six lanes) → contact; open chat, send a message with `OPENROUTER_API_KEY` set; confirm no overlap between sticky mobile CTA and chat launcher on a 360px-wide viewport.
- **Vercel:** Production env matches `.env.example`; `OPENROUTER_SITE_URL` = public site URL.

**Local browser run:** If `npm run dev` is already bound to port 3000, open `http://localhost:3000` and repeat the manual checks above—automated HTTP smoke from this environment may time out if no server is listening.

---

## 2026-04-16 — QA + deployment prep (site + chat): hydration fix, docs, env clarity

**What changed**

- **Hydration safety:** `VryntLabChatbot` no longer initializes `conversationId` from `sessionStorage` inside `useState`’s lazy initializer (SSR saw `""`, client could immediately get a UUID → mismatch risk). State starts **`""`**, then **`useEffect`** loads the persisted id — `send()` already falls back to `readOrCreateSessionId` if needed.
- **Docs:** `docs/CHAT_INTEGRATION.md` — **stacking / modals**, **hydration note**, **local run**, **Vercel deploy** checklist; `.env.example` — comment for optional **`CONTACT_FROM_EMAIL_DEV`**.
- **Verification:** `npm run build` and `npm run lint` pass on this snapshot.

**Manual / staging checks before go-live**

- Full pass on **home + work + contact**, **quick estimate** dialog, **chat** open/close and one real message with `OPENROUTER_API_KEY` set.
- **Mobile** (narrow width): sticky CTA vs chat launcher, keyboard over composer, no double scroll in estimate or chat.
- **Production env** on the host matches `.env.example`; no secrets committed.

## 2026-04-16 — Chat assistant hardening: launcher affordance, UX polish, docs

**What changed**

- **Launcher clarity:** Replaced the generic **square avatar** image with an **inline SVG** (`ChatLauncherGlyph`) — overlapping **speech bubbles** tinted with **`var(--accent)`** so it reads immediately as chat, not a blank widget. Added a visible **“Ask”** label on **`md+`** (`768px+`); **icon-only** on small screens to preserve thumb reach and avoid crowding the sticky bar. **Optional** `launcherImageSrc` still overrides the glyph for white-label reuse.
- **Accessibility / UX:** Launcher **`aria-label`** → “Ask VryntLab — open chat”. Opening the panel **focuses the message input** (with a short delay) instead of the close control; **`enterKeyHint="send"`** + **`autoComplete="off"`** on the composer. **Safe-area** padding on the composer and **top inset** on full-screen mobile panel. Slightly tighter **message spacing** and scroll padding.
- **Cleanup:** Removed unused **`public/chat-launcher-avatar.svg`** (default glyph is inline). **`brand.ts`** documents **`launcherButtonLabel`** for the visible label.
- **Documentation:** New **`docs/CHAT_INTEGRATION.md`** (file map, site context, env, QA, team workflow). This entry records the pass.

**Why**

- Ship a **premium, on-brand** entry that is obviously **chat / ask**, without cheesy stock icons; keep the merged app **documented** for future client work.

**Verify**

- `npm run build`, `npm run lint`; spot-check launcher on mobile + desktop, keyboard + Escape, sticky CTA overlap.

## 2026-04-16 — UX & trust pass: growth positioning, `/work/[slug]`, navbar glass, modal removal

**What changed**

- **Hero & meta:** Outcome-led headline; removed the “small team / handoff” line; **single services line** (redesign, bookings, SEO, GBP, chatbots, automations, speed). **Proof label** is **Selected work**. Site title + meta description reframed around **business growth**, not dev jargon.
- **Sitewide copy:** Path selector, intents, services, process, about, credibility, delivery footer, mid CTA—tuned to **plain language** and **less builder-speak**.
- **Work section:** Intro sentence reads naturally; cards link to **`/work/[slug]`** (static pages: `living-silica`, `globalservices`, `crypto`). **Removed** `CaseStudyModal` and **`CaseStudyStoryPeek`** (no in-card scroll/clamp hover layer). Card body copy uses **relaxed line-height** and **wider measure** for readability.
- **Case study pages:** New **`app/work/[slug]/page.tsx`** — breadcrumb to `/#work`, hero, **Problem / What we did / Result**, primary media, optional gallery, live link + contact CTA. **`getCaseStudyBySlug` / `getAllCaseStudySlugs`** in `case-studies.ts`.
- **Navbar:** At top of page, **lighter glass** (`~52%` / `~42%` dark) + **soft border** so it **blends with the hero**; after scroll, **stronger fill** + standard border (still **no solid ink bar**).

## 2026-04-16 — Final enhancement phase: intent-native CTAs, case peek, adaptive estimate, path triad

**What changed**

- **Context-aware CTAs (`brandIntentActionLabels`):** When `selectedIntent` is set, primary **#contact** actions use lane-specific labels (**Fix my site** / **Connect my tools** / **Build something custom**). **Estimate** entry points use matching **Estimate …** strings (hero unchanged aside from contact; **header** Estimate + mobile nav estimate, **sticky bar**, **mid-page primary**, **contact column** quick estimate, **submit** in the dialog). Defaults unchanged when no path is selected.
- **Case study “At a glance” (`CaseStudyStoryPeek`):** On work cards, a **gradient overlay** shows **Problem / Fix / Result** (from `case-studies` data). **Hover** (fine pointer) or **keyboard focus** on the card reveals it; **touch / coarse** gets an **At a glance** toggle that does **not** open the full modal (`stopPropagation`). CSS-only motion, no new deps.
- **Adaptive quick estimate (`brandQuickEstimateAdaptive`):** Per-intent **note field label**, **placeholder**, and a short **bullet checklist** of what to include; **submit** label matches intent (**Send site estimate**, etc.). If no lane is chosen yet, a single line explains that placeholders adapt after you pick one.
- **Path panel “system” scaffold (`brandIntentTriad` + `PathIntentTriad`):** After **If this is you**, a **three-column (stacked on mobile)** strip spells **friction → what we fix → outcome** before the existing headline and outcome bullets—reads like a small diagnostic, not a static blurb.

**Why**

- Makes **`selectedIntent` feel like product state**: the page and dialogs respond in copy, not only in hidden form context—stronger conversion and clearer mental model without a chatbot or scroll spy.

**Performance / scope**

- No new packages; peek is an absolutely positioned layer + one `matchMedia` hook per card (cheap).

## 2026-04-14 — Premium refinement pass (layout rhythm, CTAs, case-study video on mobile)

**What changed**

- **Case study preview video:** Replaced coarse-pointer-only autoplay with an explicit **`hoverCard` vs `inViewAutoplay` mode** from `(min-width: 1024px) and (hover: hover) and (pointer: fine)`. Narrow windows and touch devices always use **in-view autoplay** (muted, `playsInline`, pause out of view); wide desktop keeps **hover/focus-in-card** behavior. Tuned **IntersectionObserver**: play at **≥20%** visible, stop below **6%** (hysteresis), **`rootMargin: -8% 0 -10%`**, denser thresholds so callbacks stay reliable. “In-view preview” chip shows only in `inViewAutoplay` mode.
- **Layout / sticky CTA:** Removed **`sm:pb-14`**, which had **reduced** bottom padding on tablet and hid content behind the **`< lg` sticky bar**. **All viewports below `lg`** now keep **`pb-[max(5.75rem, safe-area)]`**; **`lg+`** stays **`pb-[max(4rem, safe-area)]`**. Dropped redundant bottom padding on the home wrapper.
- **Conversion & mobile ergonomics:** Mid-page CTA — stronger mobile title line-height, **52px-tall** primary/secondary on small screens, looser stack spacing. Sticky bar buttons **52px** min height. Path lane chips **`min-h-12`**. Services tabs **`min-h-12`** on small screens. Delivery preview **header** — better vertical rhythm, hint text measure and **`sm:text-right`**. Hero **“Pick a lane”** link — **44px** min touch height on mobile.

**Why**

- Ship a deliberate **mobile-first media** rule (no “fine pointer on a phone” edge cases) and fix a real **padding regression** for the sticky footer CTAs.

**Still not perfect**

- Very small landscape phones may still need a touch more bottom padding depending on safe-area; tune against real devices if QA flags it.

## 2026-04-15 — Remove temporary site assistant; strengthen adaptive UX + copy

**What changed**

- **Removed** the embedded website assistant: `VryntLabChatbot`, `ActiveSectionTracker`, `POST /api/chat`, `lib/chat-prompt.ts`, `lib/chat-types.ts`, `lib/site-sections.ts`, chat-only CSS (typing dots / section highlight), and OpenRouter vars from `.env.example`. `ConversionContext` is back to **estimate + `selectedIntent` only** (no `openChat`, no scroll-section tracking for AI).
- **CTAs restored** to non-chat flows: hero + header “Start a project” → `#contact`; mid-page bands + path + services → **quick estimate** (`openEstimate`) or **`#contact`** link for full brief.
- **Kept** path → delivery preview → services tab sync, `LayoutGroup` interactions, quick estimate sheet, sticky mobile bar, case studies, motion—site still feels stateful without a chat surface.
- **New / tightened “smart without chat” behavior (copy + light UI):**
  - **Intent line on Featured Work** when a path is selected (`brandWorkIntentNudge`)—points readers at what to look for in case studies.
  - **Intent line on mid-page CTAs** (`brandMidPageIntentNudge`)—reminds them estimate opens with the current path context.
  - **Intent hint inside quick estimate** dialog (`brandQuickEstimateIntentHint`)—sets expectation per lane.
  - **Path-specific footer** under delivery mock (`brandDeliveryFooter.byIntent`)—replaces one generic line with lane-specific framing.
- **Business-specific copy** expanded in `brand-knowledge.ts`: landing pages, GBP + SEO, booking/lead, chatbots/automations as offerings, performance/technical fixes, process/integration work; services lane title for systems broadened to “Automation, chatbots & integrations.”

**Why**

- Standalone chatbot will ship later; the marketing site should stay fast, focused, and credible with **adaptive layout + intent** instead of a second conversational product.

**Deferred**

- Wire the future standalone assistant to the same `selectedIntent` / anchors when you integrate it—reuse `brand-knowledge` for tone.

## 2026-04-14 — Context-aware site assistant (chat embed + OpenRouter) _(removed 2026-04-15 — see entry above)_

**What changed**

- **Assistant UI:** `VryntLabChatbot` — fixed launcher (bottom-right, above mobile sticky bar), teal glow + subtle post-scroll pulse (limited repeats, respects `prefers-reduced-motion`), panel open/close via `motion` + shared `motionEase`. Typing row, grouped user/assistant bubbles, action chips (scroll / quick estimate / contact).
- **Context:** `ActiveSectionTracker` + `SECTION_ANCHORS` map DOM ids (`#top`, `#work`, …) to `SiteSectionId`; `ConversionContext` exposes `activeSiteSection`, `chatOpen`, `openChat` / `closeChat`, `chatBootOpts` (entry flow + optional intent).
- **API:** `POST /api/chat` — Node runtime, `fetch` to OpenRouter with JSON-only replies; system prompt from `buildChatSystemPrompt` (section + intent + entry flow). No new npm dependencies.
- **Conversion wiring:** Hero + header “Start project” → `openChat({ flow: "project" })`. Mid-page bands + path selector + services lane CTAs → `openChat` with `estimate` or `contact` and current `selectedIntent` where relevant. Header / sticky / `ContactEstimateButton` still open the **quick estimate** dialog for zero-AI intake.
- **Delivery section** given `id="delivery"` for scroll targets. **CSS:** `.chat-typing-dots` keyframes, `.site-section-highlight` for post-scroll outline cue.

**Why**

- Treat the assistant as part of the product surface (same tokens, motion, conversion layer) rather than a generic widget; keep one lightweight context object sent with each turn instead of global app state.

**Tools / env**

- OpenRouter account + `OPENROUTER_API_KEY`; optional `OPENROUTER_MODEL`, `NEXT_PUBLIC_SITE_URL` (Referer). Documented in `.env.example`.

**Reusing on client sites**

- Copy `lib/chat-types.ts`, `lib/chat-prompt.ts`, `lib/site-sections.ts` (retune anchors + `SECTION_GUIDE`), `api/chat/route.ts`, and the chat components; wrap your existing conversion provider or merge `openChat` / `activeSiteSection` into it. Point CTAs at `openChat({ flow, intent })` and keep a direct form path for users who skip AI.

## 2026-04-15 — Elite refinement pass (signature hero, work immersion, sharper CTAs)

**What changed**

- **Hero:** Shorter, two-tier copy + contrast hook (“no account-manager layer”); proof block labeled “Proof”; removed redundant closing line. **HeroProductMock:** stacked halos (CSS `hero-mock-halo` + radial washes), rear plate, stronger rim/shadow on main window, slow float on staging card, gradient sheen over media.
- **Featured work:** Taller flagship media, gradient “glass” card, **680ms** hover transitions and deeper lift/shadow; media column **full-bleed within card** (`lg:p-0`); **“More work”** gradient divider; section lede tightened.
- **Mid CTA:** Ink **decision-band** layout (kicker + display title, dual glow orbs), confident copy, white primary / ghost secondary on dark panel (light + dark themes).
- **Path selector:** Removed single heavy outer box; **LayoutGroup + `layoutId`** sliding highlight between lanes; copy ties to adapting site; detail panel spring + scale-in; stronger selected microcopy.
- **Delivery preview:** “Console” chrome (traffic lights, zsh title), **cycling build log** line + scanline animation (`terminal-scan`), richer shadows/inset; milestone rows stagger in.
- **Services:** Shorter blurbs; **`details`** for deliverables; **accent left rail** on panel; **LayoutGroup** sliding pill on tabs; shorter labels on tabs; tighter vertical rhythm on section.
- **Case study video (touch):** Stricter intersection (center-weighted margins, **0.38** play threshold) + **“In-view preview”** chip when playing on coarse pointers.

**Why**

- Push perceived quality and memorability without new deps or layout rewrites—more depth, clearer decisions, smarter feedback loops.

**Tools**

- Existing `motion` (LayoutGroup, springs), CSS keyframes in `globals.css`, native `<details>`.

**Lessons**

- Sliding `layoutId` reads as “product UI” for the same cost as static tabs.
- Collapsing dense scope into `<details>` keeps the lane scannable without losing substance.

## 2026-04-14 — Premium slab redesign (display type, work band, explorer, delivery preview)

**What changed**

- **Typography:** `Instrument_Serif` via `next/font/google` as `--font-display`; `.font-display` utility + SectionIntro / hero / case titles use it; body remains Geist.
- **Visual slabs:** `.slab-bleed` + `.slab-dark` in `globals.css` (forced charcoal band, grid + mint wash). Featured Work + Contact sit on slabs; inner cards use glassy borders, teal hover, stronger shadows.
- **Home order:** Hero → Featured Work (slab) → mid-page CTA → Credibility → Path → **DeliveryPreview** → Services explorer → second mid CTA → Process → About → Contact (slab).
- **Hero:** `HeroProductMock` — layered chrome, sidebar skeleton, staging chip, milestone pill, real still inside frame; case-study proof line (no fake metrics); tighter vertical rhythm.
- **Featured Work:** First case full-width immersive row; other two in a 2-col grid on large screens; dark-slab palette; `SectionIntro` `tone="onDark"`.
- **Services:** `ServicesExplorer` — segmented tabs + `AnimatePresence` panel; per-lane estimate + contact CTAs; hidden scroll anchors preserve `#service-*` for path selector pulse.
- **Standout:** `DeliveryPreview` — fake staging terminal + milestone list keyed off `selectedIntent` (shared with path + explorer).
- **Conversion:** `MidPageCta` after work and after services; contact column `ContactEstimateButton` `onDark` variant; form sits on a light “island” for contrast on dark slab.
- **Mobile:** `SectionShell` default/compact padding reduced; `CaseStudyPreviewMedia` touch autoplay thresholds/rootMargin tuned for earlier, smoother in-view play.

**Why**

- Push toward Linear/Vercel-style contrast and depth without new animation deps; keep one motion library and CSS-first slabs.

**Tools used**

- Next.js `next/font/google` (Instrument Serif) — no extra npm packages.
- Existing: `motion` (tab panel + delivery mock), native IO/dialog.

**Reusable insights**

- Forced-dark slabs decouple “dramatic band” from `prefers-color-scheme` so light pages can still use ink sections.
- Single source of truth for tabs: derive active tab from `selectedIntent` instead of syncing `useEffect` → avoids lint/runtime cascade issues.
- When tabs replace always-mounted cards, add invisible `#id` anchors if other UI still scrolls to those ids.

## 2026-04-14 — Homepage second pass (product-style interaction)

**What changed**

- **Visual system:** Light-first palette with teal signal, ink CTAs, soft mesh background (`body::before`), layered dark mode (charcoal surfaces, mint accent). New tokens: `--surface-ink`, `--background-2`, `--accent-2`, `--shadow-glow`, `--mesh-*`.
- **Standout feature:** `NeedPathSelector` (`#path`) — “What do you need help with?” with three paths, outcome bullets, jump to matching service (scroll + pulse ring), and “Get an estimate” wired to intent.
- **Conversion:** `ConversionProvider` context, `<dialog>` quick estimate (`QuickEstimateSheet`) posting to existing `/api/contact`, sticky mobile bar (`StickyMobileCta`), header “Estimate” + mobile menu quick estimate, contact column `ContactEstimateButton`.
- **Mobile video:** `CaseStudyPreviewMedia` uses `(hover: hover) and (pointer: fine)` vs coarse/touch; touch gets **in-view autoplay** (IntersectionObserver thresholds + `rootMargin`), desktop keeps hover/focus-in-card behavior.
- **Copy:** Services rewritten for problems → outcomes → “what we typically ship”; section title updated.
- **Rhythm:** Tighter default `SectionShell` padding on small screens; Featured Work / Process / Services spacing tuned for less scroll fatigue.

**Why**

- Address flat/generic feel, hover-only affordances, vague services, and deep-only conversion without new backends or heavy deps.

**Tools used**

- Existing: Next.js 16, React 19, Tailwind 4, `motion` (selector panel only).
- Native: `<dialog>`, `sessionStorage`, `IntersectionObserver`, `matchMedia`.

**Reusable ideas for client sites**

- Intent object in one module (`lib/intent.ts`) driving UI + form prefill + analytics later.
- Dual interaction mode for media: `matchMedia` gate + separate observers for hover vs in-view autoplay.
- Quick estimate as thin wrapper over the same contact API (structured message prefix).

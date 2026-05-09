# VryntLab — Master Reference Document
Last updated: 2026-05-09

## Company
- Name: VryntLab
- Site: vryntlab.com
- Email: hello@vryntlab.com
- Phone: +1 (872) 985-6682
- Location: Chicago, IL
- Tagline: Built lean. Priced fair. Delivered right.
- Repo: github.com/syedhamzahabib2026-source/vryntlab-web
- Project folder: C:\Users\shamz\Desktop\vryntlab-web\trellisify-project
- Deployment: Vercel (auto-deploys on git push to main)

## Stack
- Framework: Next.js 16, App Router, src/ layout
- Styling: Tailwind CSS 4
- Animations: motion/react (framer-motion)
- Database: Supabase (leads only)
- Email: Resend
- AI chat: OpenRouter
- Host: Vercel

## Design Tokens
- Background: #080810
- Surface: #0F0F1A
- Border: #1E1E35
- Primary accent: #7C3FFF (violet)
- Secondary accent: #00E5FF (cyan)
- Body text: #C8C8D8
- Headings: #F0F0FF
- CTA gradient: from-[#7C3FFF] to-[#00E5FF]

## File Map — SEO & Content

### Core SEO files
| File | Purpose |
|------|---------|
| src/app/sitemap.ts | All public URLs — add every new page here |
| src/app/robots.ts | Crawl rules — /api/, /github, /x disallowed |
| src/app/layout.tsx | metadataBase, global OG image, favicon, fonts |
| src/components/seo/SchemaOrg.tsx | Global JSON-LD: Organization, ProfessionalService, WebSite |
| src/components/seo/JsonLd.tsx | Reusable JSON-LD component for per-page schemas |
| public/brand/og-image.png | OG social card (1200x630) — replace to update |
| src/app/icon.png | Favicon 512px (regenerate with npm run generate-favicons) |
| src/app/apple-icon.png | Apple touch icon 180px |
| src/app/favicon.ico | Browser favicon 32+16px |

### Copy & brand
| File | Purpose |
|------|---------|
| src/lib/brand-knowledge.ts | ALL marketing copy — hero, about, services, contact |
| src/lib/config/knowledge.ts | AI chatbot knowledge base (BRAND_KNOWLEDGE string) |
| src/lib/site.ts | Site name, logo, email, nav links, tagline |
| src/components/home/About.tsx | About section layout |
| src/components/home/Hero.tsx | Hero section with cycling animation |
| src/components/home/ServicesHomeTeaser.tsx | Services list (SERVICES array — desc fields) |

### Per-page metadata pattern
Every page needs:
- `export const metadata: Metadata` with title, description
- `alternates.canonical`
- `openGraph` (title, description, url, type)
- `twitter` (card, title, description)
- `<JsonLd schema={...} />` for BreadcrumbList at minimum

## Pages Inventory

### Homepage
- URL: vryntlab.com
- File: src/app/page.tsx
- Sections: Hero, MarqueeBar, FeaturedWork, ServicesHomeTeaser, Stats, ChatbotShowcase, Process, About, ContactCta

### Service pages
| URL | File |
|-----|------|
| /services | src/app/services/page.tsx |
| /services/web-design | src/app/services/web-design/page.tsx |
| /services/shopify | src/app/services/shopify/page.tsx |
| /services/ai-chatbot | src/app/services/ai-chatbot/page.tsx |
| /services/seo | src/app/services/seo/page.tsx |
| /services/automation | src/app/services/automation/page.tsx |
| /services/booking-systems | src/app/services/booking-systems/page.tsx |

### Work / case studies
| URL | File |
|-----|------|
| /work | src/app/work/page.tsx |
| /work/living-silica | src/app/work/[slug]/page.tsx (slug: living-silica) |
| /work/dkexpress | src/app/work/[slug]/page.tsx (slug: dkexpress) |

Case study data: src/lib/case-studies.ts  
Project images: public/projects/[slug]/[slug]_1.webp and _2.webp

### Blog posts
| URL | File |
|-----|------|
| /blog/how-much-does-a-website-cost | src/app/blog/how-much-does-a-website-cost/page.tsx |
| /blog/signs-your-website-needs-a-redesign | src/app/blog/signs-your-website-needs-a-redesign/page.tsx |
| /blog/what-is-geo-generative-engine-optimization | src/app/blog/what-is-geo-generative-engine-optimization/page.tsx |

## Sitemap — Current URLs
(14 total as of 2026-05-09)

| URL | Priority |
|-----|----------|
| vryntlab.com | 1.0 |
| vryntlab.com/services | 0.8 |
| vryntlab.com/services/web-design | 0.9 |
| vryntlab.com/services/shopify | 0.8 |
| vryntlab.com/services/ai-chatbot | 0.8 |
| vryntlab.com/services/seo | 0.8 |
| vryntlab.com/services/automation | 0.8 |
| vryntlab.com/services/booking-systems | 0.8 |
| vryntlab.com/work | 0.7 |
| vryntlab.com/work/living-silica | 0.6 |
| vryntlab.com/work/dkexpress | 0.6 |
| vryntlab.com/blog/how-much-does-a-website-cost | 0.7 |
| vryntlab.com/blog/signs-your-website-needs-a-redesign | 0.7 |
| vryntlab.com/blog/what-is-geo-generative-engine-optimization | 0.7 |

## How to Add a New Page

1. Create `src/app/[path]/page.tsx` with:
   - `export const metadata` with title, description, canonical, openGraph, twitter
   - `<JsonLd>` with BreadcrumbList schema
   - If interactive (FAQ accordion), extract to separate `[path]/FaqAccordion.tsx` with `"use client"`

2. Add to `src/app/sitemap.ts`

3. Build and push:
   ```
   npm run build
   git add -A && git commit -m "content: add [page name]"
   git push
   ```

4. Request indexing in Google Search Console

## How to Update Copy

| What to change | Where |
|----------------|-------|
| Hero headline/subtext | src/lib/brand-knowledge.ts → brandHero |
| Cycling words in hero | src/components/home/Hero.tsx → CYCLING_WORDS array |
| About section text | src/lib/brand-knowledge.ts → brandAbout.paragraphs |
| Services list descriptions | src/components/home/ServicesHomeTeaser.tsx → SERVICES array |
| Stats (2wk / 100% etc) | src/components/home/Stats.tsx → STATS array |
| Nav links | src/lib/site.ts → navLinks |
| Contact email | src/lib/site.ts → siteEmail |
| AI chatbot responses | src/lib/config/knowledge.ts → BRAND_KNOWLEDGE |
| OG image | Replace public/brand/og-image.png (keep 1200x630) |
| Favicon | Edit scripts/generate-favicons.mjs → run npm run generate-favicons |

## GEO Off-site Checklist
- [x] Google Business Profile — live
- [x] Sitemap submitted to GSC
- [ ] Bing Webmaster Tools — submit sitemap at bing.com/webmasters
- [ ] Clutch.co — create profile, add URL to SchemaOrg.tsx sameAs
- [ ] LinkedIn company page — needs 10+ connections first, then add to SchemaOrg.tsx sameAs array
- [ ] DesignRush — under review

## Schema Locations
- **Global schemas** (Organization, ProfessionalService, WebSite):  
  `src/components/seo/SchemaOrg.tsx`  
  → `sameAs` array: add Clutch/LinkedIn URLs here when ready

- **Per-page schemas**: injected via `<JsonLd schema={...} />` in each page.tsx file

## Git Workflow
```
cd C:\Users\shamz\Desktop\vryntlab-web\trellisify-project
npm run build          # always build before commit
git add -A
git commit -m "type: description"
git push               # Vercel auto-deploys on push
```

## Favicon Regeneration
```
npm run generate-favicons
```
Edit `scripts/generate-favicons.mjs` to change the mark.  
Outputs to: `src/app/icon.png`, `apple-icon.png`, `favicon.ico`

## Environment Variables (Vercel)
| Variable | Purpose |
|----------|---------|
| OPENROUTER_API_KEY | AI chat |
| RESEND_API_KEY | Contact form emails |
| CONTACT_TO_EMAIL | Where form submissions go |
| CONTACT_FROM_EMAIL | From address for emails |
| SUPABASE_URL | Lead storage (optional) |
| SUPABASE_SERVICE_ROLE_KEY | Lead storage (optional) |
| SLACK_LEAD_WEBHOOK_URL | Lead notifications (optional) |

## Content Roadmap — Remaining

### Blog posts
- "How to get your business on Google Maps"
- "Best website builder for small business 2026"

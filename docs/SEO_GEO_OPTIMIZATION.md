# SEO & GEO Optimization

This document covers every SEO and GEO change made to the VryntLab marketing site (`trellisify-project/`). It is written for developers who weren't part of the original work and need to understand, maintain, or extend it.

---

## 1. Overview

**SEO (Search Engine Optimization)** is the practice of making pages discoverable, correctly understood, and well-ranked by search engines like Google. It covers both technical signals (sitemaps, structured data, canonical URLs) and content signals (titles, descriptions, headings).

**GEO (Generative Engine Optimization)** is the emerging practice of making content discoverable and correctly cited by AI-powered answer engines — ChatGPT, Perplexity, Claude, Gemini, and Google's AI Overviews. GEO overlaps heavily with SEO but emphasizes:
- Clear, factual entity definitions (schema markup)
- Unambiguous brand identity across the web
- Authoritative citations and structured data that LLMs can extract reliably

**Why we did this:** VryntLab had no technical SEO foundation at all when work began — no sitemap, no robots.txt, no structured data, no canonical URLs. Search engines couldn't reliably index the site, and AI engines had no structured signal for what VryntLab is, what it does, or where it operates.

---

## 2. Technical SEO

### Sitemap — `src/app/sitemap.ts`

Next.js App Router generates `/sitemap.xml` automatically from this file at build time.

**Current routes:**

| URL | Priority | Change Frequency | Last Modified |
|-----|----------|-----------------|---------------|
| `https://vryntlab.com` | 1.0 | weekly | 2026-05-08 |
| `https://vryntlab.com/services` | 0.8 | monthly | 2026-05-08 |
| `https://vryntlab.com/work` | 0.7 | monthly | 2026-05-08 |
| `https://vryntlab.com/work/living-silica` | 0.6 | yearly | 2026-04-21 |
| `https://vryntlab.com/work/dkexpress` | 0.6 | yearly | 2026-04-21 |

**Important:** The case study slug is `dkexpress` (matching `id` in `src/lib/case-studies.ts`), not `dk-express-logistics`. Keep slugs in sync with case study IDs.

**When to update `lastModified`:** Update the date for a page whenever its content changes meaningfully. Use `YYYY-MM-DD` string format passed to `new Date()`.

**When to add a new entry:** Every new public-facing page must be added here. Pages behind auth or utility pages (`/github`, `/x`) must not be added — they are disallowed in `robots.ts`.

---

### Robots — `src/app/robots.ts`

Generates `/robots.txt` at build time.

```
User-agent: *
Allow: /
Disallow: /api/
Disallow: /github
Disallow: /x
Sitemap: https://vryntlab.com/sitemap.xml
```

`/api/*` is disallowed because API routes are not pages — crawling them wastes crawl budget and exposes endpoint structure. `/github` and `/x` are utility/placeholder pages that should not appear in search results (they also have `robots: { index: false }` in their own metadata as a belt-and-suspenders measure).

**When to add a new disallow:** Any page that should not be indexed (admin pages, internal tools, staging routes) should be disallowed here AND have `robots: { index: false, follow: false }` in its own `metadata` export.

---

### `metadataBase` — `src/app/layout.tsx`

```typescript
metadataBase: new URL("https://vryntlab.com"),
```

This is set in the root layout metadata. It allows Next.js to resolve relative asset paths (e.g. `/brand/og-image.png`) into fully-qualified URLs when building `og:image` and `twitter:image` tags. Without it, social preview images are malformed. **Do not remove this.**

---

### Noindex pages

Two pages are intentionally excluded from search indexes:

| Page | Why |
|------|-----|
| `/github` (`src/app/github/page.tsx`) | Client-only tool, not a public landing page |
| `/x` (`src/app/x/page.tsx`) | Placeholder, no indexable content |

Both pages have:
```typescript
robots: { index: false, follow: false },
```
in their `metadata` export, which renders `<meta name="robots" content="noindex, nofollow">` in the HTML head. This works independently of `robots.txt`.

---

## 3. Metadata

All metadata is set via Next.js `Metadata` exports. The root layout (`src/app/layout.tsx`) provides sitewide defaults. Individual pages override them.

### Root layout defaults — `src/app/layout.tsx`

| Field | Value | Source |
|-------|-------|--------|
| `metadataBase` | `https://vryntlab.com` | Hardcoded |
| `title` | `"VryntLab — Web Design, AI Chatbots & Automations for Small Business"` | `brandSiteTitle` in `src/lib/brand-knowledge.ts` |
| `description` | `"VryntLab builds websites, AI chatbots, booking systems and automations for small businesses. Fast delivery, clear pricing, no agency bloat. Get a free estimate."` | `brandMetaDescription` in `src/lib/brand-knowledge.ts` |
| `openGraph.siteName` | `"VryntLab"` | `siteBrandName` in `src/lib/site.ts` |
| `openGraph.images` | `/brand/og-image.png` (1200×630) | Static asset |
| `twitter.card` | `summary_large_image` | Hardcoded |
| `twitter.images` | `/brand/og-image.png` | Static asset |
| `icons` | favicon.ico, icon.png, apple-icon.png | Generated via `npm run generate-favicons` |

**To update the global title or description:** Edit `brandSiteTitle` and `brandMetaDescription` in `src/lib/brand-knowledge.ts`. Both values propagate to the root layout automatically. Remember to also update the homepage `page.tsx` metadata export, which has its own hardcoded values.

---

### Per-page metadata

#### Homepage — `src/app/page.tsx`

| Field | Value |
|-------|-------|
| `title` | `"Web Design Agency for Small Business | VryntLab"` |
| `description` | `"VryntLab builds fast websites, AI chatbots, and automations for small and mid-sized businesses. Clear scope, fair pricing, work that ships. Free estimate."` |
| `alternates.canonical` | `https://vryntlab.com` |
| `openGraph.url` | `https://vryntlab.com` |
| `twitter.card` | `summary_large_image` |

The homepage has its own `metadata` export even though the root layout provides defaults. This gives it a page-specific title (keyword-optimised for "web design agency for small business") and an explicit canonical URL.

---

#### Services — `src/app/services/page.tsx`

| Field | Value |
|-------|-------|
| `title` | `"Web Design, SEO, Chatbots & Automation Services | VryntLab"` |
| `description` | `"Website design, AI chatbots, booking systems, SEO, speed optimization and business automation — all from one lean digital studio. See what we do."` |
| `alternates.canonical` | `https://vryntlab.com/services` |
| `openGraph.url` | `https://vryntlab.com/services` |
| `twitter.card` | `summary_large_image` |

---

#### Work index — `src/app/work/page.tsx`

| Field | Value |
|-------|-------|
| `title` | `"Our Work — Web & App Projects | VryntLab"` |
| `description` | `"See how VryntLab has built Shopify stores, logistics websites, and custom digital solutions for real businesses. Selected projects from our portfolio."` |
| `alternates.canonical` | `https://vryntlab.com/work` |
| `openGraph.url` | `https://vryntlab.com/work` |
| `twitter.card` | `summary_large_image` |

---

#### Case study detail — `src/app/work/[slug]/page.tsx`

Generated dynamically via `generateMetadata`. For each case study:

| Field | Value |
|-------|-------|
| `title` | `"${study.client} — ${study.shortTitle} | VryntLab"` |
| `description` | First 155 characters of `study.problem` |
| `alternates.canonical` | `https://vryntlab.com/work/${slug}` |
| `openGraph.title` | `"${study.client} — ${study.shortTitle}"` |
| `openGraph.description` | First 155 characters of `study.problem` |
| `openGraph.url` | `https://vryntlab.com/work/${slug}` |
| `openGraph.type` | `article` |
| `twitter.card` | `summary_large_image` |
| `twitter.title` | Full title with `| VryntLab` suffix |
| `twitter.description` | First 155 characters of `study.problem` |

**To control a case study's SEO description:** Edit the `problem` field on the relevant entry in `src/lib/case-studies.ts`. The first 155 characters are used as the meta description and OG description automatically.

---

## 4. Schema Markup

All global schemas live in `src/components/seo/SchemaOrg.tsx`. This component is mounted once in `src/app/layout.tsx` inside the `<body>` tag, so it renders on every page.

Per-page schemas (BreadcrumbList, ItemList) use the `JsonLd` utility (`src/components/seo/JsonLd.tsx`) injected directly into each page's component tree.

---

### `SchemaOrg.tsx` — Global schemas

Three schemas are output as a single `<script type="application/ld+json">` array.

#### Organization

```json
{
  "@type": "Organization",
  "name": "VryntLab",
  "url": "https://vryntlab.com",
  "email": "hello@vryntlab.com",
  "telephone": "+18729856682",
  "description": "...",
  "slogan": "Built lean. Priced fair. Delivered right.",
  "logo": {
    "@type": "ImageObject",
    "url": "https://vryntlab.com/brand/vl-logo.webp"
  }
}
```

**Purpose:** Defines VryntLab as a business entity. The `logo` field is what Google uses to populate the Knowledge Panel brand logo. Important for both SEO and GEO — AI engines use Organization schema to build their understanding of what a brand is.

---

#### ProfessionalService

```json
{
  "@type": "ProfessionalService",
  "name": "VryntLab",
  "priceRange": "$$",
  "areaServed": "Worldwide",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Chicago",
    "addressRegion": "IL",
    "addressCountry": "US"
  },
  "serviceType": ["Web Design", "Website Redesign", "UI/UX Design", ...]
}
```

**Purpose:** Tells Google (and AI engines) what kind of business VryntLab is and what services it offers. The `address` field enables local business features in Google even for remote-first companies. `serviceType` is critical for GEO — AI answer engines use this to determine whether to cite VryntLab when answering service-related queries.

---

#### WebSite

```json
{
  "@type": "WebSite",
  "name": "VryntLab",
  "url": "https://vryntlab.com",
  "potentialAction": {
    "@type": "SearchAction",
    "target": {
      "@type": "EntryPoint",
      "urlTemplate": "https://vryntlab.com/?q={search_term_string}"
    },
    "query-input": "required name=search_term_string"
  }
}
```

**Purpose:** Identifies the site to Google. The `potentialAction` SearchAction enables the Sitelinks Searchbox feature — an inline search box that can appear directly in Google results for branded queries. Won't activate immediately but is the prerequisite.

---

### `JsonLd.tsx` — Reusable utility

```typescript
// src/components/seo/JsonLd.tsx
export function JsonLd({ schema }: { schema: object | object[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
```

Use this whenever you need to add page-specific structured data. It accepts either a single schema object or an array of schema objects.

---

## 5. OG Image

**File location:** `public/brand/og-image.png`

**Dimensions:** 1200 × 630 px (standard for all social platforms)

**Referenced in:**
- `src/app/layout.tsx` — root layout, covers all pages as a default
- Individual pages that override the image can pass their own `openGraph.images` array

**How to update it:**
1. Create a new PNG at exactly 1200 × 630 px
2. Replace `public/brand/og-image.png`
3. No code changes needed — all metadata references the same path

**How to preview it before pushing:** Use [opengraph.xyz](https://www.opengraph.xyz) or [metatags.io](https://metatags.io) — paste the page URL after deploying to Vercel preview.

**Per-page OG images:** If a case study or landing page needs its own OG image, add it to the page's `metadata` export:
```typescript
openGraph: {
  images: [{ url: "/brand/og-case-study-name.png", width: 1200, height: 630 }],
}
```
This overrides the root layout image for that page only.

---

## 6. BreadcrumbList Schema

BreadcrumbList tells Google the hierarchical path to a page. It can trigger breadcrumb display directly in search result snippets instead of the bare URL.

| Page | Breadcrumb path | Where in code |
|------|----------------|---------------|
| `/services` | Home → Services | Inline in `src/app/services/page.tsx` |
| `/work` | Home → Work | Inline in `src/app/work/page.tsx` |
| `/work/[slug]` | Home → Work → {study.client} | Inline in `src/app/work/[slug]/page.tsx` |

All three use the `JsonLd` component. The `/work/[slug]` breadcrumb is built dynamically using `study.client` and `slug` from the resolved params.

**Example (services page):**
```typescript
const servicesBreadcrumb = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://vryntlab.com" },
    { "@type": "ListItem", position: 2, name: "Services", item: "https://vryntlab.com/services" },
  ],
};

// Inside component return:
<JsonLd schema={servicesBreadcrumb} />
```

---

## 7. How to Add a New Page and Maintain SEO Standards

Follow this checklist for every new public-facing page:

### Required

- [ ] **`metadata` export** with `title`, `description`, `alternates.canonical`, `openGraph` (title, description, url, type), and `twitter` (card, title, description)
- [ ] **Add to `sitemap.ts`** with an appropriate `priority` and `lastModified` date
- [ ] **Single `<h1>`** that matches or closely reflects the page title

### Recommended

- [ ] **`BreadcrumbList` schema** using `JsonLd` if the page is more than one level deep (e.g. `/blog/post-name`)
- [ ] **Page-specific OG image** if the page warrants its own social preview

### Template

```typescript
import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "Page Title | VryntLab",
  description: "One or two sentences describing the page. Under 160 characters.",
  alternates: {
    canonical: "https://vryntlab.com/your-page",
  },
  openGraph: {
    title: "Page Title | VryntLab",
    description: "One or two sentences describing the page.",
    url: "https://vryntlab.com/your-page",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Page Title | VryntLab",
    description: "One or two sentences describing the page.",
  },
};

const breadcrumb = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://vryntlab.com" },
    { "@type": "ListItem", position: 2, name: "Page Name", item: "https://vryntlab.com/your-page" },
  ],
};

export default function YourPage() {
  return (
    <div>
      <JsonLd schema={breadcrumb} />
      <h1>Page Title</h1>
      {/* page content */}
    </div>
  );
}
```

### Adding a new case study

1. Add the study object to `src/lib/case-studies.ts` — set a URL-safe `id` (e.g. `"acme-corp"`)
2. Add project images to `public/projects/acme-corp/acme-corp_1.webp` and `_2.webp`
3. Add the route to `src/app/sitemap.ts`:
   ```typescript
   { url: `${BASE_URL}/work/acme-corp`, lastModified: new Date("YYYY-MM-DD"), changeFrequency: "yearly", priority: 0.6 }
   ```
4. The `generateMetadata` function in `work/[slug]/page.tsx` handles title, description, canonical, OG, and Twitter automatically — no changes needed there
5. The BreadcrumbList in `work/[slug]/page.tsx` also generates automatically from the slug and `study.client`

---

## 8. Ongoing Manual Tasks

These are items that cannot be implemented in code and require manual action:

### Google Search Console (GSC)
- **Verify ownership** of `vryntlab.com` at [search.google.com/search-console](https://search.google.com/search-console)
- **Submit the sitemap:** After verifying, go to Sitemaps and submit `https://vryntlab.com/sitemap.xml`
- **Monitor for crawl errors** periodically — GSC will flag 404s, server errors, and indexing issues
- **Request indexing** for new pages after publishing

### Google Business Profile (GBP)
- Create or claim the listing at [business.google.com](https://business.google.com)
- Use consistent NAP (Name, Address, Phone): VryntLab / Chicago, IL, US / +18729856682
- Add the website URL, services list, and photos
- GBP directly reinforces the `ProfessionalService` schema and improves local pack visibility

### Clutch / G2 / Trustpilot listing
- Create a profile on [Clutch.co](https://clutch.co) — this is the primary review platform for B2B digital agencies
- Clutch profiles are cited heavily by AI engines when users ask for agency recommendations
- Add the Clutch profile URL to the `Organization` schema's `sameAs` array once the profile is live:
  ```typescript
  sameAs: ["https://clutch.co/profile/vryntlab"]
  ```

### Bing Webmaster Tools
- Submit the sitemap to [bing.com/webmasters](https://www.bing.com/webmasters) — Bing powers some AI engine backends (Copilot, some Perplexity results)

### Social profiles
- Once the X (Twitter) profile is live, update `/x/page.tsx` to redirect to it and remove the `robots: noindex` directive
- Consider adding `sameAs` to the `Organization` schema with the live social URLs

### Content freshness
- Update `lastModified` dates in `sitemap.ts` whenever a page's content changes significantly
- Google uses these dates for crawl prioritisation

---

## 9. Tools and Verification

### Validate schema markup
- **Google Rich Results Test:** [search.google.com/test/rich-results](https://search.google.com/test/rich-results) — paste any page URL to see which schemas Google detects and whether they are valid
- **Schema.org Validator:** [validator.schema.org](https://validator.schema.org) — validates against the full Schema.org spec, more thorough than Google's tool

### Verify metadata and OG tags
- **metatags.io:** Paste a URL to preview how a page looks when shared on Twitter, LinkedIn, Facebook, and Slack
- **opengraph.xyz:** Alternative OG preview tool
- **View source / DevTools:** The raw `<head>` is the ground truth — `Ctrl+U` then search for `og:` or `application/ld+json`

### Check sitemap and robots
- **Sitemap:** Visit `https://vryntlab.com/sitemap.xml` directly in a browser — it should render valid XML with all five URLs
- **Robots:** Visit `https://vryntlab.com/robots.txt` — verify the disallow rules and sitemap pointer

### Check indexing
- **Google Search:** `site:vryntlab.com` — shows all pages Google has indexed; if a page is missing it may be blocked, noindexed, or not yet crawled
- **Google Search Console → Coverage** — shows indexed, excluded, and errored pages with reasons

### Local development check
```bash
# Build and verify all generated files locally
npm run build
# sitemap and robots are generated to .next/server/app/
# Open http://localhost:3000/sitemap.xml and /robots.txt after `npm run start`
```

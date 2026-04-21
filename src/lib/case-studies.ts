/**
 * Still paths for `public/projects/<slug>/<slug>_1.webp` and `_2.webp`.
 * `_1` = card hero / primary; `_2` = tall scroll preview + gallery.
 */
export function projectStillPair(slug: string): readonly [string, string] {
  return [
    `/projects/${slug}/${slug}_1.webp`,
    `/projects/${slug}/${slug}_2.webp`,
  ] as const;
}

export type CaseStudyMedia = {
  /**
   * Overrides `_1` for hero / card primary only.
   * Gallery still uses `images[1]` (`_2`).
   */
  posterSrc?: string;
  /** `[ primary _1, secondary _2 ]` — see `projectStillPair` */
  images: readonly string[];
};

/** Resolved poster URL for cards / project detail hero still. */
export function caseStudyPosterUrl(media: CaseStudyMedia): string {
  return media.posterSrc ?? media.images[0]!;
}

export type CaseStudy = {
  id: string;
  client: string;
  /** Card + modal headline */
  shortTitle: string;
  /** e.g. industry + deliverable */
  typeLabel: string;
  problem: string;
  solution: string;
  result: string;
  caption: string;
  /** Primary preview description */
  coverAlt: string;
  /** [ alt for _1, alt for _2 ] */
  imageAlts: readonly string[];
  liveUrl: string;
  liveLabel: string;
  media: CaseStudyMedia;
  tech?: readonly string[];
  role?: string;
  /** Portfolio card — short stat line (stack, phase, etc.) */
  cardStat: string;
  /** Portfolio card — one-line outcome */
  cardOutcome: string;
};

/** URL segment for `/work/[slug]` — matches each study’s `id`. */
export function getCaseStudyBySlug(slug: string): CaseStudy | undefined {
  return caseStudies.find((s) => s.id === slug);
}

export function getAllCaseStudySlugs(): readonly string[] {
  return caseStudies.map((s) => s.id);
}

export const caseStudies: readonly CaseStudy[] = [
  {
    id: "living-silica",
    client: "Living Silica",
    shortTitle:
      "A Shopify store built to convert supplement shoppers",
    typeLabel: "DTC e-commerce · Shopify",
    problem:
      "Dense supplement science was getting in the way of trust and checkout — shoppers needed clarity without losing the brand voice.",
    solution:
      "Restructured product detail pages, collections, and education flows so benefits scan fast and the path to cart stays on-brand.",
    result:
      "Product pages restructured so key benefits are visible without scrolling. Checkout path simplified. Science-heavy copy rewritten to build trust without losing credibility.",
    caption: "Shopify storefront — live at livingsilica.com",
    coverAlt: "Living Silica Shopify storefront",
    imageAlts: ["Living Silica homepage", "Living Silica product page"],
    liveUrl: "https://livingsilica.com",
    liveLabel: "livingsilica.com",
    tech: ["Shopify", "Liquid", "UI/UX"],
    cardStat: "Shopify · DTC e-commerce",
    cardOutcome:
      "Product clarity improved — benefits above the fold, checkout path simplified",
    media: {
      images: projectStillPair("living-silica"),
    },
  },
  {
    id: "dkexpress",
    client: "DK Express Logistics",
    shortTitle:
      "A logistics company that finally looks as reliable as it operates",
    typeLabel: "B2B logistics · UK",
    problem:
      "A professional UK courier and freight company with no web presence to match their service quality — losing leads to competitors who just looked more established.",
    solution:
      "Full website build: clear service breakdown, quote request form, trust signals, and a layout that communicates reliability from the first second.",
    result:
      "Professional web presence live for a UK-wide logistics operation. Quote form integrated. Services clearly communicated for road logistics, courier, and freight. Built and launched fast.",
    caption: "Full website build — live at dkexpresslogistics.co.uk",
    coverAlt: "DK Express Logistics website",
    imageAlts: [
      "DK Express Logistics homepage",
      "DK Express Logistics services section",
    ],
    liveUrl: "https://dkexpresslogistics.co.uk",
    liveLabel: "dkexpresslogistics.co.uk",
    tech: ["HTML", "CSS", "JavaScript"],
    cardStat: "Full build · Launched fast",
    cardOutcome:
      "Zero web presence to fully live — quote form, services, trust signals",
    media: {
      images: projectStillPair("dkexpress"),
    },
  },
];

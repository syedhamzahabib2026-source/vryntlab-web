/**
 * Still paths for `public/projects/<slug>/<slug>_1.png` and `_2.png`.
 * `_1` = card / poster / primary; `_2` = modal gallery (supporting).
 * Optional `posterSrc` overrides poster only; omit to use `_1`.
 */
export function projectStillPair(slug: string): readonly [string, string] {
  return [
    `/projects/${slug}/${slug}_1.png`,
    `/projects/${slug}/${slug}_2.png`,
  ] as const;
}

export type CaseStudyMedia = {
  /** Served from /public — e.g. /projects/slug/preview.mov */
  previewVideoSrc?: string;
  /**
   * Overrides `_1` for card + modal video poster only.
   * Gallery still uses `images[1]` (`_2`).
   */
  posterSrc?: string;
  /** `[ primary _1, secondary _2 ]` — see `projectStillPair` */
  images: readonly string[];
};

/** Resolved poster URL for cards / modal video `poster`. */
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
  /** Primary preview (poster / still) description */
  coverAlt: string;
  /** [ alt for _1, alt for _2 ] */
  imageAlts: readonly string[];
  liveUrl: string;
  liveLabel: string;
  media: CaseStudyMedia;
  tech?: readonly string[];
  role?: string;
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
    shortTitle: "A Shopify store people can actually use",
    typeLabel: "DTC e-commerce · live",
    problem:
      "Dense supplement science was getting in the way of trust and checkout—shoppers needed clarity without losing the brand voice.",
    solution:
      "Product detail, collections, and education flows on Shopify—structured so benefits scan fast and the path to cart stays on-brand.",
    result:
      "We partnered with their developers on UI, UX, and front-end so the science reads clearly and the path to cart never fights the brand.",
    caption:
      "Screen recording and captures from the live Living Silica storefront.",
    coverAlt: "Living Silica e-commerce interface — primary still",
    imageAlts: [
      "Living Silica — primary capture",
      "Living Silica — supporting capture",
    ],
    liveUrl: "https://livingsilica.com/",
    liveLabel: "livingsilica.com",
    tech: ["Shopify"],
    media: {
      previewVideoSrc: "/projects/living-silica/preview.mov",
      images: projectStillPair("living-silica"),
    },
  },
  {
    id: "globalservices",
    client: "Global Ship Services",
    shortTitle: "Marine services positioning that actually feels global",
    typeLabel: "B2B marine supplies · live",
    problem:
      "A multi-port ship chandler needed a credible first impression—buyers had to see coverage, services, and certifications without wading through noise.",
    solution:
      "Homepage narrative, services grid, locations, and trust blocks on globalshipservices.us so scope and reach are obvious in one pass.",
    result:
      "We worked with their team on layout and front-end so provisions, bonded stores, deck and engine, and repairs read as one coordinated offer.",
    caption:
      "Screen recording and captures from the live Global Ship Services site.",
    coverAlt: "Global Ship Services website — primary still",
    imageAlts: [
      "Global Ship Services — primary capture",
      "Global Ship Services — supporting capture",
    ],
    liveUrl: "https://globalshipservices.us/",
    liveLabel: "globalshipservices.us",
    media: {
      previewVideoSrc: "/projects/globalservices/preview.mov",
      images: projectStillPair("globalservices"),
    },
  },
  {
    id: "crypto",
    client: "Zebra Crypto (TheZ)",
    shortTitle: "A launch hub built for a phased NFT drop",
    typeLabel: "Web3 launch · live app",
    problem:
      "Holders needed to understand mint timing, tiers, and wallet steps in real time as the drop evolved—confusion would have killed momentum.",
    solution:
      "Mint story, sale phases, roadmap, and wallet connect on zebra-crypto.web.app—kept legible while messaging and timing shifted.",
    result:
      "We joined their developers to keep timing, tiers, and FAQs clear while the drop moved—holders could always see what came next.",
    caption:
      "Screen recording and captures from the live TheZ launch experience.",
    coverAlt: "TheZ NFT launch site — primary still",
    imageAlts: [
      "TheZ launch site — primary capture",
      "TheZ launch site — supporting capture",
    ],
    liveUrl: "https://zebra-crypto.web.app/",
    liveLabel: "zebra-crypto.web.app",
    media: {
      previewVideoSrc: "/projects/crypto/preview.mov",
      images: projectStillPair("crypto"),
    },
  },
];

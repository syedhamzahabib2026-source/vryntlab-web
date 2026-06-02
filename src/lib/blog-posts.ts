import type { Metadata } from "next";
import type { MetadataRoute } from "next";

const SITE_URL = "https://vryntlab.com";

export type BlogPost = {
  slug: string;
  /** Visible H1 / schema headline (no site suffix) */
  headline: string;
  description: string;
  category: string;
  /** Short blurb on `/blog` index cards */
  listDescription: string;
  /** Human-readable date on index cards */
  listDateLabel: string;
  datePublished: string;
  dateModified: string;
  breadcrumbLabel: string;
};

export const blogPosts: readonly BlogPost[] = [
  {
    slug: "how-much-does-a-website-cost",
    headline: "How Much Does a Small Business Website Cost in 2026?",
    description:
      "Honest breakdown of small business website costs in 2026. DIY vs agency vs freelancer, what affects price, and what you actually need.",
    category: "Pricing",
    listDescription:
      "Honest breakdown of DIY vs freelancer vs studio — and what you actually need.",
    listDateLabel: "May 2026",
    datePublished: "2026-05-09",
    dateModified: "2026-05-09",
    breadcrumbLabel: "How Much Does a Website Cost",
  },
  {
    slug: "signs-your-website-needs-a-redesign",
    headline: "7 Signs Your Website Needs a Redesign",
    description:
      "How do you know when it's time to redesign your website? Here are 7 clear signs — and what to do about each one.",
    category: "Web Design",
    listDescription: "How to know when it's time — and what to do about each one.",
    listDateLabel: "May 2026",
    datePublished: "2026-05-09",
    dateModified: "2026-05-09",
    breadcrumbLabel: "Signs Your Website Needs a Redesign",
  },
  {
    slug: "what-is-geo-generative-engine-optimization",
    headline: "What Is GEO? Generative Engine Optimization Explained",
    description:
      "GEO (Generative Engine Optimization) is how you get your business cited by AI tools like ChatGPT and Perplexity. Here's what it is and what small businesses should do about it.",
    category: "SEO & GEO",
    listDescription:
      "How to get your business cited by ChatGPT, Perplexity, and Google AI.",
    listDateLabel: "May 2026",
    datePublished: "2026-05-09",
    dateModified: "2026-05-09",
    breadcrumbLabel: "What Is GEO",
  },
] as const;

export function blogPostPath(slug: string): string {
  return `/blog/${slug}`;
}

export function blogPostUrl(slug: string): string {
  return `${SITE_URL}${blogPostPath(slug)}`;
}

export function getBlogPost(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}

export function getAllBlogPostSlugs(): readonly string[] {
  return blogPosts.map((p) => p.slug);
}

/** Page `<title>` — headline + brand suffix */
export function blogPostPageTitle(post: BlogPost): string {
  return `${post.headline} | VryntLab`;
}

export function buildBlogPostMetadata(post: BlogPost): Metadata {
  const url = blogPostUrl(post.slug);
  const title = blogPostPageTitle(post);
  return {
    title,
    description: post.description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description: post.description,
      url,
      type: "article",
      publishedTime: post.datePublished,
      modifiedTime: post.dateModified,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: post.description,
    },
  };
}

const vryntLabOrganization = {
  "@type": "Organization" as const,
  name: "VryntLab",
  url: SITE_URL,
};

export function buildBlogPostingSchema(post: BlogPost) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.headline,
    description: post.description,
    url: blogPostUrl(post.slug),
    author: vryntLabOrganization,
    publisher: vryntLabOrganization,
    datePublished: post.datePublished,
    dateModified: post.dateModified,
  };
}

export function buildBlogPostBreadcrumbSchema(post: BlogPost) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE_URL}/blog` },
      {
        "@type": "ListItem",
        position: 3,
        name: post.breadcrumbLabel,
        item: blogPostUrl(post.slug),
      },
    ],
  };
}

/** Sitemap rows for `/blog` and each post */
export function blogSitemapEntries(): MetadataRoute.Sitemap {
  const postEntries: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: blogPostUrl(post.slug),
    lastModified: new Date(post.dateModified),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [
    {
      url: `${SITE_URL}/blog`,
      lastModified: new Date(
        blogPosts.reduce((latest, p) =>
          p.dateModified > latest ? p.dateModified : latest,
        blogPosts[0]!.dateModified),
      ),
      changeFrequency: "weekly",
      priority: 0.7,
    },
    ...postEntries,
  ];
}

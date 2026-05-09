import type { MetadataRoute } from "next";

const BASE_URL = "https://vryntlab.com";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: BASE_URL,
      lastModified: new Date("2026-05-08"),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/services`,
      lastModified: new Date("2026-05-08"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/services/web-design`,
      lastModified: new Date("2026-05-09"),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/services/shopify`,
      lastModified: new Date("2026-05-09"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/services/ai-chatbot`,
      lastModified: new Date("2026-05-09"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/work`,
      lastModified: new Date("2026-05-08"),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/blog/how-much-does-a-website-cost`,
      lastModified: new Date("2026-05-09"),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/work/living-silica`,
      lastModified: new Date("2026-04-21"),
      changeFrequency: "yearly",
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/work/dkexpress`,
      lastModified: new Date("2026-04-21"),
      changeFrequency: "yearly",
      priority: 0.6,
    },
  ];
}

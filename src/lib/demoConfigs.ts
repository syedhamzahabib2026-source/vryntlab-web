export type DemoConfig = {
  businessName: string;
  services: string[];
  hours: string;
  location: string;
  pricingNote: string;
  bookingLink: string;
  brandColor?: string;
  greeting?: string;
};

export const DEFAULT_DEMO: DemoConfig = {
  businessName: "Radiance Med Spa",
  services: ["Botox", "Dermal Fillers", "Laser Hair Removal", "Facials", "Microneedling"],
  hours: "Mon–Sat 9am–6pm",
  location: "Your City",
  pricingNote: "Pricing varies by treatment — I can book you a quick consult to confirm.",
  bookingLink: "https://vryntlab.com/#contact",
};

export const DEMO_CONFIGS: Record<string, DemoConfig> = {
  // Add personalized spa configs here:
  // "glow-aesthetics": {
  //   businessName: "Glow Aesthetics",
  //   services: ["Botox", "Lip Fillers", "Chemical Peels", "HydraFacials"],
  //   hours: "Tue–Sat 10am–7pm",
  //   location: "Chicago, IL",
  //   pricingNote: "Most treatments start around $200 — confirmed at consult",
  //   bookingLink: "https://calendly.com/glow-aesthetics",
  //   brandColor: "#C8A2C8",
  // },
  "libre-aesthetics": {
    businessName: "Libré Aesthetics",
    services: ["Botox", "Dermal Fillers", "Lip Filler", "Microneedling", "HydraFacial"],
    hours: "Tue–Wed 10am–7pm, Thu–Fri 9am–5pm, Sat 9am–2pm",
    location: "Wheaton, IL",
    pricingNote: "Pricing varies by treatment — I can book you a quick consult to confirm.",
    bookingLink: "https://vryntlab.com/#contact",
  },
  "mandala-aesthetics": {
    businessName: "Mandala Aesthetics & Wellness",
    services: ["Botox", "Dermal Fillers", "Facials", "Microneedling", "Skincare"],
    hours: "Tue–Wed 10am–7pm, Fri 10am–4pm, Sat 10am–2pm",
    location: "Geneva, IL",
    pricingNote: "Pricing varies by treatment — I can book you a quick consult to confirm.",
    bookingLink: "https://vryntlab.com/#contact",
  },
  "db-aesthetics": {
    businessName: "Danielle Brandonisio Aesthetics",
    services: ["Botox", "Dermal Fillers", "Lip Filler", "Facials", "Microneedling"],
    hours: "By appointment, Mon–Sat",
    location: "Geneva, IL",
    pricingNote: "Pricing varies by treatment — I can book you a quick consult to confirm.",
    bookingLink: "https://vryntlab.com/#contact",
  },
  "pur-bliss": {
    businessName: "Pur Bliss Med Spa",
    services: ["Botox", "Dermal Fillers", "Laser Hair Removal", "Facials", "Microneedling"],
    hours: "By appointment, Mon–Sat",
    location: "St. Charles, IL",
    pricingNote: "Pricing varies by treatment — I can book you a quick consult to confirm.",
    bookingLink: "https://vryntlab.com/#contact",
  },
  "huni-medspa": {
    businessName: "HUNi MedSpa",
    services: ["Botox", "Dermal Fillers", "Laser Hair Removal", "Facials", "Microneedling"],
    hours: "By appointment, Mon–Sat",
    location: "Naperville, IL",
    pricingNote: "Pricing varies by treatment — I can book you a quick consult to confirm.",
    bookingLink: "https://vryntlab.com/#contact",
  },
};

export function getDemoConfig(slug?: string): DemoConfig {
  if (!slug) return DEFAULT_DEMO;
  return DEMO_CONFIGS[slug] ?? DEFAULT_DEMO;
}

export function getDemoSource(slug: string | undefined, config: DemoConfig): string {
  if (slug && DEMO_CONFIGS[slug]) return `demo-${slug}`;
  return `demo-${config.businessName.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/-+$/, "")}`;
}

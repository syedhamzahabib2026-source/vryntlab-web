const schemas = [
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "VryntLab",
    url: "https://vryntlab.com",
    email: "hello@vryntlab.com",
    telephone: "+18729856682",
    description:
      "Lean digital studio building websites, AI chatbots, automations, SEO, and custom digital solutions for small and mid-sized businesses.",
    slogan: "Built lean. Priced fair. Delivered right.",
  },
  {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "VryntLab",
    url: "https://vryntlab.com",
    email: "hello@vryntlab.com",
    telephone: "+18729856682",
    priceRange: "$$",
    serviceType: [
      "Web Design",
      "Website Redesign",
      "UI/UX Design",
      "Booking Systems",
      "Lead Capture",
      "AI Chatbots",
      "SEO",
      "GEO",
      "Google Business Profile Optimization",
      "Speed Optimization",
      "Business Automations",
      "App Development",
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "VryntLab",
    url: "https://vryntlab.com",
  },
];

export function SchemaOrg() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas) }}
    />
  );
}

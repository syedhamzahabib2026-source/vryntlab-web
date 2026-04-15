/**
 * BRAND_KNOWLEDGE — source of truth for marketing copy.
 * Tone: direct, specific, honest; no hype or fake metrics.
 */

/** Page title (metadata) */
export const brandSiteTitle =
  "VryntLab — Websites, SEO & automation";

/** Meta / footer one-liner */
export const brandMetaDescription =
  "We help businesses get found, booked, and selling online: sites that load fast, SEO and Google Business Profile, bookings, chatbots, automations, and performance work. Plain language. Clear scopes when you ask.";

/** Footer blurb (footer only; meta uses `brandMetaDescription`) */
export const brandFooterTagline =
  "We help businesses get found, booked, and selling—through better sites, smarter automation, and faster performance.";

export const brandHero = {
  headline: "Clearer sites. Faster pages. Work that actually ships.",
  supportingServices:
    "Websites, SEO, bookings, and automation—built to actually convert.",
  proofLabel: "Selected work",
  ctaSub:
    "Tell us what’s broken or what you want to launch—we’ll reply with a clear next step.",
  pathLink: "Not sure where to start? Pick a focus",
} as const;

export const brandWorkSection = {
  eyebrow: "Selected work",
  title: "Work we’re willing to put our name on",
  description: "Problem, approach, outcome—with live links where it matters.",
} as const;

/** Shown under the work intro when a path is selected — ties case studies to intent */
export const brandWorkIntentNudge = {
  website:
    "You picked websites & storefronts—these examples lean on clearer pages, bookings, and selling online.",
  automation:
    "You picked automation—these examples lean on less busywork between your tools.",
  custom:
    "You picked custom work—these examples lean on tools and flows built for how you actually operate.",
  app:
    "You picked app work—these examples still skew web and product; tell us if you’re mobile-first.",
  backend:
    "You picked backend or infrastructure—examples below are still product-shaped; we’ll align in the estimate.",
  other:
    "You picked other—browse the work for craft and process; we’ll sort fit in the estimate.",
} as const;

export const brandMidPageCta = {
  "after-work": {
    kicker: "If this fits",
    title: "Tell us what to fix or launch",
    body: "Short form → clear written estimate. No deck, no back-and-forth.",
    primary: "Open quick estimate",
    secondary: "Go to contact form",
  },
  "after-services": {
    kicker: "Next step",
    title: "Estimate or full brief",
    body: "Same people read both. Quick estimate for structured intake; contact form when you’ve already written it out.",
    primary: "Open quick estimate",
    secondary: "Use the contact form",
  },
} as const;

/** Extra line on mid-page CTAs when `selectedIntent` is set */
export const brandMidPageIntentNudge = {
  "after-work": {
    website:
      "“Website & storefront” is selected—we’ll assume that lane unless you tell us otherwise.",
    automation:
      "“Automation & integrations” is selected—we’ll focus the estimate on wiring and handoffs.",
    custom:
      "“Custom product” is selected—we’ll assume a build conversation, not a template tweak.",
    app:
      "“App development” is selected—we’ll assume native or cross-platform unless you say otherwise.",
    backend:
      "“Backend / infrastructure” is selected—we’ll focus the estimate on APIs, data, and reliability.",
    other:
      "“Other” is selected—we’ll lead with your note and keep the bucket flexible.",
  },
  "after-services": {
    website:
      "Still on the website path—estimate opens with that context pre-filled.",
    automation:
      "Still on the automation path—estimate opens with that context pre-filled.",
    custom:
      "Still on the custom path—estimate opens with that context pre-filled.",
    app:
      "App lane is selected—estimate opens with that context pre-filled.",
    backend:
      "Backend lane is selected—estimate opens with that context pre-filled.",
    other:
      "Other is selected—estimate opens with your note in focus.",
  },
} as const;

export const brandPathSelector = {
  eyebrow: "Start here",
  title: "What should we improve first?",
  description: "Pick one focus. Everything below adapts to it.",
  panelKicker: "If this is you",
  laneHintSelected: "Selected — details below",
  laneHintDefault: "Tap to select",
} as const;

/** Text-only intent copy — ids and serviceSectionId stay in intent.ts */
export const brandIntentCopy = {
  website: {
    label: "Website & storefront",
    headline: "When your site or store isn’t bringing in the business it should",
    summary:
      "Clearer pages, faster load times, booking and forms people complete, plus SEO and Google Business Profile when that’s part of the job.",
    outcomes: [
      "Help visitors find booking, checkout, or your contact form without getting lost.",
      "Speed up slow pages so people don’t leave before they read your offer.",
      "Improve how you show up in search and maps—not a one-off tweak, but something you can keep up.",
    ],
  },
  automation: {
    label: "Automation & integrations",
    headline: "When the same information is typed into three different places",
    summary:
      "Connect booking, CRM, email, spreadsheets, and support so data moves once—plus chatbots where they actually save time.",
    outcomes: [
      "Stop leads and bookings from falling between systems.",
      "Use the right level of automation for how busy you are and how much risk you can take.",
      "Add chatbots for customers or staff when they cut repeat questions or capture leads—not for show.",
    ],
  },
  custom: {
    label: "Custom product & APIs",
    headline: "When spreadsheets or off-the-shelf tools stop matching how you work",
    summary:
      "Custom screens and workflows—built in steps you can review before everything is final.",
    outcomes: [
      "See working previews early, before you’re locked in.",
      "Get a clear handoff: where things live and how to maintain them.",
      "We’ll say no if a simpler tool or integration is the smarter move.",
    ],
  },
  app: {
    label: "App development",
    headline: "When you need a real app—not just a responsive site",
    summary:
      "iOS, Android, or cross-platform—scoped milestones so you can try builds before you’re locked in.",
    outcomes: [
      "Clarify what has to work offline vs online before we chase features.",
      "Ship testable builds early, then tighten access, data, and release.",
      "We’ll say no if a PWA or your existing stack is the smarter move.",
    ],
  },
  backend: {
    label: "Backend / infrastructure",
    headline: "When APIs, data, or hosting can’t keep up",
    summary:
      "Services, jobs, queues, and environments—documented so you know what runs where.",
    outcomes: [
      "Map what’s fragile today (latency, failures, manual deploys).",
      "Harden the path that matters before layering new features.",
      "Hand off runbooks and ownership so it’s not tribal knowledge.",
    ],
  },
  other: {
    label: "Other",
    headline: "When it doesn’t fit a neat box",
    summary:
      "Describe what you’re trying to do—we’ll reply with an honest read on fit and next steps.",
    outcomes: [
      "Plain language is enough—links and rough notes help.",
      "We may suggest a smaller scope or a different partner if that’s fairer.",
      "No forced category—use the note field freely.",
    ],
  },
} as const;

export const brandServicesSection = {
  eyebrow: "Services",
  title: "Where we usually step in",
  description: "Based on your focus—switch to see how it plays out.",
  panelHeading: "This lane",
  deliverablesLabel: "What often ships",
  footerNote:
    "We’ll pass if we’re not the right fit—better for everyone.",
} as const;

export const brandServiceLanes = [
  {
    intent: "website" as const,
    id: "service-websites" as const,
    shortLabel: "Web + store",
    title: "Websites & storefronts",
    description:
      "Marketing sites and Shopify stores: clearer layouts, faster pages, and a path that actually converts.",
    scope:
      "Redesigns and page cleanup, speed work, SEO and Google Business Profile alongside the site, Shopify updates—we can also work with your existing web person if you have one.",
  },
  {
    intent: "automation" as const,
    id: "service-systems" as const,
    shortLabel: "Automation",
    title: "Automation, chatbots & integrations",
    description:
      "Move data between booking, CRM, email, and sheets without someone retyping it every day. Add a chatbot or workflow when it saves real hours.",
    scope:
      "Zapier or Make, light custom connections, lead and booking sync, email triggers, simple runbooks. Chatbots where they cut support or intake load—not for show.",
  },
  {
    intent: "custom" as const,
    id: "service-custom" as const,
    shortLabel: "Custom build",
    title: "Custom software & APIs",
    description:
      "Internal tools, customer-facing flows, and process fixes that don’t come out of a box—delivered in slices you can try before you commit.",
    scope:
      "Browser-based tools, secure logins where needed, phased rollouts, and notes for whoever looks after it next.",
  },
] as const;

export const brandProcess = {
  eyebrow: "Process",
  title: "How we usually work",
  description: "Three steps—no guessing what happens next.",
  steps: [
    {
      phase: "01",
      title: "Discover",
      description:
        "We clarify what’s wrong or missing, what you already use, and what success looks like. You get a clear written scope before real work starts.",
    },
    {
      phase: "02",
      title: "Design",
      description:
        "Layout and flow come first. You approve real screens before anything gets polished.",
    },
    {
      phase: "03",
      title: "Build",
      description:
        "We ship in pieces—with links you can open. Easy to adjust while changes are still cheap.",
    },
  ] as const,
} as const;

export const brandAbout = {
  eyebrow: "About",
  title: "Who we are",
  paragraphs: [
    "VryntLab fixes what’s not working online—and builds what’s missing.",
    "You work with the people shipping the work—not a rotating account layer.",
    "We’re upfront about fit, budget, and timing. If it’s not right, we’ll say so early.",
  ] as const,
} as const;

export const brandContact = {
  eyebrow: "Contact",
  title: "Say what you need",
  lead: [
    "Short note: what’s broken or what you want to launch, when you need it, links if you have them.",
    "We reply by email. If it’s a fit, you get a clear scope and price before real work starts.",
    "Plain language beats a polished brief.",
  ] as const,
  followUp:
    "A human replies—no fake “we got it” theater unless something actually breaks.",
} as const;

export const brandContactForm = {
  sentTitle: "Thanks — received.",
  sentBody:
    "We read what you sent and usually reply within two business days: a direct answer, a few questions, or a time to talk if it’s a fit.",
  sentFooter: "No drip sequence. No obligation.",
} as const;

export const brandCredibility = {
  srOnlyTitle: "Who we usually work with",
  body: "Teams that rely on their website to win customers—and can’t afford it to underperform.",
  segments: ["SaaS", "Professional services", "E-commerce", "Online-first teams"] as const,
} as const;

export const brandDeliveryPreview = {
  chromeTitle: "Delivery preview",
  hintWithIntent: "Updates when your path changes.",
  hintNoIntent: "Choose a path—this tracks with it.",
} as const;

/** Footer line under the delivery mock — switches with selected path */
export const brandDeliveryFooter = {
  default:
    "How we work: preview links you can open, milestones you can follow—no long quiet stretches.",
  byIntent: {
    website:
      "We start with structure, then speed, then launch—no opaque rebuilds.",
    automation:
      "Automation focus: map sources and destinations, then harden handoffs before extras.",
    custom:
      "Custom focus: small shippable slices first, then access, data, and how you’ll own it.",
    app:
      "App focus: device targets and core flows first, then polish and store/release steps.",
    backend:
      "Backend focus: contracts and failure modes first, then scale and observability.",
    other:
      "We’ll align on what “done” means from your note—then propose a sensible slice.",
  },
} as const;

export const brandQuickEstimate = {
  intro:
    "Takes two minutes. We reply with clear next steps—plain language is fine.",
  /** When no intent is selected yet — copy mirrors path selector language */
  pickLaneHint: "Pick a lane—everything below adapts to it.",
  /** Fallback when intent-specific adaptive copy isn’t shown */
  notePlaceholderFallback:
    "e.g. Shopify feels slow, or we need HubSpot connected to Sheets.",
  sentTitle: "Got it.",
  sentBody: "We read every submission and usually reply within two business days.",
} as const;

/** Shown under the main intro in the quick estimate dialog when an intent chip is selected */
export const brandQuickEstimateIntentHint = {
  website:
    "We’ll prioritize site or storefront work—UX, speed, SEO/GBP, checkout, forms.",
  automation:
    "We’ll prioritize integrations, workflows, or a chatbot that earns its keep.",
  custom:
    "We’ll prioritize custom tools, APIs, or internal software—not a theme tweak.",
  app:
    "We’ll prioritize app work—platform, core flows, and what ships in v1.",
  backend:
    "We’ll prioritize backend and infra—APIs, data, hosting, and what breaks today.",
  other:
    "We’ll lead with your note—no need to force-fit a category.",
} as const;

export const brandContactEstimateCta =
  "Prefer the short form? Quick estimate";

/**
 * Context-aware primary actions when a path is selected (`selectedIntent`).
 * Falls back to `site.ts` defaults when intent is null.
 */
export const brandIntentActionLabels = {
  website: {
    contactPrimary: "Fix my site",
    estimatePrimary: "Estimate site work",
    estimateSubmit: "Send site estimate",
  },
  automation: {
    contactPrimary: "Connect my tools",
    estimatePrimary: "Estimate integrations",
    estimateSubmit: "Send integration estimate",
  },
  custom: {
    contactPrimary: "Build something custom",
    estimatePrimary: "Estimate custom build",
    estimateSubmit: "Send build estimate",
  },
  app: {
    contactPrimary: "Build an app",
    estimatePrimary: "Estimate app work",
    estimateSubmit: "Send app estimate",
  },
  backend: {
    contactPrimary: "Harden my backend",
    estimatePrimary: "Estimate backend work",
    estimateSubmit: "Send backend estimate",
  },
  other: {
    contactPrimary: "Start a conversation",
    estimatePrimary: "Request estimate",
    estimateSubmit: "Send estimate",
  },
} as const;

/** Compact Problem → Fix → Outcome strip when a lane is selected (#path panel). */
export const brandIntentTriad = {
  website: {
    frictionLabel: "The friction",
    friction: "Pages feel slow, messy, or hard to trust.",
    fixLabel: "What we fix",
    fix: "UX, performance, forms, and visibility basics.",
    outcomeLabel: "What you get",
    outcome: "A site people can actually finish on.",
  },
  automation: {
    frictionLabel: "The friction",
    friction: "The same data retyped into three tools.",
    fixLabel: "What we fix",
    fix: "Reliable wiring between tools you already use.",
    outcomeLabel: "What you get",
    outcome: "Fewer dropped leads and less manual copy-paste.",
  },
  custom: {
    frictionLabel: "The friction",
    friction: "Spreadsheets and hacks can’t scale the workflow.",
    fixLabel: "What we fix",
    fix: "Scoped product slices in the browser + APIs when needed.",
    outcomeLabel: "What you get",
    outcome: "Something you can click through before it’s “final.”",
  },
} as const;

/** Quick estimate field copy + scannable prompts per intent. */
export const brandQuickEstimateAdaptive = {
  website: {
    noteLabel: "What’s off? (optional)",
    notePlaceholder:
      "e.g. Slow product pages, confusing nav, checkout drop-off, need GBP + on-page work with the site…",
    prompts: [
      "Live URL (or staging)",
      "Platform if you know it (Shopify, WordPress…)",
      "Rough timeline or launch window",
    ] as const,
  },
  automation: {
    noteLabel: "What should move automatically? (optional)",
    notePlaceholder:
      "e.g. New bookings → CRM + Slack, leads from the site → sheet, support inbox → ticket tool…",
    prompts: [
      "Tools involved (even rough names)",
      "What triggers the handoff today (form, inbox, calendar…)",
      "Volume / how often it breaks",
    ] as const,
  },
  custom: {
    noteLabel: "What are we building? (optional)",
    notePlaceholder:
      "e.g. Internal dashboard for X, customer portal slice, API between A and B…",
    prompts: [
      "Who will use this? (team, customers, both)",
      "What does a good first version look like?",
      "Anything already built we should build on?",
    ] as const,
  },
  app: {
    noteLabel: "What should the app do? (optional)",
    notePlaceholder:
      "e.g. iOS + Android field app, offline sync, login with SSO…",
    prompts: [
      "Platforms (iOS, Android, both, desktop)",
      "Must-have flows for v1",
      "Anything already designed or in TestFlight",
    ] as const,
  },
  backend: {
    noteLabel: "What’s failing or missing? (optional)",
    notePlaceholder:
      "e.g. API timeouts at peak, messy deploys, need audit logs…",
    prompts: [
      "Stack if you know it (language, cloud, DB)",
      "What breaks or worries you today",
      "Traffic / scale ballpark",
    ] as const,
  },
  other: {
    noteLabel: "What are we solving? (optional)",
    notePlaceholder:
      "Say it however you like—rough bullets are fine.",
    prompts: [
      "Goal in one or two short lines",
      "Constraints (time, budget, tools)",
      "Links or docs if you have them",
    ] as const,
  },
} as const;

const ITEMS = [
  "Web Design",
  "AI Chatbots",
  "Automation",
  "SEO & GEO",
  "Chicago-Based",
  "Ships Fast",
  "Fair Pricing",
  "No Agency Bloat",
  "Booking Systems",
  "App Development",
];

const Dot = () => (
  <span
    className="mx-7 inline-block h-1 w-1 shrink-0 rounded-full bg-[#7C3FFF]/50 align-middle"
    aria-hidden
  />
);

export function MarqueeBar() {
  const doubled = [...ITEMS, ...ITEMS];

  return (
    <div
      className="slab-bleed overflow-hidden border-y border-[#1E1E35]"
      style={{ background: "#090914" }}
      aria-hidden="true"
    >
      <div className="relative flex overflow-hidden py-3.5">
        <div
          className="marquee-track flex shrink-0 items-center"
          style={{ width: "max-content" }}
        >
          {doubled.map((item, i) => (
            <span key={i} className="flex shrink-0 items-center whitespace-nowrap">
              <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#C8C8D8]/45">
                {item}
              </span>
              <Dot />
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

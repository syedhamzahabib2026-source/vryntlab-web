/**
 * Inline chat affordance — overlapping speech bubbles using theme accent (no raster asset).
 */
export function ChatLauncherGlyph() {
  return (
    <span className="chat-widget-launcher-glyph" aria-hidden="true">
      <svg
        width="26"
        height="26"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Rear bubble — softer */}
        <path
          d="M6.5 8.5c0-1.66 1.34-3 3-3h8.2c1.66 0 3 1.34 3 3v5.2c0 1.66-1.34 3-3 3h-3.1l-2.9 2.45V16.7h-2.2c-1.66 0-3-1.34-3-3V8.5Z"
          fill="currentColor"
          opacity="0.32"
        />
        {/* Front bubble — primary */}
        <path
          d="M13.5 13c0-1.66 1.34-3 3-3h9c1.66 0 3 1.34 3 3v6.5c0 1.66-1.34 3-3 3h-4.35l-2.9 2.45V22.5h-1.75c-1.66 0-3-1.34-3-3V13Z"
          fill="currentColor"
        />
      </svg>
    </span>
  );
}

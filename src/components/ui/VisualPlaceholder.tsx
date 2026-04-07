import type { ReactNode } from "react";

/**
 * Frame for media: pass `children` (e.g. next/image) for real assets.
 * Without children, shows a minimal grid placeholder.
 */
export type PreviewTone = "default" | "cool" | "warm" | "sage";

type VisualPlaceholderProps = {
  variant?: "hero" | "showcase";
  aspect?: "cinematic" | "video" | "photo";
  caption?: string;
  className?: string;
  previewTone?: PreviewTone;
  children?: ReactNode;
  /** Fake browser chrome on showcase frames — off for editorial / case-study crops */
  showChrome?: boolean;
};

const aspectClass: Record<NonNullable<VisualPlaceholderProps["aspect"]>, string> =
  {
    cinematic:
      "aspect-[16/11] min-h-[210px] sm:aspect-[2/1] sm:min-h-[270px] md:min-h-[310px] lg:min-h-[340px] xl:min-h-[360px]",
    video: "aspect-video min-h-[220px] sm:min-h-[240px]",
    photo: "aspect-[4/3] min-h-[220px] sm:min-h-[260px]",
  };

export function VisualPlaceholder({
  variant = "showcase",
  aspect = "video",
  caption,
  className = "",
  previewTone = "default",
  children,
  showChrome = true,
}: VisualPlaceholderProps) {
  const isHero = variant === "hero";
  const hasMedia = Boolean(children);

  const frameClass = isHero
    ? "rounded-[2rem] ring-1 ring-black/[0.05] shadow-[0_0_0_1px_rgba(0,0,0,0.05),0_28px_90px_-36px_rgba(0,0,0,0.14),0_56px_120px_-48px_rgba(0,0,0,0.08)] dark:ring-white/[0.07] dark:shadow-[0_0_0_1px_rgba(255,255,255,0.06),0_36px_100px_-40px_rgba(0,0,0,0.5),0_64px_140px_-52px_rgba(0,0,0,0.35)] md:rounded-[2.25rem] xl:rounded-[2.4rem]"
    : showChrome
      ? "rounded-2xl shadow-[0_0_0_1px_rgba(0,0,0,0.06),0_20px_56px_-32px_rgba(0,0,0,0.12)] dark:shadow-[0_0_0_1px_rgba(255,255,255,0.07),0_24px_60px_-28px_rgba(0,0,0,0.5)]"
      : "rounded-2xl shadow-[0_0_0_1px_rgba(0,0,0,0.05),0_24px_64px_-36px_rgba(0,0,0,0.14)] dark:shadow-[0_0_0_1px_rgba(255,255,255,0.06),0_28px_72px_-36px_rgba(0,0,0,0.55)]";

  return (
    <figure className={`group/placeholder ${className}`}>
      <div
        className={`relative isolate w-full overflow-hidden ${aspectClass[aspect]} ${frameClass}`}
      >
        {hasMedia ? (
          <>
            <div className="absolute inset-0 z-[5]">{children}</div>
            {variant === "showcase" && showChrome ? (
              <div
                className="absolute left-0 right-0 top-0 z-20 flex h-9 items-center border-b border-white/10 bg-zinc-950/25 px-3 backdrop-blur-md dark:border-white/5 dark:bg-black/35"
                aria-hidden
              >
                <div className="flex gap-1.5 opacity-70">
                  <span className="h-2 w-2 rounded-full bg-white/50 dark:bg-white/40" />
                  <span className="h-2 w-2 rounded-full bg-white/50 dark:bg-white/40" />
                  <span className="h-2 w-2 rounded-full bg-white/50 dark:bg-white/40" />
                </div>
                <div className="mx-auto h-1.5 w-[28%] max-w-[120px] rounded-full bg-white/25 dark:bg-white/20" />
              </div>
            ) : null}
            <div
              className={`pointer-events-none absolute inset-0 z-[25] shadow-[inset_0_1px_0_rgba(255,255,255,0.22),inset_0_0_80px_rgba(0,0,0,0.05)] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.06),inset_0_0_100px_rgba(0,0,0,0.38)] ${variant === "showcase" && showChrome ? "" : "rounded-[inherit]"}`}
              aria-hidden
            />
          </>
        ) : (
          <>
            <PlaceholderLayers variant={variant} previewTone={previewTone} />
            {variant === "showcase" && showChrome ? (
              <div
                className="absolute left-0 right-0 top-0 z-20 flex h-9 items-center border-b border-zinc-200/80 bg-zinc-100/95 px-3 backdrop-blur-[2px] dark:border-zinc-700/80 dark:bg-zinc-950/60"
                aria-hidden
              >
                <div className="flex gap-1.5 opacity-80">
                  <span className="h-2 w-2 rounded-full bg-zinc-300/90 dark:bg-zinc-600/80" />
                  <span className="h-2 w-2 rounded-full bg-zinc-300/90 dark:bg-zinc-600/80" />
                  <span className="h-2 w-2 rounded-full bg-zinc-300/90 dark:bg-zinc-600/80" />
                </div>
                <div className="mx-auto h-1.5 w-[28%] max-w-[120px] rounded-full bg-zinc-200/90 dark:bg-zinc-700/80" />
              </div>
            ) : null}
            <div
              className={`absolute inset-0 z-10 flex items-center justify-center overflow-hidden px-6 ${variant === "showcase" && showChrome ? "pt-9" : ""}`}
            >
              <div
                className="pointer-events-none flex flex-col items-center gap-3 text-center"
                aria-hidden
              >
                <div className="h-px w-12 bg-zinc-300/90 dark:bg-zinc-600/80" />
                <p className="text-[11px] font-medium uppercase tracking-[0.28em] text-zinc-500 dark:text-zinc-500">
                  {isHero ? "Add media" : "Preview"}
                </p>
                <div className="h-px w-12 bg-zinc-300/90 dark:bg-zinc-600/80" />
              </div>
            </div>
            <div
              className="pointer-events-none absolute inset-0 z-30 shadow-[inset_0_0_120px_rgba(0,0,0,0.04)] dark:shadow-[inset_0_0_100px_rgba(0,0,0,0.35)]"
              aria-hidden
            />
          </>
        )}
      </div>
      {caption ? (
        <figcaption
          className={`text-center text-[12px] leading-snug tracking-[0.02em] text-zinc-500 dark:text-zinc-500 ${isHero ? "mt-6 sm:mt-7" : "mt-5"}`}
        >
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}

const toneBase: Record<PreviewTone, string> = {
  default: "bg-[#f4f4f5] dark:bg-zinc-900/90",
  cool: "bg-[#eef1f7] dark:bg-zinc-900/90",
  warm: "bg-[#f6f3ef] dark:bg-zinc-900/90",
  sage: "bg-[#f0f4f1] dark:bg-zinc-900/90",
};

const toneGridPx: Record<PreviewTone, string> = {
  default: "28px",
  cool: "24px",
  warm: "36px",
  sage: "30px",
};

function PlaceholderLayers({
  variant,
  previewTone,
}: {
  variant: "hero" | "showcase";
  previewTone: PreviewTone;
}) {
  const gridSize = toneGridPx[previewTone];

  return (
    <>
      <div
        className={`absolute inset-0 z-0 ${toneBase[previewTone]}`}
        aria-hidden
      />
      <div
        className="absolute inset-0 z-0 bg-[linear-gradient(165deg,rgba(255,255,255,0.85)_0%,rgba(255,255,255,0)_42%,rgba(0,0,0,0.02)_100%)] dark:bg-[linear-gradient(165deg,rgba(255,255,255,0.06)_0%,transparent_45%,rgba(0,0,0,0.35)_100%)]"
        aria-hidden
      />
      <div
        className="absolute inset-0 z-0 opacity-[0.45] dark:opacity-[0.2]"
        style={{
          backgroundImage: `
              linear-gradient(rgba(0,0,0,0.04) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0,0,0,0.04) 1px, transparent 1px)
            `,
          backgroundSize: `${gridSize} ${gridSize}`,
        }}
        aria-hidden
      />
      {variant === "showcase" ? (
        <div
          className="absolute inset-0 z-[1] rounded-[inherit] ring-1 ring-inset ring-black/[0.04] dark:ring-white/[0.06]"
          aria-hidden
        />
      ) : null}
    </>
  );
}

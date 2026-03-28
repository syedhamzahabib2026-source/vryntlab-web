import Image from "next/image";
import { HoverLift, Reveal } from "@/components/motion/Reveal";
import { StaggerGroup, StaggerItem } from "@/components/motion/StaggerGroup";
import { placeholderImages } from "@/lib/placeholder-images";
import { VisualPlaceholder } from "@/components/ui/VisualPlaceholder";

type Project = {
  client: string;
  title: string;
  tags: string;
  outcome: string;
  meta: string;
  caption: string;
  aspect: "video" | "photo";
  imageSrc: string;
  imageAlt: string;
  liveUrl: string;
  liveLabel: string;
};

const projects: readonly Project[] = [
  {
    client: "Living Silica",
    title: "Living Silica — Shopify store shoppers can actually use",
    tags: "livingsilica.com · product detail · collections · education pages",
    outcome:
      "We worked alongside their developers on UI, UX, and front-end so the science reads clearly and the path to cart doesn’t fight the brand.",
    meta: "DTC supplements · live site",
    caption:
      "Stand-in: product context — screenshot a PDP or collection from livingsilica.com",
    aspect: "photo",
    imageSrc: placeholderImages.livingSilicaProduct,
    imageAlt: "Minimal product still life — placeholder for Living Silica PDP",
    liveUrl: "https://livingsilica.com/",
    liveLabel: "livingsilica.com",
  },
  {
    client: "SoftSync Technology",
    title: "SoftSync Technology — homepage and services that sell the work",
    tags: "softsynctechnology.com · hero · offerings · quote flow",
    outcome:
      "Partnered with their build team on layout and front-end so cloud, AI, and enterprise services scan fast for busy buyers—not a wall of buzzwords.",
    meta: "B2B consultancy · live site",
    caption:
      "Stand-in: laptop UI — capture homepage or services from softsynctechnology.com",
    aspect: "video",
    imageSrc: placeholderImages.softSyncServices,
    imageAlt: "Laptop with analytics UI — placeholder for SoftSync web",
    liveUrl: "https://softsynctechnology.com/",
    liveLabel: "softsynctechnology.com",
  },
  {
    client: "Zebra Crypto (TheZ)",
    title: "TheZ — launch hub for a phased NFT drop on Ethereum",
    tags: "zebra-crypto.web.app · sale phases · wallet connect · roadmap",
    outcome:
      "Joined the project’s developers to keep mint timing, tiers, and FAQs legible while the drop moved—holders always knew what came next.",
    meta: "Web3 launch · live app",
    caption:
      "Stand-in: dashboard mood — grab launch, roadmap, or mint from zebra-crypto.web.app",
    aspect: "video",
    imageSrc: placeholderImages.zebraLaunch,
    imageAlt: "Dashboard on screen — placeholder for Zebra launch UI",
    liveUrl: "https://zebra-crypto.web.app/",
    liveLabel: "zebra-crypto.web.app",
  },
];

const projectCardClassName =
  "overflow-hidden rounded-2xl border border-zinc-200/90 bg-white transition-shadow duration-300 hover:shadow-[0_24px_55px_-28px_rgba(0,0,0,0.12)] dark:border-zinc-800 dark:bg-zinc-950/60 dark:hover:shadow-[0_28px_60px_-24px_rgba(0,0,0,0.55)]";

const liveLinkClass =
  "mt-4 inline-flex text-[12px] font-medium text-zinc-600 underline decoration-zinc-300 underline-offset-4 transition-colors hover:text-zinc-950 hover:decoration-zinc-500 dark:text-zinc-400 dark:decoration-zinc-600 dark:hover:text-zinc-50 dark:hover:decoration-zinc-400";

export function FeaturedWork() {
  return (
    <section id="work" className="scroll-mt-28" aria-labelledby="work-heading">
      <Reveal>
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-zinc-500">
            Selected work
          </p>
          <h2
            id="work-heading"
            className="mt-5 text-4xl font-semibold tracking-[-0.03em] text-zinc-950 md:text-5xl dark:text-zinc-50"
          >
            Recent work
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
            Three live builds—each one co-shipped with the client&apos;s own
            developers. Trellisify led what you see and click; they owned the
            rest.
          </p>
        </div>
      </Reveal>
      <StaggerGroup className="mt-16 space-y-20 md:mt-24 md:space-y-24">
        {projects.map((project) => (
          <StaggerItem key={project.client}>
            <HoverLift className={projectCardClassName}>
              <div className="border-b border-zinc-100 dark:border-zinc-800/80">
                <VisualPlaceholder
                  variant="showcase"
                  aspect={project.aspect}
                  caption={project.caption}
                >
                  <Image
                    src={project.imageSrc}
                    alt={project.imageAlt}
                    fill
                    className="object-cover object-center"
                    sizes="(max-width: 768px) 100vw, 896px"
                  />
                </VisualPlaceholder>
              </div>
              <div className="px-8 py-9 md:px-10 md:py-10">
                <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-zinc-500">
                  {project.client}
                </p>
                <h3 className="mt-3 text-xl font-semibold tracking-tight text-zinc-950 md:text-2xl dark:text-zinc-50">
                  {project.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                  {project.tags}
                </p>
                <p className="mt-4 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
                  {project.outcome}
                </p>
                <p className="mt-5 text-[12px] text-zinc-500 dark:text-zinc-500">
                  {project.meta}
                </p>
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={liveLinkClass}
                >
                  {project.liveLabel} ↗
                </a>
              </div>
            </HoverLift>
          </StaggerItem>
        ))}
      </StaggerGroup>
    </section>
  );
}

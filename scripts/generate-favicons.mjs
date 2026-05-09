/**
 * Generates a clean VL mark favicon from an SVG string.
 * No source image required — mark is drawn entirely in SVG.
 * Run: node scripts/generate-favicons.mjs  →  npm run generate-favicons
 */
import { writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import pngToIco from "png-to-ico";
import sharp from "sharp";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const appDir = join(root, "src", "app");

const SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <rect width="100" height="100" rx="22" fill="#7C3FFF"/>
  <text x="50" y="68" text-anchor="middle"
    font-family="Arial Black, Arial, sans-serif"
    font-weight="900" font-size="52" fill="white">
    VL
  </text>
</svg>`;

async function svgToPng(size) {
  return sharp(Buffer.from(SVG))
    .resize(size, size)
    .png()
    .toBuffer();
}

async function main() {
  const [png512, png180, png32, png16] = await Promise.all([
    svgToPng(512),
    svgToPng(180),
    svgToPng(32),
    svgToPng(16),
  ]);

  writeFileSync(join(appDir, "icon.png"), png512);
  console.log("  ✓ icon.png      (512×512)");

  writeFileSync(join(appDir, "apple-icon.png"), png180);
  console.log("  ✓ apple-icon.png (180×180)");

  const ico = await pngToIco([png32, png16]);
  writeFileSync(join(appDir, "favicon.ico"), ico);
  console.log("  ✓ favicon.ico   (32+16px)");

  console.log("\nDone — VL mark on violet background.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

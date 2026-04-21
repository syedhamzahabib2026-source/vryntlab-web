/**
 * Favicons from the brand file: crop top ~42% (serif VL monogram), then square resize.
 * Source: public/brand/vl-logo.webp
 * Run: node scripts/generate-favicons.mjs  →  npm run generate-favicons
 */
import { writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import pngToIco from "png-to-ico";
import sharp from "sharp";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const inputPath = join(root, "public", "brand", "vl-logo.webp");
const appDir = join(root, "src", "app");

/** Top portion of source image = monogram band above wordmark */
const CROP_HEIGHT_RATIO = 0.42;

const canvasBg = { r: 255, g: 255, b: 255, alpha: 1 };

async function monogramPipeline() {
  const meta = await sharp(inputPath).metadata();
  const w = meta.width;
  const h = meta.height;
  if (!w || !h) {
    throw new Error(`Could not read dimensions from ${inputPath}`);
  }
  const cropH = Math.max(1, Math.round(h * CROP_HEIGHT_RATIO));
  console.log(`Source ${w}×${h}px → crop top ${cropH}px (full width)`);

  return sharp(inputPath).extract({
    left: 0,
    top: 0,
    width: w,
    height: cropH,
  });
}

async function toSquarePng(pipeline, size) {
  return pipeline
    .clone()
    .resize(size, size, {
      fit: "contain",
      background: canvasBg,
    })
    .png()
    .toBuffer();
}

async function main() {
  const base = await monogramPipeline();

  const png512 = await toSquarePng(base, 512);
  const png180 = await toSquarePng(base, 180);
  const png32 = await toSquarePng(base, 32);
  const png16 = await toSquarePng(base, 16);

  writeFileSync(join(appDir, "icon.png"), png512);
  writeFileSync(join(appDir, "apple-icon.png"), png180);

  const ico = await pngToIco([png32, png16]);
  writeFileSync(join(appDir, "favicon.ico"), ico);

  console.log(
    "Wrote src/app/icon.png, apple-icon.png, favicon.ico (cropped VL monogram)",
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

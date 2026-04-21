/**
 * Generates app icons from public/brand/vl-logo.webp (white-background mark).
 * Run: node scripts/generate-favicons.mjs
 */
import { writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import pngToIco from "png-to-ico";
import sharp from "sharp";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const input = join(root, "public", "brand", "vl-logo.webp");
const appDir = join(root, "src", "app");

async function squarePng(size) {
  return sharp(input)
    .resize(size, size, {
      fit: "contain",
      background: { r: 255, g: 255, b: 255, alpha: 1 },
    })
    .png()
    .toBuffer();
}

async function main() {
  const png512 = await squarePng(512);
  const png180 = await squarePng(180);
  const png32 = await squarePng(32);
  const png16 = await squarePng(16);

  writeFileSync(join(appDir, "icon.png"), png512);
  writeFileSync(join(appDir, "apple-icon.png"), png180);

  const ico = await pngToIco([png32, png16]);
  writeFileSync(join(appDir, "favicon.ico"), ico);

  console.log("Wrote src/app/icon.png, apple-icon.png, favicon.ico from vl-logo.webp");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

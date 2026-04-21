/**
 * Generates favicons as bold "VL" on white (readable at 16–32px). No logo mark.
 * Run: node scripts/generate-favicons.mjs
 */
import { writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import pngToIco from "png-to-ico";
import sharp from "sharp";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const appDir = join(root, "src", "app");

/** Brand accent from globals.css :root --accent */
const FILL = "#0d6f64";

function vlSvg(size) {
  const fontSize = Math.round(size * 0.44);
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
  <rect width="100%" height="100%" fill="#ffffff"/>
  <text x="50%" y="50%" dominant-baseline="central" text-anchor="middle"
    font-family="ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif"
    font-weight="700" font-size="${fontSize}" fill="${FILL}">VL</text>
</svg>`;
}

async function rasterize(size) {
  const svg = vlSvg(size);
  return sharp(Buffer.from(svg)).png().toBuffer();
}

async function main() {
  const png512 = await rasterize(512);
  const png180 = await rasterize(180);
  const png32 = await rasterize(32);
  const png16 = await rasterize(16);

  writeFileSync(join(appDir, "icon.png"), png512);
  writeFileSync(join(appDir, "apple-icon.png"), png180);

  const ico = await pngToIco([png32, png16]);
  writeFileSync(join(appDir, "favicon.ico"), ico);

  console.log("Wrote src/app/icon.png, apple-icon.png, favicon.ico (VL text)");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

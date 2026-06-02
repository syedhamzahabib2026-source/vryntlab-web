/**
 * Generates favicon/icon files from public/brand/vl-favicon-new.png.
 * Run: node scripts/generate-favicons.mjs  →  npm run generate-favicons
 */
import { writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import pngToIco from "png-to-ico";
import sharp from "sharp";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root   = join(__dirname, "..");
const appDir = join(root, "src", "app");

const SRC = join(root, "public", "brand", "vl-favicon-new.png");

async function main() {
  const [png512, png180, png64, png32, png16] = await Promise.all([
    sharp(SRC).resize(512, 512).png().toBuffer(),
    sharp(SRC).resize(180, 180).png().toBuffer(),
    sharp(SRC).resize(64,  64 ).png().toBuffer(),
    sharp(SRC).resize(32,  32 ).png().toBuffer(),
    sharp(SRC).resize(16,  16 ).png().toBuffer(),
  ]);

  writeFileSync(join(appDir, "icon.png"),       png512); console.log("  ✓ icon.png       (512×512)");
  writeFileSync(join(appDir, "apple-icon.png"), png180); console.log("  ✓ apple-icon.png (180×180)");
  writeFileSync(join(root, "public", "brand", "favicon.png"), png64);
  console.log("  ✓ public/brand/favicon.png (64×64)");

  const ico = await pngToIco([png32, png16]);
  writeFileSync(join(appDir, "favicon.ico"), ico);       console.log("  ✓ favicon.ico    (32+16px)");

  console.log("\nDone.");
}

main().catch((err) => { console.error(err); process.exit(1); });

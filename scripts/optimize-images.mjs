/**
 * Compress project hero images → public/projects/*.webp
 * Run automatically in `prebuild` (npm run build) or manually:
 *   node scripts/optimize-images.mjs
 *
 * Masters live in src/assets/projects/ (NOT copied into dist); the generated
 * .webp files are committed to public/projects/ and served by the site.
 * The card grid renders each image at ~2x retina (1140px wide) inside a max
 * ~570px column, so we downscale + re-encode to WebP.
 */
import sharp from "sharp";
import { mkdir } from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import { existsSync } from "fs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const inDir = path.join(root, "src", "assets", "projects");
const outDir = path.join(root, "public", "projects");

const sources = ["drone.png", "jop.png", "world.png", "yezzi.png"];

await mkdir(outDir, { recursive: true });

for (const name of sources) {
  const input = path.join(inDir, name);
  const output = path.join(outDir, name.replace(/\.png$/, ".webp"));

  // Skip masters that no longer exist: their committed .webp output is already
  // in public/projects/ and is what the site serves. Failing here would block
  // every `npm run build` (discovered in F-22 QA when the src/assets masters
  // were purged in F-19 but the script still referenced them).
  if (!existsSync(input)) {
    console.log(`Skip ${name} (master not found; keeping ${path.basename(output)})`);
    continue;
  }

  await sharp(input)
    .resize(1140, 760, { fit: "cover" })
    .webp({ quality: 78 })
    .toFile(output);
  console.log(`Wrote ${path.basename(output)}`);
}


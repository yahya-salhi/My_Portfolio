/**
 * Resize/compress project hero images → public/projects/*.webp
 * Run: node scripts/optimize-images.mjs
 */
import sharp from "sharp";
import { mkdir } from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const outDir = path.join(root, "public", "projects");

const sources = [
  { in: "carrent.png", out: "carrent.webp" },
  { in: "jobit.png", out: "jobit.webp" },
  { in: "tripguide.png", out: "tripguide.webp" },
];

await mkdir(outDir, { recursive: true });

for (const { in: name, out } of sources) {
  const input = path.join(root, "src", "assets", name);
  const output = path.join(outDir, out);
  await sharp(input)
    .resize(720, 460, { fit: "cover", withoutEnlargement: true })
    .webp({ quality: 78 })
    .toFile(output);
  console.log(`Wrote ${out}`);
}

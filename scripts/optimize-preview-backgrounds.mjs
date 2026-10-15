import sharp from "sharp";
import { readdir, mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

// Preserve Figma exports; generate delivery assets and tiny inline placeholders.
const root = path.resolve("public/assets/figma/backgrounds");
const output = path.join(root, "optimized");
await mkdir(output, { recursive: true });
const manifest = {};
for (const file of (await readdir(root)).filter((file) => file.endsWith(".png")).sort()) {
  const source = path.join(root, file);
  const { width, height } = await sharp(source).metadata();
  const slug = file
    .replace(/\.png$/, "")
    .toLowerCase()
    .replace(/\s+/g, "-");
  const widths = [...new Set([640, 1280, Math.min(2560, width)].filter((size) => size <= width))].sort((a, b) => a - b);
  const variants = [];
  for (const size of widths) {
    const name = `${slug}-${size}.webp`;
    const info = await sharp(source)
      .resize({ width: size, withoutEnlargement: true })
      .webp({ quality: 76, effort: 6 })
      .toFile(path.join(output, name));
    variants.push({ width: size, src: `/assets/figma/backgrounds/optimized/${name}` });
    console.log(`${name}: ${Math.round(info.size / 1024)} KB`);
  }
  const blur = await sharp(source).resize({ width: 12 }).webp({ quality: 45 }).toBuffer();
  manifest[file] = { width, height, variants, blurDataURL: `data:image/webp;base64,${blur.toString("base64")}` };
}
await writeFile("src/components/preview-backgrounds.json", JSON.stringify(manifest, null, 2) + "\n");

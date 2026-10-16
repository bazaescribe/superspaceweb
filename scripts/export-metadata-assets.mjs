import sharp from "sharp";

const root = new URL("../", import.meta.url);
const exports = [
  ["superspace-social.png", 1200, 675],
  ["superspace-apple-touch-icon.png", 180, 180],
];

for (const [name, width, height] of exports) {
  await sharp(new URL(`assets/brand/source/${name}`, root).pathname)
    .resize(width, height, { fit: "cover", position: "centre" })
    .png({ compressionLevel: 9 })
    .toFile(new URL(`public/brand/${name}`, root).pathname);
  console.log(`${name}: ${width} × ${height}`);
}

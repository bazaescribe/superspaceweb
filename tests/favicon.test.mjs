import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import sharp from "sharp";

test("SVG and PNG favicons have transparent corners and preserve the outlined mark", async () => {
  const svg = readFileSync(new URL("../public/brand/superspace-favicon.svg", import.meta.url), "utf8");
  assert.doesNotMatch(svg, /<rect/);
  assert.match(svg, /fill="white"/);
  assert.match(svg, /fill="black"/);
  const { data, info } = await sharp(new URL("../public/brand/superspace-favicon.png", import.meta.url).pathname)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
  assert.equal(info.width, 512);
  assert.equal(info.height, 512);
  for (const [x, y] of [
    [0, 0],
    [511, 0],
    [0, 511],
    [511, 511],
  ])
    assert.equal(data[(y * info.width + x) * 4 + 3], 0);
  assert.ok(data.some((value, index) => index % 4 === 3 && value === 255));
});

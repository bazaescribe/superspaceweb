import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import { footerGroups } from "../src/lib/site.ts";
import { socialImage } from "../src/lib/seo.ts";

const root = new URL("../", import.meta.url);
const read = (path) => readFileSync(new URL(path, root));
const css = read("src/app/color-tokens.css").toString();
const color = (name) => {
  const value = css.match(new RegExp(`--color-${name}:\\s*(#[0-9a-f]{6}|rgb\\([^;]+\\))`))?.[1];
  assert.ok(value, `Missing token ${name}`);
  if (value.startsWith("#")) return [1, 3, 5].map((i) => parseInt(value.slice(i, i + 2), 16));
  return value.match(/[\d.]+/g).map(Number);
};
const luminance = (rgb) =>
  rgb
    .map((v) => v / 255)
    .map((v) => (v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4))
    .reduce((sum, v, i) => sum + v * [0.2126, 0.7152, 0.0722][i], 0);
const contrast = (foreground, background) => {
  const alpha = foreground[3] ?? 1;
  const composite = background.map((v, i) => foreground[i] * alpha + v * (1 - alpha));
  const a = luminance(composite);
  const b = luminance(background);
  return (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);
};

test("all seven semantic colors have explicit light and dark variants", () => {
  for (const name of [
    "background",
    "background-secondary",
    "background-tertiary",
    "content",
    "content-secondary",
    "content-tertiary",
    "accent",
  ]) {
    for (const mode of ["light", "dark"]) color(`${name}-${mode}`);
  }
  assert.match(css, /\[data-theme="light"\]/);
  assert.match(css, /\[data-theme="dark"\]/);
});

test("primary and secondary reading text meet AA in light, dark and card hover contexts", () => {
  for (const mode of ["light", "dark"]) {
    for (const role of ["content", "content-secondary"]) {
      assert.ok(contrast(color(`${role}-${mode}`), color(`background-${mode}`)) >= 4.5);
    }
  }
  assert.ok(contrast(color("content-secondary-dark"), color("accent-dark")) >= 4.5);
  assert.ok(contrast(color("content-light"), color("accent-light")) >= 4.5);
});

test("footer preserves Figma ordering, canonical routes and working destinations", () => {
  assert.deepEqual(
    footerGroups.map((g) => g.links.map((l) => l.label)),
    [
      ["Home", "Platform", "Offerings", "Deployment", "FAQ", "Changelog"],
      ["Manifesto", "Careers", "Engineering Blog"],
      ["LinkedIn", "X (Twitter)", "Mail"],
    ],
  );
  for (const { links } of footerGroups)
    for (const { label, href } of links) {
      assert.ok(href, `${label} must have a destination`);
      if (href.startsWith("/")) {
        assert.ok(href === "/" || existsSync(new URL(`src/app${href}/page.tsx`, root)), href);
      } else assert.ok(new URL(href).protocol === "https:");
    }
});

test("metadata rasters have the exact declared dimensions", () => {
  const dimensions = (path) => {
    const png = read(`public${path}`);
    assert.equal(png.subarray(1, 4).toString(), "PNG");
    return [png.readUInt32BE(16), png.readUInt32BE(20)];
  };
  assert.deepEqual(dimensions(socialImage.url), [socialImage.width, socialImage.height]);
  assert.deepEqual(dimensions("/brand/superspace-apple-touch-icon.png"), [180, 180]);
  assert.deepEqual(dimensions("/brand/superspace-favicon.png"), [512, 512]);
});

test("canonical interface logos are transparent vectors, with both color variants", () => {
  for (const name of ["logo", "symbol"])
    for (const variant of ["", "-inverse"]) {
      const svg = read(`public/brand/superspace-${name}${variant}.svg`).toString();
      assert.match(svg, /<svg/);
      assert.match(svg, /<path/);
      assert.doesNotMatch(svg, /<rect|<image|#1E1E1E/);
      assert.match(svg, variant ? /fill="white"/ : /fill="black"/);
    }
});

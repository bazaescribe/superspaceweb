import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { SHAPE_SYSTEM_NODES, SHAPE_SYSTEM_STYLE, SHAPE_SYSTEM_VIEWBOX } from "../src/lib/shape-system/geometry.ts";

test("Map renderer uses every canonical SVG circle without extra nodes", () => {
  const svg = readFileSync(new URL("../public/assets/figma/illustration/Map.svg", import.meta.url), "utf8");
  const circles = [...svg.matchAll(/<circle cx="([^"]+)" cy="([^"]+)" r="([^"]+)"/g)];
  assert.deepEqual(SHAPE_SYSTEM_VIEWBOX, { width: 320, height: 439 });
  assert.deepEqual(
    SHAPE_SYSTEM_NODES.map((node) => node.position),
    circles.map((circle) => [Number(circle[1]), Number(circle[2])]),
  );
  assert.ok(circles.every((circle) => Number(circle[3]) === SHAPE_SYSTEM_STYLE.nodeRadius));
  assert.equal(SHAPE_SYSTEM_STYLE.lineWidth, 1);
});

test("Animation lives on the first card and uses the supplied SVG fallback", () => {
  const section = readFileSync(new URL("../src/components/home-story-sections.tsx", import.meta.url), "utf8");
  const card = readFileSync(new URL("../src/components/shape-system-card.tsx", import.meta.url), "utf8");
  assert.match(section, /index === 0/);
  assert.match(card, /implementation-card--1/);
  assert.match(card, /illustration\/Map\.svg/);
  assert.match(card, /hovered \|\| focused/);
});

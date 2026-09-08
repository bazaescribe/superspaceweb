import assert from "node:assert/strict";
import test from "node:test";
import { intersectsHeaderEdge } from "../src/lib/header-theme.ts";

test("a region activates when its top reaches the header bottom", () => {
  assert.equal(intersectsHeaderEdge({ top: 64, bottom: 600 }, 64), true);
});

test("a region is inactive before it reaches the header", () => {
  assert.equal(intersectsHeaderEdge({ top: 65, bottom: 600 }, 64), false);
});

test("a region remains active while the header edge is inside it", () => {
  assert.equal(intersectsHeaderEdge({ top: -200, bottom: 65 }, 64), true);
});

test("a region deactivates as soon as its bottom passes the header edge", () => {
  assert.equal(intersectsHeaderEdge({ top: -600, bottom: 64 }, 64), false);
});

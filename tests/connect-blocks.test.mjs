import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { readConnectBlocks, animatedBlockHeight } from "../src/lib/connect-blocks/geometry.ts";

const svg = readFileSync(new URL("../public/assets/figma/illustration/Connect.svg", import.meta.url), "utf8");
test("Connect reads all seven canonical block heights and paths", () => {
  const blocks = readConnectBlocks(svg);
  assert.equal(blocks.length, 7);
  blocks.forEach((b) => {
    assert.equal(b.outer.length, 6);
    assert.equal(b.top.length, 3);
    assert.equal(b.vertical.length, 2);
  });
  assert.deepEqual(
    blocks.map((b) => Math.round(b.height)),
    [102, 102, 51, 51, 153, 153, 203],
  );
  assert.deepEqual(blocks[0].side, [
    [178.5, 204.075],
    [134, 229.575],
    [133.5, 331.075],
    [178.5, 306.075],
  ]);
});
test("Heights vary independently, remain positive, and reset exactly", () => {
  const blocks = readConnectBlocks(svg);
  for (let t = 0; t < 30; t += 0.2)
    blocks.forEach((b, i) => {
      assert.equal(animatedBlockHeight(b, i, t, 0), b.height);
      assert.ok(animatedBlockHeight(b, i, t, 1) >= 28);
      assert.ok(Math.abs(animatedBlockHeight(b, i, t, 1) - b.height) <= 40);
    });
  assert.notEqual(
    animatedBlockHeight(blocks[0], 0, 2, 1) - blocks[0].height,
    animatedBlockHeight(blocks[1], 1, 2, 1) - blocks[1].height,
  );
});
test("Occluders write depth only, never card background color", () => {
  const renderer = readFileSync(new URL("../src/lib/connect-blocks/renderer.ts", import.meta.url), "utf8");
  assert.match(renderer, /colorWrite: false/);
  assert.match(renderer, /depthWrite: true/);
  assert.match(renderer, /setClearColor\(0, 0\)/);
});

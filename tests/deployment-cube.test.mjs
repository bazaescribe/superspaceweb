import assert from "node:assert/strict";
import test from "node:test";
import { cubePositions, rotate, turnSlice, cubeFaces } from "../src/components/deployment-cube-geometry.ts";

test("slice turns preserve 27 unique grid positions and leave the other slices fixed", () => {
  for (const axis of [0, 1, 2])
    for (const slice of [-1, 0, 1]) {
      const turned = turnSlice(cubePositions, axis, slice, Math.PI / 2);
      assert.equal(new Set(turned.map(String)).size, 27);
      turned.forEach((point, i) => {
        assert.ok(point.every((v) => [-1, 0, 1].includes(v)));
        if (cubePositions[i][axis] !== slice) assert.deepEqual(point, cubePositions[i]);
      });
      let restored = turned;
      for (let i = 0; i < 3; i++) restored = turnSlice(restored, axis, slice, Math.PI / 2);
      assert.deepEqual(restored.map(String), cubePositions.map(String));
    }
});

test("intermediate turns preserve distance and produce finite, depth-ordered SVG faces", () => {
  for (const axis of [0, 1, 2])
    for (const angle of [0, 0.25, Math.PI / 4, Math.PI / 2]) {
      const point = rotate([1, -1, 0.4], axis, angle);
      assert.ok(Math.abs(point.reduce((sum, n) => sum + n * n, 0) - 2.16) < 1e-10);
      const faces = cubeFaces(cubePositions, axis, 1, angle);
      assert.ok(faces.length > 0);
      assert.ok(faces.every((face) => !/NaN|Infinity/.test(face.outline)));
      assert.ok(faces.every((face, i) => i === 0 || face.depth >= faces[i - 1].depth));
    }
});

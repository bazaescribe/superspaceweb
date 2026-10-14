export type Point3 = [number, number, number];
export type Axis = 0 | 1 | 2;
export const cubePositions: Point3[] = Array.from({ length: 27 }, (_, i) => [
  (i % 3) - 1,
  (Math.floor(i / 3) % 3) - 1,
  Math.floor(i / 9) - 1,
]);

export function rotate(point: Point3, axis: Axis, angle: number): Point3 {
  const result: Point3 = [...point];
  const a = (axis + 1) % 3,
    b = (axis + 2) % 3;
  result[a] = point[a] * Math.cos(angle) - point[b] * Math.sin(angle);
  result[b] = point[a] * Math.sin(angle) + point[b] * Math.cos(angle);
  return result;
}

export function turnSlice(positions: Point3[], axis: Axis, slice: number, angle: number): Point3[] {
  return positions.map((point) =>
    point[axis] === slice ? (rotate(point, axis, angle).map(Math.round) as Point3) : point,
  );
}

const corners: Point3[] = Array.from({ length: 8 }, (_, i) => [
  i & 1 ? 0.4 : -0.4,
  i & 2 ? 0.4 : -0.4,
  i & 4 ? 0.4 : -0.4,
]);
const faces = [
  { indices: [0, 4, 6, 2], normal: [-1, 0, 0] },
  { indices: [1, 3, 7, 5], normal: [1, 0, 0] },
  { indices: [0, 1, 5, 4], normal: [0, -1, 0] },
  { indices: [2, 6, 7, 3], normal: [0, 1, 0] },
  { indices: [0, 2, 3, 1], normal: [0, 0, -1] },
  { indices: [4, 5, 7, 6], normal: [0, 0, 1] },
];
const depth = (p: number[]) => p[0] + p[1] + p[2] * (55.51 / 57.8367);
const project = (p: Point3) =>
  `${(170 + (p[0] - p[1]) * 48.57).toFixed(3)},${(190 + (p[0] + p[1]) * 27.7551 - p[2] * 57.8367).toFixed(3)}`;

export function cubeFaces(positions: Point3[], axis: Axis, slice: number, angle: number) {
  return positions
    .flatMap((center, cube) => {
      const moving = center[axis] === slice;
      const points = corners.map((corner) => {
        const point = corner.map((v, i) => v + center[i]) as Point3;
        return moving ? rotate(point, axis, angle) : point;
      });
      const visible = faces
        .map((face, id) => ({ ...face, id, normal: moving ? rotate(face.normal as Point3, axis, angle) : face.normal }))
        .filter((face) => depth(face.normal) > 0.00001);
      return visible.map((face) => ({
        key: `${cube}-${face.id}`,
        depth: face.indices.reduce((sum, i) => sum + depth(points[i]), 0) / 4,
        outline: `M${face.indices.map((i) => project(points[i])).join("L")}Z`,
        // Shared visible edges use the same dashed detail as the Figma cubes.
        edges: face.indices.map((a, index) => {
          const b = face.indices[(index + 1) % 4];
          const shared = visible.some(
            (other) => other.id !== face.id && other.indices.includes(a) && other.indices.includes(b),
          );
          return { path: `M${project(points[a])}L${project(points[b])}`, shared };
        }),
      }));
    })
    .sort((a, b) => a.depth - b.depth);
}

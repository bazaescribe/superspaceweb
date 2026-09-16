export type Point = readonly [x: number, y: number];
export type ShapeSystemNode = { id: string; position: Point };
export type ShapeSystemEdge = { dashed?: boolean; nodes?: readonly string[]; points?: readonly Point[] };
export type ShapeSystemSurface = { points: readonly Point[]; hatchOrigin: Point };

/** Geometry transcribed directly from public/assets/figma/illustration/Map.svg. */
export const SHAPE_SYSTEM_VIEWBOX = { width: 320, height: 439 } as const;
export const SHAPE_SYSTEM_NODES: readonly ShapeSystemNode[] = [
  { id: "lower-front", position: [94.5, 332.5] },
  { id: "lower-right", position: [316.5, 204.5] },
  { id: "lower-left", position: [3.5, 283.5] },
  { id: "bottom-front", position: [94.5, 435.5] },
  { id: "bottom-right", position: [316.5, 307.5] },
  { id: "bottom-left", position: [3.5, 385.5] },
  { id: "upper-front", position: [94.5, 181.5] },
  { id: "upper-right", position: [316.5, 53.5] },
  { id: "top", position: [228.5, 3.5] },
  { id: "upper-left", position: [3.5, 132.5] },
  { id: "middle-front", position: [94.5, 284.5] },
  { id: "middle-right", position: [316.5, 156.5] },
  { id: "middle-left", position: [3.5, 234.5] },
];
export const SHAPE_SYSTEM_EDGES: readonly ShapeSystemEdge[] = [
  {
    points: [
      [4, 385.5],
      [94, 435.5],
      [317.033, 307.5],
      [317.033, 204.5],
      [274.783, 181],
      [94.5, 284.5],
      [55.5, 263.5],
      [47, 258.155],
      [4, 283.5],
      [4, 385.5],
    ],
  },
  {
    points: [
      [4, 234.5],
      [94, 284.5],
      [317.033, 156.5],
      [317.033, 53.5],
      [229.033, 3],
      [94, 79.4997],
      [4, 132.5],
      [4, 234.5],
    ],
  },
  {
    points: [
      [94.5, 435.5],
      [94.5, 333.5],
      [5, 284],
    ],
  },
  {
    points: [
      [94.5, 333.5],
      [316.5, 205.328],
    ],
  },
  {
    dashed: true,
    points: [
      [94.5, 284.5],
      [94.5, 182.5],
      [5, 133],
    ],
  },
  {
    dashed: true,
    points: [
      [94.5, 182.5],
      [316.5, 54.3282],
    ],
  },
];
export const SHAPE_SYSTEM_SURFACES: readonly ShapeSystemSurface[] = [
  {
    hatchOrigin: [94.5, 205.5],
    points: [
      [317.5, 307.5],
      [317.5, 205.5],
      [94.5, 333.5],
      [94.5, 435],
    ],
  },
  {
    hatchOrigin: [94.5, 54.5],
    points: [
      [317.5, 156.5],
      [317.5, 54.5],
      [94.5, 182.5],
      [94.5, 284],
    ],
  },
];
export const SHAPE_SYSTEM_STYLE = {
  dash: 6,
  gap: 6,
  hatchGap: 19.56,
  hatchWidth: (8 * 19.56) / 163,
  lineWidth: 1,
  nodeRadius: 3.5,
} as const;

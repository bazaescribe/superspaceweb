export type Point = readonly [x: number, y: number];

export type ShapeSystemNode = {
  id: string;
  position: Point;
};

export type ShapeSystemEdge = {
  dashed?: boolean;
  nodes?: readonly string[];
  points?: readonly Point[];
};

export type ShapeSystemSurface = {
  nodes: readonly string[];
};

/** Canonical geometry, measured from the supplied 286 x 452 Figma SVG. */
export const SHAPE_SYSTEM_VIEWBOX = { width: 286, height: 452 } as const;

export const SHAPE_SYSTEM_NODES: readonly ShapeSystemNode[] = [
  { id: "top-left", position: [156, 6] },
  { id: "top-right", position: [280, 6] },
  { id: "upper-left", position: [6, 154] },
  { id: "upper-middle", position: [130, 154] },
  { id: "upper-right", position: [280, 130] },
  { id: "middle-left", position: [6, 278] },
  { id: "middle-middle", position: [130, 278] },
  { id: "middle-right", position: [280, 178] },
  { id: "lower-left", position: [6, 326] },
  { id: "lower-middle", position: [130, 326] },
  { id: "lower-right", position: [280, 301] },
  // The two lower corners are present in the current raster artwork, although
  // the supplied SVG omits their circle elements at its clipped lower edge.
  { id: "bottom-left", position: [6, 449] },
  { id: "bottom-middle", position: [130, 449] },
] as const;

export const SHAPE_SYSTEM_EDGES: readonly ShapeSystemEdge[] = [
  { nodes: ["upper-middle", "upper-left", "top-left", "top-right", "upper-middle"] },
  { nodes: ["upper-left", "middle-left", "middle-middle"] },
  { nodes: ["lower-left", "lower-middle", "bottom-middle", "bottom-left", "lower-left"] },
  {
    points: [
      [6, 326],
      [51, 280],
      [130, 280],
      [234, 178],
      [280, 178],
    ],
  },
  { dashed: true, nodes: ["middle-middle", "upper-middle", "top-right", "upper-right", "middle-middle"] },
  { dashed: true, nodes: ["bottom-middle", "lower-middle", "middle-right", "lower-right", "bottom-middle"] },
] as const;

export const SHAPE_SYSTEM_SURFACES: readonly ShapeSystemSurface[] = [
  { nodes: ["upper-middle", "top-right", "upper-right", "middle-middle"] },
  { nodes: ["lower-middle", "middle-right", "lower-right", "bottom-middle"] },
] as const;

export const SHAPE_SYSTEM_STYLE = {
  dash: 6,
  gap: 6,
  hatchGap: 19.56,
  hatchWidth: 1.45,
  lineWidth: 2,
  nodeRadius: 6,
} as const;

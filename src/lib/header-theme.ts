export type HeaderTone = "light" | "dark";

export type VerticalBounds = {
  top: number;
  bottom: number;
};

export function intersectsHeaderEdge(region: VerticalBounds, headerBottom: number) {
  return region.top <= headerBottom && region.bottom > headerBottom;
}

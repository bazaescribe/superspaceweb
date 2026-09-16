export type BlockPoint = readonly [number, number];
export type ConnectBlock = {
  outer: BlockPoint[];
  top: BlockPoint[];
  side: BlockPoint[];
  vertical: BlockPoint[];
  height: number;
};

/** These canonical paths contain only straight absolute M/L/H/V commands. */
export function parseBlockPath(path: string): BlockPoint[] {
  const tokens = path.match(/[MLHVZ]|-?\d*\.?\d+(?:e[-+]?\d+)?/gi) ?? [];
  const points: BlockPoint[] = [];
  let x = 0,
    y = 0,
    index = 0,
    command = "";
  while (index < tokens.length) {
    if (/^[a-z]$/i.test(tokens[index])) command = tokens[index++];
    if (command === "Z") break;
    if (command === "M" || command === "L") {
      x = Number(tokens[index++]);
      y = Number(tokens[index++]);
    } else if (command === "V") y = Number(tokens[index++]);
    else if (command === "H") x = Number(tokens[index++]);
    else throw new Error("Unsupported block path command");
    points.push([x, y]);
  }
  if (points.length > 1 && points[0][0] === points.at(-1)![0] && points[0][1] === points.at(-1)![1]) points.pop();
  return points;
}

export function readConnectBlocks(svg: string): ConnectBlock[] {
  const paths = [...svg.split("<defs>")[0].matchAll(/<path\b[^>]*\bd="([^"]+)"/g)].map((m) => parseBlockPath(m[1]));
  if (paths.length !== 28) throw new Error("Expected seven four-path blocks");
  return Array.from({ length: 7 }, (_, i) => {
    const [outer, top, side, vertical] = paths.slice(i * 4, i * 4 + 4);
    // The hatch polygon starts at bottom-right in the SVG, unlike the outline.
    return { outer, top, side: [side[1], side[2], side[3], side[0]], vertical, height: outer[2][1] - outer[3][1] };
  });
}

/** Independent bounded motion; bases stay fixed and every block returns to its seed height. */
export function animatedBlockHeight(block: ConnectBlock, index: number, time: number, amount: number) {
  const wave = Math.sin(time * (0.67 + index * 0.09) + index * 1.71);
  return Math.max(28, block.height + wave * (24 + (index % 3) * 8) * amount);
}

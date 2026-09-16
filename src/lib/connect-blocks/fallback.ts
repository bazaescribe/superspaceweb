/** SVG alpha masks hide covered paths without introducing background-colored fills. */
export function maskedConnectFallback(svg: string): string {
  const doc = new DOMParser().parseFromString(svg, "image/svg+xml");
  const root = doc.documentElement;
  const paths = [...root.children].filter((n) => n.tagName === "path");
  if (paths.length !== 28) throw new Error("Expected seven Connect blocks");
  const ns = "http://www.w3.org/2000/svg";
  const defs = root.querySelector("defs")!;
  for (let i = 0; i < 7; i++) {
    const mask = doc.createElementNS(ns, "mask");
    mask.setAttribute("id", `block-visibility-${i}`);
    mask.setAttribute("maskUnits", "userSpaceOnUse");
    mask.setAttribute("x", "-1");
    mask.setAttribute("y", "-1");
    mask.setAttribute("width", "405");
    mask.setAttribute("height", "360");
    const background = doc.createElementNS(ns, "rect");
    background.setAttribute("x", "-1");
    background.setAttribute("y", "-1");
    background.setAttribute("width", "405");
    background.setAttribute("height", "360");
    background.setAttribute("fill", "white");
    mask.append(background);
    for (let j = i + 1; j < 7; j++) {
      const occluder = doc.createElementNS(ns, "path");
      occluder.setAttribute("d", paths[j * 4].getAttribute("d")!);
      occluder.setAttribute("fill", "black");
      mask.append(occluder);
    }
    defs.append(mask);
    const group = doc.createElementNS(ns, "g");
    group.setAttribute("mask", `url(#block-visibility-${i})`);
    for (const path of paths.slice(i * 4, i * 4 + 4)) group.append(path);
    root.append(group);
  }
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(new XMLSerializer().serializeToString(root))}`;
}

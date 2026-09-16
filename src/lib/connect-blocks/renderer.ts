import * as THREE from "three";
import { readConnectBlocks, animatedBlockHeight, type BlockPoint } from "./geometry";

export type ConnectController = { setActive(active: boolean): void; dispose(): void };

export function mountConnectBlocks(canvas: HTMLCanvasElement, svg: string): ConnectController {
  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true, powerPreference: "low-power" });
  renderer.setClearColor(0, 0);
  const scene = new THREE.Scene();
  const camera = new THREE.OrthographicCamera(-280, 280, 280, -280, 0.1, 2000);
  camera.position.z = 1000;
  // Invisible occluders only write depth. They never paint RGB or alpha, so any card background shines through.
  const maskMaterial = new THREE.MeshBasicMaterial({
    colorWrite: false,
    depthWrite: true,
    side: THREE.DoubleSide,
    polygonOffset: true,
    polygonOffsetFactor: 1,
    polygonOffsetUnits: 1,
  });
  const edgeMaterial = new THREE.LineBasicMaterial({ color: 0xffffff, depthWrite: false });
  const dashMaterial = new THREE.LineDashedMaterial({ color: 0xffffff, dashSize: 6, gapSize: 6, depthWrite: false });
  const resources: THREE.BufferGeometry[] = [];
  const world = (x: number, y: number, baseY: number) => [x - 201.5, 179 - y, baseY * 0.4];
  const blocks = readConnectBlocks(svg).map((block, index) => {
    const specs = [
      { points: [...block.outer, block.outer[0]], fractions: [0, 0, 0, 1, 1, 1, 0], dashed: false },
      { points: block.top, fractions: [1, 1, 1], dashed: true },
      { points: block.vertical, fractions: [0, 1], dashed: false },
    ];
    const lines = specs.map((spec) => {
      const geometry = new THREE.BufferGeometry();
      geometry.setAttribute("position", new THREE.Float32BufferAttribute(new Float32Array(spec.points.length * 3), 3));
      resources.push(geometry);
      const line = new THREE.Line(geometry, spec.dashed ? dashMaterial : edgeMaterial);
      line.renderOrder = 1;
      scene.add(line);
      return { line, ...spec };
    });
    // Three solid faces supply physical, height-independent ground-depth values, not painter-order guesses.
    const faces = [
      { points: [block.outer[0], block.outer[1], block.top[1], block.outer[5]], fractions: [0, 0, 1, 1] },
      { points: [block.outer[1], block.outer[2], block.outer[3], block.top[1]], fractions: [0, 0, 1, 1] },
      { points: [block.outer[5], block.outer[4], block.outer[3], block.top[1]], fractions: [1, 1, 1, 1] },
    ].map((face) => {
      const geometry = new THREE.BufferGeometry();
      geometry.setAttribute("position", new THREE.Float32BufferAttribute(new Float32Array(18), 3));
      resources.push(geometry);
      const mesh = new THREE.Mesh(geometry, maskMaterial);
      mesh.renderOrder = 0;
      scene.add(mesh);
      return { geometry, ...face };
    });
    const hatchGeometry = new THREE.BufferGeometry();
    hatchGeometry.setAttribute("position", new THREE.Float32BufferAttribute(new Float32Array(3072), 3));
    resources.push(hatchGeometry);
    const hatch = new THREE.LineSegments(hatchGeometry, edgeMaterial);
    hatch.renderOrder = 1;
    scene.add(hatch);
    function moved(point: BlockPoint, fraction: number, height: number) {
      const baseY = point[1] + block.height * fraction;
      return world(point[0], baseY - height * fraction, baseY);
    }
    function update(height: number) {
      for (const { line, points, fractions, dashed } of lines) {
        const attribute = line.geometry.getAttribute("position") as THREE.BufferAttribute;
        points.forEach((p, i) => {
          const [x, y, z] = moved(p, fractions[i], height);
          // The source's face/edge coordinates differ by up to one SVG unit.
          attribute.setXYZ(i, x, y, z + 0.8);
        });
        attribute.needsUpdate = true;
        line.geometry.computeBoundingSphere();
        if (dashed) line.computeLineDistances();
      }
      for (const { geometry, points, fractions } of faces) {
        const attribute = geometry.getAttribute("position") as THREE.BufferAttribute;
        [0, 1, 2, 0, 2, 3].forEach((p, i) =>
          attribute.setXYZ(i, ...(moved(points[p], fractions[p], height) as [number, number, number])),
        );
        attribute.needsUpdate = true;
        geometry.computeBoundingSphere();
      }
      const polygon = block.side.slice(0, 4).map((p, i) => [p[0], p[1] - (i < 2 ? height - block.height : 0)]);
      const bottomFront = block.side[2],
        bottomRight = block.side[3];
      const groundY = (x: number) =>
        bottomFront[1] + ((x - bottomFront[0]) / (bottomRight[0] - bottomFront[0])) * (bottomRight[1] - bottomFront[1]);
      const offsets = polygon.map((p) => p[0] - p[1]);
      const phase = block.side[2][0] - block.side[0][1];
      const attribute = hatchGeometry.getAttribute("position") as THREE.BufferAttribute;
      let count = 0;
      for (
        let offset = Math.ceil((Math.min(...offsets) - phase) / 19.56) * 19.56 + phase;
        offset <= Math.max(...offsets);
        offset += 19.56
      ) {
        const hits: number[][] = [];
        for (let j = 0; j < polygon.length; j++) {
          const a = polygon[j],
            b = polygon[(j + 1) % polygon.length];
          const fa = a[0] - a[1] - offset,
            fb = b[0] - b[1] - offset;
          if (Math.abs(fa) < 0.00001) hits.push(a);
          if (fa * fb < 0) {
            const t = fa / (fa - fb);
            hits.push([a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t]);
          }
        }
        if (hits.length >= 2)
          for (const p of [hits[0], hits.at(-1)!]) {
            const [x, y, z] = world(p[0], p[1], groundY(p[0]));
            attribute.setXYZ(count++, x, y, z + 0.8);
          }
      }
      hatchGeometry.setDrawRange(0, count);
      attribute.needsUpdate = true;
      hatchGeometry.computeBoundingSphere();
    }
    update(block.height);
    return { block, index, update };
  });
  let active = false,
    visible = false,
    disposed = false,
    frame = 0,
    last = 0,
    time = 0,
    amount = 0;
  function draw() {
    renderer.render(scene, camera);
    canvas.dataset.ready = "true";
  }
  function tick(now: number) {
    frame = 0;
    if (disposed || !visible || document.hidden) return;
    const delta = last ? Math.min((now - last) / 1000, 0.05) : 0;
    last = now;
    amount = THREE.MathUtils.lerp(amount, active ? 1 : 0, 1 - Math.exp(-5 * delta));
    time += delta * amount;
    if (!active && amount < 0.001) amount = 0;
    blocks.forEach((b) => b.update(animatedBlockHeight(b.block, b.index, time, amount)));
    draw();
    if (active || amount) frame = requestAnimationFrame(tick);
  }
  function schedule() {
    if (!frame && !disposed && visible && !document.hidden) {
      last = 0;
      frame = requestAnimationFrame(tick);
    }
  }
  function resize() {
    const { width, height } = canvas.getBoundingClientRect();
    if (!width || !height) return;
    renderer.setPixelRatio(Math.min(devicePixelRatio || 1, 2));
    renderer.setSize(width, height, false);
    camera.left = (-280 * width) / height;
    camera.right = (280 * width) / height;
    camera.updateProjectionMatrix();
    draw();
  }
  const resizeObserver = new ResizeObserver(resize);
  resizeObserver.observe(canvas);
  const observer = new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    cancelAnimationFrame(frame);
    frame = 0;
    if (visible && (active || amount)) schedule();
  });
  observer.observe(canvas);
  function visibility() {
    cancelAnimationFrame(frame);
    frame = 0;
    schedule();
  }
  document.addEventListener("visibilitychange", visibility);
  resize();
  return {
    setActive(value) {
      active = value;
      schedule();
    },
    dispose() {
      disposed = true;
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      observer.disconnect();
      document.removeEventListener("visibilitychange", visibility);
      resources.forEach((g) => g.dispose());
      maskMaterial.dispose();
      edgeMaterial.dispose();
      dashMaterial.dispose();
      renderer.dispose();
      delete canvas.dataset.ready;
    },
  };
}

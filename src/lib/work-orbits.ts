import * as THREE from "three";
import { SVGLoader } from "three/examples/jsm/loaders/SVGLoader.js";

export type WorkOrbitController = {
  setActive(active: boolean): void;
  setPointer(x: number, y: number): void;
  dispose(): void;
};

/** Parses the supplied SVG, retaining its actual curves and intentionally cropped framing. */
export function mountWorkOrbits(canvas: HTMLCanvasElement, svg: string): WorkOrbitController {
  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true, powerPreference: "low-power" });
  renderer.setClearColor(0, 0);
  const scene = new THREE.Scene();
  const camera = new THREE.OrthographicCamera(-280, 280, 280, -280, 0.1, 2000);
  camera.position.z = 1000;
  const tilt = new THREE.Group();
  scene.add(tilt);
  const doc = new DOMParser().parseFromString(svg, "image/svg+xml");
  const viewbox = doc.documentElement.getAttribute("viewBox")!.split(/\s+/).map(Number);
  const [, , width, height] = viewbox;
  const world = (x: number, y: number) => new THREE.Vector3(x - width / 2, height / 2 - y, 0);
  const circles = [...doc.querySelectorAll("circle")];
  const sun = circles.reduce((largest, circle) =>
    Number(circle.getAttribute("r")) > Number(largest.getAttribute("r")) ? circle : largest,
  );
  const sunPoint = world(Number(sun.getAttribute("cx")), Number(sun.getAttribute("cy")));
  tilt.position.copy(sunPoint);
  const white = new THREE.MeshBasicMaterial({ color: 0xffffff, side: THREE.DoubleSide });
  const resources: THREE.BufferGeometry[] = [];
  const parsed = new SVGLoader().parse(svg);
  const orbitCurves: THREE.CatmullRomCurve3[] = [];
  const dashed: { line: THREE.Line; distances: Float32Array }[] = [];
  const dashMaterial = new THREE.LineDashedMaterial({ color: 0xffffff, dashSize: 8, gapSize: 8 });
  for (const path of parsed.paths) {
    const node = path.userData?.node as Element;
    if (node.tagName !== "path") continue;
    for (const subpath of path.subPaths) {
      const points = subpath.getPoints(32).map((p) => world(p.x, p.y).sub(sunPoint));
      if (node.hasAttribute("stroke-dasharray")) {
        const geometry = new THREE.BufferGeometry().setFromPoints(points);
        resources.push(geometry);
        const line = new THREE.Line(geometry, dashMaterial);
        line.computeLineDistances();
        dashed.push({ line, distances: (geometry.getAttribute("lineDistance").array as Float32Array).slice() });
        tilt.add(line);
      } else {
        const stroke = SVGLoader.pointsToStroke(
          points.map((p) => new THREE.Vector2(p.x, p.y)),
          SVGLoader.getStrokeStyle(1, "white"),
        );
        if (stroke) {
          resources.push(stroke);
          tilt.add(new THREE.Mesh(stroke, white));
        }
        orbitCurves.push(new THREE.CatmullRomCurve3(points.slice(0, -1), true, "centripetal"));
      }
    }
  }
  const planets = circles
    .filter((c) => c !== sun)
    .map((circle, index) => {
      const point = world(Number(circle.getAttribute("cx")), Number(circle.getAttribute("cy"))).sub(sunPoint);
      const geometry = new THREE.CircleGeometry(Number(circle.getAttribute("r")), 48);
      resources.push(geometry);
      const mesh = new THREE.Mesh(geometry, white);
      mesh.position.copy(point);
      mesh.position.z = 2;
      tilt.add(mesh);
      let best = { distance: Infinity, curve: orbitCurves[0], start: 0 };
      for (const curve of orbitCurves)
        for (let i = 0; i < 1024; i++) {
          const distance = curve.getPoint(i / 1024).distanceTo(point);
          if (distance < best.distance) best = { distance, curve, start: i / 1024 };
        }
      const correction = point.clone().sub(best.curve.getPoint(best.start));
      return { mesh, ...best, correction, speed: 0.025 + index * 0.009 };
    });
  // Keep the sun round and stationary while its surrounding plane tilts.
  const sunGeometry = new THREE.CircleGeometry(Number(sun.getAttribute("r")) + 0.5, 96);
  resources.push(sunGeometry);
  const sunMesh = new THREE.Mesh(sunGeometry, white);
  sunMesh.position.copy(sunPoint);
  sunMesh.position.z = 10;
  scene.add(sunMesh);
  let active = false,
    visible = false,
    disposed = false,
    frame = 0,
    last = 0,
    time = 0,
    speed = 0;
  let pointerX = 0,
    pointerY = 0;
  function draw() {
    renderer.render(scene, camera);
    canvas.dataset.ready = "true";
  }
  function tick(now: number) {
    frame = 0;
    if (disposed || !visible || document.hidden) return;
    const delta = last ? Math.min((now - last) / 1000, 0.05) : 0;
    last = now;
    const smooth = 1 - Math.exp(-6 * delta);
    speed = THREE.MathUtils.lerp(speed, active ? 1 : 0, smooth);
    time += delta * speed;
    tilt.rotation.x = THREE.MathUtils.lerp(tilt.rotation.x, active ? pointerY * 0.06 : 0, smooth);
    tilt.rotation.y = THREE.MathUtils.lerp(tilt.rotation.y, active ? pointerX * 0.06 : 0, smooth);
    for (const planet of planets) {
      planet.mesh.position.copy(planet.curve.getPoint((planet.start + time * planet.speed) % 1)).add(planet.correction);
      planet.mesh.position.z = 2;
    }
    for (const { line, distances } of dashed) {
      const attribute = line.geometry.getAttribute("lineDistance") as THREE.BufferAttribute;
      for (let i = 0; i < distances.length; i++) attribute.setX(i, distances[i] + time * 12);
      attribute.needsUpdate = true;
    }
    draw();
    if (active || speed > 0.001 || Math.abs(tilt.rotation.x) + Math.abs(tilt.rotation.y) > 0.0001)
      frame = requestAnimationFrame(tick);
  }
  function schedule() {
    if (!frame && visible && !disposed && !document.hidden) {
      last = 0;
      frame = requestAnimationFrame(tick);
    }
  }
  function resize() {
    const { width: w, height: h } = canvas.getBoundingClientRect();
    if (!w || !h) return;
    renderer.setPixelRatio(Math.min(devicePixelRatio || 1, 2));
    renderer.setSize(w, h, false);
    camera.left = (-280 * w) / h;
    camera.right = (280 * w) / h;
    camera.updateProjectionMatrix();
    draw();
  }
  const resizeObserver = new ResizeObserver(resize);
  resizeObserver.observe(canvas);
  const observer = new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    cancelAnimationFrame(frame);
    frame = 0;
    if (visible) schedule();
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
      if (!active) pointerX = pointerY = 0;
      schedule();
    },
    setPointer(x, y) {
      pointerX = THREE.MathUtils.clamp(x, -1, 1);
      pointerY = THREE.MathUtils.clamp(y, -1, 1);
      schedule();
    },
    dispose() {
      disposed = true;
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      observer.disconnect();
      document.removeEventListener("visibilitychange", visibility);
      resources.forEach((g) => g.dispose());
      white.dispose();
      dashMaterial.dispose();
      renderer.dispose();
      delete canvas.dataset.ready;
    },
  };
}

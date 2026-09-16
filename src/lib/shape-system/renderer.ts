import * as THREE from "three";
import {
  SHAPE_SYSTEM_EDGES,
  SHAPE_SYSTEM_NODES,
  SHAPE_SYSTEM_STYLE,
  SHAPE_SYSTEM_SURFACES,
  SHAPE_SYSTEM_VIEWBOX,
  type Point,
} from "./geometry";

type DrawPiece = THREE.Mesh<THREE.PlaneGeometry, THREE.MeshBasicMaterial> & {
  userData: { drawStart: number; drawEnd: number };
};

export type ShapeSystemController = {
  dispose: () => void;
  setHovered: (hovered: boolean) => void;
};

const CAMERA_HEIGHT = 560;
const WHITE = 0xffffff;

function worldPoint([x, y]: Point): THREE.Vector2 {
  return new THREE.Vector2(x - SHAPE_SYSTEM_VIEWBOX.width / 2, SHAPE_SYSTEM_VIEWBOX.height / 2 - y);
}

function makePiece(
  start: THREE.Vector2,
  end: THREE.Vector2,
  width: number,
  material: THREE.MeshBasicMaterial,
): DrawPiece {
  const length = start.distanceTo(end);
  const geometry = new THREE.PlaneGeometry(length, width);
  geometry.translate(length / 2, 0, 0);
  const mesh = new THREE.Mesh(geometry, material) as DrawPiece;
  mesh.position.set(start.x, start.y, 0);
  mesh.rotation.z = Math.atan2(end.y - start.y, end.x - start.x);
  mesh.userData = { drawStart: 0, drawEnd: 1 };
  return mesh;
}

function lineIntersections(polygon: readonly THREE.Vector2[], offset: number) {
  const hits: THREE.Vector2[] = [];
  for (let index = 0; index < polygon.length; index += 1) {
    const a = polygon[index];
    const b = polygon[(index + 1) % polygon.length];
    const fa = a.y + a.x - offset;
    const fb = b.y + b.x - offset;
    if (Math.abs(fa) < 0.0001) hits.push(a.clone());
    if (fa * fb < 0) {
      const amount = fa / (fa - fb);
      hits.push(a.clone().lerp(b, amount));
    }
  }
  return hits.filter(
    (hit, index) => !hits.some((other, otherIndex) => otherIndex < index && hit.distanceTo(other) < 0.01),
  );
}

function setPieceDraw(pieces: readonly DrawPiece[], progress: number) {
  for (const piece of pieces) {
    const local = THREE.MathUtils.clamp(
      (progress - piece.userData.drawStart) / (piece.userData.drawEnd - piece.userData.drawStart),
      0,
      1,
    );
    piece.scale.x = local;
    piece.visible = local > 0.0001;
  }
}

function distributeDraw(pieces: readonly DrawPiece[]) {
  pieces.forEach((piece, index) => {
    piece.userData.drawStart = index / pieces.length;
    piece.userData.drawEnd = (index + 1) / pieces.length;
  });
}

function damp(current: number, target: number, rate: number, delta: number) {
  return THREE.MathUtils.lerp(current, target, 1 - Math.exp(-rate * delta));
}

/** Mounts the independently controlled node, edge, and surface layers. */
export function mountShapeSystem(canvas: HTMLCanvasElement): ShapeSystemController {
  const renderer = new THREE.WebGLRenderer({
    alpha: true,
    antialias: true,
    canvas,
    powerPreference: "low-power",
  });
  renderer.setClearColor(0x000000, 0);
  renderer.outputColorSpace = THREE.SRGBColorSpace;

  const scene = new THREE.Scene();
  const camera = new THREE.OrthographicCamera(
    -CAMERA_HEIGHT / 2,
    CAMERA_HEIGHT / 2,
    CAMERA_HEIGHT / 2,
    -CAMERA_HEIGHT / 2,
    0.1,
    10,
  );
  camera.position.z = 5;

  const nodeLayer = new THREE.Group();
  const edgeLayer = new THREE.Group();
  const surfaceLayer = new THREE.Group();
  scene.add(surfaceLayer, edgeLayer, nodeLayer);

  const nodeMaterial = new THREE.MeshBasicMaterial({ color: WHITE });
  const edgeMaterial = new THREE.MeshBasicMaterial({ color: WHITE, transparent: true });
  const surfaceMaterial = new THREE.MeshBasicMaterial({ color: WHITE, transparent: true });
  const nodeGeometry = new THREE.CircleGeometry(SHAPE_SYSTEM_STYLE.nodeRadius, 32);
  const nodeMap = new Map(SHAPE_SYSTEM_NODES.map((node) => [node.id, worldPoint(node.position)]));
  const nodeMeshes = SHAPE_SYSTEM_NODES.map((node, index) => {
    const mesh = new THREE.Mesh(nodeGeometry, nodeMaterial);
    const point = nodeMap.get(node.id)!;
    mesh.position.set(point.x, point.y, 2);
    mesh.userData = {
      frequencyX: 0.23 + (index % 5) * 0.027,
      frequencyY: 0.19 + (index % 4) * 0.031,
      phase: index * 1.737,
      point,
    };
    nodeLayer.add(mesh);
    return mesh;
  });

  const edgePieces: DrawPiece[] = [];
  for (const edge of SHAPE_SYSTEM_EDGES) {
    const path = edge.nodes?.map((id) => nodeMap.get(id)!) ?? edge.points?.map(worldPoint) ?? [];
    for (let index = 0; index < path.length - 1; index += 1) {
      const start = path[index];
      const end = path[index + 1];
      if (!edge.dashed) {
        const piece = makePiece(start, end, SHAPE_SYSTEM_STYLE.lineWidth, edgeMaterial);
        piece.position.z = 1;
        edgeLayer.add(piece);
        edgePieces.push(piece);
        continue;
      }
      const length = start.distanceTo(end);
      const direction = end.clone().sub(start).normalize();
      for (let cursor = 0; cursor < length; cursor += SHAPE_SYSTEM_STYLE.dash + SHAPE_SYSTEM_STYLE.gap) {
        const dashStart = start.clone().addScaledVector(direction, cursor);
        const dashEnd = start.clone().addScaledVector(direction, Math.min(length, cursor + SHAPE_SYSTEM_STYLE.dash));
        const piece = makePiece(dashStart, dashEnd, SHAPE_SYSTEM_STYLE.lineWidth, edgeMaterial);
        piece.position.z = 1;
        edgeLayer.add(piece);
        edgePieces.push(piece);
      }
    }
  }
  distributeDraw(edgePieces);

  const surfacePieces: DrawPiece[] = [];
  for (const surface of SHAPE_SYSTEM_SURFACES) {
    const polygon = surface.points.map(worldPoint);
    const offsets = polygon.map((point) => point.x + point.y);
    const origin = worldPoint(surface.hatchOrigin);
    const phase = origin.x + origin.y;
    const minimum =
      Math.ceil((Math.min(...offsets) - phase) / SHAPE_SYSTEM_STYLE.hatchGap) * SHAPE_SYSTEM_STYLE.hatchGap + phase;
    const maximum = Math.max(...offsets);
    for (let offset = minimum; offset <= maximum; offset += SHAPE_SYSTEM_STYLE.hatchGap) {
      const hits = lineIntersections(polygon, offset);
      if (hits.length < 2) continue;
      const piece = makePiece(hits[0], hits[1], SHAPE_SYSTEM_STYLE.hatchWidth, surfaceMaterial);
      surfaceLayer.add(piece);
      surfacePieces.push(piece);
    }
  }
  distributeDraw(surfacePieces);

  let hovered = false;
  let visible = false;
  let disposed = false;
  let frame = 0;
  let last = 0;
  let elapsed = 0;
  let release = 0;
  let edgeOpacity = 1;
  let edgeDraw = 1;
  let surfaceOpacity = 1;
  let surfaceDraw = 1;

  function resize() {
    const { width, height } = canvas.getBoundingClientRect();
    if (!width || !height) return;
    const maxDpr = Math.sqrt(2_000_000 / Math.max(1, width * height));
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2, maxDpr));
    renderer.setSize(width, height, false);
    const aspect = width / height;
    camera.left = (-CAMERA_HEIGHT * aspect) / 2;
    camera.right = (CAMERA_HEIGHT * aspect) / 2;
    camera.top = CAMERA_HEIGHT / 2;
    camera.bottom = -CAMERA_HEIGHT / 2;
    camera.updateProjectionMatrix();
    draw();
  }

  function draw() {
    if (disposed) return;
    renderer.render(scene, camera);
    canvas.dataset.ready = "true";
  }

  function updateNodes() {
    for (const mesh of nodeMeshes) {
      const { point, phase, frequencyX, frequencyY } = mesh.userData as {
        point: THREE.Vector2;
        phase: number;
        frequencyX: number;
        frequencyY: number;
      };
      const wanderX =
        Math.sin(elapsed * frequencyX * Math.PI * 2 + phase) * 18 +
        Math.sin(elapsed * 0.11 * Math.PI * 2 + phase * 0.47) * 7;
      const wanderY =
        Math.cos(elapsed * frequencyY * Math.PI * 2 + phase * 0.73) * 16 +
        Math.sin(elapsed * 0.13 * Math.PI * 2 + phase) * 6;
      const targetX = THREE.MathUtils.clamp(point.x + wanderX, -245, 245);
      const targetY = THREE.MathUtils.clamp(point.y + wanderY, -254, 254);
      mesh.position.x = THREE.MathUtils.lerp(point.x, targetX, release);
      mesh.position.y = THREE.MathUtils.lerp(point.y, targetY, release);
    }
  }

  function tick(now: number) {
    frame = 0;
    if (!visible || document.hidden || disposed) return;
    if (!last) last = now;
    const delta = Math.min(0.05, (now - last) / 1000);
    last = now;
    elapsed += delta;

    if (hovered) {
      edgeOpacity = damp(edgeOpacity, 0, 16, delta);
      surfaceOpacity = damp(surfaceOpacity, 0, 14, delta);
      if (edgeOpacity < 0.035 && surfaceOpacity < 0.035) {
        edgeDraw = 0;
        surfaceDraw = 0;
        release = damp(release, 1, 3.4, delta);
      }
    } else {
      release = damp(release, 0, 14, delta);
      if (release < 0.035) {
        release = 0;
        edgeOpacity = damp(edgeOpacity, 1, 18, delta);
        edgeDraw = damp(edgeDraw, 1, 17, delta);
        if (edgeDraw > 0.9) {
          surfaceOpacity = damp(surfaceOpacity, 1, 15, delta);
          surfaceDraw = damp(surfaceDraw, 1, 13, delta);
        }
      }
    }

    edgeMaterial.opacity = edgeOpacity;
    surfaceMaterial.opacity = surfaceOpacity;
    setPieceDraw(edgePieces, edgeDraw);
    setPieceDraw(surfacePieces, surfaceDraw);
    updateNodes();
    draw();

    const resting =
      !hovered &&
      release === 0 &&
      edgeDraw > 0.999 &&
      surfaceDraw > 0.999 &&
      edgeOpacity > 0.999 &&
      surfaceOpacity > 0.999;
    if (resting) {
      edgeDraw = surfaceDraw = edgeOpacity = surfaceOpacity = 1;
      setPieceDraw(edgePieces, 1);
      setPieceDraw(surfacePieces, 1);
      updateNodes();
      draw();
      return;
    }
    frame = requestAnimationFrame(tick);
  }

  function schedule() {
    if (disposed || !visible || document.hidden || frame) return;
    last = 0;
    frame = requestAnimationFrame(tick);
  }

  function setHovered(nextHovered: boolean) {
    if (hovered === nextHovered || disposed) return;
    hovered = nextHovered;
    if (!hovered) {
      edgeDraw = 0;
      surfaceDraw = 0;
      edgeOpacity = 0;
      surfaceOpacity = 0;
    }
    schedule();
  }

  function visibilityChanged() {
    if (document.hidden) {
      cancelAnimationFrame(frame);
      frame = 0;
      last = 0;
    } else {
      schedule();
    }
  }

  const resizeObserver = new ResizeObserver(resize);
  resizeObserver.observe(canvas);
  const intersectionObserver = new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    if (!visible) {
      cancelAnimationFrame(frame);
      frame = 0;
      last = 0;
    } else {
      draw();
      if (hovered || release > 0) schedule();
    }
  });
  intersectionObserver.observe(canvas);
  document.addEventListener("visibilitychange", visibilityChanged);
  resize();
  setPieceDraw(edgePieces, 1);
  setPieceDraw(surfacePieces, 1);
  draw();

  return {
    setHovered,
    dispose() {
      disposed = true;
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      document.removeEventListener("visibilitychange", visibilityChanged);
      delete canvas.dataset.ready;
      nodeGeometry.dispose();
      edgePieces.forEach((piece) => piece.geometry.dispose());
      surfacePieces.forEach((piece) => piece.geometry.dispose());
      nodeMaterial.dispose();
      edgeMaterial.dispose();
      surfaceMaterial.dispose();
      renderer.dispose();
    },
  };
}

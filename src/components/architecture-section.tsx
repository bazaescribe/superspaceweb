"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import * as THREE from "three";
import styles from "./architecture-section.module.css";

type Level = "infrastructure" | "operational" | "orchestrated";

const levels: readonly { id: Level; title: string; description: string }[] = [
  {
    id: "infrastructure",
    title: "Infrastructure",
    description: "Superspace runs and maintains the reliable, expandable foundation your organization depends on.",
  },
  {
    id: "operational",
    title: "Operational Model",
    description: "Capabilities, objects, relationships and rules are modeled around how your business actually works.",
  },
  {
    id: "orchestrated",
    title: "Orchestrated Work",
    description: "People and AI agents act from the same shared context, with clear actions and boundaries.",
  },
] as const;

type DiagramProps = {
  id: string;
  active: Level | null;
  onHover: (level: Level | null) => void;
  onSelect: (level: Level) => void;
};

function ArchitectureDiagram({ id, active, onHover, onSelect }: DiagramProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const activeRef = useRef(active);
  const hoverRef = useRef(onHover);
  const selectRef = useRef(onSelect);

  useEffect(() => { activeRef.current = active; }, [active]);
  useEffect(() => { hoverRef.current = onHover; selectRef.current = onSelect; }, [onHover, onSelect]);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-5.7, 5.7, 4.25, -4.25, .1, 100);
    camera.position.set(9, 7.35, 9);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    mount.appendChild(renderer.domElement);
    renderer.domElement.className = styles.canvas;
    renderer.domElement.setAttribute("aria-label", "Interactive three-level Superspace architecture diagram");
    renderer.domElement.setAttribute("role", "img");

    const neutral = new THREE.Color(0xffffff);
    const accent = new THREE.Color(0xff55ac);
    const fill = new THREE.Color(0x09090b);
    const blocks: { level: Level; mesh: THREE.Mesh; materials: (THREE.LineBasicMaterial | THREE.MeshBasicMaterial)[]; base: THREE.Vector3; target: THREE.Vector3 }[] = [];
    const hitMeshes: THREE.Mesh[] = [];

    // Square isometric slabs, with face-aligned lettering and the seed's
    // dashed near edges. Details stay parented to their animated solid.
    const addBlock = (level: Level, depth: number, z: number, y: number, title: string | null, lines: string[]) => {
      const width = 4.9;
      const half = width / 2;
      const rear = -depth / 2;
      const front = depth / 2;
      const top = .7;
      const bottom = -.7;
      const geometry = new THREE.BoxGeometry(width, 1.4, depth);
      const material = new THREE.MeshBasicMaterial({ color: fill, transparent: true, opacity: .12, depthWrite: false });
      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.set(0, y, z);
      mesh.userData.level = level;
      scene.add(mesh);
      // Opaque depth-only faces render before all translucent details. Keep
      // occlusion independent of the highlight opacity, including muted levels.
      const occluder = new THREE.Mesh(
        geometry.clone(),
        new THREE.MeshBasicMaterial({
          colorWrite: false,
          depthWrite: true,
          polygonOffset: true,
          polygonOffsetFactor: 1,
          polygonOffsetUnits: 1,
        }),
      );
      occluder.userData.isOccluder = true;
      mesh.add(occluder);
      const materials: (THREE.LineBasicMaterial | THREE.MeshBasicMaterial)[] = [];
      const edge = (points: number[][], dashed = false) => {
        const lineMaterial = dashed
          ? new THREE.LineDashedMaterial({ color: neutral, transparent: true, opacity: 1, dashSize: .13, gapSize: .13, depthWrite: false })
          : new THREE.LineBasicMaterial({ color: neutral, transparent: true, opacity: 1, depthWrite: false });
        const line = new THREE.Line(new THREE.BufferGeometry().setFromPoints(points.map(p => new THREE.Vector3(...p))), lineMaterial);
        line.computeLineDistances();
        mesh.add(line);
        materials.push(lineMaterial);
      };
      // The visible silhouette is solid; the near top ridge and corner are dashed.
      edge([[-half, bottom, front], [-half, top, front], [-half, top, rear], [half, top, rear], [half, bottom, rear], [half, bottom, front], [-half, bottom, front]]);
      edge([[-half, top, front], [half, top, front], [half, top, rear]], true);
      edge([[half, top, front], [half, bottom, front]], true);

      const lettering = (text: string[], face: "top" | "front") => {
        const canvas = document.createElement("canvas");
        canvas.width = 1024;
        canvas.height = face === "top" ? 384 : 128;
        const context = canvas.getContext("2d");
        if (!context) return;
        context.font = `${face === "top" ? 66 : 76}px Inter, sans-serif`;
        context.fillStyle = "white";
        context.textBaseline = "top";
        text.forEach((line, index) => context.fillText(line, 0, index * 78));
        const texture = new THREE.CanvasTexture(canvas);
        texture.colorSpace = THREE.SRGBColorSpace;
        texture.anisotropy = renderer.capabilities.getMaxAnisotropy();
        const labelMaterial = new THREE.MeshBasicMaterial({ map: texture, transparent: true, opacity: 1, depthWrite: false, side: THREE.DoubleSide });
        const label = new THREE.Mesh(new THREE.PlaneGeometry(4.3, face === "top" ? 1.6125 : .5375), labelMaterial);
        if (face === "top") {
          label.rotation.x = -Math.PI / 2;
          label.position.set(0, top + .012, front - 1.1);
        } else {
          label.position.set(0, -.12, front + .012);
        }
        mesh.add(label);
        materials.push(labelMaterial);
      };
      lettering(lines, "top");
      if (title) lettering([title], "front");
      blocks.push({ level, mesh, materials, base: mesh.position.clone(), target: mesh.position.clone() });
      hitMeshes.push(mesh);
    };

    addBlock("infrastructure", 4.9, 0, -2.6, "Infrastructure", ["Database", "Application", "Runtime", "Access Control"]);
    addBlock("operational", 2.45, 1.225, 0, "Operational Model", ["Capabilities", "Flows", "Automations"]);
    addBlock("operational", 2.45, -1.225, 0, null, ["Objects", "Relationships", "Rules"]);
    addBlock("orchestrated", 4.9, 0, 2.6, "Orchestrated Work", ["People", "AI"]);

    const raycaster = new THREE.Raycaster();
    raycaster.layers.enable(1);
    const pointer = new THREE.Vector2();
    const setPointer = (event: PointerEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      pointer.set(((event.clientX - rect.left) / rect.width) * 2 - 1, -((event.clientY - rect.top) / rect.height) * 2 + 1);
      scene.updateMatrixWorld(true);
      raycaster.setFromCamera(pointer, camera);
      const hits = raycaster.intersectObjects(hitMeshes, false);
      // Match the foreground rendering pass when two layers overlap.
      return (hits.find(hit => hit.object.userData.level === activeRef.current) ?? hits[0])?.object.userData.level as Level | undefined;
    };
    let hovered: Level | null = null;
    let leaveTimer: ReturnType<typeof setTimeout> | undefined;
    let press: { x: number; y: number; level: Level | undefined; pointerId: number } | null = null;
    const clearLeave = () => { clearTimeout(leaveTimer); };
    const handleMove = (event: PointerEvent) => {
      if (event.pointerType === "touch") return;
      const next = setPointer(event) ?? null;
      renderer.domElement.style.cursor = next ? "pointer" : "default";
      clearLeave();
      if (next) {
        hovered = next;
        hoverRef.current(next);
      } else if (hovered) {
        // A separating slab can briefly move out from under the pointer.
        leaveTimer = setTimeout(() => { hovered = null; hoverRef.current(null); }, 120);
      }
    };
    const handleLeave = () => {
      clearLeave();
      hovered = null;
      hoverRef.current(null);
      renderer.domElement.style.cursor = "default";
    };
    const handleDown = (event: PointerEvent) => {
      if (!event.isPrimary || event.button !== 0) return;
      press = { x: event.clientX, y: event.clientY, level: setPointer(event), pointerId: event.pointerId };
    };
    const handleUp = (event: PointerEvent) => {
      const start = press;
      press = null;
      if (!start || start.pointerId !== event.pointerId || Math.hypot(event.clientX - start.x, event.clientY - start.y) > 8) return;
      if (start.level) selectRef.current(start.level);
    };
    const handleCancel = () => { press = null; handleLeave(); };
    renderer.domElement.addEventListener("pointermove", handleMove);
    renderer.domElement.addEventListener("pointerleave", handleLeave);
    renderer.domElement.addEventListener("pointerdown", handleDown);
    renderer.domElement.addEventListener("pointerup", handleUp);
    renderer.domElement.addEventListener("pointercancel", handleCancel);

    const resize = () => {
      const { width, height } = mount.getBoundingClientRect();
      renderer.setSize(Math.max(1, width), Math.max(1, height), false);
      const aspect = width / Math.max(height, 1);
      const viewHeight = Math.max(12.2, 9 / aspect);
      camera.top = viewHeight / 2; camera.bottom = -viewHeight / 2;
      camera.left = -viewHeight * aspect / 2; camera.right = viewHeight * aspect / 2;
      camera.updateProjectionMatrix();
    };
    const observer = new ResizeObserver(resize);
    observer.observe(mount); resize();

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    const clock = new THREE.Clock();
    const animate = () => {
      const dt = Math.min(clock.getDelta(), .05);
      const selected = activeRef.current;
      for (const block of blocks) {
        block.target.copy(block.base);
        if (selected === "infrastructure" && block.level === "infrastructure") block.target.y -= .64;
        if (selected === "orchestrated" && block.level === "orchestrated") block.target.y += .64;
        if (selected === "operational") {
          if (block.level === "infrastructure") block.target.y -= .44;
          if (block.level === "orchestrated") block.target.y += .44;
          if (block.level === "operational") block.target.z += block.base.z < 0 ? -.48 : .48;
        }
        const emphasis = !selected || block.level === selected;
        // Selected solids get their own depth pass so other levels cannot
        // obscure them. Their faces still occlude their own hidden details.
        const foreground = selected === block.level;
        block.mesh.traverse((object) => {
          object.layers.set(foreground ? 1 : 0);
          // Keep selected faces in the base depth pass too: background
          // details behind the selected solid must remain hidden.
          if (foreground && object.userData.isOccluder) object.layers.enable(0);
        });
        const meshMaterial = block.mesh.material as THREE.MeshBasicMaterial;
        const detailOpacity = emphasis ? 1 : .04;
        const speed = reduceMotion.matches ? 1 : 1 - Math.exp(-dt * 9);
        block.mesh.position.lerp(block.target, speed);
        for (const detail of block.materials) {
          detail.color.lerp(selected && emphasis ? accent : neutral, speed);
          detail.opacity += (detailOpacity - detail.opacity) * speed;
        }
        meshMaterial.color.lerp(selected && emphasis ? accent : fill, speed);
        meshMaterial.opacity += ((selected && emphasis ? .035 : .015) - meshMaterial.opacity) * speed;
      }
      camera.layers.set(0);
      renderer.render(scene, camera);
      if (selected) {
        renderer.autoClear = false;
        renderer.clearDepth();
        camera.layers.set(1);
        renderer.render(scene, camera);
        renderer.autoClear = true;
        camera.layers.set(0);
      }
      frame = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(frame); observer.disconnect();
      renderer.domElement.removeEventListener("pointermove", handleMove);
      renderer.domElement.removeEventListener("pointerleave", handleLeave);
      clearLeave();
      renderer.domElement.removeEventListener("pointerdown", handleDown);
      renderer.domElement.removeEventListener("pointerup", handleUp);
      renderer.domElement.removeEventListener("pointercancel", handleCancel);
      scene.traverse((object) => {
        if (object instanceof THREE.Mesh || object instanceof THREE.Line) {
          object.geometry.dispose();
          const materials = Array.isArray(object.material) ? object.material : [object.material];
          for (const material of materials) {
            if (material instanceof THREE.MeshBasicMaterial) material.map?.dispose();
            material.dispose();
          }
        }
      });
      renderer.dispose(); renderer.domElement.remove();
    };
  }, []);

  return <div id={id} ref={mountRef} className={styles.diagram}><span className={styles.hint}>Hover or tap a level</span></div>;
}

export function ArchitectureSection() {
  const [optionHover, setOptionHover] = useState<Level | null>(null);
  const [diagramHover, setDiagramHover] = useState<Level | null>(null);
  const [focused, setFocused] = useState<Level | null>(null);
  const [selected, setSelected] = useState<Level | null>(null);
  const active = optionHover ?? diagramHover ?? focused ?? selected;
  const id = useId();
  const select = useCallback((level: Level) => setSelected((current) => current === level ? null : level), []);

  return (
    <div className={styles.section} onPointerLeave={() => { setOptionHover(null); setDiagramHover(null); }}
      onKeyDown={(event) => {
        if (event.key === "Escape") {
          setSelected(null); setOptionHover(null); setDiagramHover(null); setFocused(null);
        }
      }}>
      <div className={styles.navigation} role="group" aria-label="Architecture levels">
        {levels.map((level) => (
          <button
            type="button"
            key={level.id}
            className={styles.option}
            aria-pressed={selected === level.id}
            aria-controls={`${id}-diagram`}
            data-muted={active !== null && active !== level.id}
            data-active={active === level.id}
            onPointerEnter={(event) => {
              if (event.pointerType === "touch") return;
              setDiagramHover(null);
              setOptionHover(level.id);
              setFocused(null);
            }}
            onPointerLeave={() => setOptionHover(null)}
            onFocus={(event) => {
              if (event.currentTarget.matches(":focus-visible")) {
                setOptionHover(null);
                setDiagramHover(null);
                setFocused(level.id);
              }
            }}
            onBlur={() => setFocused(null)}
            onClick={() => select(level.id)}
          >
            <strong>{level.title}</strong><span>{level.description}</span>
          </button>
        ))}
      </div>
      <ArchitectureDiagram id={`${id}-diagram`} active={active} onHover={setDiagramHover} onSelect={select} />
    </div>
  );
}

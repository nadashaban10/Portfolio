import * as THREE from "three";
import { latticeNodes } from "../../data/site";

const LAYOUT = {
  react: { position: [0, 0.15, 0], scale: 0.78, core: true },
  next: { position: [-1.28, 0.78, 0.2], scale: 0.52 },
  angular: { position: [1.24, 0.82, -0.08], scale: 0.52 },
  typescript: { position: [0.12, -1.12, 0.28], scale: 0.5 },
  javascript: { position: [-1.02, -0.46, -0.42], scale: 0.48 },
  css: { position: [1.08, -0.32, 0.5], scale: 0.48 },
  html: { position: [0.18, 1.28, -0.38], scale: 0.48 },
};

const EDGES = [
  ["react", "next"],
  ["react", "angular"],
  ["react", "typescript"],
  ["react", "javascript"],
  ["react", "css"],
  ["react", "html"],
  ["next", "javascript"],
  ["angular", "typescript"],
  ["html", "next"],
  ["css", "javascript"],
];

const COPPER = "#e0a15a";
const IVORY = "#f4f0e6";
const SAGE = "#8fbfb2";

function roundPlate(ctx) {
  ctx.beginPath();
  ctx.arc(128, 128, 112, 0, Math.PI * 2);
  ctx.fillStyle = "rgba(23, 21, 18, 0.94)";
  ctx.fill();
  ctx.lineWidth = 5;
  ctx.strokeStyle = "rgba(244, 240, 230, 0.28)";
  ctx.stroke();
}

function drawReact(ctx) {
  roundPlate(ctx);
  ctx.save();
  ctx.translate(128, 128);
  ctx.strokeStyle = COPPER;
  ctx.fillStyle = COPPER;
  ctx.lineWidth = 7;
  for (let index = 0; index < 3; index += 1) {
    ctx.save();
    ctx.rotate((index * Math.PI) / 3);
    ctx.beginPath();
    ctx.ellipse(0, 0, 68, 24, 0, 0, Math.PI * 2);
    ctx.stroke();
    ctx.restore();
  }
  ctx.beginPath();
  ctx.arc(0, 0, 8, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

function drawNext(ctx) {
  roundPlate(ctx);
  ctx.strokeStyle = IVORY;
  ctx.lineWidth = 16;
  ctx.lineCap = "butt";
  ctx.beginPath();
  ctx.moveTo(84, 172);
  ctx.lineTo(84, 84);
  ctx.lineTo(172, 172);
  ctx.lineTo(172, 84);
  ctx.stroke();
}

function drawLetters(ctx, letters, color) {
  roundPlate(ctx);
  ctx.fillStyle = color;
  const size = letters.length >= 4 ? 44 : letters.length > 2 ? 58 : 78;
  ctx.font = `700 ${size}px Segoe UI, sans-serif`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(letters, 128, 134);
}

function drawAngular(ctx) {
  roundPlate(ctx);
  ctx.strokeStyle = COPPER;
  ctx.fillStyle = COPPER;
  ctx.lineWidth = 12;
  ctx.lineJoin = "round";
  ctx.lineCap = "round";
  ctx.beginPath();
  ctx.moveTo(128, 68);
  ctx.lineTo(186, 176);
  ctx.moveTo(128, 68);
  ctx.lineTo(70, 176);
  ctx.moveTo(96, 140);
  ctx.lineTo(160, 140);
  ctx.stroke();
}

function drawCss(ctx) {
  drawLetters(ctx, "CSS", SAGE);
}

function drawHtml(ctx) {
  drawLetters(ctx, "HTML", IVORY);
}

const DRAW = {
  react: drawReact,
  next: drawNext,
  typescript: (ctx) => drawLetters(ctx, "TS", SAGE),
  angular: drawAngular,
  javascript: (ctx) => drawLetters(ctx, "JS", IVORY),
  css: drawCss,
  html: drawHtml,
};

function iconTexture(id) {
  const canvas = document.createElement("canvas");
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext("2d");
  (DRAW[id] || drawLetters)(ctx, id.slice(0, 2).toUpperCase(), IVORY);
  if (id === "react") {
    ctx.beginPath();
    ctx.arc(128, 128, 112, 0, Math.PI * 2);
    ctx.lineWidth = 6;
    ctx.strokeStyle = COPPER;
    ctx.stroke();
  }
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 4;
  return texture;
}

export function mountLattice(canvas, { reduced, onHover }) {
  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
    alpha: true,
    powerPreference: "high-performance",
  });
  renderer.setClearColor(0x000000, 0);
  renderer.outputColorSpace = THREE.SRGBColorSpace;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 20);
  camera.position.set(0, 0.15, 4.6);

  const ambient = new THREE.AmbientLight(0xfff6ea, 0.55);
  const key = new THREE.DirectionalLight(0xffffff, 1.35);
  key.position.set(2.4, 3.2, 4);
  const rim = new THREE.DirectionalLight(0x8fbfb2, 0.45);
  rim.position.set(-3, -1, -2);
  const point = new THREE.PointLight(0xe0a15a, 6, 8);
  point.position.set(0.4, 0.2, 2.2);
  scene.add(ambient, key, rim, point);

  const group = new THREE.Group();
  scene.add(group);

  const geometries = [];
  const materials = [];
  const textures = [];
  const meshes = new Map();

  latticeNodes.forEach((node, index) => {
    const layout = LAYOUT[node.id];
    if (!layout) return;
    const texture = iconTexture(node.id);
    const material = new THREE.SpriteMaterial({
      map: texture,
      transparent: true,
      depthWrite: false,
    });
    const sprite = new THREE.Sprite(material);
    sprite.position.set(...layout.position);
    sprite.scale.setScalar(layout.scale);
    sprite.userData = {
      id: node.id,
      base: layout.scale,
      baseY: layout.position[1],
      phase: index * 0.9,
    };
    group.add(sprite);
    meshes.set(node.id, sprite);
    textures.push(texture);
    materials.push(material);
  });

  const linePositions = [];
  EDGES.forEach(([from, to]) => {
    const a = LAYOUT[from]?.position;
    const b = LAYOUT[to]?.position;
    if (!a || !b) return;
    linePositions.push(...a, ...b);
  });
  const lineGeometry = new THREE.BufferGeometry();
  lineGeometry.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(linePositions, 3)
  );
  const lineMaterial = new THREE.LineBasicMaterial({
    color: 0xe7e1d6,
    transparent: true,
    opacity: 0.38,
  });
  const lines = new THREE.LineSegments(lineGeometry, lineMaterial);
  group.add(lines);
  geometries.push(lineGeometry);
  materials.push(lineMaterial);

  const pointer = new THREE.Vector2();
  const raycaster = new THREE.Raycaster();
  let pointerX = 0;
  let pointerY = 0;
  let spin = 0;
  let hovered = null;
  let frame = 0;
  let visible = true;
  let running = !reduced;

  const resize = () => {
    const width = canvas.clientWidth || 1;
    const height = canvas.clientHeight || 1;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
    renderer.setSize(width, height, false);
    if (!running) renderer.render(scene, camera);
  };

  const applyHighlight = (id) => {
    meshes.forEach((sprite) => {
      const active = Boolean(id) && sprite.userData.id === id;
      sprite.scale.setScalar(sprite.userData.base * (active ? 1.28 : 1));
      sprite.material.opacity = !id || active ? 1 : 0.42;
    });
    lineMaterial.opacity = id ? 0.72 : 0.34;
  };

  const tick = () => {
    if (!running || !visible) {
      frame = 0;
      return;
    }
    if (!reduced) {
      spin += 0.0026;
      group.rotation.y += (spin + pointerX - group.rotation.y) * 0.06;
      group.rotation.x += (pointerY - group.rotation.x) * 0.06;
      meshes.forEach((sprite) => {
        sprite.position.y = sprite.userData.baseY + Math.sin(spin * 1.7 + sprite.userData.phase) * 0.05;
      });
      const lineArray = lineGeometry.attributes.position.array;
      let cursor = 0;
      EDGES.forEach(([from, to]) => {
        const start = meshes.get(from);
        const end = meshes.get(to);
        if (!start || !end) return;
        lineArray[cursor] = start.position.x;
        lineArray[cursor + 1] = start.position.y;
        lineArray[cursor + 2] = start.position.z;
        lineArray[cursor + 3] = end.position.x;
        lineArray[cursor + 4] = end.position.y;
        lineArray[cursor + 5] = end.position.z;
        cursor += 6;
      });
      lineGeometry.attributes.position.needsUpdate = true;
    }
    renderer.render(scene, camera);
    frame = requestAnimationFrame(tick);
  };

  const start = () => {
    if (frame || !running || !visible) return;
    frame = requestAnimationFrame(tick);
  };

  const setPointer = (event) => {
    const rect = canvas.getBoundingClientRect();
    pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
  };

  const pick = (event) => {
    setPointer(event);
    if (!reduced) {
      pointerX = pointer.x * 0.4;
      pointerY = pointer.y * 0.22;
    }
    raycaster.setFromCamera(pointer, camera);
    const hit = raycaster.intersectObjects([...meshes.values()])[0];
    const id = hit?.object.userData.id ?? null;
    if (id !== hovered) {
      hovered = id;
      onHover?.(id);
    }
  };

  const onClick = () => onHover?.(hovered, true);
  const onLeave = () => {
    hovered = null;
    pointerX = 0;
    pointerY = 0;
    onHover?.(null);
  };

  const observer = new ResizeObserver(resize);
  observer.observe(canvas.parentElement || canvas);
  resize();

  const visibility = new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    if (visible) start();
  });
  visibility.observe(canvas);

  canvas.addEventListener("pointermove", pick);
  canvas.addEventListener("pointerleave", onLeave);
  canvas.addEventListener("click", onClick);

  applyHighlight(null);
  renderer.render(scene, camera);
  start();

  return {
    highlight(id) {
      applyHighlight(id);
      if (!running) renderer.render(scene, camera);
    },
    destroy() {
      running = false;
      cancelAnimationFrame(frame);
      observer.disconnect();
      visibility.disconnect();
      canvas.removeEventListener("pointermove", pick);
      canvas.removeEventListener("pointerleave", onLeave);
      canvas.removeEventListener("click", onClick);
      geometries.forEach((geometry) => geometry.dispose());
      materials.forEach((material) => material.dispose());
      textures.forEach((texture) => texture.dispose());
      renderer.dispose();
    },
  };
}

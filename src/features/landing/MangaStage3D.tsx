import { useEffect, useRef, useState, useCallback } from "react";
import * as THREE from "three";
import type { PopularComic } from "@/common/interface";

interface MangaStage3DProps {
  comics: PopularComic[];
  selectedIndex: number;
  onSelectIndex: (index: number) => void;
  onReadComic: (comic: PopularComic) => void;
  onOpenSeries: (comic: PopularComic) => void;
}

type InspectionAngle = "front" | "spine" | "back";

const COUNTRY_LABEL: Record<string, { code: string; format: string; accent: string }> = {
  JP: { code: "JP", format: "MANGA", accent: "#e11d48" },
  KR: { code: "KR", format: "MANHWA", accent: "#f97316" },
  CN: { code: "CN", format: "MANHUA", accent: "#eab308" },
};

function createPaperEdgeTexture(vertical = true): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = vertical ? 128 : 512;
  canvas.height = vertical ? 512 : 128;
  const ctx = canvas.getContext("2d");

  if (ctx) {
    ctx.fillStyle = "#e6e0d2";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const count = vertical ? 44 : 44;
    for (let i = 0; i < count; i++) {
      const ratio = i / count;
      const shade = i % 2 === 0 ? "rgba(24, 24, 28, 0.16)" : "rgba(255, 252, 245, 0.35)";
      ctx.fillStyle = shade;
      if (vertical) {
        const x = Math.floor(ratio * canvas.width);
        ctx.fillRect(x, 0, 1.5, canvas.height);
      } else {
        const y = Math.floor(ratio * canvas.height);
        ctx.fillRect(0, y, canvas.width, 1.5);
      }
    }

    // Subtle binding shadow near spine edge
    const grad = vertical
      ? ctx.createLinearGradient(0, 0, canvas.width, 0)
      : ctx.createLinearGradient(0, 0, 0, canvas.height);
    grad.addColorStop(0, "rgba(10, 10, 14, 0.35)");
    grad.addColorStop(0.15, "rgba(10, 10, 14, 0.05)");
    grad.addColorStop(0.85, "rgba(10, 10, 14, 0.05)");
    grad.addColorStop(1, "rgba(10, 10, 14, 0.28)");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

function createSpineTexture(comic: PopularComic, index: number): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = 160;
  canvas.height = 1024;
  const ctx = canvas.getContext("2d");

  const meta = COUNTRY_LABEL[comic.country_id] || {
    code: "ID",
    format: "KOMIK",
    accent: "#e11d48",
  };
  const volNum = String(index + 1).padStart(2, "0");

  if (ctx) {
    // Deep ink base
    ctx.fillStyle = "#0d0d11";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Top vermilion / country accent block
    ctx.fillStyle = meta.accent;
    ctx.fillRect(0, 0, canvas.width, 148);

    // Volume number in top block
    ctx.fillStyle = "#09090b";
    ctx.font = "900 22px 'Chivo Mono', monospace";
    ctx.textAlign = "center";
    ctx.fillText("VOL", canvas.width / 2, 46);

    ctx.font = "900 64px 'Big Shoulders Display', Impact, sans-serif";
    ctx.fillText(volNum, canvas.width / 2, 118);

    // Hairline rule
    ctx.fillStyle = "#f4f1ea";
    ctx.fillRect(20, 168, canvas.width - 40, 2);

    // Country & format tag
    ctx.fillStyle = "#c8c2b6";
    ctx.font = "700 18px 'Chivo Mono', monospace";
    ctx.fillText(`${meta.code}·${meta.format}`, canvas.width / 2, 204);

    // Vertical rotated title along the spine
    ctx.save();
    ctx.translate(canvas.width / 2, 560);
    ctx.rotate(-Math.PI / 2);
    ctx.fillStyle = "#f4f1ea";
    ctx.font = "800 42px 'Big Shoulders Display', Impact, sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    const cleanTitle = comic.title.length > 28 ? comic.title.slice(0, 26) + ".." : comic.title;
    ctx.fillText(cleanTitle.toUpperCase(), 0, 0);
    ctx.restore();

    // Bottom chapter badge & publisher colophon
    ctx.strokeStyle = "#27272e";
    ctx.lineWidth = 2;
    ctx.strokeRect(20, 850, canvas.width - 40, 96);

    ctx.fillStyle = meta.accent;
    ctx.font = "700 18px 'Chivo Mono', monospace";
    ctx.fillText("CH.TERBARU", canvas.width / 2, 885);

    ctx.fillStyle = "#f4f1ea";
    ctx.font = "800 34px 'Chivo Mono', monospace";
    ctx.fillText(String(comic.latest_chapter_number), canvas.width / 2, 928);

    // Bottom Hanko stamp
    ctx.fillStyle = "#71717a";
    ctx.font = "600 15px 'Chivo Mono', monospace";
    ctx.fillText("KR·PRESS", canvas.width / 2, 990);

    // Left/Right spine edge highlights
    const edgeGrad = ctx.createLinearGradient(0, 0, canvas.width, 0);
    edgeGrad.addColorStop(0, "rgba(255,255,255,0.12)");
    edgeGrad.addColorStop(0.12, "rgba(255,255,255,0)");
    edgeGrad.addColorStop(0.88, "rgba(0,0,0,0)");
    edgeGrad.addColorStop(1, "rgba(0,0,0,0.45)");
    ctx.fillStyle = edgeGrad;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

function createBackCoverTexture(comic: PopularComic, index: number): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 768;
  const ctx = canvas.getContext("2d");

  const meta = COUNTRY_LABEL[comic.country_id] || {
    code: "ID",
    format: "KOMIK",
    accent: "#e11d48",
  };
  const volNum = String(index + 1).padStart(2, "0");

  if (ctx) {
    // Obsidian paper ground
    ctx.fillStyle = "#101014";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Structural editorial frame
    ctx.strokeStyle = "#27272e";
    ctx.lineWidth = 3;
    ctx.strokeRect(28, 28, canvas.width - 56, canvas.height - 56);

    // Top accent bar
    ctx.fillStyle = meta.accent;
    ctx.fillRect(28, 28, canvas.width - 56, 12);

    // Header colophon
    ctx.fillStyle = "#c8c2b6";
    ctx.font = "700 18px 'Chivo Mono', monospace";
    ctx.fillText(`ARSIP CETAK // VOL.${volNum} // ${meta.format}`, 52, 82);

    // Title
    ctx.fillStyle = "#f4f1ea";
    ctx.font = "800 40px 'Big Shoulders Display', Impact, sans-serif";
    const words = comic.title.toUpperCase().split(" ");
    let line = "";
    let y = 145;
    for (let i = 0; i < words.length; i++) {
      const test = line + words[i] + " ";
      if (ctx.measureText(test).width > 400 && i > 0) {
        ctx.fillText(line.trim(), 52, y);
        line = words[i] + " ";
        y += 46;
        if (y > 240) break;
      } else {
        line = test;
      }
    }
    if (line.trim() && y <= 240) {
      ctx.fillText(line.trim(), 52, y);
    }

    // Divider line
    ctx.fillStyle = meta.accent;
    ctx.fillRect(52, 265, 96, 4);

    // Synopsis text
    ctx.fillStyle = "#c8c2b6";
    ctx.font = "400 20px 'Barlow', sans-serif";
    const desc =
      comic.description?.trim() ||
      `Edisi digital ${meta.format} rilisan tahun ${comic.release_year || "terbaru"}. Tersedia hingga Chapter ${comic.latest_chapter_number} dalam Bahasa Indonesia.`;
    const descWords = desc.split(/\s+/);
    let dLine = "";
    let dy = 315;
    for (let i = 0; i < descWords.length; i++) {
      const test = dLine + descWords[i] + " ";
      if (ctx.measureText(test).width > 400 && i > 0) {
        ctx.fillText(dLine.trim(), 52, dy);
        dLine = descWords[i] + " ";
        dy += 30;
        if (dy > 520) {
          dLine = dLine.trim() + "...";
          break;
        }
      } else {
        dLine = test;
      }
    }
    if (dLine.trim() && dy <= 550) {
      ctx.fillText(dLine.trim(), 52, dy);
    }

    // Bottom barcode & metadata block
    ctx.fillStyle = "#18181f";
    ctx.fillRect(52, 590, canvas.width - 104, 118);
    ctx.strokeStyle = "#27272e";
    ctx.strokeRect(52, 590, canvas.width - 104, 118);

    // Barcode lines
    ctx.fillStyle = "#f4f1ea";
    for (let b = 0; b < 32; b++) {
      const bw = b % 3 === 0 ? 4 : b % 2 === 0 ? 2 : 1;
      ctx.fillRect(72 + b * 6, 612, bw, 56);
    }
    ctx.font = "600 14px 'Chivo Mono', monospace";
    ctx.fillText(`KR-${comic.country_id}-${volNum}-${comic.latest_chapter_number}`, 72, 688);

    // Rating stamp on right
    ctx.fillStyle = meta.accent;
    ctx.font = "800 36px 'Chivo Mono', monospace";
    ctx.textAlign = "right";
    ctx.fillText(`★ ${comic.user_rate ? comic.user_rate.toFixed(1) : "4.8"}`, canvas.width - 72, 648);
    ctx.fillStyle = "#c8c2b6";
    ctx.font = "600 15px 'Chivo Mono', monospace";
    ctx.fillText(`CH. ${comic.latest_chapter_number}`, canvas.width - 72, 680);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

function drawFrontCoverCanvas(
  ctx: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement,
  comic: PopularComic,
  index: number,
  img?: HTMLImageElement
) {
  const meta = COUNTRY_LABEL[comic.country_id] || {
    code: "ID",
    format: "KOMIK",
    accent: "#e11d48",
  };
  const volNum = String(index + 1).padStart(2, "0");

  // Base background
  ctx.fillStyle = "#121217";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  if (img) {
    // Draw cover image with aspect-fill
    const imgRatio = img.width / img.height;
    const targetHeight = canvas.height;
    const targetRatio = canvas.width / targetHeight;
    let drawW = canvas.width;
    let drawH = targetHeight;
    let offsetX = 0;
    let offsetY = 0;

    if (imgRatio > targetRatio) {
      drawW = targetHeight * imgRatio;
      offsetX = -(drawW - canvas.width) / 2;
    } else {
      drawH = canvas.width / imgRatio;
      offsetY = -(drawH - targetHeight) / 2;
    }

    ctx.drawImage(img, offsetX, offsetY, drawW, drawH);
  } else {
    // Procedural geometric manga cover fallback while image loads
    ctx.strokeStyle = "#27272e";
    ctx.lineWidth = 4;
    ctx.strokeRect(24, 24, canvas.width - 48, canvas.height - 48);

    // Diagonal manga panel slash
    ctx.beginPath();
    ctx.moveTo(24, 420);
    ctx.lineTo(canvas.width - 24, 260);
    ctx.strokeStyle = meta.accent;
    ctx.lineWidth = 3;
    ctx.stroke();

    ctx.fillStyle = meta.accent;
    ctx.font = "900 110px 'Big Shoulders Display', Impact, sans-serif";
    ctx.fillText(volNum, 48, 160);

    ctx.fillStyle = "#f4f1ea";
    ctx.font = "800 44px 'Big Shoulders Display', Impact, sans-serif";
    const words = comic.title.toUpperCase().split(" ");
    let line = "";
    let y = 470;
    for (let i = 0; i < words.length; i++) {
      const test = line + words[i] + " ";
      if (ctx.measureText(test).width > 410 && i > 0) {
        ctx.fillText(line.trim(), 48, y);
        line = words[i] + " ";
        y += 50;
        if (y > 580) break;
      } else {
        line = test;
      }
    }
    if (line.trim() && y <= 580) {
      ctx.fillText(line.trim(), 48, y);
    }
  }

  // Top-left Tankobon Issue Stamp
  ctx.fillStyle = "rgba(9, 9, 11, 0.88)";
  ctx.fillRect(0, 24, 154, 44);
  ctx.fillStyle = meta.accent;
  ctx.fillRect(0, 24, 8, 44);
  ctx.fillStyle = "#f4f1ea";
  ctx.font = "700 20px 'Chivo Mono', monospace";
  ctx.textAlign = "left";
  ctx.fillText(`${meta.format} #${volNum}`, 20, 53);

  // Authentic Japanese/Korean Tankobon Obi Strip (belly band) at bottom
  const obiY = canvas.height - 134;
  ctx.fillStyle = "rgba(9, 9, 11, 0.94)";
  ctx.fillRect(0, obiY, canvas.width, 134);

  // Obi top vermilion rule
  ctx.fillStyle = meta.accent;
  ctx.fillRect(0, obiY, canvas.width, 5);

  // Obi Title & Metadata
  ctx.fillStyle = "#f4f1ea";
  ctx.font = "800 28px 'Big Shoulders Display', Impact, sans-serif";
  const shortTitle = comic.title.length > 26 ? comic.title.slice(0, 24) + "..." : comic.title;
  ctx.fillText(shortTitle.toUpperCase(), 26, obiY + 46);

  ctx.fillStyle = "#c8c2b6";
  ctx.font = "600 18px 'Chivo Mono', monospace";
  ctx.fillText(`CH. ${comic.latest_chapter_number} TERSEDIA`, 26, obiY + 82);

  if (comic.rank) {
    ctx.fillStyle = meta.accent;
    ctx.font = "700 16px 'Chivo Mono', monospace";
    ctx.fillText(`PERINGKAT #${comic.rank}`, 26, obiY + 112);
  }

  // Right Obi Rating Seal
  ctx.fillStyle = meta.accent;
  ctx.fillRect(canvas.width - 130, obiY + 22, 106, 90);
  ctx.fillStyle = "#09090b";
  ctx.font = "800 15px 'Chivo Mono', monospace";
  ctx.textAlign = "center";
  ctx.fillText("RATING", canvas.width - 77, obiY + 48);
  ctx.font = "900 34px 'Big Shoulders Display', Impact, sans-serif";
  ctx.fillText(
    comic.user_rate ? comic.user_rate.toFixed(1) : "4.8",
    canvas.width - 77,
    obiY + 92
  );
  ctx.textAlign = "left";

  // Realistic book spine hinge crease shadow on the left edge of the front cover
  const creaseGrad = ctx.createLinearGradient(0, 0, 36, 0);
  creaseGrad.addColorStop(0, "rgba(0, 0, 0, 0.65)");
  creaseGrad.addColorStop(0.45, "rgba(0, 0, 0, 0.18)");
  creaseGrad.addColorStop(0.55, "rgba(255, 255, 255, 0.14)");
  creaseGrad.addColorStop(0.75, "rgba(0, 0, 0, 0.22)");
  creaseGrad.addColorStop(1, "rgba(0, 0, 0, 0)");
  ctx.fillStyle = creaseGrad;
  ctx.fillRect(0, 0, 36, canvas.height);
}

export default function MangaStage3D({
  comics,
  selectedIndex,
  onSelectIndex,
  onOpenSeries,
}: MangaStage3DProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const [webglSupported, setWebglSupported] = useState(true);
  const [inspectionAngle, setInspectionAngle] = useState<InspectionAngle>("front");
  const [userRotationOffset, setUserRotationOffset] = useState(0);

  // Refs synced into the animation loop
  const selectedIndexRef = useRef(selectedIndex);
  selectedIndexRef.current = selectedIndex;

  const inspectionAngleRef = useRef<InspectionAngle>(inspectionAngle);
  inspectionAngleRef.current = inspectionAngle;

  const userRotationRef = useRef(userRotationOffset);
  userRotationRef.current = userRotationOffset;

  const onSelectRef = useRef(onSelectIndex);
  onSelectRef.current = onSelectIndex;

  const stageComics = comics.slice(0, 7);

  // Reset manual spin when switching books
  const handleSelectBook = useCallback(
    (idx: number) => {
      setUserRotationOffset(0);
      setInspectionAngle("front");
      onSelectIndex(idx);
    },
    [onSelectIndex]
  );

  useEffect(() => {
    const container = mountRef.current;
    if (!container || stageComics.length === 0) return;

    // Check WebGL availability
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
      });
    } catch {
      setWebglSupported(false);
      return;
    }

    const width = container.clientWidth || 720;
    const height = container.clientHeight || 520;
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.12;

    container.innerHTML = "";
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 50);
    camera.position.set(0, 0.15, 6.3);

    // 3-Point Darkroom Studio Lighting
    const ambientLight = new THREE.AmbientLight(0xfff6eb, 0.72);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xfffdf8, 2.0);
    keyLight.position.set(3.5, 4.5, 5.5);
    scene.add(keyLight);

    const safelightRim = new THREE.PointLight(0xe11d48, 3.2, 15);
    safelightRim.position.set(-3.8, 1.8, 2.2);
    scene.add(safelightRim);

    const warmFill = new THREE.PointLight(0xf97316, 1.35, 12);
    warmFill.position.set(2.8, -2.2, 3.0);
    scene.add(warmFill);

    // Subtle Darkroom Plinth Ring under the books
    const ringGeo = new THREE.RingGeometry(1.4, 3.6, 48);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0x27272e,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.35,
    });
    const plinthRing = new THREE.Mesh(ringGeo, ringMat);
    plinthRing.rotation.x = -Math.PI / 2;
    plinthRing.position.set(0, -1.78, -0.4);
    scene.add(plinthRing);

    const innerRingGeo = new THREE.RingGeometry(0.95, 1.0, 48);
    const innerRingMat = new THREE.MeshBasicMaterial({
      color: 0xe11d48,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.45,
    });
    const innerRing = new THREE.Mesh(innerRingGeo, innerRingMat);
    innerRing.rotation.x = -Math.PI / 2;
    innerRing.position.set(-0.2, -1.76, 1.35);
    scene.add(innerRing);

    // Floating Atmospheric Paper/Ink Dust Particles
    const particleCount = 72;
    const particlePositions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      particlePositions[i * 3] = (Math.random() - 0.5) * 9;
      particlePositions[i * 3 + 1] = (Math.random() - 0.5) * 5;
      particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 5 - 0.5;
    }
    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute("position", new THREE.BufferAttribute(particlePositions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0xe11d48,
      size: 0.038,
      transparent: true,
      opacity: 0.55,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // Shared geometries & page textures
    const bookGeo = new THREE.BoxGeometry(1.88, 2.76, 0.34);
    const foreEdgeTex = createPaperEdgeTexture(true);
    const topBottomEdgeTex = createPaperEdgeTexture(false);

    const foreEdgeMat = new THREE.MeshStandardMaterial({
      map: foreEdgeTex,
      roughness: 0.86,
      metalness: 0.02,
    });
    const topBottomEdgeMat = new THREE.MeshStandardMaterial({
      map: topBottomEdgeTex,
      roughness: 0.9,
      metalness: 0.02,
    });

    const bookMeshes: THREE.Mesh[] = [];
    const disposableTextures: THREE.Texture[] = [foreEdgeTex, topBottomEdgeTex];
    const disposableMaterials: THREE.Material[] = [
      ringMat,
      innerRingMat,
      particleMat,
      foreEdgeMat,
      topBottomEdgeMat,
    ];

    let isDisposed = false;

    stageComics.forEach((comic, index) => {
      // Front cover canvas & texture
      const frontCanvas = document.createElement("canvas");
      frontCanvas.width = 512;
      frontCanvas.height = 768;
      const frontCtx = frontCanvas.getContext("2d");
      if (frontCtx) {
        drawFrontCoverCanvas(frontCtx, frontCanvas, comic, index);
      }
      const frontTex = new THREE.CanvasTexture(frontCanvas);
      frontTex.colorSpace = THREE.SRGBColorSpace;
      disposableTextures.push(frontTex);

      // Load real cover artwork via same-origin proxy (/api/cover)
      const rawCoverUrl = comic.cover_portrait_url || comic.cover_image_url;
      if (rawCoverUrl) {
        const img = new Image();
        img.crossOrigin = "anonymous";
        img.onload = () => {
          if (isDisposed || !frontCtx) return;
          drawFrontCoverCanvas(frontCtx, frontCanvas, comic, index, img);
          frontTex.needsUpdate = true;
        };
        img.src = `/api/cover?url=${encodeURIComponent(rawCoverUrl)}`;
      }

      const spineTex = createSpineTexture(comic, index);
      const backTex = createBackCoverTexture(comic, index);
      disposableTextures.push(spineTex, backTex);

      const frontMat = new THREE.MeshStandardMaterial({
        map: frontTex,
        roughness: 0.28,
        metalness: 0.08,
      });
      const spineMat = new THREE.MeshStandardMaterial({
        map: spineTex,
        roughness: 0.35,
        metalness: 0.08,
      });
      const backMat = new THREE.MeshStandardMaterial({
        map: backTex,
        roughness: 0.38,
        metalness: 0.06,
      });

      disposableMaterials.push(frontMat, spineMat, backMat);

      // BoxGeometry material order: [+x (fore-edge), -x (spine), +y (top), -y (bottom), +z (front), -z (back)]
      const materials = [
        foreEdgeMat,
        spineMat,
        topBottomEdgeMat,
        topBottomEdgeMat,
        frontMat,
        backMat,
      ];

      const mesh = new THREE.Mesh(bookGeo, materials);
      mesh.userData = { index, comic };
      scene.add(mesh);
      bookMeshes.push(mesh);
    });

    // Pointer, Raycaster & Drag state
    const raycaster = new THREE.Raycaster();
    const pointer = new THREE.Vector2(0, 0);
    let targetPointerX = 0;
    let targetPointerY = 0;
    let currentPointerX = 0;
    let currentPointerY = 0;

    let isDragging = false;
    let dragStartX = 0;
    let dragMoved = false;

    const handlePointerDown = (e: PointerEvent) => {
      isDragging = true;
      dragMoved = false;
      dragStartX = e.clientX;
    };

    const handlePointerMove = (e: PointerEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      targetPointerX = Math.max(-1, Math.min(1, x));
      targetPointerY = Math.max(-1, Math.min(1, y));

      if (isDragging) {
        const deltaX = e.clientX - dragStartX;
        if (Math.abs(deltaX) > 6) {
          dragMoved = true;
          dragStartX = e.clientX;
          setUserRotationOffset((prev) => prev + deltaX * 0.012);
        }
      } else {
        // Hover cursor feedback
        pointer.set(x, y);
        raycaster.setFromCamera(pointer, camera);
        const intersects = raycaster.intersectObjects(bookMeshes, false);
        renderer.domElement.style.cursor = intersects.length > 0 ? "pointer" : "grab";
      }
    };

    const handlePointerUp = (e: PointerEvent) => {
      if (!isDragging) return;
      isDragging = false;

      if (!dragMoved) {
        const rect = renderer.domElement.getBoundingClientRect();
        pointer.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        pointer.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
        raycaster.setFromCamera(pointer, camera);
        const intersects = raycaster.intersectObjects(bookMeshes, false);
        if (intersects.length > 0) {
          const hitIndex = intersects[0].object.userData.index;
          if (typeof hitIndex === "number") {
            setUserRotationOffset(0);
            setInspectionAngle("front");
            onSelectRef.current(hitIndex);
          }
        }
      }
    };

    const handlePointerLeave = () => {
      isDragging = false;
      targetPointerX = 0;
      targetPointerY = 0;
    };

    const domElem = renderer.domElement;
    domElem.addEventListener("pointerdown", handlePointerDown);
    domElem.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", handlePointerUp);
    domElem.addEventListener("pointerleave", handlePointerLeave);

    // Responsive Resize
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth || 720;
      const h = container.clientHeight || 520;
      camera.aspect = w / h;
      // Pull camera slightly further back on narrow mobile screens so the full rack fits
      camera.position.z = w < 520 ? 7.25 : 6.3;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    handleResize();
    window.addEventListener("resize", handleResize);

    // Pause rendering when scrolled out of viewport
    let isVisible = true;
    const observer = new IntersectionObserver(
      (entries) => {
        isVisible = entries[0]?.isIntersecting ?? true;
      },
      { threshold: 0.05 }
    );
    observer.observe(container);

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let animFrameId = 0;
    const clock = new THREE.Clock();

    const animate = () => {
      animFrameId = requestAnimationFrame(animate);
      if (!isVisible) return;

      const elapsed = clock.getElapsedTime();
      currentPointerX += (targetPointerX - currentPointerX) * 0.08;
      currentPointerY += (targetPointerY - currentPointerY) * 0.08;

      const activeIdx = selectedIndexRef.current;
      const angleMode = inspectionAngleRef.current;
      const manualRot = userRotationRef.current;

      // Base inspection angle for the selected foreground volume
      const baseAngleY =
        angleMode === "spine"
          ? Math.PI * 0.42
          : angleMode === "back"
          ? Math.PI
          : -0.28;

      bookMeshes.forEach((mesh, i) => {
        const offset = i - activeIdx;

        let targetX = 0;
        let targetY = 0;
        let targetZ = 0;
        let targetRotX = 0;
        let targetRotY = 0;
        let targetRotZ = 0;
        let targetScale = 1;

        if (offset === 0) {
          // Foreground Hero Tankobon Volume
          targetX = -0.18 + currentPointerX * 0.14;
          targetY =
            0.06 +
            (prefersReducedMotion ? 0 : Math.sin(elapsed * 1.8) * 0.05) +
            currentPointerY * 0.1;
          targetZ = 1.65;
          targetRotY = baseAngleY + manualRot + currentPointerX * 0.38;
          targetRotX = -currentPointerY * 0.22;
          targetRotZ = currentPointerX * -0.04;
          targetScale = 1.12;
        } else {
          // Recessed 3D Rack Formation
          const sign = offset > 0 ? 1 : -1;
          const absOff = Math.abs(offset);
          targetX = sign * (1.25 + (absOff - 1) * 0.82);
          targetY =
            -0.12 -
            absOff * 0.05 +
            (prefersReducedMotion ? 0 : Math.sin(elapsed * 1.4 + i) * 0.03);
          targetZ = 0.15 - absOff * 0.68;
          // Angle books so their 3D spines and covers face inward toward the stage center
          targetRotY = sign * -0.52 + currentPointerX * 0.1;
          targetRotX = 0.04;
          targetRotZ = sign * -0.03;
          targetScale = Math.max(0.76, 0.94 - absOff * 0.05);
        }

        const damping = 0.09;
        mesh.position.x += (targetX - mesh.position.x) * damping;
        mesh.position.y += (targetY - mesh.position.y) * damping;
        mesh.position.z += (targetZ - mesh.position.z) * damping;

        mesh.rotation.x += (targetRotX - mesh.rotation.x) * damping;
        mesh.rotation.y += (targetRotY - mesh.rotation.y) * damping;
        mesh.rotation.z += (targetRotZ - mesh.rotation.z) * damping;

        const nextScale = mesh.scale.x + (targetScale - mesh.scale.x) * damping;
        mesh.scale.set(nextScale, nextScale, nextScale);
      });

      if (!prefersReducedMotion) {
        particles.rotation.y = elapsed * 0.04 + currentPointerX * 0.12;
        particles.rotation.x = currentPointerY * 0.08;
        innerRing.rotation.z = elapsed * 0.25;
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      isDisposed = true;
      cancelAnimationFrame(animFrameId);
      observer.disconnect();
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("pointerup", handlePointerUp);
      domElem.removeEventListener("pointerdown", handlePointerDown);
      domElem.removeEventListener("pointermove", handlePointerMove);
      domElem.removeEventListener("pointerleave", handlePointerLeave);

      bookGeo.dispose();
      ringGeo.dispose();
      innerRingGeo.dispose();
      particleGeo.dispose();
      disposableTextures.forEach((t) => t.dispose());
      disposableMaterials.forEach((m) => m.dispose());
      renderer.dispose();
    };
  }, [stageComics]);

  const activeComic = stageComics[selectedIndex] || stageComics[0];

  if (!webglSupported && activeComic) {
    // Graceful interactive fallback if WebGL is unavailable on the device
    return (
      <div className="relative flex flex-col items-center justify-center min-h-[420px] p-6 bg-[#0d0d11] border border-[#27272e]">
        <img
          src={activeComic.cover_portrait_url || activeComic.cover_image_url}
          alt={activeComic.title}
          referrerPolicy="no-referrer"
          className="w-56 h-80 object-cover border-2 border-[#e11d48] shadow-2xl"
        />
        <div className="mt-4 flex gap-2">
          {stageComics.map((c, idx) => (
            <button
              key={c.manga_id}
              type="button"
              onClick={() => handleSelectBook(idx)}
              className={`min-h-11 min-w-11 px-3 py-2 font-mono-tabular text-xs border transition-colors ${
                idx === selectedIndex
                  ? "bg-[#be123c] text-[#f4f1ea] border-[#be123c]"
                  : "bg-[#141418] text-[#c8c2b6] border-[#27272e]"
              }`}
            >
              {String(idx + 1).padStart(2, "0")}
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full flex flex-col justify-between select-none">
      {/* Top Stage Bar */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-2 px-4 py-3 border-b border-[#27272e] bg-[#09090b]/90">
        <div className="flex items-center gap-3">
          <span className="inline-block w-2.5 h-2.5 bg-[#e11d48]" aria-hidden="true" />
          <span className="font-mono-tabular text-xs font-semibold tracking-wider text-[#f4f1ea] uppercase">
            KOMIK POPULER PILIHAN · #{String(selectedIndex + 1).padStart(2, "0")}
          </span>
        </div>

        {/* Book Angle Controls */}
        <div className="flex items-center gap-1.5" role="group" aria-label="Sudut pandang buku">
          {(
            [
              { id: "front", label: "Sampul Depan" },
              { id: "spine", label: "Punggung Buku" },
              { id: "back", label: "Sinopsis Belakang" },
            ] as const
          ).map((mode) => (
            <button
              key={mode.id}
              type="button"
              onClick={() => {
                setUserRotationOffset(0);
                setInspectionAngle(mode.id);
              }}
              className={`min-h-11 px-3 py-1.5 text-xs font-mono-tabular font-semibold border transition-colors ${
                inspectionAngle === mode.id
                  ? "bg-[#be123c] text-[#f4f1ea] border-[#be123c]"
                  : "bg-[#141418] text-[#c8c2b6] border-[#27272e] hover:border-[#f4f1ea] hover:text-[#f4f1ea]"
              }`}
            >
              {mode.label}
            </button>
          ))}
        </div>
      </div>

      {/* Stage Canvas */}
      <div className="relative w-full h-[380px] sm:h-[460px] lg:h-[520px] overflow-hidden bg-[radial-gradient(circle_at_45%_42%,rgba(225,29,72,0.14),rgba(9,9,11,0.98)_72%)]">
        <div
          ref={mountRef}
          className="w-full h-full touch-pan-y"
          role="region"
          aria-label={`Rak Komik: ${activeComic?.title || "Memuat komik"}`}
        />

        {/* Subtle Corner Registration Marks */}
        <div className="pointer-events-none absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-[#c8c2b6]/40" />
        <div className="pointer-events-none absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-[#c8c2b6]/40" />
        <div className="pointer-events-none absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-[#c8c2b6]/40" />
        <div className="pointer-events-none absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-[#c8c2b6]/40" />

        {/* Interactive Hint Overlay */}
        <div className="pointer-events-none absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs font-mono-tabular text-[#c8c2b6]">
          <span className="bg-[#09090b]/85 px-2.5 py-1 border border-[#27272e]">
            GESER UNTUK PUTAR BUKU · KLIK BUKU UNTUK PILIH JUDUL
          </span>
          {activeComic && (
            <span className="hidden sm:inline-block bg-[#09090b]/85 px-2.5 py-1 border border-[#27272e] text-[#f4f1ea]">
              CH. {activeComic.latest_chapter_number} TERSEDIA
            </span>
          )}
        </div>
      </div>

      {/* Keyboard-Accessible Volume Spine Selector Bar */}
      <div
        className="relative z-10 grid grid-cols-7 border-t border-[#27272e] bg-[#0c0c10]"
        role="tablist"
        aria-label="Pilih volume komik di rak 3D"
      >
        {stageComics.map((comic, idx) => {
          const isSelected = idx === selectedIndex;
          const meta = COUNTRY_LABEL[comic.country_id] || {
            code: "ID",
            format: "KOMIK",
            accent: "#e11d48",
          };
          return (
            <button
              key={comic.manga_id}
              type="button"
              role="tab"
              aria-selected={isSelected}
              aria-label={`Pilih Volume ${idx + 1}: ${comic.title}`}
              onClick={() => handleSelectBook(idx)}
              onDoubleClick={() => onOpenSeries(comic)}
              className={`group relative min-h-14 px-2 py-2.5 text-left border-r last:border-r-0 border-[#27272e] transition-colors ${
                isSelected
                  ? "bg-[#181820] text-[#f4f1ea]"
                  : "bg-[#0c0c10] text-[#c8c2b6] hover:bg-[#14141a] hover:text-[#f4f1ea]"
              }`}
            >
              {/* Top active indicator bar */}
              <span
                className={`absolute top-0 left-0 right-0 h-1 transition-opacity ${
                  isSelected ? "bg-[#e11d48] opacity-100" : "bg-[#c8c2b6] opacity-0 group-hover:opacity-40"
                }`}
              />
              <div className="flex items-center justify-between font-mono-tabular text-xs">
                <span className={isSelected ? "text-[#f43f5e] font-bold" : "text-[#c8c2b6]"}>
                  {String(idx + 1).padStart(2, "0")}
                </span>
                <span className="text-xs opacity-80">{meta.code}</span>
              </div>
              <div className="mt-1 truncate text-xs font-semibold text-[#f4f1ea]">
                {comic.title}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

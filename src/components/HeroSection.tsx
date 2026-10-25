import React, { useState, useEffect, useRef } from 'react';
import * as THREE from 'three';
import {
  Activity,
  ArrowRight,
  ArrowUpRight,
  Award,
  Briefcase,
  CheckCircle2,
  Cloud,
  Code2,
  Compass,
  Cpu,
  FolderGit2,
  Globe,
  GraduationCap,
  Layers,
  MapPin,
  Megaphone,
  Phone,
  PhoneCall,
  Search,
  ShieldCheck,
  Sparkles,
  Terminal,
  Workflow,
  X,
  Zap,
} from 'lucide-react';
import {
  HERO_ORBS,
  FOUNDER_PROFILES,
  TECH_STACK_MARQUEE_ROW_1,
  TECH_STACK_MARQUEE_ROW_2,
  BENTO_SOLUTIONS,
  SHOWCASE_PROJECTS,
  SKYLINE_WHATSAPP_NUMBER,
  SKYLINE_SACHIN_WHATSAPP_NUMBER,
  SKYLINE_CALL_NUMBER,
  SKYLINE_PRIMARY_PHONE_DISPLAY,
  SKYLINE_SACHIN_PHONE_DISPLAY,
  SKYLINE_LOCATION,
  BentoSolutionCard,
  ShowcaseProject,
  HeroOrbNode,
} from '../data/agencyData';
import {
  WhatsAppBrandBadge,
  GmailBrandIcon,
  TechStackBrandIcon,
} from './BrandIcons';

export type HeroPageView = 'home' | 'work' | 'who-we-are';

interface HeroSectionProps {
  onNavigate: (sectionId: string) => void;
  projects?: ShowcaseProject[];
  pageView?: HeroPageView;
}

const getOrbLucideIcon = (orbId: string, className = 'w-3.5 h-3.5') => {
  switch (orbId) {
    case 'ai':
      return <Cpu className={className} />;
    case 'ads':
      return <Megaphone className={className} />;
    case 'saas':
      return <Cloud className={className} />;
    case 'web':
      return <Globe className={className} />;
    case 'seo':
      return <Search className={className} />;
    case 'crm':
      return <Workflow className={className} />;
    case 'local':
    default:
      return <MapPin className={className} />;
  }
};

/**
 * Interactive 3D Geodesic Orbital Sphere (Three.js WebGL + 360° Spherical Nodes + Projected Capability Orbs)
 * Features:
 * - Real 3D Geodesic Icosahedron Wireframe + Brushed Titanium Core Sphere
 * - 360-degree small spherical satellite nodes distributed across the geodesic vertices
 * - 3 Inclined Gyroscopic Orbital Rings
 * - 7 Interactive 3D-Projected Capability Nodes (AI, ADS, SAAS, WEB, SEO, CRM, LOCAL)
 * - Pointer drag / hover rotation + software-WebGL frame pacing guard
 */
const HeroGeodesicSphere3D: React.FC<{
  activeOrb: HeroOrbNode;
  activeOrbIndex: number;
  onSelectOrb: (idx: number) => void;
}> = ({ activeOrb, activeOrbIndex, onSelectOrb }) => {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const orbElsRef = useRef<(HTMLButtonElement | null)[]>([]);
  const activeIdxRef = useRef<number>(activeOrbIndex);
  activeIdxRef.current = activeOrbIndex;

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let renderer: THREE.WebGLRenderer | null = null;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance',
      });
    } catch {
      return;
    }

    const gl = renderer.getContext();
    const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
    const rendererStr = debugInfo
      ? gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL) || ''
      : '';
    const isSoftwareGl = /SwiftShader|llvmpipe|softpipe|Software/i.test(rendererStr);

    const width = container.clientWidth || 520;
    const height = container.clientHeight || 300;
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(width, height);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;

    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100);
    camera.position.set(0, 0, 5.25);

    // Studio 3-Point Metallic Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.85);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xf8fafc, 2.2);
    keyLight.position.set(4, 5, 6);
    scene.add(keyLight);

    const rimLight = new THREE.PointLight(0xa1a1aa, 2.4, 15);
    rimLight.position.set(-4, -3, 3);
    scene.add(rimLight);

    const rootGroup = new THREE.Group();
    scene.add(rootGroup);

    // 1. Inner Brushed Titanium Core Sphere
    const coreGeo = new THREE.SphereGeometry(0.92, isSoftwareGl ? 20 : 32, isSoftwareGl ? 20 : 32);
    const coreMat = new THREE.MeshStandardMaterial({
      color: 0x18181b,
      metalness: 0.82,
      roughness: 0.24,
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    rootGroup.add(coreMesh);

    // 2. Geodesic Icosahedron Wireframe Shell
    const geoDetail = isSoftwareGl ? 1 : 2;
    const geodesicGeo = new THREE.IcosahedronGeometry(1.52, geoDetail);
    const wireframeGeo = new THREE.WireframeGeometry(geodesicGeo);
    const wireframeMat = new THREE.LineBasicMaterial({
      color: 0x71717a,
      transparent: true,
      opacity: 0.52,
    });
    const geodesicWireframe = new THREE.LineSegments(wireframeGeo, wireframeMat);
    rootGroup.add(geodesicWireframe);

    // 3. Outer Secondary Geodesic Lattice
    const outerGeo = new THREE.IcosahedronGeometry(1.78, 1);
    const outerWireGeo = new THREE.WireframeGeometry(outerGeo);
    const outerWireMat = new THREE.LineBasicMaterial({
      color: 0xa1a1aa,
      transparent: true,
      opacity: 0.22,
    });
    const outerWireframe = new THREE.LineSegments(outerWireGeo, outerWireMat);
    rootGroup.add(outerWireframe);

    // 4. Small Circular / Spherical Nodes Distributed 360° Around Geodesic Vertices
    const posAttr = geodesicGeo.getAttribute('position');
    const uniqueVertices: THREE.Vector3[] = [];
    const seen = new Set<string>();
    for (let i = 0; i < posAttr.count; i++) {
      const vx = posAttr.getX(i);
      const vy = posAttr.getY(i);
      const vz = posAttr.getZ(i);
      const key = `${vx.toFixed(2)},${vy.toFixed(2)},${vz.toFixed(2)}`;
      if (!seen.has(key)) {
        seen.add(key);
        uniqueVertices.push(new THREE.Vector3(vx, vy, vz));
      }
    }

    const smallNodeGeo = new THREE.SphereGeometry(0.036, 8, 8);
    const smallNodeMat = new THREE.MeshStandardMaterial({
      color: 0xe4e4e7,
      emissive: 0x52525b,
      emissiveIntensity: 0.6,
      metalness: 0.7,
      roughness: 0.2,
    });
    const instancedNodes = new THREE.InstancedMesh(
      smallNodeGeo,
      smallNodeMat,
      uniqueVertices.length
    );
    const dummy = new THREE.Object3D();
    uniqueVertices.forEach((v, idx) => {
      dummy.position.copy(v);
      dummy.updateMatrix();
      instancedNodes.setMatrixAt(idx, dummy.matrix);
    });
    rootGroup.add(instancedNodes);

    // 5. Three Inclined 3D Gyroscopic Orbital Rings
    const ringGroup = new THREE.Group();
    rootGroup.add(ringGroup);

    const createOrbitRing = (radius: number, rx: number, ry: number, opacity: number) => {
      const rGeo = new THREE.TorusGeometry(radius, 0.008, 8, isSoftwareGl ? 48 : 84);
      const rMat = new THREE.MeshBasicMaterial({
        color: 0xa1a1aa,
        transparent: true,
        opacity,
      });
      const rMesh = new THREE.Mesh(rGeo, rMat);
      rMesh.rotation.set(rx, ry, 0);
      return rMesh;
    };

    const ring1 = createOrbitRing(1.94, Math.PI / 2.6, 0.35, 0.38);
    const ring2 = createOrbitRing(2.08, -Math.PI / 3.1, -0.45, 0.26);
    const ring3 = createOrbitRing(1.28, Math.PI / 4, 0.8, 0.32);
    ringGroup.add(ring1, ring2, ring3);

    // 6. 7 Primary Capability Spherical Anchors (Fibonacci Sphere Distribution)
    const orbAnchorPoints: THREE.Vector3[] = HERO_ORBS.map((_, i) => {
      const n = HERO_ORBS.length;
      const phi = Math.acos(1 - (2 * (i + 0.5)) / n);
      const theta = Math.PI * (1 + Math.sqrt(5)) * i;
      const r = 1.62;
      return new THREE.Vector3(
        r * Math.sin(phi) * Math.cos(theta),
        r * Math.cos(phi) * 0.88,
        r * Math.sin(phi) * Math.sin(theta)
      );
    });

    const anchorMeshes: THREE.Mesh[] = [];
    const anchorGeo = new THREE.SphereGeometry(0.085, 14, 14);
    orbAnchorPoints.forEach((pt) => {
      const mat = new THREE.MeshStandardMaterial({
        color: 0xf4f4f5,
        emissive: 0x27272a,
        emissiveIntensity: 0.7,
        metalness: 0.85,
        roughness: 0.15,
      });
      const m = new THREE.Mesh(anchorGeo, mat);
      m.position.copy(pt);
      rootGroup.add(m);
      anchorMeshes.push(m);
    });

    // Pointer Interaction State
    let isDragging = false;
    let prevX = 0;
    let prevY = 0;
    let targetRotY = 0.4;
    let targetRotX = 0.18;
    let curRotY = 0.4;
    let curRotX = 0.18;

    const onPointerDown = (e: PointerEvent) => {
      isDragging = true;
      prevX = e.clientX;
      prevY = e.clientY;
    };
    const onPointerMove = (e: PointerEvent) => {
      if (!isDragging) return;
      const dx = e.clientX - prevX;
      const dy = e.clientY - prevY;
      prevX = e.clientX;
      prevY = e.clientY;
      targetRotY += dx * 0.008;
      targetRotX = Math.max(-0.65, Math.min(0.65, targetRotX + dy * 0.006));
    };
    const onPointerUp = () => {
      isDragging = false;
    };

    const domEl = renderer.domElement;
    domEl.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);

    const handleResize = () => {
      if (!container || !renderer) return;
      const nw = container.clientWidth || 520;
      const nh = container.clientHeight || 300;
      camera.aspect = nw / nh;
      camera.updateProjectionMatrix();
      renderer.setSize(nw, nh);
    };
    window.addEventListener('resize', handleResize);

    // Software-WebGL Paced Animation Loop (afterDraw pattern from threejs skill)
    let stopped = false;
    let rafId = 0;
    let timerId = 0;
    const afterDraw = isSoftwareGl
      ? (cb: () => void) => {
          timerId = window.setTimeout(() => {
            rafId = requestAnimationFrame(cb);
          }, 16);
        }
      : (cb: () => void) => {
          rafId = requestAnimationFrame(cb);
        };

    const projVec = new THREE.Vector3();

    const animate = () => {
      if (stopped || !renderer) return;

      const isDark = document.documentElement.classList.contains('dark');
      wireframeMat.color.setHex(isDark ? 0xa1a1aa : 0x52525b);
      wireframeMat.opacity = isDark ? 0.46 : 0.38;
      coreMat.color.setHex(isDark ? 0x18181b : 0x27272a);

      if (!isDragging) {
        targetRotY += 0.0042;
      }

      curRotY += (targetRotY - curRotY) * 0.08;
      curRotX += (targetRotX - curRotX) * 0.08;

      rootGroup.rotation.y = curRotY;
      rootGroup.rotation.x = curRotX;

      outerWireframe.rotation.y = -curRotY * 0.35;
      ring1.rotation.z += 0.003;
      ring2.rotation.z -= 0.0025;

      // Update anchor mesh highlight & project 3D coordinates to 2D overlay badges
      const cw = container.clientWidth || width;
      const ch = container.clientHeight || height;

      anchorMeshes.forEach((mesh, idx) => {
        const isSelected = activeIdxRef.current === idx;
        const mat = mesh.material as THREE.MeshStandardMaterial;
        mat.color.setHex(isSelected ? 0x10b981 : 0xf4f4f5);
        mat.emissive.setHex(isSelected ? 0x10b981 : 0x3f3f46);
        mesh.scale.setScalar(isSelected ? 1.45 : 1.0);

        const btn = orbElsRef.current[idx];
        if (btn) {
          mesh.getWorldPosition(projVec);
          const depthZ = projVec.z;
          projVec.project(camera);
          const x = (projVec.x * 0.5 + 0.5) * cw;
          const y = (-projVec.y * 0.5 + 0.5) * ch;
          const scale = depthZ > 0 ? 1 : 0.84;
          const opacity = depthZ > -0.35 ? 1 : 0.42;
          btn.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0) translate(-50%, -50%) scale(${
            isSelected ? 1.12 : scale
          })`;
          btn.style.opacity = isSelected ? '1' : String(opacity);
          btn.style.zIndex = isSelected ? '30' : depthZ > 0 ? '20' : '10';
        }
      });

      renderer.render(scene, camera);
      afterDraw(animate);
    };

    rafId = requestAnimationFrame(animate);

    return () => {
      stopped = true;
      cancelAnimationFrame(rafId);
      clearTimeout(timerId);
      domEl.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
      window.removeEventListener('resize', handleResize);
      coreGeo.dispose();
      coreMat.dispose();
      geodesicGeo.dispose();
      wireframeGeo.dispose();
      wireframeMat.dispose();
      outerGeo.dispose();
      outerWireGeo.dispose();
      outerWireMat.dispose();
      smallNodeGeo.dispose();
      smallNodeMat.dispose();
      anchorGeo.dispose();
      renderer?.dispose();
    };
  }, []);

  return (
    <div className="w-full surface-card rounded-3xl p-4 sm:p-5 relative overflow-hidden">
      {/* Top Status Header */}
      <div className="flex flex-wrap items-center justify-between gap-2 pb-3 mb-1 border-b border-[var(--border-hairline)]">
        <div className="inline-flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
          <span className="font-mono-tech text-[10px] uppercase tracking-widest font-bold text-[var(--text-primary)]">
            360° 3D GEODESIC ARCHITECTURE CORE
          </span>
        </div>
        <span className="inline-flex items-center gap-1.5 font-mono-tech text-[10px] font-semibold text-[var(--text-secondary)]">
          <Activity className="w-3 h-3 text-[#10B981]" />
          <span>DRAG TO ROTATE • {activeOrb.label} ACTIVE</span>
        </span>
      </div>

      {/* 3D WebGL Canvas + Projected 360° Capability Orbs */}
      <div className="relative w-full h-[250px] sm:h-[285px] select-none cursor-grab active:cursor-grabbing">
        <div ref={mountRef} className="w-full h-full" />

        {/* 3D-Projected Capability Satellite Buttons */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {HERO_ORBS.map((orb, idx) => {
            const isSelected = activeOrbIndex === idx;
            return (
              <button
                key={orb.id}
                ref={(el) => {
                  orbElsRef.current[idx] = el;
                }}
                type="button"
                onClick={() => onSelectOrb(idx)}
                className={`pointer-events-auto absolute top-0 left-0 px-2.5 py-1 rounded-full font-mono-tech text-[10px] font-bold transition-colors cursor-pointer inline-flex items-center gap-1 border shadow-md ${
                  isSelected
                    ? 'bg-[#09090B] text-[#F4F4F5] dark:bg-[#F4F4F5] dark:text-[#09090B] border-[#10B981]'
                    : 'bg-[var(--bg-surface)]/92 text-[var(--text-primary)] border-[var(--border-strong)] hover:border-[var(--text-primary)]'
                }`}
              >
                <span className={isSelected ? 'text-[#10B981]' : 'text-[var(--text-secondary)]'}>
                  {getOrbLucideIcon(orb.id, 'w-3 h-3')}
                </span>
                <span>{orb.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Single Clean 7-Node Selector Strip (Zero Duplicate Row in Hero) */}
      <div className="pt-3 border-t border-[var(--border-hairline)] flex flex-wrap items-center justify-between gap-1.5">
        {HERO_ORBS.map((orb, idx) => {
          const isActive = activeOrbIndex === idx;
          return (
            <button
              key={orb.id}
              type="button"
              onClick={() => onSelectOrb(idx)}
              onMouseEnter={() => onSelectOrb(idx)}
              className={`px-2.5 py-1.5 rounded-xl font-mono-tech text-[10px] font-bold transition-all cursor-pointer inline-flex items-center gap-1.5 border ${
                isActive
                  ? 'btn-platinum-primary shadow-sm scale-105'
                  : 'surface-elevated text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
              }`}
            >
              <span className={isActive ? 'text-[#10B981]' : 'text-[var(--text-secondary)]'}>
                {getOrbLucideIcon(orb.id, 'w-3 h-3')}
              </span>
              <span>{orb.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

/**
 * Pure Code-Engineered Architectural Graphic for the 6 Bento Grid Cards.
 */
const ArchitecturalBentoGraphic: React.FC<{ card: BentoSolutionCard }> = ({ card }) => {
  switch (card.visualType) {
    case 'web-architecture':
      return (
        <div className="w-full h-full p-4 bg-[#0D0E12] text-zinc-100 font-mono-tech flex flex-col justify-between">
          <div className="flex items-center justify-between text-[10px] text-zinc-400 border-b border-zinc-800 pb-2">
            <span className="flex items-center gap-1.5">
              <Terminal className="w-3.5 h-3.5 text-zinc-300" />
              <span>NEXT.JS 15 FULL-STACK CLUSTER</span>
            </span>
            <span className="px-2 py-0.5 rounded bg-zinc-800 text-zinc-200">99/100 SPEED</span>
          </div>
          <div className="grid grid-cols-3 gap-2 my-auto">
            <div className="p-2.5 rounded-xl bg-zinc-900 border border-zinc-800">
              <div className="text-[9px] text-zinc-400">EDGE SSR</div>
              <div className="text-sm font-bold text-white mt-0.5">0.4s LCP</div>
            </div>
            <div className="p-2.5 rounded-xl bg-zinc-900 border border-zinc-800">
              <div className="text-[9px] text-zinc-400">POSTGRESQL</div>
              <div className="text-sm font-bold text-white mt-0.5">Pooler HA</div>
            </div>
            <div className="p-2.5 rounded-xl bg-zinc-900 border border-zinc-800">
              <div className="text-[9px] text-zinc-400">SECURITY</div>
              <div className="text-sm font-bold text-white mt-0.5">JWT + RBAC</div>
            </div>
          </div>
          <div className="text-[9px] text-zinc-500 flex justify-between">
            <span>TYPESCRIPT STRICT</span>
            <span className="text-zinc-300">PRODUCTION READY</span>
          </div>
        </div>
      );

    case 'whatsapp-crm':
      return (
        <div className="w-full h-full p-4 bg-[#0D0E12] text-zinc-100 font-mono-tech flex flex-col justify-between">
          <div className="flex items-center justify-between text-[10px] border-b border-zinc-800 pb-2">
            <span className="flex items-center gap-2 text-zinc-200">
              <WhatsAppBrandBadge size="sm" />
              <span>OFFICIAL WHATSAPP CLOUD BOT</span>
            </span>
            <span className="px-2 py-0.5 rounded bg-zinc-800 text-zinc-200">&lt; 1.2s</span>
          </div>
          <div className="flex items-center justify-between gap-2 my-auto">
            {[
              { tag: 'CAPTURE', name: 'Inbound Lead' },
              { tag: 'RAG AI', name: 'AI Qualifier' },
              { tag: 'SYNCED', name: 'Slot Booked' },
            ].map((item) => (
              <div
                key={item.name}
                className="flex-1 p-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-center"
              >
                <div className="text-[9px] text-zinc-500">{item.tag}</div>
                <div className="text-[10px] font-semibold text-zinc-100 mt-0.5">{item.name}</div>
              </div>
            ))}
          </div>
          <div className="text-[9px] text-zinc-400 flex justify-between">
            <span>24/7 AUTO-RESPONSE</span>
            <span className="text-zinc-200">ZERO LEAD LEAKAGE</span>
          </div>
        </div>
      );

    case 'local-gbp':
      return (
        <div className="w-full h-full p-4 bg-[#0D0E12] text-zinc-100 font-mono-tech flex flex-col justify-between">
          <div className="flex items-center justify-between text-[10px] border-b border-zinc-800 pb-2">
            <span className="flex items-center gap-1.5 text-zinc-200">
              <TechStackBrandIcon name="Google Map Pack" className="w-3.5 h-3.5" />
              <span>MAP PACK #1 RANKING</span>
            </span>
            <span className="text-zinc-300">4.9 ★</span>
          </div>
          <div className="my-auto p-2.5 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-between">
            <div>
              <div className="text-[10px] font-bold text-white">Top-3 "Near Me" Pack</div>
              <div className="text-[9px] text-zinc-400">QR Review Standee + Local Citations</div>
            </div>
            <span className="px-2 py-1 rounded bg-zinc-100 text-zinc-950 text-[10px] font-bold">
              3.2x CALLS
            </span>
          </div>
          <div className="text-[9px] text-zinc-400 flex justify-between">
            <span>CLINICS • SALONS • RETAIL</span>
            <span className="text-zinc-200">LOCAL DOMINANCE</span>
          </div>
        </div>
      );

    case 'roas-funnel':
      return (
        <div className="w-full h-full p-4 bg-[#0D0E12] text-zinc-100 font-mono-tech flex flex-col justify-between">
          <div className="flex items-center justify-between text-[10px] border-b border-zinc-800 pb-2">
            <span className="flex items-center gap-1.5 text-zinc-200">
              <TechStackBrandIcon name="Meta Ads" className="w-3.5 h-3.5" />
              <span>META CAPI + GOOGLE ADS</span>
            </span>
            <span className="text-zinc-200">4.1x ROAS</span>
          </div>
          <div className="flex items-end gap-1.5 h-16 my-auto px-2">
            {[35, 48, 62, 75, 95].map((bar, idx) => (
              <div
                key={idx}
                className={`flex-1 rounded-t ${idx === 4 ? 'bg-zinc-100' : 'bg-zinc-700'}`}
                style={{ height: `${bar}%` }}
              />
            ))}
          </div>
          <div className="text-[9px] text-zinc-400 flex justify-between">
            <span>SERVER-SIDE ATTRIBUTION</span>
            <span className="text-zinc-200">-41% AD CAC</span>
          </div>
        </div>
      );

    case 'seo-schema':
      return (
        <div className="w-full h-full p-4 bg-[#0D0E12] text-zinc-100 font-mono-tech flex flex-col justify-between">
          <div className="flex items-center justify-between text-[10px] border-b border-zinc-800 pb-2">
            <span className="flex items-center gap-1.5 text-zinc-200">
              <Search className="w-3.5 h-3.5 text-zinc-300" />
              <span>TECHNICAL SEO & AEO</span>
            </span>
            <span className="text-zinc-200">+240%</span>
          </div>
          <div className="my-auto p-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-[10px] text-zinc-300 space-y-1">
            <div className="flex justify-between">
              <span className="text-zinc-500">@type:</span>
              <span className="text-zinc-100">"Organization & LocalBusiness"</span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-500">AI Indexing:</span>
              <span className="text-zinc-100">ChatGPT + Perplexity + Google</span>
            </div>
          </div>
          <div className="text-[9px] text-zinc-400 flex justify-between">
            <span>JSON-LD ENTITY GRAPH</span>
            <span className="text-zinc-200">100/100 CWV</span>
          </div>
        </div>
      );

    case 'upi-catalog':
    default:
      return (
        <div className="w-full h-full p-4 bg-[#0D0E12] text-zinc-100 font-mono-tech flex flex-col justify-between">
          <div className="flex items-center justify-between text-[10px] border-b border-zinc-800 pb-2">
            <span className="text-zinc-200">D2C STOREFRONT • 1-TAP UPI CHECKOUT ENGINE</span>
            <span className="px-2 py-0.5 rounded bg-zinc-100 text-zinc-950 font-bold">
              +68% CONVERSION
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 my-auto">
            <div className="p-2.5 rounded-xl bg-zinc-900 border border-zinc-800">
              <div className="text-[9px] text-zinc-400">CHECKOUT SPEED</div>
              <div className="text-xs font-bold text-white mt-0.5">1-Tap GPay / PhonePe</div>
            </div>
            <div className="p-2.5 rounded-xl bg-zinc-900 border border-zinc-800">
              <div className="text-[9px] text-zinc-400">ABANDONED CART</div>
              <div className="text-xs font-bold text-white mt-0.5">WhatsApp Auto-Recovery</div>
            </div>
            <div className="p-2.5 rounded-xl bg-zinc-900 border border-zinc-800">
              <div className="text-[9px] text-zinc-400">MARKETPLACE FEE</div>
              <div className="text-xs font-bold text-white mt-0.5">0% Direct Margin</div>
            </div>
          </div>
          <div className="text-[9px] text-zinc-400 flex justify-between">
            <span>INVENTORY & GST BILLING SYNC</span>
            <span className="text-zinc-200">SUB-SECOND PRODUCT CATALOG</span>
          </div>
        </div>
      );
  }
};

/**
 * Pure Code-Engineered Architectural Project Preview for "Our Work" Showcase Cards.
 */
const ArchitecturalProjectMockup: React.FC<{ project: ShowcaseProject }> = ({ project }) => {
  const cat = (project.categoryTag || project.category || 'WEB & SAAS').toUpperCase();
  const clientType = project.clientType || project.locationTag || 'Enterprise Client';
  const impactMetric = project.impactMetric || project.metricsHeadline || '+165% Pipeline';
  const secondaryMetric = project.secondaryMetric || project.accentMetric || '99.98% SLA';

  return (
    <div className="w-full h-full p-5 bg-[#0D0E12] text-zinc-100 flex flex-col justify-between select-none relative overflow-hidden">
      <div className="flex items-center justify-between border-b border-zinc-800 pb-3 z-10">
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-1 rounded-md bg-zinc-800 text-zinc-100 font-mono-tech text-[10px] font-semibold tracking-wider uppercase">
            {cat}
          </span>
          <span className="font-mono-tech text-[10px] text-zinc-400 truncate max-w-[160px]">
            {clientType}
          </span>
        </div>
        <span className="font-mono-tech text-[10px] px-2.5 py-1 rounded-md bg-zinc-100 text-zinc-950 font-bold">
          {impactMetric}
        </span>
      </div>

      {/* Center Architectural Telemetry Canvas */}
      <div className="my-auto py-3 z-10">
        {cat.includes('LOCAL') ? (
          <div className="grid grid-cols-12 gap-3 items-center">
            <div className="col-span-7 p-3 rounded-xl bg-zinc-900 border border-zinc-800 space-y-1.5">
              <div className="flex items-center justify-between font-mono-tech text-[9px] text-zinc-400">
                <span>GOOGLE MAP PACK RANK</span>
                <span className="text-zinc-100">#1 ACROSS 6 CLINICS</span>
              </div>
              <div className="text-xs font-semibold text-white">
                Automated WhatsApp Slot Booking + QR Reviews
              </div>
              <div className="flex items-center gap-2 pt-1 font-mono-tech text-[9px] text-zinc-300">
                <span className="px-2 py-0.5 rounded bg-zinc-800">4.9 ★ Rating</span>
                <span className="px-2 py-0.5 rounded bg-zinc-800">Zero Missed Calls</span>
              </div>
            </div>
            <div className="col-span-5 p-3 rounded-xl bg-zinc-900 border border-zinc-800 text-center">
              <div className="font-mono-tech text-[9px] text-zinc-400">VERIFIED IMPACT</div>
              <div className="font-display text-lg font-extrabold text-white mt-1">
                {secondaryMetric}
              </div>
            </div>
          </div>
        ) : cat.includes('ADS') || cat.includes('COMMERCE') ? (
          <div className="grid grid-cols-12 gap-3 items-center">
            <div className="col-span-7 p-3 rounded-xl bg-zinc-900 border border-zinc-800">
              <div className="font-mono-tech text-[9px] text-zinc-400 mb-2">
                SERVER-SIDE CAPI + 1-TAP UPI FUNNEL
              </div>
              <div className="flex items-end gap-1.5 h-12">
                {[30, 45, 58, 76, 98].map((h, i) => (
                  <div
                    key={i}
                    className={`flex-1 rounded-t ${i === 4 ? 'bg-zinc-100' : 'bg-zinc-700'}`}
                    style={{ height: `${h}%` }}
                  />
                ))}
              </div>
            </div>
            <div className="col-span-5 p-3 rounded-xl bg-zinc-900 border border-zinc-800 text-center">
              <div className="font-mono-tech text-[9px] text-zinc-400">CHECKOUT LIFT</div>
              <div className="font-display text-lg font-extrabold text-white mt-1">
                {secondaryMetric}
              </div>
            </div>
          </div>
        ) : cat.includes('AI') || cat.includes('CRM') ? (
          <div className="grid grid-cols-12 gap-3 items-center">
            <div className="col-span-7 p-3 rounded-xl bg-zinc-900 border border-zinc-800 space-y-1.5">
              <div className="flex items-center gap-1.5 font-mono-tech text-[9px] text-zinc-300">
                <WhatsAppBrandBadge size="sm" />
                <span>RAG AI WHATSAPP QUALIFIER</span>
              </div>
              <div className="text-xs text-zinc-200">
                Instant brochure dispatch & automated site-visit calendar sync.
              </div>
            </div>
            <div className="col-span-5 p-3 rounded-xl bg-zinc-900 border border-zinc-800 text-center">
              <div className="font-mono-tech text-[9px] text-zinc-400">PIPELINE LIFT</div>
              <div className="font-display text-lg font-extrabold text-white mt-1">
                {secondaryMetric}
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-12 gap-3 items-center">
            <div className="col-span-7 p-3 rounded-xl bg-zinc-900 border border-zinc-800 font-mono-tech text-[10px] space-y-1">
              <div className="text-zinc-400">Multi-Tenant Cloud Engine</div>
              <div className="text-zinc-100">Latency: 180ms • 50k+ Daily Txns</div>
              <div className="text-zinc-400">PostgreSQL + Redis + Razorpay Route</div>
            </div>
            <div className="col-span-5 p-3 rounded-xl bg-zinc-900 border border-zinc-800 text-center">
              <div className="font-mono-tech text-[9px] text-zinc-400">RELIABILITY</div>
              <div className="font-display text-lg font-extrabold text-white mt-1">
                {secondaryMetric}
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="flex items-center justify-between border-t border-zinc-800 pt-2.5 font-mono-tech text-[9px] text-zinc-400 z-10">
        <span>ARCHITECTURE VERIFIED</span>
        <span className="text-zinc-200 inline-flex items-center gap-1">
          <span>INSPECT CASE STUDY</span>
          <ArrowUpRight className="w-3 h-3" />
        </span>
      </div>
    </div>
  );
};

export const HeroSection: React.FC<HeroSectionProps> = ({
  onNavigate,
  projects = SHOWCASE_PROJECTS,
  pageView = 'home',
}) => {
  const [activeOrbIndex, setActiveOrbIndex] = useState<number>(0);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [selectedProject, setSelectedProject] = useState<ShowcaseProject | null>(null);

  // Auto-cycle through all 7 service orbs every 4.0 seconds when idle
  useEffect(() => {
    if (isPaused || pageView !== 'home') return;
    const timer = setInterval(() => {
      setActiveOrbIndex((prev) => (prev + 1) % HERO_ORBS.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [isPaused, pageView]);

  const activeOrb = HERO_ORBS[activeOrbIndex];
  const displayedProjects = pageView === 'home' ? projects.slice(0, 2) : projects;

  return (
    <div className="relative overflow-hidden">
      {/* =====================================================================
          HOME VIEW ONLY: HERO + TECH MARQUEE + BENTO SUMMARY + CASE STUDY PREVIEW
         ===================================================================== */}
      {pageView === 'home' && (
        <>
          <section className="relative min-h-[calc(100vh-4rem)] pt-10 pb-14 px-4 sm:px-8 lg:px-14 flex flex-col justify-between hero-architectural-bg border-b border-[var(--border-hairline)]">
            <div className="w-full max-w-7xl mx-auto my-auto py-4 lg:py-6">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
                {/* Left Column (6 Cols): Editorial & Architectural Statement */}
                <div className="lg:col-span-6 space-y-6">
                  {/* Zero-Pill Discipline Kicker */}
                  <div className="inline-flex items-center gap-2.5">
                    <span className="w-2 h-2 rounded-full bg-[#10B981]" />
                    <span className="font-mono-tech text-[11px] uppercase tracking-widest text-[var(--text-primary)] font-bold">
                      SKYLINE DIGITAL AGENCY • WEB, SAAS, AI, ADS & LOCAL GROWTH
                    </span>
                  </div>

                  {/* Monumental 3-Line Headline */}
                  <div className="space-y-4">
                    <h1 className="font-display font-extrabold tracking-[-0.04em] leading-[1.05] text-[var(--text-primary)] text-3xl sm:text-5xl xl:text-[3.55rem]">
                      <span className="block whitespace-nowrap">WE EMPOWER</span>
                      <span className="block mt-1 whitespace-nowrap">
                        BUSINESS{' '}
                        <span className="font-serif-editorial italic font-semibold text-[var(--text-secondary)]">
                          TO
                        </span>
                      </span>
                      <span className="block mt-1 whitespace-nowrap text-platinum-gradient">
                        MOVE FORWARD.
                      </span>
                    </h1>

                    {/* Subheadline */}
                    <p className="font-sans-body text-sm sm:text-base lg:text-lg text-[var(--text-secondary)] max-w-xl leading-relaxed font-normal">
                      Full-stack software engineering, autonomous WhatsApp & AI workflows, high-ROAS Meta/Google ad funnels, and #1 Google Map Pack growth systems.
                    </p>
                  </div>

                  {/* Live Architectural SLA Strip (Replaces the duplicate 7-node row) */}
                  <div className="grid grid-cols-3 gap-3 max-w-lg pt-1">
                    {[
                      { metric: '< 0.4s', label: 'Edge SSR Latency' },
                      { metric: '4.1x', label: 'Verified Ad ROAS' },
                      { metric: '24/7', label: 'WhatsApp RAG AI' },
                    ].map((stat) => (
                      <div
                        key={stat.label}
                        className="p-3 rounded-2xl surface-elevated border border-[var(--border-hairline)]"
                      >
                        <div className="font-display text-lg sm:text-xl font-extrabold text-[var(--text-primary)]">
                          {stat.metric}
                        </div>
                        <div className="font-mono-tech text-[10px] text-[var(--text-muted)] uppercase">
                          {stat.label}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Action Row: Start Project + 60s Estimator + Sachin Active WhatsApp */}
                  <div className="flex flex-wrap items-center gap-3 pt-2">
                    <button
                      onClick={() => onNavigate('contact')}
                      className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full btn-platinum-primary text-xs sm:text-sm font-bold tracking-wide cursor-pointer"
                    >
                      <span>Start Your Project</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => onNavigate('services')}
                      className="inline-flex items-center gap-2 px-5 py-3.5 rounded-full btn-platinum-secondary text-xs sm:text-sm font-bold cursor-pointer"
                    >
                      <span>60s Price Estimator</span>
                    </button>

                    <a
                      href={`https://wa.me/${SKYLINE_WHATSAPP_NUMBER}?text=${encodeURIComponent(
                        'Hi SkyLine Digital Agency! I want a free audit and proposal for my business.'
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-3.5 rounded-full btn-whatsapp-official text-xs sm:text-sm font-bold"
                    >
                      <WhatsAppBrandBadge size="sm" className="border border-white/30" />
                      <span>WhatsApp Us</span>
                    </a>
                  </div>
                </div>

                {/* Right Column (6 Cols): Interactive 3D Geodesic Orbital Sphere + Live Service Telemetry Card */}
                <div
                  className="lg:col-span-6 flex flex-col gap-4"
                  onMouseEnter={() => setIsPaused(true)}
                  onMouseLeave={() => setIsPaused(false)}
                >
                  <HeroGeodesicSphere3D
                    activeOrb={activeOrb}
                    activeOrbIndex={activeOrbIndex}
                    onSelectOrb={(idx) => setActiveOrbIndex(idx)}
                  />

                  {/* Sleek Live Service Telemetry Card */}
                  <div className="w-full surface-card rounded-3xl p-5 sm:p-6 relative overflow-hidden transition-all duration-300">
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                      <div className="inline-flex items-center gap-2">
                        <span className="px-2.5 py-1 rounded-full font-display text-[10px] font-extrabold uppercase tracking-widest bg-[#18181B] text-[#F4F4F5] dark:bg-[#F4F4F5] dark:text-[#09090B] shadow-xs inline-flex items-center gap-1.5">
                          {getOrbLucideIcon(activeOrb.id, 'w-3 h-3')}
                          <span>
                            {activeOrb.label} • {activeOrb.psychName}
                          </span>
                        </span>
                        <span className="font-mono-tech text-[10px] text-[var(--text-muted)] hidden sm:inline">
                          {activeOrb.psychMeaning}
                        </span>
                      </div>

                      <div className="text-right">
                        <span className="font-display text-lg sm:text-xl font-extrabold text-[var(--text-primary)]">
                          {activeOrb.metric}
                        </span>
                        <span className="font-mono-tech text-[10px] text-[var(--text-muted)] ml-1.5 uppercase">
                          {activeOrb.metricLabel}
                        </span>
                      </div>
                    </div>

                    <h2 className="font-display text-base sm:text-lg font-bold text-[var(--text-primary)] mb-1.5">
                      {activeOrb.title}
                    </h2>

                    <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed mb-4">
                      {activeOrb.summary}
                    </p>

                    <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-[var(--border-hairline)]">
                      <div className="flex flex-wrap gap-1.5">
                        {activeOrb.deliverables.map((item) => (
                          <span
                            key={item}
                            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg surface-elevated font-mono-tech text-[10px] text-[var(--text-primary)]"
                          >
                            <CheckCircle2 className="w-3 h-3 shrink-0 text-[#10B981]" />
                            <span>{item}</span>
                          </span>
                        ))}
                      </div>

                      <button
                        type="button"
                        onClick={() => onNavigate('services')}
                        className="inline-flex items-center gap-1 font-display text-xs font-bold text-[var(--text-primary)] hover:opacity-80 cursor-pointer shrink-0"
                      >
                        <span>Explore {activeOrb.label}</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Hero Bottom Metadata Bar (Clean Numbers & Location) */}
            <div className="w-full max-w-7xl mx-auto pt-5 lg:pr-36 border-t border-[var(--border-hairline)] flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 text-xs text-[var(--text-secondary)]">
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-[var(--text-primary)] shrink-0" />
                  <span className="font-mono-tech text-[10px] uppercase tracking-widest text-[var(--text-muted)]">
                    BASED IN:
                  </span>
                  <span className="font-medium text-[var(--text-primary)]">
                    {SKYLINE_LOCATION}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-[var(--text-primary)] shrink-0" />
                  <span className="font-mono-tech text-[10px] uppercase tracking-widest text-[var(--text-muted)]">
                    DIRECT DESK:
                  </span>
                  <a
                    href={`tel:${SKYLINE_CALL_NUMBER}`}
                    className="font-display font-bold text-[var(--text-primary)] hover:underline"
                  >
                    {SKYLINE_PRIMARY_PHONE_DISPLAY}
                  </a>
                  <span className="text-[#71717A]">•</span>
                  <a
                    href={`https://wa.me/${SKYLINE_SACHIN_WHATSAPP_NUMBER}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-display font-bold text-[var(--text-primary)] hover:underline"
                  >
                    {SKYLINE_SACHIN_PHONE_DISPLAY}
                  </a>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <button
                  onClick={() => onNavigate('referral')}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full badge-platinum font-mono-tech text-[11px] font-semibold cursor-pointer hover:opacity-90 transition-opacity"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#10B981]" />
                  <span>Refer a Client & Earn 15% Commission</span>
                </button>
              </div>
            </div>
          </section>

          {/* =====================================================================
              2. DUAL-ROW INFINITE TECH & GROWTH MARQUEE (16 ORIGINAL BRAND ICONS)
             ===================================================================== */}
          <section
            aria-label="Technology and Growth Stack"
            className="py-5 border-b border-[var(--border-hairline)] bg-[var(--bg-canvas)] overflow-hidden space-y-3"
          >
            {/* Row 1: Left-scrolling Engineering Stack */}
            <div className="relative flex overflow-hidden">
              <div className="animate-marquee-left flex items-center gap-3 pr-3">
                {[...TECH_STACK_MARQUEE_ROW_1, ...TECH_STACK_MARQUEE_ROW_1].map(
                  (tech, index) => (
                    <div
                      key={`r1-${index}`}
                      className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full surface-elevated font-mono-tech text-xs text-[var(--text-primary)] whitespace-nowrap"
                    >
                      <TechStackBrandIcon name={tech} className="w-4 h-4 shrink-0" />
                      <span>{tech}</span>
                    </div>
                  )
                )}
              </div>
            </div>

            {/* Row 2: Right-scrolling Growth & Local Stack */}
            <div className="relative flex overflow-hidden">
              <div className="animate-marquee-right flex items-center gap-3 pr-3">
                {[...TECH_STACK_MARQUEE_ROW_2, ...TECH_STACK_MARQUEE_ROW_2].map(
                  (tech, index) => (
                    <div
                      key={`r2-${index}`}
                      className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full surface-card font-mono-tech text-xs text-[var(--text-secondary)] whitespace-nowrap"
                    >
                      <TechStackBrandIcon name={tech} className="w-4 h-4 shrink-0" />
                      <span>{tech}</span>
                    </div>
                  )
                )}
              </div>
            </div>
          </section>

          {/* =====================================================================
              3. 6 CORE SERVICES BENTO SUMMARY (HOME VIEW)
             ===================================================================== */}
          <section
            id="services-summary"
            className="py-20 sm:py-24 px-4 sm:px-8 lg:px-12 border-b border-[var(--border-hairline)] bg-[var(--bg-canvas)]"
          >
            <div className="max-w-7xl mx-auto">
              <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-14">
                <div>
                  {/* Zero-Pill Discipline Kicker */}
                  <div className="inline-flex items-center gap-2 mb-3">
                    <Layers className="w-3.5 h-3.5 text-[var(--text-primary)]" />
                    <span className="font-mono-tech text-[11px] uppercase tracking-widest font-bold text-[var(--text-primary)]">
                      WHAT WE ENGINEER & SCALE
                    </span>
                  </div>
                  <h2 className="font-display text-3xl sm:text-5xl font-extrabold tracking-tight text-[var(--text-primary)]">
                    Complete Digital Systems for{' '}
                    <span className="font-serif-editorial italic font-semibold text-platinum-gradient">
                      Every Stage.
                    </span>
                  </h2>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                  <p className="text-xs sm:text-sm text-[var(--text-secondary)] max-w-sm leading-relaxed">
                    From local clinics & retail stores to high-growth SaaS startups—we engineer the complete system.
                  </p>
                  <button
                    onClick={() => onNavigate('services')}
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-full btn-platinum-primary text-xs font-bold cursor-pointer shrink-0"
                  >
                    <span>Explore Full Services</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
                {BENTO_SOLUTIONS.map((card) => (
                  <div
                    key={card.id}
                    className={`${card.spanClass} surface-card rounded-3xl p-6 sm:p-8 flex flex-col justify-between group relative overflow-hidden`}
                  >
                    <div className="space-y-4">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <span className="font-mono-tech text-[10px] font-bold uppercase tracking-widest text-[var(--text-muted)]">
                          {card.tag}
                        </span>
                        <span className="px-3 py-1 rounded-full surface-elevated font-mono-tech text-xs font-bold text-[var(--text-primary)]">
                          {card.metric}
                        </span>
                      </div>

                      <div className="relative h-36 sm:h-40 rounded-2xl overflow-hidden border border-[var(--border-hairline)]">
                        <ArchitecturalBentoGraphic card={card} />
                      </div>

                      <h3 className="font-display text-xl sm:text-2xl font-bold text-[var(--text-primary)] leading-snug pt-1">
                        {card.title}
                      </h3>

                      <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                        {card.summary}
                      </p>
                    </div>

                    <div className="pt-6 mt-6 border-t border-[var(--border-hairline)] flex flex-wrap items-center justify-between gap-3">
                      <div className="flex flex-wrap gap-1.5">
                        {card.deliverables.map((del) => (
                          <span
                            key={del}
                            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg surface-elevated font-mono-tech text-[10px] text-[var(--text-primary)]"
                          >
                            <CheckCircle2 className="w-3 h-3 text-[#10B981] shrink-0" />
                            <span>{del}</span>
                          </span>
                        ))}
                      </div>

                      <button
                        onClick={() => onNavigate('services')}
                        className="inline-flex items-center gap-1 font-display text-xs font-bold text-[var(--text-primary)] group-hover:translate-x-0.5 transition-transform cursor-pointer shrink-0"
                      >
                        <span>Explore Full Service -&gt;</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </>
      )}

      {/* =====================================================================
          4. CASE STUDIES SHOWCASE (FEATURED PREVIEW ON HOME | FULL ON OUR WORK)
         ===================================================================== */}
      {(pageView === 'home' || pageView === 'work') && (
        <section
          id="work"
          className="py-16 sm:py-24 px-4 sm:px-8 lg:px-12 border-b border-[var(--border-hairline)] bg-[var(--bg-canvas)]"
        >
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-14">
              <div>
                {/* Zero-Pill Discipline Kicker */}
                <div className="inline-flex items-center gap-2 mb-3">
                  <Code2 className="w-3.5 h-3.5 text-[var(--text-primary)]" />
                  <span className="font-mono-tech text-[11px] uppercase tracking-widest font-bold text-[var(--text-primary)]">
                    {pageView === 'home'
                      ? 'FEATURED CASE STUDIES PREVIEW'
                      : 'SELECTED CASE STUDIES & DEPLOYMENTS'}
                  </span>
                </div>
                <h2 className="font-display text-3xl sm:text-5xl font-extrabold tracking-tight text-[var(--text-primary)]">
                  Engineered for{' '}
                  <span className="font-serif-editorial italic font-semibold text-platinum-gradient">
                    Measurable ROI.
                  </span>
                </h2>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                {pageView === 'home' ? (
                  <button
                    onClick={() => onNavigate('work')}
                    className="px-5 py-3 rounded-full btn-platinum-primary text-xs font-bold cursor-pointer inline-flex items-center gap-2"
                  >
                    <span>Explore All {projects.length} Case Studies</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <>
                    <button
                      onClick={() => onNavigate('services')}
                      className="px-4 py-2.5 rounded-full btn-platinum-secondary text-xs font-bold cursor-pointer"
                    >
                      Estimate Similar Project
                    </button>
                    <button
                      onClick={() => onNavigate('contact')}
                      className="px-4 py-2.5 rounded-full btn-platinum-primary text-xs font-bold cursor-pointer"
                    >
                      Request Live Demo
                    </button>
                  </>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {displayedProjects.map((project) => (
                <article
                  key={project.id}
                  onClick={() => setSelectedProject(project)}
                  className="surface-card rounded-3xl overflow-hidden flex flex-col justify-between group cursor-pointer"
                >
                  {/* Pure Code-Engineered Architectural Project Mockup */}
                  <div className="relative h-56 sm:h-60 overflow-hidden border-b border-[var(--border-hairline)]">
                    <ArchitecturalProjectMockup project={project} />
                  </div>

                  {/* Project Body */}
                  <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between space-y-5">
                    <div className="space-y-2.5">
                      <div className="font-mono-tech text-[11px] uppercase tracking-wider text-[var(--text-muted)]">
                        {project.clientType || project.locationTag || 'Enterprise Client'}
                      </div>
                      <h3 className="font-display text-xl sm:text-2xl font-bold text-[var(--text-primary)]">
                        {project.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                        {project.summary || project.architectureSummary}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-[var(--border-hairline)] flex flex-wrap items-center justify-between gap-3">
                      <div className="flex flex-wrap gap-1.5">
                        {(project.techStack || project.stackPills || []).map((tech: string) => (
                          <span
                            key={tech}
                            className="px-2.5 py-1 rounded-md surface-elevated font-mono-tech text-[10px] text-[var(--text-secondary)]"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center gap-3">
                        <span className="font-mono-tech text-xs font-semibold text-[var(--text-primary)]">
                          {project.secondaryMetric || project.accentMetric}
                        </span>
                        <span className="inline-flex items-center gap-1 font-display text-xs font-bold text-[var(--text-primary)] group-hover:underline">
                          <span>View Case Study</span>
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </span>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {/* Compact CTA Banner on Home View */}
            {pageView === 'home' && (
              <div className="mt-12 surface-card rounded-3xl p-6 sm:p-8 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
                <div className="space-y-1.5 max-w-2xl">
                  <div className="font-mono-tech text-[10px] uppercase tracking-widest text-[var(--text-muted)] font-bold">
                    READY TO SCALE YOUR REVENUE PIPELINE?
                  </div>
                  <h3 className="font-display text-xl sm:text-2xl font-extrabold text-[var(--text-primary)]">
                    Get a Custom Architecture Blueprint & Fixed-Milestone Proposal Today.
                  </h3>
                  <p className="text-xs sm:text-sm text-[var(--text-secondary)]">
                    Use our 60-second project estimator or chat directly with our founding engineers on WhatsApp.
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-3 shrink-0">
                  <a
                    href={`https://wa.me/${SKYLINE_SACHIN_WHATSAPP_NUMBER}?text=${encodeURIComponent(
                      'Hi SkyLine Digital Agency! I would like to discuss a new project.'
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-full btn-whatsapp-official text-xs font-bold"
                  >
                    <WhatsAppBrandBadge size="sm" className="border border-white/30" />
                    <span>WhatsApp Us</span>
                  </a>
                  <button
                    onClick={() => onNavigate('contact')}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full btn-platinum-primary text-xs font-bold cursor-pointer"
                  >
                    <span>Book Strategy Call</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {/* =====================================================================
          5. DEDICATED "WHO WE ARE" SECTION (WHO-WE-ARE VIEW ONLY)
             Senior-Led Engineering + Founding Architects Profiles
         ===================================================================== */}
      {pageView === 'who-we-are' && (
        <section
          id="who-we-are"
          className="py-16 sm:py-24 px-4 sm:px-8 lg:px-12 border-b border-[var(--border-hairline)] bg-[var(--bg-canvas)]"
        >
          <div className="max-w-7xl mx-auto space-y-16">
            {/* Header */}
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
              <div className="space-y-4 max-w-3xl">
                {/* Zero-Pill Discipline Kicker */}
                <div className="inline-flex items-center gap-2">
                  <Compass className="w-3.5 h-3.5 text-[var(--text-primary)]" />
                  <span className="font-mono-tech text-[11px] uppercase tracking-widest font-bold text-[var(--text-primary)]">
                    WHO WE ARE • THE SKYLINE DOCTRINE & FOUNDERS
                  </span>
                </div>

                <h2 className="font-display text-3xl sm:text-5xl font-extrabold tracking-tight text-[var(--text-primary)] leading-[1.08]">
                  Senior-Led Engineering.{' '}
                  <span className="font-serif-editorial italic font-semibold text-platinum-gradient">
                    Zero Agency Bloat.
                  </span>
                </h2>
              </div>

              <p className="text-sm sm:text-base text-[var(--text-secondary)] max-w-md leading-relaxed">
                At SkyLine Digital Agency, you work directly with our founding engineers—specialists in high-concurrency Java & Spring Boot systems, full-stack Node.js/React platforms, cryptographic security, and AI growth automation.
              </p>
            </div>

            {/* FOUNDERS & LEAD SYSTEMS ARCHITECTS */}
            <div className="space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="inline-flex items-center gap-2 font-mono-tech text-xs uppercase tracking-widest text-[var(--text-primary)] font-bold">
                  <Terminal className="w-4 h-4 text-[var(--text-primary)]" />
                  <span>MEET OUR FOUNDING ENGINEERS & ARCHITECTS</span>
                </div>
                <span className="font-mono-tech text-[11px] text-[var(--text-muted)] uppercase">
                  {SKYLINE_LOCATION}
                </span>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-7">
                {FOUNDER_PROFILES.map((founder) => {
                  const isCallSupported = founder.contactMode === 'whatsapp-and-call';
                  return (
                    <div
                      key={founder.id}
                      className="surface-card rounded-3xl p-6 sm:p-8 flex flex-col justify-between space-y-6 border border-[var(--border-hairline)] hover:border-[var(--border-strong)] transition-all"
                    >
                      <div className="space-y-5">
                        {/* Founder Top Identity Bar */}
                        <div className="flex flex-wrap items-start justify-between gap-4 border-b border-[var(--border-hairline)] pb-5">
                          <div className="space-y-1.5">
                            <div className="inline-flex items-center gap-2 font-mono-tech text-[10px] font-bold uppercase tracking-wider text-[var(--text-primary)]">
                              <ShieldCheck className="w-3.5 h-3.5 text-[#10B981]" />
                              <span>{founder.role}</span>
                            </div>
                            <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-[var(--text-primary)] tracking-tight pt-1">
                              {founder.name}
                            </h3>
                            <p className="text-xs font-medium text-[#71717A] dark:text-[#A1A1AA]">
                              {founder.headline}
                            </p>
                          </div>

                          <div className="flex flex-wrap items-center gap-2">
                            <a
                              href={`https://wa.me/${founder.whatsappNumber}?text=${encodeURIComponent(
                                `Hi ${founder.name}! I checked your profile on SkyLine Digital Agency and would like to discuss a project.`
                              )}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full btn-whatsapp-official text-[11px] font-bold"
                            >
                              <WhatsAppBrandBadge size="sm" className="border border-white/30" />
                              <span>WhatsApp</span>
                            </a>

                            {isCallSupported && founder.callNumber && (
                              <a
                                href={`tel:${founder.callNumber}`}
                                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full btn-platinum-primary text-[11px] font-bold"
                              >
                                <PhoneCall className="w-3.5 h-3.5" />
                                <span>Call</span>
                              </a>
                            )}
                          </div>
                        </div>

                        {/* Summary */}
                        <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                          {founder.summary}
                        </p>

                        {/* Education & Direct Contact Metadata (Clean Numbers Only) */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 rounded-2xl surface-elevated text-xs">
                          <div className="space-y-1">
                            <div className="inline-flex items-center gap-1.5 font-mono-tech text-[10px] uppercase tracking-wider text-[var(--text-muted)]">
                              <GraduationCap className="w-3.5 h-3.5 text-[var(--text-primary)]" />
                              <span>BACKGROUND</span>
                            </div>
                            <div className="font-bold text-[var(--text-primary)]">
                              {founder.education}
                            </div>
                            <div className="text-[11px] text-[var(--text-secondary)]">
                              {founder.institution}
                            </div>
                          </div>

                          <div className="space-y-1.5">
                            <div className="inline-flex items-center gap-1.5 font-mono-tech text-[10px] uppercase tracking-wider text-[var(--text-muted)]">
                              <Phone className="w-3.5 h-3.5 text-[var(--text-primary)]" />
                              <span>DIRECT DESK</span>
                            </div>
                            <div className="flex items-center gap-1.5 text-xs font-bold text-[var(--text-primary)]">
                              <Phone className="w-3.5 h-3.5 text-[#71717A] shrink-0" />
                              <span>{founder.phone}</span>
                            </div>
                            <div className="flex items-center gap-1.5 text-[11px] text-[var(--text-secondary)]">
                              <GmailBrandIcon size="sm" />
                              <span className="truncate">{founder.email}</span>
                            </div>
                          </div>
                        </div>

                        {/* Technical Skills & Core CS Concepts */}
                        <div className="space-y-2">
                          <div className="font-mono-tech text-[10px] uppercase tracking-widest text-[var(--text-muted)] flex items-center gap-1.5">
                            <Code2 className="w-3.5 h-3.5 text-[var(--text-primary)]" />
                            <span>LANGUAGES, FRAMEWORKS & CORE ARCHITECTURE</span>
                          </div>
                          <div className="flex flex-wrap gap-1.5">
                            {[
                              ...founder.languages,
                              ...founder.frameworksAndTools,
                              ...founder.coreConcepts,
                            ].map((skill) => (
                              <span
                                key={skill}
                                className="px-2.5 py-1 rounded-lg surface-elevated font-mono-tech text-[10px] text-[var(--text-primary)] font-medium"
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Experience */}
                        <div className="space-y-2.5">
                          <div className="font-mono-tech text-[10px] uppercase tracking-widest text-[var(--text-muted)] flex items-center gap-1.5">
                            <Briefcase className="w-3.5 h-3.5 text-[var(--text-primary)]" />
                            <span>ENGINEERING LEADERSHIP</span>
                          </div>
                          <div className="space-y-2">
                            {founder.experience.map((exp) => (
                              <div
                                key={`${exp.role}-${exp.company}`}
                                className="p-3.5 rounded-2xl surface-elevated space-y-1.5"
                              >
                                <div className="flex flex-wrap items-center justify-between gap-2">
                                  <span className="font-display font-bold text-xs sm:text-sm text-[var(--text-primary)]">
                                    {exp.role} — {exp.company}
                                  </span>
                                  <span className="font-mono-tech text-[10px] px-2 py-0.5 rounded badge-platinum font-semibold">
                                    {exp.period}
                                  </span>
                                </div>
                                <ul className="space-y-1 text-[11px] text-[var(--text-secondary)]">
                                  {exp.highlights.map((h) => (
                                    <li key={h} className="flex items-start gap-1.5">
                                      <CheckCircle2 className="w-3 h-3 text-[#10B981] shrink-0 mt-0.5" />
                                      <span>{h}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Key Engineering Projects */}
                        <div className="space-y-2.5">
                          <div className="font-mono-tech text-[10px] uppercase tracking-widest text-[var(--text-muted)] flex items-center gap-1.5">
                            <FolderGit2 className="w-3.5 h-3.5 text-[var(--text-primary)]" />
                            <span>SIGNATURE SYSTEMS & PROJECTS</span>
                          </div>
                          <div className="space-y-2.5">
                            {founder.projects.map((proj) => (
                              <div
                                key={proj.name}
                                className="p-3.5 rounded-2xl surface-elevated space-y-1.5"
                              >
                                <div className="flex flex-wrap items-center justify-between gap-2">
                                  <div className="font-display font-bold text-xs sm:text-sm text-[var(--text-primary)]">
                                    {proj.name} —{' '}
                                    <span className="font-normal text-[var(--text-secondary)]">
                                      {proj.subtitle}
                                    </span>
                                  </div>
                                </div>
                                <div className="font-mono-tech text-[10px] text-[#71717A] dark:text-[#A1A1AA]">
                                  Stack: {proj.stack}
                                </div>
                                <ul className="space-y-1 text-[11px] text-[var(--text-secondary)]">
                                  {proj.highlights.map((h) => (
                                    <li key={h} className="flex items-start gap-1.5">
                                      <CheckCircle2 className="w-3 h-3 text-[#10B981] shrink-0 mt-0.5" />
                                      <span>{h}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Certifications */}
                        <div className="space-y-2">
                          <div className="font-mono-tech text-[10px] uppercase tracking-widest text-[var(--text-muted)] flex items-center gap-1.5">
                            <Award className="w-3.5 h-3.5 text-[var(--text-primary)]" />
                            <span>VERIFIED CERTIFICATIONS & CREDENTIALS</span>
                          </div>
                          <div className="grid grid-cols-1 gap-1.5">
                            {founder.certifications.map((cert) => (
                              <div
                                key={cert}
                                className="flex items-center gap-2 text-[11px] text-[var(--text-secondary)]"
                              >
                                <span className="w-1.5 h-1.5 rounded-full bg-[var(--text-primary)] shrink-0" />
                                <span>{cert}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Founder Card Footer Location */}
                      <div className="pt-4 border-t border-[var(--border-hairline)] flex flex-wrap items-center justify-between gap-3 text-xs">
                        <span className="inline-flex items-center gap-1.5 font-mono-tech text-[10px] text-[var(--text-muted)]">
                          <MapPin className="w-3.5 h-3.5 text-[var(--text-primary)]" />
                          <span>{founder.location}</span>
                        </span>
                        <span className="font-mono-tech text-[10px] text-[var(--text-primary)] font-semibold">
                          SKYLINE DIGITAL AGENCY
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 3 Core Doctrine Pillars */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="surface-card rounded-3xl p-7 sm:p-8 flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <div className="w-11 h-11 rounded-2xl surface-elevated flex items-center justify-center text-[var(--text-primary)]">
                    <Cpu className="w-5 h-5 text-[var(--text-primary)]" />
                  </div>
                  <div className="font-mono-tech text-[10px] uppercase tracking-widest text-[var(--text-muted)]">
                    DOCTRINE PILLAR • ARCHITECTURE
                  </div>
                  <h3 className="font-display text-xl sm:text-2xl font-bold text-[var(--text-primary)]">
                    First-Principles Software Architecture
                  </h3>
                  <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                    We never ship sluggish page-builder templates. Every platform is engineered from scratch on Next.js 15, TypeScript, Java Spring Boot, Node.js, and PostgreSQL for sub-second speed and bank-grade reliability.
                  </p>
                </div>
                <div className="pt-4 border-t border-[var(--border-hairline)] flex items-center justify-between font-mono-tech text-xs">
                  <span className="text-[var(--text-muted)]">BENCHMARK</span>
                  <span className="font-bold text-[var(--text-primary)]">99/100 Lighthouse SLA</span>
                </div>
              </div>

              <div className="surface-card rounded-3xl p-7 sm:p-8 flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <div className="w-11 h-11 rounded-2xl surface-elevated flex items-center justify-center text-[var(--text-primary)]">
                    <Zap className="w-5 h-5 text-[var(--text-primary)]" />
                  </div>
                  <div className="font-mono-tech text-[10px] uppercase tracking-widest text-[var(--text-muted)]">
                    DOCTRINE PILLAR • TRANSPARENCY
                  </div>
                  <h3 className="font-display text-xl sm:text-2xl font-bold text-[var(--text-primary)]">
                    Proof Before Promises
                  </h3>
                  <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                    Use our interactive 60-second estimator or request a complimentary 15-minute technical & funnel teardown on WhatsApp—so you see exact milestones, deliverables, and ROI projections before you pay.
                  </p>
                </div>
                <div className="pt-4 border-t border-[var(--border-hairline)] flex items-center justify-between font-mono-tech text-xs">
                  <span className="text-[var(--text-muted)]">SCOPE CLARITY</span>
                  <span className="font-bold text-[var(--text-primary)]">Fixed-Milestone Delivery</span>
                </div>
              </div>

              <div className="surface-card rounded-3xl p-7 sm:p-8 flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <div className="w-11 h-11 rounded-2xl surface-elevated flex items-center justify-center text-[var(--text-primary)]">
                    <ShieldCheck className="w-5 h-5 text-[var(--text-primary)]" />
                  </div>
                  <div className="font-mono-tech text-[10px] uppercase tracking-widest text-[var(--text-muted)]">
                    DOCTRINE PILLAR • REVENUE ENGINE
                  </div>
                  <h3 className="font-display text-xl sm:text-2xl font-bold text-[var(--text-primary)]">
                    Full-Funnel Ownership
                  </h3>
                  <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                    A great website without traffic—or traffic without instant WhatsApp follow-up—leaks revenue. We unify your web platform, 24/7 WhatsApp AI bot, #1 Google Map Pack SEO, and Meta/Google CAPI ads under one roof.
                  </p>
                </div>
                <div className="pt-4 border-t border-[var(--border-hairline)] flex items-center justify-between font-mono-tech text-xs">
                  <span className="text-[var(--text-muted)]">CLIENT RIGHTS</span>
                  <span className="font-bold text-[var(--text-primary)]">100% Source Code & Data</span>
                </div>
              </div>
            </div>

            {/* Live Interactive Telemetry Strip */}
            <div className="surface-card rounded-3xl p-6 sm:p-8 grid grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { value: '< 0.5s', label: 'Average Edge Page Load', note: 'Next.js 15 + Redis SSR' },
                { value: '< 1.2s', label: 'WhatsApp AI Lead Reply', note: '24/7 Official Cloud API' },
                { value: '4.1x', label: 'Verified Blended ROAS', note: 'Server-Side Meta CAPI' },
                { value: '100%', label: 'Code & Account Ownership', note: 'Zero Lock-In Retainers' },
              ].map((stat) => (
                <div key={stat.label} className="space-y-1">
                  <div className="font-display text-2xl sm:text-4xl font-extrabold text-[var(--text-primary)] tabular-nums">
                    {stat.value}
                  </div>
                  <div className="font-display text-xs sm:text-sm font-bold text-[var(--text-primary)]">
                    {stat.label}
                  </div>
                  <div className="font-mono-tech text-[11px] text-[var(--text-muted)]">
                    {stat.note}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Case Study Detail Modal */}
      {selectedProject && (
        <div
          className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
          onClick={() => setSelectedProject(null)}
        >
          <div
            className="surface-card rounded-3xl max-w-3xl w-full overflow-hidden shadow-2xl my-auto border border-[var(--border-strong)]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative h-56 sm:h-64 border-b border-[var(--border-hairline)]">
              <ArchitecturalProjectMockup project={selectedProject} />
              <button
                onClick={() => setSelectedProject(null)}
                aria-label="Close Case Study Modal"
                className="absolute top-3 right-3 z-20 p-2 rounded-full bg-zinc-900/90 text-white hover:bg-zinc-800 border border-zinc-700 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-6 sm:p-8 space-y-6">
              <div>
                <div className="font-mono-tech text-[10px] uppercase tracking-widest text-[var(--text-muted)] mb-1">
                  {selectedProject.clientType || selectedProject.locationTag} •{' '}
                  {selectedProject.categoryTag || selectedProject.category}
                </div>
                <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-[var(--text-primary)]">
                  {selectedProject.title}
                </h3>
                <p className="text-xs sm:text-sm text-[var(--text-secondary)] mt-2">
                  {selectedProject.summary || selectedProject.architectureSummary}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="surface-elevated rounded-2xl p-4 space-y-1.5">
                  <div className="font-mono-tech text-[10px] uppercase tracking-widest text-[var(--text-muted)] font-semibold">
                    THE BOTTLENECK
                  </div>
                  <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                    {selectedProject.challenge ||
                      selectedProject.problemStatement ||
                      'Legacy architecture and manual lead handling limited conversion velocity.'}
                  </p>
                </div>
                <div className="surface-elevated rounded-2xl p-4 space-y-1.5">
                  <div className="font-mono-tech text-[10px] uppercase tracking-widest text-[var(--text-primary)] font-semibold">
                    THE SKYLINE ARCHITECTURE
                  </div>
                  <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                    {selectedProject.solution ||
                      selectedProject.architectureSummary ||
                      'Deployed a custom high-speed stack with automated WhatsApp and CRM routing.'}
                  </p>
                </div>
              </div>

              {selectedProject.results && selectedProject.results.length > 0 && (
                <div className="space-y-2">
                  <div className="font-mono-tech text-[10px] uppercase tracking-widest text-[var(--text-muted)]">
                    VERIFIED PRODUCTION OUTCOMES
                  </div>
                  <div className="grid grid-cols-1 gap-2">
                    {selectedProject.results.map((res: string) => (
                      <div
                        key={res}
                        className="flex items-center gap-2.5 p-3 rounded-xl surface-elevated text-xs font-medium text-[var(--text-primary)]"
                      >
                        <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0" />
                        <span>{res}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="pt-4 border-t border-[var(--border-hairline)] flex flex-wrap items-center justify-between gap-3">
                <div className="flex flex-wrap gap-1.5">
                  {(selectedProject.techStack || selectedProject.stackPills || []).map(
                    (t: string) => (
                      <span
                        key={t}
                        className="px-2.5 py-1 rounded-md surface-elevated font-mono-tech text-[10px] text-[var(--text-secondary)]"
                      >
                        {t}
                      </span>
                    )
                  )}
                </div>

                <button
                  onClick={() => {
                    setSelectedProject(null);
                    onNavigate('contact');
                  }}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full btn-platinum-primary text-xs font-bold cursor-pointer"
                >
                  <span>Build Similar System</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

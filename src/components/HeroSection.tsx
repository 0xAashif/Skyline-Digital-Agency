import React, { useState, useEffect, useRef } from 'react';
import {
  ArrowUpRight,
  CheckCircle2,
  Sparkles,
  Layers,
  MapPin,
  X,
  Terminal,
  ShieldCheck,
  Code2,
  Cpu,
  Search,
  Compass,
  Zap,
} from 'lucide-react';
import {
  HERO_ORBS,
  TECH_STACK_MARQUEE_ROW_1,
  TECH_STACK_MARQUEE_ROW_2,
  BENTO_SOLUTIONS,
  SHOWCASE_PROJECTS,
  SKYLINE_WHATSAPP_NUMBER,
  SKYLINE_EMAIL,
  SKYLINE_LOCATION,
  BentoSolutionCard,
  ShowcaseProject,
} from '../data/agencyData';
import {
  WhatsAppBrandBadge,
  GmailBrandIcon,
  SocialIconBar,
  TechStackBrandIcon,
} from './BrandIcons';

interface HeroSectionProps {
  onNavigate: (sectionId: string) => void;
  projects?: ShowcaseProject[];
}

/**
 * Direction 2 Centerpiece: Continuous 360° 3D Geodesic Wireframe Sphere Canvas
 * Rendered in brushed metallic platinum/silver lines with a sleek translucent orbital ring,
 * dynamically syncing its active core nodes & pulse paths to the currently active orb's
 * Human Psychology Color.
 */
const HeroGeodesicSphereCanvas: React.FC<{ activeColor: string }> = ({ activeColor }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const activeColorRef = useRef(activeColor);

  useEffect(() => {
    activeColorRef.current = activeColor;
  }, [activeColor]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let rafId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 460);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 380);

    const handleResize = () => {
      if (!canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };
    window.addEventListener('resize', handleResize);

    // Build a true subdivided 3D Geodesic Sphere (Icosahedron -> Subdivided Frequency-2 Sphere)
    interface Vec3 {
      x: number;
      y: number;
      z: number;
    }
    const normalize = (v: Vec3): Vec3 => {
      const len = Math.hypot(v.x, v.y, v.z) || 1;
      return { x: v.x / len, y: v.y / len, z: v.z / len };
    };

    const phi = (1 + Math.sqrt(5)) / 2;
    const baseVerts: Vec3[] = [
      { x: -1, y: phi, z: 0 },
      { x: 1, y: phi, z: 0 },
      { x: -1, y: -phi, z: 0 },
      { x: 1, y: -phi, z: 0 },
      { x: 0, y: -1, z: phi },
      { x: 0, y: 1, z: phi },
      { x: 0, y: -1, z: -phi },
      { x: 0, y: 1, z: -phi },
      { x: phi, y: 0, z: -1 },
      { x: phi, y: 0, z: 1 },
      { x: -phi, y: 0, z: -1 },
      { x: -phi, y: 0, z: 1 },
    ].map(normalize);

    const faces: [number, number, number][] = [
      [0, 11, 5], [0, 5, 1], [0, 1, 7], [0, 7, 10], [0, 10, 11],
      [1, 5, 9], [5, 11, 4], [11, 10, 2], [10, 7, 6], [7, 1, 8],
      [3, 9, 4], [3, 4, 2], [3, 2, 6], [3, 6, 8], [3, 8, 9],
      [4, 9, 5], [2, 4, 11], [6, 2, 10], [8, 6, 7], [9, 8, 1],
    ];

    const vertices: Vec3[] = [...baseVerts];
    const midCache = new Map<string, number>();
    const getMidpoint = (i1: number, i2: number): number => {
      const key = i1 < i2 ? `${i1}_${i2}` : `${i2}_${i1}`;
      const existing = midCache.get(key);
      if (existing !== undefined) return existing;
      const v1 = vertices[i1];
      const v2 = vertices[i2];
      const mid = normalize({
        x: (v1.x + v2.x) * 0.5,
        y: (v1.y + v2.y) * 0.5,
        z: (v1.z + v2.z) * 0.5,
      });
      const idx = vertices.length;
      vertices.push(mid);
      midCache.set(key, idx);
      return idx;
    };

    const subFaces: [number, number, number][] = [];
    for (const [a, b, c] of faces) {
      const ab = getMidpoint(a, b);
      const bc = getMidpoint(b, c);
      const ca = getMidpoint(c, a);
      subFaces.push([a, ab, ca], [b, bc, ab], [c, ca, bc], [ab, bc, ca]);
    }

    const edgeSet = new Set<string>();
    const edges: [number, number][] = [];
    const addEdge = (i: number, j: number) => {
      const key = i < j ? `${i}_${j}` : `${j}_${i}`;
      if (!edgeSet.has(key)) {
        edgeSet.add(key);
        edges.push([i, j]);
      }
    };
    for (const [a, b, c] of subFaces) {
      addEdge(a, b);
      addEdge(b, c);
      addEdge(c, a);
    }

    let rotX = 0.35;
    let rotY = 0.5;
    let rotZ = 0.12;

    const render = () => {
      rotY += 0.0085;
      rotX += 0.0038;
      rotZ += 0.0022;

      ctx.clearRect(0, 0, width, height);

      const cx = width * 0.5;
      const cy = height * 0.5;
      const radius = Math.min(width, height) * 0.31;
      const isDark = document.documentElement.classList.contains('dark');
      const baseRgb = isDark ? '226, 232, 240' : '24, 24, 27';
      const psychHex = activeColorRef.current;

      // Subtle core radial glow in active psychological hue
      const glow = ctx.createRadialGradient(cx, cy, radius * 0.08, cx, cy, radius * 1.35);
      glow.addColorStop(0, `${psychHex}26`);
      glow.addColorStop(0.55, `${psychHex}0C`);
      glow.addColorStop(1, 'transparent');
      ctx.fillStyle = glow;
      ctx.beginPath();
      ctx.arc(cx, cy, radius * 1.35, 0, Math.PI * 2);
      ctx.fill();

      // Sleek outer equatorial orbital ring
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(-0.24);
      ctx.beginPath();
      ctx.ellipse(0, 0, radius * 1.36, radius * 0.44, 0, 0, Math.PI * 2);
      ctx.strokeStyle = isDark ? 'rgba(148, 163, 184, 0.25)' : 'rgba(24, 24, 27, 0.16)';
      ctx.lineWidth = 1.1;
      ctx.setLineDash([5, 6]);
      ctx.stroke();
      ctx.restore();

      const cosX = Math.cos(rotX);
      const sinX = Math.sin(rotX);
      const cosY = Math.cos(rotY);
      const sinY = Math.sin(rotY);
      const cosZ = Math.cos(rotZ);
      const sinZ = Math.sin(rotZ);

      const projected = vertices.map((v) => {
        const y1 = v.y * cosX - v.z * sinX;
        const z1 = v.y * sinX + v.z * cosX;
        const x2 = v.x * cosY + z1 * sinY;
        const z2 = -v.x * sinY + z1 * cosY;
        const x3 = x2 * cosZ - y1 * sinZ;
        const y3 = x2 * sinZ + y1 * cosZ;

        const perspective = 3.2 / (3.2 - z2 * 0.85);
        return {
          x: cx + x3 * radius * perspective,
          y: cy + y3 * radius * perspective,
          z: z2,
        };
      });

      // Draw geodesic wireframe edges
      for (let i = 0; i < edges.length; i++) {
        const [a, b] = edges[i];
        const p1 = projected[a];
        const p2 = projected[b];
        const avgZ = (p1.z + p2.z) * 0.5;
        const alpha = Math.max(0.1, Math.min(0.78, (avgZ + 1.15) * 0.36));

        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        if (i % 7 === 0 && avgZ > 0.15) {
          ctx.strokeStyle = psychHex;
          ctx.globalAlpha = alpha * 0.85;
          ctx.lineWidth = 1.35;
        } else {
          ctx.strokeStyle = `rgba(${baseRgb}, ${alpha})`;
          ctx.globalAlpha = 1;
          ctx.lineWidth = avgZ > 0 ? 1.15 : 0.75;
        }
        ctx.stroke();
      }
      ctx.globalAlpha = 1;

      // Draw geodesic vertices (highlighting prime nodes in the psychological hue)
      for (let i = 0; i < projected.length; i++) {
        const p = projected[i];
        const alpha = Math.max(0.2, Math.min(0.95, (p.z + 1.1) * 0.45));
        const isAccentNode = i % 6 === 0 && p.z > 0;
        const nodeRadius = isAccentNode ? 3.2 : Math.max(1.4, (p.z + 1.4) * 1.05);

        ctx.beginPath();
        ctx.arc(p.x, p.y, nodeRadius, 0, Math.PI * 2);
        if (isAccentNode) {
          ctx.fillStyle = psychHex;
          ctx.shadowColor = psychHex;
          ctx.shadowBlur = 8;
        } else {
          ctx.fillStyle = `rgba(${baseRgb}, ${alpha})`;
          ctx.shadowBlur = 0;
        }
        ctx.fill();
      }
      ctx.shadowBlur = 0;

      rafId = requestAnimationFrame(render);
    };

    rafId = requestAnimationFrame(render);
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full block pointer-events-none"
      aria-label="360 degree rotating 3D geodesic sphere"
    />
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

// Orbital positions (in degrees) for the 7 psychological orbs around the 3D Geodesic Sphere
const ORB_ANGLES_DEG = [-90, -38, 14, 66, 116, 166, 218];

export const HeroSection: React.FC<HeroSectionProps> = ({
  onNavigate,
  projects = SHOWCASE_PROJECTS,
}) => {
  const [activeOrbIndex, setActiveOrbIndex] = useState<number>(0);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [selectedProject, setSelectedProject] = useState<ShowcaseProject | null>(null);

  // Auto-cycle through all 7 psychological service orbs every 4.0 seconds when idle
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setActiveOrbIndex((prev) => (prev + 1) % HERO_ORBS.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [isPaused]);

  const activeOrb = HERO_ORBS[activeOrbIndex];

  return (
    <div className="relative overflow-hidden">
      {/* =====================================================================
          1. DIRECTION 2 HERO SECTION OVER DIRECTION 3 MILKY / OBSIDIAN CANVAS
             Split Layout + 360° 3D Geodesic Sphere + 7 Psychological Orbiting Circles
         ===================================================================== */}
      <section className="relative min-h-screen pt-24 pb-20 px-4 sm:px-8 lg:px-14 flex flex-col justify-between hero-architectural-bg border-b border-[var(--border-hairline)]">
        <div className="w-full max-w-7xl mx-auto my-auto py-6 lg:py-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Left Column (6 Cols): Editorial & Architectural Statement */}
            <div className="lg:col-span-6 space-y-6">
              {/* Subtle Kicker Pill with Muted Sage Dot (#10B981) */}
              <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full badge-sage-status">
                <span className="w-2 h-2 rounded-full bg-[#10B981]" />
                <span className="font-mono-tech text-[11px] uppercase tracking-widest text-[var(--text-primary)] font-semibold">
                  WEB, SAAS, AI, ADS & LOCAL BUSINESS GROWTH
                </span>
              </div>

              {/* Monumental 3-Line Headline (Montserrat ExtraBold + Playfair Display Italic Accent) */}
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

                {/* Concise 2-Line Poppins Subheadline */}
                <p className="font-sans-body text-sm sm:text-base lg:text-lg text-[var(--text-secondary)] max-w-xl leading-relaxed font-normal">
                  Full-stack software engineering, autonomous WhatsApp & AI workflows, high-ROAS Meta/Google ad funnels, and #1 Google Map Pack growth systems.
                </p>
              </div>

              {/* Quick Psychological Orb Bar (Accessible Pill Selector Synced with the 3D Sphere) */}
              <div className="pt-1">
                <div className="text-[10px] font-mono-tech uppercase tracking-widest text-[var(--text-muted)] mb-2">
                  INTERACTIVE CAPABILITY SPECTRUM — CLICK OR HOVER ANY ORB:
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  {HERO_ORBS.map((orb, idx) => {
                    const isSelected = activeOrbIndex === idx;
                    return (
                      <button
                        key={orb.id}
                        type="button"
                        onMouseEnter={() => {
                          setIsPaused(true);
                          setActiveOrbIndex(idx);
                        }}
                        onMouseLeave={() => setIsPaused(false)}
                        onClick={() => setActiveOrbIndex(idx)}
                        style={{
                          borderColor: isSelected ? orb.psychColor : undefined,
                          boxShadow: isSelected
                            ? `0 0 20px -4px ${orb.psychColor}66`
                            : undefined,
                        }}
                        className={`px-3 py-1.5 rounded-full text-xs font-display font-bold transition-all cursor-pointer inline-flex items-center gap-1.5 border ${
                          isSelected
                            ? 'bg-[var(--bg-surface)] text-[var(--text-primary)] scale-105'
                            : 'surface-elevated text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                        }`}
                      >
                        <span
                          className="w-2 h-2 rounded-full shrink-0"
                          style={{ backgroundColor: orb.psychColor }}
                        />
                        <span>{orb.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Action Row: Solid Obsidian/Platinum CTA + 60s Estimator + Official #25D366 WhatsApp Pill */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={() => onNavigate('contact')}
                  className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full btn-platinum-primary text-xs sm:text-sm font-bold tracking-wide cursor-pointer"
                >
                  <span>Start Your Project</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => onNavigate('simulator')}
                  className="inline-flex items-center gap-2 px-5 py-3.5 rounded-full btn-platinum-secondary text-xs sm:text-sm font-bold cursor-pointer"
                >
                  <span>60s Price Estimator</span>
                </button>

                <a
                  href={`https://wa.me/${SKYLINE_WHATSAPP_NUMBER}?text=${encodeURIComponent(
                    'Hi SkyLine Digital! I want a free audit and proposal for my business.'
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

            {/* Right Column (6 Cols): Direction 2 Centerpiece — 360° 3D Wireframe Sphere + 7 Psychological Orbiting Circles + Live Service Telemetry Card */}
            <div
              className="lg:col-span-6 flex flex-col items-center"
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
            >
              {/* 3D Geodesic Wireframe Sphere + 7 Orbiting Psychological Color Orbs */}
              <div className="relative w-full max-w-[470px] h-[330px] sm:h-[370px] flex items-center justify-center select-none">
                {/* 360° Auto-Rotating 3D Geodesic Sphere Canvas */}
                <HeroGeodesicSphereCanvas activeColor={activeOrb.psychColor} />

                {/* 7 Orbiting Psychological Color Circles */}
                {HERO_ORBS.map((orb, idx) => {
                  const angleRad = (ORB_ANGLES_DEG[idx] * Math.PI) / 180;
                  const rx = 41; // % of container width
                  const ry = 39; // % of container height
                  const leftPct = 50 + Math.cos(angleRad) * rx;
                  const topPct = 50 + Math.sin(angleRad) * ry;
                  const isActive = activeOrbIndex === idx;

                  return (
                    <button
                      key={orb.id}
                      type="button"
                      onMouseEnter={() => setActiveOrbIndex(idx)}
                      onClick={() => setActiveOrbIndex(idx)}
                      aria-label={`Inspect ${orb.label} — ${orb.title}`}
                      style={{
                        left: `${leftPct}%`,
                        top: `${topPct}%`,
                        background: `radial-gradient(circle at 30% 28%, #FFFFFF 0%, ${orb.psychColor} 48%, #0D0E12 100%)`,
                        boxShadow: isActive
                          ? `0 0 28px 4px ${orb.psychColor}88, inset 0 2px 4px rgba(255,255,255,0.65)`
                          : `0 10px 24px -4px ${orb.psychColor}55, inset 0 1px 3px rgba(255,255,255,0.45)`,
                        borderColor: isActive ? '#FFFFFF' : orb.psychColor,
                      }}
                      className={`-translate-x-1/2 -translate-y-1/2 absolute z-20 ${
                        idx % 2 === 0 ? 'orb-float-even' : 'orb-float-odd'
                      } w-12 h-12 sm:w-14 sm:h-14 rounded-full border-2 flex flex-col items-center justify-center cursor-pointer transition-all duration-300 ${
                        isActive ? 'scale-120 ring-4 ring-white/25' : 'opacity-95 hover:scale-110'
                      }`}
                    >
                      <span className="font-display font-extrabold text-[10px] sm:text-[11px] tracking-wider text-white drop-shadow-xs leading-none">
                        {orb.label}
                      </span>
                      <span className="w-1.5 h-1.5 rounded-full bg-white mt-1 shadow-xs" />
                    </button>
                  );
                })}
              </div>

              {/* Sleek Glassmorphic Live Service Telemetry Card Below the 3D Sphere */}
              <div className="w-full surface-card rounded-3xl p-5 sm:p-6 relative overflow-hidden transition-all duration-300">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                  <div className="inline-flex items-center gap-2">
                    <span
                      className="px-2.5 py-1 rounded-full font-display text-[10px] font-extrabold uppercase tracking-widest text-white shadow-xs"
                      style={{ backgroundColor: activeOrb.psychColor }}
                    >
                      {activeOrb.label} • {activeOrb.psychName}
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
                        <CheckCircle2
                          className="w-3 h-3 shrink-0"
                          style={{ color: activeOrb.psychColor }}
                        />
                        <span>{item}</span>
                      </span>
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={() => onNavigate(activeOrb.targetSection)}
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

        {/* Hero Bottom Metadata Bar with Complete 5-App Social Bar & Official Gmail Icon */}
        <div className="w-full max-w-7xl mx-auto pt-5 sm:pl-52 border-t border-[var(--border-hairline)] flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 text-xs text-[var(--text-secondary)]">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <div className="flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-[#10B981] shrink-0" />
              <span className="font-mono-tech text-[10px] uppercase tracking-widest text-[var(--text-muted)]">
                BASED IN:
              </span>
              <span className="font-medium text-[var(--text-primary)]">
                {SKYLINE_LOCATION}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <GmailBrandIcon size="sm" />
              <span className="font-mono-tech text-[10px] uppercase tracking-widest text-[var(--text-muted)]">
                OFFICIAL DESK:
              </span>
              <a
                href={`mailto:${SKYLINE_EMAIL}`}
                className="font-mono-tech font-medium text-[var(--text-primary)] hover:underline"
              >
                {SKYLINE_EMAIL}
              </a>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <SocialIconBar size="sm" />

            <button
              onClick={() => onNavigate('referral')}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full badge-platinum font-mono-tech text-[11px] font-semibold cursor-pointer hover:opacity-90 transition-opacity"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#10B981]" />
              <span>Refer a Client & Earn 15% Commission</span>
            </button>
          </div>
        </div>
      </section>

      {/* =====================================================================
          2. DUAL-ROW INFINITE TECH & GROWTH MARQUEE (WITH AUTHENTIC BRAND ICONS)
         ===================================================================== */}
      <section
        aria-label="Technology and Growth Stack"
        className="py-5 border-b border-[var(--border-hairline)] bg-[var(--bg-surface)] overflow-hidden space-y-3"
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
          3. BENTO GRID SERVICES MATRIX (#services)
         ===================================================================== */}
      <section
        id="services"
        className="py-20 sm:py-28 px-4 sm:px-8 lg:px-12 border-b border-[var(--border-hairline)] bg-[var(--bg-canvas)]"
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-14">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full badge-platinum mb-4">
                <Layers className="w-3.5 h-3.5 text-[#10B981]" />
                <span className="font-mono-tech text-[10px] uppercase tracking-widest font-semibold">
                  WHAT WE ENGINEER & SCALE
                </span>
              </div>
              <h2 className="font-display text-3xl sm:text-5xl font-extrabold tracking-tight text-[var(--text-primary)]">
                Complete Digital Systems for{' '}
                <span className="font-serif-editorial italic font-semibold">
                  Every Stage.
                </span>
              </h2>
            </div>
            <p className="text-sm sm:text-base text-[var(--text-secondary)] max-w-md leading-relaxed">
              Whether you are a local clinic or retail store looking for daily walk-ins, or a high-growth startup scaling a SaaS product—we build the exact system you need.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
            {BENTO_SOLUTIONS.map((card) => (
              <div
                key={card.id}
                className={`${card.spanClass} surface-card rounded-3xl p-6 sm:p-8 flex flex-col justify-between group relative overflow-hidden`}
              >
                <div className="space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="px-3 py-1 rounded-full font-mono-tech text-[10px] font-semibold uppercase tracking-widest badge-platinum">
                      {card.tag}
                    </span>
                    <span className="px-3 py-1 rounded-full surface-elevated font-mono-tech text-xs font-bold text-[var(--text-primary)]">
                      {card.metric}
                    </span>
                  </div>

                  {/* Pure Code-Engineered Architectural Graphic (Zero Stock Photos) */}
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
                    onClick={() => onNavigate('contact')}
                    className="inline-flex items-center gap-1 font-display text-xs font-bold text-[var(--text-primary)] group-hover:translate-x-0.5 transition-transform cursor-pointer shrink-0"
                  >
                    <span>Get Quote</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================================
          4. OUR WORK / VERIFIED PROJECT SHOWCASE (#work)
         ===================================================================== */}
      <section
        id="work"
        className="py-20 sm:py-28 px-4 sm:px-8 lg:px-12 border-b border-[var(--border-hairline)] bg-[var(--bg-secondary)]"
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-14">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full badge-platinum mb-4">
                <Code2 className="w-3.5 h-3.5 text-[#10B981]" />
                <span className="font-mono-tech text-[10px] uppercase tracking-widest font-semibold">
                  SELECTED CASE STUDIES & DEPLOYMENTS
                </span>
              </div>
              <h2 className="font-display text-3xl sm:text-5xl font-extrabold tracking-tight text-[var(--text-primary)]">
                Engineered for{' '}
                <span className="font-serif-editorial italic font-semibold">
                  Measurable ROI.
                </span>
              </h2>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => onNavigate('simulator')}
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
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.map((project) => (
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
        </div>
      </section>

      {/* =====================================================================
          5. DEDICATED "WHO WE ARE" SECTION (#who-we-are)
             Senior-Led Engineering. *Zero Agency Bloat.*
         ===================================================================== */}
      <section
        id="who-we-are"
        className="py-20 sm:py-28 px-4 sm:px-8 lg:px-12 border-b border-[var(--border-hairline)] bg-[var(--bg-canvas)]"
      >
        <div className="max-w-7xl mx-auto space-y-14">
          {/* Header */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div className="space-y-4 max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full badge-sage-status">
                <Compass className="w-3.5 h-3.5 text-[#10B981]" />
                <span className="font-mono-tech text-[10px] uppercase tracking-widest font-semibold">
                  WHO WE ARE • THE SKYLINE DOCTRINE
                </span>
              </div>

              <h2 className="font-display text-3xl sm:text-5xl font-extrabold tracking-tight text-[var(--text-primary)] leading-[1.08]">
                Senior-Led Engineering.{' '}
                <span className="font-serif-editorial italic font-semibold">
                  Zero Agency Bloat.
                </span>
              </h2>
            </div>

            <p className="text-sm sm:text-base text-[var(--text-secondary)] max-w-md leading-relaxed">
              Traditional agencies outsource your code to junior freelancers and hide behind vanity PDF reports. At SkyLine Digital, you work directly with senior full-stack architects and growth engineers—from first wireframe to compounding revenue.
            </p>
          </div>

          {/* 3 Core Doctrine Pillars */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="surface-card rounded-3xl p-7 sm:p-8 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="w-11 h-11 rounded-2xl surface-elevated flex items-center justify-center text-[var(--text-primary)]">
                  <Cpu className="w-5 h-5 text-[#10B981]" />
                </div>
                <div className="font-mono-tech text-[10px] uppercase tracking-widest text-[var(--text-muted)]">
                  DOCTRINE PILLAR • ARCHITECTURE
                </div>
                <h3 className="font-display text-xl sm:text-2xl font-bold text-[var(--text-primary)]">
                  First-Principles Software Architecture
                </h3>
                <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                  We never ship sluggish page-builder templates. Every platform is engineered from scratch on Next.js 15, TypeScript, Python/Node, and PostgreSQL for sub-second speed and bank-grade reliability.
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
                  <Zap className="w-5 h-5 text-[#10B981]" />
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
                  <ShieldCheck className="w-5 h-5 text-[#10B981]" />
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

      {/* Case Study Detail Modal (Zero Stock Photos) */}
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

import React, { useState, useEffect, useRef } from 'react';
import {
  ArrowUpRight,
  Cpu,
  Layers,
  Terminal,
  TrendingUp,
  CheckCircle2,
  Store,
  Rotate3d,
} from 'lucide-react';
import { CAPABILITY_PILLARS, CapabilityPillar } from '../data/agencyData';

interface CapabilitiesMatrixProps {
  onSelectCapability: (pillarTitle: string) => void;
  pillars?: CapabilityPillar[];
}

interface Vec3 {
  x: number;
  y: number;
  z: number;
}

const normalizeVec = (v: Vec3): Vec3 => {
  const len = Math.hypot(v.x, v.y, v.z) || 1;
  return { x: v.x / len, y: v.y / len, z: v.z / len };
};

// Build a true subdivided 3D Geodesic Sphere (42 vertices, 120 geodesic edges)
const PHI = (1 + Math.sqrt(5)) / 2;
const BASE_ICO_VERTS: Vec3[] = [
  { x: -1, y: PHI, z: 0 },
  { x: 1, y: PHI, z: 0 },
  { x: -1, y: -PHI, z: 0 },
  { x: 1, y: -PHI, z: 0 },
  { x: 0, y: -1, z: PHI },
  { x: 0, y: 1, z: PHI },
  { x: 0, y: -1, z: -PHI },
  { x: 0, y: 1, z: -PHI },
  { x: PHI, y: 0, z: -1 },
  { x: PHI, y: 0, z: 1 },
  { x: -PHI, y: 0, z: -1 },
  { x: -PHI, y: 0, z: 1 },
].map(normalizeVec);

const BASE_ICO_FACES: [number, number, number][] = [
  [0, 11, 5], [0, 5, 1], [0, 1, 7], [0, 7, 10], [0, 10, 11],
  [1, 5, 9], [5, 11, 4], [11, 10, 2], [10, 7, 6], [7, 1, 8],
  [3, 9, 4], [3, 4, 2], [3, 2, 6], [3, 6, 8], [3, 8, 9],
  [4, 9, 5], [2, 4, 11], [6, 2, 10], [8, 6, 7], [9, 8, 1],
];

const GEODESIC_VERTICES: Vec3[] = [...BASE_ICO_VERTS];
const MID_CACHE = new Map<string, number>();

const getMidVert = (i1: number, i2: number): number => {
  const key = i1 < i2 ? `${i1}_${i2}` : `${i2}_${i1}`;
  const found = MID_CACHE.get(key);
  if (found !== undefined) return found;
  const v1 = GEODESIC_VERTICES[i1];
  const v2 = GEODESIC_VERTICES[i2];
  const mid = normalizeVec({
    x: (v1.x + v2.x) * 0.5,
    y: (v1.y + v2.y) * 0.5,
    z: (v1.z + v2.z) * 0.5,
  });
  const idx = GEODESIC_VERTICES.length;
  GEODESIC_VERTICES.push(mid);
  MID_CACHE.set(key, idx);
  return idx;
};

const GEODESIC_EDGES: [number, number][] = [];
const EDGE_SET = new Set<string>();
const pushEdge = (a: number, b: number) => {
  const key = a < b ? `${a}_${b}` : `${b}_${a}`;
  if (!EDGE_SET.has(key)) {
    EDGE_SET.add(key);
    GEODESIC_EDGES.push([a, b]);
  }
};

for (const [a, b, c] of BASE_ICO_FACES) {
  const ab = getMidVert(a, b);
  const bc = getMidVert(b, c);
  const ca = getMidVert(c, a);
  for (const [v0, v1, v2] of [
    [a, ab, ca],
    [b, bc, ab],
    [c, ca, bc],
    [ab, bc, ca],
  ]) {
    pushEdge(v0, v1);
    pushEdge(v1, v2);
    pushEdge(v2, v0);
  }
}

export const CapabilitiesMatrix: React.FC<CapabilitiesMatrixProps> = ({
  onSelectCapability,
  pillars = CAPABILITY_PILLARS,
}) => {
  const [activeId, setActiveId] = useState<string>(
    pillars[0]?.id || CAPABILITY_PILLARS[0].id
  );
  const activePillar =
    pillars.find((p) => p.id === activeId) || pillars[0] || CAPABILITY_PILLARS[0];

  // Continuous 360-degree 3D Geodesic Sphere rotation state
  const [angles, setAngles] = useState({ x: 0.35, y: 0.6, z: 0.12 });
  const dragRef = useRef<{ isDragging: boolean; lastX: number; lastY: number }>({
    isDragging: false,
    lastX: 0,
    lastY: 0,
  });

  useEffect(() => {
    let rafId: number;
    const animate = () => {
      if (!dragRef.current.isDragging) {
        setAngles((prev) => ({
          x: prev.x + 0.006,
          y: prev.y + 0.011,
          z: prev.z + 0.003,
        }));
      }
      rafId = requestAnimationFrame(animate);
    };
    rafId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafId);
  }, []);

  const handlePointerDown = (e: React.PointerEvent<SVGSVGElement>) => {
    dragRef.current = {
      isDragging: true,
      lastX: e.clientX,
      lastY: e.clientY,
    };
  };

  const handlePointerMove = (e: React.PointerEvent<SVGSVGElement>) => {
    if (!dragRef.current.isDragging) return;
    const dx = e.clientX - dragRef.current.lastX;
    const dy = e.clientY - dragRef.current.lastY;
    dragRef.current.lastX = e.clientX;
    dragRef.current.lastY = e.clientY;
    setAngles((prev) => ({
      ...prev,
      y: prev.y + dx * 0.012,
      x: prev.x + dy * 0.012,
    }));
  };

  const handlePointerUp = () => {
    dragRef.current.isDragging = false;
  };

  const getPillarIcon = (id: string) => {
    switch (id) {
      case 'software-engineering':
        return <Terminal className="w-5 h-5" />;
      case 'ai-automation':
        return <Cpu className="w-5 h-5" />;
      case 'growth-systems':
        return <TrendingUp className="w-5 h-5" />;
      case 'local-business':
        return <Store className="w-5 h-5" />;
      default:
        return <Layers className="w-5 h-5" />;
    }
  };

  // Project subdivided 3D geodesic sphere vertices to 2D SVG coordinates
  const projectedVertices = GEODESIC_VERTICES.map((v) => {
    const cosX = Math.cos(angles.x);
    const sinX = Math.sin(angles.x);
    const y1 = v.y * cosX - v.z * sinX;
    const z1 = v.y * sinX + v.z * cosX;

    const cosY = Math.cos(angles.y);
    const sinY = Math.sin(angles.y);
    const x2 = v.x * cosY + z1 * sinY;
    const z2 = -v.x * sinY + z1 * cosY;

    const cosZ = Math.cos(angles.z);
    const sinZ = Math.sin(angles.z);
    const x3 = x2 * cosZ - y1 * sinZ;
    const y3 = x2 * sinZ + y1 * cosZ;

    const scale = 250 / (3.4 - z2 * 0.78);
    return {
      cx: 160 + x3 * scale,
      cy: 115 + y3 * scale,
      depth: z2,
    };
  });

  return (
    <section
      id="expertise"
      className="py-20 sm:py-28 px-4 sm:px-8 lg:px-12 border-b border-[var(--border-hairline)] relative bg-[var(--bg-secondary)]"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-14">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full badge-platinum mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]" />
              <span className="font-mono-tech text-[10px] uppercase tracking-widest font-semibold">
                OUR CORE EXPERTISE
              </span>
            </div>
            <h2 className="font-display text-3xl sm:text-5xl font-extrabold tracking-tight text-[var(--text-primary)]">
              Built for Startups, Enterprises &{' '}
              <span className="font-serif-editorial italic font-semibold">
                Local Businesses.
              </span>
            </h2>
          </div>
          <p className="text-sm sm:text-base text-[var(--text-secondary)] max-w-md leading-relaxed">
            Select a track below to inspect how we architect websites, AI automation, ad funnels, and local Google Maps dominance.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Pillar Selector Tabs */}
          <div className="lg:col-span-5 space-y-3">
            {pillars.map((pillar) => {
              const isActive = pillar.id === activeId;
              return (
                <button
                  key={pillar.id}
                  onClick={() => setActiveId(pillar.id)}
                  className={`w-full text-left p-5 sm:p-6 rounded-2xl transition-all duration-300 cursor-pointer relative overflow-hidden ${
                    isActive
                      ? 'btn-platinum-primary shadow-xl'
                      : 'surface-card hover:border-[var(--border-strong)]'
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2.5">
                        <span
                          className={`font-mono-tech text-[10px] uppercase tracking-widest font-semibold ${
                            isActive
                              ? 'opacity-80'
                              : 'text-[var(--text-muted)]'
                          }`}
                        >
                          {pillar.subtitle}
                        </span>
                      </div>
                      <h3 className="font-display text-lg sm:text-xl font-bold tracking-tight">
                        {pillar.title}
                      </h3>
                    </div>

                    <div
                      className={`p-2.5 rounded-xl border shrink-0 transition-transform duration-300 ${
                        isActive
                          ? 'border-current/20 bg-white/10 scale-105'
                          : 'border-[var(--border-hairline)] text-[var(--text-secondary)]'
                      }`}
                    >
                      {getPillarIcon(pillar.id)}
                    </div>
                  </div>

                  {/* Quick metric preview */}
                  <div
                    className={`mt-4 pt-3 border-t flex items-center justify-between text-xs font-mono-tech ${
                      isActive
                        ? 'border-current/15 opacity-90'
                        : 'border-[var(--border-hairline)] text-[var(--text-secondary)]'
                    }`}
                  >
                    <span>
                      {pillar.metrics && pillar.metrics[0] ? (
                        <>
                          {pillar.metrics[0].label}:{' '}
                          <strong>{pillar.metrics[0].value}</strong>
                        </>
                      ) : (
                        <strong>{pillar.outcomeMetric || '99.98% SLA'}</strong>
                      )}
                    </span>
                    <span className="inline-flex items-center gap-1 font-semibold">
                      <span>Inspect Track</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right Column: Active Pillar Deep-Dive + Continuous 360° 3D Geodesic Sphere */}
          <div className="lg:col-span-7 surface-card rounded-3xl p-6 sm:p-9 relative overflow-hidden">
            {/* Top Bar */}
            <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-[var(--border-hairline)]">
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 rounded-full font-mono-tech text-xs font-semibold badge-platinum">
                  {activePillar.subtitle}
                </span>
              </div>

              <span className="font-mono-tech text-[11px] px-3 py-1 rounded-full surface-elevated text-[var(--text-primary)]">
                {activePillar.architectureNote || 'Next.js 15 Edge + Cloud API'}
              </span>
            </div>

            {/* Interactive 360° 3D Rotating Geodesic Sphere + Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-5 my-6 items-center">
              <div className="md:col-span-6 surface-elevated rounded-2xl p-4 flex flex-col items-center justify-center relative overflow-hidden select-none">
                <div className="w-full flex items-center justify-between text-[10px] font-mono-tech text-[var(--text-muted)] mb-1">
                  <span className="inline-flex items-center gap-1 text-[var(--text-primary)] font-semibold">
                    <Rotate3d className="w-3.5 h-3.5 text-[#10B981]" />
                    <span>360° 3D GEODESIC SPHERE</span>
                  </span>
                  <span>DRAG TO ROTATE</span>
                </div>

                <svg
                  viewBox="0 0 320 230"
                  className="w-full h-48 cursor-grab active:cursor-grabbing touch-none"
                  onPointerDown={handlePointerDown}
                  onPointerMove={handlePointerMove}
                  onPointerUp={handlePointerUp}
                  onPointerLeave={handlePointerUp}
                  aria-label="Interactive 360 degree 3D geodesic sphere"
                >
                  {/* Outer spherical boundary halo */}
                  <circle
                    cx="160"
                    cy="115"
                    r="82"
                    fill="none"
                    stroke="var(--border-strong)"
                    strokeWidth="0.9"
                    opacity="0.35"
                  />

                  {/* Equatorial orbital ring */}
                  <ellipse
                    cx="160"
                    cy="115"
                    rx="108"
                    ry="34"
                    fill="none"
                    stroke="var(--border-strong)"
                    strokeWidth="1"
                    strokeDasharray="4 4"
                    opacity="0.5"
                    transform={`rotate(${(angles.z * 70) % 360} 160 115)`}
                  />

                  {/* Subdivided Geodesic Sphere Wireframe Edges */}
                  {GEODESIC_EDGES.map(([i, j], idx) => {
                    const v1 = projectedVertices[i];
                    const v2 = projectedVertices[j];
                    const avgDepth = (v1.depth + v2.depth) / 2;
                    const opacity = Math.max(0.12, Math.min(0.85, (avgDepth + 1.2) / 2.2));
                    return (
                      <line
                        key={idx}
                        x1={v1.cx}
                        y1={v1.cy}
                        x2={v2.cx}
                        y2={v2.cy}
                        stroke={idx % 11 === 0 && avgDepth > 0.2 ? '#10B981' : 'var(--text-primary)'}
                        strokeWidth={avgDepth > 0 ? '1.2' : '0.75'}
                        strokeOpacity={opacity}
                      />
                    );
                  })}

                  {/* Geodesic Sphere Nodes */}
                  {projectedVertices.map((v, idx) => {
                    const r = Math.max(1.4, (v.depth + 1.5) * 1.15);
                    const opacity = Math.max(0.22, Math.min(0.95, (v.depth + 1.2) / 2.1));
                    const isAccent = idx % 7 === 0 && v.depth > 0.15;
                    return (
                      <circle
                        key={idx}
                        cx={v.cx}
                        cy={v.cy}
                        r={isAccent ? r + 0.8 : r}
                        fill={isAccent ? '#10B981' : 'var(--text-primary)'}
                        fillOpacity={opacity}
                      />
                    );
                  })}
                </svg>
              </div>

              <div className="md:col-span-6 space-y-3">
                <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                  {activePillar.description || activePillar.subtitle}
                </p>

                <div className="grid grid-cols-2 gap-3 pt-1">
                  {(
                    activePillar.metrics || [
                      {
                        label: 'Outcome',
                        value: activePillar.outcomeMetric || '+150%',
                        delta: activePillar.timeline || '2–3 Weeks',
                      },
                    ]
                  ).map((metric) => (
                    <div
                      key={metric.label}
                      className="p-3.5 rounded-2xl surface-elevated flex flex-col justify-between"
                    >
                      <span className="font-mono-tech text-[10px] uppercase tracking-wider text-[var(--text-muted)]">
                        {metric.label}
                      </span>
                      <span className="font-display text-2xl font-extrabold tracking-tight text-[var(--text-primary)] my-1">
                        {metric.value}
                      </span>
                      <span className="font-mono-tech text-[10px] font-semibold text-[var(--text-secondary)]">
                        {metric.delta}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Deliverables Breakdown */}
            <div className="space-y-3">
              <div className="font-mono-tech text-[10px] uppercase tracking-widest text-[var(--text-muted)] mb-2">
                INCLUDED DELIVERABLES & OUTCOMES
              </div>

              {activePillar.deliverables.map((rawItem, idx) => {
                const item =
                  typeof rawItem === 'string'
                    ? {
                        name: rawItem,
                        spec: 'Production-grade engineering and automated integration.',
                        impact: activePillar.outcomeMetric || 'Verified SLA',
                      }
                    : rawItem;
                return (
                  <div
                    key={`${item.name}-${idx}`}
                    className="p-4 sm:p-5 rounded-2xl surface-elevated transition-colors"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-1.5">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0" />
                        <h4 className="font-display font-bold text-sm sm:text-base text-[var(--text-primary)]">
                          {item.name}
                        </h4>
                      </div>
                      <span className="font-mono-tech text-[11px] px-2.5 py-0.5 rounded-full badge-platinum w-fit font-semibold">
                        {item.impact}
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-[var(--text-secondary)] pl-6">
                      {item.spec}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Bottom CTA */}
            <div className="mt-7 pt-5 border-t border-[var(--border-hairline)] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="text-xs text-[var(--text-secondary)]">
                Need a custom package for{' '}
                <strong className="text-[var(--text-primary)]">
                  {activePillar.title}
                </strong>
                ?
              </div>
              <button
                onClick={() => onSelectCapability(activePillar.title)}
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full btn-platinum-primary text-xs font-bold tracking-wide cursor-pointer"
              >
                <span>Request Custom Quote</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Dedicated Local Business Spotlight Banner */}
        <div
          id="local-business"
          className="mt-10 surface-card rounded-3xl p-6 sm:p-8 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6"
        >
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full badge-sage-status">
              <Store className="w-3.5 h-3.5 text-[#10B981]" />
              <span className="font-mono-tech text-[10px] uppercase tracking-widest font-semibold">
                SPECIALIZED LOCAL BUSINESS PACKAGES
              </span>
            </div>
            <h3 className="font-display text-xl sm:text-2xl font-extrabold text-[var(--text-primary)]">
              Running a Clinic, Salon, Restaurant, Gym, or Retail Store?
            </h3>
            <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
              Get our complete Local Growth System: #1 Google Map Pack SEO, automated 5-star Google review QR standees, a mobile-first digital catalog, and a 24/7 WhatsApp booking bot.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              onClick={() => {
                setActiveId('local-business');
                onSelectCapability('Local Business Growth, Map Pack SEO & Digital Catalogs');
              }}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full btn-platinum-primary text-xs sm:text-sm font-bold cursor-pointer"
            >
              <span>Claim Local Business Package</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

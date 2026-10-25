import React, { useEffect, useRef, useState } from 'react';
import {
  CheckCircle2,
  ChevronRight,
  Cpu,
  Globe,
  Layers,
  MapPin,
  Share2,
  Smartphone,
  Sparkles,
  Star,
} from 'lucide-react';
import {
  CAPABILITY_PILLARS,
  CapabilityPillar,
  SemanticAccentColor,
} from '../data/agencyData';

interface CapabilitiesMatrixProps {
  selectedCapabilityId?: string | null;
  onSelectForProposal?: (pillarTitle: string) => void;
}

const getAccentPillClass = (accent: SemanticAccentColor): string => {
  switch (accent) {
    case 'emerald':
      return 'accent-pill-emerald';
    case 'indigo':
      return 'accent-pill-indigo';
    case 'violet':
      return 'accent-pill-violet';
    case 'amber':
      return 'accent-pill-amber';
    case 'cyan':
      return 'accent-pill-cyan';
    case 'rose':
      return 'accent-pill-rose';
  }
};

export const CapabilitiesMatrix: React.FC<CapabilitiesMatrixProps> = ({
  selectedCapabilityId,
  onSelectForProposal,
}) => {
  const [activeId, setActiveId] = useState<string>(CAPABILITY_PILLARS[0].id);
  const [rotation, setRotation] = useState<{ x: number; y: number }>({ x: 20, y: 0 });
  const targetTiltRef = useRef<{ x: number; yBoost: number }>({ x: 20, yBoost: 0 });

  useEffect(() => {
    if (selectedCapabilityId && CAPABILITY_PILLARS.some((p) => p.id === selectedCapabilityId)) {
      setActiveId(selectedCapabilityId);
    }
  }, [selectedCapabilityId]);

  // Continuous 360° Auto-Rotating 3D Architecture Mesh Loop
  useEffect(() => {
    let rafId: number;
    let angleY = 0;

    const animate = () => {
      angleY = (angleY + 0.65 + targetTiltRef.current.yBoost) % 360;
      setRotation((prev) => ({
        x: prev.x + (targetTiltRef.current.x - prev.x) * 0.08,
        y: angleY,
      }));
      rafId = window.requestAnimationFrame(animate);
    };

    rafId = window.requestAnimationFrame(animate);
    return () => window.cancelAnimationFrame(rafId);
  }, []);

  const activePillar: CapabilityPillar =
    CAPABILITY_PILLARS.find((p) => p.id === activeId) || CAPABILITY_PILLARS[0];

  const handleMouseMoveSphere = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const normX = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const normY = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    targetTiltRef.current = {
      x: Math.round(normY * 42),
      yBoost: normX * 1.4,
    };
  };

  const handleMouseLeaveSphere = () => {
    targetTiltRef.current = { x: 20, yBoost: 0 };
  };

  const handleRequestProposal = (pillarTitle: string) => {
    onSelectForProposal?.(pillarTitle);
    const contactEl = document.getElementById('contact');
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToSimulator = () => {
    const simEl = document.getElementById('system-simulator');
    if (simEl) {
      simEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const renderPillarIcon = (id: string) => {
    switch (id) {
      case 'local-business':
        return <MapPin className="w-5 h-5" aria-hidden="true" />;
      case 'web-engineering':
        return <Globe className="w-5 h-5" aria-hidden="true" />;
      case 'ai-crm':
        return <Cpu className="w-5 h-5" aria-hidden="true" />;
      case 'performance-ads':
        return <Sparkles className="w-5 h-5" aria-hidden="true" />;
      case 'seo-aeo':
        return <Layers className="w-5 h-5" aria-hidden="true" />;
      case 'organic-social':
        return <Share2 className="w-5 h-5" aria-hidden="true" />;
      default:
        return <Smartphone className="w-5 h-5" aria-hidden="true" />;
    }
  };

  // Compute dynamic 360° orbital points with semantic micro-accent colors
  const radX = (rotation.x * Math.PI) / 180;
  const radY = (rotation.y * Math.PI) / 180;
  const orbitDots = [
    { lat: 0.3, lon: 0.4, stroke: '#6366F1' },
    { lat: -0.4, lon: 1.2, stroke: '#8B5CF6' },
    { lat: 0.6, lon: -0.8, stroke: '#06B6D4' },
    { lat: -0.2, lon: -1.5, stroke: '#10B981' },
    { lat: 0.1, lon: 2.3, stroke: '#F59E0B' },
    { lat: 0.75, lon: 0.9, stroke: '#F43F5E' },
  ].map((pt) => {
    const cx = 140 + Math.sin(pt.lon + radY) * Math.cos(pt.lat) * 78;
    const cy = 140 + Math.sin(pt.lat + radX * 0.5) * 78;
    return { cx: Math.round(cx * 10) / 10, cy: Math.round(cy * 10) / 10, stroke: pt.stroke };
  });

  return (
    <section
      id="capabilities"
      className="py-16 sm:py-20 px-4 sm:px-6 lg:px-10 platinum-canvas border-t border-[var(--border-metallic)]"
    >
      <div className="max-w-[1320px] mx-auto space-y-9">
        {/* Centered Header */}
        <div className="text-center space-y-2.5">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full accent-pill-indigo font-mono text-[11px] font-bold tracking-widest">
            <Star className="w-3.5 h-3.5 fill-current" aria-hidden="true" />
            <span>OUR CORE EXPERTISE</span>
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-[var(--text-primary)] tracking-tight">
            Services We Provide
          </h2>
        </div>

        {/* Full-Width Rounded Pill Tab Switcher (Includes Dedicated "Local Businesses" Tab) */}
        <div
          role="tablist"
          aria-label="SkyLine Digital Core Capabilities"
          className="rounded-2xl platinum-card p-2 flex flex-wrap items-center justify-center gap-2"
        >
          {CAPABILITY_PILLARS.map((pillar) => {
            const selected = pillar.id === activePillar.id;
            return (
              <button
                key={pillar.id}
                role="tab"
                id={`tab-${pillar.id}`}
                aria-selected={selected}
                aria-controls={`panel-${pillar.id}`}
                type="button"
                onClick={() => setActiveId(pillar.id)}
                className={`px-4 py-2.5 min-h-[42px] rounded-xl text-xs font-display font-bold transition-all duration-150 inline-flex items-center gap-2 cursor-pointer whitespace-nowrap shrink-0 ${
                  selected
                    ? 'btn-platinum-primary shadow-sm'
                    : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                }`}
              >
                <span>{pillar.shortTab}</span>
              </button>
            );
          })}
        </div>

        {/* 2-Column Split: Left Continuous 360° Auto-Rotating 3D Model | Right Capability Specifications */}
        <div
          role="tabpanel"
          id={`panel-${activePillar.id}`}
          aria-labelledby={`tab-${activePillar.id}`}
          className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch"
        >
          {/* Left Card (5 Cols): Continuous 360° Auto-Rotating 3D Geodesic Wireframe Mesh */}
          <div
            onMouseMove={handleMouseMoveSphere}
            onMouseLeave={handleMouseLeaveSphere}
            className="lg:col-span-5 rounded-3xl platinum-card p-7 flex flex-col items-center justify-between min-h-[370px] select-none"
          >
            <div className="w-full flex items-center justify-between text-xs font-mono">
              <span
                className={`px-3 py-1 rounded-full text-[10px] font-bold ${getAccentPillClass(
                  activePillar.accentColor
                )}`}
              >
                {activePillar.categoryLabel}
              </span>
              <span className="text-[var(--text-primary)] font-semibold">
                {activePillar.timeline}
              </span>
            </div>

            {/* Continuous 360° Auto-Rotating 3D Geodesic Wireframe SVG */}
            <div className="relative my-3 flex items-center justify-center">
              <svg
                width="260"
                height="260"
                viewBox="0 0 280 280"
                className="overflow-visible"
                aria-label="Continuous 360-degree rotating 3D architecture mesh"
              >
                <defs>
                  <radialGradient id="platinumSphereCore" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#6366F1" stopOpacity="0.22" />
                    <stop offset="65%" stopColor="#8B5CF6" stopOpacity="0.08" />
                    <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
                  </radialGradient>
                </defs>

                {/* Inner Neural Violet / Indigo Core Glow */}
                <circle cx="140" cy="140" r="88" fill="url(#platinumSphereCore)" />
                <circle
                  cx="140"
                  cy="140"
                  r="66"
                  fill="currentColor"
                  fillOpacity="0.06"
                  stroke="#8B5CF6"
                  strokeWidth="1.2"
                  strokeOpacity="0.45"
                  className="text-[var(--text-primary)]"
                />

                {/* Outer 360° Rotating Geodesic Wireframe Rings */}
                <g
                  transform={`rotate(${(rotation.y * 0.35) % 360} 140 140)`}
                  stroke="currentColor"
                  strokeOpacity="0.55"
                  fill="none"
                  className="text-[var(--text-primary)]"
                >
                  <circle cx="140" cy="140" r="106" strokeWidth="1.1" />
                  <ellipse
                    cx="140"
                    cy="140"
                    rx={Math.max(16, Math.abs(Math.cos(radY) * 106))}
                    ry="106"
                    strokeWidth="1.1"
                  />
                  <ellipse
                    cx="140"
                    cy="140"
                    rx="106"
                    ry={Math.max(16, Math.abs(Math.sin(radX + radY * 0.5) * 106))}
                    strokeWidth="1.1"
                  />
                  <ellipse
                    cx="140"
                    cy="140"
                    rx="106"
                    ry="46"
                    transform={`rotate(${(45 + rotation.y * 0.6) % 360} 140 140)`}
                    stroke="#6366F1"
                    strokeOpacity="0.5"
                    strokeWidth="1"
                  />
                  <ellipse
                    cx="140"
                    cy="140"
                    rx="106"
                    ry="46"
                    transform={`rotate(${(-45 - rotation.y * 0.5) % 360} 140 140)`}
                    stroke="#06B6D4"
                    strokeOpacity="0.5"
                    strokeWidth="1"
                  />
                  <polygon
                    points="140,34 232,87 232,193 140,246 48,193 48,87"
                    transform={`rotate(${rotation.y % 360} 140 140)`}
                    stroke="#8B5CF6"
                    strokeOpacity="0.4"
                    strokeWidth="1"
                  />
                </g>

                {/* Orbiting Semantic Nodes */}
                {orbitDots.map((dot, idx) => (
                  <circle
                    key={idx}
                    cx={dot.cx}
                    cy={dot.cy}
                    r="4.5"
                    fill="var(--bg-surface)"
                    stroke={dot.stroke}
                    strokeWidth="2.4"
                  />
                ))}
              </svg>
            </div>

            <div className="font-mono text-[10px] tracking-widest uppercase text-[var(--text-muted)] text-center">
              LIVE 360° ARCHITECTURE MESH • DRAG OR HOVER TO INSPECT
            </div>
          </div>

          {/* Right Card (7 Cols): Capability Specifications & Deliverables */}
          <div className="lg:col-span-7 rounded-3xl platinum-card p-6 sm:p-9 flex flex-col justify-between space-y-5">
            <div className="space-y-3.5">
              {/* Top Icon + Category & Semantic Tag Pill */}
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-2xl btn-platinum-primary flex items-center justify-center shrink-0">
                  {renderPillarIcon(activePillar.id)}
                </div>
                <div>
                  <div className="font-mono text-[10px] uppercase tracking-wider text-[var(--text-muted)]">
                    {activePillar.shortTab}
                  </div>
                  <span
                    className={`inline-block mt-0.5 px-3 py-0.5 rounded-full text-xs font-semibold ${getAccentPillClass(
                      activePillar.accentColor
                    )}`}
                  >
                    {activePillar.badgeTag}
                  </span>
                </div>
              </div>

              <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-[var(--text-primary)] tracking-tight">
                {activePillar.title}
              </h3>

              <p className="font-display font-bold text-sm sm:text-base text-[var(--text-primary)]">
                {activePillar.leadSentence}
              </p>

              <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                {activePillar.subtitle}
              </p>
            </div>

            {/* Key Deliverables & Specifications Checklist */}
            <div className="pt-4 border-t border-[var(--border-metallic)] space-y-3">
              <div className="font-mono text-[10px] uppercase tracking-wider text-[var(--text-muted)]">
                KEY DELIVERABLES &amp; SPECIFICATIONS
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {activePillar.deliverables.map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-[var(--text-primary)]"
                  >
                    <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0" aria-hidden="true" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Action Buttons */}
            <div className="pt-3 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <button
                type="button"
                onClick={scrollToSimulator}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 min-h-[46px] rounded-2xl platinum-subdued text-[var(--text-primary)] font-display font-bold text-xs sm:text-sm cursor-pointer"
              >
                <span>Simulate {activePillar.shortTab}</span>
                <ChevronRight className="w-4 h-4" aria-hidden="true" />
              </button>

              <button
                type="button"
                onClick={() => handleRequestProposal(activePillar.title)}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 min-h-[46px] rounded-2xl btn-platinum-primary font-display font-bold text-xs sm:text-sm cursor-pointer"
              >
                <span>Get Customized Proposal</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

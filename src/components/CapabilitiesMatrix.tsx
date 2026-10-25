import React, { useState } from 'react';
import {
  ArrowUpRight,
  Cpu,
  Layers,
  Terminal,
  TrendingUp,
  CheckCircle2,
  Store,
  Activity,
  Cloud,
  Megaphone,
  Globe,
  Search,
  Workflow,
  MapPin,
} from 'lucide-react';
import {
  CAPABILITY_PILLARS,
  CapabilityPillar,
  HERO_ORBS,
  SKYLINE_SACHIN_WHATSAPP_NUMBER,
} from '../data/agencyData';
import { WhatsAppBrandBadge } from './BrandIcons';

interface CapabilitiesMatrixProps {
  onSelectCapability: (pillarTitle: string) => void;
  pillars?: CapabilityPillar[];
}

const getTrackIcon = (id: string, className = 'w-4 h-4') => {
  switch (id) {
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
 * Interactive 3-Tier Isometric Glass Architecture Stack & Live Pulse Matrix
 * Tier 1: Traffic & Local Map Pack Acquisition
 * Tier 2: Sub-Second Next.js / Cloud Core
 * Tier 3: 24/7 WhatsApp AI & Revenue Conversion
 */
const IsometricArchitecturePulseStack: React.FC<{
  activePillar: CapabilityPillar;
  activeTrackIndex: number;
}> = ({ activePillar, activeTrackIndex }) => {
  const activeTrack = HERO_ORBS[activeTrackIndex] || HERO_ORBS[0];
  const accentHex = activeTrack.psychColor || '#52525B';

  const tierConfigs = [
    {
      tier: 'TIER 01 • ACQUISITION LAYER',
      title: 'Traffic & Local Map Pack Acquisition',
      sub:
        activePillar.id === 'local-business'
          ? 'Google Map Pack #1 • Local Citations • Smart QR Reviews'
          : 'Meta CAPI • Google Search Intent • JSON-LD Entity Graph',
      yOffset: 42,
    },
    {
      tier: 'TIER 02 • COMPUTE & DATA CORE',
      title: 'Sub-Second Next.js / Cloud Core',
      sub:
        activePillar.id === 'software-engineering'
          ? 'Next.js 15 Edge SSR • Java Spring Boot • PostgreSQL HA'
          : 'Edge API Gateway • Redis Cache • Webhook Router (<0.4s)',
      yOffset: 108,
    },
    {
      tier: 'TIER 03 • AUTONOMOUS CONVERSION',
      title: '24/7 WhatsApp AI & Revenue Conversion',
      sub:
        activePillar.id === 'ai-automation'
          ? 'Official WhatsApp Cloud Bot • RAG AI Qualifier • Auto-Booking'
          : '1-Tap UPI Checkout • Instant WhatsApp Dispatch • CRM Sync',
      yOffset: 174,
    },
  ];

  return (
    <div className="w-full surface-elevated rounded-2xl p-4 sm:p-5 flex flex-col justify-between relative overflow-hidden select-none">
      <div className="w-full flex items-center justify-between text-[10px] font-mono-tech text-[var(--text-muted)] mb-2">
        <span className="inline-flex items-center gap-1.5 text-[var(--text-primary)] font-semibold">
          <Activity className="w-3.5 h-3.5 text-[#10B981]" />
          <span>3-TIER ISOMETRIC ARCHITECTURE PULSE</span>
        </span>
        <span className="px-2 py-0.5 rounded bg-black/[0.05] dark:bg-white/[0.06] text-[var(--text-primary)] font-bold">
          LIVE TELEMETRY
        </span>
      </div>

      <svg
        viewBox="0 0 360 236"
        className="w-full h-52 sm:h-56 block"
        aria-label="3-Tier Isometric Glass Architecture Stack with animated data packet pulses"
      >
        <defs>
          <linearGradient id="isoSlabFill" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="var(--bg-surface)" stopOpacity="0.96" />
            <stop offset="100%" stopColor="var(--bg-elevated)" stopOpacity="0.88" />
          </linearGradient>
          <linearGradient id="isoAccentStroke" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#A1A1AA" />
            <stop offset="50%" stopColor={accentHex} />
            <stop offset="100%" stopColor="#94A3B8" />
          </linearGradient>
        </defs>

        {/* Vertical & Cubic-Bezier Data Conduits connecting Tier 1 -> Tier 2 -> Tier 3 */}
        <path
          id="capPulseLeft"
          d="M 86 58 C 86 92, 118 96, 118 124 C 118 154, 86 158, 86 190"
          fill="none"
          stroke="url(#isoAccentStroke)"
          strokeWidth="1.5"
          strokeDasharray="4 4"
          opacity="0.65"
        />
        <path
          id="capPulseCenter"
          d="M 180 66 L 180 198"
          fill="none"
          stroke="#71717A"
          strokeWidth="1.6"
          strokeDasharray="3 4"
          opacity="0.7"
        />
        <path
          id="capPulseRight"
          d="M 274 58 C 274 92, 242 96, 242 124 C 242 154, 274 158, 274 190"
          fill="none"
          stroke="url(#isoAccentStroke)"
          strokeWidth="1.5"
          strokeDasharray="4 4"
          opacity="0.65"
        />

        {/* 3 Isometric Glass Architecture Slabs */}
        {tierConfigs.map((item, idx) => {
          const y = item.yOffset;
          return (
            <g key={item.tier}>
              <polygon
                points={`180,${y - 24} 334,${y + 2} 180,${y + 28} 26,${y + 2}`}
                fill="rgba(0,0,0,0.08)"
                transform="translate(0, 4)"
              />
              <polygon
                points={`180,${y - 24} 334,${y + 2} 180,${y + 28} 26,${y + 2}`}
                fill="url(#isoSlabFill)"
                stroke={idx === 1 ? accentHex : 'var(--border-strong)'}
                strokeWidth={idx === 1 ? '1.6' : '1.15'}
              />

              <polyline
                points={`26,${y + 2} 180,${y + 28} 334,${y + 2}`}
                fill="none"
                stroke="#A1A1AA"
                strokeWidth="1.2"
                opacity="0.65"
              />

              <circle
                cx="66"
                cy={y + 1}
                r="3.8"
                fill={idx === 1 ? '#10B981' : '#71717A'}
              />

              <text
                x="180"
                y={y - 6}
                textAnchor="middle"
                fill="var(--text-muted)"
                fontSize="7.5"
                fontFamily="monospace"
                fontWeight="700"
                letterSpacing="0.08em"
              >
                {item.tier}
              </text>

              <text
                x="180"
                y={y + 6}
                textAnchor="middle"
                fill="var(--text-primary)"
                fontSize="10"
                fontWeight="800"
              >
                {item.title}
              </text>

              <text
                x="180"
                y={y + 17}
                textAnchor="middle"
                fill="var(--text-secondary)"
                fontSize="7.5"
                fontFamily="monospace"
              >
                {item.sub}
              </text>
            </g>
          );
        })}

        {/* Animated Data Packets Traveling Along the Cubic-Bezier Conduits */}
        <circle r="4" fill={accentHex}>
          <animateMotion
            dur="2.8s"
            repeatCount="indefinite"
            path="M 86 58 C 86 92, 118 96, 118 124 C 118 154, 86 158, 86 190"
          />
        </circle>
        <circle r="4.5" fill="#A1A1AA">
          <animateMotion
            dur="2.2s"
            repeatCount="indefinite"
            path="M 180 66 L 180 198"
          />
        </circle>
        <circle r="4" fill="#10B981">
          <animateMotion
            dur="3.1s"
            repeatCount="indefinite"
            path="M 274 58 C 274 92, 242 96, 242 124 C 242 154, 274 158, 274 190"
          />
        </circle>
      </svg>

      <div className="pt-2 border-t border-[var(--border-hairline)] flex items-center justify-between text-[10px] font-mono-tech text-[var(--text-secondary)]">
        <span>ACTIVE TRACK: {activeTrack.label}</span>
        <span className="font-bold text-[var(--text-primary)]">
          {activeTrack.metric} {activeTrack.metricLabel}
        </span>
      </div>
    </div>
  );
};

export const CapabilitiesMatrix: React.FC<CapabilitiesMatrixProps> = ({
  onSelectCapability,
  pillars = CAPABILITY_PILLARS,
}) => {
  const [activeId, setActiveId] = useState<string>(
    pillars[0]?.id || CAPABILITY_PILLARS[0].id
  );
  const [activeTrackIndex, setActiveTrackIndex] = useState<number>(0);

  const activePillar =
    pillars.find((p) => p.id === activeId) || pillars[0] || CAPABILITY_PILLARS[0];

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

  const handleSelectTrackOrb = (idx: number, orbId: string) => {
    setActiveTrackIndex(idx);
    if (orbId === 'web' || orbId === 'saas') {
      setActiveId('software-engineering');
    } else if (orbId === 'ai' || orbId === 'crm') {
      setActiveId('ai-automation');
    } else if (orbId === 'ads' || orbId === 'seo') {
      setActiveId('growth-systems');
    } else if (orbId === 'local') {
      setActiveId('local-business');
    }
  };

  return (
    <section
      id="expertise"
      className="py-16 sm:py-24 px-4 sm:px-8 lg:px-12 border-b border-[var(--border-hairline)] relative bg-[var(--bg-canvas)]"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
          <div>
            {/* Zero-Pill Discipline Kicker */}
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full bg-[#10B981]" />
              <span className="font-mono-tech text-[11px] uppercase tracking-widest font-bold text-[var(--text-primary)]">
                7-TRACK SERVICE ARCHITECTURE • SKYLINE DIGITAL AGENCY
              </span>
            </div>
            <h2 className="font-display text-3xl sm:text-5xl font-extrabold tracking-tight text-[var(--text-primary)]">
              Built for Startups, Enterprises &{' '}
              <span className="font-serif-editorial italic font-semibold text-platinum-gradient">
                Local Businesses.
              </span>
            </h2>
          </div>
          <p className="text-sm sm:text-base text-[var(--text-secondary)] max-w-md leading-relaxed">
            Inspect our 7 specialized engineering & growth tracks below—from custom Next.js & Spring Boot platforms to 24/7 WhatsApp AI bots and #1 Google Map Pack dominance.
          </p>
        </div>

        {/* 7-Track Interactive Pill Selector Bar */}
        <div className="mb-10 p-4 sm:p-5 rounded-3xl surface-card">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
            <span className="font-mono-tech text-[10px] uppercase tracking-widest text-[var(--text-muted)] font-semibold">
              SELECT ANY OF OUR 7 CORE TRACKS TO INSPECT SYSTEM ARCHITECTURE:
            </span>
            <span className="font-mono-tech text-[11px] font-bold text-[var(--text-primary)]">
              {HERO_ORBS[activeTrackIndex]?.title}
            </span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2.5">
            {HERO_ORBS.map((orb, idx) => {
              const isSelected = activeTrackIndex === idx;
              return (
                <button
                  key={orb.id}
                  type="button"
                  onClick={() => handleSelectTrackOrb(idx, orb.id)}
                  className={`p-3 rounded-2xl text-left transition-all cursor-pointer border flex flex-col justify-between gap-2 ${
                    isSelected
                      ? 'btn-platinum-primary shadow-md'
                      : 'surface-elevated hover:border-[var(--border-strong)]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span
                      className={`inline-flex shrink-0 ${
                        isSelected ? 'text-[#10B981]' : 'text-[var(--text-secondary)]'
                      }`}
                    >
                      {getTrackIcon(orb.id, 'w-4 h-4')}
                    </span>
                    <span className="font-mono-tech text-[10px] font-bold opacity-80">
                      {orb.metric}
                    </span>
                  </div>
                  <div>
                    <div className="font-display font-extrabold text-xs tracking-wide">
                      {orb.label}
                    </div>
                    <div
                      className={`text-[10px] truncate ${
                        isSelected ? 'opacity-80' : 'text-[var(--text-secondary)]'
                      }`}
                    >
                      {orb.psychName}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: 4 Core Architecture Pillar Selector Tabs */}
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

          {/* Right Column: Active Pillar Deep-Dive + 3-Tier Isometric System Pulse */}
          <div className="lg:col-span-7 surface-card rounded-3xl p-6 sm:p-9 relative overflow-hidden">
            {/* Top Bar */}
            <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-[var(--border-hairline)]">
              <div className="flex items-center gap-3">
                <span className="font-mono-tech text-xs font-bold uppercase tracking-widest text-[var(--text-primary)]">
                  {activePillar.subtitle}
                </span>
              </div>

              <span className="font-mono-tech text-[11px] px-3 py-1 rounded-full surface-elevated text-[var(--text-primary)]">
                {activePillar.architectureNote || 'Next.js 15 Edge + Cloud API'}
              </span>
            </div>

            {/* Interactive 3-Tier Isometric Architecture Stack + Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-5 my-6 items-center">
              <div className="md:col-span-7">
                <IsometricArchitecturePulseStack
                  activePillar={activePillar}
                  activeTrackIndex={activeTrackIndex}
                />
              </div>

              <div className="md:col-span-5 space-y-3">
                <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                  {activePillar.description || activePillar.subtitle}
                </p>

                <div className="grid grid-cols-2 md:grid-cols-1 gap-3 pt-1">
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
                      className="p-3.5 rounded-2xl surface-elevated flex items-center justify-between"
                    >
                      <div>
                        <span className="font-mono-tech text-[10px] uppercase tracking-wider text-[var(--text-muted)] block">
                          {metric.label}
                        </span>
                        <span className="font-mono-tech text-[10px] font-semibold text-[var(--text-secondary)]">
                          {metric.delta}
                        </span>
                      </div>
                      <span className="font-display text-2xl font-extrabold tracking-tight text-[var(--text-primary)]">
                        {metric.value}
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
              <div className="flex flex-wrap items-center gap-2.5">
                <a
                  href={`https://wa.me/${SKYLINE_SACHIN_WHATSAPP_NUMBER}?text=${encodeURIComponent(
                    `Hi SkyLine Digital Agency! I want a custom proposal for ${activePillar.title}.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-full btn-whatsapp-official text-xs font-bold tracking-wide"
                >
                  <WhatsAppBrandBadge size="sm" className="border border-white/30" />
                  <span>WhatsApp Us</span>
                </a>
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
        </div>

        {/* Dedicated Local Business Spotlight Banner */}
        <div
          id="local-business"
          className="mt-10 surface-card rounded-3xl p-6 sm:p-8 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6"
        >
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2">
              <Store className="w-3.5 h-3.5 text-[var(--text-primary)]" />
              <span className="font-mono-tech text-[11px] uppercase tracking-widest font-bold text-[var(--text-primary)]">
                SPECIALIZED LOCAL BUSINESS PACKAGES
              </span>
            </div>
            <h3 className="font-display text-xl sm:text-2xl font-extrabold text-[var(--text-primary)]">
              Running a Clinic, Salon, Restaurant, Gym, Showroom, or Retail Store?
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

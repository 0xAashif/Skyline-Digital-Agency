import React, { useState, useMemo } from 'react';
import {
  Sliders,
  Check,
  ArrowUpRight,
  Layers,
  ShieldCheck,
  Clock,
  Cpu,
  Zap,
} from 'lucide-react';
import { SKYLINE_WHATSAPP_NUMBER } from '../data/agencyData';
import { WhatsAppBrandBadge } from './BrandIcons';

export type SimulatorDomain =
  | 'web-saas'
  | 'ai-automation'
  | 'paid-ads'
  | 'seo-content';
export type SimulatorScale = 'launch' | 'growth' | 'enterprise';
export type SimulatorUrgency = 'standard' | 'accelerated';

interface SystemArchitectSimulatorProps {
  onLockBlueprint: (summaryText: string, selectedDomains: string[]) => void;
}

const DOMAIN_OPTIONS: {
  id: SimulatorDomain;
  label: string;
  tag: string;
  desc: string;
}[] = [
  {
    id: 'web-saas',
    label: 'Website, Web App or SaaS',
    tag: 'WEB / SAAS',
    desc: 'High-speed Next.js website, custom portal, or e-commerce store',
  },
  {
    id: 'ai-automation',
    label: 'WhatsApp Bot & AI Automation',
    tag: 'AI & CRM',
    desc: '24/7 WhatsApp lead bot, AI assistant, and automated CRM sync',
  },
  {
    id: 'paid-ads',
    label: 'Meta & Google Ads Funnel',
    tag: 'PAID ADS',
    desc: 'ROI-focused ad campaigns, landing pages, and CAPI tracking',
  },
  {
    id: 'seo-content',
    label: 'Local Maps & Search SEO',
    tag: 'SEO / LOCAL',
    desc: 'Google Map Pack #1 ranking, QR review system, and search SEO',
  },
];

const SCALE_OPTIONS: {
  id: SimulatorScale;
  label: string;
  sub: string;
}[] = [
  {
    id: 'launch',
    label: 'Local Business / Starter',
    sub: 'Fast launch for clinics, retail, salons & early startups',
  },
  {
    id: 'growth',
    label: 'Growth Brand / D2C',
    sub: 'Scaling revenue, automated workflows & multi-channel ads',
  },
  {
    id: 'enterprise',
    label: 'Enterprise / Custom SaaS',
    sub: 'High-traffic cloud architecture & custom AI engineering',
  },
];

const URGENCY_OPTIONS: {
  id: SimulatorUrgency;
  label: string;
  sub: string;
}[] = [
  { id: 'standard', label: 'Standard Sprint', sub: '3 – 6 Weeks' },
  { id: 'accelerated', label: 'Fast-Track Build', sub: '10 – 18 Days' },
];

function computeScopeBlueprint(config: {
  domains: SimulatorDomain[];
  scale: SimulatorScale;
  urgency: SimulatorUrgency;
}) {
  const { domains, scale, urgency } = config;
  const domainCount = domains.length;
  const baseScore =
    scale === 'launch' ? 48 : scale === 'growth' ? 72 : 91;
  const complexityScore = Math.min(99, baseScore + domainCount * 4);

  const headlineParts: string[] = [];
  if (domains.includes('web-saas')) headlineParts.push('Next.js Web/SaaS');
  if (domains.includes('ai-automation')) headlineParts.push('WhatsApp AI CRM');
  if (domains.includes('paid-ads')) headlineParts.push('Meta/Google Ad Engine');
  if (domains.includes('seo-content')) headlineParts.push('Map Pack & SEO Hub');

  const headline = headlineParts.join(' + ');

  const estimatedWeeks =
    urgency === 'accelerated'
      ? scale === 'launch'
        ? '10 – 14 Days'
        : '2 – 3 Weeks'
      : scale === 'launch'
        ? '2 – 3 Weeks'
        : scale === 'growth'
          ? '3 – 5 Weeks'
          : '5 – 7 Weeks';

  const sprintCount =
    scale === 'launch' ? 2 : scale === 'growth' ? 3 : 5;

  const ExecutionPodSize =
    scale === 'launch'
      ? '2 Senior Architects'
      : scale === 'growth'
        ? '3-Person Full-Stack Pod'
        : '5-Person Dedicated Squad';

  const recommendedStack: string[] = ['Next.js 15', 'TypeScript'];
  if (domains.includes('web-saas')) {
    recommendedStack.push('PostgreSQL', 'Redis Edge Cache', '1-Tap UPI / Stripe');
  }
  if (domains.includes('ai-automation')) {
    recommendedStack.push('WhatsApp Cloud API', 'OpenAI RAG Agent', 'Webhook CRM');
  }
  if (domains.includes('paid-ads')) {
    recommendedStack.push('Server-Side Meta CAPI', 'Google Ads Search', 'Live ROAS Board');
  }
  if (domains.includes('seo-content')) {
    recommendedStack.push('Google Map Pack #1', 'JSON-LD Entity Graph', 'Smart QR Standees');
  }

  const primaryDeliverables: string[] = [];
  if (domains.includes('web-saas')) {
    primaryDeliverables.push(
      'Custom responsive frontend with sub-second edge caching',
      'Secure admin dashboard & payment webhook integration'
    );
  }
  if (domains.includes('ai-automation')) {
    primaryDeliverables.push(
      '24/7 Official WhatsApp bot for instant lead qualification & slot booking'
    );
  }
  if (domains.includes('paid-ads')) {
    primaryDeliverables.push(
      'High-converting campaign landers + server-side Meta CAPI attribution'
    );
  }
  if (domains.includes('seo-content')) {
    primaryDeliverables.push(
      'Google Business Profile optimization, local citations & 5-star review automation'
    );
  }

  const projectedKpis: string[] = [
    '99/100 Core Web Vitals speed score',
    '< 1.2s automated WhatsApp lead response time',
    '100% source-code & ad account ownership',
  ];

  const architectureSummary = `Custom ${scale.toUpperCase()}-tier system combining ${headline.toLowerCase()} with fixed-milestone delivery and full source-code handover.`;

  return {
    complexityScore,
    headline,
    architectureSummary,
    estimatedWeeks,
    sprintCount,
    ExecutionPodSize,
    recommendedStack,
    primaryDeliverables,
    projectedKpis,
  };
}

export const SystemArchitectSimulator: React.FC<SystemArchitectSimulatorProps> = ({
  onLockBlueprint,
}) => {
  const [domains, setDomains] = useState<SimulatorDomain[]>([
    'web-saas',
    'ai-automation',
  ]);
  const [scale, setScale] = useState<SimulatorScale>('growth');
  const [urgency, setUrgency] = useState<SimulatorUrgency>('standard');

  const toggleDomain = (id: SimulatorDomain) => {
    setDomains((prev) => {
      if (prev.includes(id)) {
        if (prev.length === 1) return prev;
        return prev.filter((item) => item !== id);
      }
      return [...prev, id];
    });
  };

  const blueprint = useMemo(
    () =>
      computeScopeBlueprint({
        domains,
        scale,
        urgency,
      }),
    [domains, scale, urgency]
  );

  const handleApplyToForm = () => {
    const selectedLabels = DOMAIN_OPTIONS.filter((d) =>
      domains.includes(d.id)
    ).map((d) => d.label);

    const summary = `Blueprint: ${blueprint.headline} | Scale: ${scale.toUpperCase()} | Timeline: ${blueprint.estimatedWeeks} (${blueprint.sprintCount} Sprints) | Stack: ${blueprint.recommendedStack.slice(0, 5).join(', ')}`;
    onLockBlueprint(summary, selectedLabels);
  };

  const whatsappAuditUrl = useMemo(() => {
    const selectedLabels = DOMAIN_OPTIONS.filter((d) =>
      domains.includes(d.id)
    ).map((d) => d.label);
    const msg = [
      'Hello SkyLine Digital Team,',
      `I scoped a project on your 60s Estimator: ${blueprint.headline}`,
      `• Stage: ${scale.toUpperCase()}`,
      `• Est. Timeline: ${blueprint.estimatedWeeks}`,
      `• Selected Tracks: ${selectedLabels.join(', ')}`,
      'Please share the complimentary 15-minute teardown and exact quote.',
    ].join('\n');
    return `https://wa.me/${SKYLINE_WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
  }, [domains, scale, blueprint]);

  return (
    <section
      id="simulator"
      className="py-20 sm:py-28 px-4 sm:px-8 lg:px-12 border-b border-[var(--border-hairline)] bg-[var(--bg-canvas)]"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-14">
          <div>
            <div className="inline-flex items-center gap-2 mb-3">
              <Sliders className="w-3.5 h-3.5 text-[var(--text-primary)]" />
              <span className="font-mono-tech text-[11px] uppercase tracking-widest font-bold text-[var(--text-primary)]">
                INTERACTIVE PROJECT & TIMELINE ESTIMATOR
              </span>
            </div>
            <h2 className="font-display text-3xl sm:text-5xl font-extrabold tracking-tight text-[var(--text-primary)]">
              Scope Your Project in{' '}
              <span className="font-serif-editorial italic font-semibold">
                60 Seconds.
              </span>
            </h2>
          </div>
          <p className="text-sm sm:text-base text-[var(--text-secondary)] max-w-md leading-relaxed">
            Select the services you need, your business stage, and your desired launch speed to generate a recommended tech stack and delivery roadmap.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Controls */}
          <div className="lg:col-span-6 space-y-7 surface-card rounded-3xl p-6 sm:p-8">
            {/* Step 1: Domains */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="font-mono-tech text-xs uppercase tracking-wider text-[var(--text-primary)] font-semibold">
                  Select What You Need (Pick 1 or More)
                </label>
                <span className="font-mono-tech text-[11px] px-2.5 py-0.5 rounded-full badge-platinum font-semibold">
                  {domains.length} Selected
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {DOMAIN_OPTIONS.map((opt) => {
                  const selected = domains.includes(opt.id);
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => toggleDomain(opt.id)}
                      className={`p-4 rounded-2xl text-left transition-all cursor-pointer border ${
                        selected
                          ? 'btn-platinum-primary shadow-md'
                          : 'surface-elevated hover:border-[var(--border-strong)]'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <span
                          className={`font-mono-tech text-[10px] uppercase tracking-widest ${
                            selected ? 'opacity-80' : 'text-[var(--text-muted)]'
                          }`}
                        >
                          {opt.tag}
                        </span>
                        <span
                          className={`w-4 h-4 rounded-full flex items-center justify-center border ${
                            selected
                              ? 'border-current bg-white/20'
                              : 'border-[var(--border-strong)]'
                          }`}
                        >
                          {selected && <Check className="w-2.5 h-2.5" />}
                        </span>
                      </div>
                      <div className="font-display font-bold text-sm mb-1">
                        {opt.label}
                      </div>
                      <div
                        className={`text-xs leading-snug ${
                          selected
                            ? 'opacity-80'
                            : 'text-[var(--text-secondary)]'
                        }`}
                      >
                        {opt.desc}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Scale */}
            <div>
              <label className="block font-mono-tech text-xs uppercase tracking-wider text-[var(--text-primary)] font-semibold mb-3">
                Your Business Stage
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {SCALE_OPTIONS.map((opt) => {
                  const selected = scale === opt.id;
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setScale(opt.id)}
                      className={`p-3.5 rounded-2xl text-left transition-all cursor-pointer border ${
                        selected
                          ? 'btn-platinum-primary'
                          : 'surface-elevated hover:border-[var(--border-strong)]'
                      }`}
                    >
                      <div className="font-display font-bold text-xs sm:text-sm mb-1">
                        {opt.label}
                      </div>
                      <div
                        className={`text-[11px] leading-tight ${
                          selected
                            ? 'opacity-80'
                            : 'text-[var(--text-secondary)]'
                        }`}
                      >
                        {opt.sub}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 3: Urgency */}
            <div>
              <label className="block font-mono-tech text-xs uppercase tracking-wider text-[var(--text-primary)] font-semibold mb-3">
                Launch Speed
              </label>
              <div className="grid grid-cols-2 gap-3">
                {URGENCY_OPTIONS.map((opt) => {
                  const selected = urgency === opt.id;
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setUrgency(opt.id)}
                      className={`p-3.5 rounded-2xl text-left transition-all cursor-pointer border flex items-center justify-between ${
                        selected
                          ? 'btn-platinum-primary'
                          : 'surface-elevated hover:border-[var(--border-strong)]'
                      }`}
                    >
                      <div>
                        <div className="font-display font-bold text-xs sm:text-sm">
                          {opt.label}
                        </div>
                        <div
                          className={`font-mono-tech text-[11px] ${
                            selected
                              ? 'opacity-80'
                              : 'text-[var(--text-secondary)]'
                          }`}
                        >
                          {opt.sub}
                        </div>
                      </div>
                      <Clock className="w-4 h-4 opacity-70" />
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column: Live Synthesized Blueprint Output */}
          <div className="lg:col-span-6 surface-card rounded-3xl p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden">
            <div>
              <div className="flex flex-wrap items-center justify-between gap-2 pb-5 border-b border-[var(--border-hairline)]">
                <div className="inline-flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[var(--platinum-primary)] animate-pulse" />
                  <span className="font-mono-tech text-xs uppercase tracking-widest text-[var(--text-primary)] font-semibold">
                    ESTIMATED PROJECT ROADMAP
                  </span>
                </div>
                <span className="font-mono-tech text-xs px-3 py-1 rounded-full badge-platinum font-semibold">
                  {blueprint.complexityScore}/100 Scope Score
                </span>
              </div>

              <div className="my-6">
                <h3 className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight text-[var(--text-primary)] mb-2">
                  {blueprint.headline}
                </h3>
                <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                  {blueprint.architectureSummary}
                </p>
              </div>

              {/* Key Output Stats */}
              <div className="grid grid-cols-3 gap-3 mb-6">
                <div className="p-3.5 rounded-2xl surface-elevated">
                  <div className="font-mono-tech text-[10px] uppercase text-[var(--text-muted)]">
                    EST. TIMELINE
                  </div>
                  <div className="font-display text-lg sm:text-xl font-bold text-[var(--text-primary)] mt-1">
                    {blueprint.estimatedWeeks}
                  </div>
                </div>
                <div className="p-3.5 rounded-2xl surface-elevated">
                  <div className="font-mono-tech text-[10px] uppercase text-[var(--text-muted)]">
                    MILESTONES
                  </div>
                  <div className="font-display text-lg sm:text-xl font-bold text-[var(--text-primary)] mt-1">
                    {blueprint.sprintCount} Sprints
                  </div>
                </div>
                <div className="p-3.5 rounded-2xl surface-elevated">
                  <div className="font-mono-tech text-[10px] uppercase text-[var(--text-muted)]">
                    TEAM POD
                  </div>
                  <div className="font-display text-xs sm:text-sm font-bold text-[var(--text-primary)] mt-1 leading-tight">
                    {blueprint.ExecutionPodSize}
                  </div>
                </div>
              </div>

              {/* Recommended Stack Pills */}
              <div className="mb-6">
                <div className="font-mono-tech text-[10px] uppercase tracking-widest text-[var(--text-muted)] mb-2.5 flex items-center gap-1.5">
                  <Cpu className="w-3.5 h-3.5 text-[var(--text-primary)]" />
                  <span>RECOMMENDED TECH & MARKETING STACK</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {blueprint.recommendedStack.map((tech: string) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 rounded-lg surface-elevated font-mono-tech text-[11px] text-[var(--text-primary)]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Deliverables & KPIs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <div className="p-4 rounded-2xl surface-elevated space-y-2">
                  <div className="font-mono-tech text-[10px] uppercase tracking-wider text-[var(--text-muted)] flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5 text-[var(--text-primary)]" />
                    <span>KEY DELIVERABLES</span>
                  </div>
                  <ul className="space-y-1.5 text-xs text-[var(--text-secondary)]">
                    {blueprint.primaryDeliverables.map((item: string) => (
                      <li key={item} className="flex items-start gap-1.5">
                        <span className="text-[var(--text-primary)] font-bold">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-4 rounded-2xl surface-elevated space-y-2">
                  <div className="font-mono-tech text-[10px] uppercase tracking-wider text-[var(--text-muted)] flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-[var(--text-primary)]" />
                    <span>TARGET BENCHMARKS</span>
                  </div>
                  <ul className="space-y-1.5 text-xs text-[var(--text-secondary)]">
                    {blueprint.projectedKpis.map((kpi: string) => (
                      <li key={kpi} className="flex items-start gap-1.5">
                        <span className="text-[var(--text-primary)] font-bold">✓</span>
                        <span>{kpi}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-5 border-t border-[var(--border-hairline)] space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={handleApplyToForm}
                  className="w-full py-3.5 px-5 rounded-full btn-platinum-primary font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Lock Scope & Get Exact Quote</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>

                <a
                  href={whatsappAuditUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 px-5 rounded-full btn-whatsapp-official font-semibold text-xs sm:text-sm flex items-center justify-center gap-2"
                >
                  <WhatsAppBrandBadge size="sm" className="border border-white/30" />
                  <span>Send to WhatsApp & Claim Free Audit</span>
                </a>
              </div>

              <div className="flex items-center justify-center gap-2 text-[11px] text-[var(--text-secondary)] font-mono-tech text-center">
                <Zap className="w-3.5 h-3.5 text-[var(--text-primary)] shrink-0" />
                <span>
                  Includes a complimentary 15-minute website, SEO & funnel teardown on WhatsApp.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

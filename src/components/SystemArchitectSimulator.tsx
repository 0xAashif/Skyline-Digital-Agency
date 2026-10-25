import React, { useMemo, useState } from 'react';
import {
  ArrowRight,
  Building2,
  Check,
  Copy,
  Cpu,
  Globe,
  MapPin,
  Share2,
  ShoppingBag,
  Sparkles,
} from 'lucide-react';
import {
  BottleneckType,
  IndustryType,
  SystemBlueprint,
  generateSystemBlueprint,
} from '../utils/architectEngine';
import { WhatsAppLogoIcon } from './BrandIcons';

interface SystemArchitectSimulatorProps {
  onApplyBlueprintToForm?: (blueprint: SystemBlueprint) => void;
}

const INDUSTRIES = Object.values(IndustryType);
const BOTTLENECKS = Object.values(BottleneckType);

export const SystemArchitectSimulator: React.FC<SystemArchitectSimulatorProps> = ({
  onApplyBlueprintToForm,
}) => {
  const [industry, setIndustry] = useState<IndustryType>(IndustryType.LOCAL_BUSINESS);
  const [bottleneck, setBottleneck] = useState<BottleneckType>(BottleneckType.SLOW_WEBSITE);
  const [monthlyVisitors, setMonthlyVisitors] = useState<number>(12000);
  const [copied, setCopied] = useState<boolean>(false);

  const blueprint = useMemo(
    () => generateSystemBlueprint(industry, bottleneck, monthlyVisitors),
    [industry, bottleneck, monthlyVisitors]
  );

  const handleCopyBlueprint = async () => {
    try {
      await navigator.clipboard.writeText(blueprint.whatsappPreviewText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleLoadIntoForm = () => {
    onApplyBlueprintToForm?.(blueprint);
    const contactEl = document.getElementById('contact');
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const renderIndustryIcon = (item: IndustryType) => {
    switch (item) {
      case IndustryType.LOCAL_BUSINESS:
        return <MapPin className="w-4 h-4 shrink-0" aria-hidden="true" />;
      case IndustryType.ECOMMERCE:
        return <ShoppingBag className="w-4 h-4 shrink-0" aria-hidden="true" />;
      case IndustryType.REAL_ESTATE:
        return <Building2 className="w-4 h-4 shrink-0" aria-hidden="true" />;
      default:
        return <Cpu className="w-4 h-4 shrink-0" aria-hidden="true" />;
    }
  };

  return (
    <section
      id="system-simulator"
      className="py-16 sm:py-20 px-4 sm:px-6 lg:px-10 platinum-canvas border-t border-[var(--border-metallic)]"
    >
      <div className="max-w-[1320px] mx-auto space-y-10">
        {/* Centered Header */}
        <div className="text-center max-w-3xl mx-auto space-y-2.5">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full accent-pill-cyan font-mono text-[11px] font-bold tracking-widest uppercase">
            <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
            <span>PROOF BEFORE PAYMENT · 60-SECOND SYSTEM ARCHITECT</span>
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-[var(--text-primary)] tracking-tight">
            Interactive Architecture &amp; ROI Simulator
          </h2>
          <p className="text-sm text-[var(--text-secondary)]">
            Select your business vertical and bottleneck to generate a custom system blueprint and
            claim your free 60-second teardown.
          </p>
        </div>

        {/* Main Split: Left Configurator Card (5 Cols) | Right Live Node-Graph Card (7 Cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Left Column: Configurator Controls (Zero A1-A4 / B1-B4 Numbering) */}
          <div className="lg:col-span-5 rounded-3xl platinum-card p-6 sm:p-8 space-y-6 flex flex-col justify-between">
            <div className="space-y-6">
              {/* Industry Selection */}
              <fieldset className="space-y-2.5">
                <legend className="font-mono text-xs font-bold uppercase tracking-wider text-[var(--text-muted)]">
                  SELECT YOUR INDUSTRY VERTICAL
                </legend>
                <div className="grid grid-cols-1 gap-2 pt-1">
                  {INDUSTRIES.map((item) => {
                    const active = industry === item;
                    return (
                      <button
                        key={item}
                        type="button"
                        onClick={() => setIndustry(item)}
                        aria-pressed={active}
                        className={`w-full text-left px-4 py-3.5 min-h-[46px] rounded-2xl transition-all duration-150 flex items-center justify-between gap-3 cursor-pointer ${
                          active
                            ? 'btn-platinum-primary shadow-sm'
                            : 'platinum-subdued text-[var(--text-primary)] hover:opacity-85'
                        }`}
                      >
                        <span className="inline-flex items-center gap-2.5 font-display font-semibold text-xs sm:text-sm">
                          {renderIndustryIcon(item)}
                          <span>{item}</span>
                        </span>
                        {active && <Check className="w-4 h-4 shrink-0" aria-hidden="true" />}
                      </button>
                    );
                  })}
                </div>
              </fieldset>

              {/* Bottleneck Selection */}
              <fieldset className="space-y-2.5">
                <legend className="font-mono text-xs font-bold uppercase tracking-wider text-[var(--text-muted)]">
                  SELECT YOUR PRIMARY BOTTLENECK
                </legend>
                <div className="grid grid-cols-1 gap-2 pt-1">
                  {BOTTLENECKS.map((item) => {
                    const active = bottleneck === item;
                    return (
                      <button
                        key={item}
                        type="button"
                        onClick={() => setBottleneck(item)}
                        aria-pressed={active}
                        className={`w-full text-left px-4 py-3.5 min-h-[46px] rounded-2xl transition-all duration-150 flex items-center justify-between gap-3 cursor-pointer ${
                          active
                            ? 'btn-platinum-primary shadow-sm'
                            : 'platinum-subdued text-[var(--text-primary)] hover:opacity-85'
                        }`}
                      >
                        <span className="font-display font-semibold text-xs sm:text-sm">
                          {item}
                        </span>
                        {active && <Check className="w-4 h-4 shrink-0" aria-hidden="true" />}
                      </button>
                    );
                  })}
                </div>
              </fieldset>
            </div>

            {/* Traffic / Reach Baseline Slider */}
            <div className="pt-4 border-t border-[var(--border-metallic)] space-y-2">
              <div className="flex items-center justify-between gap-2">
                <label
                  htmlFor="monthly-visitors-range"
                  className="font-mono text-xs text-[var(--text-muted)]"
                >
                  MONTHLY REACH BASELINE
                </label>
                <span className="font-mono text-sm font-bold text-[var(--text-primary)] tabular-nums">
                  {monthlyVisitors.toLocaleString('en-IN')} / mo
                </span>
              </div>
              <input
                id="monthly-visitors-range"
                type="range"
                min={1000}
                max={100000}
                step={1000}
                value={monthlyVisitors}
                onChange={(e) => setMonthlyVisitors(Number(e.target.value))}
                className="w-full accent-[var(--text-primary)] cursor-pointer"
              />
            </div>
          </div>

          {/* Right Column: Dynamic 3-Layer Architectural Blueprint & Official WhatsApp Dispatch */}
          <div className="lg:col-span-7 rounded-3xl platinum-card p-6 sm:p-8 flex flex-col justify-between space-y-5">
            <div className="space-y-4">
              {/* Top Telemetry Summary Strip with Semantic Accents */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-3.5 rounded-2xl platinum-subdued">
                  <div className="font-mono text-[10px] text-[var(--text-muted)]">
                    BLUEPRINT &amp; ETA
                  </div>
                  <div className="font-display font-bold text-sm sm:text-base text-[var(--text-primary)] mt-1 tabular-nums flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded-md accent-pill-indigo font-mono text-xs">
                      {blueprint.blueprintCode}
                    </span>
                    <span>{blueprint.estimatedTimeline}</span>
                  </div>
                </div>
                <div className="p-3.5 rounded-2xl platinum-subdued">
                  <div className="font-mono text-[10px] text-[var(--text-muted)]">
                    PROJECTED IMPACT
                  </div>
                  <div className="font-display font-bold text-xs sm:text-sm text-[#10B981] mt-1">
                    {blueprint.projectedConversionLift}
                  </div>
                </div>
                <div className="p-3.5 rounded-2xl platinum-subdued">
                  <div className="font-mono text-[10px] text-[var(--text-muted)]">
                    EST. QUALIFIED PIPELINE
                  </div>
                  <div className="font-mono font-bold text-sm sm:text-base text-[var(--text-primary)] mt-1 tabular-nums">
                    ~{blueprint.monthlyQualifiedPipeline}/mo{' '}
                    <span className="px-1.5 py-0.5 rounded-md accent-pill-rose text-[10px]">
                      +{blueprint.projectedAdditionalLeads}
                    </span>
                  </div>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                {blueprint.summaryDiagnosis}
              </p>

              {/* 3-Layer Node Graph Pipeline (Unnumbered Layer Badges with Semantic Pills) */}
              <div className="space-y-2.5" aria-live="polite">
                {blueprint.layers.map((layer, index) => {
                  const LayerIcon = index === 0 ? Globe : index === 1 ? Cpu : Sparkles;
                  const layerAccent =
                    index === 0
                      ? 'accent-pill-indigo'
                      : index === 1
                      ? 'accent-pill-amber'
                      : 'accent-pill-violet';
                  return (
                    <div
                      key={layer.id}
                      className="p-4 rounded-2xl platinum-subdued transition-colors"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-[var(--border-metallic)]">
                        <div className="flex items-center gap-2">
                          <LayerIcon className="w-4 h-4 shrink-0" aria-hidden="true" />
                          <span
                            className={`px-2.5 py-0.5 rounded-full font-mono text-[10px] font-bold uppercase ${layerAccent}`}
                          >
                            {layer.layerTag}
                          </span>
                        </div>
                        <span className="font-mono text-xs text-[var(--text-muted)] tabular-nums">
                          {layer.latencyOrMetric}
                        </span>
                      </div>

                      <h3 className="font-display font-bold text-sm sm:text-base text-[var(--text-primary)] mt-2">
                        {layer.title}
                      </h3>
                      <p className="text-xs text-[var(--text-secondary)] mt-0.5 leading-relaxed">
                        {layer.architectureSpec}
                      </p>

                      <div className="mt-2.5 pt-2 border-t border-[var(--border-metallic)] flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-mono text-[var(--text-primary)]">
                        {layer.deliverables.map((del, dIdx) => (
                          <React.Fragment key={del}>
                            <span>{del}</span>
                            {dIdx < layer.deliverables.length - 1 && (
                              <span aria-hidden="true">·</span>
                            )}
                          </React.Fragment>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* One-Click Blueprint Dispatch CTA Block with Official WhatsApp Green (#25D366) */}
            <div className="pt-4 border-t border-[var(--border-metallic)] space-y-2.5">
              <a
                href={blueprint.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2.5 px-5 py-4 min-h-[52px] rounded-2xl bg-[#25D366] text-white font-display font-bold text-xs sm:text-sm hover:opacity-95 transition-opacity text-center shadow-md"
              >
                <WhatsAppLogoIcon className="w-5 h-5" />
                <span>
                  Send This Custom Blueprint to SkyLine on WhatsApp for Free 60s Teardown
                </span>
                <ArrowRight className="w-4 h-4 shrink-0" aria-hidden="true" />
              </a>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <button
                  type="button"
                  onClick={handleCopyBlueprint}
                  className="inline-flex items-center justify-center gap-2 px-4 py-2.5 min-h-[42px] rounded-xl platinum-subdued text-xs font-mono text-[var(--text-primary)] cursor-pointer"
                >
                  <Copy className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>
                    {copied ? 'Blueprint Copied to Clipboard' : 'Copy Blueprint Summary'}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={handleLoadIntoForm}
                  className="inline-flex items-center justify-center gap-2 px-4 py-2.5 min-h-[42px] rounded-xl platinum-subdued text-xs font-mono text-[var(--text-primary)] cursor-pointer"
                >
                  <Share2 className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>Attach Blueprint to Proposal Form Below</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

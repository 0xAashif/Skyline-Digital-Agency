import React, { useState } from 'react';
import {
  CheckCircle2,
  Code2,
  Compass,
  Layout,
  Send,
  TrendingUp,
} from 'lucide-react';
import {
  EXECUTION_ROADMAP,
  RoadmapStep,
  SemanticAccentColor,
} from '../data/agencyData';

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

export const ExecutionRoadmap: React.FC = () => {
  const [selectedId, setSelectedId] = useState<string>(EXECUTION_ROADMAP[0].id);

  const activeItem: RoadmapStep =
    EXECUTION_ROADMAP.find((s) => s.id === selectedId) || EXECUTION_ROADMAP[0];

  const renderStepIcon = (type: RoadmapStep['iconType']) => {
    switch (type) {
      case 'compass':
        return <Compass className="w-6 h-6" aria-hidden="true" />;
      case 'layout':
        return <Layout className="w-6 h-6" aria-hidden="true" />;
      case 'code':
        return <Code2 className="w-6 h-6" aria-hidden="true" />;
      case 'check':
        return <CheckCircle2 className="w-6 h-6" aria-hidden="true" />;
      case 'send':
        return <Send className="w-6 h-6" aria-hidden="true" />;
      case 'trending':
        return <TrendingUp className="w-6 h-6" aria-hidden="true" />;
    }
  };

  return (
    <section
      id="process"
      className="py-16 sm:py-20 px-4 sm:px-6 lg:px-10 platinum-canvas border-t border-[var(--border-metallic)]"
    >
      <div className="max-w-[1320px] mx-auto space-y-12">
        {/* Centered Header */}
        <div className="text-center max-w-2xl mx-auto space-y-2.5">
          <div className="font-mono text-xs tracking-widest uppercase text-[var(--text-muted)]">
            HOW WE WORK
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-[var(--text-primary)] tracking-tight">
            Our Development Process
          </h2>
          <p className="text-sm text-[var(--text-secondary)]">
            Streamlined execution roadmap from your initial 60s audit to full launch and scale.
          </p>
        </div>

        {/* 6-Node Circular Orbit Roadmap (Zero Cheap Numbering — Uses Vector Icons & Semantic Phase Badges) */}
        <div className="relative pt-4">
          <div
            aria-hidden="true"
            className="hidden lg:block absolute top-[58px] left-[8%] right-[8%] h-[1px] bg-[var(--border-metallic)]"
          />

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 sm:gap-8 relative z-10">
            {EXECUTION_ROADMAP.map((item) => {
              const isSelected = item.id === selectedId;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setSelectedId(item.id)}
                  aria-pressed={isSelected}
                  className="group flex flex-col items-center text-center cursor-pointer focus:outline-none"
                >
                  {/* Dashed Outer Orbit Ring */}
                  <div
                    className={`relative p-3 rounded-full border border-dashed transition-all duration-200 bg-[var(--bg-canvas)] ${
                      isSelected
                        ? 'border-[var(--text-primary)] scale-105'
                        : 'border-[var(--border-metallic)] group-hover:border-[var(--text-secondary)]'
                    }`}
                  >
                    {/* Inner Solid Circle */}
                    <div
                      className={`w-16 h-16 rounded-full flex items-center justify-center transition-colors ${
                        isSelected
                          ? 'btn-platinum-primary shadow-md'
                          : 'platinum-card text-[var(--text-primary)]'
                      }`}
                    >
                      {renderStepIcon(item.iconType)}
                    </div>

                    {/* Bottom Orbit Anchor Dot */}
                    <span
                      aria-hidden="true"
                      className={`absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full border border-[var(--bg-canvas)] ${
                        isSelected ? 'bg-[#10B981]' : 'bg-[var(--border-metallic)]'
                      }`}
                    />
                  </div>

                  <h3 className="font-display font-bold text-sm sm:text-base mt-3.5 text-[var(--text-primary)]">
                    {item.shortTitle}
                  </h3>
                  <span className="font-mono text-[11px] text-[var(--text-muted)] mt-0.5">
                    {item.phaseWindow}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Interactive Selected Phase Detail Card */}
        <div
          aria-live="polite"
          className="rounded-3xl platinum-card p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6"
        >
          <div className="space-y-2 max-w-2xl">
            <div
              className={`inline-flex items-center gap-2 px-3 py-1 rounded-full font-mono text-[10px] font-bold uppercase tracking-wider ${getAccentPillClass(
                activeItem.accentColor
              )}`}
            >
              <span>{activeItem.phaseBadge}</span>
              <span aria-hidden="true">·</span>
              <span>{activeItem.phaseWindow}</span>
            </div>
            <h4 className="font-display font-bold text-xl text-[var(--text-primary)]">
              {activeItem.title}
            </h4>
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
              {activeItem.summary}
            </p>
          </div>

          <div className="p-4 rounded-2xl platinum-subdued shrink-0">
            <div className="font-mono text-[10px] text-[var(--text-muted)] uppercase">
              Deliverable Milestone
            </div>
            <div className="font-mono text-xs sm:text-sm font-bold text-[var(--text-primary)] mt-1">
              {activeItem.artifactDelivered}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

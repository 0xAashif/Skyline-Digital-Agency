import React, { useState } from 'react';
import { Cpu, Globe, Layers, Pause, Play, Terminal, Zap } from 'lucide-react';
import {
  STACK_TICKER_ROW_1,
  STACK_TICKER_ROW_2,
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

export const StackTicker: React.FC = () => {
  const [paused, setPaused] = useState(false);

  const row1Doubled = [...STACK_TICKER_ROW_1, ...STACK_TICKER_ROW_1];
  const row2Doubled = [...STACK_TICKER_ROW_2, ...STACK_TICKER_ROW_2];

  const renderTechBadgeIcon = (idx: number) => {
    switch (idx % 4) {
      case 0:
        return <Globe className="w-4 h-4 text-[#6366F1]" aria-hidden="true" />;
      case 1:
        return <Terminal className="w-4 h-4 text-[#8B5CF6]" aria-hidden="true" />;
      case 2:
        return <Cpu className="w-4 h-4 text-[#06B6D4]" aria-hidden="true" />;
      default:
        return <Layers className="w-4 h-4 text-[#10B981]" aria-hidden="true" />;
    }
  };

  return (
    <section
      aria-label="Technologies and Tools We Master"
      className={`py-12 platinum-canvas border-t border-[var(--border-metallic)] overflow-hidden ticker-group ${
        paused ? 'ticker-paused' : ''
      }`}
    >
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-10 mb-6 flex items-center justify-between gap-4">
        <div className="font-mono text-xs tracking-widest uppercase text-[var(--text-muted)] mx-auto text-center">
          TECHNOLOGIES &amp; DISTRIBUTION TOOLS WE MASTER
        </div>
        <button
          type="button"
          onClick={() => setPaused((p) => !p)}
          aria-pressed={paused}
          aria-label={paused ? 'Resume ticker animation' : 'Pause ticker animation'}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full platinum-card text-[11px] font-mono text-[var(--text-primary)] cursor-pointer shrink-0"
        >
          {paused ? (
            <>
              <Play className="w-3 h-3" aria-hidden="true" />
              <span>Resume</span>
            </>
          ) : (
            <>
              <Pause className="w-3 h-3" aria-hidden="true" />
              <span>Pause</span>
            </>
          )}
        </button>
      </div>

      {/* Row 1: Rounded Pill Tech Cards with Semantic Category Chips */}
      <div className="py-2 overflow-hidden">
        <div className="animate-marquee-left gap-4 px-2">
          {row1Doubled.map((item, idx) => (
            <div
              key={`r1-${idx}-${item.name}`}
              className="mx-2 px-5 py-3 rounded-2xl platinum-card flex items-center gap-2.5 whitespace-nowrap shrink-0"
            >
              {renderTechBadgeIcon(idx)}
              <span className="font-display font-bold text-xs sm:text-sm text-[var(--text-primary)]">
                {item.name}
              </span>
              <span
                className={`px-2 py-0.5 rounded-full font-mono text-[10px] font-bold ${getAccentPillClass(
                  item.accentColor
                )}`}
              >
                {item.category}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Row 2: Distribution & Local Growth Stack with Semantic Category Chips */}
      <div className="py-2 mt-2 overflow-hidden">
        <div className="animate-marquee-right gap-4 px-2">
          {row2Doubled.map((item, idx) => (
            <div
              key={`r2-${idx}-${item.name}`}
              className="mx-2 px-5 py-3 rounded-2xl platinum-card flex items-center gap-2.5 whitespace-nowrap shrink-0"
            >
              <Zap className="w-4 h-4 text-[#F59E0B]" aria-hidden="true" />
              <span className="font-display font-bold text-xs sm:text-sm text-[var(--text-primary)]">
                {item.name}
              </span>
              <span
                className={`px-2 py-0.5 rounded-full font-mono text-[10px] font-bold ${getAccentPillClass(
                  item.accentColor
                )}`}
              >
                {item.category}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

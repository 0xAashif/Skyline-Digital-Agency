import React, { useState } from 'react';
import { Pause, Play } from 'lucide-react';
import {
  STACK_TICKER_ROW_1,
  STACK_TICKER_ROW_2,
} from '../data/agencyData';
import { TechStackBrandIcon } from './BrandIcons';

export const StackTicker: React.FC = () => {
  const [paused, setPaused] = useState(false);

  const row1Doubled = [...STACK_TICKER_ROW_1, ...STACK_TICKER_ROW_1];
  const row2Doubled = [...STACK_TICKER_ROW_2, ...STACK_TICKER_ROW_2];

  return (
    <section
      aria-label="Technologies and Tools We Master"
      className={`py-12 platinum-canvas border-b border-[var(--border-hairline)] overflow-hidden ticker-group ${
        paused ? 'ticker-paused' : ''
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 mb-6 flex items-center justify-between gap-4">
        <div className="font-mono-tech text-xs tracking-widest uppercase text-[var(--text-muted)] mx-auto text-center">
          TECHNOLOGIES &amp; DISTRIBUTION TOOLS WE MASTER
        </div>
        <button
          type="button"
          onClick={() => setPaused((p) => !p)}
          aria-pressed={paused}
          aria-label={paused ? 'Resume ticker animation' : 'Pause ticker animation'}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full surface-card text-[11px] font-mono-tech text-[var(--text-primary)] cursor-pointer shrink-0"
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

      {/* Row 1: Engineering Stack with Authentic Brand Icons */}
      <div className="py-2 overflow-hidden">
        <div className="animate-marquee-left gap-4 px-2">
          {row1Doubled.map((item, idx) => (
            <div
              key={`r1-${idx}-${item.name}`}
              className="mx-2 px-5 py-3 rounded-2xl surface-card flex items-center gap-2.5 whitespace-nowrap shrink-0"
            >
              <TechStackBrandIcon name={item.name} className="w-4 h-4 shrink-0" />
              <span className="font-display font-bold text-xs sm:text-sm text-[var(--text-primary)]">
                {item.name}
              </span>
              <span className="px-2 py-0.5 rounded-full font-mono-tech text-[10px] font-bold badge-platinum">
                {item.category}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Row 2: Distribution & Local Growth Stack with Authentic Brand Icons */}
      <div className="py-2 mt-2 overflow-hidden">
        <div className="animate-marquee-right gap-4 px-2">
          {row2Doubled.map((item, idx) => (
            <div
              key={`r2-${idx}-${item.name}`}
              className="mx-2 px-5 py-3 rounded-2xl surface-card flex items-center gap-2.5 whitespace-nowrap shrink-0"
            >
              <TechStackBrandIcon name={item.name} className="w-4 h-4 shrink-0" />
              <span className="font-display font-bold text-xs sm:text-sm text-[var(--text-primary)]">
                {item.name}
              </span>
              <span className="px-2 py-0.5 rounded-full font-mono-tech text-[10px] font-bold badge-platinum">
                {item.category}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

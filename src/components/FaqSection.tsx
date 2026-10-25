import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { FAQ_ITEMS, SemanticAccentColor } from '../data/agencyData';

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

export const FaqSection: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>(FAQ_ITEMS[0].id);

  const toggleItem = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section
      id="faq"
      className="py-16 sm:py-20 px-4 sm:px-6 lg:px-10 platinum-canvas border-t border-[var(--border-metallic)]"
    >
      <div className="max-w-[1180px] mx-auto space-y-10">
        {/* Centered Header */}
        <div className="text-center max-w-2xl mx-auto space-y-2.5">
          <div className="font-mono text-xs tracking-widest uppercase text-[var(--text-muted)]">
            FREQUENTLY ASKED QUESTIONS
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-[var(--text-primary)] tracking-tight">
            Everything You Need to Know
          </h2>
          <p className="text-sm text-[var(--text-secondary)]">
            Clear answers regarding our engineering process, local business digitization, and
            pricing.
          </p>
        </div>

        {/* 2-Column Rounded Accordion Grid (Zero Cheap Numbering — Uses Semantic Category Badges) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
          {FAQ_ITEMS.map((item) => {
            const isOpen = openId === item.id;
            const panelId = `faq-panel-${item.id}`;
            const triggerId = `faq-trigger-${item.id}`;
            return (
              <div key={item.id} className="rounded-2xl platinum-card transition-all">
                <h3>
                  <button
                    id={triggerId}
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => toggleItem(item.id)}
                    className="w-full px-6 py-5 min-h-[68px] text-left flex items-center justify-between gap-4 cursor-pointer"
                  >
                    <div className="space-y-1.5">
                      <span
                        className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full font-mono text-[10px] font-bold uppercase tracking-wider ${getAccentPillClass(
                          item.accentColor
                        )}`}
                      >
                        <HelpCircle className="w-3 h-3" aria-hidden="true" />
                        <span>{item.category}</span>
                      </span>
                      <div className="font-display font-bold text-sm sm:text-base text-[var(--text-primary)]">
                        {item.question}
                      </div>
                    </div>
                    <span
                      className={`w-8 h-8 rounded-full platinum-subdued flex items-center justify-center shrink-0 transition-transform duration-150 ${
                        isOpen
                          ? 'rotate-180 text-[var(--text-primary)]'
                          : 'text-[var(--text-secondary)]'
                      }`}
                    >
                      <ChevronDown className="w-4 h-4" aria-hidden="true" />
                    </span>
                  </button>
                </h3>

                {isOpen && (
                  <div
                    id={panelId}
                    role="region"
                    aria-labelledby={triggerId}
                    className="px-6 pb-5 pt-2 text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed border-t border-[var(--border-metallic)]"
                  >
                    {item.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

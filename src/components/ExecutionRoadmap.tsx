import React from 'react';
import { CheckCircle2, Shield, ArrowRight } from 'lucide-react';
import { EXECUTION_ROADMAP } from '../data/agencyData';

interface ExecutionRoadmapProps {
  onNavigate: (sectionId: string) => void;
}

export const ExecutionRoadmap: React.FC<ExecutionRoadmapProps> = ({
  onNavigate,
}) => {
  return (
    <section
      id="process"
      className="py-20 sm:py-28 px-4 sm:px-8 lg:px-12 border-b border-[var(--border-hairline)] bg-architectural-grid"
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-14">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full badge-platinum mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--platinum-primary)]" />
              <span className="font-mono-tech text-[10px] uppercase tracking-widest font-semibold">
                HOW WE DELIVER
              </span>
            </div>
            <h2 className="font-display text-3xl sm:text-5xl font-extrabold tracking-tight text-[var(--text-primary)]">
              Transparent Milestones.{' '}
              <span className="font-serif-editorial italic font-semibold">
                Fast Launch.
              </span>
            </h2>
          </div>
          <p className="text-sm sm:text-base text-[var(--text-secondary)] max-w-md leading-relaxed">
            No vague timelines or endless agency retainers. Every project moves through three clear phases with live previews and full code ownership.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {EXECUTION_ROADMAP.map((item) => (
            <div
              key={item.phase}
              className="surface-card rounded-3xl p-7 sm:p-8 flex flex-col justify-between relative group overflow-hidden"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="px-3 py-1 rounded-full font-mono-tech text-[10px] font-semibold uppercase tracking-widest badge-platinum">
                    {item.phase}
                  </span>
                  <span className="px-3 py-1 rounded-full surface-elevated font-mono-tech text-xs text-[var(--text-primary)] font-semibold">
                    {item.duration}
                  </span>
                </div>

                <h3 className="font-display text-xl sm:text-2xl font-bold text-[var(--text-primary)] mb-3">
                  {item.title}
                </h3>

                <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed mb-6">
                  {item.description}
                </p>

                <div className="space-y-2.5 mb-6">
                  {item.deliverables.map((del) => (
                    <div
                      key={del}
                      className="flex items-start gap-2.5 text-xs sm:text-sm text-[var(--text-primary)]"
                    >
                      <CheckCircle2 className="w-4 h-4 text-[var(--text-secondary)] shrink-0 mt-0.5" />
                      <span>{del}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-[var(--border-hairline)]">
                <div className="p-3 rounded-xl surface-elevated flex items-center gap-2 text-[11px] font-mono-tech text-[var(--text-primary)]">
                  <Shield className="w-3.5 h-3.5 text-[var(--text-secondary)] shrink-0" />
                  <span>{item.verificationGate}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 surface-card rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-[var(--platinum-primary)] animate-pulse shrink-0" />
            <p className="text-xs sm:text-sm text-[var(--text-primary)] font-medium">
              Ready to launch your website, WhatsApp automation, or local Google Maps campaign?
            </p>
          </div>
          <button
            onClick={() => onNavigate('contact')}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full btn-platinum-primary text-xs font-semibold cursor-pointer shrink-0"
          >
            <span>Book Discovery Call</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </section>
  );
};

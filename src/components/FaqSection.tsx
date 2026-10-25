import React, { useState } from 'react';
import { Plus, Minus, HelpCircle } from 'lucide-react';
import { FAQ_ITEMS, SKYLINE_WHATSAPP_NUMBER, FaqItem } from '../data/agencyData';
import { WhatsAppBrandBadge } from './BrandIcons';

interface FaqSectionProps {
  onNavigate: (sectionId: string) => void;
  faqs?: FaqItem[];
}

export const FaqSection: React.FC<FaqSectionProps> = ({
  onNavigate,
  faqs = FAQ_ITEMS,
}) => {
  const [openId, setOpenId] = useState<string>(faqs[0]?.id || FAQ_ITEMS[0].id);

  const toggleFaq = (id: string) => {
    setOpenId((prev) => (prev === id ? '' : id));
  };

  const whatsappDirectUrl = `https://wa.me/${SKYLINE_WHATSAPP_NUMBER}?text=${encodeURIComponent(
    'Hi SkyLine Digital! I have a quick question about a project.'
  )}`;

  return (
    <section
      id="faq"
      className="py-20 sm:py-28 px-4 sm:px-8 lg:px-12 border-b border-[var(--border-hairline)] bg-architectural-grid"
    >
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full badge-platinum mb-4">
              <HelpCircle className="w-3.5 h-3.5" />
              <span className="font-mono-tech text-[10px] uppercase tracking-widest font-semibold">
                COMMON QUESTIONS
              </span>
            </div>
            <h2 className="font-display text-3xl sm:text-5xl font-extrabold tracking-tight text-[var(--text-primary)]">
              Clear Answers{' '}
              <span className="font-serif-editorial italic font-semibold">
                Before We Build.
              </span>
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[var(--text-secondary)] max-w-xs leading-relaxed">
            Everything you need to know about our timelines, local business packages, pricing, and 100% code ownership.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className="surface-card rounded-2xl overflow-hidden transition-colors"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                    <span className="font-mono-tech text-[10px] uppercase tracking-widest px-2.5 py-1 rounded-md badge-platinum w-fit font-semibold">
                      {faq.category}
                    </span>
                    <span className="font-display font-bold text-base sm:text-lg text-[var(--text-primary)]">
                      {faq.question}
                    </span>
                  </div>
                  <span
                    className={`p-2 rounded-full shrink-0 transition-colors ${
                      isOpen
                        ? 'btn-platinum-primary'
                        : 'surface-elevated text-[var(--text-secondary)]'
                    }`}
                  >
                    {isOpen ? (
                      <Minus className="w-4 h-4" />
                    ) : (
                      <Plus className="w-4 h-4" />
                    )}
                  </span>
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 pt-2 border-t border-[var(--border-hairline)] text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Urgent Quote Banner */}
        <div className="mt-10 surface-card rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center sm:text-left">
            <div className="font-display font-bold text-base text-[var(--text-primary)]">
              Still have a specific question or need an urgent quote?
            </div>
            <div className="text-xs text-[var(--text-secondary)]">
              Chat directly with our lead architect on WhatsApp or request a callback.
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <a
              href={whatsappDirectUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full btn-whatsapp-official text-xs font-semibold"
            >
              <WhatsAppBrandBadge size="sm" className="border border-white/30" />
              <span>Ask on WhatsApp</span>
            </a>
            <button
              onClick={() => onNavigate('contact')}
              className="px-4 py-2.5 rounded-full btn-platinum-primary text-xs font-semibold cursor-pointer"
            >
              Get Free Proposal
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

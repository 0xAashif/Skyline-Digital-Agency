import React, { useState } from 'react';
import {
  ArrowRight,
  ArrowUpRight,
  Briefcase,
  Check,
  ChevronLeft,
  ChevronRight,
  DollarSign,
  Star,
  UserPlus,
} from 'lucide-react';
import {
  SHOWCASE_PROJECTS,
  ShowcaseProject,
  VERIFIED_REVIEWS,
} from '../data/agencyData';
import { buildReferralWhatsAppUrl } from '../utils/architectEngine';
import { WhatsAppLogoIcon } from './BrandIcons';

interface ClientProofAndReferralProps {
  onOpenProjectModal?: (project: ShowcaseProject) => void;
}

export const ClientProofAndReferral: React.FC<ClientProofAndReferralProps> = ({
  onOpenProjectModal,
}) => {
  const [startIndex, setStartIndex] = useState<number>(0);
  const [referrerName, setReferrerName] = useState<string>('');
  const [referredBusiness, setReferredBusiness] = useState<string>('');
  const [estimatedDealValue, setEstimatedDealValue] = useState<number>(120000);

  const commissionPayout = Math.round(estimatedDealValue * 0.15);
  const referralWhatsAppUrl = buildReferralWhatsAppUrl(referrerName, referredBusiness);

  const handlePrev = () => {
    setStartIndex((prev) => (prev === 0 ? VERIFIED_REVIEWS.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setStartIndex((prev) => (prev + 1) % VERIFIED_REVIEWS.length);
  };

  const visibleReviews = [0, 1, 2].map(
    (offset) => VERIFIED_REVIEWS[(startIndex + offset) % VERIFIED_REVIEWS.length]
  );

  const handleOpenCaseInfo = (relatedProjectId: string) => {
    const matchingProject =
      SHOWCASE_PROJECTS.find((p) => p.id === relatedProjectId) || SHOWCASE_PROJECTS[0];
    if (onOpenProjectModal) {
      onOpenProjectModal(matchingProject);
    } else {
      const el = document.getElementById('projects');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* SECTION 5: CLIENT REVIEWS — Client Success Stories with Warm Amber Gold Stars & Emerald Verified Badges */}
      <section
        id="proof"
        className="py-16 sm:py-20 px-4 sm:px-6 lg:px-10 platinum-canvas border-t border-[var(--border-metallic)]"
      >
        <div className="max-w-[1320px] mx-auto space-y-10">
          {/* Centered Header */}
          <div className="text-center max-w-2xl mx-auto space-y-2.5">
            <div className="font-mono text-xs tracking-widest uppercase text-[var(--text-muted)]">
              CLIENT REVIEWS
            </div>
            <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-[var(--text-primary)] tracking-tight">
              Client Success Stories
            </h2>
            <p className="text-sm text-[var(--text-secondary)]">
              Verified feedback from founders and local business owners we scaled across India &amp;
              beyond.
            </p>
          </div>

          {/* 3-Column Rounded Testimonial Cards + Carousel Controls */}
          <div className="relative">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {visibleReviews.map((review) => (
                <article
                  key={review.id}
                  className="rounded-3xl platinum-card p-6 sm:p-7 flex flex-col justify-between transition-transform hover:-translate-y-0.5"
                >
                  <div className="space-y-5">
                    {/* Top Row: 5 Warm Amber Gold Stars (#F59E0B) + Emerald Verified Project Pill (#10B981) */}
                    <div className="flex items-center justify-between gap-2">
                      <div
                        className="flex items-center gap-1 text-[#F59E0B]"
                        aria-label="5 out of 5 stars"
                      >
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-current" aria-hidden="true" />
                        ))}
                      </div>

                      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full accent-pill-emerald font-mono text-[10px] font-bold">
                        <Check className="w-3 h-3" aria-hidden="true" />
                        <span>{review.verifiedOutcome}</span>
                      </span>
                    </div>

                    {/* Concise Italic Quote */}
                    <blockquote className="text-sm italic text-[var(--text-primary)] leading-relaxed">
                      &ldquo;{review.quote}&rdquo;
                    </blockquote>
                  </div>

                  {/* Bottom Divider + Author Row */}
                  <footer className="mt-6 pt-4 border-t border-[var(--border-metallic)] flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-10 h-10 rounded-full btn-platinum-primary font-display font-bold text-xs flex items-center justify-center shrink-0">
                        {review.initials}
                      </div>
                      <div className="min-w-0">
                        <div className="font-display font-bold text-sm text-[var(--text-primary)] truncate">
                          {review.author}
                        </div>
                        <div className="text-xs text-[var(--text-secondary)] truncate">
                          {review.role}
                        </div>
                        <div className="font-mono text-[10px] font-bold text-[var(--text-muted)] truncate mt-0.5">
                          {review.engagementScope}
                        </div>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleOpenCaseInfo(review.relatedProjectId)}
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full platinum-subdued text-[11px] font-semibold text-[var(--text-primary)] shrink-0 cursor-pointer hover:opacity-85"
                    >
                      <span>Case Info</span>
                      <ArrowUpRight className="w-3 h-3" aria-hidden="true" />
                    </button>
                  </footer>
                </article>
              ))}
            </div>

            {/* Carousel Controls */}
            <div className="mt-6 flex items-center justify-center gap-3">
              <button
                type="button"
                onClick={handlePrev}
                aria-label="Previous Testimonial"
                className="w-10 h-10 rounded-full platinum-card text-[var(--text-primary)] flex items-center justify-center cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" aria-hidden="true" />
              </button>
              <span className="font-mono text-xs text-[var(--text-muted)]">
                Verified Client Deployments
              </span>
              <button
                type="button"
                onClick={handleNext}
                aria-label="Next Testimonial"
                className="w-10 h-10 rounded-full platinum-card text-[var(--text-primary)] flex items-center justify-center cursor-pointer"
              >
                <ChevronRight className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6: REFERRAL PROGRAM — Zero Cheap Numbering + Warm Amber Gold 15% Commission + Official Green WhatsApp CTA */}
      <section
        id="referral"
        className="py-16 sm:py-20 px-4 sm:px-6 lg:px-10 platinum-canvas border-t border-[var(--border-metallic)]"
      >
        <div className="max-w-[1180px] mx-auto space-y-10">
          {/* Centered Header */}
          <div className="text-center max-w-2xl mx-auto space-y-2.5">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full accent-pill-amber font-mono text-xs font-bold tracking-widest uppercase">
              <span>PARTNER REFERRAL PROGRAM · 15% DIRECT COMMISSION</span>
            </div>
            <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-[var(--text-primary)] tracking-tight leading-[1.1]">
              Know Someone Who Needs
              <br />a Digital Upgrade?
            </h2>
          </div>

          {/* 3-Column Rounded Partner Cards (Unnumbered — Uses Semantic Category Pills & Vector Icons) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="rounded-3xl platinum-card p-6 space-y-4">
              <div className="flex items-center justify-between gap-2">
                <span className="px-3 py-1 rounded-full accent-pill-indigo font-mono text-[10px] font-bold tracking-wider uppercase">
                  INTRODUCTION
                </span>
                <div className="w-10 h-10 rounded-xl btn-platinum-primary flex items-center justify-center">
                  <UserPlus className="w-4 h-4" aria-hidden="true" />
                </div>
              </div>
              <div>
                <h3 className="font-display font-bold text-lg text-[var(--text-primary)]">
                  Introduce a Client
                </h3>
                <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed mt-1.5">
                  Connect us with a founder, clinic, showroom, or enterprise needing web systems or
                  growth funnels.
                </p>
              </div>
            </div>

            <div className="rounded-3xl platinum-card p-6 space-y-4">
              <div className="flex items-center justify-between gap-2">
                <span className="px-3 py-1 rounded-full accent-pill-violet font-mono text-[10px] font-bold tracking-wider uppercase">
                  ARCHITECTURE &amp; CLOSE
                </span>
                <div className="w-10 h-10 rounded-xl btn-platinum-primary flex items-center justify-center">
                  <Briefcase className="w-4 h-4" aria-hidden="true" />
                </div>
              </div>
              <div>
                <h3 className="font-display font-bold text-lg text-[var(--text-primary)]">
                  We Architect &amp; Close
                </h3>
                <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed mt-1.5">
                  Our engineering team handles the 60s teardown, discovery call, technical scoping,
                  and contract.
                </p>
              </div>
            </div>

            <div className="rounded-3xl platinum-card p-6 space-y-4">
              <div className="flex items-center justify-between gap-2">
                <span className="px-3 py-1 rounded-full accent-pill-amber font-mono text-[10px] font-bold tracking-wider uppercase">
                  15% DIRECT COMMISSION
                </span>
                <div className="w-10 h-10 rounded-xl btn-platinum-primary flex items-center justify-center">
                  <DollarSign className="w-4 h-4" aria-hidden="true" />
                </div>
              </div>
              <div>
                <h3 className="font-display font-bold text-lg text-[var(--text-primary)]">
                  Earn 15% Payout
                </h3>
                <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed mt-1.5">
                  Receive a 15% direct commission payout transferred immediately via UPI / NEFT
                  upon project signing.
                </p>
              </div>
            </div>
          </div>

          {/* Interactive Quick Inputs + Commission Calculator + Official Green WhatsApp CTA */}
          <div className="rounded-3xl platinum-card p-6 sm:p-8 space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 items-end">
              <div>
                <label
                  htmlFor="referrer-name-input"
                  className="block font-mono text-[11px] font-semibold text-[var(--text-muted)] mb-1.5"
                >
                  YOUR NAME (OPTIONAL)
                </label>
                <input
                  id="referrer-name-input"
                  type="text"
                  value={referrerName}
                  onChange={(e) => setReferrerName(e.target.value)}
                  placeholder="e.g. Rohan Kulkarni"
                  className="w-full px-4 py-2.5 min-h-[44px] rounded-xl platinum-subdued text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)]/60 focus:outline-none"
                />
              </div>

              <div>
                <label
                  htmlFor="referred-biz-input"
                  className="block font-mono text-[11px] font-semibold text-[var(--text-muted)] mb-1.5"
                >
                  REFERRED BUSINESS (OPTIONAL)
                </label>
                <input
                  id="referred-biz-input"
                  type="text"
                  value={referredBusiness}
                  onChange={(e) => setReferredBusiness(e.target.value)}
                  placeholder="e.g. Apex Clinic & Showroom"
                  className="w-full px-4 py-2.5 min-h-[44px] rounded-xl platinum-subdued text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)]/60 focus:outline-none"
                />
              </div>

              <div className="p-3 rounded-xl platinum-subdued">
                <div className="flex items-center justify-between text-xs font-mono">
                  <label htmlFor="referral-value-slider" className="text-[var(--text-muted)]">
                    15% Payout Est:
                  </label>
                  <span className="px-2 py-0.5 rounded-md accent-pill-amber font-bold tabular-nums">
                    ₹{commissionPayout.toLocaleString('en-IN')}
                  </span>
                </div>
                <input
                  id="referral-value-slider"
                  type="range"
                  min={40000}
                  max={800000}
                  step={20000}
                  value={estimatedDealValue}
                  onChange={(e) => setEstimatedDealValue(Number(e.target.value))}
                  className="w-full accent-[var(--text-primary)] mt-1.5 cursor-pointer"
                />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
              <a
                href={referralWhatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 px-7 py-4 min-h-[50px] rounded-2xl bg-[#25D366] text-white font-display font-bold text-sm hover:opacity-95 transition-opacity whitespace-nowrap shadow-md"
              >
                <WhatsAppLogoIcon className="w-5 h-5" />
                <span>Refer a Client on WhatsApp</span>
                <ArrowRight className="w-4 h-4 shrink-0" aria-hidden="true" />
              </a>
              <span className="text-xs font-mono text-[var(--text-muted)]">
                Direct UPI / NEFT transfer • Uncapped 15% payout
              </span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

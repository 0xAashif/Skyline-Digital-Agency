import React, { useState, useMemo } from 'react';
import {
  TrendingUp,
  Award,
  Sparkles,
  CheckCircle2,
  Star,
  Gift,
  Send,
  Share2,
  Handshake,
  Wallet,
} from 'lucide-react';
import {
  CLIENT_PROOF_CASES,
  VERIFIED_REVIEWS,
  VerifiedReview,
} from '../data/agencyData';
import { buildReferralWhatsAppUrl } from '../utils/architectEngine';
import { WhatsAppBrandBadge } from './BrandIcons';

export interface PublicReferralSubmissionPayload {
  referrerName: string;
  referrerContact?: string;
  referredBusiness: string;
  estimatedDealValue: number;
}

export type ProofReferralViewMode = 'proof-only' | 'referral-only' | 'both';

interface ClientProofAndReferralProps {
  reviews?: VerifiedReview[];
  onSubmitReferral?: (payload: PublicReferralSubmissionPayload) => Promise<void>;
  viewMode?: ProofReferralViewMode;
}

const DEAL_TIERS = [
  {
    id: 'local',
    label: 'Local Business Growth Package',
    dealValue: '₹50,000',
    dealNumeric: 50000,
    commission: '₹7,500',
    desc: 'Website + Google Maps SEO + WhatsApp Bot',
  },
  {
    id: 'growth',
    label: 'Startup Web / AI / Ads Bundle',
    dealValue: '₹1,20,000',
    dealNumeric: 120000,
    commission: '₹18,000',
    desc: 'Custom Next.js Platform + CRM + Paid Ads',
  },
  {
    id: 'enterprise',
    label: 'Custom SaaS & Full-Scale Engine',
    dealValue: '₹3,00,000',
    dealNumeric: 300000,
    commission: '₹45,000',
    desc: 'Multi-Tenant SaaS + AI Agents + Growth Retainer',
  },
];

export const ClientProofAndReferral: React.FC<ClientProofAndReferralProps> = ({
  reviews = VERIFIED_REVIEWS,
  onSubmitReferral,
  viewMode = 'both',
}) => {
  const [selectedTier, setSelectedTier] = useState(DEAL_TIERS[1]);
  const [referrerName, setReferrerName] = useState('');
  const [referrerContact, setReferrerContact] = useState('');
  const [referredBusiness, setReferredBusiness] = useState('');
  const [submittingReferral, setSubmittingReferral] = useState(false);
  const [referralLogged, setReferralLogged] = useState(false);
  const [referralError, setReferralError] = useState<string | null>(null);

  const referralWhatsAppUrl = useMemo(
    () =>
      buildReferralWhatsAppUrl(
        referrerName,
        `${referredBusiness || 'a business'} — ${selectedTier.label} (${selectedTier.dealValue}, Expected 15% Commission: ${selectedTier.commission})`
      ),
    [referrerName, referredBusiness, selectedTier]
  );

  const handleLogReferral = async (e: React.FormEvent) => {
    e.preventDefault();
    setReferralError(null);
    if (!referrerName.trim() || !referredBusiness.trim()) {
      setReferralError('Please enter both your name and the business you are referring.');
      return;
    }

    if (onSubmitReferral) {
      setSubmittingReferral(true);
      try {
        await onSubmitReferral({
          referrerName: referrerName.trim(),
          referrerContact: referrerContact.trim() || 'Via WhatsApp Partner Desk',
          referredBusiness: referredBusiness.trim(),
          estimatedDealValue: selectedTier.dealNumeric,
        });
        setReferralLogged(true);
      } catch (err) {
        setReferralError(
          err instanceof Error ? err.message : 'Unable to register referral right now.'
        );
      } finally {
        setSubmittingReferral(false);
      }
    }
  };

  const showProof = viewMode === 'both' || viewMode === 'proof-only';
  const showReferral = viewMode === 'both' || viewMode === 'referral-only';

  return (
    <section
      id={viewMode === 'referral-only' ? 'referral' : 'proof'}
      className="py-16 sm:py-24 px-4 sm:px-8 lg:px-12 border-b border-[var(--border-hairline)] bg-[var(--bg-canvas)]"
    >
      <div className="max-w-7xl mx-auto space-y-20">
        {/* =================================================================
            PART 1: VERIFIED OUTCOMES & CLIENT TESTIMONIALS
           ================================================================= */}
        {showProof && (
          <div>
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-14">
              <div>
                {/* Zero-Pill Discipline Kicker */}
                <div className="inline-flex items-center gap-2 mb-3">
                  <TrendingUp className="w-3.5 h-3.5 text-[var(--text-primary)]" />
                  <span className="font-mono-tech text-[11px] uppercase tracking-widest font-bold text-[var(--text-primary)]">
                    PROVEN CLIENT IMPACT
                  </span>
                </div>
                <h2 className="font-display text-3xl sm:text-5xl font-extrabold tracking-tight text-[var(--text-primary)]">
                  Real Results.{' '}
                  <span className="font-serif-editorial italic font-semibold text-platinum-gradient">
                    Verified Growth.
                  </span>
                </h2>
              </div>
              <p className="text-sm sm:text-base text-[var(--text-secondary)] max-w-md leading-relaxed">
                Every project is measured against concrete business metrics: faster load speeds, #1 Google Maps rankings, lower ad costs, and automated WhatsApp sales.
              </p>
            </div>

            {/* 2 Proof Case Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              {CLIENT_PROOF_CASES.map((item) => (
                <div
                  key={item.id}
                  className="surface-card rounded-3xl p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden"
                >
                  <div>
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-6">
                      <span className="font-mono-tech text-xs font-semibold text-[var(--text-primary)]">
                        {item.clientSector}
                      </span>
                      <span className="px-3 py-1 rounded-full badge-platinum font-mono-tech text-[11px] font-semibold">
                        {item.timeframe}
                      </span>
                    </div>

                    {/* Highlight Metric Box */}
                    <div className="p-5 rounded-2xl surface-elevated mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div>
                        <div className="font-display text-3xl sm:text-4xl font-extrabold text-[var(--text-primary)]">
                          {item.primaryMetric}
                        </div>
                        <div className="text-xs text-[var(--text-secondary)] font-medium mt-0.5">
                          {item.primaryMetricLabel}
                        </div>
                      </div>
                      <div className="sm:text-right">
                        <span className="inline-block px-3 py-1 rounded-full badge-platinum font-mono-tech text-xs font-semibold">
                          {item.secondaryMetric}
                        </span>
                      </div>
                    </div>

                    <div className="space-y-3 text-xs sm:text-sm">
                      <div>
                        <span className="font-mono-tech text-[10px] uppercase tracking-wider text-[var(--text-muted)] block mb-1">
                          THE BOTTLENECK
                        </span>
                        <p className="text-[var(--text-secondary)] leading-relaxed">
                          {item.challenge}
                        </p>
                      </div>
                      <div>
                        <span className="font-mono-tech text-[10px] uppercase tracking-wider text-[var(--text-primary)] font-semibold block mb-1">
                          OUR SOLUTION
                        </span>
                        <p className="text-[var(--text-primary)] leading-relaxed font-medium">
                          {item.solution}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-[var(--border-hairline)] flex flex-wrap gap-1.5">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 rounded-md surface-elevated font-mono-tech text-[10px] text-[var(--text-secondary)]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* 3 Verified Client Reviews */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {reviews.map((rev) => (
                <div
                  key={rev.id}
                  className="surface-card rounded-3xl p-6 sm:p-7 flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between gap-2">
                      <div
                        className="flex items-center gap-0.5 text-[var(--text-primary)]"
                        aria-label={`${rev.rating || 5} out of 5 stars`}
                      >
                        {Array.from({ length: rev.rating || 5 }).map((_, idx) => (
                          <Star
                            key={idx}
                            className="w-3.5 h-3.5 fill-current"
                          />
                        ))}
                      </div>
                      <span className="px-2.5 py-0.5 rounded-full font-mono-tech text-[10px] font-semibold badge-platinum">
                        {rev.serviceTag || rev.engagementScope || 'VERIFIED CLIENT'}
                      </span>
                    </div>

                    <p className="text-xs sm:text-sm text-[var(--text-primary)] leading-relaxed">
                      "{rev.quote}"
                    </p>
                  </div>

                  <div className="pt-5 mt-5 border-t border-[var(--border-hairline)] space-y-2">
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md surface-elevated font-mono-tech text-[10px] text-[var(--text-primary)] font-semibold">
                      <Award className="w-3 h-3 text-[#10B981]" />
                      <span>{rev.impactHighlight || rev.verifiedOutcome || 'Verified ROI'}</span>
                    </div>
                    <div>
                      <div className="font-display font-bold text-sm text-[var(--text-primary)]">
                        {rev.author}
                      </div>
                      <div className="font-mono-tech text-[11px] text-[var(--text-muted)]">
                        {rev.role}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* =================================================================
            PART 2: REFER & EARN 15% PARTNER PROGRAM
           ================================================================= */}
        {showReferral && (
          <div
            id="referral-card"
            className="surface-card rounded-3xl p-6 sm:p-10 lg:p-12 relative overflow-hidden"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
              {/* Left Explanation (6 Cols) */}
              <div className="lg:col-span-6 space-y-5">
                {/* Zero-Pill Discipline Kicker */}
                <div className="inline-flex items-center gap-2">
                  <Gift className="w-3.5 h-3.5 text-[#10B981]" />
                  <span className="font-mono-tech text-[11px] uppercase tracking-widest font-bold text-[var(--text-primary)]">
                    SKYLINE PARTNER PROGRAM • 15% DIRECT PAYOUT
                  </span>
                </div>

                <h3 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-[var(--text-primary)] leading-tight">
                  Know a Business That Needs a Website, AI Bot, or Ads?{' '}
                  <span className="font-serif-editorial italic font-semibold underline decoration-[var(--border-strong)] underline-offset-4">
                    Earn 15% Commission.
                  </span>
                </h3>

                <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                  Introduce a founder, clinic, salon, retail store, or company to SkyLine Digital Agency. When they sign up for any project, we send you a direct <strong>15% cash payout</strong> via UPI or bank transfer as soon as their onboarding invoice clears.
                </p>

                {/* Clean Unnumbered Icon Badges */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                  {[
                    {
                      icon: <Share2 className="w-4 h-4 text-[var(--text-primary)]" />,
                      tag: 'INTRODUCE',
                      title: 'Share Intro',
                      sub: 'Connect us on WhatsApp',
                    },
                    {
                      icon: <Handshake className="w-4 h-4 text-[var(--text-primary)]" />,
                      tag: 'BLUEPRINT',
                      title: 'We Pitch & Close',
                      sub: 'Free audit & proposal',
                    },
                    {
                      icon: <Wallet className="w-4 h-4 text-[#10B981]" />,
                      tag: 'REWARD',
                      title: 'Get 15% Payout',
                      sub: 'Instant UPI / Bank transfer',
                    },
                  ].map((s) => (
                    <div key={s.title} className="p-3.5 rounded-2xl surface-elevated space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="font-mono-tech text-[9px] uppercase tracking-widest text-[var(--text-muted)] font-semibold">
                          {s.tag}
                        </span>
                        {s.icon}
                      </div>
                      <div className="font-display font-bold text-sm text-[var(--text-primary)]">
                        {s.title}
                      </div>
                      <div className="text-[11px] text-[var(--text-secondary)]">
                        {s.sub}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Interactive Commission Calculator & Instant WhatsApp Referral (6 Cols) */}
              <div className="lg:col-span-6 surface-elevated rounded-3xl p-6 sm:p-7 space-y-5">
                <div className="flex items-center justify-between border-b border-[var(--border-hairline)] pb-4">
                  <div>
                    <div className="font-mono-tech text-[10px] uppercase tracking-widest text-[var(--text-muted)]">
                      COMMISSION ESTIMATOR
                    </div>
                    <div className="font-display text-lg font-bold text-[var(--text-primary)]">
                      Select Estimated Project Size
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-mono-tech text-[10px] uppercase text-[var(--text-muted)]">
                      YOUR 15% REWARD
                    </div>
                    <div className="font-display text-2xl sm:text-3xl font-extrabold text-[var(--text-primary)]">
                      {selectedTier.commission}
                    </div>
                  </div>
                </div>

                {/* Tier Buttons */}
                <div className="grid grid-cols-1 gap-2.5">
                  {DEAL_TIERS.map((tier) => {
                    const isSelected = selectedTier.id === tier.id;
                    return (
                      <button
                        key={tier.id}
                        type="button"
                        onClick={() => setSelectedTier(tier)}
                        className={`p-3.5 rounded-2xl text-left transition-all cursor-pointer flex items-center justify-between gap-3 ${
                          isSelected
                            ? 'btn-platinum-primary shadow-md'
                            : 'surface-card hover:border-[var(--border-strong)]'
                        }`}
                      >
                        <div>
                          <div className="font-display font-bold text-xs sm:text-sm">
                            {tier.label}{' '}
                            <span className="font-mono-tech opacity-75">
                              ({tier.dealValue})
                            </span>
                          </div>
                          <div
                            className={`text-[11px] ${
                              isSelected
                                ? 'opacity-80'
                                : 'text-[var(--text-secondary)]'
                            }`}
                          >
                            {tier.desc}
                          </div>
                        </div>
                        <div className="text-right shrink-0">
                          <div className="font-mono-tech text-xs font-bold">
                            Earn {tier.commission}
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Optional Name & Referred Business Inputs */}
                <form onSubmit={handleLogReferral} className="space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                    <input
                      type="text"
                      value={referrerName}
                      onChange={(e) => {
                        setReferrerName(e.target.value);
                        setReferralLogged(false);
                      }}
                      placeholder="Your Name"
                      className="w-full px-3.5 py-2.5 rounded-xl surface-card text-xs text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--platinum-primary)]"
                    />
                    <input
                      type="text"
                      value={referrerContact}
                      onChange={(e) => {
                        setReferrerContact(e.target.value);
                        setReferralLogged(false);
                      }}
                      placeholder="Your Phone / UPI No."
                      className="w-full px-3.5 py-2.5 rounded-xl surface-card text-xs text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--platinum-primary)]"
                    />
                    <input
                      type="text"
                      value={referredBusiness}
                      onChange={(e) => {
                        setReferredBusiness(e.target.value);
                        setReferralLogged(false);
                      }}
                      placeholder="Friend's Business Name"
                      className="w-full px-3.5 py-2.5 rounded-xl surface-card text-xs text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--platinum-primary)]"
                    />
                  </div>

                  {referralError && (
                    <p className="text-xs text-rose-500 font-medium">{referralError}</p>
                  )}

                  {referralLogged && (
                    <div className="p-3 rounded-xl badge-platinum text-xs flex items-center justify-between">
                      <span className="font-medium">
                        ✓ Referral registered in SkyLine Partner CRM! You can also message us on WhatsApp below.
                      </span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <button
                      type="submit"
                      disabled={submittingReferral}
                      className="w-full py-3.5 px-5 rounded-full btn-platinum-primary font-bold text-xs sm:text-sm flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>
                        {submittingReferral ? 'Registering...' : 'Register Referral in Portal'}
                      </span>
                    </button>

                    <a
                      href={referralWhatsAppUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-3.5 px-5 rounded-full btn-whatsapp-official font-bold text-xs sm:text-sm flex items-center justify-center gap-2"
                    >
                      <WhatsAppBrandBadge size="sm" className="border border-white/30" />
                      <span>Send Referral on WhatsApp</span>
                    </a>
                  </div>
                </form>

                <div className="flex items-center justify-between text-[11px] text-[var(--text-muted)] font-mono-tech">
                  <span className="inline-flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#10B981]" />
                    <span>No limit on referrals</span>
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5 text-[#10B981]" />
                    <span>Direct UPI / Bank Payout</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

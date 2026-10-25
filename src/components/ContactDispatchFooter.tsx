import React, { useEffect, useState } from 'react';
import {
  AlertCircle,
  ArrowRight,
  ArrowUp,
  Calendar,
  Check,
  Clock,
  Cloud,
  Copy,
  Cpu,
  Globe,
  Home,
  Info,
  Layers,
  Layout,
  Mail,
  MapPin,
  Phone,
  Send,
  ShieldCheck,
  Star,
  Zap,
} from 'lucide-react';
import {
  ALLOWLISTED_SERVICE_PILLARS,
  ProposalFormInput,
  ProposalValidationResult,
  SKYLINE_EMAIL,
  SKYLINE_INSTAGRAM_URL,
  SKYLINE_SECONDARY_PHONE,
  SKYLINE_WHATSAPP_NUMBER,
  buildProposalMailtoUrl,
  buildProposalWhatsAppUrl,
  checkAndLockIdempotency,
  formatProposalMessage,
  recordTelemetryEvent,
  validateProposalForm,
} from '../utils/architectEngine';
import {
  GitHubLogoIcon,
  InstagramLogoIcon,
  LinkedInLogoIcon,
  SkyLineLogo,
  WhatsAppLogoIcon,
} from './BrandIcons';

const TIME_SLOTS = [
  '10:00 AM - 10:30 AM IST',
  '11:00 AM - 11:30 AM IST',
  '02:00 PM - 02:30 PM IST',
  '04:30 PM - 05:00 PM IST',
  '07:00 PM - 07:30 PM IST',
];

interface ContactDispatchFooterProps {
  preselectedPillar?: string | null;
  prefilledScope?: string | null;
}

export const ContactDispatchFooter: React.FC<ContactDispatchFooterProps> = ({
  preselectedPillar,
  prefilledScope,
}) => {
  const [contactTab, setContactTab] = useState<'inquiry' | 'meeting'>('inquiry');
  const [nameOrCompany, setNameOrCompany] = useState<string>('');
  const [contact, setContact] = useState<string>('');
  const [selectedPillars, setSelectedPillars] = useState<string[]>([
    'Local Business Growth & Digitization',
  ]);
  const [meetingDate, setMeetingDate] = useState<string>('2026-10-26');
  const [meetingSlot, setMeetingSlot] = useState<string>(TIME_SLOTS[1]);
  const [projectScope, setProjectScope] = useState<string>('');
  const [validation, setValidation] = useState<ProposalValidationResult | null>(null);
  const [dispatchedChannel, setDispatchedChannel] = useState<'whatsapp' | 'email' | null>(null);
  const [idempotencyNotice, setIdempotencyNotice] = useState<string | null>(null);
  const [clipboardFallbackNotice, setClipboardFallbackNotice] = useState<string | null>(null);
  const [copiedBrief, setCopiedBrief] = useState<boolean>(false);

  useEffect(() => {
    if (preselectedPillar) {
      setSelectedPillars((prev) =>
        prev.includes(preselectedPillar) ? prev : [...prev, preselectedPillar]
      );
    }
  }, [preselectedPillar]);

  useEffect(() => {
    if (prefilledScope) {
      setProjectScope(prefilledScope);
    }
  }, [prefilledScope]);

  const togglePillar = (pillar: string) => {
    setSelectedPillars((prev) =>
      prev.includes(pillar) ? prev.filter((p) => p !== pillar) : [...prev, pillar]
    );
    if (validation) {
      setValidation(null);
    }
    setIdempotencyNotice(null);
  };

  const composedScope =
    contactTab === 'meeting'
      ? `[Strategy Meeting: ${meetingDate} at ${meetingSlot}] ${projectScope.trim()}`
      : projectScope;

  const currentFormPayload: ProposalFormInput = {
    nameOrCompany,
    contact,
    selectedPillars,
    projectScope: composedScope,
  };

  const handleDispatch = async (channel: 'whatsapp' | 'email') => {
    setIdempotencyNotice(null);
    setClipboardFallbackNotice(null);

    const result = validateProposalForm(
      {
        nameOrCompany,
        contact,
        selectedPillars,
        projectScope: composedScope,
      },
      { enforceIdempotency: true }
    );
    setValidation(result);

    if (!result.valid) {
      if (result.statusCode === 429 && result.errors.idempotency) {
        setIdempotencyNotice(result.errors.idempotency);
      }
      setDispatchedChannel(null);
      return;
    }

    setDispatchedChannel(channel);

    // 5xx / Offline Clipboard Auto-Copy Resilience
    try {
      await navigator.clipboard.writeText(formatProposalMessage(currentFormPayload));
      setCopiedBrief(true);
      setTimeout(() => setCopiedBrief(false), 3000);
    } catch {
      recordTelemetryEvent('lead_dispatch', 'error', 1, {
        reason: 'clipboard_write_unavailable',
      });
      setClipboardFallbackNotice(
        'Formatted brief ready below — use the direct launch button or copy manually.'
      );
    }
  };

  const handleCopyFormattedBrief = async () => {
    try {
      await navigator.clipboard.writeText(formatProposalMessage(currentFormPayload));
      setCopiedBrief(true);
      setTimeout(() => setCopiedBrief(false), 2500);
    } catch {
      setCopiedBrief(true);
      setTimeout(() => setCopiedBrief(false), 2500);
    }
  };

  const whatsappHref = buildProposalWhatsAppUrl(currentFormPayload);
  const mailtoHref = buildProposalMailtoUrl(currentFormPayload);
  const urgentQuoteWhatsAppUrl = `https://wa.me/${SKYLINE_WHATSAPP_NUMBER}?text=${encodeURIComponent(
    'Hi SkyLine Technologies! I would like to discuss a project and get a fast architectural quote.'
  )}`;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="platinum-canvas border-t border-[var(--border-metallic)]">
      {/* SECTION 10: DUAL-MODE CONTACT ("Let's Build Something Great Together") */}
      <div id="contact" className="max-w-[1320px] mx-auto py-16 sm:py-20 px-4 sm:px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Left Column (5 Cols): Fast Response Badge, Title, 2x2 Trust Grid, Contact Cards, Official WhatsApp Quote Banner */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-3.5">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full accent-pill-rose font-mono text-xs font-bold">
                <Zap className="w-3.5 h-3.5" aria-hidden="true" />
                <span>FAST 30-MIN RESPONSE</span>
              </div>

              <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-[var(--text-primary)] leading-[1.08] tracking-tight">
                Let&apos;s Build Something
                <br />
                <span className="text-[var(--text-secondary)]">Great Together.</span>
              </h2>

              <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                Get an architectural breakdown, Local Business or SaaS tech scope, and transparent
                fixed-price ₹ INR milestone roadmap.
              </p>
            </div>

            {/* 2x2 Trust Feature Pills Grid */}
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3.5 rounded-2xl platinum-card flex items-center gap-2.5 text-xs font-display font-bold text-[var(--text-primary)]">
                <Check className="w-4 h-4 text-[#10B981] shrink-0" aria-hidden="true" />
                <span>Free 60s Audit</span>
              </div>
              <div className="p-3.5 rounded-2xl platinum-card flex items-center gap-2.5 text-xs font-display font-bold text-[var(--text-primary)]">
                <ShieldCheck className="w-4 h-4 text-[#6366F1] shrink-0" aria-hidden="true" />
                <span>Strict NDA</span>
              </div>
              <div className="p-3.5 rounded-2xl platinum-card flex items-center gap-2.5 text-xs font-display font-bold text-[var(--text-primary)]">
                <Check className="w-4 h-4 text-[#10B981] shrink-0" aria-hidden="true" />
                <span>Fixed Roadmap</span>
              </div>
              <div className="p-3.5 rounded-2xl platinum-card flex items-center gap-2.5 text-xs font-display font-bold text-[var(--text-primary)]">
                <Clock className="w-4 h-4 text-[#F59E0B] shrink-0" aria-hidden="true" />
                <span>24h Proposal</span>
              </div>
            </div>

            {/* Official Desk Email, Phone & Official WhatsApp Green (#25D366) Urgent Quote Banner */}
            <div className="space-y-3">
              <a
                href={`mailto:${SKYLINE_EMAIL}`}
                className="p-4 rounded-2xl platinum-card hover:opacity-90 flex items-center gap-3.5 transition-opacity"
              >
                <div className="w-10 h-10 rounded-xl btn-platinum-primary flex items-center justify-center shrink-0">
                  <Mail className="w-4 h-4" aria-hidden="true" />
                </div>
                <div className="min-w-0">
                  <div className="font-mono text-[10px] uppercase tracking-wider text-[var(--text-muted)]">
                    OFFICIAL DESK
                  </div>
                  <div className="font-mono text-xs sm:text-sm font-bold text-[var(--text-primary)] truncate">
                    {SKYLINE_EMAIL}
                  </div>
                </div>
              </a>

              <div className="p-4 rounded-2xl platinum-card flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl btn-platinum-primary flex items-center justify-center shrink-0">
                  <Phone className="w-4 h-4" aria-hidden="true" />
                </div>
                <div className="min-w-0">
                  <div className="font-mono text-[10px] uppercase tracking-wider text-[var(--text-muted)]">
                    CALL US (MON – SAT, 10 AM – 9 PM IST)
                  </div>
                  <div className="font-mono text-xs sm:text-sm font-bold text-[var(--text-primary)] flex flex-wrap items-center gap-2 tabular-nums">
                    <a href="tel:+918643002478" className="hover:underline">
                      +91 8643002478
                    </a>
                    <span className="text-[var(--text-muted)]">•</span>
                    <a href="tel:+918959144686" className="hover:underline">
                      {SKYLINE_SECONDARY_PHONE}
                    </a>
                  </div>
                </div>
              </div>

              {/* Official WhatsApp Green (#25D366) Urgent Quote Banner */}
              <a
                href={urgentQuoteWhatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 sm:p-5 rounded-2xl bg-[#25D366] text-white hover:opacity-95 flex items-center justify-between gap-3 transition-opacity shadow-md"
              >
                <div className="flex items-center gap-3">
                  <span className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center shrink-0">
                    <WhatsAppLogoIcon className="w-5 h-5" />
                  </span>
                  <div>
                    <div className="font-display font-extrabold text-sm">Need an Urgent Quote?</div>
                    <div className="text-xs font-medium text-white/90">
                      Chat directly with Lead Engineer on WhatsApp
                    </div>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 shrink-0" aria-hidden="true" />
              </a>
            </div>

            {/* Official Social Icon-Only Bar (Instagram, WhatsApp, LinkedIn, GitHub — Zero @handle text) */}
            <div className="pt-1 flex flex-wrap items-center justify-between gap-3">
              <span className="font-mono text-[11px] uppercase tracking-wider text-[var(--text-muted)]">
                CONNECT WITH SKYLINE:
              </span>
              <div className="flex items-center gap-2">
                <a
                  href={SKYLINE_INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Follow SkyLine on Instagram"
                  title="Follow SkyLine on Instagram"
                  className="inline-flex items-center justify-center w-10 h-10 rounded-full platinum-card text-[var(--text-primary)] instagram-icon-btn"
                >
                  <InstagramLogoIcon className="w-4 h-4" />
                </a>
                <a
                  href="https://wa.me/918643002478"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Chat with SkyLine on WhatsApp"
                  title="Chat with SkyLine on WhatsApp"
                  className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-[#25D366] text-white hover:scale-105 transition-transform"
                >
                  <WhatsAppLogoIcon className="w-4 h-4" />
                </a>
                <a
                  href="#contact"
                  aria-label="SkyLine LinkedIn Architecture Desk"
                  title="LinkedIn"
                  className="inline-flex items-center justify-center w-10 h-10 rounded-full platinum-card text-[var(--text-primary)] hover:opacity-80 transition-opacity"
                >
                  <LinkedInLogoIcon className="w-4 h-4" />
                </a>
                <a
                  href="#capabilities"
                  aria-label="SkyLine Engineering Stack"
                  title="GitHub Engineering"
                  className="inline-flex items-center justify-center w-10 h-10 rounded-full platinum-card text-[var(--text-primary)] hover:opacity-80 transition-opacity"
                >
                  <GitHubLogoIcon className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

          {/* Right Column (7 Cols): Dual-Mode Form Card (Strict Allowlist & Regex Validation + 60s Idempotency) */}
          <div className="lg:col-span-7 rounded-3xl platinum-card p-6 sm:p-10 space-y-6">
            {/* Top 2-Tab Segmented Switcher */}
            <div className="grid grid-cols-2 p-1.5 rounded-2xl platinum-subdued gap-1.5">
              <button
                type="button"
                onClick={() => setContactTab('inquiry')}
                className={`py-3 px-4 rounded-xl font-display font-bold text-xs sm:text-sm inline-flex items-center justify-center gap-2 transition-all cursor-pointer ${
                  contactTab === 'inquiry'
                    ? 'btn-platinum-primary shadow-sm'
                    : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                }`}
              >
                <Send className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Send Project Inquiry</span>
              </button>

              <button
                type="button"
                onClick={() => setContactTab('meeting')}
                className={`py-3 px-4 rounded-xl font-display font-bold text-xs sm:text-sm inline-flex items-center justify-center gap-2 transition-all cursor-pointer ${
                  contactTab === 'meeting'
                    ? 'btn-platinum-primary shadow-sm'
                    : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                }`}
              >
                <Calendar className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Book Strategy Meeting</span>
              </button>
            </div>

            <form
              noValidate
              onSubmit={(e) => {
                e.preventDefault();
                void handleDispatch('whatsapp');
              }}
              className="space-y-5"
            >
              {/* Name / Company */}
              <div>
                <label
                  htmlFor="proposal-name"
                  className="block font-mono text-[11px] font-bold uppercase tracking-wider text-[var(--text-primary)] mb-2"
                >
                  YOUR NAME / COMPANY <span>*</span>
                </label>
                <input
                  id="proposal-name"
                  type="text"
                  required
                  value={nameOrCompany}
                  onChange={(e) => {
                    setNameOrCompany(e.target.value);
                    if (validation) setValidation(null);
                  }}
                  placeholder="e.g. Rahul Sharma / Apex Clinic & Showroom"
                  aria-invalid={Boolean(validation?.errors.nameOrCompany)}
                  className={`w-full px-4 py-3.5 min-h-[48px] rounded-xl platinum-subdued text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)]/60 focus:outline-none ${
                    validation?.errors.nameOrCompany ? 'ring-2 ring-[#F43F5E]' : ''
                  }`}
                />
                {validation?.errors.nameOrCompany && (
                  <p role="alert" className="text-xs text-[#F43F5E] font-mono mt-1.5 font-semibold">
                    {validation.errors.nameOrCompany}
                  </p>
                )}
              </div>

              {/* WhatsApp Number or Email */}
              <div>
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                  <label
                    htmlFor="proposal-contact"
                    className="font-mono text-[11px] font-bold uppercase tracking-wider text-[var(--text-primary)]"
                  >
                    WHATSAPP NUMBER OR EMAIL <span>*</span>
                  </label>
                  <span className="font-mono text-[10px] font-bold uppercase text-[var(--text-muted)]">
                    +91 MOBILE OR WORK EMAIL
                  </span>
                </div>
                <input
                  id="proposal-contact"
                  type="text"
                  required
                  value={contact}
                  onChange={(e) => {
                    setContact(e.target.value);
                    if (validation) setValidation(null);
                  }}
                  placeholder="+91 98765 43210 or yourname@company.com"
                  aria-invalid={Boolean(validation?.errors.contact)}
                  className={`w-full px-4 py-3.5 min-h-[48px] rounded-xl platinum-subdued text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)]/60 focus:outline-none ${
                    validation?.errors.contact ? 'ring-2 ring-[#F43F5E]' : ''
                  }`}
                />
                {validation?.errors.contact && (
                  <p role="alert" className="text-xs text-[#F43F5E] font-mono mt-1.5 font-semibold">
                    {validation.errors.contact}
                  </p>
                )}
              </div>

              {/* Conditional Meeting Date & Slot Selector */}
              {contactTab === 'meeting' && (
                <div className="p-4 rounded-2xl platinum-subdued grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="meeting-date-input"
                      className="block font-mono text-[10px] font-bold uppercase text-[var(--text-muted)] mb-1.5"
                    >
                      PREFERRED MEETING DATE
                    </label>
                    <input
                      id="meeting-date-input"
                      type="date"
                      value={meetingDate}
                      onChange={(e) => setMeetingDate(e.target.value)}
                      className="w-full px-3.5 py-2.5 min-h-[42px] rounded-xl platinum-card text-xs font-mono text-[var(--text-primary)] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="meeting-slot-select"
                      className="block font-mono text-[10px] font-bold uppercase text-[var(--text-muted)] mb-1.5"
                    >
                      PREFERRED TIME SLOT
                    </label>
                    <select
                      id="meeting-slot-select"
                      value={meetingSlot}
                      onChange={(e) => setMeetingSlot(e.target.value)}
                      className="w-full px-3.5 py-2.5 min-h-[42px] rounded-xl platinum-card text-xs font-mono text-[var(--text-primary)] focus:outline-none"
                    >
                      {TIME_SLOTS.map((slot) => (
                        <option key={slot} value={slot}>
                          {slot}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              )}

              {/* Service Pillar Selection Chips (Strict Allowlist) */}
              <fieldset>
                <legend className="font-mono text-[11px] font-bold uppercase tracking-wider text-[var(--text-muted)] mb-2">
                  SELECT SERVICE PILLARS *
                </legend>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {ALLOWLISTED_SERVICE_PILLARS.map((pillar) => {
                    const active = selectedPillars.includes(pillar);
                    return (
                      <button
                        key={pillar}
                        type="button"
                        onClick={() => togglePillar(pillar)}
                        aria-pressed={active}
                        className={`px-3.5 py-2.5 min-h-[42px] rounded-xl text-left text-xs font-semibold flex items-center justify-between gap-2 transition-all cursor-pointer ${
                          active
                            ? 'btn-platinum-primary shadow-sm'
                            : 'platinum-subdued text-[var(--text-primary)] hover:opacity-85'
                        }`}
                      >
                        <span className="truncate">{pillar}</span>
                        {active && <Check className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />}
                      </button>
                    );
                  })}
                </div>
                {validation?.errors.selectedPillars && (
                  <p role="alert" className="text-xs text-[#F43F5E] font-mono mt-1.5 font-semibold">
                    {validation.errors.selectedPillars}
                  </p>
                )}
              </fieldset>

              {/* Brief Scope */}
              <div>
                <label
                  htmlFor="proposal-scope"
                  className="block font-mono text-[11px] font-bold uppercase tracking-wider text-[var(--text-primary)] mb-2"
                >
                  WHAT DO YOU WANT TO BUILD?{' '}
                  <span className="text-[var(--text-muted)] font-normal">(BRIEF SCOPE)</span>
                </label>
                <textarea
                  id="proposal-scope"
                  rows={3}
                  required
                  value={projectScope}
                  onChange={(e) => {
                    setProjectScope(e.target.value);
                    if (validation) setValidation(null);
                  }}
                  placeholder="Tell us about your project requirements, target timeline, or current bottleneck..."
                  aria-invalid={Boolean(validation?.errors.projectScope)}
                  className={`w-full p-4 rounded-xl platinum-subdued text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)]/60 focus:outline-none ${
                    validation?.errors.projectScope ? 'ring-2 ring-[#F43F5E]' : ''
                  }`}
                />
                {validation?.errors.projectScope && (
                  <p role="alert" className="text-xs text-[#F43F5E] font-mono mt-1.5 font-semibold">
                    {validation.errors.projectScope}
                  </p>
                )}
              </div>

              {/* 429 Idempotency Notice Banner */}
              {idempotencyNotice && (
                <div
                  role="alert"
                  className="p-3.5 rounded-xl accent-pill-amber font-mono text-xs flex items-center gap-2"
                >
                  <AlertCircle className="w-4 h-4 shrink-0" aria-hidden="true" />
                  <span>{idempotencyNotice}</span>
                </div>
              )}

              {/* Dual Submit Actions: Official WhatsApp Green (#25D366) + Email Option */}
              <div className="space-y-2.5 pt-1">
                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center gap-2.5 px-6 py-4 min-h-[52px] rounded-2xl bg-[#25D366] text-white font-display font-bold text-sm hover:opacity-95 transition-opacity cursor-pointer shadow-md"
                >
                  <WhatsAppLogoIcon className="w-5 h-5" />
                  <span>
                    {contactTab === 'meeting'
                      ? 'Schedule Strategy Meeting via WhatsApp'
                      : 'Send Instant Request via WhatsApp (Proposal in 24h)'}
                  </span>
                  <ArrowRight className="w-4 h-4 shrink-0" aria-hidden="true" />
                </button>

                <button
                  type="button"
                  onClick={() => void handleDispatch('email')}
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 min-h-[44px] rounded-xl platinum-subdued text-[var(--text-primary)] font-display font-semibold text-xs hover:opacity-85 transition-opacity cursor-pointer"
                >
                  <Mail className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>Or Send to Official Desk ({SKYLINE_EMAIL})</span>
                </button>
              </div>

              {/* Validated Dispatch Confirmation & Direct External Launch */}
              {validation?.valid && dispatchedChannel && (
                <div
                  role="status"
                  aria-live="polite"
                  className="p-5 rounded-2xl platinum-subdued space-y-4"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="px-2.5 py-0.5 rounded-full accent-pill-emerald font-mono text-xs font-bold">
                      ✓ BRIEF VALIDATED · COPIED &amp; READY FOR DISPATCH
                    </span>
                    <button
                      type="button"
                      onClick={() => void handleCopyFormattedBrief()}
                      className="inline-flex items-center gap-1.5 text-xs font-mono text-[var(--text-primary)] cursor-pointer"
                    >
                      <Copy className="w-3.5 h-3.5" aria-hidden="true" />
                      <span>{copiedBrief ? 'Copied to Clipboard' : 'Copy Text'}</span>
                    </button>
                  </div>

                  {clipboardFallbackNotice && (
                    <p className="text-xs font-mono text-[var(--text-secondary)]">
                      {clipboardFallbackNotice}
                    </p>
                  )}

                  <pre className="p-3 rounded-xl platinum-card text-xs font-mono text-[var(--text-secondary)] whitespace-pre-wrap overflow-x-auto">
                    {formatProposalMessage(currentFormPayload)}
                  </pre>

                  <div className="flex flex-wrap items-center gap-3">
                    {dispatchedChannel === 'whatsapp' ? (
                      <a
                        href={whatsappHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-5 py-2.5 min-h-[44px] rounded-xl bg-[#25D366] text-white font-display font-bold text-xs"
                      >
                        <WhatsAppLogoIcon className="w-4 h-4" />
                        <span>Open Pre-Filled WhatsApp Chat (+91 8643002478)</span>
                        <ArrowRight className="w-4 h-4" aria-hidden="true" />
                      </a>
                    ) : (
                      <a
                        href={mailtoHref}
                        className="inline-flex items-center gap-2 px-5 py-2.5 min-h-[44px] rounded-xl btn-platinum-primary font-display font-bold text-xs"
                      >
                        <span>Launch Default Email Client ({SKYLINE_EMAIL})</span>
                        <ArrowRight className="w-4 h-4" aria-hidden="true" />
                      </a>
                    )}
                  </div>
                </div>
              )}

              {/* Bottom Guarantee Row */}
              <div className="pt-2 flex flex-wrap items-center justify-center gap-4 text-xs text-[var(--text-muted)]">
                <span className="inline-flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-[#10B981]" aria-hidden="true" />
                  <span>Zero spam guarantee</span>
                </span>
                <span aria-hidden="true">•</span>
                <span className="inline-flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-[#10B981]" aria-hidden="true" />
                  <span>Confidential &amp; NDA protected</span>
                </span>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* SECTION 11: 4-COLUMN FOOTER + MONUMENTAL WORDMARK WITH ANIMATED ♾️ INFINITY-LOOP PAPER-PLANE ROCKET */}
      <div className="border-t border-[var(--border-metallic)] pt-14 pb-6 px-4 sm:px-6 lg:px-10 overflow-hidden">
        <div className="max-w-[1320px] mx-auto space-y-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10">
            {/* Col 1 (4 Cols): Code-Prism < S / > Brand & Description + Icon-Only Socials */}
            <div className="lg:col-span-4 space-y-4">
              <a href="#top" className="inline-flex items-center">
                <SkyLineLogo iconClassName="w-11 h-11" showSubtitle />
              </a>

              <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed max-w-sm">
                Digital engineering &amp; growth agency building sub-100ms web platforms, AI &amp;
                WhatsApp CRM workflows, Local Business Map Pack #1 engines, and high-ROAS funnels.
              </p>

              <div className="flex flex-wrap items-center gap-2.5 pt-1">
                <a
                  href={SKYLINE_INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Follow SkyLine on Instagram"
                  title="Follow SkyLine on Instagram"
                  className="inline-flex items-center justify-center w-10 h-10 rounded-full platinum-card text-[var(--text-primary)] instagram-icon-btn"
                >
                  <InstagramLogoIcon className="w-4 h-4" />
                </a>
                <a
                  href="https://wa.me/918643002478"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Chat with SkyLine on WhatsApp"
                  title="Chat with SkyLine on WhatsApp"
                  className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-[#25D366] text-white hover:scale-105 transition-transform"
                >
                  <WhatsAppLogoIcon className="w-4 h-4" />
                </a>
                <a
                  href="#contact"
                  aria-label="SkyLine LinkedIn"
                  title="LinkedIn"
                  className="inline-flex items-center justify-center w-10 h-10 rounded-full platinum-card text-[var(--text-primary)] hover:opacity-80 transition-opacity"
                >
                  <LinkedInLogoIcon className="w-4 h-4" />
                </a>
                <a
                  href="#capabilities"
                  aria-label="SkyLine GitHub"
                  title="GitHub"
                  className="inline-flex items-center justify-center w-10 h-10 rounded-full platinum-card text-[var(--text-primary)] hover:opacity-80 transition-opacity"
                >
                  <GitHubLogoIcon className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Col 2 (2 Cols): Quick Links */}
            <div className="lg:col-span-2 space-y-3.5">
              <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-[var(--text-muted)]">
                QUICK LINKS
              </h4>
              <ul className="space-y-2.5 text-xs sm:text-sm text-[var(--text-secondary)]">
                <li>
                  <a
                    href="#top"
                    className="hover:text-[var(--text-primary)] inline-flex items-center gap-2"
                  >
                    <Home className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>Home</span>
                  </a>
                </li>
                <li>
                  <a
                    href="#process"
                    className="hover:text-[var(--text-primary)] inline-flex items-center gap-2"
                  >
                    <Info className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>Our Process</span>
                  </a>
                </li>
                <li>
                  <a
                    href="#capabilities"
                    className="hover:text-[var(--text-primary)] inline-flex items-center gap-2"
                  >
                    <Layers className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>Services</span>
                  </a>
                </li>
                <li>
                  <a
                    href="#projects"
                    className="hover:text-[var(--text-primary)] inline-flex items-center gap-2"
                  >
                    <Layout className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>Our Projects</span>
                  </a>
                </li>
                <li>
                  <a
                    href="#referral"
                    className="hover:text-[var(--text-primary)] font-semibold inline-flex items-center gap-2"
                  >
                    <Zap className="w-3.5 h-3.5 text-[#F59E0B]" aria-hidden="true" />
                    <span>15% Partner Offer</span>
                  </a>
                </li>
                <li>
                  <a
                    href="#proof"
                    className="hover:text-[var(--text-primary)] inline-flex items-center gap-2"
                  >
                    <Star className="w-3.5 h-3.5 text-[#F59E0B]" aria-hidden="true" />
                    <span>Reviews</span>
                  </a>
                </li>
              </ul>
            </div>

            {/* Col 3 (3 Cols): Core Solutions */}
            <div className="lg:col-span-3 space-y-3.5">
              <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-[var(--text-muted)]">
                CORE SOLUTIONS
              </h4>
              <ul className="space-y-2.5 text-xs sm:text-sm text-[var(--text-secondary)]">
                <li>
                  <a
                    href="#capabilities"
                    className="hover:text-[var(--text-primary)] inline-flex items-center gap-2"
                  >
                    <MapPin className="w-3.5 h-3.5 text-[#F59E0B]" aria-hidden="true" />
                    <span>Local Business Growth Engine</span>
                  </a>
                </li>
                <li>
                  <a
                    href="#capabilities"
                    className="hover:text-[var(--text-primary)] inline-flex items-center gap-2"
                  >
                    <Globe className="w-3.5 h-3.5 text-[#6366F1]" aria-hidden="true" />
                    <span>Custom React &amp; Next.js Web</span>
                  </a>
                </li>
                <li>
                  <a
                    href="#capabilities"
                    className="hover:text-[var(--text-primary)] inline-flex items-center gap-2"
                  >
                    <Cpu className="w-3.5 h-3.5 text-[#8B5CF6]" aria-hidden="true" />
                    <span>AI &amp; WhatsApp CRM Systems</span>
                  </a>
                </li>
                <li>
                  <a
                    href="#capabilities"
                    className="hover:text-[var(--text-primary)] inline-flex items-center gap-2"
                  >
                    <Zap className="w-3.5 h-3.5 text-[#10B981]" aria-hidden="true" />
                    <span>Meta &amp; Google Ads Funnels</span>
                  </a>
                </li>
                <li>
                  <a
                    href="#capabilities"
                    className="hover:text-[var(--text-primary)] inline-flex items-center gap-2"
                  >
                    <Cloud className="w-3.5 h-3.5 text-[#06B6D4]" aria-hidden="true" />
                    <span>Technical SEO &amp; AEO Search</span>
                  </a>
                </li>
              </ul>
            </div>

            {/* Col 4 (3 Cols): Official Desk & Global Operations */}
            <div className="lg:col-span-3 space-y-3.5">
              <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-[var(--text-muted)]">
                OFFICIAL DESK
              </h4>
              <div className="space-y-3 text-xs sm:text-sm text-[var(--text-secondary)]">
                <div className="flex items-start gap-2.5">
                  <MapPin
                    className="w-4 h-4 text-[var(--text-primary)] shrink-0 mt-0.5"
                    aria-hidden="true"
                  />
                  <span>Madhya Pradesh, India (Serving Startups &amp; Businesses Globally)</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <Mail
                    className="w-4 h-4 text-[var(--text-primary)] shrink-0 mt-0.5"
                    aria-hidden="true"
                  />
                  <a
                    href={`mailto:${SKYLINE_EMAIL}`}
                    className="hover:text-[var(--text-primary)] font-semibold break-all"
                  >
                    {SKYLINE_EMAIL}
                  </a>
                </div>
                <div className="flex items-start gap-2.5">
                  <Phone
                    className="w-4 h-4 text-[var(--text-primary)] shrink-0 mt-0.5"
                    aria-hidden="true"
                  />
                  <div className="font-mono font-semibold text-[var(--text-primary)] space-x-1.5 tabular-nums">
                    <a href="tel:+918643002478" className="hover:underline">
                      +91 8643002478
                    </a>
                    <span className="text-[var(--text-muted)]">•</span>
                    <a href="tel:+918959144686" className="hover:underline">
                      {SKYLINE_SECONDARY_PHONE}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Copyright Bar + Back to Top */}
          <div className="pt-6 border-t border-[var(--border-metallic)] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[var(--text-muted)]">
            <p>© {new Date().getFullYear()} SkyLine Technologies. All rights reserved.</p>

            <div className="flex items-center gap-6 font-mono text-[11px]">
              <a href="#faq" className="hover:text-[var(--text-primary)]">
                Privacy Policy
              </a>
              <a href="#faq" className="hover:text-[var(--text-primary)]">
                Terms of Service
              </a>
              <a href="#system-simulator" className="hover:text-[var(--text-primary)] font-bold">
                60s Audit
              </a>
            </div>

            <button
              type="button"
              onClick={scrollToTop}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full platinum-card text-[var(--text-primary)] font-display font-bold text-xs cursor-pointer"
            >
              <span>Back to top</span>
              <ArrowUp className="w-3.5 h-3.5" aria-hidden="true" />
            </button>
          </div>

          {/* FR-ANIM-005: Monumental SKYLINE Wordmark with Animated ♾️ Infinity-Loop (Lemniscate) Paper-Plane Rocket */}
          <div
            aria-hidden="true"
            className="pt-4 select-none relative text-center overflow-hidden"
          >
            {/* Background Monumental SKYLINE Typography */}
            <div className="font-display font-extrabold text-[4.2rem] sm:text-[8rem] md:text-[10.5rem] lg:text-[13.5rem] leading-[0.84] tracking-tighter text-[var(--bg-subdued)] relative z-0">
              SKYLINE
            </div>

            {/* Full-Bleed Figure-Eight Infinity Loop (♾️ Lemniscate) SVG Superimposed Across SKYLINE */}
            <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
              <svg
                viewBox="0 0 1200 260"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full max-w-[1200px] h-full overflow-visible"
              >
                <defs>
                  <linearGradient
                    id="skylineInfinityGradient"
                    x1="80"
                    y1="20"
                    x2="1120"
                    y2="240"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop offset="0%" stopColor="#6366F1" />
                    <stop offset="35%" stopColor="#06B6D4" />
                    <stop offset="70%" stopColor="#10B981" />
                    <stop offset="100%" stopColor="#F59E0B" />
                  </linearGradient>
                </defs>

                {/* Subtle Reference Lemniscate Track */}
                <path
                  id="skylineInfinityPath"
                  d="M 600,130 C 780,20 1120,20 1120,130 C 1120,240 780,240 600,130 C 420,20 80,20 80,130 C 80,240 420,240 600,130 Z"
                  stroke="url(#skylineInfinityGradient)"
                  strokeOpacity="0.22"
                  strokeWidth="2"
                  strokeDasharray="6 10"
                  fill="none"
                />

                {/* Animated Glowing Dashed Trail Along the Infinity Figure-Eight */}
                <path
                  d="M 600,130 C 780,20 1120,20 1120,130 C 1120,240 780,240 600,130 C 420,20 80,20 80,130 C 80,240 420,240 600,130 Z"
                  stroke="url(#skylineInfinityGradient)"
                  strokeWidth="3.2"
                  strokeDasharray="8 10"
                  strokeLinecap="round"
                  fill="none"
                  className="animate-infinity-trail"
                />

                {/* Center Crossover Spark Node */}
                <circle cx="600" cy="130" r="5" fill="#06B6D4" fillOpacity="0.85" />
                <circle cx="240" cy="130" r="4" fill="#6366F1" fillOpacity="0.7" />
                <circle cx="960" cy="130" r="4" fill="#10B981" fillOpacity="0.7" />

                {/* Self-Orienting Paper-Plane Rocket with Flickering Emerald/Cyan Thruster Tail */}
                <g>
                  {/* Thruster Flame Wake */}
                  <polygon
                    points="-14,0 -28,-5 -24,0 -28,5"
                    fill="#06B6D4"
                    opacity="0.85"
                  />
                  <polygon
                    points="-13,0 -22,-3 -19,0 -22,3"
                    fill="#10B981"
                  />
                  {/* Aerodynamic Paper-Plane Rocket Body */}
                  <path
                    d="M 18,0 L -14,-10 L -8,-2 L -14,0 L -8,2 L -14,10 Z"
                    fill="var(--text-primary)"
                  />
                  <path
                    d="M 18,0 L -8,0"
                    stroke="#6366F1"
                    strokeWidth="1.8"
                  />
                  <circle cx="6" cy="0" r="2" fill="#06B6D4" />

                  <animateMotion
                    dur="9s"
                    repeatCount="indefinite"
                    rotate="auto"
                    path="M 600,130 C 780,20 1120,20 1120,130 C 1120,240 780,240 600,130 C 420,20 80,20 80,130 C 80,240 420,240 600,130 Z"
                  />
                </g>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

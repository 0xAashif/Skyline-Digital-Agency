import React, { useState, useEffect, useRef } from 'react';
import {
  ArrowUpRight,
  CheckCircle2,
  MapPin,
  Copy,
  Check,
  Phone,
  ShieldCheck,
  Sparkles,
  Calendar,
  Clock,
} from 'lucide-react';
import {
  SKYLINE_WHATSAPP_NUMBER,
  SKYLINE_EMAIL,
  SKYLINE_LOCATION,
} from '../data/agencyData';
import {
  SkyLineLogo,
  WhatsAppBrandBadge,
  GmailBrandIcon,
  SocialIconBar,
} from './BrandIcons';

export interface PublicLeadSubmissionPayload {
  nameOrCompany: string;
  contact: string;
  contactType?: 'whatsapp' | 'email';
  inquiryType: 'inquiry' | 'meeting';
  budget?: string;
  meetingDate?: string;
  meetingSlot?: string;
  selectedPillars: string[];
  projectScope: string;
  source?: string;
}

interface ContactDispatchFooterProps {
  prefilledScope: string;
  prefilledPillars: string[];
  onSubmitLead?: (payload: PublicLeadSubmissionPayload) => Promise<void>;
  onOpenAdmin?: () => void;
}

const PILLAR_CHOICES = [
  'Website / Web App / SaaS',
  'Local Business Growth (Google Maps & Reviews)',
  'WhatsApp Bot & AI Automation',
  'Meta & Google Performance Ads',
  'Technical SEO & Search Ranking',
  'E-Commerce & Digital Catalog',
];

const BUDGET_OPTIONS = [
  '₹25,000 – ₹60,000 (Local Business / Starter)',
  '₹60,000 – ₹1,50,000 (Growth Website + Automation)',
  '₹1,50,000 – ₹3,50,000 (Full-Stack SaaS / Ad Engine)',
  '₹3,50,000+ (Enterprise / Custom Architecture)',
];

const MEETING_SLOTS = [
  '11:00 AM - 11:30 AM IST',
  '02:00 PM - 02:30 PM IST',
  '04:30 PM - 05:00 PM IST',
  '07:00 PM - 07:30 PM IST',
];

/**
 * Unpredictable Autonomous Flight Trajectory Engine for the Footer Paper-Plane Rocket.
 * Continuously generates randomized smooth cubic Bezier splines across the entire width and height
 * of the monumental SKYLINE footer canvas, dynamically orienting the rocket's nose angle
 * (`Math.atan2(vy, vx)`) and drawing a 3.5-second fading glowing dotted contrail wake.
 */
const AutonomousRocketCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 1200);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 260);

    const handleResize = () => {
      if (!canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };
    window.addEventListener('resize', handleResize);

    // Cubic Bezier helper
    const cubicPoint = (
      t: number,
      p0: number,
      p1: number,
      p2: number,
      p3: number
    ) => {
      const u = 1 - t;
      return (
        u * u * u * p0 +
        3 * u * u * t * p1 +
        3 * u * t * t * p2 +
        t * t * t * p3
      );
    };

    const cubicTangent = (
      t: number,
      p0: number,
      p1: number,
      p2: number,
      p3: number
    ) => {
      const u = 1 - t;
      return (
        3 * u * u * (p1 - p0) +
        6 * u * t * (p2 - p1) +
        3 * t * t * (p3 - p2)
      );
    };

    const randomTarget = () => ({
      x: width * (0.08 + Math.random() * 0.84),
      y: height * (0.14 + Math.random() * 0.72),
    });

    let p0 = { x: width * 0.15, y: height * 0.65 };
    let v0 = { x: 140, y: -80 };
    let p3 = randomTarget();
    let v3 = {
      x: (Math.random() - 0.5) * width * 0.65,
      y: (Math.random() - 0.5) * height * 1.1,
    };
    let p1 = { x: p0.x + v0.x, y: p0.y + v0.y };
    let p2 = { x: p3.x - v3.x * 0.4, y: p3.y - v3.y * 0.4 };

    let segmentStartTime = performance.now();
    let segmentDuration = 3400 + Math.random() * 1800;

    interface TrailPoint {
      x: number;
      y: number;
      time: number;
    }
    const trail: TrailPoint[] = [];
    const TRAIL_LIFETIME_MS = 3500;

    const spawnNextSegment = (now: number) => {
      p0 = { ...p3 };
      // Preserve velocity continuity across spline joints
      const endVx = 3 * (p3.x - p2.x);
      const endVy = 3 * (p3.y - p2.y);
      const speedScale = 0.35;
      p1 = {
        x: Math.max(40, Math.min(width - 40, p0.x + endVx * speedScale)),
        y: Math.max(25, Math.min(height - 25, p0.y + endVy * speedScale)),
      };

      // Pick a new unpredictable destination across the canvas
      let next = randomTarget();
      let attempts = 0;
      while (
        Math.hypot(next.x - p0.x, next.y - p0.y) < width * 0.24 &&
        attempts < 6
      ) {
        next = randomTarget();
        attempts++;
      }
      p3 = next;

      // Randomize arrival curvature for sweeping loops and weaves
      p2 = {
        x: p3.x + (Math.random() - 0.5) * width * 0.45,
        y: p3.y + (Math.random() - 0.5) * height * 0.85,
      };

      segmentStartTime = now;
      segmentDuration = 3200 + Math.random() * 2100;
    };

    const render = (now: number) => {
      let t = (now - segmentStartTime) / segmentDuration;
      if (t >= 1) {
        spawnNextSegment(now);
        t = 0;
      }

      const x = cubicPoint(t, p0.x, p1.x, p2.x, p3.x);
      const y = cubicPoint(t, p0.y, p1.y, p2.y, p3.y);
      const vx = cubicTangent(t, p0.x, p1.x, p2.x, p3.x);
      const vy = cubicTangent(t, p0.y, p1.y, p2.y, p3.y);
      const angle = Math.atan2(vy, vx);

      // Record contrail wake behind tail
      const tailX = x - Math.cos(angle) * 14;
      const tailY = y - Math.sin(angle) * 14;
      if (
        trail.length === 0 ||
        Math.hypot(
          tailX - trail[trail.length - 1].x,
          tailY - trail[trail.length - 1].y
        ) > 5
      ) {
        trail.push({ x: tailX, y: tailY, time: now });
      }

      // Prune contrail older than 3.5 seconds
      while (trail.length > 0 && now - trail[0].time > TRAIL_LIFETIME_MS) {
        trail.shift();
      }

      ctx.clearRect(0, 0, width, height);

      const isDark = document.documentElement.classList.contains('dark');
      const strokeBase = isDark ? '244, 244, 246' : '24, 24, 27';

      // Draw glowing dotted contrail with smooth 3.5-second alpha fade
      if (trail.length > 2) {
        ctx.save();
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.setLineDash([4, 6]);

        for (let i = 1; i < trail.length; i++) {
          const prev = trail[i - 1];
          const curr = trail[i];
          const age = now - curr.time;
          const lifeRatio = Math.max(0, 1 - age / TRAIL_LIFETIME_MS);
          ctx.beginPath();
          ctx.moveTo(prev.x, prev.y);
          ctx.lineTo(curr.x, curr.y);
          ctx.strokeStyle = `rgba(${strokeBase}, ${lifeRatio * 0.65})`;
          ctx.lineWidth = 1.2 + lifeRatio * 1.4;
          ctx.stroke();
        }
        ctx.restore();
      }

      // Draw Paper-Plane Rocket oriented along instantaneous velocity vector
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(angle);

      // Subtle thruster glow at tail
      const grad = ctx.createRadialGradient(-14, 0, 1, -14, 0, 12);
      grad.addColorStop(
        0,
        isDark ? 'rgba(255,255,255,0.65)' : 'rgba(24,24,27,0.45)'
      );
      grad.addColorStop(1, 'rgba(113,113,122,0)');
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(-14, 0, 12, 0, Math.PI * 2);
      ctx.fill();

      // Main Upper Wing
      ctx.beginPath();
      ctx.moveTo(16, 0);
      ctx.lineTo(-12, -10);
      ctx.lineTo(-6, -1);
      ctx.closePath();
      ctx.fillStyle = isDark ? '#F4F4F6' : '#18181B';
      ctx.fill();

      // Center Fold Shadow
      ctx.beginPath();
      ctx.moveTo(16, 0);
      ctx.lineTo(-6, -1);
      ctx.lineTo(-9, 5);
      ctx.lineTo(-4, 2);
      ctx.closePath();
      ctx.fillStyle = isDark ? '#71717A' : '#52525B';
      ctx.fill();

      // Lower Wing
      ctx.beginPath();
      ctx.moveTo(16, 0);
      ctx.lineTo(-4, 2);
      ctx.lineTo(-11, 10);
      ctx.closePath();
      ctx.fillStyle = isDark ? '#D4D4D8' : '#3F3F46';
      ctx.fill();

      ctx.restore();

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full block pointer-events-none"
    />
  );
};

export const ContactDispatchFooter: React.FC<ContactDispatchFooterProps> = ({
  prefilledScope,
  prefilledPillars,
  onSubmitLead,
  onOpenAdmin,
}) => {
  const [nameOrCompany, setNameOrCompany] = useState('');
  const [contactValue, setContactValue] = useState('');
  const [contactChannel, setContactChannel] = useState<'WhatsApp' | 'Email'>('WhatsApp');
  const [inquiryMode, setInquiryMode] = useState<'inquiry' | 'meeting'>('inquiry');
  const [meetingDate, setMeetingDate] = useState('');
  const [meetingSlot, setMeetingSlot] = useState(MEETING_SLOTS[0]);
  const [selectedPillars, setSelectedPillars] = useState<string[]>([
    'Website / Web App / SaaS',
    'WhatsApp Bot & AI Automation',
  ]);
  const [budgetRange, setBudgetRange] = useState(BUDGET_OPTIONS[1]);
  const [projectBrief, setProjectBrief] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submittedSuccess, setSubmittedSuccess] = useState(false);

  useEffect(() => {
    if (prefilledScope) {
      setProjectBrief(prefilledScope);
    }
  }, [prefilledScope]);

  useEffect(() => {
    if (prefilledPillars && prefilledPillars.length > 0) {
      setSelectedPillars(prefilledPillars);
    }
  }, [prefilledPillars]);

  const togglePillar = (pillar: string) => {
    setSelectedPillars((prev) =>
      prev.includes(pillar)
        ? prev.length > 1
          ? prev.filter((p) => p !== pillar)
          : prev
        : [...prev, pillar]
    );
  };

  const handleCopyEmail = () => {
    navigator.clipboard?.writeText(SKYLINE_EMAIL);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleDispatch = async (mode: 'whatsapp' | 'email' | 'portal') => {
    const cleanName = nameOrCompany.trim();
    const cleanContact = contactValue.trim();
    const cleanBrief = projectBrief.trim();

    if (cleanName.length < 2) {
      setErrorMessage('Please enter your name or business name (at least 2 characters).');
      return;
    }
    if (cleanContact.length < 5) {
      setErrorMessage(`Please enter a valid ${contactChannel} contact so we can reach you.`);
      return;
    }
    if (selectedPillars.length === 0) {
      setErrorMessage('Please select at least one service you need.');
      return;
    }
    if (cleanBrief.length < 8) {
      setErrorMessage('Please share a brief description of your project goals (at least 8 characters).');
      return;
    }

    setErrorMessage(null);

    if (onSubmitLead) {
      setSubmitting(true);
      try {
        await onSubmitLead({
          nameOrCompany: cleanName,
          contact: cleanContact,
          contactType: contactChannel === 'WhatsApp' ? 'whatsapp' : 'email',
          inquiryType: inquiryMode,
          budget: budgetRange,
          meetingDate: inquiryMode === 'meeting' ? meetingDate : undefined,
          meetingSlot: inquiryMode === 'meeting' ? meetingSlot : undefined,
          selectedPillars,
          projectScope:
            inquiryMode === 'meeting' && meetingDate
              ? `[Strategy Meeting: ${meetingDate} at ${meetingSlot}] ${cleanBrief}`
              : cleanBrief,
          source: 'Website Dispatch Form',
        });
        setSubmittedSuccess(true);
      } catch {
        // Still allow WhatsApp or Email fallback
      } finally {
        setSubmitting(false);
      }
    }

    const effectiveScope =
      inquiryMode === 'meeting' && meetingDate
        ? `[Meeting Requested: ${meetingDate} • ${meetingSlot}] ${cleanBrief}`
        : cleanBrief;

    const messageText = [
      'Hello SkyLine Digital Team,',
      'I would like to request a custom project proposal & roadmap.',
      '',
      `• Name / Business: ${cleanName}`,
      `• ${contactChannel}: ${cleanContact}`,
      `• Services Needed: ${selectedPillars.join(', ')}`,
      `• Budget Range: ${budgetRange}`,
      `• Project Brief: ${effectiveScope}`,
    ].join('\n');

    if (mode === 'whatsapp') {
      const url = `https://wa.me/${SKYLINE_WHATSAPP_NUMBER}?text=${encodeURIComponent(messageText)}`;
      window.open(url, '_blank', 'noopener,noreferrer');
    } else if (mode === 'email') {
      const subject = `Project Proposal Request — ${cleanName}`;
      const mailUrl = `mailto:${SKYLINE_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(messageText)}`;
      window.location.href = mailUrl;
    }
  };

  return (
    <footer
      id="contact"
      className="pt-20 sm:pt-28 pb-24 px-4 sm:px-8 lg:px-12 bg-[var(--bg-canvas)] relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        {/* =================================================================
            1. CONTACT & PROPOSAL DISPATCH SECTION
           ================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 pb-20 border-b border-[var(--border-hairline)]">
          {/* Left Column: Agency Info & Direct Channels (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full badge-sage-status">
              <span className="w-2 h-2 rounded-full bg-[#C5A880]" />
              <span className="font-mono-tech text-[10px] uppercase tracking-widest font-semibold">
                START YOUR PROJECT TODAY
              </span>
            </div>

            <h2 className="font-display text-3xl sm:text-5xl font-extrabold tracking-tight text-[var(--text-primary)] leading-[1.08]">
              Let's Build & Scale{' '}
              <span className="font-serif-editorial italic font-semibold">
                Your Business.
              </span>
            </h2>

            <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
              Fill out the quick brief to get a custom roadmap and fixed-price quote—or jump straight onto WhatsApp to chat with our team in under 2 minutes.
            </p>

            {/* Contact Cards */}
            <div className="space-y-3 pt-2">
              <div className="p-4 rounded-2xl surface-card flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl surface-elevated text-[var(--text-primary)]">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-mono-tech text-[10px] uppercase tracking-wider text-[var(--text-muted)]">
                      WHATSAPP & PHONE DESK
                    </div>
                    <div className="font-mono-tech text-xs sm:text-sm font-semibold text-[var(--text-primary)]">
                      +91 81096 97311
                    </div>
                  </div>
                </div>
                <a
                  href={`https://wa.me/${SKYLINE_WHATSAPP_NUMBER}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-2 rounded-xl btn-whatsapp-official text-xs font-semibold flex items-center gap-1.5"
                >
                  <WhatsAppBrandBadge size="sm" className="border border-white/30" />
                  <span>Chat</span>
                </a>
              </div>

              <div className="p-4 rounded-2xl surface-card flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <GmailBrandIcon size="md" />
                  <div>
                    <div className="font-mono-tech text-[10px] uppercase tracking-wider text-[var(--text-muted)]">
                      OFFICIAL EMAIL DESK
                    </div>
                    <div className="font-mono-tech text-xs sm:text-sm font-semibold text-[var(--text-primary)]">
                      {SKYLINE_EMAIL}
                    </div>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="px-3 py-1.5 rounded-lg btn-platinum-secondary text-xs font-mono-tech flex items-center gap-1.5 cursor-pointer"
                >
                  {copiedEmail ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-[var(--text-primary)]" />
                      <span>Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>

              {/* Complete 5-App Social Bar in Contact Section */}
              <div className="p-4 rounded-2xl surface-card flex flex-wrap items-center justify-between gap-3">
                <div>
                  <div className="font-mono-tech text-[10px] uppercase tracking-wider text-[var(--text-muted)]">
                    CONNECT WITH SKYLINE
                  </div>
                  <div className="text-xs font-semibold text-[var(--text-primary)] mt-0.5">
                    Official Social & Messaging Channels
                  </div>
                </div>
                <SocialIconBar size="sm" />
              </div>

              <div className="p-4 rounded-2xl surface-card flex items-center gap-3">
                <div className="p-2.5 rounded-xl surface-elevated text-[var(--text-primary)]">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-mono-tech text-[10px] uppercase tracking-wider text-[var(--text-muted)]">
                    HEADQUARTERS & REACH
                  </div>
                  <div className="text-xs sm:text-sm font-medium text-[var(--text-primary)]">
                    {SKYLINE_LOCATION}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Proposal & Meeting Booking Form (7 Cols) */}
          <div className="lg:col-span-7 surface-card rounded-3xl p-6 sm:p-9">
            <div className="flex flex-wrap items-center justify-between gap-3 pb-5 mb-6 border-b border-[var(--border-hairline)]">
              <div>
                <h3 className="font-display text-xl sm:text-2xl font-bold text-[var(--text-primary)]">
                  Request Your Custom Proposal
                </h3>
                <p className="text-xs text-[var(--text-secondary)] mt-0.5">
                  Saves directly to our CRM + optional instant WhatsApp dispatch.
                </p>
              </div>

              {/* Mode Switcher: Project Proposal vs Book Strategy Call */}
              <div className="inline-flex rounded-xl p-1 surface-elevated">
                <button
                  type="button"
                  onClick={() => setInquiryMode('inquiry')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-all ${
                    inquiryMode === 'inquiry'
                      ? 'btn-platinum-primary'
                      : 'text-[var(--text-secondary)]'
                  }`}
                >
                  Project Quote
                </button>
                <button
                  type="button"
                  onClick={() => setInquiryMode('meeting')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-all flex items-center gap-1.5 ${
                    inquiryMode === 'meeting'
                      ? 'btn-platinum-primary'
                      : 'text-[var(--text-secondary)]'
                  }`}
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Book Strategy Call</span>
                </button>
              </div>
            </div>

            <div className="space-y-5">
              {/* Name & Contact */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-mono-tech text-[11px] uppercase tracking-wider text-[var(--text-secondary)] mb-2">
                    Your Name & Business Name *
                  </label>
                  <input
                    type="text"
                    value={nameOrCompany}
                    onChange={(e) => {
                      setNameOrCompany(e.target.value);
                      setSubmittedSuccess(false);
                    }}
                    placeholder="e.g. Rahul Verma / Apex Clinic"
                    className="w-full px-4 py-3 rounded-xl surface-elevated text-xs sm:text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--platinum-primary)]"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="font-mono-tech text-[11px] uppercase tracking-wider text-[var(--text-secondary)]">
                      Your {contactChannel} *
                    </label>
                    <div className="flex items-center gap-1 text-[10px] font-mono-tech">
                      {(['WhatsApp', 'Email'] as const).map((ch) => (
                        <button
                          key={ch}
                          type="button"
                          onClick={() => setContactChannel(ch)}
                          className={`px-2 py-0.5 rounded cursor-pointer ${
                            contactChannel === ch
                              ? 'btn-platinum-primary'
                              : 'text-[var(--text-muted)]'
                          }`}
                        >
                          {ch}
                        </button>
                      ))}
                    </div>
                  </div>
                  <input
                    type="text"
                    value={contactValue}
                    onChange={(e) => {
                      setContactValue(e.target.value);
                      setSubmittedSuccess(false);
                    }}
                    placeholder={
                      contactChannel === 'WhatsApp'
                        ? '+91 98765 43210'
                        : 'founder@company.com'
                    }
                    className="w-full px-4 py-3 rounded-xl surface-elevated text-xs sm:text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--platinum-primary)]"
                  />
                </div>
              </div>

              {/* Optional Strategy Call Date & Time Slot */}
              {inquiryMode === 'meeting' && (
                <div className="p-4 rounded-2xl surface-elevated grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-mono-tech text-[10px] uppercase tracking-wider text-[var(--text-primary)] font-semibold mb-1.5 flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>Preferred Call Date</span>
                    </label>
                    <input
                      type="date"
                      value={meetingDate}
                      onChange={(e) => setMeetingDate(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl surface-card text-xs text-[var(--text-primary)] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block font-mono-tech text-[10px] uppercase tracking-wider text-[var(--text-primary)] font-semibold mb-1.5 flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5" />
                      <span>Preferred Time Slot</span>
                    </label>
                    <select
                      value={meetingSlot}
                      onChange={(e) => setMeetingSlot(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl surface-card text-xs text-[var(--text-primary)] focus:outline-none"
                    >
                      {MEETING_SLOTS.map((slot) => (
                        <option key={slot} value={slot}>
                          {slot}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              )}

              {/* Services Needed */}
              <div>
                <label className="block font-mono-tech text-[11px] uppercase tracking-wider text-[var(--text-secondary)] mb-2">
                  Services You Need *
                </label>
                <div className="flex flex-wrap gap-2">
                  {PILLAR_CHOICES.map((pillar) => {
                    const active = selectedPillars.includes(pillar);
                    return (
                      <button
                        key={pillar}
                        type="button"
                        onClick={() => togglePillar(pillar)}
                        className={`px-3.5 py-2 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                          active
                            ? 'btn-platinum-primary'
                            : 'surface-elevated text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                        }`}
                      >
                        {pillar}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Budget Tier */}
              <div>
                <label className="block font-mono-tech text-[11px] uppercase tracking-wider text-[var(--text-secondary)] mb-2">
                  Estimated Budget Range
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {BUDGET_OPTIONS.map((b) => {
                    const active = budgetRange === b;
                    return (
                      <button
                        key={b}
                        type="button"
                        onClick={() => setBudgetRange(b)}
                        className={`px-3.5 py-2.5 rounded-xl text-left font-mono-tech text-xs transition-all cursor-pointer ${
                          active
                            ? 'btn-platinum-primary'
                            : 'surface-elevated text-[var(--text-secondary)]'
                        }`}
                      >
                        {b}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Project Brief */}
              <div>
                <label className="block font-mono-tech text-[11px] uppercase tracking-wider text-[var(--text-secondary)] mb-2">
                  Project Goals or Current Website URL *
                </label>
                <textarea
                  rows={3}
                  value={projectBrief}
                  onChange={(e) => {
                    setProjectBrief(e.target.value);
                    setSubmittedSuccess(false);
                  }}
                  placeholder="Tell us about your business, what you want to build or scale, and your target launch timeline..."
                  className="w-full px-4 py-3 rounded-xl surface-elevated text-xs sm:text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--platinum-primary)] resize-none"
                />
              </div>

              {errorMessage && (
                <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-500 text-xs font-medium">
                  {errorMessage}
                </div>
              )}

              {submittedSuccess && (
                <div className="p-3.5 rounded-xl badge-platinum text-xs font-medium flex items-center justify-between">
                  <span>
                    ✓ Your project brief has been saved to the SkyLine CRM! Our lead architect will reach out shortly.
                  </span>
                </div>
              )}

              {/* Submit Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                <button
                  type="button"
                  disabled={submitting}
                  onClick={() => handleDispatch('portal')}
                  className="w-full py-3.5 px-5 rounded-full btn-platinum-primary font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  <span>{submitting ? 'Saving...' : 'Submit Brief to CRM'}</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  disabled={submitting}
                  onClick={() => handleDispatch('whatsapp')}
                  className="w-full py-3.5 px-5 rounded-full btn-whatsapp-official font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 cursor-pointer"
                >
                  <WhatsAppBrandBadge size="sm" className="border border-white/30" />
                  <span>Send on WhatsApp</span>
                </button>

                <button
                  type="button"
                  disabled={submitting}
                  onClick={() => handleDispatch('email')}
                  className="w-full py-3.5 px-5 rounded-full btn-platinum-secondary font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 cursor-pointer"
                >
                  <GmailBrandIcon size="sm" />
                  <span>Send via Email</span>
                </button>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] text-[var(--text-muted)] font-mono-tech pt-1">
                <span className="inline-flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[var(--text-primary)]" />
                  <span>100% Free Initial Consultation</span>
                </span>
                <span>No spam. Direct conversation with our engineering team.</span>
              </div>
            </div>
          </div>
        </div>

        {/* =================================================================
            2. MONUMENTAL SKYLINE WORDMARK + UNPREDICTABLE AUTONOMOUS ROCKET CANVAS
           ================================================================= */}
        <div className="py-12 sm:py-16 relative select-none overflow-hidden border-b border-[var(--border-hairline)]">
          {/* Monumental Background Typography in Metallic Silver */}
          <div className="text-center">
            <div className="font-display font-extrabold text-[17vw] sm:text-[15.5vw] leading-[0.84] tracking-[-0.04em] bg-gradient-to-b from-[#E4E4E7] via-[#A1A1AA] to-[#71717A] bg-clip-text text-transparent opacity-65 dark:opacity-55">
              SKYLINE
            </div>
          </div>

          {/* Unpredictable Autonomous Paper-Plane Rocket + 3.5s Fading Contrail Canvas */}
          <div
            className="absolute inset-0 pointer-events-none flex items-center justify-center"
            aria-hidden="true"
          >
            <AutonomousRocketCanvas />
          </div>

          {/* Center Floating Tagline Pill */}
          <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-4 mt-4 px-2">
            <SkyLineLogo size="md" />

            <div className="flex flex-wrap items-center gap-3">
              <SocialIconBar size="sm" />

              <a
                href="#referral"
                onClick={(e) => {
                  e.preventDefault();
                  document
                    .getElementById('referral')
                    ?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full badge-platinum text-xs font-semibold"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#C5A880]" />
                <span>Refer & Earn 15%</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Copyright & Legal */}
        <div className="pt-8 sm:pl-52 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[var(--text-muted)] font-mono-tech">
          <div>
            © {new Date().getFullYear()} SKYLINE DIGITAL AGENCY. ALL RIGHTS RESERVED.
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <span>MADHYA PRADESH, INDIA</span>
            <span>•</span>
            <a
              href={`mailto:${SKYLINE_EMAIL}`}
              className="hover:text-[var(--text-primary)] transition-colors"
            >
              {SKYLINE_EMAIL}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

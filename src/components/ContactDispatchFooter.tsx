import React, { useState, useEffect, useRef } from 'react';
import {
  ArrowUp,
  ArrowUpRight,
  Briefcase,
  CheckCircle2,
  Cloud,
  Copy,
  Check,
  Cpu,
  Globe,
  Home,
  Info,
  Layers,
  LayoutGrid,
  MapPin,
  Percent,
  Phone,
  PhoneCall,
  Star,
  Users,
  Calendar,
  Clock,
} from 'lucide-react';
import {
  SKYLINE_SACHIN_WHATSAPP_NUMBER,
  SKYLINE_AASHIF_WHATSAPP_NUMBER,
  SKYLINE_CALL_NUMBER,
  SKYLINE_PRIMARY_PHONE_DISPLAY,
  SKYLINE_SACHIN_PHONE_DISPLAY,
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
  showContactSection?: boolean;
  onNavigate?: (pageId: string) => void;
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
 * Rendered inside its own dedicated flight corridor so it never overlaps with Back-to-Top or legal links.
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
    let height = (canvas.height = canvas.parentElement?.clientHeight || 84);

    const handleResize = () => {
      if (!canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };
    window.addEventListener('resize', handleResize);

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
      x: width * (0.06 + Math.random() * 0.78),
      y: height * (0.18 + Math.random() * 0.64),
    });

    let p0 = { x: width * 0.12, y: height * 0.55 };
    let v0 = { x: 140, y: -30 };
    let p3 = randomTarget();
    let v3 = {
      x: (Math.random() - 0.5) * width * 0.55,
      y: (Math.random() - 0.5) * height * 0.9,
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
      const endVx = 3 * (p3.x - p2.x);
      const endVy = 3 * (p3.y - p2.y);
      const speedScale = 0.35;
      p1 = {
        x: Math.max(36, Math.min(width - 120, p0.x + endVx * speedScale)),
        y: Math.max(14, Math.min(height - 14, p0.y + endVy * speedScale)),
      };

      let next = randomTarget();
      let attempts = 0;
      while (
        Math.hypot(next.x - p0.x, next.y - p0.y) < width * 0.22 &&
        attempts < 6
      ) {
        next = randomTarget();
        attempts++;
      }
      p3 = next;

      p2 = {
        x: p3.x + (Math.random() - 0.5) * width * 0.4,
        y: Math.max(12, Math.min(height - 12, p3.y + (Math.random() - 0.5) * height * 0.8)),
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

      while (trail.length > 0 && now - trail[0].time > TRAIL_LIFETIME_MS) {
        trail.shift();
      }

      ctx.clearRect(0, 0, width, height);

      const isDark = document.documentElement.classList.contains('dark');
      const strokeBase = isDark ? '244, 244, 246' : '24, 24, 27';

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

      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(angle);

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

      ctx.beginPath();
      ctx.moveTo(16, 0);
      ctx.lineTo(-12, -10);
      ctx.lineTo(-6, -1);
      ctx.closePath();
      ctx.fillStyle = isDark ? '#F4F4F6' : '#18181B';
      ctx.fill();

      ctx.beginPath();
      ctx.moveTo(16, 0);
      ctx.lineTo(-6, -1);
      ctx.lineTo(-9, 5);
      ctx.lineTo(-4, 2);
      ctx.closePath();
      ctx.fillStyle = isDark ? '#71717A' : '#52525B';
      ctx.fill();

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
  showContactSection = true,
  onNavigate,
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
      'Hello SkyLine Digital Agency Team,',
      'I would like to request a custom project proposal & roadmap.',
      '',
      `• Name / Business: ${cleanName}`,
      `• ${contactChannel}: ${cleanContact}`,
      `• Services Needed: ${selectedPillars.join(', ')}`,
      `• Budget Range: ${budgetRange}`,
      `• Project Brief: ${effectiveScope}`,
    ].join('\n');

    if (mode === 'whatsapp') {
      const url = `https://wa.me/${SKYLINE_SACHIN_WHATSAPP_NUMBER}?text=${encodeURIComponent(messageText)}`;
      window.open(url, '_blank', 'noopener,noreferrer');
    } else if (mode === 'email') {
      const subject = `Project Proposal Request — ${cleanName}`;
      const mailUrl = `mailto:${SKYLINE_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(messageText)}`;
      window.location.href = mailUrl;
    }
  };

  const handleFooterNav = (e: React.MouseEvent<HTMLAnchorElement>, pageId: string) => {
    if (onNavigate) {
      e.preventDefault();
      onNavigate(pageId);
    }
  };

  return (
    <footer
      id="contact"
      className={`${
        showContactSection ? 'pt-16 sm:pt-24' : 'pt-8'
      } pb-16 px-4 sm:px-8 lg:px-12 bg-[var(--bg-canvas)] relative overflow-hidden`}
    >
      <div className="max-w-7xl mx-auto">
        {/* =================================================================
            1. CONTACT & PROPOSAL DISPATCH SECTION (CONTACT PAGE ONLY)
           ================================================================= */}
        {showContactSection && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 pb-20 border-b border-[var(--border-hairline)]">
            {/* Left Column: Agency Info & Direct Channels (5 Cols) */}
            <div className="lg:col-span-5 space-y-6">
              {/* Zero-Pill Discipline Kicker */}
              <div className="inline-flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#10B981]" />
                <span className="font-mono-tech text-[11px] uppercase tracking-widest font-bold text-[var(--text-primary)]">
                  START YOUR PROJECT TODAY
                </span>
              </div>

              <h2 className="font-display text-3xl sm:text-5xl font-extrabold tracking-tight text-[var(--text-primary)] leading-[1.08]">
                Let's Build & Scale{' '}
                <span className="font-serif-editorial italic font-semibold text-platinum-gradient">
                  Your Business.
                </span>
              </h2>

              <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                Fill out the quick brief to get a custom roadmap and fixed-price quote—or jump straight onto WhatsApp to chat with our founding architects in under 2 minutes.
              </p>

              {/* Contact Cards (Clean Numbers & Action Buttons Only) */}
              <div className="space-y-3 pt-2">
                {/* Co-Founder Aashif Khan Card */}
                <div className="p-4 rounded-2xl surface-card flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl surface-elevated flex items-center justify-center text-[var(--text-primary)]">
                      <PhoneCall className="w-4 h-4 text-[var(--text-primary)]" />
                    </div>
                    <div>
                      <div className="font-mono-tech text-[10px] uppercase tracking-wider text-[var(--text-muted)]">
                        AASHIF KHAN • CO-FOUNDER & LEAD ARCHITECT
                      </div>
                      <div className="font-display text-xs sm:text-sm font-bold text-[var(--text-primary)]">
                        {SKYLINE_PRIMARY_PHONE_DISPLAY}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <a
                      href={`tel:${SKYLINE_CALL_NUMBER}`}
                      className="px-3 py-2 rounded-xl btn-platinum-primary text-xs font-semibold flex items-center gap-1.5"
                    >
                      <PhoneCall className="w-3.5 h-3.5" />
                      <span>Call</span>
                    </a>
                    <a
                      href={`https://wa.me/${SKYLINE_AASHIF_WHATSAPP_NUMBER}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3.5 py-2 rounded-xl btn-whatsapp-official text-xs font-semibold flex items-center gap-1.5"
                    >
                      <WhatsAppBrandBadge size="sm" className="border border-white/30" />
                      <span>WhatsApp</span>
                    </a>
                  </div>
                </div>

                {/* Co-Founder Sachin Sahu Card (WhatsApp Only, Zero Call Button) */}
                <div className="p-4 rounded-2xl surface-card flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl surface-elevated flex items-center justify-center text-[var(--text-primary)]">
                      <Phone className="w-4 h-4 text-[var(--text-primary)]" />
                    </div>
                    <div>
                      <div className="font-mono-tech text-[10px] uppercase tracking-wider text-[var(--text-muted)]">
                        SACHIN SAHU • CO-FOUNDER & LEAD ARCHITECT
                      </div>
                      <div className="font-display text-xs sm:text-sm font-bold text-[var(--text-primary)]">
                        {SKYLINE_SACHIN_PHONE_DISPLAY}
                      </div>
                    </div>
                  </div>
                  <a
                    href={`https://wa.me/${SKYLINE_SACHIN_WHATSAPP_NUMBER}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3.5 py-2 rounded-xl btn-whatsapp-official text-xs font-semibold flex items-center gap-1.5"
                  >
                    <WhatsAppBrandBadge size="sm" className="border border-white/30" />
                    <span>WhatsApp</span>
                  </a>
                </div>

                {/* Official Email Desk with Full-Size 4-Color Gmail Icon */}
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

                {/* Official Social Channels (Zero Handle/Disclaimer Text) */}
                <div className="p-4 rounded-2xl surface-card flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <div className="font-mono-tech text-[10px] uppercase tracking-wider text-[var(--text-muted)]">
                      OFFICIAL SOCIAL CHANNELS
                    </div>
                    <div className="text-xs font-semibold text-[var(--text-primary)] mt-0.5">
                      Connect with SkyLine Digital Agency
                    </div>
                  </div>
                  <SocialIconBar size="sm" />
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
                          ? '+91 89591 44686'
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
        )}

        {/* =================================================================
            2. ARCHITECTURAL 4-COLUMN FOOTER + LEGAL BAR + MONUMENTAL SILVER WORDMARK
           ================================================================= */}
        <div className="pt-14 pb-10 border-b border-[var(--border-hairline)] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
          {/* Column 1 (4 Cols): Brand Lockup + Mission + 6 Original-Color Social Icons */}
          <div className="lg:col-span-4 space-y-5">
            <SkyLineLogo size="md" />

            <p className="font-sans-body text-[13px] text-[var(--text-secondary)] leading-relaxed max-w-sm">
              End-to-end software development & digital growth agency engineering high-performance web apps, mobile solutions, SaaS platforms, and AI automation for global startups & enterprises.
            </p>

            <div className="pt-1">
              <SocialIconBar size="md" />
            </div>
          </div>

          {/* Column 2 (2 Cols): QUICK LINKS */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="font-display text-[11px] font-bold uppercase tracking-[0.14em] text-[#71717A] dark:text-[#A1A1AA]">
              QUICK LINKS
            </h4>
            <ul className="space-y-2.5 text-[13px] font-medium text-[var(--text-primary)]">
              {[
                { label: 'Home', pageId: 'home', icon: <Home className="w-3.5 h-3.5 text-[#71717A]" /> },
                { label: 'Services', pageId: 'services', icon: <Layers className="w-3.5 h-3.5 text-[#71717A]" /> },
                { label: 'Our Projects', pageId: 'work', icon: <Briefcase className="w-3.5 h-3.5 text-[#71717A]" /> },
                { label: 'Who We Are', pageId: 'who-we-are', icon: <Users className="w-3.5 h-3.5 text-[#71717A]" /> },
                { label: 'How We Deliver', pageId: 'who-we-are', icon: <Info className="w-3.5 h-3.5 text-[#71717A]" /> },
                { label: 'Partner Offer', pageId: 'referral', icon: <Percent className="w-3.5 h-3.5 text-[#71717A]" /> },
                { label: 'Client Reviews', pageId: 'work', icon: <Star className="w-3.5 h-3.5 text-[#71717A]" /> },
              ].map((link) => (
                <li key={link.label}>
                  <a
                    href={`#${link.pageId}`}
                    onClick={(e) => handleFooterNav(e, link.pageId)}
                    className="inline-flex items-center gap-2.5 hover:text-[var(--text-secondary)] transition-colors"
                  >
                    {link.icon}
                    <span>{link.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 (3 Cols): CORE SOLUTIONS */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="font-display text-[11px] font-bold uppercase tracking-[0.14em] text-[#71717A] dark:text-[#A1A1AA]">
              CORE SOLUTIONS
            </h4>
            <ul className="space-y-2.5 text-[13px] font-medium text-[var(--text-primary)]">
              {[
                { label: 'Custom Web & Mobile Apps', pageId: 'services', icon: <Globe className="w-3.5 h-3.5 text-[#71717A]" /> },
                { label: 'SaaS & CRM Platforms', pageId: 'services', icon: <Layers className="w-3.5 h-3.5 text-[#71717A]" /> },
                { label: 'AI & Workflow Automation', pageId: 'services', icon: <Cpu className="w-3.5 h-3.5 text-[#71717A]" /> },
                { label: 'Cloud Deployment & DevOps', pageId: 'services', icon: <Cloud className="w-3.5 h-3.5 text-[#71717A]" /> },
                { label: '60s Price & Timeline Estimator', pageId: 'services', icon: <LayoutGrid className="w-3.5 h-3.5 text-[#71717A]" /> },
              ].map((sol) => (
                <li key={sol.label}>
                  <a
                    href={`#${sol.pageId}`}
                    onClick={(e) => handleFooterNav(e, sol.pageId)}
                    className="inline-flex items-center gap-2.5 hover:text-[var(--text-secondary)] transition-colors"
                  >
                    {sol.icon}
                    <span>{sol.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4 (3 Cols): GET IN TOUCH (Consistent Full-Size Badges for Location, Gmail & Phone) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="font-display text-[11px] font-bold uppercase tracking-[0.14em] text-[#71717A] dark:text-[#A1A1AA]">
              GET IN TOUCH
            </h4>
            <ul className="space-y-3 text-[13px] text-[var(--text-primary)]">
              <li className="flex items-center gap-3">
                <span className="w-9 h-9 rounded-xl surface-elevated inline-flex items-center justify-center shrink-0">
                  <MapPin className="w-4 h-4 text-[var(--text-primary)]" />
                </span>
                <span className="leading-snug">{SKYLINE_LOCATION}</span>
              </li>
              <li className="flex items-center gap-3">
                <GmailBrandIcon size="md" />
                <a
                  href={`mailto:${SKYLINE_EMAIL}`}
                  className="hover:underline font-medium break-all"
                >
                  {SKYLINE_EMAIL}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <span className="w-9 h-9 rounded-xl surface-elevated inline-flex items-center justify-center shrink-0">
                  <Phone className="w-4 h-4 text-[var(--text-primary)]" />
                </span>
                <div className="font-display font-bold text-[13px] text-[var(--text-primary)] flex flex-wrap items-center gap-1.5">
                  <a
                    href={`tel:${SKYLINE_CALL_NUMBER}`}
                    className="hover:underline"
                  >
                    {SKYLINE_PRIMARY_PHONE_DISPLAY}
                  </a>
                  <span className="text-[#71717A]">•</span>
                  <a
                    href={`https://wa.me/${SKYLINE_SACHIN_WHATSAPP_NUMBER}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline"
                  >
                    {SKYLINE_SACHIN_PHONE_DISPLAY}
                  </a>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Dedicated Paper-Plane Flight Corridor (Above Legal & Back-to-top Bar so ZERO Overlap Occurs) */}
        <div
          className="w-full h-16 sm:h-20 relative overflow-hidden border-b border-[var(--border-hairline)]/60 pr-16 sm:pr-24"
          aria-hidden="true"
        >
          <AutonomousRocketCanvas />
        </div>

        {/* Copyright, Legal Links & Back to Top Pill (Right-padded for Floating Stack Clearance) */}
        <div className="py-6 pr-16 sm:pr-24 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[var(--text-secondary)]">
          <div>
            © {new Date().getFullYear()} SkyLine Digital Agency. All rights reserved.
          </div>

          <div className="flex flex-wrap items-center gap-6">
            <a
              href="#referral"
              onClick={(e) => handleFooterNav(e, 'referral')}
              className="hover:text-[var(--text-primary)] transition-colors"
            >
              Privacy Policy
            </a>
            <a
              href="#referral"
              onClick={(e) => handleFooterNav(e, 'referral')}
              className="hover:text-[var(--text-primary)] transition-colors"
            >
              Terms of Service
            </a>
            <a
              href="#services"
              onClick={(e) => handleFooterNav(e, 'services')}
              className="hover:text-[var(--text-primary)] transition-colors"
            >
              LLMs.txt
            </a>
          </div>

          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full btn-platinum-primary text-xs font-semibold cursor-pointer shrink-0"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Monumental Metallic Silver Bottom Wordmark (Safe Right & Bottom Padding so Floating Buttons Never Cover 'E') */}
        <div className="pt-2 pb-12 pr-16 sm:pr-28 relative select-none overflow-hidden text-center">
          <div className="font-display font-black text-[15.5vw] sm:text-[14.2vw] leading-[0.84] tracking-[-0.04em] bg-gradient-to-b from-[#71717A] via-[#A1A1AA] to-[#E4E4E7] dark:from-[#E4E4E7] dark:via-[#71717A] dark:to-[#27272A] bg-clip-text text-transparent">
            SKYLINE
          </div>
        </div>
      </div>
    </footer>
  );
};

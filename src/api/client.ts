import {
  CAPABILITY_PILLARS,
  CapabilityPillar,
  ClientReview,
  FAQ_ITEMS,
  FaqItem,
  SHOWCASE_PROJECTS,
  ShowcaseProject,
  VERIFIED_REVIEWS,
} from '../data/agencyData';

export type LeadStatus = 'new' | 'contacted' | 'qualified' | 'proposal-sent' | 'closed-won';
export type ReferralStatus = 'pending' | 'in-discussion' | 'closed-won' | 'paid';

export interface LeadRecord {
  id: string;
  nameOrCompany: string;
  contact: string;
  contactType: 'whatsapp' | 'email';
  inquiryType: 'inquiry' | 'meeting';
  budget: string;
  meetingDate?: string;
  meetingSlot?: string;
  selectedPillars: string[];
  projectScope: string;
  status: LeadStatus;
  notes: string;
  source: string;
  createdAt: string;
  updatedAt: string;
}

export interface ReferralRecord {
  id: string;
  referrerName: string;
  referrerContact: string;
  referredBusiness: string;
  estimatedDealValue: number;
  commissionAmount: number;
  status: ReferralStatus;
  createdAt: string;
}

export interface CmsBundle {
  projects: ShowcaseProject[];
  services: CapabilityPillar[];
  testimonials: ClientReview[];
  faqs: FaqItem[];
  stats: {
    totalProjects: number;
    totalServices: number;
    totalTestimonials: number;
    activeLeadsCount: number;
  };
}

export interface AdminOverviewStats {
  totalLeads: number;
  newLeads: number;
  qualifiedLeads: number;
  closedWonLeads: number;
  totalReferrals: number;
  totalCommissionVolume: number;
  totalProjects: number;
  totalServices: number;
  totalTestimonials: number;
  totalFaqs: number;
}

export interface AdminOverviewPayload {
  stats: AdminOverviewStats;
  leads: LeadRecord[];
  referrals: ReferralRecord[];
  projects: ShowcaseProject[];
  services: CapabilityPillar[];
  testimonials: ClientReview[];
  faqs: FaqItem[];
}

const TOKEN_STORAGE_KEY = 'skyline_admin_jwt';
const FALLBACK_DB_KEY = 'skyline_fullstack_fallback_db_v1';

export function getStoredAdminToken(): string | null {
  try {
    return window.localStorage.getItem(TOKEN_STORAGE_KEY);
  } catch {
    return null;
  }
}

export function setStoredAdminToken(token: string | null): void {
  try {
    if (token) {
      window.localStorage.setItem(TOKEN_STORAGE_KEY, token);
    } else {
      window.localStorage.removeItem(TOKEN_STORAGE_KEY);
    }
  } catch {
    // ignore storage errors
  }
}

interface LocalFallbackDb {
  leads: LeadRecord[];
  referrals: ReferralRecord[];
  projects: ShowcaseProject[];
  services: CapabilityPillar[];
  testimonials: ClientReview[];
  faqs: FaqItem[];
}

function getLocalFallbackDb(): LocalFallbackDb {
  try {
    const raw = window.localStorage.getItem(FALLBACK_DB_KEY);
    if (raw) {
      return JSON.parse(raw) as LocalFallbackDb;
    }
  } catch {
    // ignore
  }
  const initial: LocalFallbackDb = {
    leads: [
      {
        id: 'LEAD-2026-101',
        nameOrCompany: 'Vikramaditya Singh / Pinnacle Luxury Estates',
        contact: '+91 98260 44120',
        contactType: 'whatsapp',
        inquiryType: 'meeting',
        budget: '₹2.5L – ₹5L',
        meetingDate: '2026-10-27',
        meetingSlot: '11:00 AM - 11:30 AM IST',
        selectedPillars: [
          'Web Engineering (Next.js & React)',
          'AI & WhatsApp CRM Automation',
        ],
        projectScope:
          'Need a Next.js 15 360° luxury tower portal for our Indore & Mumbai project with Meta CAPI and <6s WhatsApp site-visit booking.',
        status: 'qualified',
        notes: 'High-intent real estate developer.',
        source: 'System Architect Simulator',
        createdAt: '2026-10-23T09:30:00.000Z',
        updatedAt: '2026-10-24T11:15:00.000Z',
      },
    ],
    referrals: [
      {
        id: 'REF-2026-201',
        referrerName: 'Rohan Kulkarni',
        referrerContact: '+91 98930 11223',
        referredBusiness: 'Apex Multi-Specialty Clinic & Diagnostics',
        estimatedDealValue: 160000,
        commissionAmount: 24000,
        status: 'closed-won',
        createdAt: '2026-10-19T10:00:00.000Z',
      },
    ],
    projects: [...SHOWCASE_PROJECTS],
    services: [...CAPABILITY_PILLARS],
    testimonials: [...VERIFIED_REVIEWS],
    faqs: [...FAQ_ITEMS],
  };
  saveLocalFallbackDb(initial);
  return initial;
}

function saveLocalFallbackDb(db: LocalFallbackDb): void {
  try {
    window.localStorage.setItem(FALLBACK_DB_KEY, JSON.stringify(db));
  } catch {
    // ignore
  }
}

function computeLocalStats(db: LocalFallbackDb): AdminOverviewStats {
  return {
    totalLeads: db.leads.length,
    newLeads: db.leads.filter((l) => l.status === 'new').length,
    qualifiedLeads: db.leads.filter(
      (l) => l.status === 'qualified' || l.status === 'proposal-sent'
    ).length,
    closedWonLeads: db.leads.filter((l) => l.status === 'closed-won').length,
    totalReferrals: db.referrals.length,
    totalCommissionVolume: db.referrals.reduce((acc, r) => acc + r.commissionAmount, 0),
    totalProjects: db.projects.length,
    totalServices: db.services.length,
    totalTestimonials: db.testimonials.length,
    totalFaqs: db.faqs.length,
  };
}

function buildAuthHeaders(): HeadersInit {
  const token = getStoredAdminToken();
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}

export async function fetchPublicCms(): Promise<CmsBundle> {
  try {
    const res = await fetch('/api/cms');
    if (res.ok) {
      return (await res.json()) as CmsBundle;
    }
  } catch {
    // Fallback if static host
  }
  const db = getLocalFallbackDb();
  return {
    projects: db.projects,
    services: db.services,
    testimonials: db.testimonials,
    faqs: db.faqs,
    stats: {
      totalProjects: db.projects.length,
      totalServices: db.services.length,
      totalTestimonials: db.testimonials.length,
      activeLeadsCount: db.leads.length,
    },
  };
}

export async function createLeadInquiry(payload: {
  nameOrCompany: string;
  contact: string;
  inquiryType: 'inquiry' | 'meeting';
  budget?: string;
  meetingDate?: string;
  meetingSlot?: string;
  selectedPillars: string[];
  projectScope: string;
  source?: string;
}): Promise<{ success: boolean; lead: LeadRecord }> {
  try {
    const res = await fetch('/api/leads', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (res.ok) {
      return (await res.json()) as { success: boolean; lead: LeadRecord };
    }
    const errData = (await res.json().catch(() => ({}))) as { error?: string };
    if (res.status === 400 && errData.error) {
      throw new Error(errData.error);
    }
  } catch (err) {
    if (err instanceof Error && err.message && !err.message.includes('fetch')) {
      throw err;
    }
  }

  // Static deployment fallback
  const db = getLocalFallbackDb();
  const now = new Date().toISOString();
  const lead: LeadRecord = {
    id: `LEAD-${Date.now().toString().slice(-6)}`,
    nameOrCompany: payload.nameOrCompany.trim(),
    contact: payload.contact.trim(),
    contactType: payload.contact.includes('@') ? 'email' : 'whatsapp',
    inquiryType: payload.inquiryType,
    budget: payload.budget || 'Custom Scope',
    meetingDate: payload.meetingDate,
    meetingSlot: payload.meetingSlot,
    selectedPillars: payload.selectedPillars,
    projectScope: payload.projectScope.trim(),
    status: 'new',
    notes: '',
    source: payload.source || 'Website Dispatch Form',
    createdAt: now,
    updatedAt: now,
  };
  db.leads.unshift(lead);
  saveLocalFallbackDb(db);
  return { success: true, lead };
}

export async function createPartnerReferral(payload: {
  referrerName: string;
  referrerContact?: string;
  referredBusiness: string;
  estimatedDealValue: number;
}): Promise<{ success: boolean; referral: ReferralRecord }> {
  try {
    const res = await fetch('/api/referrals', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (res.ok) {
      return (await res.json()) as { success: boolean; referral: ReferralRecord };
    }
    const errData = (await res.json().catch(() => ({}))) as { error?: string };
    if (res.status === 400 && errData.error) {
      throw new Error(errData.error);
    }
  } catch (err) {
    if (err instanceof Error && err.message && !err.message.includes('fetch')) {
      throw err;
    }
  }

  const db = getLocalFallbackDb();
  const referral: ReferralRecord = {
    id: `REF-${Date.now().toString().slice(-6)}`,
    referrerName: payload.referrerName.trim(),
    referrerContact: (payload.referrerContact ?? 'Via WhatsApp').trim() || 'Via WhatsApp',
    referredBusiness: payload.referredBusiness.trim(),
    estimatedDealValue: payload.estimatedDealValue,
    commissionAmount: Math.round(payload.estimatedDealValue * 0.15),
    status: 'pending',
    createdAt: new Date().toISOString(),
  };
  db.referrals.unshift(referral);
  saveLocalFallbackDb(db);
  return { success: true, referral };
}

export async function loginAdmin(
  email: string,
  password: string
): Promise<{ token: string; user: { id: string; email: string; name: string; role: string } }> {
  try {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    if (res.ok) {
      const data = (await res.json()) as {
        token: string;
        user: { id: string; email: string; name: string; role: string };
      };
      setStoredAdminToken(data.token);
      return data;
    }
    if (res.status === 401 || res.status === 400) {
      const errData = (await res.json().catch(() => ({}))) as { error?: string };
      throw new Error(errData.error || 'Invalid admin credentials.');
    }
  } catch (err) {
    if (err instanceof Error && err.message && !err.message.includes('fetch')) {
      throw err;
    }
  }

  // Static fallback auth
  if (
    email.trim().toLowerCase() === 'admin@skylinedigital.in' &&
    password === 'SkyLine@2026'
  ) {
    const token = 'local-admin-jwt-token-2026';
    setStoredAdminToken(token);
    return {
      token,
      user: {
        id: 'admin-skyline-01',
        email: 'admin@skylinedigital.in',
        name: 'Lead System Architect (SkyLine Admin)',
        role: 'admin',
      },
    };
  }
  throw new Error('Invalid admin credentials. Default demo: admin@skylinedigital.in / SkyLine@2026');
}

export async function fetchAdminOverview(): Promise<AdminOverviewPayload> {
  try {
    const res = await fetch('/api/admin/overview', {
      headers: buildAuthHeaders(),
    });
    if (res.ok) {
      return (await res.json()) as AdminOverviewPayload;
    }
    if (res.status === 401) {
      throw new Error('UNAUTHORIZED');
    }
  } catch (err) {
    if (err instanceof Error && err.message === 'UNAUTHORIZED') {
      throw err;
    }
  }

  const db = getLocalFallbackDb();
  return {
    stats: computeLocalStats(db),
    leads: db.leads,
    referrals: db.referrals,
    projects: db.projects,
    services: db.services,
    testimonials: db.testimonials,
    faqs: db.faqs,
  };
}

export async function updateLeadStatusApi(
  id: string,
  updates: { status?: LeadStatus; notes?: string; budget?: string }
): Promise<LeadRecord> {
  try {
    const res = await fetch(`/api/leads/${id}`, {
      method: 'PATCH',
      headers: buildAuthHeaders(),
      body: JSON.stringify(updates),
    });
    if (res.ok) {
      const data = (await res.json()) as { lead: LeadRecord };
      return data.lead;
    }
  } catch {
    // Fallback below
  }
  const db = getLocalFallbackDb();
  const lead = db.leads.find((l) => l.id === id);
  if (!lead) throw new Error('Lead not found');
  if (updates.status) lead.status = updates.status;
  if (typeof updates.notes === 'string') lead.notes = updates.notes;
  if (typeof updates.budget === 'string') lead.budget = updates.budget;
  lead.updatedAt = new Date().toISOString();
  saveLocalFallbackDb(db);
  return lead;
}

export async function deleteLeadApi(id: string): Promise<void> {
  try {
    const res = await fetch(`/api/leads/${id}`, {
      method: 'DELETE',
      headers: buildAuthHeaders(),
    });
    if (res.ok) return;
  } catch {
    // Fallback below
  }
  const db = getLocalFallbackDb();
  db.leads = db.leads.filter((l) => l.id !== id);
  saveLocalFallbackDb(db);
}

export async function updateReferralStatusApi(
  id: string,
  status: ReferralStatus
): Promise<ReferralRecord> {
  try {
    const res = await fetch(`/api/referrals/${id}`, {
      method: 'PATCH',
      headers: buildAuthHeaders(),
      body: JSON.stringify({ status }),
    });
    if (res.ok) {
      const data = (await res.json()) as { referral: ReferralRecord };
      return data.referral;
    }
  } catch {
    // Fallback below
  }
  const db = getLocalFallbackDb();
  const ref = db.referrals.find((r) => r.id === id);
  if (!ref) throw new Error('Referral not found');
  ref.status = status;
  saveLocalFallbackDb(db);
  return ref;
}

export async function createProjectApi(
  payload: Partial<ShowcaseProject>
): Promise<ShowcaseProject> {
  try {
    const res = await fetch('/api/projects', {
      method: 'POST',
      headers: buildAuthHeaders(),
      body: JSON.stringify(payload),
    });
    if (res.ok) {
      const data = (await res.json()) as { project: ShowcaseProject };
      return data.project;
    }
  } catch {
    // Fallback below
  }
  const db = getLocalFallbackDb();
  const newProject: ShowcaseProject = {
    id: `project-${Date.now().toString().slice(-5)}`,
    statusBadge: payload.statusBadge || 'LIVE PRODUCTION',
    accentColor: payload.accentColor || 'indigo',
    category: (payload.category || 'WEB & SAAS').toUpperCase(),
    title: payload.title || 'Untitled Case Study',
    locationTag: payload.locationTag || 'Indore • Pan-India Edge',
    tags: payload.tags || 'Next.js 15 • WhatsApp Cloud API • Meta CAPI',
    metricsHeadline: payload.metricsHeadline || '+165% Qualified Pipeline',
    metricsSub:
      payload.metricsSub || 'Full-stack conversion system with instant WhatsApp lead routing.',
    architectureNodes: payload.architectureNodes || [
      'Next.js Edge UI',
      'WhatsApp Cloud Bot',
      'Server CAPI',
    ],
    accentMetric: payload.accentMetric || '99 CWV · <6s SLA',
    imageUrl: payload.imageUrl || '',
    fallbackSvgUrl: '/assets/hero-system-preview.svg',
    problemStatement:
      payload.problemStatement ||
      'High acquisition leakage and slow manual sales follow-ups across digital channels.',
    architectureSummary:
      payload.architectureSummary ||
      'Engineered a sub-100ms Next.js platform integrated with WhatsApp Cloud API and server-side Meta CAPI attribution.',
    impactMetrics: payload.impactMetrics || [
      { label: 'Conversion Velocity', before: '1.4%', after: '3.8%', delta: '+171% Lift' },
      { label: 'WhatsApp SLA', before: '8 Hours', after: '< 6 Seconds', delta: '24/7 Bot' },
      { label: 'Mobile CWV', before: '58 / 100', after: '99 / 100', delta: '84ms TTFB' },
    ],
    stackPills: payload.stackPills || ['Next.js 15', 'TypeScript', 'WhatsApp Cloud API'],
    clientType: payload.clientType || payload.locationTag || 'Enterprise Client',
    categoryTag: (payload.categoryTag || payload.category || 'WEB & SAAS').toUpperCase(),
    summary:
      payload.summary ||
      payload.architectureSummary ||
      'Engineered a sub-100ms Next.js platform integrated with WhatsApp Cloud API and server-side Meta CAPI attribution.',
    impactMetric: payload.impactMetric || payload.metricsHeadline || '+165% Qualified Pipeline',
    secondaryMetric: payload.secondaryMetric || payload.accentMetric || '99 CWV · <6s SLA',
    techStack: payload.techStack ||
      payload.stackPills || ['Next.js 15', 'TypeScript', 'WhatsApp Cloud API'],
    livePreviewLabel: payload.livePreviewLabel || 'Case Study',
  };
  db.projects.unshift(newProject);
  saveLocalFallbackDb(db);
  return newProject;
}

export async function deleteProjectApi(id: string): Promise<void> {
  try {
    const res = await fetch(`/api/projects/${id}`, {
      method: 'DELETE',
      headers: buildAuthHeaders(),
    });
    if (res.ok) return;
  } catch {
    // Fallback below
  }
  const db = getLocalFallbackDb();
  if (db.projects.length > 1) {
    db.projects = db.projects.filter((p) => p.id !== id);
    saveLocalFallbackDb(db);
  }
}

export async function createServiceApi(
  payload: Partial<CapabilityPillar>
): Promise<CapabilityPillar> {
  try {
    const res = await fetch('/api/services', {
      method: 'POST',
      headers: buildAuthHeaders(),
      body: JSON.stringify(payload),
    });
    if (res.ok) {
      const data = (await res.json()) as { service: CapabilityPillar };
      return data.service;
    }
  } catch {
    // Fallback below
  }
  const db = getLocalFallbackDb();
  const newService: CapabilityPillar = {
    id: `service-${Date.now().toString().slice(-5)}`,
    index: `0${db.services.length + 1}`,
    categoryLabel: (payload.categoryLabel || 'CUSTOM ARCHITECTURE').toUpperCase(),
    shortTab: payload.shortTab || 'Custom System',
    badgeTag: payload.badgeTag || 'Enterprise SLA',
    accentColor: payload.accentColor || 'indigo',
    title: payload.title || 'Custom Engineering Pillar',
    leadSentence: payload.leadSentence || 'High-velocity engineering and automated growth.',
    subtitle: (payload.categoryLabel || 'CUSTOM ARCHITECTURE').toUpperCase(),
    description:
      payload.description ||
      payload.subtitle ||
      'Custom-engineered architecture designed for sub-second speed and measurable ROI.',
    architectureNote: 'Next.js 15 · TypeScript · PostgreSQL · WhatsApp Cloud API',
    outcomeMetric: payload.outcomeMetric || '+150% Pipeline Conversion Velocity',
    timeline: payload.timeline || '2–3 Weeks Delivery',
    metrics: payload.metrics || [
      {
        label: 'Target Outcome',
        value: payload.outcomeMetric || '+150%',
        delta: payload.timeline || '2–3 Weeks',
      },
      { label: 'Availability SLA', value: '99.98%', delta: 'Zero-Downtime' },
    ],
    deliverables: payload.deliverables || [
      {
        name: 'Custom Architecture Blueprint',
        spec: 'Full-stack Next.js / Node deployment with WhatsApp & CRM webhook sync',
        impact: payload.outcomeMetric || '+150% velocity',
      },
    ],
    architectureSpecs: payload.architectureSpecs || [
      { key: 'Core Stack', val: 'Next.js 15 · TypeScript · PostgreSQL' },
      { key: 'Performance Target', val: '99+ Lighthouse · <100ms TTFB' },
    ],
    previewMode: 'web-vitals',
  };
  db.services.push(newService);
  saveLocalFallbackDb(db);
  return newService;
}

export async function deleteServiceApi(id: string): Promise<void> {
  try {
    const res = await fetch(`/api/services/${id}`, {
      method: 'DELETE',
      headers: buildAuthHeaders(),
    });
    if (res.ok) return;
  } catch {
    // Fallback below
  }
  const db = getLocalFallbackDb();
  if (db.services.length > 1) {
    db.services = db.services.filter((s) => s.id !== id);
    saveLocalFallbackDb(db);
  }
}

export async function createTestimonialApi(
  payload: Partial<ClientReview>
): Promise<ClientReview> {
  try {
    const res = await fetch('/api/testimonials', {
      method: 'POST',
      headers: buildAuthHeaders(),
      body: JSON.stringify(payload),
    });
    if (res.ok) {
      const data = (await res.json()) as { testimonial: ClientReview };
      return data.testimonial;
    }
  } catch {
    // Fallback below
  }
  const db = getLocalFallbackDb();
  const author = payload.author || 'Client Partner';
  const initials = author
    .split(/\s+/)
    .map((w: string) => w[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
  const newReview: ClientReview = {
    id: `review-${Date.now().toString().slice(-5)}`,
    initials: payload.initials || initials || 'SL',
    quote: payload.quote || 'Exceptional engineering velocity and measurable ROI.',
    author,
    role: payload.role || 'Founder & Director',
    serviceTag: (payload.engagementScope || 'FULL-STACK & GROWTH SYSTEM').toUpperCase(),
    impactHighlight: payload.verifiedOutcome || '+190% Verified ROI',
    rating: 5,
    engagementScope: (payload.engagementScope || 'FULL-STACK & GROWTH SYSTEM').toUpperCase(),
    verifiedOutcome: payload.verifiedOutcome || '+190% Verified ROI',
    relatedProjectId: payload.relatedProjectId || db.projects[0]?.id || 'proj-FinVantage',
  };
  db.testimonials.unshift(newReview);
  saveLocalFallbackDb(db);
  return newReview;
}

export async function deleteTestimonialApi(id: string): Promise<void> {
  try {
    const res = await fetch(`/api/testimonials/${id}`, {
      method: 'DELETE',
      headers: buildAuthHeaders(),
    });
    if (res.ok) return;
  } catch {
    // Fallback below
  }
  const db = getLocalFallbackDb();
  if (db.testimonials.length > 1) {
    db.testimonials = db.testimonials.filter((t) => t.id !== id);
    saveLocalFallbackDb(db);
  }
}

export async function createFaqApi(payload: Partial<FaqItem>): Promise<FaqItem> {
  try {
    const res = await fetch('/api/faqs', {
      method: 'POST',
      headers: buildAuthHeaders(),
      body: JSON.stringify(payload),
    });
    if (res.ok) {
      const data = (await res.json()) as { faq: FaqItem };
      return data.faq;
    }
  } catch {
    // Fallback below
  }
  const db = getLocalFallbackDb();
  const newFaq: FaqItem = {
    id: `faq-${Date.now().toString().slice(-5)}`,
    category: payload.category || 'Engineering',
    accentColor: payload.accentColor || 'indigo',
    question: payload.question || 'How does the engineering sprint work?',
    answer:
      payload.answer ||
      'We ship production-grade architectures in 2–4 weeks with weekly live staging milestones.',
  };
  db.faqs.push(newFaq);
  saveLocalFallbackDb(db);
  return newFaq;
}

export async function deleteFaqApi(id: string): Promise<void> {
  try {
    const res = await fetch(`/api/faqs/${id}`, {
      method: 'DELETE',
      headers: buildAuthHeaders(),
    });
    if (res.ok) return;
  } catch {
    // Fallback below
  }
  const db = getLocalFallbackDb();
  if (db.faqs.length > 1) {
    db.faqs = db.faqs.filter((f) => f.id !== id);
    saveLocalFallbackDb(db);
  }
}

import express from 'express';
import { GoogleGenAI } from '@google/genai';
import {
  CapabilityPillar,
  ClientReview,
  FaqItem,
  SemanticAccentColor,
  ShowcaseProject,
} from '../../src/data/agencyData';
import {
  AuthenticatedRequest,
  requireAdminAuth,
  signToken,
  verifyPassword,
} from '../auth';
import {
  DEFAULT_ADMIN_EMAIL,
  getDb,
  resetDbToDefault,
  saveDb,
} from '../db';
import {
  CreateLeadPayload,
  CreateReferralPayload,
  LeadRecord,
  LeadStatus,
  ReferralRecord,
  ReferralStatus,
  VALID_ACCENT_COLORS,
  computeAdminOverviewStats,
  validateCreateLeadPayload,
  validateCreateReferralPayload,
} from '../types';

export const apiRouter = express.Router();

function sanitizeAccent(color?: string): SemanticAccentColor {
  if (color && VALID_ACCENT_COLORS.includes(color as SemanticAccentColor)) {
    return color as SemanticAccentColor;
  }
  return 'indigo';
}

// 1. Health & Public CMS Bundle
apiRouter.get('/health', (_req, res) => {
  const db = getDb();
  res.json({
    status: 'ok',
    service: 'SkyLine Digital Agency Full-Stack API',
    timestamp: new Date().toISOString(),
    counts: {
      leads: db.leads.length,
      referrals: db.referrals.length,
      projects: db.projects.length,
      services: db.services.length,
      testimonials: db.testimonials.length,
      faqs: db.faqs.length,
    },
  });
});

apiRouter.get('/cms', (_req, res) => {
  const db = getDb();
  res.json({
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
  });
});

// 2. Public Lead / Contact & Strategy Meeting Capture
apiRouter.post('/leads', (req, res) => {
  const body = req.body as Partial<CreateLeadPayload>;
  const check = validateCreateLeadPayload(body);

  if (!check.valid) {
    res.status(400).json({ error: check.error });
    return;
  }

  const db = getDb();
  const now = new Date().toISOString();
  const newLead: LeadRecord = {
    id: `LEAD-${Date.now().toString().slice(-6)}`,
    nameOrCompany: (body.nameOrCompany ?? '').trim(),
    contact: (body.contact ?? '').trim(),
    contactType: check.contactType,
    inquiryType: body.inquiryType === 'meeting' ? 'meeting' : 'inquiry',
    budget: (body.budget ?? 'Custom Scope').trim() || 'Custom Scope',
    meetingDate: body.meetingDate,
    meetingSlot: body.meetingSlot,
    selectedPillars: body.selectedPillars ?? [],
    projectScope: (body.projectScope ?? '').trim(),
    status: 'new',
    notes: '',
    source: (body.source ?? 'Website Dispatch Form').trim(),
    createdAt: now,
    updatedAt: now,
  };

  db.leads.unshift(newLead);
  saveDb(db);

  res.status(201).json({
    success: true,
    message: 'Lead saved to SkyLine CRM database.',
    lead: newLead,
  });
});

// 3. Public Partner Referral (15% Commission) Capture
apiRouter.post('/referrals', (req, res) => {
  const body = req.body as Partial<CreateReferralPayload>;
  const check = validateCreateReferralPayload(body);

  if (!check.valid) {
    res.status(400).json({ error: check.error });
    return;
  }

  const db = getDb();
  const newReferral: ReferralRecord = {
    id: `REF-${Date.now().toString().slice(-6)}`,
    referrerName: (body.referrerName ?? '').trim(),
    referrerContact: (body.referrerContact ?? 'Via WhatsApp').trim() || 'Via WhatsApp',
    referredBusiness: (body.referredBusiness ?? '').trim(),
    estimatedDealValue: check.normalizedDealValue,
    commissionAmount: check.commissionAmount,
    status: 'pending',
    createdAt: new Date().toISOString(),
  };

  db.referrals.unshift(newReferral);
  saveDb(db);

  res.status(201).json({
    success: true,
    message: 'Partner referral registered for 15% commission payout.',
    referral: newReferral,
  });
});

// 4. Admin Authentication
apiRouter.post('/auth/login', (req, res) => {
  const { email, password } = req.body as { email?: string; password?: string };
  if (!email || !password) {
    res.status(400).json({ error: 'Email and password are required.' });
    return;
  }

  const db = getDb();
  const normalizedEmail = email.trim().toLowerCase();
  const user =
    db.users.find((u) => u.email.toLowerCase() === normalizedEmail) ||
    (normalizedEmail === DEFAULT_ADMIN_EMAIL ? db.users[0] : undefined);

  if (!user || !verifyPassword(password, user.passwordHash)) {
    res.status(401).json({
      error: 'Invalid admin credentials. Default demo: admin@skylinedigital.in / SkyLine@2026',
    });
    return;
  }

  const token = signToken(user);
  res.json({
    token,
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    },
  });
});

apiRouter.get('/auth/me', requireAdminAuth, (req: AuthenticatedRequest, res) => {
  res.json({ user: req.adminUser });
});

// 5. Protected Admin Dashboard Overview & CRM
apiRouter.get('/admin/overview', requireAdminAuth, (_req, res) => {
  const db = getDb();
  res.json({
    stats: computeAdminOverviewStats(db),
    leads: db.leads,
    referrals: db.referrals,
    projects: db.projects,
    services: db.services,
    testimonials: db.testimonials,
    faqs: db.faqs,
  });
});

apiRouter.get('/leads', requireAdminAuth, (_req, res) => {
  const db = getDb();
  res.json({ leads: db.leads });
});

apiRouter.patch('/leads/:id', requireAdminAuth, (req, res) => {
  const { id } = req.params;
  const { status, notes, budget } = req.body as {
    status?: LeadStatus;
    notes?: string;
    budget?: string;
  };
  const db = getDb();
  const lead = db.leads.find((l) => l.id === id);
  if (!lead) {
    res.status(404).json({ error: 'Lead not found.' });
    return;
  }

  const allowedStatuses: LeadStatus[] = [
    'new',
    'contacted',
    'qualified',
    'proposal-sent',
    'closed-won',
  ];
  if (status && allowedStatuses.includes(status)) {
    lead.status = status;
  }
  if (typeof notes === 'string') {
    lead.notes = notes;
  }
  if (typeof budget === 'string') {
    lead.budget = budget;
  }
  lead.updatedAt = new Date().toISOString();
  saveDb(db);

  res.json({ success: true, lead });
});

apiRouter.delete('/leads/:id', requireAdminAuth, (req, res) => {
  const { id } = req.params;
  const db = getDb();
  const prevLen = db.leads.length;
  db.leads = db.leads.filter((l) => l.id !== id);
  if (db.leads.length === prevLen) {
    res.status(404).json({ error: 'Lead not found.' });
    return;
  }
  saveDb(db);
  res.json({ success: true });
});

// 6. Protected Partner Referrals Management
apiRouter.patch('/referrals/:id', requireAdminAuth, (req, res) => {
  const { id } = req.params;
  const { status } = req.body as { status?: ReferralStatus };
  const db = getDb();
  const referral = db.referrals.find((r) => r.id === id);
  if (!referral) {
    res.status(404).json({ error: 'Referral not found.' });
    return;
  }
  const allowed: ReferralStatus[] = ['pending', 'in-discussion', 'closed-won', 'paid'];
  if (status && allowed.includes(status)) {
    referral.status = status;
  }
  saveDb(db);
  res.json({ success: true, referral });
});

apiRouter.delete('/referrals/:id', requireAdminAuth, (req, res) => {
  const { id } = req.params;
  const db = getDb();
  db.referrals = db.referrals.filter((r) => r.id !== id);
  saveDb(db);
  res.json({ success: true });
});

// 7. Protected Case Studies / Projects CMS
apiRouter.post('/projects', requireAdminAuth, (req, res) => {
  const body = req.body as Partial<ShowcaseProject>;
  const title = (body.title ?? '').trim();
  const category = (body.category ?? '').trim();

  if (!title || !category) {
    res.status(400).json({ error: 'Project title and category are required.' });
    return;
  }

  const db = getDb();
  const newProject: ShowcaseProject = {
    id: `project-${Date.now().toString().slice(-5)}`,
    statusBadge: (body.statusBadge ?? 'LIVE PRODUCTION').trim() || 'LIVE PRODUCTION',
    accentColor: sanitizeAccent(body.accentColor),
    category: category.toUpperCase(),
    title,
    locationTag: (body.locationTag ?? 'Indore • Pan-India Edge').trim(),
    tags: (body.tags ?? 'Next.js 15 • WhatsApp Cloud API • Meta CAPI').trim(),
    metricsHeadline: (body.metricsHeadline ?? '+165% Qualified Pipeline').trim(),
    metricsSub:
      (body.metricsSub ?? 'Full-stack conversion system with instant WhatsApp lead routing.').trim(),
    architectureNodes:
      Array.isArray(body.architectureNodes) && body.architectureNodes.length > 0
        ? body.architectureNodes
        : ['Next.js Edge UI', 'WhatsApp Cloud Bot', 'Server CAPI'],
    accentMetric: (body.accentMetric ?? '99 CWV · <6s SLA').trim(),
    imageUrl: (body.imageUrl ?? '').trim(),
    fallbackSvgUrl: body.fallbackSvgUrl || '/assets/hero-system-preview.svg',
    problemStatement:
      (body.problemStatement ??
        'High acquisition leakage and slow manual sales follow-ups across digital channels.').trim(),
    architectureSummary:
      (body.architectureSummary ??
        'Engineered a sub-100ms Next.js platform integrated with WhatsApp Cloud API and server-side Meta CAPI attribution.').trim(),
    impactMetrics:
      Array.isArray(body.impactMetrics) && body.impactMetrics.length > 0
        ? body.impactMetrics
        : [
            {
              label: 'Qualified Conversion Velocity',
              before: '1.4%',
              after: '3.8%',
              delta: '+171% Lift',
            },
            {
              label: 'First-Touch WhatsApp SLA',
              before: '8 Hours',
              after: '< 6 Seconds',
              delta: '24/7 AI Bot',
            },
            {
              label: 'Mobile Core Web Vitals',
              before: '58 / 100',
              after: '99 / 100',
              delta: '84ms TTFB',
            },
          ],
    stackPills:
      Array.isArray(body.stackPills) && body.stackPills.length > 0
        ? body.stackPills
        : ['Next.js 15', 'TypeScript', 'WhatsApp Cloud API', 'PostgreSQL'],
  };

  db.projects.unshift(newProject);
  saveDb(db);
  res.status(201).json({ success: true, project: newProject });
});

apiRouter.delete('/projects/:id', requireAdminAuth, (req, res) => {
  const { id } = req.params;
  const db = getDb();
  if (db.projects.length <= 1) {
    res.status(400).json({ error: 'Cannot delete the last remaining showcase project.' });
    return;
  }
  db.projects = db.projects.filter((p) => p.id !== id);
  saveDb(db);
  res.json({ success: true });
});

// 8. Protected Services / Capabilities CMS
apiRouter.post('/services', requireAdminAuth, (req, res) => {
  const body = req.body as Partial<CapabilityPillar>;
  const title = (body.title ?? '').trim();
  const shortTab = (body.shortTab ?? '').trim();

  if (!title || !shortTab) {
    res.status(400).json({ error: 'Service title and tab label are required.' });
    return;
  }

  const db = getDb();
  const newService: CapabilityPillar = {
    id: `service-${Date.now().toString().slice(-5)}`,
    categoryLabel: (body.categoryLabel ?? 'CUSTOM ARCHITECTURE').trim().toUpperCase(),
    shortTab,
    badgeTag: (body.badgeTag ?? 'Enterprise SLA').trim(),
    accentColor: sanitizeAccent(body.accentColor),
    title,
    leadSentence:
      (body.leadSentence ?? 'High-velocity engineering and automated growth pipeline.').trim(),
    subtitle:
      (body.subtitle ??
        'Custom-engineered architecture designed for sub-second speed, automated WhatsApp qualification, and measurable ROI.').trim(),
    outcomeMetric: (body.outcomeMetric ?? '+150% Pipeline Conversion Velocity').trim(),
    timeline: (body.timeline ?? '2–3 Weeks Delivery').trim(),
    deliverables:
      Array.isArray(body.deliverables) && body.deliverables.length > 0
        ? body.deliverables
        : [
            'Custom Architecture Blueprint',
            'Full-Stack Next.js / Node Deployment',
            'WhatsApp & CRM Webhook Sync',
            '99+ Core Web Vitals Verification',
          ],
    architectureSpecs:
      Array.isArray(body.architectureSpecs) && body.architectureSpecs.length > 0
        ? body.architectureSpecs
        : [
            { key: 'Core Stack', val: 'Next.js 15 · TypeScript · PostgreSQL' },
            { key: 'Performance Target', val: '99+ Lighthouse · <100ms TTFB' },
            { key: 'Automation', val: 'Official WhatsApp Cloud API' },
          ],
    previewMode: body.previewMode || 'web-vitals',
  };

  db.services.push(newService);
  saveDb(db);
  res.status(201).json({ success: true, service: newService });
});

apiRouter.delete('/services/:id', requireAdminAuth, (req, res) => {
  const { id } = req.params;
  const db = getDb();
  if (db.services.length <= 1) {
    res.status(400).json({ error: 'Cannot delete the last remaining service pillar.' });
    return;
  }
  db.services = db.services.filter((s) => s.id !== id);
  saveDb(db);
  res.json({ success: true });
});

// 9. Protected Client Testimonials / Reviews CMS
apiRouter.post('/testimonials', requireAdminAuth, (req, res) => {
  const body = req.body as Partial<ClientReview>;
  const author = (body.author ?? '').trim();
  const quote = (body.quote ?? '').trim();

  if (!author || !quote) {
    res.status(400).json({ error: 'Client author name and review quote are required.' });
    return;
  }

  const db = getDb();
  const words = author.split(/\s+/);
  const autoInitials = words
    .map((w) => w[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  const newReview: ClientReview = {
    id: `review-${Date.now().toString().slice(-5)}`,
    initials: (body.initials ?? autoInitials) || 'SL',
    quote,
    author,
    role: (body.role ?? 'Founder & Director').trim(),
    engagementScope: (body.engagementScope ?? 'FULL-STACK & GROWTH SYSTEM').trim().toUpperCase(),
    verifiedOutcome: (body.verifiedOutcome ?? '+190% Verified ROI').trim(),
    relatedProjectId: body.relatedProjectId || db.projects[0]?.id || 'project-360-estate',
  };

  db.testimonials.unshift(newReview);
  saveDb(db);
  res.status(201).json({ success: true, testimonial: newReview });
});

apiRouter.delete('/testimonials/:id', requireAdminAuth, (req, res) => {
  const { id } = req.params;
  const db = getDb();
  if (db.testimonials.length <= 1) {
    res.status(400).json({ error: 'Cannot delete the last remaining client review.' });
    return;
  }
  db.testimonials = db.testimonials.filter((t) => t.id !== id);
  saveDb(db);
  res.json({ success: true });
});

// 10. Protected FAQs CMS
apiRouter.post('/faqs', requireAdminAuth, (req, res) => {
  const body = req.body as Partial<FaqItem>;
  const question = (body.question ?? '').trim();
  const answer = (body.answer ?? '').trim();

  if (!question || !answer) {
    res.status(400).json({ error: 'FAQ question and answer are required.' });
    return;
  }

  const db = getDb();
  const newFaq: FaqItem = {
    id: `faq-${Date.now().toString().slice(-5)}`,
    category: (body.category ?? 'Engineering').trim(),
    accentColor: sanitizeAccent(body.accentColor),
    question,
    answer,
  };

  db.faqs.push(newFaq);
  saveDb(db);
  res.status(201).json({ success: true, faq: newFaq });
});

apiRouter.delete('/faqs/:id', requireAdminAuth, (req, res) => {
  const { id } = req.params;
  const db = getDb();
  if (db.faqs.length <= 1) {
    res.status(400).json({ error: 'Cannot delete the last remaining FAQ item.' });
    return;
  }
  db.faqs = db.faqs.filter((f) => f.id !== id);
  saveDb(db);
  res.json({ success: true });
});

// 11. Reset Demo Database
apiRouter.post('/admin/reset', requireAdminAuth, (_req, res) => {
  const fresh = resetDbToDefault();
  res.json({
    success: true,
    stats: computeAdminOverviewStats(fresh),
  });
});

// 12. SkyLine AI Assistant Server-Side Endpoints (Gemini 3.8 Flash / 3.1 Flash Lite / 3.5 Transcribe + Built-In Intent Engine)
export const SKYLINE_SYSTEM_INSTRUCTION = `You are SkyLine AI, the official architectural assistant for SkyLine Digital Agency.
Answer concisely (2 to 4 sentences max) and ONLY about SkyLine Digital Agency:
- Services: Custom Web & SaaS Apps (Next.js 15, React 19, TypeScript, Java Spring Boot, Node.js, PostgreSQL), 24/7 WhatsApp AI Bots (Official WhatsApp Cloud API), Local Business Growth (#1 Google Map Pack & Smart QR 5-Star Reviews), Meta/Google Performance Ads (Server-Side CAPI), Technical SEO/AEO, and D2C 1-Tap UPI Stores.
- Pricing Tiers:
  1) Local Business / Starter: ₹25,000 – ₹60,000
  2) Growth Website + Automation: ₹60,000 – ₹1,50,000
  3) Full-Stack SaaS / Ad Engine: ₹1,50,000 – ₹3,50,000+
- Timelines: Fast-Track Build: 10–18 Days | Standard Sprint: 3–6 Weeks.
- Referral Program: 15% Direct UPI/Bank Commission on referred client deals.
- Official Email: skylinedigital@gmail.com
- Location: Indore, Bhopal, Madhya Pradesh, India (Serving Globally).
- Founding Architects: Aashif Khan (Co-Founder & Lead Full-Stack / Cybersecurity Architect, Direct Call & WhatsApp: +91 86430 02478) & Sachin Sahu (Co-Founder & Lead Java Backend / Distributed Systems Architect, WhatsApp: +91 89591 44686).
If the user asks for custom discounts, negotiations, or out-of-scope topics, politely state that a Founding Architect can tailor a custom scope and set needsHumanFallback to true.`;

export function evaluateLocalSkylineIntent(query: string): {
  reply: string;
  needsHumanFallback: boolean;
} {
  const q = query.toLowerCase();

  if (q.includes('price') || q.includes('pricing') || q.includes('cost') || q.includes('package') || q.includes('budget') || q.includes('charge')) {
    return {
      reply:
        'SkyLine Digital Agency offers transparent, fixed-milestone tiers: (1) Local Business / Starter: ₹25,000 – ₹60,000, (2) Growth Website + WhatsApp Automation: ₹60,000 – ₹1,50,000, and (3) Full-Stack SaaS / Performance Ad Engine: ₹1,50,000 – ₹3,50,000+. Fast-Track launches take 10–18 Days, and you retain 100% source-code ownership.',
      needsHumanFallback: false,
    };
  }

  if (q.includes('local') || q.includes('map') || q.includes('clinic') || q.includes('salon') || q.includes('review') || q.includes('qr')) {
    return {
      reply:
        'Our Local Business Growth Engine is built for clinics, salons, showrooms, gyms, and retail stores. We rank your business in the Top 3 of the Google Map Pack, deploy Smart QR 5-Star Review Standees, and connect a 24/7 WhatsApp appointment booking bot—delivering 3.2x more local calls and walk-ins.',
      needsHumanFallback: false,
    };
  }

  if (q.includes('whatsapp') || q.includes('bot') || q.includes('crm') || q.includes('demo') || q.includes('ai')) {
    return {
      reply:
        'Our 24/7 Autonomous WhatsApp AI Bots (powered by the Official WhatsApp Cloud API + RAG Knowledge Base) reply to leads in under 1.2 seconds, share product catalogs, qualify budgets, and book calendar slots automatically with zero lead leakage.',
      needsHumanFallback: true,
    };
  }

  if (q.includes('founder') || q.includes('team') || q.includes('who') || q.includes('aashif') || q.includes('sachin') || q.includes('talk') || q.includes('call') || q.includes('human') || q.includes('email')) {
    return {
      reply:
        'SkyLine Digital Agency is led by Co-Founders & Lead Architects Aashif Khan (Full-Stack Cloud & Cybersecurity Architect) and Sachin Sahu (Java 21 Backend & Distributed Systems Architect), based in Indore, Bhopal, Madhya Pradesh, India (Email: skylinedigital@gmail.com). You can connect with us directly on WhatsApp or call our Lead Architect below.',
      needsHumanFallback: true,
    };
  }

  if (q.includes('timeline') || q.includes('fast') || q.includes('time') || q.includes('long') || q.includes('week') || q.includes('day')) {
    return {
      reply:
        'We deliver on fixed milestones: Fast-Track Builds launch in 10–18 Days, while comprehensive Standard Sprints (custom SaaS, multi-agent AI, and full-funnel ad engines) take 3–6 Weeks with live staging previews.',
      needsHumanFallback: false,
    };
  }

  if (q.includes('refer') || q.includes('commission') || q.includes('partner') || q.includes('15%')) {
    return {
      reply:
        'With the SkyLine Partner Program, you earn a direct 15% commission via UPI or bank transfer for every business you introduce that signs a project with SkyLine Digital Agency.',
      needsHumanFallback: false,
    };
  }

  if (q.includes('service') || q.includes('web') || q.includes('saas') || q.includes('ads') || q.includes('seo') || q.includes('upi')) {
    return {
      reply:
        'We engineer 6 core systems: (1) Sub-Second Next.js Web & SaaS Apps, (2) 24/7 WhatsApp AI Bots & CRM, (3) Local Business #1 Google Map Pack & QR Reviews, (4) High-ROAS Meta & Google CAPI Ads, (5) Technical SEO & AI Search Visibility, and (6) D2C 1-Tap UPI Storefronts.',
      needsHumanFallback: false,
    };
  }

  return {
    reply:
      'For custom architecture specifications, tailored enterprise pricing, or a live 15-minute teardown of your business funnel, connect directly with our Founding Architects via WhatsApp or Direct Voice Call below.',
    needsHumanFallback: true,
  };
}

apiRouter.post('/ai/chat', async (req, res) => {
  const { message, messages, mode } = req.body as {
    message?: string;
    messages?: { role: 'user' | 'model'; text: string }[];
    mode?: 'standard' | 'fast';
  };
  const cleanMessage = (message ?? '').trim();

  if (!cleanMessage) {
    res.status(400).json({ error: 'Message is required.' });
    return;
  }

  const localResult = evaluateLocalSkylineIntent(cleanMessage);
  const apiKey = process.env.GEMINI_API_KEY;
  const selectedModel = mode === 'fast' ? 'gemini-3.1-flash-lite' : 'gemini-3.8-flash';

  if (!apiKey) {
    res.json({
      ...localResult,
      modelUsed: selectedModel,
    });
    return;
  }

  try {
    const ai = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });

    const historyContents =
      Array.isArray(messages) && messages.length > 0
        ? messages.map((m) => ({
            role: m.role === 'model' ? 'model' : 'user',
            parts: [{ text: m.text }],
          }))
        : cleanMessage;

    const response = await ai.models.generateContent({
      model: selectedModel,
      contents: historyContents,
      config: {
        systemInstruction: SKYLINE_SYSTEM_INSTRUCTION,
        temperature: mode === 'fast' ? 0.25 : 0.35,
      },
    });

    const text = response.text?.trim() || localResult.reply;
    const lowerQ = cleanMessage.toLowerCase();
    const needsFallback =
      localResult.needsHumanFallback ||
      lowerQ.includes('discount') ||
      lowerQ.includes('negotiate') ||
      lowerQ.includes('custom') ||
      lowerQ.includes('call') ||
      lowerQ.includes('human') ||
      lowerQ.includes('founder') ||
      lowerQ.includes('whatsapp');

    res.json({
      reply: text,
      needsHumanFallback: needsFallback,
      modelUsed: selectedModel,
    });
  } catch {
    res.json({
      ...localResult,
      modelUsed: selectedModel,
    });
  }
});

apiRouter.post('/ai/transcribe', async (req, res) => {
  const { audioBase64, mimeType } = req.body as {
    audioBase64?: string;
    mimeType?: string;
  };

  if (!audioBase64) {
    res.status(400).json({ error: 'audioBase64 is required.' });
    return;
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    res.json({
      transcript: 'What are your pricing packages and timelines for a new project?',
      modelUsed: 'gemini-3.5-transcribe',
    });
    return;
  }

  try {
    const ai = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });

    const response = await ai.models.generateContent({
      model: 'gemini-3.5-transcribe',
      contents: [
        {
          inlineData: {
            mimeType: mimeType || 'audio/webm',
            data: audioBase64,
          },
        },
        {
          text: 'Transcribe the spoken question accurately in plain text.',
        },
      ],
    });

    res.json({
      transcript: response.text?.trim() || '',
      modelUsed: 'gemini-3.5-transcribe',
    });
  } catch {
    res.json({
      transcript: 'Tell me about SkyLine Digital Agency pricing and WhatsApp AI bots.',
      modelUsed: 'gemini-3.5-transcribe',
    });
  }
});


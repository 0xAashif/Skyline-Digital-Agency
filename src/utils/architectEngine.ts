export enum IndustryType {
  LOCAL_BUSINESS = 'Local Businesses (Clinics, Showrooms & Retail)',
  ECOMMERCE = 'E-Commerce & D2C Brands',
  REAL_ESTATE = 'Real Estate & PropTech',
  SAAS = 'SaaS & Tech Startups',
}

export enum BottleneckType {
  SLOW_WEBSITE = 'Slow / Low-Converting Website',
  UNPREDICTABLE_LEADS = 'Unpredictable Lead & Footfall Flow',
  MANUAL_SALES = 'Manual Sales & No WhatsApp CRM',
  ZERO_VISIBILITY = 'Low Google Map / Search & Social Reach',
}

export const ALLOWLISTED_SERVICE_PILLARS = [
  'Local Business Growth & Digitization',
  'Full-Stack Web Engineering',
  'AI Workflows & CRM Automation',
  'Performance Ads (Meta & Google)',
  'Technical SEO & AEO Dominance',
  'Conversion UI/UX & Funnel Architecture',
] as const;

export type ServicePillarName = (typeof ALLOWLISTED_SERVICE_PILLARS)[number];

export interface BlueprintLayer {
  id: string;
  layerTag: string;
  title: string;
  moduleName: string;
  architectureSpec: string;
  deliverables: string[];
  latencyOrMetric: string;
  accentColor: 'emerald' | 'indigo' | 'violet' | 'amber' | 'cyan' | 'rose';
}

export interface SystemBlueprint {
  blueprintCode: string;
  industry: IndustryType;
  bottleneck: BottleneckType;
  estimatedTimeline: string;
  targetSpeedBudget: string;
  projectedConversionLift: string;
  monthlyQualifiedPipeline: number;
  projectedAdditionalLeads: number;
  summaryDiagnosis: string;
  layers: [BlueprintLayer, BlueprintLayer, BlueprintLayer];
  whatsappUrl: string;
  whatsappPreviewText: string;
}

export interface ProposalFormInput {
  nameOrCompany: string;
  contact: string;
  selectedPillars: string[];
  projectScope: string;
  fallbackBlueprintSummary?: string;
}

export interface ProposalValidationResult {
  valid: boolean;
  statusCode: 200 | 400 | 422 | 429;
  sanitizedPayload?: {
    name: string;
    contact: string;
    pillars: string[];
    scope: string;
    idempotencyKey: string;
  };
  errors: {
    nameOrCompany?: string;
    contact?: string;
    selectedPillars?: string;
    projectScope?: string;
    idempotency?: string;
  };
}

export interface TelemetryEvent {
  id: string;
  action:
    | 'orb_interaction'
    | 'pitch_slide_change'
    | 'blueprint_computed'
    | 'lead_dispatch'
    | 'case_modal_open';
  status: 'ok' | 'error';
  durationMs: number;
  metadata?: Record<string, string | number | boolean>;
  timestamp: number;
}

export const SKYLINE_WHATSAPP_NUMBER = '918643002478';
export const SKYLINE_SECONDARY_PHONE = '+91 89591 44686';
export const SKYLINE_EMAIL = 'skylinedigital@gmail.com';
export const SKYLINE_INSTAGRAM_URL = 'https://www.instagram.com/sky_line_digital';

// Structured RED Telemetry Ring Buffer (Max 100 entries)
const TELEMETRY_RING_BUFFER: TelemetryEvent[] = [];
const MAX_TELEMETRY_BUFFER_SIZE = 100;

export function recordTelemetryEvent(
  action: TelemetryEvent['action'],
  status: TelemetryEvent['status'],
  durationMs: number,
  metadata?: Record<string, string | number | boolean>
): TelemetryEvent {
  const evt: TelemetryEvent = {
    id: `tel-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    action,
    status,
    durationMs: Math.max(0, Math.round(durationMs * 100) / 100),
    metadata,
    timestamp: Date.now(),
  };
  TELEMETRY_RING_BUFFER.push(evt);
  if (TELEMETRY_RING_BUFFER.length > MAX_TELEMETRY_BUFFER_SIZE) {
    TELEMETRY_RING_BUFFER.shift();
  }
  return evt;
}

export function getTelemetrySnapshot(): {
  totalEvents: number;
  errorCount: number;
  avgDurationMs: number;
  events: TelemetryEvent[];
} {
  const totalEvents = TELEMETRY_RING_BUFFER.length;
  const errorCount = TELEMETRY_RING_BUFFER.filter((e) => e.status === 'error').length;
  const avgDurationMs =
    totalEvents === 0
      ? 0
      : Math.round(
          (TELEMETRY_RING_BUFFER.reduce((acc, e) => acc + e.durationMs, 0) / totalEvents) * 100
        ) / 100;
  return {
    totalEvents,
    errorCount,
    avgDurationMs,
    events: [...TELEMETRY_RING_BUFFER],
  };
}

export function clearTelemetryBuffer(): void {
  TELEMETRY_RING_BUFFER.length = 0;
}

// Sanitize input text by stripping HTML/script tags and normalizing whitespace
export function sanitizeInputText(raw: string, maxLen: number = 600): string {
  if (!raw || typeof raw !== 'string') return '';
  return raw
    .replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, '')
    .replace(/<[^>]+>/g, '')
    .replace(/javascript:/gi, '')
    .trim()
    .slice(0, maxLen);
}

// Deterministic Idempotency Fingerprint & 60-Second Lock
const IDEMPOTENCY_MEMORY_LOCK = new Map<string, number>();
const IDEMPOTENCY_WINDOW_MS = 60_000;

export function computeIdempotencyKey(input: {
  nameOrCompany: string;
  contact: string;
  selectedPillars: string[];
  projectScope: string;
}): string {
  const normalized = [
    sanitizeInputText(input.nameOrCompany, 80).toLowerCase(),
    sanitizeInputText(input.contact, 80).toLowerCase(),
    [...(input.selectedPillars || [])].map((p) => p.trim().toLowerCase()).sort().join('|'),
    sanitizeInputText(input.projectScope, 300).toLowerCase(),
  ].join('::');

  let hash = 2166136261;
  for (let i = 0; i < normalized.length; i++) {
    hash ^= normalized.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return `idem-${(hash >>> 0).toString(16)}`;
}

export function checkAndLockIdempotency(
  key: string,
  nowMs: number = Date.now()
): { allowed: boolean; retryAfterSeconds: number } {
  const existingTimestamp = IDEMPOTENCY_MEMORY_LOCK.get(key);
  if (existingTimestamp !== undefined && nowMs - existingTimestamp < IDEMPOTENCY_WINDOW_MS) {
    const remainingMs = IDEMPOTENCY_WINDOW_MS - (nowMs - existingTimestamp);
    return {
      allowed: false,
      retryAfterSeconds: Math.max(1, Math.ceil(remainingMs / 1000)),
    };
  }

  IDEMPOTENCY_MEMORY_LOCK.set(key, nowMs);
  return { allowed: true, retryAfterSeconds: 0 };
}

export function clearIdempotencyLocks(): void {
  IDEMPOTENCY_MEMORY_LOCK.clear();
}

const INDUSTRY_TRAFFIC_LAYER: Record<
  IndustryType,
  { module: string; spec: string; deliverables: string[]; metric: string; baseConvRate: number }
> = {
  [IndustryType.LOCAL_BUSINESS]: {
    module: 'Google Map Pack #1 Dominance + Hyper-Local Reels & QR Funnel',
    spec: 'Google Business Profile authority, local geo-fenced Meta Reels ads, and automated WhatsApp appointment/catalog booking.',
    deliverables: ['Google Map Pack #1 Ranking', 'Smart QR Review & Catalog Bot', 'Geo-Fenced Local Reels Ads'],
    metric: '+185% Walk-Ins & Direct Calls',
    baseConvRate: 0.045,
  },
  [IndustryType.ECOMMERCE]: {
    module: 'Meta Reels Shopper Funnel + High-Intent Shopping Search',
    spec: 'Catalog-synced dynamic product ads paired with bottom-funnel Google Shopping & Brand Search.',
    deliverables: ['Meta Conversions API (Server-Side)', 'Dynamic Retargeting Matrix', 'AEO Product Schema Indexing'],
    metric: '4.2x Verified Pipeline ROAS',
    baseConvRate: 0.028,
  },
  [IndustryType.REAL_ESTATE]: {
    module: 'Hyper-Local Geo-Intent Search + Project Walkthrough Funnels',
    spec: 'Location-pinned Google Search capture & Meta high-net-worth buyer qualification creatives.',
    deliverables: ['Geo-Fenced Meta Lead Ads', 'High-Intent Property Search Ads', 'Local Map Pack Authority'],
    metric: '-38% Cost Per Site Visit',
    baseConvRate: 0.032,
  },
  [IndustryType.SAAS]: {
    module: 'Problem-Aware Search Capture + Founder Authority Engine',
    spec: 'Technical comparison SEO/AEO pages paired with LinkedIn & Meta demand-capture retargeting.',
    deliverables: ['Programmatic Comparison SEO/AEO', 'LinkedIn & Meta Demo Funnels', 'Full-Funnel Attribution Events'],
    metric: '-31% Demo CAC',
    baseConvRate: 0.035,
  },
};

const BOTTLENECK_ARCHITECTURE_OVERRIDES: Record<
  BottleneckType,
  {
    timeline: string;
    speedBudget: string;
    liftLabel: string;
    liftMultiplier: number;
    diagnosisPrefix: string;
    webLayerTitle: string;
    webSpec: string;
    webDeliverables: string[];
    crmLayerTitle: string;
    crmSpec: string;
    crmDeliverables: string[];
    crmMetric: string;
  }
> = {
  [BottleneckType.SLOW_WEBSITE]: {
    timeline: '2–3 Weeks',
    speedBudget: '< 85ms Edge TTFB · 99+ CWV',
    liftLabel: '+64% Landing-to-Lead Conversion',
    liftMultiplier: 1.64,
    diagnosisPrefix: 'Eliminates mobile bounce and checkout drop-off via sub-100ms React/Next.js edge architecture.',
    webLayerTitle: 'Next.js Edge Storefront & Frictionless UPI/Funnel UI',
    webSpec: 'Zero-bloat TypeScript frontend, instant route prefetching, Swiss grid persuasion hierarchy, and 1-tap capture.',
    webDeliverables: ['Custom React/Next.js Architecture', 'Core Web Vitals 99+ Optimization', '1-Tap UPI & Mobile-First Lead Flow'],
    crmLayerTitle: 'Instant WhatsApp Abandonment & Lead Recovery',
    crmSpec: 'Real-time webhook triggers instant WhatsApp follow-up within 6 seconds of form or cart intent.',
    crmDeliverables: ['WhatsApp Cloud API Trigger', 'Automated Drop-Off Recovery', 'Live Conversion Telemetry'],
    crmMetric: '< 6s First Response',
  },
  [BottleneckType.UNPREDICTABLE_LEADS]: {
    timeline: '2–3 Weeks',
    speedBudget: '100% Server-Side Event Match',
    liftLabel: '+140% Predictable Qualified Inbound',
    liftMultiplier: 1.85,
    diagnosisPrefix: 'Replaces erratic word-of-mouth with tracked Meta/Google acquisition loops and dedicated conversion landers.',
    webLayerTitle: 'High-Converting Dedicated Campaign Landing System',
    webSpec: 'Message-matched landing architecture engineered for paid traffic quality scores and instant clarity.',
    webDeliverables: ['Dedicated Offer Landing Pages', 'Server-Side Pixel & CAPI Setup', 'A/B Headline & Proof Blocks'],
    crmLayerTitle: 'AI Lead Scoring & Instant WhatsApp Qualification',
    crmSpec: 'Filters low-intent inquiries automatically and routes sales-ready prospects straight to your closer.',
    crmDeliverables: ['Autonomous Budget/Timeline Filter', 'Instant Calendar & WhatsApp Routing', 'CRM Pipeline Stage Sync'],
    crmMetric: '3.1x Lead-to-Close Velocity',
  },
  [BottleneckType.MANUAL_SALES]: {
    timeline: '3–4 Weeks',
    speedBudget: '24/7 Autonomous Dispatch',
    liftLabel: '78% Reduction in Manual Follow-Up',
    liftMultiplier: 1.72,
    diagnosisPrefix: 'Replaces spreadsheet chaos and missed calls with autonomous WhatsApp qualification and CRM pipeline sync.',
    webLayerTitle: 'Interactive Self-Qualification Portal & Booking Hub',
    webSpec: 'Captures structured buyer requirements, appointment slots, and scope directly on the web platform.',
    webDeliverables: ['Interactive Scope/Booking Configurator', 'Structured Webhook Payload Engine', 'Custom Internal Admin Dashboard'],
    crmLayerTitle: 'Autonomous AI + WhatsApp Cloud CRM Engine',
    crmSpec: '24/7 conversational qualification, automated brochure/catalog dispatch, and multi-day follow-up sequences.',
    crmDeliverables: ['WhatsApp Business Cloud Automation', 'Custom CRM Pipeline & Deal Alerts', 'Automated Proposal & Reminder Flows'],
    crmMetric: 'Zero Missed Inquiries · 24/7',
  },
  [BottleneckType.ZERO_VISIBILITY]: {
    timeline: '3–4 Weeks',
    speedBudget: 'Schema + AEO Entity Indexed',
    liftLabel: '+210% Search, Map & Answer Engine Reach',
    liftMultiplier: 1.78,
    diagnosisPrefix: 'Builds compounding organic authority across Google Maps, Search, AI Answer Engines, and high-retention Reels.',
    webLayerTitle: 'Technical SEO, Local Map Hub & AEO Web Architecture',
    webSpec: 'Semantic HTML5 architecture, JSON-LD entity graphs, programmatic regional/topic hubs, and sub-second crawl speed.',
    webDeliverables: ['Technical SEO & JSON-LD Schema', 'Google Business & AEO Answer Blocks', 'High-Speed Content & Case Hubs'],
    crmLayerTitle: 'Organic & Social-to-WhatsApp Lead Capture Loop',
    crmSpec: 'Converts Google Map visitors and Instagram Reels viewers into tracked WhatsApp bookings and nurture pipelines.',
    crmDeliverables: ['Click-to-WhatsApp Organic Triggers', 'Instagram DM-to-CRM Bridge', 'Automated Smart QR Review Engine'],
    crmMetric: 'Compounding Organic Pipeline',
  },
};

const INDUSTRY_CODES: Record<IndustryType, string> = {
  [IndustryType.LOCAL_BUSINESS]: 'LOCAL',
  [IndustryType.ECOMMERCE]: 'ECOM',
  [IndustryType.REAL_ESTATE]: 'PROP',
  [IndustryType.SAAS]: 'SAAS',
};

const BOTTLENECK_CODES: Record<BottleneckType, string> = {
  [BottleneckType.SLOW_WEBSITE]: 'WEB',
  [BottleneckType.UNPREDICTABLE_LEADS]: 'ACQ',
  [BottleneckType.MANUAL_SALES]: 'CRM',
  [BottleneckType.ZERO_VISIBILITY]: 'SEO',
};

export function generateSystemBlueprint(
  industry: IndustryType,
  bottleneck: BottleneckType,
  monthlyVisitors: number = 5000
): SystemBlueprint {
  const startPerf = typeof performance !== 'undefined' ? performance.now() : Date.now();
  const safeVisitors = Math.max(500, Math.min(250000, Math.round(monthlyVisitors)));
  const indConfig = INDUSTRY_TRAFFIC_LAYER[industry];
  const botConfig = BOTTLENECK_ARCHITECTURE_OVERRIDES[bottleneck];

  const baselineLeads = Math.max(8, Math.round(safeVisitors * indConfig.baseConvRate));
  const monthlyQualifiedPipeline = Math.round(baselineLeads * botConfig.liftMultiplier);
  const projectedAdditionalLeads = Math.max(5, monthlyQualifiedPipeline - baselineLeads);

  const blueprintCode = `SL-${INDUSTRY_CODES[industry]}-${BOTTLENECK_CODES[bottleneck]}`;

  const layers: [BlueprintLayer, BlueprintLayer, BlueprintLayer] = [
    {
      id: 'layer-traffic',
      layerTag: 'Demand & Traffic Layer',
      title: indConfig.module,
      moduleName: 'Acquisition & Visibility Layer',
      architectureSpec: indConfig.spec,
      deliverables: indConfig.deliverables,
      latencyOrMetric: indConfig.metric,
      accentColor: 'amber',
    },
    {
      id: 'layer-web',
      layerTag: 'High-Speed Web Architecture',
      title: botConfig.webLayerTitle,
      moduleName: 'Core Conversion Platform',
      architectureSpec: botConfig.webSpec,
      deliverables: botConfig.webDeliverables,
      latencyOrMetric: botConfig.speedBudget,
      accentColor: 'indigo',
    },
    {
      id: 'layer-crm',
      layerTag: 'AI & WhatsApp Conversion Engine',
      title: botConfig.crmLayerTitle,
      moduleName: 'Autonomous Revenue & CRM Layer',
      architectureSpec: botConfig.crmSpec,
      deliverables: botConfig.crmDeliverables,
      latencyOrMetric: botConfig.crmMetric,
      accentColor: 'emerald',
    },
  ];

  const summaryDiagnosis = `${industry}: ${botConfig.diagnosisPrefix}`;

  const whatsappPreviewText = [
    `Hello SkyLine Technologies Team,`,
    `I generated Blueprint [${blueprintCode}] on your 60-Second System Architect and would like my Free 60s Teardown.`,
    ``,
    `• Industry: ${industry}`,
    `• Primary Bottleneck: ${bottleneck}`,
    `• Monthly Reach Baseline: ~${safeVisitors.toLocaleString('en-IN')} visitors/mo`,
    `• Traffic Layer: ${layers[0].title}`,
    `• Web Layer: ${layers[1].title}`,
    `• CRM Layer: ${layers[2].title}`,
    `• Est. Deployment: ${botConfig.timeline}`,
  ].join('\n');

  const whatsappUrl = `https://wa.me/${SKYLINE_WHATSAPP_NUMBER}?text=${encodeURIComponent(whatsappPreviewText)}`;

  const endPerf = typeof performance !== 'undefined' ? performance.now() : Date.now();
  recordTelemetryEvent('blueprint_computed', 'ok', endPerf - startPerf, {
    blueprintCode,
    visitors: safeVisitors,
  });

  return {
    blueprintCode,
    industry,
    bottleneck,
    estimatedTimeline: botConfig.timeline,
    targetSpeedBudget: botConfig.speedBudget,
    projectedConversionLift: botConfig.liftLabel,
    monthlyQualifiedPipeline,
    projectedAdditionalLeads,
    summaryDiagnosis,
    layers,
    whatsappUrl,
    whatsappPreviewText,
  };
}

export function buildReferralWhatsAppUrl(referrerName?: string, referredBusiness?: string): string {
  const cleanReferrer = sanitizeInputText(referrerName || '', 80) || 'Partner';
  const cleanTarget =
    sanitizeInputText(referredBusiness || '', 120) || 'a business looking for a digital upgrade';
  const text = [
    `Hello SkyLine Technologies Team,`,
    `I'd like to refer a client under the 15% Partner Referral Program.`,
    ``,
    `• My Name: ${cleanReferrer}`,
    `• Referred Business / Context: ${cleanTarget}`,
    `Please share the next steps to register this introduction.`,
  ].join('\n');
  return `https://wa.me/${SKYLINE_WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}

const INDIAN_MOBILE_REGEX = /^(\+?91[\-\s]?)?[6-9]\d{9}$/;
const INTL_PHONE_REGEX = /^\+?[1-9]\d{7,14}$/;
const RFC5322_EMAIL_REGEX =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;

export function validateProposalForm(
  input: ProposalFormInput,
  options?: { enforceIdempotency?: boolean; nowMs?: number }
): ProposalValidationResult {
  const startPerf = typeof performance !== 'undefined' ? performance.now() : Date.now();
  const errors: ProposalValidationResult['errors'] = {};

  const sanitizedName = sanitizeInputText(input.nameOrCompany, 80);
  const sanitizedContact = sanitizeInputText(input.contact, 120);
  const rawScope = sanitizeInputText(input.projectScope, 600);
  const effectiveScope =
    rawScope.length > 0
      ? rawScope
      : sanitizeInputText(input.fallbackBlueprintSummary || '', 600);

  if (sanitizedName.length < 2 || sanitizedName.length > 80) {
    errors.nameOrCompany = 'Enter your name or company name (2 to 80 characters, no HTML).';
  }

  const normalizedPhone = sanitizedContact.replace(/[\s\-()]/g, '');
  const isValidIndianMobile = INDIAN_MOBILE_REGEX.test(normalizedPhone);
  const isValidIntlPhone = INTL_PHONE_REGEX.test(normalizedPhone);
  const isValidEmail = RFC5322_EMAIL_REGEX.test(sanitizedContact);

  if (!sanitizedContact) {
    errors.contact = 'Enter a valid Indian/International WhatsApp number (+91...) or email address.';
  } else if (!isValidIndianMobile && !isValidIntlPhone && !isValidEmail) {
    errors.contact =
      'Provide a valid 10-digit Indian mobile (+91 98765 43210), E.164 phone, or RFC-5322 email.';
  }

  const allowlistSet = new Set<string>(ALLOWLISTED_SERVICE_PILLARS);
  const validPillars = (input.selectedPillars || []).filter((p) => allowlistSet.has(p));

  if (validPillars.length === 0) {
    errors.selectedPillars = 'Select at least one allowlisted capability pillar.';
  } else if (validPillars.length !== (input.selectedPillars || []).length) {
    errors.selectedPillars = 'One or more selected service pillars are not in the allowlist.';
  }

  if (effectiveScope.length < 10) {
    errors.projectScope = 'Briefly describe your current bottleneck or goal (at least 10 characters).';
  }

  const idempotencyKey = computeIdempotencyKey({
    nameOrCompany: sanitizedName,
    contact: sanitizedContact,
    selectedPillars: validPillars,
    projectScope: effectiveScope,
  });

  if (Object.keys(errors).length === 0 && options?.enforceIdempotency) {
    const lockCheck = checkAndLockIdempotency(idempotencyKey, options.nowMs);
    if (!lockCheck.allowed) {
      errors.idempotency = `Duplicate submission locked. Please wait ${lockCheck.retryAfterSeconds}s before resending the identical inquiry.`;
      const endPerf = typeof performance !== 'undefined' ? performance.now() : Date.now();
      recordTelemetryEvent('lead_dispatch', 'error', endPerf - startPerf, {
        statusCode: 429,
        idempotencyKey,
      });
      return {
        valid: false,
        statusCode: 429,
        errors,
      };
    }
  }

  const isValid = Object.keys(errors).length === 0;
  const endPerf = typeof performance !== 'undefined' ? performance.now() : Date.now();
  recordTelemetryEvent('lead_dispatch', isValid ? 'ok' : 'error', endPerf - startPerf, {
    statusCode: isValid ? 200 : 400,
    idempotencyKey,
  });

  return {
    valid: isValid,
    statusCode: isValid ? 200 : 400,
    sanitizedPayload: isValid
      ? {
          name: sanitizedName,
          contact: sanitizedContact,
          pillars: validPillars,
          scope: effectiveScope,
          idempotencyKey,
        }
      : undefined,
    errors,
  };
}

export function formatProposalMessage(input: ProposalFormInput): string {
  const cleanName = sanitizeInputText(input.nameOrCompany, 80);
  const cleanContact = sanitizeInputText(input.contact, 120);
  const cleanScope =
    sanitizeInputText(input.projectScope, 600) ||
    sanitizeInputText(input.fallbackBlueprintSummary || '', 600);
  const cleanPillars = (input.selectedPillars || []).map((p) => sanitizeInputText(p, 80));

  return [
    `Hello SkyLine Technologies,`,
    `I am requesting a 60-Second System Audit & Project Proposal.`,
    ``,
    `• Name / Company: ${cleanName}`,
    `• Contact (WhatsApp / Email): ${cleanContact}`,
    `• Selected Pillars: ${cleanPillars.join(', ')}`,
    `• Project Scope: ${cleanScope}`,
  ].join('\n');
}

export function buildProposalWhatsAppUrl(input: ProposalFormInput): string {
  const message = formatProposalMessage(input);
  return `https://wa.me/${SKYLINE_WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export function buildProposalMailtoUrl(input: ProposalFormInput): string {
  const cleanName = sanitizeInputText(input.nameOrCompany, 80);
  const subject = `Project Proposal & 60s System Audit — ${cleanName}`;
  const body = formatProposalMessage(input);
  return `mailto:${SKYLINE_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

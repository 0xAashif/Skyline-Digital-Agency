export type SemanticAccentColor = 'emerald' | 'indigo' | 'violet' | 'amber' | 'cyan' | 'rose';

export interface HeroOrbItem {
  id: string;
  shortCode: string;
  label: string;
  targetCapabilityId: string;
  accentColor: SemanticAccentColor;
  targetSlideIndex: number;
  liveMetricBadge: string;
}

export const HERO_SERVICE_ORBS: HeroOrbItem[] = [
  {
    id: 'orb-ai',
    shortCode: 'AI',
    label: 'AI Automation & Agents',
    targetCapabilityId: 'ai-crm',
    accentColor: 'violet',
    targetSlideIndex: 1,
    liveMetricBadge: '< 6s WhatsApp AI SLA',
  },
  {
    id: 'orb-ads',
    shortCode: 'ADS',
    label: 'Meta & Google Ads',
    targetCapabilityId: 'performance-ads',
    accentColor: 'amber',
    targetSlideIndex: 3,
    liveMetricBadge: '₹14.8L Pipeline · 4.2x ROAS',
  },
  {
    id: 'orb-saas',
    shortCode: 'SAAS',
    label: 'SaaS & Web Portals',
    targetCapabilityId: 'web-engineering',
    accentColor: 'indigo',
    targetSlideIndex: 0,
    liveMetricBadge: 'Next.js 15 · 99+ CWV',
  },
  {
    id: 'orb-web',
    shortCode: 'WEB',
    label: 'Full-Stack Web Systems',
    targetCapabilityId: 'web-engineering',
    accentColor: 'emerald',
    targetSlideIndex: 0,
    liveMetricBadge: '84ms Edge TTFB · ₹0 Cloud Waste',
  },
  {
    id: 'orb-seo',
    shortCode: 'SEO',
    label: 'Technical SEO & AEO',
    targetCapabilityId: 'seo-aeo',
    accentColor: 'rose',
    targetSlideIndex: 5,
    liveMetricBadge: '+210% Organic & AI Citations',
  },
  {
    id: 'orb-crm',
    shortCode: 'CRM',
    label: 'WhatsApp & Custom CRM',
    targetCapabilityId: 'ai-crm',
    accentColor: 'cyan',
    targetSlideIndex: 1,
    liveMetricBadge: '+91 Official Cloud API Live',
  },
  {
    id: 'orb-local',
    shortCode: 'LOCAL',
    label: 'Local Business Growth Engine',
    targetCapabilityId: 'local-business',
    accentColor: 'amber',
    targetSlideIndex: 2,
    liveMetricBadge: '4.9★ Google Map Pack #1',
  },
];

export interface HeroPitchSlide {
  id: string;
  categoryTag: string;
  title: string;
  subtitle: string;
  imageUrl: string;
  fallbackSvgUrl: string;
  primaryMetric: string;
  secondaryMetric: string;
  liveStatusLabel: string;
  indianContextChip: string;
  accentColor: SemanticAccentColor;
  targetCapabilityId: string;
}

export const HERO_PITCH_SLIDES: HeroPitchSlide[] = [
  {
    id: 'slide-web-saas',
    categoryTag: 'WEB & SAAS ARCHITECTURE',
    title: 'Full-Stack Web & SaaS Platforms',
    subtitle: 'Indore • Bengaluru Edge Node | 99 CWV | ₹0 Cloud Waste',
    imageUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=85',
    fallbackSvgUrl: '/assets/hero-system-preview.svg',
    primaryMetric: '99 CWV · 84ms TTFB',
    secondaryMetric: '₹0 Cloud Waste',
    liveStatusLabel: 'INDORE • BENGALURU EDGE NODE',
    indianContextChip: 'Next.js 15 · Mumbai & Hyderabad CDN',
    accentColor: 'indigo',
    targetCapabilityId: 'web-engineering',
  },
  {
    id: 'slide-ai-whatsapp',
    categoryTag: 'AUTONOMOUS AI & CRM',
    title: 'Autonomous AI & WhatsApp CRM',
    subtitle: '< 6s WhatsApp Business Chat UI with instant +91 lead qualification & catalog dispatch.',
    imageUrl: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=1200&q=85',
    fallbackSvgUrl: '/assets/bento-ai-crm.svg',
    primaryMetric: '< 6s WhatsApp SLA',
    secondaryMetric: '+91 Instant Bot Routing',
    liveStatusLabel: 'OFFICIAL CLOUD API LIVE',
    indianContextChip: 'WhatsApp Business API · Hindi/English AI',
    accentColor: 'violet',
    targetCapabilityId: 'ai-crm',
  },
  {
    id: 'slide-local-business',
    categoryTag: 'LOCAL BUSINESS DIGITIZATION',
    title: 'Local Business Growth Engine',
    subtitle: 'Google Map Pack #1 (MP & Pan-India) • Smart QR 4.9★ Review Standee',
    imageUrl: 'https://images.unsplash.com/photo-1556740738-b6a63e27c4df?auto=format&fit=crop&w=1200&q=85',
    fallbackSvgUrl: '/assets/project-carve-edtech.svg',
    primaryMetric: '4.9★ Google Map Pack #1',
    secondaryMetric: '+185% Walk-In & Call Volume',
    liveStatusLabel: 'SMART QR 4.9★ REVIEW STANDEE',
    indianContextChip: 'Indore · Bhopal · Mumbai · Delhi NCR',
    accentColor: 'amber',
    targetCapabilityId: 'local-business',
  },
  {
    id: 'slide-meta-google-ads',
    categoryTag: 'PAID DEMAND ACQUISITION',
    title: 'High-ROAS Meta & Google Ads',
    subtitle: '₹14.8L Pipeline Generated • 4.2x Verified ROAS with Server-Side CAPI.',
    imageUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1200&q=85',
    fallbackSvgUrl: '/assets/project-360-proptech.svg',
    primaryMetric: '4.2x Verified ROAS',
    secondaryMetric: '₹14.8L Pipeline Generated',
    liveStatusLabel: 'SERVER-SIDE CAPI ACTIVE',
    indianContextChip: '₹ INR Cost-Per-Lead Attribution',
    accentColor: 'amber',
    targetCapabilityId: 'performance-ads',
  },
  {
    id: 'slide-headless-ecom',
    categoryTag: 'HEADLESS D2C COMMERCE',
    title: 'Headless E-Commerce & D2C Stores',
    subtitle: '1-Tap UPI (GPay / PhonePe / Paytm) Checkout + 8s WhatsApp Cart Recovery.',
    imageUrl: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&w=1200&q=85',
    fallbackSvgUrl: '/assets/project-aurascale-d2c.svg',
    primaryMetric: '+64% Checkout Lift',
    secondaryMetric: '1-Tap UPI Checkout',
    liveStatusLabel: 'GPAY • PHONEPE • PAYTM READY',
    indianContextChip: 'Razorpay / Cashfree 1-Tap UPI Flow',
    accentColor: 'emerald',
    targetCapabilityId: 'conversion-ux',
  },
  {
    id: 'slide-seo-aeo-reels',
    categoryTag: 'ORGANIC SEARCH & REELS',
    title: 'Technical SEO, AEO & Viral Reels',
    subtitle: '+210% Organic Search & ChatGPT/Perplexity Brand Citations across India & Global.',
    imageUrl: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1200&q=85',
    fallbackSvgUrl: '/assets/bento-web-cloud.svg',
    primaryMetric: '+210% Organic Reach',
    secondaryMetric: 'ChatGPT & Gemini Citations',
    liveStatusLabel: 'AI ANSWER ENGINE INDEXED',
    indianContextChip: 'JSON-LD Entity Graph · High-Retention Reels',
    accentColor: 'rose',
    targetCapabilityId: 'seo-aeo',
  },
];

export interface BentoSolutionCard {
  id: string;
  categoryBadge: string;
  title: string;
  description: string;
  metricCallout: string;
  indianContextOverlay: string;
  accentColor: SemanticAccentColor;
  featured?: boolean;
  targetCapabilityId: string;
  imageUrl: string;
  fallbackSvgUrl: string;
}

export const BENTO_SOLUTIONS: BentoSolutionCard[] = [
  {
    id: 'bento-web',
    categoryBadge: 'WEB & SAAS CORE',
    title: 'Web & Custom SaaS Portals',
    description: 'Sub-100ms Next.js platforms, custom ERPs, and high-converting landing systems.',
    metricCallout: '99+ Core Web Vitals',
    indianContextOverlay: 'Indore • Bengaluru Edge',
    accentColor: 'indigo',
    targetCapabilityId: 'web-engineering',
    imageUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=900&q=80',
    fallbackSvgUrl: '/assets/bento-web-cloud.svg',
  },
  {
    id: 'bento-crm',
    categoryBadge: 'AUTONOMOUS AI CRM',
    title: 'AI & WhatsApp CRM Systems',
    description: '6-second automated +91 lead qualification, catalog flows, and CRM pipeline sync.',
    metricCallout: '< 6s Lead Response',
    indianContextOverlay: '+91 Official WhatsApp API',
    accentColor: 'violet',
    featured: true,
    targetCapabilityId: 'ai-crm',
    imageUrl: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=900&q=80',
    fallbackSvgUrl: '/assets/bento-ai-crm.svg',
  },
  {
    id: 'bento-local',
    categoryBadge: 'LOCAL BUSINESS ENGINE',
    title: 'Local Business Growth & Digitization',
    description: 'Google Map Pack #1, WhatsApp booking, local Reels ads & Smart QR review standees.',
    metricCallout: '4.9★ Google Map Pack #1',
    indianContextOverlay: 'Smart QR Standee • Clinics & Retail',
    accentColor: 'amber',
    featured: true,
    targetCapabilityId: 'local-business',
    imageUrl: 'https://images.unsplash.com/photo-1556740738-b6a63e27c4df?auto=format&fit=crop&w=900&q=80',
    fallbackSvgUrl: '/assets/project-carve-edtech.svg',
  },
  {
    id: 'bento-ads',
    categoryBadge: 'PAID ACQUISITION',
    title: 'Performance Ads & Funnels',
    description: 'High-intent Google Search & Meta Reels funnels with ₹ INR Server-Side CAPI.',
    metricCallout: '4.2x Pipeline ROAS',
    indianContextOverlay: '₹14.8L Verified Pipeline',
    accentColor: 'amber',
    targetCapabilityId: 'performance-ads',
    imageUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=900&q=80',
    fallbackSvgUrl: '/assets/project-360-proptech.svg',
  },
  {
    id: 'bento-ecom',
    categoryBadge: 'D2C STOREFRONTS',
    title: 'E-Commerce & Conversion UX',
    description: 'Headless storefronts, 1-Tap UPI checkouts (GPay/PhonePe), and WhatsApp cart recovery.',
    metricCallout: '+64% Checkout Lift',
    indianContextOverlay: '1-Tap UPI • GPay & PhonePe',
    accentColor: 'emerald',
    targetCapabilityId: 'conversion-ux',
    imageUrl: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&w=900&q=80',
    fallbackSvgUrl: '/assets/project-aurascale-d2c.svg',
  },
  {
    id: 'bento-seo',
    categoryBadge: 'ORGANIC & AI SEARCH',
    title: 'Technical SEO, AEO & Social',
    description: 'Google Search dominance, AI Answer Engine schemas, and high-retention Reels.',
    metricCallout: '+210% Organic Traffic',
    indianContextOverlay: 'ChatGPT & Perplexity Citations',
    accentColor: 'rose',
    targetCapabilityId: 'seo-aeo',
    imageUrl: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=900&q=80',
    fallbackSvgUrl: '/assets/hero-system-preview.svg',
  },
];

export interface ShowcaseProject {
  id: string;
  statusBadge: string;
  accentColor: SemanticAccentColor;
  category: string;
  title: string;
  locationTag: string;
  tags: string;
  metricsHeadline: string;
  metricsSub: string;
  architectureNodes: string[];
  accentMetric: string;
  imageUrl: string;
  fallbackSvgUrl: string;
  problemStatement: string;
  architectureSummary: string;
  impactMetrics: { label: string; before: string; after: string; delta: string }[];
  stackPills: string[];
}

export const SHOWCASE_PROJECTS: ShowcaseProject[] = [
  {
    id: 'project-360-estate',
    statusBadge: 'LIVE PRODUCTION',
    accentColor: 'emerald',
    category: 'REAL ESTATE & PROPTECH',
    title: '360 Views Property Hub',
    locationTag: 'Indore • Mumbai Luxury Developments',
    tags: 'Next.js Edge • Meta CAPI • WhatsApp CRM',
    metricsHeadline: '-38% Cost Per Site Visit',
    metricsSub: 'Luxury Indian residential portal with instant +91 WhatsApp buyer qualification.',
    architectureNodes: ['Next.js Edge UI', '360° Tour Viewport', 'WhatsApp Routing'],
    accentMetric: '99 CWV · 2.8x Velocity',
    imageUrl: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=900&q=80',
    fallbackSvgUrl: '/assets/project-360-proptech.svg',
    problemStatement:
      'High ad spend leakage on generic property portals with 14+ hour sales follow-up delays and unqualified broker inquiries.',
    architectureSummary:
      'Deployed a sub-100ms Next.js interactive 360° tower explorer wired to Meta Conversions API (CAPI) and an automated 6-second WhatsApp floor-plan + site-visit scheduler.',
    impactMetrics: [
      { label: 'Cost Per Qualified Site Visit', before: '₹4,200', after: '₹2,600', delta: '-38% CAC' },
      { label: 'WhatsApp Brochure & Slot SLA', before: '14 Hours', after: '5.4 Seconds', delta: '99.9% Faster' },
      { label: 'Mobile Core Web Vitals', before: '54 / 100', after: '99 / 100', delta: '84ms TTFB' },
    ],
    stackPills: ['Next.js 15', 'TypeScript', 'WhatsApp Cloud API', 'Meta Server CAPI', 'PostgreSQL'],
  },
  {
    id: 'project-carve-portal',
    statusBadge: 'LIVE PRODUCTION',
    accentColor: 'indigo',
    category: 'INSTITUTIONAL ERP & FUNNEL',
    title: 'Carve Academy ERP',
    locationTag: 'Central India Campus Network',
    tags: 'Custom ERP • Local SEO/AEO • Counselor Bot',
    metricsHeadline: '+210% Admission Inquiries',
    metricsSub: 'Automated parent inquiries, digital fee/UPI portal, and instant counselor dispatch.',
    architectureNodes: ['Admission Portal', 'Map Pack #1', 'Instant CRM Alerts'],
    accentMetric: '84ms TTFB · Zero Drop-Off',
    imageUrl: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=900&q=80',
    fallbackSvgUrl: '/assets/project-carve-edtech.svg',
    problemStatement:
      'Seasonal admission bottlenecks, fragmented spreadsheet tracking, and low visibility in regional Google Map Pack searches.',
    architectureSummary:
      'Engineered a unified student/parent admission ERP with automated WhatsApp prospectus delivery, counselor round-robin assignment, and #1 Google Map Pack schema authority.',
    impactMetrics: [
      { label: 'Verified Admission Inquiries', before: '310 / season', after: '960 / season', delta: '+210% Lift' },
      { label: 'Counselor First-Touch Time', before: '6.5 Hours', after: '< 6 Seconds', delta: '24/7 Bot' },
      { label: 'Regional Google Map Ranking', before: 'Position #9', after: 'Map Pack #1', delta: '+3.1x Calls' },
    ],
    stackPills: ['React 19', 'Node.js', 'PostgreSQL', 'WhatsApp Cloud API', 'JSON-LD Schema'],
  },
  {
    id: 'project-aurascale-d2c',
    statusBadge: 'LIVE DEMO',
    accentColor: 'violet',
    category: 'HEADLESS D2C COMMERCE',
    title: 'AuraScale D2C Store',
    locationTag: 'Pan-India D2C Apparel & Lifestyle',
    tags: '1-Tap UPI • Reels Funnel • Cart Recovery',
    metricsHeadline: '4.2x Verified ROAS',
    metricsSub: 'Sub-second Indian D2C storefront paired with 1-Tap UPI & 8s WhatsApp cart recovery.',
    architectureNodes: ['1-Tap UPI Flow', 'Server CAPI', 'WhatsApp Recovery'],
    accentMetric: '+64% Checkout Lift',
    imageUrl: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=900&q=80',
    fallbackSvgUrl: '/assets/project-aurascale-d2c.svg',
    problemStatement:
      '68% mobile checkout drop-off on bloated themes and poor attribution from Instagram Reels campaigns.',
    architectureSummary:
      'Replaced legacy storefront with an edge-cached headless commerce UI featuring 1-Tap UPI (GPay / PhonePe / Paytm) checkout and automated WhatsApp abandoned-cart discount triggers.',
    impactMetrics: [
      { label: 'Mobile Checkout Conversion', before: '1.8%', after: '2.95%', delta: '+64% Lift' },
      { label: 'Abandoned Carts Recovered', before: '4.2%', after: '28.4%', delta: 'WhatsApp Bot' },
      { label: 'Blended Meta Reels ROAS', before: '1.9x', after: '4.2x', delta: 'Server CAPI' },
    ],
    stackPills: ['Next.js Storefront', '1-Tap UPI SDK', 'WhatsApp Cart Bot', 'Meta Ads API', 'Tailwind CSS'],
  },
  {
    id: 'project-apex-local',
    statusBadge: 'LOCAL GROWTH',
    accentColor: 'amber',
    category: 'LOCAL CLINIC & SHOWROOM ENGINE',
    title: 'Apex Local Clinic & Retail',
    locationTag: 'Indore • Bhopal Multi-Branch',
    tags: 'Google Map #1 • Smart QR Reviews • WhatsApp Booking',
    metricsHeadline: '+185% Patient & Showroom Bookings',
    metricsSub: 'Automated Google Map ranking, reception QR review standee, and WhatsApp slot booking.',
    architectureNodes: ['GBP Map Pack #1', 'Smart QR Standee', 'WhatsApp Booking'],
    accentMetric: '4.9★ Rating · 3.2x Calls',
    imageUrl: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=900&q=80',
    fallbackSvgUrl: '/assets/bento-ai-crm.svg',
    problemStatement:
      'Depending solely on word-of-mouth with stagnant Google reviews (3.8★) and missed reception phone calls during peak clinic hours.',
    architectureSummary:
      'Implemented Local GBP Map Pack #1 optimization, physical Smart QR 5-Star Review Standees at reception desks, and an automated WhatsApp appointment slot confirmation flow.',
    impactMetrics: [
      { label: 'Monthly Walk-Ins & Slot Bookings', before: '140 / mo', after: '399 / mo', delta: '+185% Growth' },
      { label: 'Verified Google Rating', before: '3.9★ (48 reviews)', after: '4.9★ (410+ reviews)', delta: 'Smart QR Engine' },
      { label: 'Direct Direction & Call Taps', before: '95 / mo', after: '310 / mo', delta: '3.2x Volume' },
    ],
    stackPills: ['Google Business Profile API', 'Smart QR Review Engine', 'WhatsApp Booking Bot', 'Local Reels Ads'],
  },
];

export interface TickerItem {
  name: string;
  category: string;
  accentColor: SemanticAccentColor;
}

export const STACK_TICKER_ROW_1: TickerItem[] = [
  { name: 'Next.js 15', category: 'Web Core', accentColor: 'indigo' },
  { name: 'React 19', category: 'UI Runtime', accentColor: 'indigo' },
  { name: 'TypeScript', category: 'Type Safety', accentColor: 'indigo' },
  { name: 'Python', category: 'Backend & AI', accentColor: 'violet' },
  { name: 'AI / LLMs', category: 'Autonomous Agents', accentColor: 'violet' },
  { name: 'PostgreSQL', category: 'Data Layer', accentColor: 'cyan' },
  { name: 'Tailwind CSS', category: 'Design System', accentColor: 'emerald' },
  { name: 'Docker & AWS', category: 'Cloud DevOps', accentColor: 'cyan' },
];

export const STACK_TICKER_ROW_2: TickerItem[] = [
  { name: 'Meta Ads API', category: 'Paid Social', accentColor: 'amber' },
  { name: 'Google Ads Search', category: 'High-Intent', accentColor: 'amber' },
  { name: 'Google Map Pack #1', category: 'Local Growth', accentColor: 'amber' },
  { name: 'Technical SEO & AEO', category: 'AI Search', accentColor: 'rose' },
  { name: 'WhatsApp Cloud API', category: 'Instant CRM', accentColor: 'emerald' },
  { name: 'Smart QR Review Systems', category: 'Local Trust', accentColor: 'amber' },
  { name: 'High-Retention Reels', category: 'Brand Authority', accentColor: 'rose' },
  { name: 'Core Web Vitals 99+', category: 'Conversion Speed', accentColor: 'emerald' },
];

export type CapabilityPreviewMode =
  | 'web-vitals'
  | 'whatsapp-ai'
  | 'local-business'
  | 'ads-roas'
  | 'seo-aeo'
  | 'social-retention'
  | 'funnel-ux';

export interface CapabilityPillar {
  id: string;
  categoryLabel: string;
  shortTab: string;
  badgeTag: string;
  accentColor: SemanticAccentColor;
  title: string;
  leadSentence: string;
  subtitle: string;
  outcomeMetric: string;
  timeline: string;
  deliverables: string[];
  architectureSpecs: { key: string; val: string }[];
  previewMode: CapabilityPreviewMode;
}

export const CAPABILITY_PILLARS: CapabilityPillar[] = [
  {
    id: 'local-business',
    categoryLabel: 'LOCAL BUSINESS GROWTH',
    shortTab: 'Local Businesses',
    badgeTag: 'Map Pack #1 & WhatsApp Booking',
    accentColor: 'amber',
    title: 'Local Business Growth & Digitization',
    leadSentence: 'Complete digital dominance for Clinics, Real Estate, Showrooms, Restaurants & Retail.',
    subtitle:
      'Turn local searches into daily walk-ins and WhatsApp bookings with Google Business Profile #1 ranking, automated WhatsApp catalog/appointment bots, local Instagram Reels ads, and Smart QR Review systems.',
    outcomeMetric: '+185% Direct Calls, Walk-Ins & WhatsApp Bookings',
    timeline: '7–14 Days Launch',
    deliverables: [
      'Google Business Profile #1 Map Ranking',
      'Automated WhatsApp Booking & Catalog',
      'Geo-Fenced Local Meta & Reels Ads',
      'Smart QR Code 5-Star Review System',
      'High-Speed Local Storefront Website',
    ],
    architectureSpecs: [
      { key: 'Ideal For', val: 'Clinics · Showrooms · Real Estate · Retail · Cafes' },
      { key: 'Capture Flow', val: 'Google Maps + Reels -> Instant WhatsApp Booking' },
      { key: 'Reputation', val: 'Automated QR Review Growth Engine' },
    ],
    previewMode: 'local-business',
  },
  {
    id: 'web-engineering',
    categoryLabel: 'WEB & SAAS ARCHITECTURE',
    shortTab: 'Web Engineering',
    badgeTag: 'Sub-100ms Edge',
    accentColor: 'indigo',
    title: 'Full-Stack Web Engineering (Next.js & React)',
    leadSentence: 'Custom web platforms, high-speed landing pages, and scalable SaaS portals.',
    subtitle:
      'Engineered from scratch for sub-second load times and conversion velocity with 99+ Core Web Vitals, SSR/ISR caching, and enterprise security.',
    outcomeMetric: 'Sub-100ms Edge Response · +62% Mobile Conversion Lift',
    timeline: '2–4 Weeks Delivery',
    deliverables: [
      'Custom React / Next.js Websites',
      'High-Speed Paid Traffic Landers',
      'E-Commerce & Custom Portals',
      'SSR / Edge CDN Deployment',
      '24/7 Web Management & Security',
    ],
    architectureSpecs: [
      { key: 'Stack', val: 'Next.js · React · TypeScript · Node' },
      { key: 'Performance Target', val: '99+ Lighthouse Mobile & Desktop' },
      { key: 'Security', val: 'SSL · WAF · Automated Backups' },
    ],
    previewMode: 'web-vitals',
  },
  {
    id: 'ai-crm',
    categoryLabel: 'AUTONOMOUS AUTOMATION',
    shortTab: 'AI & WhatsApp CRM',
    badgeTag: '24/7 Autonomous',
    accentColor: 'violet',
    title: 'AI Workflows & WhatsApp CRM Automation',
    leadSentence: 'Autonomous lead qualification, WhatsApp Cloud API bots, and custom CRM pipelines.',
    subtitle:
      'Eliminate manual follow-up delays. Our AI and WhatsApp automation engines respond in under 6 seconds, qualify buyer intent, dispatch brochures, and sync straight to your sales team.',
    outcomeMetric: '< 6s Lead Response · Zero Missed Prospects 24/7',
    timeline: '1–3 Weeks Delivery',
    deliverables: [
      'Autonomous Lead Qualification',
      'WhatsApp Business Cloud API',
      'Automated Proposal & Booking Flows',
      'Custom Internal Tools & Dashboards',
      'CRM Pipeline Webhook Sync',
    ],
    architectureSpecs: [
      { key: 'Messaging Bus', val: 'Official WhatsApp Cloud API' },
      { key: 'Orchestration', val: 'Python · Custom Webhooks · REST' },
      { key: 'Availability', val: '24/7 Instant Qualification' },
    ],
    previewMode: 'whatsapp-ai',
  },
  {
    id: 'performance-ads',
    categoryLabel: 'PAID DEMAND CAPTURE',
    shortTab: 'Performance Ads',
    badgeTag: 'ROAS Engineered',
    accentColor: 'amber',
    title: 'Performance Advertising (Meta & Google Ads)',
    leadSentence: 'High-intent Google Search capture and high-converting Meta Reels & retargeting funnels.',
    subtitle:
      'Full-funnel paid customer acquisition built around unit economics. We wire server-side Conversions API (CAPI) tracking so algorithms optimize for qualified revenue.',
    outcomeMetric: 'Server-Side CAPI Tracking · Verified Pipeline ROAS',
    timeline: '7-Day Launch Sprint',
    deliverables: [
      'Meta Ads: Reels & Lead Funnels',
      'Dynamic Retargeting Architecture',
      'Google High-Intent Search & Display',
      'Server-Side Meta CAPI & GTM Setup',
      'Weekly CAC & ROAS Optimization',
    ],
    architectureSpecs: [
      { key: 'Channels', val: 'Meta Ads API · Google Ads Search/Shopping' },
      { key: 'Attribution', val: 'First-Party Server-Side Events' },
      { key: 'Reporting', val: 'Cost-Per-Qualified-Deal Ledger' },
    ],
    previewMode: 'ads-roas',
  },
  {
    id: 'seo-aeo',
    categoryLabel: 'ORGANIC & AI SEARCH',
    shortTab: 'SEO & AEO Search',
    badgeTag: 'Search Dominance',
    accentColor: 'rose',
    title: 'Search & Answer Engine Dominance (SEO / AEO)',
    leadSentence: 'Technical SEO, Local Map Pack authority, and AI Answer Engine Optimization.',
    subtitle:
      'Capture buyers actively searching across Google Search, Google Maps, and AI Answer Engines (ChatGPT, Perplexity, Gemini) through semantic HTML and JSON-LD entity graphs.',
    outcomeMetric: '+180% Compounding High-Intent Organic Visibility',
    timeline: '4-Week Foundation + Ongoing',
    deliverables: [
      'Technical SEO & Core Vitals Audits',
      'Local SEO & Global Search Hubs',
      'Commercial On-Page Architecture',
      'AI Search Optimization (AEO / llms.txt)',
      'Schema.org JSON-LD Entity Graphs',
    ],
    architectureSpecs: [
      { key: 'Schema Standard', val: 'Organization · Service · FAQ JSON-LD' },
      { key: 'Search Footprint', val: 'GBP Map Pack + Regional/Global Hubs' },
      { key: 'AI Readiness', val: 'Structured Answer & Citation Blocks' },
    ],
    previewMode: 'seo-aeo',
  },
  {
    id: 'organic-social',
    categoryLabel: 'BRAND AUTHORITY',
    shortTab: 'Organic & Social',
    badgeTag: 'Authority Engine',
    accentColor: 'rose',
    title: 'Organic Brand & Social Growth Systems',
    leadSentence: 'Instagram growth engineering, high-retention Reels strategy, and LinkedIn authority.',
    subtitle:
      'Turn passive social profiles into inbound trust channels with 3-second retention hooks, visual grid consistency, and automated DM-to-WhatsApp lead capture bridges.',
    outcomeMetric: '3-Second Hook Engineering · Inbound Authority Trust',
    timeline: 'Monthly Sprint Cadence',
    deliverables: [
      'Instagram Growth Engineering',
      'High-Retention Reels Scripting',
      'LinkedIn & YouTube Authority',
      'Brand Grid Visual Systems',
      'Comment / DM-to-CRM Automation',
    ],
    architectureSpecs: [
      { key: 'Primary Channels', val: 'Instagram · LinkedIn · YouTube' },
      { key: 'Conversion Bridge', val: 'Comment/DM-to-WhatsApp Triggers' },
      { key: 'Cadence', val: 'Structured Editorial Calendar' },
    ],
    previewMode: 'social-retention',
  },
  {
    id: 'conversion-ux',
    categoryLabel: 'CONVERSION ARCHITECTURE',
    shortTab: 'Conversion UI/UX',
    badgeTag: 'Zero Friction',
    accentColor: 'emerald',
    title: 'Conversion UI/UX & Funnel Architecture',
    leadSentence: 'Precision interfaces, frictionless 1-Tap UPI checkouts, and interactive lead flows.',
    subtitle:
      'Remove cognitive friction so visitors understand your value proposition in 5 seconds and take action immediately—backed by interactive calculators and mobile-first ergonomics.',
    outcomeMetric: '-42% Checkout & Lead Form Drop-Off Rate',
    timeline: '2–3 Weeks Delivery',
    deliverables: [
      'Swiss Grid UI Design Systems',
      '1-Tap UPI & Frictionless Checkouts',
      'Interactive ROI & Quote Calculators',
      'Core Web Vitals Speed Optimization',
      'Mobile Touch Ergonomics (44px+)',
    ],
    architectureSpecs: [
      { key: 'Accessibility', val: 'WCAG AA/AAA Contrast · 44px+ Touch' },
      { key: 'Grid Discipline', val: '12-Column Responsive Architecture' },
      { key: 'Verification', val: 'Funnel Drop-Off & Speed Audits' },
    ],
    previewMode: 'funnel-ux',
  },
];

export interface RoadmapStep {
  id: string;
  phaseBadge: string;
  phaseWindow: string;
  shortTitle: string;
  title: string;
  summary: string;
  artifactDelivered: string;
  accentColor: SemanticAccentColor;
  iconType: 'compass' | 'layout' | 'code' | 'check' | 'send' | 'trending';
}

export const EXECUTION_ROADMAP: RoadmapStep[] = [
  {
    id: 'phase-diagnose',
    phaseBadge: 'DISCOVERY AUDIT',
    phaseWindow: 'Day 1',
    shortTitle: 'Diagnose & 60s Proof',
    title: 'Diagnose & 60s Custom Proof',
    summary:
      'We audit your funnel, website speed, and ad leakage—delivering a custom 60-second teardown before you pay.',
    artifactDelivered: '60-Second Custom Architecture Teardown',
    accentColor: 'indigo',
    iconType: 'compass',
  },
  {
    id: 'phase-blueprint',
    phaseBadge: 'SYSTEM BLUEPRINT',
    phaseWindow: 'Days 2–4',
    shortTitle: 'System Architecture',
    title: 'System Architecture & Strategy',
    summary:
      'We align codebase structure, offer positioning, conversion copy, and acquisition unit economics into one blueprint.',
    artifactDelivered: 'Full-Funnel Wireframe & Tracking Spec',
    accentColor: 'violet',
    iconType: 'layout',
  },
  {
    id: 'phase-engineering',
    phaseBadge: 'CORE BUILD',
    phaseWindow: 'Weeks 1–2',
    shortTitle: 'Full-Stack Build',
    title: 'Full-Stack Engineering',
    summary:
      'Senior engineers build your custom React/Next.js platform, server-side event tracking, and automated WhatsApp/CRM workflows.',
    artifactDelivered: 'Staging Platform + Live Webhook CRM',
    accentColor: 'cyan',
    iconType: 'code',
  },
  {
    id: 'phase-deployment',
    phaseBadge: 'GROWTH LAUNCH',
    phaseWindow: 'Weeks 2–3',
    shortTitle: 'Campaign Deployment',
    title: 'Campaign & Content Deployment',
    summary:
      'We launch technical SEO/AEO schemas, Google Map Pack optimization, and high-intent Meta & Google Ads wired to your funnel.',
    artifactDelivered: 'Live Acquisition & Attribution Engine',
    accentColor: 'amber',
    iconType: 'send',
  },
  {
    id: 'phase-verification',
    phaseBadge: 'QUALITY GATE',
    phaseWindow: 'Week 3',
    shortTitle: 'Testing & QA Check',
    title: 'Quality & Conversion Testing',
    summary:
      'Every viewport, Core Web Vitals budget, form validation state, and WhatsApp trigger is verified end-to-end.',
    artifactDelivered: '99+ Speed Benchmark & QA Sign-Off',
    accentColor: 'emerald',
    iconType: 'check',
  },
  {
    id: 'phase-scale',
    phaseBadge: 'COMPOUNDING SCALE',
    phaseWindow: 'Ongoing 24/7',
    shortTitle: '24/7 Support & Scale',
    title: '24/7 Monitoring & Compounding Scale',
    summary:
      'Continuous uptime telemetry, A/B funnel iteration, search authority expansion, and ad scaling tied strictly to revenue growth.',
    artifactDelivered: 'Bi-Weekly Pipeline & ROI Growth Sprints',
    accentColor: 'rose',
    iconType: 'trending',
  },
];

export interface ClientReview {
  id: string;
  initials: string;
  quote: string;
  author: string;
  role: string;
  engagementScope: string;
  verifiedOutcome: string;
  relatedProjectId: string;
}

export const VERIFIED_REVIEWS: ClientReview[] = [
  {
    id: 'aarav-mehta',
    initials: 'AM',
    quote:
      'SkyLine engineered our web platform and aligned our entire acquisition funnel. Their strategy-first execution gave our brand a clean, high-converting digital identity.',
    author: 'Aarav Mehta',
    role: 'Business Owner',
    engagementScope: 'WEB PLATFORM & ACQUISITION FUNNEL',
    verifiedOutcome: '2.4x Conversion Lift',
    relatedProjectId: 'project-360-estate',
  },
  {
    id: 'riya-sharma',
    initials: 'RS',
    quote:
      'Instead of generic marketing promises, the team delivered a fast, practical system from architecture to automated WhatsApp lead generation.',
    author: 'Riya Sharma',
    role: 'Startup Founder',
    engagementScope: 'FULL-STACK SYSTEM & LEAD AUTOMATION',
    verifiedOutcome: '< 6s WhatsApp CRM',
    relatedProjectId: 'project-aurascale-d2c',
  },
  {
    id: 'rahul-verma',
    initials: 'RV',
    quote:
      'Our local Google Map ranking, website, and WhatsApp booking flow now run seamlessly. Walk-in inquiries grew within the first month.',
    author: 'Rahul Verma',
    role: 'Clinic & Showroom Director',
    engagementScope: 'LOCAL BUSINESS GROWTH ENGINE',
    verifiedOutcome: '#1 Map Pack · +185% Bookings',
    relatedProjectId: 'project-apex-local',
  },
  {
    id: 'neha-kapoor',
    initials: 'NK',
    quote:
      'What I liked most was that they focused on strategy and measurable systems instead of simply selling disconnected services.',
    author: 'Neha Kapoor',
    role: 'Entrepreneur',
    engagementScope: 'GROWTH STRATEGY & SEO',
    verifiedOutcome: '+175% Organic Inquiries',
    relatedProjectId: 'project-carve-portal',
  },
];

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: string;
  accentColor: SemanticAccentColor;
}

export const FAQ_ITEMS: FaqItem[] = [
  {
    id: 'faq-capabilities',
    category: 'Architecture',
    accentColor: 'indigo',
    question: 'What core engineering and growth services do you provide?',
    answer:
      'We engineer custom web applications (React, Next.js), AI & WhatsApp CRM automation workflows, Local Business digitization (Google Map Pack #1, QR reviews, WhatsApp booking), high-ROAS Meta and Google Ads funnels, and Technical SEO/AEO under one roof.',
  },
  {
    id: 'faq-local-businesses',
    category: 'Local Growth',
    accentColor: 'amber',
    question: 'How does your Local Business Growth Engine help clinics, showrooms, and retail?',
    answer:
      'We optimize your Google Business Profile for #1 Map Pack visibility, deploy Smart QR Review systems to boost 5-star ratings, run geo-fenced Instagram/Meta Reels ads, and automate appointment or catalog bookings directly on WhatsApp.',
  },
  {
    id: 'faq-timelines',
    category: 'Delivery',
    accentColor: 'emerald',
    question: 'How long does a typical web & acquisition system take?',
    answer:
      'Local business growth systems and campaign landers ship in 7–14 days. Complete full-stack web platforms, custom e-commerce storefronts, and multi-layer acquisition funnels take 2 to 4 weeks with live weekly sprint demos.',
  },
  {
    id: 'faq-pricing',
    category: 'Commercials',
    accentColor: 'violet',
    question: 'What is your pricing and milestone payment structure?',
    answer:
      'We operate on transparent fixed-price milestone contracts for engineering builds (Discovery & Architecture, Staging Demo, Production Launch) and clear monthly sprint retainers for ongoing Ads, Local Growth, SEO/AEO, and Social.',
  },
  {
    id: 'faq-locations',
    category: 'Operations',
    accentColor: 'cyan',
    question: 'Where are you based and how do we collaborate?',
    answer:
      'We are based in Madhya Pradesh, India, serving startups, local enterprises, and ambitious brands globally via live staging links, dedicated WhatsApp channels, and strategy calls Monday – Saturday (10:00 AM – 9:00 PM IST).',
  },
  {
    id: 'faq-audit',
    category: 'Proof Before Payment',
    accentColor: 'rose',
    question: 'How does the Free 60-Second System Audit work?',
    answer:
      'Select your industry and primary bottleneck in our interactive System Architect on this page. Our lead engineers review your speed, Google Map presence, ad funnel, and CRM flow and send a custom teardown on WhatsApp before you pay anything.',
  },
];

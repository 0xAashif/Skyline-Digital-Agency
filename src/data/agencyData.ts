export type SemanticAccentColor =
  | 'emerald'
  | 'indigo'
  | 'violet'
  | 'amber'
  | 'cyan'
  | 'rose';

export interface CapabilityPillar {
  id: string;
  index?: string;
  title: string;
  subtitle: string;
  description?: string;
  architectureNote?: string;
  metrics?: {
    label: string;
    value: string;
    delta: string;
  }[];
  deliverables: ({
    name: string;
    spec: string;
    impact: string;
  } | string)[];
  // Compatible fields for Admin CMS
  categoryLabel?: string;
  shortTab?: string;
  badgeTag?: string;
  accentColor?: SemanticAccentColor;
  leadSentence?: string;
  outcomeMetric?: string;
  timeline?: string;
  architectureSpecs?: { key: string; val: string }[];
  previewMode?: string;
}

export interface RoadmapPhase {
  step: string;
  phase: string;
  duration: string;
  title: string;
  description: string;
  deliverables: string[];
  verificationGate: string;
}

export interface ClientProofCase {
  id: string;
  clientSector: string;
  challenge: string;
  solution: string;
  primaryMetric: string;
  primaryMetricLabel: string;
  secondaryMetric: string;
  timeframe: string;
  tags: string[];
}

export interface VerifiedReview {
  id: string;
  quote: string;
  author: string;
  role: string;
  serviceTag?: string;
  impactHighlight?: string;
  rating?: number;
  // Admin CMS compatibility
  initials?: string;
  engagementScope?: string;
  verifiedOutcome?: string;
  relatedProjectId?: string;
}

export type ClientReview = VerifiedReview;

export interface FaqItem {
  id: string;
  category: string;
  question: string;
  answer: string;
  accentColor?: SemanticAccentColor;
}

export interface ShowcaseProject {
  id: string;
  title: string;
  clientType?: string;
  categoryTag?: string;
  summary?: string;
  impactMetric?: string;
  secondaryMetric?: string;
  techStack?: string[];
  livePreviewLabel?: string;
  imageUrl: string;
  challenge?: string;
  solution?: string;
  results?: string[];
  // Admin CMS compatibility
  statusBadge?: string;
  accentColor?: SemanticAccentColor;
  category?: string;
  locationTag?: string;
  tags?: string;
  metricsHeadline?: string;
  metricsSub?: string;
  architectureNodes?: string[];
  accentMetric?: string;
  fallbackSvgUrl?: string;
  problemStatement?: string;
  architectureSummary?: string;
  impactMetrics?: { label: string; before: string; after: string; delta: string }[];
  stackPills?: string[];
}

export const SKYLINE_WHATSAPP_NUMBER = '918109697311';
export const SKYLINE_EMAIL = 'skylinedigital@gmail.com';
export const SKYLINE_INSTAGRAM_URL = 'https://www.instagram.com/sky_line_digital';
export const SKYLINE_LINKEDIN_URL = 'https://www.linkedin.com/company/skyline-digital-agency';
export const SKYLINE_TELEGRAM_URL = 'https://t.me/skyline_digital';
export const SKYLINE_X_URL = 'https://x.com/skyline_digital';
export const SKYLINE_LOCATION =
  'Madhya Pradesh, India (Serving Startups & Businesses Globally)';

export interface HeroOrbItem {
  id: string;
  label: string;
  title: string;
  metric: string;
  metricLabel: string;
  psychColor: string;
  psychName: string;
  psychMeaning: string;
  summary: string;
  deliverables: string[];
  targetSection: string;
}

export interface FounderProfile {
  id: string;
  name: string;
  role: string;
  headline: string;
  education: string;
  institution: string;
  location: string;
  email: string;
  phone: string;
  linkedinUrl?: string;
  linkedinLabel?: string;
  githubUrl?: string;
  githubLabel?: string;
  resumePdfUrl: string;
  summary: string;
  languages: string[];
  frameworksAndTools: string[];
  coreConcepts: string[];
  experience: {
    role: string;
    company: string;
    period: string;
    highlights: string[];
  }[];
  projects: {
    name: string;
    subtitle: string;
    stack: string;
    highlights: string[];
    repoUrl?: string;
  }[];
  certifications: string[];
}

export const FOUNDER_PROFILES: FounderProfile[] = [
  {
    id: 'aashif-khan',
    name: 'Aashif Khan',
    role: 'Co-Founder • Software Engineering, Full-Stack & Cybersecurity',
    headline: 'B.Tech CSE (3rd Year) • Full-Stack Architecture & Cryptographic Security',
    education: 'B.Tech in Computer Science & Engineering (3rd Year, 6th Semester)',
    institution: 'Jai Narain College of Technology (JNCT), Bhopal (2023 – Present)',
    location: 'Ujjain / Bhopal, Madhya Pradesh, India',
    email: 'aashifkpp@gmail.com',
    phone: '+91 86430 02478',
    linkedinUrl: 'https://www.linkedin.com/in/Aashif-Khan',
    linkedinLabel: 'linkedin.com/in/Aashif-Khan',
    githubUrl: 'https://github.com/0xAashif',
    githubLabel: 'github.com/0xAashif',
    resumePdfUrl: '/assets/aistudio/Aashif_Khan_Resume__1__fec07135.pdf',
    summary:
      'Full-stack software engineer and cybersecurity specialist focused on resilient Node.js/Express backends, REST APIs, SHA-256 cryptographic verification, blockchain anchoring, and high-converting cloud deployments across Render and Vercel.',
    languages: ['C++', 'Python', 'Java', 'JavaScript / TypeScript'],
    frameworksAndTools: [
      'Node.js',
      'Express.js',
      'REST APIs',
      'Git & GitHub',
      'VS Code',
      'WSL Ubuntu',
      'Render & Vercel',
    ],
    coreConcepts: [
      'SHA-256 Cryptographic Hashing',
      'Blockchain Anchoring (OriginStamp)',
      'Data Structures & Algorithms',
      'Cybersecurity Architecture',
      'AI Studio Systems',
    ],
    experience: [
      {
        role: 'Co-Founder & Lead Full-Stack / Security Architect',
        company: 'SkyLine Digital Agency — Madhya Pradesh, India',
        period: '2024 – Present',
        highlights: [
          'Architecting full-stack web platforms, Node.js/Express APIs, and automated WhatsApp & CRM pipelines.',
          'Leading cloud deployments across Vercel and Render with cryptographic security and zero-downtime delivery.',
        ],
      },
    ],
    projects: [
      {
        name: 'FileGuard AI',
        subtitle: 'Document Integrity Verification Tool',
        stack: 'Node.js • Express • lowdb • Multer • SHA-256 • OriginStamp Blockchain • Render + Vercel',
        highlights: [
          'Full-stack web application verifying document authenticity via SHA-256 hashing and blockchain anchoring (OriginStamp).',
          'Engineered distributed backend on Render paired with a high-speed frontend deployed on Vercel.',
        ],
        repoUrl: 'https://github.com/0xAashif/Fileguard',
      },
    ],
    certifications: [
      'JPMorgan Chase — Cybersecurity Virtual Experience (Forage)',
      'IBM Fundamentals of Cybersecurity & NASSCOM Cybersecurity Foundation',
      'Introduction to Cybersecurity — Cisco Networking Academy',
      'Natural Language Processing Basics — Salesforce Trailhead',
      'Microsoft AI Skills Yatra & YUVA AI for ALL (Coursera)',
      'HackerRank Python (Basic) & Kaggle Python Micro-course Certificate',
      'TCS iON Career Edge — Young Professional',
    ],
  },
  {
    id: 'sachin-sahu',
    name: 'Sachin Sahu',
    role: 'Co-Founder • Systems Engineering & Java Backend Architecture',
    headline: 'B.Tech CSE (CGPA: 8.2/10) • High-Concurrency Java, Spring Boot & Distributed Systems',
    education: 'B.Tech in Computer Science — CGPA: 8.2 / 10 (Expected 2027)',
    institution: 'Jai Narain College of Technology (JNCT), Bhopal, MP',
    location: 'Bhopal, Madhya Pradesh, India',
    email: 'sachinsahuji306@gmail.com',
    phone: '+91 8085063123',
    linkedinUrl: 'https://www.linkedin.com/company/skyline-digital-agency',
    linkedinLabel: 'LinkedIn Profile',
    githubUrl: 'https://github.com/0xAashif',
    githubLabel: 'GitHub Portfolio',
    resumePdfUrl: '/assets/aistudio/Sachin_Sahu_Resume_Infosys_60a42260.pdf',
    summary:
      'Systems engineer with hands-on experience building high-concurrency Java backends, Spring Boot microservices, Apache Kafka event streams, and PostgreSQL/MySQL database architectures across two software engineering internships and 160+ solved DSA problems.',
    languages: ['Core Java (Java 21)', 'SQL', 'Kotlin', 'JavaScript', 'HTML/CSS'],
    frameworksAndTools: [
      'Spring Boot',
      'Hibernate / JPA',
      'Microservices & REST APIs',
      'Apache Kafka & Debezium (CDC)',
      'PostgreSQL & MySQL',
      'Docker & Testcontainers',
      'React & Jetpack Compose',
      'JWT & OAuth 2.0',
    ],
    coreConcepts: [
      'Multithreading & Java 21 Virtual Threads (Loom)',
      'Data Structures & Algorithms (160+ GFG)',
      'DBMS & Query Optimization',
      'Spring State Machine',
      'Zero-Downtime Schema Migrations',
    ],
    experience: [
      {
        role: 'Java Development Intern (Associate L1)',
        company: 'Infotact Solutions — Remote',
        period: 'May 2026 – Sept 2026',
        highlights: [
          'Designed, built, and deployed optimized Java backend applications and secure RESTful APIs using Core Java, OOPs, and Spring Boot.',
          'Managed database modeling and query optimization via MySQL/PostgreSQL for scalability and high availability.',
        ],
      },
      {
        role: 'Android Development Intern',
        company: 'JNCT (Google for Developers) — Bhopal, MP',
        period: 'Jan 2025 – Feb 2025',
        highlights: [
          'Built scalable Android applications using Kotlin, Jetpack Compose, and Firebase with seamless REST API integration.',
        ],
      },
    ],
    projects: [
      {
        name: 'ShadowBase',
        subtitle: 'Zero-Downtime Schema Migration Sandbox',
        stack: 'Java • Spring Boot • Apache Kafka • Debezium (CDC) • Testcontainers • React + Monaco Editor',
        highlights: [
          'Developed a database sandbox using Java, Debezium (CDC), and Kafka to shadow and replicate live SQL traffic into isolated Dockerized clones.',
          'Built a high-throughput stream replayer using Java Stream API with a React + Monaco Editor dashboard to monitor error rates.',
        ],
      },
      {
        name: 'GridWeaver',
        subtitle: 'Virtual Thread IoT Microgrid State Engine',
        stack: 'Java 21 (Loom) • Spring State Machine • Apache Kafka • React • Leaflet GIS',
        highlights: [
          'Engineered a high-concurrency TCP/WebSocket ingestion engine using Java 21 Virtual Threads handling 50,000+ non-blocking IoT telemetry pings buffered via Apache Kafka.',
          'Integrated Spring State Machine for dynamic battery node transitions with a live React + Leaflet GIS dashboard.',
        ],
      },
    ],
    certifications: [
      'Software Engineering Job Simulation — JPMorgan Chase (Forage), Oct 2025 (Kafka, H2 & REST APIs)',
      'Java Full Stack Developer Intern — EduSkills Academy, Mar 2026 (Spring Boot, Hibernate, MySQL)',
      'GeeksforGeeks 160 DSA Challenge Certificate, Jan 2026 (Core Data Structures & Algorithms)',
    ],
  },
];

export const HERO_ORBS: HeroOrbItem[] = [
  {
    id: 'ai',
    label: 'AI',
    title: 'Autonomous AI & WhatsApp Sales Agents',
    metric: '< 1.2s',
    metricLabel: 'Lead Response Speed',
    psychColor: '#C5A880',
    psychName: 'Champagne Titanium',
    psychMeaning: 'Autonomous Intelligence & Precision Engineering',
    summary:
      '24/7 official WhatsApp Cloud API bots and custom RAG AI agents that answer FAQs, qualify budgets, and book calendar slots automatically.',
    deliverables: ['Official WhatsApp Cloud API', 'RAG Knowledge Base', 'Auto Calendar Sync'],
    targetSection: 'services',
  },
  {
    id: 'ads',
    label: 'ADS',
    title: 'High-ROAS Meta & Google Performance Funnels',
    metric: '4.1x',
    metricLabel: 'Verified Blended ROAS',
    psychColor: '#71717A',
    psychName: 'Dark Silver',
    psychMeaning: 'High-Contrast Authority & Conversion Velocity',
    summary:
      'Server-side Meta CAPI attribution paired with high-intent Google Search campaigns and conversion-engineered landing pages.',
    deliverables: ['Server-Side Meta CAPI', 'High-Intent Search Ads', 'Live ROAS Dashboards'],
    targetSection: 'services',
  },
  {
    id: 'saas',
    label: 'SAAS',
    title: 'Multi-Tenant Cloud SaaS & Enterprise Portals',
    metric: '99.98%',
    metricLabel: 'Production Uptime SLA',
    psychColor: '#52525B',
    psychName: 'Brushed Titanium',
    psychMeaning: 'Enterprise Stability & Resilient Cloud Scale',
    summary:
      'Production-ready SaaS MVPs, role-based admin dashboards, subscription billing webhooks, and resilient PostgreSQL + Kafka/Redis architectures.',
    deliverables: ['Multi-Tenant Auth & RBAC', 'Stripe & Razorpay Subscriptions', 'Sub-85ms API Latency'],
    targetSection: 'expertise',
  },
  {
    id: 'web',
    label: 'WEB',
    title: 'Sub-Second Next.js Websites & D2C Storefronts',
    metric: '99/100',
    metricLabel: 'Google Lighthouse Speed',
    psychColor: '#8E9299',
    psychName: 'Liquid Silver',
    psychMeaning: 'Frictionless Performance & Architectural Clarity',
    summary:
      'Custom Next.js 15 & React 19 storefronts with 0.4s edge load times and 1-tap UPI checkout flows that convert cold traffic into buyers.',
    deliverables: ['Next.js 15 Edge SSR', '1-Tap UPI Checkout', 'WhatsApp Cart Recovery'],
    targetSection: 'work',
  },
  {
    id: 'seo',
    label: 'SEO',
    title: 'Programmatic Search SEO & AI Answer Visibility',
    metric: '+240%',
    metricLabel: 'Organic Search Pipeline',
    psychColor: '#B6956A',
    psychName: 'Burnished Bronze-Titanium',
    psychMeaning: 'Search Authority & #1 Indexing Dominance',
    summary:
      'Dominate Google SERPs, ChatGPT, and Perplexity with JSON-LD entity graphs, programmatic regional hubs, and 100/100 Core Web Vitals.',
    deliverables: ['JSON-LD Entity Graphs', 'Programmatic Location Hubs', 'AI Citation Optimization'],
    targetSection: 'expertise',
  },
  {
    id: 'crm',
    label: 'CRM',
    title: 'Unified WhatsApp CRM & Pipeline Orchestration',
    metric: '0%',
    metricLabel: 'Lead Leakage Across Channels',
    psychColor: '#64748B',
    psychName: 'Anodized Slate Titanium',
    psychMeaning: 'Connected Pipelines & Instant Dispatch',
    summary:
      'Connect Meta Lead Ads, website forms, WhatsApp inquiries, and sales reps into one automated pipeline with instant follow-up sequences.',
    deliverables: ['Instant Webhook Routing', 'Automated Drip Follow-Ups', 'Executive Sales Telemetry'],
    targetSection: 'simulator',
  },
  {
    id: 'local',
    label: 'LOCAL',
    title: 'Google Map Pack #1 & Local Walk-In Engines',
    metric: '3.2x',
    metricLabel: 'Daily Local Calls & Walk-Ins',
    psychColor: '#A38A68',
    psychName: 'Warm Satin Titanium',
    psychMeaning: 'Local Trust & Physical Footfall Dominance',
    summary:
      'Built for clinics, salons, cafes, gyms, and showrooms. Rank #1 in "near me" Google Maps searches and automate 5-star QR reviews.',
    deliverables: ['Google Map Pack Top-3', 'Smart QR Review Standees', 'WhatsApp Appointment Bot'],
    targetSection: 'local-business',
  },
];

export interface HeroPitchSlide {
  id: string;
  badge: string;
  title: string;
  subtitle: string;
  metricValue: string;
  metricLabel: string;
  highlights: string[];
  visualType:
    | 'code-edge'
    | 'whatsapp-bot'
    | 'local-maps'
    | 'roas-analytics'
    | 'upi-storefront'
    | 'seo-terminal';
  targetSection: string;
}

export const HERO_PITCH_SLIDES: HeroPitchSlide[] = [
  {
    id: 'slide-web-saas',
    badge: 'FULL-STACK WEB & SAAS',
    title: 'Sub-Second Websites & Scalable SaaS Platforms',
    subtitle:
      'Custom Next.js, React, and Python/Node architectures engineered for instant load times, enterprise security, and frictionless checkout.',
    metricValue: '0.4s',
    metricLabel: 'Global Edge LCP Speed',
    highlights: ['Next.js 15 & TypeScript', 'Cloud-Native Postgres', '99.98% Uptime Architecture'],
    visualType: 'code-edge',
    targetSection: 'expertise',
  },
  {
    id: 'slide-ai-whatsapp',
    badge: 'AI & WHATSAPP AUTOMATION',
    title: '24/7 AI Sales Agents & WhatsApp CRM Flows',
    subtitle:
      'Turn every Instagram DM, website inquiry, and missed call into an instant WhatsApp conversation that qualifies leads and books appointments automatically.',
    metricValue: '< 1.2s',
    metricLabel: 'Automated Lead Response',
    highlights: ['Official WhatsApp Cloud API', 'RAG Knowledge Base', 'Auto Calendar & CRM Sync'],
    visualType: 'whatsapp-bot',
    targetSection: 'simulator',
  },
  {
    id: 'slide-local-business',
    badge: 'LOCAL BUSINESS DOMINANCE',
    title: 'Google Map Pack #1 & Hyper-Local Lead Engines',
    subtitle:
      'Built for clinics, salons, cafes, gyms, and retail stores. Dominate "near me" Google searches, automate 5-star review collection, and capture local walk-ins.',
    metricValue: '3.2x',
    metricLabel: 'Local Calls & Walk-Ins',
    highlights: ['Google Business Profile #1', 'QR Review Automation', 'Hyper-Local Meta Geo-Ads'],
    visualType: 'local-maps',
    targetSection: 'local-business',
  },
  {
    id: 'slide-paid-ads',
    badge: 'PERFORMANCE MARKETING',
    title: 'ROI-Backed Meta & Google Ad Funnels',
    subtitle:
      'Stop burning budget on vanity clicks. We pair server-side Meta CAPI tracking with high-converting landing pages that turn ad spend into predictable revenue.',
    metricValue: '4.1x',
    metricLabel: 'Verified Blended ROAS',
    highlights: ['Server-Side Meta CAPI', 'High-Intent Search Ads', 'Real-Time ROAS Dashboards'],
    visualType: 'roas-analytics',
    targetSection: 'expertise',
  },
  {
    id: 'slide-ecommerce-d2c',
    badge: 'D2C & E-COMMERCE',
    title: 'High-Converting Storefronts with 1-Tap UPI Checkout',
    subtitle:
      'Custom D2C storefronts and digital catalogs with Razorpay/Stripe integration, automated WhatsApp cart recovery, and sub-second product filtering.',
    metricValue: '+68%',
    metricLabel: 'Checkout Conversion Lift',
    highlights: ['1-Tap UPI & Card Flows', 'WhatsApp Cart Recovery', 'Real-Time Inventory Sync'],
    visualType: 'upi-storefront',
    targetSection: 'work',
  },
  {
    id: 'slide-seo-authority',
    badge: 'TECHNICAL SEO & AEO',
    title: 'Programmatic SEO & AI Search Visibility',
    subtitle:
      'Rank at the top of Google Search and AI answer engines (ChatGPT, Perplexity) with programmatic landing pages, JSON-LD schema, and Core Web Vitals mastery.',
    metricValue: '+240%',
    metricLabel: 'Organic Search Pipeline',
    highlights: ['JSON-LD Entity Graphs', 'Programmatic Location Pages', '100/100 Core Web Vitals'],
    visualType: 'seo-terminal',
    targetSection: 'expertise',
  },
];

export const TECH_STACK_MARQUEE_ROW_1 = [
  'Next.js 15',
  'React 19',
  'TypeScript',
  'Python FastAPI',
  'Node.js',
  'PostgreSQL',
  'Prisma ORM',
  'Redis Cache',
  'Docker',
  'AWS Cloud',
  'Tailwind CSS',
  'OpenAI & LangChain',
];

export const TECH_STACK_MARQUEE_ROW_2 = [
  'WhatsApp Cloud API',
  'Google Map Pack SEO',
  'Meta Ads CAPI',
  'Google Ads Search',
  'Razorpay & UPI Flows',
  'HubSpot & Zoho CRM',
  'Programmatic SEO',
  'GA4 Server Tracking',
  'Local Review Automation',
  'JSON-LD Schema',
];

export const STACK_TICKER_ROW_1: {
  name: string;
  category: string;
  accentColor: SemanticAccentColor;
}[] = TECH_STACK_MARQUEE_ROW_1.map((name) => ({
  name,
  category: 'ENGINEERING',
  accentColor: 'indigo',
}));

export const STACK_TICKER_ROW_2: {
  name: string;
  category: string;
  accentColor: SemanticAccentColor;
}[] = TECH_STACK_MARQUEE_ROW_2.map((name) => ({
  name,
  category: 'GROWTH & LOCAL',
  accentColor: 'emerald',
}));

export interface BentoSolutionCard {
  id: string;
  tag: string;
  title: string;
  summary: string;
  metric: string;
  deliverables: string[];
  spanClass: string;
  visualType:
    | 'web-architecture'
    | 'whatsapp-crm'
    | 'local-gbp'
    | 'roas-funnel'
    | 'seo-schema'
    | 'upi-catalog';
}

export const BENTO_SOLUTIONS: BentoSolutionCard[] = [
  {
    id: 'bento-web',
    tag: 'WEB & SAAS ENGINEERING',
    title: 'Custom Web Apps, SaaS Portals & High-Speed Websites',
    summary:
      'We replace bloated templates with custom React/Next.js frontends and resilient backend APIs that load in under 0.5 seconds and convert cold visitors into paying clients.',
    metric: '99/100 Google PageSpeed',
    deliverables: ['Custom UI/UX Architecture', 'Secure Admin & Client Portals', 'API & Payment Integrations'],
    spanClass: 'lg:col-span-7',
    visualType: 'web-architecture',
  },
  {
    id: 'bento-ai-crm',
    tag: 'AI & WHATSAPP AUTOMATION',
    title: '24/7 WhatsApp Sales Bots & Automated CRM',
    summary:
      'Never lose a lead to slow replies. Our official WhatsApp bots answer FAQs, share catalogs, qualify budgets, and book calls straight into your calendar.',
    metric: '< 1.2s Instant Reply',
    deliverables: ['WhatsApp Catalog & Booking Bot', 'Automated Follow-Up Sequences', 'Unified Lead Pipeline'],
    spanClass: 'lg:col-span-5',
    visualType: 'whatsapp-crm',
  },
  {
    id: 'bento-local',
    tag: 'LOCAL BUSINESS GROWTH',
    title: 'Google Maps #1 Rank, QR Review Systems & Walk-In Funnels',
    summary:
      'Tailored for clinics, restaurants, salons, gyms, and retail showrooms. We rank you in the Top 3 on Google Maps and turn local searchers into daily walk-ins.',
    metric: '3.2x More Local Calls',
    deliverables: ['Google Business Profile Optimization', 'Automated 5-Star Review Standees', 'WhatsApp Appointment Booking'],
    spanClass: 'lg:col-span-4',
    visualType: 'local-gbp',
  },
  {
    id: 'bento-ads',
    tag: 'PAID ACQUISITION',
    title: 'High-ROAS Meta & Google Ad Engines',
    summary:
      'Precision-targeted ad campaigns backed by server-side conversion tracking and dedicated landing pages engineered to lower your cost-per-lead.',
    metric: '4.1x Average ROAS',
    deliverables: ['Meta Reels & Lead Ads', 'High-Intent Google Search Ads', 'Server-Side CAPI Attribution'],
    spanClass: 'lg:col-span-4',
    visualType: 'roas-funnel',
  },
  {
    id: 'bento-seo',
    tag: 'SEARCH & AI VISIBILITY',
    title: 'Technical SEO & AI Answer Engine Optimization',
    summary:
      'Capture high-intent buyers searching on Google, ChatGPT, and Perplexity with structured schema markup and high-authority content clusters.',
    metric: '+240% Organic Traffic',
    deliverables: ['Technical Core Web Vitals Audit', 'Local & National Keyword Clusters', 'JSON-LD Schema Architecture'],
    spanClass: 'lg:col-span-4',
    visualType: 'seo-schema',
  },
  {
    id: 'bento-commerce',
    tag: 'D2C & DIGITAL CATALOGS',
    title: 'Frictionless E-Commerce & 1-Tap UPI Checkout Systems',
    summary:
      'Launch a blazing-fast online store or digital ordering catalog with instant UPI payments, automated WhatsApp order alerts, and zero marketplace commissions.',
    metric: '+68% Checkout Completion',
    deliverables: ['1-Tap UPI / Card Checkout', 'Automated WhatsApp Order Alerts', 'Inventory & GST Billing Sync'],
    spanClass: 'lg:col-span-12',
    visualType: 'upi-catalog',
  },
];

export const CAPABILITY_PILLARS: CapabilityPillar[] = [
  {
    id: 'software-engineering',
    index: '01',
    title: 'Full-Stack Web, SaaS & E-Commerce Engineering',
    subtitle: 'CLOUD-NATIVE PLATFORMS & HIGH-SPEED STOREFRONTS',
    description:
      'We architect production-grade web applications, multi-tenant SaaS products, and high-converting storefronts built for speed, security, and long-term scale.',
    architectureNote: 'Next.js 15 Edge + Node/Python Micro-APIs + PostgreSQL + Redis',
    metrics: [
      { label: 'Core Web Vitals LCP', value: '< 0.6s', delta: '99/100 Perf Score' },
      { label: 'System Availability', value: '99.98%', delta: 'Zero-Downtime Deploys' },
    ],
    deliverables: [
      {
        name: 'Custom Web & SaaS Applications',
        spec: 'React 19, Next.js, TypeScript, role-based dashboards, and multi-tenant data isolation',
        impact: '3.2x faster feature velocity',
      },
      {
        name: 'API & Payment Infrastructure',
        spec: 'REST/GraphQL APIs, Razorpay/Stripe webhooks, automated invoicing, and ERP bridges',
        impact: '64% lower server latency',
      },
      {
        name: 'High-Speed Conversion Websites',
        spec: 'Interactive 3D/motion UI, technical SEO foundation, and instant edge caching',
        impact: '+52% visitor-to-lead conversion',
      },
    ],
    shortTab: 'Full-Stack Web',
    timeline: '2–4 Weeks',
    outcomeMetric: '99/100 Lighthouse · <0.6s LCP',
  },
  {
    id: 'ai-automation',
    index: '02',
    title: 'AI Agents, WhatsApp Automation & CRM Pipelines',
    subtitle: 'AUTONOMOUS SALES DESKS & WORKFLOW ORCHESTRATION',
    description:
      'Eliminate manual follow-ups. We deploy custom AI assistants and official WhatsApp Cloud API workflows that capture, qualify, and close leads 24/7.',
    architectureNote: 'WhatsApp Cloud API + LLM RAG Pipelines + Webhook CRM Sync',
    metrics: [
      { label: 'First Response Speed', value: '< 1.2s', delta: '24/7 Autonomous Desk' },
      { label: 'Manual Ops Saved', value: '72%', delta: 'Automated Qualification' },
    ],
    deliverables: [
      {
        name: 'Official WhatsApp Sales & Booking Bots',
        spec: 'Automated catalog sharing, appointment slot booking, and instant FAQ resolution',
        impact: '2.8x higher lead-to-booking rate',
      },
      {
        name: 'Custom RAG AI Knowledge Agents',
        spec: 'AI trained on your PDFs, pricing sheets, and inventory with zero hallucination guardrails',
        impact: '85% instant support resolution',
      },
      {
        name: 'Unified CRM & Lead Routing',
        spec: 'Instant sync between Meta/Google Lead Ads, website forms, WhatsApp, and your sales team',
        impact: 'Zero lead leakage across channels',
      },
    ],
    shortTab: 'AI & WhatsApp CRM',
    timeline: '10–18 Days',
    outcomeMetric: '< 1.2s Autonomous Reply',
  },
  {
    id: 'growth-systems',
    index: '03',
    title: 'Performance Ads, Technical SEO & Revenue Funnels',
    subtitle: 'FULL-FUNNEL DEMAND GENERATION & ATTRIBUTION',
    description:
      'We combine high-intent Google & Meta ad campaigns with programmatic SEO and conversion-engineered landing pages to turn marketing spend into measurable profit.',
    architectureNote: 'Server-Side Meta CAPI + GA4 BigQuery + Programmatic SEO Clusters',
    metrics: [
      { label: 'Blended Ad ROAS', value: '4.1x', delta: '+138% Pipeline Efficiency' },
      { label: 'Organic Search Growth', value: '+240%', delta: 'Top-3 Keyword Authority' },
    ],
    deliverables: [
      {
        name: 'Meta & Google Performance Campaigns',
        spec: 'High-converting video/carousel creatives, search intent capture, and retargeting funnels',
        impact: '-41% Customer Acquisition Cost',
      },
      {
        name: 'Technical SEO & AI Search (AEO)',
        spec: 'JSON-LD schema graphs, programmatic city/service pages, and Core Web Vitals optimization',
        impact: 'Sustained compounding organic leads',
      },
      {
        name: 'Server-Side Attribution & Dashboards',
        spec: 'First-party cookie tracking, Meta Conversions API, and live revenue-per-channel reporting',
        impact: '99.2% attribution accuracy',
      },
    ],
    shortTab: 'Meta & Google Ads',
    timeline: '2–3 Weeks',
    outcomeMetric: '4.1x Verified Blended ROAS',
  },
  {
    id: 'local-business',
    index: '04',
    title: 'Local Business Growth, Map Pack SEO & Digital Catalogs',
    subtitle: 'BUILT FOR CLINICS, SALONS, CAFES, GYMS & RETAIL SHOWROOMS',
    description:
      'Turn nearby smartphone searchers into loyal daily customers. We set up your complete digital storefront, rank you #1 on Google Maps, and automate repeat visits via WhatsApp.',
    architectureNote: 'Google Business Profile Engine + QR Review Funnel + 1-Tap UPI Catalog',
    metrics: [
      { label: 'Google Map Pack Calls', value: '3.2x', delta: 'Top-3 "Near Me" Ranking' },
      { label: 'Verified 5-Star Reviews', value: '+180%', delta: 'Automated QR Follow-Up' },
    ],
    deliverables: [
      {
        name: 'Google Business Profile & Map Pack #1',
        spec: 'Local citation building, geo-tagged media, keyword-rich service menus, and weekly rank tracking',
        impact: 'Dominates local 5km–15km search radius',
      },
      {
        name: 'WhatsApp Appointment & QR Review System',
        spec: 'In-store QR standees and automated post-visit WhatsApp nudges that collect 5-star Google reviews',
        impact: 'Builds unstoppable local trust fast',
      },
      {
        name: 'Digital Ordering & Booking Website',
        spec: 'Mobile-first catalog with 1-tap WhatsApp ordering, UPI payments, and Google Maps directions',
        impact: 'Zero commission fees to 3rd-party apps',
      },
    ],
    shortTab: 'Local Businesses',
    timeline: '10–14 Days',
    outcomeMetric: '3.2x Local Calls & Walk-Ins',
  },
  {
    id: 'technical-seo-aeo',
    index: '05',
    title: 'Technical SEO, Programmatic Hubs & AI Search (AEO)',
    subtitle: 'ORGANIC SEARCH DOMINANCE & AI ANSWER CITATIONS',
    description:
      'Capture buyers searching across Google, ChatGPT, and Perplexity with structured JSON-LD entity graphs, programmatic regional landing pages, and sub-second Core Web Vitals.',
    architectureNote: 'JSON-LD Schema Graph + Programmatic City Hubs + Edge SSR',
    metrics: [
      { label: 'Organic Search Pipeline', value: '+240%', delta: 'Top-3 SERP Positions' },
      { label: 'Core Web Vitals Score', value: '100/100', delta: 'Zero Layout Shift' },
    ],
    deliverables: [
      {
        name: 'Programmatic Location & Service Hubs',
        spec: 'Dynamic schema-backed landing pages targeting high-intent regional and category searches',
        impact: '+240% compounding organic traffic',
      },
      {
        name: 'AI Answer Engine Optimization (AEO)',
        spec: 'Structured entity markup engineered for citations in ChatGPT, Perplexity, and Google AI Overviews',
        impact: 'Top brand authority in AI answers',
      },
    ],
    shortTab: 'SEO & AEO Search',
    timeline: '3–4 Weeks',
    outcomeMetric: '+240% Organic Pipeline',
  },
  {
    id: 'd2c-ecommerce-upi',
    index: '06',
    title: 'D2C Storefronts, Digital Catalogs & 1-Tap UPI Checkouts',
    subtitle: 'HIGH-SPEED HEADLESS COMMERCE & CART RECOVERY',
    description:
      'Replace sluggish marketplaces and high commissions with your own sub-second D2C storefront featuring 1-tap UPI checkout and automated WhatsApp cart recovery.',
    architectureNote: 'Headless Storefront + Razorpay/Stripe 1-Tap UPI + WhatsApp Recovery',
    metrics: [
      { label: 'Checkout Completion', value: '+68%', delta: '1-Tap UPI Flow' },
      { label: 'Cart Recovery Rate', value: '24%', delta: 'WhatsApp Auto-Nudge' },
    ],
    deliverables: [
      {
        name: '1-Tap UPI & Express Checkout',
        spec: 'Seamless GPay, PhonePe, Paytm, and card payment flows with instant webhook confirmation',
        impact: '+68% mobile checkout completion',
      },
      {
        name: 'Automated WhatsApp Cart Recovery',
        spec: 'Instant WhatsApp reminders with 1-click checkout links when shoppers abandon carts',
        impact: 'Recovers 24% of lost orders',
      },
    ],
    shortTab: 'D2C & E-Commerce',
    timeline: '2–4 Weeks',
    outcomeMetric: '+68% Checkout Conversion',
  },
  {
    id: 'cloud-saas-mvp',
    index: '07',
    title: 'Custom SaaS MVP, Admin Portals & Cloud Infrastructure',
    subtitle: 'MULTI-TENANT SAAS & ENTERPRISE INTERNAL TOOLS',
    description:
      'Go from concept to revenue-ready SaaS product with multi-tenant authentication, subscription billing, role-based admin dashboards, and auto-scaling cloud deployment.',
    architectureNote: 'PostgreSQL Multi-Tenant + Docker/AWS + Stripe/Razorpay Subscriptions',
    metrics: [
      { label: 'MVP Launch Speed', value: '4 Weeks', delta: 'Production-Ready' },
      { label: 'API P99 Latency', value: '< 85ms', delta: 'Redis Edge Cache' },
    ],
    deliverables: [
      {
        name: 'Multi-Tenant Auth & Subscription Billing',
        spec: 'RBAC permissions, organization workspaces, and automated recurring invoice webhooks',
        impact: 'Ready for enterprise onboarding',
      },
      {
        name: 'Real-Time Analytics & Admin CRM Portals',
        spec: 'Custom executive dashboards, audit logs, and automated background job queues',
        impact: '100% operational visibility',
      },
    ],
    shortTab: 'SaaS & Cloud MVP',
    timeline: '3–5 Weeks',
    outcomeMetric: '99.98% Cloud Uptime SLA',
  },
];

export const SHOWCASE_PROJECTS: ShowcaseProject[] = [
  {
    id: 'proj-FinVantage',
    title: 'FinVantage Cloud Treasury & Billing SaaS',
    clientType: 'B2B FinTech Startup',
    categoryTag: 'WEB & SAAS',
    category: 'WEB & SAAS',
    metricsHeadline: '3.8x Faster Onboarding',
    tags: 'Next.js 15 • TypeScript • PostgreSQL • Redis',
    summary:
      'Architected a multi-tenant financial analytics dashboard and automated GST billing engine handling 50,000+ daily transactions with sub-second reporting.',
    impactMetric: '3.8x Faster Onboarding',
    secondaryMetric: '99.99% Uptime SLA',
    techStack: ['Next.js 15', 'TypeScript', 'PostgreSQL', 'Redis', 'Razorpay Route'],
    livePreviewLabel: 'SaaS Architecture Case Study',
    imageUrl: '',
    challenge:
      'Legacy spreadsheet workflows and slow monolithic dashboards caused a 42% drop-off during enterprise client onboarding and delayed monthly reconciliation.',
    solution:
      'Engineered a multi-tenant Next.js 15 + PostgreSQL cloud platform with automated webhook reconciliation, role-based access control, and sub-100ms Redis caching.',
    results: [
      '3.8x faster enterprise merchant onboarding within the first 60 days',
      'Reduced report generation latency from 14 seconds to 180 milliseconds',
      'Automated 94% of recurring GST invoice and payout reconciliation',
    ],
  },
  {
    id: 'proj-AuraCare',
    title: 'AuraCare Multi-Clinic Booking & Map Pack Engine',
    clientType: 'Dental & Aesthetics Chain (6 Clinics)',
    categoryTag: 'LOCAL BUSINESS',
    category: 'LOCAL BUSINESS',
    metricsHeadline: '3.4x Patient Bookings',
    tags: 'Google Map Pack SEO • WhatsApp Cloud API • Smart QR Standees',
    summary:
      'Ranked all 6 clinic locations in the Google Maps Top 3 and deployed a 24/7 WhatsApp appointment bot that eliminated missed front-desk calls.',
    impactMetric: '3.4x Patient Bookings',
    secondaryMetric: '+420 Google Reviews',
    techStack: ['Google Map Pack SEO', 'WhatsApp Cloud API', 'Next.js', 'Automated QR Reviews'],
    livePreviewLabel: 'Local Growth Case Study',
    imageUrl: '',
    challenge:
      'Receptionists were missing 38% of incoming patient calls during peak clinic hours, and competitors were outranking 4 of the 6 branches on Google Maps.',
    solution:
      'Deployed an official WhatsApp appointment booking bot synced with doctor calendars, overhauled Google Business Profiles with localized schema, and installed smart QR review standees.',
    results: [
      '3.4x increase in confirmed monthly patient appointments across all 6 branches',
      '420+ new verified 5-star Google reviews collected in 90 days',
      'Ranked #1 in Google Map Pack for 18 high-intent local treatment keywords',
    ],
  },
  {
    id: 'proj-VeloraD2C',
    title: 'Velora D2C Storefront & Performance Ad Funnel',
    clientType: 'D2C Apparel & Lifestyle Brand',
    categoryTag: 'ADS & E-COMMERCE',
    category: 'ADS & E-COMMERCE',
    metricsHeadline: '4.4x Blended ROAS',
    tags: 'React Storefront • Meta CAPI • 1-Tap UPI Checkout',
    summary:
      'Rebuilt their mobile storefront for sub-second speed, integrated 1-tap UPI checkout, and scaled Meta + Google Shopping ads with server-side CAPI tracking.',
    impactMetric: '4.4x Blended ROAS',
    secondaryMetric: '+68% Checkout Rate',
    techStack: ['React Storefront', 'Meta CAPI', 'Google Shopping', '1-Tap UPI', 'WhatsApp Cart Recovery'],
    livePreviewLabel: 'D2C Scaling Case Study',
    imageUrl: '',
    challenge:
      'A 5.2-second mobile page load time and iOS ad-tracking signal loss caused high cart abandonment and unprofitable Meta ad campaigns.',
    solution:
      'Built a sub-second headless storefront with 1-tap UPI checkout, server-side Meta Conversions API attribution, and automated WhatsApp abandoned-cart recovery.',
    results: [
      'Scaled monthly ad spend 3x while maintaining a verified 4.4x blended ROAS',
      'Lifted mobile checkout completion rate by +68%',
      'Recovered 24% of abandoned carts automatically via WhatsApp nudges',
    ],
  },
  {
    id: 'proj-NexaProp',
    title: 'NexaProp AI Voice & WhatsApp Lead Qualifier',
    clientType: 'Commercial Real Estate Group',
    categoryTag: 'AI & CRM',
    category: 'AI & CRM',
    metricsHeadline: '< 1.1s Lead Response',
    tags: 'OpenAI RAG • WhatsApp Cloud API • Python FastAPI • HubSpot',
    summary:
      'Deployed an autonomous AI lead desk that responds to Meta/Google property inquiries in 1.1 seconds on WhatsApp, shares brochures, and books site visits.',
    impactMetric: '< 1.1s Lead Response',
    secondaryMetric: '+190% Site Visits',
    techStack: ['OpenAI RAG', 'WhatsApp Cloud API', 'Python FastAPI', 'HubSpot CRM Sync'],
    livePreviewLabel: 'AI Automation Case Study',
    imageUrl: '',
    challenge:
      'Sales reps took an average of 4 hours to call back Meta & Google property leads, resulting in cold prospects and wasted ad budgets.',
    solution:
      'Connected Meta Lead Ads and Google Search forms directly to a multilingual RAG AI WhatsApp agent that qualifies budget, sends floor plans, and books site visits.',
    results: [
      'Cut lead response time from 4 hours to 1.1 seconds (24/7)',
      'Increased qualified weekend property site visits by +190%',
      'Saved 65+ hours per week of manual tele-calling for the sales team',
    ],
  },
];

export const EXECUTION_ROADMAP: RoadmapPhase[] = [
  {
    step: '01',
    phase: 'AUDIT & ARCHITECTURE BLUEPRINT',
    duration: 'Days 1 – 3',
    title: 'Discovery, Funnel Audit & Technical Specification',
    description:
      'We audit your current website, local search visibility, ad leaks, and manual bottlenecks—delivering a clear, fixed-scope execution blueprint before writing a single line of code.',
    deliverables: [
      'Competitor, SEO & Conversion Leak Audit',
      'System Architecture & UI/UX Wireframe Blueprint',
      'Fixed-Milestone Timeline & ROI Forecast',
    ],
    verificationGate: 'GATE: Signed Architecture Blueprint & Clear KPI Targets',
  },
  {
    step: '02',
    phase: 'RAPID SPRINT & INTEGRATION',
    duration: 'Weeks 1 – 3',
    title: 'Full-Stack Build, AI/WhatsApp Setup & Tracking',
    description:
      'Our engineers build your high-speed website/SaaS, configure your WhatsApp & CRM automation, optimize your Google Business Profile, and wire up server-side analytics.',
    deliverables: [
      'Staging Deployment with Live Interactive Previews',
      'WhatsApp Bot, Payment Gateway & CRM Integration',
      '99/100 Speed, Mobile UX & Security Verification',
    ],
    verificationGate: 'GATE: Sub-Second Load Test & End-to-End Automation QA',
  },
  {
    step: '03',
    phase: 'LAUNCH, SCALE & COMPOUND',
    duration: 'Ongoing Growth',
    title: 'Go-Live Launch, Performance Ads & Continuous Scaling',
    description:
      'We launch with zero downtime, activate your Meta/Google ad funnels and local SEO engine, and provide live ROI dashboards plus full team handover.',
    deliverables: [
      'Production Launch & Live ROAS / Lead Dashboard',
      'Ongoing Ad Creative Testing & Map Pack SEO',
      'Full Source-Code Ownership & Priority Support SLA',
    ],
    verificationGate: 'GATE: Live Revenue Attribution & Verified Lead Flow',
  },
];

export const CLIENT_PROOF_CASES: ClientProofCase[] = [
  {
    id: 'case-1',
    clientSector: 'B2B SaaS & Cloud Billing Platform',
    challenge:
      'Slow legacy website and manual demo booking caused high ad CPL and 40% lead drop-off.',
    solution:
      'Re-engineered the platform on Next.js with an instant WhatsApp + calendar qualification flow.',
    primaryMetric: '+215%',
    primaryMetricLabel: 'Qualified Demo Pipeline',
    secondaryMetric: '0.5s Page Load Speed',
    timeframe: 'Delivered in 4 Weeks',
    tags: ['NEXT.JS', 'WHATSAPP CRM', 'TECHNICAL SEO'],
  },
  {
    id: 'case-2',
    clientSector: 'Multi-Branch Dental & Skin Clinic',
    challenge:
      'Invisible on Google Maps for "near me" searches and missing 35%+ of patient phone inquiries.',
    solution:
      'Executed Google Map Pack SEO, QR review standees, and a 24/7 WhatsApp appointment bot.',
    primaryMetric: '3.4x',
    primaryMetricLabel: 'Monthly Patient Walk-Ins',
    secondaryMetric: '#1 Google Map Pack Rank',
    timeframe: 'Results in 45 Days',
    tags: ['LOCAL SEO', 'WHATSAPP BOT', 'GOOGLE ADS'],
  },
];

export const VERIFIED_REVIEWS: VerifiedReview[] = [
  {
    id: 'rev-1',
    quote:
      'SkyLine completely transformed our digital presence. Our new web platform loads instantly, and their WhatsApp AI bot qualifies and books client calls automatically even while our team is asleep.',
    author: 'Vikramaditya Rao',
    role: 'Founder & CEO, FinVantage Systems',
    serviceTag: 'WEB & AI AUTOMATION',
    impactHighlight: '3.1x Qualified Demos in 45 Days',
    rating: 5,
    verifiedOutcome: '3.1x Qualified Demos in 45 Days',
    engagementScope: 'WEB & AI AUTOMATION',
  },
  {
    id: 'rev-2',
    quote:
      'Within 6 weeks of SkyLine optimizing our Google Business Profile and launching our WhatsApp booking system, our clinic jumped to #1 on Google Maps and daily patient walk-ins tripled.',
    author: 'Dr. Ananya Sharma',
    role: 'Clinical Director, AuraCare Aesthetics',
    serviceTag: 'LOCAL BUSINESS GROWTH',
    impactHighlight: '#1 Map Pack Rank & 3.4x Bookings',
    rating: 5,
    verifiedOutcome: '#1 Map Pack Rank & 3.4x Bookings',
    engagementScope: 'LOCAL BUSINESS GROWTH',
  },
  {
    id: 'rev-3',
    quote:
      'Most agencies just burn ad budget and send PDF reports. SkyLine rebuilt our D2C checkout flow, fixed our Meta CAPI tracking, and scaled our ROAS to 4.4x with complete transparency.',
    author: 'Rohan Mehta',
    role: 'Co-Founder, Velora Lifestyle',
    serviceTag: 'E-COMMERCE & META ADS',
    impactHighlight: '4.4x Blended ROAS Achieved',
    rating: 5,
    verifiedOutcome: '4.4x Blended ROAS Achieved',
    engagementScope: 'E-COMMERCE & META ADS',
  },
];

export const FAQ_ITEMS: FaqItem[] = [
  {
    id: 'faq-1',
    category: 'LOCAL & GLOBAL CLIENTS',
    question: 'Do you work with local businesses (clinics, salons, retail) as well as startups?',
    answer:
      'Yes! We have two specialized tracks: (1) High-ROI Local Business Growth packages covering Google Maps #1 ranking, fast mobile websites, automated 5-star Google review systems, and WhatsApp booking bots; and (2) Full-stack SaaS, custom web apps, AI agents, and performance marketing for scaling startups and enterprises.',
  },
  {
    id: 'faq-2',
    category: 'TIMELINE & DELIVERY',
    question: 'How fast can you launch our website, WhatsApp automation, or ad campaign?',
    answer:
      'Conversion websites, local business systems, and WhatsApp CRM automations typically go live in 10 to 14 days. Custom SaaS platforms, e-commerce storefronts, and multi-agent AI systems are delivered in 3 to 5 weeks with weekly live staging previews.',
  },
  {
    id: 'faq-3',
    category: 'PRICING & TRANSPARENCY',
    question: 'How does your pricing work? Are there any hidden retainers?',
    answer:
      'Zero hidden fees. Every engagement starts with a transparent, fixed-scope architecture blueprint and milestone schedule. Whether you need a one-time website + WhatsApp bot build or an ongoing monthly SEO & Ads growth engine, you see exact deliverables and pricing upfront.',
  },
  {
    id: 'faq-4',
    category: 'OWNERSHIP & CODE',
    question: 'Do we own 100% of our website source code, ad accounts, and customer data?',
    answer:
      '100% yes. Unlike lock-in agencies, you retain full administrative ownership of your GitHub repository, domain, cloud hosting, Google Business Profile, Meta/Google Ad accounts, and WhatsApp CRM database from day one.',
  },
  {
    id: 'faq-5',
    category: 'REFERRAL PARTNER PROGRAM',
    question: 'How does the 15% Referral Partner Commission work?',
    answer:
      'If you introduce a founder, clinic owner, retail brand, or business that signs a project with SkyLine Digital, we pay you a direct 15% commission on the project value via UPI or bank transfer as soon as their onboarding invoice clears.',
  },
];

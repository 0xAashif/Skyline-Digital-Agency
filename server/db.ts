import fs from 'node:fs';
import path from 'node:path';
import {
  CAPABILITY_PILLARS,
  FAQ_ITEMS,
  SHOWCASE_PROJECTS,
  VERIFIED_REVIEWS,
} from '../src/data/agencyData';
import { hashPassword } from './auth';
import { DatabaseSchema, LeadRecord, ReferralRecord } from './types';

const DATA_DIR = path.resolve(process.cwd(), 'data');
const DB_FILE_PATH = path.join(DATA_DIR, 'skyline-db.json');

export const DEFAULT_ADMIN_EMAIL = 'admin@skylinedigital.in';
export const DEFAULT_ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'SkyLine@2026';

const INITIAL_SEED_LEADS: LeadRecord[] = [
  {
    id: 'LEAD-2026-101',
    nameOrCompany: 'Vikramaditya Singh / Pinnacle Luxury Estates',
    contact: '+91 86430 02478',
    contactType: 'whatsapp',
    inquiryType: 'meeting',
    budget: '₹2.5L – ₹5L',
    meetingDate: '2026-10-27',
    meetingSlot: '11:00 AM - 11:30 AM IST',
    selectedPillars: [
      'Web Engineering (Next.js & React)',
      'AI & WhatsApp CRM Automation',
      'Performance Ads (Meta & Google)',
    ],
    projectScope:
      '[Strategy Meeting: 2026-10-27 at 11:00 AM - 11:30 AM IST] Need a Next.js 15 360° luxury tower portal for our Indore & Mumbai project with Meta CAPI and <6s WhatsApp site-visit booking.',
    status: 'qualified',
    notes: 'High-intent real estate developer. Demoed 360 Views Property Hub architecture.',
    source: 'System Architect Simulator',
    createdAt: '2026-10-23T09:30:00.000Z',
    updatedAt: '2026-10-24T11:15:00.000Z',
  },
  {
    id: 'LEAD-2026-102',
    nameOrCompany: 'Dr. Ananya Nair / Aura Dental & Skin Clinic',
    contact: '+91 89591 44686',
    contactType: 'whatsapp',
    inquiryType: 'inquiry',
    budget: '₹65,000 – ₹1.2L',
    selectedPillars: [
      'Local Business Growth & Digitization',
      'Technical SEO & AEO Search',
    ],
    projectScope:
      'Want #1 Google Map Pack ranking across Bhopal & Indore branches, physical Smart QR 5-Star Review Standees at reception, and automated WhatsApp slot booking.',
    status: 'new',
    notes: 'Inbound from Local Business Growth tab.',
    source: 'Website Inquiry Form',
    createdAt: '2026-10-24T06:45:00.000Z',
    updatedAt: '2026-10-24T06:45:00.000Z',
  },
  {
    id: 'LEAD-2026-103',
    nameOrCompany: 'Karan Malhotra / Veloce D2C Athletics',
    contact: 'karan@veloced2c.in',
    contactType: 'email',
    inquiryType: 'inquiry',
    budget: '₹1.5L – ₹3L',
    selectedPillars: [
      'Conversion UI/UX & D2C Checkouts',
      'Performance Ads (Meta & Google)',
    ],
    projectScope:
      'Looking to migrate from a slow template to a sub-100ms headless storefront with 1-Tap UPI checkout (GPay/PhonePe) and automated WhatsApp abandoned cart recovery.',
    status: 'contacted',
    notes: 'Sent architecture teardown and fixed milestone roadmap.',
    source: 'Official Desk Email',
    createdAt: '2026-10-22T14:20:00.000Z',
    updatedAt: '2026-10-23T16:10:00.000Z',
  },
];

const INITIAL_SEED_REFERRALS: ReferralRecord[] = [
  {
    id: 'REF-2026-201',
    referrerName: 'Rohan Kulkarni',
    referrerContact: '+91 86430 02478',
    referredBusiness: 'Apex Multi-Specialty Clinic & Diagnostics',
    estimatedDealValue: 160000,
    commissionAmount: 24000,
    status: 'closed-won',
    createdAt: '2026-10-19T10:00:00.000Z',
  },
  {
    id: 'REF-2026-202',
    referrerName: 'Siddharth Joshi',
    referrerContact: 'siddharth.j@finscale.io',
    referredBusiness: 'NovaCart D2C Home Essentials',
    estimatedDealValue: 240000,
    commissionAmount: 36000,
    status: 'in-discussion',
    createdAt: '2026-10-23T15:10:00.000Z',
  },
];

export function createInitialSeedDatabase(): DatabaseSchema {
  return {
    users: [
      {
        id: 'admin-skyline-01',
        email: DEFAULT_ADMIN_EMAIL,
        name: 'Lead System Architect (SkyLine Admin)',
        role: 'admin',
        passwordHash: hashPassword(DEFAULT_ADMIN_PASSWORD),
      },
    ],
    leads: structuredClone(INITIAL_SEED_LEADS),
    referrals: structuredClone(INITIAL_SEED_REFERRALS),
    projects: structuredClone(SHOWCASE_PROJECTS),
    services: structuredClone(CAPABILITY_PILLARS),
    testimonials: structuredClone(VERIFIED_REVIEWS),
    faqs: structuredClone(FAQ_ITEMS),
  };
}

let memoryDb: DatabaseSchema | null = null;

export function getDb(): DatabaseSchema {
  if (memoryDb) {
    return memoryDb;
  }

  try {
    if (fs.existsSync(DB_FILE_PATH)) {
      const raw = fs.readFileSync(DB_FILE_PATH, 'utf8');
      const parsed = JSON.parse(raw) as Partial<DatabaseSchema>;
      const seed = createInitialSeedDatabase();
      memoryDb = {
        users: Array.isArray(parsed.users) && parsed.users.length > 0 ? parsed.users : seed.users,
        leads: Array.isArray(parsed.leads) ? parsed.leads : seed.leads,
        referrals: Array.isArray(parsed.referrals) ? parsed.referrals : seed.referrals,
        projects:
          Array.isArray(parsed.projects) && parsed.projects.length > 0
            ? parsed.projects
            : seed.projects,
        services:
          Array.isArray(parsed.services) && parsed.services.length > 0
            ? parsed.services
            : seed.services,
        testimonials:
          Array.isArray(parsed.testimonials) && parsed.testimonials.length > 0
            ? parsed.testimonials
            : seed.testimonials,
        faqs: Array.isArray(parsed.faqs) && parsed.faqs.length > 0 ? parsed.faqs : seed.faqs,
      };
      return memoryDb;
    }
  } catch {
    // Fallback to clean seed if file is corrupt or unreadable
  }

  memoryDb = createInitialSeedDatabase();
  saveDb(memoryDb);
  return memoryDb;
}

export function saveDb(nextDb: DatabaseSchema): void {
  memoryDb = nextDb;
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    const tmpFile = `${DB_FILE_PATH}.tmp`;
    fs.writeFileSync(tmpFile, JSON.stringify(nextDb, null, 2), 'utf8');
    fs.renameSync(tmpFile, DB_FILE_PATH);
  } catch {
    // In read-only container environments, memoryDb still holds the authoritative runtime state
  }
}

export function resetDbToDefault(): DatabaseSchema {
  const fresh = createInitialSeedDatabase();
  saveDb(fresh);
  return fresh;
}

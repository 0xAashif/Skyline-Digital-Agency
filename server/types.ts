import {
  CapabilityPillar,
  ClientReview,
  FaqItem,
  SemanticAccentColor,
  ShowcaseProject,
} from '../src/data/agencyData';

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

export interface AdminUserRecord {
  id: string;
  email: string;
  name: string;
  role: 'admin';
  passwordHash: string;
}

export interface DatabaseSchema {
  users: AdminUserRecord[];
  leads: LeadRecord[];
  referrals: ReferralRecord[];
  projects: ShowcaseProject[];
  services: CapabilityPillar[];
  testimonials: ClientReview[];
  faqs: FaqItem[];
}

export interface CreateLeadPayload {
  nameOrCompany: string;
  contact: string;
  inquiryType?: 'inquiry' | 'meeting';
  budget?: string;
  meetingDate?: string;
  meetingSlot?: string;
  selectedPillars: string[];
  projectScope: string;
  source?: string;
}

export interface CreateReferralPayload {
  referrerName: string;
  referrerContact?: string;
  referredBusiness: string;
  estimatedDealValue: number;
}

export interface CmsBundleResponse {
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

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_REGEX = /^(?:\+?91[\s-]?)?[6-9]\d{9}$|^\+?[1-9]\d{7,14}$/;

export function validateCreateLeadPayload(input: Partial<CreateLeadPayload>): {
  valid: boolean;
  error?: string;
  contactType: 'whatsapp' | 'email';
} {
  const name = (input.nameOrCompany ?? '').trim();
  const contact = (input.contact ?? '').trim();
  const scope = (input.projectScope ?? '').trim();
  const pillars = Array.isArray(input.selectedPillars) ? input.selectedPillars : [];

  if (name.length < 2) {
    return {
      valid: false,
      error: 'Please enter your name or company (at least 2 characters).',
      contactType: 'whatsapp',
    };
  }

  const compactPhone = contact.replace(/[\s()-]/g, '');
  const isEmail = EMAIL_REGEX.test(contact);
  const isPhone = PHONE_REGEX.test(compactPhone);

  if (!isEmail && !isPhone) {
    return {
      valid: false,
      error: 'Enter a valid +91 WhatsApp mobile number or work email address.',
      contactType: 'whatsapp',
    };
  }

  if (pillars.length === 0) {
    return {
      valid: false,
      error: 'Select at least one service pillar.',
      contactType: isEmail ? 'email' : 'whatsapp',
    };
  }

  if (scope.length < 10) {
    return {
      valid: false,
      error: 'Project scope must be at least 10 characters.',
      contactType: isEmail ? 'email' : 'whatsapp',
    };
  }

  return {
    valid: true,
    contactType: isEmail ? 'email' : 'whatsapp',
  };
}

export function validateCreateReferralPayload(input: Partial<CreateReferralPayload>): {
  valid: boolean;
  error?: string;
  commissionAmount: number;
  normalizedDealValue: number;
} {
  const referrerName = (input.referrerName ?? '').trim();
  const referredBusiness = (input.referredBusiness ?? '').trim();
  const rawDealValue = Number(input.estimatedDealValue ?? 120000);
  const normalizedDealValue = Number.isFinite(rawDealValue)
    ? Math.max(20000, Math.min(5000000, Math.round(rawDealValue)))
    : 120000;
  const commissionAmount = Math.round(normalizedDealValue * 0.15);

  if (referrerName.length < 2) {
    return {
      valid: false,
      error: 'Please enter your name (at least 2 characters) to register your referral.',
      commissionAmount,
      normalizedDealValue,
    };
  }

  if (referredBusiness.length < 2) {
    return {
      valid: false,
      error: 'Please enter the referred business or founder name.',
      commissionAmount,
      normalizedDealValue,
    };
  }

  return {
    valid: true,
    commissionAmount,
    normalizedDealValue,
  };
}

export function computeAdminOverviewStats(db: DatabaseSchema): AdminOverviewStats {
  const totalLeads = db.leads.length;
  const newLeads = db.leads.filter((l) => l.status === 'new').length;
  const qualifiedLeads = db.leads.filter(
    (l) => l.status === 'qualified' || l.status === 'proposal-sent'
  ).length;
  const closedWonLeads = db.leads.filter((l) => l.status === 'closed-won').length;
  const totalReferrals = db.referrals.length;
  const totalCommissionVolume = db.referrals.reduce((acc, r) => acc + r.commissionAmount, 0);

  return {
    totalLeads,
    newLeads,
    qualifiedLeads,
    closedWonLeads,
    totalReferrals,
    totalCommissionVolume,
    totalProjects: db.projects.length,
    totalServices: db.services.length,
    totalTestimonials: db.testimonials.length,
    totalFaqs: db.faqs.length,
  };
}

export const VALID_ACCENT_COLORS: SemanticAccentColor[] = [
  'emerald',
  'indigo',
  'violet',
  'amber',
  'cyan',
  'rose',
];

import test from 'node:test';
import assert from 'node:assert/strict';
import { hashPassword, signToken, verifyPassword, verifyToken } from './auth';
import { createInitialSeedDatabase } from './db';
import {
  computeAdminOverviewStats,
  validateCreateLeadPayload,
  validateCreateReferralPayload,
} from './types';

test('validateCreateLeadPayload validates lead name, contact, pillars, and scope', () => {
  const missingName = validateCreateLeadPayload({
    nameOrCompany: 'A',
    contact: '+91 98260 12345',
    selectedPillars: ['Local Business Growth & Digitization'],
    projectScope: 'Need Google Map Pack #1 and WhatsApp booking bot.',
  });
  assert.equal(missingName.valid, false);

  const validWhatsApp = validateCreateLeadPayload({
    nameOrCompany: 'Rahul Sharma / Apex Clinic',
    contact: '+91 98260 12345',
    selectedPillars: ['Local Business Growth & Digitization'],
    projectScope: 'Need Google Map Pack #1 and WhatsApp booking bot.',
  });
  assert.equal(validWhatsApp.valid, true);
  assert.equal(validWhatsApp.contactType, 'whatsapp');

  const validEmail = validateCreateLeadPayload({
    nameOrCompany: 'Aarav Mehta',
    contact: 'aarav@company.in',
    selectedPillars: ['Web Engineering (Next.js & React)'],
    projectScope: 'Custom Next.js 15 SaaS platform with 99+ Core Web Vitals.',
  });
  assert.equal(validEmail.valid, true);
  assert.equal(validEmail.contactType, 'email');
});

test('validateCreateReferralPayload calculates 15% commission accurately', () => {
  const invalid = validateCreateReferralPayload({
    referrerName: '',
    referredBusiness: 'Nova Retail',
    estimatedDealValue: 200000,
  });
  assert.equal(invalid.valid, false);

  const valid = validateCreateReferralPayload({
    referrerName: 'Rohan Kulkarni',
    referredBusiness: 'Nova Retail & Showroom',
    estimatedDealValue: 200000,
  });
  assert.equal(valid.valid, true);
  assert.equal(valid.commissionAmount, 30000);
});

test('Admin auth password hashing and HMAC token verification work end-to-end', () => {
  const hash = hashPassword('SkyLine@2026');
  assert.equal(verifyPassword('SkyLine@2026', hash), true);
  assert.equal(verifyPassword('WrongPass', hash), false);

  const token = signToken({
    id: 'admin-skyline-01',
    email: 'admin@skylinedigital.in',
    name: 'SkyLine Admin',
    role: 'admin',
  });
  const verified = verifyToken(token);
  assert.ok(verified);
  assert.equal(verified.email, 'admin@skylinedigital.in');
  assert.equal(verified.role, 'admin');
  assert.equal(verifyToken(`${token}tampered`), null);
});

test('computeAdminOverviewStats aggregates seeded database state accurately', () => {
  const seed = createInitialSeedDatabase();
  const stats = computeAdminOverviewStats(seed);
  assert.equal(stats.totalLeads, 3);
  assert.equal(stats.totalReferrals, 2);
  assert.equal(stats.totalCommissionVolume, 60000);
  assert.ok(stats.totalProjects >= 4);
  assert.ok(stats.totalServices >= 7);
});

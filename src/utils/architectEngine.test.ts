import test from 'node:test';
import assert from 'node:assert/strict';
import {
  IndustryType,
  BottleneckType,
  generateSystemBlueprint,
  validateProposalForm,
  buildProposalWhatsAppUrl,
  buildProposalMailtoUrl,
  buildReferralWhatsAppUrl,
  computeIdempotencyKey,
  clearIdempotencyLocks,
  getTelemetrySnapshot,
  clearTelemetryBuffer,
  SKYLINE_WHATSAPP_NUMBER,
  SKYLINE_EMAIL,
} from './architectEngine';
import { FOUNDER_PROFILES, HERO_ORBS } from '../data/agencyData';

test('FOUNDER_PROFILES contains complete resume details for Aashif Khan and Sachin Sahu and HERO_ORBS uses titanium/silver/champagne palette', () => {
  assert.equal(FOUNDER_PROFILES.length, 2);
  const aashif = FOUNDER_PROFILES.find((f) => f.id === 'aashif-khan');
  const sachin = FOUNDER_PROFILES.find((f) => f.id === 'sachin-sahu');
  assert.ok(aashif, 'Expected Aashif Khan founder profile');
  assert.ok(sachin, 'Expected Sachin Sahu founder profile');
  assert.equal(aashif.email, 'aashifkpp@gmail.com');
  assert.equal(sachin.email, 'sachinsahuji306@gmail.com');
  assert.ok(aashif.resumePdfUrl.includes('Aashif_Khan_Resume'));
  assert.ok(sachin.resumePdfUrl.includes('Sachin_Sahu_Resume'));
  assert.ok(aashif.projects.some((p) => p.name.includes('FileGuard AI')));
  assert.ok(sachin.projects.some((p) => p.name.includes('ShadowBase')));
  assert.ok(sachin.projects.some((p) => p.name.includes('GridWeaver')));

  // Verify zero #8B5CF6 or #10B981 in HERO_ORBS
  for (const orb of HERO_ORBS) {
    assert.notEqual(orb.psychColor.toUpperCase(), '#8B5CF6');
    assert.notEqual(orb.psychColor.toUpperCase(), '#10B981');
  }
});

test('generateSystemBlueprint produces unique valid 3-layer blueprints across all 16 combinations', () => {
  clearTelemetryBuffer();
  const industries = Object.values(IndustryType);
  const bottlenecks = Object.values(BottleneckType);
  const codes = new Set<string>();

  for (const industry of industries) {
    for (const bottleneck of bottlenecks) {
      const bp = generateSystemBlueprint(industry, bottleneck, 10000);
      codes.add(bp.blueprintCode);
      assert.equal(bp.layers.length, 3);
      assert.ok(bp.estimatedTimeline.includes('Weeks'));
      assert.ok(bp.monthlyQualifiedPipeline > 0);
      assert.ok(bp.projectedAdditionalLeads > 0);
      assert.ok(bp.whatsappUrl.startsWith(`https://wa.me/${SKYLINE_WHATSAPP_NUMBER}?text=`));
      assert.ok(bp.whatsappPreviewText.includes(industry));
      assert.ok(bp.whatsappPreviewText.includes(bottleneck));
    }
  }

  assert.equal(codes.size, 16, 'Expected 16 distinct blueprint codes');
  const telemetry = getTelemetrySnapshot();
  assert.equal(telemetry.totalEvents, 16);
  assert.equal(telemetry.errorCount, 0);
});

test('validateProposalForm rejects empty, malformed, and non-allowlisted inputs (4xx split)', () => {
  clearIdempotencyLocks();
  const emptyResult = validateProposalForm({
    nameOrCompany: '<script>alert(1)</script>',
    contact: '',
    selectedPillars: [],
    projectScope: 'short',
  });

  assert.equal(emptyResult.valid, false);
  assert.equal(emptyResult.statusCode, 400);
  assert.ok(emptyResult.errors.nameOrCompany);
  assert.ok(emptyResult.errors.contact);
  assert.ok(emptyResult.errors.selectedPillars);
  assert.ok(emptyResult.errors.projectScope);

  const badContactAndPillar = validateProposalForm({
    nameOrCompany: 'Apex Labs Indore',
    contact: '12345',
    selectedPillars: ['Unknown Fake Pillar'],
    projectScope: 'Need a sub-100ms Next.js storefront and WhatsApp CRM.',
  });
  assert.equal(badContactAndPillar.valid, false);
  assert.ok(badContactAndPillar.errors.contact);
  assert.ok(badContactAndPillar.errors.selectedPillars);
});

test('validateProposalForm accepts valid Indian mobile/email, strips HTML, and enforces 60s idempotency lock', () => {
  clearIdempotencyLocks();
  const validPhoneInput = {
    nameOrCompany: '<b>Aarav Retail</b>',
    contact: '+91 98765 43210',
    selectedPillars: ['Local Business Growth & Digitization', 'AI Workflows & CRM Automation'],
    projectScope: 'Rebuilding slow clinic booking site into fast custom portal with WhatsApp recovery.',
  };

  const firstAttempt = validateProposalForm(validPhoneInput, {
    enforceIdempotency: true,
    nowMs: 100_000,
  });
  assert.equal(firstAttempt.valid, true);
  assert.equal(firstAttempt.statusCode, 200);
  assert.equal(firstAttempt.sanitizedPayload?.name, 'Aarav Retail');

  // Immediate duplicate within 60s should be blocked with 429
  const duplicateAttempt = validateProposalForm(validPhoneInput, {
    enforceIdempotency: true,
    nowMs: 115_000,
  });
  assert.equal(duplicateAttempt.valid, false);
  assert.equal(duplicateAttempt.statusCode, 429);
  assert.ok(duplicateAttempt.errors.idempotency);

  // Attempt after 61s should succeed
  const afterWindowAttempt = validateProposalForm(validPhoneInput, {
    enforceIdempotency: true,
    nowMs: 161_000,
  });
  assert.equal(afterWindowAttempt.valid, true);

  const key1 = computeIdempotencyKey(validPhoneInput);
  const key2 = computeIdempotencyKey(validPhoneInput);
  assert.equal(key1, key2);

  const waUrl = buildProposalWhatsAppUrl(validPhoneInput);
  assert.ok(waUrl.includes(SKYLINE_WHATSAPP_NUMBER));
  assert.ok(decodeURIComponent(waUrl).includes('Aarav Retail'));

  const mailUrl = buildProposalMailtoUrl({
    ...validPhoneInput,
    contact: 'founder@aaravretail.in',
  });
  assert.ok(mailUrl.startsWith(`mailto:${SKYLINE_EMAIL}?subject=`));
  assert.ok(decodeURIComponent(mailUrl).includes('Local Business Growth & Digitization'));
});

test('buildReferralWhatsAppUrl encodes and sanitizes referrer details cleanly', () => {
  const url = buildReferralWhatsAppUrl('Vikram Joshi', 'Meridian Clinics Bhopal');
  assert.ok(url.startsWith(`https://wa.me/${SKYLINE_WHATSAPP_NUMBER}?text=`));
  const decoded = decodeURIComponent(url);
  assert.ok(decoded.includes('15% Partner Referral Program'));
  assert.ok(decoded.includes('Vikram Joshi'));
  assert.ok(decoded.includes('Meridian Clinics Bhopal'));
});

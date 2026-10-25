import test from 'node:test';
import assert from 'node:assert/strict';
import {
  getMonochromaticPlatinumPalette,
  isStrictlyMonochromaticPalette,
  computeFibonacciSphereNodes,
  computeFloatingPrismKinematics,
} from './heroScene3DConfig';
import { HERO_ORBS } from '../data/agencyData';

test('getMonochromaticPlatinumPalette returns strictly monochromatic silver/platinum/obsidian colors with zero golden/bronze tones', () => {
  const darkPalette = getMonochromaticPlatinumPalette(true);
  const lightPalette = getMonochromaticPlatinumPalette(false);

  assert.equal(isStrictlyMonochromaticPalette(darkPalette), true);
  assert.equal(isStrictlyMonochromaticPalette(lightPalette), true);
  assert.notEqual(darkPalette.prismCoreHex, 0xc5a880);
  assert.notEqual(lightPalette.prismCoreHex, 0xc5a880);
});

test('computeFibonacciSphereNodes distributes all 7 capability orbs across 360-degree 3D coordinates', () => {
  const nodes = computeFibonacciSphereNodes(HERO_ORBS, 1.64, 0.88);
  assert.equal(nodes.length, 7);

  // Verify every node has finite non-NaN 3D coordinates within the expected radial bound
  for (const node of nodes) {
    assert.equal(Number.isFinite(node.x), true);
    assert.equal(Number.isFinite(node.y), true);
    assert.equal(Number.isFinite(node.z), true);
    const dist = Math.hypot(node.x, node.y, node.z);
    assert.ok(dist > 1.2 && dist <= 1.7, `Node ${node.id} radial distance ${dist} out of bounds`);
  }
});

test('computeFloatingPrismKinematics calculates smooth levitation and distinct scales per sculpture mode', () => {
  const dual = computeFloatingPrismKinematics(1.5, 2, 'dual-monolith');
  const prismOnly = computeFloatingPrismKinematics(1.5, 2, 'prism-core');
  const sphereOnly = computeFloatingPrismKinematics(1.5, 2, 'geodesic-sphere');

  assert.ok(Math.abs(dual.floatY) <= 0.07);
  assert.ok(prismOnly.prismScale > dual.prismScale);
  assert.ok(sphereOnly.sphereScale > dual.sphereScale);
});

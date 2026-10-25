/**
 * Pure 3D Scene Configuration & Mathematical Helpers for the HeroSection
 * Minimalist Interactive Floating Sphere / Prism Geometry
 * Enforces a strict Monochromatic Silver / Platinum / Obsidian Palette (Zero Golden/Bronze).
 */

export type GeometrySculptureMode = 'dual-monolith' | 'prism-core' | 'geodesic-sphere';

export interface PlatinumPaletteTheme {
  isDark: boolean;
  prismCoreHex: number;
  prismEmissiveHex: number;
  prismEdgeHex: number;
  sphereWireframeHex: number;
  sphereVertexNodeHex: number;
  orbitalRingHex: number;
  activeSatelliteHex: number;
  inactiveSatelliteHex: number;
  keyLightHex: number;
  rimLightHex: number;
  fillLightHex: number;
}

export interface SphericalNodeCoordinate {
  index: number;
  id: string;
  label: string;
  x: number;
  y: number;
  z: number;
  phi: number;
  theta: number;
}

const FORBIDDEN_GOLD_BRONZE_HEXES = new Set([
  0xc5a880,
  0xd4af37,
  0xffd700,
  0xb8860b,
  0xcd7f32,
  0xdaa520,
  0xf59e0b,
]);

/**
 * Returns the verified Monochromatic Silver / Platinum / Obsidian 3D palette
 * for Light and Dark modes. Guarantees zero golden/bronze tones.
 */
export function getMonochromaticPlatinumPalette(isDark: boolean): PlatinumPaletteTheme {
  if (isDark) {
    return {
      isDark: true,
      prismCoreHex: 0xe4e4e7, // Brushed Platinum Silver
      prismEmissiveHex: 0x27272a, // Deep Titanium Glow
      prismEdgeHex: 0xffffff, // Specular White Facet Edge
      sphereWireframeHex: 0xa1a1aa, // Anodized Silver Lattice
      sphereVertexNodeHex: 0xf4f4f5, // Pure Platinum Vertex Spheres
      orbitalRingHex: 0xd4d4d8, // Machined Chrome Ring
      activeSatelliteHex: 0xffffff, // Pure White Active Beacon
      inactiveSatelliteHex: 0xa1a1aa, // Muted Silver Satellite
      keyLightHex: 0xffffff,
      rimLightHex: 0xd4d4d8,
      fillLightHex: 0x71717a,
    };
  }

  return {
    isDark: false,
    prismCoreHex: 0x27272a, // Sculpted Obsidian Titanium Core
    prismEmissiveHex: 0x18181b, // Subtle Charcoal Depth
    prismEdgeHex: 0xe4e4e7, // Crisp Platinum Edge Bevel
    sphereWireframeHex: 0x52525b, // Precision Zinc Geodesic Lattice
    sphereVertexNodeHex: 0x18181b, // Dark Titanium Vertex Spheres
    orbitalRingHex: 0x71717a, // Brushed Steel Orbital Ring
    activeSatelliteHex: 0x09090b, // High-Contrast Obsidian Active Beacon
    inactiveSatelliteHex: 0x71717a, // Muted Steel Satellite
    keyLightHex: 0xffffff,
    rimLightHex: 0xe4e4e7,
    fillLightHex: 0xa1a1aa,
  };
}

/**
 * Verifies that no color in a PlatinumPaletteTheme uses a golden or bronze hex value.
 */
export function isStrictlyMonochromaticPalette(palette: PlatinumPaletteTheme): boolean {
  const values = [
    palette.prismCoreHex,
    palette.prismEmissiveHex,
    palette.prismEdgeHex,
    palette.sphereWireframeHex,
    palette.sphereVertexNodeHex,
    palette.orbitalRingHex,
    palette.activeSatelliteHex,
    palette.inactiveSatelliteHex,
    palette.keyLightHex,
    palette.rimLightHex,
    palette.fillLightHex,
  ];
  return values.every((hex) => !FORBIDDEN_GOLD_BRONZE_HEXES.has(hex));
}

/**
 * Computes evenly distributed 360-degree Fibonacci sphere coordinates
 * for the 7 interactive capability nodes around the floating sphere/prism.
 */
export function computeFibonacciSphereNodes(
  items: { id: string; label: string }[],
  radius = 1.64,
  verticalSquash = 0.88
): SphericalNodeCoordinate[] {
  const n = items.length;
  if (n === 0) return [];

  const goldenAngle = Math.PI * (1 + Math.sqrt(5));

  return items.map((item, i) => {
    const phi = Math.acos(1 - (2 * (i + 0.5)) / n);
    const theta = goldenAngle * i;
    const x = Number((radius * Math.sin(phi) * Math.cos(theta)).toFixed(4));
    const y = Number((radius * Math.cos(phi) * verticalSquash).toFixed(4));
    const z = Number((radius * Math.sin(phi) * Math.sin(theta)).toFixed(4));

    return {
      index: i,
      id: item.id,
      label: item.label,
      x,
      y,
      z,
      phi,
      theta,
    };
  });
}

/**
 * Computes sinusoidal floating levitation offset and prism counter-rotation angles
 * for a given elapsed time (seconds) and active orb index.
 */
export function computeFloatingPrismKinematics(
  elapsedSeconds: number,
  activeOrbIndex: number,
  mode: GeometrySculptureMode
): {
  floatY: number;
  prismRotX: number;
  prismRotY: number;
  prismScale: number;
  sphereScale: number;
  targetAzimuthY: number;
} {
  const floatY = Math.sin(elapsedSeconds * 1.65) * 0.065;
  const prismRotX = elapsedSeconds * 0.42 + activeOrbIndex * 0.25;
  const prismRotY = -elapsedSeconds * 0.68 + activeOrbIndex * 0.45;

  const prismScale =
    mode === 'geodesic-sphere' ? 0.62 : mode === 'prism-core' ? 1.18 : 1.0;
  const sphereScale =
    mode === 'prism-core' ? 0.82 : mode === 'geodesic-sphere' ? 1.08 : 1.0;

  const targetAzimuthY = activeOrbIndex * ((Math.PI * 2) / 7);

  return {
    floatY,
    prismRotX,
    prismRotY,
    prismScale,
    sphereScale,
    targetAzimuthY,
  };
}

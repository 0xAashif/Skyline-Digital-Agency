import React, { useId } from 'react';
import {
  SKYLINE_INSTAGRAM_URL,
  SKYLINE_WHATSAPP_NUMBER,
  SKYLINE_LINKEDIN_URL,
  SKYLINE_TELEGRAM_URL,
  SKYLINE_X_URL,
} from '../data/agencyData';

/**
 * Precision Interlocking 'S' + 'A' Geometric Monolith (<SkyLineLogo />):
 * - Back Layer ('S' Monolith): Angular hexagonal ribbon forming 'S' with subtle bevel shading.
 * - Front Interlocking Layer ('A' Apex): Sharp 3D-faceted architectural 'A' rising through and interlocking with the lower spine of 'S' in a Brushed Liquid Platinum linearGradient.
 * - Digital Pixel Disintegration Detail: 3 crisp stepped micro-square pixels detaching diagonally downward from the bottom-right leg of the 'A'.
 * - Precision Axis Chevrons: Upward chevron ('^') above top peak, downward chevron ('v') below base, and subtle '<' and '>' code brackets flanking left and right.
 * - Wordmark Lockup: 'SKYLINE' in tracked regular Montserrat (tracking-[0.22em]) + 'DIGITAL' in bold Montserrat (font-extrabold tracking-[0.18em]).
 */
export interface SkyLineLogoProps {
  className?: string;
  iconClassName?: string;
  dockStyle?: boolean;
  showText?: boolean;
  stacked?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export const SkyLineLogo: React.FC<SkyLineLogoProps> = ({
  className = '',
  showText = true,
  stacked = false,
  size = 'md',
}) => {
  const uid = useId();
  const sGradId = `s-monolith-${uid}`;
  const aGradId = `a-apex-${uid}`;
  const aFacetId = `a-facet-${uid}`;

  const markDims =
    size === 'sm'
      ? 'w-9 h-9'
      : size === 'lg'
        ? 'w-14 h-14'
        : 'w-11 h-11';

  const skylineTextSize =
    size === 'sm'
      ? 'text-[11px]'
      : size === 'lg'
        ? 'text-base sm:text-lg'
        : 'text-xs sm:text-sm';

  const digitalTextSize =
    size === 'sm'
      ? 'text-[11px]'
      : size === 'lg'
        ? 'text-base sm:text-lg'
        : 'text-xs sm:text-sm';

  return (
    <div
      className={`inline-flex ${
        stacked ? 'flex-col items-center text-center gap-2' : 'items-center gap-3'
      } select-none group ${className}`}
    >
      {/* Bespoke Multi-Layered Vector SVG Monogram: Interlocking S + A Monolith */}
      <div
        className={`${markDims} relative inline-flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-[1.04]`}
      >
        <svg
          viewBox="0 0 64 64"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full overflow-visible"
          aria-hidden="true"
        >
          <defs>
            {/* Back Layer ('S' Monolith) Matte Obsidian / Dark Slate Gradient */}
            <linearGradient id={sGradId} x1="12" y1="10" x2="50" y2="54" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#3F4454" />
              <stop offset="50%" stopColor="#262936" />
              <stop offset="100%" stopColor="#181A22" />
            </linearGradient>

            {/* Front Interlocking Layer ('A' Apex) Brushed Liquid Platinum Metallic Gradient */}
            <linearGradient id={aGradId} x1="18" y1="14" x2="48" y2="54" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="38%" stopColor="#CBD5E1" />
              <stop offset="72%" stopColor="#64748B" />
              <stop offset="100%" stopColor="#1E293B" />
            </linearGradient>

            {/* High-Contrast Facet Highlight on the 'A' Apex */}
            <linearGradient id={aFacetId} x1="32" y1="14" x2="44" y2="48" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#F8FAFC" />
              <stop offset="100%" stopColor="#94A3B8" />
            </linearGradient>
          </defs>

          {/* Top Axis Upward Chevron (^) */}
          <path
            d="M28.5 6.5L32 3L35.5 6.5"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.82"
          />

          {/* Bottom Axis Downward Chevron (v) */}
          <path
            d="M28.5 57.5L32 61L35.5 57.5"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.82"
          />

          {/* Left Flanking Code Bracket (<) */}
          <path
            d="M8.5 26L4 32L8.5 38"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.75"
          />

          {/* Right Flanking Code Bracket (>) */}
          <path
            d="M55.5 26L60 32L55.5 38"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.75"
          />

          {/* BACK LAYER: Angular Hexagonal 'S' Monolith Ribbon */}
          <path
            d="M44 13L32 9L16 17V29L40 36V44L31 49L19 44L14 48.5L31 55.5L48 47.5V31.5L24 24.5V19.5L32 15.5L40.5 18.5L44 13Z"
            fill={`url(#${sGradId})`}
            stroke="currentColor"
            strokeOpacity="0.28"
            strokeWidth="0.9"
            strokeLinejoin="round"
          />

          {/* Subtle Inner Bevel Line on 'S' Ribbon */}
          <path
            d="M32 11.5L18.5 18.2V27.2L45.5 35.2V45.8"
            stroke="#94A3B8"
            strokeOpacity="0.35"
            strokeWidth="1"
            strokeLinecap="round"
          />

          {/* FRONT INTERLOCKING LAYER: 3D-Faceted Architectural 'A' Apex */}
          {/* Left Ascending Blade of 'A' */}
          <path
            d="M32 14L17.5 50H24.5L32 29.5V14Z"
            fill={`url(#${aGradId})`}
            stroke="#0F172A"
            strokeOpacity="0.35"
            strokeWidth="0.8"
            strokeLinejoin="round"
          />
          {/* Right Descending Faceted Blade of 'A' */}
          <path
            d="M32 14L45.5 47.5L39.2 49.5L32 29.5V14Z"
            fill={`url(#${aFacetId})`}
            stroke="currentColor"
            strokeOpacity="0.35"
            strokeWidth="0.8"
            strokeLinejoin="round"
          />
          {/* Interlocking Architectural Crossbar of 'A' Locking Around the Spine of 'S' */}
          <polygon
            points="23.5,39.5 40.5,39.5 42.5,44 21.5,44"
            fill="currentColor"
            fillOpacity="0.9"
          />

          {/* DIGITAL PIXEL DISINTEGRATION DETAIL: 3 Stepped Micro-Square Pixels on Bottom-Right Leg of 'A' */}
          <rect
            x="44.5"
            y="47.5"
            width="3.2"
            height="3.2"
            rx="0.4"
            fill="currentColor"
          />
          <rect
            x="48.8"
            y="50.5"
            width="2.6"
            height="2.6"
            rx="0.35"
            fill="currentColor"
            opacity="0.85"
          />
          <rect
            x="52.4"
            y="53.2"
            width="2"
            height="2"
            rx="0.3"
            fill="#10B981"
          />
        </svg>
      </div>

      {/* Wordmark Lockup: SKYLINE (Regular Tracked Montserrat) + DIGITAL (ExtraBold Tracked Montserrat) */}
      {showText && (
        <div className="flex flex-col leading-none">
          <div className="flex items-baseline gap-1.5 whitespace-nowrap">
            <span
              className={`font-display font-normal tracking-[0.22em] text-[var(--text-primary)] uppercase ${skylineTextSize}`}
            >
              SKYLINE
            </span>
            <span
              className={`font-display font-extrabold tracking-[0.18em] text-[var(--text-primary)] uppercase ${digitalTextSize}`}
            >
              DIGITAL
            </span>
          </div>
          <span className="font-mono-tech text-[8px] font-medium tracking-[0.2em] text-[var(--text-muted)] uppercase mt-1">
            SOFTWARE • AI • GROWTH SYSTEMS
          </span>
        </div>
      )}
    </div>
  );
};

/**
 * Official WhatsApp Vector Logo
 */
interface IconProps {
  className?: string;
}

export const WhatsAppLogoIcon: React.FC<IconProps> = ({ className = 'w-4 h-4' }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    <path d="M12.031 2C6.508 2 2.023 6.485 2.023 12.008c0 1.766.461 3.49 1.337 5.01L2 22l5.122-1.344a9.972 9.972 0 0 0 4.909 1.295h.004c5.522 0 10.007-4.485 10.007-10.008C22.042 6.485 17.557 2 12.031 2zm5.862 14.129c-.248.699-1.442 1.338-2.012 1.423-.523.078-1.206.111-1.946-.124-.45-.143-1.028-.334-1.768-.654-3.111-1.343-5.143-4.477-5.299-4.684-.155-.208-1.266-1.685-1.266-3.214 0-1.529.801-2.281 1.086-2.592.285-.312.622-.39.829-.39.208 0 .415.002.596.011.191.01.446-.072.699.534.259.622.881 2.151.959 2.307.078.156.13.337.026.545-.104.208-.156.337-.311.519-.156.181-.327.405-.467.545-.156.155-.318.324-.137.635.181.312.806 1.329 1.73 2.153 1.189 1.06 2.191 1.389 2.502 1.545.311.156.493.13.674-.078.182-.208.778-.908.985-1.219.208-.312.415-.26.699-.156.285.104 1.814.856 2.125 1.012.311.156.519.234.596.363.078.13.078.752-.17 1.451z" />
  </svg>
);

/**
 * Official WhatsApp Brand Badge (#25D366 circle/squircle + crisp white vector icon)
 */
export const WhatsAppBrandBadge: React.FC<{ size?: 'sm' | 'md' | 'lg'; className?: string }> = ({
  size = 'md',
  className = '',
}) => {
  const dims =
    size === 'sm'
      ? 'w-5 h-5 rounded-full'
      : size === 'lg'
        ? 'w-8 h-8 rounded-full'
        : 'w-6 h-6 rounded-full';
  const iconDims =
    size === 'sm' ? 'w-3 h-3' : size === 'lg' ? 'w-4.5 h-4.5' : 'w-3.5 h-3.5';

  return (
    <span
      className={`inline-flex items-center justify-center bg-[#25D366] text-white shrink-0 shadow-xs ${dims} ${className}`}
      aria-hidden="true"
    >
      <WhatsAppLogoIcon className={iconDims} />
    </span>
  );
};

/**
 * Official Instagram Vector Icon with Authentic Multi-Stop Sunset Gradient
 * (#F58529 -> #DD2A7B -> #8134AF -> #515BD4)
 */
export const InstagramBrandIcon: React.FC<{ size?: 'sm' | 'md' | 'lg'; className?: string }> = ({
  size = 'md',
  className = '',
}) => {
  const gradId = useId();
  const dims =
    size === 'sm'
      ? 'w-5 h-5 rounded-md'
      : size === 'lg'
        ? 'w-8 h-8 rounded-xl'
        : 'w-6 h-6 rounded-lg';
  const iconDims =
    size === 'sm' ? 'w-3.5 h-3.5' : size === 'lg' ? 'w-5 h-5' : 'w-4 h-4';

  return (
    <span
      className={`inline-flex items-center justify-center shrink-0 shadow-xs overflow-hidden relative ${dims} ${className}`}
      aria-hidden="true"
    >
      <svg viewBox="0 0 32 32" className="w-full h-full">
        <defs>
          <linearGradient id={gradId} x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#F58529" />
            <stop offset="35%" stopColor="#DD2A7B" />
            <stop offset="70%" stopColor="#8134AF" />
            <stop offset="100%" stopColor="#515BD4" />
          </linearGradient>
        </defs>
        <rect width="32" height="32" rx="8" fill={`url(#${gradId})`} />
      </svg>
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="#FFFFFF"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`absolute ${iconDims}`}
      >
        <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
      </svg>
    </span>
  );
};

export const InstagramLogoIcon: React.FC<IconProps> = ({ className = 'w-4 h-4' }) => (
  <InstagramBrandIcon size="sm" className={className} />
);

/**
 * Official LinkedIn Vector Icon in Authentic LinkedIn Blue (#0A66C2)
 */
export const LinkedInBrandIcon: React.FC<{ size?: 'sm' | 'md' | 'lg'; className?: string }> = ({
  size = 'md',
  className = '',
}) => {
  const dims =
    size === 'sm'
      ? 'w-5 h-5 rounded-md'
      : size === 'lg'
        ? 'w-8 h-8 rounded-xl'
        : 'w-6 h-6 rounded-lg';
  const iconDims =
    size === 'sm' ? 'w-3 h-3' : size === 'lg' ? 'w-4.5 h-4.5' : 'w-3.5 h-3.5';

  return (
    <span
      className={`inline-flex items-center justify-center bg-[#0A66C2] text-white shrink-0 shadow-xs ${dims} ${className}`}
      aria-hidden="true"
    >
      <svg viewBox="0 0 24 24" fill="currentColor" className={iconDims}>
        <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
      </svg>
    </span>
  );
};

/**
 * Official Telegram Paper-Plane Vector Icon in Authentic Telegram Sky Blue (#26A5E4)
 */
export const TelegramBrandIcon: React.FC<{ size?: 'sm' | 'md' | 'lg'; className?: string }> = ({
  size = 'md',
  className = '',
}) => {
  const dims =
    size === 'sm'
      ? 'w-5 h-5 rounded-full'
      : size === 'lg'
        ? 'w-8 h-8 rounded-full'
        : 'w-6 h-6 rounded-full';
  const iconDims =
    size === 'sm' ? 'w-3 h-3' : size === 'lg' ? 'w-4.5 h-4.5' : 'w-3.5 h-3.5';

  return (
    <span
      className={`inline-flex items-center justify-center bg-[#26A5E4] text-white shrink-0 shadow-xs ${dims} ${className}`}
      aria-hidden="true"
    >
      <svg viewBox="0 0 24 24" fill="currentColor" className={iconDims}>
        <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
      </svg>
    </span>
  );
};

/**
 * Official X (Twitter) Geometric 𝕏 Vector Logo inside High-Contrast #000000 Badge
 */
export const XTwitterBrandIcon: React.FC<{ size?: 'sm' | 'md' | 'lg'; className?: string }> = ({
  size = 'md',
  className = '',
}) => {
  const dims =
    size === 'sm'
      ? 'w-5 h-5 rounded-md'
      : size === 'lg'
        ? 'w-8 h-8 rounded-xl'
        : 'w-6 h-6 rounded-lg';
  const iconDims =
    size === 'sm' ? 'w-3 h-3' : size === 'lg' ? 'w-4 h-4' : 'w-3.5 h-3.5';

  return (
    <span
      className={`inline-flex items-center justify-center bg-[#000000] text-white border border-zinc-700/60 shrink-0 shadow-xs ${dims} ${className}`}
      aria-hidden="true"
    >
      <svg viewBox="0 0 24 24" fill="currentColor" className={iconDims}>
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    </span>
  );
};

/**
 * Official 4-Color Gmail / Google Workspace Envelope Vector Accent
 * (#EA4335 Red, #FBBC05 Amber, #34A853 Green, #4285F4 Blue)
 */
export const GmailBrandIcon: React.FC<{ size?: 'sm' | 'md' | 'lg'; className?: string }> = ({
  size = 'md',
  className = '',
}) => {
  const dims =
    size === 'sm'
      ? 'w-5 h-5 rounded-md'
      : size === 'lg'
        ? 'w-8 h-8 rounded-xl'
        : 'w-6 h-6 rounded-lg';
  const svgDims =
    size === 'sm' ? 'w-3.5 h-3.5' : size === 'lg' ? 'w-5 h-5' : 'w-4 h-4';

  return (
    <span
      className={`inline-flex items-center justify-center bg-white border border-zinc-200 dark:border-zinc-700 shrink-0 shadow-xs ${dims} ${className}`}
      aria-hidden="true"
    >
      <svg viewBox="0 0 24 24" fill="none" className={svgDims}>
        <path
          d="M2 6.5V18c0 1.1.9 2 2 2h2V9.8l6 4.5 6-4.5V20h2c1.1 0 2-.9 2-2V6.5c0-1.8-2.1-2.8-3.5-1.7L12 10 5.5 4.8C4.1 3.7 2 4.7 2 6.5z"
          fill="#EA4335"
        />
        <path d="M2 6.5V18c0 1.1.9 2 2 2h2V9.8L2 6.5z" fill="#4285F4" />
        <path d="M22 6.5V18c0 1.1-.9 2-2 2h-2V9.8l4-3.3z" fill="#34A853" />
        <path
          d="M18.5 4.8L12 10 5.5 4.8C4.1 3.7 2 4.7 2 6.5v.3l10 7.5 10-7.5v-.3c0-1.8-2.1-2.8-3.5-1.7z"
          fill="#FBBC05"
        />
      </svg>
    </span>
  );
};

/**
 * Complete 5-App Official Social Icon Bar:
 * Instagram, WhatsApp, LinkedIn, Telegram, X (Twitter)
 * Note: Instagram is strictly icon-only (never prints @sky_line_digital handle text).
 */
export const SocialIconBar: React.FC<{
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}> = ({ size = 'sm', className = '' }) => {
  const btnPadding =
    size === 'lg' ? 'p-2 rounded-xl' : size === 'md' ? 'p-1.5 rounded-xl' : 'p-1.5 rounded-lg';

  const whatsappHref = `https://wa.me/${SKYLINE_WHATSAPP_NUMBER}?text=${encodeURIComponent(
    'Hi SkyLine Digital Team! I would like to discuss a project.'
  )}`;

  return (
    <div className={`inline-flex items-center gap-1.5 ${className}`}>
      <a
        href={SKYLINE_INSTAGRAM_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="SkyLine Digital on Instagram"
        title="Instagram"
        className={`${btnPadding} btn-platinum-secondary inline-flex items-center justify-center hover:scale-105 transition-transform`}
      >
        <InstagramBrandIcon size={size} />
      </a>
      <a
        href={whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="SkyLine Digital on WhatsApp"
        title="WhatsApp Official Desk"
        className={`${btnPadding} btn-platinum-secondary inline-flex items-center justify-center hover:scale-105 transition-transform`}
      >
        <WhatsAppBrandBadge size={size} />
      </a>
      <a
        href={SKYLINE_LINKEDIN_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="SkyLine Digital on LinkedIn"
        title="LinkedIn"
        className={`${btnPadding} btn-platinum-secondary inline-flex items-center justify-center hover:scale-105 transition-transform`}
      >
        <LinkedInBrandIcon size={size} />
      </a>
      <a
        href={SKYLINE_TELEGRAM_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="SkyLine Digital on Telegram"
        title="Telegram"
        className={`${btnPadding} btn-platinum-secondary inline-flex items-center justify-center hover:scale-105 transition-transform`}
      >
        <TelegramBrandIcon size={size} />
      </a>
      <a
        href={SKYLINE_X_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="SkyLine Digital on X"
        title="X (Twitter)"
        className={`${btnPadding} btn-platinum-secondary inline-flex items-center justify-center hover:scale-105 transition-transform`}
      >
        <XTwitterBrandIcon size={size} />
      </a>
    </div>
  );
};

/**
 * Authentic Brand-Colored Vector Icons for the Infinite Tech & Growth Marquee
 */
export const TechStackBrandIcon: React.FC<{ name: string; className?: string }> = ({
  name,
  className = 'w-4 h-4',
}) => {
  const lower = name.toLowerCase();

  // React (#61DAFB)
  if (lower.includes('react')) {
    return (
      <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
        <circle cx="12" cy="12" r="2.2" fill="#61DAFB" />
        <ellipse cx="12" cy="12" rx="10" ry="4.2" stroke="#61DAFB" strokeWidth="1.6" />
        <ellipse
          cx="12"
          cy="12"
          rx="10"
          ry="4.2"
          stroke="#61DAFB"
          strokeWidth="1.6"
          transform="rotate(60 12 12)"
        />
        <ellipse
          cx="12"
          cy="12"
          rx="10"
          ry="4.2"
          stroke="#61DAFB"
          strokeWidth="1.6"
          transform="rotate(120 12 12)"
        />
      </svg>
    );
  }

  // TypeScript (#3178C6)
  if (lower.includes('typescript')) {
    return (
      <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
        <rect x="2" y="2" width="20" height="20" rx="3.5" fill="#3178C6" />
        <path
          d="M12.5 11.2H9.8V18H8V11.2H5.3V9.7H12.5V11.2ZM19.2 15.8C19.2 17.2 18 18.2 16.1 18.2C14.6 18.2 13.5 17.6 13 16.8L14.1 15.6C14.5 16.2 15.2 16.7 16.1 16.7C17 16.7 17.5 16.3 17.5 15.8C17.5 15.2 16.9 15 15.7 14.6C14.2 14.1 13.3 13.5 13.3 12C13.3 10.6 14.4 9.6 16.2 9.6C17.5 9.6 18.5 10.1 19 10.8L17.9 12C17.5 11.4 16.9 11.1 16.2 11.1C15.4 11.1 15 11.5 15 11.9C15 12.5 15.5 12.7 16.7 13.1C18.2 13.6 19.2 14.3 19.2 15.8Z"
          fill="#FFFFFF"
        />
      </svg>
    );
  }

  // Python (#3776AB & #FFD43B)
  if (lower.includes('python') || lower.includes('fastapi')) {
    return (
      <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
        <path
          d="M11.9 2C7.8 2 8.1 3.8 8.1 3.8V5.9H12.1V6.6H6.4C6.4 6.6 2 6.1 2 11.8C2 17.5 5.8 17.3 5.8 17.3H8V14.7C8 14.7 7.9 11.5 11.2 11.5H15.2C15.2 11.5 17.8 11.5 17.8 9V4.8C17.8 4.8 18.2 2 11.9 2Z"
          fill="#3776AB"
        />
        <path
          d="M12.1 22C16.2 22 15.9 20.2 15.9 20.2V18.1H11.9V17.4H17.6C17.6 17.4 22 17.9 22 12.2C22 6.5 18.2 6.7 18.2 6.7H16V9.3C16 9.3 16.1 12.5 12.8 12.5H8.8C8.8 12.5 6.2 12.5 6.2 15V19.2C6.2 19.2 5.8 22 12.1 22Z"
          fill="#FFD43B"
        />
      </svg>
    );
  }

  // PostgreSQL / Prisma (#336791)
  if (lower.includes('postgres') || lower.includes('prisma')) {
    return (
      <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
        <ellipse cx="12" cy="6" rx="8" ry="3.5" fill="#336791" />
        <path
          d="M4 6V12C4 13.93 7.58 15.5 12 15.5C16.42 15.5 20 13.93 20 12V6"
          stroke="#336791"
          strokeWidth="2"
        />
        <path
          d="M4 12V18C4 19.93 7.58 21.5 12 21.5C16.42 21.5 20 19.93 20 18V12"
          stroke="#5B9BD5"
          strokeWidth="2"
        />
      </svg>
    );
  }

  // Docker (#2496ED)
  if (lower.includes('docker')) {
    return (
      <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
        <rect x="4" y="10" width="3" height="2.6" rx="0.4" fill="#2496ED" />
        <rect x="7.6" y="10" width="3" height="2.6" rx="0.4" fill="#2496ED" />
        <rect x="11.2" y="10" width="3" height="2.6" rx="0.4" fill="#2496ED" />
        <rect x="7.6" y="6.8" width="3" height="2.6" rx="0.4" fill="#2496ED" />
        <rect x="11.2" y="6.8" width="3" height="2.6" rx="0.4" fill="#2496ED" />
        <path
          d="M2 13.5C2 13.5 3.5 13.2 5 13.2H18.2C19.5 12.6 20.4 11.4 20.6 10.5C21.3 10.9 22.1 11.8 22 12.9C21.5 17.2 17.5 19.5 12.2 19.5C6.8 19.5 3 17.2 2 13.5Z"
          fill="#2496ED"
        />
      </svg>
    );
  }

  // AWS (#FF9900)
  if (lower.includes('aws')) {
    return (
      <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
        <path
          d="M6.5 10.5L9.5 4.5L12.5 10.5M7.3 9H11.7"
          stroke="#FF9900"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M14.5 5L16 10.5L17.5 6.5L19 10.5L20.5 5"
          stroke="#FF9900"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M4 15.5C8.5 19 15.5 19 20 15.5"
          stroke="#FF9900"
          strokeWidth="2.2"
          strokeLinecap="round"
        />
        <path
          d="M18.2 14.8L20.4 15.2L19.6 17.4"
          stroke="#FF9900"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  // Meta Ads (#0081FB)
  if (lower.includes('meta')) {
    return (
      <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
        <path
          d="M6.8 7.5C4.2 7.5 2.2 10.2 2.2 13.2C2.2 15.6 3.7 17.2 5.6 17.2C7.4 17.2 8.9 15.7 11.2 12.1L12 10.8L12.8 12.1C15.1 15.7 16.6 17.2 18.4 17.2C20.3 17.2 21.8 15.6 21.8 13.2C21.8 10.2 19.8 7.5 17.2 7.5C15.3 7.5 13.8 8.9 12 11.6C10.2 8.9 8.7 7.5 6.8 7.5Z"
          stroke="#0081FB"
          strokeWidth="2.3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  // Google Ads / Google Map Pack / GA4 / Schema (#4285F4, #34A853, #FBBC05, #EA4335)
  if (lower.includes('google') || lower.includes('ga4') || lower.includes('schema')) {
    return (
      <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" fill="#4285F4" />
        <path d="M12 2C8.13 2 5 5.13 5 9c0 1.8.68 3.44 1.8 4.68L12 9V2z" fill="#EA4335" />
        <path d="M5 9c0 2.6 1.5 5.6 3.7 8.4L12 9H5z" fill="#FBBC05" />
        <path d="M12 9l-3.3 8.4C10.4 19.8 12 22 12 22s7-7.75 7-13h-7z" fill="#34A853" />
        <circle cx="12" cy="9" r="2.8" fill="#FFFFFF" />
      </svg>
    );
  }

  // WhatsApp Cloud API (#25D366)
  if (lower.includes('whatsapp')) {
    return <WhatsAppBrandBadge size="sm" />;
  }

  // Tailwind CSS (#38BDF8)
  if (lower.includes('tailwind')) {
    return (
      <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
        <path
          d="M12 6C9.33 6 7.67 7.33 7 10C8 8.67 9.17 8.17 10.5 8.5C11.26 8.69 11.8 9.24 12.4 9.85C13.38 10.85 14.52 12 17 12C19.67 12 21.33 10.67 22 8C21 9.33 19.83 9.83 18.5 9.5C17.74 9.31 17.2 8.76 16.6 8.15C15.62 7.15 14.48 6 12 6ZM7 12C4.33 12 2.67 13.33 2 16C3 14.67 4.17 14.17 5.5 14.5C6.26 14.69 6.8 15.24 7.4 15.85C8.38 16.85 9.52 18 12 18C14.67 18 16.33 16.67 17 14C16 15.33 14.83 15.83 13.5 15.5C12.74 15.31 12.2 14.76 11.6 14.15C10.62 13.15 9.48 12 7 12Z"
          fill="#38BDF8"
        />
      </svg>
    );
  }

  // Node.js / UPI (#339933 / #10B981)
  if (lower.includes('node') || lower.includes('upi')) {
    return (
      <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
        <polygon
          points="12 2 20.66 7 20.66 17 12 22 3.34 17 3.34 7"
          fill="#339933"
        />
        <path d="M9.5 9.5L14.5 12L9.5 14.5V9.5Z" fill="#FFFFFF" />
      </svg>
    );
  }

  // Redis (#DC382D)
  if (lower.includes('redis')) {
    return (
      <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
        <polygon points="12 3 21 7.5 12 12 3 7.5" fill="#DC382D" />
        <polyline
          points="3 12 12 16.5 21 12"
          stroke="#DC382D"
          strokeWidth="2.2"
          strokeLinecap="round"
        />
        <polyline
          points="3 16.5 12 21 21 16.5"
          stroke="#DC382D"
          strokeWidth="2.2"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  // HubSpot / CRM (#FF7A59)
  if (lower.includes('hubspot') || lower.includes('crm')) {
    return (
      <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
        <circle cx="12" cy="12" r="4.5" stroke="#FF7A59" strokeWidth="2.2" />
        <circle cx="18.5" cy="5.5" r="2" fill="#FF7A59" />
        <circle cx="5.5" cy="18.5" r="2" fill="#FF7A59" />
        <line x1="15.2" y1="8.8" x2="17.2" y2="6.8" stroke="#FF7A59" strokeWidth="2" />
        <line x1="8.8" y1="15.2" x2="6.8" y2="17.2" stroke="#FF7A59" strokeWidth="2" />
      </svg>
    );
  }

  // Default Next.js / Vercel / OpenAI / LangChain geometric mark
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <circle cx="12" cy="12" r="9" fill="#18181B" stroke="#71717A" strokeWidth="1.5" />
      <path d="M9 16V8L16.5 17.5" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
      <path d="M15 8V13" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
};

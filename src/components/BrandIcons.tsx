import React, { useId } from 'react';
import {
  Atom,
  Braces,
  Cloud,
  Code2,
  Container,
  Cpu,
  Database,
  FileCode2,
  Globe,
  Layers,
  MapPin,
  Megaphone,
  Search,
  Server,
  ShieldCheck,
  Sparkles,
  Terminal,
  TrendingUp,
  Workflow,
  Zap,
} from 'lucide-react';
import {
  SKYLINE_INSTAGRAM_URL,
  SKYLINE_WHATSAPP_NUMBER,
  SKYLINE_LINKEDIN_URL,
  SKYLINE_TELEGRAM_URL,
  SKYLINE_X_URL,
} from '../data/agencyData';

/**
 * Precision Interlocking 'S' + 'D' Geometric Monolith (<SkyLineLogo />):
 * - Back & Interlocking Layer ('S' Monolith): Angular hexagonal ribbon forming 'S' with subtle bevel shading.
 * - Front Interlocking Layer ('D' Monolith): Sharp 3D-faceted architectural 'D' interlocking with the 'S' spine in a Brushed Liquid Platinum linearGradient.
 * - Digital Pixel Disintegration Detail: 3 crisp stepped micro-square pixels detaching diagonally downward from the bottom-right chamfer of the 'D'.
 * - Vertical-Only Axis Chevrons: Upward symbol ('∧') above top peak and downward symbol ('∨') below base (no horizontal '<>' symbols).
 * - Wordmark Lockup: 'SKYLINE' in tracked regular Poppins (tracking-[0.22em]) + 'DIGITAL' in bold Poppins (font-extrabold tracking-[0.18em]).
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
  const dGradId = `d-monolith-${uid}`;
  const dFacetId = `d-facet-${uid}`;

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
      {/* Bespoke Multi-Layered Vector SVG Monogram: Interlocking S + D Monolith */}
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
            {/* 'S' Monolith Matte Obsidian / Dark Silver Gradient */}
            <linearGradient id={sGradId} x1="10" y1="10" x2="44" y2="54" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#71717A" />
              <stop offset="50%" stopColor="#3F3F46" />
              <stop offset="100%" stopColor="#18181B" />
            </linearGradient>

            {/* Front Interlocking Layer ('D' Monolith) Brushed Titanium & Silver Metallic Gradient */}
            <linearGradient id={dGradId} x1="24" y1="12" x2="52" y2="52" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="38%" stopColor="#D4D4D8" />
              <stop offset="75%" stopColor="#71717A" />
              <stop offset="100%" stopColor="#27272A" />
            </linearGradient>

            {/* High-Contrast Facet Highlight on the 'D' Outer Bow */}
            <linearGradient id={dFacetId} x1="36" y1="13" x2="50" y2="50" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#FAF8F3" />
              <stop offset="100%" stopColor="#C5A880" />
            </linearGradient>
          </defs>

          {/* Top Vertical Upward Symbol (∧) — Strictly Vertical Only */}
          <path
            d="M28.2 7L32 2.8L35.8 7"
            stroke="currentColor"
            strokeWidth="1.9"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.85"
          />

          {/* Bottom Vertical Downward Symbol (∨) — Strictly Vertical Only */}
          <path
            d="M28.2 57L32 61.2L35.8 57"
            stroke="currentColor"
            strokeWidth="1.9"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.85"
          />

          {/* LAYER 1 (BACK): Angular Hexagonal 'S' Monolith Ribbon */}
          <path
            d="M39 14.5L26.5 10L12 17.5V29.5L35.5 36.5V43.5L25.5 48.5L15 43.5L11 48L25.5 54.5L42 46.5V31.5L18.5 24.5V19.5L26.5 15.5L35.5 19L39 14.5Z"
            fill={`url(#${sGradId})`}
            stroke="currentColor"
            strokeOpacity="0.3"
            strokeWidth="0.9"
            strokeLinejoin="round"
          />

          {/* Subtle Inner Bevel Line on 'S' Ribbon */}
          <path
            d="M26.5 12.2L14.5 18.4V27.6L39.5 35.2V45"
            stroke="#C5A880"
            strokeOpacity="0.45"
            strokeWidth="1"
            strokeLinecap="round"
          />

          {/* LAYER 2 (FRONT INTERLOCKING): 3D-Faceted Architectural 'D' Monolith */}
          {/* Compound 'D' Body with Geometric Counter Cutout */}
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M25 13H40.5L51 22.5V41.5L40.5 51H25V13ZM31.2 19.2V44.8H38.2L44.5 39V25L38.2 19.2H31.2Z"
            fill={`url(#${dGradId})`}
            stroke="currentColor"
            strokeOpacity="0.38"
            strokeWidth="0.85"
            strokeLinejoin="round"
          />

          {/* 3D Faceted Right-Edge Bevel Highlight on the 'D' */}
          <path
            d="M40.5 13L51 22.5V41.5L40.5 51L38.2 44.8L44.5 39V25L38.2 19.2L40.5 13Z"
            fill={`url(#${dFacetId})`}
            fillOpacity="0.65"
          />

          {/* LAYER 3 (INTERLOCKING OVERWEAVE): Center Diagonal Spine of 'S' Crossing Over the Left Stem of 'D' */}
          <path
            d="M18.5 24.5L36.5 30V36.8L18.5 31.2V24.5Z"
            fill={`url(#${sGradId})`}
            stroke="currentColor"
            strokeOpacity="0.45"
            strokeWidth="0.85"
            strokeLinejoin="round"
          />

          {/* Crisp Metallic Accent Line on the Interlocking 'S' Overweave */}
          <path
            d="M20 26.8L35 31.5"
            stroke="#C5A880"
            strokeOpacity="0.65"
            strokeWidth="1"
            strokeLinecap="round"
          />

          {/* DIGITAL PIXEL DISINTEGRATION DETAIL: 3 Stepped Micro-Square Pixels Detaching from Bottom-Right of 'D' */}
          <rect
            x="45.5"
            y="47.2"
            width="3.2"
            height="3.2"
            rx="0.4"
            fill="currentColor"
          />
          <rect
            x="49.8"
            y="50.2"
            width="2.6"
            height="2.6"
            rx="0.35"
            fill="#71717A"
          />
          <rect
            x="53.4"
            y="52.8"
            width="2"
            height="2"
            rx="0.3"
            fill="#C5A880"
          />
        </svg>
      </div>

      {/* Wordmark Lockup: SKYLINE (Regular Tracked Poppins) + DIGITAL (ExtraBold Tracked Poppins) */}
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
 * Official WhatsApp Brand Badge (Default WhatsApp Green #25D366 circle + crisp white vector icon)
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
 * Lucide Icons for the Infinite Tech & Growth Marquee (with Default Green for WhatsApp)
 */
export const TechStackBrandIcon: React.FC<{ name: string; className?: string }> = ({
  name,
  className = 'w-4 h-4',
}) => {
  const lower = name.toLowerCase();

  if (lower.includes('whatsapp')) {
    return <WhatsAppBrandBadge size="sm" />;
  }
  if (lower.includes('react')) {
    return <Atom className={`${className} text-[#C5A880]`} />;
  }
  if (lower.includes('typescript')) {
    return <FileCode2 className={`${className} text-[#71717A]`} />;
  }
  if (lower.includes('python') || lower.includes('fastapi')) {
    return <Terminal className={`${className} text-[#C5A880]`} />;
  }
  if (lower.includes('postgres') || lower.includes('prisma') || lower.includes('redis')) {
    return <Database className={`${className} text-[#71717A]`} />;
  }
  if (lower.includes('docker')) {
    return <Container className={`${className} text-[#C5A880]`} />;
  }
  if (lower.includes('aws') || lower.includes('cloud')) {
    return <Cloud className={`${className} text-[#71717A]`} />;
  }
  if (lower.includes('meta') || lower.includes('ads')) {
    return <Megaphone className={`${className} text-[#C5A880]`} />;
  }
  if (lower.includes('map') || lower.includes('local')) {
    return <MapPin className={`${className} text-[#C5A880]`} />;
  }
  if (lower.includes('google') || lower.includes('seo') || lower.includes('ga4')) {
    return <Search className={`${className} text-[#71717A]`} />;
  }
  if (lower.includes('tailwind')) {
    return <Sparkles className={`${className} text-[#C5A880]`} />;
  }
  if (lower.includes('node') || lower.includes('next')) {
    return <Server className={`${className} text-[#71717A]`} />;
  }
  if (lower.includes('upi') || lower.includes('razorpay')) {
    return <Zap className={`${className} text-[#C5A880]`} />;
  }
  if (lower.includes('hubspot') || lower.includes('crm')) {
    return <Workflow className={`${className} text-[#71717A]`} />;
  }
  if (lower.includes('schema') || lower.includes('json')) {
    return <Braces className={`${className} text-[#C5A880]`} />;
  }
  if (lower.includes('openai') || lower.includes('langchain')) {
    return <Cpu className={`${className} text-[#C5A880]`} />;
  }

  return <Code2 className={`${className} text-[#71717A]`} />;
};

export {
  Layers,
  ShieldCheck,
  TrendingUp,
  Globe,
};

import React, { useId } from 'react';
import {
  Globe,
  Layers,
  ShieldCheck,
  TrendingUp,
} from 'lucide-react';
import {
  SKYLINE_INSTAGRAM_URL,
} from '../data/agencyData';

/**
 * SkyLine Digital Agency Signature Logo (<SkyLineLogo />):
 * - Container: Solid Absolute Black (#050505) rounded squircle badge (rx="12") with metallic inner bevel.
 * - Emblem Inside: Interlocking "S & A" Architectural Monogram —
 *   A sculpted Brushed Platinum 'S' in the background layer overlapped by a razor-sharp Pure White 'A'
 *   ascending in the foreground, creating a distinct, iconic tech mark.
 * - Wordmark: Clean 'SkyLine' (Poppins Bold) + optional 'DIGITAL AGENCY' subtitle.
 */
export interface SkyLineLogoProps {
  className?: string;
  iconClassName?: string;
  dockStyle?: boolean;
  showText?: boolean;
  showSubtext?: boolean;
  stacked?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export const SkyLineLogo: React.FC<SkyLineLogoProps> = ({
  className = '',
  iconClassName = '',
  dockStyle = false,
  showText = true,
  showSubtext = true,
  stacked = false,
  size = 'md',
}) => {
  const uid = useId();
  const sLayerGradId = `sa-s-layer-${uid}`;
  const aLayerGradId = `sa-a-layer-${uid}`;

  const markDims = iconClassName
    ? iconClassName
    : size === 'sm'
      ? 'w-9 h-9'
      : size === 'lg'
        ? 'w-12 h-12'
        : 'w-10 h-10';

  const brandTextSize =
    size === 'sm'
      ? 'text-sm'
      : size === 'lg'
        ? 'text-lg sm:text-xl'
        : 'text-base sm:text-[17px]';

  return (
    <div
      className={`inline-flex ${
        stacked ? 'flex-col items-center text-center gap-2' : 'items-center gap-2.5'
      } select-none group ${className}`}
    >
      {/* Solid #050505 Rounded Squircle Badge with Overlapping S & A Monogram */}
      <div
        className={`${markDims} relative inline-flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-[1.04]`}
      >
        <svg
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
          aria-hidden="true"
        >
          <defs>
            {/* Background 'S' Layer — Brushed Anodized Silver Gradient */}
            <linearGradient id={sLayerGradId} x1="10" y1="10" x2="38" y2="38" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#D4D4D8" />
              <stop offset="50%" stopColor="#A1A1AA" />
              <stop offset="100%" stopColor="#71717A" />
            </linearGradient>
            {/* Foreground 'A' Layer — Crisp Pure White to Platinum */}
            <linearGradient id={aLayerGradId} x1="24" y1="8" x2="24" y2="40" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="65%" stopColor="#F4F4F5" />
              <stop offset="100%" stopColor="#D4D4D8" />
            </linearGradient>
          </defs>

          {/* Outer Solid Absolute Black (#050505) Rounded Squircle */}
          <rect
            x="1"
            y="1"
            width="46"
            height="46"
            rx="12"
            fill="#050505"
            stroke="rgba(255, 255, 255, 0.18)"
            strokeWidth="1.2"
          />

          {/* Subtle Inner Architectural Bevel Ring */}
          <rect
            x="3.5"
            y="3.5"
            width="41"
            height="41"
            rx="9.5"
            stroke="rgba(255, 255, 255, 0.06)"
            strokeWidth="0.8"
          />

          {/* BACKGROUND LAYER: Sculpted Geometric 'S' Ribbon */}
          <path
            d="M33.5 15.5H18.5C15.5 15.5 13.5 17.2 13.5 19.8C13.5 22.4 15.5 24 18.8 24H29.2C32.5 24 34.5 25.6 34.5 28.2C34.5 30.8 32.5 32.5 29.5 32.5H14.5"
            stroke={`url(#${sLayerGradId})`}
            strokeWidth="4.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.72"
          />

          {/* FOREGROUND LAYER: Sharp Architectural 'A' Overlapping the 'S' */}
          <path
            d="M24 9.5L12.5 37.5H17.8L24 21.8L30.2 37.5H35.5L24 9.5Z"
            fill={`url(#${aLayerGradId})`}
          />

          {/* Ascending Crossbar of 'A' Interlocking with the 'S' Spine */}
          <path
            d="M17.5 28.5L30.5 25.5"
            stroke="#FFFFFF"
            strokeWidth="3.2"
            strokeLinecap="round"
          />

          {/* Precision Signal Node at Apex */}
          <circle cx="36.5" cy="12" r="2" fill="#10B981" />
        </svg>
      </div>

      {/* Wordmark Lockup */}
      {showText && (
        <div className="flex flex-col leading-none">
          <div className="flex items-center gap-2 whitespace-nowrap">
            <span
              className={`font-display font-bold tracking-tight ${
                dockStyle ? 'text-[#F4F4F5]' : 'text-[var(--text-primary)]'
              } ${brandTextSize}`}
            >
              SkyLine
            </span>
          </div>
          {showSubtext && (
            <span
              className={`font-display text-[9px] font-semibold tracking-[0.2em] ${
                dockStyle ? 'text-[#A1A1AA]' : 'text-[#6E717A] dark:text-[#9CA3AF]'
              } uppercase mt-1`}
            >
              DIGITAL AGENCY
            </span>
          )}
        </div>
      )}
    </div>
  );
};

/**
 * Custom SkyLine AI Chat-Logo Icon (<SkyLineAiChatIcon />):
 * Blends a sleek geometric Chat Bubble with SkyLine's signature S & A architectural apex
 * and AI spark node — zero generic robot icon.
 */
export const SkyLineAiChatIcon: React.FC<{
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}> = ({ size = 'md', className = '' }) => {
  const uid = useId();
  const gradId = `skyline-ai-chat-${uid}`;
  const dims =
    size === 'sm'
      ? 'w-5 h-5'
      : size === 'lg'
        ? 'w-9 h-9'
        : 'w-7 h-7';

  return (
    <span
      className={`inline-flex items-center justify-center shrink-0 select-none ${dims} ${className}`}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 36 36"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        <defs>
          <linearGradient id={gradId} x1="6" y1="6" x2="30" y2="30" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="65%" stopColor="#E4E4E7" />
            <stop offset="100%" stopColor="#A1A1AA" />
          </linearGradient>
        </defs>

        {/* Outer Sleek Chat Bubble / Squircle Carrier */}
        <path
          d="M7 5H29C31.2091 5 33 6.79086 33 9V23C33 25.2091 31.2091 27 29 27H14.5L7.5 32V27H7C4.79086 27 3 25.2091 3 23V9C3 6.79086 4.79086 5 7 5Z"
          fill="#09090B"
          stroke="rgba(255, 255, 255, 0.28)"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />

        {/* Subtle S-Curve Wave Inside Bubble */}
        <path
          d="M24.5 11.5H14C12.2 11.5 11 12.5 11 14C11 15.5 12.2 16.5 14.2 16.5H21.8C23.8 16.5 25 17.5 25 19C25 20.5 23.8 21.5 22 21.5H11.5"
          stroke="#A1A1AA"
          strokeWidth="2.1"
          strokeLinecap="round"
          opacity="0.7"
        />

        {/* Overlapping Foreground 'A' Apex Monogram */}
        <path
          d="M18 8.8L11.8 23.2H14.9L18 15.5L21.1 23.2H24.2L18 8.8Z"
          fill={`url(#${gradId})`}
        />

        {/* Live Emerald AI Spark Node */}
        <circle cx="27.5" cy="10.5" r="2.2" fill="#10B981" />
      </svg>
    </span>
  );
};

interface IconProps {
  className?: string;
}

/**
 * Official WhatsApp Vector Logo
 */
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
 * Official WhatsApp Brand Badge (#25D366 circle + crisp white vector icon)
 */
export const WhatsAppBrandBadge: React.FC<{ size?: 'sm' | 'md' | 'lg'; className?: string }> = ({
  size = 'md',
  className = '',
}) => {
  const dims =
    size === 'sm'
      ? 'w-5 h-5 rounded-full'
      : size === 'lg'
        ? 'w-9 h-9 rounded-full'
        : 'w-7 h-7 rounded-full';
  const iconDims =
    size === 'sm' ? 'w-3.5 h-3.5' : size === 'lg' ? 'w-5 h-5' : 'w-4 h-4';

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
 * Full-Size Official 4-Color Gmail / Google Mail Icon
 * Fills 85%+ of its container with balanced visual weight matching Location, Phone, and Social icons.
 */
export const GmailBrandIcon: React.FC<{ size?: 'sm' | 'md' | 'lg'; className?: string }> = ({
  size = 'md',
  className = '',
}) => {
  const dims =
    size === 'sm'
      ? 'w-8 h-8 rounded-xl'
      : size === 'lg'
        ? 'w-11 h-11 rounded-2xl'
        : 'w-9 h-9 rounded-xl';
  const svgDims =
    size === 'sm' ? 'w-5 h-5' : size === 'lg' ? 'w-7 h-7' : 'w-6 h-6';

  return (
    <span
      className={`inline-flex items-center justify-center bg-white dark:bg-[#18181B] border border-black/10 dark:border-white/15 shrink-0 shadow-xs ${dims} ${className}`}
      aria-hidden="true"
    >
      <svg viewBox="0 0 24 24" fill="none" className={svgDims}>
        <path
          d="M2 6.2V18c0 1.1.9 2 2 2h2.2V9.8L12 14.2l5.8-4.4V20H20c1.1 0 2-.9 2-2V6.2c0-1.85-2.12-2.9-3.6-1.78L12 9.3 5.6 4.42C4.12 3.3 2 4.35 2 6.2z"
          fill="#EA4335"
        />
        <path d="M2 6.2V18c0 1.1.9 2 2 2h2.2V9.8L2 6.2z" fill="#4285F4" />
        <path d="M22 6.2V18c0 1.1-.9 2-2 2h-2.2V9.8L22 6.2z" fill="#34A853" />
        <path
          d="M18.4 4.42L12 9.3 5.6 4.42C4.12 3.3 2 4.35 2 6.2v.35l10 7.55 10-7.55V6.2c0-1.85-2.12-2.9-3.6-1.78z"
          fill="#FBBC05"
        />
      </svg>
    </span>
  );
};

/**
 * 6 Social Media Icons in Original Brand Colors (Instagram, LinkedIn, GitHub, Telegram, X/Twitter, Facebook).
 * All 6 silently redirect to https://www.instagram.com/sky_line_digital without any disclaimer text.
 */
export const SocialIconBar: React.FC<{
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}> = ({ size = 'md', className = '' }) => {
  const igGradId = useId();
  const circleDims =
    size === 'lg'
      ? 'w-11 h-11'
      : size === 'sm'
        ? 'w-9 h-9'
        : 'w-10 h-10';
  const svgDims =
    size === 'lg' ? 'w-5 h-5' : size === 'sm' ? 'w-4 h-4' : 'w-4.5 h-4.5';

  return (
    <div className={`inline-flex flex-wrap items-center gap-2.5 ${className}`}>
      {/* 1. Instagram (Original Sunset Gradient) */}
      <a
        href={SKYLINE_INSTAGRAM_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Instagram"
        className={`${circleDims} rounded-full relative overflow-hidden inline-flex items-center justify-center text-white shadow-xs hover:scale-108 transition-transform`}
      >
        <svg viewBox="0 0 32 32" className="w-full h-full absolute inset-0" aria-hidden="true">
          <defs>
            <linearGradient id={igGradId} x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#F58529" />
              <stop offset="35%" stopColor="#DD2A7B" />
              <stop offset="70%" stopColor="#8134AF" />
              <stop offset="100%" stopColor="#515BD4" />
            </linearGradient>
          </defs>
          <rect width="32" height="32" fill={`url(#${igGradId})`} />
        </svg>
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="#FFFFFF"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`relative z-10 ${svgDims}`}
          aria-hidden="true"
        >
          <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
          <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
        </svg>
      </a>

      {/* 2. LinkedIn (#0A66C2) */}
      <a
        href={SKYLINE_INSTAGRAM_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="LinkedIn"
        className={`${circleDims} rounded-full bg-[#0A66C2] text-white inline-flex items-center justify-center shadow-xs hover:scale-108 transition-transform`}
      >
        <svg viewBox="0 0 24 24" fill="currentColor" className={svgDims} aria-hidden="true">
          <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
        </svg>
      </a>

      {/* 3. GitHub (#181717 / #F8F8F6) */}
      <a
        href={SKYLINE_INSTAGRAM_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="GitHub"
        className={`${circleDims} rounded-full bg-[#181717] text-[#F8F8F6] border border-white/15 inline-flex items-center justify-center shadow-xs hover:scale-108 transition-transform`}
      >
        <svg viewBox="0 0 24 24" fill="currentColor" className={svgDims} aria-hidden="true">
          <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2Z" />
        </svg>
      </a>

      {/* 4. Telegram (#26A5E4) */}
      <a
        href={SKYLINE_INSTAGRAM_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Telegram"
        className={`${circleDims} rounded-full bg-[#26A5E4] text-white inline-flex items-center justify-center shadow-xs hover:scale-108 transition-transform`}
      >
        <svg viewBox="0 0 24 24" fill="currentColor" className={svgDims} aria-hidden="true">
          <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
        </svg>
      </a>

      {/* 5. X / Twitter (#000000 / #FFFFFF) */}
      <a
        href={SKYLINE_INSTAGRAM_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="X (Twitter)"
        className={`${circleDims} rounded-full bg-[#000000] text-[#FFFFFF] border border-white/15 inline-flex items-center justify-center shadow-xs hover:scale-108 transition-transform`}
      >
        <svg viewBox="0 0 24 24" fill="currentColor" className={svgDims} aria-hidden="true">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      </a>

      {/* 6. Facebook (#1877F2) */}
      <a
        href={SKYLINE_INSTAGRAM_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Facebook"
        className={`${circleDims} rounded-full bg-[#1877F2] text-white inline-flex items-center justify-center shadow-xs hover:scale-108 transition-transform`}
      >
        <svg viewBox="0 0 24 24" fill="currentColor" className={svgDims} aria-hidden="true">
          <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
        </svg>
      </a>
    </div>
  );
};

/**
 * Unified Geometric Vector Family in 100% Original Brand Colors for the Tech Stack Marquee
 */
export const TechStackBrandIcon: React.FC<{ name: string; className?: string }> = ({
  name,
  className = 'w-5 h-5',
}) => {
  const lower = name.toLowerCase();

  // 1. Next.js (#000000 / #FFFFFF)
  if (lower.includes('next')) {
    return (
      <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
        <circle cx="12" cy="12" r="11" fill="#000000" stroke="#FFFFFF" strokeWidth="1.2" />
        <path
          d="M8.2 16.5V7.5L16.8 18.2M15.5 7.5V13.5"
          stroke="#FFFFFF"
          strokeWidth="1.9"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  // 2. React 19 (#61DAFB)
  if (lower.includes('react')) {
    return (
      <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
        <circle cx="12" cy="12" r="2.1" fill="#61DAFB" />
        <ellipse cx="12" cy="12" rx="9.5" ry="3.8" stroke="#61DAFB" strokeWidth="1.6" />
        <ellipse
          cx="12"
          cy="12"
          rx="9.5"
          ry="3.8"
          transform="rotate(60 12 12)"
          stroke="#61DAFB"
          strokeWidth="1.6"
        />
        <ellipse
          cx="12"
          cy="12"
          rx="9.5"
          ry="3.8"
          transform="rotate(120 12 12)"
          stroke="#61DAFB"
          strokeWidth="1.6"
        />
      </svg>
    );
  }

  // 3. TypeScript (#3178C6)
  if (lower.includes('typescript')) {
    return (
      <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
        <rect x="2" y="2" width="20" height="20" rx="4" fill="#3178C6" />
        <path
          d="M7.5 11H12.5M10 11V17.5M14.2 16.8C14.8 17.3 15.8 17.5 16.7 17.3C17.6 17.1 18 16.4 17.8 15.7C17.6 15 16.9 14.7 15.9 14.3C14.9 13.9 14.4 13.4 14.5 12.5C14.6 11.6 15.4 11 16.5 11C17.2 11 17.8 11.2 18.2 11.5"
          stroke="#FFFFFF"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  // 4. Python FastAPI (#3776AB & #009688)
  if (lower.includes('python') || lower.includes('fastapi')) {
    return (
      <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
        <path
          d="M12 2.5C8.5 2.5 8 4 8 5.8V8H13V9H6.2C4.2 9 3 10.4 3 13C3 15.6 4.2 17 6.2 17H8V14.8C8 13.2 9.2 12 10.8 12H15.2C16.5 12 17.5 11 17.5 9.7V5.8C17.5 3.8 15.5 2.5 12 2.5Z"
          fill="#3776AB"
        />
        <path
          d="M12 21.5C15.5 21.5 16 20 16 18.2V16H11V15H17.8C19.8 15 21 13.6 21 11C21 8.4 19.8 7 17.8 7H16V9.2C16 10.8 14.8 12 13.2 12H8.8C7.5 12 6.5 13 6.5 14.3V18.2C6.5 20.2 8.5 21.5 12 21.5Z"
          fill="#009688"
        />
      </svg>
    );
  }

  // 5. Node.js (#339933)
  if (lower.includes('node')) {
    return (
      <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
        <path
          d="M12 2L20.5 6.9V17.1L12 22L3.5 17.1V6.9L12 2Z"
          fill="#339933"
        />
        <path
          d="M9.5 9.5V14.5L12 16L14.5 14.5V9.5L12 8L9.5 9.5Z"
          stroke="#FFFFFF"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  // 6. PostgreSQL (#336791)
  if (lower.includes('postgres')) {
    return (
      <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
        <ellipse cx="12" cy="6.5" rx="7.5" ry="3.2" fill="#336791" />
        <path
          d="M4.5 6.5V12C4.5 13.8 7.8 15.2 12 15.2C16.2 15.2 19.5 13.8 19.5 12V6.5"
          stroke="#336791"
          strokeWidth="2"
        />
        <path
          d="M4.5 12V17.5C4.5 19.3 7.8 20.7 12 20.7C16.2 20.7 19.5 19.3 19.5 17.5V12"
          stroke="#336791"
          strokeWidth="2"
        />
      </svg>
    );
  }

  // 7. Prisma (#5A67D8)
  if (lower.includes('prisma')) {
    return (
      <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
        <path
          d="M12.5 2.5L4.5 15.5L9.5 21.5L19.5 18.5L12.5 2.5Z"
          fill="#5A67D8"
        />
        <path
          d="M12.5 2.5L9.5 21.5L19.5 18.5"
          stroke="#FFFFFF"
          strokeWidth="1.4"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  // 8. Redis (#DC382D)
  if (lower.includes('redis')) {
    return (
      <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
        <path d="M12 3L21 7.5L12 12L3 7.5L12 3Z" fill="#DC382D" />
        <path
          d="M3 12L12 16.5L21 12M3 16.5L12 21L21 16.5"
          stroke="#DC382D"
          strokeWidth="2.1"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  // 9. Docker (#2496ED)
  if (lower.includes('docker')) {
    return (
      <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
        <rect x="5" y="9" width="3" height="2.8" rx="0.5" fill="#2496ED" />
        <rect x="8.6" y="9" width="3" height="2.8" rx="0.5" fill="#2496ED" />
        <rect x="12.2" y="9" width="3" height="2.8" rx="0.5" fill="#2496ED" />
        <rect x="8.6" y="5.6" width="3" height="2.8" rx="0.5" fill="#2496ED" />
        <rect x="12.2" y="5.6" width="3" height="2.8" rx="0.5" fill="#2496ED" />
        <path
          d="M2.5 13C4.5 13 17.5 13 19.5 12C20.5 11.5 21.5 10.5 22 10C21.8 12.2 20.5 13.8 19.2 14.5C17.8 17.8 14.2 19.5 9.8 19.5C5.2 19.5 2.8 17.2 2.5 13Z"
          fill="#2496ED"
        />
      </svg>
    );
  }

  // 10. AWS Cloud (#FF9900)
  if (lower.includes('aws')) {
    return (
      <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
        <path
          d="M6.5 15.5H17.5C19.4 15.5 21 14 21 12.1C21 10.4 19.7 9 18 8.8C17.4 6.1 15 4 12 4C8.9 4 6.3 6.3 6 9.3C4.3 9.7 3 11.2 3 13C3 14.4 4.5 15.5 6.5 15.5Z"
          fill="#FF9900"
        />
        <path
          d="M6 18.2C9.5 20.5 14.5 20.5 18.2 18.2M16.5 17.8L18.6 18L17.9 19.9"
          stroke="#FF9900"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  // 11. Tailwind CSS (#06B6D4)
  if (lower.includes('tailwind')) {
    return (
      <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
        <path
          d="M12 6C9.3 6 7.7 7.3 7 10C8 8.7 9.2 8.2 10.5 8.5C11.3 8.7 11.8 9.3 12.5 10C13.5 11 14.7 12 17 12C19.7 12 21.3 10.7 22 8C21 9.3 19.8 9.8 18.5 9.5C17.7 9.3 17.2 8.7 16.5 8C15.5 7 14.3 6 12 6ZM7 12C4.3 12 2.7 13.3 2 16C3 14.7 4.2 14.2 5.5 14.5C6.3 14.7 6.8 15.3 7.5 16C8.5 17 9.7 18 12 18C14.7 18 16.3 16.7 17 14C16 15.3 14.8 15.8 13.5 15.5C12.7 15.3 12.2 14.7 11.5 14C10.5 13 9.3 12 7 12Z"
          fill="#06B6D4"
        />
      </svg>
    );
  }

  // 12. OpenAI (#10A37F)
  if (lower.includes('openai')) {
    return (
      <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
        <circle cx="12" cy="12" r="9.5" stroke="#10A37F" strokeWidth="2" />
        <polygon
          points="12,5.5 17.6,8.7 17.6,15.3 12,18.5 6.4,15.3 6.4,8.7"
          stroke="#10A37F"
          strokeWidth="1.7"
          fill="#10A37F"
          fillOpacity="0.18"
        />
        <circle cx="12" cy="12" r="2.2" fill="#10A37F" />
      </svg>
    );
  }

  // 13. WhatsApp Cloud API (#25D366)
  if (lower.includes('whatsapp')) {
    return <WhatsAppBrandBadge size="sm" />;
  }

  // 14. Google Map Pack SEO (#4285F4 / #34A853 / #EA4335 / #FBBC05)
  if (lower.includes('google') || lower.includes('map')) {
    return (
      <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
        <path
          d="M12 2C7.86 2 4.5 5.36 4.5 9.5C4.5 14.8 12 22 12 22C12 22 19.5 14.8 19.5 9.5C19.5 5.36 16.14 2 12 2Z"
          fill="#EA4335"
        />
        <path
          d="M12 2C16.14 2 19.5 5.36 19.5 9.5C19.5 12.2 17.2 15.6 14.7 18.4L12 9.5V2Z"
          fill="#4285F4"
        />
        <path
          d="M6.5 14.5C8.5 17.8 12 22 12 22C12 22 15.5 17.8 17.5 14.5L12 9.5L6.5 14.5Z"
          fill="#34A853"
        />
        <circle cx="12" cy="9.5" r="3.2" fill="#FBBC05" />
      </svg>
    );
  }

  // 15. Meta Ads CAPI (#0081FB)
  if (lower.includes('meta') || lower.includes('ads')) {
    return (
      <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
        <path
          d="M6.8 7.5C4.2 7.5 2.5 9.8 2.5 12.6C2.5 15.2 4.1 17 6.2 17C8.1 17 9.6 15.3 12 11.8C14.4 15.3 15.9 17 17.8 17C19.9 17 21.5 15.2 21.5 12.6C21.5 9.8 19.8 7.5 17.2 7.5C15.2 7.5 13.6 9.1 12 11.5C10.4 9.1 8.8 7.5 6.8 7.5Z"
          stroke="#0081FB"
          strokeWidth="2.3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  // 16. Razorpay & UPI (#3395FF)
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M13.5 2.5L6 13.5H12.2L10.5 21.5L18 10.5H11.8L13.5 2.5Z" fill="#3395FF" />
    </svg>
  );
};

export {
  Layers,
  ShieldCheck,
  TrendingUp,
  Globe,
};

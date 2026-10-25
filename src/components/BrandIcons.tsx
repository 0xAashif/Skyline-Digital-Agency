import React from 'react';

interface SkyLineLogoProps {
  className?: string;
  iconClassName?: string;
  showWordmark?: boolean;
  showSubtitle?: boolean;
  dockStyle?: boolean;
}

/**
 * FR-BRAND-001: Elite Software Engineering, Cloud & AI Systems Emblem (< S / >)
 * Interlocking isometric Code-Prism & Neural Node Monogram inside a squircle titanium frame (rx="10"),
 * combining precision geometric code brackets (< and >) with a central razor-sharp faceted 'S' slash
 * and an Electric Indigo (#6366F1) + Cyber Sky Cyan (#06B6D4) active node spark.
 */
export const SkyLineLogo: React.FC<SkyLineLogoProps> = ({
  className = '',
  iconClassName = 'w-9 h-9',
  showWordmark = true,
  showSubtitle = false,
  dockStyle = false,
}) => (
  <span className={`inline-flex items-center gap-2.5 select-none ${className}`}>
    <svg
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 ${iconClassName}`}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="skylineSquircleBg" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#18181B" />
          <stop offset="100%" stopColor="#09090B" />
        </linearGradient>
        <linearGradient id="skylineRimMetallic" x1="2" y1="2" x2="46" y2="46" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FAFAFA" stopOpacity="0.85" />
          <stop offset="50%" stopColor="#6366F1" stopOpacity="0.65" />
          <stop offset="100%" stopColor="#06B6D4" stopOpacity="0.85" />
        </linearGradient>
        <linearGradient id="skylineSlashPrism" x1="18" y1="9" x2="30" y2="39" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#06B6D4" />
          <stop offset="50%" stopColor="#FAFAFA" />
          <stop offset="100%" stopColor="#6366F1" />
        </linearGradient>
      </defs>

      {/* Squircle Titanium Frame (rx="10") */}
      <rect
        x="3"
        y="3"
        width="42"
        height="42"
        rx="10"
        fill="url(#skylineSquircleBg)"
        stroke="url(#skylineRimMetallic)"
        strokeWidth="1.6"
      />

      {/* Subtle Isometric Inner Grid */}
      <path
        d="M10 24H38M24 10V38"
        stroke="#27272A"
        strokeWidth="0.75"
        strokeDasharray="2 2"
      />

      {/* Left Code Bracket '<' */}
      <path
        d="M17.5 16L10.5 24L17.5 32"
        stroke="#E4E4E7"
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Right Code Bracket '>' */}
      <path
        d="M30.5 16L37.5 24L30.5 32"
        stroke="#E4E4E7"
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Central Faceted 'S' Code-Prism Slash */}
      <path
        d="M27.5 11.5L20.5 22.5L27.5 25.5L20.5 36.5"
        stroke="url(#skylineSlashPrism)"
        strokeWidth="2.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Top Cyan Neural Spark Node */}
      <circle cx="27.5" cy="11.5" r="2.3" fill="#06B6D4" />

      {/* Bottom Electric Indigo Neural Spark Node */}
      <circle cx="20.5" cy="36.5" r="2.3" fill="#6366F1" />
    </svg>

    {showWordmark && (
      <span className="flex flex-col leading-none">
        {dockStyle ? (
          <span className="font-display font-extrabold tracking-tight text-sm sm:text-base text-[var(--text-primary)] inline-flex items-center gap-1">
            <span className="font-mono text-xs text-[#6366F1]">&lt;/&gt;</span>
            <span>SkyLine</span>
          </span>
        ) : (
          <span className="font-display font-extrabold tracking-tight text-base sm:text-lg text-[var(--text-primary)]">
            SkyLine<span className="text-[#6366F1]">.</span>
          </span>
        )}
        {showSubtitle && (
          <span className="hidden sm:block font-mono text-[9px] tracking-[0.18em] uppercase text-[var(--text-muted)] mt-0.5 whitespace-nowrap">
            TECHNOLOGIES &amp; SYSTEMS
          </span>
        )}
      </span>
    )}
  </span>
);

/**
 * Official WhatsApp Vector SVG Logo
 */
export const WhatsAppLogoIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    className={`shrink-0 ${className}`}
    aria-hidden="true"
  >
    <path d="M12.031 2C6.506 2 2.023 6.478 2.02 11.997c0 1.763.46 3.484 1.335 5.002L2 22l5.132-1.346a9.975 9.975 0 0 0 4.895 1.281h.004c5.523 0 10.006-4.478 10.009-9.997a9.963 9.963 0 0 0-2.928-7.073A9.957 9.957 0 0 0 12.031 2Zm5.823 14.279c-.246.693-1.434 1.326-1.988 1.409-.508.076-1.15.108-1.856-.116-.428-.136-.978-.318-1.682-.622-2.961-1.278-4.894-4.262-5.042-4.459-.148-.197-1.205-1.603-1.205-3.058 0-1.455.763-2.17 1.034-2.466.271-.296.591-.37.788-.37.197 0 .394.002.566.01.182.009.426-.069.665.508.246.592.837 2.047.911 2.195.074.148.123.32.025.518-.099.197-.148.32-.296.493-.148.173-.311.386-.444.518-.148.148-.302.309-.13.605.173.296.766 1.264 1.645 2.048 1.13.1008 2.083 1.32 2.379 1.468.296.148.468.123.641-.074.173-.197.739-.863.936-1.159.197-.296.394-.247.665-.148.271.099 1.724.813 2.02.961.296.148.493.222.566.345.074.123.074.715-.172 1.408Z" />
  </svg>
);

/**
 * Official Instagram Vector SVG Logo (Icon-only clean UX)
 */
export const InstagramLogoIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    xmlns="http://www.w3.org/2000/svg"
    className={`shrink-0 ${className}`}
    aria-hidden="true"
  >
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

/**
 * Clean LinkedIn Vector SVG Logo
 */
export const LinkedInLogoIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    xmlns="http://www.w3.org/2000/svg"
    className={`shrink-0 ${className}`}
    aria-hidden="true"
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

/**
 * Clean GitHub / Code Portfolio Vector SVG Logo
 */
export const GitHubLogoIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    xmlns="http://www.w3.org/2000/svg"
    className={`shrink-0 ${className}`}
    aria-hidden="true"
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

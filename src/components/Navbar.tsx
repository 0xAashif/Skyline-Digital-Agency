import React, { useEffect, useState } from 'react';
import {
  ArrowRight,
  Compass,
  FolderKanban,
  Home,
  Layers,
  Mail,
  Moon,
  Phone,
  Sparkles,
  Sun,
  X,
} from 'lucide-react';
import {
  SKYLINE_EMAIL,
  SKYLINE_INSTAGRAM_URL,
  SKYLINE_WHATSAPP_NUMBER,
} from '../utils/architectEngine';
import { ThemeMode } from '../App';
import { InstagramLogoIcon, SkyLineLogo, WhatsAppLogoIcon } from './BrandIcons';

interface NavbarProps {
  theme?: ThemeMode;
  onToggleTheme?: () => void;
  onNavigate?: (sectionId: string) => void;
  externalMenuOpen?: boolean;
  onExternalMenuToggle?: (open: boolean) => void;
}

const PILL_NAV_LINKS = [
  { label: 'Services', href: '#capabilities', highlight: false },
  { label: 'Local Growth', href: '#capabilities', highlight: false },
  { label: 'Our Projects', href: '#projects', highlight: false },
  { label: 'Simulator', href: '#system-simulator', highlight: false },
  { label: 'Process', href: '#process', highlight: false },
  { label: 'Offer 15%', href: '#referral', highlight: true },
];

const CURTAIN_MENU_LINKS = [
  { icon: Home, tag: 'OVERVIEW', accent: 'accent-pill-indigo', label: 'Home', href: '#top' },
  {
    icon: Layers,
    tag: 'CAPABILITIES',
    accent: 'accent-pill-amber',
    label: 'Services & Local Growth',
    href: '#capabilities',
  },
  {
    icon: FolderKanban,
    tag: 'CASE STUDIES',
    accent: 'accent-pill-emerald',
    label: 'Our Projects',
    href: '#projects',
  },
  {
    icon: Compass,
    tag: 'ARCHITECTURE',
    accent: 'accent-pill-violet',
    label: 'System Simulator',
    href: '#system-simulator',
  },
  {
    icon: Sparkles,
    tag: 'DISPATCH',
    accent: 'accent-pill-cyan',
    label: 'Contact Us',
    href: '#contact',
  },
];

export const Navbar: React.FC<NavbarProps> = ({
  theme = 'light',
  onToggleTheme,
  onNavigate,
  externalMenuOpen,
  onExternalMenuToggle,
}) => {
  const [internalOpen, setInternalOpen] = useState(false);
  const [scrolledPastHero, setScrolledPastHero] = useState(false);
  const [architectCardOpen, setArchitectCardOpen] = useState(false);
  const menuOpen = externalMenuOpen !== undefined ? externalMenuOpen : internalOpen;

  const setMenuOpen = (next: boolean) => {
    setInternalOpen(next);
    onExternalMenuToggle?.(next);
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolledPastHero(window.scrollY > 220);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (menuOpen) setMenuOpen(false);
        if (architectCardOpen) setArchitectCardOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  });

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    setMenuOpen(false);
    setArchitectCardOpen(false);
    const id = href.replace('#', '');
    const target = document.getElementById(id);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
      onNavigate?.(id);
    }
  };

  const whatsappDirectUrl = `https://wa.me/${SKYLINE_WHATSAPP_NUMBER}?text=${encodeURIComponent(
    'Hello SkyLine Technologies, I would like to connect with the Lead System Architect regarding our project!'
  )}`;

  return (
    <>
      {/* Floating Pill Navigation Dock (Appears on scroll past Hero top bar) */}
      <header
        className={`fixed top-3 left-0 right-0 z-40 px-3 sm:px-6 lg:px-10 transition-all duration-300 ${
          scrolledPastHero
            ? 'opacity-100 translate-y-0 pointer-events-none'
            : 'opacity-0 -translate-y-16 pointer-events-none'
        }`}
      >
        <div
          className={`max-w-[1340px] mx-auto platinum-card backdrop-blur-xl rounded-full px-4 sm:px-6 py-2.5 flex items-center justify-between gap-3 ${
            scrolledPastHero ? 'pointer-events-auto' : 'pointer-events-none'
          }`}
        >
          {/* Left: Compact </> SkyLine Monogram + Wordmark */}
          <a
            href="#top"
            onClick={(e) => handleLinkClick(e, '#top')}
            aria-label="SkyLine Technologies Homepage"
            className="whitespace-nowrap shrink-0"
          >
            <SkyLineLogo iconClassName="w-9 h-9" dockStyle />
          </a>

          {/* Center: Inner Bordered Capsule Links with Warm Amber Gold Offer Pill */}
          <nav
            aria-label="Primary Navigation"
            className="hidden lg:flex items-center gap-4 px-4 py-1.5 rounded-full platinum-subdued text-xs font-medium"
          >
            {PILL_NAV_LINKS.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => handleLinkClick(e, item.href)}
                className={`transition-colors whitespace-nowrap shrink-0 ${
                  item.highlight
                    ? 'px-2.5 py-0.5 rounded-full accent-pill-amber font-mono font-bold text-[11px]'
                    : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                }`}
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Right: Strategy Call Pill + Icon-Only Instagram + Theme Toggle + Email + Menu Button */}
          <div className="flex items-center gap-2 shrink-0">
            <a
              href="#contact"
              onClick={(e) => handleLinkClick(e, '#contact')}
              className="inline-flex items-center gap-1.5 px-4 py-2 min-h-[38px] rounded-full btn-platinum-primary font-display font-bold text-xs whitespace-nowrap shrink-0"
            >
              <span>Strategy Call</span>
              <ArrowRight className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
            </a>

            <a
              href={SKYLINE_INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Follow SkyLine on Instagram"
              title="Follow SkyLine on Instagram"
              className="hidden sm:inline-flex items-center justify-center w-9 h-9 min-w-[38px] min-h-[38px] rounded-full platinum-subdued text-[var(--text-primary)] instagram-icon-btn shrink-0"
            >
              <InstagramLogoIcon className="w-4 h-4" />
            </a>

            <button
              type="button"
              onClick={onToggleTheme}
              aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
              title={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
              className="inline-flex items-center justify-center w-9 h-9 min-w-[38px] min-h-[38px] rounded-full platinum-subdued text-[var(--text-primary)] hover:opacity-80 transition-opacity cursor-pointer shrink-0"
            >
              {theme === 'light' ? (
                <Moon className="w-4 h-4" aria-hidden="true" />
              ) : (
                <Sun className="w-4 h-4" aria-hidden="true" />
              )}
            </button>

            <a
              href={`mailto:${SKYLINE_EMAIL}`}
              aria-label="Send Official Desk Email"
              className="hidden md:inline-flex items-center justify-center w-9 h-9 min-w-[38px] min-h-[38px] rounded-full platinum-subdued text-[var(--text-primary)] hover:opacity-80 transition-opacity shrink-0"
            >
              <Mail className="w-4 h-4" aria-hidden="true" />
            </a>

            <button
              type="button"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-expanded={menuOpen}
              aria-controls="fullscreen-curtain-menu"
              aria-label={menuOpen ? 'Close Navigation Menu' : 'Toggle Menu'}
              className="inline-flex items-center justify-center w-9 h-9 min-w-[40px] min-h-[40px] rounded-full platinum-subdued text-[var(--text-primary)] hover:opacity-80 transition-opacity cursor-pointer shrink-0"
            >
              {menuOpen ? (
                <X className="w-4 h-4" aria-hidden="true" />
              ) : (
                <span className="flex flex-col gap-1 items-center justify-center" aria-hidden="true">
                  <span className="w-3.5 h-[1.5px] bg-current block" />
                  <span className="w-3.5 h-[1.5px] bg-current block" />
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Full-Screen Curtain Menu Overlay (Zero Cheap Numbering, Icon-Only Instagram) */}
      {menuOpen && (
        <div
          id="fullscreen-curtain-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Full Screen Navigation Menu"
          className="fixed inset-0 z-50 platinum-canvas backdrop-blur-2xl flex flex-col justify-between p-6 sm:p-10 lg:p-12 overflow-y-auto"
        >
          {/* Curtain Top Row */}
          <div className="flex items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-4">
              <SkyLineLogo iconClassName="w-10 h-10" showSubtitle />
              <a
                href={`mailto:${SKYLINE_EMAIL}`}
                className="hidden sm:inline-flex items-center gap-2 font-mono text-xs text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
              >
                <span>OFFICIAL DESK: {SKYLINE_EMAIL}</span>
              </a>
            </div>

            <div className="flex items-center gap-2.5">
              <a
                href={SKYLINE_INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow SkyLine on Instagram"
                title="Follow SkyLine on Instagram"
                className="inline-flex items-center justify-center w-11 h-11 rounded-full platinum-card text-[var(--text-primary)] instagram-icon-btn"
              >
                <InstagramLogoIcon className="w-4 h-4" />
              </a>

              <button
                type="button"
                onClick={onToggleTheme}
                aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
                className="inline-flex items-center justify-center w-11 h-11 rounded-full platinum-card text-[var(--text-primary)] cursor-pointer"
              >
                {theme === 'light' ? (
                  <Moon className="w-4 h-4" aria-hidden="true" />
                ) : (
                  <Sun className="w-4 h-4" aria-hidden="true" />
                )}
              </button>

              <button
                type="button"
                onClick={() => setMenuOpen(false)}
                aria-label="Close Navigation Curtain"
                className="inline-flex items-center justify-center w-11 h-11 rounded-full platinum-card text-[var(--text-primary)] cursor-pointer"
              >
                <X className="w-5 h-5" aria-hidden="true" />
              </button>
            </div>
          </div>

          {/* Curtain Center Monumental Links (Icon + Semantic Category Pill + Label) */}
          <nav
            aria-label="Curtain Menu Links"
            className="my-auto py-8 flex flex-col items-center justify-center space-y-4 sm:space-y-6"
          >
            {CURTAIN_MENU_LINKS.map((item) => {
              const IconComp = item.icon;
              return (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => handleLinkClick(e, item.href)}
                  className="group inline-flex items-center gap-4 sm:gap-6 py-1 transition-transform duration-150 hover:-translate-y-0.5"
                >
                  <span className="w-10 h-10 rounded-full platinum-subdued flex items-center justify-center text-[var(--text-secondary)] group-hover:text-[var(--text-primary)]">
                    <IconComp className="w-4 h-4" aria-hidden="true" />
                  </span>
                  <span className="font-display font-extrabold text-2xl sm:text-5xl lg:text-6xl text-[var(--text-primary)] tracking-tight">
                    {item.label}
                  </span>
                  <span
                    className={`hidden md:inline-block px-3 py-1 rounded-full ${item.accent} font-mono text-[10px] font-bold tracking-widest uppercase`}
                  >
                    {item.tag}
                  </span>
                </a>
              );
            })}
          </nav>

          {/* Curtain Bottom Metadata Row */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs font-mono text-[var(--text-muted)] pt-4 border-t border-[var(--border-metallic)]">
            <span>BASED IN: Madhya Pradesh, India (Serving Startups &amp; Businesses Globally)</span>
            <div className="flex items-center gap-2">
              <a
                href={SKYLINE_INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow SkyLine on Instagram"
                title="Follow SkyLine on Instagram"
                className="inline-flex items-center justify-center w-9 h-9 rounded-full platinum-card text-[var(--text-primary)] instagram-icon-btn"
              >
                <InstagramLogoIcon className="w-4 h-4" />
              </a>
              <a
                href={whatsappDirectUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Chat on WhatsApp"
                title="Chat on WhatsApp"
                className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-[#25D366] text-white"
              >
                <WhatsAppLogoIcon className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      )}

      {/* FR-ENH-006 (#1): Floating Bottom-Left "Chat with Lead Architect" Pill + Quick Drawer */}
      <div className="fixed bottom-5 left-4 sm:left-6 z-40 flex flex-col items-start gap-2.5">
        {architectCardOpen && (
          <div
            role="dialog"
            aria-label="Lead System Architect Quick Connect"
            className="w-[290px] sm:w-[320px] rounded-2xl platinum-card p-4 shadow-2xl space-y-3 border border-[var(--border-metallic)]"
          >
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-center gap-2.5">
                <div className="relative w-9 h-9 rounded-xl bg-[#6366F1] text-white font-mono font-bold text-xs flex items-center justify-center shrink-0">
                  <span>&lt;/&gt;</span>
                  <span
                    aria-hidden="true"
                    className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-[#10B981] ring-2 ring-[var(--bg-surface)]"
                  />
                </div>
                <div>
                  <div className="font-display font-bold text-xs text-[var(--text-primary)]">
                    Lead System Architect
                  </div>
                  <div className="font-mono text-[10px] text-[#10B981] font-semibold">
                    Online • &lt; 60s Teardown SLA
                  </div>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setArchitectCardOpen(false)}
                aria-label="Close Lead Architect widget"
                className="w-7 h-7 rounded-full platinum-subdued flex items-center justify-center text-[var(--text-secondary)] hover:text-[var(--text-primary)] cursor-pointer"
              >
                <X className="w-3.5 h-3.5" aria-hidden="true" />
              </button>
            </div>

            <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
              Need a custom Next.js platform, +91 WhatsApp AI bot, or Google Map Pack #1 engine?
              Claim your free 60-second architectural teardown.
            </p>

            <div className="flex flex-col gap-2">
              <a
                href={whatsappDirectUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-xl bg-[#25D366] text-white font-display font-bold text-xs hover:opacity-95 transition-opacity"
              >
                <WhatsAppLogoIcon className="w-4 h-4" />
                <span>WhatsApp Lead Architect</span>
              </a>
              <a
                href="#system-simulator"
                onClick={(e) => handleLinkClick(e, '#system-simulator')}
                className="w-full inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl platinum-subdued text-[var(--text-primary)] font-mono font-semibold text-[11px] hover:opacity-85 transition-opacity"
              >
                <span>Run 60s ROI Simulator</span>
                <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
              </a>
            </div>
          </div>
        )}

        <button
          type="button"
          onClick={() => setArchitectCardOpen((prev) => !prev)}
          aria-expanded={architectCardOpen}
          aria-label="Chat with Lead Architect"
          className="inline-flex items-center gap-2.5 pl-2.5 pr-4 py-2 min-h-[44px] rounded-full platinum-card shadow-xl hover:-translate-y-0.5 transition-transform cursor-pointer"
        >
          <span className="relative w-7 h-7 rounded-full bg-[#18181B] text-[#FAFAFA] font-mono font-bold text-[10px] flex items-center justify-center shrink-0">
            <span>SL</span>
            <span
              aria-hidden="true"
              className="
                absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-[#10B981]
                ring-2 ring-[var(--bg-surface)] animate-pulse
              "
            />
          </span>
          <span className="text-left">
            <span className="block font-display font-bold text-xs text-[var(--text-primary)] leading-tight">
              Chat with Lead Architect
            </span>
            <span className="hidden sm:block font-mono text-[10px] text-[#10B981] font-semibold leading-tight">
              Live • Free 60s System Audit
            </span>
          </span>
        </button>
      </div>

      {/* Floating Bottom-Right Official WhatsApp Green (#25D366), Icon-Only Instagram & Call Dock */}
      <div
        aria-label="Quick Contact Actions"
        className={`fixed bottom-5 right-4 sm:right-6 z-40 flex flex-col items-end gap-2.5 transition-all duration-300 ${
          scrolledPastHero
            ? 'opacity-100 translate-y-0 pointer-events-auto'
            : 'opacity-0 translate-y-8 pointer-events-none'
        }`}
      >
        <a
          href={whatsappDirectUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat with SkyLine Lead Engineer on WhatsApp"
          title="WhatsApp Lead Engineer"
          className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#25D366] text-white shadow-xl hover:scale-105 transition-transform"
        >
          <WhatsAppLogoIcon className="w-6 h-6" />
        </a>

        <a
          href={SKYLINE_INSTAGRAM_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Follow SkyLine on Instagram"
          title="Follow SkyLine on Instagram"
          className="inline-flex items-center justify-center w-11 h-11 rounded-full platinum-card text-[var(--text-primary)] shadow-xl hover:scale-105 transition-transform instagram-icon-btn"
        >
          <InstagramLogoIcon className="w-5 h-5" />
        </a>

        <a
          href="tel:+918643002478"
          aria-label="Call SkyLine Digital Now"
          title="Call +91 8643002478"
          className="inline-flex items-center justify-center w-11 h-11 rounded-full platinum-card text-[var(--text-primary)] shadow-xl hover:scale-105 transition-transform"
        >
          <Phone className="w-4 h-4" aria-hidden="true" />
        </a>
      </div>
    </>
  );
};

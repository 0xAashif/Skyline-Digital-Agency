import React, { useState, useEffect } from 'react';
import {
  ArrowRight,
  ArrowUpRight,
  X,
  Phone,
  PhoneCall,
  Sparkles,
  Sun,
  Moon,
  MapPin,
} from 'lucide-react';
import {
  SKYLINE_SACHIN_WHATSAPP_NUMBER,
  SKYLINE_CALL_NUMBER,
  SKYLINE_PRIMARY_PHONE_DISPLAY,
  SKYLINE_SACHIN_PHONE_DISPLAY,
  SKYLINE_EMAIL,
  SKYLINE_LOCATION,
} from '../data/agencyData';
import {
  SkyLineLogo,
  WhatsAppBrandBadge,
  WhatsAppLogoIcon,
  GmailBrandIcon,
  SocialIconBar,
} from './BrandIcons';
import { SkylineAiChatbot } from './SkylineAiChatbot';

export type ActivePage =
  | 'home'
  | 'services'
  | 'work'
  | 'who-we-are'
  | 'referral'
  | 'contact';

export type PageId = ActivePage;

interface NavbarProps {
  activePage: ActivePage;
  onNavigate: (pageOrSection: string) => void;
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
}

export const PUBLIC_NAV_TABS: {
  id: ActivePage;
  label: string;
  desc: string;
}[] = [
  { id: 'home', label: 'Home', desc: 'Agency Overview & 3D Geodesic Core' },
  { id: 'services', label: 'Services', desc: '7-Track Architecture & 60s Estimator' },
  { id: 'work', label: 'Our Work', desc: 'Verified Case Studies & Client Reviews' },
  { id: 'who-we-are', label: 'Who We Are', desc: 'Founding Architects & Delivery Roadmap' },
  { id: 'referral', label: 'Offer & Referral', desc: '15% Partner Payout & FAQ' },
  { id: 'contact', label: 'Contact', desc: 'Project Quote & Strategy Call Desk' },
];

export const Navbar: React.FC<NavbarProps> = ({
  activePage,
  onNavigate,
  theme,
  onToggleTheme,
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 48);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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

  const handleNavClick = (id: string) => {
    setMenuOpen(false);
    onNavigate(id);
  };

  // Primary WhatsApp CTA routes to Sachin's active WhatsApp (918959144686)
  const primaryWhatsAppUrl = `https://wa.me/${SKYLINE_SACHIN_WHATSAPP_NUMBER}?text=${encodeURIComponent(
    'Hi SkyLine Digital Agency! I want to discuss a project for my business.'
  )}`;

  return (
    <>
      {/* Unified Morphing Header (Single Brand Lockup — Zero Duplicate Links) */}
      <header
        className={`fixed left-0 right-0 z-40 transition-all duration-500 ${
          scrolled ? 'top-3 px-3 sm:px-6' : 'top-0 px-0'
        }`}
      >
        <div
          className={`mx-auto transition-all duration-500 flex items-center justify-between gap-3 ${
            scrolled
              ? 'max-w-6xl bg-[#0B0C0E]/96 text-[#F4F4F5] border border-white/12 backdrop-blur-xl rounded-full px-4 sm:px-6 py-2.5 shadow-2xl'
              : 'w-full px-4 sm:px-8 lg:px-12 h-20 border-b border-[var(--border-hairline)] bg-[var(--bg-canvas)]/92 backdrop-blur-md'
          }`}
        >
          <button
            type="button"
            onClick={() => handleNavClick('home')}
            className="text-left cursor-pointer group focus:outline-none shrink-0 min-h-[44px] flex items-center"
            aria-label="SkyLine Digital Agency Home"
          >
            <SkyLineLogo size="md" dockStyle={scrolled} />
          </button>

          {/* Center Multi-Page Tab Navigation */}
          <nav
            aria-label="Primary Page Navigation"
            className={`hidden lg:flex items-center gap-1 px-2.5 py-1.5 rounded-full border transition-colors ${
              scrolled
                ? 'border-white/12 bg-white/[0.03]'
                : 'border-[var(--border-hairline)] bg-[var(--bg-surface)]/80'
            }`}
          >
            {PUBLIC_NAV_TABS.map((item) => {
              const isActive = activePage === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleNavClick(item.id)}
                  aria-current={isActive ? 'page' : undefined}
                  className={`font-display text-xs font-semibold tracking-wide px-3.5 py-1.5 rounded-full transition-all cursor-pointer whitespace-nowrap min-h-[36px] ${
                    isActive
                      ? scrolled
                        ? 'bg-white text-[#09090B] shadow-xs'
                        : 'bg-[#141518] text-[#F4F3EF] dark:bg-[#F4F4F5] dark:text-[#09090B] shadow-xs'
                      : item.id === 'referral'
                        ? 'text-[#10B981] font-bold hover:opacity-85'
                        : scrolled
                          ? 'text-zinc-300 hover:text-white'
                          : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Right Controls: Full-Size Gmail Icon + Theme Toggle + Strategy Call WhatsApp CTA + Mobile Menu */}
          <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
            <a
              href={primaryWhatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`hidden sm:inline-flex items-center gap-2 px-4 py-2.5 min-h-[42px] rounded-full text-xs font-semibold tracking-wide cursor-pointer whitespace-nowrap transition-all ${
                scrolled
                  ? 'bg-white text-[#09090B] hover:bg-zinc-100'
                  : 'btn-platinum-primary'
              }`}
            >
              <span>Strategy Call</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>

            <a
              href={`mailto:${SKYLINE_EMAIL}`}
              aria-label="Email SkyLine Digital Agency"
              title={SKYLINE_EMAIL}
              className="hidden sm:inline-flex items-center justify-center min-w-[42px] min-h-[42px] rounded-full hover:scale-105 transition-transform"
            >
              <GmailBrandIcon size="md" />
            </a>

            <button
              type="button"
              onClick={onToggleTheme}
              aria-label={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              className={`w-10 h-10 rounded-full inline-flex items-center justify-center cursor-pointer shrink-0 transition-colors ${
                scrolled
                  ? 'border border-white/15 bg-white/[0.04] hover:bg-white/[0.1] text-zinc-200'
                  : 'btn-platinum-secondary text-[var(--text-primary)]'
              }`}
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4" />
              ) : (
                <Moon className="w-4 h-4" />
              )}
            </button>

            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label="Open Navigation Menu"
              className={`inline-flex items-center justify-center w-10 h-10 rounded-full cursor-pointer transition-colors ${
                scrolled
                  ? 'border border-white/15 bg-white/[0.04] hover:bg-white/[0.1] text-zinc-200'
                  : 'btn-platinum-secondary text-[var(--text-primary)]'
              }`}
            >
              <span className="flex flex-col gap-1 w-4">
                <span className="w-full h-[1.5px] bg-current block" />
                <span className="w-2.5 h-[1.5px] bg-current block ml-auto" />
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Full-Screen Curtain Overlay Menu */}
      {menuOpen && (
        <div className="fixed inset-0 z-50 bg-[var(--bg-canvas)] text-[var(--text-primary)] flex flex-col justify-between p-6 sm:p-10 lg:p-14 overflow-y-auto">
          {/* Top Header */}
          <div className="max-w-7xl w-full mx-auto flex items-center justify-between border-b border-[var(--border-hairline)] pb-6">
            <SkyLineLogo size="md" />

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={onToggleTheme}
                aria-label={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                className="w-11 h-11 rounded-full btn-platinum-secondary inline-flex items-center justify-center cursor-pointer"
              >
                {theme === 'dark' ? (
                  <Sun className="w-4 h-4 text-[var(--text-primary)]" />
                ) : (
                  <Moon className="w-4 h-4 text-[var(--text-primary)]" />
                )}
              </button>

              <button
                type="button"
                onClick={() => setMenuOpen(false)}
                aria-label="Close Navigation Menu"
                className="inline-flex items-center gap-2 px-4 py-2.5 min-h-[44px] rounded-full btn-platinum-primary text-xs font-mono-tech uppercase tracking-widest cursor-pointer"
              >
                <span>Close</span>
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Center Navigation List */}
          <div className="max-w-7xl w-full mx-auto my-auto py-8 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 space-y-2">
              {PUBLIC_NAV_TABS.map((item) => {
                const isActive = activePage === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handleNavClick(item.id)}
                    className={`w-full group flex items-baseline justify-between py-3.5 border-b border-[var(--border-hairline)] text-left hover:pl-3 transition-all duration-300 cursor-pointer ${
                      isActive ? 'text-[var(--text-primary)] underline decoration-2 underline-offset-8' : ''
                    }`}
                  >
                    <div className="flex items-baseline gap-4">
                      <span className="font-display text-2xl sm:text-4xl font-extrabold tracking-tight group-hover:text-[var(--text-secondary)] transition-colors">
                        {item.label}
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="hidden sm:inline text-xs text-[var(--text-secondary)]">
                        {item.desc}
                      </span>
                      <ArrowUpRight className="w-5 h-5 text-[var(--text-muted)] group-hover:text-[var(--text-primary)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Right Column: Direct Channels & Referral Partner Card */}
            <div className="lg:col-span-5 space-y-5">
              <div className="surface-card rounded-3xl p-6 sm:p-7 space-y-5">
                <div className="inline-flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#10B981]" />
                  <span className="font-mono-tech text-[10px] uppercase tracking-widest font-bold text-[var(--text-primary)]">
                    ACCEPTING NEW PROJECTS
                  </span>
                </div>

                <div>
                  <h3 className="font-display text-xl font-bold mb-1.5">
                    SkyLine Digital Agency
                  </h3>
                  <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                    From sub-second web & SaaS platforms to Google Maps #1 ranking and 24/7 WhatsApp AI bots.
                  </p>
                </div>

                <div className="space-y-3 pt-1 text-xs">
                  <div className="flex items-center gap-3 text-[var(--text-secondary)]">
                    <MapPin className="w-4 h-4 text-[var(--text-primary)] shrink-0" />
                    <span>{SKYLINE_LOCATION}</span>
                  </div>
                  <div className="flex items-center gap-3 text-[var(--text-secondary)]">
                    <GmailBrandIcon size="sm" />
                    <a
                      href={`mailto:${SKYLINE_EMAIL}`}
                      className="hover:text-[var(--text-primary)] underline underline-offset-4 font-mono-tech"
                    >
                      {SKYLINE_EMAIL}
                    </a>
                  </div>
                  <div className="flex items-center gap-3 text-[var(--text-secondary)]">
                    <Phone className="w-4 h-4 text-[var(--text-primary)] shrink-0" />
                    <div className="font-mono-tech flex flex-wrap items-center gap-2">
                      <a
                        href={`tel:${SKYLINE_CALL_NUMBER}`}
                        className="font-semibold text-[var(--text-primary)] hover:underline"
                      >
                        {SKYLINE_PRIMARY_PHONE_DISPLAY}
                      </a>
                      <span>•</span>
                      <a
                        href={primaryWhatsAppUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-semibold text-[var(--text-primary)] hover:underline"
                      >
                        {SKYLINE_SACHIN_PHONE_DISPLAY}
                      </a>
                    </div>
                  </div>
                </div>

                {/* 6 Brand-Color Social Icons in Mobile Menu Drawer */}
                <div className="pt-3 border-t border-[var(--border-hairline)] flex items-center justify-between gap-2">
                  <SocialIconBar size="sm" />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                  <a
                    href={primaryWhatsAppUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 px-4 py-3 min-h-[44px] rounded-xl btn-whatsapp-official text-xs font-semibold"
                  >
                    <WhatsAppBrandBadge size="sm" className="border border-white/30" />
                    <span>WhatsApp Chat</span>
                  </a>
                  <a
                    href={`tel:${SKYLINE_CALL_NUMBER}`}
                    className="flex items-center justify-center gap-2 px-4 py-3 min-h-[44px] rounded-xl btn-platinum-primary text-xs font-semibold cursor-pointer"
                  >
                    <PhoneCall className="w-3.5 h-3.5" />
                    <span>Direct Call</span>
                  </a>
                </div>
              </div>

              {/* Referral Highlight Box */}
              <div className="surface-elevated rounded-2xl p-5 flex items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="inline-flex items-center gap-1.5 text-[var(--text-primary)] font-mono-tech text-[10px] uppercase tracking-widest font-semibold">
                    <Sparkles className="w-3.5 h-3.5 text-[#10B981]" />
                    <span>PARTNER COMMISSION</span>
                  </div>
                  <p className="text-xs sm:text-sm font-semibold">
                    Refer a client & earn a direct 15% cash payout
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => handleNavClick('referral')}
                  className="px-3.5 py-2.5 min-h-[44px] rounded-xl btn-platinum-primary text-xs font-semibold shrink-0 cursor-pointer"
                >
                  Calculate
                </button>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="max-w-7xl w-full mx-auto pt-4 border-t border-[var(--border-hairline)] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[var(--text-muted)] font-mono-tech">
            <span>SKYLINE DIGITAL AGENCY • FULL-STACK, AI & GROWTH</span>
            <span>INDORE, BHOPAL, MADHYA PRADESH, INDIA</span>
          </div>
        </div>
      )}

      {/* Floating Bottom-Right Action Stack:
          1) WhatsApp Green (#25D366 -> Sachin 918959144686)
          2) Direct Call Obsidian (#141518 -> Aashif +918643002478)
          3) SkyLine AI Assistant Launcher (Custom Branded Chat-Logo Icon) */}
      <div className="fixed bottom-5 right-4 sm:right-5 z-40 flex flex-col items-end gap-2.5">
        <a
          href={primaryWhatsAppUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat on WhatsApp with SkyLine Digital Agency"
          title="Chat on WhatsApp"
          className="w-12 h-12 rounded-full bg-[#25D366] text-white shadow-xl flex items-center justify-center hover:scale-105 transition-transform"
        >
          <WhatsAppLogoIcon className="w-6 h-6" />
        </a>

        <a
          href={`tel:${SKYLINE_CALL_NUMBER}`}
          aria-label="Call SkyLine Digital Agency"
          title="Call Lead Architect"
          className="w-12 h-12 rounded-full bg-[#141518] text-[#F4F3EF] border border-white/15 shadow-xl flex items-center justify-center hover:scale-105 transition-transform"
        >
          <PhoneCall className="w-5 h-5" />
        </a>

        <SkylineAiChatbot />
      </div>
    </>
  );
};

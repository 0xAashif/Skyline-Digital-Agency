import React, { useState, useEffect } from 'react';
import {
  ArrowUpRight,
  X,
  Phone,
  Sparkles,
  Sun,
  Moon,
  MapPin,
} from 'lucide-react';
import {
  SKYLINE_WHATSAPP_NUMBER,
  SKYLINE_EMAIL,
  SKYLINE_LOCATION,
} from '../data/agencyData';
import {
  SkyLineLogo,
  WhatsAppBrandBadge,
  GmailBrandIcon,
  SocialIconBar,
} from './BrandIcons';

interface NavbarProps {
  onNavigate: (sectionId: string) => void;
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
}

const PUBLIC_NAV_TABS = [
  { id: 'services', label: 'Services', desc: 'Web, AI, Ads, SEO & Local Growth' },
  { id: 'work', label: 'Our Work', desc: 'Verified Case Studies & Blueprints' },
  { id: 'who-we-are', label: 'Who We Are', desc: 'The SkyLine Engineering Doctrine' },
  { id: 'referral', label: 'Offer & Referral', desc: '60s Estimator & 15% Partner Payout' },
];

export const Navbar: React.FC<NavbarProps> = ({
  onNavigate,
  theme,
  onToggleTheme,
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 110);
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

  const whatsappDirectUrl = `https://wa.me/${SKYLINE_WHATSAPP_NUMBER}?text=${encodeURIComponent(
    'Hi SkyLine Digital Team! I want to discuss a project for my business.'
  )}`;

  return (
    <>
      {/* Top Bar (visible at top of Hero) */}
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          scrolled
            ? 'opacity-0 -translate-y-6 pointer-events-none'
            : 'opacity-100 translate-y-0'
        }`}
      >
        <div className="w-full px-4 sm:px-8 lg:px-12 h-20 flex items-center justify-between border-b border-[var(--border-hairline)] bg-[var(--bg-canvas)]/90 backdrop-blur-md">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="text-left cursor-pointer group focus:outline-none shrink-0"
            aria-label="SkyLine Digital Home"
          >
            <SkyLineLogo size="md" />
          </button>

          {/* Exact 4 Public Navigation Tabs */}
          <nav className="hidden lg:flex items-center gap-8">
            {PUBLIC_NAV_TABS.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className="font-display text-xs font-bold tracking-wide text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors cursor-pointer whitespace-nowrap"
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Right Controls: 5-App Social Bar + Strictly Icon-Only Theme Toggle + Primary CTA + Menu */}
          <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
            <div className="hidden xl:flex items-center">
              <SocialIconBar size="sm" />
            </div>

            {/* Strictly Circular Icon-Only Theme Toggle (Zero "Dark" or "Light" text) */}
            <button
              onClick={onToggleTheme}
              aria-label={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              className="w-10 h-10 rounded-full btn-platinum-secondary inline-flex items-center justify-center cursor-pointer shrink-0"
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-[var(--text-primary)]" />
              ) : (
                <Moon className="w-4 h-4 text-[var(--text-primary)]" />
              )}
            </button>

            <button
              onClick={() => handleNavClick('contact')}
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2.5 rounded-full btn-platinum-primary text-xs font-bold tracking-wide cursor-pointer whitespace-nowrap"
            >
              <span>Start Project</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={() => setMenuOpen(true)}
              aria-label="Open Navigation Menu"
              className="lg:hidden inline-flex items-center justify-center w-10 h-10 rounded-full btn-platinum-secondary cursor-pointer"
            >
              <span className="flex flex-col gap-1 w-4">
                <span className="w-full h-[1.5px] bg-current block" />
                <span className="w-3 h-[1.5px] bg-current block ml-auto" />
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Scrolled Floating Pill Dock */}
      <div
        className={`fixed top-4 left-1/2 -translate-x-1/2 z-40 transition-all duration-500 ${
          scrolled
            ? 'opacity-100 translate-y-0 pointer-events-auto'
            : 'opacity-0 -translate-y-8 pointer-events-none'
        }`}
      >
        <div className="surface-glass rounded-full p-1.5 pl-3.5 shadow-xl flex items-center gap-2 sm:gap-3">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-2 text-left cursor-pointer pr-1 shrink-0"
            aria-label="Scroll to top"
          >
            <SkyLineLogo size="sm" showText={false} />
            <span className="font-display font-extrabold text-xs tracking-[0.14em] text-[var(--text-primary)] uppercase hidden sm:inline">
              SKYLINE
            </span>
          </button>

          {/* Exact 4 Navigation Tabs in Floating Dock */}
          <div className="hidden md:flex items-center gap-1 border-l border-[var(--border-hairline)] pl-2">
            {PUBLIC_NAV_TABS.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className="font-display px-3 py-1.5 rounded-full text-xs font-semibold text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors cursor-pointer whitespace-nowrap"
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Strictly Circular Icon-Only Theme Toggle */}
          <button
            onClick={onToggleTheme}
            aria-label={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            className="w-8 h-8 rounded-full btn-platinum-secondary inline-flex items-center justify-center cursor-pointer shrink-0"
          >
            {theme === 'dark' ? (
              <Sun className="w-3.5 h-3.5 text-[var(--text-primary)]" />
            ) : (
              <Moon className="w-3.5 h-3.5 text-[var(--text-primary)]" />
            )}
          </button>

          <button
            onClick={() => handleNavClick('contact')}
            className="px-4 py-2 rounded-full btn-platinum-primary text-xs font-bold tracking-wide cursor-pointer whitespace-nowrap"
          >
            Start Project
          </button>

          <button
            onClick={() => setMenuOpen(true)}
            aria-label="Open Full Menu"
            className="md:hidden w-8 h-8 rounded-full btn-platinum-secondary inline-flex items-center justify-center cursor-pointer"
          >
            <span className="flex flex-col gap-1 w-3.5">
              <span className="w-full h-[1.5px] bg-current block" />
              <span className="w-2.5 h-[1.5px] bg-current block ml-auto" />
            </span>
          </button>
        </div>
      </div>

      {/* Full-Screen Curtain Overlay Menu */}
      {menuOpen && (
        <div className="fixed inset-0 z-50 bg-[var(--bg-canvas)] text-[var(--text-primary)] flex flex-col justify-between p-6 sm:p-10 lg:p-14 overflow-y-auto">
          {/* Top Header */}
          <div className="max-w-7xl w-full mx-auto flex items-center justify-between border-b border-[var(--border-hairline)] pb-6">
            <SkyLineLogo size="md" />

            <div className="flex items-center gap-3">
              <SocialIconBar size="sm" className="hidden sm:inline-flex" />

              {/* Circular Icon-Only Theme Button */}
              <button
                onClick={onToggleTheme}
                aria-label={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                className="w-10 h-10 rounded-full btn-platinum-secondary inline-flex items-center justify-center cursor-pointer"
              >
                {theme === 'dark' ? (
                  <Sun className="w-4 h-4 text-[var(--text-primary)]" />
                ) : (
                  <Moon className="w-4 h-4 text-[var(--text-primary)]" />
                )}
              </button>

              <button
                onClick={() => setMenuOpen(false)}
                aria-label="Close Navigation Menu"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full btn-platinum-primary text-xs font-mono-tech uppercase tracking-widest cursor-pointer"
              >
                <span>Close</span>
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Center Navigation List */}
          <div className="max-w-7xl w-full mx-auto my-auto py-8 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 space-y-2">
              {[
                ...PUBLIC_NAV_TABS,
                { id: 'simulator', label: '60s Price Estimator', desc: 'Interactive Scope & Cost Calculator' },
                { id: 'faq', label: 'FAQ', desc: 'Pricing, Timelines & Ownership' },
                { id: 'contact', label: 'Contact Us', desc: 'Book a Free Strategy Call' },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className="w-full group flex items-baseline justify-between py-3.5 border-b border-[var(--border-hairline)] text-left hover:pl-3 transition-all duration-300 cursor-pointer"
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
              ))}
            </div>

            {/* Right Column: Direct Channels & Referral Partner Card */}
            <div className="lg:col-span-5 space-y-5">
              <div className="surface-card rounded-3xl p-6 sm:p-7 space-y-5">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full badge-sage-status">
                  <span className="w-2 h-2 rounded-full bg-[#10B981]" />
                  <span className="font-mono-tech text-[10px] uppercase tracking-widest font-semibold">
                    ACCEPTING NEW PROJECTS
                  </span>
                </div>

                <div>
                  <h3 className="font-display text-xl font-bold mb-1.5">
                    Build & Scale Your Business
                  </h3>
                  <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                    From high-speed websites and SaaS platforms to Google Maps #1 ranking and 24/7 WhatsApp bots.
                  </p>
                </div>

                <div className="space-y-2.5 pt-1 text-xs">
                  <div className="flex items-center gap-2.5 text-[var(--text-secondary)]">
                    <MapPin className="w-4 h-4 text-[var(--text-primary)] shrink-0" />
                    <span>{SKYLINE_LOCATION}</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-[var(--text-secondary)]">
                    <GmailBrandIcon size="sm" />
                    <a
                      href={`mailto:${SKYLINE_EMAIL}`}
                      className="hover:text-[var(--text-primary)] underline underline-offset-4 font-mono-tech"
                    >
                      {SKYLINE_EMAIL}
                    </a>
                  </div>
                  <div className="flex items-center gap-2.5 text-[var(--text-secondary)]">
                    <Phone className="w-4 h-4 text-[var(--text-primary)] shrink-0" />
                    <span className="font-mono-tech">+91 81096 97311</span>
                  </div>
                </div>

                {/* Official 5-App Social Bar */}
                <div className="pt-2 border-t border-[var(--border-hairline)] flex items-center justify-between gap-2">
                  <span className="font-mono-tech text-[10px] uppercase tracking-widest text-[var(--text-muted)]">
                    OFFICIAL CHANNELS
                  </span>
                  <SocialIconBar size="sm" />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                  <a
                    href={whatsappDirectUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl btn-whatsapp-official text-xs font-semibold"
                  >
                    <WhatsAppBrandBadge size="sm" className="border border-white/30" />
                    <span>WhatsApp Chat</span>
                  </a>
                  <button
                    onClick={() => handleNavClick('contact')}
                    className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl btn-platinum-primary text-xs font-semibold cursor-pointer"
                  >
                    <span>Book Free Call</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Referral Highlight Box */}
              <div className="surface-elevated rounded-2xl p-5 flex items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="inline-flex items-center gap-1.5 text-[var(--text-primary)] font-mono-tech text-[10px] uppercase tracking-widest font-semibold">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>PARTNER COMMISSION</span>
                  </div>
                  <p className="text-xs sm:text-sm font-semibold">
                    Refer a client & earn a direct 15% cash payout
                  </p>
                </div>
                <button
                  onClick={() => handleNavClick('referral')}
                  className="px-3.5 py-2 rounded-xl btn-platinum-primary text-xs font-semibold shrink-0 cursor-pointer"
                >
                  Calculate
                </button>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="max-w-7xl w-full mx-auto pt-4 border-t border-[var(--border-hairline)] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[var(--text-muted)] font-mono-tech">
            <span>SKYLINE DIGITAL • FULL-STACK, AI & GROWTH</span>
            <span>MADHYA PRADESH, INDIA • SERVING CLIENTS GLOBALLY</span>
          </div>
        </div>
      )}

      {/* Floating Direct WhatsApp Action Pill (Compact bottom-left so it never overlaps Hero CTA buttons) */}
      <div className="fixed bottom-5 left-5 z-30 hidden sm:flex items-center">
        <a
          href={whatsappDirectUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat on WhatsApp with SkyLine Digital"
          className="group surface-glass pl-2 pr-3.5 py-1.5 rounded-full shadow-lg flex items-center gap-2 hover:border-[#25D366] transition-all"
        >
          <WhatsAppBrandBadge size="sm" />
          <div className="flex flex-col leading-tight">
            <span className="font-mono-tech text-[8px] uppercase tracking-widest text-[var(--text-muted)]">
              24/7 OFFICIAL DESK
            </span>
            <span className="text-[11px] font-semibold text-[var(--text-primary)]">
              Chat with Lead Architect
            </span>
          </div>
        </a>
      </div>
    </>
  );
};

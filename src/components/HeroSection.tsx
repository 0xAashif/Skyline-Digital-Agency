import React, { useEffect, useState } from 'react';
import {
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Cloud,
  Code2,
  Database,
  Layers,
  MapPin,
  Moon,
  ShoppingBag,
  Sparkles,
  Sun,
  X,
} from 'lucide-react';
import {
  BENTO_SOLUTIONS,
  HERO_PITCH_SLIDES,
  HERO_SERVICE_ORBS,
  HeroOrbItem,
  SHOWCASE_PROJECTS,
  SemanticAccentColor,
  ShowcaseProject,
} from '../data/agencyData';
import {
  SKYLINE_EMAIL,
  SKYLINE_INSTAGRAM_URL,
  SKYLINE_WHATSAPP_NUMBER,
} from '../utils/architectEngine';
import { ThemeMode } from '../App';
import { InstagramLogoIcon, SkyLineLogo, WhatsAppLogoIcon } from './BrandIcons';

interface HeroSectionProps {
  theme?: ThemeMode;
  onToggleTheme?: () => void;
  onOpenMenu?: () => void;
  onSelectCapability?: (capabilityId: string) => void;
  activeModalProject?: ShowcaseProject | null;
  onOpenProjectModal?: (project: ShowcaseProject | null) => void;
}

const getAccentPillClass = (accent: SemanticAccentColor): string => {
  switch (accent) {
    case 'emerald':
      return 'accent-pill-emerald';
    case 'indigo':
      return 'accent-pill-indigo';
    case 'violet':
      return 'accent-pill-violet';
    case 'amber':
      return 'accent-pill-amber';
    case 'cyan':
      return 'accent-pill-cyan';
    case 'rose':
      return 'accent-pill-rose';
  }
};

const getOrbRingStyle = (accent: SemanticAccentColor, isActive: boolean): string => {
  if (!isActive) {
    return 'border-[var(--bg-canvas)]';
  }
  switch (accent) {
    case 'emerald':
      return 'border-[#10B981] ring-2 ring-[#10B981]/40';
    case 'indigo':
      return 'border-[#6366F1] ring-2 ring-[#6366F1]/40';
    case 'violet':
      return 'border-[#8B5CF6] ring-2 ring-[#8B5CF6]/40';
    case 'amber':
      return 'border-[#F59E0B] ring-2 ring-[#F59E0B]/40';
    case 'cyan':
      return 'border-[#06B6D4] ring-2 ring-[#06B6D4]/40';
    case 'rose':
      return 'border-[#F43F5E] ring-2 ring-[#F43F5E]/40';
  }
};

const getOrbDotColor = (accent: SemanticAccentColor): string => {
  switch (accent) {
    case 'emerald':
      return 'bg-[#10B981]';
    case 'indigo':
      return 'bg-[#6366F1]';
    case 'violet':
      return 'bg-[#8B5CF6]';
    case 'amber':
      return 'bg-[#F59E0B]';
    case 'cyan':
      return 'bg-[#06B6D4]';
    case 'rose':
      return 'bg-[#F43F5E]';
  }
};

export const HeroSection: React.FC<HeroSectionProps> = ({
  theme = 'light',
  onToggleTheme,
  onOpenMenu,
  onSelectCapability,
  activeModalProject,
  onOpenProjectModal,
}) => {
  const [activeSlideIndex, setActiveSlideIndex] = useState<number>(0);
  const [sliderPaused, setSliderPaused] = useState<boolean>(false);
  const [hoveredOrb, setHoveredOrb] = useState<HeroOrbItem | null>(HERO_SERVICE_ORBS[0]);
  const [internalModalProject, setInternalModalProject] = useState<ShowcaseProject | null>(null);

  const modalProject =
    activeModalProject !== undefined ? activeModalProject : internalModalProject;

  const setModalProject = (project: ShowcaseProject | null) => {
    setInternalModalProject(project);
    onOpenProjectModal?.(project);
  };

  // Auto-advance 6-Slide Visual Pitch Deck Carousel every 3.5 seconds
  useEffect(() => {
    if (sliderPaused) return;
    const timer = window.setInterval(() => {
      setActiveSlideIndex((prev) => (prev + 1) % HERO_PITCH_SLIDES.length);
    }, 3500);
    return () => window.clearInterval(timer);
  }, [sliderPaused]);

  // Close Case-Study Modal on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && modalProject) {
        setModalProject(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  });

  const activeSlide = HERO_PITCH_SLIDES[activeSlideIndex] || HERO_PITCH_SLIDES[0];

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleCapabilityJump = (capabilityId: string) => {
    onSelectCapability?.(capabilityId);
    scrollToSection('capabilities');
  };

  const handleOrbInteract = (orb: HeroOrbItem, shouldScroll: boolean) => {
    setHoveredOrb(orb);
    setActiveSlideIndex(orb.targetSlideIndex);
    setSliderPaused(true);
    if (shouldScroll) {
      handleCapabilityJump(orb.targetCapabilityId);
    }
  };

  const handlePrevSlide = () => {
    setActiveSlideIndex((prev) => (prev === 0 ? HERO_PITCH_SLIDES.length - 1 : prev - 1));
  };

  const handleNextSlide = () => {
    setActiveSlideIndex((prev) => (prev + 1) % HERO_PITCH_SLIDES.length);
  };

  const renderBentoIcon = (id: string) => {
    switch (id) {
      case 'bento-web':
        return <Code2 className="w-4 h-4" aria-hidden="true" />;
      case 'bento-crm':
        return <Database className="w-4 h-4" aria-hidden="true" />;
      case 'bento-local':
        return <MapPin className="w-4 h-4" aria-hidden="true" />;
      case 'bento-ads':
        return <Sparkles className="w-4 h-4" aria-hidden="true" />;
      case 'bento-ecom':
        return <ShoppingBag className="w-4 h-4" aria-hidden="true" />;
      default:
        return <Cloud className="w-4 h-4" aria-hidden="true" />;
    }
  };

  const handleImgFallback = (
    e: React.SyntheticEvent<HTMLImageElement, Event>,
    fallbackUrl: string
  ) => {
    const target = e.currentTarget;
    if (target.src !== window.location.origin + fallbackUrl) {
      target.src = fallbackUrl;
    }
  };

  return (
    <>
      {/* SECTION 1: DARK PLATINUM & BRUSHED SILVER HERO WITH 6-SLIDE INDIAN CONTEXT PITCH-DECK CAROUSEL */}
      <section
        id="top"
        className="relative hero-architectural-bg pt-5 sm:pt-7 pb-10 sm:pb-14 px-4 sm:px-6 lg:px-10 border-b border-[var(--border-metallic)] overflow-hidden"
      >
        <div className="max-w-[1360px] mx-auto flex flex-col justify-between min-h-[82vh] relative z-10">
          {/* Top Hero Bar: Code-Prism < S / > Logo on Left | Icon-Only Instagram + Theme Toggle + get in touch. + menu. on Right */}
          <div className="flex items-center justify-between gap-4 pb-6 sm:pb-10 border-b border-[var(--border-metallic)]">
            <a
              href="#top"
              className="inline-flex items-center group"
              aria-label="SkyLine Technologies Home"
            >
              <SkyLineLogo iconClassName="w-10 h-10 sm:w-11 sm:h-11" showSubtitle />
            </a>

            <div className="flex items-center gap-1.5 sm:gap-2.5">
              {/* Official Icon-Only Instagram Link in Top Bar (Zero raw @handle text) */}
              <a
                href={SKYLINE_INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow SkyLine on Instagram"
                title="Follow SkyLine on Instagram"
                className="inline-flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-full platinum-card text-[var(--text-primary)] instagram-icon-btn shrink-0"
              >
                <InstagramLogoIcon className="w-4 h-4" />
              </a>

              {/* Theme Toggle Button (Light Mode by default, switches to Dark Mode) */}
              <button
                type="button"
                onClick={onToggleTheme}
                aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
                title={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
                className="w-9 h-9 sm:w-auto sm:px-3.5 sm:py-2 sm:min-h-[40px] rounded-full platinum-card text-xs font-display font-bold text-[var(--text-primary)] inline-flex items-center justify-center gap-2 hover:opacity-85 transition-opacity cursor-pointer whitespace-nowrap shrink-0"
              >
                {theme === 'light' ? (
                  <>
                    <Moon className="w-4 h-4" aria-hidden="true" />
                    <span className="hidden sm:inline">Dark Mode</span>
                  </>
                ) : (
                  <>
                    <Sun className="w-4 h-4" aria-hidden="true" />
                    <span className="hidden sm:inline">Light Mode</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={() => scrollToSection('contact')}
                className="hidden sm:inline-flex items-center justify-center px-5 py-2 min-h-[40px] rounded-full btn-platinum-primary text-xs font-display font-bold cursor-pointer whitespace-nowrap"
              >
                get in touch.
              </button>

              <button
                type="button"
                onClick={() => onOpenMenu?.()}
                aria-label="Open Navigation Menu"
                className="px-3.5 sm:px-4 py-2 min-h-[38px] sm:min-h-[40px] rounded-full platinum-card text-xs font-display font-bold text-[var(--text-primary)] inline-flex items-center gap-2 cursor-pointer whitespace-nowrap shrink-0"
              >
                <span>menu.</span>
                <span className="flex flex-col gap-1" aria-hidden="true">
                  <span className="w-3.5 h-[1.5px] bg-current block" />
                  <span className="w-2.5 h-[1.5px] bg-current block" />
                </span>
              </button>
            </div>
          </div>

          {/* Center Hero Split: Concise Editorial Typography & Animated Orbs on Left | 6-Slide Visual Pitch Deck Carousel on Right */}
          <div className="my-auto py-8 sm:py-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
            {/* Left 6 Columns: Ultra-Concise Typography + Preserved AI, ADS, SAAS, WEB, SEO, CRM, LOCAL Orbs */}
            <div className="lg:col-span-6 space-y-6">
              {/* Unnumbered Sleek Kicker with Electric Indigo < / > Code Badge */}
              <div className="inline-flex flex-wrap items-center gap-2 px-3 py-1.5 rounded-full platinum-card text-[11px] font-mono font-semibold tracking-wider uppercase">
                <span className="px-2 py-0.5 rounded-full accent-pill-indigo font-mono font-bold text-[10px]">
                  &lt; / &gt;
                </span>
                <span className="text-[var(--text-primary)]">
                  WEB SYSTEMS · AI CRM · LOCAL &amp; GLOBAL GROWTH
                </span>
              </div>

              <h1
                className="font-display font-extrabold text-[2.4rem] sm:text-5xl md:text-6xl xl:text-[4rem] leading-[1.05] tracking-tight text-[var(--text-primary)]"
                style={{ textWrap: 'balance' }}
              >
                Engineer the System.{' '}
                <span className="text-[var(--text-secondary)]">Scale the Attention.</span>
              </h1>

              {/* Concise 2-Line Subheadline */}
              <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed max-w-xl">
                Sub-100ms Next.js platforms, 6-second +91 WhatsApp AI CRM, Google Map Pack #1 local
                engines, and high-ROAS Meta &amp; Google funnels.
              </p>

              {/* Preserved Overlapping Circular Orbs Animation (AI, ADS, SAAS, WEB, SEO, CRM, LOCAL) + Interactive Preview Tooltip */}
              <div className="pt-1 space-y-3">
                <div className="flex flex-wrap items-center gap-4">
                  <div className="flex items-center -space-x-2">
                    {HERO_SERVICE_ORBS.map((orb, idx) => {
                      const isPrimary = idx % 2 === 0;
                      const isHovered = hoveredOrb?.id === orb.id;
                      return (
                        <button
                          key={orb.id}
                          type="button"
                          onMouseEnter={() => handleOrbInteract(orb, false)}
                          onFocus={() => handleOrbInteract(orb, false)}
                          onClick={() => handleOrbInteract(orb, true)}
                          aria-label={`${orb.label} — ${orb.liveMetricBadge}`}
                          title={`${orb.label} (${orb.liveMetricBadge})`}
                          style={{ animationDelay: `${idx * 160}ms` }}
                          className={`relative animate-orb-float w-11 h-11 sm:w-12 sm:h-12 rounded-full border-2 flex items-center justify-center font-mono font-bold text-[10px] tracking-tight shadow-md hover:-translate-y-1.5 transition-all cursor-pointer ${getOrbRingStyle(
                            orb.accentColor,
                            isHovered
                          )} ${
                            isPrimary
                              ? 'bg-[#18181B] text-[#FAFAFA]'
                              : 'bg-[#E4E4E7] text-[#09090B]'
                          }`}
                        >
                          <span>{orb.shortCode}</span>
                          <span
                            aria-hidden="true"
                            className={`absolute bottom-0.5 right-0.5 w-2 h-2 rounded-full ${getOrbDotColor(
                              orb.accentColor
                            )}`}
                          />
                        </button>
                      );
                    })}
                  </div>

                  {/* FR-ENH-006 (#3): Live Floating Orb Preview Tooltip */}
                  {hoveredOrb && (
                    <div
                      aria-live="polite"
                      className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full platinum-card text-xs font-mono"
                    >
                      <span
                        className={`px-2 py-0.5 rounded-full font-bold text-[10px] ${getAccentPillClass(
                          hoveredOrb.accentColor
                        )}`}
                      >
                        {hoveredOrb.shortCode}
                      </span>
                      <span className="font-semibold text-[var(--text-primary)]">
                        {hoveredOrb.label}
                      </span>
                      <span className="text-[var(--text-muted)]">·</span>
                      <span className="text-[var(--text-secondary)] font-bold">
                        {hoveredOrb.liveMetricBadge}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Primary CTA Row */}
              <div className="pt-1 flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={() => scrollToSection('system-simulator')}
                  className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 min-h-[48px] rounded-full btn-platinum-primary font-display font-bold text-xs sm:text-sm whitespace-nowrap shrink-0 cursor-pointer shadow-md"
                >
                  <span>Launch 60s System Audit</span>
                  <ArrowRight className="w-4 h-4 shrink-0" aria-hidden="true" />
                </button>

                <button
                  type="button"
                  onClick={() => scrollToSection('projects')}
                  className="inline-flex items-center justify-center gap-2 px-5 py-3.5 min-h-[48px] rounded-full platinum-card text-[var(--text-primary)] font-display font-bold text-xs sm:text-sm whitespace-nowrap shrink-0 cursor-pointer hover:opacity-85 transition-opacity"
                >
                  <span>Explore Live Work</span>
                </button>
              </div>
            </div>

            {/* Right 6 Columns: Auto-Playing 6-Slide Indian Context Visual Pitch Deck Carousel */}
            <div
              className="lg:col-span-6"
              onMouseEnter={() => setSliderPaused(true)}
              onMouseLeave={() => setSliderPaused(false)}
            >
              <div className="rounded-3xl platinum-card p-3 sm:p-4 space-y-3.5">
                {/* Top Slide Progress Bars + Slide Category Header */}
                <div className="px-1 pt-1 space-y-2.5">
                  <div
                    className="grid grid-cols-6 gap-1.5"
                    role="tablist"
                    aria-label="Hero Pitch Deck Slides"
                  >
                    {HERO_PITCH_SLIDES.map((slide, sIdx) => {
                      const isCurrent = sIdx === activeSlideIndex;
                      return (
                        <button
                          key={slide.id}
                          type="button"
                          role="tab"
                          aria-selected={isCurrent}
                          aria-label={`View slide: ${slide.title}`}
                          onClick={() => setActiveSlideIndex(sIdx)}
                          className="h-1.5 rounded-full overflow-hidden bg-[var(--bg-subdued)] cursor-pointer transition-all"
                        >
                          <span
                            className={`block h-full rounded-full transition-all duration-300 ${
                              isCurrent ? 'w-full bg-[var(--text-primary)]' : 'w-0 bg-transparent'
                            }`}
                          />
                        </button>
                      );
                    })}
                  </div>

                  <div className="flex items-center justify-between gap-2">
                    <span className="font-mono text-[10px] font-bold tracking-widest uppercase text-[var(--text-muted)]">
                      {activeSlide.categoryTag}
                    </span>
                    <span
                      className={`px-2.5 py-0.5 rounded-full font-mono text-[10px] font-bold ${getAccentPillClass(
                        activeSlide.accentColor
                      )}`}
                    >
                      {activeSlide.liveStatusLabel}
                    </span>
                  </div>
                </div>

                {/* Main Visual Viewport with Indian Context Photography + Glassmorphic Telemetry Overlay */}
                <div className="relative rounded-2xl overflow-hidden border border-[var(--border-metallic)] bg-[#09090B] aspect-[16/10]">
                  <img
                    key={activeSlide.id}
                    src={activeSlide.imageUrl}
                    alt={activeSlide.title}
                    referrerPolicy="no-referrer"
                    onError={(e) => handleImgFallback(e, activeSlide.fallbackSvgUrl)}
                    className="w-full h-full object-cover block transition-transform duration-500"
                  />

                  {/* Measured Dark Gradient Scrim for Guaranteed WCAG Contrast */}
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-t from-[#09090B]/95 via-[#09090B]/40 to-transparent"
                  />

                  {/* Top-Left Indian Context Telemetry Chip Inside Slide */}
                  <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-[#09090B]/85 backdrop-blur-md border border-[#27272A] font-sans text-[11px] font-semibold text-[#FAFAFA] flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
                    <span>{activeSlide.indianContextChip}</span>
                  </div>

                  {/* Bottom Glassmorphic Live UI Overlay Inside Slide */}
                  <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 p-4 rounded-2xl bg-[#09090B]/85 backdrop-blur-md border border-[#27272A] text-[#FAFAFA] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="space-y-1 min-w-0">
                      <h2 className="font-display font-bold text-base sm:text-lg text-[#FAFAFA] truncate">
                        {activeSlide.title}
                      </h2>
                      <p className="text-xs text-[#D4D4D8] line-clamp-1">{activeSlide.subtitle}</p>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <div className="px-3 py-1.5 rounded-xl bg-[#18181B] border border-[#3F3F46] text-right">
                        <div className="font-display text-xs font-bold text-[#FAFAFA] tabular-nums">
                          {activeSlide.primaryMetric}
                        </div>
                        <div className="font-sans text-[10px] font-medium text-[#A1A1AA]">
                          {activeSlide.secondaryMetric}
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleCapabilityJump(activeSlide.targetCapabilityId)}
                        aria-label={`Inspect ${activeSlide.title}`}
                        className="w-9 h-9 rounded-xl bg-[#FAFAFA] text-[#09090B] flex items-center justify-center hover:scale-105 transition-transform cursor-pointer shrink-0"
                      >
                        <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Slide Controls Footer */}
                <div className="px-1 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5 overflow-x-auto py-0.5">
                    {HERO_PITCH_SLIDES.map((s, idx) => (
                      <button
                        key={s.id}
                        type="button"
                        onClick={() => setActiveSlideIndex(idx)}
                        className={`px-2.5 py-1 rounded-lg font-mono text-[10px] transition-colors cursor-pointer whitespace-nowrap ${
                          idx === activeSlideIndex
                            ? 'btn-platinum-primary font-bold'
                            : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
                        }`}
                      >
                        {s.title.split(' ')[0]}
                      </button>
                    ))}
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0">
                    <button
                      type="button"
                      onClick={handlePrevSlide}
                      aria-label="Previous pitch deck slide"
                      className="w-8 h-8 rounded-full platinum-subdued flex items-center justify-center text-[var(--text-primary)] hover:opacity-80 cursor-pointer"
                    >
                      <ChevronLeft className="w-4 h-4" aria-hidden="true" />
                    </button>
                    <button
                      type="button"
                      onClick={handleNextSlide}
                      aria-label="Next pitch deck slide"
                      className="w-8 h-8 rounded-full platinum-subdued flex items-center justify-center text-[var(--text-primary)] hover:opacity-80 cursor-pointer"
                    >
                      <ChevronRight className="w-4 h-4" aria-hidden="true" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Hero Metadata Bar (Updated Location, Official Desk Email & Icon-Only Instagram Button) */}
          <div className="pt-4 mt-4 border-t border-[var(--border-metallic)] flex flex-col md:flex-row items-start md:items-center justify-between gap-2 text-xs font-mono">
            <div>
              <span className="text-[var(--text-muted)]">BASED IN: </span>
              <span className="text-[var(--text-primary)] font-semibold">
                Madhya Pradesh, India (Serving Startups &amp; Businesses Globally)
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <div>
                <span className="text-[var(--text-muted)]">OFFICIAL DESK: </span>
                <a
                  href={`mailto:${SKYLINE_EMAIL}`}
                  className="text-[var(--text-primary)] font-semibold hover:underline"
                >
                  {SKYLINE_EMAIL}
                </a>
              </div>

              <a
                href={SKYLINE_INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow SkyLine on Instagram"
                title="Follow SkyLine on Instagram"
                className="inline-flex items-center justify-center w-8 h-8 rounded-full platinum-card text-[var(--text-primary)] instagram-icon-btn"
              >
                <InstagramLogoIcon className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: COMPLETE DIGITAL SOLUTIONS UNDER ONE ROOF (6 VISUAL BENTO CARDS WITH INDIAN BUSINESS OVERLAYS & SEMANTIC ACCENTS) */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-10 platinum-canvas border-t border-[var(--border-metallic)]">
        <div className="max-w-[1320px] mx-auto space-y-10">
          {/* Top Header Row */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
            <div className="space-y-2">
              <div className="font-mono text-xs tracking-widest uppercase text-[var(--text-muted)]">
                FULL-STACK &amp; LOCAL DIGITIZATION
              </div>
              <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-[var(--text-primary)] leading-[1.08] tracking-tight">
                Complete Digital Solutions
                <br />
                <span className="text-[var(--text-secondary)]">Under One Roof.</span>
              </h2>
            </div>

            <button
              type="button"
              onClick={() => scrollToSection('capabilities')}
              className="inline-flex items-center gap-2.5 px-6 py-3.5 min-h-[46px] rounded-full btn-platinum-primary font-display font-bold text-xs sm:text-sm cursor-pointer self-start sm:self-auto whitespace-nowrap"
            >
              <span>Inspect All Capabilities</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </button>
          </div>

          {/* 6-Card Visual Bento Grid (Zero Numbering, Authentic Indian Imagery + Semantic Accents) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {BENTO_SOLUTIONS.map((card) => (
              <button
                key={card.id}
                type="button"
                onClick={() => handleCapabilityJump(card.targetCapabilityId)}
                className="text-left rounded-3xl p-5 platinum-card hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between cursor-pointer group"
              >
                <div className="space-y-4">
                  {/* Top Icon + Semantic Category Pill (No Numbers) */}
                  <div className="flex items-center justify-between gap-2">
                    <div className="w-10 h-10 rounded-2xl btn-platinum-primary flex items-center justify-center">
                      {renderBentoIcon(card.id)}
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full font-mono text-[10px] font-bold tracking-wider uppercase ${getAccentPillClass(
                        card.accentColor
                      )}`}
                    >
                      {card.categoryBadge}
                    </span>
                  </div>

                  {/* High-Res Indian Context Visual Frame with Glass Metric & Indian Overlay */}
                  <div className="relative rounded-2xl overflow-hidden border border-[var(--border-metallic)] bg-[#09090B] h-40">
                    <img
                      src={card.imageUrl}
                      alt={card.title}
                      referrerPolicy="no-referrer"
                      onError={(e) => handleImgFallback(e, card.fallbackSvgUrl)}
                      className="w-full h-full object-cover block group-hover:scale-105 transition-transform duration-300"
                    />
                    <div
                      aria-hidden="true"
                      className="absolute inset-0 bg-gradient-to-t from-[#09090B]/90 via-transparent to-transparent"
                    />
                    <span className="absolute top-2.5 right-2.5 px-2.5 py-0.5 rounded-full bg-[#09090B]/85 backdrop-blur-md border border-[#27272A] font-mono text-[10px] font-medium text-[#D4D4D8]">
                      {card.indianContextOverlay}
                    </span>
                    <span className="absolute bottom-2.5 left-2.5 px-2.5 py-1 rounded-lg bg-[#09090B]/85 backdrop-blur-md border border-[#27272A] font-mono text-[11px] font-bold text-[#FAFAFA]">
                      {card.metricCallout}
                    </span>
                  </div>

                  {/* Concise Title + 1-Line Punchy Description */}
                  <div>
                    <h3 className="font-display font-bold text-lg text-[var(--text-primary)]">
                      {card.title}
                    </h3>
                    <p className="text-xs text-[var(--text-secondary)] mt-1 leading-relaxed line-clamp-2">
                      {card.description}
                    </p>
                  </div>
                </div>

                <div className="pt-3.5 mt-4 border-t border-[var(--border-metallic)] flex items-center justify-between text-xs font-semibold text-[var(--text-primary)]">
                  <span>Explore Architecture</span>
                  <ArrowUpRight
                    className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    aria-hidden="true"
                  />
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 3: OUR WORK — REAL SOLUTIONS. REAL RESULTS. (4 VISUAL BROWSER MOCKUP CARDS + INTERACTIVE CASE-STUDY MODAL) */}
      <section
        id="projects"
        className="py-16 sm:py-20 px-4 sm:px-6 lg:px-10 platinum-canvas border-t border-[var(--border-metallic)]"
      >
        <div className="max-w-[1320px] mx-auto space-y-10">
          {/* Header Row */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pb-6 border-b border-[var(--border-metallic)]">
            <div className="space-y-2">
              <div className="font-mono text-xs tracking-widest uppercase text-[var(--text-muted)]">
                VERIFIED PRODUCTION DEPLOYMENTS
              </div>
              <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-[var(--text-primary)] leading-[1.08] tracking-tight">
                Real Solutions.{' '}
                <span className="text-[var(--text-secondary)]">Real Results.</span>
              </h2>
            </div>

            <button
              type="button"
              onClick={() => scrollToSection('system-simulator')}
              className="inline-flex items-center gap-2.5 px-6 py-3.5 min-h-[46px] rounded-full platinum-card text-[var(--text-primary)] font-display font-bold text-xs sm:text-sm hover:opacity-85 transition-opacity self-start sm:self-auto cursor-pointer whitespace-nowrap"
            >
              <span>Architect Your Project</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </button>
          </div>

          {/* 2x2 Grid of Hyper-Visual Browser Mockup Project Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {SHOWCASE_PROJECTS.map((proj) => (
              <article
                key={proj.id}
                onClick={() => setModalProject(proj)}
                className="rounded-3xl platinum-card p-4 sm:p-5 transition-transform hover:-translate-y-1 flex flex-col justify-between group cursor-pointer"
              >
                {/* Browser Frame Mockup */}
                <div className="rounded-2xl overflow-hidden border border-[var(--border-metallic)] bg-[var(--bg-canvas)]">
                  {/* Browser Top Chrome Bar */}
                  <div className="px-3.5 py-2.5 border-b border-[var(--border-metallic)] flex items-center justify-between gap-2 bg-[var(--bg-surface)]">
                    <div className="flex items-center gap-1.5" aria-hidden="true">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#F43F5E]/80" />
                      <span className="w-2.5 h-2.5 rounded-full bg-[#F59E0B]/80" />
                      <span className="w-2.5 h-2.5 rounded-full bg-[#10B981]/80" />
                    </div>
                    <span
                      className={`px-2.5 py-0.5 rounded-full font-mono text-[10px] font-bold ${getAccentPillClass(
                        proj.accentColor
                      )}`}
                    >
                      {proj.statusBadge}
                    </span>
                  </div>

                  {/* High-Res Visual Image with Glass Metric Callout */}
                  <div className="relative h-52 bg-[#09090B] overflow-hidden border-b border-[var(--border-metallic)]">
                    <img
                      src={proj.imageUrl}
                      alt={`${proj.title} live showcase`}
                      referrerPolicy="no-referrer"
                      onError={(e) => handleImgFallback(e, proj.fallbackSvgUrl)}
                      className="w-full h-full object-cover block group-hover:scale-105 transition-transform duration-300"
                    />
                    <div
                      aria-hidden="true"
                      className="absolute inset-0 bg-gradient-to-t from-[#09090B]/90 via-[#09090B]/30 to-transparent"
                    />
                    <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-[#09090B]/85 backdrop-blur-md border border-[#27272A] font-mono text-[10px] text-[#E4E4E7]">
                      {proj.locationTag}
                    </span>
                    <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between gap-2">
                      <div>
                        <span className="font-mono text-[10px] text-[#D4D4D8] uppercase">
                          {proj.accentMetric}
                        </span>
                        <div className="font-display font-extrabold text-lg text-[#FAFAFA]">
                          {proj.metricsHeadline}
                        </div>
                      </div>
                      <span className="px-2.5 py-1 rounded-lg accent-pill-emerald font-mono text-[10px] font-bold">
                        ✓ VERIFIED
                      </span>
                    </div>
                  </div>

                  {/* Concise 1-Line Sub + 3 Architecture Nodes */}
                  <div className="p-4 space-y-3">
                    <p className="text-xs text-[var(--text-secondary)] line-clamp-1">
                      {proj.metricsSub}
                    </p>
                    <div className="grid grid-cols-3 gap-1.5">
                      {proj.architectureNodes.map((node) => (
                        <div
                          key={node}
                          className="p-1.5 rounded-lg platinum-card font-mono text-[10px] text-[var(--text-primary)] truncate text-center font-medium"
                        >
                          {node}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Card Bottom Metadata */}
                <div className="pt-4 px-1 flex items-end justify-between gap-3">
                  <div>
                    <div className="font-mono text-[10px] font-bold tracking-wider text-[var(--text-muted)]">
                      {proj.category}
                    </div>
                    <h3 className="font-display font-bold text-lg sm:text-xl text-[var(--text-primary)] mt-0.5">
                      {proj.title}
                    </h3>
                    <div className="text-xs text-[var(--text-secondary)] mt-0.5">{proj.tags}</div>
                  </div>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setModalProject(proj);
                    }}
                    aria-label={`Open architecture case study for ${proj.title}`}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full btn-platinum-primary font-mono text-[11px] font-bold shrink-0 cursor-pointer"
                  >
                    <span>Case Study</span>
                    <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* FR-ENH-006 (#2): Interactive Project Case-Study Quick-View Modal */}
      {modalProject && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="case-study-modal-title"
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
          onClick={() => setModalProject(null)}
        >
          <div
            className="w-full max-w-2xl rounded-3xl platinum-card p-6 sm:p-8 space-y-6 my-auto shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Top Header */}
            <div className="flex items-start justify-between gap-4 pb-4 border-b border-[var(--border-metallic)]">
              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span
                    className={`px-2.5 py-0.5 rounded-full font-mono text-[10px] font-bold ${getAccentPillClass(
                      modalProject.accentColor
                    )}`}
                  >
                    {modalProject.statusBadge}
                  </span>
                  <span className="font-mono text-[11px] text-[var(--text-muted)]">
                    {modalProject.locationTag}
                  </span>
                </div>
                <h3
                  id="case-study-modal-title"
                  className="font-display font-extrabold text-2xl sm:text-3xl text-[var(--text-primary)]"
                >
                  {modalProject.title}
                </h3>
              </div>

              <button
                type="button"
                onClick={() => setModalProject(null)}
                aria-label="Close Case Study Modal"
                className="w-10 h-10 rounded-full platinum-subdued flex items-center justify-center text-[var(--text-primary)] hover:opacity-80 cursor-pointer shrink-0"
              >
                <X className="w-5 h-5" aria-hidden="true" />
              </button>
            </div>

            {/* Problem vs Architecture Breakdown */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl platinum-subdued space-y-1.5">
                <div className="font-mono text-[10px] font-bold uppercase text-[#F43F5E]">
                  BOTTLENECK &amp; PROBLEM
                </div>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                  {modalProject.problemStatement}
                </p>
              </div>
              <div className="p-4 rounded-2xl platinum-subdued space-y-1.5">
                <div className="font-mono text-[10px] font-bold uppercase text-[#10B981]">
                  DEPLOYED SYSTEM ARCHITECTURE
                </div>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                  {modalProject.architectureSummary}
                </p>
              </div>
            </div>

            {/* 3-Layer Architecture Flow Diagram */}
            <div className="space-y-2">
              <div className="font-mono text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)]">
                END-TO-END NODE PIPELINE
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {modalProject.architectureNodes.map((node, nIdx) => (
                  <div
                    key={node}
                    className="p-3 rounded-xl platinum-card flex items-center gap-2 font-mono text-xs font-semibold text-[var(--text-primary)]"
                  >
                    <Layers className="w-4 h-4 text-[#6366F1] shrink-0" aria-hidden="true" />
                    <span className="truncate">{node}</span>
                    {nIdx < 2 && (
                      <ArrowRight
                        className="w-3.5 h-3.5 ml-auto text-[var(--text-muted)] hidden sm:block"
                        aria-hidden="true"
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Verified Before / After Impact Table */}
            <div className="space-y-2">
              <div className="font-mono text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)]">
                VERIFIED BEFORE / AFTER PRODUCTION METRICS
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {modalProject.impactMetrics.map((m) => (
                  <div key={m.label} className="p-3.5 rounded-2xl platinum-subdued space-y-1">
                    <div className="font-mono text-[10px] text-[var(--text-muted)]">{m.label}</div>
                    <div className="flex items-baseline justify-between gap-2 pt-1">
                      <span className="font-sans text-xs line-through text-[var(--text-muted)]">
                        {m.before}
                      </span>
                      <span className="font-display font-extrabold text-sm text-[var(--text-primary)]">
                        {m.after}
                      </span>
                    </div>
                    <div className="inline-block px-2 py-0.5 rounded-md accent-pill-emerald font-mono text-[10px] font-bold">
                      {m.delta}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Tech Stack Pills */}
            <div className="flex flex-wrap items-center gap-2">
              {modalProject.stackPills.map((pill) => (
                <span
                  key={pill}
                  className="px-3 py-1 rounded-full accent-pill-indigo font-mono text-[11px] font-semibold inline-flex items-center gap-1.5"
                >
                  <CheckCircle2 className="w-3 h-3" aria-hidden="true" />
                  <span>{pill}</span>
                </span>
              ))}
            </div>

            {/* Modal Footer CTA */}
            <div className="pt-4 border-t border-[var(--border-metallic)] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
              <a
                href={`https://wa.me/${SKYLINE_WHATSAPP_NUMBER}?text=${encodeURIComponent(
                  `Hi SkyLine Technologies! I inspected the "${modalProject.title}" case study and want a similar architecture for our business.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 min-h-[46px] rounded-2xl bg-[#25D366] text-white font-display font-bold text-xs sm:text-sm hover:opacity-95 transition-opacity"
              >
                <WhatsAppLogoIcon className="w-4 h-4" />
                <span>Deploy Similar System via WhatsApp</span>
              </a>

              <button
                type="button"
                onClick={() => {
                  setModalProject(null);
                  scrollToSection('contact');
                }}
                className="inline-flex items-center justify-center gap-2 px-5 py-3 min-h-[46px] rounded-2xl btn-platinum-primary font-display font-bold text-xs sm:text-sm cursor-pointer"
              >
                <span>Request Custom Proposal</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

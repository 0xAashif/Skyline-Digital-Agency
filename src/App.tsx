import React, { useCallback, useEffect, useState } from 'react';
import { AdminDashboard } from './admin/AdminDashboard';
import {
  fetchPublicCms,
  createLeadInquiry,
  createPartnerReferral,
} from './api/client';
import { Navbar, PageId } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { CapabilitiesMatrix } from './components/CapabilitiesMatrix';
import { SystemArchitectSimulator } from './components/SystemArchitectSimulator';
import { ExecutionRoadmap } from './components/ExecutionRoadmap';
import { ClientProofAndReferral } from './components/ClientProofAndReferral';
import { FaqSection } from './components/FaqSection';
import { ContactDispatchFooter } from './components/ContactDispatchFooter';
import {
  CAPABILITY_PILLARS,
  CapabilityPillar,
  ClientReview,
  FAQ_ITEMS,
  FaqItem,
  SHOWCASE_PROJECTS,
  ShowcaseProject,
  VERIFIED_REVIEWS,
} from './data/agencyData';

export type ThemeMode = 'light' | 'dark';

function resolvePageFromHash(hash: string): PageId {
  const clean = hash.replace(/^#/, '').trim().toLowerCase();
  if (
    clean === 'services' ||
    clean === 'solutions' ||
    clean === 'expertise' ||
    clean === 'simulator' ||
    clean === 'local-business'
  ) {
    return 'services';
  }
  if (clean === 'work' || clean === 'proof') {
    return 'work';
  }
  if (clean === 'who-we-are' || clean === 'process') {
    return 'who-we-are';
  }
  if (clean === 'referral' || clean === 'faq') {
    return 'referral';
  }
  if (clean === 'contact') {
    return 'contact';
  }
  return 'home';
}

export function App() {
  // Light mode ("Minimalist Warm Alabaster #F4F3EF") by default
  const [theme, setTheme] = useState<ThemeMode>(() => {
    try {
      const saved = window.localStorage.getItem('skyline-theme');
      if (saved === 'dark' || saved === 'light') {
        return saved;
      }
    } catch {
      // ignore storage errors
    }
    return 'light';
  });

  const [viewMode, setViewMode] = useState<'website' | 'admin'>(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      if (params.get('admin') === '1' || window.location.hash === '#admin') {
        return 'admin';
      }
    } catch {
      // ignore
    }
    return 'website';
  });

  const [activePage, setActivePage] = useState<PageId>(() => {
    try {
      return resolvePageFromHash(window.location.hash);
    } catch {
      return 'home';
    }
  });

  // Live CMS state backed by Full-Stack API (/api/cms)
  const [projects, setProjects] = useState<ShowcaseProject[]>(SHOWCASE_PROJECTS);
  const [services, setServices] = useState<CapabilityPillar[]>(CAPABILITY_PILLARS);
  const [testimonials, setTestimonials] = useState<ClientReview[]>(VERIFIED_REVIEWS);
  const [faqs, setFaqs] = useState<FaqItem[]>(FAQ_ITEMS);

  const [prefilledScope, setPrefilledScope] = useState<string>('');
  const [prefilledPillars, setPrefilledPillars] = useState<string[]>([]);

  const syncLiveCms = useCallback(async () => {
    try {
      const cms = await fetchPublicCms();
      if (cms.projects && cms.projects.length > 0) setProjects(cms.projects);
      if (cms.services && cms.services.length > 0) setServices(cms.services);
      if (cms.testimonials && cms.testimonials.length > 0) setTestimonials(cms.testimonials);
      if (cms.faqs && cms.faqs.length > 0) setFaqs(cms.faqs);
    } catch {
      // Keep default seed if offline
    }
  }, []);

  useEffect(() => {
    void syncLiveCms();
  }, [syncLiveCms]);

  // Internal founder access via #admin hash or Ctrl+Shift+A keyboard shortcut + SPA hash sync
  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === '#admin') {
        setViewMode('admin');
        return;
      }
      setViewMode('website');
      const nextPage = resolvePageFromHash(window.location.hash);
      setActivePage(nextPage);
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && (e.key === 'A' || e.key === 'a')) {
        e.preventDefault();
        setViewMode((prev) => (prev === 'admin' ? 'website' : 'admin'));
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    try {
      window.localStorage.setItem('skyline-theme', theme);
    } catch {
      // ignore storage errors
    }
  }, [theme]);

  const handleToggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const handleNavigate = useCallback((target: string) => {
    const resolvedPage = resolvePageFromHash(target);
    setActivePage(resolvedPage);
    try {
      const targetHash = `#${resolvedPage}`;
      if (window.location.hash !== targetHash) {
        window.history.pushState(null, '', targetHash);
      }
    } catch {
      // ignore history errors
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // If a specific sub-anchor on that page was requested (e.g., simulator), scroll to it after mount
    if (target === 'simulator') {
      setTimeout(() => {
        const el = document.getElementById('simulator');
        el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 120);
    }
  }, []);

  const handleSelectCapability = (pillarTitle: string) => {
    setPrefilledPillars([pillarTitle]);
    setPrefilledScope(`Interested in custom architecture and deployment for: ${pillarTitle}`);
    handleNavigate('contact');
  };

  const handleLockBlueprint = (summaryText: string, selectedDomains: string[]) => {
    setPrefilledScope(summaryText);
    setPrefilledPillars(selectedDomains);
    handleNavigate('contact');
  };

  const handleBackToWebsite = () => {
    if (window.location.hash === '#admin') {
      window.history.replaceState(null, '', '#home');
    }
    setViewMode('website');
    setActivePage('home');
    void syncLiveCms();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (viewMode === 'admin') {
    return (
      <AdminDashboard
        theme={theme}
        onToggleTheme={handleToggleTheme}
        onBackToWebsite={handleBackToWebsite}
        onCmsMutated={() => void syncLiveCms()}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[var(--bg-canvas)] text-[var(--text-primary)] overflow-x-hidden transition-colors duration-250 flex flex-col justify-between">
      <Navbar
        activePage={activePage}
        onNavigate={handleNavigate}
        theme={theme}
        onToggleTheme={handleToggleTheme}
      />

      <main key={activePage} className="pt-16 sm:pt-20 flex-1 animate-page-enter">
        {/* 1. HOME PAGE: Clean Hero + Tech Marquee + 6 Core Services Bento Summary + Featured Case Studies + Compact CTA */}
        {activePage === 'home' && (
          <HeroSection
            pageView="home"
            onNavigate={handleNavigate}
            projects={projects}
          />
        )}

        {/* 2. SERVICES PAGE: 7-Track Service Architecture + Local Business Package + 60s Project Estimator */}
        {activePage === 'services' && (
          <>
            <CapabilitiesMatrix
              onSelectCapability={handleSelectCapability}
              pillars={services}
            />
            <SystemArchitectSimulator onLockBlueprint={handleLockBlueprint} />
          </>
        )}

        {/* 3. OUR WORK PAGE: Full Case Studies Showcase + Proven Client Impact Metrics + Verified Client Reviews */}
        {activePage === 'work' && (
          <>
            <HeroSection
              pageView="work"
              onNavigate={handleNavigate}
              projects={projects}
            />
            <ClientProofAndReferral
              viewMode="proof-only"
              reviews={testimonials}
            />
          </>
        )}

        {/* 4. WHO WE ARE PAGE: The SkyLine Doctrine + Founding Architects Cards + 3-Phase Delivery Roadmap */}
        {activePage === 'who-we-are' && (
          <>
            <HeroSection
              pageView="who-we-are"
              onNavigate={handleNavigate}
              projects={projects}
            />
            <ExecutionRoadmap onNavigate={handleNavigate} />
          </>
        )}

        {/* 5. OFFER & REFERRAL PAGE: 15% Partner Commission Program + INR Calculator + Referral Form + Common Questions (FAQ) */}
        {activePage === 'referral' && (
          <>
            <ClientProofAndReferral
              viewMode="referral-only"
              reviews={testimonials}
              onSubmitReferral={async (payload) => {
                await createPartnerReferral(payload);
                await syncLiveCms();
              }}
            />
            <FaqSection onNavigate={handleNavigate} faqs={faqs} />
          </>
        )}
      </main>

      {/* 6. CONTACT PAGE (Full Dispatch Form + Footer) OR SHARED FOOTER ON OTHER PAGES */}
      <ContactDispatchFooter
        showContactSection={activePage === 'contact'}
        onNavigate={handleNavigate}
        prefilledScope={prefilledScope}
        prefilledPillars={prefilledPillars}
        onSubmitLead={async (payload) => {
          await createLeadInquiry(payload);
          await syncLiveCms();
        }}
      />
    </div>
  );
}

export default App;

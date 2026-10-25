import React, { useCallback, useEffect, useState } from 'react';
import { AdminDashboard } from './admin/AdminDashboard';
import {
  fetchPublicCms,
  createLeadInquiry,
  createPartnerReferral,
} from './api/client';
import { Navbar } from './components/Navbar';
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

export function App() {
  // Light mode ("Safe Milky White / Velvet Alabaster") by default
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

  // Internal founder access via #admin hash or Ctrl+Shift+A keyboard shortcut
  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === '#admin') {
        setViewMode('admin');
      }
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

  const handleNavigate = (sectionId: string) => {
    const normalizedId = sectionId === 'solutions' ? 'services' : sectionId;
    const el = document.getElementById(normalizedId) || document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

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
      window.history.replaceState(null, '', window.location.pathname + window.location.search);
    }
    setViewMode('website');
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
    <div className="min-h-screen bg-[var(--bg-canvas)] text-[var(--text-primary)] overflow-x-hidden transition-colors duration-250">
      <Navbar
        onNavigate={handleNavigate}
        theme={theme}
        onToggleTheme={handleToggleTheme}
      />

      <main>
        <HeroSection onNavigate={handleNavigate} projects={projects} />

        <CapabilitiesMatrix
          onSelectCapability={handleSelectCapability}
          pillars={services}
        />

        <SystemArchitectSimulator onLockBlueprint={handleLockBlueprint} />

        <ExecutionRoadmap onNavigate={handleNavigate} />

        <ClientProofAndReferral
          reviews={testimonials}
          onSubmitReferral={async (payload) => {
            await createPartnerReferral(payload);
            await syncLiveCms();
          }}
        />

        <FaqSection onNavigate={handleNavigate} faqs={faqs} />
      </main>

      <ContactDispatchFooter
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

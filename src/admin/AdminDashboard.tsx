import React, { useEffect, useState } from 'react';
import {
  ArrowLeft,
  Briefcase,
  Calendar,
  CheckCircle2,
  FolderKanban,
  HelpCircle,
  KeyRound,
  Layers,
  LogOut,
  Mail,
  MessageSquareQuote,
  Moon,
  Plus,
  RefreshCw,
  Search,
  ShieldCheck,
  Sun,
  Trash2,
  Users,
} from 'lucide-react';
import { ThemeMode } from '../App';
import {
  AdminOverviewPayload,
  LeadRecord,
  LeadStatus,
  ReferralStatus,
  createFaqApi,
  createProjectApi,
  createServiceApi,
  createTestimonialApi,
  deleteFaqApi,
  deleteLeadApi,
  deleteProjectApi,
  deleteServiceApi,
  deleteTestimonialApi,
  fetchAdminOverview,
  getStoredAdminToken,
  loginAdmin,
  setStoredAdminToken,
  updateLeadStatusApi,
  updateReferralStatusApi,
} from '../api/client';
import { SkyLineLogo, WhatsAppLogoIcon } from '../components/BrandIcons';
import { SemanticAccentColor } from '../data/agencyData';

interface AdminDashboardProps {
  theme: ThemeMode;
  onToggleTheme: () => void;
  onBackToWebsite: () => void;
  onCmsMutated: () => void;
}

type AdminTab =
  | 'leads'
  | 'referrals'
  | 'projects'
  | 'services'
  | 'testimonials'
  | 'faqs';

const LEAD_STATUS_OPTIONS: { value: LeadStatus; label: string; badgeClass: string }[] = [
  { value: 'new', label: 'New Inbound', badgeClass: 'accent-pill-indigo' },
  { value: 'contacted', label: 'Contacted', badgeClass: 'accent-pill-cyan' },
  { value: 'qualified', label: 'Qualified', badgeClass: 'accent-pill-violet' },
  { value: 'proposal-sent', label: 'Proposal Sent', badgeClass: 'accent-pill-amber' },
  { value: 'closed-won', label: 'Closed Won', badgeClass: 'accent-pill-emerald' },
];

const REFERRAL_STATUS_OPTIONS: { value: ReferralStatus; label: string }[] = [
  { value: 'pending', label: 'Pending Review' },
  { value: 'in-discussion', label: 'In Discussion' },
  { value: 'closed-won', label: 'Closed Won' },
  { value: 'paid', label: '15% Payout Sent' },
];

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  theme,
  onToggleTheme,
  onBackToWebsite,
  onCmsMutated,
}) => {
  const [token, setToken] = useState<string | null>(() => getStoredAdminToken());
  const [email, setEmail] = useState<string>('admin@skylinedigital.in');
  const [password, setPassword] = useState<string>('');
  const [loginError, setLoginError] = useState<string | null>(null);
  const [loggingIn, setLoggingIn] = useState<boolean>(false);

  const [activeTab, setActiveTab] = useState<AdminTab>('leads');
  const [overview, setOverview] = useState<AdminOverviewPayload | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [actionFeedback, setActionFeedback] = useState<string | null>(null);

  // Lead CRM filters
  const [leadSearch, setLeadSearch] = useState<string>('');
  const [leadStatusFilter, setLeadStatusFilter] = useState<string>('all');

  // New Case Study Project Form State
  const [projTitle, setProjTitle] = useState<string>('');
  const [projCategory, setProjCategory] = useState<string>('FINTECH & SAAS');
  const [projLocation, setProjLocation] = useState<string>('Indore • Bengaluru Edge');
  const [projMetricsHeadline, setProjMetricsHeadline] = useState<string>('+195% Qualified Pipeline');
  const [projAccentMetric, setProjAccentMetric] = useState<string>('99 CWV · <6s SLA');
  const [projTags, setProjTags] = useState<string>('Next.js 15 • WhatsApp Cloud API • PostgreSQL');
  const [projImageUrl, setProjImageUrl] = useState<string>(
    'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=900&q=80'
  );
  const [projProblem, setProjProblem] = useState<string>('');
  const [projSummary, setProjSummary] = useState<string>('');

  // New Service Pillar Form State
  const [srvShortTab, setSrvShortTab] = useState<string>('');
  const [srvCategory, setSrvCategory] = useState<string>('CUSTOM ENTERPRISE');
  const [srvTitle, setSrvTitle] = useState<string>('');
  const [srvOutcome, setSrvOutcome] = useState<string>('+160% Conversion Velocity');
  const [srvTimeline, setSrvTimeline] = useState<string>('2–3 Weeks Delivery');
  const [srvSubtitle, setSrvSubtitle] = useState<string>('');
  const [srvDeliverables, setSrvDeliverables] = useState<string>(
    'Custom Next.js Architecture, Official WhatsApp CRM Bot, Server-Side Analytics'
  );

  // New Client Testimonial Form State
  const [revAuthor, setRevAuthor] = useState<string>('');
  const [revRole, setRevRole] = useState<string>('');
  const [revScope, setRevScope] = useState<string>('WEB PLATFORM & WHATSAPP CRM');
  const [revOutcome, setRevOutcome] = useState<string>('3.1x Verified ROAS');
  const [revQuote, setRevQuote] = useState<string>('');

  // New FAQ Form State
  const [faqCategory, setFaqCategory] = useState<string>('Engineering');
  const [faqQuestion, setFaqQuestion] = useState<string>('');
  const [faqAnswer, setFaqAnswer] = useState<string>('');
  const [faqAccent, setFaqAccent] = useState<SemanticAccentColor>('indigo');

  const notify = (msg: string) => {
    setActionFeedback(msg);
    setTimeout(() => {
      setActionFeedback((prev) => (prev === msg ? null : prev));
    }, 3500);
  };

  const loadDashboardData = async () => {
    setLoading(true);
    try {
      const data = await fetchAdminOverview();
      setOverview(data);
    } catch (err) {
      if (err instanceof Error && err.message === 'UNAUTHORIZED') {
        setStoredAdminToken(null);
        setToken(null);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      void loadDashboardData();
    }
  }, [token]);

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(null);
    setLoggingIn(true);
    try {
      const result = await loginAdmin(email, password);
      setToken(result.token);
      notify(`Authenticated as ${result.user.name}`);
    } catch (err) {
      setLoginError(
        err instanceof Error ? err.message : 'Authentication failed. Check credentials.'
      );
    } finally {
      setLoggingIn(false);
    }
  };

  const handleLogout = () => {
    setStoredAdminToken(null);
    setToken(null);
    setOverview(null);
  };

  const handleLeadStatusChange = async (lead: LeadRecord, nextStatus: LeadStatus) => {
    const updated = await updateLeadStatusApi(lead.id, { status: nextStatus });
    if (overview) {
      const nextLeads = overview.leads.map((l) => (l.id === lead.id ? updated : l));
      setOverview({
        ...overview,
        leads: nextLeads,
        stats: {
          ...overview.stats,
          newLeads: nextLeads.filter((l) => l.status === 'new').length,
          qualifiedLeads: nextLeads.filter(
            (l) => l.status === 'qualified' || l.status === 'proposal-sent'
          ).length,
          closedWonLeads: nextLeads.filter((l) => l.status === 'closed-won').length,
        },
      });
    }
    notify(`Updated ${lead.id} status to "${nextStatus.toUpperCase()}"`);
  };

  const handleDeleteLead = async (id: string) => {
    await deleteLeadApi(id);
    await loadDashboardData();
    onCmsMutated();
    notify(`Removed lead ${id}`);
  };

  const handleReferralStatusChange = async (id: string, status: ReferralStatus) => {
    await updateReferralStatusApi(id, status);
    await loadDashboardData();
    notify(`Updated referral ${id} status to "${status.toUpperCase()}"`);
  };

  const handleCreateProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!projTitle.trim()) return;
    await createProjectApi({
      title: projTitle.trim(),
      category: projCategory.trim(),
      locationTag: projLocation.trim(),
      metricsHeadline: projMetricsHeadline.trim(),
      accentMetric: projAccentMetric.trim(),
      tags: projTags.trim(),
      imageUrl: projImageUrl.trim(),
      problemStatement:
        projProblem.trim() ||
        'High customer acquisition leakage and manual sales follow-up bottlenecks.',
      architectureSummary:
        projSummary.trim() ||
        'Deployed a custom sub-100ms Next.js platform wired to Official WhatsApp Cloud API and server-side CAPI.',
    });
    setProjTitle('');
    setProjProblem('');
    setProjSummary('');
    await loadDashboardData();
    onCmsMutated();
    notify('Published new Case Study Project to live website');
  };

  const handleDeleteProject = async (id: string) => {
    await deleteProjectApi(id);
    await loadDashboardData();
    onCmsMutated();
    notify('Removed Case Study Project');
  };

  const handleCreateService = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!srvTitle.trim() || !srvShortTab.trim()) return;
    const deliverables = srvDeliverables
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);
    await createServiceApi({
      shortTab: srvShortTab.trim(),
      categoryLabel: srvCategory.trim(),
      title: srvTitle.trim(),
      outcomeMetric: srvOutcome.trim(),
      timeline: srvTimeline.trim(),
      subtitle:
        srvSubtitle.trim() ||
        'Engineered from scratch for sub-second speed, automated WhatsApp qualification, and measurable ROI.',
      deliverables,
    });
    setSrvShortTab('');
    setSrvTitle('');
    setSrvSubtitle('');
    await loadDashboardData();
    onCmsMutated();
    notify('Published new Service Pillar to Capabilities Matrix');
  };

  const handleDeleteService = async (id: string) => {
    await deleteServiceApi(id);
    await loadDashboardData();
    onCmsMutated();
    notify('Removed Service Pillar');
  };

  const handleCreateReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!revAuthor.trim() || !revQuote.trim()) return;
    await createTestimonialApi({
      author: revAuthor.trim(),
      role: revRole.trim() || 'Founder & Director',
      engagementScope: revScope.trim(),
      verifiedOutcome: revOutcome.trim(),
      quote: revQuote.trim(),
    });
    setRevAuthor('');
    setRevRole('');
    setRevQuote('');
    await loadDashboardData();
    onCmsMutated();
    notify('Published Verified Client Review to live website');
  };

  const handleDeleteReview = async (id: string) => {
    await deleteTestimonialApi(id);
    await loadDashboardData();
    onCmsMutated();
    notify('Removed Client Review');
  };

  const handleCreateFaq = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!faqQuestion.trim() || !faqAnswer.trim()) return;
    await createFaqApi({
      category: faqCategory.trim(),
      accentColor: faqAccent,
      question: faqQuestion.trim(),
      answer: faqAnswer.trim(),
    });
    setFaqQuestion('');
    setFaqAnswer('');
    await loadDashboardData();
    onCmsMutated();
    notify('Published new FAQ item to live website');
  };

  const handleDeleteFaq = async (id: string) => {
    await deleteFaqApi(id);
    await loadDashboardData();
    onCmsMutated();
    notify('Removed FAQ item');
  };

  // Unauthenticated Login View
  if (!token) {
    return (
      <div className="min-h-screen platinum-canvas flex flex-col justify-between p-4 sm:p-8">
        <header className="max-w-[1320px] w-full mx-auto flex items-center justify-between gap-4">
          <button
            type="button"
            onClick={onBackToWebsite}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full platinum-card text-xs font-display font-bold text-[var(--text-primary)] cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" aria-hidden="true" />
            <span>Back to Public Website</span>
          </button>

          <button
            type="button"
            onClick={onToggleTheme}
            aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
            className="w-10 h-10 rounded-full platinum-card flex items-center justify-center text-[var(--text-primary)] cursor-pointer"
          >
            {theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
          </button>
        </header>

        <main className="my-auto max-w-md w-full mx-auto">
          <div className="rounded-3xl platinum-card p-7 sm:p-9 space-y-6">
            <div className="space-y-2 text-center">
              <div className="flex justify-center mb-3">
                <SkyLineLogo iconClassName="w-11 h-11" />
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full accent-pill-indigo font-mono text-[10px] font-bold uppercase tracking-wider">
                <ShieldCheck className="w-3.5 h-3.5" aria-hidden="true" />
                <span>FULL-STACK ADMIN CRM &amp; CMS</span>
              </div>
              <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-[var(--text-primary)] tracking-tight">
                Admin Portal Sign In
              </h1>
              <p className="text-xs text-[var(--text-secondary)]">
                Manage inbound leads, strategy meetings, 15% partner referrals, and live website
                CMS content.
              </p>
            </div>

            <form onSubmit={(e) => void handleLoginSubmit(e)} className="space-y-4">
              <div>
                <label
                  htmlFor="admin-email-input"
                  className="block font-mono text-[11px] font-bold uppercase text-[var(--text-primary)] mb-1.5"
                >
                  ADMIN EMAIL
                </label>
                <input
                  id="admin-email-input"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl platinum-subdued text-sm text-[var(--text-primary)] focus:outline-none"
                />
              </div>

              <div>
                <label
                  htmlFor="admin-password-input"
                  className="block font-mono text-[11px] font-bold uppercase text-[var(--text-primary)] mb-1.5"
                >
                  ADMIN PASSWORD
                </label>
                <input
                  id="admin-password-input"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter admin password"
                  className="w-full px-4 py-3 rounded-xl platinum-subdued text-sm text-[var(--text-primary)] focus:outline-none"
                />
              </div>

              {loginError && (
                <p role="alert" className="text-xs font-mono text-[#F43F5E] font-semibold">
                  {loginError}
                </p>
              )}

              <button
                type="submit"
                disabled={loggingIn}
                className="w-full py-3.5 px-6 rounded-2xl btn-platinum-primary font-display font-bold text-sm cursor-pointer shadow-md"
              >
                {loggingIn ? 'Authenticating...' : 'Sign In to Admin Dashboard'}
              </button>

              <button
                type="button"
                onClick={() => {
                  setEmail('admin@skylinedigital.in');
                  setPassword('SkyLine@2026');
                  setLoginError(null);
                }}
                className="w-full py-2.5 px-4 rounded-xl platinum-subdued text-xs font-mono font-semibold text-[var(--text-primary)] inline-flex items-center justify-center gap-2 cursor-pointer hover:opacity-85"
              >
                <KeyRound className="w-3.5 h-3.5 text-[#6366F1]" aria-hidden="true" />
                <span>Fill Demo Admin Credentials (SkyLine@2026)</span>
              </button>
            </form>
          </div>
        </main>

        <footer className="text-center text-xs font-mono text-[var(--text-muted)]">
          SkyLine Technologies • Express + TypeScript + Persistent CRM &amp; CMS Engine
        </footer>
      </div>
    );
  }

  const filteredLeads = (overview?.leads ?? []).filter((lead) => {
    const matchesStatus = leadStatusFilter === 'all' || lead.status === leadStatusFilter;
    const q = leadSearch.trim().toLowerCase();
    const matchesQuery =
      !q ||
      lead.nameOrCompany.toLowerCase().includes(q) ||
      lead.contact.toLowerCase().includes(q) ||
      lead.projectScope.toLowerCase().includes(q) ||
      lead.id.toLowerCase().includes(q);
    return matchesStatus && matchesQuery;
  });

  return (
    <div className="min-h-screen platinum-canvas pb-16">
      {/* Top Admin Command Bar */}
      <header className="sticky top-0 z-40 platinum-card border-b border-[var(--border-metallic)] px-4 sm:px-8 py-3.5">
        <div className="max-w-[1360px] mx-auto flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <SkyLineLogo iconClassName="w-9 h-9" dockStyle />
            <span className="px-3 py-1 rounded-full accent-pill-emerald font-mono text-[10px] font-bold uppercase">
              ADMIN CRM &amp; CMS LIVE
            </span>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={() => void loadDashboardData()}
              aria-label="Refresh database state"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full platinum-subdued text-xs font-mono font-semibold text-[var(--text-primary)] cursor-pointer"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
              <span className="hidden sm:inline">Sync DB</span>
            </button>

            <button
              type="button"
              onClick={onToggleTheme}
              aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
              className="w-9 h-9 rounded-full platinum-subdued flex items-center justify-center text-[var(--text-primary)] cursor-pointer"
            >
              {theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
            </button>

            <button
              type="button"
              onClick={onBackToWebsite}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full btn-platinum-primary text-xs font-display font-bold cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>View Live Website</span>
            </button>

            <button
              type="button"
              onClick={handleLogout}
              aria-label="Sign out of Admin Portal"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full platinum-subdued text-xs font-mono text-[#F43F5E] font-semibold cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Sign Out</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-[1360px] mx-auto px-4 sm:px-8 pt-8 space-y-8">
        {actionFeedback && (
          <div
            role="status"
            aria-live="polite"
            className="p-3.5 rounded-2xl accent-pill-emerald font-mono text-xs font-bold flex items-center justify-between"
          >
            <span className="inline-flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" />
              <span>{actionFeedback}</span>
            </span>
          </div>
        )}

        {/* Executive KPI Grid */}
        {overview && (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-5 rounded-3xl platinum-card space-y-1">
              <div className="font-mono text-[10px] font-bold uppercase text-[var(--text-muted)]">
                TOTAL INBOUND LEADS
              </div>
              <div className="font-display font-extrabold text-3xl text-[var(--text-primary)] tabular-nums">
                {overview.stats.totalLeads}
              </div>
              <div className="text-xs font-mono text-[#10B981]">
                {overview.stats.newLeads} New • {overview.stats.qualifiedLeads} Qualified
              </div>
            </div>

            <div className="p-5 rounded-3xl platinum-card space-y-1">
              <div className="font-mono text-[10px] font-bold uppercase text-[var(--text-muted)]">
                PARTNER REFERRALS (15%)
              </div>
              <div className="font-display font-extrabold text-3xl text-[var(--text-primary)] tabular-nums">
                {overview.stats.totalReferrals}
              </div>
              <div className="text-xs font-mono text-[#F59E0B]">
                ₹{overview.stats.totalCommissionVolume.toLocaleString('en-IN')} Commission Pool
              </div>
            </div>

            <div className="p-5 rounded-3xl platinum-card space-y-1">
              <div className="font-mono text-[10px] font-bold uppercase text-[var(--text-muted)]">
                LIVE CASE STUDIES &amp; SERVICES
              </div>
              <div className="font-display font-extrabold text-3xl text-[var(--text-primary)] tabular-nums">
                {overview.stats.totalProjects} / {overview.stats.totalServices}
              </div>
              <div className="text-xs font-mono text-[var(--text-secondary)]">
                Projects &amp; Service Pillars
              </div>
            </div>

            <div className="p-5 rounded-3xl platinum-card space-y-1">
              <div className="font-mono text-[10px] font-bold uppercase text-[var(--text-muted)]">
                REVIEWS &amp; FAQ KNOWLEDGE BASE
              </div>
              <div className="font-display font-extrabold text-3xl text-[var(--text-primary)] tabular-nums">
                {overview.stats.totalTestimonials} / {overview.stats.totalFaqs}
              </div>
              <div className="text-xs font-mono text-[var(--text-secondary)]">
                Verified Reviews &amp; FAQs
              </div>
            </div>
          </div>
        )}

        {/* 6-Tab Admin Navigation Switcher */}
        <div
          role="tablist"
          aria-label="Admin Portal Sections"
          className="p-2 rounded-2xl platinum-card flex flex-wrap items-center gap-2"
        >
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'leads'}
            onClick={() => setActiveTab('leads')}
            className={`px-4 py-2.5 rounded-xl font-display font-bold text-xs inline-flex items-center gap-2 cursor-pointer ${
              activeTab === 'leads'
                ? 'btn-platinum-primary shadow-sm'
                : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
            }`}
          >
            <Briefcase className="w-3.5 h-3.5" />
            <span>Leads &amp; Bookings ({overview?.leads.length ?? 0})</span>
          </button>

          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'referrals'}
            onClick={() => setActiveTab('referrals')}
            className={`px-4 py-2.5 rounded-xl font-display font-bold text-xs inline-flex items-center gap-2 cursor-pointer ${
              activeTab === 'referrals'
                ? 'btn-platinum-primary shadow-sm'
                : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>15% Referrals ({overview?.referrals.length ?? 0})</span>
          </button>

          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'projects'}
            onClick={() => setActiveTab('projects')}
            className={`px-4 py-2.5 rounded-xl font-display font-bold text-xs inline-flex items-center gap-2 cursor-pointer ${
              activeTab === 'projects'
                ? 'btn-platinum-primary shadow-sm'
                : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
            }`}
          >
            <FolderKanban className="w-3.5 h-3.5" />
            <span>Projects CMS ({overview?.projects.length ?? 0})</span>
          </button>

          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'services'}
            onClick={() => setActiveTab('services')}
            className={`px-4 py-2.5 rounded-xl font-display font-bold text-xs inline-flex items-center gap-2 cursor-pointer ${
              activeTab === 'services'
                ? 'btn-platinum-primary shadow-sm'
                : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Services CMS ({overview?.services.length ?? 0})</span>
          </button>

          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'testimonials'}
            onClick={() => setActiveTab('testimonials')}
            className={`px-4 py-2.5 rounded-xl font-display font-bold text-xs inline-flex items-center gap-2 cursor-pointer ${
              activeTab === 'testimonials'
                ? 'btn-platinum-primary shadow-sm'
                : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
            }`}
          >
            <MessageSquareQuote className="w-3.5 h-3.5" />
            <span>Reviews CMS ({overview?.testimonials.length ?? 0})</span>
          </button>

          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'faqs'}
            onClick={() => setActiveTab('faqs')}
            className={`px-4 py-2.5 rounded-xl font-display font-bold text-xs inline-flex items-center gap-2 cursor-pointer ${
              activeTab === 'faqs'
                ? 'btn-platinum-primary shadow-sm'
                : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
            }`}
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>FAQs CMS ({overview?.faqs.length ?? 0})</span>
          </button>
        </div>

        {/* TAB 1: LEADS & STRATEGY MEETINGS CRM */}
        {activeTab === 'leads' && (
          <div className="space-y-5">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
              <div className="relative flex-1 max-w-md">
                <Search className="w-4 h-4 text-[var(--text-muted)] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={leadSearch}
                  onChange={(e) => setLeadSearch(e.target.value)}
                  placeholder="Search leads by name, company, +91 phone, email, or ID..."
                  aria-label="Search leads"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl platinum-card text-xs text-[var(--text-primary)] focus:outline-none"
                />
              </div>

              <div className="flex flex-wrap items-center gap-1.5">
                {['all', 'new', 'contacted', 'qualified', 'proposal-sent', 'closed-won'].map(
                  (st) => (
                    <button
                      key={st}
                      type="button"
                      onClick={() => setLeadStatusFilter(st)}
                      className={`px-3 py-1.5 rounded-lg font-mono text-[11px] font-bold uppercase cursor-pointer ${
                        leadStatusFilter === st
                          ? 'btn-platinum-primary'
                          : 'platinum-card text-[var(--text-secondary)]'
                      }`}
                    >
                      {st}
                    </button>
                  )
                )}
              </div>
            </div>

            {filteredLeads.length === 0 ? (
              <div className="p-10 rounded-3xl platinum-card text-center space-y-2">
                <p className="font-display font-bold text-base text-[var(--text-primary)]">
                  No matching leads in pipeline
                </p>
                <p className="text-xs text-[var(--text-secondary)]">
                  Submit an inquiry or strategy meeting from the public contact section to see it
                  appear here in real time.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredLeads.map((lead) => {
                  const statusMeta =
                    LEAD_STATUS_OPTIONS.find((s) => s.value === lead.status) ||
                    LEAD_STATUS_OPTIONS[0];
                  const cleanDigits = lead.contact.replace(/[^\d]/g, '');
                  const waFollowupUrl = `https://wa.me/${
                    cleanDigits.length >= 10 ? cleanDigits : '918643002478'
                  }?text=${encodeURIComponent(
                    `Hi ${lead.nameOrCompany}, this is the Lead Architect at SkyLine Digital Agency following up on your ${lead.id} project inquiry!`
                  )}`;

                  return (
                    <article
                      key={lead.id}
                      className="rounded-3xl platinum-card p-6 space-y-4 transition-all"
                    >
                      <div className="flex flex-wrap items-start justify-between gap-4">
                        <div className="space-y-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="font-mono text-xs font-bold text-[var(--text-muted)]">
                              {lead.id}
                            </span>
                            <span
                              className={`px-2.5 py-0.5 rounded-full font-mono text-[10px] font-bold uppercase ${statusMeta.badgeClass}`}
                            >
                              {statusMeta.label}
                            </span>
                            {lead.inquiryType === 'meeting' && (
                              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full accent-pill-amber font-mono text-[10px] font-bold">
                                <Calendar className="w-3 h-3" />
                                <span>
                                  {lead.meetingDate} • {lead.meetingSlot}
                                </span>
                              </span>
                            )}
                            <span className="font-mono text-[11px] text-[var(--text-muted)]">
                              Budget: {lead.budget}
                            </span>
                          </div>

                          <h3 className="font-display font-extrabold text-lg sm:text-xl text-[var(--text-primary)]">
                            {lead.nameOrCompany}
                          </h3>
                          <div className="font-mono text-xs text-[var(--text-secondary)]">
                            Contact: <strong className="text-[var(--text-primary)]">{lead.contact}</strong> • Source: {lead.source} •{' '}
                            {new Date(lead.createdAt).toLocaleDateString('en-IN', {
                              day: 'numeric',
                              month: 'short',
                              year: 'numeric',
                            })}
                          </div>
                        </div>

                        <div className="flex flex-wrap items-center gap-2">
                          <label htmlFor={`status-${lead.id}`} className="sr-only">
                            Update status for {lead.nameOrCompany}
                          </label>
                          <select
                            id={`status-${lead.id}`}
                            value={lead.status}
                            onChange={(e) =>
                              void handleLeadStatusChange(lead, e.target.value as LeadStatus)
                            }
                            className="px-3 py-2 rounded-xl platinum-subdued font-mono text-xs font-bold text-[var(--text-primary)] cursor-pointer"
                          >
                            {LEAD_STATUS_OPTIONS.map((opt) => (
                              <option key={opt.value} value={opt.value}>
                                Status: {opt.label}
                              </option>
                            ))}
                          </select>

                          <a
                            href={waFollowupUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#25D366] text-white font-display font-bold text-xs"
                          >
                            <WhatsAppLogoIcon className="w-3.5 h-3.5" />
                            <span>WhatsApp Reply</span>
                          </a>

                          {lead.contact.includes('@') && (
                            <a
                              href={`mailto:${lead.contact}?subject=${encodeURIComponent(
                                `SkyLine Digital Architecture Proposal — ${lead.nameOrCompany}`
                              )}`}
                              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl platinum-subdued text-xs font-mono text-[var(--text-primary)]"
                            >
                              <Mail className="w-3.5 h-3.5" />
                              <span>Email</span>
                            </a>
                          )}

                          <button
                            type="button"
                            onClick={() => void handleDeleteLead(lead.id)}
                            aria-label={`Delete lead ${lead.nameOrCompany}`}
                            className="p-2 rounded-xl platinum-subdued text-[#F43F5E] hover:opacity-80 cursor-pointer"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      <div className="p-4 rounded-2xl platinum-subdued text-xs text-[var(--text-primary)] leading-relaxed">
                        {lead.projectScope}
                      </div>

                      <div className="flex flex-wrap items-center gap-2">
                        {lead.selectedPillars.map((p) => (
                          <span
                            key={p}
                            className="px-2.5 py-1 rounded-lg platinum-subdued font-mono text-[10px] font-semibold text-[var(--text-secondary)]"
                          >
                            {p}
                          </span>
                        ))}
                      </div>
                    </article>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* TAB 2: PARTNER REFERRALS (15% COMMISSION LEDGER) */}
        {activeTab === 'referrals' && (
          <div className="space-y-4">
            {(overview?.referrals ?? []).map((ref) => (
              <div
                key={ref.id}
                className="rounded-3xl platinum-card p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-[var(--text-muted)]">
                      {ref.id}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full accent-pill-amber font-mono text-[10px] font-bold uppercase">
                      15% COMMISSION: ₹{ref.commissionAmount.toLocaleString('en-IN')}
                    </span>
                  </div>
                  <h3 className="font-display font-bold text-lg text-[var(--text-primary)]">
                    Referred: {ref.referredBusiness}
                  </h3>
                  <p className="text-xs font-mono text-[var(--text-secondary)]">
                    Partner: {ref.referrerName} ({ref.referrerContact}) • Est. Deal: ₹
                    {ref.estimatedDealValue.toLocaleString('en-IN')}
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <select
                    aria-label={`Referral status for ${ref.referredBusiness}`}
                    value={ref.status}
                    onChange={(e) =>
                      void handleReferralStatusChange(ref.id, e.target.value as ReferralStatus)
                    }
                    className="px-3.5 py-2 rounded-xl platinum-subdued font-mono text-xs font-bold text-[var(--text-primary)] cursor-pointer"
                  >
                    {REFERRAL_STATUS_OPTIONS.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TAB 3: PROJECTS / CASE STUDIES CMS */}
        {activeTab === 'projects' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <form
              onSubmit={(e) => void handleCreateProject(e)}
              className="lg:col-span-5 rounded-3xl platinum-card p-6 space-y-4"
            >
              <h2 className="font-display font-extrabold text-lg text-[var(--text-primary)] flex items-center gap-2">
                <Plus className="w-4 h-4 text-[#6366F1]" />
                <span>Add Live Case Study Project</span>
              </h2>

              <div>
                <label
                  htmlFor="cms-proj-title"
                  className="block font-mono text-[10px] font-bold uppercase text-[var(--text-muted)] mb-1"
                >
                  PROJECT TITLE *
                </label>
                <input
                  id="cms-proj-title"
                  type="text"
                  required
                  value={projTitle}
                  onChange={(e) => setProjTitle(e.target.value)}
                  placeholder="e.g. FinScale Wealth SaaS Portal"
                  className="w-full px-3.5 py-2.5 rounded-xl platinum-subdued text-xs text-[var(--text-primary)]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label
                    htmlFor="cms-proj-cat"
                    className="block font-mono text-[10px] font-bold uppercase text-[var(--text-muted)] mb-1"
                  >
                    CATEGORY *
                  </label>
                  <input
                    id="cms-proj-cat"
                    type="text"
                    required
                    value={projCategory}
                    onChange={(e) => setProjCategory(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl platinum-subdued text-xs text-[var(--text-primary)]"
                  />
                </div>
                <div>
                  <label
                    htmlFor="cms-proj-loc"
                    className="block font-mono text-[10px] font-bold uppercase text-[var(--text-muted)] mb-1"
                  >
                    LOCATION TAG
                  </label>
                  <input
                    id="cms-proj-loc"
                    type="text"
                    value={projLocation}
                    onChange={(e) => setProjLocation(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl platinum-subdued text-xs text-[var(--text-primary)]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label
                    htmlFor="cms-proj-metric"
                    className="block font-mono text-[10px] font-bold uppercase text-[var(--text-muted)] mb-1"
                  >
                    HEADLINE METRIC
                  </label>
                  <input
                    id="cms-proj-metric"
                    type="text"
                    value={projMetricsHeadline}
                    onChange={(e) => setProjMetricsHeadline(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl platinum-subdued text-xs text-[var(--text-primary)]"
                  />
                </div>
                <div>
                  <label
                    htmlFor="cms-proj-accent-metric"
                    className="block font-mono text-[10px] font-bold uppercase text-[var(--text-muted)] mb-1"
                  >
                    SPEED / SLA BADGE
                  </label>
                  <input
                    id="cms-proj-accent-metric"
                    type="text"
                    value={projAccentMetric}
                    onChange={(e) => setProjAccentMetric(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl platinum-subdued text-xs text-[var(--text-primary)]"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="cms-proj-tags"
                  className="block font-mono text-[10px] font-bold uppercase text-[var(--text-muted)] mb-1"
                >
                  STACK TAGS
                </label>
                <input
                  id="cms-proj-tags"
                  type="text"
                  value={projTags}
                  onChange={(e) => setProjTags(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl platinum-subdued text-xs text-[var(--text-primary)]"
                />
              </div>

              <div>
                <label
                  htmlFor="cms-proj-img"
                  className="block font-mono text-[10px] font-bold uppercase text-[var(--text-muted)] mb-1"
                >
                  SHOWCASE IMAGE URL
                </label>
                <input
                  id="cms-proj-img"
                  type="url"
                  value={projImageUrl}
                  onChange={(e) => setProjImageUrl(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl platinum-subdued text-xs text-[var(--text-primary)]"
                />
              </div>

              <div>
                <label
                  htmlFor="cms-proj-summary"
                  className="block font-mono text-[10px] font-bold uppercase text-[var(--text-muted)] mb-1"
                >
                  DEPLOYED ARCHITECTURE SUMMARY
                </label>
                <textarea
                  id="cms-proj-summary"
                  rows={2}
                  value={projSummary}
                  onChange={(e) => setProjSummary(e.target.value)}
                  placeholder="How we engineered the system and solved the client bottleneck..."
                  className="w-full p-3 rounded-xl platinum-subdued text-xs text-[var(--text-primary)]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 px-5 rounded-xl btn-platinum-primary font-display font-bold text-xs cursor-pointer"
              >
                Publish Case Study to Website
              </button>
            </form>

            <div className="lg:col-span-7 space-y-3">
              {(overview?.projects ?? []).map((proj) => (
                <div
                  key={proj.id}
                  className="rounded-2xl platinum-card p-4 flex items-center justify-between gap-4"
                >
                  <div className="min-w-0">
                    <div className="font-mono text-[10px] font-bold text-[var(--text-muted)]">
                      {proj.category} • {proj.metricsHeadline}
                    </div>
                    <h3 className="font-display font-bold text-base text-[var(--text-primary)] truncate">
                      {proj.title}
                    </h3>
                    <div className="text-xs text-[var(--text-secondary)] truncate">{proj.tags}</div>
                  </div>
                  <button
                    type="button"
                    onClick={() => void handleDeleteProject(proj.id)}
                    aria-label={`Delete project ${proj.title}`}
                    className="p-2.5 rounded-xl platinum-subdued text-[#F43F5E] hover:opacity-80 cursor-pointer shrink-0"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: SERVICES / CAPABILITIES CMS */}
        {activeTab === 'services' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <form
              onSubmit={(e) => void handleCreateService(e)}
              className="lg:col-span-5 rounded-3xl platinum-card p-6 space-y-4"
            >
              <h2 className="font-display font-extrabold text-lg text-[var(--text-primary)] flex items-center gap-2">
                <Plus className="w-4 h-4 text-[#6366F1]" />
                <span>Add Service Pillar Tab</span>
              </h2>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label
                    htmlFor="cms-srv-tab"
                    className="block font-mono text-[10px] font-bold uppercase text-[var(--text-muted)] mb-1"
                  >
                    SHORT TAB NAME *
                  </label>
                  <input
                    id="cms-srv-tab"
                    type="text"
                    required
                    value={srvShortTab}
                    onChange={(e) => setSrvShortTab(e.target.value)}
                    placeholder="e.g. Custom ERP & Cloud"
                    className="w-full px-3.5 py-2.5 rounded-xl platinum-subdued text-xs text-[var(--text-primary)]"
                  />
                </div>
                <div>
                  <label
                    htmlFor="cms-srv-cat"
                    className="block font-mono text-[10px] font-bold uppercase text-[var(--text-muted)] mb-1"
                  >
                    CATEGORY BADGE
                  </label>
                  <input
                    id="cms-srv-cat"
                    type="text"
                    value={srvCategory}
                    onChange={(e) => setSrvCategory(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl platinum-subdued text-xs text-[var(--text-primary)]"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="cms-srv-title"
                  className="block font-mono text-[10px] font-bold uppercase text-[var(--text-muted)] mb-1"
                >
                  FULL SERVICE HEADING *
                </label>
                <input
                  id="cms-srv-title"
                  type="text"
                  required
                  value={srvTitle}
                  onChange={(e) => setSrvTitle(e.target.value)}
                  placeholder="e.g. Cloud ERP & Multi-Branch Inventory Systems"
                  className="w-full px-3.5 py-2.5 rounded-xl platinum-subdued text-xs text-[var(--text-primary)]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label
                    htmlFor="cms-srv-outcome"
                    className="block font-mono text-[10px] font-bold uppercase text-[var(--text-muted)] mb-1"
                  >
                    OUTCOME METRIC
                  </label>
                  <input
                    id="cms-srv-outcome"
                    type="text"
                    value={srvOutcome}
                    onChange={(e) => setSrvOutcome(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl platinum-subdued text-xs text-[var(--text-primary)]"
                  />
                </div>
                <div>
                  <label
                    htmlFor="cms-srv-timeline"
                    className="block font-mono text-[10px] font-bold uppercase text-[var(--text-muted)] mb-1"
                  >
                    DELIVERY TIMELINE
                  </label>
                  <input
                    id="cms-srv-timeline"
                    type="text"
                    value={srvTimeline}
                    onChange={(e) => setSrvTimeline(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl platinum-subdued text-xs text-[var(--text-primary)]"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="cms-srv-deliverables"
                  className="block font-mono text-[10px] font-bold uppercase text-[var(--text-muted)] mb-1"
                >
                  DELIVERABLES (COMMA SEPARATED)
                </label>
                <input
                  id="cms-srv-deliverables"
                  type="text"
                  value={srvDeliverables}
                  onChange={(e) => setSrvDeliverables(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl platinum-subdued text-xs text-[var(--text-primary)]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 px-5 rounded-xl btn-platinum-primary font-display font-bold text-xs cursor-pointer"
              >
                Publish Service Pillar
              </button>
            </form>

            <div className="lg:col-span-7 space-y-3">
              {(overview?.services ?? []).map((srv) => (
                <div
                  key={srv.id}
                  className="rounded-2xl platinum-card p-4 flex items-center justify-between gap-4"
                >
                  <div className="min-w-0">
                    <div className="font-mono text-[10px] font-bold text-[var(--text-muted)]">
                      {srv.shortTab} • {srv.timeline}
                    </div>
                    <h3 className="font-display font-bold text-base text-[var(--text-primary)] truncate">
                      {srv.title}
                    </h3>
                    <div className="text-xs text-[var(--text-secondary)] truncate">
                      {srv.outcomeMetric}
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => void handleDeleteService(srv.id)}
                    aria-label={`Delete service ${srv.title}`}
                    className="p-2.5 rounded-xl platinum-subdued text-[#F43F5E] hover:opacity-80 cursor-pointer shrink-0"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: CLIENT TESTIMONIALS CMS */}
        {activeTab === 'testimonials' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <form
              onSubmit={(e) => void handleCreateReview(e)}
              className="lg:col-span-5 rounded-3xl platinum-card p-6 space-y-4"
            >
              <h2 className="font-display font-extrabold text-lg text-[var(--text-primary)] flex items-center gap-2">
                <Plus className="w-4 h-4 text-[#6366F1]" />
                <span>Add Verified Client Review</span>
              </h2>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label
                    htmlFor="cms-rev-author"
                    className="block font-mono text-[10px] font-bold uppercase text-[var(--text-muted)] mb-1"
                  >
                    CLIENT NAME *
                  </label>
                  <input
                    id="cms-rev-author"
                    type="text"
                    required
                    value={revAuthor}
                    onChange={(e) => setRevAuthor(e.target.value)}
                    placeholder="e.g. Devansh Tiwari"
                    className="w-full px-3.5 py-2.5 rounded-xl platinum-subdued text-xs text-[var(--text-primary)]"
                  />
                </div>
                <div>
                  <label
                    htmlFor="cms-rev-role"
                    className="block font-mono text-[10px] font-bold uppercase text-[var(--text-muted)] mb-1"
                  >
                    ROLE / COMPANY
                  </label>
                  <input
                    id="cms-rev-role"
                    type="text"
                    value={revRole}
                    onChange={(e) => setRevRole(e.target.value)}
                    placeholder="e.g. MD, Horizon Clinics"
                    className="w-full px-3.5 py-2.5 rounded-xl platinum-subdued text-xs text-[var(--text-primary)]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label
                    htmlFor="cms-rev-outcome"
                    className="block font-mono text-[10px] font-bold uppercase text-[var(--text-muted)] mb-1"
                  >
                    VERIFIED OUTCOME PILL
                  </label>
                  <input
                    id="cms-rev-outcome"
                    type="text"
                    value={revOutcome}
                    onChange={(e) => setRevOutcome(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl platinum-subdued text-xs text-[var(--text-primary)]"
                  />
                </div>
                <div>
                  <label
                    htmlFor="cms-rev-scope"
                    className="block font-mono text-[10px] font-bold uppercase text-[var(--text-muted)] mb-1"
                  >
                    ENGAGEMENT SCOPE
                  </label>
                  <input
                    id="cms-rev-scope"
                    type="text"
                    value={revScope}
                    onChange={(e) => setRevScope(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl platinum-subdued text-xs text-[var(--text-primary)]"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="cms-rev-quote"
                  className="block font-mono text-[10px] font-bold uppercase text-[var(--text-muted)] mb-1"
                >
                  CLIENT REVIEW QUOTE *
                </label>
                <textarea
                  id="cms-rev-quote"
                  rows={3}
                  required
                  value={revQuote}
                  onChange={(e) => setRevQuote(e.target.value)}
                  placeholder="Write the verified client testimonial..."
                  className="w-full p-3 rounded-xl platinum-subdued text-xs text-[var(--text-primary)]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 px-5 rounded-xl btn-platinum-primary font-display font-bold text-xs cursor-pointer"
              >
                Publish Client Review
              </button>
            </form>

            <div className="lg:col-span-7 space-y-3">
              {(overview?.testimonials ?? []).map((rev) => (
                <div
                  key={rev.id}
                  className="rounded-2xl platinum-card p-4 flex items-center justify-between gap-4"
                >
                  <div className="min-w-0 space-y-1">
                    <div className="font-mono text-[10px] font-bold text-[#10B981]">
                      ✓ {rev.verifiedOutcome} • {rev.engagementScope}
                    </div>
                    <h3 className="font-display font-bold text-sm text-[var(--text-primary)]">
                      {rev.author} ({rev.role})
                    </h3>
                    <p className="text-xs italic text-[var(--text-secondary)] line-clamp-2">
                      &ldquo;{rev.quote}&rdquo;
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => void handleDeleteReview(rev.id)}
                    aria-label={`Delete review by ${rev.author}`}
                    className="p-2.5 rounded-xl platinum-subdued text-[#F43F5E] hover:opacity-80 cursor-pointer shrink-0"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 6: FAQ KNOWLEDGE BASE CMS */}
        {activeTab === 'faqs' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <form
              onSubmit={(e) => void handleCreateFaq(e)}
              className="lg:col-span-5 rounded-3xl platinum-card p-6 space-y-4"
            >
              <h2 className="font-display font-extrabold text-lg text-[var(--text-primary)] flex items-center gap-2">
                <Plus className="w-4 h-4 text-[#6366F1]" />
                <span>Add FAQ Accordion Item</span>
              </h2>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label
                    htmlFor="cms-faq-cat"
                    className="block font-mono text-[10px] font-bold uppercase text-[var(--text-muted)] mb-1"
                  >
                    CATEGORY TAG
                  </label>
                  <input
                    id="cms-faq-cat"
                    type="text"
                    value={faqCategory}
                    onChange={(e) => setFaqCategory(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl platinum-subdued text-xs text-[var(--text-primary)]"
                  />
                </div>
                <div>
                  <label
                    htmlFor="cms-faq-accent"
                    className="block font-mono text-[10px] font-bold uppercase text-[var(--text-muted)] mb-1"
                  >
                    BADGE ACCENT
                  </label>
                  <select
                    id="cms-faq-accent"
                    value={faqAccent}
                    onChange={(e) => setFaqAccent(e.target.value as SemanticAccentColor)}
                    className="w-full px-3.5 py-2.5 rounded-xl platinum-subdued text-xs text-[var(--text-primary)]"
                  >
                    <option value="indigo">Indigo</option>
                    <option value="emerald">Emerald</option>
                    <option value="amber">Amber</option>
                    <option value="violet">Violet</option>
                    <option value="cyan">Cyan</option>
                    <option value="rose">Rose</option>
                  </select>
                </div>
              </div>

              <div>
                <label
                  htmlFor="cms-faq-q"
                  className="block font-mono text-[10px] font-bold uppercase text-[var(--text-muted)] mb-1"
                >
                  QUESTION *
                </label>
                <input
                  id="cms-faq-q"
                  type="text"
                  required
                  value={faqQuestion}
                  onChange={(e) => setFaqQuestion(e.target.value)}
                  placeholder="e.g. Do you provide source code and cloud ownership?"
                  className="w-full px-3.5 py-2.5 rounded-xl platinum-subdued text-xs text-[var(--text-primary)]"
                />
              </div>

              <div>
                <label
                  htmlFor="cms-faq-a"
                  className="block font-mono text-[10px] font-bold uppercase text-[var(--text-muted)] mb-1"
                >
                  ANSWER *
                </label>
                <textarea
                  id="cms-faq-a"
                  rows={3}
                  required
                  value={faqAnswer}
                  onChange={(e) => setFaqAnswer(e.target.value)}
                  placeholder="Yes, 100% of custom repositories, domains, and cloud infrastructure belong to you upon milestone completion."
                  className="w-full p-3 rounded-xl platinum-subdued text-xs text-[var(--text-primary)]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 px-5 rounded-xl btn-platinum-primary font-display font-bold text-xs cursor-pointer"
              >
                Publish FAQ to Website
              </button>
            </form>

            <div className="lg:col-span-7 space-y-3">
              {(overview?.faqs ?? []).map((item) => (
                <div
                  key={item.id}
                  className="rounded-2xl platinum-card p-4 flex items-center justify-between gap-4"
                >
                  <div className="min-w-0 space-y-1">
                    <span className="font-mono text-[10px] font-bold uppercase text-[var(--text-muted)]">
                      {item.category}
                    </span>
                    <h3 className="font-display font-bold text-sm text-[var(--text-primary)]">
                      {item.question}
                    </h3>
                    <p className="text-xs text-[var(--text-secondary)] line-clamp-2">
                      {item.answer}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => void handleDeleteFaq(item.id)}
                    aria-label={`Delete FAQ ${item.question}`}
                    className="p-2.5 rounded-xl platinum-subdued text-[#F43F5E] hover:opacity-80 cursor-pointer shrink-0"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

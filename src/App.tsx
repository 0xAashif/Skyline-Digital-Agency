import React, { useEffect, useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { StackTicker } from './components/StackTicker';
import { CapabilitiesMatrix } from './components/CapabilitiesMatrix';
import { SystemArchitectSimulator } from './components/SystemArchitectSimulator';
import { ExecutionRoadmap } from './components/ExecutionRoadmap';
import { ClientProofAndReferral } from './components/ClientProofAndReferral';
import { FaqSection } from './components/FaqSection';
import { ContactDispatchFooter } from './components/ContactDispatchFooter';
import { ShowcaseProject } from './data/agencyData';
import { SystemBlueprint } from './utils/architectEngine';

export type ThemeMode = 'light' | 'dark';

export function App() {
  // Light mode ("Liquid Silver & Dark Platinum") by default
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
  const [curtainMenuOpen, setCurtainMenuOpen] = useState<boolean>(false);
  const [selectedCapabilityId, setSelectedCapabilityId] = useState<string | null>(null);
  const [preselectedPillar, setPreselectedPillar] = useState<string | null>(null);
  const [prefilledScope, setPrefilledScope] = useState<string | null>(null);
  const [activeModalProject, setActiveModalProject] = useState<ShowcaseProject | null>(null);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    try {
      window.localStorage.setItem('skyline-theme', theme);
    } catch {
      // ignore storage errors
    }
  }, [theme]);

  const handleToggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const handleSelectPillar = (pillarTitle: string) => {
    setPreselectedPillar(pillarTitle);
  };

  const handleApplyBlueprintToForm = (blueprint: SystemBlueprint) => {
    setPrefilledScope(
      `Blueprint [${blueprint.blueprintCode}] (${blueprint.industry} — ${blueprint.bottleneck}): Deploy ${blueprint.layers[0].title} + ${blueprint.layers[1].title} + ${blueprint.layers[2].title}.`
    );
  };

  return (
    <div className="min-h-screen platinum-canvas overflow-x-hidden transition-colors duration-200">
      <Navbar
        theme={theme}
        onToggleTheme={handleToggleTheme}
        externalMenuOpen={curtainMenuOpen}
        onExternalMenuToggle={setCurtainMenuOpen}
      />
      <main>
        <HeroSection
          theme={theme}
          onToggleTheme={handleToggleTheme}
          onOpenMenu={() => setCurtainMenuOpen(true)}
          onSelectCapability={(capId) => setSelectedCapabilityId(capId)}
          activeModalProject={activeModalProject}
          onOpenProjectModal={setActiveModalProject}
        />
        <ExecutionRoadmap />
        <ClientProofAndReferral
          onOpenProjectModal={(project) => setActiveModalProject(project)}
        />
        <CapabilitiesMatrix
          selectedCapabilityId={selectedCapabilityId}
          onSelectForProposal={handleSelectPillar}
        />
        <StackTicker />
        <SystemArchitectSimulator onApplyBlueprintToForm={handleApplyBlueprintToForm} />
        <FaqSection />
      </main>
      <ContactDispatchFooter
        preselectedPillar={preselectedPillar}
        prefilledScope={prefilledScope}
      />
    </div>
  );
}

export default App;

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroAnimation } from './components/HeroAnimation';
import { AeroSection } from './components/AeroSection';
import { CockpitSection } from './components/CockpitSection';
import { SpecsSection } from './components/SpecsSection';
import { SubmissionInfo } from './components/SubmissionInfo';
import { ConfigModal } from './components/ConfigModal';
import { Footer } from './components/Footer';
import { soundEngine } from './utils/audio';

export default function App() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const [isConfigOpen, setIsConfigOpen] = useState(false);
  const [accentColor, setAccentColor] = useState('#38bdf8');

  // Handle global sound toggle
  const toggleSound = () => {
    const nextState = !isMuted;
    setIsMuted(nextState);
    soundEngine.setMuted(nextState);
  };

  return (
    <div className="min-h-screen bg-[#060709] text-slate-100 flex flex-col font-sans selection:bg-cyan-500/30 selection:text-cyan-200">
      
      {/* Strict 3-zone Navigation */}
      <Navbar
        isMuted={isMuted}
        onToggleSound={toggleSound}
        onOpenConfig={() => setIsConfigOpen(true)}
        scrollProgress={scrollProgress}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        
        {/* Core Hero Section with GSAP Scroll Animation & Staggered Reveal */}
        <HeroAnimation 
          onScrollProgressChange={setScrollProgress}
          carFinishColor={accentColor}
        />

        {/* Computational Fluid Dynamics & Wind Tunnel Simulation */}
        <AeroSection />

        {/* Cockpit & Carbon Rear Wing Feature Deep-Dive */}
        <CockpitSection />

        {/* Quantitative Dyno Specifications & Performance Benchmark */}
        <SpecsSection />

        {/* Reviewer & Assignment Submission Card with Live & GitHub Links */}
        <SubmissionInfo />

      </main>

      {/* Interactive Bespoke Configurator Modal */}
      <ConfigModal
        isOpen={isConfigOpen}
        onClose={() => setIsConfigOpen(false)}
        currentColor={accentColor}
        onSelectColor={setAccentColor}
      />

      {/* Quiet Footer */}
      <Footer />

    </div>
  );
}

import React from 'react';
import { Volume2, VolumeX, Sparkles } from 'lucide-react';

interface NavbarProps {
  isMuted: boolean;
  onToggleSound: () => void;
  onOpenConfig: () => void;
  scrollProgress: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  isMuted,
  onToggleSound,
  onOpenConfig,
  scrollProgress
}) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-[#060709]/80 backdrop-blur-md border-b border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between gap-8">
        
        {/* Zone 1: Single text element wordmark */}
        <a 
          href="#hero" 
          className="text-lg font-bold tracking-widest text-white uppercase whitespace-nowrap shrink-0 font-display flex items-center gap-2"
        >
          <span className="w-2 h-2 rounded-sm bg-cyan-400 rotate-45" />
          <span>ITZFIZZ</span>
          <span className="text-xs font-mono font-normal text-cyan-400 tracking-normal px-1 py-0.5 border border-cyan-400/20 rounded">
            GT-AERO
          </span>
        </a>

        {/* Zone 2: Clean single-line text navigation links */}
        <nav className="hidden md:flex items-center gap-8 text-xs uppercase tracking-wider font-medium text-slate-300">
          <a href="#hero" className="hover:text-cyan-400 transition-colors whitespace-nowrap shrink-0">
            Showcase
          </a>
          <a href="#telemetry" className="hover:text-cyan-400 transition-colors whitespace-nowrap shrink-0">
            Aero & Wind
          </a>
          <a href="#cockpit" className="hover:text-cyan-400 transition-colors whitespace-nowrap shrink-0">
            Interior
          </a>
          <a href="#specifications" className="hover:text-cyan-400 transition-colors whitespace-nowrap shrink-0">
            Specifications
          </a>
          <a href="#submission-info" className="hover:text-cyan-400 transition-colors whitespace-nowrap shrink-0 text-slate-400">
            Project Info
          </a>
        </nav>

        {/* Zone 3: Audio toggle + 1 primary action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onToggleSound}
            aria-label={isMuted ? 'Unmute engine audio' : 'Mute engine audio'}
            className="p-2 text-slate-400 hover:text-cyan-400 hover:bg-white/[0.05] rounded-lg transition-colors border border-white/[0.08] flex items-center gap-1.5 text-xs font-mono"
            title="Toggle Engine & Aero Sound FX"
          >
            {isMuted ? <VolumeX className="w-3.5 h-3.5 text-slate-500" /> : <Volume2 className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />}
            <span className="hidden sm:inline text-[11px]">{isMuted ? 'Audio OFF' : 'Audio ON'}</span>
          </button>

          <button
            onClick={onOpenConfig}
            className="px-4 py-2 text-xs font-semibold tracking-wider uppercase text-black bg-cyan-400 hover:bg-cyan-300 rounded-lg transition-all duration-200 shadow-sm shadow-cyan-400/20 whitespace-nowrap shrink-0 flex items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Configure Spec</span>
          </button>
        </div>

      </div>

      {/* Mini top scroll progression indicator bar */}
      <div 
        className="h-[2px] bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500 transition-all duration-75 origin-left"
        style={{ width: `${Math.min(100, Math.max(0, scrollProgress * 100))}%` }}
      />
    </header>
  );
};

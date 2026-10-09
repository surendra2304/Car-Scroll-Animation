import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="relative py-12 px-6 sm:px-12 bg-[#040507] border-t border-white/[0.08] text-slate-500 text-xs">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Brand wordmark */}
        <div className="flex items-center gap-3">
          <span className="w-2 h-2 rounded-sm bg-cyan-400 rotate-45" />
          <span className="font-bold tracking-widest text-slate-200 font-display">
            ITZFIZZ AUTOMOTIVE GROUP
          </span>
          <span className="text-slate-600">·</span>
          <span>Scroll Dynamics Engineering</span>
        </div>

        {/* Quiet Navigation mirror */}
        <nav className="flex items-center gap-6 text-slate-400">
          <a href="#hero" className="hover:text-cyan-400 transition-colors">Hero Showcase</a>
          <a href="#telemetry" className="hover:text-cyan-400 transition-colors">Aero Dynamics</a>
          <a href="#cockpit" className="hover:text-cyan-400 transition-colors">Cockpit</a>
          <a href="#specifications" className="hover:text-cyan-400 transition-colors">Specs</a>
          <a href="#submission-info" className="hover:text-cyan-400 transition-colors">Submission Links</a>
        </nav>

        {/* Legal notice */}
        <div className="text-slate-600 font-mono text-[11px]">
          © {new Date().getFullYear()} ITZFIZZ · Assignment Implementation
        </div>

      </div>
    </footer>
  );
};

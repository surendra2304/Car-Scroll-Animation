import React, { useState } from 'react';
import { Eye, Shield, Compass, Cpu } from 'lucide-react';
import cockpitImg from '../assets/images/car_cockpit_aero_1791559224672.jpg';

export const CockpitSection: React.FC = () => {
  const [activeHighlight, setActiveHighlight] = useState<'wheel' | 'wing' | 'telemetry'>('wheel');

  return (
    <section id="cockpit" className="relative py-28 px-6 sm:px-12 bg-[#060709] border-t border-white/[0.06]">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-cyan-400 uppercase mb-2">
              <Eye className="w-3.5 h-3.5" />
              <span>Pilot Interface & Craftsmanship</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white font-display">
              Driver Cockpit & Carbon Wing
            </h2>
          </div>
          <p className="text-slate-400 text-sm max-w-md">
            Hand-laid exposed carbon weave, bespoke alcantara touchpoints, and precision CNC-milled titanium paddle controls.
          </p>
        </div>

        {/* Feature showcase split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left visual carrier */}
          <div className="lg:col-span-7 relative group rounded-2xl overflow-hidden border border-white/[0.1] bg-[#0d1017]">
            <img 
              src={cockpitImg} 
              alt="ITZFIZZ Supercar Carbon Cockpit and Active Rear Spoiler"
              className="w-full h-auto aspect-[16/9] object-cover transition-transform duration-700 group-hover:scale-105"
              referrerPolicy="no-referrer"
            />
            
            {/* Ambient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />

            {/* Quick interactive tags */}
            <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between text-xs font-mono">
              <div className="flex items-center gap-2 bg-black/70 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/[0.08]">
                <span className="w-2 h-2 rounded-full bg-cyan-400" />
                <span className="text-slate-200">ACTIVE TELEMETRY MONITORS</span>
              </div>
              <div className="flex items-center gap-2 bg-black/70 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/[0.08]">
                <span className="w-2 h-2 rounded-full bg-amber-400" />
                <span className="text-slate-200">TITANIUM DRS ACTUATOR</span>
              </div>
            </div>
          </div>

          {/* Right specifications selector */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            
            {/* Feature 1 */}
            <button
              onClick={() => setActiveHighlight('wheel')}
              className={`p-6 rounded-2xl text-left transition-all border ${
                activeHighlight === 'wheel' 
                  ? 'bg-white/[0.04] border-cyan-400/40 shadow-lg shadow-cyan-950/20' 
                  : 'bg-[#0d1017]/60 border-white/[0.06] hover:border-white/[0.15]'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono text-cyan-400 tracking-wider">01. STEERING</span>
                <Compass className="w-4 h-4 text-cyan-400" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-1.5">
                Alcantara Track Wheel with Integrated Shift Lights
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Direct-drive magnetic paddles with 0.8mm micro-throw engagement, programmable rotary dials for brake bias and traction control slip angle.
              </p>
            </button>

            {/* Feature 2 */}
            <button
              onClick={() => setActiveHighlight('wing')}
              className={`p-6 rounded-2xl text-left transition-all border ${
                activeHighlight === 'wing' 
                  ? 'bg-white/[0.04] border-cyan-400/40 shadow-lg shadow-cyan-950/20' 
                  : 'bg-[#0d1017]/60 border-white/[0.06] hover:border-white/[0.15]'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono text-cyan-400 tracking-wider">02. ACTIVE SPOILER</span>
                <Cpu className="w-4 h-4 text-cyan-400" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-1.5">
                Bespoke Carbon Rear Wing Pylons
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Swan-neck mounted top struts keep the suction underside completely undisturbed, yielding a 14% higher downforce coefficient compared to standard brackets.
              </p>
            </button>

            {/* Feature 3 */}
            <button
              onClick={() => setActiveHighlight('telemetry')}
              className={`p-6 rounded-2xl text-left transition-all border ${
                activeHighlight === 'telemetry' 
                  ? 'bg-white/[0.04] border-cyan-400/40 shadow-lg shadow-cyan-950/20' 
                  : 'bg-[#0d1017]/60 border-white/[0.06] hover:border-white/[0.15]'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono text-cyan-400 tracking-wider">03. ERGONOMICS</span>
                <Shield className="w-4 h-4 text-cyan-400" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-1.5">
                Custom-Molded Carbon Bucket Shells
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                FIA 8862-2009 certified monocoque seats with high-density energy-absorbing foam, configured for 6-point racing harnesses and long-distance GT touring.
              </p>
            </button>

          </div>

        </div>

      </div>
    </section>
  );
};

import React, { useState } from 'react';
import { Gauge, Check, ArrowRight } from 'lucide-react';

export const SpecsSection: React.FC = () => {
  const [selectedTrim, setSelectedTrim] = useState<'gt' | 'track' | 'clubsport'>('track');

  const TRIMS = {
    gt: {
      name: 'ITZFIZZ GT Touring',
      power: '1,020 HP',
      torque: '1,150 Nm',
      sprint: '2.4s',
      topSpeed: '335 km/h',
      downforce: '480 kg',
      weight: '1,590 kg',
      range: '540 km'
    },
    track: {
      name: 'ITZFIZZ GT-AERO Track Special',
      power: '1,250 HP',
      torque: '1,380 Nm',
      sprint: '2.1s',
      topSpeed: '360 km/h',
      downforce: '860 kg',
      weight: '1,420 kg',
      range: '460 km'
    },
    clubsport: {
      name: 'ITZFIZZ R-Clubsport Prototype',
      power: '1,400 HP',
      torque: '1,520 Nm',
      sprint: '1.95s',
      topSpeed: '385 km/h',
      downforce: '1,120 kg',
      weight: '1,340 kg',
      range: '390 km'
    }
  };

  const current = TRIMS[selectedTrim];

  return (
    <section id="specifications" className="relative py-28 px-6 sm:px-12 bg-[#08090d] border-t border-white/[0.06]">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-cyan-400 uppercase mb-2">
              <Gauge className="w-3.5 h-3.5" />
              <span>Certified Dyno Telemetry</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white font-display">
              Technical Specifications & Benchmark
            </h2>
          </div>

          {/* Segmented Trim Tabs */}
          <div className="flex items-center gap-1 p-1 bg-black/60 rounded-xl border border-white/[0.08]">
            <button
              onClick={() => setSelectedTrim('gt')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
                selectedTrim === 'gt' ? 'bg-cyan-400 text-black font-semibold' : 'text-slate-400 hover:text-white'
              }`}
            >
              GT Touring
            </button>
            <button
              onClick={() => setSelectedTrim('track')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
                selectedTrim === 'track' ? 'bg-cyan-400 text-black font-semibold' : 'text-slate-400 hover:text-white'
              }`}
            >
              GT-AERO Track
            </button>
            <button
              onClick={() => setSelectedTrim('clubsport')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
                selectedTrim === 'clubsport' ? 'bg-cyan-400 text-black font-semibold' : 'text-slate-400 hover:text-white'
              }`}
            >
              R-Clubsport
            </button>
          </div>
        </div>

        {/* Big numbers strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          
          <div className="p-6 rounded-2xl bg-[#0d1017] border border-white/[0.08]">
            <span className="text-xs font-mono text-slate-400 block mb-1">0-100 KM/H (0-60 MPH)</span>
            <div className="text-3xl sm:text-4xl font-extrabold text-white font-mono tabular-nums">
              {current.sprint}
            </div>
            <span className="text-[11px] text-slate-400 mt-1 block">Rollout subtracted (1ft)</span>
          </div>

          <div className="p-6 rounded-2xl bg-[#0d1017] border border-white/[0.08]">
            <span className="text-xs font-mono text-slate-400 block mb-1">PEAK POWER OUTPUT</span>
            <div className="text-3xl sm:text-4xl font-extrabold text-cyan-300 font-mono tabular-nums">
              {current.power}
            </div>
            <span className="text-[11px] text-slate-400 mt-1 block">{current.torque} instantaneous</span>
          </div>

          <div className="p-6 rounded-2xl bg-[#0d1017] border border-white/[0.08]">
            <span className="text-xs font-mono text-slate-400 block mb-1">MAX DOWNFORCE</span>
            <div className="text-3xl sm:text-4xl font-extrabold text-white font-mono tabular-nums">
              {current.downforce}
            </div>
            <span className="text-[11px] text-slate-400 mt-1 block">At 285 km/h apex speed</span>
          </div>

          <div className="p-6 rounded-2xl bg-[#0d1017] border border-white/[0.08]">
            <span className="text-xs font-mono text-slate-400 block mb-1">TOP SPEED</span>
            <div className="text-3xl sm:text-4xl font-extrabold text-white font-mono tabular-nums">
              {current.topSpeed}
            </div>
            <span className="text-[11px] text-slate-400 mt-1 block">Electronically limited</span>
          </div>

        </div>

        {/* Detailed specs table */}
        <div className="bg-[#0d1017] border border-white/[0.08] rounded-2xl overflow-hidden">
          <div className="p-6 border-b border-white/[0.08] flex items-center justify-between">
            <h3 className="text-base font-semibold text-white">
              Engineering Architecture Summary ({current.name})
            </h3>
            <span className="text-xs font-mono text-cyan-400">ISO 9001 · FIA GT HOMOLOGATED</span>
          </div>

          <div className="divide-y divide-white/[0.04] text-xs sm:text-sm">
            <div className="grid grid-cols-1 sm:grid-cols-3 p-4 px-6 items-center hover:bg-white/[0.01]">
              <span className="text-slate-400 font-mono">CHASSIS & TUB</span>
              <span className="text-white font-medium sm:col-span-2">Pre-preg autoclave carbon fiber monocoque with aluminum subframes</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 p-4 px-6 items-center hover:bg-white/[0.01]">
              <span className="text-slate-400 font-mono">BATTERY PACK</span>
              <span className="text-white font-medium sm:col-span-2">105 kWh 800V silicon-anode matrix with sub-zero thermal conditioning</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 p-4 px-6 items-center hover:bg-white/[0.01]">
              <span className="text-slate-400 font-mono">BRAKING SYSTEM</span>
              <span className="text-white font-medium sm:col-span-2">Brembo 420mm front / 390mm rear carbon-ceramic discs with 10-piston calipers</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 p-4 px-6 items-center hover:bg-white/[0.01]">
              <span className="text-slate-400 font-mono">SUSPENSION</span>
              <span className="text-white font-medium sm:col-span-2">Double-wishbone pushrod layout with 4-way adjustable magnetorheological dampers</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 p-4 px-6 items-center hover:bg-white/[0.01]">
              <span className="text-slate-400 font-mono">DRY CURB WEIGHT</span>
              <span className="text-white font-medium sm:col-span-2 font-mono tabular-nums">{current.weight} (49.2% front / 50.8% rear distribution)</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

import React, { useState } from 'react';
import { Wind, Gauge, ShieldCheck, Sliders, ArrowUpRight } from 'lucide-react';

export const AeroSection: React.FC = () => {
  const [tunnelSpeed, setTunnelSpeed] = useState(240); // km/h
  const [drsActive, setDrsActive] = useState(false);

  // Dynamic physics calculation based on tunnel speed and DRS flap state
  const dragCoeff = drsActive ? 0.24 : 0.31;
  const downforceKg = Math.round(((tunnelSpeed / 100) ** 2) * (drsActive ? 180 : 340));
  const frontRearDistribution = drsActive ? '44% / 56%' : '48% / 52%';
  const airResistanceHp = Math.round(((tunnelSpeed / 100) ** 3) * dragCoeff * 18);

  return (
    <section id="telemetry" className="relative py-28 px-6 sm:px-12 bg-[#08090d] border-t border-white/[0.06]">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-cyan-400 uppercase mb-2">
              <Wind className="w-3.5 h-3.5" />
              <span>Computational Fluid Dynamics</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white font-display">
              Aerodynamic Downforce Architecture
            </h2>
          </div>
          <p className="text-slate-400 text-sm max-w-md">
            Simulating ground effect vortex flow and active wing deployment dynamically across velocity ranges.
          </p>
        </div>

        {/* Bento Grid layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Main interactive CFD wind tunnel panel */}
          <div className="lg:col-span-7 bg-[#0d1017] border border-white/[0.08] rounded-2xl p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden">
            {/* Visual background airflow vectors */}
            <div className="absolute inset-0 pointer-events-none opacity-20">
              <div className="absolute inset-0 automotive-grid" />
              {Array.from({ length: 8 }).map((_, i) => (
                <div 
                  key={i} 
                  className="absolute h-[1px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent w-full"
                  style={{ 
                    top: `${15 + i * 11}%`, 
                    animation: `pulse ${2 + (i % 3)}s infinite ease-in-out` 
                  }}
                />
              ))}
            </div>

            <div className="relative z-10">
              <div className="flex items-center justify-between mb-6">
                <span className="text-xs font-mono text-slate-400 tracking-wider">
                  VIRTUAL WIND TUNNEL LAB
                </span>
                <span className="text-xs font-mono px-2 py-0.5 rounded bg-cyan-950/60 text-cyan-300 border border-cyan-800/40">
                  {drsActive ? 'DRS OPEN (LOW DRAG)' : 'HIGH DOWNFORCE MODE'}
                </span>
              </div>

              {/* Live telemetry readouts */}
              <div className="grid grid-cols-3 gap-4 mb-8">
                <div className="p-4 rounded-xl bg-black/40 border border-white/[0.04]">
                  <span className="text-[11px] font-mono text-slate-400 block mb-1">DOWNFORCE</span>
                  <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono tabular-nums">
                    {downforceKg} <span className="text-xs text-cyan-400 font-normal">kg</span>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-black/40 border border-white/[0.04]">
                  <span className="text-[11px] font-mono text-slate-400 block mb-1">DRAG (Cd)</span>
                  <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono tabular-nums">
                    {dragCoeff.toFixed(2)}
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-black/40 border border-white/[0.04]">
                  <span className="text-[11px] font-mono text-slate-400 block mb-1">AERO LOAD</span>
                  <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono tabular-nums">
                    {frontRearDistribution}
                  </div>
                </div>
              </div>

              {/* Slider for tunnel velocity */}
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-slate-400">AIR STREAM VELOCITY</span>
                  <span className="text-cyan-400 font-bold">{tunnelSpeed} km/h ({(tunnelSpeed * 0.6213).toFixed(0)} mph)</span>
                </div>
                <input
                  type="range"
                  min="80"
                  max="380"
                  step="5"
                  value={tunnelSpeed}
                  onChange={(e) => setTunnelSpeed(Number(e.target.value))}
                  className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                />
                <div className="flex justify-between text-[10px] font-mono text-slate-500">
                  <span>80 km/h (City Flow)</span>
                  <span>240 km/h (Track Baseline)</span>
                  <span>380 km/h (Top Speed)</span>
                </div>
              </div>
            </div>

            {/* Bottom action controls */}
            <div className="relative z-10 pt-4 border-t border-white/[0.06] flex items-center justify-between gap-4">
              <button
                onClick={() => setDrsActive(!drsActive)}
                className={`px-4 py-2 rounded-lg text-xs font-mono font-medium transition-colors border ${
                  drsActive 
                    ? 'bg-cyan-400 text-black border-cyan-400 font-semibold' 
                    : 'bg-white/[0.04] text-slate-300 border-white/[0.08] hover:text-white'
                }`}
              >
                {drsActive ? 'Close DRS Flap' : 'Deploy DRS Wing Flap'}
              </button>

              <span className="text-xs text-slate-400 font-mono">
                Power loss to drag: <strong className="text-white">{airResistanceHp} HP</strong>
              </span>
            </div>
          </div>

          {/* Right column: 3 aerodynamic principles */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            
            <div className="p-6 rounded-2xl bg-[#0d1017] border border-white/[0.08]">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 rounded-lg bg-cyan-950/60 border border-cyan-800/40 text-cyan-400">
                  <Wind className="w-4 h-4" />
                </div>
                <h3 className="text-base font-semibold text-white">
                  Underbody Venturi Tunnels
                </h3>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Twin full-length carbon venturis sculpt a low-pressure vacuum zone beneath the floor, drawing the car down towards the track without adding air resistance.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#0d1017] border border-white/[0.08]">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 rounded-lg bg-blue-950/60 border border-blue-800/40 text-blue-400">
                  <Gauge className="w-4 h-4" />
                </div>
                <h3 className="text-base font-semibold text-white">
                  Dynamic Active Front Flaps
                </h3>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Dual electromechanical vanes in the front chin automatically adjust angle of attack every 12 milliseconds in reaction to steering yaw and brake pitch.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#0d1017] border border-white/[0.08]">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 rounded-lg bg-indigo-950/60 border border-indigo-800/40 text-indigo-400">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <h3 className="text-base font-semibold text-white">
                  Torsional Carbon Monocoque
                </h3>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Aerodynamic loads transfer directly into the hollow carbon monocoque spine, eliminating aerodynamic chassis flutter under severe cornering.
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

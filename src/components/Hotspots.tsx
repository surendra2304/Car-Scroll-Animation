import React, { useState } from 'react';
import { Info, X, Zap, Shield, Wind, Gauge } from 'lucide-react';

export interface HotspotData {
  id: string;
  xPercent: number; // Position percentage X
  yPercent: number; // Position percentage Y
  title: string;
  category: string;
  spec: string;
  description: string;
  icon: 'wind' | 'zap' | 'shield' | 'gauge';
}

export const HOTSPOTS: HotspotData[] = [
  {
    id: 'aero-splitter',
    xPercent: 14,
    yPercent: 66,
    title: 'Active Carbon Front Splitter',
    category: 'AERODYNAMICS',
    spec: '-280 kg Downforce at 220 km/h',
    description: 'Dynamic variable-angle vortex generators channel high-velocity air under the chassis to maintain suction grip without parasitic drag.',
    icon: 'wind'
  },
  {
    id: 'ceramic-brakes',
    xPercent: 25,
    yPercent: 68,
    title: 'Carbon-Silicon Ceramic Rotors',
    category: 'DECELERATION',
    spec: '420mm Discs · 10-Piston Monobloc',
    description: 'Resistant to thermal fade up to 1,150°C. Delivers 100-0 km/h emergency braking in under 28.4 meters.',
    icon: 'shield'
  },
  {
    id: 'battery-chassis',
    xPercent: 54,
    yPercent: 62,
    title: 'Structural 800V Cell-to-Pack',
    category: 'POWERTRAIN',
    spec: '105 kWh · 350 kW DC Fast Charge',
    description: 'Direct-bonded carbon casing forms part of the torsional rigidity architecture (48,000 Nm/deg stiffness rating).',
    icon: 'zap'
  },
  {
    id: 'active-spoiler',
    xPercent: 88,
    yPercent: 42,
    title: 'Bi-Plane Active Aero Wing',
    category: 'DOWNFORCE',
    spec: '+420 kg Airbrake & DRS Matrix',
    description: 'Deploys in 0.18 seconds to provide stability through rapid directional transitions and acts as an airbrake during hard braking.',
    icon: 'gauge'
  }
];

interface HotspotsOverlayProps {
  visible: boolean;
  activeHotspotId: string | null;
  onSelectHotspot: (id: string | null) => void;
}

export const HotspotsOverlay: React.FC<HotspotsOverlayProps> = ({
  visible,
  activeHotspotId,
  onSelectHotspot
}) => {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  if (!visible) return null;

  const activeSpot = HOTSPOTS.find(h => h.id === (activeHotspotId || hoveredId));

  const renderIcon = (icon: HotspotData['icon']) => {
    switch (icon) {
      case 'wind': return <Wind className="w-3.5 h-3.5 text-cyan-400" />;
      case 'shield': return <Shield className="w-3.5 h-3.5 text-emerald-400" />;
      case 'zap': return <Zap className="w-3.5 h-3.5 text-amber-400" />;
      case 'gauge': return <Gauge className="w-3.5 h-3.5 text-indigo-400" />;
    }
  };

  return (
    <div className="absolute inset-0 pointer-events-none z-20">
      {HOTSPOTS.map((spot) => {
        const isSelected = spot.id === activeHotspotId;
        const isHovered = spot.id === hoveredId;

        return (
          <div
            key={spot.id}
            style={{ left: `${spot.xPercent}%`, top: `${spot.yPercent}%` }}
            className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-auto"
          >
            {/* Pulsing ring button */}
            <button
              onClick={() => onSelectHotspot(isSelected ? null : spot.id)}
              onMouseEnter={() => setHoveredId(spot.id)}
              onMouseLeave={() => setHoveredId(null)}
              className="group relative flex items-center justify-center p-2 cursor-pointer focus:outline-none"
              aria-label={`Inspect ${spot.title}`}
            >
              <span className="absolute w-8 h-8 rounded-full border border-cyan-400/40 animate-ping opacity-75" />
              <span className="relative flex items-center justify-center w-6 h-6 rounded-full bg-black/80 border border-cyan-400/80 shadow-lg shadow-cyan-500/30 group-hover:scale-125 transition-transform duration-200">
                <span className="w-2 h-2 rounded-full bg-cyan-400" />
              </span>
              <span className="sr-only">{spot.title}</span>
            </button>
          </div>
        );
      })}

      {/* Popover Card */}
      {activeSpot && (
        <div 
          className="pointer-events-auto absolute bottom-8 right-8 max-w-sm w-full bg-[#0d1117]/95 backdrop-blur-md border border-white/[0.12] rounded-xl p-5 shadow-2xl shadow-black/80 animate-in fade-in zoom-in-95 duration-200"
        >
          <div className="flex items-start justify-between gap-4 mb-2">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-white/[0.06] border border-white/[0.08]">
                {renderIcon(activeSpot.icon)}
              </div>
              <div>
                <span className="text-[10px] font-mono tracking-wider text-cyan-400 uppercase">
                  {activeSpot.category}
                </span>
                <h4 className="text-sm font-semibold text-white">
                  {activeSpot.title}
                </h4>
              </div>
            </div>
            <button
              onClick={() => onSelectHotspot(null)}
              className="text-slate-400 hover:text-white p-1 rounded transition-colors"
              aria-label="Close details"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="my-2.5 px-3 py-1.5 rounded bg-black/50 border border-white/[0.06] flex items-center justify-between text-xs font-mono">
            <span className="text-slate-400">BENCHMARK</span>
            <span className="text-cyan-300 font-semibold">{activeSpot.spec}</span>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed">
            {activeSpot.description}
          </p>
        </div>
      )}
    </div>
  );
};

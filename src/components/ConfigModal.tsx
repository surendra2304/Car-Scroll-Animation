import React, { useState } from 'react';
import { X, Check, Sparkles, Shield, Palette } from 'lucide-react';

interface ConfigModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentColor: string;
  onSelectColor: (colorHex: string) => void;
}

export const FINISHES = [
  { id: 'obsidian', name: 'Obsidian Cyan Pearl', hex: '#38bdf8', previewColor: 'bg-cyan-400' },
  { id: 'titanium', name: 'Grigio Titanio', hex: '#94a3b8', previewColor: 'bg-slate-400' },
  { id: 'electric', name: 'Liquid Cobalt', hex: '#2563eb', previewColor: 'bg-blue-600' },
  { id: 'rosso', name: 'Monaco Rosso', hex: '#ef4444', previewColor: 'bg-red-500' },
  { id: 'amber', name: 'Circuit Marigold', hex: '#f59e0b', previewColor: 'bg-amber-400' },
  { id: 'emerald', name: 'British Racing Emerald', hex: '#10b981', previewColor: 'bg-emerald-500' },
];

export const ConfigModal: React.FC<ConfigModalProps> = ({
  isOpen,
  onClose,
  currentColor,
  onSelectColor
}) => {
  const [selectedAeroPack, setSelectedAeroPack] = useState<'track' | 'clubsport'>('track');
  const [savedNotice, setSavedNotice] = useState(false);

  if (!isOpen) return null;

  const handleSave = () => {
    setSavedNotice(true);
    setTimeout(() => {
      setSavedNotice(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl bg-[#0d1017] border border-white/[0.12] rounded-2xl p-6 sm:p-8 shadow-2xl shadow-black">
        
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-cyan-950/60 border border-cyan-800/40 text-cyan-400">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest">
                CUSTOM BESPOKE STUDIO
              </span>
              <h3 className="text-xl font-bold text-white font-display">
                Configure ITZFIZZ GT-AERO
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/[0.06] transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Finish Selector */}
        <div className="mb-6">
          <label className="flex items-center gap-2 text-xs font-mono text-slate-300 uppercase tracking-wider mb-3">
            <Palette className="w-3.5 h-3.5 text-cyan-400" />
            <span>Exterior Ambient Accent Color</span>
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {FINISHES.map((finish) => {
              const isSelected = currentColor === finish.hex;
              return (
                <button
                  key={finish.id}
                  onClick={() => onSelectColor(finish.hex)}
                  className={`p-3 rounded-xl border flex items-center gap-2.5 transition-all text-left ${
                    isSelected 
                      ? 'border-cyan-400 bg-cyan-950/30 text-white' 
                      : 'border-white/[0.08] bg-black/40 text-slate-400 hover:text-white hover:border-white/[0.15]'
                  }`}
                >
                  <span className={`w-4 h-4 rounded-full ${finish.previewColor} shrink-0 ring-2 ring-white/10`} />
                  <span className="text-xs font-medium truncate">{finish.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Aero Package */}
        <div className="mb-8">
          <label className="flex items-center gap-2 text-xs font-mono text-slate-300 uppercase tracking-wider mb-3">
            <Shield className="w-3.5 h-3.5 text-cyan-400" />
            <span>Aerodynamic Downforce Package</span>
          </label>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => setSelectedAeroPack('track')}
              className={`p-3.5 rounded-xl border text-left transition-all ${
                selectedAeroPack === 'track' 
                  ? 'border-cyan-400 bg-cyan-950/30' 
                  : 'border-white/[0.08] bg-black/40'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-bold text-white">Track Aero Spec</span>
                {selectedAeroPack === 'track' && <Check className="w-3.5 h-3.5 text-cyan-400" />}
              </div>
              <p className="text-[11px] text-slate-400">Carbon front splitter + active 420kg swan-neck rear wing.</p>
            </button>

            <button
              onClick={() => setSelectedAeroPack('clubsport')}
              className={`p-3.5 rounded-xl border text-left transition-all ${
                selectedAeroPack === 'clubsport' 
                  ? 'border-cyan-400 bg-cyan-950/30' 
                  : 'border-white/[0.08] bg-black/40'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-bold text-white">Le Mans Prototype</span>
                {selectedAeroPack === 'clubsport' && <Check className="w-3.5 h-3.5 text-cyan-400" />}
              </div>
              <p className="text-[11px] text-slate-400">Twin venturi tunnels + DRS dual-element active wing.</p>
            </button>
          </div>
        </div>

        {/* Footer actions */}
        <div className="flex items-center justify-between pt-4 border-t border-white/[0.08]">
          <span className="text-xs font-mono text-slate-400">
            Estimated Delivery: <strong className="text-white">Q3 2026</strong>
          </span>

          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-slate-400 hover:text-white transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-5 py-2 text-xs font-bold uppercase tracking-wider text-black bg-cyan-400 hover:bg-cyan-300 rounded-lg transition-all shadow-md shadow-cyan-400/20"
            >
              {savedNotice ? 'Applied To Hero!' : 'Apply Build'}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

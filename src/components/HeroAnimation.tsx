import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Play, Pause, RotateCcw, Target, Gauge, Wind, Compass, ChevronDown } from 'lucide-react';
import { HotspotsOverlay } from './Hotspots';
import { soundEngine } from '../utils/audio';

import heroSideImg from '../assets/images/car_hero_studio_side_1791559195185.jpg';
import frontQuarterImg from '../assets/images/car_front_quarter_action_1791559212385.jpg';

gsap.registerPlugin(ScrollTrigger);

interface HeroAnimationProps {
  onScrollProgressChange?: (progress: number) => void;
  carFinishColor?: string;
}

export const HeroAnimation: React.FC<HeroAnimationProps> = ({
  onScrollProgressChange,
  carFinishColor = '#38bdf8'
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const carWrapperRef = useRef<HTMLDivElement>(null);
  const carSideImgRef = useRef<HTMLImageElement>(null);
  const carFrontImgRef = useRef<HTMLImageElement>(null);
  const roadLinesRef = useRef<HTMLDivElement>(null);
  const speedoNumberRef = useRef<HTMLSpanElement>(null);
  const gForceRef = useRef<HTMLSpanElement>(null);

  const [scrollProgress, setScrollProgress] = useState(0);
  const [activePhase, setActivePhase] = useState<'stance' | 'acceleration' | 'apex' | 'telemetry'>('stance');
  const [speedVal, setSpeedVal] = useState(0);
  const [gForceVal, setGForceVal] = useState('0.00');
  const [showHotspots, setShowHotspots] = useState(true);
  const [activeHotspotId, setActiveHotspotId] = useState<string | null>(null);
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);
  const [viewAngle, setViewAngle] = useState<'side' | 'front'>('side');

  // Velocity smoothing ref
  const velocityRef = useRef(0);
  const autoPlayTweenRef = useRef<gsap.core.Tween | null>(null);

  // Split headline text into individual letters for smooth staggered entrance
  const headlinePhrase = 'W E L C O M E   I T Z F I Z Z';
  const headlineLetters = headlinePhrase.split('');

  // Initial Load Animation (Requirement 2)
  useEffect(() => {
    const ctx = gsap.context(() => {
      const loadTl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      // 1. Headline stagger reveal (fade + movement + letter spacing settling)
      loadTl.fromTo(
        '.hero-char',
        {
          opacity: 0,
          y: 35,
          scale: 0.92,
          filter: 'blur(10px)'
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          filter: 'blur(0px)',
          stagger: 0.035,
          duration: 1.2
        }
      );

      // 2. Kicker and tagline
      loadTl.fromTo(
        '.hero-kicker',
        { opacity: 0, y: -15 },
        { opacity: 1, y: 0, duration: 0.8 },
        '-=0.8'
      );

      // 3. Car initial smooth entrance
      loadTl.fromTo(
        carWrapperRef.current,
        {
          opacity: 0,
          scale: 0.94,
          x: -60,
          filter: 'brightness(0.4)'
        },
        {
          opacity: 1,
          scale: 1,
          x: 0,
          filter: 'brightness(1)',
          duration: 1.4
        },
        '-=0.9'
      );

      // 4. Statistics animate in one by one with a subtle delay (Requirement 2)
      loadTl.fromTo(
        '.hero-stat-box',
        {
          opacity: 0,
          y: 28,
          scale: 0.96
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          stagger: 0.12,
          duration: 0.9,
          ease: 'power2.out'
        },
        '-=0.6'
      );

      // 5. Controls and telemetry HUD reveal
      loadTl.fromTo(
        '.hero-hud',
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.8 },
        '-=0.5'
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Scroll-Driven Animation (Requirement 3 & 4)
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const ctx = gsap.context(() => {
      // Create master scrub timeline tied to scroll position
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1.1, // Smooth interpolation / inertia easing
          onUpdate: (self) => {
            const p = self.progress;
            setScrollProgress(p);
            if (onScrollProgressChange) onScrollProgressChange(p);

            // Phase tracking
            if (p < 0.28) setActivePhase('stance');
            else if (p < 0.6) setActivePhase('acceleration');
            else if (p < 0.88) setActivePhase('apex');
            else setActivePhase('telemetry');

            // Scroll velocity feedback
            const velocity = Math.abs(self.getVelocity());
            velocityRef.current = velocity;
            const normalizedVel = Math.min(1, velocity / 1800);
            soundEngine.updateSpeed(normalizedVel);

            // Calculate instantaneous speedometer readout
            const targetSpeed = Math.round(p * 290 + normalizedVel * 45);
            setSpeedVal(targetSpeed);

            // Calculate G-force readout
            const lateralG = (normalizedVel * 1.35 + p * 0.4).toFixed(2);
            setGForceVal(lateralG);
          }
        }
      });

      // -------------------------------------------------------------
      // 0% -> 35%: Phase 1 Stance to Acceleration
      // Headline subtly elevates and expands letter tracking
      // Car translates right with dynamic forward motion & pitch
      // -------------------------------------------------------------
      scrollTl.to(
        headlineRef.current,
        {
          y: -100,
          opacity: 0.2,
          scale: 0.92,
          letterSpacing: '0.45em',
          ease: 'none'
        },
        0
      );

      scrollTl.to(
        statsRef.current,
        {
          y: -80,
          opacity: 0,
          ease: 'power1.in'
        },
        0
      );

      // Car side motion: translates smoothly, tilts slightly, zooms forward
      scrollTl.to(
        carWrapperRef.current,
        {
          x: '14vw',
          y: '-3vh',
          scale: 1.14,
          rotationZ: -1.4,
          ease: 'power1.out'
        },
        0.05
      );

      // Road speed streak acceleration
      if (roadLinesRef.current) {
        scrollTl.to(
          roadLinesRef.current,
          {
            x: '-35vw',
            opacity: 0.8,
            ease: 'none'
          },
          0
        );
      }

      // -------------------------------------------------------------
      // 35% -> 70%: Phase 2 Full Sprint & Angle Transition
      // Car drives across the canvas, side view transitions to dynamic 3/4
      // -------------------------------------------------------------
      scrollTl.to(
        carWrapperRef.current,
        {
          x: '-4vw',
          y: '-5vh',
          scale: 1.28,
          rotationZ: 0.8,
          ease: 'power1.inOut'
        },
        0.35
      );

      // Crossfade to front 3/4 angle as car approaches the apex
      if (carFrontImgRef.current && carSideImgRef.current) {
        scrollTl.to(
          carSideImgRef.current,
          {
            opacity: 0,
            scale: 1.05,
            ease: 'power2.inOut'
          },
          0.5
        );
        scrollTl.to(
          carFrontImgRef.current,
          {
            opacity: 1,
            scale: 1,
            ease: 'power2.inOut'
          },
          0.5
        );
      }

      // -------------------------------------------------------------
      // 70% -> 100%: Phase 3 Apex & Telemetry Exit
      // Powerful front quarter stance, dramatic lighting, and exit flow
      // -------------------------------------------------------------
      scrollTl.to(
        carWrapperRef.current,
        {
          x: '0vw',
          y: '-8vh',
          scale: 1.38,
          rotationZ: 0,
          ease: 'power2.out'
        },
        0.7
      );

      // Road lines deep sweep
      if (roadLinesRef.current) {
        scrollTl.to(
          roadLinesRef.current,
          {
            x: '-80vw',
            opacity: 0.2,
            ease: 'none'
          },
          0.65
        );
      }
    }, container);

    return () => ctx.revert();
  }, [onScrollProgressChange]);

  // Interactive timeline scrubber jumps
  const jumpToPhase = (targetProgress: number) => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const scrollHeight = container.scrollHeight - window.innerHeight;
    const targetScrollY = container.offsetTop + scrollHeight * targetProgress;

    window.scrollTo({
      top: targetScrollY,
      behavior: 'smooth'
    });
  };

  // Toggle Auto-Drive Simulation
  const toggleAutoPlay = () => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const scrollHeight = container.scrollHeight - window.innerHeight;
    const startY = container.offsetTop;
    const endY = startY + scrollHeight;

    if (isAutoPlaying) {
      if (autoPlayTweenRef.current) autoPlayTweenRef.current.kill();
      setIsAutoPlaying(false);
    } else {
      setIsAutoPlaying(true);
      const isAtEnd = window.scrollY >= endY - 20;
      const targetY = isAtEnd ? startY : endY;
      const distance = Math.abs(window.scrollY - targetY);
      const duration = Math.max(3, distance / 400);

      const obj = { y: window.scrollY };
      autoPlayTweenRef.current = gsap.to(obj, {
        y: targetY,
        duration: duration,
        ease: 'power1.inOut',
        onUpdate: () => {
          window.scrollTo(0, obj.y);
        },
        onComplete: () => {
          setIsAutoPlaying(false);
        }
      });
    }
  };

  return (
    <section 
      id="hero"
      ref={containerRef}
      className="relative w-full h-[320vh] bg-[#060709] selection:bg-cyan-500/30"
    >
      {/* Sticky Viewport Anchor (100vh) */}
      <div 
        ref={viewportRef}
        className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between pt-20 pb-8 px-6 sm:px-12 pointer-events-auto"
      >
        {/* Background Visual Texture & Lighting */}
        <div className="absolute inset-0 pointer-events-none z-0">
          {/* Subtle radial ambient floor glow */}
          <div 
            className="absolute bottom-12 left-1/2 -translate-x-1/2 w-[80vw] max-w-5xl h-[350px] rounded-full blur-[120px] opacity-25 transition-colors duration-500"
            style={{ backgroundColor: carFinishColor }}
          />

          {/* Precision engineering grid */}
          <div className="absolute inset-0 automotive-grid opacity-20" />

          {/* Speed streaking road lines */}
          <div 
            ref={roadLinesRef}
            className="absolute bottom-16 left-0 right-[-100vw] h-[2px] opacity-20 flex gap-12"
          >
            {Array.from({ length: 40 }).map((_, i) => (
              <div 
                key={i} 
                className="h-[2px] w-24 bg-gradient-to-r from-transparent via-cyan-400 to-transparent shrink-0" 
              />
            ))}
          </div>

          {/* Vignette overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#060709] via-transparent to-[#060709]/80" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#060709]/90 via-transparent to-[#060709]/90" />
        </div>

        {/* ============================================================== */}
        {/* Top Header Block: Kicker + Letter-Spaced Headline (Requirement 1) */}
        {/* ============================================================== */}
        <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col items-center text-center mt-2">
          
          {/* Clean Unboxed Kicker (No Pill Discipline) */}
          <div className="hero-kicker flex items-center gap-3 text-[11px] font-mono tracking-[0.25em] text-cyan-400 uppercase mb-3">
            <span>AERODYNAMIC PROTOTYPE</span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span>SCROLL-DRIVEN MOTION ARCHITECTURE</span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span>ITZFIZZ EXPERIMENTAL</span>
          </div>

          {/* Letter-Spaced Headline: W E L C O M E   I T Z F I Z Z */}
          <h1 
            ref={headlineRef}
            className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-[0.3em] sm:tracking-[0.45em] text-white uppercase font-display select-none py-1 drop-shadow-2xl"
          >
            {headlineLetters.map((char, index) => (
              <span 
                key={index} 
                className="hero-char inline-block transition-transform duration-100"
              >
                {char === ' ' ? '\u00A0' : char}
              </span>
            ))}
          </h1>

          <p className="hero-kicker text-xs sm:text-sm text-slate-400 tracking-wider max-w-xl mt-2 font-normal">
            Precision scroll dynamics mapped to aerodynamic physics and high-velocity kinematics.
          </p>
        </div>

        {/* ============================================================== */}
        {/* Center: Main Visual Car Element (Requirement 1 & 3) */}
        {/* ============================================================== */}
        <div className="relative z-10 w-full max-w-6xl mx-auto flex-1 flex items-center justify-center my-auto min-h-[300px]">
          <div 
            ref={carWrapperRef}
            className="hw-accelerate relative w-full max-w-4xl aspect-[16/9] flex items-center justify-center drop-shadow-[0_25px_35px_rgba(0,0,0,0.9)]"
          >
            {/* View 1: Studio Profile Side View */}
            <img 
              ref={carSideImgRef}
              src={heroSideImg} 
              alt="ITZFIZZ Carbon Hypercar Studio Profile"
              className="absolute inset-0 w-full h-full object-contain filter contrast-[1.08] select-none pointer-events-none transition-opacity duration-300"
              referrerPolicy="no-referrer"
            />

            {/* View 2: Dynamic 3/4 Front Attack View (Crossfades on scroll or manual toggle) */}
            <img 
              ref={carFrontImgRef}
              src={frontQuarterImg} 
              alt="ITZFIZZ Hypercar Front Three-Quarter Dynamic Apex"
              className={`absolute inset-0 w-full h-full object-contain filter contrast-[1.08] select-none pointer-events-none transition-opacity duration-500 ${
                viewAngle === 'front' ? 'opacity-100' : 'opacity-0'
              }`}
              referrerPolicy="no-referrer"
            />

            {/* Interactive Engineering Hotspots */}
            <HotspotsOverlay
              visible={showHotspots && scrollProgress < 0.85}
              activeHotspotId={activeHotspotId}
              onSelectHotspot={setActiveHotspotId}
            />

            {/* Ground contact shadow reflection */}
            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-[85%] h-8 bg-black/80 blur-xl rounded-full" />
          </div>
        </div>

        {/* ============================================================== */}
        {/* Bottom Section: Impact Metrics & Statistics (Requirement 1 & 2) */}
        {/* ============================================================== */}
        <div 
          ref={statsRef}
          className="relative z-10 w-full max-w-7xl mx-auto"
        >
          {/* 4 Quantitative Impact Metrics with clean unboxed styling */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 pt-4 border-t border-white/[0.08]">
            
            {/* Metric 1 */}
            <div className="hero-stat-box flex flex-col p-3 rounded-lg bg-white/[0.02] border border-white/[0.04]">
              <div className="flex items-baseline gap-1.5">
                <span className="text-2xl sm:text-3xl font-extrabold text-white font-mono tracking-tight tabular-nums">
                  98.6%
                </span>
                <span className="text-[10px] font-mono text-cyan-400 font-semibold uppercase">
                  AERO EFFICIENCY
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-1 leading-snug">
                Ground effect downforce at 280 km/h with zero parasitic vortex drag.
              </p>
            </div>

            {/* Metric 2 */}
            <div className="hero-stat-box flex flex-col p-3 rounded-lg bg-white/[0.02] border border-white/[0.04]">
              <div className="flex items-baseline gap-1.5">
                <span className="text-2xl sm:text-3xl font-extrabold text-white font-mono tracking-tight tabular-nums">
                  2.1s
                </span>
                <span className="text-[10px] font-mono text-cyan-400 font-semibold uppercase">
                  0-100 KM/H
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-1 leading-snug">
                Sub-second initial wheel torque response via silicon carbide inverters.
              </p>
            </div>

            {/* Metric 3 */}
            <div className="hero-stat-box flex flex-col p-3 rounded-lg bg-white/[0.02] border border-white/[0.04]">
              <div className="flex items-baseline gap-1.5">
                <span className="text-2xl sm:text-3xl font-extrabold text-white font-mono tracking-tight tabular-nums">
                  1,250
                </span>
                <span className="text-[10px] font-mono text-cyan-400 font-semibold uppercase">
                  HORSEPOWER
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-1 leading-snug">
                Dual permanent-magnet synchronous stators with active yaw vectoring.
              </p>
            </div>

            {/* Metric 4 */}
            <div className="hero-stat-box flex flex-col p-3 rounded-lg bg-white/[0.02] border border-white/[0.04]">
              <div className="flex items-baseline gap-1.5">
                <span className="text-2xl sm:text-3xl font-extrabold text-white font-mono tracking-tight tabular-nums">
                  99.2%
                </span>
                <span className="text-[10px] font-mono text-cyan-400 font-semibold uppercase">
                  THERMAL RETENTION
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-1 leading-snug">
                Cryogenic dielectric fluid channel loop preserving continuous peak output.
              </p>
            </div>

          </div>
        </div>

        {/* ============================================================== */}
        {/* Floating Interactive Controls & Telemetry HUD */}
        {/* ============================================================== */}
        <div className="hero-hud relative z-20 w-full max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4 mt-4 pt-3 border-t border-white/[0.06] text-xs">
          
          {/* Left: Scroll Phase Preset Selector Buttons */}
          <div className="flex items-center gap-1.5 bg-black/60 backdrop-blur-md p-1 rounded-lg border border-white/[0.08]">
            <button
              onClick={() => jumpToPhase(0)}
              className={`px-2.5 py-1 rounded text-[11px] font-medium transition-all ${
                activePhase === 'stance' 
                  ? 'bg-cyan-400 text-black font-semibold shadow-sm' 
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              01 Stance
            </button>
            <button
              onClick={() => jumpToPhase(0.35)}
              className={`px-2.5 py-1 rounded text-[11px] font-medium transition-all ${
                activePhase === 'acceleration' 
                  ? 'bg-cyan-400 text-black font-semibold shadow-sm' 
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              02 Launch
            </button>
            <button
              onClick={() => jumpToPhase(0.72)}
              className={`px-2.5 py-1 rounded text-[11px] font-medium transition-all ${
                activePhase === 'apex' 
                  ? 'bg-cyan-400 text-black font-semibold shadow-sm' 
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              03 Apex
            </button>
            <button
              onClick={() => jumpToPhase(0.98)}
              className={`px-2.5 py-1 rounded text-[11px] font-medium transition-all ${
                activePhase === 'telemetry' 
                  ? 'bg-cyan-400 text-black font-semibold shadow-sm' 
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              04 Specs
            </button>
          </div>

          {/* Center: Live Telemetry Gauge Display */}
          <div className="hidden sm:flex items-center gap-6 text-slate-400 font-mono text-[11px]">
            <div className="flex items-center gap-2">
              <Gauge className="w-3.5 h-3.5 text-cyan-400" />
              <span>SPEED:</span>
              <span ref={speedoNumberRef} className="text-white font-bold tabular-nums">
                {speedVal} km/h
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Compass className="w-3.5 h-3.5 text-indigo-400" />
              <span>LATERAL:</span>
              <span ref={gForceRef} className="text-white font-bold tabular-nums">
                {gForceVal} G
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Wind className="w-3.5 h-3.5 text-emerald-400" />
              <span>PROGRESS:</span>
              <span className="text-cyan-300 font-bold tabular-nums">
                {Math.round(scrollProgress * 100)}%
              </span>
            </div>
          </div>

          {/* Right: Interactive Toggles (Auto-drive, Hotspots, Reset) */}
          <div className="flex items-center gap-2">
            <button
              onClick={toggleAutoPlay}
              className="px-3 py-1 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] text-slate-300 hover:text-white border border-white/[0.08] transition-colors flex items-center gap-1.5 text-[11px]"
              title="Smoothly simulate vehicle drive through scroll sequence"
            >
              {isAutoPlaying ? <Pause className="w-3 h-3 text-cyan-400" /> : <Play className="w-3 h-3 text-cyan-400" />}
              <span>{isAutoPlaying ? 'Pause Drive' : 'Auto-Drive Demo'}</span>
            </button>

            <button
              onClick={() => setShowHotspots(!showHotspots)}
              className={`px-2.5 py-1 rounded-lg border transition-colors flex items-center gap-1.5 text-[11px] ${
                showHotspots 
                  ? 'bg-cyan-400/10 border-cyan-400/40 text-cyan-300' 
                  : 'bg-white/[0.04] border-white/[0.08] text-slate-400 hover:text-white'
              }`}
              title="Toggle interactive engineering inspect pins"
            >
              <Target className="w-3 h-3" />
              <span className="hidden md:inline">Inspect Pins</span>
            </button>

            <button
              onClick={() => jumpToPhase(0)}
              className="p-1 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] text-slate-400 hover:text-white border border-white/[0.08] transition-colors"
              title="Reset to initial stance"
              aria-label="Reset scroll to beginning"
            >
              <RotateCcw className="w-3 h-3" />
            </button>
          </div>

        </div>

        {/* Scroll indicator prompt at bottom */}
        {scrollProgress < 0.05 && (
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex flex-col items-center pointer-events-none animate-bounce opacity-60">
            <span className="text-[10px] font-mono tracking-widest text-slate-400 uppercase">
              Scroll To Drive
            </span>
            <ChevronDown className="w-3.5 h-3.5 text-cyan-400" />
          </div>
        )}

      </div>
    </section>
  );
};

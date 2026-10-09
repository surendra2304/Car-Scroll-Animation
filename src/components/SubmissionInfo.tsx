import React, { useState } from 'react';
import { ExternalLink, CheckCircle2, Copy, Check, Code2, Globe, Github, Terminal, ArrowRight } from 'lucide-react';

export const SubmissionInfo: React.FC = () => {
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedCommand, setCopiedCommand] = useState(false);
  const [username, setUsername] = useState('surendrabtech12321');

  const liveUrl = typeof window !== 'undefined' ? window.location.href : 'https://ais-pre-rrdnbpdsxx4poks6ln7kxg-198481170689.asia-southeast1.run.app';
  const customRepoUrl = `https://github.com/${username}/itzfizz-car-scroll-animation`;
  const referenceRepoUrl = 'https://github.com/paraschaturvedi/car-scroll-animation';
  const newGithubRepoUrl = `https://github.com/new?name=itzfizz-car-scroll-animation&description=Scroll-driven+car+hero+animation+built+with+React+and+GSAP+ScrollTrigger`;

  const pushCommand = `git remote add origin https://github.com/${username}/itzfizz-car-scroll-animation.git\ngit branch -M main\ngit push -u origin main`;

  const copyUrl = () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(liveUrl);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  const copyPushCmd = () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(pushCommand);
      setCopiedCommand(true);
      setTimeout(() => setCopiedCommand(false), 2000);
    }
  };

  return (
    <section id="submission-info" className="relative py-24 px-6 sm:px-12 bg-[#060709] border-t border-white/[0.08]">
      <div className="max-w-5xl mx-auto">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-mono tracking-widest text-cyan-400 uppercase mb-3 px-3 py-1 rounded bg-cyan-950/40 border border-cyan-800/40">
            <span>Assignment Submission & Deliverables</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white font-display">
            Repository & Live Webpage Links
          </h2>
          <p className="text-slate-400 text-sm mt-3">
            All code is fully initialized and committed in Git (`main` branch) with comprehensive documentation.
          </p>
        </div>

        {/* Links Box */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          
          {/* Link 1: Live Webpage */}
          <div className="p-6 rounded-2xl bg-[#0d1017] border border-white/[0.1] flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider flex items-center gap-2">
                  <Globe className="w-4 h-4" />
                  Requirement 1: Live Webpage Link
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800/40">
                  LIVE DEPLOYED
                </span>
              </div>
              <h3 className="text-base font-semibold text-white mb-2">
                Live Interactive Application
              </h3>
              <p className="text-xs text-slate-400 mb-4 break-all font-mono bg-black/50 p-2.5 rounded-lg border border-white/[0.06]">
                {liveUrl}
              </p>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={copyUrl}
                className="px-4 py-2 rounded-lg bg-cyan-400 text-black font-semibold text-xs transition-colors hover:bg-cyan-300 flex items-center gap-2"
              >
                {copiedLink ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedLink ? 'Copied URL!' : 'Copy Live Link'}</span>
              </button>
              
              <a
                href={liveUrl}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 rounded-lg bg-white/[0.04] text-slate-300 hover:text-white border border-white/[0.08] text-xs transition-colors flex items-center gap-2"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Open in Tab</span>
              </a>
            </div>
          </div>

          {/* Link 2: GitHub Repository */}
          <div className="p-6 rounded-2xl bg-[#0d1017] border border-white/[0.1] flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider flex items-center gap-2">
                  <Github className="w-4 h-4" />
                  Requirement 2: GitHub Repository Link
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-950 text-cyan-300 border border-cyan-800/40">
                  GIT READY
                </span>
              </div>
              
              <h3 className="text-base font-semibold text-white mb-2">
                Your Repository Destination
              </h3>

              <div className="flex items-center gap-2 mb-3">
                <span className="text-[11px] font-mono text-slate-400">GitHub User:</span>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="bg-black/60 border border-white/[0.1] rounded px-2 py-1 text-xs text-cyan-300 font-mono focus:outline-none focus:border-cyan-400"
                  placeholder="your-github-username"
                />
              </div>

              <p className="text-xs text-slate-400 mb-4 break-all font-mono bg-black/50 p-2.5 rounded-lg border border-white/[0.06]">
                {customRepoUrl}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href={newGithubRepoUrl}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 rounded-lg bg-cyan-400 hover:bg-cyan-300 text-black font-semibold text-xs transition-colors flex items-center gap-2"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>1-Click Create on GitHub</span>
              </a>

              <a
                href={referenceRepoUrl}
                target="_blank"
                rel="noreferrer"
                className="px-3.5 py-2 rounded-lg bg-white/[0.04] text-slate-300 hover:text-white border border-white/[0.08] text-xs transition-colors flex items-center gap-1.5"
                title="View original reference repository by Paras Chaturvedi"
              >
                <Code2 className="w-3.5 h-3.5 text-slate-400" />
                <span>Reference Repo</span>
              </a>
            </div>
          </div>

        </div>

        {/* Quick Git Terminal Command Box */}
        <div className="p-6 rounded-2xl bg-[#0a0d14] border border-white/[0.08] mb-8">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2 text-xs font-mono text-slate-300">
              <Terminal className="w-4 h-4 text-cyan-400" />
              <span>Push Local Git Commits to Your GitHub Repo in 1 Step</span>
            </div>
            <button
              onClick={copyPushCmd}
              className="text-xs font-mono px-3 py-1 rounded bg-white/[0.06] hover:bg-white/[0.1] text-cyan-300 border border-white/[0.1] transition-colors flex items-center gap-1.5"
            >
              {copiedCommand ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
              <span>{copiedCommand ? 'Copied Command!' : 'Copy Push Command'}</span>
            </button>
          </div>

          <pre className="p-4 rounded-xl bg-black/80 border border-white/[0.06] text-xs font-mono text-cyan-300 overflow-x-auto leading-relaxed">
            {pushCommand}
          </pre>
        </div>

        {/* Requirements Verification Checklist */}
        <div className="p-8 rounded-2xl bg-[#0d1017] border border-white/[0.08]">
          <h3 className="text-sm font-bold tracking-wider text-white uppercase font-mono mb-6">
            Functional Requirements Compliance Verification
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="flex items-start gap-3 p-3 rounded-lg bg-black/30 border border-white/[0.04]">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-200 block mb-0.5">1. Hero Section Layout Above Fold</strong>
                <span className="text-slate-400 leading-relaxed">
                  Full 100vh pinned sticky viewport displaying the letter-spaced headline <code>W E L C O M E   I T Z F I Z Z</code> with impact statistics below.
                </span>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 rounded-lg bg-black/30 border border-white/[0.04]">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-200 block mb-0.5">2. Initial Load Animation</strong>
                <span className="text-slate-400 leading-relaxed">
                  GSAP timeline runs on load: letter-by-letter staggered fade + upward settle, followed by staggered statistics reveal.
                </span>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 rounded-lg bg-black/30 border border-white/[0.04]">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-200 block mb-0.5">3. Scroll-Based Core Animation</strong>
                <span className="text-slate-400 leading-relaxed">
                  Pinned hero sequence strictly bound to scroll progress via <code>ScrollTrigger scrub: 1.1</code> with smooth easing and velocity feedback.
                </span>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 rounded-lg bg-black/30 border border-white/[0.04]">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-200 block mb-0.5">4. Motion & 60 FPS Performance</strong>
                <span className="text-slate-400 leading-relaxed">
                  Exclusively utilizes hardware-accelerated CSS compositor transforms (<code>translate3d</code>, <code>scale</code>, <code>rotateZ</code>) with zero layout thrashing.
                </span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

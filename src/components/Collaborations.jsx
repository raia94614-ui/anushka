import React from 'react';
import { 
  Sparkles, 
  CheckCircle2, 
  Clock, 
  Target, 
  ArrowRight, 
  FileText, 
  Flame, 
  Award,
  Zap 
} from 'lucide-react';
import { creatorData as defaultCreatorData } from '../data/creatorData';

export const Collaborations = ({ data = defaultCreatorData, onSelectPackage, onOpenMediaKit }) => {
  const currentData = data || defaultCreatorData;
  const brand = currentData.brand;
  const packages = currentData.collaborations || [];

  const scrollToContact = (packageName = '') => {
    if (onSelectPackage) {
      onSelectPackage(packageName);
    }
    const el = document.querySelector('#contact');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="collaborations" className="py-24 relative overflow-hidden bg-[#0c0e17]/60">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-rose-600/10 via-purple-600/10 to-amber-500/10 blur-[150px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-xs font-mono uppercase tracking-widest text-rose-400 mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Brand Partnerships & Production Services</span>
          </div>

          <h2 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-tight mb-4">
            Let's Create <span className="text-instagram-gradient">Something Together.</span>
          </h2>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Aesthetic creator partnerships, viral short-form styling, and campaign coverage tailored to resonate with the modern digital audience of {brand.handle}.
          </p>

          {/* Media Kit CTA Button in Header */}
          <div className="mt-6 flex items-center justify-center gap-3">
            <button
              onClick={onOpenMediaKit}
              className="px-5 py-2.5 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/15 text-xs font-medium text-slate-200 hover:text-white transition-all flex items-center gap-2 cursor-pointer shadow-lg shadow-black/20"
            >
              <FileText className="w-4 h-4 text-purple-400" />
              <span>Explore Audience Demographics & Rate Card</span>
            </button>
          </div>
        </div>

        {/* Collaboration Packages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {packages.map((collab) => (
            <div
              key={collab.id}
              className={`relative rounded-3xl p-6 flex flex-col justify-between transition-all duration-300 ${
                collab.recommended
                  ? 'bg-[#151829] border-2 border-rose-500/60 shadow-2xl shadow-rose-500/15 lg:-translate-y-2'
                  : 'bg-[#11131E]/80 border border-white/[0.08] hover:border-white/20'
              }`}
            >
              {/* Recommended Top Badge */}
              {collab.recommended && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-gradient-to-r from-amber-500 via-rose-500 to-purple-600 text-white text-[10px] font-bold uppercase tracking-wider shadow-lg flex items-center gap-1">
                  <Flame className="w-3 h-3" />
                  <span>Most Popular</span>
                </div>
              )}

              <div>
                {/* Badge / Tier */}
                <div className="flex items-center justify-between mb-4">
                  <span className="px-2.5 py-1 rounded-lg bg-white/[0.05] border border-white/10 text-[10px] font-mono font-semibold text-rose-300">
                    {collab.badge}
                  </span>
                </div>

                {/* Title */}
                <h3 className="font-display font-bold text-lg text-white mb-2 leading-snug">
                  {collab.title}
                </h3>

                {/* Tagline */}
                <p className="text-xs text-slate-400 leading-relaxed mb-6">
                  {collab.tagline}
                </p>

                {/* Deliverables Checklist */}
                <div className="space-y-2.5 mb-6 pt-4 border-t border-white/[0.08]">
                  <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block mb-2">
                    What's Included:
                  </span>
                  {collab.deliverables.map((item, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-slate-300">
                      <CheckCircle2 className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                      <span className="leading-tight">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Card Footer: Turnaround & CTA */}
              <div className="pt-4 border-t border-white/[0.08] flex flex-col gap-3">
                <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-amber-400" />
                    <span>Turnaround:</span>
                  </span>
                  <span className="text-white font-medium">{collab.turnaround}</span>
                </div>

                <button
                  onClick={() => scrollToContact(collab.title)}
                  className={`w-full py-3 rounded-xl font-semibold text-xs transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer ${
                    collab.recommended
                      ? 'bg-gradient-to-r from-amber-500 via-rose-500 to-purple-600 text-white shadow-lg shadow-rose-500/25 hover:opacity-95'
                      : 'bg-white/[0.06] hover:bg-white/[0.12] text-white border border-white/10'
                  }`}
                >
                  <span>Select Package</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Big Bottom Highlight Banner */}
        <div className="relative rounded-3xl p-8 sm:p-12 overflow-hidden bg-gradient-to-r from-purple-950/40 via-rose-950/30 to-amber-950/20 border border-white/10 flex flex-col md:flex-row items-center justify-between gap-8">
          
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/20 text-rose-300 text-xs font-mono mb-3">
              <Award className="w-3.5 h-3.5" />
              <span>Custom Brand & Event Retainers</span>
            </div>
            <h3 className="font-display font-bold text-2xl sm:text-3xl text-white mb-2">
              Need a Custom Campaign or Lookbook Shoot?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              We specialize in custom styling partnerships, curated product unboxings, long-term brand equity retainers, and aesthetic creator integrations.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 shrink-0 w-full md:w-auto">
            <button
              onClick={() => scrollToContact('Custom Enterprise Inquiry')}
              className="px-8 py-3.5 rounded-2xl font-bold text-sm text-white bg-gradient-to-r from-amber-500 via-rose-500 to-purple-600 shadow-xl shadow-rose-500/30 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Let's Collaborate</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};

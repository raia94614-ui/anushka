import React from 'react';
import { 
  Camera, 
  Zap, 
  ShieldCheck, 
  HeartHandshake, 
  Sparkles, 
  Sliders, 
  Layers, 
  Target 
} from 'lucide-react';
import { InstagramIcon } from './BrandIcons';
import { creatorData as defaultCreatorData } from '../data/creatorData';

const pillarIcons = {
  Camera: Camera,
  Zap: Zap,
  ShieldCheck: ShieldCheck,
  HeartHandshake: HeartHandshake
};

export const About = ({ data = defaultCreatorData }) => {
  const currentData = data || defaultCreatorData;
  const brand = currentData.brand;
  const pillars = currentData.aboutPillars || defaultCreatorData.aboutPillars;

  return (
    <section id="about" className="py-24 relative overflow-hidden">
      {/* Background glow accent */}
      <div className="absolute top-1/3 -right-40 w-96 h-96 bg-purple-600/10 rounded-full blur-[120px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Visual Storytelling Collage */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Main Primary Image */}
              <div className="relative rounded-3xl overflow-hidden border border-white/10 shadow-2xl group">
                <img 
                  src={brand.coverImage || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1000&q=80"} 
                  alt={`${brand.name} - Documenting life in my element`} 
                  className="w-full h-[480px] object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#090A0F] via-transparent to-black/20" />
                
                {/* Overlay Badge at Bottom of Image */}
                <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-[#090A0F]/85 backdrop-blur-md border border-white/10 flex items-center justify-between shadow-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-rose-500 to-purple-600 flex items-center justify-center text-white shadow-md shadow-rose-500/20">
                      <Camera className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-white">Visual Aesthetic</h4>
                      <p className="text-[11px] text-slate-400 font-mono">In My Element</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono text-emerald-400 px-2 py-1 rounded bg-emerald-500/10 border border-emerald-500/20">
                    {brand.handle}
                  </span>
                </div>
              </div>

              {/* Floating Second Image (Top-Right overlap) */}
              <div className="hidden sm:block absolute -top-8 -right-8 w-44 h-44 rounded-2xl overflow-hidden border-2 border-[#090A0F] shadow-2xl group">
                <img 
                  src={currentData.featuredPosts?.[0]?.image || "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=400&q=80"} 
                  alt="Fashion and lifestyle styling" 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-2.5">
                  <span className="text-[10px] font-medium text-white/90">Curated Style</span>
                </div>
              </div>

              {/* Verified Creator Sticker */}
              <div className="absolute -bottom-5 -left-4 px-4 py-2.5 rounded-2xl bg-[#161827] border border-white/10 shadow-xl flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-rose-500/20 flex items-center justify-center text-rose-400">
                  <InstagramIcon className="w-4 h-4" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[11px] font-semibold text-white">{brand.displayName || brand.name}</span>
                  <span className="text-[9px] text-slate-400 font-mono">{brand.handle}</span>
                </div>
              </div>

            </div>
          </div>

          {/* Right Column: Narrative & Content Pillars */}
          <div className="lg:col-span-7 flex flex-col">
            
            {/* Small Label */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-xs font-mono uppercase tracking-widest text-rose-400 mb-4 w-fit">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{brand.tagline || "Fashion • Lifestyle • Travel"}</span>
            </div>

            {/* Heading */}
            <h2 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-[1.15] mb-6">
              Documenting Life In <span className="text-instagram-gradient">My Element.</span>
            </h2>

            {/* Narrative Paragraphs */}
            <div className="space-y-4 text-slate-300 text-sm sm:text-base leading-relaxed mb-8">
              <p>
                Hi, I'm <strong className="text-white">{brand.displayName || brand.name}</strong> (<span className="text-rose-400 font-mono">{brand.handle}</span>). {brand.aboutIntro}
              </p>
              <p className="text-slate-400">
                {brand.aboutDetailed}
              </p>
            </div>

            {/* Content Pillars Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {pillars.map((pillar, idx) => {
                const IconComp = pillarIcons[pillar.icon] || Camera;
                return (
                  <div 
                    key={idx}
                    className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.07] hover:border-rose-500/30 transition-colors"
                  >
                    <div className="flex items-center gap-2.5 mb-2">
                      <div className="w-7 h-7 rounded-lg bg-rose-500/10 flex items-center justify-center text-rose-400 shrink-0">
                        <IconComp className="w-4 h-4" />
                      </div>
                      <h4 className="text-sm font-semibold text-white">
                        {pillar.title}
                      </h4>
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      {pillar.description}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Creative Tags */}
            <div className="flex flex-wrap items-center gap-2 pt-4 border-t border-white/[0.08]">
              <span className="text-xs font-mono text-slate-400 mr-2">Focus:</span>
              {[
                "Fashion & Fits",
                "Everyday Aesthetics",
                "Travel & Getaways",
                "Café Diaries",
                "Aesthetic Storytelling",
                "Skincare & Beauty"
              ].map((tag, i) => (
                <span 
                  key={i}
                  className="px-2.5 py-1 rounded-lg bg-white/[0.04] border border-white/[0.08] text-[11px] font-medium text-slate-300"
                >
                  {tag}
                </span>
              ))}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

import React, { useState } from 'react';
import { 
  Film, 
  Play, 
  Eye, 
  Heart, 
  Music2, 
  Sparkles, 
  Flame, 
  Volume2,
  ExternalLink 
} from 'lucide-react';
import { InstagramIcon } from './BrandIcons';
import { creatorData as defaultCreatorData } from '../data/creatorData';

export const ReelsShowcase = ({ data = defaultCreatorData, onSelectReel }) => {
  const currentData = data || defaultCreatorData;
  const brand = currentData.brand;
  const reels = currentData.reels || [];

  const [activeCategory, setActiveCategory] = useState('All');

  // Gather unique categories from reels data
  const dynamicCategories = ['All', ...new Set(reels.map(r => r.category))];

  const filteredReels = activeCategory === 'All'
    ? reels
    : reels.filter(r => r.category === activeCategory);

  return (
    <section id="reels" className="py-24 relative overflow-hidden bg-gradient-to-b from-transparent via-[#11131E]/40 to-transparent">
      {/* Background glow accent */}
      <div className="absolute top-1/2 -left-40 w-96 h-96 bg-rose-600/10 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute bottom-10 -right-40 w-96 h-96 bg-purple-600/10 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-xs font-mono uppercase tracking-widest text-rose-400 mb-3">
              <Film className="w-3.5 h-3.5" />
              <span>9:16 Visual Portfolio</span>
            </div>
            <h2 className="font-display font-black text-3xl sm:text-4xl text-white tracking-tight">
              Reels & Aesthetic Edits
            </h2>
            <p className="mt-2 text-slate-400 text-sm sm:text-base max-w-xl">
              Curated aesthetic transitions, lifestyle mini-vlogs, and travel frames from {brand.handle}. Click any reel for full-screen playback.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-xs text-slate-300">
              <InstagramIcon className="w-4 h-4 text-rose-400" />
              <span>Reels: <strong className="text-white">{reels.length}</strong></span>
            </div>

            <a
              href={`${brand.instagramUrl}reels/`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-rose-500 to-purple-600 text-white text-xs font-semibold shadow-md shadow-rose-500/20 hover:scale-[1.02] transition-transform"
            >
              <span>Watch on Instagram</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-8 no-scrollbar">
          {dynamicCategories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-full text-xs font-medium whitespace-nowrap transition-all duration-200 cursor-pointer ${
                activeCategory === category
                  ? 'bg-gradient-to-r from-amber-500 via-rose-500 to-purple-600 text-white font-semibold shadow-md shadow-rose-500/20'
                  : 'bg-white/[0.03] text-slate-300 hover:text-white hover:bg-white/[0.08] border border-white/[0.06]'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* 9:16 Reels Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-5">
          {filteredReels.map((reel) => (
            <div
              key={reel.id}
              onClick={() => onSelectReel(reel)}
              className="group relative rounded-2xl sm:rounded-3xl overflow-hidden aspect-[9/16] bg-slate-900 border border-white/10 hover:border-rose-500/50 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-rose-500/20 cursor-pointer flex flex-col justify-between p-4"
            >
              {/* Background Thumbnail */}
              <img
                src={reel.thumbnail}
                alt={reel.title}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                loading="lazy"
              />

              {/* Gradient Scrim */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-black/60 group-hover:via-black/40 transition-colors" />

              {/* Top Row: Category & Views */}
              <div className="relative z-10 flex items-center justify-between">
                <span className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-[10px] font-semibold text-white uppercase tracking-wider">
                  {reel.category}
                </span>

                <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-rose-500/80 backdrop-blur-md text-[10px] font-bold text-white shadow-md">
                  <Film className="w-3 h-3" />
                  <span>{reel.views || 'Reel'}</span>
                </div>
              </div>

              {/* Center Play Button Overlay */}
              <div className="relative z-10 self-center my-auto">
                <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 p-[2px] shadow-2xl group-hover:scale-110 transition-transform duration-300">
                  <div className="w-full h-full rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center text-white group-hover:bg-transparent transition-colors">
                    <Play className="w-6 h-6 fill-white ml-0.5" />
                  </div>
                </div>
              </div>

              {/* Bottom Row: Audio Title & Captions */}
              <div className="relative z-10 flex flex-col gap-1.5">
                
                {/* Audio Waveform Indicator */}
                <div className="flex items-center gap-2 text-[10px] text-slate-300 bg-black/50 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/10 w-fit">
                  <div className="flex items-center gap-0.5 h-3">
                    <span className="w-0.5 bg-rose-400 rounded-full wave-bar-1 inline-block" />
                    <span className="w-0.5 bg-rose-400 rounded-full wave-bar-2 inline-block" />
                    <span className="w-0.5 bg-rose-400 rounded-full wave-bar-3 inline-block" />
                    <span className="w-0.5 bg-rose-400 rounded-full wave-bar-4 inline-block" />
                  </div>
                  <span className="truncate max-w-[120px] font-mono">
                    {reel.sound}
                  </span>
                </div>

                {/* Reel Title */}
                <h3 className="text-xs sm:text-sm font-semibold text-white line-clamp-2 leading-snug group-hover:text-rose-300 transition-colors">
                  {reel.title}
                </h3>

                {/* Bottom Stats */}
                <div className="flex items-center justify-between pt-1 border-t border-white/10 text-[10px] text-slate-300">
                  <span className="flex items-center gap-1 font-mono">
                    <Heart className="w-3 h-3 text-rose-400 fill-rose-400" />
                    {reel.likes || 'Watch'}
                  </span>
                  <span className="font-mono text-slate-400">
                    {reel.duration}
                  </span>
                </div>

              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};


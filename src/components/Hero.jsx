import React from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  Flame, 
  CheckCircle2, 
  Play, 
  Download, 
  TrendingUp,
  Camera,
  Film,
  Eye,
  Heart
} from 'lucide-react';
import { InstagramIcon } from './BrandIcons';
import { creatorData as defaultCreatorData } from '../data/creatorData';

export const Hero = ({ data = defaultCreatorData, onOpenMediaKit, onSelectStoryHighlight }) => {
  const currentData = data || defaultCreatorData;
  const brand = currentData.brand;
  const stats = currentData.stats;
  const highlights = currentData.storyHighlights || [];

  const scrollToSection = (id) => {
    const el = document.querySelector(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const followersStat = stats.find(s => s.id === 'followers')?.value || '467';
  const postsStat = stats.find(s => s.id === 'posts')?.value || '15';
  const followingStat = stats.find(s => s.id === 'following')?.value || '148';

  return (
    <section id="home" className="relative min-h-[92vh] pt-32 pb-20 flex flex-col justify-center overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-gradient-to-tr from-rose-600/15 via-purple-600/15 to-amber-500/10 rounded-full blur-[120px] pointer-events-none -z-10" />
      <div className="absolute top-1/3 -left-32 w-96 h-96 bg-purple-600/10 rounded-full blur-[100px] pointer-events-none -z-10" />
      <div className="absolute bottom-10 -right-32 w-96 h-96 bg-rose-600/10 rounded-full blur-[100px] pointer-events-none -z-10" />

      {/* Grid Pattern Overlay */}
      <div 
        className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_70%,transparent_100%)] pointer-events-none -z-10" 
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        
        {/* Top Announcement Banner */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.1] backdrop-blur-md text-xs sm:text-sm text-slate-300 hover:border-rose-500/40 transition-colors shadow-lg">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500"></span>
            </span>
            <span className="font-medium text-slate-200">
              {brand.quickAnnouncement || "✨ Fashion • Lifestyle • Travel — Documenting life in my element"}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Hero Content */}
          <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left">
            
            {/* Handle & Verified Badge Pill */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs font-mono uppercase tracking-wider mb-4">
              <InstagramIcon className="w-3.5 h-3.5 text-rose-400" />
              <span>{brand.handle}</span>
              <span className="text-slate-500">•</span>
              <span className="text-slate-300 font-sans font-medium capitalize">
                {brand.role || "Digital Creator"}
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="font-display font-black text-4xl sm:text-5xl md:text-6xl xl:text-7xl tracking-tight text-white leading-[1.08] mb-6">
              {brand.tagline} <br />
              <span className="text-instagram-gradient">
                {brand.subTagline || "documenting life in my element"}
              </span>
            </h1>

            {/* Bio / Description */}
            <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed mb-8 font-light">
              {brand.bio}
            </p>

            {/* CTAs Group */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3.5 w-full sm:w-auto mb-10">
              
              {/* Primary Follow CTA */}
              <a
                href={brand.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-7 py-3.5 rounded-2xl font-semibold text-white bg-gradient-to-r from-amber-500 via-rose-500 to-purple-600 hover:opacity-95 shadow-lg shadow-rose-500/25 hover:shadow-rose-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-2.5 group text-sm sm:text-base"
              >
                <InstagramIcon className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                <span>Follow {brand.handle}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>

              {/* Secondary Explore Content CTA */}
              <button
                onClick={() => scrollToSection('#content')}
                className="w-full sm:w-auto px-6 py-3.5 rounded-2xl font-medium text-slate-200 bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 hover:border-white/20 active:scale-[0.98] transition-all flex items-center justify-center gap-2 text-sm sm:text-base cursor-pointer"
              >
                <Play className="w-4 h-4 text-rose-400 fill-rose-400/20" />
                <span>Explore Feed & Fits</span>
              </button>

              {/* Media Kit CTA */}
              <button
                onClick={onOpenMediaKit}
                className="w-full sm:w-auto px-5 py-3.5 rounded-2xl font-medium text-slate-300 hover:text-white bg-transparent hover:bg-white/[0.04] border border-slate-700/50 hover:border-slate-500 transition-all flex items-center justify-center gap-2 text-sm cursor-pointer"
              >
                <Download className="w-4 h-4 text-purple-400" />
                <span>Collaborations</span>
              </button>
            </div>

            {/* Badges List */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5 text-xs text-slate-300">
              {brand.badges?.map((badge, idx) => (
                <div 
                  key={idx}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.08]"
                >
                  {badge.icon === 'CheckCircle2' && <CheckCircle2 className="w-3.5 h-3.5 text-sky-400" />}
                  {badge.icon === 'Camera' && <Camera className="w-3.5 h-3.5 text-amber-400" />}
                  {badge.icon === 'Sparkles' && <Sparkles className="w-3.5 h-3.5 text-rose-400" />}
                  {badge.icon === 'Flame' && <Flame className="w-3.5 h-3.5 text-rose-400" />}
                  <span>{badge.text}</span>
                </div>
              ))}
            </div>

          </div>

          {/* Right Hero Visual / Instagram Creator Showcase */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center relative">
            
            {/* Profile Avatar Card with Animated Story Ring */}
            <div className="relative group">
              
              {/* Outer Glow Halo */}
              <div className="absolute -inset-2 bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 rounded-3xl blur-xl opacity-40 group-hover:opacity-60 transition duration-500" />

              {/* Main Card Container */}
              <div className="relative p-6 sm:p-8 rounded-3xl bg-[#11131E]/90 border border-white/10 backdrop-blur-xl shadow-2xl flex flex-col items-center text-center max-w-sm w-full">
                
                {/* Story Ring Avatar */}
                <div className="relative mb-5 cursor-pointer">
                  {/* Rotating Gradient Ring */}
                  <div className="w-32 h-32 sm:w-36 sm:h-36 rounded-full p-[3.5px] story-ring-animated shadow-xl shadow-rose-500/20">
                    <div className="w-full h-full rounded-full p-[3px] bg-[#11131E]">
                      <img 
                        src={brand.avatar} 
                        alt={brand.name}
                        onError={(e) => { e.target.src = brand.fallbackAvatar; }}
                        className="w-full h-full rounded-full object-cover group-hover:scale-105 transition-transform duration-500" 
                      />
                    </div>
                  </div>

                  {/* Live / Story Badge */}
                  <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-2.5 py-0.5 rounded-full bg-gradient-to-r from-rose-500 to-purple-600 text-white text-[10px] font-bold tracking-wider uppercase shadow-md flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                    <span>In My Element</span>
                  </div>
                </div>

                {/* Creator Profile Info */}
                <div className="flex items-center gap-1.5 mb-1">
                  <h3 className="font-display font-bold text-xl sm:text-2xl text-white">
                    {brand.name}
                  </h3>
                  <CheckCircle2 className="w-5 h-5 text-sky-400 fill-sky-400/20" />
                </div>
                
                <p className="text-xs text-slate-400 font-mono mb-4">
                  {brand.handle}
                </p>

                {/* Micro Stat Badges inside card (Exact Real Stats) */}
                <div className="grid grid-cols-3 gap-2 w-full pt-4 border-t border-white/10 mb-5">
                  <div className="flex flex-col">
                    <span className="font-display font-bold text-base sm:text-lg text-white">
                      {followersStat}
                    </span>
                    <span className="text-[11px] text-slate-400">Followers</span>
                  </div>
                  <div className="flex flex-col border-x border-white/10 px-1">
                    <span className="font-display font-bold text-base sm:text-lg text-rose-400">
                      {postsStat}
                    </span>
                    <span className="text-[11px] text-slate-400">Posts</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-display font-bold text-base sm:text-lg text-amber-400">
                      {followingStat}
                    </span>
                    <span className="text-[11px] text-slate-400">Following</span>
                  </div>
                </div>

                {/* Direct DM Quick Button */}
                <a
                  href={brand.dmUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] border border-white/10 text-xs font-semibold text-slate-200 transition-colors flex items-center justify-center gap-2"
                >
                  <InstagramIcon className="w-3.5 h-3.5 text-rose-400" />
                  <span>Send Instagram DM</span>
                </a>
              </div>
            </div>

            {/* Floating Achievement Card 1 (Top-Right) */}
            <div className="hidden sm:flex absolute -top-4 -right-6 px-3.5 py-2 rounded-2xl bg-[#161827]/90 border border-white/10 backdrop-blur-md shadow-xl items-center gap-2.5 animate-bounce [animation-duration:4s]">
              <div className="w-8 h-8 rounded-xl bg-rose-500/20 border border-rose-500/30 flex items-center justify-center text-rose-400">
                <Flame className="w-4 h-4" />
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-semibold text-white">Fashion & Fits</span>
                <span className="text-[10px] text-slate-400">Curated Feed</span>
              </div>
            </div>

            {/* Floating Achievement Card 2 (Bottom-Left) */}
            <div className="hidden sm:flex absolute -bottom-4 -left-8 px-3.5 py-2 rounded-2xl bg-[#161827]/90 border border-white/10 backdrop-blur-md shadow-xl items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-purple-500/20 border border-purple-500/30 flex items-center justify-center text-purple-400">
                <TrendingUp className="w-4 h-4" />
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-semibold text-white">100% Organic</span>
                <span className="text-[10px] text-emerald-400">Real community bond</span>
              </div>
            </div>

          </div>

        </div>

        {/* Story Highlights Bar (Instagram Stories UI) */}
        {highlights.length > 0 && (
          <div className="mt-16 pt-10 border-t border-white/[0.08]">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-rose-400" />
                <span className="text-xs font-mono uppercase tracking-widest text-slate-400">
                  Story Highlights
                </span>
              </div>
              <span className="text-[11px] text-slate-500">
                Tap highlight to preview
              </span>
            </div>

            <div className="flex items-center gap-4 sm:gap-6 overflow-x-auto pb-4 no-scrollbar">
              {highlights.map((highlight) => (
                <button
                  key={highlight.id}
                  onClick={() => onSelectStoryHighlight(highlight)}
                  className="group flex flex-col items-center gap-2 shrink-0 focus:outline-none cursor-pointer"
                >
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full p-[2.5px] bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 transition-transform duration-300 group-hover:scale-105 shadow-md shadow-rose-500/10">
                    <div className="w-full h-full rounded-full p-[2px] bg-[#090A0F]">
                      <img 
                        src={highlight.image} 
                        alt={highlight.title}
                        className="w-full h-full rounded-full object-cover group-hover:opacity-90 transition-opacity" 
                      />
                    </div>
                  </div>
                  <span className="text-xs text-slate-300 group-hover:text-white font-medium transition-colors max-w-[80px] truncate text-center">
                    {highlight.title}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

      </div>
    </section>
  );
};

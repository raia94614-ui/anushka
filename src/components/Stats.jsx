import React, { useState, useEffect, useRef } from 'react';
import { 
  Users, 
  Image, 
  Film, 
  TrendingUp, 
  Sparkles, 
  Award,
  ArrowUpRight 
} from 'lucide-react';
import { creatorData as defaultCreatorData } from '../data/creatorData';

const iconMap = {
  Users: Users,
  Image: Image,
  Film: Film,
  TrendingUp: TrendingUp,
  Sparkles: Sparkles,
  Award: Award
};

// Counter Hook for animated numbers on viewport enter
const Counter = ({ target, isDecimal, duration = 2000 }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (isNaN(Number(target))) {
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          let start = 0;
          const end = Number(target);
          const startTime = performance.now();

          const updateCounter = (now) => {
            const progress = Math.min((now - startTime) / duration, 1);
            const easeProgress = 1 - Math.pow(1 - progress, 3);
            const current = start + easeProgress * (end - start);

            if (isDecimal) {
              setCount(parseFloat(current.toFixed(1)));
            } else {
              setCount(Math.floor(current));
            }

            if (progress < 1) {
              requestAnimationFrame(updateCounter);
            }
          };

          requestAnimationFrame(updateCounter);
        }
      },
      { threshold: 0.2 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [target, duration, hasAnimated, isDecimal]);

  if (isNaN(Number(target))) {
    return <span>{target}</span>;
  }

  return (
    <span ref={ref}>
      {isDecimal ? count.toFixed(1) : count}
    </span>
  );
};

export const Stats = ({ data = defaultCreatorData }) => {
  const currentData = data || defaultCreatorData;
  const stats = currentData.stats || [];

  return (
    <section id="stats" className="py-20 relative">
      {/* Background radial highlight */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-64 bg-gradient-to-r from-rose-500/10 via-purple-500/10 to-amber-500/10 blur-[100px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-xs font-mono uppercase tracking-widest text-rose-400 mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Audience Impact & Metrics</span>
          </div>
          <h2 className="font-display font-black text-3xl sm:text-4xl text-white tracking-tight">
            Numbers That Drive Influence
          </h2>
          <p className="mt-3 text-slate-400 text-sm sm:text-base">
            Verified creator analytics for {currentData.brand.handle} delivering high retention and deep community trust.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {stats.map((stat) => {
            const IconComponent = iconMap[stat.icon] || Sparkles;

            return (
              <div
                key={stat.id}
                className="group relative p-6 sm:p-7 rounded-3xl bg-[#11131E]/80 border border-white/[0.08] hover:border-rose-500/40 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-rose-500/10 flex flex-col justify-between"
              >
                {/* Top Row: Icon and Growth Badge */}
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-white/[0.04] border border-white/10 flex items-center justify-center text-rose-400 group-hover:text-white group-hover:bg-gradient-to-tr group-hover:from-amber-500 group-hover:via-rose-500 group-hover:to-purple-600 transition-all duration-300">
                    <IconComponent className="w-6 h-6" />
                  </div>

                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-full">
                    <TrendingUp className="w-3 h-3" />
                    {stat.growth}
                  </span>
                </div>

                {/* Center Row: Big Animated Number */}
                <div className="mb-2">
                  <div className="font-display font-extrabold text-4xl sm:text-5xl text-white tracking-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:via-rose-200 group-hover:to-rose-400 transition-colors">
                    <Counter 
                      target={stat.numericValue !== undefined ? stat.numericValue : stat.value} 
                      isDecimal={stat.isDecimal} 
                    />
                    <span className="text-rose-500 text-3xl sm:text-4xl font-normal ml-0.5">
                      {stat.suffix}
                    </span>
                  </div>
                  <div className="font-semibold text-base text-slate-200 mt-1">
                    {stat.label}
                  </div>
                </div>

                {/* Bottom Row: Description */}
                <p className="text-xs text-slate-400 leading-relaxed pt-3 border-t border-white/[0.06]">
                  {stat.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Live Engagement Verification Note */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between px-6 py-4 rounded-2xl bg-white/[0.02] border border-white/[0.06] text-xs text-slate-400 gap-3">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Data synced with official Instagram Creator Insights • Updated in real-time</span>
          </div>
          <span className="font-mono text-slate-500 text-[11px]">
            {currentData.brand.handle} Official Stats
          </span>
        </div>

      </div>
    </section>
  );
};

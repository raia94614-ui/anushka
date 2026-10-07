import React from 'react';
import { Quote, Star, Award } from 'lucide-react';
import { creatorData as defaultCreatorData } from '../data/creatorData';

export const Testimonials = ({ data = defaultCreatorData }) => {
  const testimonials = data?.testimonials || [];

  // Hide section completely if no authentic testimonials are configured
  if (!testimonials || testimonials.length === 0) {
    return null;
  }

  return (
    <section className="py-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-xs font-mono uppercase tracking-widest text-rose-400 mb-3">
            <Award className="w-3.5 h-3.5" />
            <span>Community & Partner Trust</span>
          </div>
          <h2 className="font-display font-black text-3xl sm:text-4xl text-white tracking-tight">
            Collaborator Feedback
          </h2>
          <p className="mt-2 text-slate-400 text-sm sm:text-base">
            Words from community collaborators and creative partners.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((item) => (
            <div
              key={item.id}
              className="relative p-7 rounded-3xl bg-[#11131E]/80 border border-white/[0.08] hover:border-rose-500/30 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <Quote className="w-6 h-6 text-rose-500/30" />
                </div>

                <p className="text-slate-300 text-sm leading-relaxed mb-6 italic">
                  "{item.quote}"
                </p>
              </div>

              <div className="flex items-center gap-3 pt-4 border-t border-white/[0.06]">
                {item.avatar && (
                  <img
                    src={item.avatar}
                    alt={item.author}
                    className="w-11 h-11 rounded-full object-cover border border-white/20"
                  />
                )}
                <div className="flex flex-col">
                  <h4 className="font-display font-bold text-sm text-white">
                    {item.author}
                  </h4>
                  <span className="text-xs text-slate-400">
                    {item.title}
                  </span>
                  <span className="text-[11px] font-mono text-rose-400">
                    {item.company}
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

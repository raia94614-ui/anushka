import React, { useState } from 'react';
import { 
  Camera, 
  MapPin, 
  Calendar, 
  Maximize2, 
  Sparkles, 
  SlidersHorizontal 
} from 'lucide-react';
import { creatorData as defaultCreatorData } from '../data/creatorData';

export const Gallery = ({ data = defaultCreatorData, onSelectImage }) => {
  const currentData = data || defaultCreatorData;
  const items = currentData.galleryItems || [];
  const categories = currentData.galleryCategories || ['All', 'Fashion', 'Lifestyle', 'Travel', 'Aesthetics', 'In My Element'];

  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredItems = selectedCategory === 'All'
    ? items
    : items.filter(item => item.category === selectedCategory);

  return (
    <section id="gallery" className="py-24 relative">
      {/* Background glow */}
      <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-xs font-mono uppercase tracking-widest text-rose-400 mb-3">
            <Camera className="w-3.5 h-3.5" />
            <span>Visual Archive & Portfolio</span>
          </div>
          <h2 className="font-display font-black text-3xl sm:text-4xl text-white tracking-tight">
            High-Resolution Gallery
          </h2>
          <p className="mt-3 text-slate-400 text-sm sm:text-base">
            Documenting life in my element — curated editorial portraits, coastal sunsets, and minimal lifestyle frames.
          </p>
        </div>

        {/* Dynamic Category Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-xs font-medium transition-all duration-200 cursor-pointer ${
                selectedCategory === category
                  ? 'bg-gradient-to-r from-amber-500 via-rose-500 to-purple-600 text-white font-semibold shadow-lg shadow-rose-500/25 scale-105'
                  : 'bg-white/[0.04] text-slate-300 hover:text-white hover:bg-white/[0.08] border border-white/[0.08]'
              }`}
            >
              {category}
              {category === selectedCategory && (
                <span className="ml-1.5 px-1.5 py-0.2 rounded-full bg-black/30 text-[10px]">
                  {filteredItems.length}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Masonry / Grid Display */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[280px]">
          {filteredItems.map((item, idx) => {
            // Apply different row and col spans for aesthetic masonry feel
            let spanClass = "row-span-1";
            if (item.aspect === 'tall') spanClass = "sm:row-span-2";
            if (item.aspect === 'wide') spanClass = "sm:col-span-2 sm:row-span-1";

            return (
              <div
                key={item.id}
                onClick={() => onSelectImage(item, filteredItems, idx)}
                className={`group relative rounded-3xl overflow-hidden bg-slate-900 border border-white/10 hover:border-rose-500/50 transition-all duration-500 hover:shadow-2xl hover:shadow-rose-500/20 cursor-pointer ${spanClass}`}
              >
                {/* Image */}
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  loading="lazy"
                />

                {/* Dark Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-black/30 opacity-60 group-hover:opacity-90 transition-opacity duration-300" />

                {/* Category Badge Top-Left */}
                <div className="absolute top-4 left-4 z-10">
                  <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-[11px] font-medium text-white shadow-md">
                    {item.category}
                  </span>
                </div>

                {/* Top-Right Quick Expand Icon */}
                <div className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-black/50 backdrop-blur-md border border-white/20 flex items-center justify-center text-white/80 group-hover:text-rose-400 group-hover:scale-110 transition-all">
                  <Maximize2 className="w-3.5 h-3.5" />
                </div>

                {/* Bottom Content / Info Overlay */}
                <div className="absolute bottom-0 inset-x-0 p-5 z-10 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                  <div className="flex items-center gap-3 text-[11px] text-slate-300 mb-1.5 font-mono">
                    <span className="flex items-center gap-1 text-rose-400">
                      <MapPin className="w-3 h-3" />
                      {item.location}
                    </span>
                    <span>•</span>
                    <span className="text-slate-400">
                      {item.specs}
                    </span>
                  </div>

                  <h3 className="font-display font-bold text-base sm:text-lg text-white group-hover:text-rose-300 transition-colors line-clamp-1">
                    {item.title}
                  </h3>
                </div>
              </div>
            );
          })}
        </div>

        {/* Dynamic Counter Footer */}
        <div className="mt-10 text-center text-xs text-slate-500 font-mono">
          Showing {filteredItems.length} curated photographs in <span className="text-rose-400 font-semibold">{selectedCategory}</span>
        </div>

      </div>
    </section>
  );
};

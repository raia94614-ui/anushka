import React, { useState } from 'react';
import { 
  Heart, 
  MessageCircle, 
  Eye, 
  Sparkles, 
  Maximize2, 
  Calendar, 
  MapPin, 
  ExternalLink 
} from 'lucide-react';
import { InstagramIcon } from './BrandIcons';
import { creatorData as defaultCreatorData } from '../data/creatorData';

export const FeaturedContent = ({ data = defaultCreatorData, onSelectPost }) => {
  const currentData = data || defaultCreatorData;
  const brand = currentData.brand;
  const posts = currentData.featuredPosts || [];

  const [activeFilter, setActiveFilter] = useState('All');

  // Filter categories dynamically gathered from posts
  const dynamicCategories = ['All', ...new Set(posts.map(p => p.category))];

  const filteredPosts = activeFilter === 'All'
    ? posts
    : posts.filter(post => post.category === activeFilter);

  return (
    <section id="content" className="py-24 relative">
      {/* Glow accent */}
      <div className="absolute top-1/4 left-1/3 w-80 h-80 bg-rose-600/10 rounded-full blur-[100px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-xs font-mono uppercase tracking-widest text-rose-400 mb-3">
              <InstagramIcon className="w-3.5 h-3.5 text-rose-400" />
              <span>Instagram Feed Showcase</span>
            </div>
            <h2 className="font-display font-black text-3xl sm:text-4xl text-white tracking-tight">
              Featured Posts & Stories
            </h2>
            <p className="mt-2 text-slate-400 text-sm sm:text-base max-w-xl">
              Curated frames from {brand.handle}. Click any post to view high-resolution details, engagement breakdown, and full captions.
            </p>
          </div>

          <a
            href={brand.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-xs font-medium text-slate-300 hover:text-white transition-colors self-start md:self-auto"
          >
            <InstagramIcon className="w-4 h-4 text-rose-400" />
            <span>View Full Instagram Grid</span>
            <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
          </a>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
          {dynamicCategories.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-4 py-2 rounded-full text-xs font-medium whitespace-nowrap transition-all duration-200 cursor-pointer ${
                activeFilter === filter
                  ? 'bg-gradient-to-r from-amber-500 via-rose-500 to-purple-600 text-white font-semibold shadow-md shadow-rose-500/20'
                  : 'bg-white/[0.03] text-slate-300 hover:text-white hover:bg-white/[0.08] border border-white/[0.06]'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post) => (
            <div
              key={post.id}
              onClick={() => onSelectPost(post)}
              className="group relative rounded-3xl overflow-hidden bg-[#11131E] border border-white/[0.08] hover:border-rose-500/40 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-rose-500/15 cursor-pointer flex flex-col"
            >
              {/* Image Container with 4:5 Instagram Aspect Ratio */}
              <div className="relative aspect-[4/5] overflow-hidden bg-slate-900">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  loading="lazy"
                />

                {/* Dark Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#090A0F] via-transparent to-black/40 opacity-70 group-hover:opacity-90 transition-opacity" />

                {/* Category Badge Top-Left */}
                <div className="absolute top-4 left-4 z-10">
                  <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-[11px] font-medium text-white shadow-lg">
                    {post.category}
                  </span>
                </div>

                {/* Instagram Icon Top-Right */}
                <div className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-black/50 backdrop-blur-md border border-white/20 flex items-center justify-center text-white/90 group-hover:text-rose-400 group-hover:bg-black/80 transition-colors">
                  <InstagramIcon className="w-4 h-4" />
                </div>

                {/* Hover Center Overlay with Expand Icon */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="px-4 py-2 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white text-xs font-semibold flex items-center gap-2 transform translate-y-2 group-hover:translate-y-0 transition-transform">
                    <Maximize2 className="w-4 h-4" />
                    <span>View Post Details</span>
                  </div>
                </div>

                {/* Stats Bar Overlay at bottom of Image */}
                <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs text-white/90 font-medium z-10">
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1">
                      <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400" />
                      {post.likes}
                    </span>
                    <span className="flex items-center gap-1">
                      <MessageCircle className="w-3.5 h-3.5 text-slate-300" />
                      {post.comments}
                    </span>
                  </div>

                  <span className="flex items-center gap-1 text-slate-300 text-[11px]">
                    <Eye className="w-3.5 h-3.5 text-sky-400" />
                    {post.views}
                  </span>
                </div>
              </div>

              {/* Card Footer / Caption Snippet */}
              <div className="p-5 flex flex-col flex-grow justify-between bg-[#11131E]">
                <div>
                  <div className="flex items-center justify-between text-[11px] text-slate-400 mb-2 font-mono">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-rose-400" />
                      {post.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {post.date}
                    </span>
                  </div>

                  <h3 className="font-display font-bold text-base text-white group-hover:text-rose-400 transition-colors line-clamp-1 mb-2">
                    {post.title}
                  </h3>

                  <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                    {post.caption}
                  </p>
                </div>

                {/* Tags */}
                {post.tags && (
                  <div className="flex flex-wrap gap-1.5 mt-4 pt-3 border-t border-white/[0.06]">
                    {(Array.isArray(post.tags) ? post.tags : [post.tags]).slice(0, 3).map((tag, idx) => (
                      <span key={idx} className="text-[10px] text-rose-400/80 font-mono">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

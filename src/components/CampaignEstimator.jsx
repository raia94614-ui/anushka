import React, { useState } from 'react';
import { 
  Calculator, 
  Film, 
  Camera, 
  Sparkles, 
  Clock, 
  CheckCircle2, 
  Send, 
  ArrowRight,
  ShieldCheck,
  Zap
} from 'lucide-react';
import { creatorData as defaultCreatorData } from '../data/creatorData';

export const CampaignEstimator = ({ data = defaultCreatorData, onSelectPackageQuote }) => {
  const currentData = data || defaultCreatorData;
  const brand = currentData.brand;

  // Selected Deliverables State
  const [reelsCount, setReelsCount] = useState(1);
  const [carouselsCount, setCarouselsCount] = useState(1);
  const [storiesCount, setStoriesCount] = useState(2);
  const [usageRights, setUsageRights] = useState('30days'); // '30days' | '90days' | 'perpetual'
  const [exclusiveCategory, setExclusiveCategory] = useState(false);
  const [fastTrack, setFastTrack] = useState(false);

  // Calculate turnaround days dynamically
  let estimatedDays = 5 + (reelsCount > 1 ? 2 : 0) + (carouselsCount > 1 ? 1 : 0);
  if (fastTrack) estimatedDays = Math.max(2, Math.floor(estimatedDays / 2));

  // Build generated summary
  const summaryDeliverables = [
    `${reelsCount}x Dedicated 9:16 Aesthetic Reel${reelsCount > 1 ? 's' : ''}`,
    carouselsCount > 0 ? `${carouselsCount}x High-Res Lookbook Carousel${carouselsCount > 1 ? 's' : ''}` : null,
    storiesCount > 0 ? `${storiesCount}x Interactive Story Series with Link Stickers` : null,
    usageRights === '30days' ? '30-Day Digital Advertising Usage Rights' : usageRights === '90days' ? '90-Day Digital Advertising Usage Rights' : 'Perpetual Extended Commercial License',
    exclusiveCategory ? '30-Day Category Exclusivity' : null,
    fastTrack ? '⚡ 48-Hour Priority Fast-Track Delivery' : null
  ].filter(Boolean);

  const handleApplyQuote = () => {
    const quoteSummary = `Custom Campaign (${reelsCount} Reel, ${carouselsCount} Carousel, ${storiesCount} Stories, ${usageRights} rights${fastTrack ? ', Fast-Track' : ''})`;
    if (onSelectPackageQuote) {
      onSelectPackageQuote(quoteSummary);
    }
    const el = document.querySelector('#contact');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="mt-16 p-6 sm:p-10 rounded-3xl bg-gradient-to-br from-[#121422] via-[#10121d] to-[#15172b] border border-white/10 shadow-2xl relative overflow-hidden">
      
      {/* Background glow */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-rose-500/10 rounded-full blur-[100px] pointer-events-none -z-10" />

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 mb-8 border-b border-white/10 gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-xs font-mono uppercase tracking-widest text-rose-400 mb-2">
            <Calculator className="w-3.5 h-3.5" />
            <span>Interactive Campaign Builder</span>
          </div>
          <h3 className="font-display font-bold text-2xl sm:text-3xl text-white">
            Custom Deliverables Estimator
          </h3>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Build your custom partnership package and get a structured deliverable summary.
          </p>
        </div>

        <div className="px-4 py-2 rounded-2xl bg-white/[0.04] border border-white/10 flex items-center gap-2 self-start md:self-auto">
          <Clock className="w-4 h-4 text-amber-400" />
          <span className="text-xs text-slate-300">
            Est. Turnaround: <strong className="text-white">{estimatedDays} Business Days</strong>
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Interactive Controls */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Reels Count */}
          <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.06]">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Film className="w-4 h-4 text-rose-400" />
                <span className="text-sm font-semibold text-white">Dedicated 9:16 Reels</span>
              </div>
              <span className="font-mono font-bold text-base text-rose-400">{reelsCount} Reel{reelsCount > 1 ? 's' : ''}</span>
            </div>
            <div className="grid grid-cols-4 gap-2">
              {[1, 2, 3, 4].map(num => (
                <button
                  key={num}
                  type="button"
                  onClick={() => setReelsCount(num)}
                  className={`py-2 rounded-xl text-xs font-mono font-semibold transition-all cursor-pointer ${
                    reelsCount === num
                      ? 'bg-gradient-to-r from-amber-500 to-rose-500 text-white shadow-md'
                      : 'bg-white/[0.04] text-slate-400 hover:text-white hover:bg-white/[0.08]'
                  }`}
                >
                  {num} {num === 1 ? 'Reel' : 'Reels'}
                </button>
              ))}
            </div>
          </div>

          {/* Lookbook Carousels Count */}
          <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.06]">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Camera className="w-4 h-4 text-amber-400" />
                <span className="text-sm font-semibold text-white">Lookbook Photo Carousels</span>
              </div>
              <span className="font-mono font-bold text-base text-amber-400">{carouselsCount} Post{carouselsCount > 1 ? 's' : ''}</span>
            </div>
            <div className="grid grid-cols-4 gap-2">
              {[0, 1, 2, 3].map(num => (
                <button
                  key={num}
                  type="button"
                  onClick={() => setCarouselsCount(num)}
                  className={`py-2 rounded-xl text-xs font-mono font-semibold transition-all cursor-pointer ${
                    carouselsCount === num
                      ? 'bg-gradient-to-r from-amber-500 to-rose-500 text-white shadow-md'
                      : 'bg-white/[0.04] text-slate-400 hover:text-white hover:bg-white/[0.08]'
                  }`}
                >
                  {num === 0 ? 'None' : `${num} Post${num > 1 ? 's' : ''}`}
                </button>
              ))}
            </div>
          </div>

          {/* Stories Count */}
          <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.06]">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-purple-400" />
                <span className="text-sm font-semibold text-white">Supporting Story Series</span>
              </div>
              <span className="font-mono font-bold text-base text-purple-400">{storiesCount} Stories</span>
            </div>
            <div className="grid grid-cols-4 gap-2">
              {[1, 2, 4, 6].map(num => (
                <button
                  key={num}
                  type="button"
                  onClick={() => setStoriesCount(num)}
                  className={`py-2 rounded-xl text-xs font-mono font-semibold transition-all cursor-pointer ${
                    storiesCount === num
                      ? 'bg-gradient-to-r from-purple-600 to-rose-500 text-white shadow-md'
                      : 'bg-white/[0.04] text-slate-400 hover:text-white hover:bg-white/[0.08]'
                  }`}
                >
                  {num} Stories
                </button>
              ))}
            </div>
          </div>

          {/* Usage Rights Selection */}
          <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.06]">
            <span className="text-xs font-mono text-slate-400 uppercase tracking-wider block mb-2.5">
              Digital Usage Rights Duration
            </span>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: '30days', label: '30 Days Ads' },
                { id: '90days', label: '90 Days Ads' },
                { id: 'perpetual', label: 'Perpetual Rights' }
              ].map(item => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setUsageRights(item.id)}
                  className={`py-2 px-2 text-center rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    usageRights === item.id
                      ? 'bg-white/20 border border-white/40 text-white'
                      : 'bg-white/[0.03] text-slate-400 hover:text-white border border-transparent'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Additional Add-ons checkboxes */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setExclusiveCategory(!exclusiveCategory)}
              className={`p-3.5 rounded-2xl text-left border transition-all cursor-pointer flex items-center justify-between ${
                exclusiveCategory
                  ? 'bg-emerald-500/10 border-emerald-500/40 text-white'
                  : 'bg-white/[0.02] border-white/[0.06] text-slate-400 hover:text-slate-200'
              }`}
            >
              <div className="flex items-center gap-2">
                <ShieldCheck className={`w-4 h-4 ${exclusiveCategory ? 'text-emerald-400' : 'text-slate-500'}`} />
                <span className="text-xs font-semibold">Category Exclusivity</span>
              </div>
              <span className={`w-4 h-4 rounded-full border flex items-center justify-center ${exclusiveCategory ? 'bg-emerald-500 border-emerald-500 text-black' : 'border-slate-600'}`}>
                {exclusiveCategory && '✓'}
              </span>
            </button>

            <button
              type="button"
              onClick={() => setFastTrack(!fastTrack)}
              className={`p-3.5 rounded-2xl text-left border transition-all cursor-pointer flex items-center justify-between ${
                fastTrack
                  ? 'bg-amber-500/10 border-amber-500/40 text-white'
                  : 'bg-white/[0.02] border-white/[0.06] text-slate-400 hover:text-slate-200'
              }`}
            >
              <div className="flex items-center gap-2">
                <Zap className={`w-4 h-4 ${fastTrack ? 'text-amber-400' : 'text-slate-500'}`} />
                <span className="text-xs font-semibold">⚡ Fast-Track 48h Delivery</span>
              </div>
              <span className={`w-4 h-4 rounded-full border flex items-center justify-center ${fastTrack ? 'bg-amber-400 border-amber-400 text-black' : 'border-slate-600'}`}>
                {fastTrack && '✓'}
              </span>
            </button>
          </div>

        </div>

        {/* Right Column: Dynamic Live Deliverables Summary Card */}
        <div className="lg:col-span-5 p-6 rounded-3xl bg-[#0b0c14] border border-white/10 flex flex-col justify-between h-full space-y-6">
          
          <div>
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-white/10">
              <h4 className="font-display font-bold text-lg text-white">
                Live Campaign Scope
              </h4>
              <span className="text-[10px] font-mono text-emerald-400 px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20">
                Ready to Book
              </span>
            </div>

            {/* Checklist of Selected Items */}
            <div className="space-y-3">
              {summaryDeliverables.map((item, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                  <span className="leading-tight">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Action Button to Prefill Contact Form */}
          <div className="pt-4 border-t border-white/10 space-y-3">
            <button
              onClick={handleApplyQuote}
              className="w-full py-3.5 rounded-2xl font-bold text-xs sm:text-sm text-white bg-gradient-to-r from-amber-500 via-rose-500 to-purple-600 shadow-xl shadow-rose-500/25 hover:opacity-95 hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Send className="w-4 h-4" />
              <span>Inquire With This Custom Scope</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <span className="text-[11px] text-center text-slate-500 block">
              Auto-fills collaboration inquiry form below
            </span>
          </div>

        </div>

      </div>

    </div>
  );
};

import React from 'react';
import { 
  X, 
  FileText, 
  Users, 
  TrendingUp, 
  Sparkles, 
  Award, 
  MapPin, 
  Calendar, 
  Download, 
  Send, 
  CheckCircle2, 
  DollarSign 
} from 'lucide-react';
import { creatorData as defaultCreatorData } from '../data/creatorData';

export const MediaKitModal = ({ data = defaultCreatorData, onClose, onBookCampaign, onShowToast }) => {
  const currentData = data || defaultCreatorData;
  const brand = currentData.brand;
  const stats = currentData.stats || [];
  const mediaKit = currentData.mediaKit || defaultCreatorData.mediaKit;

  const handleDownload = () => {
    if (onShowToast) {
      onShowToast('Simulating Media Kit PDF download...');
    }
  };

  const followersStat = stats.find(s => s.id === 'followers')?.value || '467';
  const postsStat = stats.find(s => s.id === 'posts')?.value || '15';
  const followingStat = stats.find(s => s.id === 'following')?.value || '148';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-xl animate-fadeIn">
      
      {/* Background click listener */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Main Modal Box */}
      <div 
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-3xl max-h-[90vh] rounded-3xl bg-[#0f111d] border border-white/10 shadow-2xl overflow-y-auto z-10 p-6 sm:p-8"
      >
        {/* Top Header */}
        <div className="flex items-start justify-between pb-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-purple-600 to-rose-500 p-[2px] flex items-center justify-center text-white shrink-0">
              <div className="w-full h-full rounded-[14px] bg-[#090A0F] flex items-center justify-center">
                <FileText className="w-6 h-6 text-purple-400" />
              </div>
            </div>

            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="font-display font-bold text-xl sm:text-2xl text-white">
                  Media Kit & Collaboration Guide
                </h3>
                <CheckCircle2 className="w-4 h-4 text-sky-400" />
              </div>
              <p className="text-xs text-slate-400 font-mono">
                {brand.name} • {brand.handle}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-white/[0.05] hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Highlights Row (Exact Real Data) */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 my-6">
          <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/[0.06] text-center">
            <span className="text-[11px] font-mono text-slate-400 block mb-1">Followers</span>
            <span className="font-display font-bold text-xl text-white">{followersStat}</span>
          </div>
          <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/[0.06] text-center">
            <span className="text-[11px] font-mono text-slate-400 block mb-1">Posts</span>
            <span className="font-display font-bold text-xl text-rose-400">{postsStat}</span>
          </div>
          <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/[0.06] text-center">
            <span className="text-[11px] font-mono text-slate-400 block mb-1">Following</span>
            <span className="font-display font-bold text-xl text-amber-400">{followingStat}</span>
          </div>
          <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/[0.06] text-center">
            <span className="text-[11px] font-mono text-slate-400 block mb-1">Focus</span>
            <span className="font-display font-bold text-xs sm:text-sm text-emerald-400 truncate block">Fashion & Fits</span>
          </div>
        </div>

        {/* Demographics Section */}
        <div className="space-y-6">
          
          {/* Age & Regional Breakdown */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Audience Focus */}
            <div className="p-5 rounded-2xl bg-[#141726] border border-white/[0.08]">
              <h4 className="text-xs font-mono uppercase text-slate-300 font-semibold mb-3 flex items-center gap-2">
                <Users className="w-3.5 h-3.5 text-rose-400" />
                <span>Audience Demographics</span>
              </h4>

              <div className="space-y-3">
                {mediaKit.ageBreakdown?.map((age, idx) => (
                  <div key={idx} className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-300">{age.range} ({age.label})</span>
                      <span className="font-mono font-bold text-rose-400">{age.percent}%</span>
                    </div>
                    <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-amber-500 via-rose-500 to-purple-600 rounded-full"
                        style={{ width: `${age.percent}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Top Geographic Locations */}
            <div className="p-5 rounded-2xl bg-[#141726] border border-white/[0.08]">
              <h4 className="text-xs font-mono uppercase text-slate-300 font-semibold mb-3 flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-purple-400" />
                <span>Regional Presence</span>
              </h4>

              <div className="space-y-2">
                {mediaKit.topCities?.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between text-xs py-1 border-b border-white/[0.04] last:border-none">
                    <span className="text-slate-300">{item.city}</span>
                    <span className="font-mono text-white bg-white/[0.05] px-2 py-0.5 rounded">
                      {item.share}
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Core Collaboration Niches */}
          <div className="p-5 rounded-2xl bg-[#141726] border border-white/[0.08]">
            <h4 className="text-xs font-mono uppercase text-slate-300 font-semibold mb-3 flex items-center gap-2">
              <Award className="w-3.5 h-3.5 text-amber-400" />
              <span>Core Collaboration Categories</span>
            </h4>

            <div className="flex flex-wrap gap-2">
              {mediaKit.nicheFocus?.map((niche, idx) => (
                <span 
                  key={idx}
                  className="px-3 py-1.5 rounded-xl bg-white/[0.05] border border-white/10 text-xs font-semibold text-slate-200"
                >
                  {niche}
                </span>
              ))}
            </div>
          </div>

        </div>

        {/* Modal Bottom Actions */}
        <div className="pt-6 mt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
          <button
            onClick={handleDownload}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.1] text-xs font-semibold text-slate-300 hover:text-white transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            <Download className="w-4 h-4 text-purple-400" />
            <span>Download Kit (PDF)</span>
          </button>

          <button
            onClick={() => {
              onClose();
              if (onBookCampaign) onBookCampaign();
            }}
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 via-rose-500 to-purple-600 text-xs font-bold text-white shadow-lg shadow-rose-500/25 hover:opacity-95 transition-opacity flex items-center justify-center gap-2 cursor-pointer"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Inquire for Collaboration</span>
          </button>
        </div>

      </div>

    </div>
  );
};

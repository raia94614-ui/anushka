import React from 'react';
import { 
  ExternalLink, 
  Sparkles, 
  Share2, 
  ArrowUpRight, 
  CheckCircle2, 
  Flame 
} from 'lucide-react';
import { 
  InstagramIcon, 
  YoutubeIcon, 
  LinkedinIcon, 
  FacebookIcon 
} from './BrandIcons';
import { creatorData as defaultCreatorData } from '../data/creatorData';

const iconMap = {
  Instagram: InstagramIcon,
  Youtube: YoutubeIcon,
  Linkedin: LinkedinIcon,
  Facebook: FacebookIcon
};

export const SocialHub = ({ data = defaultCreatorData, onShowToast }) => {
  const currentData = data || defaultCreatorData;
  const brand = currentData.brand;
  const channels = currentData.socialChannels || [];

  const handleCopyLink = (channel) => {
    navigator.clipboard.writeText(channel.url);
    if (onShowToast) {
      onShowToast(`Copied ${channel.name} link to clipboard!`);
    }
  };

  return (
    <section id="socials" className="py-24 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 right-10 w-96 h-96 bg-rose-600/10 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-xs font-mono uppercase tracking-widest text-rose-400 mb-3">
            <Share2 className="w-3.5 h-3.5" />
            <span>Multi-Platform Presence</span>
          </div>
          <h2 className="font-display font-black text-3xl sm:text-4xl text-white tracking-tight">
            Connect Across Channels
          </h2>
          <p className="mt-3 text-slate-400 text-sm sm:text-base">
            Follow {brand.handle} across platforms for fashion styling, travel updates, and aesthetic stories.
          </p>
        </div>

        {/* Social Channels Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {channels.map((channel) => {
            const IconComp = iconMap[channel.icon] || InstagramIcon;

            return (
              <div
                key={channel.id}
                className={`group relative rounded-3xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 ${
                  channel.featured
                    ? 'bg-gradient-to-b from-[#181a2e] to-[#11131E] border-2 border-rose-500/50 shadow-2xl shadow-rose-500/15 lg:-translate-y-2'
                    : 'bg-[#11131E]/80 border border-white/[0.08] hover:border-white/20'
                }`}
              >
                {/* Featured Badge */}
                {channel.featured && (
                  <div className="absolute -top-3 left-6 px-3 py-0.5 rounded-full bg-gradient-to-r from-amber-500 to-rose-500 text-white text-[10px] font-bold uppercase tracking-wider shadow-md">
                    Primary Profile
                  </div>
                )}

                <div>
                  {/* Top Row: Icon & Share */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-white/[0.04] border border-white/10 flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                      <IconComp className="w-6 h-6 text-rose-400" />
                    </div>

                    <button
                      onClick={() => handleCopyLink(channel)}
                      className="p-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-slate-400 hover:text-white transition-colors cursor-pointer"
                      title="Copy link"
                    >
                      <Share2 className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Channel Info */}
                  <h3 className="font-display font-bold text-lg text-white mb-0.5">
                    {channel.name}
                  </h3>
                  
                  <span className="text-xs text-rose-400 font-mono block mb-3">
                    {channel.handle}
                  </span>

                  {/* Activity Snippet */}
                  <p className="text-xs text-slate-300 leading-relaxed mb-6">
                    {channel.activity}
                  </p>
                </div>

                {/* Follow Button */}
                <a
                  href={channel.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-full py-3 rounded-xl font-semibold text-xs flex items-center justify-center gap-2 transition-all duration-200 ${
                    channel.featured
                      ? 'bg-gradient-to-r from-amber-500 via-rose-500 to-purple-600 text-white shadow-lg shadow-rose-500/25 hover:opacity-95'
                      : 'bg-white/[0.06] hover:bg-white/[0.12] text-white border border-white/10'
                  }`}
                >
                  <span>{channel.btnText}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

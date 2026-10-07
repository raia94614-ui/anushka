import React, { useState } from 'react';
import { 
  Heart, 
  ArrowUp, 
  Mail, 
  Sparkles, 
  Send, 
  CheckCircle2,
  ExternalLink,
  Settings
} from 'lucide-react';
import { InstagramIcon, YoutubeIcon, LinkedinIcon, FacebookIcon } from './BrandIcons';
import { creatorData as defaultCreatorData } from '../data/creatorData';

export const Footer = ({ data = defaultCreatorData, onOpenAdmin, onShowToast }) => {
  const currentData = data || defaultCreatorData;
  const brand = currentData.brand;

  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNewsletter = (e) => {
    e.preventDefault();
    if (!newsletterEmail.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newsletterEmail)) {
      if (onShowToast) onShowToast('Please enter a valid email address');
      return;
    }

    setSubscribed(true);
    if (onShowToast) {
      onShowToast('Subscribed to VIP Creator Drops!');
    }
  };

  const quickNav = [
    { name: 'Home', href: '#home' },
    { name: 'About Brand', href: '#about' },
    { name: 'Stats & Metrics', href: '#stats' },
    { name: 'Instagram Feed', href: '#content' },
    { name: '9:16 Reels', href: '#reels' },
    { name: 'Photo Gallery', href: '#gallery' },
    { name: 'Collaborate', href: '#collaborations' },
    { name: 'Contact Us', href: '#contact' }
  ];

  return (
    <footer className="relative bg-[#06070a] border-t border-white/10 pt-20 pb-12 overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-48 bg-gradient-to-t from-rose-950/20 to-transparent blur-[100px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Prominent Instagram Banner Card */}
        <div className="relative rounded-3xl p-8 sm:p-10 bg-gradient-to-r from-amber-500/10 via-rose-500/10 to-purple-600/10 border border-white/10 mb-16 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl p-[2px] story-ring-animated shrink-0">
              <div className="w-full h-full rounded-[14px] bg-[#090A0F] flex items-center justify-center">
                <InstagramIcon className="w-7 h-7 text-rose-400" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-display font-bold text-xl sm:text-2xl text-white">
                  {brand.name}
                </h3>
                <CheckCircle2 className="w-4 h-4 text-sky-400" />
              </div>
              <p className="text-xs sm:text-sm text-slate-300 font-mono">
                {brand.handle} • {brand.tagline}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onOpenAdmin}
              className="px-5 py-3.5 rounded-2xl font-semibold text-xs text-rose-300 bg-white/[0.05] hover:bg-white/[0.1] border border-rose-500/30 flex items-center gap-2 cursor-pointer transition-colors"
            >
              <Settings className="w-4 h-4 text-rose-400" />
              <span>Admin Panel</span>
            </button>

            <a
              href={brand.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3.5 rounded-2xl font-bold text-sm text-white bg-gradient-to-r from-amber-500 via-rose-500 to-purple-600 shadow-xl shadow-rose-500/25 hover:scale-105 active:scale-95 transition-all flex items-center gap-2 shrink-0"
            >
              <InstagramIcon className="w-4 h-4" />
              <span>Follow on Instagram</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-16 border-b border-white/[0.08]">
          
          {/* Brand Info (Col 1-5) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 flex items-center justify-center text-white">
                <InstagramIcon className="w-4 h-4" />
              </div>
              <span className="font-display font-bold text-lg text-white">
                {brand.name}
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-sm">
              {brand.bio}
            </p>

            {/* Social Icons Row */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href={brand.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-white/[0.05] hover:bg-rose-500/20 border border-white/10 hover:border-rose-500/40 text-slate-300 hover:text-rose-400 flex items-center justify-center transition-colors"
                aria-label="Instagram"
              >
                <InstagramIcon className="w-4 h-4" />
              </a>

              <a
                href={brand.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-white/[0.05] hover:bg-red-500/20 border border-white/10 hover:border-red-500/40 text-slate-300 hover:text-red-400 flex items-center justify-center transition-colors"
                aria-label="YouTube"
              >
                <YoutubeIcon className="w-4 h-4" />
              </a>

              <a
                href={brand.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-white/[0.05] hover:bg-blue-500/20 border border-white/10 hover:border-blue-500/40 text-slate-300 hover:text-blue-400 flex items-center justify-center transition-colors"
                aria-label="LinkedIn"
              >
                <LinkedinIcon className="w-4 h-4" />
              </a>

              <a
                href={brand.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-white/[0.05] hover:bg-indigo-500/20 border border-white/10 hover:border-indigo-500/40 text-slate-300 hover:text-indigo-400 flex items-center justify-center transition-colors"
                aria-label="Facebook"
              >
                <FacebookIcon className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Navigation Links (Col 6-8) */}
          <div className="lg:col-span-3">
            <h4 className="font-mono text-xs uppercase tracking-widest text-slate-300 font-semibold mb-4">
              Explore Pages
            </h4>
            <ul className="space-y-2.5">
              {quickNav.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-xs sm:text-sm text-slate-400 hover:text-rose-400 transition-colors inline-block"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter / VIP Drop Signup (Col 9-12) */}
          <div className="lg:col-span-4 space-y-4">
            <h4 className="font-mono text-xs uppercase tracking-widest text-slate-300 font-semibold">
              VIP Creator Drops & Presets
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Stay updated with new aesthetic lookbooks, travel recommendations, and behind-the-scenes stories from {brand.handle}.
            </p>

            {subscribed ? (
              <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                <span>You're subscribed to VIP creator alerts!</span>
              </div>
            ) : (
              <form onSubmit={handleNewsletter} className="flex gap-2">
                <input
                  type="email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="flex-grow px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-rose-500"
                />
                <button
                  type="submit"
                  className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-rose-500 to-purple-600 text-white text-xs font-semibold hover:opacity-95 transition-opacity cursor-pointer shrink-0"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            )}

            <span className="text-[10px] text-slate-500 block">
              No spam ever. Unsubscribe at any time.
            </span>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Scroll to Top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} {brand.name} ({brand.handle}) • All Rights Reserved.</p>

          <p className="flex items-center gap-1.5 text-slate-400">
            <span>Made with</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
            <span>for Instagram Creators & Brands</span>
          </p>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] text-slate-400 hover:text-white transition-colors cursor-pointer"
            title="Scroll to top"
          >
            <span>Top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </footer>
  );
};

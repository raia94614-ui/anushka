import React, { useState } from 'react';
import { MessageCircle, X, ExternalLink, Sparkles, Sun, Moon } from 'lucide-react';
import { InstagramIcon } from './BrandIcons';

export const FloatingActions = ({ instagramUrl = 'https://www.instagram.com/anushkaunveiled/', dmUrl = 'https://ig.me/m/anushkaunveiled', onOpenMediaKit }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3">
      {/* Expanded Quick Links Popup */}
      {open && (
        <div className="p-4 rounded-3xl bg-[#11131E]/95 border border-white/15 backdrop-blur-2xl shadow-2xl flex flex-col gap-2.5 animate-bounceIn w-56">
          <div className="flex items-center justify-between pb-2 border-b border-white/10">
            <span className="text-[11px] font-mono text-slate-400 uppercase">Quick Connect</span>
            <button
              onClick={() => setOpen(false)}
              className="text-slate-400 hover:text-white p-1"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          <a
            href={dmUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 p-2.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-xs font-semibold text-white transition-colors"
          >
            <div className="w-6 h-6 rounded-lg bg-gradient-to-tr from-amber-500 to-rose-500 flex items-center justify-center text-white">
              <InstagramIcon className="w-3.5 h-3.5" />
            </div>
            <span>Direct Instagram DM</span>
          </a>

          <button
            onClick={() => {
              setOpen(false);
              if (onOpenMediaKit) onOpenMediaKit();
            }}
            className="flex items-center gap-2 p-2.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-xs font-semibold text-slate-200 hover:text-white transition-colors text-left cursor-pointer"
          >
            <div className="w-6 h-6 rounded-lg bg-purple-500/20 text-purple-400 flex items-center justify-center">
              <Sparkles className="w-3.5 h-3.5" />
            </div>
            <span>View Media Kit</span>
          </button>
        </div>
      )}

      {/* Main Floating Trigger Button */}
      <button
        onClick={() => setOpen(!open)}
        className="group p-3.5 rounded-full bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 text-white shadow-xl shadow-rose-500/30 hover:scale-110 active:scale-95 transition-all cursor-pointer flex items-center justify-center"
        aria-label="Open quick connect"
        title="Direct Instagram Connect"
      >
        <InstagramIcon className="w-5 h-5 group-hover:rotate-12 transition-transform" />
      </button>
    </div>
  );
};

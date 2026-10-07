import React from 'react';
import { X, ArrowLeft, ExternalLink, Sparkles, Home } from 'lucide-react';
import { InstagramIcon } from './BrandIcons';

export const NotFoundModal = ({ isOpen, onClose, instagramUrl = 'https://www.instagram.com/anushkaunveiled/' }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl animate-fadeIn">
      <div className="relative w-full max-w-md p-8 rounded-3xl bg-[#11131E] border border-white/10 shadow-2xl text-center flex flex-col items-center">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-xl bg-white/[0.05] hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="w-16 h-16 rounded-2xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400 mb-4 font-mono font-bold text-2xl">
          404
        </div>

        <h3 className="font-display font-bold text-2xl text-white mb-2">
          Page / Post Not Found
        </h3>

        <p className="text-sm text-slate-300 mb-6 leading-relaxed">
          The frame you are looking for might have been moved, archived, or is being updated. Explore the main feed or connect directly on Instagram.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 w-full">
          <button
            onClick={onClose}
            className="flex-1 py-3 rounded-xl bg-white/[0.08] hover:bg-white/[0.14] text-white text-xs font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer"
          >
            <Home className="w-4 h-4" />
            <span>Back to Portfolio</span>
          </button>

          <a
            href={instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 py-3 rounded-xl bg-gradient-to-r from-amber-500 via-rose-500 to-purple-600 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-lg shadow-rose-500/25 cursor-pointer"
          >
            <InstagramIcon className="w-4 h-4" />
            <span>Follow on Instagram</span>
          </a>
        </div>
      </div>
    </div>
  );
};

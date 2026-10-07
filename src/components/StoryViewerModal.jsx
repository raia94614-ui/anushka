import React, { useState, useEffect, useRef } from 'react';
import { X, ChevronLeft, ChevronRight, Pause, Play, Heart, Send, CheckCircle2, ExternalLink } from 'lucide-react';
import { InstagramIcon } from './BrandIcons';
import { creatorData as defaultCreatorData } from '../data/creatorData';

export const StoryViewerModal = ({ data = defaultCreatorData, activeHighlight, onClose, onShowToast }) => {
  const currentData = data || defaultCreatorData;
  const brand = currentData.brand;
  const highlights = currentData.storyHighlights || [];

  const initialIndex = highlights.findIndex(h => h.id === activeHighlight?.id);
  const [currentIndex, setCurrentIndex] = useState(initialIndex >= 0 ? initialIndex : 0);
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [liked, setLiked] = useState(false);
  const [replyText, setReplyText] = useState('');

  const activeStory = highlights[currentIndex] || highlights[0];

  useEffect(() => {
    setProgress(0);
    setLiked(false);
  }, [currentIndex]);

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          if (currentIndex < highlights.length - 1) {
            setCurrentIndex(prevIndex => prevIndex + 1);
            return 0;
          } else {
            onClose();
            return 100;
          }
        }
        return prev + 2;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [currentIndex, highlights.length, isPaused, onClose]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === ' ') {
        e.preventDefault();
        setIsPaused(p => !p);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, highlights.length, onClose]);

  const handleNext = () => {
    if (currentIndex < highlights.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      onClose();
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  };

  const handleSendReply = (e) => {
    e.preventDefault();
    if (!replyText.trim()) return;
    if (onShowToast) onShowToast(`Replied to ${brand.handle}'s story! ✨`);
    setReplyText('');
  };

  if (!activeStory) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/95 backdrop-blur-2xl animate-fadeIn">
      
      {/* Background click to close */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Top Close Button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-50 p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
        aria-label="Close stories"
      >
        <X className="w-6 h-6" />
      </button>

      {/* Desktop Prev Button */}
      {currentIndex > 0 && (
        <button
          onClick={handlePrev}
          className="hidden md:flex absolute left-8 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
          aria-label="Previous story"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
      )}

      {/* Desktop Next Button */}
      {currentIndex < highlights.length - 1 && (
        <button
          onClick={handleNext}
          className="hidden md:flex absolute right-8 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
          aria-label="Next story"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      )}

      {/* Phone Story Frame */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-[390px] aspect-[9/16] rounded-3xl overflow-hidden bg-slate-900 border border-white/20 shadow-2xl flex flex-col justify-between z-10"
      >
        {/* Story Background Image */}
        <img
          src={activeStory.image}
          alt={activeStory.title}
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Top/Bottom Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-transparent to-black/85 pointer-events-none" />

        {/* Tap zones for Story Left/Right advancement */}
        <div className="absolute inset-0 z-20 flex">
          <div
            className="w-1/3 h-3/4 cursor-pointer"
            onClick={handlePrev}
            title="Previous story"
          />
          <div
            className="w-1/3 h-3/4 cursor-pointer"
            onClick={() => setIsPaused(p => !p)}
            title="Tap to Pause/Play"
          />
          <div
            className="w-1/3 h-3/4 cursor-pointer"
            onClick={handleNext}
            title="Next story"
          />
        </div>

        {/* Top Progress Bars */}
        <div className="relative z-30 p-4 pb-0">
          <div className="flex items-center gap-1.5 w-full mb-3">
            {highlights.map((h, i) => (
              <div key={h.id} className="flex-1 h-1 bg-white/30 rounded-full overflow-hidden">
                <div
                  className="h-full bg-white transition-all duration-100 ease-linear"
                  style={{
                    width: i < currentIndex ? '100%' : i === currentIndex ? `${progress}%` : '0%'
                  }}
                />
              </div>
            ))}
          </div>

          {/* Story Creator Header */}
          <div className="flex items-center justify-between text-white">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full p-[1.5px] story-ring-animated">
                <img
                  src={brand.avatar}
                  alt={brand.name}
                  className="w-full h-full rounded-full object-cover"
                />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1">
                  <span className="text-xs font-bold font-mono text-white">
                    {brand.handle}
                  </span>
                  <CheckCircle2 className="w-3.5 h-3.5 text-sky-400 fill-sky-400/20" />
                </div>
                <span className="text-[10px] text-slate-300 font-mono">
                  Highlight: {activeStory.title}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsPaused(p => !p)}
                className="p-1.5 rounded-full bg-black/40 text-white hover:bg-black/60 cursor-pointer"
                title={isPaused ? "Play" : "Pause"}
              >
                {isPaused ? <Play className="w-3.5 h-3.5 fill-white ml-0.5" /> : <Pause className="w-3.5 h-3.5 fill-white" />}
              </button>

              <button
                onClick={onClose}
                className="p-1.5 rounded-full bg-black/40 text-white hover:bg-black/60 cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Story Footer: Reply & Like */}
        <div className="relative z-30 p-4">
          <div className="flex items-center gap-2 mb-2">
            <form onSubmit={handleSendReply} className="flex-1 flex gap-2">
              <input
                type="text"
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                placeholder={`Send message to ${brand.handle}...`}
                className="w-full px-4 py-2.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs text-white placeholder:text-slate-300 focus:outline-none focus:border-rose-400"
              />
            </form>

            <button
              onClick={() => {
                setLiked(!liked);
                if (onShowToast) onShowToast(!liked ? 'Liked Story ❤️' : 'Unliked');
              }}
              className="p-2.5 rounded-full bg-white/10 backdrop-blur-md text-white hover:bg-white/20 transition-transform active:scale-125 cursor-pointer"
            >
              <Heart className={`w-5 h-5 ${liked ? 'text-rose-500 fill-rose-500' : 'text-white'}`} />
            </button>
          </div>

          <a
            href={brand.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-2 rounded-xl bg-white/[0.08] hover:bg-white/[0.16] backdrop-blur-md text-white text-[11px] font-semibold flex items-center justify-center gap-1.5 transition-colors"
          >
            <InstagramIcon className="w-3.5 h-3.5" />
            <span>Open {brand.handle} on Instagram</span>
            <ExternalLink className="w-3 h-3 text-slate-300" />
          </a>
        </div>

      </div>

    </div>
  );
};

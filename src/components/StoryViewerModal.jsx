import React, { useState, useEffect, useRef } from 'react';
import { 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Pause, 
  Play, 
  Heart, 
  Send, 
  CheckCircle2, 
  ExternalLink,
  Volume2,
  VolumeX,
  Share2,
  Bookmark,
  Sparkles
} from 'lucide-react';
import { InstagramIcon } from './BrandIcons';
import { creatorData as defaultCreatorData } from '../data/creatorData';

export const StoryViewerModal = ({ data = defaultCreatorData, activeHighlight, onClose, onShowToast }) => {
  const currentData = data || defaultCreatorData;
  const brand = currentData.brand;
  const highlights = currentData.storyHighlights || [];

  const initialIndex = highlights.findIndex(h => h.id === activeHighlight?.id);
  const [currentHighlightIndex, setCurrentHighlightIndex] = useState(initialIndex >= 0 ? initialIndex : 0);
  const [slideIndex, setSlideIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [replyText, setReplyText] = useState('');
  const [floatingHearts, setFloatingHearts] = useState([]);

  const activeHighlightItem = highlights[currentHighlightIndex] || highlights[0] || {
    id: 'fits',
    title: 'Highlights',
    image: '/anushka_avatar.jpg'
  };

  // Build slides for the current highlight (support either explicit slides or multiple photo representations)
  const slides = activeHighlightItem.slides && activeHighlightItem.slides.length > 0
    ? activeHighlightItem.slides
    : [
        {
          id: `${activeHighlightItem.id}-1`,
          image: activeHighlightItem.image || brand.avatar || '/anushka_avatar.jpg',
          caption: activeHighlightItem.caption || `${activeHighlightItem.title} • Documenting life in my element ✨`,
          time: '12h'
        },
        {
          id: `${activeHighlightItem.id}-2`,
          image: activeHighlightItem.imageSecondary || brand.coverImage || activeHighlightItem.image || '/anushka_avatar.jpg',
          caption: `Aesthetic moments from @${brand.shortHandle || 'anushkaunveiled'} 🕊️`,
          time: '18h'
        }
      ];

  const currentSlide = slides[slideIndex] || slides[0];

  // Reset slide and progress when highlight changes
  useEffect(() => {
    setSlideIndex(0);
    setProgress(0);
    setLiked(false);
  }, [currentHighlightIndex]);

  // Reset progress when slide changes
  useEffect(() => {
    setProgress(0);
    setLiked(false);
  }, [slideIndex]);

  // Auto-advancing story timer
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          // Advance to next slide or next highlight
          if (slideIndex < slides.length - 1) {
            setSlideIndex(s => s + 1);
            return 0;
          } else if (currentHighlightIndex < highlights.length - 1) {
            setCurrentHighlightIndex(h => h + 1);
            return 0;
          } else {
            onClose();
            return 100;
          }
        }
        return prev + 2;
      });
    }, 90);

    return () => clearInterval(interval);
  }, [currentHighlightIndex, slideIndex, slides.length, highlights.length, isPaused, onClose]);

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
  }, [currentHighlightIndex, slideIndex, slides.length, highlights.length, onClose]);

  const handleNext = () => {
    if (slideIndex < slides.length - 1) {
      setSlideIndex(s => s + 1);
    } else if (currentHighlightIndex < highlights.length - 1) {
      setCurrentHighlightIndex(h => h + 1);
    } else {
      onClose();
    }
  };

  const handlePrev = () => {
    if (slideIndex > 0) {
      setSlideIndex(s => s - 1);
    } else if (currentHighlightIndex > 0) {
      setCurrentHighlightIndex(h => h - 1);
    }
  };

  const handleSendReply = (e) => {
    e.preventDefault();
    if (!replyText.trim()) return;
    if (onShowToast) onShowToast(`Replied to ${brand.handle}'s story: "${replyText.trim()}" ✨`);
    setReplyText('');
  };

  const handleLike = () => {
    setLiked(!liked);
    if (!liked) {
      // Trigger floating heart animation
      const newHeart = { id: Date.now(), x: Math.random() * 40 - 20 };
      setFloatingHearts(prev => [...prev, newHeart]);
      setTimeout(() => {
        setFloatingHearts(prev => prev.filter(h => h.id !== newHeart.id));
      }, 1500);
      if (onShowToast) onShowToast(`Liked ${activeHighlightItem.title} story ❤️`);
    }
  };

  const handleShare = () => {
    navigator.clipboard.writeText(brand.instagramUrl);
    if (onShowToast) onShowToast('Story link copied to clipboard!');
  };

  // Image fallback helper
  const handleImageError = (e) => {
    if (e.target.src !== brand.avatar && e.target.src !== '/anushka_avatar.jpg') {
      e.target.src = brand.avatar || '/anushka_avatar.jpg';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/95 backdrop-blur-2xl animate-fadeIn select-none">
      
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

      {/* Desktop Prev Highlight / Slide Button */}
      {(currentHighlightIndex > 0 || slideIndex > 0) && (
        <button
          onClick={handlePrev}
          className="hidden md:flex absolute left-8 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-white/10 hover:bg-white/25 text-white transition-all cursor-pointer hover:scale-110 active:scale-95"
          aria-label="Previous story"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
      )}

      {/* Desktop Next Highlight / Slide Button */}
      {(currentHighlightIndex < highlights.length - 1 || slideIndex < slides.length - 1) && (
        <button
          onClick={handleNext}
          className="hidden md:flex absolute right-8 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-white/10 hover:bg-white/25 text-white transition-all cursor-pointer hover:scale-110 active:scale-95"
          aria-label="Next story"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      )}

      {/* Phone Story Container (9:16 Aspect Ratio) */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-[390px] sm:max-w-[420px] aspect-[9/16] rounded-3xl overflow-hidden bg-[#0a0c14] border border-white/20 shadow-2xl flex flex-col justify-between z-10"
      >
        {/* Story Background Image (with Fallback) */}
        <img
          src={currentSlide.image || activeHighlightItem.image || brand.avatar || '/anushka_avatar.jpg'}
          alt={activeHighlightItem.title}
          onError={handleImageError}
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Instagram Scrim Gradients */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black/90 pointer-events-none" />

        {/* Tap areas for previous/next slide navigation */}
        <div className="absolute inset-0 z-20 flex">
          <div
            className="w-2/5 h-3/4 cursor-pointer"
            onClick={handlePrev}
            title="Previous Story"
          />
          <div
            className="w-1/5 h-3/4 cursor-pointer"
            onClick={() => setIsPaused(p => !p)}
            title="Hold to Pause"
          />
          <div
            className="w-2/5 h-3/4 cursor-pointer"
            onClick={handleNext}
            title="Next Story"
          />
        </div>

        {/* Floating Heart Animations */}
        {floatingHearts.map((heart) => (
          <div
            key={heart.id}
            className="absolute bottom-20 right-8 z-30 pointer-events-none animate-[float-heart_1.2s_ease-out_forwards]"
            style={{ transform: `translateX(${heart.x}px)` }}
          >
            <Heart className="w-8 h-8 text-rose-500 fill-rose-500 drop-shadow-lg" />
          </div>
        ))}

        {/* ============================================================ */}
        {/* TOP STORY HEADER */}
        {/* ============================================================ */}
        <div className="relative z-30 p-4 pb-0">
          
          {/* Multi-segment Story Progress Bars */}
          <div className="flex items-center gap-1.5 w-full mb-3">
            {slides.map((s, i) => (
              <div key={s.id || i} className="flex-1 h-1 bg-white/25 rounded-full overflow-hidden">
                <div
                  className="h-full bg-white transition-all duration-100 ease-linear"
                  style={{
                    width: i < slideIndex ? '100%' : i === slideIndex ? `${progress}%` : '0%'
                  }}
                />
              </div>
            ))}
          </div>

          {/* Profile & Story Header Bar */}
          <div className="flex items-center justify-between text-white">
            <div className="flex items-center gap-2.5">
              
              {/* Creator Profile Avatar */}
              <div className="w-10 h-10 rounded-full p-[2px] story-ring-animated shrink-0">
                <div className="w-full h-full rounded-full p-[1.5px] bg-[#090A0F] overflow-hidden">
                  <img
                    src={brand.avatar || '/anushka_avatar.jpg'}
                    alt={brand.name}
                    onError={handleImageError}
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
              </div>

              {/* Creator Info */}
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-bold font-mono text-white tracking-tight">
                    {brand.shortHandle || 'anushkaunveiled'}
                  </span>
                  <CheckCircle2 className="w-3.5 h-3.5 text-sky-400 fill-sky-400/20" />
                  <span className="text-[11px] text-white/70 font-mono">• {currentSlide.time || '14h'}</span>
                </div>

                {/* Highlight Name Tag */}
                <div className="flex items-center gap-1">
                  <span className="text-[10px] font-medium text-rose-300 bg-rose-500/20 border border-rose-500/30 px-2 py-0.2 rounded-full mt-0.5">
                    {activeHighlightItem.title}
                  </span>
                </div>
              </div>
            </div>

            {/* Controls: Pause/Play, Mute, Close */}
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setIsPaused(p => !p)}
                className="p-1.5 rounded-full bg-black/40 text-white/90 hover:text-white backdrop-blur-md cursor-pointer"
                title={isPaused ? "Play Story" : "Pause Story"}
              >
                {isPaused ? <Play className="w-3.5 h-3.5 fill-white ml-0.5" /> : <Pause className="w-3.5 h-3.5 fill-white" />}
              </button>

              <button
                onClick={() => setIsMuted(!isMuted)}
                className="p-1.5 rounded-full bg-black/40 text-white/90 hover:text-white backdrop-blur-md cursor-pointer"
                title="Audio"
              >
                {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
              </button>

              <button
                onClick={onClose}
                className="p-1.5 rounded-full bg-black/40 text-white/90 hover:text-white backdrop-blur-md cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Center Pause Indicator Overlay */}
        {isPaused && (
          <div className="relative z-30 self-center my-auto pointer-events-none animate-fadeIn">
            <div className="px-4 py-2 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white text-xs font-semibold flex items-center gap-1.5 shadow-xl">
              <Pause className="w-3.5 h-3.5 fill-white" />
              <span>Paused</span>
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* BOTTOM STORY FOOTER & INTERACTION */}
        {/* ============================================================ */}
        <div className="relative z-30 p-4 pt-0 space-y-3">
          
          {/* Story Caption snippet */}
          {currentSlide.caption && (
            <p className="text-xs text-white/95 font-medium leading-relaxed drop-shadow-md bg-black/40 backdrop-blur-sm p-2.5 rounded-xl border border-white/10">
              {currentSlide.caption}
            </p>
          )}

          {/* Highlights Switcher Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
            {highlights.map((h, idx) => (
              <button
                key={h.id}
                onClick={() => setCurrentHighlightIndex(idx)}
                className={`px-2.5 py-1 rounded-full text-[10px] font-mono whitespace-nowrap transition-all cursor-pointer ${
                  idx === currentHighlightIndex
                    ? 'bg-gradient-to-r from-amber-500 to-rose-500 text-white font-bold shadow-md'
                    : 'bg-black/60 backdrop-blur-md text-slate-300 hover:text-white border border-white/15'
                }`}
              >
                {h.title}
              </button>
            ))}
          </div>

          {/* Reply Box & Action Buttons */}
          <div className="flex items-center gap-2">
            
            {/* Direct Message Input */}
            <form onSubmit={handleSendReply} className="flex-1 flex gap-2">
              <input
                type="text"
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                onFocus={() => setIsPaused(true)}
                onBlur={() => setIsPaused(false)}
                placeholder={`Send message to @${brand.shortHandle || 'anushkaunveiled'}...`}
                className="w-full px-4 py-2.5 rounded-full bg-black/50 backdrop-blur-md border border-white/20 text-xs text-white placeholder:text-slate-300 focus:outline-none focus:border-rose-400 focus:bg-black/70"
              />
            </form>

            {/* Like Heart Button */}
            <button
              onClick={handleLike}
              className="p-2.5 rounded-full bg-black/50 backdrop-blur-md border border-white/20 text-white hover:text-rose-400 transition-transform active:scale-125 cursor-pointer"
              title="Like Story"
            >
              <Heart className={`w-5 h-5 ${liked ? 'text-rose-500 fill-rose-500' : 'text-white'}`} />
            </button>

            {/* Share Story Button */}
            <button
              onClick={handleShare}
              className="p-2.5 rounded-full bg-black/50 backdrop-blur-md border border-white/20 text-white hover:text-rose-400 transition-colors cursor-pointer"
              title="Share Story"
            >
              <Share2 className="w-5 h-5" />
            </button>

          </div>

          {/* Direct Open in Instagram App / Web */}
          <a
            href={brand.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-2 rounded-xl bg-gradient-to-r from-amber-500/90 via-rose-500/90 to-purple-600/90 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-lg shadow-rose-500/25"
          >
            <InstagramIcon className="w-3.5 h-3.5" />
            <span>Open @{brand.shortHandle || 'anushkaunveiled'} on Instagram</span>
            <ExternalLink className="w-3.5 h-3.5 text-white/80" />
          </a>

        </div>

      </div>

    </div>
  );
};

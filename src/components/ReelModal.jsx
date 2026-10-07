import React, { useState, useEffect, useRef } from 'react';
import { 
  X, 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Heart, 
  MessageCircle, 
  Share2, 
  Bookmark, 
  Sparkles, 
  Music2, 
  CheckCircle2, 
  ExternalLink,
  Layers,
  Film,
  Radio
} from 'lucide-react';
import { InstagramIcon } from './BrandIcons';
import { extractInstagramShortcode, getInstagramEmbedUrl } from '../services/instagramService';
import { creatorData as defaultCreatorData } from '../data/creatorData';

export const ReelModal = ({ data = defaultCreatorData, reel, onClose, onShowToast }) => {
  const currentData = data || defaultCreatorData;
  const brand = currentData.brand;

  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [progress, setProgress] = useState(0);

  // Determine if reel has an Instagram link or direct video
  const rawUrl = reel?.instagramUrl || '';
  const shortcode = extractInstagramShortcode(rawUrl) || reel?.shortcode;
  const embedUrl = shortcode ? getInstagramEmbedUrl(rawUrl || shortcode) : reel?.embedUrl;

  const hasDirectVideo = !!(reel?.video || reel?.videoUrl || (typeof reel?.thumbnail === 'string' && (reel.thumbnail.startsWith('data:video/') || /\.(mp4|webm|mov)(\?.*)?$/i.test(reel.thumbnail))));
  const videoSource = reel?.video || reel?.videoUrl || (hasDirectVideo ? reel?.thumbnail : null);

  // View mode: 'cinematic' | 'embed'
  const [viewMode, setViewMode] = useState(embedUrl && !hasDirectVideo ? 'embed' : 'cinematic');

  // Video progress synchronization
  useEffect(() => {
    if (!hasDirectVideo) {
      if (!isPlaying) return;
      const interval = setInterval(() => {
        setProgress(prev => (prev >= 100 ? 0 : prev + 1.5));
      }, 200);
      return () => clearInterval(interval);
    }
  }, [isPlaying, hasDirectVideo]);

  useEffect(() => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.play().catch(() => {});
      } else {
        videoRef.current.pause();
      }
    }
  }, [isPlaying]);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = isMuted;
    }
  }, [isMuted]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === ' ') {
        e.preventDefault();
        setIsPlaying(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!reel) return null;

  const toggleLike = () => {
    setLiked(!liked);
    if (onShowToast) {
      onShowToast(!liked ? 'Liked Reel ❤️' : 'Unliked');
    }
  };

  const toggleSave = () => {
    setSaved(!saved);
    if (onShowToast) {
      onShowToast(!saved ? 'Saved Reel to collection 🔖' : 'Removed from collection');
    }
  };

  const handleShare = () => {
    navigator.clipboard.writeText(reel.instagramUrl || `${brand.instagramUrl}reels/`);
    if (onShowToast) onShowToast('Reel link copied to clipboard!');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/95 backdrop-blur-2xl animate-fadeIn select-none">
      
      {/* Background click to close */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Top Header Controls */}
      <div className="absolute top-4 right-4 z-50 flex items-center gap-2">
        {/* View Switcher Pill (if embed is available) */}
        {embedUrl && (
          <div className="flex items-center p-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-xs">
            <button
              onClick={() => setViewMode('embed')}
              className={`px-3 py-1 rounded-full font-mono text-[11px] transition-all cursor-pointer flex items-center gap-1.5 ${
                viewMode === 'embed'
                  ? 'bg-gradient-to-r from-amber-500 via-rose-500 to-purple-600 text-white font-bold shadow'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <InstagramIcon className="w-3.5 h-3.5" />
              <span>Insta Embed</span>
            </button>
            <button
              onClick={() => setViewMode('cinematic')}
              className={`px-3 py-1 rounded-full font-mono text-[11px] transition-all cursor-pointer flex items-center gap-1.5 ${
                viewMode === 'cinematic'
                  ? 'bg-gradient-to-r from-amber-500 via-rose-500 to-purple-600 text-white font-bold shadow'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <Film className="w-3.5 h-3.5" />
              <span>9:16 Cinematic</span>
            </button>
          </div>
        )}

        <button
          onClick={onClose}
          className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* ============================================================ */}
      {/* EMBED MODE: OFFICIAL INSTAGRAM REEL IFRAME PLAYER */}
      {/* ============================================================ */}
      {viewMode === 'embed' && embedUrl ? (
        <div 
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-[420px] h-[85vh] max-h-[750px] rounded-3xl overflow-hidden bg-[#0a0c14] border border-white/20 shadow-2xl flex flex-col z-10"
        >
          {/* Top Bar */}
          <div className="px-4 py-2.5 bg-[#11131E] border-b border-white/10 flex items-center justify-between text-xs text-white shrink-0">
            <div className="flex items-center gap-2">
              <InstagramIcon className="w-4 h-4 text-rose-400" />
              <span className="font-bold">Live Instagram Reel</span>
            </div>
            <a
              href={reel.instagramUrl || `${brand.instagramUrl}reels/`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[11px] text-rose-300 hover:text-white flex items-center gap-1 font-mono underline"
            >
              <span>Open in App</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          {/* Iframe */}
          <div className="flex-grow w-full h-full bg-black relative">
            <iframe
              src={embedUrl}
              className="w-full h-full border-0"
              allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
              allowFullScreen
              title={reel.title || 'Instagram Reel'}
            />
          </div>
        </div>
      ) : (
        /* ============================================================ */
        /* CINEMATIC MODE: 9:16 VERTICAL PLAYER (VIDEO / SIMULATED) */
        /* ============================================================ */
        <div 
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-[380px] sm:max-w-[420px] aspect-[9/16] rounded-3xl overflow-hidden bg-slate-900 border border-white/20 shadow-2xl flex flex-col justify-between z-10"
        >
          {/* Video Player or Background Thumbnail */}
          {hasDirectVideo && videoSource ? (
            <video
              ref={videoRef}
              src={videoSource}
              playsInline
              autoPlay
              loop
              muted={isMuted}
              onTimeUpdate={(e) => {
                const el = e.currentTarget;
                if (el.duration && !isNaN(el.duration)) {
                  setProgress((el.currentTime / el.duration) * 100);
                }
              }}
              className="absolute inset-0 w-full h-full object-cover"
            />
          ) : (
            <img
              src={reel.thumbnail}
              alt={reel.title}
              className="absolute inset-0 w-full h-full object-cover"
            />
          )}

          {/* Video Scrim Gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/95 pointer-events-none" />

          {/* Top Video Progress Bar */}
          <div className="relative z-20 w-full px-4 pt-4">
            <div className="w-full h-1 bg-white/20 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-amber-500 to-rose-500 transition-all duration-200"
                style={{ width: `${progress}%` }}
              />
            </div>

            {/* Top Bar with Creator Name & Audio Tag */}
            <div className="flex items-center justify-between mt-3 text-white">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full p-[1.5px] story-ring-animated">
                  <img 
                    src={brand.avatar} 
                    alt={brand.name} 
                    onError={(e) => { e.target.src = brand.fallbackAvatar; }}
                    className="w-full h-full rounded-full object-cover" 
                  />
                </div>
                <div className="flex items-center gap-1">
                  <span className="font-semibold text-xs text-white font-mono">
                    {brand.shortHandle || 'anushkaunveiled'}
                  </span>
                  <CheckCircle2 className="w-3 h-3 text-sky-400" />
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsMuted(!isMuted)}
                  className="p-1.5 rounded-full bg-black/40 backdrop-blur-md text-white/90 hover:text-white cursor-pointer"
                  title="Toggle mute"
                >
                  {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                </button>

                <span className="px-2.5 py-0.5 rounded-full bg-rose-500 text-[10px] font-bold text-white uppercase">
                  {reel.views || 'Reel'}
                </span>
              </div>
            </div>
          </div>

          {/* Center Screen: Tap to Play / Pause */}
          <div 
            onClick={() => setIsPlaying(!isPlaying)}
            className="relative z-10 flex-grow flex items-center justify-center cursor-pointer"
          >
            {!isPlaying && (
              <div className="w-16 h-16 rounded-full bg-black/60 backdrop-blur-md border border-white/20 flex items-center justify-center text-white animate-scaleUp">
                <Play className="w-8 h-8 fill-white ml-1" />
              </div>
            )}
          </div>

          {/* Floating Right Actions Bar (Instagram Reels UI) */}
          <div className="absolute right-4 bottom-24 z-20 flex flex-col items-center gap-4 text-white">
            
            {/* Like */}
            <button
              onClick={toggleLike}
              className="flex flex-col items-center gap-1 cursor-pointer group"
            >
              <div className="w-11 h-11 rounded-full bg-black/40 backdrop-blur-md border border-white/10 flex items-center justify-center text-white group-active:scale-125 transition-transform">
                <Heart className={`w-6 h-6 ${liked ? 'text-rose-500 fill-rose-500' : 'text-white'}`} />
              </div>
              <span className="text-[11px] font-mono font-semibold">
                {reel.likes || 'Watch'}
              </span>
            </button>

            {/* Comments */}
            <div className="flex flex-col items-center gap-1">
              <div className="w-11 h-11 rounded-full bg-black/40 backdrop-blur-md border border-white/10 flex items-center justify-center text-white">
                <MessageCircle className="w-6 h-6" />
              </div>
              <span className="text-[11px] font-mono font-semibold">
                {reel.comments || 'Audio'}
              </span>
            </div>

            {/* Share */}
            <button
              onClick={handleShare}
              className="flex flex-col items-center gap-1 cursor-pointer group"
            >
              <div className="w-11 h-11 rounded-full bg-black/40 backdrop-blur-md border border-white/10 flex items-center justify-center text-white group-hover:text-rose-400 transition-colors">
                <Share2 className="w-6 h-6" />
              </div>
              <span className="text-[10px] font-mono">Share</span>
            </button>

            {/* Save */}
            <button
              onClick={toggleSave}
              className="flex flex-col items-center gap-1 cursor-pointer group"
            >
              <div className="w-11 h-11 rounded-full bg-black/40 backdrop-blur-md border border-white/10 flex items-center justify-center text-white">
                <Bookmark className={`w-6 h-6 ${saved ? 'text-amber-400 fill-amber-400' : 'text-white'}`} />
              </div>
            </button>
          </div>

          {/* Bottom Caption, Audio & CTA */}
          <div className="relative z-20 p-5 pr-16 bg-gradient-to-t from-black via-black/80 to-transparent">
            
            <h3 className="font-display font-bold text-sm sm:text-base text-white mb-1.5 leading-snug">
              {reel.title}
            </h3>

            <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed mb-3">
              {reel.caption}
            </p>

            {/* Audio Wave Pill */}
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.08] backdrop-blur-md border border-white/10 text-[11px] text-slate-200 font-mono w-fit mb-3">
              <Music2 className="w-3.5 h-3.5 text-rose-400" />
              <span className="truncate max-w-[170px]">{reel.sound}</span>
            </div>

            <a
              href={reel.instagramUrl || `${brand.instagramUrl}reels/`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-amber-500 via-rose-500 to-purple-600 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-lg shadow-rose-500/30"
            >
              <InstagramIcon className="w-4 h-4" />
              <span>Open in Instagram Reels</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

        </div>
      )}

    </div>
  );
};


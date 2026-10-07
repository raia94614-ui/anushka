import React, { useState, useEffect } from 'react';
import { 
  X, 
  Heart, 
  MessageCircle, 
  Send, 
  Bookmark, 
  MapPin, 
  Calendar, 
  ChevronLeft, 
  ChevronRight, 
  CheckCircle2, 
  Share2, 
  ExternalLink 
} from 'lucide-react';
import { InstagramIcon } from './BrandIcons';
import { creatorData as defaultCreatorData } from '../data/creatorData';

export const LightboxModal = ({ data = defaultCreatorData, item, items, currentIndex, onClose, onNavigate, onShowToast }) => {
  const currentData = data || defaultCreatorData;
  const brand = currentData.brand;

  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [likeCount, setLikeCount] = useState(item?.likesCount || 0);
  const [newComment, setNewComment] = useState('');
  const [commentsList, setCommentsList] = useState(item?.commentsList || [
    { user: 'community', text: 'Stunning aesthetic and framing! ✨', time: 'Recent' }
  ]);

  useEffect(() => {
    if (item) {
      setLiked(false);
      setSaved(false);
      setLikeCount(item.likesCount || 0);
      setCommentsList(item.commentsList || [
        { user: 'community', text: 'Stunning aesthetic and framing! ✨', time: 'Recent' }
      ]);
    }
  }, [item]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight' && items && currentIndex < items.length - 1) {
        onNavigate(currentIndex + 1);
      }
      if (e.key === 'ArrowLeft' && items && currentIndex > 0) {
        onNavigate(currentIndex - 1);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, items, onClose, onNavigate]);

  if (!item) return null;

  const toggleLike = () => {
    if (!liked) {
      setLiked(true);
      setLikeCount(prev => prev + 1);
      if (onShowToast) onShowToast('Liked post ❤️');
    } else {
      setLiked(false);
      setLikeCount(prev => (prev > 0 ? prev - 1 : 0));
    }
  };

  const toggleSave = () => {
    setSaved(!saved);
    if (onShowToast) {
      onShowToast(!saved ? 'Saved post to collection 🔖' : 'Removed from saved');
    }
  };

  const handleAddComment = (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    setCommentsList(prev => [
      ...prev,
      { user: 'you', text: newComment.trim(), time: 'Just now' }
    ]);
    setNewComment('');
    if (onShowToast) onShowToast('Comment added!');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/90 backdrop-blur-xl animate-fadeIn">
      
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-50 p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
        aria-label="Close modal"
      >
        <X className="w-6 h-6" />
      </button>

      {/* Navigation Left */}
      {items && currentIndex > 0 && (
        <button
          onClick={() => onNavigate(currentIndex - 1)}
          className="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
          aria-label="Previous image"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
      )}

      {/* Navigation Right */}
      {items && currentIndex < items.length - 1 && (
        <button
          onClick={() => onNavigate(currentIndex + 1)}
          className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
          aria-label="Next image"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      )}

      {/* Main Lightbox Box */}
      <div 
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-5xl max-h-[90vh] rounded-3xl bg-[#0e101b] border border-white/10 shadow-2xl overflow-hidden flex flex-col md:flex-row"
      >
        
        {/* Left Side: Image Display */}
        <div className="md:w-3/5 bg-black flex items-center justify-center relative overflow-hidden min-h-[300px] max-h-[50vh] md:max-h-[85vh]">
          <img
            src={item.image}
            alt={item.title}
            className="w-full h-full object-contain"
          />

          <div className="absolute top-4 left-4">
            <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-xs font-semibold text-white">
              {item.category}
            </span>
          </div>
        </div>

        {/* Right Side: Instagram Post Details, Captions & Comments */}
        <div className="md:w-2/5 p-6 flex flex-col justify-between overflow-y-auto max-h-[45vh] md:max-h-[85vh] bg-[#0e101b] border-t md:border-t-0 md:border-l border-white/10">
          
          <div>
            {/* Creator Header */}
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full p-[2px] story-ring-animated">
                  <div className="w-full h-full rounded-full p-[2px] bg-[#0e101b]">
                    <img 
                      src={brand.avatar} 
                      alt={brand.name}
                      onError={(e) => { e.target.src = brand.fallbackAvatar; }}
                      className="w-full h-full rounded-full object-cover" 
                    />
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-display font-bold text-sm text-white">
                      {brand.name}
                    </span>
                    <CheckCircle2 className="w-3.5 h-3.5 text-sky-400" />
                  </div>
                  <span className="text-[11px] text-slate-400 font-mono">
                    {brand.handle}
                  </span>
                </div>
              </div>

              <a
                href={brand.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 text-xs font-semibold flex items-center gap-1 transition-colors"
              >
                <InstagramIcon className="w-3.5 h-3.5" />
                <span>Follow</span>
              </a>
            </div>

            {/* Post Title & Location */}
            <div className="pt-4 pb-3">
              <div className="flex items-center gap-3 text-[11px] text-slate-400 font-mono mb-2">
                {item.location && (
                  <span className="flex items-center gap-1 text-rose-400">
                    <MapPin className="w-3 h-3" />
                    {item.location}
                  </span>
                )}
                {item.date && (
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {item.date}
                  </span>
                )}
              </div>

              <h3 className="font-display font-bold text-base text-white mb-2 leading-snug">
                {item.title}
              </h3>

              {item.caption && (
                <p className="text-xs text-slate-300 leading-relaxed whitespace-pre-line mb-3">
                  {item.caption}
                </p>
              )}

              {item.tags && (
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {(Array.isArray(item.tags) ? item.tags : [item.tags]).map((tag, idx) => (
                    <span key={idx} className="text-[10px] text-rose-400/80 font-mono">
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Comments Stream */}
            <div className="pt-3 border-t border-white/[0.06] space-y-2.5">
              <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block mb-2">
                Community Notes
              </span>
              {commentsList.map((comm, idx) => (
                <div key={idx} className="flex items-start gap-2 text-xs">
                  <span className="font-semibold text-white font-mono shrink-0">
                    @{comm.user}
                  </span>
                  <span className="text-slate-300 leading-tight">
                    {comm.text}
                  </span>
                  <span className="text-[10px] text-slate-500 ml-auto shrink-0 font-mono">
                    {comm.time}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Action Toolbar & Simulated Add Comment */}
          <div className="pt-4 mt-4 border-t border-white/10 space-y-3">
            
            {/* Heart, Comment, Share, Bookmark buttons */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <button
                  onClick={toggleLike}
                  className="flex items-center gap-1.5 text-xs text-white focus:outline-none cursor-pointer group"
                >
                  <Heart className={`w-5 h-5 transition-transform group-active:scale-125 ${liked ? 'text-rose-500 fill-rose-500' : 'text-slate-300 group-hover:text-rose-400'}`} />
                  <span className="font-mono font-semibold">{likeCount > 0 ? likeCount : 'Like'}</span>
                </button>

                <div className="flex items-center gap-1 text-xs text-slate-300">
                  <MessageCircle className="w-5 h-5" />
                  <span className="font-mono">{commentsList.length}</span>
                </div>

                <button
                  onClick={() => {
                    navigator.clipboard.writeText(brand.instagramUrl);
                    if (onShowToast) onShowToast('Instagram link copied to clipboard!');
                  }}
                  className="text-slate-300 hover:text-white transition-colors cursor-pointer"
                  title="Share post"
                >
                  <Share2 className="w-5 h-5" />
                </button>
              </div>

              <button
                onClick={toggleSave}
                className="text-slate-300 hover:text-white transition-colors cursor-pointer"
                title="Save post"
              >
                <Bookmark className={`w-5 h-5 ${saved ? 'text-amber-400 fill-amber-400' : ''}`} />
              </button>
            </div>

            {/* Comment Input */}
            <form onSubmit={handleAddComment} className="flex gap-2">
              <input
                type="text"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Add a note or comment..."
                className="flex-grow px-3.5 py-2 rounded-xl bg-white/[0.04] border border-white/10 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-rose-500"
              />
              <button
                type="submit"
                className="px-3 py-2 rounded-xl bg-gradient-to-r from-rose-500 to-purple-600 text-white text-xs font-semibold cursor-pointer shrink-0"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>

            <a
              href={item.instagramUrl || brand.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-[11px] font-semibold text-rose-300 flex items-center justify-center gap-1.5 transition-colors"
            >
              <InstagramIcon className="w-3.5 h-3.5" />
              <span>View on Instagram</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

        </div>

      </div>
    </div>
  );
};

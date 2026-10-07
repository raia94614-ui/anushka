import React, { useEffect } from 'react';
import { Sparkles, CheckCircle2, X } from 'lucide-react';

export const Toast = ({ message, onClose }) => {
  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(() => {
      onClose();
    }, 3500);
    return () => clearTimeout(timer);
  }, [message, onClose]);

  if (!message) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-bounceIn">
      <div className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-[#161827]/95 border border-rose-500/40 backdrop-blur-xl shadow-2xl shadow-rose-500/20 text-white text-xs sm:text-sm font-medium">
        <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-rose-500 to-purple-600 flex items-center justify-center text-white shrink-0">
          <Sparkles className="w-3.5 h-3.5" />
        </div>
        <span>{message}</span>
        <button
          onClick={onClose}
          className="p-1 rounded-lg text-slate-400 hover:text-white transition-colors cursor-pointer"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};

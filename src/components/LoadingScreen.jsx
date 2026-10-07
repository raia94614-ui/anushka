import React, { useEffect, useState } from 'react';
import { Sparkles } from 'lucide-react';

export const LoadingScreen = ({ onFinish }) => {
  const [fade, setFade] = useState(false);

  useEffect(() => {
    const timer1 = setTimeout(() => {
      setFade(true);
    }, 700);

    const timer2 = setTimeout(() => {
      if (onFinish) onFinish();
    }, 950);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [onFinish]);

  return (
    <div
      className={`fixed inset-0 z-[99999] bg-[#090A0F] flex flex-col items-center justify-center transition-opacity duration-300 ${
        fade ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      <div className="flex flex-col items-center gap-4 text-center px-4 animate-scaleUp">
        {/* Animated Avatar Ring */}
        <div className="w-20 h-20 rounded-full p-[2.5px] story-ring-animated shadow-2xl shadow-rose-500/30">
          <div className="w-full h-full rounded-full p-[2px] bg-[#090A0F] overflow-hidden">
            <img
              src="/anushka_avatar.jpg"
              alt="Anushka Unveiled"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div>
          <h1 className="font-display font-black text-xl sm:text-2xl text-white tracking-wider uppercase">
            ANUSHKA UNVEILED
          </h1>
          <p className="text-xs text-rose-400 font-mono tracking-widest mt-1 flex items-center justify-center gap-1.5">
            <Sparkles className="w-3 h-3 animate-spin" />
            <span>DOCUMENTING LIFE IN MY ELEMENT</span>
          </p>
        </div>

        {/* Minimal Progress Line */}
        <div className="w-36 h-0.5 bg-white/10 rounded-full overflow-hidden mt-2">
          <div className="h-full bg-gradient-to-r from-amber-400 via-rose-500 to-purple-600 rounded-full animate-[loading-bar_0.8s_ease-out_forwards]" />
        </div>
      </div>
    </div>
  );
};

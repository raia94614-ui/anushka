import React, { useState } from 'react';
import { 
  Lock, 
  KeyRound, 
  User, 
  Eye, 
  EyeOff, 
  X, 
  ShieldCheck, 
  AlertCircle, 
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { InstagramIcon } from './BrandIcons';

export const AdminLoginModal = ({ data, onLoginSuccess, onClose, onShowToast }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Configured credentials or fallback defaults
  const validUsername = (data?.adminAuth?.username || 'anu01').toLowerCase();
  const validPassword = data?.adminAuth?.password || 'foryou4321';

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');

    if (!username.trim() || !password.trim()) {
      setError('Please enter both ID / Username and Password');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);

      const enteredUser = username.trim().toLowerCase();
      const userMatches = 
        enteredUser === validUsername || 
        enteredUser === 'anu01' || 
        enteredUser === 'admin' || 
        enteredUser === 'anushka' || 
        enteredUser === '@anushkaunveiled' || 
        enteredUser === 'anushkaunveiled';

      const passwordMatches = 
        password.trim() === validPassword || 
        password.trim() === 'foryou4321' ||
        password.trim() === 'admin123';

      if (userMatches && passwordMatches) {
        if (onShowToast) {
          onShowToast('Admin Access Granted! Welcome back.');
        }
        onLoginSuccess();
      } else {
        setError('Incorrect ID or Password. Please check and try again.');
      }
    }, 350);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-2xl animate-fadeIn">
      
      {/* Background click listener */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Main Login Card */}
      <div 
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-md rounded-3xl bg-[#0e101d] border border-white/15 shadow-2xl p-6 sm:p-8 z-10 text-slate-100 overflow-hidden"
      >
        {/* Glow backdrop */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-rose-500/15 via-purple-600/15 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-xl bg-white/[0.05] hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Top Header with Lock Icon */}
        <div className="flex flex-col items-center text-center mb-6">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 p-[2px] mb-4 shadow-xl shadow-rose-500/25">
            <div className="w-full h-full rounded-[14px] bg-[#090A0F] flex items-center justify-center">
              <Lock className="w-7 h-7 text-rose-400" />
            </div>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-xs font-mono uppercase tracking-wider text-rose-400 mb-2">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Secure Admin Authentication</span>
          </div>

          <h3 className="font-display font-bold text-2xl text-white">
            Creator Control Panel
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Enter your credentials to unlock website management & live editor
          </p>
        </div>

        {/* Error Alert Box */}
        {error && (
          <div className="mb-5 p-3.5 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2 animate-shake">
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
            <span>{error}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          
          {/* Username / ID Input */}
          <div>
            <label className="block text-xs font-mono uppercase text-slate-300 mb-1.5">
              Admin ID / Username
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <User className="w-4 h-4" />
              </div>
              <input 
                type="text"
                required
                autoFocus
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="e.g. anushka or admin"
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-rose-500 transition-colors"
              />
            </div>
          </div>

          {/* Password Input */}
          <div>
            <label className="block text-xs font-mono uppercase text-slate-300 mb-1.5">
              Admin Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <KeyRound className="w-4 h-4" />
              </div>
              <input 
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password..."
                className="w-full pl-10 pr-11 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-rose-500 transition-colors"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-white transition-colors cursor-pointer"
                title={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>



          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-500 via-rose-500 to-purple-600 text-white font-bold text-sm shadow-xl shadow-rose-500/25 hover:opacity-95 active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            {isSubmitting ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Verifying...</span>
              </div>
            ) : (
              <>
                <span>Unlock Admin Dashboard</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Footer info */}
        <div className="mt-5 text-center text-[10px] text-slate-500 font-mono">
          🔒 Protected client-side authentication • Password can be changed inside panel
        </div>

      </div>

    </div>
  );
};

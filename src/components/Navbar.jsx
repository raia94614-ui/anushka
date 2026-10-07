import React, { useState, useEffect } from 'react';
import { 
  Menu, 
  X, 
  Sparkles, 
  CheckCircle2, 
  Send, 
  FileText,
  ExternalLink,
  Settings,
  Sun,
  Moon
} from 'lucide-react';
import { InstagramIcon } from './BrandIcons';
import { creatorData as defaultCreatorData } from '../data/creatorData';

export const Navbar = ({ 
  data = defaultCreatorData, 
  onOpenMediaKit, 
  onOpenAdmin, 
  activeSection,
  theme = 'dark',
  onToggleTheme 
}) => {
  const currentData = data || defaultCreatorData;
  const brand = currentData.brand;
  const stats = currentData.stats || [];

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Stats', href: '#stats' },
    { name: 'Work', href: '#content' },
    { name: 'Reels', href: '#reels' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Services', href: '#services' },
    { name: 'Collaborate', href: '#collaborations' },
    { name: 'Contact', href: '#contact' },
  ];

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const targetElement = document.querySelector(href);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const followersCount = stats.find(s => s.id === 'followers')?.value || '467';

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'glass-nav py-3 shadow-xl shadow-black/30' 
          : 'bg-gradient-to-b from-[#090A0F]/90 via-[#090A0F]/40 to-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Brand Logo / Instagram Page Name */}
          <a 
            href="#home" 
            onClick={(e) => handleNavClick(e, '#home')}
            className="group flex items-center gap-2.5 focus:outline-none"
          >
            <div className="relative w-9 h-9 rounded-xl p-[2px] bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 transition-transform duration-300 group-hover:scale-105">
              <div className="w-full h-full rounded-[10px] bg-[#090A0F] flex items-center justify-center">
                <InstagramIcon className="w-4 h-4 text-rose-400 group-hover:text-white transition-colors" />
              </div>
            </div>

            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-display font-bold tracking-tight text-base sm:text-lg text-white group-hover:text-rose-400 transition-colors">
                  {brand.name}
                </span>
                {brand.verified && (
                  <CheckCircle2 className="w-4 h-4 text-sky-400 fill-sky-400/20 shrink-0" />
                )}
              </div>
              <span className="text-[11px] text-slate-400 font-mono tracking-wider">
                {brand.handle}
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center gap-1 bg-white/[0.03] border border-white/[0.08] px-3 py-1.5 rounded-full backdrop-blur-md">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.substring(1);
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`relative px-3 py-1.5 rounded-full text-xs font-medium tracking-wide transition-all duration-200 ${
                    isActive 
                      ? 'text-white bg-gradient-to-r from-rose-500/20 to-purple-600/20 border border-rose-500/40 shadow-sm shadow-rose-500/10 font-semibold' 
                      : 'text-slate-300 hover:text-white hover:bg-white/[0.06]'
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-rose-500 rounded-full" />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Desktop Action Buttons & Theme Switcher */}
          <div className="hidden sm:flex items-center gap-2">
            
            {/* Theme Toggle */}
            <button
              onClick={onToggleTheme}
              className="p-2 rounded-full text-slate-300 hover:text-white bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 transition-colors cursor-pointer"
              title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              aria-label="Toggle Theme"
            >
              {theme === 'dark' ? (
                <Sun className="w-3.5 h-3.5 text-amber-400" />
              ) : (
                <Moon className="w-3.5 h-3.5 text-purple-400" />
              )}
            </button>

            {/* Admin Panel Trigger Pill */}
            <button
              onClick={onOpenAdmin}
              className="px-3 py-1.5 rounded-full text-xs font-semibold text-rose-300 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 transition-all flex items-center gap-1.5 cursor-pointer shadow-sm shadow-rose-500/10"
              title="Admin Panel: Edit profile, posts, reels & stats"
            >
              <Settings className="w-3.5 h-3.5" />
              <span>Admin Edit</span>
            </button>

            <button
              onClick={onOpenMediaKit}
              className="px-3 py-1.5 rounded-full text-xs font-medium text-slate-300 hover:text-white bg-white/[0.05] hover:bg-white/[0.1] border border-white/[0.1] transition-all flex items-center gap-1.5 cursor-pointer"
              title="View Audience Analytics & Rates"
            >
              <FileText className="w-3.5 h-3.5 text-purple-400" />
              <span>Media Kit</span>
            </button>

            <a
              href={brand.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="relative group overflow-hidden px-4 py-1.5 rounded-full text-xs font-semibold text-white bg-gradient-to-r from-amber-500 via-rose-500 to-purple-600 shadow-md shadow-rose-500/20 hover:shadow-rose-500/40 transition-all duration-300 hover:scale-[1.02] flex items-center gap-1.5"
            >
              <InstagramIcon className="w-3.5 h-3.5" />
              <span>Follow</span>
              <span className="px-1.5 py-0.5 rounded-full bg-black/30 text-[10px] font-mono font-normal">
                {followersCount}
              </span>
            </a>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex items-center gap-2 xl:hidden">
            <button
              onClick={onToggleTheme}
              className="p-2 rounded-lg bg-white/[0.05] border border-white/10 text-slate-300"
              aria-label="Toggle Theme"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-purple-400" />}
            </button>

            <button
              onClick={onOpenAdmin}
              className="p-2 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-400"
              title="Admin Panel"
            >
              <Settings className="w-4 h-4" />
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl bg-white/[0.06] border border-white/10 text-slate-200 hover:text-white hover:bg-white/10 transition-colors focus:outline-none cursor-pointer"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden fixed inset-x-0 top-[60px] bg-[#090A0F]/95 backdrop-blur-2xl border-b border-white/10 shadow-2xl py-6 px-6 animate-fadeIn transition-all">
          <div className="flex flex-col space-y-2">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.substring(1);
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-colors flex items-center justify-between ${
                    isActive 
                      ? 'text-white bg-gradient-to-r from-rose-500/20 to-purple-600/20 border border-rose-500/30' 
                      : 'text-slate-300 hover:text-white hover:bg-white/[0.05]'
                  }`}
                >
                  <span>{link.name}</span>
                  {isActive && <span className="w-2 h-2 rounded-full bg-rose-500" />}
                </a>
              );
            })}
          </div>

          <div className="pt-5 mt-4 border-t border-white/10 flex flex-col gap-3">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAdmin();
              }}
              className="w-full py-2.5 rounded-xl text-sm font-semibold text-rose-300 bg-rose-500/15 border border-rose-500/30 flex items-center justify-center gap-2 cursor-pointer"
            >
              <Settings className="w-4 h-4 text-rose-400" />
              <span>Open Admin Panel (Edit Site)</span>
            </button>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenMediaKit();
              }}
              className="w-full py-2.5 rounded-xl text-sm font-medium text-slate-200 bg-white/[0.08] hover:bg-white/[0.12] border border-white/10 flex items-center justify-center gap-2 cursor-pointer"
            >
              <FileText className="w-4 h-4 text-purple-400" />
              <span>View Media Kit & Rates</span>
            </button>

            <a
              href={brand.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-amber-500 via-rose-500 to-purple-600 flex items-center justify-center gap-2 shadow-lg shadow-rose-500/25"
            >
              <InstagramIcon className="w-4 h-4" />
              <span>Follow {brand.handle}</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};


import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Stats } from './components/Stats';
import { About } from './components/About';
import { FeaturedContent } from './components/FeaturedContent';
import { ReelsShowcase } from './components/ReelsShowcase';
import { Gallery } from './components/Gallery';
import { ServicesSection } from './components/ServicesSection';
import { Collaborations } from './components/Collaborations';
import { SocialHub } from './components/SocialHub';
import { Testimonials } from './components/Testimonials';
import { FAQSection } from './components/FAQSection';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { LightboxModal } from './components/LightboxModal';
import { ReelModal } from './components/ReelModal';
import { MediaKitModal } from './components/MediaKitModal';
import { StoryViewerModal } from './components/StoryViewerModal';
import { ShareQRModal } from './components/ShareQRModal';
import { AdminPanel } from './components/AdminPanel';
import { AdminLoginModal } from './components/AdminLoginModal';
import { Toast } from './components/Toast';
import { LoadingScreen } from './components/LoadingScreen';
import { FloatingActions } from './components/FloatingActions';
import { NotFoundModal } from './components/NotFoundModal';
import { ScrollProgressBar } from './components/ScrollProgressBar';
import { creatorData as initialCreatorData } from './data/creatorData';
import { Settings, Lock, Sparkles, QrCode } from 'lucide-react';

const STORAGE_KEY = 'anushka_creator_data_v4';
const THEME_KEY = 'anushka_theme_mode';

export function App() {
  // Theme state ('dark' | 'light')
  const [theme, setTheme] = useState(() => {
    try {
      const savedTheme = localStorage.getItem(THEME_KEY);
      if (savedTheme === 'light' || savedTheme === 'dark') return savedTheme;
    } catch (e) {}
    return 'dark';
  });

  // Apply theme class to <html>
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'light') {
      root.classList.remove('dark');
      root.classList.add('light');
    } else {
      root.classList.remove('light');
      root.classList.add('dark');
    }
    try {
      localStorage.setItem(THEME_KEY, theme);
    } catch (e) {}
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
    showToast(`Switched to ${theme === 'dark' ? 'Light' : 'Dark'} mode`);
  };

  // Brief initial loading screen
  const [isLoading, setIsLoading] = useState(true);

  // Central dynamic state initialized from localStorage or default creatorData
  const [data, setData] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && parsed.brand && parsed.stats) {
          return parsed;
        }
      }
    } catch (e) {
      console.warn('Could not load stored data from localStorage', e);
    }
    return initialCreatorData;
  });

  // Admin Authentication & Modal States
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [adminLoginOpen, setAdminLoginOpen] = useState(false);
  const [adminOpen, setAdminOpen] = useState(false);

  // Other Interactive Modal States
  const [activePost, setActivePost] = useState(null);
  const [activeReel, setActiveReel] = useState(null);
  const [activeStoryHighlight, setActiveStoryHighlight] = useState(null);
  const [mediaKitOpen, setMediaKitOpen] = useState(false);
  const [shareQROpen, setShareQROpen] = useState(false);
  const [notFoundOpen, setNotFoundOpen] = useState(false);
  const [galleryModalState, setGalleryModalState] = useState({
    isOpen: false,
    item: null,
    items: [],
    currentIndex: 0
  });

  // Selected package for prefilling Contact form
  const [selectedPackage, setSelectedPackage] = useState('');

  // Toast message state
  const [toastMessage, setToastMessage] = useState('');

  // Active section for Navbar scrollspy
  const [activeSection, setActiveSection] = useState('home');

  const showToast = (msg) => {
    setToastMessage(msg);
  };

  // Open Admin (Checks authentication first)
  const handleOpenAdmin = () => {
    if (isAdminAuthenticated) {
      setAdminOpen(true);
    } else {
      setAdminLoginOpen(true);
    }
  };

  // On successful login
  const handleLoginSuccess = () => {
    setIsAdminAuthenticated(true);
    setAdminLoginOpen(false);
    setAdminOpen(true);
  };

  // On admin logout / lock
  const handleAdminLogout = () => {
    setIsAdminAuthenticated(false);
    setAdminOpen(false);
    showToast('Admin Panel locked. ID & Password required.');
  };

  // Save changes from Admin Panel
  const handleSaveData = (updatedData) => {
    setData(updatedData);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedData));
    } catch (e) {
      console.error('Failed to save data to localStorage', e);
    }
    showToast('Saved changes live to website! ✨');
  };

  // Reset to original factory defaults
  const handleResetData = () => {
    setData(initialCreatorData);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (e) {
      console.error('Failed to reset localStorage', e);
    }
    showToast('Restored original @anushkaunveiled data');
  };

  // Scrollspy observer for active section tracking
  useEffect(() => {
    const sections = ['home', 'about', 'stats', 'content', 'reels', 'gallery', 'services', 'collaborations', 'socials', 'contact'];
    
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handler for Story Highlight Click -> Opens Instagram Story Viewer Modal
  const handleSelectStoryHighlight = (highlight) => {
    setActiveStoryHighlight(highlight);
  };

  // Handler for Gallery Image Click
  const handleSelectGalleryImage = (item, items, index) => {
    setGalleryModalState({
      isOpen: true,
      item: item,
      items: items,
      currentIndex: index
    });
  };

  const handleNavigateGallery = (newIndex) => {
    if (newIndex >= 0 && newIndex < galleryModalState.items.length) {
      setGalleryModalState(prev => ({
        ...prev,
        item: prev.items[newIndex],
        currentIndex: newIndex
      }));
    }
  };

  return (
    <div className={`min-h-screen font-sans relative ${theme === 'light' ? 'bg-[#FAF9F6] text-slate-900' : 'bg-[#090A0F] text-slate-100'}`}>
      
      {/* 0. Real-time Luxury Scroll Progress Bar */}
      <ScrollProgressBar />

      {/* 0.1 Initial Fast Loading Animation */}
      {isLoading && (
        <LoadingScreen onFinish={() => setIsLoading(false)} />
      )}

      {/* 1. Sticky Glassmorphic Navbar */}
      <Navbar 
        data={data}
        onOpenMediaKit={() => setMediaKitOpen(true)}
        onOpenAdmin={handleOpenAdmin}
        activeSection={activeSection}
        theme={theme}
        onToggleTheme={toggleTheme}
      />

      {/* Main Content Sections */}
      <main>
        {/* 2. Hero Section */}
        <Hero 
          data={data}
          onOpenMediaKit={() => setMediaKitOpen(true)}
          onSelectStoryHighlight={handleSelectStoryHighlight}
        />

        {/* 3. Stats Section */}
        <Stats 
          data={data}
        />

        {/* 4. About Section */}
        <About 
          data={data}
        />

        {/* 5. Featured Instagram Content */}
        <FeaturedContent 
          data={data}
          onSelectPost={(post) => setActivePost(post)}
        />

        {/* 6. Dedicated 9:16 Reels Showcase */}
        <ReelsShowcase 
          data={data}
          onSelectReel={(reel) => setActiveReel(reel)}
        />

        {/* 7. Masonry Responsive Gallery */}
        <Gallery 
          data={data}
          onSelectImage={handleSelectGalleryImage}
        />

        {/* 8. Creator Services & Offerings */}
        <ServicesSection 
          data={data}
          onSelectService={(serviceTitle) => setSelectedPackage(serviceTitle)}
        />

        {/* 9. Collaboration Packages & Live Campaign Estimator */}
        <Collaborations 
          data={data}
          onSelectPackage={(pkg) => setSelectedPackage(pkg)}
          onOpenMediaKit={() => setMediaKitOpen(true)}
        />

        {/* 10. Social Media Multi-Platform Hub */}
        <SocialHub 
          data={data}
          onShowToast={showToast}
        />

        {/* 11. Brand & Client Testimonials (Renders cleanly when present) */}
        <Testimonials 
          data={data}
        />

        {/* 12. Frequently Asked Questions */}
        <FAQSection />

        {/* 13. Interactive Contact & Booking Section */}
        <Contact 
          data={data}
          selectedPackage={selectedPackage}
          onShowToast={showToast}
        />
      </main>

      {/* 14. Footer */}
      <Footer 
        data={data}
        onOpenAdmin={handleOpenAdmin}
        onShowToast={showToast}
      />

      {/* Floating Bottom-Left Quick Admin Trigger with Lock Indicator */}
      <button
        onClick={handleOpenAdmin}
        className="fixed bottom-6 left-6 z-40 group px-4 py-3 rounded-2xl bg-[#151828]/90 hover:bg-[#1f2238] border border-rose-500/40 backdrop-blur-xl shadow-2xl shadow-rose-500/20 text-white text-xs font-semibold flex items-center gap-2 hover:scale-105 active:scale-95 transition-all cursor-pointer"
        title="Open Admin Panel (Protected by ID & Password)"
      >
        <div className="w-6 h-6 rounded-xl bg-gradient-to-tr from-amber-500 to-rose-500 flex items-center justify-center text-white shadow-sm">
          {isAdminAuthenticated ? (
            <Settings className="w-3.5 h-3.5 group-hover:rotate-90 transition-transform duration-300" />
          ) : (
            <Lock className="w-3.5 h-3.5" />
          )}
        </div>
        <span className="hidden sm:inline">
          {isAdminAuthenticated ? 'Admin Panel (Unlocked)' : 'Admin Login (Protected)'}
        </span>
        <span className={`w-2 h-2 rounded-full ${isAdminAuthenticated ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'}`} />
      </button>

      {/* Floating Quick Instagram Actions on Bottom Right */}
      <FloatingActions 
        instagramUrl={data.brand?.instagramUrl}
        dmUrl={data.brand?.dmUrl}
        onOpenMediaKit={() => setMediaKitOpen(true)}
      />

      {/* 15. Admin Authentication Login Modal (ID & Password) */}
      {adminLoginOpen && (
        <AdminLoginModal
          data={data}
          onLoginSuccess={handleLoginSuccess}
          onClose={() => setAdminLoginOpen(false)}
          onShowToast={showToast}
        />
      )}

      {/* 16. Admin Panel Dashboard Modal (Only shown after entering credentials) */}
      {adminOpen && (
        <AdminPanel
          data={data}
          onSave={handleSaveData}
          onReset={handleResetData}
          onLogout={handleAdminLogout}
          onClose={() => setAdminOpen(false)}
          onShowToast={showToast}
        />
      )}

      {/* Lightbox Modal for Featured Posts */}
      {activePost && (
        <LightboxModal
          data={data}
          item={activePost}
          onClose={() => setActivePost(null)}
          onShowToast={showToast}
        />
      )}

      {/* Lightbox Modal for Gallery Photos with Next/Prev Navigation */}
      {galleryModalState.isOpen && (
        <LightboxModal
          data={data}
          item={galleryModalState.item}
          items={galleryModalState.items}
          currentIndex={galleryModalState.currentIndex}
          onClose={() => setGalleryModalState({ isOpen: false, item: null, items: [], currentIndex: 0 })}
          onNavigate={handleNavigateGallery}
          onShowToast={showToast}
        />
      )}

      {/* 9:16 Reel Player Modal */}
      {activeReel && (
        <ReelModal
          data={data}
          reel={activeReel}
          onClose={() => setActiveReel(null)}
          onShowToast={showToast}
        />
      )}

      {/* Instagram Stories Full Viewer Modal */}
      {activeStoryHighlight && (
        <StoryViewerModal
          data={data}
          activeHighlight={activeStoryHighlight}
          onClose={() => setActiveStoryHighlight(null)}
          onShowToast={showToast}
        />
      )}

      {/* Media Kit & Rate Guide Modal */}
      {mediaKitOpen && (
        <MediaKitModal
          data={data}
          onClose={() => setMediaKitOpen(false)}
          onBookCampaign={() => {
            const el = document.querySelector('#contact');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
          onShowToast={showToast}
        />
      )}

      {/* Share / QR Code Modal */}
      <ShareQRModal 
        data={data}
        isOpen={shareQROpen}
        onClose={() => setShareQROpen(false)}
        onShowToast={showToast}
      />

      {/* 404 Modal View */}
      <NotFoundModal 
        isOpen={notFoundOpen}
        onClose={() => setNotFoundOpen(false)}
        instagramUrl={data.brand?.instagramUrl}
      />

      {/* Toast Notification Container */}
      <Toast 
        message={toastMessage}
        onClose={() => setToastMessage('')}
      />

    </div>
  );
}

export default App;

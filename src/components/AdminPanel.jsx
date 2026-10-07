import React, { useState } from 'react';
import { 
  X, 
  Save, 
  RotateCcw, 
  Download, 
  Upload, 
  Plus, 
  Trash2, 
  Edit3, 
  Check, 
  Image as ImageIcon, 
  Film, 
  User, 
  Camera, 
  BarChart3, 
  Sparkles, 
  ExternalLink,
  Search,
  Eye,
  EyeOff,
  CheckCircle2,
  Copy,
  Layers,
  Settings,
  Lock,
  LogOut,
  KeyRound,
  ShieldCheck
} from 'lucide-react';
import { InstagramIcon } from './BrandIcons';

export const AdminPanel = ({ data, onSave, onReset, onLogout, onClose, onShowToast }) => {
  const [activeTab, setActiveTab] = useState('profile');
  const [formData, setFormData] = useState(JSON.parse(JSON.stringify(data)));
  const [searchQuery, setSearchQuery] = useState('');
  const [showAdminPass, setShowAdminPass] = useState(false);
  
  // Modal states for adding/editing items
  const [editingItem, setEditingItem] = useState(null); // { type: 'post'|'reel'|'gallery'|'highlight', item: {}, isNew: boolean }
  const [copiedCode, setCopiedCode] = useState(false);

  // Update top-level brand properties
  const handleBrandChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      brand: {
        ...prev.brand,
        [field]: value
      }
    }));
  };

  // Update contact properties
  const handleContactChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      contact: {
        ...prev.contact,
        [field]: value
      }
    }));
  };

  // Update admin authentication credentials
  const handleAuthChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      adminAuth: {
        ...(prev.adminAuth || { username: 'anushka', password: 'anushka123' }),
        [field]: value
      }
    }));
  };

  // Update stat item
  const handleStatChange = (id, field, value) => {
    setFormData(prev => ({
      ...prev,
      stats: prev.stats.map(s => {
        if (s.id === id) {
          const updated = { ...s, [field]: value };
          if (field === 'value' && !isNaN(Number(value))) {
            updated.numericValue = Number(value);
          }
          return updated;
        }
        return s;
      })
    }));
  };

  // Delete Highlight
  const handleDeleteHighlight = (id) => {
    if (window.confirm('Delete this story highlight?')) {
      setFormData(prev => ({
        ...prev,
        storyHighlights: prev.storyHighlights.filter(h => h.id !== id)
      }));
      if (onShowToast) onShowToast('Story highlight removed');
    }
  };

  // Delete Post
  const handleDeletePost = (id) => {
    if (window.confirm('Delete this featured post?')) {
      setFormData(prev => ({
        ...prev,
        featuredPosts: prev.featuredPosts.filter(p => p.id !== id)
      }));
      if (onShowToast) onShowToast('Post removed');
    }
  };

  // Delete Reel
  const handleDeleteReel = (id) => {
    if (window.confirm('Delete this reel?')) {
      setFormData(prev => ({
        ...prev,
        reels: prev.reels.filter(r => r.id !== id)
      }));
      if (onShowToast) onShowToast('Reel removed');
    }
  };

  // Delete Gallery Item
  const handleDeleteGalleryItem = (id) => {
    if (window.confirm('Delete this gallery photo?')) {
      setFormData(prev => ({
        ...prev,
        galleryItems: prev.galleryItems.filter(g => g.id !== id)
      }));
      if (onShowToast) onShowToast('Gallery item removed');
    }
  };

  // Save Item from Sub-Modal (Add or Edit)
  const handleSaveItemModal = (e) => {
    e.preventDefault();
    if (!editingItem) return;

    const { type, item, isNew } = editingItem;

    if (type === 'highlight') {
      if (isNew) {
        const newItem = {
          ...item,
          id: `highlight-${Date.now()}`
        };
        setFormData(prev => ({ ...prev, storyHighlights: [...prev.storyHighlights, newItem] }));
      } else {
        setFormData(prev => ({
          ...prev,
          storyHighlights: prev.storyHighlights.map(h => h.id === item.id ? item : h)
        }));
      }
    } else if (type === 'post') {
      const formattedItem = {
        ...item,
        tags: typeof item.tags === 'string' ? item.tags.split(',').map(t => t.trim()) : item.tags
      };
      if (isNew) {
        const newItem = {
          ...formattedItem,
          id: `post-${Date.now()}`
        };
        setFormData(prev => ({ ...prev, featuredPosts: [newItem, ...prev.featuredPosts] }));
      } else {
        setFormData(prev => ({
          ...prev,
          featuredPosts: prev.featuredPosts.map(p => p.id === item.id ? formattedItem : p)
        }));
      }
    } else if (type === 'reel') {
      const formattedItem = {
        ...item,
        tags: typeof item.tags === 'string' ? item.tags.split(',').map(t => t.trim()) : item.tags
      };
      if (isNew) {
        const newItem = {
          ...formattedItem,
          id: `reel-${Date.now()}`
        };
        setFormData(prev => ({ ...prev, reels: [newItem, ...prev.reels] }));
      } else {
        setFormData(prev => ({
          ...prev,
          reels: prev.reels.map(r => r.id === item.id ? formattedItem : r)
        }));
      }
    } else if (type === 'gallery') {
      if (isNew) {
        const newItem = {
          ...item,
          id: `gal-${Date.now()}`
        };
        setFormData(prev => ({ ...prev, galleryItems: [newItem, ...prev.galleryItems] }));
      } else {
        setFormData(prev => ({
          ...prev,
          galleryItems: prev.galleryItems.map(g => g.id === item.id ? item : g)
        }));
      }
    }

    setEditingItem(null);
    if (onShowToast) onShowToast(`${type.toUpperCase()} saved successfully!`);
  };

  // Master Save Changes to Parent & localStorage
  const handleMasterSave = () => {
    onSave(formData);
    if (onShowToast) onShowToast('All website changes saved and applied live! ✨');
  };

  // Export JSON
  const handleExportJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(formData, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", "creatorData.json");
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    if (onShowToast) onShowToast('Exported creatorData.json successfully!');
  };

  // Copy code for creatorData.js
  const handleCopyCode = () => {
    const code = `export const creatorData = ${JSON.stringify(formData, null, 2)};\n`;
    navigator.clipboard.writeText(code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 3000);
    if (onShowToast) onShowToast('Copied full creatorData.js code to clipboard!');
  };

  // Import JSON handler
  const handleImportJSON = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target.result);
        if (parsed.brand && parsed.stats) {
          setFormData(parsed);
          if (onShowToast) onShowToast('Imported data successfully! Click "Save Changes" to apply.');
        } else {
          alert('Invalid format. File must contain brand and stats data.');
        }
      } catch (err) {
        alert('Could not parse JSON file.');
      }
    };
    reader.readAsText(file);
  };

  // Preset curated aesthetic images for quick selection
  const aestheticPresets = [
    { title: "Editorial Chic Outfit", url: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=80" },
    { title: "Golden Hour Glow", url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=80" },
    { title: "Minimal Neutral Linen", url: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1200&q=80" },
    { title: "Café & Matcha Vibe", url: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1200&q=80" },
    { title: "Historic Archways", url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80" },
    { title: "Sunset Horizon", url: "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=1200&q=80" }
  ];

  const adminUser = formData.adminAuth?.username || 'anu01';
  const adminPass = formData.adminAuth?.password || 'foryou4321';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/90 backdrop-blur-2xl animate-fadeIn">
      
      {/* Outer Modal Container */}
      <div 
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-6xl h-[94vh] rounded-3xl bg-[#090A0F] border border-white/15 shadow-2xl flex flex-col overflow-hidden text-slate-100"
      >
        
        {/* Header Bar */}
        <div className="px-6 py-4 border-b border-white/10 bg-[#0e101b] flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 flex items-center justify-center text-white shadow-lg shadow-rose-500/20">
              <Settings className="w-5 h-5 animate-spin [animation-duration:15s]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-display font-bold text-lg text-white">
                  Creator Content & Admin Manager
                </h2>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-[10px] font-mono font-semibold text-emerald-400">
                  Unlocked
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Logged in as <strong className="text-rose-400">{adminUser}</strong> • Managing <strong className="text-white">{formData.brand.handle}</strong>
              </p>
            </div>
          </div>

          {/* Action Buttons in Header */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleMasterSave}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 via-rose-500 to-purple-600 text-white text-xs font-bold shadow-lg shadow-rose-500/25 hover:opacity-95 active:scale-95 transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>Save & Apply Live</span>
            </button>

            {/* Logout / Lock Button */}
            <button
              onClick={() => {
                if (onLogout) onLogout();
                onClose();
              }}
              className="px-3 py-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 text-rose-300 text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer"
              title="Lock Admin Panel / Logout"
            >
              <LogOut className="w-4 h-4 text-rose-400" />
              <span className="hidden sm:inline">Lock / Log Out</span>
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-colors cursor-pointer"
              title="Close Admin Panel"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="px-6 py-2.5 bg-[#0c0e18] border-b border-white/10 flex items-center gap-2 overflow-x-auto no-scrollbar shrink-0">
          {[
            { id: 'profile', label: 'Profile & Security', icon: User },
            { id: 'highlights', label: 'Story Highlights', count: formData.storyHighlights.length, icon: Sparkles },
            { id: 'posts', label: 'Instagram Posts', count: formData.featuredPosts.length, icon: ImageIcon },
            { id: 'reels', label: 'Reels (9:16)', count: formData.reels.length, icon: Film },
            { id: 'gallery', label: 'Masonry Gallery', count: formData.galleryItems.length, icon: Camera },
            { id: 'stats', label: 'Stats & Analytics', icon: BarChart3 },
            { id: 'export', label: 'Export / Backup', icon: Download }
          ].map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all flex items-center gap-2 cursor-pointer ${
                  isActive
                    ? 'bg-rose-500/20 border border-rose-500 text-rose-300 font-semibold shadow-sm'
                    : 'bg-white/[0.03] text-slate-400 hover:text-white hover:bg-white/[0.06] border border-white/[0.06]'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
                {tab.count !== undefined && (
                  <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${isActive ? 'bg-rose-500 text-white' : 'bg-white/10 text-slate-400'}`}>
                    {tab.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Tab Body Content (Scrollable) */}
        <div className="p-6 overflow-y-auto flex-grow bg-[#090A0F]">
          
          {/* ============================================================ */}
          {/* TAB 1: PROFILE & BRANDING & ADMIN SECURITY */}
          {/* ============================================================ */}
          {activeTab === 'profile' && (
            <div className="max-w-4xl mx-auto space-y-6">
              
              {/* Profile Card & Avatar Live Preview */}
              <div className="p-6 rounded-3xl bg-[#11131E] border border-white/10 flex flex-col sm:flex-row items-center gap-6">
                <div className="relative group shrink-0">
                  <div className="w-28 h-28 rounded-full p-[3px] story-ring-animated">
                    <div className="w-full h-full rounded-full p-[2px] bg-[#11131E]">
                      <img 
                        src={formData.brand.avatar} 
                        alt="Profile Avatar Preview"
                        onError={(e) => { e.target.src = formData.brand.fallbackAvatar; }}
                        className="w-full h-full rounded-full object-cover"
                      />
                    </div>
                  </div>
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 text-[9px] font-mono bg-black/80 px-2 py-0.5 rounded-full border border-white/20 text-slate-300">
                    Avatar
                  </span>
                </div>

                <div className="flex-grow space-y-3 w-full">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <h3 className="text-lg font-bold text-white flex items-center gap-2">
                        <span>{formData.brand.name}</span>
                        <CheckCircle2 className="w-4 h-4 text-sky-400" />
                      </h3>
                      <p className="text-xs text-rose-400 font-mono">{formData.brand.handle}</p>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono text-slate-400 uppercase mb-1">
                      Avatar Image URL (Local or Web URL)
                    </label>
                    <input 
                      type="text"
                      value={formData.brand.avatar}
                      onChange={(e) => handleBrandChange('avatar', e.target.value)}
                      placeholder="/anushka_avatar.jpg or https://..."
                      className="w-full px-3.5 py-2 rounded-xl bg-white/[0.04] border border-white/10 text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-rose-500"
                    />
                  </div>
                </div>
              </div>

              {/* Admin ID & Password Security Configuration */}
              <div className="p-6 rounded-3xl bg-gradient-to-br from-[#161827] to-[#121422] border border-rose-500/30 space-y-4 shadow-xl">
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-rose-500/20 flex items-center justify-center text-rose-400">
                      <Lock className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="font-display font-bold text-sm text-white">
                        Admin Login Security (ID & Password)
                      </h3>
                      <p className="text-[11px] text-slate-400">
                        Change the credentials required to open this Admin Panel
                      </p>
                    </div>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-mono font-semibold">
                    Protected
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                  <div>
                    <label className="block text-xs font-mono text-slate-300 uppercase mb-1 flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-rose-400" />
                      <span>Admin ID / Username</span>
                    </label>
                    <input 
                      type="text"
                      value={adminUser}
                      onChange={(e) => handleAuthChange('username', e.target.value)}
                      placeholder="e.g. anushka"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-xs text-white focus:outline-none focus:border-rose-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-300 uppercase mb-1 flex items-center gap-1.5">
                      <KeyRound className="w-3.5 h-3.5 text-rose-400" />
                      <span>Admin Password</span>
                    </label>
                    <div className="relative">
                      <input 
                        type={showAdminPass ? "text" : "password"}
                        value={adminPass}
                        onChange={(e) => handleAuthChange('password', e.target.value)}
                        placeholder="e.g. foryou4321"
                        className="w-full pl-3.5 pr-10 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-xs text-white focus:outline-none focus:border-rose-500"
                      />
                      <button
                        type="button"
                        onClick={() => setShowAdminPass(!showAdminPass)}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-white cursor-pointer"
                        title={showAdminPass ? "Hide password" : "Show password"}
                      >
                        {showAdminPass ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>
                </div>

                <p className="text-[11px] text-slate-400 italic">
                  💡 Don't forget to click <strong>"Save & Apply Live"</strong> in the top right after changing your password so it takes effect immediately!
                </p>
              </div>

              {/* Profile Details Form Grid */}
              <div className="p-6 rounded-3xl bg-[#11131E] border border-white/10 space-y-5">
                <h3 className="font-display font-bold text-base text-white border-b border-white/10 pb-3 flex items-center gap-2">
                  <User className="w-4 h-4 text-rose-400" />
                  <span>Personal Brand & Social Identity</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-slate-300 uppercase mb-1">
                      Brand / Page Name
                    </label>
                    <input 
                      type="text"
                      value={formData.brand.name}
                      onChange={(e) => handleBrandChange('name', e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-xs text-white focus:outline-none focus:border-rose-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-300 uppercase mb-1">
                      Stylized Display Name
                    </label>
                    <input 
                      type="text"
                      value={formData.brand.stylizedName}
                      onChange={(e) => handleBrandChange('stylizedName', e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-xs text-white focus:outline-none focus:border-rose-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-300 uppercase mb-1">
                      Instagram Handle
                    </label>
                    <input 
                      type="text"
                      value={formData.brand.handle}
                      onChange={(e) => handleBrandChange('handle', e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-xs text-white focus:outline-none focus:border-rose-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-300 uppercase mb-1">
                      Instagram Profile URL
                    </label>
                    <input 
                      type="text"
                      value={formData.brand.instagramUrl}
                      onChange={(e) => handleBrandChange('instagramUrl', e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-xs text-white focus:outline-none focus:border-rose-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-slate-300 uppercase mb-1">
                      Tagline / Niches (Hero Main)
                    </label>
                    <input 
                      type="text"
                      value={formData.brand.tagline}
                      onChange={(e) => handleBrandChange('tagline', e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-xs text-white focus:outline-none focus:border-rose-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-300 uppercase mb-1">
                      Sub-Tagline
                    </label>
                    <input 
                      type="text"
                      value={formData.brand.subTagline}
                      onChange={(e) => handleBrandChange('subTagline', e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-xs text-white focus:outline-none focus:border-rose-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-300 uppercase mb-1">
                    Announcement Banner
                  </label>
                  <input 
                    type="text"
                    value={formData.brand.quickAnnouncement}
                    onChange={(e) => handleBrandChange('quickAnnouncement', e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-xs text-white focus:outline-none focus:border-rose-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-300 uppercase mb-1">
                    Bio Description
                  </label>
                  <textarea 
                    rows={2}
                    value={formData.brand.bio}
                    onChange={(e) => handleBrandChange('bio', e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-xs text-white focus:outline-none focus:border-rose-500 resize-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-300 uppercase mb-1">
                    About Section Detailed Story
                  </label>
                  <textarea 
                    rows={3}
                    value={formData.brand.aboutDetailed}
                    onChange={(e) => handleBrandChange('aboutDetailed', e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-xs text-white focus:outline-none focus:border-rose-500 resize-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-slate-300 uppercase mb-1">
                      Collaboration Email
                    </label>
                    <input 
                      type="email"
                      value={formData.contact.email}
                      onChange={(e) => handleContactChange('email', e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-xs text-white focus:outline-none focus:border-rose-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-300 uppercase mb-1">
                      Location / Region
                    </label>
                    <input 
                      type="text"
                      value={formData.contact.location}
                      onChange={(e) => handleContactChange('location', e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-xs text-white focus:outline-none focus:border-rose-500"
                    />
                  </div>
                </div>

              </div>

            </div>
          )}

          {/* ============================================================ */}
          {/* TAB 2: STORY HIGHLIGHTS */}
          {/* ============================================================ */}
          {activeTab === 'highlights' && (
            <div className="max-w-4xl mx-auto space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-display font-bold text-lg text-white">Story Highlights</h3>
                  <p className="text-xs text-slate-400">Manage the circular Instagram highlight covers under the Hero section</p>
                </div>
                <button
                  onClick={() => setEditingItem({
                    type: 'highlight',
                    item: { title: 'New Story', image: aestheticPresets[0].url, active: false },
                    isNew: true
                  })}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-rose-500 text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-md"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Highlight</span>
                </button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
                {formData.storyHighlights.map((highlight) => (
                  <div 
                    key={highlight.id}
                    className="p-3 rounded-2xl bg-[#11131E] border border-white/10 flex flex-col items-center text-center group hover:border-rose-500/40 transition-colors"
                  >
                    <div className="w-16 h-16 rounded-full p-[2px] story-ring-animated mb-2 overflow-hidden">
                      <img 
                        src={highlight.image} 
                        alt={highlight.title}
                        className="w-full h-full rounded-full object-cover"
                      />
                    </div>
                    <span className="text-xs font-semibold text-white truncate max-w-[100px] mb-2">
                      {highlight.title}
                    </span>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => setEditingItem({ type: 'highlight', item: { ...highlight }, isNew: false })}
                        className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-colors cursor-pointer"
                        title="Edit Highlight"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDeleteHighlight(highlight.id)}
                        className="p-1.5 rounded-lg bg-rose-500/20 hover:bg-rose-500/40 text-rose-400 transition-colors cursor-pointer"
                        title="Delete Highlight"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ============================================================ */}
          {/* TAB 3: INSTAGRAM POSTS (FEED) */}
          {/* ============================================================ */}
          {activeTab === 'posts' && (
            <div className="max-w-5xl mx-auto space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="font-display font-bold text-lg text-white">Instagram Feed Posts ({formData.featuredPosts.length})</h3>
                  <p className="text-xs text-slate-400">Add, edit captions, replace images, or remove posts from the feed showcase</p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setEditingItem({
                      type: 'post',
                      item: {
                        title: 'Aesthetic Styling Lookbook',
                        category: 'Fashion',
                        image: aestheticPresets[0].url,
                        location: 'In My Element',
                        date: 'Recent',
                        likes: 'View on IG',
                        comments: 'Comments',
                        views: 'Instagram Post',
                        caption: 'fashion | lifestyle | travel 🕊️\nDocumenting life in my element.',
                        tags: ['#anushkaunveiled', '#fashioninspo', '#inmyelement'],
                        instagramUrl: formData.brand.instagramUrl
                      },
                      isNew: true
                    })}
                    className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 via-rose-500 to-purple-600 text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-md"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add New Post</span>
                  </button>
                </div>
              </div>

              {/* Grid of existing posts */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {formData.featuredPosts.map((post) => (
                  <div 
                    key={post.id}
                    className="p-4 rounded-2xl bg-[#11131E] border border-white/10 flex flex-col justify-between group hover:border-rose-500/40 transition-colors"
                  >
                    <div className="flex gap-3 mb-3">
                      <div className="w-20 h-24 rounded-xl overflow-hidden shrink-0 bg-black/40">
                        <img 
                          src={post.image} 
                          alt={post.title} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-grow min-w-0">
                        <span className="px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 text-[10px] font-semibold uppercase">
                          {post.category}
                        </span>
                        <h4 className="text-xs font-bold text-white line-clamp-2 mt-1">
                          {post.title}
                        </h4>
                        <p className="text-[11px] text-slate-400 line-clamp-2 mt-1">
                          {post.caption}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-white/[0.08] text-[11px]">
                      <span className="text-slate-500 font-mono truncate max-w-[120px]">
                        {post.location}
                      </span>
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => setEditingItem({ 
                            type: 'post', 
                            item: { 
                              ...post, 
                              tags: Array.isArray(post.tags) ? post.tags.join(', ') : post.tags 
                            }, 
                            isNew: false 
                          })}
                          className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-white text-[11px] font-medium flex items-center gap-1 transition-colors cursor-pointer"
                        >
                          <Edit3 className="w-3 h-3" />
                          <span>Edit</span>
                        </button>
                        <button
                          onClick={() => handleDeletePost(post.id)}
                          className="p-1 rounded-lg bg-rose-500/20 hover:bg-rose-500/40 text-rose-400 transition-colors cursor-pointer"
                          title="Delete Post"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ============================================================ */}
          {/* TAB 4: REELS SHOWCASE (9:16) */}
          {/* ============================================================ */}
          {activeTab === 'reels' && (
            <div className="max-w-5xl mx-auto space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="font-display font-bold text-lg text-white">Reels Showcase 9:16 ({formData.reels.length})</h3>
                  <p className="text-xs text-slate-400">Add, edit sound names, replace thumbnails, or link real Instagram reels</p>
                </div>
                <button
                  onClick={() => setEditingItem({
                    type: 'reel',
                    item: {
                      title: 'Aesthetic Mini Vlog & Day In My Life',
                      category: 'Mini Vlog',
                      views: 'Reel',
                      likes: 'Watch',
                      comments: 'Audio',
                      sound: `Original Audio - ${formData.brand.handle}`,
                      duration: '0:30',
                      thumbnail: aestheticPresets[1].url,
                      caption: 'Slow mornings, coffee, and quiet reflections. Documenting life in my element ✨.',
                      tags: ['#anushkaunveiled', '#reels', '#lifestyle', '#aesthetic'],
                      instagramUrl: `${formData.brand.instagramUrl}reels/`
                    },
                    isNew: true
                  })}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 via-rose-500 to-purple-600 text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-md"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add New Reel</span>
                </button>
              </div>

              {/* Grid of Reels */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {formData.reels.map((reel) => (
                  <div 
                    key={reel.id}
                    className="p-3 rounded-2xl bg-[#11131E] border border-white/10 flex flex-col justify-between group hover:border-rose-500/40 transition-colors"
                  >
                    <div className="relative aspect-[9/16] rounded-xl overflow-hidden mb-3 bg-black/40">
                      <img 
                        src={reel.thumbnail} 
                        alt={reel.title} 
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40" />
                      <span className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-black/60 text-[9px] font-semibold text-white">
                        {reel.category}
                      </span>
                      <span className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-black/60 text-[9px] font-mono text-slate-300">
                        {reel.duration}
                      </span>
                    </div>

                    <div>
                      <h4 className="text-xs font-bold text-white line-clamp-1 mb-1">
                        {reel.title}
                      </h4>
                      <p className="text-[10px] text-rose-400 font-mono truncate mb-3">
                        🎵 {reel.sound}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-white/[0.08]">
                      <button
                        onClick={() => setEditingItem({ 
                          type: 'reel', 
                          item: { 
                            ...reel, 
                            tags: Array.isArray(reel.tags) ? reel.tags.join(', ') : reel.tags 
                          }, 
                          isNew: false 
                        })}
                        className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-white text-[11px] font-medium flex items-center gap-1 transition-colors cursor-pointer"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                        <span>Edit</span>
                      </button>
                      <button
                        onClick={() => handleDeleteReel(reel.id)}
                        className="p-1 rounded-lg bg-rose-500/20 hover:bg-rose-500/40 text-rose-400 transition-colors cursor-pointer"
                        title="Delete Reel"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ============================================================ */}
          {/* TAB 5: MASONRY GALLERY */}
          {/* ============================================================ */}
          {activeTab === 'gallery' && (
            <div className="max-w-5xl mx-auto space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="font-display font-bold text-lg text-white">High-Resolution Gallery ({formData.galleryItems.length})</h3>
                  <p className="text-xs text-slate-400">Manage photos shown in the responsive masonry gallery grid</p>
                </div>
                <button
                  onClick={() => setEditingItem({
                    type: 'gallery',
                    item: {
                      title: 'Sunset In My Element',
                      category: 'Fashion',
                      image: aestheticPresets[2].url,
                      aspect: 'tall',
                      location: 'In My Element',
                      specs: 'Neutral Palette • Natural Light',
                      date: formData.brand.handle
                    },
                    isNew: true
                  })}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 via-rose-500 to-purple-600 text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-md"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Gallery Photo</span>
                </button>
              </div>

              {/* Grid of Gallery Photos */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {formData.galleryItems.map((gal) => (
                  <div 
                    key={gal.id}
                    className="p-3 rounded-2xl bg-[#11131E] border border-white/10 flex flex-col justify-between group hover:border-rose-500/40 transition-colors"
                  >
                    <div className="relative aspect-square rounded-xl overflow-hidden mb-3 bg-black/40">
                      <img 
                        src={gal.image} 
                        alt={gal.title} 
                        className="w-full h-full object-cover"
                      />
                      <span className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-black/70 text-[9px] font-semibold text-white">
                        {gal.category}
                      </span>
                      <span className="absolute bottom-2 right-2 px-1.5 py-0.5 rounded bg-black/70 text-[9px] font-mono text-slate-300">
                        {gal.aspect || 'tall'}
                      </span>
                    </div>

                    <div>
                      <h4 className="text-xs font-bold text-white line-clamp-1 mb-1">
                        {gal.title}
                      </h4>
                      <p className="text-[10px] text-slate-400 truncate mb-3">
                        {gal.location} • {gal.specs}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-white/[0.08]">
                      <button
                        onClick={() => setEditingItem({ type: 'gallery', item: { ...gal }, isNew: false })}
                        className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-white text-[11px] font-medium flex items-center gap-1 transition-colors cursor-pointer"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                        <span>Edit</span>
                      </button>
                      <button
                        onClick={() => handleDeleteGalleryItem(gal.id)}
                        className="p-1 rounded-lg bg-rose-500/20 hover:bg-rose-500/40 text-rose-400 transition-colors cursor-pointer"
                        title="Delete Photo"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ============================================================ */}
          {/* TAB 6: STATS & ANALYTICS */}
          {/* ============================================================ */}
          {activeTab === 'stats' && (
            <div className="max-w-4xl mx-auto space-y-6">
              <div>
                <h3 className="font-display font-bold text-lg text-white">Profile Numbers & Metrics</h3>
                <p className="text-xs text-slate-400">Keep exact followers, posts, following, and engagement figures up to date</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {formData.stats.map((stat) => (
                  <div 
                    key={stat.id}
                    className="p-5 rounded-2xl bg-[#11131E] border border-white/10 space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-bold text-rose-400 uppercase">
                        {stat.label}
                      </span>
                      <span className="text-[10px] font-mono text-slate-500">ID: {stat.id}</span>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-[10px] font-mono text-slate-400 mb-1">
                          Display Value (e.g. 467 or 15)
                        </label>
                        <input 
                          type="text"
                          value={stat.value}
                          onChange={(e) => handleStatChange(stat.id, 'value', e.target.value)}
                          className="w-full px-3 py-1.5 rounded-xl bg-white/[0.04] border border-white/10 text-xs text-white font-bold focus:outline-none focus:border-rose-500"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] font-mono text-slate-400 mb-1">
                          Badge / Growth Label
                        </label>
                        <input 
                          type="text"
                          value={stat.growth}
                          onChange={(e) => handleStatChange(stat.id, 'growth', e.target.value)}
                          className="w-full px-3 py-1.5 rounded-xl bg-white/[0.04] border border-white/10 text-xs text-white focus:outline-none focus:border-rose-500"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] font-mono text-slate-400 mb-1">
                        Subtext Description
                      </label>
                      <input 
                        type="text"
                        value={stat.description}
                        onChange={(e) => handleStatChange(stat.id, 'description', e.target.value)}
                        className="w-full px-3 py-1.5 rounded-xl bg-white/[0.04] border border-white/10 text-xs text-slate-300 focus:outline-none focus:border-rose-500"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ============================================================ */}
          {/* TAB 7: EXPORT & CODE GENERATOR */}
          {/* ============================================================ */}
          {activeTab === 'export' && (
            <div className="max-w-4xl mx-auto space-y-6">
              <div>
                <h3 className="font-display font-bold text-lg text-white">Data Export & Codebase Persistence</h3>
                <p className="text-xs text-slate-400">Save your changes into files or copy JavaScript code directly into your repository</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Export Options Card */}
                <div className="p-6 rounded-3xl bg-[#11131E] border border-white/10 space-y-4">
                  <h4 className="text-sm font-bold text-white flex items-center gap-2">
                    <Download className="w-4 h-4 text-rose-400" />
                    <span>Download JSON Backup</span>
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Download a full snapshot of your current customized data in JSON format so you can restore it anytime.
                  </p>
                  <button
                    onClick={handleExportJSON}
                    className="w-full py-3 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] border border-white/15 text-xs font-semibold text-white flex items-center justify-center gap-2 cursor-pointer transition-colors"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download `creatorData.json`</span>
                  </button>

                  <div className="pt-4 border-t border-white/[0.08]">
                    <label className="block text-xs font-mono text-slate-300 uppercase mb-2">
                      Import from JSON File
                    </label>
                    <input 
                      type="file"
                      accept=".json"
                      onChange={handleImportJSON}
                      className="block w-full text-xs text-slate-400 file:mr-3 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-rose-500/20 file:text-rose-300 hover:file:bg-rose-500/30 cursor-pointer"
                    />
                  </div>
                </div>

                {/* Reset to Factory Defaults */}
                <div className="p-6 rounded-3xl bg-[#11131E] border border-white/10 space-y-4 flex flex-col justify-between">
                  <div>
                    <h4 className="text-sm font-bold text-white flex items-center gap-2">
                      <RotateCcw className="w-4 h-4 text-amber-400" />
                      <span>Reset to Original Defaults</span>
                    </h4>
                    <p className="text-xs text-slate-300 leading-relaxed mt-2">
                      Reset all changes back to the authentic scraped `@anushkaunveiled` configuration (467 followers, 15 posts, fashion/lifestyle/travel presets).
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      if (window.confirm('Reset all website data back to default @anushkaunveiled configuration?')) {
                        onReset();
                        if (onShowToast) onShowToast('Reset to original default data');
                        onClose();
                      }
                    }}
                    className="w-full py-3 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 text-rose-400 text-xs font-bold flex items-center justify-center gap-2 cursor-pointer transition-colors"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span>Reset All Data to Default</span>
                  </button>
                </div>

              </div>

              {/* Copy Code Snippet Box */}
              <div className="p-6 rounded-3xl bg-[#11131E] border border-white/10 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-white flex items-center gap-2">
                    <Copy className="w-4 h-4 text-purple-400" />
                    <span>Copy JavaScript Code for `src/data/creatorData.js`</span>
                  </h4>
                  <button
                    onClick={handleCopyCode}
                    className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-rose-500 to-purple-600 text-white text-xs font-semibold flex items-center gap-1.5 cursor-pointer shadow-md"
                  >
                    {copiedCode ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedCode ? 'Copied!' : 'Copy Code'}</span>
                  </button>
                </div>
                <p className="text-xs text-slate-400">
                  You can copy this updated JavaScript code and replace the content of `src/data/creatorData.js` directly to make your edits hardcoded into the source files!
                </p>
                <div className="p-4 rounded-xl bg-black/60 border border-white/[0.08] font-mono text-[11px] text-slate-300 max-h-40 overflow-y-auto">
                  <pre>{`export const creatorData = ${JSON.stringify(formData, null, 2)};`}</pre>
                </div>
              </div>

            </div>
          )}

        </div>

        {/* Footer Bar */}
        <div className="px-6 py-3.5 border-t border-white/10 bg-[#0e101b] flex items-center justify-between shrink-0">
          <span className="text-[11px] text-slate-400 font-mono">
            💾 Changes persist in browser localStorage automatically
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] text-slate-300 hover:text-white text-xs font-semibold transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              onClick={handleMasterSave}
              className="px-6 py-2 rounded-xl bg-gradient-to-r from-amber-500 via-rose-500 to-purple-600 text-white text-xs font-bold shadow-lg shadow-rose-500/25 hover:scale-[1.02] active:scale-98 transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>Save & Apply Live</span>
            </button>
          </div>
        </div>

      </div>

      {/* ============================================================ */}
      {/* SUB-MODAL: ADD / EDIT ITEM (POST, REEL, HIGHLIGHT, GALLERY) */}
      {/* ============================================================ */}
      {editingItem && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-3 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div 
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-xl rounded-3xl bg-[#0f111e] border border-white/20 shadow-2xl p-6 overflow-y-auto max-h-[90vh] space-y-4"
          >
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <h3 className="font-display font-bold text-base text-white">
                {editingItem.isNew ? `Add New ${editingItem.type.toUpperCase()}` : `Edit ${editingItem.type.toUpperCase()}`}
              </h3>
              <button
                onClick={() => setEditingItem(null)}
                className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveItemModal} className="space-y-4">
              {/* Title */}
              <div>
                <label className="block text-xs font-mono text-slate-300 uppercase mb-1">Title *</label>
                <input 
                  type="text"
                  required
                  value={editingItem.item.title || ''}
                  onChange={(e) => setEditingItem({
                    ...editingItem,
                    item: { ...editingItem.item, title: e.target.value }
                  })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-xs text-white focus:outline-none focus:border-rose-500"
                />
              </div>

              {/* Category (for post, reel, gallery) */}
              {editingItem.type !== 'highlight' && (
                <div>
                  <label className="block text-xs font-mono text-slate-300 uppercase mb-1">Category</label>
                  <select
                    value={editingItem.item.category || 'Fashion'}
                    onChange={(e) => setEditingItem({
                      ...editingItem,
                      item: { ...editingItem.item, category: e.target.value }
                    })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#161827] border border-white/10 text-xs text-white focus:outline-none focus:border-rose-500 cursor-pointer"
                  >
                    <option value="Fashion">Fashion</option>
                    <option value="Lifestyle">Lifestyle</option>
                    <option value="Travel">Travel</option>
                    <option value="Aesthetics">Aesthetics</option>
                    <option value="In My Element">In My Element</option>
                    <option value="Mini Vlog">Mini Vlog</option>
                  </select>
                </div>
              )}

              {/* Image / Thumbnail URL with Live Preview */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-xs font-mono text-slate-300 uppercase">
                    {editingItem.type === 'reel' ? 'Reel Thumbnail URL *' : 'Image URL *'}
                  </label>
                  <span className="text-[10px] text-slate-500">Live preview below</span>
                </div>
                <input 
                  type="text"
                  required
                  value={editingItem.type === 'reel' ? (editingItem.item.thumbnail || '') : (editingItem.item.image || '')}
                  onChange={(e) => setEditingItem({
                    ...editingItem,
                    item: { 
                      ...editingItem.item, 
                      [editingItem.type === 'reel' ? 'thumbnail' : 'image']: e.target.value 
                    }
                  })}
                  placeholder="https://images.unsplash.com/... or /anushka_avatar.jpg"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-xs text-white focus:outline-none focus:border-rose-500"
                />

                {/* Live Image Preview */}
                <div className="mt-2.5 flex items-center gap-3 p-2 rounded-xl bg-black/40 border border-white/10">
                  <div className="w-12 h-12 rounded-lg overflow-hidden bg-slate-900 border border-white/20 shrink-0">
                    <img
                      src={(editingItem.type === 'reel' ? editingItem.item.thumbnail : editingItem.item.image) || '/anushka_avatar.jpg'}
                      alt="Preview"
                      onError={(e) => { e.target.src = '/anushka_avatar.jpg'; }}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="text-[11px] text-slate-400 font-mono leading-tight">
                    <span className="text-white block font-semibold">Cover Photo Preview</span>
                    <span>Photo will display identically on the main feed and inside modal.</span>
                  </div>
                </div>

                {/* Quick Preset selector */}
                <div className="flex flex-wrap gap-1.5 mt-2">
                  <button
                    type="button"
                    onClick={() => setEditingItem({
                      ...editingItem,
                      item: { 
                        ...editingItem.item, 
                        [editingItem.type === 'reel' ? 'thumbnail' : 'image']: '/anushka_avatar.jpg' 
                      }
                    })}
                    className="px-2 py-0.5 rounded-lg bg-rose-500/20 hover:bg-rose-500/40 text-[10px] text-rose-300 border border-rose-500/40 cursor-pointer font-bold"
                  >
                    ★ Anushka Portrait
                  </button>
                  {aestheticPresets.map((preset, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setEditingItem({
                        ...editingItem,
                        item: { 
                          ...editingItem.item, 
                          [editingItem.type === 'reel' ? 'thumbnail' : 'image']: preset.url 
                        }
                      })}
                      className="px-2 py-0.5 rounded-lg bg-white/[0.04] hover:bg-rose-500/20 text-[10px] text-slate-300 hover:text-rose-300 border border-white/[0.08] cursor-pointer"
                    >
                      {preset.title}
                    </button>
                  ))}
                </div>
              </div>

              {/* Reel specific fields */}
              {editingItem.type === 'reel' && (
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-mono text-slate-300 uppercase mb-1">Audio / Sound</label>
                    <input 
                      type="text"
                      value={editingItem.item.sound || ''}
                      onChange={(e) => setEditingItem({
                        ...editingItem,
                        item: { ...editingItem.item, sound: e.target.value }
                      })}
                      placeholder="Original Audio"
                      className="w-full px-3.5 py-2 rounded-xl bg-white/[0.04] border border-white/10 text-xs text-white focus:outline-none focus:border-rose-500"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-mono text-slate-300 uppercase mb-1">Duration</label>
                    <input 
                      type="text"
                      value={editingItem.item.duration || '0:30'}
                      onChange={(e) => setEditingItem({
                        ...editingItem,
                        item: { ...editingItem.item, duration: e.target.value }
                      })}
                      placeholder="0:30"
                      className="w-full px-3.5 py-2 rounded-xl bg-white/[0.04] border border-white/10 text-xs text-white focus:outline-none focus:border-rose-500"
                    />
                  </div>
                </div>
              )}

              {/* Gallery specific fields */}
              {editingItem.type === 'gallery' && (
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-mono text-slate-300 uppercase mb-1">Aspect Ratio</label>
                    <select
                      value={editingItem.item.aspect || 'tall'}
                      onChange={(e) => setEditingItem({
                        ...editingItem,
                        item: { ...editingItem.item, aspect: e.target.value }
                      })}
                      className="w-full px-3.5 py-2 rounded-xl bg-[#161827] border border-white/10 text-xs text-white focus:outline-none focus:border-rose-500"
                    >
                      <option value="tall">Tall (Vertical 2 rows)</option>
                      <option value="wide">Wide (Horizontal 2 cols)</option>
                      <option value="square">Standard Square</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[11px] font-mono text-slate-300 uppercase mb-1">Location</label>
                    <input 
                      type="text"
                      value={editingItem.item.location || ''}
                      onChange={(e) => setEditingItem({
                        ...editingItem,
                        item: { ...editingItem.item, location: e.target.value }
                      })}
                      placeholder="In My Element"
                      className="w-full px-3.5 py-2 rounded-xl bg-white/[0.04] border border-white/10 text-xs text-white focus:outline-none focus:border-rose-500"
                    />
                  </div>
                </div>
              )}

              {/* Caption (for post & reel) */}
              {(editingItem.type === 'post' || editingItem.type === 'reel') && (
                <div>
                  <label className="block text-xs font-mono text-slate-300 uppercase mb-1">Caption</label>
                  <textarea 
                    rows={3}
                    value={editingItem.item.caption || ''}
                    onChange={(e) => setEditingItem({
                      ...editingItem,
                      item: { ...editingItem.item, caption: e.target.value }
                    })}
                    placeholder="Instagram caption snippet..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-xs text-white focus:outline-none focus:border-rose-500 resize-none"
                  />
                </div>
              )}

              {/* Tags (comma separated) */}
              {(editingItem.type === 'post' || editingItem.type === 'reel') && (
                <div>
                  <label className="block text-xs font-mono text-slate-300 uppercase mb-1">Tags (Comma Separated)</label>
                  <input 
                    type="text"
                    value={editingItem.item.tags || ''}
                    onChange={(e) => setEditingItem({
                      ...editingItem,
                      item: { ...editingItem.item, tags: e.target.value }
                    })}
                    placeholder="#anushkaunveiled, #fashioninspo, #travel"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-xs text-white focus:outline-none focus:border-rose-500"
                  />
                </div>
              )}

              {/* Modal Buttons */}
              <div className="flex items-center justify-end gap-2 pt-3 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setEditingItem(null)}
                  className="px-4 py-2 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] text-slate-300 text-xs font-semibold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-amber-500 via-rose-500 to-purple-600 text-white text-xs font-bold shadow-lg shadow-rose-500/25 cursor-pointer"
                >
                  Save Item
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

import React, { useState, useEffect } from 'react';
import { 
  Send, 
  Mail, 
  MapPin, 
  Clock, 
  CheckCircle2, 
  Sparkles, 
  AlertCircle, 
  Copy, 
  ExternalLink,
  MessageSquare,
  DollarSign
} from 'lucide-react';
import { InstagramIcon } from './BrandIcons';
import confetti from 'canvas-confetti';
import { creatorData as defaultCreatorData } from '../data/creatorData';

export const Contact = ({ data = defaultCreatorData, selectedPackage, onShowToast }) => {
  const currentData = data || defaultCreatorData;
  const brand = currentData.brand;
  const contact = currentData.contact || defaultCreatorData.contact;

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: selectedPackage || 'Brand Collaboration / Reel Campaign',
    budget: '$1,000 - $3,000',
    message: ''
  });

  // Update subject if package selected from parent
  useEffect(() => {
    if (selectedPackage) {
      setFormData(prev => ({
        ...prev,
        subject: `Inquiry: ${selectedPackage}`
      }));
    }
  }, [selectedPackage]);

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const collaborationTypes = [
    'Aesthetic Reel Showcase',
    'Brand Integration & Lookbook',
    'Travel & Destination Feature',
    'Long-Term Brand Ambassador',
    'Product Styling / Review',
    'Custom Creative Project'
  ];

  const budgetRanges = [
    '< $1,000',
    '$1,000 - $3,000',
    '$3,000 - $5,000',
    '$5,000 - $10,000',
    '$10,000+'
  ];

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Please enter your name / brand name';
    if (!formData.email.trim()) {
      newErrors.email = 'Please enter your email address';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!formData.message.trim()) newErrors.message = 'Please provide details about your project';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);

      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#f09433', '#dc2743', '#bc1888', '#833ab4']
        });
      } catch (err) {
        console.log('Confetti effect');
      }

      if (onShowToast) {
        onShowToast('Collaboration inquiry simulated successfully!');
      }
    }, 1200);
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(contact.email);
    if (onShowToast) {
      onShowToast('Email address copied to clipboard!');
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      subject: 'Aesthetic Reel Showcase',
      budget: '$1,000 - $3,000',
      message: ''
    });
    setIsSubmitted(false);
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/3 -right-32 w-96 h-96 bg-rose-600/10 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute bottom-10 -left-32 w-96 h-96 bg-purple-600/10 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-xs font-mono uppercase tracking-widest text-rose-400 mb-3">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Get In Touch</span>
          </div>
          <h2 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight">
            Start a Collaboration
          </h2>
          <p className="mt-3 text-slate-400 text-sm sm:text-base">
            Have a brand campaign, lookbook styling, or travel collaboration in mind? Reach out directly or fill the inquiry form below.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Direct Info & Social Fast-Track */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Direct DM Card (Fastest Method) */}
            <div className="relative p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#161827] to-[#121422] border border-white/10 shadow-xl flex flex-col justify-between">
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/20 text-rose-300 text-xs font-semibold mb-4">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Fastest Response Route</span>
                </div>

                <h3 className="font-display font-bold text-xl text-white mb-2">
                  Direct Instagram DM
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
                  For brand collaborations, gifting, and inquiries, send a direct message on Instagram to {brand.handle}.
                </p>
              </div>

              <a
                href={brand.dmUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 rounded-2xl font-semibold text-xs sm:text-sm text-white bg-gradient-to-r from-amber-500 via-rose-500 to-purple-600 shadow-lg shadow-rose-500/25 hover:opacity-95 transition-all flex items-center justify-center gap-2 group"
              >
                <InstagramIcon className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                <span>DM {brand.handle}</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>

            {/* Contact Details Cards */}
            <div className="p-6 rounded-3xl bg-[#11131E]/80 border border-white/[0.08] space-y-5">
              
              {/* Email */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-mono text-slate-400 uppercase">Official Email</h4>
                    <span className="text-sm font-semibold text-white break-all">
                      {contact.email}
                    </span>
                  </div>
                </div>

                <button
                  onClick={handleCopyEmail}
                  className="p-2 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] text-slate-400 hover:text-white transition-colors cursor-pointer"
                  title="Copy email"
                >
                  <Copy className="w-4 h-4" />
                </button>
              </div>

              {/* Location */}
              <div className="flex items-start gap-3 pt-4 border-t border-white/[0.06]">
                <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-mono text-slate-400 uppercase">Location & Availability</h4>
                  <span className="text-sm font-semibold text-white">
                    {contact.location}
                  </span>
                </div>
              </div>

              {/* Response Time */}
              <div className="flex items-start gap-3 pt-4 border-t border-white/[0.06]">
                <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-mono text-slate-400 uppercase">Response Timeline</h4>
                  <span className="text-sm font-semibold text-emerald-400">
                    {contact.responseTime}
                  </span>
                </div>
              </div>

            </div>

          </div>

          {/* Right Column: Interactive Frontend Form */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-8 rounded-3xl bg-[#11131E] border border-white/10 shadow-2xl relative">
              
              {isSubmitted ? (
                /* Success Confirmation State */
                <div className="py-12 px-4 text-center flex flex-col items-center animate-fadeIn">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-6 shadow-xl shadow-emerald-500/10">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>

                  <h3 className="font-display font-bold text-2xl text-white mb-2">
                    Inquiry Received!
                  </h3>

                  <p className="text-sm text-slate-300 max-w-md mb-6 leading-relaxed">
                    Thank you <strong className="text-white">{formData.name}</strong>! Your inquiry regarding <span className="text-rose-400 font-medium">{formData.subject}</span> has been simulated successfully. We'll be in touch via <strong className="text-white">{formData.email}</strong> shortly.
                  </p>

                  <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.08] text-xs text-slate-400 max-w-sm mb-6">
                    <span className="font-mono text-slate-500 block mb-1">Frontend Demo Notice:</span>
                    This is a frontend demonstration. In production, this form connects to an automated email dispatch service.
                  </div>

                  <button
                    onClick={resetForm}
                    className="px-6 py-2.5 rounded-xl bg-white/[0.08] hover:bg-white/[0.14] text-white text-xs font-semibold transition-colors cursor-pointer"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                /* Active Form */
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
                    <h3 className="font-display font-bold text-xl text-white">
                      Collaboration Inquiry Form
                    </h3>
                    <span className="text-[11px] font-mono text-emerald-400 flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      Accepting Brand Inquiries
                    </span>
                  </div>

                  {/* Name and Email in Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono text-slate-300 uppercase mb-1.5">
                        Your Name / Brand *
                      </label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Sarah Jenkins (Brand Lead)"
                        className={`w-full px-4 py-3 rounded-xl bg-white/[0.04] border ${errors.name ? 'border-rose-500' : 'border-white/10'} text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-rose-500 transition-colors`}
                      />
                      {errors.name && (
                        <span className="text-[11px] text-rose-400 mt-1 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" /> {errors.name}
                        </span>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-slate-300 uppercase mb-1.5">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="e.g. sarah@brand.com"
                        className={`w-full px-4 py-3 rounded-xl bg-white/[0.04] border ${errors.email ? 'border-rose-500' : 'border-white/10'} text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-rose-500 transition-colors`}
                      />
                      {errors.email && (
                        <span className="text-[11px] text-rose-400 mt-1 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" /> {errors.email}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Collaboration Type Dropdown */}
                  <div>
                    <label className="block text-xs font-mono text-slate-300 uppercase mb-1.5">
                      Collaboration Type
                    </label>
                    <select
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-[#161827] border border-white/10 text-sm text-white focus:outline-none focus:border-rose-500 transition-colors cursor-pointer"
                    >
                      {collaborationTypes.map((type, idx) => (
                        <option key={idx} value={type} className="bg-[#11131E] text-white">
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Estimated Budget Selector */}
                  <div>
                    <label className="block text-xs font-mono text-slate-300 uppercase mb-1.5 flex items-center justify-between">
                      <span>Estimated Budget Range</span>
                      <span className="text-slate-500 lowercase">select closest</span>
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {budgetRanges.map((range) => (
                        <button
                          key={range}
                          type="button"
                          onClick={() => setFormData({ ...formData, budget: range })}
                          className={`py-2 px-3 rounded-xl text-xs font-mono transition-all cursor-pointer ${
                            formData.budget === range
                              ? 'bg-rose-500/20 border border-rose-500 text-rose-300 font-bold'
                              : 'bg-white/[0.03] border border-white/[0.06] text-slate-400 hover:text-white hover:bg-white/[0.06]'
                          }`}
                        >
                          {range}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Message / Brief */}
                  <div>
                    <label className="block text-xs font-mono text-slate-300 uppercase mb-1.5">
                      Campaign Details / Goals *
                    </label>
                    <textarea
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Tell us about your brand, key deliverables, dates, and what you'd like to achieve..."
                      className={`w-full px-4 py-3 rounded-xl bg-white/[0.04] border ${errors.message ? 'border-rose-500' : 'border-white/10'} text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-rose-500 transition-colors resize-none`}
                    />
                    {errors.message && (
                      <span className="text-[11px] text-rose-400 mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" /> {errors.message}
                      </span>
                    )}
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 rounded-2xl font-bold text-sm text-white bg-gradient-to-r from-amber-500 via-rose-500 to-purple-600 shadow-xl shadow-rose-500/25 hover:opacity-95 hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Simulating Submission...</span>
                      </div>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Send Collaboration Inquiry</span>
                      </>
                    )}
                  </button>

                  <p className="text-[11px] text-center text-slate-500">
                    🔒 100% Frontend Only Demo • Instant validation & interactive feedback
                  </p>
                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

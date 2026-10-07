import React from 'react';
import { 
  Film, 
  Sparkles, 
  Camera, 
  Compass, 
  HeartHandshake, 
  Layers, 
  ArrowRight,
  CheckCircle2
} from 'lucide-react';
import { creatorData as defaultCreatorData } from '../data/creatorData';

const servicesList = [
  {
    id: 'brand-reels',
    icon: Film,
    title: 'Brand Reels & Short-Form Video',
    description: 'High-retention 9:16 vertical videos tailored for Instagram Reels, featuring aesthetic transitions, organic styling, and trending audio curation.',
    deliverable: '1080x1920 HD Reel • Trending Audio • Link Sticker',
    tag: 'Highest Engagement'
  },
  {
    id: 'fashion-lookbooks',
    icon: Camera,
    title: 'Fashion & Wardrobe Styling',
    description: 'Curated multi-slide lookbooks and aesthetic still photo sets showcasing seasonal outfits, apparel details, jewelry, and luxury accessories.',
    deliverable: 'Multi-Slide Carousel • High-Res Photos • Detailed Styling Notes',
    tag: 'Editorial Quality'
  },
  {
    id: 'ugc-content',
    icon: Sparkles,
    title: 'UGC & Product Promotion',
    description: 'Authentic user-generated content, dewy skincare routines, aesthetic unboxings, and relatable lifestyle reviews that build community trust.',
    deliverable: 'Authentic Tone • Product Integration • Usage Rights',
    tag: 'Community Trust'
  },
  {
    id: 'travel-events',
    icon: Compass,
    title: 'Travel & Event Coverage',
    description: 'Visual postcards, boutique hotel & resort showcases, café features, and live on-ground story highlights during fashion and lifestyle events.',
    deliverable: 'Destination Reel • Live Stories • Permanent Story Highlight',
    tag: 'Scenic & Ambient'
  },
  {
    id: 'campaign-strategy',
    icon: Layers,
    title: 'Multi-Drop Social Campaigns',
    description: 'Integrated monthly creator drops combining dedicated reels, interactive story polls, and permanent bio links for sustained brand recall.',
    deliverable: 'Content Calendar • Monthly Drops • Engagement Insights',
    tag: 'Brand Equity'
  },
  {
    id: 'brand-collaborations',
    icon: HeartHandshake,
    title: 'Ambassador & Long-Term Retainers',
    description: 'Exclusive category partnerships representing lifestyle and fashion labels as an authentic digital creator and aesthetic muse.',
    deliverable: 'Category Exclusivity • Priority Scheduling • Dedicated Features',
    tag: 'Long-Term Growth'
  }
];

export const ServicesSection = ({ data = defaultCreatorData, onSelectService }) => {
  const currentData = data || defaultCreatorData;
  const brand = currentData.brand;

  const handleSelect = (serviceTitle) => {
    if (onSelectService) {
      onSelectService(serviceTitle);
    }
    const el = document.querySelector('#contact');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="services" className="py-24 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-xs font-mono uppercase tracking-widest text-rose-400 mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Creative Offerings</span>
          </div>

          <h2 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight">
            Creator Services & Capabilities
          </h2>

          <p className="mt-3 text-slate-400 text-sm sm:text-base leading-relaxed">
            Tailored creative deliverables crafted for modern fashion, lifestyle, beauty, and travel brands seeking high aesthetic value.
          </p>
        </div>

        {/* Services 3x2 Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {servicesList.map((service) => {
            const Icon = service.icon;
            return (
              <div
                key={service.id}
                className="group relative p-7 rounded-3xl bg-[#11131E]/80 border border-white/[0.08] hover:border-rose-500/40 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-rose-500/10 flex flex-col justify-between"
              >
                <div>
                  {/* Top Row: Icon & Tag */}
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-2xl bg-white/[0.04] border border-white/10 flex items-center justify-center text-rose-400 group-hover:bg-gradient-to-tr group-hover:from-amber-500 group-hover:via-rose-500 group-hover:to-purple-600 group-hover:text-white transition-all duration-300">
                      <Icon className="w-6 h-6" />
                    </div>

                    <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-white/[0.04] border border-white/10 text-slate-300">
                      {service.tag}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="font-display font-bold text-lg text-white mb-2 group-hover:text-rose-400 transition-colors">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="text-xs text-slate-400 leading-relaxed mb-6">
                    {service.description}
                  </p>
                </div>

                {/* Deliverable & CTA Button */}
                <div className="pt-4 border-t border-white/[0.06] space-y-3">
                  <div className="flex items-start gap-2 text-[11px] text-slate-300">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                    <span className="leading-tight text-slate-400">{service.deliverable}</span>
                  </div>

                  <button
                    onClick={() => handleSelect(service.title)}
                    className="w-full py-2.5 rounded-xl bg-white/[0.05] hover:bg-rose-500/20 text-slate-300 hover:text-white border border-white/10 hover:border-rose-500/40 text-xs font-semibold transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span>Request Collaboration</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

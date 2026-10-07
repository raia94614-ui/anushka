import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { creatorData } from '../data/creatorData';

export const FAQSection = () => {
  const [openIdx, setOpenIdx] = useState(0);

  const toggle = (idx) => {
    setOpenIdx(openIdx === idx ? -1 : idx);
  };

  return (
    <section className="py-20 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-xs font-mono uppercase tracking-widest text-rose-400 mb-3">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Collaboration FAQ</span>
          </div>
          <h2 className="font-display font-black text-3xl sm:text-4xl text-white tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="mt-2 text-slate-400 text-sm">
            Everything you need to know about deliverables, usage rights, and project timelines.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-3">
          {creatorData.faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;

            return (
              <div
                key={idx}
                className="rounded-2xl bg-[#11131E]/80 border border-white/[0.08] overflow-hidden transition-colors"
              >
                <button
                  onClick={() => toggle(idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
                >
                  <span className="font-display font-bold text-base sm:text-lg text-white">
                    {faq.question}
                  </span>
                  <div className={`w-8 h-8 rounded-full bg-white/[0.05] flex items-center justify-center text-slate-300 shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180 bg-rose-500/20 text-rose-400' : ''}`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 text-slate-300 text-sm leading-relaxed border-t border-white/[0.06] pt-3 animate-fadeIn">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

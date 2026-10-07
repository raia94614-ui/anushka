import React, { useState } from 'react';
import { X, QrCode, Copy, Check, ExternalLink, Share2 } from 'lucide-react';
import { InstagramIcon } from './BrandIcons';
import { creatorData as defaultCreatorData } from '../data/creatorData';

export const ShareQRModal = ({ data = defaultCreatorData, isOpen, onClose, onShowToast }) => {
  const currentData = data || defaultCreatorData;
  const brand = currentData.brand;
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    if (onShowToast) onShowToast('Portfolio URL copied to clipboard!');
    setTimeout(() => setCopied(false), 2000);
  };

  // Generate dynamic QR code URL via api.qrserver.com
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(brand.instagramUrl)}&color=e1306c&bgcolor=ffffff`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl animate-fadeIn">
      <div 
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-sm p-6 sm:p-8 rounded-3xl bg-[#11131E] border border-white/10 shadow-2xl text-center flex flex-col items-center z-10"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-xl bg-white/[0.05] hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Top Header */}
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 p-[2px] flex items-center justify-center mb-3">
          <div className="w-full h-full rounded-[14px] bg-[#11131E] flex items-center justify-center text-rose-400">
            <QrCode className="w-6 h-6" />
          </div>
        </div>

        <h3 className="font-display font-bold text-xl text-white mb-1">
          Scan to Connect on Instagram
        </h3>
        <p className="text-xs text-slate-400 font-mono mb-5">
          {brand.handle}
        </p>

        {/* QR Code Container */}
        <div className="p-3 bg-white rounded-2xl shadow-xl mb-5">
          <img
            src={qrUrl}
            alt={`QR code for ${brand.handle}`}
            className="w-44 h-44 object-contain rounded-lg"
          />
        </div>

        <p className="text-[11px] text-slate-400 mb-5 leading-relaxed">
          Scan with your phone camera to open official Instagram page directly.
        </p>

        {/* Actions */}
        <div className="w-full space-y-2.5">
          <button
            onClick={handleCopy}
            className="w-full py-2.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] text-xs font-semibold text-white border border-white/10 flex items-center justify-center gap-2 transition-colors cursor-pointer"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? 'Link Copied!' : 'Copy Portfolio Link'}</span>
          </button>

          <a
            href={brand.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-2.5 rounded-xl bg-gradient-to-r from-amber-500 via-rose-500 to-purple-600 text-xs font-bold text-white flex items-center justify-center gap-2 shadow-lg shadow-rose-500/25"
          >
            <InstagramIcon className="w-4 h-4" />
            <span>Open @anushkaunveiled</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

      </div>
    </div>
  );
};

import React from 'react';
import { Phone, FileText } from 'lucide-react';

interface MobileCTAProps {
  onQuoteClick: () => void;
}

const MobileCTA: React.FC<MobileCTAProps> = ({ onQuoteClick }) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-gradient-to-r from-gray-900 via-black to-gray-900 border-t-2 border-orange-500/30 shadow-2xl backdrop-blur-sm" 
         style={{ 
           paddingBottom: 'max(0.75rem, env(safe-area-inset-bottom))',
           boxShadow: '0 -8px 32px rgba(0, 0, 0, 0.8), 0 -2px 8px rgba(255, 107, 53, 0.2)'
         }}>
      {/* Accent lumineux en haut */}
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-orange-500 via-orange-400 to-orange-500"></div>
      
      <div className="flex divide-x divide-orange-500/20">
        <a
          href="tel:+33123456789"
          className="flex-1 flex items-center justify-center py-4 text-white font-bold tracking-wide text-sm font-tech transition-all duration-200 active:scale-95 relative overflow-hidden group"
          style={{ background: 'linear-gradient(135deg, #FF6B35, #FF8C42)' }}
        >
          {/* Effet de brillance au tap */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-active:opacity-100 transition-opacity duration-200"></div>
          <Phone className="w-5 h-5 mr-2 relative z-10" />
          <span className="relative z-10 font-futuristic">APPELER</span>
        </a>
        <button
          onClick={onQuoteClick}
          className="flex-1 flex items-center justify-center py-4 bg-gradient-to-r from-gray-800 to-gray-900 text-white font-bold tracking-wide text-sm font-tech transition-all duration-200 active:scale-95 hover:from-gray-700 hover:to-gray-800 relative overflow-hidden group"
        >
          {/* Effet de brillance au tap */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-active:opacity-100 transition-opacity duration-200"></div>
          <FileText className="w-5 h-5 mr-2 relative z-10" />
          <span className="relative z-10 font-futuristic">DEVIS</span>
        </button>
      </div>
    </div>
  );
};

export default MobileCTA;
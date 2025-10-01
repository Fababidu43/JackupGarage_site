import React from 'react';
import { Phone, FileText } from 'lucide-react';

interface MobileCTAProps {
  onQuoteClick: () => void;
}

const MobileCTA: React.FC<MobileCTAProps> = ({ onQuoteClick }) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-black/95 backdrop-blur-md border-t-2 border-orange-500/30 shadow-2xl" 
         style={{ 
           paddingBottom: 'max(0.75rem, env(safe-area-inset-bottom))',
           boxShadow: '0 -8px 32px rgba(0, 0, 0, 0.8), 0 -2px 8px rgba(255, 107, 53, 0.2)'
         }}>
      <div className="flex">
        <a
          href="tel:+33629485339"
          className="flex-1 flex items-center justify-center py-4 text-white font-bold tracking-wide text-sm font-tech transition-all duration-200 active:scale-95"
          style={{ background: '#FF6B35' }}
          aria-label="Appeler JACK Up Auto"
        >
          <Phone className="w-5 h-5 mr-2" aria-hidden="true" />
          APPELER
        </a>
        <button
          onClick={onQuoteClick}
          className="flex-1 flex items-center justify-center py-4 bg-gray-900 text-white font-bold tracking-wide text-sm font-tech transition-all duration-200 active:scale-95 border-l border-orange-500/20"
          aria-label="Demander un devis gratuit"
        >
          <FileText className="w-5 h-5 mr-2" aria-hidden="true" />
          DEVIS
        </button>
      </div>
      
      {/* Indicateur visuel en haut */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-12 h-1 bg-orange-500/50 rounded-full"></div>
    </div>
  );
};

export default MobileCTA;
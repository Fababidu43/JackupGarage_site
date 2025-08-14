import React from 'react';
import { Phone, FileText } from 'lucide-react';

interface MobileCTAProps {
  onQuoteClick: () => void;
}

const MobileCTA: React.FC<MobileCTAProps> = ({ onQuoteClick }) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-black border-t border-orange-500/20 shadow-lg" 
         style={{ paddingBottom: 'max(0.75rem, env(safe-area-inset-bottom))' }}>
      <div className="flex">
        <a
          href="tel:+33123456789"
          className="flex-1 flex items-center justify-center py-3 text-white font-bold tracking-wide text-sm font-tech hover-scale"
          style={{ background: '#FF6B35' }}
        >
          <Phone className="w-4 h-4 mr-2" />
          APPELER
        </a>
        <button
          onClick={onQuoteClick}
          className="flex-1 flex items-center justify-center py-3 bg-gray-900 text-white font-bold tracking-wide text-sm font-tech hover-scale"
        >
          <FileText className="w-4 h-4 mr-2" />
          DEVIS
        </button>
      </div>
    </div>
  );
};

export default MobileCTA;
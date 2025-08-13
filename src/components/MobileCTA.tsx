import React from 'react';
import { Phone, FileText } from 'lucide-react';

const MobileCTA = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-black border-t border-orange-500/50 shadow-lg">
      <div className="flex">
        <a
          href="tel:+33123456789"
          className="flex-1 flex items-center justify-center py-4 text-white font-bold tracking-wide text-sm transition-all duration-300 hover-neon"
          style={{ background: 'linear-gradient(135deg, #FF6B35, #FFB366)' }}
        >
          <Phone className="w-4 h-4 mr-2 animate-pulse-custom" />
          APPELER
        </a>
        <a
          href="#contact"
          className="flex-1 flex items-center justify-center py-4 bg-black text-orange-400 font-bold tracking-wide text-sm border-l border-orange-500/50 hover:bg-orange-500/20 transition-all duration-300"
        >
          <FileText className="w-4 h-4 mr-2 animate-pulse-custom" style={{ animationDelay: '0.5s' }} />
          DEVIS
        </a>
      </div>
    </div>
  );
};

export default MobileCTA;
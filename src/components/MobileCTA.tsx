import React from 'react';
import { Phone, FileText } from 'lucide-react';

const MobileCTA = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden glass-dark border-t border-white/20 shadow-lg backdrop-blur-lg">
      <div className="flex">
        <a
          href="tel:+33123456789"
          className="flex-1 flex items-center justify-center py-4 text-white font-bold tracking-wide text-sm gradient-primary neon-glow transition-all duration-300 hover:scale-105"
        >
          <Phone className="w-4 h-4 mr-2" />
          APPELER
        </a>
        <a
          href="#contact"
          className="flex-1 flex items-center justify-center py-4 glass text-white font-bold tracking-wide text-sm hover:bg-white/20 transition-all duration-300 hover:scale-105"
        >
          <FileText className="w-4 h-4 mr-2" />
          DEVIS
        </a>
      </div>
    </div>
  );
};

export default MobileCTA;
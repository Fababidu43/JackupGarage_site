import React from 'react';
import { Phone, FileText } from 'lucide-react';

const MobileCTA = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-black border-t border-orange-500/20 shadow-lg safe-area-bottom">
      <div className="flex">
        <a
          href="tel:+33123456789"
          className="flex-1 flex items-center justify-center py-3 pb-safe text-white font-bold tracking-wide text-sm font-tech hover-scale"
          style={{ background: '#FF6B35' }}
        >
          <Phone className="w-4 h-4 mr-2" />
          APPELER
        </a>
        <a
          href="#contact"
          className="flex-1 flex items-center justify-center py-3 pb-safe bg-gray-900 text-white font-bold tracking-wide text-sm font-tech hover-scale"
        >
          <FileText className="w-4 h-4 mr-2" />
          DEVIS
        </a>
      </div>
    </div>
  );
};

export default MobileCTA;
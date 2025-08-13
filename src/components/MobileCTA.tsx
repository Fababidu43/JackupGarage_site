import React from 'react';
import { Phone, FileText } from 'lucide-react';

const MobileCTA = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-white border-t border-gray-200 shadow-lg">
      <div className="flex">
        <a
          href="tel:+33123456789"
          className="flex-1 flex items-center justify-center py-4 text-white font-bold tracking-wide text-sm"
          style={{ background: '#DE5121' }}
        >
          <Phone className="w-4 h-4 mr-2" />
          APPELER
        </a>
        <a
          href="#contact"
          className="flex-1 flex items-center justify-center py-4 bg-gray-900 text-white font-bold tracking-wide text-sm"
        >
          <FileText className="w-4 h-4 mr-2" />
          DEVIS
        </a>
      </div>
    </div>
  );
};

export default MobileCTA;
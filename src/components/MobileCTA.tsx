import React from 'react';
import { Phone, FileText } from 'lucide-react';

const MobileCTA = () => {
  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-brand-steel border-t border-brand-line shadow-lg">
      <div className="flex">
        <a
          href="tel:+33123456789"
          className="flex-1 flex items-center justify-center py-4 bg-brand-orange text-black font-bold tracking-wide text-sm hover-allowed hover:bg-brand-orange2"
        >
          <Phone className="w-4 h-4 mr-2" />
          APPELER
        </a>
        <button
          onClick={scrollToContact}
          className="flex-1 flex items-center justify-center py-4 bg-brand-ink text-white font-bold tracking-wide text-sm hover-allowed hover:bg-brand-steel"
        >
          <FileText className="w-4 h-4 mr-2" />
          DEVIS
        </button>
      </div>
    </div>
  );
};

export default MobileCTA;
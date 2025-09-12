import React from 'react';
import { useEffect, useRef, useState } from 'react';
import { Facebook, Instagram, Phone, Mail, MapPin } from 'lucide-react';
import logo from '../logo.png';

const Footer = () => {
  const [isVisible, setIsVisible] = useState(false);
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    if (footerRef.current) {
      observer.observe(footerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <footer 
      ref={footerRef}
      className={`bg-black text-white py-3 relative overflow-hidden border-t border-orange-500/20 shadow-lg footer-reveal mt-auto z-10 ${isVisible ? 'revealed' : ''}`}
      style={{ 
        minHeight: '120px',
        paddingBottom: 'max(1rem, env(safe-area-inset-bottom))'
      }}
    >
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-1">
        {/* Layout horizontal compact */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-2 sm:gap-3 min-h-[80px] sm:min-h-[90px] pb-4">
          
          {/* Nom seulement */}
          <div className="text-center lg:text-left">
            <h3 className="text-sm sm:text-base font-bold text-white font-futuristic">Jack Up Garage</h3>
            <p className="text-orange-400 text-xs font-tech">Mécanicien à domicile</p>
          </div>

          {/* Logo super large centré */}
          <div className="flex-1 flex justify-center items-center">
            <div 
              className="w-24 h-10 sm:w-32 sm:h-12 lg:w-40 lg:h-16 xl:w-48 xl:h-18 bg-white/95 border border-orange-500/30 rounded-xl flex items-center justify-center p-1 sm:p-2 cursor-pointer hover:bg-white hover:border-orange-500/50 transition-all duration-300 hover-scale shadow-lg flex-shrink-0"
              onClick={() => document.getElementById('hero')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <img 
                src={logo} 
                alt="Jack Up Garage" 
                className="w-full h-full object-contain"
                style={{ maxWidth: '100%', maxHeight: '100%' }}
                onError={(e) => {
                  console.error('Footer logo failed to load');
                }}
              />
            </div>
          </div>

          {/* Contact + Réseaux sociaux */}
          <div className="flex items-center space-x-2 sm:space-x-3 lg:space-x-4 lg:justify-end">
            {/* Bouton d'accès admin galerie - très discret */}
            <button
              onClick={() => {
                // Si on est déjà sur la page galerie, ouvrir directement la modal
                if (window.location.pathname.includes('gallery') || document.querySelector('[data-gallery-page]')) {
                  // Déclencher l'événement pour ouvrir la modal admin
                  const event = new CustomEvent('openAdminLogin');
                  window.dispatchEvent(event);
                } else {
                  // Sinon, naviguer vers la galerie avec le hash
                  window.location.href = window.location.origin + '/#gallery-admin';
                }
              }}
              className="w-2 h-2 bg-gray-600 hover:bg-orange-500 rounded-full transition-all duration-200 opacity-20 hover:opacity-60 hover:scale-150 mr-1"
              title="Administration galerie"
            >
            </button>
            
            {/* Contact rapide */}
            <div className="flex items-center space-x-1 sm:space-x-2">
              <a 
                href="tel:+33630703036"
                className="flex items-center text-orange-400 hover:text-orange-300 transition-colors hover-lift"
              >
                <Phone className="w-3 h-3 mr-0.5 sm:mr-1" />
                <span className="text-xs font-tech hidden sm:inline">06 30 70 30 36</span>
                <span className="text-xs font-tech sm:hidden">Tel</span>
              </a>
              <div className="w-0.5 h-3 bg-gray-700"></div>
              <a 
                href="mailto:fabian.measson123@gmail.com"
                className="flex items-center text-gray-400 hover:text-orange-400 transition-colors hover-lift"
              >
                <Mail className="w-3 h-3 mr-0.5 sm:mr-1" />
                <span className="text-xs font-tech hidden sm:inline">Email</span>
                <span className="text-xs font-tech sm:hidden">Mail</span>
              </a>
            </div>

            {/* Séparateur */}
            <div className="w-0.5 h-4 bg-gray-700"></div>

            {/* Réseaux sociaux */}
            <div className="flex space-x-1 sm:space-x-2">
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 bg-gray-800 flex items-center justify-center text-gray-400 hover:text-orange-400 hover:bg-orange-500/20 rounded transition-colors hover-scale"
              >
                <Facebook className="w-3 h-3" />
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 bg-gray-800 flex items-center justify-center text-gray-400 hover:text-orange-400 hover:bg-orange-500/20 rounded transition-colors hover-scale"
              >
                <Instagram className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright minimaliste */}
        <div className="mt-2 pt-2 pb-2 border-t border-gray-800 text-center">
          <p className="text-gray-500 text-xs font-tech">
            © 2024 Jack Up Garage • Haute-Loire & Loire (43-42)
          </p>
        </div>
      </div>

      {/* Accent orange subtil en bas */}
      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-orange-500/50 to-transparent"></div>
    </footer>
  );
};

export default Footer;
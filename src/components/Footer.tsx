import React from 'react';
import { useEffect, useRef, useState } from 'react';
import { Facebook, Instagram, Phone, Mail, MapPin } from 'lucide-react';

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
      className={`bg-black text-white py-6 relative overflow-hidden border-t border-orange-500/20 shadow-lg footer-reveal mt-auto ${isVisible ? 'revealed' : ''}`}
    >
      {/* Motif réactif au scroll */}
      <div className="scroll-pattern absolute inset-0">
        <div className="gear-pattern"></div>
      </div>
      
      {/* Grille tech subtile */}
      <div className="absolute inset-0 tech-grid opacity-20"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
        {/* Layout horizontal compact */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-3 sm:gap-4">
          
          {/* Logo + Nom compact */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            <div 
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center bg-white/95 border border-orange-500/30 p-1 cursor-pointer hover:bg-white hover:border-orange-500/50 transition-all duration-300 hover-scale"
              onClick={() => document.getElementById('hero')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <img 
                src="/src/logo.png" 
                alt="Jack Up Garage" 
                className="max-h-8 sm:max-h-10 w-auto object-contain"
              />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-white font-futuristic">Jack Up Garage</h3>
              <p className="text-orange-400 text-xs sm:text-sm font-tech">Mécanicien à domicile</p>
            </div>
          </div>

          {/* Navigation horizontale */}
          <nav className="hidden md:flex items-center space-x-4 lg:space-x-6">
            {[
              { name: 'Accueil', href: '#hero' },
              { name: 'Services', href: '#services' },
              { name: 'Zone', href: '#area' },
              { name: 'Contact', href: '#contact' }
            ].map((link) => (
              <a 
                key={link.name}
                href={link.href}
                className="text-gray-400 hover:text-orange-400 text-xs lg:text-sm font-tech uppercase tracking-wide underline-animate transition-colors hover-lift"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Contact + Réseaux sociaux */}
          <div className="flex items-center space-x-3 sm:space-x-4">
            {/* Contact rapide */}
            <div className="flex items-center space-x-2 sm:space-x-3">
              <a 
                href="tel:+33123456789"
                className="flex items-center text-orange-400 hover:text-orange-300 transition-colors hover-lift"
              >
                <Phone className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                <span className="text-xs sm:text-sm font-tech">01 23 45 67 89</span>
              </a>
              <div className="w-0.5 h-3 sm:w-1 sm:h-4 bg-gray-700"></div>
              <a 
                href="mailto:contact@jackupgarage.fr"
                className="flex items-center text-gray-400 hover:text-orange-400 transition-colors hover-lift"
              >
                <Mail className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                <span className="text-xs sm:text-sm font-tech">Email</span>
              </a>
            </div>

            {/* Séparateur */}
            <div className="w-0.5 h-4 sm:w-1 sm:h-6 bg-gray-700"></div>

            {/* Réseaux sociaux */}
            <div className="flex space-x-2">
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-7 h-7 sm:w-8 sm:h-8 bg-gray-800 flex items-center justify-center text-gray-400 hover:text-orange-400 hover:bg-orange-500/20 rounded transition-colors hover-scale"
              >
                <Facebook className="w-3 h-3 sm:w-4 sm:h-4" />
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-7 h-7 sm:w-8 sm:h-8 bg-gray-800 flex items-center justify-center text-gray-400 hover:text-orange-400 hover:bg-orange-500/20 rounded transition-colors hover-scale"
              >
                <Instagram className="w-3 h-3 sm:w-4 sm:h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Version mobile - Navigation */}
        <nav className="md:hidden flex justify-center space-x-3 sm:space-x-4 mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-gray-800">
          {[
            { name: 'Accueil', href: '#hero' },
            { name: 'Services', href: '#services' },
            { name: 'Zone', href: '#area' },
            { name: 'Contact', href: '#contact' }
          ].map((link) => (
            <a 
              key={link.name}
              href={link.href}
              className="text-gray-400 hover:text-orange-400 text-xs font-tech uppercase tracking-wide underline-animate transition-colors min-h-[40px] flex items-center"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Copyright minimaliste */}
        <div className="text-center mt-3 sm:mt-4 pt-2 sm:pt-3 border-t border-gray-800">
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
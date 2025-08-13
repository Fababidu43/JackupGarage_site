import React from 'react';
import { Facebook, Instagram, Phone, Mail, Wrench, Zap } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-black text-white py-12 relative overflow-hidden border-t border-orange-500/30">
      {/* Éléments décoratifs futuristes */}
      <div className="absolute inset-0 particles-bg opacity-30"></div>
      <div className="absolute top-10 left-10 w-32 h-32 border border-orange-500/10 rounded-full animate-rotate"></div>
      <div className="absolute bottom-10 right-10 w-24 h-24 border border-orange-500/20 rounded-full animate-rotate" style={{ animationDirection: 'reverse' }}></div>
      <div className="absolute top-1/2 left-1/4 w-2 h-2 bg-orange-500 rounded-full animate-pulse-custom"></div>
      <div className="absolute bottom-1/3 right-1/4 w-3 h-3 bg-orange-400 rounded-full animate-float"></div>
      
      {/* Logo en filigrane futuriste */}
      <div className="absolute inset-0 flex items-center justify-center opacity-5">
        <Wrench className="w-48 h-48 text-orange-500 transform rotate-12 animate-rotate" style={{ animationDuration: '30s' }} />
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Jack Up Garage futuriste */}
          <div className="animate-slide-left">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg flex items-center justify-center animate-neon-glow">
               <Wrench className="w-5 h-5 text-white animate-pulse-custom" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white tracking-wide uppercase hover-glow">Jack Up Garage</h3>
                <p className="text-orange-400 font-medium tracking-wide text-sm uppercase animate-pulse-custom">Mécanicien à domicile</p>
              </div>
            </div>
            <p className="text-gray-400 mb-4 leading-relaxed font-light text-sm">
              Service professionnel de mécanique automobile à domicile dans la Haute-Loire (43) 
              et la Loire (42). Intervention rapide et devis gratuit.
            </p>
            <div className="flex space-x-3">
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-8 h-8 bg-gradient-to-r from-gray-800 to-gray-700 flex items-center justify-center text-gray-400 hover:text-white rounded-lg hover-scale transition-all duration-300 border border-orange-500/30"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-8 h-8 bg-gradient-to-r from-gray-800 to-gray-700 flex items-center justify-center text-gray-400 hover:text-white rounded-lg hover-scale transition-all duration-300 border border-orange-500/30"
              >
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Navigation futuriste */}
          <div className="animate-fade-up" style={{ animationDelay: '0.2s' }}>
            <h4 className="text-base font-bold text-white mb-4 tracking-wide uppercase hover-glow">Navigation</h4>
            <ul className="space-y-2">
              {[
                { name: 'Accueil', href: '#hero' },
                { name: 'Services', href: '#services' },
                { name: 'Zone d\'intervention', href: '#area' },
                { name: 'Contact', href: '#contact' }
              ].map((link, index) => (
                <li key={link.name}>
                  <a 
                    href={link.href}
                    className="text-gray-400 tracking-wide text-sm font-light uppercase hover:text-orange-400 transition-all duration-300 hover-scale inline-block"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact futuriste */}
          <div className="animate-slide-right">
            <h4 className="text-base font-bold text-white mb-4 tracking-wide uppercase hover-glow">Contact</h4>
            <div className="space-y-3">
              <div className="flex items-center text-gray-400 hover-scale">
                <div className="w-6 h-6 bg-orange-500/20 rounded flex items-center justify-center mr-2">
                  <Phone className="w-3 h-3 text-orange-400" />
                </div>
                <a 
                  href="tel:+33123456789"
                  className="font-light text-sm hover:text-orange-400 transition-colors"
                >
                  01 23 45 67 89
                </a>
              </div>
              <div className="flex items-center text-gray-400 hover-scale">
                <div className="w-6 h-6 bg-orange-500/20 rounded flex items-center justify-center mr-2">
                  <Mail className="w-3 h-3 text-orange-400" />
                </div>
                <a 
                  href="mailto:contact@jackupgarage.fr"
                  className="font-light text-sm hover:text-orange-400 transition-colors"
                >
                  contact@jackupgarage.fr
                </a>
              </div>
            </div>
            <div className="mt-4 p-3 bg-gradient-to-r from-gray-900/50 to-black/50 rounded-lg border border-orange-500/30 hover-neon">
              <p className="text-xs text-gray-300 font-light">
                <span className="font-bold tracking-wide uppercase text-orange-400 animate-pulse-custom">Réponse rapide :</span><br />
                Sous 12h par téléphone ou mail
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar futuriste */}
        <div className="border-t border-orange-500/30 mt-8 pt-6 text-center">
          <div className="flex justify-center items-center mb-4 space-x-4">
            <div className="w-8 h-0.5 bg-orange-500 animate-pulse-custom"></div>
            <Zap className="w-4 h-4 text-orange-500 animate-pulse-custom" />
            <div className="w-8 h-0.5 bg-orange-500 animate-pulse-custom" style={{ animationDelay: '0.5s' }}></div>
          </div>
          <p className="text-gray-400 tracking-wide text-xs font-light uppercase">
            © 2024 Jack Up Garage. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
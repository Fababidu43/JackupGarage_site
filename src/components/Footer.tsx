import React from 'react';
import { Facebook, Instagram, Phone, Mail, Wrench } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="relative overflow-hidden py-12 text-white particles" style={{ background: 'linear-gradient(135deg, #0F1419 0%, #1A1A2E 50%, #16213E 100%)' }}>
      {/* Logo en filigrane */}
      <div className="absolute inset-0 flex items-center justify-center opacity-10">
        <Wrench className="w-48 h-48 text-orange-500 transform rotate-12 animate-float" />
      </div>
      
      {/* Effets de fond */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-orange-500/20 rounded-full blur-2xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-blue-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Jack Up Garage */}
          <div className="animate-slide-glow">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 gradient-primary rounded-lg flex items-center justify-center neon-glow animate-pulse-glow">
               <Wrench className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white tracking-wide uppercase neon-text">Jack Up Garage</h3>
                <p className="text-orange-500 font-medium tracking-wide text-sm uppercase">Mécanicien à domicile</p>
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
                className="w-8 h-8 glass-dark flex items-center justify-center text-gray-400 hover:text-white rounded-lg transition-all duration-300 hover:bg-orange-500/20 hover:scale-110"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-8 h-8 glass-dark flex items-center justify-center text-gray-400 hover:text-white rounded-lg transition-all duration-300 hover:bg-orange-500/20 hover:scale-110"
              >
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div className="animate-slide-glow" style={{ animationDelay: '0.2s' }}>
            <h4 className="text-base font-bold text-white mb-4 tracking-wide uppercase neon-text">Navigation</h4>
            <ul className="space-y-2">
              {[
                { name: 'Accueil', href: '#hero' },
                { name: 'Services', href: '#services' },
                { name: 'Zone d\'intervention', href: '#area' },
                { name: 'Contact', href: '#contact' }
              ].map((link) => (
                <li key={link.name}>
                  <a 
                    href={link.href}
                    className="text-gray-400 tracking-wide text-sm font-light uppercase hover:text-orange-400 transition-all duration-300 hover:translate-x-2"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="animate-slide-glow" style={{ animationDelay: '0.4s' }}>
            <h4 className="text-base font-bold text-white mb-4 tracking-wide uppercase neon-text">Contact</h4>
            <div className="space-y-3">
              <div className="flex items-center text-gray-400">
                <Phone className="w-4 h-4 mr-2 text-orange-500" />
                <a 
                  href="tel:+33123456789"
                  className="font-light text-sm hover:text-orange-400 transition-colors duration-300"
                >
                  01 23 45 67 89
                </a>
              </div>
              <div className="flex items-center text-gray-400">
                <Mail className="w-4 h-4 mr-2 text-orange-500" />
                <a 
                  href="mailto:contact@jackupgarage.fr"
                  className="font-light text-sm hover:text-orange-400 transition-colors duration-300"
                >
                  contact@jackupgarage.fr
                </a>
              </div>
            </div>
            <div className="mt-4 p-3 glass-dark rounded-lg card-hover">
              <p className="text-xs text-gray-300 font-light">
                <span className="font-bold tracking-wide uppercase text-orange-500 neon-text">Réponse rapide :</span><br />
                Sous 12h par téléphone ou mail
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 mt-8 pt-6 text-center animate-slide-glow" style={{ animationDelay: '0.6s' }}>
          <p className="text-gray-400 tracking-wide text-xs font-light uppercase">
            © 2024 Jack Up Garage. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
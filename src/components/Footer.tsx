import React from 'react';
import { Facebook, Instagram, Phone, Mail, Wrench } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-black text-white py-12 relative overflow-hidden tech-grid">
      {/* Logo en filigrane */}
      <div className="absolute inset-0 flex items-center justify-center opacity-3">
        <Wrench className="w-48 h-48 text-orange-500 transform rotate-12" />
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Jack Up Garage */}
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center glow-hover">
                <img 
                  src="/src/logo.png" 
                  alt="Jack Up Garage" 
                  className="h-10 w-auto drop-shadow-lg filter brightness-110"
                />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white tracking-wide uppercase font-futuristic">Jack Up Garage</h3>
                <p className="text-orange-400 font-medium tracking-wide text-sm uppercase font-tech">Mécanicien à domicile</p>
              </div>
            </div>
            <p className="text-gray-400 mb-4 leading-relaxed font-light text-sm font-tech">
              Service professionnel de mécanique automobile à domicile dans la Haute-Loire (43) 
              et la Loire (42). Intervention rapide et devis gratuit.
            </p>
            <div className="flex space-x-3">
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-8 h-8 bg-gray-800 flex items-center justify-center text-gray-400 hover:text-orange-400 hover:bg-orange-500/20 rounded-lg transition-colors glow-hover"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-8 h-8 bg-gray-800 flex items-center justify-center text-gray-400 hover:text-orange-400 hover:bg-orange-500/20 rounded-lg transition-colors glow-hover"
              >
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-base font-bold text-white mb-4 tracking-wide uppercase font-futuristic">Navigation</h4>
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
                    className="text-gray-400 hover:text-orange-400 tracking-wide text-sm font-light uppercase font-tech underline-animate transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-base font-bold text-white mb-4 tracking-wide uppercase font-futuristic">Contact</h4>
            <div className="space-y-3">
              <div className="flex items-center text-gray-400">
                <Phone className="w-4 h-4 mr-2 text-orange-400" />
                <a 
                  href="tel:+33123456789"
                  className="font-light text-sm hover:text-orange-400 transition-colors font-tech"
                >
                  01 23 45 67 89
                </a>
              </div>
              <div className="flex items-center text-gray-400">
                <Mail className="w-4 h-4 mr-2 text-orange-400" />
                <a 
                  href="mailto:contact@jackupgarage.fr"
                  className="font-light text-sm hover:text-orange-400 transition-colors font-tech"
                >
                  contact@jackupgarage.fr
                </a>
              </div>
            </div>
            <div className="mt-4 p-3 bg-gray-900 rounded-lg border border-orange-500/20">
              <p className="text-xs text-gray-300 font-light font-tech">
                <span className="font-bold tracking-wide uppercase text-orange-400">Réponse rapide :</span><br />
                Sous 12h par téléphone ou mail
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-6 text-center">
          <p className="text-gray-400 tracking-wide text-xs font-light uppercase font-tech">
            © 2024 Jack Up Garage. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
import React from 'react';
import { Facebook, Instagram, Phone, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-black text-white py-16 relative overflow-hidden tech-grid border-t border-orange-500/30">
      {/* Filigrane discret */}
      <div className="absolute inset-0 flex items-center justify-center opacity-5">
        <img 
          src="/src/logo.png" 
          alt="" 
          className="w-32 h-32 opacity-20 grayscale"
        />
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Marque */}
          <div>
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-16 h-16 rounded-lg flex items-center justify-center bg-orange-500/10 border border-orange-500/20 p-2">
                <img 
                  src="/src/logo.png" 
                  alt="Jack Up Garage" 
                  className="h-12 w-auto drop-shadow-lg"
                />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white tracking-wide uppercase font-futuristic">Jack Up Garage</h3>
                <p className="text-orange-400 font-medium text-sm uppercase font-tech">Mécanicien à domicile</p>
              </div>
            </div>
            <p className="text-gray-300 mb-6 leading-relaxed font-light text-sm font-tech">
              Mécanique automobile à domicile.<br />
              Haute-Loire (43) & Loire (42).
            </p>
            <div className="flex space-x-2">
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-9 h-9 flex items-center justify-center text-gray-500 hover:text-orange-400 hover:bg-orange-500/10 rounded-lg transition-all duration-300"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-9 h-9 flex items-center justify-center text-gray-500 hover:text-orange-400 hover:bg-orange-500/10 rounded-lg transition-all duration-300"
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
                { name: 'Contact', href: '#contact' },
                { name: 'CGV', href: '#cgv' },
                { name: 'Mentions légales', href: '#mentions' }
              ].map((link) => (
                <li key={link.name}>
                  <a 
                    href={link.href}
                    className="text-gray-300 hover:text-orange-400 text-sm font-light uppercase font-tech underline-animate transition-colors duration-300"
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
              <div className="flex items-center">
                <Phone className="w-4 h-4 mr-3 text-orange-400" />
                <a 
                  href="tel:+33123456789"
                  className="text-white font-light text-sm hover:text-orange-400 transition-colors duration-300 font-tech"
                >
                  01 23 45 67 89
                </a>
              </div>
              <div className="flex items-center">
                <Mail className="w-4 h-4 mr-3 text-orange-400" />
                <a 
                  href="mailto:contact@jackupgarage.fr"
                  className="text-white font-light text-sm hover:text-orange-400 transition-colors duration-300 font-tech"
                >
                  contact@jackupgarage.fr
                </a>
              </div>
            </div>
            <div className="mt-4 p-3 bg-gray-900/50 rounded border border-orange-500/20">
              <p className="text-xs text-gray-300 font-light font-tech">
                <span className="font-medium text-orange-400 uppercase tracking-wide">Réponse rapide</span><br />
                &lt; 12h par téléphone ou mail
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-12 pt-6 text-center">
          <p className="text-gray-500 tracking-wide text-xs font-light uppercase font-tech">
            © 2024 Jack Up Garage. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
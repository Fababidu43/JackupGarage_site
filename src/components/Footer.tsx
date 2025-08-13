import React from 'react';
import { Facebook, Instagram, Phone, Mail, Wrench } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-black text-white py-12 relative overflow-hidden">
      {/* Gradient overlay pour plus de profondeur */}
      <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-black to-gray-900"></div>
      
      {/* Éléments décoratifs */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-20 w-20 h-20 bg-gradient-to-br from-orange-500 to-red-500 rounded-full blur-xl"></div>
        <div className="absolute bottom-20 right-20 w-24 h-24 bg-gradient-to-tl from-orange-400 to-yellow-400 rounded-full blur-lg"></div>
      </div>
      
      {/* Logo en filigrane */}
      <div className="absolute inset-0 flex items-center justify-center opacity-3">
        <Wrench className="w-48 h-48 text-white transform rotate-12" />
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Jack Up Garage */}
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center">
               <Wrench className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white tracking-wide uppercase">Jack Up Garage</h3>
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
                className="w-8 h-8 bg-gray-800 flex items-center justify-center text-gray-400 hover:text-white rounded-lg"
                style={{ '--hover-bg': '#DE5121' } as React.CSSProperties}
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-8 h-8 bg-gray-800 flex items-center justify-center text-gray-400 hover:text-white rounded-lg"
                style={{ '--hover-bg': '#DE5121' } as React.CSSProperties}
              >
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-base font-bold text-white mb-4 tracking-wide uppercase">Navigation</h4>
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
                    className="text-gray-400 tracking-wide text-sm font-light uppercase"
                    style={{ '--hover-color': '#DE5121' } as React.CSSProperties}
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-base font-bold text-white mb-4 tracking-wide uppercase">Contact</h4>
            <div className="space-y-3">
              <div className="flex items-center text-gray-400">
                <Phone className="w-4 h-4 mr-2 text-orange-500" />
                <a 
                  href="tel:+33123456789"
                  className="font-light text-sm"
                  style={{ '--hover-color': '#DE5121' } as React.CSSProperties}
                >
                  01 23 45 67 89
                </a>
              </div>
              <div className="flex items-center text-gray-400">
                <Mail className="w-4 h-4 mr-2 text-orange-500" />
                <a 
                  href="mailto:contact@jackupgarage.fr"
                  className="font-light text-sm"
                  style={{ '--hover-color': '#DE5121' } as React.CSSProperties}
                >
                  contact@jackupgarage.fr
                </a>
              </div>
            </div>
            <div className="mt-4 p-3 bg-gray-900 rounded-lg">
              <p className="text-xs text-gray-300 font-light">
                <span className="font-bold tracking-wide uppercase" style={{ color: '#DE5121' }}>Réponse rapide :</span><br />
                Sous 12h par téléphone ou mail
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-6 text-center">
          <p className="text-gray-400 tracking-wide text-xs font-light uppercase">
            © 2024 Jack Up Garage. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
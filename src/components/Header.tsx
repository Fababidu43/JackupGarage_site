import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  return (
    <header 
      className="fixed w-full top-0 z-50 bg-white/95 backdrop-blur-sm shadow-sm"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo personnalisé agrandi */}
          <div 
            className="flex items-center cursor-pointer"
            onClick={() => scrollToSection('hero')}
          >
            <img 
              src="/src/logo.png" 
              alt="Jack Up Garage" 
              className="h-16 w-auto drop-shadow-md hover:drop-shadow-lg transition-all duration-200"
            />
          </div>

          {/* Desktop Navigation - Toujours blanc */}
          <nav className="hidden md:flex items-center space-x-8">
            {[
              { name: 'Accueil', id: 'hero' },
              { name: 'Services', id: 'services' },
              { name: 'Zone', id: 'area' },
              { name: 'Contact', id: 'contact' }
            ].map((item) => (
              <button
                key={item.name}
                onClick={() => scrollToSection(item.id)}
                className="text-sm font-medium text-gray-700 hover:text-orange-500 tracking-wide uppercase transition-colors duration-200"
                style={{ '--hover-color': '#DE5121' } as React.CSSProperties}
              >
                {item.name}
              </button>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-gray-700 hover:text-orange-500 transition-colors duration-200"
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-white/95 backdrop-blur-sm border-t border-gray-200">
            <nav className="py-4 space-y-2">
              {[
                { name: 'Accueil', id: 'hero' },
                { name: 'Services', id: 'services' },
                { name: 'Zone', id: 'area' },
                { name: 'Contact', id: 'contact' }
              ].map((item) => (
                <button
                  key={item.name}
                  onClick={() => scrollToSection(item.id)}
                  className="block w-full text-left px-4 py-2 text-gray-700 hover:text-orange-500 font-medium tracking-wide uppercase text-sm transition-colors duration-200"
                  style={{ '--hover-color': '#DE5121' } as React.CSSProperties}
                >
                  {item.name}
                </button>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
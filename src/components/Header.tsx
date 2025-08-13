import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  return (
    <header 
      className={`fixed w-full top-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-black/90 backdrop-blur-sm shadow-lg border-b border-orange-500/20' 
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo - Style Solid State */}
          <div 
            className="flex items-center cursor-pointer glow-hover"
            onClick={() => scrollToSection('hero')}
          >
            <img 
              src="/src/logo.png" 
              alt="Jack Up Garage" 
              className="h-14 w-auto drop-shadow-lg filter brightness-110 hover-scale"
            />
          </div>

          {/* Desktop Navigation - Style Solid State */}
          <nav className="hidden md:flex items-center space-x-8 mr-4">
            {[
              { name: 'Accueil', id: 'hero' },
              { name: 'Services', id: 'services' },
              { name: 'Zone', id: 'area' },
              { name: 'Contact', id: 'contact' }
            ].map((item) => (
              <button
                key={item.name}
                onClick={() => scrollToSection(item.id)}
                className="text-sm font-medium text-white/90 hover:text-orange-400 tracking-wide uppercase underline-animate font-tech transition-colors hover-lift"
              >
                {item.name}
              </button>
            ))}
            
            {/* Bouton Appeler dans le header */}
            <a
              href="tel:+33123456789"
              className="ml-6 px-4 py-2 btn-primary rounded-lg text-sm font-tech glow-hover hover-scale"
            >
              Appeler
            </a>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-white"
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-black/95 backdrop-blur-sm border-t border-orange-500/20">
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
                  className="block w-full text-left px-4 py-2 text-white/90 hover:text-orange-400 font-medium tracking-wide uppercase text-sm font-tech transition-colors hover-lift"
                >
                  {item.name}
                </button>
              ))}
              <a
                href="tel:+33123456789"
                className="block mx-4 mt-4 px-4 py-2 btn-primary rounded-lg text-sm font-tech text-center hover-scale"
              >
                Appeler
              </a>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
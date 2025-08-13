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
            <div className="relative group">
              {/* Halo lumineux en arrière-plan */}
              <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-orange-400/10 rounded-xl blur-sm opacity-0 group-hover:opacity-100 transition-all duration-500 scale-110"></div>
              
              {/* Conteneur du logo avec bordure subtile */}
              <div className="relative bg-gradient-to-br from-orange-500/5 to-transparent border border-orange-500/10 rounded-lg p-2 backdrop-blur-sm transition-all duration-300 group-hover:border-orange-500/30 group-hover:bg-orange-500/10">
                <img 
                  src="/src/logo.png" 
                  alt="Jack Up Garage" 
                  className="h-12 w-auto filter brightness-110 group-hover:brightness-125 transition-all duration-300 drop-shadow-md group-hover:drop-shadow-xl"
                />
              </div>
              
              {/* Reflet subtil */}
              <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/10 to-transparent rounded-t-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
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
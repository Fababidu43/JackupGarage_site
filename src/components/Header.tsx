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
      className={`fixed w-full top-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? 'bg-black/95 backdrop-blur-sm shadow-lg border-b border-orange-500/30' 
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo futuriste */}
          <div 
            className="flex items-center cursor-pointer hover-scale"
            onClick={() => scrollToSection('hero')}
          >
            <img 
              src="/src/logo.png" 
              alt="Jack Up Garage" 
              className="h-12 w-auto drop-shadow-lg hover-neon transition-all duration-300"
            />
          </div>

          {/* Desktop Navigation futuriste */}
          <nav className="hidden md:flex items-center space-x-8">
            {[
              { name: 'Accueil', id: 'hero' },
              { name: 'Services', id: 'services' },
              { name: 'Zone', id: 'area' },
              { name: 'Contact', id: 'contact' }
            ].map((item, index) => (
              <button
                key={item.name}
                onClick={() => scrollToSection(item.id)}
                className={`text-sm font-medium tracking-wide uppercase transition-all duration-300 hover-glow relative ${
                  isScrolled ? 'text-white' : 'text-white'
                }`}
                style={{ 
                  animationDelay: `${index * 0.1}s`,
                }}
              >
                {item.name}
                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-orange-500 transition-all duration-300 hover:w-full"></div>
              </button>
            ))}
          </nav>

          {/* Mobile Menu Button futuriste */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`md:hidden p-2 rounded-lg transition-all duration-300 hover-scale ${
              isScrolled ? 'text-white bg-orange-500/20' : 'text-white bg-black/20'
            }`}
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile Navigation futuriste */}
        {isMenuOpen && (
          <div className="md:hidden bg-black/95 backdrop-blur-sm border-t border-orange-500/30 animate-fade-up">
            <nav className="py-4 space-y-2">
              {[
                { name: 'Accueil', id: 'hero' },
                { name: 'Services', id: 'services' },
                { name: 'Zone', id: 'area' },
                { name: 'Contact', id: 'contact' }
              ].map((item, index) => (
                <button
                  key={item.name}
                  onClick={() => scrollToSection(item.id)}
                  className="block w-full text-left px-4 py-3 text-white font-medium tracking-wide uppercase text-sm hover:bg-orange-500/20 hover:text-orange-400 transition-all duration-300 animate-slide-left"
                  style={{ animationDelay: `${index * 0.1}s` }}
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
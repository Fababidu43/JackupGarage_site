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
            <div className="w-16 h-12 bg-white/95 border-2 border-orange-500/30 rounded-lg flex items-center justify-center p-2 hover:bg-white hover:border-orange-500/50 transition-all duration-300 shadow-lg hover-scale">
              <img 
                src="/src/logo.png" 
                alt="Jack Up Garage" 
                className="max-h-8 w-auto object-contain"
              />
            </div>
          </div>

          {/* Desktop Navigation - Menu Déroulant */}
          <div className="hidden md:flex items-center relative">
            <div className="relative">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="flex items-center px-6 py-3 bg-orange-500/10 border border-orange-500/30 rounded-lg text-white/90 hover:text-orange-400 hover:bg-orange-500/20 hover:border-orange-500/50 transition-all duration-300 font-tech uppercase tracking-wide text-sm font-medium glow-hover"
              >
                Menu
                <div className={`ml-2 transition-transform duration-300 ${isMenuOpen ? 'rotate-180' : ''}`}>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </button>
              
              {/* Menu Déroulant Desktop */}
              {isMenuOpen && (
                <div className="absolute right-0 top-full mt-2 w-56 bg-black/95 backdrop-blur-sm border border-orange-500/30 rounded-lg shadow-2xl overflow-hidden z-50">
                  <div className="py-2">
                    {[
                      { name: 'Accueil', id: 'hero', icon: '🏠' },
                      { name: 'Services', id: 'services', icon: '🔧' },
                      { name: 'Zone d\'intervention', id: 'area', icon: '📍' },
                      { name: 'Contact', id: 'contact', icon: '📞' }
                    ].map((item) => (
                      <button
                        key={item.name}
                        onClick={() => scrollToSection(item.id)}
                        className="w-full flex items-center px-4 py-3 text-left text-white/90 hover:text-orange-400 hover:bg-orange-500/10 transition-all duration-200 font-tech text-sm hover-lift"
                      >
                        <span className="mr-3 text-base">{item.icon}</span>
                        {item.name}
                      </button>
                    ))}
                    <div className="border-t border-orange-500/20 mt-2 pt-2">
                      <a
                        href="tel:+33123456789"
                        className="w-full flex items-center px-4 py-3 text-left btn-primary rounded-none hover:bg-orange-600 transition-all duration-200 font-tech text-sm font-medium"
                      >
                        <span className="mr-3 text-base">📱</span>
                        Appeler Maintenant
                      </a>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

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
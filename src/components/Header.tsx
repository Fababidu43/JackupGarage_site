import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 50);
      
      // Barre de progression de lecture
      const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollY / documentHeight) * 100;
      setScrollProgress(Math.min(progress, 100));
      
      // Scroll spy pour section active
      const sections = ['hero', 'services', 'area', 'contact'];
      const currentSection = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      
      if (currentSection) {
        setActiveSection(currentSection);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Fermer le menu avec Escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener('keydown', handleEscape);
      // Focus trap basique
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  const navigationItems = [
    { name: 'Accueil', id: 'hero', icon: '🏠' },
    { name: 'Services', id: 'services', icon: '🔧' },
    { name: 'Zone d\'intervention', id: 'area', icon: '📍' },
    { name: 'Contact', id: 'contact', icon: '📞' }
  ];

  return (
    <>
      {/* Barre de progression de lecture */}
      <div 
        className="fixed top-0 left-0 h-0.5 bg-gradient-to-r from-orange-500 to-orange-400 z-50 transition-all duration-300 ease-out"
        style={{ width: `${scrollProgress}%` }}
      />
      
      <header 
        className={`fixed w-full top-0 z-40 transition-all duration-300 ease-out ${
          isScrolled 
            ? 'bg-black/80 backdrop-blur-md shadow-lg border-b border-orange-500/30 py-2'
            : 'bg-transparent py-3 border-b border-orange-500/30'
        }`}
        style={{
          backdropFilter: isScrolled ? 'blur(12px)' : 'none',
        }}
      >
        <div className="mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`flex justify-between items-center transition-all duration-300 ease-out ${
            isScrolled ? 'h-14' : 'h-16'
          }`}>
            
            {/* Logo */}
            <div 
              className="flex items-center cursor-pointer group"
              onClick={() => scrollToSection('hero')}
            >
              <div className={`bg-white/95 border border-orange-500/25 rounded-md flex items-center justify-center px-3 py-2 
                hover:bg-white hover:border-orange-500/40 transition-all duration-300 shadow-md
                transform hover:scale-105 hover:shadow-lg group-focus:ring-2 group-focus:ring-orange-500/50 group-focus:ring-offset-2
                ${isScrolled ? 'w-24 h-12' : 'w-32 h-16'}`}
              >
                <img 
                  src="/src/logo.png" 
                  alt="Jack Up Garage" 
                  className={`w-auto object-contain transition-all duration-300 ${
                    isScrolled ? 'max-h-8' : 'max-h-12'
                  }`}
                />
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navigationItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => scrollToSection(item.id)}
                  className={`relative px-3 py-2 text-xs lg:text-sm font-medium tracking-wide uppercase font-tech
                    transition-all duration-200 ease-out transform hover:translate-y-[-1px]
                    focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:ring-offset-2 rounded
                    ${activeSection === item.id 
                      ? 'text-orange-400' 
                      : 'text-white/90 hover:text-orange-400'
                    }`}
                >
                  {item.name}
                  
                  {/* Soulignement animé */}
                  <span className={`absolute bottom-0 left-0 h-0.5 bg-orange-500 transition-all duration-300 ease-out
                    ${activeSection === item.id ? 'w-full' : 'w-0 group-hover:w-full'}`} />
                  
                  {/* Indicateur section active */}
                  {activeSection === item.id && (
                    <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-orange-500" />
                  )}
                </button>
              ))}
              
              {/* CTA Appeler Desktop */}
              <a
                href="tel:+33123456789"
                className="ml-2 lg:ml-4 px-4 lg:px-6 py-2.5 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-medium 
                  rounded-lg transition-all duration-200 ease-out transform hover:scale-105
                  hover:shadow-lg hover:shadow-orange-500/25 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:ring-offset-2
                  font-tech uppercase tracking-wide text-xs lg:text-sm"
              >
                Appeler
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-white hover:text-orange-400 transition-colors duration-200
                focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:ring-offset-2 rounded"
              aria-expanded={isMenuOpen}
              aria-label={isMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Overlay */}
        {isMenuOpen && (
          <>
            {/* Backdrop */}
            <div 
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30 md:hidden"
              onClick={() => setIsMenuOpen(false)}
            />
            
            {/* Menu Panel */}
            <div className="fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-black/95 backdrop-blur-md 
              border-l border-orange-500/30 z-40 md:hidden transform transition-transform duration-300 ease-out
              safe-area-inset-right safe-area-inset-top">
              
              {/* Header du menu mobile */}
              <div className="flex items-center justify-between p-4 sm:p-6 pt-safe border-b border-orange-500/20">
                <h3 className="text-lg font-bold text-white font-futuristic uppercase tracking-wide">Menu</h3>
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="p-3 text-white hover:text-orange-400 transition-colors duration-200
                    focus:outline-none focus:ring-2 focus:ring-orange-500/50 rounded"
                  aria-label="Fermer le menu"
                >
                  <X size={24} />
                </button>
              </div>
              
              {/* Navigation Links */}
              <nav className="py-4 px-4 sm:py-6 sm:px-6 space-y-1 overflow-y-auto max-h-[60vh]">
                {navigationItems.map((item) => (
                  <button
                    key={item.name}
                    onClick={() => scrollToSection(item.id)}
                    className={`w-full flex items-center px-4 py-5 text-left rounded-lg transition-all duration-200
                      focus:outline-none focus:ring-2 focus:ring-orange-500/50 font-tech text-base
                      ${activeSection === item.id 
                        ? 'text-orange-400 bg-orange-500/10 border-l-2 border-orange-500' 
                        : 'text-white/90 hover:text-orange-400 hover:bg-orange-500/5'
                      }`}
                    style={{ minHeight: '56px' }}
                  >
                    <span className="mr-4 text-xl">{item.icon}</span>
                    <span className="text-lg">{item.name}</span>
                  </button>
                ))}
              </nav>
              
              {/* CTA Mobile */}
              <div className="absolute bottom-4 left-4 right-4 pb-safe">
                <a
                  href="tel:+33123456789"
                  className="w-full flex items-center justify-center px-6 py-5 bg-gradient-to-r from-orange-500 to-orange-600 
                    text-white font-bold rounded-lg transition-all duration-200 transform hover:scale-105
                    hover:shadow-lg hover:shadow-orange-500/25 focus:outline-none focus:ring-2 focus:ring-orange-500/50
                    font-tech uppercase tracking-wide text-lg"
                  style={{ minHeight: '60px' }}
                >
                  <span className="mr-3 text-xl">📱</span>
                  Appeler Maintenant
                </a>
              </div>
            </div>
          </>
        )}
      </header>
    </>
  );
};

export default Header;
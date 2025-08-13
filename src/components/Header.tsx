import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

interface HeaderProps {
  onQuoteClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onQuoteClick }) => {
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
                onClick={onQuoteClick}
                className="ml-2 lg:ml-4 px-4 lg:px-6 py-2.5 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-medium cursor-pointer
                  rounded-lg transition-all duration-200 ease-out transform hover:scale-105
                  hover:shadow-lg hover:shadow-orange-500/25 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:ring-offset-2
                  font-tech uppercase tracking-wide text-xs lg:text-sm"
              >
                Devis
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
            <div className="fixed top-16 right-4 w-64 bg-black/95 backdrop-blur-md rounded-lg shadow-xl
              border border-orange-500/30 z-40 md:hidden transform transition-all duration-200 ease-out">
              
              {/* Header avec croix */}
              <div className="flex items-center justify-between p-4 border-b border-orange-500/20">
                <span className="text-white font-medium text-sm font-tech uppercase tracking-wide">Menu</span>
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="p-1 text-white/70 hover:text-orange-400 transition-colors duration-200
                    focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:ring-offset-2 rounded"
                  aria-label="Fermer le menu"
                >
                  <X size={20} />
                </button>
              </div>
              
              {/* Navigation Links identique au desktop */}
              <nav className="py-3">
                {navigationItems.map((item, index) => (
                  <button
                    key={item.name}
                    onClick={() => scrollToSection(item.id)}
                    className={`relative w-full px-4 py-3 text-left text-sm font-tech transition-all duration-200 ease-out
                      ${activeSection === item.id 
                        ? 'text-orange-400' 
                        : 'text-white/90 hover:text-orange-400'
                      } ${index !== navigationItems.length - 1 ? 'border-b border-white/10' : ''}`}
                  >
                    {item.name}
                    
                    {/* Soulignement animé identique au desktop */}
                    <span className={`absolute bottom-0 left-4 right-4 h-0.5 bg-orange-500 transition-all duration-300 ease-out
                      ${activeSection === item.id ? 'w-[calc(100%-2rem)]' : 'w-0 group-hover:w-[calc(100%-2rem)]'}`} />
                    
                    {/* Indicateur section active */}
                    {activeSection === item.id && (
                      <span className="absolute left-0 top-0 bottom-0 w-1 bg-orange-500 rounded-r" />
                    )}
                  </button>
                ))}
              </nav>
              
              {/* CTA identique au desktop */}
              <div className="p-4 border-t border-orange-500/20">
                <button
                  onClick={() => {
                    onQuoteClick();
                    setIsMenuOpen(false);
                  }}
                  className="w-full flex items-center justify-center px-4 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-medium 
                    rounded-lg transition-all duration-200 ease-out transform hover:scale-105
                    hover:shadow-lg hover:shadow-orange-500/25 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:ring-offset-2
                    font-tech uppercase tracking-wide text-sm"
                >
                  Devis Express
                </button>
              </div>
            </div>
          </>
        )}
      </header>
    </>
  );
};

export default Header;
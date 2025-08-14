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
    { name: 'FAQ', id: 'faq', icon: '❓' },
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
            : 'bg-black/70 backdrop-blur-md shadow-lg border-b border-orange-500/30 py-3'
        }`}
        style={{
          backdropFilter: 'blur(12px)',
        }}
      >
        <div className="mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`flex justify-between items-center transition-all duration-300 ease-out ${
            'h-16'
          }`}>
            
            {/* Logo */}
            <div 
              className="flex items-center cursor-pointer group"
              onClick={() => scrollToSection('hero')}
            >
              <div className={`bg-white/95 border border-orange-500/25 rounded-md flex items-center justify-center px-3 py-2 
                hover:bg-white hover:border-orange-500/40 transition-all duration-300 shadow-md
                transform hover:scale-105 hover:shadow-lg group-focus:ring-2 group-focus:ring-orange-500/50 group-focus:ring-offset-2
                w-32 h-16`}
              >
                <img 
                  src="/src/logo.png" 
                  alt="Jack Up Garage" 
                  className={`w-auto object-contain transition-all duration-300 ${
                    'max-h-12'
                  }`}
                />
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-6 xl:space-x-8">
              {navigationItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => scrollToSection(item.id)}
                  className={`relative px-2 lg:px-3 py-2 text-xs xl:text-sm font-medium tracking-wide uppercase font-tech
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
                className="ml-2 xl:ml-4 px-3 lg:px-4 xl:px-6 py-2.5 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-medium cursor-pointer
                  rounded-lg transition-all duration-200 ease-out transform hover:scale-105
                  hover:shadow-lg hover:shadow-orange-500/25 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:ring-offset-2
                  font-tech uppercase tracking-wide text-xs xl:text-sm"
              >
                Devis
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 text-white hover:text-orange-400 transition-colors duration-200
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
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30 lg:hidden"
              onClick={() => setIsMenuOpen(false)}
            />
            
            {/* Menu Panel */}
            <div className="fixed top-16 right-2 left-2 sm:right-4 sm:left-4 max-w-sm mx-auto bg-gradient-to-br from-gray-900 via-black to-gray-900 backdrop-blur-md rounded-2xl shadow-2xl
              border-2 border-orange-500/40 z-40 lg:hidden transform transition-all duration-300 ease-out overflow-hidden"
            >
              
              {/* Accent lumineux en haut */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-500 via-orange-400 to-orange-500"></div>
              
              {/* Header avec croix */}
              <div className="flex items-center justify-between p-5 border-b border-orange-500/30 bg-black/30">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-8 bg-white/95 border border-orange-500/30 rounded-md flex items-center justify-center">
                    <img 
                      src="/src/logo.png" 
                      alt="Jack Up Garage" 
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <span className="text-white font-bold text-base font-futuristic uppercase tracking-wide">Navigation</span>
                </div>
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="p-2 text-white/70 hover:text-orange-400 hover:bg-orange-500/10 rounded-lg transition-all duration-200
                    focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:ring-offset-2"
                  aria-label="Fermer le menu"
                >
                  <X size={18} />
                </button>
              </div>
              
              {/* Navigation Links identique au desktop */}
              <nav className="py-2">
                {navigationItems.map((item, index) => (
                  <button
                    key={item.name}
                    onClick={() => scrollToSection(item.id)}
                    className={`relative w-full px-5 py-4 text-left text-sm font-tech transition-all duration-300 ease-out group
                      hover:bg-gradient-to-r hover:from-orange-500/10 hover:to-orange-600/5
                      ${activeSection === item.id 
                        ? 'text-orange-400 bg-orange-500/10' 
                        : 'text-white/90 hover:text-orange-300'
                      } ${index !== navigationItems.length - 1 ? 'border-b border-white/5' : ''}`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        activeSection === item.id ? 'bg-orange-400 shadow-lg shadow-orange-400/50' : 'bg-white/20 group-hover:bg-orange-400/50'
                      }`}></div>
                      <span className="font-medium">{item.name}</span>
                    </div>
                    
                    {/* Barre latérale active */}
                    {activeSection === item.id && (
                      <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-orange-400 to-orange-600 rounded-r"></div>
                    )}
                  </button>
                ))}
              </nav>
              
              {/* CTA identique au desktop */}
              <div className="p-5 border-t border-orange-500/30 bg-black/20">
                <button
                  onClick={() => {
                    onQuoteClick();
                    setIsMenuOpen(false);
                  }}
                  className="w-full flex items-center justify-center px-4 py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold 
                    rounded-xl transition-all duration-300 ease-out transform hover:scale-105 active:scale-95
                    hover:shadow-xl hover:shadow-orange-500/30 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:ring-offset-2
                    font-futuristic uppercase tracking-wide text-sm relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                  <span className="relative z-10">🚗 Devis Express</span>
                </button>
              </div>
              
              {/* Effet lumineux en bas */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-orange-500/30 to-transparent"></div>
            </div>
          </>
        )}
      </header>
    </>
  );
};

export default Header;
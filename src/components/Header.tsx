import React, { useState, useEffect } from 'react';
import { Menu, X, Phone } from 'lucide-react';

interface HeaderProps {
  onQuoteClick: () => void;
  onNavigateGallery?: () => void;
  onNavigateHome?: () => void;
  isGalleryPage?: boolean;
}

const Header: React.FC<HeaderProps> = ({ onQuoteClick, onNavigateGallery, onNavigateHome, isGalleryPage = false }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showLogo, setShowLogo] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    let scrollTimeout: NodeJS.Timeout;
    
    const handleScroll = () => {
      // Debounce pour éviter trop d'appels
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        performScrollCalculations();
      }, 16); // ~60fps
    };
    
    const performScrollCalculations = () => {
      const scrollY = window.scrollY;
      
      // Détecter si on a dépassé la section À propos
      const heroSection = document.getElementById('hero');
      const aboutSection = document.getElementById('about');
      
      let shouldShowLogo = false;
      let shouldBeScrolled = scrollY > 50;
      
      if (heroSection && aboutSection) {
        // Calculer la position après le Hero + section À propos
        const heroHeight = heroSection.offsetHeight;
        const aboutHeight = aboutSection.offsetHeight;
        
        // Le logo apparaît après avoir dépassé la section À propos
        const triggerPoint = heroHeight + aboutHeight + 100; // +100px de marge
        shouldShowLogo = scrollY >= triggerPoint;
      } else if (heroSection) {
        // Fallback si À propos n'est pas trouvé
        const heroHeight = heroSection.offsetHeight;
        shouldShowLogo = scrollY >= heroHeight + 400;
      } else {
        // Fallback général
        shouldShowLogo = scrollY > window.innerHeight * 1.2;
      }
      
      setIsScrolled(shouldBeScrolled);
      setShowLogo(shouldShowLogo);

      // Détection simple de la section active
      const sections = ['hero', 'about', 'services-intro', 'area', 'faq', 'contact'];
      let currentActive = '';

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const rect = element.getBoundingClientRect();
          
          // Logique spéciale pour services-intro (section "Nos Services")
          if (sectionId === 'services-intro') {
            // Services est actif dès qu'on arrive sur la section et reste actif jusqu'à la zone d'intervention
            const areaElement = document.getElementById('area');
            if (areaElement) {
              const areaRect = areaElement.getBoundingClientRect();
              // Services reste actif tant que la zone d'intervention n'est pas proche du haut
              if (rect.top <= 100 && areaRect.top > 200) {
                currentActive = 'services';
                break;
              }
            } else if (rect.top <= 100 && rect.bottom >= 100) {
              currentActive = 'services';
              break;
            }
          } else {
            // Logique normale pour les autres sections
            if (rect.top <= 100 && rect.bottom >= 100) {
              currentActive = sectionId;
              break;
            }
          }
        }
      }

      setActiveSection(currentActive);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
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
    } else if (sectionId === 'gallery' && onNavigateGallery) {
      // Navigation vers la page galerie
      onNavigateGallery();
      setIsMenuOpen(false);
    } else if (sectionId === 'hero' && onNavigateHome) {
      // Navigation vers la page d'accueil
      onNavigateHome();
      setIsMenuOpen(false);
    }
  };

  const homeNavigationItems = [
    { name: 'Accueil', id: 'hero', icon: '🏠' },
    { name: 'Services', id: 'services', icon: '🔧' },
    { name: 'Zone d\'intervention', id: 'area', icon: '📍' },
    { name: 'À propos', id: 'about', icon: '👤' },
    { name: 'FAQ', id: 'faq', icon: '❓' },
    { name: 'Contact', id: 'contact', icon: '📞' },
    { name: 'Galerie', id: 'gallery', icon: '📸' }
  ];

  const galleryNavigationItems = [
    { name: 'Retour à l\'accueil', id: 'hero', icon: '🏠' }
  ];


  return (
    <>
      {/* Barre de progression de lecture */}
      
      <header 
        className={`fixed w-full top-0 z-40 transition-all duration-300 ease-out ${
          isScrolled 
            ? 'bg-black/80 backdrop-blur-md shadow-lg border-b border-orange-500/30 py-2'
            : 'bg-black/70 backdrop-blur-md shadow-lg border-b border-orange-500/30 py-3'
        }`}
        style={{
          backdropFilter: 'blur(12px)',
          zIndex: isMenuOpen ? 50 : 10, // Passer derrière les modals admin (z-60)
        }}
      >
        <div className="mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`flex justify-between items-center transition-all duration-300 ease-out ${
            'h-16'
          }`}>
            
            {/* Logo */}
            {/* Logo - affiché dynamiquement avec animation */}
            <div className={`transition-all duration-500 ease-out transform ${
              showLogo 
                ? 'opacity-100 translate-x-0 scale-100' 
                : 'opacity-0 -translate-x-4 scale-95 pointer-events-none'
            }`}>
              <div 
                className="flex items-center cursor-pointer group"
                onClick={() => {
                  if (onNavigateHome) {
                    onNavigateHome();
                  } else {
                    scrollToSection('hero');
                  }
                }}
              >
                <img 
                  src="./logo.png" 
                  alt="JACK Up Auto" 
                  className="w-28 h-14 sm:w-36 sm:h-18 object-contain transition-all duration-300 hover:scale-110 hover:brightness-110 flex-shrink-0"
                  style={{ maxWidth: '100%', maxHeight: '100%' }}
                  onError={(e) => {
                    console.warn('Header logo failed to load, trying fallback');
                    e.currentTarget.src = '/logo.png';
                  }}
                />
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className={`hidden lg:flex items-center space-x-6 xl:space-x-8 transition-all duration-500 ${!showLogo ? 'ml-auto' : ''}`}>
              {isGalleryPage ? (
                <button
                  onClick={() => {
                    if (onNavigateHome) {
                      onNavigateHome();
                      setTimeout(() => {
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }, 50);
                    }
                  }}
                  className="relative px-4 py-2 bg-white/10 border border-white/20 text-white font-medium tracking-wide uppercase font-tech
                    transition-all duration-300 ease-out transform hover:scale-105 hover:bg-white/20 hover:border-white/40
                    focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 rounded-lg backdrop-blur-sm
                    shadow-lg hover:shadow-xl text-sm"
                >
                  🏠 Retour à l'accueil
                </button>
              ) : (
                homeNavigationItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => scrollToSection(item.id)}
                  className={`relative px-2 lg:px-3 py-2 text-xs xl:text-sm font-medium tracking-wide uppercase font-tech
                    transition-all duration-300 ease-out transform hover:translate-y-[-1px]
                    focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:ring-offset-2 rounded
                    ${activeSection === item.id 
                      ? 'text-orange-400 scale-105' 
                      : 'text-white/90 hover:text-orange-400'
                    }`}
                >
                  {/* Indicateur de section active */}
                  {activeSection === item.id && (
                    <>
                      <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-6 h-0.5 bg-orange-400 rounded-full"></div>
                      <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-6 h-0.5 bg-orange-400 rounded-full"></div>
                    </>
                  )}
                  {item.name}
                </button>
                ))
              )}
              
              {/* CTA Appeler Desktop */}
              <a
                href="tel:+33629485339"
                className="ml-2 xl:ml-4 px-3 lg:px-4 xl:px-6 py-2.5 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-medium cursor-pointer
                  rounded-lg transition-all duration-200 ease-out transform hover:scale-105
                  hover:shadow-lg hover:shadow-orange-500/25 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:ring-offset-2
                  font-tech uppercase tracking-wide text-sm backdrop-blur-sm"
                aria-label="Appeler JACK Up Auto au 06 29 48 53 39"
              >
                <Phone className="w-4 h-4 inline-block mr-2" aria-hidden="true" />
                Appeler
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 text-white/80 hover:text-orange-300 hover:bg-orange-500/10 rounded-lg transition-all duration-200
                focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:ring-offset-2 backdrop-blur-sm"
              aria-label={isMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
              aria-expanded={isMenuOpen}
            >
              <Menu size={20} />
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
              border border-orange-500/20 z-40 lg:hidden transform transition-all duration-300 ease-out overflow-hidden"
            >
              
              {/* Accent lumineux en haut */}
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-orange-500/50 to-transparent"></div>
              
              {/* Header avec croix */}
              <div className="flex items-center justify-between p-4 border-b border-orange-500/10 bg-black/20">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-6 bg-white/90 border border-orange-500/20 rounded flex items-center justify-center">
                    <img 
                      src="./logo.png" 
                      alt="Jack Up Garage" 
                      className="w-full h-full object-contain"
                      onError={(e) => {
                        console.warn('Mobile menu logo failed to load, trying fallback');
                        e.currentTarget.src = '/logo.png';
                      }}
                    />
                  </div>
                  <span className="text-white/90 font-medium text-sm font-futuristic uppercase tracking-wide">Menu</span>
                </div>
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="p-1.5 text-white/60 hover:text-orange-300 hover:bg-orange-500/5 rounded-lg transition-all duration-200
                    focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:ring-offset-2"
                  aria-label="Fermer le menu"
                >
                  <X size={16} />
                </button>
              </div>
              
              {/* Navigation Links identique au desktop */}
              <nav className="py-1">
                {(isGalleryPage ? galleryNavigationItems : homeNavigationItems).map((item, index) => (
                  <button
                    key={item.name}
                    onClick={() => {
                      if (isGalleryPage && item.id === 'hero' && onNavigateHome) {
                        onNavigateHome();
                        setTimeout(() => {
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }, 50);
                        setIsMenuOpen(false);
                      } else {
                        scrollToSection(item.id);
                      }
                    }}
                    className={`relative w-full px-4 py-3 text-left text-sm font-tech transition-all duration-300 ease-out group
                      hover:bg-orange-500/10 ${
                        activeSection === item.id 
                          ? 'text-orange-300 bg-orange-500/5 border-l-2 border-orange-400' 
                          : 'text-white/80 hover:text-orange-200'
                      }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                        activeSection === item.id 
                          ? 'bg-orange-400 scale-125' 
                          : 'bg-white/30 group-hover:bg-orange-300/70'
                      }`}></div>
                      <span className="font-medium">
                        {isGalleryPage && item.id === 'hero' ? '🏠 Retour à l\'accueil' : item.name}
                      </span>
                    </div>
                  </button>
                ))}
              </nav>
              
              {/* CTA identique au desktop */}
              <div className="p-4 border-t border-orange-500/10 bg-black/10">
                <button
                  onClick={() => {
                    onQuoteClick();
                    setIsMenuOpen(false);
                  }}
                  className="w-full flex items-center justify-center px-4 py-3 bg-gradient-to-r from-orange-500/90 to-orange-600/90 text-white font-medium 
                    rounded-lg transition-all duration-200 ease-out transform hover:scale-[1.02] active:scale-95
                    hover:shadow-lg hover:shadow-orange-500/20 focus:outline-none focus:ring-1 focus:ring-orange-500/30
                    font-tech uppercase tracking-wide text-sm backdrop-blur-sm"
                >
                  <span>Devis Express</span>
                </button>
              </div>
              
              {/* Effet lumineux en bas */}
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-orange-500/20 to-transparent"></div>
            </div>
          </>
        )}
      </header>
    </>
  );
};

export default Header;
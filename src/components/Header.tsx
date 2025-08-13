import React, { useState, useEffect } from 'react';
import { Menu, X, Phone, Wrench, MapPin, FileText, Home } from 'lucide-react';

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
          ? 'bg-gradient-to-r from-black/95 via-gray-900/95 to-black/95 backdrop-blur-md shadow-2xl border-b-2 border-orange-500/30' 
          : 'bg-gradient-to-r from-black/20 via-transparent to-black/20 backdrop-blur-sm'
      }`}
    >
      {/* Ligne de scan futuriste */}
      <div className={`absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-orange-500 to-transparent transition-opacity duration-500 ${isScrolled ? 'opacity-100' : 'opacity-0'}`}></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo - Style Solid State */}
          <div 
            className="flex items-center cursor-pointer group"
            onClick={() => scrollToSection('hero')}
          >
            <div className="w-32 h-14 bg-gradient-to-br from-white/95 to-gray-100/95 border-2 border-orange-500/30 rounded-xl flex items-center justify-center px-4 py-3 hover:bg-white hover:border-orange-500/60 hover:shadow-lg hover:shadow-orange-500/20 transition-all duration-300 group-hover:scale-105 relative overflow-hidden">
              {/* Effet de brillance au hover */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
              <img 
                src="/src/logo.png" 
                alt="Jack Up Garage" 
                className="max-h-10 w-auto object-contain relative z-10"
              />
            </div>
          </div>

          {/* Desktop Navigation - Menu Déroulant */}
          <div className="hidden md:flex items-center relative">
            <div className="relative">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="flex items-center px-8 py-4 bg-gradient-to-r from-orange-500/15 via-orange-600/10 to-orange-500/15 border-2 border-orange-500/40 rounded-xl text-white font-bold hover:text-orange-300 hover:bg-gradient-to-r hover:from-orange-500/25 hover:via-orange-600/20 hover:to-orange-500/25 hover:border-orange-400/60 hover:shadow-lg hover:shadow-orange-500/25 transition-all duration-300 font-tech uppercase tracking-wider text-base group relative overflow-hidden"
              >
                {/* Effet de scan */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-orange-400/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500"></div>
                <Wrench className="w-5 h-5 mr-3 relative z-10" />
                <span className="relative z-10">Menu</span>
                Menu
                <div className={`ml-3 transition-transform duration-300 relative z-10 ${isMenuOpen ? 'rotate-180' : ''}`}>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </button>
              
              {/* Menu Déroulant Desktop */}
              {isMenuOpen && (
                <div className="absolute right-0 top-full mt-3 w-72 bg-gradient-to-br from-black/98 via-gray-900/98 to-black/98 backdrop-blur-xl border-2 border-orange-500/40 rounded-2xl shadow-2xl shadow-black/50 overflow-hidden z-50 animate-fade-in">
                  {/* Header du menu */}
                  <div className="bg-gradient-to-r from-orange-500/20 to-orange-600/20 px-6 py-4 border-b border-orange-500/30">
                    <h3 className="text-orange-300 font-bold text-lg font-futuristic uppercase tracking-wider">Navigation</h3>
                  </div>
                  
                  <div className="py-3">
                    {[
                      { name: 'Accueil', id: 'hero', icon: Home, color: 'text-blue-400' },
                      { name: 'Services', id: 'services', icon: Wrench, color: 'text-green-400' },
                      { name: 'Zone d\'intervention', id: 'area', icon: MapPin, color: 'text-purple-400' },
                      { name: 'Contact', id: 'contact', icon: FileText, color: 'text-yellow-400' }
                    ].map((item) => (
                      <button
                        key={item.name}
                        onClick={() => scrollToSection(item.id)}
                        className="w-full flex items-center px-6 py-4 text-left text-white/90 hover:text-orange-300 hover:bg-gradient-to-r hover:from-orange-500/15 hover:to-transparent transition-all duration-300 font-tech text-base font-medium group relative overflow-hidden"
                      >
                        {/* Effet de scan au hover */}
                        <div className="absolute inset-0 bg-gradient-to-r from-orange-400/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500"></div>
                        <item.icon className={`w-5 h-5 mr-4 ${item.color} relative z-10`} />
                        <span className="relative z-10 uppercase tracking-wide">{item.name}</span>
                      </button>
                    ))}
                    
                    {/* Séparateur */}
                    <div className="mx-6 my-3 h-px bg-gradient-to-r from-transparent via-orange-500/30 to-transparent"></div>
                    
                    {/* Bouton d'appel */}
                    <div className="px-3">
                      <a
                        href="tel:+33123456789"
                        className="w-full flex items-center justify-center px-6 py-4 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 rounded-xl text-white font-bold transition-all duration-300 font-tech text-base uppercase tracking-wider shadow-lg hover:shadow-xl hover:shadow-orange-500/30 group relative overflow-hidden"
                      >
                        {/* Effet de brillance */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                        <Phone className="w-5 h-5 mr-3 relative z-10" />
                        <span className="relative z-10">Appeler Maintenant</span>
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
            className="md:hidden p-3 text-white bg-orange-500/20 border border-orange-500/40 rounded-lg hover:bg-orange-500/30 transition-all duration-300"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-gradient-to-br from-black/98 to-gray-900/98 backdrop-blur-xl border-t-2 border-orange-500/30 shadow-lg">
            <nav className="py-6 space-y-1">
              {[
                { name: 'Accueil', id: 'hero', icon: Home },
                { name: 'Services', id: 'services', icon: Wrench },
                { name: 'Zone', id: 'area', icon: MapPin },
                { name: 'Contact', id: 'contact', icon: FileText }
              ].map((item) => (
                <button
                  key={item.name}
                  onClick={() => scrollToSection(item.id)}
                  className="flex items-center w-full text-left px-6 py-4 text-white/90 hover:text-orange-300 hover:bg-orange-500/10 font-medium tracking-wide uppercase text-base font-tech transition-all duration-300 group"
                >
                  <item.icon className="w-5 h-5 mr-4 text-orange-400 group-hover:text-orange-300" />
                  <span>{item.name}</span>
                </button>
              ))}
              
              {/* Séparateur mobile */}
              <div className="mx-6 my-4 h-px bg-gradient-to-r from-transparent via-orange-500/30 to-transparent"></div>
              
              <a
                href="tel:+33123456789"
                className="flex items-center justify-center mx-6 mt-4 px-6 py-4 bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl text-white font-bold text-base font-tech uppercase tracking-wider shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <Phone className="w-5 h-5 mr-3" />
                Appeler Maintenant
              </a>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
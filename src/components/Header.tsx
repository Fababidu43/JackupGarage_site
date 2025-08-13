import React, { useState, useEffect } from 'react';
import { Menu, X, Phone } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);
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
    <header className="fixed top-0 inset-x-0 z-50 bg-brand-steel/80 backdrop-blur border-b border-brand-line">
      <div className="mx-auto max-w-7xl px-4 h-16 flex items-center justify-between">
        <button 
          onClick={() => scrollToSection('top')}
          className="flex items-center gap-2 font-display text-xl text-white hover-allowed hover:text-brand-orange2"
        >
          <img src="/src/logo.png" alt="JackUp Garage" className="h-8 w-8" />
          JackUp Garage
        </button>
        
        <nav className="hidden md:flex items-center gap-6">
          <button
            onClick={() => scrollToSection('services')}
            className="text-white/80 hover-allowed hover:text-white link-underline"
          >
            Prestations
          </button>
          <button
            onClick={() => scrollToSection('zones')}
            className="text-white/80 hover-allowed hover:text-white link-underline"
          >
            Zones
          </button>
          <button
            onClick={() => scrollToSection('contact')}
            className="text-white/80 hover-allowed hover:text-white link-underline"
          >
            Contact
          </button>
        </nav>
        
        <div className="flex items-center gap-4">
          <a 
            href="tel:+33123456789"
            className="inline-flex items-center gap-2 rounded-md px-3 py-2 bg-brand-orange text-black font-medium shadow-glow hover-allowed hover:bg-brand-orange2 focus-ring"
          >
            <Phone className="w-4 h-4" />
            Appeler
          </a>
          
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-white"
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>
      
      {/* Progress bar */}
      <div 
        className="h-[3px] bg-brand-amber transition-all duration-300"
        style={{ width: `${scrollProgress}%` }}
      />

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-brand-steel/95 backdrop-blur border-t border-brand-line">
          <nav className="py-4 space-y-2 px-4">
            {[
              { name: 'Prestations', id: 'services' },
              { name: 'Zones', id: 'zones' },
              { name: 'Contact', id: 'contact' }
            ].map((item) => (
              <button
                key={item.name}
                onClick={() => scrollToSection(item.id)}
                className="block w-full text-left py-2 text-white/80 hover-allowed hover:text-white"
              >
                {item.name}
              </button>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
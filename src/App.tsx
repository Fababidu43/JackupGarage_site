import React from 'react';
import { useEffect, useRef } from 'react';
import { Droplets, Zap, Settings, Car, ArrowRight } from 'lucide-react';
import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import FAQ from './components/FAQ';
import ServiceArea from './components/ServiceArea';
import Contact from './components/Contact';
import Footer from './components/Footer';
import MobileCTA from './components/MobileCTA';
import DiagonalSlash from './components/DiagonalSlash';
import DiagonalBackslash from './components/DiagonalBackslash';
import QuotePopup from './components/QuotePopup';

function App() {
  const [isQuotePopupOpen, setIsQuotePopupOpen] = React.useState(false);
  const scrollDirectionRef = useRef<'up' | 'down'>('down');
  const lastScrollYRef = useRef(0);

  useEffect(() => {
    // Système d'animation futuriste au scroll
    const handleFuturisticScroll = () => {
      const currentScrollY = window.pageYOffset;
      const scrollDirection = currentScrollY > lastScrollYRef.current ? 'down' : 'up';
      scrollDirectionRef.current = scrollDirection;
      lastScrollYRef.current = currentScrollY;

      // Sélectionner toutes les sections animées
      const animatedSections = document.querySelectorAll('.scroll-animate');
      
      animatedSections.forEach((section, index) => {
        const rect = section.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const sectionTop = rect.top;
        const sectionBottom = rect.bottom;
        
        // Calculer si la section est visible
        const isVisible = sectionTop < windowHeight * 0.8 && sectionBottom > windowHeight * 0.2;
        
        // Supprimer toutes les classes d'animation
        section.classList.remove(
          'slide-in-from-left', 'slide-in-from-right', 'slide-in-from-bottom', 'slide-in-from-top',
          'slide-out-to-left', 'slide-out-to-right', 'slide-out-to-bottom', 'slide-out-to-top',
          'visible'
        );
        
        if (isVisible) {
          // Section visible - animation d'entrée
          section.classList.add('visible');
          
          // Déterminer l'animation d'entrée selon l'index et la direction
          if (scrollDirection === 'down') {
            if (index % 4 === 0) section.classList.add('slide-in-from-left');
            else if (index % 4 === 1) section.classList.add('slide-in-from-right');
            else if (index % 4 === 2) section.classList.add('slide-in-from-bottom');
            else section.classList.add('slide-in-from-top');
          } else {
            // Scroll vers le haut - animations inversées
            if (index % 4 === 0) section.classList.add('slide-in-from-right');
            else if (index % 4 === 1) section.classList.add('slide-in-from-left');
            else if (index % 4 === 2) section.classList.add('slide-in-from-top');
            else section.classList.add('slide-in-from-bottom');
          }
        } else {
          // Section non visible - animation de sortie
          if (sectionTop > windowHeight) {
            // Section en dessous - sortie vers le bas
            if (index % 2 === 0) section.classList.add('slide-out-to-bottom');
            else section.classList.add('slide-out-to-right');
          } else {
            // Section au dessus - sortie vers le haut
            if (index % 2 === 0) section.classList.add('slide-out-to-top');
            else section.classList.add('slide-out-to-left');
          }
        }
      });
    };

    // Intersection Observer pour les animations au scroll
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
        }
      });
    }, observerOptions);

    // Observer tous les éléments avec les classes d'animation
    const elementsToAnimate = document.querySelectorAll('.reveal-on-scroll, .slide-in-left, .slide-in-right');
    elementsToAnimate.forEach((el) => observer.observe(el));

    // Ajouter les event listeners
    window.addEventListener('scroll', handleFuturisticScroll, { passive: true });
    handleFuturisticScroll(); // Initial call
    
    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleFuturisticScroll);
    };
  }, []);

  const openQuotePopup = () => {
    setIsQuotePopupOpen(true);
  };

  const closeQuotePopup = () => {
    setIsQuotePopupOpen(false);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header onQuoteClick={openQuotePopup} />
      <main className="flex-1">
        {/* Hero (orange #DE5121) */}
        <Hero onQuoteClick={openQuotePopup} />
        
        {/* Services intro (blanc #FFFFFF) */}
        <div className="relative">
          <div className="scroll-animate services-effect">
            <Services />
          </div>
        </div>
        
        {/* Service 1 - Entretiens (FOND NOIR) */}
        <div className="section relative py-8 sm:py-12 lg:py-16 scroll-animate diagonal-cut-top-backslash diagonal-cut-bottom-slash" style={{ background: 'linear-gradient(135deg, #0A0A0A 0%, #1A1A1A 100%)' }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-6 sm:py-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center min-h-[300px] sm:min-h-[400px]">
              <div>
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-lg flex items-center justify-center mb-4 sm:mb-6 pulse-subtle" style={{ background: '#FF6B35', color: 'white' }}>
                  <Droplets className="w-6 h-6 sm:w-7 sm:h-7" />
                </div>
                
                <h3 className="text-xl xs:text-2xl sm:text-3xl lg:text-4xl font-black mb-3 sm:mb-4 tracking-tight leading-tight uppercase text-white font-futuristic hover-glow-text">
                  Entretiens
                </h3>
                
                <p className="text-base sm:text-lg lg:text-xl leading-relaxed mb-4 sm:mb-6 font-light text-white/80 font-tech">
                  Vidanges, filtres, freins. Interventions propres et rapides, à domicile.
                </p>
                
                <button 
                  onClick={openQuotePopup}
                  className="inline-flex items-center font-semibold text-sm sm:text-base lg:text-lg group uppercase tracking-wide text-orange-400 hover:text-orange-300 font-tech transition-colors hover-lift underline-animate"
                >
                  Demander un devis
                  <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
              
              <div>
                <div className="aspect-square w-full max-w-sm mx-auto bg-gradient-to-br from-orange-500/20 to-orange-600/10 rounded-lg shadow-lg flex items-center justify-center border border-orange-500/20 hover-scale border-glow">
                  <img 
                    src="https://images.pexels.com/photos/3807277/pexels-photo-3807277.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop" 
                    alt="Vidange moteur - Entretien automobile" 
                    className="w-full h-full object-cover rounded-lg transition-transform duration-300" 
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Service 2 - Embrayage (FOND BLANC) */}
        <div className="section relative py-8 sm:py-12 lg:py-16 scroll-animate diagonal-cut-top-slash diagonal-cut-bottom-backslash bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-6 sm:py-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center min-h-[300px] sm:min-h-[400px]">
              <div className="lg:order-2">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-lg flex items-center justify-center text-white mb-4 sm:mb-6 pulse-subtle" style={{ background: '#FF6B35' }}>
                  <Zap className="w-6 h-6 sm:w-7 sm:h-7" />
                </div>
                
                <h3 className="text-xl xs:text-2xl sm:text-3xl lg:text-4xl font-black mb-3 sm:mb-4 tracking-tight leading-tight uppercase text-gray-900 font-futuristic hover-glow-text">
                  Embrayage & Volant Moteur
                </h3>
                
                <p className="text-base sm:text-lg lg:text-xl leading-relaxed mb-4 sm:mb-6 font-light text-gray-700 font-tech">
                  Remplacement complet avec essais. Déplacements étendus sur demande.
                </p>
                
                <button 
                  onClick={openQuotePopup}
                  className="inline-flex items-center font-semibold text-sm sm:text-base lg:text-lg group uppercase tracking-wide hover:opacity-80 font-tech transition-colors hover-lift underline-animate"
                  style={{ color: '#FF6B35' }}
                >
                  Demander un devis
                  <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
              
              <div className="lg:order-1">
                <div className="aspect-square w-full max-w-sm mx-auto rounded-lg shadow-lg flex items-center justify-center border border-orange-500/20 hover-scale border-glow" style={{ background: 'linear-gradient(135deg, #FF6B35, #FF8C42)' }}>
                  <img 
                    src="https://images.pexels.com/photos/13065690/pexels-photo-13065690.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop" 
                    alt="Kit embrayage et volant moteur" 
                    className="w-full h-full object-cover rounded-lg transition-transform duration-300" 
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Service 3 - Kit Distributions (FOND NOIR) */}
        <div className="section relative py-8 sm:py-12 lg:py-16 scroll-animate diagonal-cut-top-backslash diagonal-cut-bottom-slash" style={{ background: 'linear-gradient(135deg, #0A0A0A 0%, #1A1A1A 100%)' }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-6 sm:py-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center min-h-[300px] sm:min-h-[400px]">
              <div>
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-lg flex items-center justify-center mb-4 sm:mb-6 pulse-subtle" style={{ background: '#FF6B35', color: 'white' }}>
                  <Settings className="w-6 h-6 sm:w-7 sm:h-7" />
                </div>
                
                <h3 className="text-xl xs:text-2xl sm:text-3xl lg:text-4xl font-black mb-3 sm:mb-4 tracking-tight leading-tight uppercase text-white font-futuristic hover-glow-text">
                  Kit Distributions
                </h3>
                
                <p className="text-base sm:text-lg lg:text-xl leading-relaxed mb-4 sm:mb-6 font-light text-white/80 font-tech">
                  Courroie, galets, pompe à eau : remplacement conforme constructeur.
                </p>
                
                <button 
                  onClick={openQuotePopup}
                  className="inline-flex items-center font-semibold text-sm sm:text-base lg:text-lg group uppercase tracking-wide text-orange-400 hover:text-orange-300 font-tech transition-colors hover-lift underline-animate"
                >
                  Demander un devis
                  <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
              
              <div>
                <div className="aspect-square w-full max-w-sm mx-auto bg-gradient-to-br from-orange-500/20 to-orange-600/10 rounded-lg shadow-lg flex items-center justify-center border border-orange-500/20 hover-scale border-glow">
                  <img 
                    src="https://images.pexels.com/photos/5835359/pexels-photo-5835359.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop" 
                    alt="Kit de distribution - Courroie et galets" 
                    className="w-full h-full object-cover rounded-lg transition-transform duration-300" 
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Service 4 - Suspensions (FOND BLANC) */}
        <div className="section relative py-8 sm:py-12 lg:py-16 scroll-animate diagonal-cut-top-slash diagonal-cut-bottom-backslash bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-6 sm:py-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center min-h-[300px] sm:min-h-[400px]">
              <div className="lg:order-2">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-lg flex items-center justify-center text-white mb-4 sm:mb-6 pulse-subtle" style={{ background: '#FF6B35' }}>
                  <Car className="w-6 h-6 sm:w-7 sm:h-7" />
                </div>
                
                <h3 className="text-xl xs:text-2xl sm:text-3xl lg:text-4xl font-black mb-3 sm:mb-4 tracking-tight leading-tight uppercase text-gray-900 font-futuristic hover-glow-text">
                  Suspensions & Amortisseurs
                </h3>
                
                <p className="text-base sm:text-lg lg:text-xl leading-relaxed mb-4 sm:mb-6 font-light text-gray-700 font-tech">
                  Amortisseurs, rotules, silentblocs : direction sûre et stable.
                </p>
                
                <button 
                  onClick={openQuotePopup}
                  className="inline-flex items-center font-semibold text-sm sm:text-base lg:text-lg group uppercase tracking-wide hover:opacity-80 font-tech transition-colors hover-lift underline-animate"
                  style={{ color: '#FF6B35' }}
                >
                  Demander un devis
                  <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
              
              <div className="lg:order-1">
                <div className="aspect-square w-full max-w-sm mx-auto rounded-lg shadow-lg flex items-center justify-center border border-orange-500/20 hover-scale border-glow" style={{ background: 'linear-gradient(135deg, #FF6B35, #FF8C42)' }}>
                  <img 
                    src="https://images.pexels.com/photos/4489702/pexels-photo-4489702.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop" 
                    alt="Amortisseurs et suspensions automobile" 
                    className="w-full h-full object-cover rounded-lg transition-transform duration-300" 
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Zone d'intervention (FOND NOIR) */}
        <div className="scroll-animate">
          <ServiceArea onQuoteClick={openQuotePopup} />
        </div>
        
        {/* FAQ (FOND BLANC) */}
        <div className="scroll-animate">
          <FAQ />
        </div>
        
        {/* Contact (FOND NOIR) */}
        <div className="scroll-animate contact-effect">
          <Contact />
        </div>
      </main>
      <Footer />
      <MobileCTA onQuoteClick={openQuotePopup} />
      <QuotePopup isOpen={isQuotePopupOpen} onClose={closeQuotePopup} />
    </div>
  );
}

export default App;
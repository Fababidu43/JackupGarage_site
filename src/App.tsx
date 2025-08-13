import React from 'react';
import { useEffect } from 'react';
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
import ScrollCarAnimation from './components/ScrollCarAnimation';

function App() {
  const [isQuotePopupOpen, setIsQuotePopupOpen] = React.useState(false);

  useEffect(() => {
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

    return () => observer.disconnect();
  }, []);

  const openQuotePopup = () => {
    setIsQuotePopupOpen(true);
  };

  const closeQuotePopup = () => {
    setIsQuotePopupOpen(false);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <ScrollCarAnimation />
      <Header onQuoteClick={openQuotePopup} />
      <main className="flex-1">
        {/* Hero (orange #DE5121) */}
        <Hero onQuoteClick={openQuotePopup} />
        
        {/* Trait Hero - commence à côté gauche de RC PRO */}
        <div className="relative">
          <svg 
            className="absolute bottom-16 left-0 w-full h-32 pointer-events-none z-10"
            viewBox="0 0 100 32"
            preserveAspectRatio="none"
          >
            <path
              d="M 12 8 L 12 24 Q 12 28, 18 28 L 35 28"
              stroke="#FF6B35"
              strokeWidth="0.6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <circle cx="12" cy="8" r="1.5" fill="#FF6B35" opacity="0.8" />
            <circle cx="35" cy="28" r="1.2" fill="#FF8C42" opacity="0.7" />
          </svg>
        </div>
        
        {/* Hero → Services : diagonale "/" */}
        <DiagonalSlash topColor="#1A1A1A" bottomColor="#F8F9FA" type="section" />
        
        {/* Services intro (blanc #FFFFFF) */}
        <div className="relative">
          {/* Trait Services - évite le titre, va vers la droite */}
          <svg 
            className="absolute top-8 left-0 w-full h-20 pointer-events-none z-10"
            viewBox="0 0 100 20"
            preserveAspectRatio="none"
          >
            <path
              d="M 35 0 L 60 0 Q 75 0, 75 8 L 75 20"
              stroke="#FF6B35"
              strokeWidth="0.6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <circle cx="75" cy="20" r="1.2" fill="#FF6B35" opacity="0.8" />
          </svg>
          <Services />
        </div>
        
        {/* Services → Service 1 : diagonale "\" */}
        <DiagonalBackslash topColor="#F8F9FA" bottomColor="#0A0A0A" type="service" />
        
        {/* Service 1 - Orange #DE5121 */}
        <div className="section section--entretien py-4 sm:py-6 lg:py-8 tech-grid slide-in-left relative" style={{ background: '#0A0A0A' }}>
          {/* Trait Service 1 - évite le texte et l'image, descend au centre */}
          <svg 
            className="absolute top-0 left-0 w-full h-full pointer-events-none z-10"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            <path
              d="M 75 0 L 75 25 Q 75 35, 65 40 L 45 55 Q 40 60, 40 70 L 40 100"
              stroke="#FF6B35"
              strokeWidth="0.6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <circle cx="45" cy="55" r="1" fill="#FF6B35" opacity="0.8" />
            <circle cx="40" cy="100" r="1.2" fill="#FF8C42" opacity="0.7" />
          </svg>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center">
              <div>
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center mb-3 sm:mb-4 hover-scale pulse-subtle subtle-glow animated-border" style={{ background: '#FF6B35', color: 'white' }}>
                  <Droplets className="w-8 h-8 sm:w-10 sm:h-10" />
                </div>
                
                <h3 className="text-lg xs:text-xl sm:text-2xl lg:text-3xl font-black mb-2 sm:mb-3 tracking-tight leading-tight uppercase text-white font-futuristic hover-glow-text">
                  Entretiens
                </h3>
                
                <p className="text-sm sm:text-base leading-relaxed mb-3 sm:mb-4 font-light text-white/80 font-tech">
                  Vidanges, filtres, freins. Interventions propres et rapides, à domicile.
                </p>
                
                <button 
                  onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                  className="inline-flex items-center font-semibold text-sm sm:text-base group uppercase tracking-wide text-orange-400 hover:text-orange-300 underline-animate font-tech transition-colors hover-lift min-h-[44px]"
                >
                  Demander un devis
                  <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              </div>
              
              <div>
                <div className="aspect-square w-full max-w-xs mx-auto bg-gradient-to-br from-orange-500/20 to-orange-600/10 rounded-lg shadow-lg flex items-center justify-center border border-orange-500/20 hover-scale border-glow mt-4 lg:mt-0">
                  <img 
                    src="https://images.pexels.com/photos/3807277/pexels-photo-3807277.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop" 
                    alt="Vidange moteur - Entretien automobile" 
                    className="w-full h-full object-cover rounded-lg" 
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Service 1 → Service 2 : diagonale "/" */}
        <DiagonalSlash topColor="#0A0A0A" bottomColor="#F8F9FA" type="service" />
        
        {/* Service 2 - Blanc #FFFFFF */}
        <div className="section py-4 sm:py-6 lg:py-8 slide-in-right relative" style={{ background: '#F8F9FA' }}>
          {/* Trait Service 2 - évite l'image à gauche, va vers la droite */}
          <svg 
            className="absolute top-0 left-0 w-full h-full pointer-events-none z-10"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            <path
              d="M 40 0 L 40 20 Q 40 30, 50 35 L 70 50 Q 80 55, 80 65 L 80 100"
              stroke="#FF6B35"
              strokeWidth="0.6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <circle cx="70" cy="50" r="1" fill="#FF6B35" opacity="0.8" />
            <circle cx="80" cy="100" r="1.2" fill="#FF8C42" opacity="0.7" />
          </svg>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center">
              <div className="lg:order-2">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center text-white mb-3 sm:mb-4 hover-scale pulse-subtle subtle-glow animated-border" style={{ background: '#FF6B35' }}>
                  <Zap className="w-8 h-8 sm:w-10 sm:h-10" />
                </div>
                
                <h3 className="text-lg xs:text-xl sm:text-2xl lg:text-3xl font-black mb-2 sm:mb-3 tracking-tight leading-tight uppercase text-gray-900 font-futuristic hover-glow-text">
                  Embrayage & Volant Moteur
                </h3>
                
                <p className="text-sm sm:text-base leading-relaxed mb-3 sm:mb-4 font-light text-gray-700 font-tech">
                  Remplacement complet avec essais. Déplacements étendus sur demande.
                </p>
                
                <button 
                  onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                  className="inline-flex items-center font-semibold text-sm sm:text-base group uppercase tracking-wide hover:opacity-80 underline-animate font-tech transition-colors hover-lift min-h-[44px]"
                  style={{ color: '#FF6B35' }}
                >
                  Demander un devis
                  <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              </div>
              
              <div className="lg:order-1">
                <div className="aspect-square w-full max-w-xs mx-auto rounded-lg shadow-lg flex items-center justify-center border border-orange-500/20 hover-scale border-glow mt-4 lg:mt-0" style={{ background: 'linear-gradient(135deg, #FF6B35, #FF8C42)' }}>
                  <img 
                    src="https://images.pexels.com/photos/13065690/pexels-photo-13065690.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop" 
                    alt="Kit embrayage et volant moteur" 
                    className="w-full h-full object-cover rounded-lg" 
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Service 2 → Service 3 : diagonale "\" */}
        <DiagonalBackslash topColor="#F8F9FA" bottomColor="#0A0A0A" type="service" className="z-10" />
        
        {/* Service 3 - Orange #DE5121 */}
        <div className="section py-4 sm:py-6 lg:py-8 tech-grid slide-in-left relative z-20" style={{ background: '#0A0A0A' }}>
          {/* Trait Service 3 - évite le texte, descend vers la gauche */}
          <svg 
            className="absolute top-0 left-0 w-full h-full pointer-events-none z-10"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            <path
              d="M 80 0 L 80 25 Q 80 35, 70 40 L 25 65 Q 15 70, 15 80 L 15 100"
              stroke="#FF6B35"
              strokeWidth="0.6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <circle cx="25" cy="65" r="1" fill="#FF6B35" opacity="0.8" />
            <circle cx="15" cy="100" r="1.2" fill="#FF8C42" opacity="0.7" />
          </svg>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center">
              <div>
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center mb-3 sm:mb-4 hover-scale pulse-subtle subtle-glow animated-border" style={{ background: '#FF6B35', color: 'white' }}>
                  <Settings className="w-8 h-8 sm:w-10 sm:h-10" />
                </div>
                
                <h3 className="text-lg xs:text-xl sm:text-2xl lg:text-3xl font-black mb-2 sm:mb-3 tracking-tight leading-tight uppercase text-white font-futuristic hover-glow-text">
                  Kit Distributions
                </h3>
                
                <p className="text-sm sm:text-base leading-relaxed mb-3 sm:mb-4 font-light text-white/80 font-tech">
                  Courroie, galets, pompe à eau : remplacement conforme constructeur.
                </p>
                
                <button 
                  onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                  className="inline-flex items-center font-semibold text-sm sm:text-base group uppercase tracking-wide text-orange-400 hover:text-orange-300 underline-animate font-tech transition-colors hover-lift min-h-[44px]"
                >
                  Demander un devis
                  <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              </div>
              
              <div>
                <div className="aspect-square w-full max-w-xs mx-auto bg-gradient-to-br from-orange-500/20 to-orange-600/10 rounded-lg shadow-lg flex items-center justify-center border border-orange-500/20 hover-scale border-glow mt-4 lg:mt-0">
                  <img 
                    src="https://images.pexels.com/photos/5835359/pexels-photo-5835359.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop" 
                    alt="Kit de distribution - Courroie et galets" 
                    className="w-full h-full object-cover rounded-lg" 
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Service 3 → Service 4 : diagonale "/" */}
        <DiagonalSlash topColor="#0A0A0A" bottomColor="#F8F9FA" type="service" />
        
        {/* Service 4 - Clair #F6F6F6 */}
        <div className="section py-4 sm:py-6 lg:py-8 slide-in-right relative" style={{ background: '#F8F9FA' }}>
          {/* Trait Service 4 - évite l'image à droite, va vers le centre */}
          <svg 
            className="absolute top-0 left-0 w-full h-full pointer-events-none z-10"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            <path
              d="M 15 0 L 15 30 Q 15 40, 25 45 L 45 60 Q 50 65, 50 75 L 50 100"
              stroke="#FF6B35"
              strokeWidth="0.6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <circle cx="45" cy="60" r="1" fill="#FF6B35" opacity="0.8" />
            <circle cx="50" cy="100" r="1.2" fill="#FF8C42" opacity="0.7" />
          </svg>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center">
              <div className="lg:order-2">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center text-white mb-3 sm:mb-4 hover-scale pulse-subtle subtle-glow animated-border" style={{ background: '#FF6B35' }}>
                  <Car className="w-8 h-8 sm:w-10 sm:h-10" />
                </div>
                
                <h3 className="text-lg xs:text-xl sm:text-2xl lg:text-3xl font-black mb-2 sm:mb-3 tracking-tight leading-tight uppercase text-gray-900 font-futuristic hover-glow-text">
                  Suspensions & Amortisseurs
                </h3>
                
                <p className="text-sm sm:text-base leading-relaxed mb-3 sm:mb-4 font-light text-gray-700 font-tech">
                  Amortisseurs, rotules, silentblocs : direction sûre et stable.
                </p>
                
                <button 
                  onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                  className="inline-flex items-center font-semibold text-sm sm:text-base group uppercase tracking-wide hover:opacity-80 underline-animate font-tech transition-colors hover-lift min-h-[44px]"
                  style={{ color: '#FF6B35' }}
                >
                  Demander un devis
                  <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              </div>
              
              <div className="lg:order-1">
                <div className="aspect-square w-full max-w-xs mx-auto rounded-lg shadow-lg flex items-center justify-center border border-orange-500/20 hover-scale border-glow mt-4 lg:mt-0" style={{ background: 'linear-gradient(135deg, #FF6B35, #FF8C42)' }}>
                  <img 
                    src="https://images.pexels.com/photos/4489702/pexels-photo-4489702.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop" 
                    alt="Amortisseurs et suspensions automobile" 
                    className="w-full h-full object-cover rounded-lg" 
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Service 4 → Zone d'intervention : diagonale "\" */}
        <DiagonalBackslash topColor="#F8F9FA" bottomColor="#0A0A0A" type="section" />
        
        {/* Zone d'intervention (gradient #DE5121 → #C9471D) */}
        <div className="relative">
          {/* Trait Zone - évite les blocs de communes, reste à gauche */}
          <svg 
            className="absolute top-0 left-0 w-full h-full pointer-events-none z-10"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            <path
              d="M 50 0 L 50 20 Q 50 30, 40 35 L 12 50 Q 8 55, 8 65 L 8 100"
              stroke="#FF6B35"
              strokeWidth="0.6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <circle cx="12" cy="50" r="1" fill="#FF6B35" opacity="0.8" />
            <circle cx="8" cy="100" r="1.2" fill="#FF8C42" opacity="0.7" />
          </svg>
          <ServiceArea />
        </div>
        
        {/* Zone → FAQ : diagonale "/" */}
        <DiagonalSlash topColor="#1A1A1A" bottomColor="#F8F9FA" type="section" />
        
        {/* FAQ (clair #F6F6F6) */}
        <div className="relative">
          {/* Trait FAQ - évite les questions, reste à gauche */}
          <svg 
            className="absolute top-0 left-0 w-full h-full pointer-events-none z-10"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            <path
              d="M 8 0 L 8 80 Q 8 90, 15 95 L 25 100"
              stroke="#FF6B35"
              strokeWidth="0.6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <circle cx="8" cy="40" r="1" fill="#FF6B35" opacity="0.8" />
            <circle cx="25" cy="100" r="1.2" fill="#FF8C42" opacity="0.7" />
          </svg>
          <FAQ />
        </div>
        
        {/* FAQ → Contact : diagonale "\" pour créer une belle transition */}
        <DiagonalBackslash topColor="#F8F9FA" bottomColor="#0A0A0A" type="section" />
        
        {/* Contact (noir #0A0A0A) */}
        <div className="relative">
          {/* Trait Contact - évite le formulaire, termine à droite */}
          <svg 
            className="absolute top-0 left-0 w-full h-full pointer-events-none z-10"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            <path
              d="M 25 0 L 25 30 Q 25 40, 35 45 L 75 70 Q 85 75, 85 85 L 85 100"
              stroke="#FF6B35"
              strokeWidth="0.6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <circle cx="75" cy="70" r="1" fill="#FF6B35" opacity="0.8" />
            <circle cx="85" cy="100" r="1.5" fill="#FF8C42" opacity="0.9" />
          </svg>
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
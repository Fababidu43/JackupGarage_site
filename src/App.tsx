import React from 'react';
import { useEffect } from 'react';
import { Droplets, Zap, Settings, Car, ArrowRight } from 'lucide-react';
import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import ServiceArea from './components/ServiceArea';
import Contact from './components/Contact';
import Footer from './components/Footer';
import MobileCTA from './components/MobileCTA';
import DiagonalSlash from './components/DiagonalSlash';
import DiagonalBackslash from './components/DiagonalBackslash';

function App() {
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

  return (
    <div className="min-h-screen pb-16 md:pb-0">
      <Header />
      <main>
        {/* Hero (orange #DE5121) */}
        <Hero />
        
        {/* Hero → Services : diagonale "/" */}
        <DiagonalSlash topColor="#1A1A1A" bottomColor="#F8F9FA" type="section" />
        
        {/* Services intro (blanc #FFFFFF) */}
        <div className="reveal-on-scroll">
          <Services />
        </div>
        
        {/* Services → Service 1 : diagonale "\" */}
        <DiagonalBackslash topColor="#F8F9FA" bottomColor="#0A0A0A" type="service" />
        
        {/* Service 1 - Orange #DE5121 */}
        <div className="section section--entretien py-8 lg:py-12 tech-grid mesh-parallax" style={{ background: '#0A0A0A' }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              <div>
                <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-4 hover-scale pulse-subtle subtle-glow animated-border" style={{ background: '#FF6B35', color: 'white' }}>
                  <Droplets className="w-10 h-10" />
                </div>
                
                <h3 className="text-xl sm:text-2xl lg:text-3xl font-black mb-3 tracking-tight leading-tight uppercase text-white font-futuristic title-underline">
                  Entretiens
                </h3>
                
                <p className="text-sm sm:text-base leading-relaxed mb-4 font-light text-white/80 font-tech fade-rise">
                  Vidanges, filtres, freins. Interventions propres et rapides, à domicile.
                </p>
                
                <button 
                  onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                  className="inline-flex items-center font-semibold text-base group uppercase tracking-wide text-orange-400 hover:text-orange-300 link-underline font-tech soft-glow accessible-focus fade-rise"
                >
                  Demander un devis
                  <ArrowRight className="ml-2 w-4 h-4" />
                </button>
              </div>
              
              <div>
                <div className="aspect-square w-full max-w-xs mx-auto bg-gradient-to-br from-orange-500/20 to-orange-600/10 rounded-lg shadow-lg flex items-center justify-center border border-orange-500/20 image-slide-in">
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
        <div className="section py-8 lg:py-12 mesh-parallax" style={{ background: '#F8F9FA' }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              <div className="lg:order-2">
                <div className="w-12 h-12 rounded-lg flex items-center justify-center text-white mb-4 hover-scale pulse-subtle subtle-glow animated-border" style={{ background: '#FF6B35' }}>
                  <Zap className="w-10 h-10" />
                </div>
                
                <h3 className="text-xl sm:text-2xl lg:text-3xl font-black mb-3 tracking-tight leading-tight uppercase text-gray-900 font-futuristic title-underline">
                  Embrayage & Volant Moteur
                </h3>
                
                <p className="text-sm sm:text-base leading-relaxed mb-4 font-light text-gray-700 font-tech fade-rise">
                  Remplacement complet avec essais. Déplacements étendus sur demande.
                </p>
                
                <button 
                  onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                  className="inline-flex items-center font-semibold text-base group uppercase tracking-wide link-underline font-tech soft-glow accessible-focus fade-rise"
                  style={{ color: '#FF6B35' }}
                >
                  Demander un devis
                  <ArrowRight className="ml-2 w-4 h-4" />
                </button>
              </div>
              
              <div className="lg:order-1">
                <div className="aspect-square w-full max-w-xs mx-auto rounded-lg shadow-lg flex items-center justify-center border border-orange-500/20 image-slide-in" style={{ background: 'linear-gradient(135deg, #FF6B35, #FF8C42)' }}>
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
        <DiagonalBackslash topColor="#F8F9FA" bottomColor="#0A0A0A" type="service" />
        
        {/* Service 3 - Orange #DE5121 */}
        <div className="section py-8 lg:py-12 tech-grid mesh-parallax" style={{ background: '#0A0A0A' }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              <div>
                <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-4 hover-scale pulse-subtle subtle-glow animated-border" style={{ background: '#FF6B35', color: 'white' }}>
                  <Settings className="w-10 h-10" />
                </div>
                
                <h3 className="text-xl sm:text-2xl lg:text-3xl font-black mb-3 tracking-tight leading-tight uppercase text-white font-futuristic title-underline">
                  Kit Distributions
                </h3>
                
                <p className="text-sm sm:text-base leading-relaxed mb-4 font-light text-white/80 font-tech fade-rise">
                  Courroie, galets, pompe à eau : remplacement conforme constructeur.
                </p>
                
                <button 
                  onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                  className="inline-flex items-center font-semibold text-base group uppercase tracking-wide text-orange-400 hover:text-orange-300 link-underline font-tech soft-glow accessible-focus fade-rise"
                >
                  Demander un devis
                  <ArrowRight className="ml-2 w-4 h-4" />
                </button>
              </div>
              
              <div>
                <div className="aspect-square w-full max-w-xs mx-auto bg-gradient-to-br from-orange-500/20 to-orange-600/10 rounded-lg shadow-lg flex items-center justify-center border border-orange-500/20 image-slide-in">
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
        <div className="section py-8 lg:py-12 mesh-parallax" style={{ background: '#F8F9FA' }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              <div className="lg:order-2">
                <div className="w-12 h-12 rounded-lg flex items-center justify-center text-white mb-4 hover-scale pulse-subtle subtle-glow animated-border" style={{ background: '#FF6B35' }}>
                  <Car className="w-10 h-10" />
                </div>
                
                <h3 className="text-xl sm:text-2xl lg:text-3xl font-black mb-3 tracking-tight leading-tight uppercase text-gray-900 font-futuristic title-underline">
                  Suspensions & Amortisseurs
                </h3>
                
                <p className="text-sm sm:text-base leading-relaxed mb-4 font-light text-gray-700 font-tech fade-rise">
                  Amortisseurs, rotules, silentblocs : direction sûre et stable.
                </p>
                
                <button 
                  onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                  className="inline-flex items-center font-semibold text-base group uppercase tracking-wide link-underline font-tech soft-glow accessible-focus fade-rise"
                  style={{ color: '#FF6B35' }}
                >
                  Demander un devis
                  <ArrowRight className="ml-2 w-4 h-4" />
                </button>
              </div>
              
              <div className="lg:order-1">
                <div className="aspect-square w-full max-w-xs mx-auto rounded-lg shadow-lg flex items-center justify-center border border-orange-500/20 image-slide-in" style={{ background: 'linear-gradient(135deg, #FF6B35, #FF8C42)' }}>
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
        <div className="reveal-on-scroll">
          <ServiceArea />
        </div>
        
        {/* Zone → Contact : diagonale "/" */}
        <DiagonalSlash topColor="#1A1A1A" bottomColor="#F8F9FA" type="section" />
        
        {/* Contact (clair #F6F6F6) */}
        <div className="reveal-on-scroll">
          <Contact />
        </div>
      </main>
      <Footer />
      <MobileCTA />
    </div>
  );
}

export default App;
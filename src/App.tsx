import React from 'react';
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
  return (
    <div className="min-h-screen pb-16 md:pb-0">
      <Header />
      <main>
        {/* Hero (orange #DE5121) */}
        <Hero />
        
        {/* Services intro (blanc #FFFFFF) */}
        <Services />
        
        {/* Services → Service 1 : diagonale "\" */}
        <DiagonalBackslash topColor="#FFFFFF" bottomColor="#DE5121" type="service" />
        
        {/* Service 1 - Orange #DE5121 */}
        <div className="section section--entretien py-8 lg:py-12" style={{ background: '#DE5121' }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              <div>
                <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center mb-4" style={{ color: '#DE5121' }}>
                  <Droplets className="w-10 h-10" />
                </div>
                
                <h3 className="text-xl sm:text-2xl lg:text-3xl font-black mb-3 tracking-tight leading-tight uppercase text-white">
                  Entretiens
                </h3>
                
                <p className="text-sm sm:text-base leading-relaxed mb-4 font-light text-white/90">
                  Vidange moteur, remplacement des filtres à huile et à air, contrôle des niveaux pour maintenir votre véhicule en parfait état.
                </p>
                
                <button 
                  onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                  className="inline-flex items-center font-semibold text-base group uppercase tracking-wide text-white hover:text-white/80"
                >
                  Demander un devis
                  <ArrowRight className="ml-2 w-4 h-4" />
                </button>
              </div>
              
              <div>
                <div className="aspect-square w-full max-w-xs mx-auto bg-gradient-to-br from-white/20 to-white/10 rounded-lg shadow-lg flex items-center justify-center">
                  <div className="text-white text-4xl opacity-60">
                    <Droplets className="w-16 h-16" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Service 1 → Service 2 : diagonale "/" */}
        <DiagonalSlash topColor="#DE5121" bottomColor="#FFFFFF" type="service" />
        
        {/* Service 2 - Blanc #FFFFFF */}
        <div className="section py-8 lg:py-12" style={{ background: '#FFFFFF' }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              <div className="lg:order-2">
                <div className="w-12 h-12 rounded-lg flex items-center justify-center text-white mb-4" style={{ background: '#DE5121' }}>
                  <Zap className="w-10 h-10" />
                </div>
                
                <h3 className="text-xl sm:text-2xl lg:text-3xl font-black mb-3 tracking-tight leading-tight uppercase text-gray-900">
                  Embrayage & Volant Moteur
                </h3>
                
                <p className="text-sm sm:text-base leading-relaxed mb-4 font-light text-gray-600">
                  Remplacement complet de l'embrayage et du volant moteur avec diagnostic précis. Intervention professionnelle pour retrouver une conduite fluide.
                </p>
                
                <button 
                  onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                  className="inline-flex items-center font-semibold text-base group uppercase tracking-wide hover:opacity-80"
                  style={{ color: '#DE5121' }}
                >
                  Demander un devis
                  <ArrowRight className="ml-2 w-4 h-4" />
                </button>
              </div>
              
              <div className="lg:order-1">
                <div className="aspect-square w-full max-w-xs mx-auto rounded-lg shadow-lg flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #DE5121, #C9471D)' }}>
                  <div className="text-white text-4xl opacity-20">
                    <Zap className="w-16 h-16" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Service 2 → Service 3 : diagonale "\" */}
        <DiagonalBackslash topColor="#FFFFFF" bottomColor="#DE5121" type="service" />
        
        {/* Service 3 - Orange #DE5121 */}
        <div className="section py-8 lg:py-12" style={{ background: '#DE5121' }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              <div>
                <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center mb-4" style={{ color: '#DE5121' }}>
                  <Settings className="w-10 h-10" />
                </div>
                
                <h3 className="text-xl sm:text-2xl lg:text-3xl font-black mb-3 tracking-tight leading-tight uppercase text-white">
                  Kit Distributions
                </h3>
                
                <p className="text-sm sm:text-base leading-relaxed mb-4 font-light text-white/90">
                  Remplacement des kits de distribution, courroies, galets tendeurs et pompe à eau. Service essentiel pour la longévité de votre moteur.
                </p>
                
                <button 
                  onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                  className="inline-flex items-center font-semibold text-base group uppercase tracking-wide text-white hover:text-white/80"
                >
                  Demander un devis
                  <ArrowRight className="ml-2 w-4 h-4" />
                </button>
              </div>
              
              <div>
                <div className="aspect-square w-full max-w-xs mx-auto bg-gradient-to-br from-white/20 to-white/10 rounded-lg shadow-lg flex items-center justify-center">
                  <div className="text-white text-4xl opacity-60">
                    <Settings className="w-16 h-16" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Service 3 → Service 4 : diagonale "/" */}
        <DiagonalSlash topColor="#DE5121" bottomColor="#F6F6F6" type="service" />
        
        {/* Service 4 - Clair #F6F6F6 */}
        <div className="section py-8 lg:py-12" style={{ background: '#F6F6F6' }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              <div className="lg:order-2">
                <div className="w-12 h-12 rounded-lg flex items-center justify-center text-white mb-4" style={{ background: '#DE5121' }}>
                  <Car className="w-10 h-10" />
                </div>
                
                <h3 className="text-xl sm:text-2xl lg:text-3xl font-black mb-3 tracking-tight leading-tight uppercase text-gray-900">
                  Suspensions & Amortisseurs
                </h3>
                
                <p className="text-sm sm:text-base leading-relaxed mb-4 font-light text-gray-600">
                  Remplacement des amortisseurs, suspensions, rotules et silent-blocs pour un confort de conduite optimal et une sécurité renforcée.
                </p>
                
                <button 
                  onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                  className="inline-flex items-center font-semibold text-base group uppercase tracking-wide hover:opacity-80"
                  style={{ color: '#DE5121' }}
                >
                  Demander un devis
                  <ArrowRight className="ml-2 w-4 h-4" />
                </button>
              </div>
              
              <div className="lg:order-1">
                <div className="aspect-square w-full max-w-xs mx-auto rounded-lg shadow-lg flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #DE5121, #C9471D)' }}>
                  <div className="text-white text-4xl opacity-20">
                    <Car className="w-16 h-16" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Service 4 → Zone d'intervention : diagonale "\" */}
        <DiagonalBackslash topColor="#F6F6F6" bottomColor="#DE5121" type="section" />
        
        {/* Zone d'intervention (gradient #DE5121 → #C9471D) */}
        <ServiceArea />
        
        {/* Zone → Contact : diagonale "/" */}
        <DiagonalSlash topColor="#C9471D" bottomColor="#F6F6F6" type="section" />
        
        {/* Contact (clair #F6F6F6) */}
        <Contact />
      </main>
      <Footer />
      <MobileCTA />
    </div>
  );
}

export default App;
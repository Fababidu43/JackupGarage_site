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
import ScrollReveal from './components/ScrollReveal';

function App() {
  return (
    <div className="min-h-screen pb-16 md:pb-0">
      <Header />
      <main>
        {/* Hero (orange #DE5121) */}
        <Hero />
        
        {/* Hero → Services : diagonale "/" */}
        <ScrollReveal direction="slide-diagonal" duration={1.2} delay={200}>
          <DiagonalSlash topColor="#1A1A1A" bottomColor="#F8F9FA" type="section" />
        </ScrollReveal>
        
        {/* Services intro (blanc #FFFFFF) */}
        <ScrollReveal direction="bounce" duration={1.0} delay={300}>
          <Services />
        </ScrollReveal>
        
        {/* Services → Service 1 : diagonale "\" */}
        <ScrollReveal direction="rotate" duration={1.0} delay={100}>
          <DiagonalBackslash topColor="#F8F9FA" bottomColor="#0A0A0A" type="service" />
        </ScrollReveal>
        
        {/* Service 1 - Orange #DE5121 */}
        <ScrollReveal direction="slide-diagonal" duration={1.2} delay={200} distance={120}>
          <div className="section section--entretien py-8 lg:py-12 tech-grid" style={{ background: '#0A0A0A' }}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                <ScrollReveal direction="elastic" duration={1.0} delay={400}>
                  <div>
                    <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-4 hover-scale pulse-subtle" style={{ background: '#FF6B35', color: 'white' }}>
                      <Droplets className="w-10 h-10" />
                    </div>
                    
                    <h3 className="text-xl sm:text-2xl lg:text-3xl font-black mb-3 tracking-tight leading-tight uppercase text-white font-futuristic hover-glow-text">
                      Entretiens
                    </h3>
                    
                    <p className="text-sm sm:text-base leading-relaxed mb-4 font-light text-white/80 font-tech">
                      Vidanges, filtres, freins. Interventions propres et rapides, à domicile.
                    </p>
                    
                    <button 
                      onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                      className="inline-flex items-center font-semibold text-base group uppercase tracking-wide text-orange-400 hover:text-orange-300 underline-animate font-tech transition-colors hover-lift"
                    >
                      Demander un devis
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </button>
                  </div>
                </ScrollReveal>
                
                <ScrollReveal direction="right" duration={0.8} delay={300}>
                  <div>
                    <div className="aspect-square w-full max-w-xs mx-auto bg-gradient-to-br from-orange-500/20 to-orange-600/10 rounded-lg shadow-lg flex items-center justify-center border border-orange-500/20 hover-scale border-glow">
                      <img 
                        src="https://images.pexels.com/photos/3807277/pexels-photo-3807277.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop" 
                        alt="Vidange moteur - Entretien automobile" 
                        className="w-full h-full object-cover rounded-lg" 
                      />
                    </div>
                  </div>
                </ScrollReveal>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Service 1 → Service 2 : diagonale "/" */}
        <ScrollReveal direction="rotate" duration={1.0} delay={100}>
          <DiagonalSlash topColor="#0A0A0A" bottomColor="#F8F9FA" type="service" />
        </ScrollReveal>
        
        {/* Service 2 - Blanc #FFFFFF */}
        <ScrollReveal direction="bounce" duration={1.3} delay={200} distance={100}>
          <div className="section py-8 lg:py-12" style={{ background: '#F8F9FA' }}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                <ScrollReveal direction="elastic" duration={1.0} delay={400} className="lg:order-2">
                  <div>
                    <div className="w-12 h-12 rounded-lg flex items-center justify-center text-white mb-4 hover-scale pulse-subtle" style={{ background: '#FF6B35' }}>
                      <Zap className="w-10 h-10" />
                    </div>
                    
                    <h3 className="text-xl sm:text-2xl lg:text-3xl font-black mb-3 tracking-tight leading-tight uppercase text-gray-900 font-futuristic hover-glow-text">
                      Embrayage & Volant Moteur
                    </h3>
                    
                    <p className="text-sm sm:text-base leading-relaxed mb-4 font-light text-gray-700 font-tech">
                      Remplacement complet avec essais. Déplacements étendus sur demande.
                    </p>
                    
                    <button 
                      onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                      className="inline-flex items-center font-semibold text-base group uppercase tracking-wide hover:opacity-80 underline-animate font-tech transition-colors hover-lift"
                      style={{ color: '#FF6B35' }}
                    >
                      Demander un devis
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </button>
                  </div>
                </ScrollReveal>
                
                <ScrollReveal direction="left" duration={0.8} delay={300} className="lg:order-1">
                  <div>
                    <div className="aspect-square w-full max-w-xs mx-auto rounded-lg shadow-lg flex items-center justify-center border border-orange-500/20 hover-scale border-glow" style={{ background: 'linear-gradient(135deg, #FF6B35, #FF8C42)' }}>
                      <img 
                        src="https://images.pexels.com/photos/13065690/pexels-photo-13065690.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop" 
                        alt="Kit embrayage et volant moteur" 
                        className="w-full h-full object-cover rounded-lg" 
                      />
                    </div>
                  </div>
                </ScrollReveal>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Service 2 → Service 3 : diagonale "\" */}
        <ScrollReveal direction="slide-diagonal" duration={1.2} delay={100}>
          <DiagonalBackslash topColor="#F8F9FA" bottomColor="#0A0A0A" type="service" />
        </ScrollReveal>
        
        {/* Service 3 - Orange #DE5121 */}
        <ScrollReveal direction="elastic" duration={1.4} delay={200} distance={140}>
          <div className="section py-8 lg:py-12 tech-grid" style={{ background: '#0A0A0A' }}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                <ScrollReveal direction="bounce" duration={1.0} delay={400}>
                  <div>
                    <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-4 hover-scale pulse-subtle" style={{ background: '#FF6B35', color: 'white' }}>
                      <Settings className="w-10 h-10" />
                    </div>
                    
                    <h3 className="text-xl sm:text-2xl lg:text-3xl font-black mb-3 tracking-tight leading-tight uppercase text-white font-futuristic hover-glow-text">
                      Kit Distributions
                    </h3>
                    
                    <p className="text-sm sm:text-base leading-relaxed mb-4 font-light text-white/80 font-tech">
                      Courroie, galets, pompe à eau : remplacement conforme constructeur.
                    </p>
                    
                    <button 
                      onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                      className="inline-flex items-center font-semibold text-base group uppercase tracking-wide text-orange-400 hover:text-orange-300 underline-animate font-tech transition-colors hover-lift"
                    >
                      Demander un devis
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </button>
                  </div>
                </ScrollReveal>
                
                <ScrollReveal direction="right" duration={0.8} delay={300}>
                  <div>
                    <div className="aspect-square w-full max-w-xs mx-auto bg-gradient-to-br from-orange-500/20 to-orange-600/10 rounded-lg shadow-lg flex items-center justify-center border border-orange-500/20 hover-scale border-glow">
                      <img 
                        src="https://images.pexels.com/photos/5835359/pexels-photo-5835359.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop" 
                        alt="Kit de distribution - Courroie et galets" 
                        className="w-full h-full object-cover rounded-lg" 
                      />
                    </div>
                  </div>
                </ScrollReveal>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Service 3 → Service 4 : diagonale "/" */}
        <ScrollReveal direction="bounce" duration={1.1} delay={100}>
          <DiagonalSlash topColor="#0A0A0A" bottomColor="#F8F9FA" type="service" />
        </ScrollReveal>
        
        {/* Service 4 - Clair #F6F6F6 */}
        <ScrollReveal direction="slide-diagonal" duration={1.3} delay={200} distance={110}>
          <div className="section py-8 lg:py-12" style={{ background: '#F8F9FA' }}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                <ScrollReveal direction="elastic" duration={1.0} delay={400} className="lg:order-2">
                  <div>
                    <div className="w-12 h-12 rounded-lg flex items-center justify-center text-white mb-4 hover-scale pulse-subtle" style={{ background: '#FF6B35' }}>
                      <Car className="w-10 h-10" />
                    </div>
                    
                    <h3 className="text-xl sm:text-2xl lg:text-3xl font-black mb-3 tracking-tight leading-tight uppercase text-gray-900 font-futuristic hover-glow-text">
                      Suspensions & Amortisseurs
                    </h3>
                    
                    <p className="text-sm sm:text-base leading-relaxed mb-4 font-light text-gray-700 font-tech">
                      Amortisseurs, rotules, silentblocs : direction sûre et stable.
                    </p>
                    
                    <button 
                      onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                      className="inline-flex items-center font-semibold text-base group uppercase tracking-wide hover:opacity-80 underline-animate font-tech transition-colors hover-lift"
                      style={{ color: '#FF6B35' }}
                    >
                      Demander un devis
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </button>
                  </div>
                </ScrollReveal>
                
                <ScrollReveal direction="left" duration={0.8} delay={300} className="lg:order-1">
                  <div>
                    <div className="aspect-square w-full max-w-xs mx-auto rounded-lg shadow-lg flex items-center justify-center border border-orange-500/20 hover-scale border-glow" style={{ background: 'linear-gradient(135deg, #FF6B35, #FF8C42)' }}>
                      <img 
                        src="https://images.pexels.com/photos/3807277/pexels-photo-3807277.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop" 
                        alt="Amortisseurs et suspensions automobile" 
                        className="w-full h-full object-cover rounded-lg" 
                      />
                    </div>
                  </div>
                </ScrollReveal>
              </div>
            </div>
          </div>
        </ScrollReveal>
        
        {/* Service 4 → Zone d'intervention : diagonale "\" */}
        <ScrollReveal direction="elastic" duration={1.3} delay={100}>
          <DiagonalBackslash topColor="#F8F9FA" bottomColor="#0A0A0A" type="section" />
        </ScrollReveal>
        
        {/* Zone d'intervention (gradient #DE5121 → #C9471D) */}
        <ScrollReveal direction="bounce" duration={1.5} delay={200} distance={150}>
          <ServiceArea />
        </ScrollReveal>
        
        {/* Zone → Contact : diagonale "/" */}
        <ScrollReveal direction="slide-diagonal" duration={1.2} delay={100}>
          <DiagonalSlash topColor="#1A1A1A" bottomColor="#F8F9FA" type="section" />
        </ScrollReveal>
        
        {/* Contact (clair #F6F6F6) */}
        <ScrollReveal direction="elastic" duration={1.4} delay={200} distance={120}>
          <Contact />
        </ScrollReveal>
      </main>
      <Footer />
      <MobileCTA />
    </div>
  );
}

export default App;
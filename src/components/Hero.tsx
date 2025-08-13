import React from 'react';
import { ArrowRight, Phone, Shield, Clock, FileText, Zap } from 'lucide-react';

const Hero = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      id="hero"
      className="section relative min-h-screen flex items-center justify-center overflow-hidden particles-bg"
      style={{ background: 'linear-gradient(135deg, #000000 0%, #1a1a1a 50%, #FF6B35 100%)' }}
    >
      {/* Éléments décoratifs flottants */}
      <div className="absolute top-20 left-10 w-4 h-4 bg-orange-500 rounded-full animate-float opacity-60"></div>
      <div className="absolute top-40 right-20 w-2 h-2 bg-white rounded-full animate-pulse-custom"></div>
      <div className="absolute bottom-40 left-20 w-3 h-3 bg-orange-400 rounded-full animate-float" style={{ animationDelay: '1s' }}></div>
      <div className="absolute bottom-20 right-10 w-1 h-1 bg-white rounded-full animate-pulse-custom" style={{ animationDelay: '2s' }}></div>
      
      {/* Cercles décoratifs */}
      <div className="absolute top-1/4 left-1/4 w-32 h-32 border border-orange-500/20 rounded-full animate-rotate"></div>
      <div className="absolute bottom-1/4 right-1/4 w-24 h-24 border border-white/10 rounded-full animate-rotate" style={{ animationDirection: 'reverse' }}></div>

      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto pt-16">
        <div className="animate-fade-up">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white mb-4 leading-none tracking-tight uppercase hover-glow">
            Jack Up Garage
          </h1>
        </div>
        
        <div className="animate-fade-up" style={{ animationDelay: '0.2s' }}>
          <p className="text-xl sm:text-2xl md:text-3xl text-orange-400 font-light mb-8 tracking-wide uppercase animate-neon-glow">
            Mécanicien à domicile
          </p>
        </div>

        <div className="animate-fade-up" style={{ animationDelay: '0.4s' }}>
          <p className="text-base sm:text-lg text-gray-300 max-w-2xl mx-auto mb-8 leading-relaxed font-light">
            Service professionnel de mécanique automobile à domicile dans la Haute-Loire (43) et la Loire (42). 
            Intervention sur sol dur et plat uniquement.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12 animate-scale-in" style={{ animationDelay: '0.6s' }}>
          <button
            onClick={() => scrollToSection('contact')}
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold text-lg hover-neon shadow-lg rounded group animate-border-glow border-2 border-orange-500"
          >
            Demander un devis
            <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
          <a
            href="tel:+33123456789"
            className="inline-flex items-center px-8 py-4 bg-transparent border-2 border-white text-white font-bold text-lg hover:bg-white hover:text-black rounded hover-scale transition-all duration-300"
          >
            <Phone className="mr-3 w-5 h-5" />
            Appeler
          </a>
        </div>

        {/* Barre de preuves futuriste */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 text-gray-300 animate-slide-left" style={{ animationDelay: '0.8s' }}>
          <div className="flex items-center hover-scale">
            <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center mr-2 animate-pulse-custom">
              <Shield className="w-4 h-4 text-white" />
            </div>
            <span className="font-medium tracking-wide text-sm uppercase">RC Pro</span>
          </div>
          <div className="hidden sm:block w-2 h-2 bg-orange-500 rounded-full animate-pulse-custom"></div>
          <div className="flex items-center hover-scale">
            <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center mr-2 animate-pulse-custom" style={{ animationDelay: '0.5s' }}>
              <FileText className="w-4 h-4 text-white" />
            </div>
            <span className="font-medium tracking-wide text-sm uppercase">Devis gratuit</span>
          </div>
          <div className="hidden sm:block w-2 h-2 bg-orange-500 rounded-full animate-pulse-custom"></div>
          <div className="flex items-center hover-scale">
            <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center mr-2 animate-pulse-custom" style={{ animationDelay: '1s' }}>
              <Clock className="w-4 h-4 text-white" />
            </div>
            <span className="font-medium tracking-wide text-sm uppercase">Réponse &lt; 12h</span>
          </div>
        </div>

        {/* Indicateur de scroll futuriste */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-float">
          <div className="w-6 h-10 border-2 border-orange-500 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-orange-500 rounded-full mt-2 animate-pulse-custom"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
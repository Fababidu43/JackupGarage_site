import React from 'react';
import { ArrowRight, Phone, Shield, Clock, FileText } from 'lucide-react';

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
      className="section relative min-h-screen flex items-center justify-center overflow-hidden particles"
      style={{ background: 'linear-gradient(135deg, #E67E22 0%, #D35400 50%, #3498DB 100%)' }}
    >
      {/* Effets de fond animés */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-orange-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 w-48 h-48 bg-cyan-500/20 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto pt-16">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white mb-4 leading-none tracking-tight uppercase neon-text animate-slide-glow">
          Jack Up Garage
        </h1>
        
        <p className="text-xl sm:text-2xl md:text-3xl text-white/90 font-light mb-8 tracking-wide uppercase animate-slide-glow" style={{ animationDelay: '0.2s' }}>
          Mécanicien à domicile
        </p>

        <p className="text-base sm:text-lg text-white/80 max-w-2xl mx-auto mb-8 leading-relaxed font-light animate-slide-glow" style={{ animationDelay: '0.4s' }}>
          Service professionnel de mécanique automobile à domicile dans la Haute-Loire (43) et la Loire (42). 
          Intervention sur sol dur et plat uniquement.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12 animate-slide-glow" style={{ animationDelay: '0.6s' }}>
          <button
            onClick={() => scrollToSection('contact')}
            className="btn-futuristic inline-flex items-center px-8 py-4 text-white font-bold text-lg rounded-lg group neon-glow"
          >
            Demander un devis
            <ArrowRight className="ml-3 w-5 h-5" />
          </button>
          <a
            href="tel:+33123456789"
            className="inline-flex items-center px-8 py-4 glass border-2 border-white/30 text-white font-bold text-lg hover:bg-white/20 hover:border-white/50 rounded-lg transition-all duration-300 hover:scale-105"
          >
            <Phone className="mr-3 w-5 h-5" />
            Appeler
          </a>
        </div>

        {/* Barre de preuves */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 text-white/90 animate-slide-glow" style={{ animationDelay: '0.8s' }}>
          <div className="flex items-center glass px-4 py-2 rounded-full hover:bg-white/10 transition-all duration-300">
            <Shield className="w-5 h-5 mr-2" />
            <span className="font-medium tracking-wide text-sm uppercase">RC Pro</span>
          </div>
          <div className="hidden sm:block w-1 h-1 bg-white/50 rounded-full"></div>
          <div className="flex items-center glass px-4 py-2 rounded-full hover:bg-white/10 transition-all duration-300">
            <FileText className="w-5 h-5 mr-2" />
            <span className="font-medium tracking-wide text-sm uppercase">Devis gratuit</span>
          </div>
          <div className="hidden sm:block w-1 h-1 bg-white/50 rounded-full"></div>
          <div className="flex items-center glass px-4 py-2 rounded-full hover:bg-white/10 transition-all duration-300">
            <Clock className="w-5 h-5 mr-2" />
            <span className="font-medium tracking-wide text-sm uppercase">Réponse &lt; 12h</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
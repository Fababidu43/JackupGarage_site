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
      className="section relative min-h-screen flex items-center justify-center overflow-hidden tech-grid"
      style={{ 
        background: `
          radial-gradient(ellipse at center, rgba(255, 107, 53, 0.15) 0%, transparent 70%),
          linear-gradient(135deg, #0A0A0A 0%, #1A1A1A 100%)
        `
      }}
    >
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto pt-16">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white mb-6 leading-none tracking-tight uppercase font-futuristic text-glow">
          Mécanicien à domicile
        </h1>
        
        <div className="text-2xl sm:text-3xl md:text-4xl text-orange-400 font-bold mb-4 tracking-wide uppercase font-futuristic">
          Haute-Loire & Loire (43–42)
        </div>
        
        <p className="text-lg sm:text-xl text-white/80 font-light mb-8 tracking-wide font-tech">
          Entretien, freins, embrayage, distribution, suspensions.<br />
          <span className="text-orange-300">Nous venons chez vous.</span>
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <button
            onClick={() => scrollToSection('contact')}
            className="inline-flex items-center px-8 py-4 btn-primary rounded-lg text-lg font-tech glow-hover"
          >
            Demander un devis
            <ArrowRight className="ml-3 w-5 h-5" />
          </button>
          <a
            href="tel:+33123456789"
            className="inline-flex items-center px-8 py-4 btn-secondary rounded-lg text-lg font-tech glow-hover"
          >
            <Phone className="mr-3 w-5 h-5" />
            Appeler
          </a>
        </div>

        {/* Barre de preuves */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 text-white/80">
          <div className="flex items-center">
            <Shield className="w-5 h-5 mr-2 text-orange-400" />
            <span className="font-medium tracking-wide text-sm uppercase font-tech">RC Pro</span>
          </div>
          <div className="hidden sm:block w-1 h-1 bg-orange-400 rounded-full"></div>
          <div className="flex items-center">
            <FileText className="w-5 h-5 mr-2 text-orange-400" />
            <span className="font-medium tracking-wide text-sm uppercase font-tech">Devis gratuit</span>
          </div>
          <div className="hidden sm:block w-1 h-1 bg-orange-400 rounded-full"></div>
          <div className="flex items-center">
            <Clock className="w-5 h-5 mr-2 text-orange-400" />
            <span className="font-medium tracking-wide text-sm uppercase font-tech">Réponse < 12h</span>
          </div>
        </div>
      </div>
    </section>
  )
  );
};

export default Hero;
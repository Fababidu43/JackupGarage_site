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
      className="section relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ background: '#1a1a1a' }}
    >
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto pt-16">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white mb-4 leading-none tracking-tight uppercase">
          Jack Up Garage
        </h1>
        
        <p className="text-xl sm:text-2xl md:text-3xl text-white/90 font-light mb-8 tracking-wide uppercase">
          Mécanicien à domicile
        </p>

        <p className="text-base sm:text-lg text-white/80 max-w-2xl mx-auto mb-8 leading-relaxed font-light">
          Service professionnel de mécanique automobile à domicile dans la Haute-Loire (43) et la Loire (42). 
          Intervention sur sol dur et plat uniquement.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <button
            onClick={() => scrollToSection('contact')}
            className="inline-flex items-center px-8 py-4 font-bold text-lg hover:opacity-90 shadow-lg hover:shadow-xl rounded group text-white"
            style={{ background: '#DE5121' }}
          >
            Demander un devis
            <ArrowRight className="ml-3 w-5 h-5" />
          </button>
          <a
            href="tel:+33123456789"
            className="inline-flex items-center px-8 py-4 bg-transparent border-2 text-white font-bold text-lg hover:opacity-80 rounded"
            style={{ borderColor: '#DE5121' }}
          >
            <Phone className="mr-3 w-5 h-5" />
            Appeler
          </a>
        </div>

        {/* Barre de preuves */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 text-white/90">
          <div className="flex items-center">
            <Shield className="w-5 h-5 mr-2" />
            <span className="font-medium tracking-wide text-sm uppercase">RC Pro</span>
          </div>
          <div className="hidden sm:block w-1 h-1 bg-white/50 rounded-full"></div>
          <div className="flex items-center">
            <FileText className="w-5 h-5 mr-2" />
            <span className="font-medium tracking-wide text-sm uppercase">Devis gratuit</span>
          </div>
          <div className="hidden sm:block w-1 h-1 bg-white/50 rounded-full"></div>
          <div className="flex items-center">
            <Clock className="w-5 h-5 mr-2" />
            <span className="font-medium tracking-wide text-sm uppercase">Réponse &lt; 12h</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
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
      className="section relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-orange-400 via-orange-500 to-red-500"
    >
      {/* Éléments décoratifs de fond améliorés */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-white to-yellow-200 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-32 right-16 w-48 h-48 bg-gradient-to-tl from-white to-orange-200 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-gradient-to-r from-white to-red-200 rounded-full blur-lg animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/3 right-1/3 w-20 h-20 bg-gradient-to-bl from-yellow-300 to-orange-300 rounded-full blur-lg animate-pulse" style={{ animationDelay: '0.5s' }}></div>
      </div>
      
      {/* Motif géométrique subtil amélioré */}
      <div className="absolute inset-0 opacity-8">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, rgba(255,255,255,0.3) 1px, transparent 1px),
                           radial-gradient(circle at 75% 75%, rgba(255,255,255,0.2) 1px, transparent 1px),
                           linear-gradient(45deg, transparent 49%, rgba(255,255,255,0.1) 50%, transparent 51%)`,
          backgroundSize: '60px 60px, 80px 80px, 40px 40px'
        }}></div>
      </div>

      {/* Overlay gradient pour plus de profondeur */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent"></div>

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
            className="inline-flex items-center px-8 py-4 bg-white text-orange-500 font-bold text-lg hover:bg-gray-50 shadow-lg hover:shadow-xl rounded group"
            style={{ color: '#DE5121' }}
          >
            Demander un devis
            <ArrowRight className="ml-3 w-5 h-5" />
          </button>
          <a
            href="tel:+33123456789"
            className="inline-flex items-center px-8 py-4 bg-transparent border-2 border-white text-white font-bold text-lg hover:bg-white hover:text-gray-900 rounded"
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
import React, { useEffect } from 'react';
import { ArrowRight, Phone, Shield, Clock, FileText } from 'lucide-react';

interface HeroProps {
  onQuoteClick: () => void;
}

const Hero: React.FC<HeroProps> = ({ onQuoteClick }) => {

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      id="hero"
      className="section relative flex items-center justify-center overflow-hidden hero-diagonal-cut scroll-animate hero-effect"
      style={{ 
        minHeight: window.innerWidth <= 768 ? '100vh' : '110vh',
        background: `
          linear-gradient(rgba(10, 10, 10, 0.85), rgba(26, 26, 26, 0.9)),
          url('https://images.pexels.com/photos/190574/pexels-photo-190574.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop') center center/cover,
          radial-gradient(ellipse at center, rgba(255, 107, 53, 0.1) 0%, transparent 70%)
        `,
        backgroundPosition: 'center center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: window.innerWidth <= 1024 ? 'scroll' : 'fixed'
      }}
    >
      {/* Fond dynamique unifié avec les autres sections */}
      <div className="dynamic-background">
        <div className="bg-layer bg-layer-gradient"></div>
        <div className="bg-layer bg-layer-tech"></div>
        <div className="bg-layer bg-layer-particles"></div>
        <div className="bg-layer bg-layer-depth"></div>
        <div className="bg-layer bg-layer-metallic"></div>
      </div>

      {/* Formes mécaniques animées */}
      <div className="mechanical-shapes">
        <div className="mechanical-shape gear-shape rotate-slow" style={{ top: '15%', left: '10%' }}></div>
        <div className="mechanical-shape wrench-shape float-right" style={{ top: '25%', right: '15%' }}></div>
        <div className="mechanical-shape bolt-shape rotate-medium" style={{ bottom: '20%', left: '20%' }}></div>
        <div className="mechanical-shape spring-shape float-up" style={{ top: '40%', right: '25%' }}></div>
        <div className="mechanical-shape piston-shape float-down" style={{ bottom: '30%', right: '10%' }}></div>
        <div className="mechanical-shape brake-shape rotate-reverse" style={{ top: '60%', left: '5%' }}></div>
        <div className="mechanical-shape oil-drop-shape float-left" style={{ bottom: '15%', left: '30%' }}></div>
        <div className="mechanical-shape screwdriver-shape rotate-fast" style={{ top: '20%', left: '70%' }}></div>
        <div className="mechanical-shape hammer-shape float-right" style={{ bottom: '40%', right: '30%' }}></div>
      </div>

      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto pt-16 w-full">
        <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white mb-4 sm:mb-6 leading-none tracking-tight uppercase font-futuristic text-glow reveal-on-scroll">
          <span className="hover-glow-text">Mécanicien à domicile</span>
        </h1>
        
        <div className="text-lg xs:text-xl sm:text-2xl md:text-3xl lg:text-4xl text-orange-400 font-bold mb-3 sm:mb-4 tracking-wide uppercase font-futuristic reveal-on-scroll">
          Haute-Loire & Loire (43–42)
        </div>
        
        <p className="text-sm sm:text-base lg:text-lg xl:text-xl text-white/80 font-light mb-6 sm:mb-8 tracking-wide font-tech reveal-on-scroll px-2 max-w-3xl mx-auto">
          Entretien, freins, embrayage, distribution, suspensions.<br />
          <span className="text-orange-300 hover-glow-text">Nous venons chez vous.</span>
        </p>

        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mb-8 sm:mb-12 reveal-on-scroll px-2 sm:px-4">
          <button
            onClick={onQuoteClick}
            className="inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 btn-primary rounded-lg text-sm sm:text-base lg:text-lg font-tech glow-hover hover-scale morph-button subtle-glow min-h-[48px] w-full sm:w-auto"
          >
            Demander un devis
            <ArrowRight className="ml-3 w-5 h-5" />
          </button>
          <a
            href="tel:+33123456789"
            className="inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 btn-secondary rounded-lg text-sm sm:text-base lg:text-lg font-tech glow-hover hover-scale morph-button subtle-glow min-h-[48px] w-full sm:w-auto"
          >
            <Phone className="mr-3 w-5 h-5" />
            Appeler
          </a>
        </div>

        {/* Barre de preuves */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 lg:gap-4 xl:gap-6 text-white/80 reveal-on-scroll px-2 sm:px-4">
          <div className="flex items-center">
            <Shield className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2 text-orange-400" />
            <span className="font-medium tracking-wide text-xs uppercase font-tech">RC Pro</span>
          </div>
          <div className="hidden sm:block w-1 h-1 bg-orange-400 rounded-full"></div>
          <div className="flex items-center">
            <FileText className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2 text-orange-400" />
            <span className="font-medium tracking-wide text-xs uppercase font-tech">Devis gratuit</span>
          </div>
          <div className="hidden sm:block w-1 h-1 bg-orange-400 rounded-full"></div>
          <div className="flex items-center">
            <Clock className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2 text-orange-400" />
            <span className="font-medium tracking-wide text-xs uppercase font-tech">{"Réponse < 12h"}</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
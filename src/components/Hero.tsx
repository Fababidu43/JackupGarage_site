import React, { useEffect } from 'react';
import { ArrowRight, Phone, Shield, Clock, FileText } from 'lucide-react';

interface HeroProps {
  onQuoteClick: () => void;
}

const Hero: React.FC<HeroProps> = ({ onQuoteClick }) => {
  useEffect(() => {
    // Effet de parallaxe subtil
    const handleScroll = () => {
      const scrolled = window.pageYOffset;
      const parallaxElements = document.querySelectorAll('.parallax-element');
      
      parallaxElements.forEach((element) => {
        const speed = 0.5;
        const yPos = -(scrolled * speed);
        (element as HTMLElement).style.transform = `translateY(${yPos}px)`;
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      id="hero"
      className="section relative min-h-screen flex items-center justify-center overflow-hidden circuit-bg"
      style={{ 
        background: `
          linear-gradient(rgba(10, 10, 10, 0.85), rgba(26, 26, 26, 0.9)),
          url('https://images.pexels.com/photos/190574/pexels-photo-190574.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop') center/cover no-repeat,
          radial-gradient(ellipse at center, rgba(255, 107, 53, 0.1) 0%, transparent 70%)
        `,
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Overlay mécanique avec grille tech */}
      <div className="absolute inset-0 tech-grid opacity-30 parallax-element animate-pulse"></div>
      
      {/* Particules flottantes */}
      <div className="floating-particles opacity-80">
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
      </div>
      
      {/* Éléments mécaniques flottants */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none parallax-element">
        <div className="absolute top-20 left-10 w-16 h-16 border-2 border-orange-500/30 rounded-full animate-spin-slow hover:border-orange-500/50 transition-colors duration-300"></div>
        <div className="absolute top-40 right-20 w-8 h-8 border border-orange-400/40 rotate-45 animate-pulse"></div>
        <div className="absolute bottom-32 left-1/4 w-12 h-12 border-2 border-orange-500/25 rounded-lg rotate-12 hover:rotate-45 transition-transform duration-500"></div>
        <div className="absolute bottom-20 right-1/3 w-6 h-6 bg-orange-500/20 rounded-full pulse-subtle"></div>
        <div className="absolute top-1/3 left-1/3 w-4 h-4 border border-orange-300/30 rounded-full animate-bounce"></div>
        <div className="absolute bottom-1/3 right-1/4 w-10 h-10 border-2 border-orange-400/20 rotate-12 animate-spin-slow"></div>
      </div>
      
      {/* Effet de scan lumineux */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-orange-500/60 to-transparent animate-scan-horizontal"></div>
        <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-transparent via-orange-500/40 to-transparent animate-scan-vertical"></div>
      </div>
      
      {/* Overlay dynamique avec mouvement */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 via-transparent to-orange-600/10 animate-gradient-shift"></div>
      
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto pt-16">
        <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white mb-4 sm:mb-6 leading-none tracking-tight uppercase font-futuristic text-glow reveal-on-scroll">
          <span className="hover-glow-text">Mécanicien à domicile</span>
        </h1>
        
        <div className="text-xl xs:text-2xl sm:text-3xl md:text-4xl text-orange-400 font-bold mb-3 sm:mb-4 tracking-wide uppercase font-futuristic pulse-subtle reveal-on-scroll scan-lines">
          Haute-Loire & Loire (43–42)
        </div>
        
        <p className="text-base sm:text-lg lg:text-xl text-white/80 font-light mb-6 sm:mb-8 tracking-wide font-tech reveal-on-scroll px-2">
          Entretien, freins, embrayage, distribution, suspensions.<br />
          <span className="text-orange-300 hover-glow-text">Nous venons chez vous.</span>
        </p>

        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mb-8 sm:mb-12 reveal-on-scroll px-4">
          <button
            onClick={onQuoteClick}
            className="inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 btn-primary rounded-lg text-base sm:text-lg font-tech glow-hover hover-scale morph-button subtle-glow min-h-[48px]"
          >
            Demander un devis
            <ArrowRight className="ml-3 w-5 h-5" />
          </button>
          <a
            href="tel:+33123456789"
            className="inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 btn-secondary rounded-lg text-base sm:text-lg font-tech glow-hover hover-scale morph-button subtle-glow min-h-[48px]"
          >
            <Phone className="mr-3 w-5 h-5" />
            Appeler
          </a>
        </div>

        {/* Barre de preuves */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 lg:gap-6 text-white/80 reveal-on-scroll px-4">
          <div className="flex items-center">
            <Shield className="w-5 h-5 mr-2 text-orange-400" />
            <span className="font-medium tracking-wide text-xs sm:text-sm uppercase font-tech">RC Pro</span>
          </div>
          <div className="hidden sm:block w-1 h-1 bg-orange-400 rounded-full lg:mx-2"></div>
          <div className="flex items-center">
            <FileText className="w-5 h-5 mr-2 text-orange-400" />
            <span className="font-medium tracking-wide text-xs sm:text-sm uppercase font-tech">Devis gratuit</span>
          </div>
          <div className="hidden sm:block w-1 h-1 bg-orange-400 rounded-full lg:mx-2"></div>
          <div className="flex items-center">
            <Clock className="w-5 h-5 mr-2 text-orange-400" />
            <span className="font-medium tracking-wide text-xs sm:text-sm uppercase font-tech">{"Réponse < 12h"}</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
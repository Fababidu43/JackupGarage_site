import React, { useEffect } from 'react';
import { ArrowRight, Phone, Shield, Clock, FileText } from 'lucide-react';
import logo from '../logo.png';

interface HeroProps {
  onQuoteClick: () => void;
}

const Hero: React.FC<HeroProps> = ({ onQuoteClick }) => {
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.pageYOffset;
      const hero = document.getElementById('hero');
      if (hero) {
        // Effet de zoom sur l'image de fond
        let zoomMultiplier = 0.0005; // Desktop
        if (window.innerWidth <= 768) {
          zoomMultiplier = 0.0003; // Mobile - effet plus subtil
        } else if (window.innerWidth <= 1024) {
          zoomMultiplier = 0.0004; // Tablette - effet intermédiaire
        }
        
        const zoomFactor = 1 + (scrolled * zoomMultiplier);
        hero.style.backgroundSize = `${100 * zoomFactor}% auto`;
        
        // Effet de parallaxe subtil sur le contenu
        const heroContent = hero.querySelector('.hero-content');
        if (heroContent) {
          const parallaxOffset = scrolled * 0.3;
          heroContent.style.transform = `translateY(${parallaxOffset}px)`;
        }
        
        // Effet de fade progressif
        const opacity = Math.max(0.3, 1 - (scrolled / (window.innerHeight * 0.8)));
        if (heroContent) {
          heroContent.style.opacity = opacity.toString();
        }
      }
    };

    // Effet d'apparition progressive au chargement
    const hero = document.getElementById('hero');
    if (hero) {
      const heroContent = hero.querySelector('.hero-content');
      if (heroContent) {
        heroContent.classList.add('hero-loaded');
      }
    }

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Appel initial
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
      className="section relative flex items-center justify-center overflow-hidden dynamic-bg hero-diagonal-cut scroll-animate hero-effect"
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
      {/* Overlay dynamique avec effet de respiration */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40 animate-pulse-slow opacity-60"></div>
      
      {/* Particules flottantes subtiles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="floating-particle particle-1"></div>
        <div className="floating-particle particle-2"></div>
        <div className="floating-particle particle-3"></div>
      </div>
      
      <div className="hero-content relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto pt-16 w-full transition-all duration-1000 ease-out">
        {/* Logo en gros */}
        <div className="mb-6 sm:mb-8 reveal-on-scroll">
          <div className="w-48 h-32 sm:w-72 sm:h-48 lg:w-96 lg:h-64 xl:w-[30rem] xl:h-80 bg-white/95 backdrop-blur-sm border-2 border-orange-500/60 rounded-2xl flex items-center justify-center p-4 sm:p-6 lg:p-8 mx-auto shadow-2xl hover:bg-white hover:border-orange-500/80 transition-all duration-300 hover-scale">
            <img 
              src={logo} 
              alt="Jack Up Garage" 
              className="w-full h-full object-contain"
              style={{ maxWidth: '100%', maxHeight: '100%' }}
              onError={(e) => {
                console.error('Hero logo failed to load');
              }}
            />
          </div>
        </div>
        
        <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white mb-4 sm:mb-6 leading-none tracking-tight uppercase font-futuristic text-glow reveal-on-scroll">
          <span className="hover-glow-text animate-text-glow">Mécanicien à domicile</span>
        </h1>
        
        <div className="text-lg xs:text-xl sm:text-2xl md:text-3xl lg:text-4xl text-orange-400 font-bold mb-3 sm:mb-4 tracking-wide uppercase font-futuristic reveal-on-scroll animate-slide-in-up">
          Haute-Loire & Loire (43–42)
        </div>
        
        <p className="text-sm sm:text-base lg:text-lg xl:text-xl text-white/80 font-light mb-6 sm:mb-8 tracking-wide font-tech reveal-on-scroll px-2 max-w-3xl mx-auto animate-fade-in-delayed">
          Vidange et entretien, freinage, embrayage, distribution, suspensions, échappement, transmissions.<br />
          <span className="text-orange-300 hover-glow-text animate-text-shimmer">Nous venons à vous.</span>
        </p>

        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mb-8 sm:mb-12 reveal-on-scroll px-2 sm:px-4 animate-buttons-appear">
          <button
            onClick={onQuoteClick}
            className="inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 btn-primary rounded-lg text-sm sm:text-base lg:text-lg font-tech glow-hover hover-scale morph-button subtle-glow min-h-[48px] w-full sm:w-auto animate-pulse-button group"
          >
            <span className="group-hover:animate-bounce-x">Demander un devis</span>
            <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
          </button>
          <a
            href="tel:+33123456789"
            className="inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 btn-secondary rounded-lg text-sm sm:text-base lg:text-lg font-tech glow-hover hover-scale morph-button subtle-glow min-h-[48px] w-full sm:w-auto animate-pulse-button-secondary group"
          >
            <Phone className="mr-3 w-5 h-5 group-hover:animate-ring transition-transform duration-300" />
            <span className="group-hover:animate-bounce-x">Appeler</span>
          </a>
        </div>

        {/* Barre de preuves */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 lg:gap-4 xl:gap-6 text-white/80 reveal-on-scroll px-2 sm:px-4 animate-badges-appear">
          <div className="flex items-center animate-badge-float-2">
            <FileText className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2 text-orange-400" />
            <span className="font-medium tracking-wide text-xs uppercase font-tech">Devis gratuit</span>
          </div>
          <div className="w-1 h-1 bg-orange-400 rounded-full"></div>
          <div className="flex items-center animate-badge-float-3">
            <Clock className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2 text-orange-400" />
            <span className="font-medium tracking-wide text-xs uppercase font-tech">{"Réponse < 12h"}</span>
          </div>
        </div>
      </div>
      
    </section>
  );
};

export default Hero;
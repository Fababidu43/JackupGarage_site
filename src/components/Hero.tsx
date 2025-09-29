import React, { useEffect } from 'react';
import { ArrowRight, Phone, Shield, Clock, FileText } from 'lucide-react';

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
      }}
    >
      {/* Vidéo de fond */}
      <video 
        className="absolute inset-0 w-full h-full object-cover z-0"
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        poster="/video-poster.jpg"
        onLoadStart={() => console.log('🎬 Début du chargement de la vidéo Hero')}
        onCanPlay={() => console.log('✅ Vidéo Hero prête à être lue')}
        onError={(e) => {
          console.error('❌ Erreur chargement vidéo Hero:', e);
          console.warn('Vidéo Hero non trouvée, fallback vers image de fond');
          // Fallback vers l'image de fond originale
          const section = e.currentTarget.closest('section');
          if (section) {
            section.style.background = `
              linear-gradient(rgba(10, 10, 10, 0.85), rgba(26, 26, 26, 0.9)),
              url('https://images.pexels.com/photos/190574/pexels-photo-190574.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop') center center/cover,
              radial-gradient(ellipse at center, rgba(255, 107, 53, 0.1) 0%, transparent 70%)
            `;
            section.style.backgroundPosition = 'center center';
            section.style.backgroundRepeat = 'no-repeat';
            section.style.backgroundAttachment = window.innerWidth <= 1024 ? 'scroll' : 'fixed';
          }
          e.currentTarget.style.display = 'none';
        }}
      >
        <source src="/presentation.MP4" type="video/mp4" />
        <source src="/presentation.mp4" type="video/mp4" />
        Votre navigateur ne supporte pas la lecture de vidéos.
      </video>
      
      {/* Overlay renforcé pour meilleure lisibilité */}
      <div className="absolute inset-0 bg-black/60 z-5"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-black/70 z-5"></div>
      
      {/* Particules flottantes subtiles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="floating-particle particle-1"></div>
        <div className="floating-particle particle-2"></div>
        <div className="floating-particle particle-3"></div>
      </div>
      
      <div className="hero-content relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto pt-16 w-full transition-all duration-1000 ease-out">
        {/* Logo principal centré */}
        <div className="mb-6 sm:mb-8 reveal-on-scroll">
          <img 
            src="./logo.png" 
            alt="Jack Up Garage - Mécanicien à domicile" 
            className="w-64 h-28 sm:w-80 sm:h-36 lg:w-96 lg:h-44 xl:w-[28rem] xl:h-52 object-contain transition-all duration-300 hover-scale mx-auto"
            width="448"
            height="187"
            loading="eager"
            decoding="async"
            fetchpriority="high"
            style={{ maxWidth: '100%', maxHeight: '100%' }}
            onError={(e) => {
              console.warn('Hero logo failed to load, trying fallback');
              e.currentTarget.src = '/logo.png';
            }}
            onLoad={() => {
              // Marquer le contenu comme chargé pour éviter le FOUC
              const heroContent = document.querySelector('.hero-content');
              if (heroContent) {
                heroContent.classList.add('loaded');
              }
            }}
          />
        </div>
        
        <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white mb-4 sm:mb-6 leading-none tracking-tight uppercase font-futuristic text-glow reveal-on-scroll">
          <span className="hover-glow-text animate-text-glow">Mécanicien à domicile</span>
        </h1>
        
        <div className="text-base xs:text-lg sm:text-xl md:text-2xl lg:text-3xl text-orange-300 font-medium mb-3 sm:mb-4 tracking-wide uppercase font-futuristic reveal-on-scroll">
          Haute-Loire & Loire (43–42)
        </div>
        
        <p className="text-sm sm:text-base lg:text-lg xl:text-xl text-white/80 font-light mb-6 sm:mb-8 tracking-wide font-tech reveal-on-scroll px-2 max-w-3xl mx-auto animate-fade-in-delayed">
          Vidange et entretien, freinage, embrayage, distribution, suspensions, échappement, transmissions.<br />
          <span className="text-orange-300 hover-glow-text animate-text-shimmer">N’allez plus au garage, faites venir le garage !</span>
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
            href="tel:+33629485339"
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
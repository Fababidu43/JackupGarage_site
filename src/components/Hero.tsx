import React, { useEffect } from 'react';
import { ArrowRight, Phone, Shield, Clock, FileText } from 'lucide-react';

interface HeroProps {
  onQuoteClick: () => void;
}

const Hero: React.FC<HeroProps> = ({ onQuoteClick }) => {
  useEffect(() => {
    const handleScroll = () => {
      // Désactiver l'effet de zoom sur mobile et tablette
      if (window.innerWidth <= 1023) return;
      
      const scrolled = window.pageYOffset;
      const hero = document.getElementById('hero');
      if (hero) {
        // Effet de zoom sur l'image de fond - grossit quand on scroll vers le bas (desktop uniquement)
        const zoomFactor = 1 + (scrolled * 0.0005); // Facteur de zoom progressif
        hero.style.backgroundSize = `${100 * zoomFactor}% auto`;
      }
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
      className="section relative flex items-center justify-center overflow-hidden hero-diagonal-cut scroll-animate hero-effect"
      style={{ 
        minHeight: '100vh',
        background: `
          linear-gradient(rgba(10, 10, 10, 0.85), rgba(26, 26, 26, 0.9)),
          url('https://images.pexels.com/photos/190574/pexels-photo-190574.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop') center top/cover,
          radial-gradient(ellipse at center, rgba(255, 107, 53, 0.1) 0%, transparent 70%)
        `,
        backgroundPosition: 'center top',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: window.innerWidth > 1023 ? 'fixed' : 'scroll'
      }}
    >
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto pt-16 w-full">
        {/* Titre Principal - Responsive Typography */}
        <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black text-white mb-3 sm:mb-4 lg:mb-6 leading-none tracking-tight uppercase font-futuristic text-glow reveal-on-scroll">
          <span className="hover-glow-text">Mécanicien à domicile</span>
        </h1>
        
        {/* Sous-titre Zone */}
        <div className="text-base xs:text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl text-orange-400 font-bold mb-2 sm:mb-3 lg:mb-4 tracking-wide uppercase font-futuristic reveal-on-scroll">
          Haute-Loire & Loire (43–42)
        </div>
        
        {/* Description */}
        <p className="text-sm sm:text-base lg:text-lg xl:text-xl text-white/80 font-light mb-4 sm:mb-6 lg:mb-8 tracking-wide font-tech reveal-on-scroll px-2 max-w-3xl mx-auto">
          Entretien, freins, embrayage, distribution, suspensions.<br />
          <span className="text-orange-300 hover-glow-text">Nous venons chez vous.</span>
        </p>

        {/* Boutons CTA - Mobile First */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mb-6 sm:mb-8 lg:mb-12 reveal-on-scroll px-2 sm:px-4">
          <button
            onClick={onQuoteClick}
            className="inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 btn-primary rounded-lg text-sm sm:text-base lg:text-lg font-tech glow-hover hover-scale min-h-[48px] w-full sm:w-auto order-1"
          >
            Demander un devis
            <ArrowRight className="ml-2 sm:ml-3 w-4 h-4 sm:w-5 sm:h-5" />
          </button>
          <a
            href="tel:+33123456789"
            className="inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 btn-secondary rounded-lg text-sm sm:text-base lg:text-lg font-tech glow-hover hover-scale min-h-[48px] w-full sm:w-auto order-2"
          >
            <Phone className="mr-2 sm:mr-3 w-4 h-4 sm:w-5 sm:h-5" />
            Appeler
          </a>
        </div>

        {/* Barre de preuves - Mobile Optimized */}
        <div className="flex flex-col xs:flex-row items-center justify-center gap-2 xs:gap-3 lg:gap-4 xl:gap-6 text-white/80 reveal-on-scroll px-2 sm:px-4">
          <div className="flex items-center">
            <Shield className="w-3 h-3 xs:w-4 xs:h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2 text-orange-400" />
            <span className="font-medium tracking-wide text-xs uppercase font-tech">RC Pro</span>
          </div>
          <div className="hidden xs:block w-1 h-1 bg-orange-400 rounded-full"></div>
          <div className="flex items-center">
            <FileText className="w-3 h-3 xs:w-4 xs:h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2 text-orange-400" />
            <span className="font-medium tracking-wide text-xs uppercase font-tech">Devis gratuit</span>
          </div>
          <div className="hidden xs:block w-1 h-1 bg-orange-400 rounded-full"></div>
          <div className="flex items-center">
            <Clock className="w-3 h-3 xs:w-4 xs:h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2 text-orange-400" />
            <span className="font-medium tracking-wide text-xs uppercase font-tech whitespace-nowrap">{"Réponse < 12h"}</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
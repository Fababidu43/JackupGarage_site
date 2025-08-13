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
    >
      {/* Vidéo de fond */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="https://videos.pexels.com/video-files/3195394/3195394-uhd_2560_1440_25fps.mp4" type="video/mp4" />
          {/* Fallback image si la vidéo ne charge pas */}
          <img 
            src="https://images.pexels.com/photos/190574/pexels-photo-190574.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop" 
            alt="Atelier mécanique" 
            className="w-full h-full object-cover"
          />
        </video>
        {/* Overlay sombre pour la lisibilité */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/80"></div>
      </div>

      {/* Overlay mécanique avec grille tech */}
      <div className="absolute inset-0 tech-grid opacity-30"></div>
      
      {/* Éléments mécaniques flottants */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
        <div className="absolute top-20 left-10 w-16 h-16 border-2 border-orange-500/30 rounded-full animate-spin-slow floating-element"></div>
        <div className="absolute top-40 right-20 w-8 h-8 border border-orange-400/40 rotate-45 floating-element-reverse"></div>
        <div className="absolute bottom-32 left-1/4 w-12 h-12 border-2 border-orange-500/25 rounded-lg rotate-12 floating-element"></div>
        <div className="absolute bottom-20 right-1/3 w-6 h-6 bg-orange-500/20 rounded-full pulse-glow"></div>
        <div className="absolute top-1/3 left-1/3 w-4 h-4 bg-orange-400/15 rotate-45 floating-element-slow"></div>
        <div className="absolute top-2/3 right-1/4 w-10 h-10 border border-orange-500/20 rounded-full animate-spin-slow"></div>
      </div>
      
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto pt-16">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white mb-6 leading-none tracking-tight uppercase font-futuristic text-glow">
          <span className="hover-glow-text">Mécanicien à domicile</span>
        </h1>
        
        <div className="text-2xl sm:text-3xl md:text-4xl text-orange-400 font-bold mb-4 tracking-wide uppercase font-futuristic pulse-subtle">
          Haute-Loire & Loire (43–42)
        </div>
        
        <p className="text-lg sm:text-xl text-white/80 font-light mb-8 tracking-wide font-tech">
          Entretien, freins, embrayage, distribution, suspensions.<br />
          <span className="text-orange-300 hover-glow-text">Nous venons chez vous.</span>
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <button
            onClick={() => scrollToSection('contact')}
            className="inline-flex items-center px-8 py-4 btn-primary rounded-lg text-lg font-tech glow-hover hover-scale"
          >
            Demander un devis
            <ArrowRight className="ml-3 w-5 h-5" />
          </button>
          <a
            href="tel:+33123456789"
            className="inline-flex items-center px-8 py-4 btn-secondary rounded-lg text-lg font-tech glow-hover hover-scale"
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
            <span className="font-medium tracking-wide text-sm uppercase font-tech">Réponse &lt; 12h</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
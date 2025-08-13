import React from 'react';
import { ArrowRight, Phone, Shield, Clock, FileText } from 'lucide-react';
import { AnimatedElement, ParallaxElement, FloatingParticles, MorphingShape } from './ScrollAnimations';

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
      style={{ 
        background: `
          linear-gradient(rgba(10, 10, 10, 0.85), rgba(26, 26, 26, 0.9)),
          url('https://images.pexels.com/photos/190574/pexels-photo-190574.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop') center/cover,
          radial-gradient(ellipse at center, rgba(255, 107, 53, 0.1) 0%, transparent 70%)
        `
      }}
    >
      {/* Overlay mécanique avec grille tech */}
      <ParallaxElement speed={0.2}>
        <div className="absolute inset-0 tech-grid opacity-30"></div>
      </ParallaxElement>
      
      {/* Éléments mécaniques flottants */}
      <ParallaxElement speed={0.3}>
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-16 h-16 border-2 border-orange-500/20 rounded-full animate-spin-slow"></div>
          <MorphingShape className="absolute top-40 right-20 w-8 h-8" />
          <div className="absolute bottom-32 left-1/4 w-12 h-12 border-2 border-orange-500/15 rounded-lg rotate-12"></div>
          <div className="absolute bottom-20 right-1/3 w-6 h-6 bg-orange-500/10 rounded-full"></div>
        </div>
      </ParallaxElement>
      
      {/* Particules flottantes */}
      <FloatingParticles count={30} className="absolute inset-0 pointer-events-none" />
      
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto pt-16">
        <AnimatedElement animation="glitch" delay={200}>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white mb-6 leading-none tracking-tight uppercase font-futuristic text-glow">
            <span className="hover-glow-text">Mécanicien à domicile</span>
          </h1>
        </AnimatedElement>
        
        <AnimatedElement animation="hologram" delay={400}>
          <div className="text-2xl sm:text-3xl md:text-4xl text-orange-400 font-bold mb-4 tracking-wide uppercase font-futuristic pulse-subtle">
            Haute-Loire & Loire (43–42)
          </div>
        </AnimatedElement>
        
        <AnimatedElement animation="fadeInUp" delay={600}>
          <p className="text-lg sm:text-xl text-white/80 font-light mb-8 tracking-wide font-tech">
            Entretien, freins, embrayage, distribution, suspensions.<br />
            <span className="text-orange-300 hover-glow-text">Nous venons chez vous.</span>
          </p>
        </AnimatedElement>

        <AnimatedElement animation="scaleIn" delay={800}>
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
        </AnimatedElement>

        {/* Barre de preuves */}
        <AnimatedElement animation="slideInLeft" delay={1000}>
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
        </AnimatedElement>
      </div>
    </section>
  );
};

export default Hero;
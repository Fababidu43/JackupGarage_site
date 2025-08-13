import React from 'react';
import { ArrowRight, Phone } from 'lucide-react';

const Hero = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      id="top" 
      className="pt-28 pb-20 bg-brand-ink text-white bg-grid relative overflow-hidden"
    >
      {/* Dégradé radial orangé en coin */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-radial from-brand-orange/10 to-transparent opacity-30" />
      
      <div className="mx-auto max-w-6xl px-4 relative z-10">
        <h1 className="font-display text-4xl md:text-6xl font-semibold leading-tight">
          Mécanicien à domicile — Haute-Loire & Loire
        </h1>
        
        <p className="mt-6 text-white/80 max-w-2xl text-lg leading-relaxed">
          Entretiens (vidange, freins) · Embrayage/volant moteur · Kits de distribution · Amortisseurs/suspensions/rotules.
        </p>
        
        <div className="mt-8 flex flex-wrap gap-4">
          <button
            onClick={() => scrollToSection('contact')}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-md bg-brand-orange text-black font-medium shadow-glow hover-allowed hover:bg-brand-orange2 focus-ring"
          >
            Demander un devis
            <ArrowRight className="w-4 h-4" />
          </button>
          <a 
            href="tel:+33123456789"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-md ring-1 ring-white/25 hover-allowed hover:ring-white/60 focus-ring"
          >
            <Phone className="w-4 h-4" />
            Appeler
          </a>
        </div>
        
        <div className="mt-12 flex flex-wrap items-center gap-6 text-white/70 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-brand-amber rounded-full" />
            <span>Sol dur et plat suffisant</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-brand-amber rounded-full" />
            <span>Retour sous 12h</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-brand-amber rounded-full" />
            <span>Devis gratuit</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
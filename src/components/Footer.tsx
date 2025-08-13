import React from 'react';
import { Phone, Wrench } from 'lucide-react';

const Footer = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-brand-ink text-white border-t border-brand-line">
      <div className="mx-auto max-w-7xl px-4 py-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Coordonnées + CTA */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 bg-brand-orange rounded-lg flex items-center justify-center">
              <Wrench className="w-4 h-4 text-black" />
            </div>
            <div className="font-display text-xl">JackUp Garage</div>
          </div>
          <p className="text-white/70 mb-4">Mécanicien à domicile — 43–42</p>
          <a 
            href="tel:+33123456789" 
            className="inline-flex items-center gap-2 px-4 py-2 rounded bg-brand-orange text-black shadow-glow hover-allowed hover:bg-brand-orange2 focus-ring"
          >
            <Phone className="w-4 h-4" />
            Appeler
          </a>
        </div>

        {/* Liens */}
        <nav className="space-y-2">
          <h3 className="font-semibold mb-3">Navigation</h3>
          <button
            onClick={() => scrollToSection('services')}
            className="block text-white/70 hover-allowed hover:text-white link-underline"
          >
            Prestations
          </button>
          <button
            onClick={() => scrollToSection('zones')}
            className="block text-white/70 hover-allowed hover:text-white link-underline"
          >
            Zones
          </button>
          <a 
            href="/cgv.pdf" 
            target="_blank" 
            rel="noopener" 
            className="block text-white/70 hover-allowed hover:text-white link-underline"
          >
            CGV (PDF)
          </a>
          <a 
            href="/mentions-legales" 
            className="block text-white/70 hover-allowed hover:text-white link-underline"
          >
            Mentions légales
          </a>
        </nav>

        {/* Réseaux */}
        <div className="space-y-2">
          <h3 className="font-semibold mb-3">Suivez-nous</h3>
          <a 
            href="https://facebook.com/jackupgarage" 
            target="_blank"
            rel="noopener noreferrer"
            className="block text-white/70 hover-allowed hover:text-white link-underline"
          >
            Facebook
          </a>
          <a 
            href="https://instagram.com/jackupgarage" 
            target="_blank"
            rel="noopener noreferrer"
            className="block text-white/70 hover-allowed hover:text-white link-underline"
          >
            Instagram
          </a>
        </div>
      </div>
      
      <div className="text-center text-white/50 text-xs py-4 border-t border-brand-line">
        © 2024 JackUp Garage — Tous droits réservés
      </div>
    </footer>
  );
};

export default Footer;
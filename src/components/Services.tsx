import React, { useEffect, useRef } from 'react';

const Services = () => {
  return (
    <section id="services" className="relative reveal-on-scroll">
      {/* Titre Services sur fond blanc */}
      <div className="section py-6 sm:py-8 lg:py-10 bg-white relative overflow-hidden">
        {/* Fond dynamique blanc */}
        <div className="dynamic-background-white">
          <div className="bg-layer-white bg-layer-gradient-white"></div>
          <div className="bg-layer-white bg-layer-tech-white"></div>
          <div className="bg-layer-white bg-layer-particles-white"></div>
          <div className="bg-layer-white bg-layer-depth-white"></div>
          <div className="bg-layer-white bg-layer-metallic-white"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          {/* Éléments décoratifs */}
          <div className="absolute -top-4 -left-4 w-16 h-16 bg-orange-500/5 rounded-full blur-xl"></div>
          <div className="absolute -top-8 -right-8 w-24 h-24 bg-orange-500/3 rounded-full blur-2xl"></div>
          <div className="absolute top-1/2 left-8 w-2 h-2 bg-orange-500/20 rounded-full animate-pulse"></div>
          <div className="absolute top-1/3 right-12 w-1 h-1 bg-orange-500/30 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
          
          {/* Lignes décoratives */}
          <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-orange-500/10 to-transparent"></div>
          <div className="absolute top-0 right-1/4 w-px h-full bg-gradient-to-b from-transparent via-orange-500/10 to-transparent"></div>
          
          <h2 className="text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 mb-3 sm:mb-4 tracking-tight uppercase font-futuristic">
            Nos Services
          </h2>
          <p className="text-base sm:text-lg font-semibold uppercase font-tech px-4" style={{ color: '#FF6B35' }}>
            Intervention professionnelle à domicile
          </p>
          
          {/* Badge décoratif */}
          <div className="inline-flex items-center gap-2 mt-4 px-4 py-2 bg-orange-500/5 border border-orange-500/20 rounded-full">
            <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
            <span className="text-xs font-tech text-orange-600 uppercase tracking-wide">Professionnel certifié</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
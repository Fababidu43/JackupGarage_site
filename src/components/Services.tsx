import React, { useEffect, useRef } from 'react';

const Services = () => {
  return (
    <section id="services" className="relative">
      {/* Titre Services sur fond blanc */}
      <div className="section py-12 lg:py-16 relative overflow-hidden" style={{ background: '#F8F9FA' }}>
        {/* Fond animé pour la section titre */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-8 left-8 w-48 h-48 bg-gradient-to-br from-orange-500/4 to-orange-600/2 rounded-full floating-element-slow"></div>
          <div className="absolute bottom-8 right-8 w-36 h-36 border border-orange-400/8 rounded-lg rotate-45 floating-element"></div>
          <div className="absolute top-1/2 right-1/4 w-24 h-24 bg-orange-500/6 rounded-full pulse-subtle"></div>
          <div className="absolute bottom-1/3 left-1/3 w-12 h-12 bg-orange-500/8 rotate-12 floating-element-reverse"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 mb-4 tracking-tight uppercase font-futuristic hover-glow-text">
            Nos Services
          </h2>
          <p className="text-lg font-semibold uppercase font-tech fade-in-on-hover" style={{ color: '#FF6B35' }}>
            Intervention professionnelle à domicile
          </p>
        </div>
      </div>
    </section>
  );
};

export default Services;
import React, { useEffect, useRef } from 'react';

const Services = () => {
  return (
    <section id="services" className="relative reveal-on-scroll">
      {/* Titre Services sur fond blanc */}
      <div className="section py-6 sm:py-8 lg:py-10 dynamic-bg geometric-bg scan-lines" style={{ background: 'linear-gradient(135deg, #F8F9FA 0%, #FFFFFF 100%)' }}>
        {/* Couches de parallaxe */}
        <div className="parallax-layer parallax-slow wave-bg opacity-30"></div>
        <div className="parallax-layer parallax-medium opacity-20" style={{ background: 'radial-gradient(circle at 30% 70%, rgba(255, 107, 53, 0.05) 0%, transparent 50%)' }}></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 mb-3 sm:mb-4 tracking-tight uppercase font-futuristic hover-glow-text subtle-glow">
            Nos Services
          </h2>
          <p className="text-base sm:text-lg font-semibold uppercase font-tech px-4" style={{ color: '#FF6B35' }}>
            Intervention professionnelle à domicile
          </p>
        </div>
      </div>
    </section>
  );
};

export default Services;
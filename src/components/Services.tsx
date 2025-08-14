import React, { useEffect, useRef } from 'react';

const Services = () => {
  return (
    <section id="services" className="relative reveal-on-scroll">
      {/* Titre Services sur fond blanc */}
      <div className="section py-6 sm:py-8 lg:py-10 bg-gradient-to-br from-gray-50 via-white to-gray-50 relative overflow-hidden">
        {/* Fond dynamique blanc */}
        <div className="dynamic-background-white">
          <div className="bg-layer-white bg-layer-gradient-white"></div>
          <div className="bg-layer-white bg-layer-tech-white"></div>
          <div className="bg-layer-white bg-layer-particles-white"></div>
          <div className="bg-layer-white bg-layer-depth-white"></div>
          <div className="bg-layer-white bg-layer-metallic-white"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 mb-3 sm:mb-4 tracking-tight uppercase font-futuristic">
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
import React, { useEffect, useRef } from 'react';

const Services = () => {
  return (
    <section id="services" className="relative reveal-on-scroll">
      {/* Titre Services sur fond blanc */}
      <div className="section py-6 sm:py-8 lg:py-10 bg-white">
        {/* Formes mécaniques animées */}
        <div className="mechanical-shapes white-section">
          <div className="mechanical-shape gear-shape rotate-slow" style={{ top: '20%', left: '5%' }}></div>
          <div className="mechanical-shape wrench-shape rotate-medium" style={{ top: '10%', right: '10%' }}></div>
          <div className="mechanical-shape bolt-shape float-up" style={{ bottom: '15%', left: '12%' }}></div>
          <div className="mechanical-shape spring-shape rotate-reverse" style={{ top: '50%', right: '5%' }}></div>
          <div className="mechanical-shape brake-shape rotate-fast float-down" style={{ bottom: '25%', right: '15%' }}></div>
        </div>
        
        {/* Formes mécaniques animées */}
        <div className="mechanical-shapes white-section">
          <div className="mechanical-shape gear-shape rotate-slow" style={{ top: '20%', left: '5%' }}></div>
          <div className="mechanical-shape wrench-shape rotate-medium" style={{ top: '10%', right: '10%' }}></div>
          <div className="mechanical-shape bolt-shape float-up" style={{ bottom: '15%', left: '12%' }}></div>
          <div className="mechanical-shape spring-shape rotate-reverse" style={{ top: '50%', right: '5%' }}></div>
          <div className="mechanical-shape brake-shape rotate-fast float-down" style={{ bottom: '25%', right: '15%' }}></div>
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
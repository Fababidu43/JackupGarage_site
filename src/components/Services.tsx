import React, { useEffect, useRef } from 'react';

const Services = () => {
  return (
    <section id="services" className="relative reveal-on-scroll">
      {/* Titre Services sur fond blanc */}
      <div className="section py-6 sm:py-8 lg:py-10" style={{ background: 'linear-gradient(135deg, #FDD902 0%, #FFEAA7 100%)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-black mb-3 sm:mb-4 tracking-tight uppercase font-futuristic" style={{ color: '#8B4513' }}>
            Nos Services
          </h2>
          <p className="text-base sm:text-lg font-semibold uppercase font-tech px-4" style={{ color: '#6B4423' }}>
            Intervention professionnelle à domicile
          </p>
        </div>
      </div>
    </section>
  );
};

export default Services;
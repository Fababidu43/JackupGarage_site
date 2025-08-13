import React, { useEffect, useRef } from 'react';

const Services = () => {
  return (
    <section id="services" className="relative">
      {/* Titre Services sur fond blanc */}
      <div className="section py-12 lg:py-16" style={{ background: '#FFFFFF' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black gradient-text mb-4 tracking-tight uppercase animate-slide-glow">
            Nos Services
          </h2>
          <p className="text-lg font-semibold uppercase animate-slide-glow" style={{ color: '#E67E22', animationDelay: '0.2s' }}>
            Intervention professionnelle à domicile
          </p>
        </div>
      </div>
    </section>
  );
};

export default Services;
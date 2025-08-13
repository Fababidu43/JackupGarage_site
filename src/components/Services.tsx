import React, { useEffect, useRef } from 'react';

const Services = () => {
  return (
    <section id="services" className="relative">
      {/* Titre Services sur fond blanc */}
      <div className="section py-12 lg:py-16" style={{ background: '#F8F9FA' }}>
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
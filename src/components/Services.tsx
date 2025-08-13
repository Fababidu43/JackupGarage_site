import React, { useEffect, useRef } from 'react';

const Services = () => {
  return (
    <section id="services" className="relative">
      {/* Titre Services sur fond blanc */}
      <div className="section py-12 lg:py-16 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #FFFFFF 0%, #F8F9FA 50%, #FFFFFF 100%)' }}>
        {/* Éléments décoratifs subtils */}
        <div className="absolute inset-0 opacity-3">
          <div className="absolute top-10 left-10 w-24 h-24 bg-gradient-to-br from-orange-100 to-red-100 rounded-full blur-xl"></div>
          <div className="absolute bottom-10 right-10 w-32 h-32 bg-gradient-to-tl from-orange-50 to-yellow-50 rounded-full blur-2xl"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 mb-4 tracking-tight uppercase">
            Nos Services
          </h2>
          <p className="text-lg font-semibold uppercase" style={{ color: '#DE5121' }}>
            Intervention professionnelle à domicile
          </p>
        </div>
      </div>
    </section>
  );
};

export default Services;
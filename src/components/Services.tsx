import React, { useEffect, useRef } from 'react';

const Services = () => {
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.pageYOffset;
      const servicesSection = document.querySelector('.geometric-bg--services');
      if (servicesSection) {
        const speed = 0.2;
        const yPos = scrolled * speed;
        (servicesSection as HTMLElement).style.setProperty('--scroll-y', `${yPos}px`);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section id="services" className="relative reveal-on-scroll geometric-bg geometric-bg--services">
      {/* Titre Services sur fond blanc */}
      <div className="section py-6 sm:py-8 lg:py-10 scan-lines" style={{ background: '#F8F9FA' }}>
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
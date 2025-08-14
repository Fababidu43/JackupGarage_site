import React, { useEffect, useRef } from 'react';

const Services = () => {
  return (
    <section id="services" className="relative reveal-on-scroll">
      {/* Titre Services sur fond blanc */}
      <div className="section py-6 sm:py-8 lg:py-10 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 mb-3 sm:mb-4 tracking-tight uppercase font-futuristic">
            Nos Services
          </h2>
          <p id="services-subtitle" className="text-base sm:text-lg font-semibold uppercase font-tech px-4" style={{ color: '#FF6B35' }}>
            Intervention professionnelle à domicile
          </p>
        </div>
      </div>
      
      {/* Ligne de connexion vers Zone d'intervention */}
      <div className="connecting-line hidden lg:block">
        <svg 
          width="100%" 
          height="2800" 
          viewBox="0 0 1200 2800" 
          className="absolute top-20 left-0 w-full"
          style={{ zIndex: 5 }}
        >
          {/* Ligne principale en S qui évite les contenus */}
          <path
            d="M 600 0 
               Q 650 100 700 200
               Q 750 300 650 400
               Q 550 500 450 600
               Q 350 700 400 800
               Q 450 900 550 1000
               Q 650 1100 600 1200
               Q 550 1300 500 1400
               Q 450 1500 500 1600
               Q 550 1700 600 1800
               Q 650 1900 700 2000
               Q 750 2100 650 2200
               Q 550 2300 500 2400
               Q 450 2500 500 2600
               L 500 2700"
            className="connection-path"
          />
          
          {/* Point de départ */}
          <circle cx="600" cy="0" className="connection-dot" />
          
          {/* Points intermédiaires */}
          <circle cx="650" cy="400" className="connection-dot" style={{ animationDelay: '0.5s' }} />
          <circle cx="400" cy="800" className="connection-dot" style={{ animationDelay: '1s' }} />
          <circle cx="600" cy="1200" className="connection-dot" style={{ animationDelay: '1.5s' }} />
          <circle cx="500" cy="1600" className="connection-dot" style={{ animationDelay: '2s' }} />
          <circle cx="700" cy="2000" className="connection-dot" style={{ animationDelay: '2.5s' }} />
          <circle cx="500" cy="2400" className="connection-dot" style={{ animationDelay: '3s' }} />
          
          {/* Flèche d'arrivée */}
          <polygon 
            points="500,2680 485,2665 500,2650 515,2665" 
            className="connection-arrow"
          />
          
          {/* Point d'arrivée */}
          <circle cx="500" cy="2700" className="connection-dot" style={{ animationDelay: '3.5s' }} />
        </svg>
      </div>
    </section>
  );
};

export default Services;
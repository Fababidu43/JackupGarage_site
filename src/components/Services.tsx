import React from 'react';
import { Cpu } from 'lucide-react';

const Services = () => {
  return (
    <section id="services" className="relative">
      {/* Titre Services sur fond noir futuriste */}
      <div className="section py-12 lg:py-16 relative overflow-hidden particles-bg" style={{ background: '#000000' }}>
        {/* Éléments décoratifs */}
        <div className="absolute top-10 left-1/4 w-32 h-32 border border-orange-500/10 rounded-full animate-rotate"></div>
        <div className="absolute bottom-10 right-1/4 w-24 h-24 border border-orange-500/20 rounded-full animate-rotate" style={{ animationDirection: 'reverse' }}></div>
        <div className="absolute top-1/2 left-10 w-2 h-2 bg-orange-500 rounded-full animate-pulse-custom"></div>
        <div className="absolute top-1/3 right-10 w-3 h-3 bg-orange-400 rounded-full animate-float"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="animate-fade-up">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg flex items-center justify-center animate-neon-glow">
                <Cpu className="w-8 h-8 text-white animate-pulse-custom" />
              </div>
            </div>
            
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-4 tracking-tight uppercase hover-glow">
              Nos Services
            </h2>
            
            <div className="w-24 h-1 bg-gradient-to-r from-orange-500 to-orange-600 mx-auto mb-6 animate-neon-glow"></div>
            
            <p className="text-lg font-semibold uppercase text-orange-400 animate-pulse-custom">
              Intervention professionnelle à domicile
            </p>
            
            {/* Ligne décorative */}
            <div className="flex justify-center items-center mt-8 space-x-4">
              <div className="w-8 h-0.5 bg-orange-500 animate-pulse-custom"></div>
              <div className="w-3 h-3 border-2 border-orange-500 rounded-full animate-rotate"></div>
              <div className="w-8 h-0.5 bg-orange-500 animate-pulse-custom" style={{ animationDelay: '0.5s' }}></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
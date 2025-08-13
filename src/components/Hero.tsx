import React from 'react';
import { ArrowRight, Phone, Shield, Clock, FileText } from 'lucide-react';

const Hero = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      id="hero"
      className="section relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Video */}
      <div className="absolute inset-0 w-full h-full">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          poster="https://images.pexels.com/photos/3806288/pexels-photo-3806288.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop"
        >
          <source 
            src="https://videos.pexels.com/video-files/3195394/3195394-uhd_2560_1440_25fps.mp4" 
            type="video/mp4" 
          />
          {/* Fallback image for browsers that don't support video */}
          <img 
            src="https://images.pexels.com/photos/3806288/pexels-photo-3806288.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop"
            alt="Automotive workshop background"
            className="w-full h-full object-cover"
          />
        </video>
        
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/70 via-slate-900/60 to-slate-900/80"></div>
        
        {/* Additional subtle pattern overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-slate-900/20 to-transparent"></div>
      </div>

      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto pt-16">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white mb-4 leading-none tracking-tight uppercase drop-shadow-2xl">
          Jack Up Garage
        </h1>
        
        <p className="text-xl sm:text-2xl md:text-3xl text-slate-200 font-light mb-8 tracking-wide uppercase drop-shadow-lg">
          Mécanicien à domicile
        </p>

        <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto mb-8 leading-relaxed font-light drop-shadow-md bg-slate-900/30 backdrop-blur-sm rounded-lg p-4">
          Service professionnel de mécanique automobile à domicile dans la Haute-Loire (43) et la Loire (42). 
          Intervention sur sol dur et plat uniquement.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <button
            onClick={() => scrollToSection('contact')}
            className="inline-flex items-center px-8 py-4 bg-emerald-600 text-white font-bold text-lg hover:bg-emerald-700 shadow-xl hover:shadow-2xl rounded-lg transition-all duration-300 transform hover:scale-105"
          >
            Demander un devis
            <ArrowRight className="ml-3 w-5 h-5" />
          </button>
          <a
            href="tel:+33123456789"
            className="inline-flex items-center px-8 py-4 bg-transparent border-2 border-white text-white font-bold text-lg hover:bg-white hover:text-slate-900 rounded-lg transition-all duration-300 backdrop-blur-sm"
          >
            <Phone className="mr-3 w-5 h-5" />
            Appeler
          </a>
        </div>

        {/* Trust indicators with enhanced visibility */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 text-slate-200 bg-slate-900/40 backdrop-blur-sm rounded-lg p-4">
          <div className="flex items-center">
            <Shield className="w-5 h-5 mr-2 text-emerald-400" />
            <span className="font-medium tracking-wide text-sm uppercase">RC Pro</span>
          </div>
          <div className="hidden sm:block w-1 h-1 bg-slate-400 rounded-full"></div>
          <div className="flex items-center">
            <FileText className="w-5 h-5 mr-2 text-emerald-400" />
            <span className="font-medium tracking-wide text-sm uppercase">Devis gratuit</span>
          </div>
          <div className="hidden sm:block w-1 h-1 bg-slate-400 rounded-full"></div>
          <div className="flex items-center">
            <Clock className="w-5 h-5 mr-2 text-emerald-400" />
            <span className="font-medium tracking-wide text-sm uppercase">Réponse < 12h</span>
          </div>
        </div>
      </div>
    </section>
  )
  );
};

export default Hero;
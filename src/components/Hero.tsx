import React from 'react';
import { ArrowRight, Phone, Clock } from 'lucide-react';

const Hero = () => {
  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-animated"
    >
      {/* Background overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-base-900/20 to-base-900/40" />
      
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto pt-16">
        {/* Kicker */}
        <div className="inline-flex items-center px-4 py-2 bg-brand-500/20 border border-brand-500/30 rounded-full mb-6">
          <Clock className="w-4 h-4 mr-2 text-brand-400" />
          <span className="text-sm font-medium text-brand-400">Reply within 12h</span>
        </div>

        {/* Main Headline */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold text-text-primary mb-6 leading-tight">
          Mobile mechanic at{' '}
          <span className="text-brand-500 text-glow">your place</span>
          <br />
          <span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-text-muted font-normal">
            Haute-Loire & Loire (43–42)
          </span>
        </h1>

        {/* Subheadline */}
        <p className="text-lg sm:text-xl text-text-muted max-w-3xl mx-auto mb-8 leading-relaxed">
          Maintenance (oil & brakes), clutch & flywheel, timing belt kits, shocks & suspension joints.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <button
            onClick={scrollToContact}
            className="inline-flex items-center px-8 py-4 bg-brand-500 text-white font-semibold text-lg hover:bg-brand-400 rounded-lg transition-all duration-300 hover:shadow-glow focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 focus:ring-offset-base-900"
          >
            Get a quote
            <ArrowRight className="ml-3 w-5 h-5" />
          </button>
          <a
            href="tel:+33123456789"
            className="inline-flex items-center px-8 py-4 bg-transparent border-2 border-white/20 text-text-primary font-semibold text-lg hover:border-brand-400 hover:text-brand-400 rounded-lg transition-all duration-300"
          >
            <Phone className="mr-3 w-5 h-5" />
            Call
          </a>
        </div>

        {/* Trust indicators */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-text-muted text-sm">
          <div className="flex items-center">
            <div className="w-2 h-2 bg-brand-500 rounded-full mr-2" />
            Professional insurance
          </div>
          <div className="flex items-center">
            <div className="w-2 h-2 bg-brand-500 rounded-full mr-2" />
            Free quotes
          </div>
          <div className="flex items-center">
            <div className="w-2 h-2 bg-brand-500 rounded-full mr-2" />
            Hard, flat surface only
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
import React from 'react';
import { Droplets, Zap, Settings, Car } from 'lucide-react';

const services = [
  {
    icon: Droplets,
    title: 'Maintenance (oil & brakes)',
    description: 'Engine oil change, oil and air filter replacement, fluid level checks to keep your vehicle in perfect condition.',
    image: 'https://images.pexels.com/photos/4489702/pexels-photo-4489702.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    icon: Zap,
    title: 'Clutch & flywheel',
    description: 'Complete clutch and flywheel replacement with precise diagnosis. Professional intervention for smooth driving.',
    image: 'https://images.pexels.com/photos/3807277/pexels-photo-3807277.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    icon: Settings,
    title: 'Timing belt kits',
    description: 'Timing belt replacement, tensioner pulleys and water pump. Essential service for engine longevity.',
    image: 'https://images.pexels.com/photos/3807278/pexels-photo-3807278.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    icon: Car,
    title: 'Shocks, suspension, joints',
    description: 'Shock absorber replacement, suspension, ball joints and silent blocks for optimal driving comfort and enhanced safety.',
    image: 'https://images.pexels.com/photos/4489731/pexels-photo-4489731.jpeg?auto=compress&cs=tinysrgb&w=800'
  }
];

const Services = () => {
  return (
    <section id="services" className="py-20 bg-base-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-text-primary mb-4">
            Our Services
          </h2>
          <p className="text-lg text-brand-500 font-semibold">
            Professional intervention at your location
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-base-700 rounded-xl overflow-hidden card-hover group"
            >
              <div className="aspect-video overflow-hidden">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-300"
                  loading="lazy"
                />
              </div>
              <div className="p-6">
                <div className="w-12 h-12 bg-brand-500 rounded-lg flex items-center justify-center mb-4 group-hover:bg-brand-400 transition-colors">
                  <service.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-display font-semibold text-text-primary mb-3">
                  {service.title}
                </h3>
                <p className="text-text-muted text-sm leading-relaxed">
                  {service.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
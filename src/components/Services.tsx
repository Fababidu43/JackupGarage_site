import React from 'react';
import { Droplets, Zap, Settings, Car } from 'lucide-react';

const Services = () => {
  const services = [
    {
      icon: Droplets,
      title: "Entretiens",
      description: "Vidange, filtres, freins.",
      details: "Vidange moteur, remplacement des filtres à huile et à air, contrôle des niveaux, plaquettes de frein."
    },
    {
      icon: Zap,
      title: "Embrayage & volant moteur",
      description: "Remplacement complet, essai.",
      details: "Remplacement complet de l'embrayage et du volant moteur avec diagnostic précis et essai routier."
    },
    {
      icon: Settings,
      title: "Kit distribution",
      description: "Courroie, galets, pompe à eau.",
      details: "Remplacement des kits de distribution, courroies, galets tendeurs et pompe à eau selon préconisations."
    },
    {
      icon: Car,
      title: "Suspensions & trains",
      description: "Amortisseurs, rotules, géo.",
      details: "Remplacement des amortisseurs, suspensions, rotules et silent-blocs pour un confort optimal."
    }
  ];

  return (
    <section id="services" className="py-20 bg-brand-steel text-white">
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="font-display text-3xl mb-8">Prestations</h2>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <article 
                key={index}
                className="group p-6 rounded-lg bg-brand-ink/60 border border-brand-line hover-allowed hover:shadow-glow hover-allowed hover:-translate-y-1"
              >
                <div className="h-24 w-24 mx-auto mb-4 bg-brand-orange/10 rounded-lg flex items-center justify-center group-hover:bg-brand-orange/20">
                  <IconComponent className="w-12 h-12 text-brand-orange opacity-90 group-hover:opacity-100" />
                </div>
                
                <h3 className="font-semibold text-lg text-white mb-2 text-center">
                  {service.title}
                </h3>
                
                <p className="text-sm text-white/70 text-center mb-3">
                  {service.description}
                </p>
                
                <p className="text-xs text-white/60 text-center leading-relaxed">
                  {service.details}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;
import React, { useState } from 'react';
import { MapPin, ChevronDown, ChevronUp } from 'lucide-react';

const ServiceArea = () => {
  const [showAllCommunes, setShowAllCommunes] = useState(false);

  const communes = [
    "Monistrol-sur-Loire", "Bas-en-Basset", "Beauzac", "Saint-Didier-en-Velay", 
    "Retournac", "Aurec-sur-Loire", "Saint-Just-Malmont", "Dunières", "Tence",
    "Yssingeaux", "Sainte-Sigolène", "Le Puy-en-Velay", "Brioude", "Langeac",
    "Saint-Étienne", "Firminy", "Saint-Chamond", "Montbrison", "Feurs",
    "Andrézieux-Bouthéon", "Saint-Just-Saint-Rambert", "Veauche", "Sorbiers"
  ];

  const visibleCommunes = showAllCommunes ? communes : communes.slice(0, 8);

  return (
    <section id="zones" className="py-20 bg-brand-ink text-white">
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="font-display text-3xl mb-4">Zones d'intervention</h2>
        
        <p className="text-white/80 mb-8 text-lg">
          43–42. Sol dur et plat suffisant. Embrayages : déplacement élargi sur demande (ex : Brioude).
        </p>
        
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 bg-brand-orange rounded-lg flex items-center justify-center">
              <MapPin className="w-4 h-4 text-black" />
            </div>
            <h3 className="font-semibold text-xl">Communes desservies</h3>
          </div>
          
          <div className="flex flex-wrap gap-2 mb-4">
            {visibleCommunes.map((commune, index) => (
              <span 
                key={index}
                className="px-3 py-1 rounded-full bg-white/10 ring-1 ring-white/15 text-sm"
              >
                {commune}
              </span>
            ))}
            
            <button
              onClick={() => setShowAllCommunes(!showAllCommunes)}
              className="px-3 py-1 rounded-full border border-brand-line hover-allowed hover:bg-white/10 text-sm flex items-center gap-1"
            >
              {showAllCommunes ? (
                <>
                  Voir moins <ChevronUp className="w-3 h-3" />
                </>
              ) : (
                <>
                  Voir plus… <ChevronDown className="w-3 h-3" />
                </>
              )}
            </button>
          </div>
        </div>
        
        <div className="bg-brand-steel/50 border border-brand-line rounded-lg p-6">
          <p className="text-brand-amber text-sm mb-2 font-medium">
            ⚠️ Saint-Étienne intra-muros : interventions limitées.
          </p>
          <p className="text-white/70 text-sm">
            Pour les interventions complexes (embrayages), possibilité de déplacement élargi avec supplément kilométrique selon distance.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ServiceArea;
import React, { useState, useEffect, useRef } from 'react';
import { MapPin, ChevronDown, ChevronUp } from 'lucide-react';

const ServiceArea = () => {
  const [showAllCommunes43, setShowAllCommunes43] = useState(false);
  const [showAllCommunes42, setShowAllCommunes42] = useState(false);

  const communes43 = [
    "Le Puy-en-Velay", "Monistrol-sur-Loire", "Yssingeaux", "Brioude", "Langeac", 
    "Sainte-Sigolène", "Retournac", "Bas-en-Basset", "Saint-Just-Malmont", "Dunières", 
    "Tence", "Saint-Didier-en-Velay", "Craponne-sur-Arzon", "Vorey", "Aurec-sur-Loire", 
    "Saint-Paulien", "Allegre", "Saugues", "Pinols", "Lavoûte-Chilhac"
  ];

  const communes42 = [
    "Saint-Étienne", "Firminy", "Saint-Chamond", "Rive-de-Gier", "Roanne", "Montbrison", 
    "Veauche", "Sorbiers", "La Ricamarie", "Le Chambon-Feugerolles", "Unieux", 
    "Roche-la-Molière", "Saint-Genest-Malifaux", "Bourg-Argental", "Pélussin", 
    "Charlieu", "Feurs", "Boën-sur-Lignon", "Andrézieux-Bouthéon", "Saint-Just-Saint-Rambert"
  ];

  return (
    <section 
      id="area" 
      className="section relative text-white overflow-hidden tech-grid"
      style={{ background: 'linear-gradient(to bottom, #0A0A0A 0%, #1A1A1A 100%)' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-6 tracking-tight uppercase font-futuristic hover-glow-text">
            Zone d'intervention
          </h2>
          <div className="max-w-4xl mx-auto bg-orange-500/10 border border-orange-500/20 rounded-lg p-6 mb-8 hover-scale border-glow">
            <p className="text-lg sm:text-xl text-orange-300 font-medium font-tech mb-2">
              Secteurs 43–42. Nous n'avons besoin que d'un sol dur et plat.
            </p>
            <p className="text-base text-white/80 font-tech">
              Embrayages : déplacement élargi sur demande (ex. Brioude).
            </p>
          </div>
          
          {/* Badge Saint-Étienne */}
          <div className="inline-flex items-center bg-yellow-500/20 border border-yellow-500/30 rounded-full px-4 py-2 mb-6 pulse-subtle">
            <span className="text-yellow-300 font-medium text-sm font-tech">
              Saint-Étienne intra-muros : interventions limitées
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-12">
          {/* Haute-Loire */}
          <div className="bg-orange-500/10 backdrop-blur-sm p-6 rounded-lg border border-orange-500/20 hover-scale border-glow">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center text-white mr-3 pulse-subtle">
                <MapPin className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold text-white tracking-wide uppercase font-futuristic hover-glow-text">
                Haute-Loire (43)
              </h3>
            </div>
            
            <div className="text-white/80 leading-relaxed font-light text-sm font-tech">
              {communes43.slice(0, showAllCommunes43 ? communes43.length : 8).map((commune, index) => (
                <span key={index}>
                  {commune}
                  {index < (showAllCommunes43 ? communes43.length - 1 : 7) && ', '}
                </span>
              ))}
              {!showAllCommunes43 && communes43.length > 8 && '...'}
            </div>
            
            <button
              onClick={() => setShowAllCommunes43(!showAllCommunes43)}
              className="mt-3 inline-flex items-center text-orange-300 hover:text-orange-200 transition-colors font-medium text-sm uppercase font-tech underline-animate hover-lift"
            >
              {showAllCommunes43 ? (
                <>
                  Voir moins <ChevronUp className="ml-1 w-4 h-4" />
                </>
              ) : (
                <>
                  Voir toutes <ChevronDown className="ml-1 w-4 h-4" />
                </>
              )}
            </button>
          </div>

          {/* Loire */}
          <div className="bg-orange-500/10 backdrop-blur-sm p-6 rounded-lg border border-orange-500/20 hover-scale border-glow">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center text-white mr-3 pulse-subtle">
                <MapPin className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold text-white tracking-wide uppercase font-futuristic hover-glow-text">
                Loire (42)
              </h3>
            </div>
            
            <div className="text-white/80 leading-relaxed font-light text-sm font-tech">
              {communes42.slice(0, showAllCommunes42 ? communes42.length : 8).map((commune, index) => (
                <span key={index}>
                  {commune}
                  {index < (showAllCommunes42 ? communes42.length - 1 : 7) && ', '}
                </span>
              ))}
              {!showAllCommunes42 && communes42.length > 8 && '...'}
            </div>
            
            <button
              onClick={() => setShowAllCommunes42(!showAllCommunes42)}
              className="mt-3 inline-flex items-center text-orange-300 hover:text-orange-200 transition-colors font-medium text-sm uppercase font-tech underline-animate hover-lift"
            >
              {showAllCommunes42 ? (
                <>
                  Voir moins <ChevronUp className="ml-1 w-4 h-4" />
                </>
              ) : (
                <>
                  Voir toutes <ChevronDown className="ml-1 w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </div>

        {/* Conditions d'intervention */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white p-6 rounded-lg shadow-lg border border-orange-500/20 hover-scale border-glow">
            <h4 className="text-xl font-bold text-gray-900 mb-3 tracking-wide text-center uppercase font-futuristic hover-glow-text">
              Conditions d'intervention
            </h4>
            <p className="text-base leading-relaxed mb-3 text-center font-light font-tech" style={{ color: '#4A5568' }}>
              Intervention sur sol dur et plat uniquement pour des raisons de sécurité.
            </p>
            <p className="text-sm leading-relaxed text-center font-light font-tech" style={{ color: '#4A5568' }}>
              Pour les embrayages, possibilité de déplacement longue distance avec supplément kilométrique.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceArea;
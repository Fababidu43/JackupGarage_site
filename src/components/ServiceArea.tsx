import React, { useState } from 'react';
import { MapPin, ChevronDown, ChevronUp, Navigation } from 'lucide-react';

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
      className="section relative text-white overflow-hidden particles-bg"
      style={{ background: 'linear-gradient(135deg, #FF6B35 0%, #FFB366 100%)' }}
    >
      {/* Éléments décoratifs futuristes */}
      <div className="absolute top-20 left-20 w-40 h-40 border border-white/10 rounded-full animate-rotate"></div>
      <div className="absolute bottom-20 right-20 w-32 h-32 border border-white/20 rounded-full animate-rotate" style={{ animationDirection: 'reverse' }}></div>
      <div className="absolute top-1/2 left-10 w-4 h-4 bg-white/30 rounded-full animate-float"></div>
      <div className="absolute top-1/3 right-10 w-2 h-2 bg-white/50 rounded-full animate-pulse-custom"></div>
      <div className="absolute bottom-1/3 left-1/3 w-3 h-3 bg-white/20 rounded-full animate-float" style={{ animationDelay: '1s' }}></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 relative z-10">
        <div className="text-center mb-12 animate-fade-up">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-black/30 rounded-lg flex items-center justify-center animate-neon-glow">
              <Navigation className="w-8 h-8 text-white animate-pulse-custom" />
            </div>
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-4 tracking-tight uppercase hover-glow">
            Zone d'intervention
          </h2>
          
          <div className="w-24 h-1 bg-black/30 mx-auto mb-6"></div>
          
          <p className="text-lg sm:text-xl text-white/90 font-light">
            Service disponible dans la Haute-Loire et la Loire
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-12">
          {/* Haute-Loire */}
          <div className="bg-black/20 backdrop-blur-sm p-6 rounded-lg border border-white/10 hover-scale animate-slide-left">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center text-white mr-3 animate-pulse-custom">
                <MapPin className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold text-white tracking-wide uppercase hover-glow">
                Haute-Loire (43)
              </h3>
            </div>
            
            <div className="text-white/90 leading-relaxed font-light text-sm">
              {communes43.slice(0, showAllCommunes43 ? communes43.length : 8).map((commune, index) => (
                <span key={index} className="hover:text-white transition-colors">
                  {commune}
                  {index < (showAllCommunes43 ? communes43.length - 1 : 7) && ', '}
                </span>
              ))}
              {!showAllCommunes43 && communes43.length > 8 && '...'}
            </div>
            
            <button
              onClick={() => setShowAllCommunes43(!showAllCommunes43)}
              className="mt-3 inline-flex items-center text-white hover:text-black bg-white/20 px-4 py-2 rounded-lg hover:bg-white transition-all duration-300 font-medium text-sm uppercase hover-scale"
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
          <div className="bg-black/20 backdrop-blur-sm p-6 rounded-lg border border-white/10 hover-scale animate-slide-right">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center text-white mr-3 animate-pulse-custom" style={{ animationDelay: '0.5s' }}>
                <MapPin className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold text-white tracking-wide uppercase hover-glow">
                Loire (42)
              </h3>
            </div>
            
            <div className="text-white/90 leading-relaxed font-light text-sm">
              {communes42.slice(0, showAllCommunes42 ? communes42.length : 8).map((commune, index) => (
                <span key={index} className="hover:text-white transition-colors">
                  {commune}
                  {index < (showAllCommunes42 ? communes42.length - 1 : 7) && ', '}
                </span>
              ))}
              {!showAllCommunes42 && communes42.length > 8 && '...'}
            </div>
            
            <button
              onClick={() => setShowAllCommunes42(!showAllCommunes42)}
              className="mt-3 inline-flex items-center text-white hover:text-black bg-white/20 px-4 py-2 rounded-lg hover:bg-white transition-all duration-300 font-medium text-sm uppercase hover-scale"
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

        {/* Conditions d'intervention futuriste */}
        <div className="max-w-4xl mx-auto animate-scale-in" style={{ animationDelay: '0.8s' }}>
          <div className="bg-black/30 backdrop-blur-sm p-6 rounded-lg shadow-lg border border-white/20 hover-neon">
            <h4 className="text-xl font-bold text-white mb-3 tracking-wide text-center uppercase hover-glow">
              Conditions d'intervention
            </h4>
            <p className="text-base leading-relaxed mb-3 text-center font-light text-white/90">
              Intervention sur sol dur et plat uniquement pour des raisons de sécurité.
            </p>
            <p className="text-sm leading-relaxed text-center font-light text-white/80">
              Pour les embrayages, possibilité de déplacement longue distance avec supplément kilométrique.
            </p>
            
            {/* Ligne décorative */}
            <div className="flex justify-center items-center mt-6 space-x-4">
              <div className="w-8 h-0.5 bg-white/50 animate-pulse-custom"></div>
              <div className="w-3 h-3 border-2 border-white/50 rounded-full animate-rotate"></div>
              <div className="w-8 h-0.5 bg-white/50 animate-pulse-custom" style={{ animationDelay: '0.5s' }}></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceArea;
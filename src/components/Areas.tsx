import React from 'react';
import { MapPin, Info } from 'lucide-react';

const Areas = () => {
  const communes43 = [
    'Le Puy-en-Velay', 'Monistrol-sur-Loire', 'Yssingeaux', 'Brioude', 'Langeac',
    'Sainte-Sigolène', 'Retournac', 'Bas-en-Basset', 'Saint-Just-Malmont', 'Dunières',
    'Tence', 'Saint-Didier-en-Velay', 'Craponne-sur-Arzon', 'Vorey', 'Aurec-sur-Loire',
    'Saint-Paulien', 'Allegre', 'Saugues', 'Pinols', 'Lavoûte-Chilhac'
  ];

  const communes42 = [
    'Saint-Étienne', 'Firminy', 'Saint-Chamond', 'Rive-de-Gier', 'Roanne', 'Montbrison',
    'Veauche', 'Sorbiers', 'La Ricamarie', 'Le Chambon-Feugerolles', 'Unieux',
    'Roche-la-Molière', 'Saint-Genest-Malifaux', 'Bourg-Argental', 'Pélussin',
    'Charlieu', 'Feurs', 'Boën-sur-Lignon', 'Andrézieux-Bouthéon', 'Saint-Just-Saint-Rambert'
  ];

  return (
    <section id="areas" className="py-20 bg-base-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-text-primary mb-4">
            Areas of Operation
          </h2>
          <p className="text-lg text-text-muted max-w-2xl mx-auto">
            We only need a hard, flat surface. We travel anywhere in 43–42.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
          {/* Haute-Loire */}
          <div className="bg-base-800 rounded-xl p-8">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-brand-500 rounded-lg flex items-center justify-center mr-4">
                <MapPin className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-display font-semibold text-text-primary">
                Haute-Loire (43)
              </h3>
            </div>
            <div className="grid grid-cols-2 gap-2 text-sm text-text-muted">
              {communes43.map((commune, index) => (
                <div key={index} className="py-1">
                  {commune}
                </div>
              ))}
            </div>
          </div>

          {/* Loire */}
          <div className="bg-base-800 rounded-xl p-8">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-brand-500 rounded-lg flex items-center justify-center mr-4">
                <MapPin className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-display font-semibold text-text-primary">
                Loire (42)
              </h3>
            </div>
            <div className="grid grid-cols-2 gap-2 text-sm text-text-muted">
              {communes42.map((commune, index) => (
                <div key={index} className="py-1">
                  {commune}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Special Note */}
        <div className="bg-brand-500/10 border border-brand-500/20 rounded-xl p-6 max-w-4xl mx-auto">
          <div className="flex items-start">
            <div className="w-8 h-8 bg-brand-500 rounded-lg flex items-center justify-center mr-4 mt-1 flex-shrink-0">
              <Info className="w-4 h-4 text-white" />
            </div>
            <div>
              <h4 className="text-lg font-display font-semibold text-text-primary mb-2">
                Special Conditions
              </h4>
              <p className="text-text-muted mb-2">
                For clutch jobs we can travel farther (e.g., Brioude) on request.
              </p>
              <p className="text-sm text-text-muted">
                All interventions require a hard, flat surface for safety reasons.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Areas;
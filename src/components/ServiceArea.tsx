import React, { useState, useEffect, useRef } from 'react';
import { MapPin, ChevronDown, ChevronUp, CheckCircle, AlertTriangle, XCircle, Home, Wrench } from 'lucide-react';

const ServiceArea = () => {
  const [showAllCommunes43, setShowAllCommunes43] = useState(false);
  const [showAllCommunes42, setShowAllCommunes42] = useState(false);
  const [embrayageMode, setEmbrayageMode] = useState(false);
  const [coverageInput, setCoverageInput] = useState('');
  const [coverageResult, setCoverageResult] = useState<{
    status: 'covered' | 'on-demand' | 'out-of-zone' | null;
    city: string;
  }>({ status: null, city: '' });
  const [hoveredDept, setHoveredDept] = useState<string | null>(null);
  const [deptInfoPosition, setDeptInfoPosition] = useState({ x: 0, y: 0 });

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

  // Vérification de couverture
  const checkCoverage = (input: string) => {
    const city = input.trim();
    if (!city) {
      setCoverageResult({ status: null, city: '' });
      return;
    }

    const allCommunes = [...communes43, ...communes42];
    const found = allCommunes.find(commune => 
      commune.toLowerCase().includes(city.toLowerCase()) ||
      city.toLowerCase().includes(commune.toLowerCase())
    );

    if (found) {
      if (found === "Saint-Étienne") {
        setCoverageResult({ status: 'on-demand', city: found });
      } else {
        setCoverageResult({ status: 'covered', city: found });
      }
    } else if (embrayageMode) {
      setCoverageResult({ status: 'on-demand', city: city });
    } else {
      setCoverageResult({ status: 'out-of-zone', city: city });
    }
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      checkCoverage(coverageInput);
    }, 300);
    return () => clearTimeout(timeoutId);
  }, [coverageInput, embrayageMode]);

  const handleDeptHover = (deptId: string, event: React.MouseEvent) => {
    setHoveredDept(deptId);
    const rect = event.currentTarget.getBoundingClientRect();
    setDeptInfoPosition({
      x: rect.left + rect.width / 2,
      y: rect.top - 10
    });
  };

  const getDeptInfo = (deptId: string) => {
    switch (deptId) {
      case '43':
        return {
          name: 'Haute-Loire (43)',
          status: 'covered',
          cities: communes43.slice(0, 4).join(', ') + '...',
          count: communes43.length
        };
      case '42':
        return {
          name: 'Loire (42)',
          status: 'covered',
          cities: communes42.slice(0, 4).join(', ') + '...',
          count: communes42.length
        };
      default:
        return null;
    }
  };

  const getCTAText = () => {
    switch (coverageResult.status) {
      case 'covered':
        return 'Demander un devis';
      case 'on-demand':
        return 'Demander un devis (déplacement long)';
      case 'out-of-zone':
        return 'Nous contacter';
      default:
        return 'Demander un devis';
    }
  };

  return (
    <section 
      id="area" 
      className="section relative text-white overflow-hidden reveal-on-scroll py-8 lg:py-12 diagonal-cut-top-backslash diagonal-cut-bottom-slash"
      style={{ background: 'linear-gradient(to bottom, #0A0A0A 0%, #1A1A1A 100%)' }}
    >
      {/* Fond dynamique pour Zone d'intervention */}
      <div className="dynamic-background absolute inset-0 pointer-events-none z-0">
        <div className="bg-layer bg-layer-gradient"></div>
        <div className="bg-layer bg-layer-tech"></div>
        <div className="bg-layer bg-layer-particles"></div>
        <div className="bg-layer bg-layer-depth"></div>
        <div className="bg-layer bg-layer-metallic"></div>
      </div>
      
      <div className="relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-6 sm:mb-8">
            <h2 className="text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-4 sm:mb-6 tracking-tight uppercase font-futuristic">
              Zone d'intervention
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-orange-300 font-medium font-tech mb-4">
              Nous couvrons la Loire (42) et la Haute-Loire (43)
            </p>
            
            {/* Pills de conditions */}
            <div className="flex flex-wrap justify-center gap-3 mb-6">
              <div className="condition-pill">
                <Home className="w-3 h-3" />
                Sol dur et plat uniquement
              </div>
              <div className="condition-pill info">
                <MapPin className="w-3 h-3" />
                Saint-Étienne : accès limité
              </div>
            </div>
          </div>

          {/* Toggle Embrayage */}
          <div className="text-center mb-6">
            <div 
              className="embrayage-toggle inline-flex items-center cursor-pointer"
              onClick={() => setEmbrayageMode(!embrayageMode)}
            >
              <div className={`toggle-switch ${embrayageMode ? 'active' : ''}`}></div>
              <span className="text-white font-tech text-sm">
                Besoin d'un embrayage ? Afficher la zone élargie
              </span>
            </div>
            {embrayageMode && (
              <p className="text-orange-300 text-sm font-tech mt-2">
                Déplacement longue distance : supplément kilométrique
              </p>
            )}
          </div>

          {/* Grille principale : Carte + Vérificateur */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 mb-8">
            
            {/* Carte Interactive */}
            <div className="interactive-map">
              <h3 className="text-lg font-bold text-white mb-4 text-center font-futuristic">
                Carte de Couverture
              </h3>
              
              {/* SVG Carte simplifiée */}
              <svg className="map-svg" viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">
                {/* Haute-Loire (43) */}
                <path
                  d="M50 50 L200 50 L200 150 L50 150 Z"
                  className={`map-department ${embrayageMode ? 'dept-on-demand' : 'dept-covered'}`}
                  onMouseEnter={(e) => handleDeptHover('43', e)}
                  onMouseLeave={() => setHoveredDept(null)}
                  onClick={() => setShowAllCommunes43(!showAllCommunes43)}
                />
                <text x="125" y="100" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">
                  43
                </text>
                <text x="125" y="115" textAnchor="middle" fill="white" fontSize="10">
                  Haute-Loire
                </text>

                {/* Loire (42) */}
                <path
                  d="M200 100 L350 100 L350 250 L200 250 Z"
                  className="map-department dept-covered"
                  onMouseEnter={(e) => handleDeptHover('42', e)}
                  onMouseLeave={() => setHoveredDept(null)}
                  onClick={() => setShowAllCommunes42(!showAllCommunes42)}
                />
                <text x="275" y="175" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">
                  42
                </text>
                <text x="275" y="190" textAnchor="middle" fill="white" fontSize="10">
                  Loire
                </text>

                {/* Saint-Étienne (zone spéciale) */}
                <circle
                  cx="275"
                  cy="200"
                  r="15"
                  className="map-department dept-limited"
                  onMouseEnter={(e) => handleDeptHover('saint-etienne', e)}
                  onMouseLeave={() => setHoveredDept(null)}
                />
                <text x="275" y="205" textAnchor="middle" fill="white" fontSize="8">
                  St-É
                </text>
              </svg>

              {/* Légende */}
              <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-green-500 rounded"></div>
                  <span className="text-white">Zone couverte</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-blue-500 rounded"></div>
                  <span className="text-white">Accès limité</span>
                </div>
                {embrayageMode && (
                  <div className="flex items-center gap-2 col-span-2">
                    <div className="w-4 h-4 bg-yellow-500 rounded"></div>
                    <span className="text-white">Zone élargie (embrayage)</span>
                  </div>
                )}
              </div>
            </div>

            {/* Vérificateur de Couverture */}
            <div className="coverage-checker">
              <h3 className="text-lg font-bold text-gray-900 mb-4 text-center font-futuristic">
                Vérificateur de Couverture
              </h3>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Votre ville ou code postal
                </label>
                <input
                  type="text"
                  value={coverageInput}
                  onChange={(e) => setCoverageInput(e.target.value)}
                  placeholder="Ex: Le Puy-en-Velay, 43000..."
                  className="coverage-input"
                />
              </div>

              {/* Résultat de couverture */}
              {coverageResult.status && (
                <div className={`coverage-result coverage-${coverageResult.status}`}>
                  {coverageResult.status === 'covered' && (
                    <>
                      <CheckCircle className="w-5 h-5" />
                      <span>✅ C'est bon : nous intervenons à {coverageResult.city}.</span>
                    </>
                  )}
                  {coverageResult.status === 'on-demand' && (
                    <>
                      <AlertTriangle className="w-5 h-5" />
                      <span>⚠️ Possible sur demande (embrayage / déplacement long).</span>
                    </>
                  )}
                  {coverageResult.status === 'out-of-zone' && (
                    <>
                      <XCircle className="w-5 h-5" />
                      <span>⛔ Hors zone standard. Contactez-nous pour un devis embrayage.</span>
                    </>
                  )}
                </div>
              )}

              {/* CTA contextuel */}
              <button
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="w-full mt-4 px-6 py-3 bg-orange-500 text-white font-medium rounded-lg hover:bg-orange-600 transition-colors duration-200 font-tech uppercase tracking-wide text-sm hover-scale"
              >
                {getCTAText()}
              </button>
            </div>
          </div>

          {/* Pills de raccourcis */}
          <div className="flex flex-wrap justify-center gap-3 mb-6">
            <button
              onClick={() => setShowAllCommunes43(!showAllCommunes43)}
              className="condition-pill cursor-pointer hover:bg-orange-500/20 transition-colors"
            >
              Haute-Loire (43)
            </button>
            <button
              onClick={() => setShowAllCommunes42(!showAllCommunes42)}
              className="condition-pill cursor-pointer hover:bg-orange-500/20 transition-colors"
            >
              Loire (42)
            </button>
            <button
              onClick={() => setEmbrayageMode(!embrayageMode)}
              className="condition-pill warning cursor-pointer hover:bg-yellow-500/20 transition-colors"
            >
              <Wrench className="w-3 h-3" />
              Embrayage : zone élargie
            </button>
          </div>

          {/* Listes des communes (accordéons) */}
          {(showAllCommunes43 || showAllCommunes42) && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              {/* Haute-Loire */}
              {showAllCommunes43 && (
                <div className="bg-orange-500/10 backdrop-blur-sm p-4 sm:p-6 rounded-lg border border-orange-500/20">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold text-white font-futuristic">
                      Haute-Loire (43)
                    </h3>
                    <button
                      onClick={() => setShowAllCommunes43(false)}
                      className="text-orange-300 hover:text-orange-200"
                    >
                      <ChevronUp className="w-5 h-5" />
                    </button>
                  </div>
                  <div className="text-white/80 text-sm font-tech leading-relaxed">
                    {communes43.join(', ')}
                  </div>
                </div>
              )}

              {/* Loire */}
              {showAllCommunes42 && (
                <div className="bg-orange-500/10 backdrop-blur-sm p-4 sm:p-6 rounded-lg border border-orange-500/20">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold text-white font-futuristic">
                      Loire (42)
                    </h3>
                    <button
                      onClick={() => setShowAllCommunes42(false)}
                      className="text-orange-300 hover:text-orange-200"
                    >
                      <ChevronUp className="w-5 h-5" />
                    </button>
                  </div>
                  <div className="text-white/80 text-sm font-tech leading-relaxed">
                    {communes42.join(', ')}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* CTA principal */}
          <div className="text-center">
            <button
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="inline-flex items-center px-8 py-4 btn-primary rounded-lg text-lg font-tech glow-hover hover-scale morph-button subtle-glow"
            >
              Demander un devis
              <MapPin className="ml-3 w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Encart d'information département (hover) */}
      {hoveredDept && (
        <div
          className="dept-info-card visible"
          style={{
            position: 'fixed',
            left: deptInfoPosition.x - 100,
            top: deptInfoPosition.y - 80,
            zIndex: 50
          }}
        >
          {getDeptInfo(hoveredDept) && (
            <>
              <h4>{getDeptInfo(hoveredDept)!.name}</h4>
              <div className="cities">{getDeptInfo(hoveredDept)!.cities}</div>
              <div className="see-all">
                Voir toutes les {getDeptInfo(hoveredDept)!.count} villes
              </div>
            </>
          )}
          {hoveredDept === 'saint-etienne' && (
            <>
              <h4>Saint-Étienne</h4>
              <div className="cities">Interventions limitées intra-muros</div>
              <div className="see-all">Contactez-nous pour plus d'infos</div>
            </>
          )}
        </div>
      )}
    </section>
  );
};

export default ServiceArea;
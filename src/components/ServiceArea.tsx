import React, { useState, useEffect, useRef } from 'react';
import { MapPin, ChevronDown, ChevronUp, CheckCircle, AlertTriangle, XCircle, Home, Wrench, Info } from 'lucide-react';

interface ServiceAreaProps {
  onQuoteClick: () => void;
}

// Centre de référence : Monistrol-sur-Loire
const CENTER_COORDS = { lat: 45.2947, lng: 4.1736 };
const STANDARD_RADIUS = 50; // km
const EMBRAYAGE_RADIUS = 75; // km
const SAINT_ETIENNE_EXCLUSION_RADIUS = 6; // km
const SAINT_ETIENNE_COORDS = { lat: 45.4397, lng: 4.3872 };

declare global {
  interface Window {
    google: any;
  }
}

const ServiceArea: React.FC<ServiceAreaProps> = ({ onQuoteClick }) => {
  const [showAllCommunes43, setShowAllCommunes43] = useState(false);
  const [showAllCommunes42, setShowAllCommunes42] = useState(false);
  const [embrayageMode, setEmbrayageMode] = useState(false);
  const [coverageInput, setCoverageInput] = useState('');
  const [coverageResult, setCoverageResult] = useState<{
    status: 'covered' | 'on-demand' | 'out-of-zone' | 'limited-access' | null;
    city: string;
    distance?: number;
  }>({ status: null, city: '' });
  
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<any>(null);
  const autocompleteRef = useRef<any>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const standardCircleRef = useRef<any>(null);
  const embrayageCircleRef = useRef<any>(null);
  const exclusionCircleRef = useRef<any>(null);
  const markerRef = useRef<any>(null);

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

  // Calculer la distance entre deux points
  const calculateDistance = (point1: { lat: number; lng: number }, point2: { lat: number; lng: number }) => {
    if (window.google && window.google.maps && window.google.maps.geometry) {
      const latLng1 = new window.google.maps.LatLng(point1.lat, point1.lng);
      const latLng2 = new window.google.maps.LatLng(point2.lat, point2.lng);
      return window.google.maps.geometry.spherical.computeDistanceBetween(latLng1, latLng2) / 1000; // en km
    }
    return 0;
  };

  // Vérifier la couverture d'un point
  const checkCoverage = (coords: { lat: number; lng: number }, placeName: string) => {
    const distanceFromCenter = calculateDistance(coords, CENTER_COORDS);
    const distanceFromSaintEtienne = calculateDistance(coords, SAINT_ETIENNE_COORDS);
    
    // Vérifier si c'est dans la zone d'exclusion de Saint-Étienne
    if (distanceFromSaintEtienne <= SAINT_ETIENNE_EXCLUSION_RADIUS) {
      setCoverageResult({ 
        status: 'limited-access', 
        city: placeName,
        distance: distanceFromCenter 
      });
      return;
    }

    // Vérifier la couverture selon les rayons
    if (distanceFromCenter <= STANDARD_RADIUS) {
      setCoverageResult({ 
        status: 'covered', 
        city: placeName,
        distance: distanceFromCenter 
      });
    } else if (embrayageMode && distanceFromCenter <= EMBRAYAGE_RADIUS) {
      setCoverageResult({ 
        status: 'on-demand', 
        city: placeName,
        distance: distanceFromCenter 
      });
    } else if (distanceFromCenter <= EMBRAYAGE_RADIUS) {
      setCoverageResult({ 
        status: 'on-demand', 
        city: placeName,
        distance: distanceFromCenter 
      });
    } else {
      setCoverageResult({ 
        status: 'out-of-zone', 
        city: placeName,
        distance: distanceFromCenter 
      });
    }
  };

  // Initialiser Google Maps
  useEffect(() => {
    const initMap = () => {
      if (!window.google || !mapRef.current) return;

      // Créer la carte
      mapInstance.current = new window.google.maps.Map(mapRef.current, {
        center: CENTER_COORDS,
        zoom: 9,
        styles: [
          { elementType: "geometry", stylers: [{ color: "#1a1a1a" }] },
          { elementType: "labels.text.stroke", stylers: [{ color: "#1a1a1a" }] },
          { elementType: "labels.text.fill", stylers: [{ color: "#746855" }] },
          {
            featureType: "administrative.locality",
            elementType: "labels.text.fill",
            stylers: [{ color: "#d59563" }]
          },
          {
            featureType: "poi",
            elementType: "labels.text.fill",
            stylers: [{ color: "#d59563" }]
          },
          {
            featureType: "poi.park",
            elementType: "geometry",
            stylers: [{ color: "#263c3f" }]
          },
          {
            featureType: "poi.park",
            elementType: "labels.text.fill",
            stylers: [{ color: "#6b9a76" }]
          },
          {
            featureType: "road",
            elementType: "geometry",
            stylers: [{ color: "#38414e" }]
          },
          {
            featureType: "road",
            elementType: "geometry.stroke",
            stylers: [{ color: "#212a37" }]
          },
          {
            featureType: "road",
            elementType: "labels.text.fill",
            stylers: [{ color: "#9ca5b3" }]
          },
          {
            featureType: "road.highway",
            elementType: "geometry",
            stylers: [{ color: "#746855" }]
          },
          {
            featureType: "road.highway",
            elementType: "geometry.stroke",
            stylers: [{ color: "#1f2835" }]
          },
          {
            featureType: "road.highway",
            elementType: "labels.text.fill",
            stylers: [{ color: "#f3d19c" }]
          },
          {
            featureType: "transit",
            elementType: "geometry",
            stylers: [{ color: "#2f3948" }]
          },
          {
            featureType: "transit.station",
            elementType: "labels.text.fill",
            stylers: [{ color: "#d59563" }]
          },
          {
            featureType: "water",
            elementType: "geometry",
            stylers: [{ color: "#17263c" }]
          },
          {
            featureType: "water",
            elementType: "labels.text.fill",
            stylers: [{ color: "#515c6d" }]
          },
          {
            featureType: "water",
            elementType: "labels.text.stroke",
            stylers: [{ color: "#17263c" }]
          }
        ],
        disableDefaultUI: true,
        zoomControl: true,
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: false
      });

      // Cercle standard (50km)
      standardCircleRef.current = new window.google.maps.Circle({
        strokeColor: '#10B981',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: '#10B981',
        fillOpacity: 0.15,
        map: mapInstance.current,
        center: CENTER_COORDS,
        radius: STANDARD_RADIUS * 1000 // en mètres
      });

      // Cercle embrayage (75km) - initialement caché
      embrayageCircleRef.current = new window.google.maps.Circle({
        strokeColor: '#F59E0B',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: '#F59E0B',
        fillOpacity: 0.1,
        map: null, // Caché par défaut
        center: CENTER_COORDS,
        radius: EMBRAYAGE_RADIUS * 1000
      });

      // Zone d'exclusion Saint-Étienne
      exclusionCircleRef.current = new window.google.maps.Circle({
        strokeColor: '#EF4444',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: '#EF4444',
        fillOpacity: 0.2,
        map: mapInstance.current,
        center: SAINT_ETIENNE_COORDS,
        radius: SAINT_ETIENNE_EXCLUSION_RADIUS * 1000
      });

      // Marqueur centre
      new window.google.maps.Marker({
        position: CENTER_COORDS,
        map: mapInstance.current,
        title: 'Monistrol-sur-Loire - Centre d\'intervention',
        icon: {
          path: window.google.maps.SymbolPath.CIRCLE,
          scale: 8,
          fillColor: '#FF6B35',
          fillOpacity: 1,
          strokeColor: '#ffffff',
          strokeWeight: 2
        }
      });

      // Autocomplete
      if (inputRef.current) {
        autocompleteRef.current = new window.google.maps.places.Autocomplete(inputRef.current, {
          componentRestrictions: { country: 'fr' },
          fields: ['place_id', 'geometry', 'name', 'formatted_address', 'address_components']
        });

        autocompleteRef.current.addListener('place_changed', () => {
          const place = autocompleteRef.current.getPlace();
          
          if (!place.geometry || !place.geometry.location) {
            setCoverageResult({ status: null, city: '' });
            return;
          }

          const coords = {
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng()
          };

          // Vérifier si c'est dans les départements 42/43
          const postalCode = place.address_components?.find((component: any) => 
            component.types.includes('postal_code')
          )?.long_name;

          const isDept4243 = postalCode && (postalCode.startsWith('42') || postalCode.startsWith('43'));
          
          if (!isDept4243 && !embrayageMode) {
            setCoverageResult({ 
              status: 'out-of-zone', 
              city: place.name || place.formatted_address,
              distance: calculateDistance(coords, CENTER_COORDS)
            });
          } else {
            checkCoverage(coords, place.name || place.formatted_address);
          }

          // Ajouter/déplacer le marqueur
          if (markerRef.current) {
            markerRef.current.setMap(null);
          }

          markerRef.current = new window.google.maps.Marker({
            position: coords,
            map: mapInstance.current,
            title: place.name,
            animation: window.google.maps.Animation.DROP
          });

          // Centrer la carte sur le lieu
          mapInstance.current.panTo(coords);
          mapInstance.current.setZoom(11);
        });
      }
    };

    // Attendre que Google Maps soit chargé
    if (window.google) {
      initMap();
    } else {
      const checkGoogle = setInterval(() => {
        if (window.google) {
          clearInterval(checkGoogle);
          initMap();
        }
      }, 100);
    }
  }, []);

  // Gérer le toggle embrayage
  useEffect(() => {
    if (embrayageCircleRef.current) {
      embrayageCircleRef.current.setMap(embrayageMode ? mapInstance.current : null);
    }
    
    // Recalculer la couverture si une recherche est active
    if (coverageResult.city && markerRef.current) {
      const coords = {
        lat: markerRef.current.getPosition().lat(),
        lng: markerRef.current.getPosition().lng()
      };
      checkCoverage(coords, coverageResult.city);
    }
  }, [embrayageMode]);

  const getCTAText = () => {
    switch (coverageResult.status) {
      case 'covered':
        return 'Demander un devis';
      case 'on-demand':
        return 'Demander un devis (déplacement long)';
      case 'limited-access':
        return 'Nous contacter (conditions d\'accès)';
      case 'out-of-zone':
        return 'Nous contacter';
      default:
        return 'Demander un devis';
    }
  };

  const getStatusMessage = () => {
    switch (coverageResult.status) {
      case 'covered':
        return `✅ C'est bon : nous intervenons à ${coverageResult.city}.`;
      case 'on-demand':
        return `⚠️ Sur demande (embrayage / déplacement long).`;
      case 'limited-access':
        return `ⓘ Saint-Étienne intra-muros : accès limité (au cas par cas).`;
      case 'out-of-zone':
        return `🚫 Hors zone standard. Contactez-nous pour un devis embrayage.`;
      default:
        return '';
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
              Loire (42) et Haute-Loire (43). Sol dur et plat uniquement.
            </p>
            
            {/* Pills de conditions */}
            <div className="flex flex-wrap justify-center gap-3 mb-6">
              <div className="condition-pill">
                <Home className="w-3 h-3" />
                Sol dur et plat uniquement
              </div>
              <div className="condition-pill info">
                <Info className="w-3 h-3" />
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
          <div className="space-y-6 sm:space-y-8 mb-8">
            
            {/* Carte Interactive Google Maps - Pleine largeur */}
            <div className="w-full">
              <div 
                ref={mapRef}
                className="w-full h-96 rounded-lg border border-orange-500/20 overflow-hidden shadow-xl"
                style={{ minHeight: '400px' }}
              />

              {/* Légende compacte */}
              <div className="mt-4 flex flex-wrap justify-center gap-4 text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-white">Zone couverte (50km)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <span className="text-white">Accès limité</span>
                </div>
                {embrayageMode && (
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <span className="text-white">Zone élargie embrayage (75km)</span>
                  </div>
                )}
              </div>
            </div>

            {/* Vérificateur de Couverture - Compact */}
            <div className="max-w-md mx-auto">
              <div className="bg-white/95 backdrop-blur-sm p-4 rounded-lg shadow-xl border border-orange-500/30">
              <h3 className="text-base font-bold text-gray-900 mb-3 text-center font-futuristic">
                Vérificateur de Couverture
              </h3>
              
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-2">
                  Votre ville ou code postal
                </label>
                <input
                  ref={inputRef}
                  type="text"
                  value={coverageInput}
                  onChange={(e) => setCoverageInput(e.target.value)}
                  placeholder="Ex: Le Puy-en-Velay, 43000..."
                  className="w-full px-3 py-2 bg-white border-2 border-gray-300 text-gray-900 focus:border-orange-500 focus:outline-none rounded font-tech text-sm transition-all duration-200"
                />
              </div>

              {/* Résultat de couverture */}
              {coverageResult.status && (
                <div className={`mt-3 p-3 rounded-lg font-medium text-sm flex items-center gap-2 ${
                  coverageResult.status === 'covered' ? 'bg-green-100 text-green-800 border border-green-200' :
                  coverageResult.status === 'on-demand' ? 'bg-yellow-100 text-yellow-800 border border-yellow-200' :
                  coverageResult.status === 'limited-access' ? 'bg-blue-100 text-blue-800 border border-blue-200' :
                  'bg-red-100 text-red-800 border border-red-200'
                }`}>
                  <span>{getStatusMessage()}</span>
                  {coverageResult.distance && (
                    <div className="text-xs opacity-75">
                      Distance: {Math.round(coverageResult.distance)} km
                    </div>
                  )}
                </div>
              )}

              {/* CTA contextuel */}
              <button
                onClick={onQuoteClick}
                className="w-full mt-4 px-6 py-4 bg-orange-500 text-white font-bold rounded-lg hover:bg-orange-600 transition-colors duration-200 font-tech uppercase tracking-wide text-base hover-scale shadow-lg"
              >
                {getCTAText()}
              </button>
            </div>
            </div>
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
              onClick={onQuoteClick}
              className="inline-flex items-center px-8 py-4 btn-primary rounded-lg text-lg font-tech glow-hover hover-scale morph-button subtle-glow"
            >
              Demander un devis
              <MapPin className="ml-3 w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceArea;
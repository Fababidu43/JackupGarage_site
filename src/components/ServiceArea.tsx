import React, { useState, useEffect, useRef } from 'react';
import { MapPin, ChevronDown, ChevronUp, CheckCircle, AlertTriangle, XCircle, Home, Wrench, Info, Map, DollarSign, Search, FileText, MapIcon, Calculator } from 'lucide-react';

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
  const [coverageInput, setCoverageInput] = useState('');
  const [coverageResult, setCoverageResult] = useState<{
    status: 'covered' | 'on-demand' | 'quote-only' | 'out-of-zone' | 'limited-access' | null;
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
    
    // Cas particulier Saint-Étienne intra-muros
    if (distanceFromSaintEtienne <= SAINT_ETIENNE_EXCLUSION_RADIUS) {
      setCoverageResult({ 
        status: 'limited-access', 
        city: placeName,
        distance: distanceFromCenter 
      });
      return;
    }

    // Calcul de la couverture selon les distances
    if (distanceFromCenter <= STANDARD_RADIUS) {
      // Zone standard 0-50km
      setCoverageResult({ 
        status: 'covered', 
        city: placeName,
        distance: distanceFromCenter 
      });
    } else if (distanceFromCenter <= EMBRAYAGE_RADIUS) {
      // Zone élargie 50-75km
      setCoverageResult({ 
        status: 'on-demand', 
        city: placeName,
        distance: distanceFromCenter 
      });
    } else if (distanceFromCenter <= 90) {
      // Hors zone standard 75-90km
      setCoverageResult({ 
        status: 'quote-only', 
        city: placeName,
        distance: distanceFromCenter 
      });
    } else {
      // Non desservi >90km
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
        map: mapInstance.current, // Affiché par défaut
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
          
          if (!place || !place.geometry || !place.geometry.location) {
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
          
          if (!isDept4243) {
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

  const getCTAText = () => {
    switch (coverageResult.status) {
      case 'covered':
        return 'Demander un devis';
      case 'on-demand':
        return 'Demander un devis (avec supplément)';
      case 'quote-only':
        return 'Demander un devis personnalisé';
      case 'limited-access':
        return 'Nous contacter (conditions d\'accès)';
      case 'out-of-zone':
        return 'Nous contacter';
      default:
        return 'Demander un devis';
    }
  };

  const getStatusMessage = () => {
    if (!coverageResult.distance) return '';
    
    const distance = Math.round(coverageResult.distance);
    
    switch (coverageResult.status) {
      case 'covered':
        return `✅ Nous intervenons à ${coverageResult.city} sans supplément.`;
      case 'on-demand':
        const supplement = Math.round((distance - STANDARD_RADIUS) * 1); // 1€/km
        return `⚠️ Zone élargie embrayage : supplément de ${supplement} € TTC (distance : ${distance} km).`;
      case 'quote-only':
        return `🚫 Hors zone standard. Contactez-nous pour un devis personnalisé.`;
      case 'limited-access':
        return `ⓘ Saint-Étienne intra-muros : accès limité, intervention possible au cas par cas.`;
      case 'out-of-zone':
        return `🚫 Zone non desservie.`;
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
      <div className="relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-8 sm:mb-12">
            <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center text-white mx-auto mb-6 shadow-xl">
              <MapPin className="w-8 h-8" />
            </div>
            <h2 className="text-3xl xs:text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-4 sm:mb-6 tracking-tight uppercase font-futuristic">
              Zone d'intervention
            </h2>
            <p className="text-lg sm:text-xl lg:text-2xl text-orange-300 font-medium font-tech mb-6">
              Loire (42) et Haute-Loire (43). Sol dur et plat uniquement.
            </p>
            
            {/* Pills de conditions */}
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <div className="condition-pill text-sm">
                <Home className="w-3 h-3" />
                Sol dur et plat uniquement
              </div>
              <div className="condition-pill info text-sm">
                <Info className="w-3 h-3" />
                Saint-Étienne : accès limité
              </div>
            </div>
          </div>

          {/* Carte + Vérificateur */}
          <div className="space-y-8 sm:space-y-10 mb-12">
            
            {/* Carte Interactive Google Maps */}
            <div className="w-full">
              <div className="bg-white/5 backdrop-blur-sm p-6 rounded-2xl border border-orange-500/20 shadow-2xl">
                <h3 className="text-xl font-bold text-white mb-4 font-futuristic text-center">
                  <MapIcon className="w-6 h-6 inline-block mr-2 text-orange-400" />
                  Carte Interactive
                </h3>
                <div className="text-center mb-4">
                  <p className="text-orange-300 text-sm font-tech bg-orange-500/10 backdrop-blur-sm px-4 py-2 rounded-lg inline-block">
                    Zone élargie embrayage : Supplément 1,00 € TTC/km au-delà de 50 km
                  </p>
                </div>
              <div 
                ref={mapRef}
                  className="w-full h-96 rounded-xl border-2 border-orange-500/30 overflow-hidden shadow-2xl"
                  style={{ minHeight: '400px' }}
              />

                {/* Légende élégante */}
                <div className="mt-6 flex flex-wrap justify-center gap-6 text-sm">
                  <div className="flex items-center gap-2 bg-green-500/20 px-3 py-2 rounded-full">
                    <div className="w-3 h-3 bg-green-500 rounded-full shadow-lg"></div>
                    <span className="text-white font-medium">Zone couverte (0-50km)</span>
                  </div>
                  <div className="flex items-center gap-2 bg-yellow-500/20 px-3 py-2 rounded-full">
                    <div className="w-3 h-3 bg-yellow-500 rounded-full shadow-lg"></div>
                    <span className="text-white font-medium">Zone élargie (50-75km)</span>
                  </div>
                  <div className="flex items-center gap-2 bg-red-500/20 px-3 py-2 rounded-full">
                    <div className="w-3 h-3 bg-red-500 rounded-full shadow-lg"></div>
                    <span className="text-white font-medium">Accès limité</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Vérificateur de Couverture */}
            <div className="max-w-md mx-auto">
              <div className="bg-white/95 backdrop-blur-sm p-6 rounded-2xl shadow-2xl border-2 border-orange-500/40 hover:border-orange-500/60 transition-all duration-300">
                <div className="text-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center text-white mx-auto mb-3 shadow-lg">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 font-futuristic">
                    <Search className="w-5 h-5 inline-block mr-2 text-orange-500" />
                    Vérificateur de Couverture
                  </h3>
                </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3 font-tech">
                  Votre ville ou code postal
                </label>
                <input
                  ref={inputRef}
                  type="text"
                  value={coverageInput}
                  onChange={(e) => setCoverageInput(e.target.value)}
                  placeholder="Ex: Monistrol-sur-Loire, 43120..."
                  className="w-full px-4 py-3 bg-white border-2 border-gray-300 text-gray-900 focus:border-orange-500 focus:outline-none rounded-xl font-tech text-sm transition-all duration-200 shadow-inner"
                />
              </div>

              {/* Résultat de couverture */}
              {coverageResult.status && (
                <div className={`mt-4 p-4 rounded-xl font-medium text-sm border-2 transition-all duration-300 ${
                  coverageResult.status === 'covered' ? 'bg-green-50 text-green-800 border-green-300 shadow-green-100' :
                  coverageResult.status === 'on-demand' ? 'bg-yellow-50 text-yellow-800 border-yellow-300 shadow-yellow-100' :
                  coverageResult.status === 'quote-only' ? 'bg-orange-50 text-orange-800 border-orange-300 shadow-orange-100' :
                  coverageResult.status === 'limited-access' ? 'bg-blue-50 text-blue-800 border-blue-300 shadow-blue-100' :
                  'bg-red-50 text-red-800 border-red-300 shadow-red-100'
                }`}>
                  <div className="font-tech leading-relaxed">
                    {getStatusMessage()}
                  </div>
                </div>
              )}
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
              className="inline-flex items-center px-10 py-5 btn-primary rounded-2xl text-xl font-tech glow-hover hover-scale morph-button subtle-glow shadow-2xl"
            >
              <MapPin className="mr-3 w-6 h-6" />
              Demander un devis
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceArea;
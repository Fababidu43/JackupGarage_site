import React, { useState, useEffect, useRef } from 'react';
import { MapPin, ChevronDown, ChevronUp, CheckCircle, AlertTriangle, XCircle, Home, Wrench, Info, Map, DollarSign, Search, FileText, MapIcon, Calculator } from 'lucide-react';

interface ServiceAreaProps {
  onQuoteClick: () => void;
}

// Centre de référence : Monistrol-sur-Loire
const CENTER_COORDS = { lat: 45.2947, lng: 4.1736 };
const STANDARD_RADIUS = 30; // km (0-30 km)
const EMBRAYAGE_RADIUS = 60; // km pour la zone élargie (30-60 km)
// Point de référence Lyon
const LYON_COORDS = { lat: 45.7640, lng: 4.8357 };
const LYON_ON_DEMAND_RADIUS = 10; // km

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
  const [isMapReady, setIsMapReady] = useState(false);
  const [mapError, setMapError] = useState(false);
  
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<any>(null);
  const autocompleteRef = useRef<any>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const standardCircleRef = useRef<any>(null);
  const embrayageCircleRef = useRef<any>(null);
  const lyonCircleRef = useRef<any>(null);
  const markerRef = useRef<any>(null);
  const initializationRef = useRef(false);

  const communes43 = [
    "Le Puy-en-Velay", "Monistrol-sur-Loire", "Yssingeaux", "Brioude", "Langeac", 
    "Sainte-Sigolène", "Retournac", "Bas-en-Basset", "Saint-Just-Malmont", "Dunières", 
    "Tence", "Saint-Didier-en-Velay", "Craponne-sur-Arzon", "Vorey", "Aurec-sur-Loire", 
    "Saint-Paulien", "Allegre"
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
    // Vérifier d'abord si c'est dans la zone Lyon (10km autour de Lyon)
    const distanceFromLyon = calculateDistance(coords, LYON_COORDS);
    const isInLyonZone = distanceFromLyon <= LYON_ON_DEMAND_RADIUS;
    
    if (isInLyonZone) {
      setCoverageResult({ 
        status: 'on-demand', 
        city: placeName,
        distance: distanceFromLyon
      });
      return;
    }

    const distanceFromCenter = calculateDistance(coords, CENTER_COORDS);

    // Récupérer les informations du lieu
    const place = autocompleteRef.current?.getPlace();
    
    // Extraire le code postal pour vérifier le département si disponible
    let department = '';
    if (place && place.address_components) {
      const postalCode = place.address_components.find((component: any) => 
        component.types.includes('postal_code')
      )?.long_name;
      department = postalCode ? postalCode.substring(0, 2) : '';
    }

    // Logique de couverture basée sur la distance depuis Monistrol-sur-Loire
    if (distanceFromCenter <= STANDARD_RADIUS) {
      // Zone standard (0-30km)
      setCoverageResult({ 
        status: 'covered', 
        city: placeName,
        distance: distanceFromCenter 
      });
    } else if (distanceFromCenter <= EMBRAYAGE_RADIUS && distanceFromCenter > STANDARD_RADIUS) {
      // Zone élargie (30-60km) - selon nature des travaux
      setCoverageResult({
        status: 'quote-only',
        city: placeName,
        distance: distanceFromCenter
      });
    } else {
      // Au-delà de 60km - hors zone
      setCoverageResult({ 
        status: 'out-of-zone', 
        city: placeName,
        distance: distanceFromCenter 
      });
    }
  };

  // Initialiser Google Maps
  useEffect(() => {
    const initializeMap = () => {
      if (initializationRef.current || !window.google || !mapRef.current) {
        return;
      }
      
      initializationRef.current = true;
      console.log('🗺️ Initialisation de Google Maps...');
      
      try {
        // Créer la carte
        mapInstance.current = new window.google.maps.Map(mapRef.current, {
          center: CENTER_COORDS,
          zoom: 8,
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

        // Cercle standard (30km)
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

        // Cercle embrayage (60km)
        embrayageCircleRef.current = new window.google.maps.Circle({
          strokeColor: '#F59E0B',
          strokeOpacity: 0.8,
          strokeWeight: 2,
          fillColor: '#F59E0B',
          fillOpacity: 0.1,
          map: mapInstance.current,
          center: CENTER_COORDS,
          radius: EMBRAYAGE_RADIUS * 1000
        });

        // Zone Lyon sur demande
        lyonCircleRef.current = new window.google.maps.Circle({
          strokeColor: '#3B82F6',
          strokeOpacity: 0.8,
          strokeWeight: 2,
          fillColor: '#3B82F6',
          fillOpacity: 0.2,
          map: mapInstance.current,
          center: LYON_COORDS,
          radius: LYON_ON_DEMAND_RADIUS * 1000
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

            // Extraire le nom du lieu
            const placeName = place.name || place.formatted_address || '';
            
            // Vérifier la couverture
            checkCoverage(coords, placeName);

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

        setIsMapReady(true);
        console.log('✅ Google Maps initialisée avec succès');
        
      } catch (error) {
        console.error('❌ Erreur initialisation Google Maps:', error);
        setMapError(true);
      }
    };

    const initMap = () => {
      // Vérifier si Google Maps est disponible
      if (window.google) {
        initializeMap();
      } else if (window.googleMapsError) {
        setMapError(true);
      } else {
        // Attendre que Google Maps soit chargé
        const checkGoogle = setInterval(() => {
          if (window.google) {
            clearInterval(checkGoogle);
            initializeMap();
          } else if (window.googleMapsError) {
            clearInterval(checkGoogle);
            setMapError(true);
          }
        }, 100);
        
        // Timeout après 10 secondes
        setTimeout(() => {
          if (!window.google && !window.googleMapsError) {
            clearInterval(checkGoogle);
            setMapError(true);
            console.error('❌ Timeout: Google Maps non chargé après 10s');
          }
        }, 10000);
      }
    };

    // Initialiser dès que le composant est monté
    initMap();
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
        return `Nous intervenons à ${coverageResult.city} sans supplément (${distance} km de Monistrol-sur-Loire).`;
      case 'on-demand':
        return (
          <span>
            {coverageResult.city} se trouve dans la zone Lyon. Intervention uniquement sur demande - {' '}
            <a 
              href="tel:+33629485339" 
              className="underline font-semibold text-blue-600 hover:text-blue-800 transition-colors duration-200"
            >
              Contactez-nous
            </a>
            {' '}pour vérifier la faisabilité.
          </span>
        );
      case 'quote-only':
        return `${coverageResult.city} : zone élargie selon nature des travaux (${distance} km). Supplément 1€/km au-delà de 30 km.`;
      case 'out-of-zone':
        return `${coverageResult.city} est hors de notre zone d'intervention (${distance} km).`;
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
            <p className="text-lg sm:text-xl lg:text-2xl text-orange-300 font-medium font-tech mb-4">
              Rayon d'intervention : 30 km autour de Monistrol-sur-Loire
            </p>
            <p className="text-sm sm:text-base text-orange-200 font-tech mb-6">
              Haute-Loire (43) • Loire (42) • Rhône (69) sur demande
            </p>
            
            {/* Pills de conditions */}
            <div className="flex flex-wrap justify-center gap-2 sm:gap-3 lg:gap-4 mb-6 sm:mb-8 px-2">
              <div className="condition-pill text-xs sm:text-sm">
                <Home className="w-3 h-3 sm:w-4 sm:h-4" />
                Sol dur et plat uniquement
              </div>
              <div className="condition-pill warning text-xs sm:text-sm">
                <MapPin className="w-3 h-3 sm:w-4 sm:h-4" />
                Rhône sur demande
              </div>
            </div>
          </div>

          {/* Carte + Vérificateur */}
          <div className="space-y-8 sm:space-y-10 mb-12">
            
            {/* Carte Interactive Google Maps */}
            <div className="w-full">
              <div className="bg-white/5 backdrop-blur-sm p-4 sm:p-6 rounded-2xl border border-orange-500/20 shadow-2xl">
                <h3 className="text-lg sm:text-xl font-bold text-white mb-3 sm:mb-4 font-futuristic text-center">
                  Carte Interactive
                </h3>
                
                {/* État de chargement */}
                {!isMapReady && !mapError && (
                  <div className="w-full h-96 rounded-xl border-2 border-orange-500/30 overflow-hidden shadow-2xl flex items-center justify-center bg-gray-900/50">
                    <div className="text-center">
                      <div className="w-8 h-8 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
                      <p className="text-orange-300 font-tech text-sm">Chargement de la carte...</p>
                    </div>
                  </div>
                )}
                
                {/* État d'erreur */}
                {mapError && (
                  <div className="w-full h-96 rounded-xl border-2 border-red-500/30 overflow-hidden shadow-2xl flex items-center justify-center bg-red-900/20">
                    <div className="text-center">
                      <div className="w-12 h-12 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                        <span className="text-red-400 text-2xl">⚠️</span>
                      </div>
                      <p className="text-red-300 font-tech text-sm">Erreur de chargement de la carte</p>
                      <p className="text-red-400 font-tech text-xs mt-1">Vérifiez votre connexion internet</p>
                    </div>
                  </div>
                )}
                
                {/* Carte Google Maps */}
                <div 
                  ref={mapRef}
                  className={`w-full h-96 rounded-xl border-2 border-orange-500/30 overflow-hidden shadow-2xl transition-opacity duration-500 ${
                    isMapReady ? 'opacity-100' : 'opacity-0 absolute'
                  }`}
                  style={{ minHeight: '400px' }}
                />

                {/* Légende élégante */}
                <div className={`mt-4 sm:mt-6 flex flex-wrap justify-center gap-2 sm:gap-4 lg:gap-6 text-xs sm:text-sm px-2 transition-opacity duration-500 ${
                  isMapReady ? 'opacity-100' : 'opacity-50'
                }`}>
                  <div className="flex items-center gap-1 sm:gap-2 bg-green-500/20 px-2 sm:px-3 py-1 sm:py-2 rounded-full">
                    <div className="w-3 h-3 bg-green-500 rounded-full shadow-lg"></div>
                    <span className="text-white font-medium whitespace-nowrap">Zone couverte (0-30km)</span>
                  </div>
                  <div className="flex items-center gap-1 sm:gap-2 bg-yellow-500/20 px-2 sm:px-3 py-1 sm:py-2 rounded-full">
                    <div className="w-3 h-3 bg-yellow-500 rounded-full shadow-lg"></div>
                    <span className="text-white font-medium whitespace-nowrap">Zone élargie (30-60km)</span>
                  </div>
                  <div className="flex items-center gap-1 sm:gap-2 bg-blue-500/20 px-2 sm:px-3 py-1 sm:py-2 rounded-full">
                    <div className="w-3 h-3 bg-blue-500 rounded-full shadow-lg"></div>
                    <span className="text-white font-medium whitespace-nowrap">Lyon sur demande (10km)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Vérificateur de Couverture */}
            <div className="max-w-sm sm:max-w-md mx-auto px-2 sm:px-0">
              <div className="bg-white/95 backdrop-blur-sm p-4 sm:p-6 rounded-2xl shadow-2xl border-2 border-orange-500/40 hover:border-orange-500/60 transition-all duration-300">
                <div className="text-center mb-3 sm:mb-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center text-white mx-auto mb-2 sm:mb-3 shadow-lg">
                    <MapPin className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-gray-900 font-futuristic">
                    <Search className="w-4 h-4 sm:w-5 sm:h-5 inline-block mr-2 text-orange-500" />
                    Vérificateur de Couverture
                  </h3>
                </div>
              
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2 sm:mb-3 font-tech">
                    Votre ville ou code postal
                  </label>
                  <input
                    ref={inputRef}
                    type="text"
                    value={coverageInput}
                    onChange={(e) => setCoverageInput(e.target.value)}
                    placeholder="Ex: Monistrol-sur-Loire, 43120..."
                    className={`w-full px-3 sm:px-4 py-2 sm:py-3 bg-white border-2 border-gray-300 text-gray-900 focus:border-orange-500 focus:outline-none rounded-xl font-tech text-sm transition-all duration-200 shadow-inner ${
                      !isMapReady ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                    disabled={!isMapReady}
                  />
                </div>

                {/* Résultat de couverture */}
                {coverageResult.status && (
                  <div className={`mt-3 sm:mt-4 p-3 sm:p-4 rounded-xl font-medium text-xs sm:text-sm border-2 transition-all duration-300 ${
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
          <div className="mb-8">
            {/* Affichage compact des départements pour le SEO */}
            <div className="bg-white/5 backdrop-blur-sm p-4 sm:p-6 rounded-2xl border border-orange-500/20 shadow-2xl">
              <h3 className="text-lg sm:text-xl font-bold text-white mb-4 font-futuristic text-center">
                Communes Desservies
              </h3>
              
              {/* Haute-Loire (prioritaire) */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-base font-bold text-orange-300 font-futuristic flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    Haute-Loire (43) - Prioritaire
                  </h4>
                  <button
                    onClick={() => setShowAllCommunes43(!showAllCommunes43)}
                    className="text-orange-300 hover:text-orange-200 transition-colors"
                  >
                    {showAllCommunes43 ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>
                </div>
                {showAllCommunes43 ? (
                  <div className="text-white/80 text-sm font-tech leading-relaxed bg-green-500/10 p-3 rounded-lg">
                    {communes43.join(' • ')}
                  </div>
                ) : (
                  <div className="text-white/60 text-xs font-tech">
                    {communes43.slice(0, 5).join(' • ')} ... ({communes43.length} communes)
                  </div>
                )}
              </div>
              {/* Loire */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-base font-bold text-orange-300 font-futuristic flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    Loire (42)
                  </h4>
                  <button
                    onClick={() => setShowAllCommunes42(!showAllCommunes42)}
                    className="text-orange-300 hover:text-orange-200 transition-colors"
                  >
                    {showAllCommunes42 ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>
                </div>
                {showAllCommunes42 ? (
                  <div className="text-white/80 text-sm font-tech leading-relaxed bg-green-500/10 p-3 rounded-lg">
                    {communes42.join(' • ')}
                  </div>
                ) : (
                  <div className="text-white/60 text-xs font-tech">
                    {communes42.slice(0, 5).join(' • ')} ... ({communes42.length} communes)
                  </div>
                )}
              </div>

              {/* Rhône */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <h4 className="text-base font-bold text-orange-300 font-futuristic">
                    Rhône (69)
                  </h4>
                </div>
                <div className="text-blue-300 text-sm font-tech bg-blue-500/10 p-3 rounded-lg">
                  Lyon et périphérie sur demande uniquement. Contactez-nous pour vérifier la faisabilité.
                </div>
              </div>
            </div>
          </div>

          {/* Anciennes listes détaillées (cachées par défaut) */}
          {false && (showAllCommunes43 || showAllCommunes42) && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8 hidden">
              {/* Haute-Loire - Version détaillée */}
              {showAllCommunes43 && (
                <div className="bg-green-500/10 backdrop-blur-sm p-4 sm:p-6 rounded-lg border border-green-500/20">
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
                    {communes43.join(' • ')}
                  </div>
                </div>
              )}

              {/* Loire - Version détaillée */}
              {showAllCommunes42 && (
                <div className="bg-green-500/10 backdrop-blur-sm p-4 sm:p-6 rounded-lg border border-green-500/20">
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
                    {communes42.join(' • ')}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* CTA principal */}
          <div className="text-center">
            <button
              onClick={onQuoteClick}
              className="inline-flex items-center px-6 sm:px-8 lg:px-10 py-4 sm:py-5 btn-primary rounded-2xl text-lg sm:text-xl font-tech glow-hover hover-scale morph-button subtle-glow shadow-2xl w-full sm:w-auto max-w-sm sm:max-w-none mx-auto"
            >
              <MapPin className="mr-2 sm:mr-3 w-5 h-5 sm:w-6 sm:h-6" />
              Demander un devis
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceArea;
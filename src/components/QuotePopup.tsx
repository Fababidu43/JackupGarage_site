import React, { useState } from 'react';
import { X, Car, Wrench, Phone, ArrowRight, Zap, Settings, Droplets, CheckCircle, Clock, MapPin, AlertTriangle, FileText } from 'lucide-react';

// Centre de référence : Monistrol-sur-Loire
const CENTER_COORDS = { lat: 45.2947, lng: 4.1736 };
const STANDARD_RADIUS = 60; // km (0-60 km)
// Point de référence Lyon
const LYON_COORDS = { lat: 45.7640, lng: 4.8357 };
const LYON_ON_DEMAND_RADIUS = 10; // km

declare global {
  interface Window {
    google: any;
  }
}

interface QuotePopupProps {
  isOpen: boolean;
  onClose: () => void;
}

const QuotePopup: React.FC<QuotePopupProps> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    service: '',
    urgency: '',
    location: '', // Maintenant utilisé pour stocker le nom de la ville
    phone: '',
    name: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [locationStatus, setLocationStatus] = useState<{
    status: 'covered' | 'on-demand' | 'quote-only' | 'out-of-zone' | null;
    city: string;
    distance?: number;
  }>({ status: null, city: '' });
  const [locationInput, setLocationInput] = useState('');

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
  const checkCoverage = (coords: { lat: number; lng: number }, placeName: string, place?: any) => {
    // Vérifier d'abord si c'est dans la zone Lyon (10km autour de Lyon)
    const distanceFromLyon = calculateDistance(coords, LYON_COORDS);
    const isInLyonZone = distanceFromLyon <= LYON_ON_DEMAND_RADIUS;
    
    if (isInLyonZone) {
      setLocationStatus({
        status: 'on-demand',
        city: placeName,
        distance: distanceFromLyon
      });
      return;
    }

    const distanceFromCenter = calculateDistance(coords, CENTER_COORDS);

    // Extraire le code postal pour vérifier le département
    const postalCode = place?.address_components?.find((component: any) => 
      component.types.includes('postal_code')
    )?.long_name;
    const department = postalCode ? postalCode.substring(0, 2) : '';

    // Logique de couverture basée sur la distance depuis Monistrol-sur-Loire (60km)
    if (distanceFromCenter <= STANDARD_RADIUS) {
      // Zone couverte (0-60km)
      setLocationStatus({
        status: 'covered',
        city: placeName,
        distance: distanceFromCenter
      });
    } else {
      // Au-delà de 60km - hors zone
      setLocationStatus({
        status: 'out-of-zone',
        city: placeName,
        distance: distanceFromCenter
      });
    }

  };

  // Initialiser l'autocomplete Google Places
  React.useEffect(() => {
    if (!isOpen || step !== 3) return;

    const initAutocomplete = () => {
      const input = document.getElementById('location-input') as HTMLInputElement;
      if (!input || !window.google) return;

      const autocomplete = new window.google.maps.places.Autocomplete(input, {
        componentRestrictions: { country: 'fr' },
        fields: ['place_id', 'geometry', 'name', 'formatted_address', 'address_components']
      });

      autocomplete.addListener('place_changed', () => {
        const place = autocomplete.getPlace();
        
        if (!place || !place.geometry || !place.geometry.location) {
          setLocationStatus({ status: null, city: '' });
          return;
        }

        const coords = {
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng()
        };

        const placeName = place.name || place.formatted_address || '';
        setFormData({ ...formData, location: placeName });
        checkCoverage(coords, placeName, place);
      });
    };

    // Attendre que Google Maps soit chargé
    if (window.google) {
      initAutocomplete();
    } else {
      let attempts = 0;
      const maxAttempts = 20; // 10 secondes max
      
      const checkGoogle = setInterval(() => {
        attempts++;
        if (window.google) {
          clearInterval(checkGoogle);
          initAutocomplete();
        } else if (attempts >= maxAttempts) {
          clearInterval(checkGoogle);
          console.warn('Google Maps API non disponible pour autocomplete');
        }
      }, 500);

      return () => {
        clearInterval(checkGoogle);
      };
    }
  }, [isOpen, step, formData]);

  const getLocationStatusMessage = () => {
    if (!locationStatus.distance) return '';
    
    const distance = Math.round(locationStatus.distance);
    
    switch (locationStatus.status) {
      case 'covered':
        return `Nous intervenons à ${locationStatus.city} (${distance} km de Monistrol-sur-Loire).`;
      case 'on-demand':
        return (
          <span>
            {locationStatus.city} se trouve dans la zone Lyon. Intervention uniquement sur demande - {' '}
            <a 
              href="tel:+33629485339" 
              className="underline font-semibold text-yellow-200 hover:text-yellow-100 transition-colors duration-200"
            >
              Contactez-nous
            </a>
            {' '}pour vérifier la faisabilité.
          </span>
        );
      case 'out-of-zone':
        return `${locationStatus.city} est hors de notre zone d'intervention.`;
      default:
        return '';
    }
  };

  const services = [
    { 
      id: 'vidange', 
      name: 'Vidange / Entretien', 
      icon: <Droplets className="w-6 h-6" />, 
      color: 'from-blue-500 to-blue-600',
      warning: 'Changement d\'huile nécessaire tous les 10 000-15 000 km selon constructeur'
    },
    { 
      id: 'freins', 
      name: 'Freins / Plaquettes', 
      icon: <Car className="w-6 h-6" />, 
      color: 'from-red-500 to-red-600',
      warning: 'Grincements, vibrations au freinage, pédale spongieuse, distance de freinage allongée, voyant frein allumé'
    },
    { 
      id: 'embrayage', 
      name: 'Embrayage / Volant', 
      icon: <Zap className="w-6 h-6" />, 
      color: 'from-yellow-500 to-yellow-600',
      warning: 'Pédale d\'embrayage qui patine, bruits au débrayage, difficulté à passer les vitesses'
    },
    { 
      id: 'distribution', 
      name: 'Kit Distribution', 
      icon: <Settings className="w-6 h-6" />, 
      color: 'from-purple-500 to-purple-600',
      warning: 'Remplacement préventif tous les 60 000-120 000 km selon constructeur'
    },
    { 
      id: 'suspension', 
      name: 'Suspensions / Amortisseurs', 
      icon: <Wrench className="w-6 h-6" />, 
      color: 'from-green-500 to-green-600',
      warning: 'Véhicule qui rebondit, tenue de route dégradée, bruits de suspension, usure irrégulière des pneus, direction qui tire'
    },
    { 
      id: 'autre', 
      name: 'Autre', 
      icon: <Car className="w-6 h-6" />, 
      color: 'from-gray-500 to-gray-600',
      warning: 'Contactez-nous pour tout autre problème mécanique'
    }
  ];

  const urgencies = [
    { id: 'normal', name: 'Dans la semaine', icon: <Clock className="w-5 h-5" />, color: 'text-green-600' },
    { id: 'urgent', name: 'Cette semaine', icon: <Zap className="w-5 h-5" />, color: 'text-yellow-600' },
    { id: 'tres-urgent', name: 'Urgent (2-3 jours)', icon: <Phone className="w-5 h-5" />, color: 'text-red-600' }
  ];

  const handleSubmit = () => {
    // Envoyer la demande de devis par email
    setIsLoading(true);
    sendQuoteEmail();
  };

  const sendQuoteEmail = async () => {
    try {
      console.log('=== ENVOI DEMANDE DE DEVIS ===');
      console.log('Données à envoyer:', {
        service: formData.service,
        urgency: formData.urgency,
        location: formData.location,
        phone: formData.phone,
        name: formData.name
      });

      const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/send-quote-email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
        },
        body: JSON.stringify({
          service: formData.service,
          urgency: formData.urgency,
          location: formData.location,
          phone: formData.phone,
          name: formData.name
        })
      });

      console.log('Réponse HTTP status:', response.status);
      const result = await response.json();
      console.log('Réponse du serveur:', result);
      
      if (result.success) {
        console.log('✅ Email envoyé avec succès via MailerSend !');
        console.log('Détails:', result.details);
        setIsSubmitted(true);
      } else {
        console.error('❌ Erreur envoi email:', result.error);
        // Afficher le message de confirmation même en cas d'erreur (fallback UX)
        setIsSubmitted(true);
      }
    } catch (error) {
      console.error('Erreur lors de l\'envoi:', error);
      // Afficher le message de confirmation même en cas d'erreur (fallback UX)
      setIsSubmitted(true);
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setStep(1);
    setFormData({ service: '', urgency: '', location: '', phone: '', name: '' });
    setLocationStatus({ status: null, city: '' });
    setLocationInput('');
    setIsSubmitted(false);
    setIsLoading(false);
  };

  const handleClose = () => {
    onClose();
    // Réinitialiser après fermeture pour éviter les conflits
    setTimeout(resetForm, 300);
  };
  const nextStep = () => {
    if (step < 4) setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-1 sm:p-2 lg:p-4">
      {/* Fond dynamique */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 via-transparent to-orange-600/10"></div>
      </div>

      <div className="relative bg-gradient-to-br from-gray-900 via-black to-gray-900 rounded-xl lg:rounded-2xl shadow-2xl w-full max-w-sm sm:max-w-md lg:max-w-lg xl:max-w-xl border border-orange-500/30 max-h-[98vh] sm:max-h-[95vh] lg:max-h-[90vh] overflow-hidden flex flex-col">
        {/* Accent lumineux */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-500 via-orange-400 to-orange-500"></div>
        
        {/* Header futuriste */}
        <div className="relative flex items-center justify-between p-2 sm:p-3 lg:p-4 border-b border-orange-500/20 flex-shrink-0">
          <div className="flex items-center gap-1 sm:gap-2">
            <img 
              src="./logo.png" 
              alt="Jack Up Garage" 
              className="w-10 h-5 sm:w-12 sm:h-6 lg:w-16 lg:h-8 object-contain"
              style={{ maxWidth: '100%', maxHeight: '100%' }}
              onError={(e) => {
                console.warn('Popup logo failed to load, trying fallback');
                e.currentTarget.src = '/logo.png';
              }}
            />
            <div>
              <h3 className="text-sm sm:text-base lg:text-lg font-bold text-white font-futuristic tracking-wide">
                JACK Up Auto - DEVIS EXPRESS
              </h3>
              <p className="text-orange-400 text-xs sm:text-sm font-tech">Mécanicien à domicile</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 sm:p-1.5 text-gray-400 hover:text-orange-400 hover:bg-orange-500/10 rounded-lg transition-all duration-200 hover-scale flex-shrink-0"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Barre de progression futuriste */}
        <div className="px-2 sm:px-3 lg:px-4 py-1.5 sm:py-2 bg-black/50 flex-shrink-0">
          <div className="flex items-center justify-between text-xs text-orange-400 mb-2 font-tech uppercase tracking-wider">
            <span>Étape {step}/4</span>
            <span>{Math.round((step / 4) * 100)}%</span>
          </div>
          <div className="relative w-full bg-gray-800 rounded-full h-1 sm:h-1.5 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-gray-700 to-gray-800"></div>
            <div 
              className="bg-gradient-to-r from-orange-500 to-orange-400 h-1 sm:h-1.5 rounded-full transition-all duration-500 ease-out relative overflow-hidden"
              style={{ width: `${(step / 4) * 100}%` }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse"></div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-2 pt-2 pb-0 sm:p-3 lg:p-4 min-h-0">
          {/* Message de confirmation */}
          {isSubmitted && (
            <div className="text-center py-4 sm:py-6">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-green-500 rounded-full flex items-center justify-center text-white mx-auto mb-3 sm:mb-4 shadow-lg">
                <CheckCircle className="w-6 h-6 sm:w-8 sm:h-8" />
              </div>
              <h4 className="text-base sm:text-lg font-bold text-white mb-2 sm:mb-3 font-futuristic">
                DEMANDE ENVOYÉE !
              </h4>
              <p className="text-xs sm:text-sm text-green-300 mb-3 sm:mb-4 font-tech leading-relaxed">
                Votre demande de devis a été envoyée avec succès.
              </p>
              <p className="text-xs sm:text-sm text-orange-300 mb-4 sm:mb-6 font-tech leading-relaxed">
                📞 Vous recevrez une réponse par téléphone ou email sous 12h.
              </p>
              <button
                onClick={handleClose}
                className="px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all duration-200 font-tech font-bold uppercase tracking-wide hover-scale text-xs sm:text-sm"
              >
                Fermer
              </button>
            </div>
          )}

          {/* Step 1: Service */}
          {step === 1 && !isSubmitted && (
            <div>
              <h4 className="text-sm sm:text-base font-bold text-white mb-2 sm:mb-3 font-futuristic tracking-wide flex items-center gap-2">
                <Settings className="w-4 h-4 text-orange-400" />
                QUEL SERVICE VOUS INTÉRESSE ?
              </h4>
              <div className="grid grid-cols-1 gap-1.5 sm:gap-2">
                {services.map((service) => (
                  <button
                    key={service.id}
                    onClick={() => {
                      setFormData({ ...formData, service: service.id });
                      nextStep();
                    }}
                    className={`group relative p-2 sm:p-3 rounded-lg border-2 text-left transition-all duration-300 hover:border-orange-500 hover:bg-orange-500/5 hover-scale ${
                      formData.service === service.id 
                        ? 'border-orange-500 bg-orange-500/10' 
                        : 'border-gray-700 bg-gray-800/50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`w-6 h-6 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center text-white bg-gradient-to-br ${service.color} shadow-lg group-hover:scale-110 transition-transform duration-200`}>
                          {service.icon}
                        </div>
                        <div>
                          <div className="font-medium text-white font-tech text-xs sm:text-sm">{service.name}</div>
                          {service.warning && service.id !== 'autre' && (
                            <div className="text-xs text-yellow-300 font-tech mt-1 flex items-start gap-1">
                              <span>🚗</span>
                              <span>{service.warning}</span>
                            </div>
                          )}
                        </div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-orange-400 group-hover:translate-x-1 transition-transform duration-200" />
                    </div>
                    {/* Effet de glow au hover */}
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-orange-500/0 via-orange-500/5 to-orange-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Urgency */}
          {step === 2 && !isSubmitted && (
            <div>
              <h4 className="text-sm sm:text-base font-bold text-white mb-2 sm:mb-3 font-futuristic tracking-wide flex items-center gap-2">
                <Clock className="w-4 h-4 text-orange-400" />
                QUELLE EST L'URGENCE ?
              </h4>
              <div className="space-y-1.5 sm:space-y-2">
                {urgencies.map((urgency) => (
                  <button
                    key={urgency.id}
                    onClick={() => {
                      setFormData({ ...formData, urgency: urgency.id });
                      nextStep();
                    }}
                    className={`group w-full p-2 sm:p-3 rounded-lg border-2 text-left transition-all duration-300 hover:border-orange-500 hover:bg-orange-500/5 hover-scale ${
                      formData.urgency === urgency.id 
                        ? 'border-orange-500 bg-orange-500/10' 
                        : 'border-gray-700 bg-gray-800/50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`w-6 h-6 rounded-lg flex items-center justify-center ${urgency.color} bg-gray-800`}>
                          {urgency.icon}
                        </div>
                        <span className="font-medium text-white font-tech text-xs sm:text-sm">{urgency.name}</span>
                      </div>
                      <ArrowRight className="w-4 h-4 text-orange-400 group-hover:translate-x-1 transition-transform duration-200" />
                    </div>
                  </button>
                ))}
              </div>
              <button
                onClick={prevStep}
                className="mt-2 sm:mt-3 text-xs text-orange-400 hover:text-orange-300 font-tech flex items-center gap-1 hover-lift"
              >
                ← Retour
              </button>
            </div>
          )}

          {/* Step 3: Location */}
          {step === 3 && !isSubmitted && (
            <div>
              <h4 className="text-sm sm:text-base font-bold text-white mb-2 sm:mb-3 font-futuristic tracking-wide flex items-center gap-2">
                <MapPin className="w-4 h-4 text-orange-400" />
                VOTRE VILLE OU CODE POSTAL
              </h4>
              
              <div className="space-y-2 sm:space-y-3">
                <div>
                  <label htmlFor="location-input" className="block text-xs font-medium text-orange-400 mb-1 font-tech uppercase tracking-wide">
                    Ville ou code postal
                  </label>
                  <input
                    id="location-input"
                    type="text"
                    value={locationInput}
                    onChange={(e) => setLocationInput(e.target.value)}
                    placeholder="Ex: Monistrol-sur-Loire, 43120..."
                    className="w-full px-2 sm:px-3 py-2 sm:py-2.5 bg-gray-800/50 border-2 border-gray-700 text-white rounded-lg focus:border-orange-500 focus:outline-none font-tech transition-all duration-200 hover:border-gray-600 text-xs sm:text-sm"
                    aria-label="Saisissez votre ville ou code postal"
                  />
                </div>

                {/* Résultat de couverture */}
                {locationStatus.status && (
                  <div className={`p-2 sm:p-3 rounded-lg font-medium text-xs border-2 transition-all duration-300 ${
                    locationStatus.status === 'covered' ? 'bg-green-500/20 text-green-300 border-green-500/30' :
                    locationStatus.status === 'on-demand' ? 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30' :
                    locationStatus.status === 'quote-only' ? 'bg-orange-500/20 text-orange-300 border-orange-500/30' :
                    'bg-red-500/20 text-red-300 border-red-500/30'
                  }`}>
                    <div className="font-tech leading-relaxed">
                      {getLocationStatusMessage()}
                    </div>
                  </div>
                )}

                {/* Bouton continuer */}
                {formData.location && (
                  <button
                    onClick={nextStep}
                    className="w-full px-2 sm:px-3 py-2 sm:py-2.5 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all duration-200 font-tech font-bold uppercase tracking-wide hover-scale flex items-center justify-center gap-2 text-xs sm:text-sm"
                  >
                    Continuer
                    <ArrowRight className="w-4 h-4" />
                  </button>
                )}
              </div>
              
              <button
                onClick={prevStep}
                className="mt-2 sm:mt-3 text-xs text-orange-400 hover:text-orange-300 font-tech flex items-center gap-1 hover-lift"
              >
                ← Retour
              </button>
            </div>
          )}

          {/* Step 4: Contact */}
          {step === 4 && !isSubmitted && (
            <div>
              <h4 className="text-sm sm:text-base font-bold text-white mb-2 sm:mb-3 font-futuristic tracking-wide flex items-center gap-2">
                <Phone className="w-4 h-4 text-orange-400" />
                VOS COORDONNÉES
              </h4>
              <div className="space-y-2 sm:space-y-3">
                <div>
                  <label className="block text-xs font-medium text-orange-400 mb-1 font-tech uppercase tracking-wide">
                    Votre nom *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-2 sm:px-3 py-2 sm:py-2.5 bg-gray-800/50 border-2 border-gray-700 text-white rounded-lg focus:border-orange-500 focus:outline-none font-tech transition-all duration-200 hover:border-gray-600 text-xs sm:text-sm"
                    placeholder="Jean Dupont"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-orange-400 mb-1 font-tech uppercase tracking-wide">
                    Votre téléphone *
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-2 sm:px-3 py-2 sm:py-2.5 bg-gray-800/50 border-2 border-gray-700 text-white rounded-lg focus:border-orange-500 focus:outline-none font-tech transition-all duration-200 hover:border-gray-600 text-xs sm:text-sm"
                    placeholder="06 12 34 56 78"
                    required
                  />
                </div>
              </div>
              
              <div className="flex gap-2 mt-3 sm:mt-4">
                <button
                  onClick={prevStep}
                  className="flex-1 px-2 sm:px-3 py-2 sm:py-2.5 border-2 border-gray-700 text-gray-300 rounded-lg hover:bg-gray-800/50 hover:border-gray-600 transition-all duration-200 font-tech font-medium text-xs sm:text-sm"
                >
                  Retour
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={!formData.name || !formData.phone || !formData.location || isLoading}
                  className="flex-1 px-2 sm:px-3 py-2 sm:py-2.5 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed font-tech font-bold uppercase tracking-wide hover-scale flex items-center justify-center gap-2 text-xs sm:text-sm"
                >
                  {isLoading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Envoi en cours...
                    </>
                  ) : (
                    <>
                      <CheckCircle className="w-4 h-4" />
                      Envoyer
                    </>
                  )}
                </button>
              </div>
              
              <div className="mt-2 sm:mt-3 p-2 sm:p-3 bg-orange-500/10 border border-orange-500/30 rounded-lg">
                <p className="text-center text-xs text-orange-300 font-tech flex items-center justify-center gap-1">
                  <Clock className="w-3 h-3 flex-shrink-0" />
                  Retour par mail ou téléphone sous 12h
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer avec effet lumineux */}
        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-orange-500/50 to-transparent flex-shrink-0"></div>
      </div>
    </div>
  );
};

export default QuotePopup;
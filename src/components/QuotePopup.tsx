import React, { useState } from 'react';
import { X, Car, Wrench, Phone, ArrowRight, Zap, Settings, Droplets, CheckCircle, Clock, MapPin, AlertTriangle, ArrowLeft } from 'lucide-react';

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
  const [locationStatus, setLocationStatus] = useState<{
    status: 'covered' | 'on-demand' | 'quote-only' | 'out-of-zone' | 'limited-access' | null;
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
  const checkCoverage = (coords: { lat: number; lng: number }, placeName: string) => {
    const distanceFromCenter = calculateDistance(coords, CENTER_COORDS);
    const distanceFromSaintEtienne = calculateDistance(coords, SAINT_ETIENNE_COORDS);
    
    // Cas particulier Saint-Étienne intra-muros
    if (distanceFromSaintEtienne <= SAINT_ETIENNE_EXCLUSION_RADIUS) {
      setLocationStatus({ 
        status: 'limited-access', 
        city: placeName,
        distance: distanceFromCenter 
      });
      return;
    }

    // Calcul de la couverture selon les distances
    if (distanceFromCenter <= STANDARD_RADIUS) {
      setLocationStatus({ 
        status: 'covered', 
        city: placeName,
        distance: distanceFromCenter 
      });
    } else if (distanceFromCenter <= EMBRAYAGE_RADIUS) {
      setLocationStatus({ 
        status: 'on-demand', 
        city: placeName,
        distance: distanceFromCenter 
      });
    } else if (distanceFromCenter <= 90) {
      setLocationStatus({ 
        status: 'quote-only', 
        city: placeName,
        distance: distanceFromCenter 
      });
    } else {
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
        checkCoverage(coords, placeName);
      });
    };

    // Attendre que Google Maps soit chargé
    if (window.google) {
      initAutocomplete();
    } else {
      const checkGoogle = setInterval(() => {
        if (window.google) {
          clearInterval(checkGoogle);
          initAutocomplete();
        }
      }, 100);
      
      return () => clearInterval(checkGoogle);
    }
  }, [isOpen, step, formData]);

  const getLocationStatusMessage = () => {
    if (!locationStatus.distance) return '';
    
    const distance = Math.round(locationStatus.distance);
    
    switch (locationStatus.status) {
      case 'covered':
        return `✅ Nous intervenons à ${locationStatus.city} sans supplément.`;
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

  const services = [
    { 
      id: 'vidange', 
      name: 'Vidange / Entretien', 
      icon: <Droplets className="w-6 h-6" />, 
      time: '30-45 min',
      color: 'from-blue-500 to-blue-600'
    },
    { 
      id: 'freins', 
      name: 'Freins / Plaquettes', 
      icon: <Car className="w-6 h-6" />, 
      time: '1-2h',
      color: 'from-red-500 to-red-600'
    },
    { 
      id: 'embrayage', 
      name: 'Embrayage / Volant', 
      icon: <Zap className="w-6 h-6" />, 
      time: '3-5h',
      color: 'from-yellow-500 to-yellow-600'
    },
    { 
      id: 'distribution', 
      name: 'Kit Distribution', 
      icon: <Settings className="w-6 h-6" />, 
      time: '4-6h',
      color: 'from-purple-500 to-purple-600'
    },
    { 
      id: 'suspension', 
      name: 'Suspensions / Amortisseurs', 
      icon: <Wrench className="w-6 h-6" />, 
      time: '2-3h',
      color: 'from-green-500 to-green-600'
    },
    { 
      id: 'autre', 
      name: 'Autre / Diagnostic', 
      icon: <Car className="w-6 h-6" />, 
      time: 'Variable',
      color: 'from-gray-500 to-gray-600'
    }
  ];

  const urgencies = [
    { id: 'normal', name: 'Dans la semaine', icon: <Clock className="w-5 h-5" />, color: 'text-green-600' },
    { id: 'urgent', name: 'Cette semaine', icon: <Zap className="w-5 h-5" />, color: 'text-yellow-600' },
    { id: 'tres-urgent', name: 'Urgent (2-3 jours)', icon: <Phone className="w-5 h-5" />, color: 'text-red-600' }
  ];

  const handleSubmit = () => {
    // Créer le message WhatsApp ou SMS
    const message = `🚗 DEMANDE DE DEVIS JACK UP GARAGE
    
Service: ${services.find(s => s.id === formData.service)?.name}
Urgence: ${urgencies.find(u => u.id === formData.urgency)?.name}
Ville: ${formData.location}
Nom: ${formData.name}
Téléphone: ${formData.phone}

Merci de me recontacter pour un devis !`;

    // Ouvrir WhatsApp ou SMS
    const phoneNumber = "0123456789";
    const encodedMessage = encodeURIComponent(message);
    
    // Essayer WhatsApp d'abord, puis SMS
    const whatsappUrl = `https://wa.me/33${phoneNumber.substring(1)}?text=${encodedMessage}`;
    const smsUrl = `sms:${phoneNumber}?body=${encodedMessage}`;
    
    // Détecter si mobile pour WhatsApp, sinon SMS
    if (/Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
      window.open(whatsappUrl, '_blank');
    } else {
      window.open(smsUrl, '_blank');
    }
    
    onClose();
    setStep(1);
    setFormData({ service: '', urgency: '', location: '', phone: '', name: '' });
    setLocationStatus({ status: null, city: '' });
    setLocationInput('');
  };

  const nextStep = () => {
    if (step < 4) setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-2 sm:p-4 overflow-y-auto">
      {/* Fond dynamique */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 via-transparent to-orange-600/10"></div>
      </div>

      <div className="relative bg-gradient-to-br from-gray-900 via-black to-gray-900 rounded-2xl shadow-2xl w-full max-w-md sm:max-w-lg lg:max-w-xl my-2 sm:my-4 border border-orange-500/30 max-h-[calc(100vh-1rem)] sm:max-h-[calc(100vh-2rem)] overflow-y-auto sm:overflow-hidden">
        {/* Accent lumineux */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-500 via-orange-400 to-orange-500"></div>
        
        {/* Header futuriste */}
        <div className="relative flex items-center justify-between p-3 sm:p-4 lg:p-5 border-b border-orange-500/20">
          <div className="flex items-center gap-2 sm:gap-3">
            <div>
              <h3 className="text-base sm:text-lg lg:text-xl font-bold text-white font-futuristic tracking-wide">
                DEVIS EXPRESS
              </h3>
              <p className="text-orange-400 text-xs sm:text-sm lg:text-base font-tech">Mécanicien à domicile</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 sm:p-1.5 lg:p-2 text-gray-400 hover:text-orange-400 hover:bg-orange-500/10 rounded-lg transition-all duration-200 hover-scale"
          >
            <X className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>

        {/* Barre de progression futuriste */}
        <div className="px-3 sm:px-4 lg:px-5 py-2 sm:py-3 bg-black/50">
          <div className="flex items-center justify-between text-xs text-orange-400 mb-3 font-tech uppercase tracking-wider">
            <span>Étape {step}/4</span>
            <span>{Math.round((step / 4) * 100)}%</span>
          </div>
          <div className="relative w-full bg-gray-800 rounded-full h-1 sm:h-1.5 lg:h-2 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-gray-700 to-gray-800"></div>
            <div 
              className="bg-gradient-to-r from-orange-500 to-orange-400 h-1 sm:h-1.5 lg:h-2 rounded-full transition-all duration-500 ease-out relative overflow-hidden"
              style={{ width: `${(step / 4) * 100}%` }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse"></div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-3 sm:p-4 lg:p-5 sm:overflow-y-auto sm:max-h-[calc(100vh-10rem)]">
          {/* Step 1: Service */}
          {step === 1 && (
            <div>
              <h4 className="text-sm sm:text-base lg:text-lg font-bold text-white mb-3 sm:mb-4 lg:mb-6 font-futuristic tracking-wide flex items-center gap-2">
                <Settings className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 text-orange-400" />
                QUEL SERVICE VOUS INTÉRESSE ?
              </h4>
              <div className="grid grid-cols-1 gap-1.5 sm:gap-2 lg:gap-3">
                {services.map((service) => (
                  <button
                    key={service.id}
                    onClick={() => {
                      setFormData({ ...formData, service: service.id });
                      nextStep();
                    }}
                    className={`group relative p-2 sm:p-3 lg:p-4 rounded-xl border-2 text-left transition-all duration-300 hover:border-orange-500 hover:bg-orange-500/5 hover-scale ${
                      formData.service === service.id 
                        ? 'border-orange-500 bg-orange-500/10' 
                        : 'border-gray-700 bg-gray-800/50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 rounded-lg flex items-center justify-center text-white bg-gradient-to-br ${service.color} shadow-lg group-hover:scale-110 transition-transform duration-200`}>
                          {service.icon}
                        </div>
                        <div>
                          <div className="font-medium text-white font-tech text-xs sm:text-sm lg:text-base">{service.name}</div>
                          <div className="text-xs text-orange-400 font-tech">Durée: {service.time}</div>
                        </div>
                      </div>
                      <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 text-orange-400 group-hover:translate-x-1 transition-transform duration-200" />
                    </div>
                    {/* Effet de glow au hover */}
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-orange-500/0 via-orange-500/5 to-orange-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Urgency */}
          {step === 2 && (
            <div>
              <h4 className="text-sm sm:text-base lg:text-lg font-bold text-white mb-3 sm:mb-4 lg:mb-6 font-futuristic tracking-wide flex items-center gap-2">
                <Clock className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 text-orange-400" />
                QUELLE EST L'URGENCE ?
              </h4>
              <div className="space-y-1.5 sm:space-y-2 lg:space-y-3">
                {urgencies.map((urgency) => (
                  <button
                    key={urgency.id}
                    onClick={() => {
                      setFormData({ ...formData, urgency: urgency.id });
                      nextStep();
                    }}
                    className={`group w-full p-2 sm:p-3 lg:p-4 rounded-xl border-2 text-left transition-all duration-300 hover:border-orange-500 hover:bg-orange-500/5 hover-scale ${
                      formData.urgency === urgency.id 
                        ? 'border-orange-500 bg-orange-500/10' 
                        : 'border-gray-700 bg-gray-800/50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 rounded-lg flex items-center justify-center ${urgency.color} bg-gray-800`}>
                          {urgency.icon}
                        </div>
                        <span className="font-medium text-white font-tech text-xs sm:text-sm lg:text-base">{urgency.name}</span>
                      </div>
                      <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 text-orange-400 group-hover:translate-x-1 transition-transform duration-200" />
                    </div>
                  </button>
                ))}
              </div>
              <button
                onClick={prevStep}
                className="mt-3 sm:mt-4 lg:mt-6 text-xs text-orange-400 hover:text-orange-300 font-tech flex items-center gap-1 hover-lift"
              >
                <ArrowLeft className="w-3 h-3" />
                Retour
              </button>
            </div>
          )}

          {/* Step 3: Location */}
          {step === 3 && (
            <div>
              <h4 className="text-sm sm:text-base lg:text-lg font-bold text-white mb-3 sm:mb-4 lg:mb-6 font-futuristic tracking-wide flex items-center gap-2">
                <MapPin className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 text-orange-400" />
                VOTRE VILLE OU CODE POSTAL
              </h4>
              
              <div className="space-y-2 sm:space-y-3 lg:space-y-4">
                <div>
                  <input
                    id="location-input"
                    type="text"
                    value={locationInput}
                    onChange={(e) => setLocationInput(e.target.value)}
                    placeholder="Ex: Monistrol-sur-Loire, 43120..."
                    className="w-full px-2 sm:px-3 lg:px-4 py-2 sm:py-2.5 lg:py-3 bg-gray-800/50 border-2 border-gray-700 text-white rounded-xl focus:border-orange-500 focus:outline-none font-tech transition-all duration-200 hover:border-gray-600 text-xs sm:text-sm lg:text-base"
                  />
                </div>

                {/* Résultat de couverture */}
                {locationStatus.status && (
                  <div className={`p-2 sm:p-3 lg:p-4 rounded-xl font-medium text-xs border-2 transition-all duration-300 ${
                    locationStatus.status === 'covered' ? 'bg-green-500/20 text-green-300 border-green-500/30' :
                    locationStatus.status === 'on-demand' ? 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30' :
                    locationStatus.status === 'quote-only' ? 'bg-orange-500/20 text-orange-300 border-orange-500/30' :
                    locationStatus.status === 'limited-access' ? 'bg-blue-500/20 text-blue-300 border-blue-500/30' :
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
                    className="w-full px-2 sm:px-3 lg:px-4 py-2 sm:py-2.5 lg:py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl hover:from-orange-600 hover:to-orange-700 transition-all duration-200 font-tech font-bold uppercase tracking-wide hover-scale flex items-center justify-center gap-2 text-xs sm:text-sm lg:text-base"
                  >
                    Continuer
                    <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5" />
                  </button>
                )}
              </div>
              
              <button
                onClick={prevStep}
                className="mt-3 sm:mt-4 lg:mt-6 text-xs text-orange-400 hover:text-orange-300 font-tech flex items-center gap-1 hover-lift"
              >
                <ArrowLeft className="w-3 h-3" />
                Retour
              </button>
            </div>
          )}

          {/* Step 4: Contact */}
          {step === 4 && (
            <div>
              <h4 className="text-sm sm:text-base lg:text-lg font-bold text-white mb-3 sm:mb-4 lg:mb-6 font-futuristic tracking-wide flex items-center gap-2">
                <Phone className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 text-orange-400" />
                VOS COORDONNÉES
              </h4>
              <div className="space-y-2 sm:space-y-3 lg:space-y-4">
                <div>
                  <label className="block text-xs font-medium text-orange-400 mb-1 sm:mb-2 font-tech uppercase tracking-wide">
                    Votre nom *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-2 sm:px-3 lg:px-4 py-2 sm:py-2.5 lg:py-3 bg-gray-800/50 border-2 border-gray-700 text-white rounded-xl focus:border-orange-500 focus:outline-none font-tech transition-all duration-200 hover:border-gray-600 text-xs sm:text-sm lg:text-base"
                    placeholder="Jean Dupont"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-orange-400 mb-1 sm:mb-2 font-tech uppercase tracking-wide">
                    Votre téléphone *
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-2 sm:px-3 lg:px-4 py-2 sm:py-2.5 lg:py-3 bg-gray-800/50 border-2 border-gray-700 text-white rounded-xl focus:border-orange-500 focus:outline-none font-tech transition-all duration-200 hover:border-gray-600 text-xs sm:text-sm lg:text-base"
                    placeholder="06 12 34 56 78"
                    required
                  />
                </div>
              </div>
              
              <div className="flex gap-2 mt-4 sm:mt-6 lg:mt-8">
                <button
                  onClick={prevStep}
                  className="flex-1 px-2 sm:px-3 lg:px-4 py-2 sm:py-2.5 lg:py-3 border-2 border-gray-700 text-gray-300 rounded-xl hover:bg-gray-800/50 hover:border-gray-600 transition-all duration-200 font-tech font-medium text-xs sm:text-sm lg:text-base"
                >
                  <ArrowLeft className="w-3 h-3 sm:w-4 sm:h-4" />
                  Retour
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={!formData.name || !formData.phone || !formData.location}
                  className="flex-1 px-2 sm:px-3 lg:px-4 py-2 sm:py-2.5 lg:py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl hover:from-orange-600 hover:to-orange-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed font-tech font-bold uppercase tracking-wide hover-scale flex items-center justify-center gap-2 text-xs sm:text-sm lg:text-base"
                >
                  <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5" />
                  Envoyer
                </button>
              </div>
              
              <div className="mt-3 sm:mt-4 lg:mt-6 p-2 sm:p-3 lg:p-4 bg-orange-500/10 border border-orange-500/30 rounded-xl">
                <p className="text-center text-xs text-orange-300 font-tech flex items-center justify-center gap-2">
                  <Clock className="w-3 h-3" />
                  Retour par mail ou téléphone sous 12h
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer avec effet lumineux */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-orange-500/50 to-transparent"></div>
      </div>
    </div>
  );
};

export default QuotePopup;
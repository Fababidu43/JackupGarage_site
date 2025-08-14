import React, { useState } from 'react';
import { X, Car, Wrench, Phone, ArrowRight, Zap, Settings, Droplets, CheckCircle, Clock, MapPin } from 'lucide-react';

interface QuotePopupProps {
  isOpen: boolean;
  onClose: () => void;
}

const QuotePopup: React.FC<QuotePopupProps> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    service: '',
    urgency: '',
    location: '',
    phone: '',
    name: ''
  });

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

  const locations = [
    { id: '43', name: 'Haute-Loire (43)', icon: <MapPin className="w-5 h-5" /> },
    { id: '42', name: 'Loire (42)', icon: <MapPin className="w-5 h-5" /> },
    { id: 'autre', name: 'Autre département', icon: <MapPin className="w-5 h-5" /> }
  ];

  const handleSubmit = () => {
    // Créer le message WhatsApp ou SMS
    const message = `🚗 DEMANDE DE DEVIS JACK UP GARAGE
    
Service: ${services.find(s => s.id === formData.service)?.name}
Urgence: ${urgencies.find(u => u.id === formData.urgency)?.name}
Zone: ${locations.find(l => l.id === formData.location)?.name}
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
  };

  const nextStep = () => {
    if (step < 4) setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      {/* Fond dynamique */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 via-transparent to-orange-600/10"></div>
        <div className="absolute inset-0 tech-grid opacity-20"></div>
      </div>

      <div className="relative bg-gradient-to-br from-gray-900 via-black to-gray-900 rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto border border-orange-500/30">
        {/* Accent lumineux */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-500 via-orange-400 to-orange-500"></div>
        
        {/* Header futuriste */}
        <div className="relative flex items-center justify-between p-6 border-b border-orange-500/20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg">
              <Wrench className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white font-futuristic tracking-wide">
                DEVIS EXPRESS
              </h3>
              <p className="text-orange-400 text-sm font-tech">Mécanicien à domicile</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-orange-400 hover:bg-orange-500/10 rounded-lg transition-all duration-200 hover-scale"
          >
            <X size={20} />
          </button>
        </div>

        {/* Barre de progression futuriste */}
        <div className="px-6 py-4 bg-black/50">
          <div className="flex items-center justify-between text-xs text-orange-400 mb-3 font-tech uppercase tracking-wider">
            <span>Étape {step}/4</span>
            <span>{Math.round((step / 4) * 100)}%</span>
          </div>
          <div className="relative w-full bg-gray-800 rounded-full h-2 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-gray-700 to-gray-800"></div>
            <div 
              className="bg-gradient-to-r from-orange-500 to-orange-400 h-2 rounded-full transition-all duration-500 ease-out relative overflow-hidden"
              style={{ width: `${(step / 4) * 100}%` }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse"></div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Step 1: Service */}
          {step === 1 && (
            <div>
              <h4 className="text-lg font-bold text-white mb-6 font-futuristic tracking-wide flex items-center gap-2">
                <Settings className="w-5 h-5 text-orange-400" />
                QUEL SERVICE VOUS INTÉRESSE ?
              </h4>
              <div className="grid grid-cols-1 gap-3">
                {services.map((service) => (
                  <button
                    key={service.id}
                    onClick={() => {
                      setFormData({ ...formData, service: service.id });
                      nextStep();
                    }}
                    className={`group relative p-4 rounded-xl border-2 text-left transition-all duration-300 hover:border-orange-500 hover:bg-orange-500/5 hover-scale ${
                      formData.service === service.id 
                        ? 'border-orange-500 bg-orange-500/10' 
                        : 'border-gray-700 bg-gray-800/50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-white bg-gradient-to-br ${service.color} shadow-lg group-hover:scale-110 transition-transform duration-200`}>
                          {service.icon}
                        </div>
                        <div>
                          <div className="font-medium text-white font-tech">{service.name}</div>
                          <div className="text-sm text-orange-400 font-tech">Durée: {service.time}</div>
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
          {step === 2 && (
            <div>
              <h4 className="text-lg font-bold text-white mb-6 font-futuristic tracking-wide flex items-center gap-2">
                <Clock className="w-5 h-5 text-orange-400" />
                QUELLE EST L'URGENCE ?
              </h4>
              <div className="space-y-3">
                {urgencies.map((urgency) => (
                  <button
                    key={urgency.id}
                    onClick={() => {
                      setFormData({ ...formData, urgency: urgency.id });
                      nextStep();
                    }}
                    className={`group w-full p-4 rounded-xl border-2 text-left transition-all duration-300 hover:border-orange-500 hover:bg-orange-500/5 hover-scale ${
                      formData.urgency === urgency.id 
                        ? 'border-orange-500 bg-orange-500/10' 
                        : 'border-gray-700 bg-gray-800/50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${urgency.color} bg-gray-800`}>
                          {urgency.icon}
                        </div>
                        <span className="font-medium text-white font-tech">{urgency.name}</span>
                      </div>
                      <ArrowRight className="w-4 h-4 text-orange-400 group-hover:translate-x-1 transition-transform duration-200" />
                    </div>
                  </button>
                ))}
              </div>
              <button
                onClick={prevStep}
                className="mt-6 text-sm text-orange-400 hover:text-orange-300 font-tech flex items-center gap-1 hover-lift"
              >
                ← Retour
              </button>
            </div>
          )}

          {/* Step 3: Location */}
          {step === 3 && (
            <div>
              <h4 className="text-lg font-bold text-white mb-6 font-futuristic tracking-wide flex items-center gap-2">
                <MapPin className="w-5 h-5 text-orange-400" />
                OÙ ÊTES-VOUS SITUÉ ?
              </h4>
              <div className="space-y-3">
                {locations.map((location) => (
                  <button
                    key={location.id}
                    onClick={() => {
                      setFormData({ ...formData, location: location.id });
                      nextStep();
                    }}
                    className={`group w-full p-4 rounded-xl border-2 text-left transition-all duration-300 hover:border-orange-500 hover:bg-orange-500/5 hover-scale ${
                      formData.location === location.id 
                        ? 'border-orange-500 bg-orange-500/10' 
                        : 'border-gray-700 bg-gray-800/50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center text-orange-400 bg-gray-800">
                          {location.icon}
                        </div>
                        <span className="font-medium text-white font-tech">{location.name}</span>
                      </div>
                      <ArrowRight className="w-4 h-4 text-orange-400 group-hover:translate-x-1 transition-transform duration-200" />
                    </div>
                  </button>
                ))}
              </div>
              <button
                onClick={prevStep}
                className="mt-6 text-sm text-orange-400 hover:text-orange-300 font-tech flex items-center gap-1 hover-lift"
              >
                ← Retour
              </button>
            </div>
          )}

          {/* Step 4: Contact */}
          {step === 4 && (
            <div>
              <h4 className="text-lg font-bold text-white mb-6 font-futuristic tracking-wide flex items-center gap-2">
                <Phone className="w-5 h-5 text-orange-400" />
                VOS COORDONNÉES
              </h4>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-orange-400 mb-2 font-tech uppercase tracking-wide">
                    Votre nom *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-800/50 border-2 border-gray-700 text-white rounded-xl focus:border-orange-500 focus:outline-none font-tech transition-all duration-200 hover:border-gray-600"
                    placeholder="Jean Dupont"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-orange-400 mb-2 font-tech uppercase tracking-wide">
                    Votre téléphone *
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-800/50 border-2 border-gray-700 text-white rounded-xl focus:border-orange-500 focus:outline-none font-tech transition-all duration-200 hover:border-gray-600"
                    placeholder="06 12 34 56 78"
                    required
                  />
                </div>
              </div>
              
              <div className="flex gap-3 mt-8">
                <button
                  onClick={prevStep}
                  className="flex-1 px-4 py-3 border-2 border-gray-700 text-gray-300 rounded-xl hover:bg-gray-800/50 hover:border-gray-600 transition-all duration-200 font-tech font-medium"
                >
                  Retour
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={!formData.name || !formData.phone}
                  className="flex-1 px-4 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl hover:from-orange-600 hover:to-orange-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed font-tech font-bold uppercase tracking-wide hover-scale flex items-center justify-center gap-2"
                >
                  <CheckCircle className="w-4 h-4" />
                  Envoyer
                </button>
              </div>
              
              <div className="mt-6 p-4 bg-orange-500/10 border border-orange-500/30 rounded-xl">
                <p className="text-center text-sm text-orange-300 font-tech flex items-center justify-center gap-2">
                  <Clock className="w-4 h-4" />
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
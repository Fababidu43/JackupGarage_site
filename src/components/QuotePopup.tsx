import React, { useState } from 'react';
import { X, Car, Wrench, Phone, ArrowRight } from 'lucide-react';

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
    { id: 'vidange', name: 'Vidange / Entretien', icon: '🛢️', time: '30-45 min' },
    { id: 'freins', name: 'Freins / Plaquettes', icon: '🛑', time: '1-2h' },
    { id: 'embrayage', name: 'Embrayage / Volant', icon: '⚙️', time: '3-5h' },
    { id: 'distribution', name: 'Kit Distribution', icon: '🔧', time: '4-6h' },
    { id: 'suspension', name: 'Suspensions / Amortisseurs', icon: '🚗', time: '2-3h' },
    { id: 'autre', name: 'Autre / Diagnostic', icon: '🔍', time: 'Variable' }
  ];

  const urgencies = [
    { id: 'normal', name: 'Dans la semaine', icon: '📅' },
    { id: 'urgent', name: 'Cette semaine', icon: '⚡' },
    { id: 'tres-urgent', name: 'Urgent (2-3 jours)', icon: '🚨' }
  ];

  const locations = [
    { id: '43', name: 'Haute-Loire (43)', icon: '📍' },
    { id: '42', name: 'Loire (42)', icon: '📍' },
    { id: 'autre', name: 'Autre département', icon: '❓' }
  ];

  const handleSubmit = () => {
    // Créer le message WhatsApp ou SMS
    const message = `🚗 DEMANDE DE DEVIS
    
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
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h3 className="text-lg font-bold text-gray-900 font-futuristic">
            Devis Express
          </h3>
          <button
            onClick={onClose}
            className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="px-4 py-2">
          <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
            <span>Étape {step}/4</span>
            <span>{Math.round((step / 4) * 100)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-orange-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(step / 4) * 100}%` }}
            />
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          {/* Step 1: Service */}
          {step === 1 && (
            <div>
              <h4 className="text-lg font-bold text-gray-900 mb-4 font-futuristic">
                Quel service vous intéresse ?
              </h4>
              <div className="grid grid-cols-1 gap-3">
                {services.map((service) => (
                  <button
                    key={service.id}
                    onClick={() => {
                      setFormData({ ...formData, service: service.id });
                      nextStep();
                    }}
                    className={`p-4 rounded-lg border-2 text-left transition-all duration-200 hover:border-orange-500 hover:bg-orange-50 ${
                      formData.service === service.id 
                        ? 'border-orange-500 bg-orange-50' 
                        : 'border-gray-200'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <span className="text-2xl mr-3">{service.icon}</span>
                        <div>
                          <div className="font-medium text-gray-900">{service.name}</div>
                          <div className="text-sm text-gray-500">Durée: {service.time}</div>
                        </div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-gray-400" />
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Urgency */}
          {step === 2 && (
            <div>
              <h4 className="text-lg font-bold text-gray-900 mb-4 font-futuristic">
                Quelle est l'urgence ?
              </h4>
              <div className="space-y-3">
                {urgencies.map((urgency) => (
                  <button
                    key={urgency.id}
                    onClick={() => {
                      setFormData({ ...formData, urgency: urgency.id });
                      nextStep();
                    }}
                    className={`w-full p-4 rounded-lg border-2 text-left transition-all duration-200 hover:border-orange-500 hover:bg-orange-50 ${
                      formData.urgency === urgency.id 
                        ? 'border-orange-500 bg-orange-50' 
                        : 'border-gray-200'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <span className="text-2xl mr-3">{urgency.icon}</span>
                        <span className="font-medium text-gray-900">{urgency.name}</span>
                      </div>
                      <ArrowRight className="w-4 h-4 text-gray-400" />
                    </div>
                  </button>
                ))}
              </div>
              <button
                onClick={prevStep}
                className="mt-4 text-sm text-gray-500 hover:text-gray-700"
              >
                ← Retour
              </button>
            </div>
          )}

          {/* Step 3: Location */}
          {step === 3 && (
            <div>
              <h4 className="text-lg font-bold text-gray-900 mb-4 font-futuristic">
                Où êtes-vous situé ?
              </h4>
              <div className="space-y-3">
                {locations.map((location) => (
                  <button
                    key={location.id}
                    onClick={() => {
                      setFormData({ ...formData, location: location.id });
                      nextStep();
                    }}
                    className={`w-full p-4 rounded-lg border-2 text-left transition-all duration-200 hover:border-orange-500 hover:bg-orange-50 ${
                      formData.location === location.id 
                        ? 'border-orange-500 bg-orange-50' 
                        : 'border-gray-200'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <span className="text-2xl mr-3">{location.icon}</span>
                        <span className="font-medium text-gray-900">{location.name}</span>
                      </div>
                      <ArrowRight className="w-4 h-4 text-gray-400" />
                    </div>
                  </button>
                ))}
              </div>
              <button
                onClick={prevStep}
                className="mt-4 text-sm text-gray-500 hover:text-gray-700"
              >
                ← Retour
              </button>
            </div>
          )}

          {/* Step 4: Contact */}
          {step === 4 && (
            <div>
              <h4 className="text-lg font-bold text-gray-900 mb-4 font-futuristic">
                Vos coordonnées
              </h4>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Votre nom *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-orange-500 focus:outline-none"
                    placeholder="Jean Dupont"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Votre téléphone *
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-orange-500 focus:outline-none"
                    placeholder="06 12 34 56 78"
                    required
                  />
                </div>
              </div>
              
              <div className="flex gap-3 mt-6">
                <button
                  onClick={prevStep}
                  className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Retour
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={!formData.name || !formData.phone}
                  className="flex-1 px-4 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
                >
                  Envoyer
                </button>
              </div>
              
              <p className="text-xs text-gray-500 text-center mt-3">
                Nous vous recontacterons sous 12h pour votre devis gratuit
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuotePopup;